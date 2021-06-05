import math
from typing import Optional, Tuple, cast

import torch
from beanmachine.ppl.experimental.global_inference.proposer.base_proposer import (
    BaseProposer,
)
from beanmachine.ppl.experimental.global_inference.proposer.hmc_utils import (
    DualAverageAdapter,
)
from beanmachine.ppl.experimental.global_inference.simple_world import (
    RVDict,
    SimpleWorld,
)


class HMCProposer(BaseProposer):
    """
    The basic Hamiltonian Monte Carlo (HMC) algorithm as described in [1] plus a
    dual-averaging mechanism for dynamically adjusting the step size [2].

    Reference:
    [1] Radford Neal. "MCMC Using Hamiltonian Dynamics" (2011).
        https://arxiv.org/abs/1206.1901

    [2] Matthew Hoffman and Andrew Gelman. "The No-U-Turn Sampler: Adaptively
        Setting Path Lengths in Hamiltonian Monte Carlo" (2014).
        https://arxiv.org/abs/1111.4246

    The current implementation does not use nor adapt a mass matrix -- which is
    equivalent to setting the matrix M to I.
    """

    def __init__(
        self,
        initial_world: SimpleWorld,
        trajectory_length: float,
        initial_step_size: float = 1.0,
        adapt_step_size: bool = True,
    ):
        self.world = initial_world
        # cache pe and pe_grad to prevent re-computation
        self._pe, self._pe_grad = self._potential_grads(initial_world)
        # initialize parameters
        self.trajectory_length = trajectory_length
        self.adapt_step_size = adapt_step_size
        if self.adapt_step_size:
            self.step_size = self._find_reasonable_step_size(
                initial_step_size, self.world, self._pe, self._pe_grad
            )
            self._step_size_adapter = DualAverageAdapter(self.step_size)
        else:
            self.step_size = initial_step_size
        # alpha will store the accept prob and will be used to adapt step size
        self._alpha = None

    def _initialize_momentums(self, world: SimpleWorld) -> RVDict:
        """Randomly draw momentum from MultivariateNormal(0, I). This momentum variable
        is denoted as p in [1] and r in [2]."""
        return {
            # sample (flatten) momentums
            node: torch.randn((world.get_transformed(node).numel(),))
            for node in world.latent_nodes
        }

    def _kinetic_energy(self, momentums: RVDict) -> torch.Tensor:
        """Returns the kinetic energy KE = 1/2 * p^T @ p (equation 2.6 in [1])"""
        r_all = torch.cat(list(momentums.values()))
        return torch.dot(r_all, r_all) / 2

    def _kinetic_grads(self, momentums: RVDict) -> RVDict:
        """Returns a dictionary of gradients of kinetic energy function with respect to
        the momentum at each site. With unit mass matrix, the value of this
        gradient equals to the value of the momentum variable."""
        return momentums.copy()

    def _potential_energy(self, world: SimpleWorld) -> torch.Tensor:
        """Returns the potential energy PE = - L(world) (the joint log likelihood of the
        current values)"""
        return -world.log_prob()

    def _potential_grads(self, world: SimpleWorld) -> Tuple[torch.Tensor, RVDict]:
        """Returns potential energy as well as a dictionary of its gradient with
        respect to the value at each site."""
        nodes = list(world.latent_nodes)
        values = [world.get_transformed(node) for node in nodes]
        for value in values:
            value.requires_grad = True

        pe = self._potential_energy(world)
        grads = torch.autograd.grad(pe, values)
        grads = dict(zip(nodes, grads))

        for value in values:
            value.requires_grad = False
        return pe.detach(), grads

    def _hamiltonian(
        self, world: SimpleWorld, momentums: RVDict, pe: Optional[torch.Tensor] = None
    ) -> torch.Tensor:
        """Returns the value of Hamiltonian equation (equatino 2.5 in [1]). This function
        will be more efficient if pe is provided as it only needs to compute the
        kinetic energy"""
        ke = self._kinetic_energy(momentums)
        if pe is None:
            pe = self._potential_energy(world)
        return pe + ke

    def _leapfrog_step(
        self,
        world: SimpleWorld,
        momentums: RVDict,
        step_size: float,
        pe_grad: Optional[RVDict] = None,
    ) -> Tuple[SimpleWorld, RVDict, torch.Tensor, RVDict]:
        """Performs a single leapfrog integration (alson known as the velocity Verlet
        method) as described in equation 2.28-2.30 in [1]. If the values of potential
        grads of the current world is provided, then we only needs to compute the
        gradient once per step."""
        if pe_grad is None:
            _, pe_grad = self._potential_grads(world)

        new_momentums = {}
        for node, r in momentums.items():
            new_momentums[node] = r - step_size * pe_grad[node].flatten() / 2
        ke_grad = self._kinetic_grads(new_momentums)

        new_world = world.copy()
        for node in world.latent_nodes:
            # this should override the value of all the latent nodes in new_world
            # but does not change observations and transforms
            z = world.get_transformed(node)
            new_world.set_transformed(
                node, z + step_size * ke_grad[node].reshape(z.shape)
            )

        pe, pe_grad = self._potential_grads(new_world)
        for node, r in new_momentums.items():
            new_momentums[node] = r - step_size * pe_grad[node].flatten() / 2

        return new_world, new_momentums, pe, pe_grad

    def _leapfrog_updates(
        self,
        world: SimpleWorld,
        momentums: RVDict,
        trajectory_length: float,
        step_size: float,
        pe_grad: Optional[RVDict] = None,
    ) -> Tuple[SimpleWorld, RVDict, torch.Tensor, RVDict]:
        """Run multiple iterations of leapfrog integration until the length of the
        trajectory is greater than the specified trajectory_length."""
        # we should run at least 1 step
        num_steps = max(math.ceil(trajectory_length / step_size), 1)
        for _ in range(num_steps):
            world, momentums, pe, pe_grad = self._leapfrog_step(
                world, momentums, step_size, pe_grad
            )
        return world, momentums, pe, cast(RVDict, pe_grad)

    def _find_reasonable_step_size(
        self,
        initial_step_size: float,
        world: SimpleWorld,
        pe: torch.Tensor,
        pe_grad: RVDict,
    ) -> float:
        """A heuristic of finding a reasonable initial step size (epsilon) as introduced
        in Algorithm 4 of [2]."""
        step_size = initial_step_size
        # the target is log(0.5) in the paper but is log(0.8) on Stan:
        # https://github.com/stan-dev/stan/pull/356
        target = math.log(0.8)
        momentums = self._initialize_momentums(world)
        energy = self._hamiltonian(world, momentums, pe)  # -log p(world, momentums)
        new_world, new_momentums, new_pe, _ = self._leapfrog_step(
            world, momentums, step_size, pe_grad
        )
        new_energy = self._hamiltonian(new_world, new_momentums, new_pe)
        # NaN will evaluate to False and set direction to -1
        new_direction = direction = 1 if energy - new_energy > target else -1
        step_size_scale = 2 ** direction
        while new_direction == direction:
            step_size *= step_size_scale
            # not covered in the paper, but both Stan and Pyro re-sample the momentum
            # after each update
            momentums = self._initialize_momentums(world)
            energy = self._hamiltonian(world, momentums, pe)
            new_world, new_momentums, new_pe, _ = self._leapfrog_step(
                world, momentums, step_size, pe_grad
            )
            new_energy = self._hamiltonian(new_world, new_momentums, new_pe)
            new_direction = 1 if energy - new_energy > target else -1
        return step_size

    def propose(self, world: Optional[SimpleWorld] = None) -> SimpleWorld:
        if world is not None and world is not self.world:
            # re-compute cached values in case world was modified by other sources
            self._pe, self._pe_grad = self._potential_grads(self.world)
            self.world = world
        momentums = self._initialize_momentums(self.world)
        current_energy = self._hamiltonian(self.world, momentums, self._pe)
        world, momentums, pe, pe_grad = self._leapfrog_updates(
            self.world, momentums, self.trajectory_length, self.step_size, self._pe_grad
        )
        new_energy = self._hamiltonian(self.world, momentums, pe)
        delta_energy = torch.nan_to_num(new_energy - current_energy, float("inf"))
        self._alpha = torch.clamp(torch.exp(-delta_energy), max=1.0)
        # accept/reject new world
        if torch.bernoulli(self._alpha):
            self.world, self._pe, self._pe_grad = world, pe, pe_grad

        return self.world

    def do_adaptation(self) -> None:
        if self._alpha is None or not self.adapt_step_size:
            return
        self.step_size = self._step_size_adapter.step(self._alpha)
        self._alpha = None

    def finish_adaptation(self) -> None:
        if self.adapt_step_size:
            self.step_size = self._step_size_adapter.finalize()