from typing import List, Set

from beanmachine.ppl.inference.base_inference import BaseInference
from beanmachine.ppl.inference.proposer.base_proposer import (
    BaseProposer,
)
from beanmachine.ppl.inference.proposer.hmc_proposer import (
    HMCProposer,
)
from beanmachine.ppl.inference.proposer.nuts_proposer import (
    NUTSProposer,
)
from beanmachine.ppl.model.rv_identifier import RVIdentifier
from beanmachine.ppl.world import World


class GlobalHamiltonianMonteCarlo(BaseInference):
    """
    Global (multi-site) Hamiltonian Monte Carlo [1] sampler. This global sampler blocks all of the
    target random_variables in the World together and proposes them jointly.

    [1] Neal, Radford. `MCMC Using Hamiltonian Dynamics`.

    Args:
        trajectory_length (float): Length of single trajectory.
        initial_step_size (float): Defaults to 1.0.
        adapt_step_size (bool): Whether to adapt the step size, Defaults to True,
        adapt_mass_matrix (bool): Whether to adapt the mass matrix. Defaults to True,
        target_accept_prob (float): Target accept prob. Increasing this value would lead to smaller step size. Defaults to 0.8.
    """

    def __init__(
        self,
        trajectory_length: float,
        initial_step_size: float = 1.0,
        adapt_step_size: bool = True,
        adapt_mass_matrix: bool = True,
        target_accept_prob: float = 0.8,
    ):
        self.trajectory_length = trajectory_length
        self.initial_step_size = initial_step_size
        self.adapt_step_size = adapt_step_size
        self.adapt_mass_matrix = adapt_mass_matrix
        self.target_accept_prob = target_accept_prob
        self._proposer = None

    def get_proposers(
        self,
        world: World,
        target_rvs: Set[RVIdentifier],
        num_adaptive_sample: int,
    ) -> List[BaseProposer]:
        if self._proposer is None:
            self._proposer = HMCProposer(
                world,
                target_rvs,
                num_adaptive_sample,
                self.trajectory_length,
                self.initial_step_size,
                self.adapt_step_size,
                self.adapt_mass_matrix,
                self.target_accept_prob,
            )
        return [self._proposer]


class GlobalNoUTurnSampler(BaseInference):
    """
    Global No U-turn sampler [1]. This sampler blocks multiple variables together in the World
    and samples them jointly. This sampler adaptively sets the hyperparameters of the HMC kernel.

    [1] Hoffman and Gelman. `The No-U-turn sampler: adaptively setting path lengths in Hamiltonian Monte Carlo`.
    [2] Betancourt, Michael. `A Conceptual Introduction to Hamiltonian Monte Carlo`.

    Args:
        max_tree_depth (int): Maximum tree depth, defaults to 10.
        max_delta_energy (float): Maximum delta energy (for numerical stability), defaults to 1000.
        initial_step_size (float): Defaults to 1.0.
        adapt_step_size (bool): Whether to adapt step size with Dual averaging as suggested in [1], defaults to True.
        adapt_mass_matrix (bool) Whether to adapt mass matrix using Welford Scheme, defaults to True.
        multinomial_sampling (bool): Whether to use multinomial sampling as in [2], defaults to True.
        target_accept_prob (float): Target accept probability. Increasing this would lead to smaller step size. Defaults to 0.8.
    """

    def __init__(
        self,
        max_tree_depth: int = 10,
        max_delta_energy: float = 1000.0,
        initial_step_size: float = 1.0,
        adapt_step_size: bool = True,
        adapt_mass_matrix: bool = True,
        multinomial_sampling: bool = True,
        target_accept_prob: float = 0.8,
    ):
        self.max_tree_depth = max_tree_depth
        self.max_delta_energy = max_delta_energy
        self.initial_step_size = initial_step_size
        self.adapt_step_size = adapt_step_size
        self.adapt_mass_matrix = adapt_mass_matrix
        self.multinomial_sampling = multinomial_sampling
        self.target_accept_prob = target_accept_prob
        self._proposer = None

    def get_proposers(
        self,
        world: World,
        target_rvs: Set[RVIdentifier],
        num_adaptive_sample: int,
    ) -> List[BaseProposer]:
        if self._proposer is None:
            self._proposer = NUTSProposer(
                world,
                target_rvs,
                num_adaptive_sample,
                self.max_tree_depth,
                self.max_delta_energy,
                self.initial_step_size,
                self.adapt_step_size,
                self.adapt_mass_matrix,
                self.multinomial_sampling,
                self.target_accept_prob,
            )
        return [self._proposer]
