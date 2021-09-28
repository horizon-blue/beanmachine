#include "beanmachine/graph/global/global_mh.h"
#include "beanmachine/graph/global/proposer/random_walk_proposer.h"

namespace beanmachine {
namespace graph {

RandomWalkMH::RandomWalkMH(Graph& g, double step_size) : GlobalMH(g) {
  proposer =
      std::make_unique<RandomWalkProposer>(RandomWalkProposer(step_size));
}

} // namespace graph
} // namespace beanmachine
