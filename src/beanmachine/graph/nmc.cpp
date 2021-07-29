// Copyright (c) Facebook, Inc. and its affiliates.
#include <algorithm>
#include <cmath>
#include <random>
#include <string>
#include <vector>

#include "beanmachine/graph/distribution/distribution.h"
#include "beanmachine/graph/graph.h"
#include "beanmachine/graph/nmc.h"
#include "beanmachine/graph/operator/stochasticop.h"
#include "beanmachine/graph/profiler.h"
#include "beanmachine/graph/proposer/default_initializer.h"
#include "beanmachine/graph/proposer/proposer.h"
#include "beanmachine/graph/stepper/nmc_dirichlet_beta_single_site_stepper.h"
#include "beanmachine/graph/stepper/nmc_dirichlet_gamma_single_site_stepper.h"
#include "beanmachine/graph/stepper/nmc_scalar_single_site_stepper.h"
#include "beanmachine/graph/stepper/nmc_single_site_stepper.h"
#include "beanmachine/graph/util.h"

namespace beanmachine {
namespace graph {

NMC::NMC(Graph* g, uint seed)
    : g(g),
      gen(seed),
      // Note: the order of steppers below is important
      // because DirichletGamma is also application to
      // nodes to which Beta is applicable,
      // but we want to give priority to Beta in those cases.
      single_site_steppers{
          new NMCScalarSingleSiteStepper(g, this),
          new NMCDirichletBetaSingleSiteStepper(g, this),
          new NMCDirichletGammaSingleSiteStepper(g, this)} {}

void NMC::infer(uint num_samples, InferConfig infer_config) {
  g->pd_begin(ProfilerEvent::NMC_INFER);
  initialize();
  collect_samples(num_samples, infer_config);
  g->pd_finish(ProfilerEvent::NMC_INFER);
}

// The initialization phase precomputes the vectors we are going to
// need during inference, and verifies that the NMC algorithm can
// compute gradients of every node we need to.
void NMC::initialize() {
  g->pd_begin(ProfilerEvent::NMC_INFER_INITIALIZE);
  collect_node_ptrs();
  compute_support();
  ensure_continuous();
  compute_initial_values();
  compute_affected_nodes();
  old_values = std::vector<NodeValue>(g->nodes.size());
  g->pd_finish(ProfilerEvent::NMC_INFER_INITIALIZE);
}

void NMC::collect_node_ptrs() {
  for (uint node_id = 0; node_id < g->nodes.size(); node_id++) {
    node_ptrs.push_back(g->nodes[node_id].get());
  }
}

void NMC::compute_support() {
  supp_ids = g->compute_support();
  for (uint node_id : supp_ids) {
    supp.push_back(node_ptrs[node_id]);
  }
  for (Node* node : supp) {
    bool node_is_not_observed =
        g->observed.find(node->index) == g->observed.end();
    if (node_is_not_observed) {
      unobserved_supp.push_back(node);
      if (node->is_stochastic()) {
        unobserved_sto_supp.push_back(node);
      }
    }
  }
}

bool NMC::is_not_supported(Node* node) { // specific to NMC
  return node->value.type.variable_type != VariableType::COL_SIMPLEX_MATRIX and
      node->value.type != AtomicType::PROBABILITY and
      node->value.type != AtomicType::REAL and
      node->value.type != AtomicType::POS_REAL and
      node->value.type != AtomicType::BOOLEAN;
}

void NMC::ensure_continuous() {
  for (Node* node : unobserved_sto_supp) {
    if (is_not_supported(node)) {
      throw std::runtime_error(
          "NMC only supported on bool/probability/real/positive -- failing on node " +
          std::to_string(node->index));
    }
  }
}

// We can now compute the initial state of the graph. Observed nodes
// will have values given by the observation, so we can ignore those.
// Unobserved stochastic nodes are assigned a value by the uniform
// initializer. Deterministic nodes are computed from their inputs.
// Note that we only need a single pass because parent nodes always have
// indices less than those of their children, and unobserved_supp
// respects index order.
void NMC::compute_initial_values() {
  for (Node* unobs_node : unobserved_supp) {
    if (unobs_node->is_stochastic()) {
      proposer::default_initializer(gen, unobs_node);
    } else { // non-stochastic operator node, so just evaluate
      unobs_node->eval(gen);
    }
  }
}

// For every unobserved stochastic node in the graph, we will need to
// repeatedly know the set of immediate stochastic descendants
// and intervening deterministic nodes.
// Because this can be expensive, we compute those sets once and cache them.
void NMC::compute_affected_nodes() {
  for (Node* node : unobserved_sto_supp) {
    std::vector<uint> det_node_ids;
    std::vector<uint> sto_node_ids;
    std::vector<Node*> det_nodes;
    std::vector<Node*> sto_nodes;
    std::tie(det_node_ids, sto_node_ids) =
        g->compute_affected_nodes(node->index, supp_ids);
    for (uint id : det_node_ids) {
      det_nodes.push_back(node_ptrs[id]);
    }
    for (uint id : sto_node_ids) {
      sto_nodes.push_back(node_ptrs[id]);
    }
    det_affected_nodes.push_back(det_nodes);
    sto_affected_nodes.push_back(sto_nodes);
    if (g->_collect_performance_data) {
      g->profiler_data.det_supp_count[node->index] = det_nodes.size();
    }
  }
}

void NMC::generate_sample() {
  for (uint i = 0; i < unobserved_sto_supp.size(); ++i) {
    auto tgt_node = unobserved_sto_supp[i];
    auto stepper = find_applicable_stepper(tgt_node);
    stepper->step(tgt_node, det_affected_nodes[i], sto_affected_nodes[i]);
  }
}

NMCSingleSiteStepper* NMC::find_applicable_stepper(Node* tgt_node) {
  auto applicable_stepper = std::find_if(
      single_site_steppers.begin(),
      single_site_steppers.end(),
      [tgt_node](auto st) { return st->is_applicable_to(tgt_node); });

  if (applicable_stepper == single_site_steppers.end()) {
    throw std::runtime_error(
        "No single-site stepper applies to node " +
        std::to_string(tgt_node->index));
  }

  return *applicable_stepper;
}

void NMC::collect_samples(uint num_samples, InferConfig infer_config) {
  g->pd_begin(ProfilerEvent::NMC_INFER_COLLECT_SAMPLES);
  for (uint snum = 0; snum < num_samples + infer_config.num_warmup; snum++) {
    generate_sample();
    if (infer_config.keep_warmup or snum >= infer_config.num_warmup) {
      collect_sample(infer_config);
    }
  }
  g->pd_finish(ProfilerEvent::NMC_INFER_COLLECT_SAMPLES);
}

void NMC::collect_sample(InferConfig infer_config) {
  g->pd_begin(ProfilerEvent::NMC_INFER_COLLECT_SAMPLE);
  if (infer_config.keep_log_prob) {
    g->collect_log_prob(g->_full_log_prob(supp));
  }
  g->collect_sample();
  g->pd_finish(ProfilerEvent::NMC_INFER_COLLECT_SAMPLE);
}

void NMC::save_old_values(const std::vector<Node*>& det_nodes) {
  g->pd_begin(ProfilerEvent::NMC_SAVE_OLD);
  for (Node* node : det_nodes) {
    old_values[node->index] = node->value;
  }
  g->pd_finish(ProfilerEvent::NMC_SAVE_OLD);
}

void NMC::restore_old_values(const std::vector<Node*>& det_nodes) {
  g->pd_begin(ProfilerEvent::NMC_RESTORE_OLD);
  for (Node* node : det_nodes) {
    node->value = old_values[node->index];
  }
  g->pd_finish(ProfilerEvent::NMC_RESTORE_OLD);
}

void NMC::compute_gradients(const std::vector<Node*>& det_nodes) {
  g->pd_begin(ProfilerEvent::NMC_COMPUTE_GRADS);
  for (Node* node : det_nodes) {
    node->compute_gradients();
  }
  g->pd_finish(ProfilerEvent::NMC_COMPUTE_GRADS);
}

void NMC::eval(const std::vector<Node*>& det_nodes) {
  g->pd_begin(ProfilerEvent::NMC_EVAL);
  for (Node* node : det_nodes) {
    node->eval(gen);
  }
  g->pd_finish(ProfilerEvent::NMC_EVAL);
}

void NMC::clear_gradients(const std::vector<Node*>& det_nodes) {
  g->pd_begin(ProfilerEvent::NMC_CLEAR_GRADS);
  for (Node* node : det_nodes) {
    node->grad1 = 0;
    node->grad2 = 0;
  }
  g->pd_finish(ProfilerEvent::NMC_CLEAR_GRADS);
}

// Computes the log probability with respect to a given
// set of stochastic nodes.
double NMC::compute_log_prob_of(const std::vector<Node*>& sto_nodes) {
  double log_prob = 0;
  for (Node* node : sto_nodes) {
    log_prob += node->log_prob();
  }
  return log_prob;
}

NodeValue NMC::sample(const std::unique_ptr<proposer::Proposer>& prop) {
  g->pd_begin(ProfilerEvent::NMC_SAMPLE);
  NodeValue v = prop->sample(gen);
  g->pd_finish(ProfilerEvent::NMC_SAMPLE);
  return v;
}

NMC::~NMC() {
  for (auto single_site_stepper : single_site_steppers) {
    delete single_site_stepper;
  }
}

void Graph::nmc(uint num_samples, uint seed, InferConfig infer_config) {
  NMC(this, seed).infer(num_samples, infer_config);
}

} // namespace graph
} // namespace beanmachine
