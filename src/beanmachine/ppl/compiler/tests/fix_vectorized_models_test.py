# Copyright (c) Facebook, Inc. and its affiliates.
import unittest

import beanmachine.ppl as bm
from beanmachine.ppl.inference import BMGInference
from torch import tensor
from torch.distributions import Bernoulli, Beta


@bm.random_variable
def beta(n):
    return Beta(2.0, 2.0)


@bm.random_variable
def flip_beta():
    return Bernoulli(tensor([beta(0), beta(1)]))


@bm.random_variable
def flip_const():
    return Bernoulli(tensor([0.25, 0.75]))


@bm.random_variable
def flip_const_4():
    return Bernoulli(tensor([0.25, 0.75, 0.5, 0.5]))


@bm.random_variable
def flip_const_2_3():
    return Bernoulli(tensor([[0.25, 0.75, 0.5], [0.125, 0.875, 0.625]]))


class FixVectorizedModelsTest(unittest.TestCase):
    def test_fix_vectorized_models_1(self) -> None:
        self.maxDiff = None
        observations = {flip_beta(): tensor([0.0, 1.0])}
        queries = [flip_beta(), flip_const()]

        observed = BMGInference().to_dot(queries, observations, after_transform=False)

        # The model before the rewrite:

        expected = """
digraph "graph" {
  N00[label=2.0];
  N01[label=Beta];
  N02[label=Sample];
  N03[label=Sample];
  N04[label=Tensor];
  N05[label=Bernoulli];
  N06[label=Sample];
  N07[label="Observation tensor([0., 1.])"];
  N08[label=Query];
  N09[label="[0.25,0.75]"];
  N10[label=Bernoulli];
  N11[label=Sample];
  N12[label=Query];
  N00 -> N01;
  N00 -> N01;
  N01 -> N02;
  N01 -> N03;
  N02 -> N04;
  N03 -> N04;
  N04 -> N05;
  N05 -> N06;
  N06 -> N07;
  N06 -> N08;
  N09 -> N10;
  N10 -> N11;
  N11 -> N12;
}
"""
        self.assertEqual(expected.strip(), observed.strip())

        # After:

        observed = BMGInference().to_dot(queries, observations, after_transform=True)
        expected = """
digraph "graph" {
  N00[label=2.0];
  N01[label=Beta];
  N02[label=Sample];
  N03[label=Sample];
  N04[label=2];
  N05[label=1];
  N06[label=Bernoulli];
  N07[label=Sample];
  N08[label=Bernoulli];
  N09[label=Sample];
  N10[label=ToMatrix];
  N11[label=Query];
  N12[label=0.25];
  N13[label=Bernoulli];
  N14[label=Sample];
  N15[label=0.75];
  N16[label=Bernoulli];
  N17[label=Sample];
  N18[label=ToMatrix];
  N19[label=Query];
  N20[label="Observation False"];
  N21[label="Observation True"];
  N00 -> N01;
  N00 -> N01;
  N01 -> N02;
  N01 -> N03;
  N02 -> N06;
  N03 -> N08;
  N04 -> N10;
  N04 -> N18;
  N05 -> N10;
  N05 -> N18;
  N06 -> N07;
  N07 -> N10;
  N07 -> N20;
  N08 -> N09;
  N09 -> N10;
  N09 -> N21;
  N10 -> N11;
  N12 -> N13;
  N13 -> N14;
  N14 -> N18;
  N15 -> N16;
  N16 -> N17;
  N17 -> N18;
  N18 -> N19;
}
"""
        self.assertEqual(expected.strip(), observed.strip())

    def test_fix_vectorized_models_2(self) -> None:
        self.maxDiff = None
        observations = {flip_const_4(): tensor([0.0, 1.0, 0.0, 1.0])}
        queries = [flip_const_4()]

        observed = BMGInference().to_dot(queries, observations, after_transform=False)

        # The model before the rewrite:

        expected = """
digraph "graph" {
  N0[label="[0.25,0.75,0.5,0.5]"];
  N1[label=Bernoulli];
  N2[label=Sample];
  N3[label="Observation tensor([0., 1., 0., 1.])"];
  N4[label=Query];
  N0 -> N1;
  N1 -> N2;
  N2 -> N3;
  N2 -> N4;
}
"""
        self.assertEqual(expected.strip(), observed.strip())

        # After:

        # Note that due to the order in which we do the rewriting we
        # end up with a not-deduplicated Bernoulli(0.5) node here, which
        # is slightly unfortunate but probably not worth fixing right now.

        observed = BMGInference().to_dot(queries, observations, after_transform=True)
        expected = """
digraph "graph" {
  N00[label=4];
  N01[label=1];
  N02[label=0.25];
  N03[label=Bernoulli];
  N04[label=Sample];
  N05[label=0.75];
  N06[label=Bernoulli];
  N07[label=Sample];
  N08[label=0.5];
  N09[label=Bernoulli];
  N10[label=Sample];
  N11[label=Bernoulli];
  N12[label=Sample];
  N13[label=ToMatrix];
  N14[label=Query];
  N15[label="Observation False"];
  N16[label="Observation True"];
  N17[label="Observation False"];
  N18[label="Observation True"];
  N00 -> N13;
  N01 -> N13;
  N02 -> N03;
  N03 -> N04;
  N04 -> N13;
  N04 -> N15;
  N05 -> N06;
  N06 -> N07;
  N07 -> N13;
  N07 -> N16;
  N08 -> N09;
  N08 -> N11;
  N09 -> N10;
  N10 -> N13;
  N10 -> N17;
  N11 -> N12;
  N12 -> N13;
  N12 -> N18;
  N13 -> N14;
}
"""
        self.assertEqual(expected.strip(), observed.strip())

    def test_fix_vectorized_models_3(self) -> None:
        self.maxDiff = None
        observations = {flip_const_2_3(): tensor([[0.0, 0.0, 0.0], [1.0, 1.0, 1.0]])}
        queries = [flip_const_2_3()]

        observed = BMGInference().to_dot(queries, observations, after_transform=False)

        # The model before the rewrite:

        expected = """
digraph "graph" {
  N0[label="[[0.25,0.75,0.5],\\\\n[0.125,0.875,0.625]]"];
  N1[label=Bernoulli];
  N2[label=Sample];
  N3[label="Observation tensor([[0., 0., 0.],\\n        [1., 1., 1.]])"];
  N4[label=Query];
  N0 -> N1;
  N1 -> N2;
  N2 -> N3;
  N2 -> N4;
}
    """
        self.assertEqual(expected.strip(), observed.strip())

        # After:

        observed = BMGInference().to_dot(queries, observations, after_transform=True)
        expected = """
digraph "graph" {
  N00[label=3];
  N01[label=2];
  N02[label=0.25];
  N03[label=Bernoulli];
  N04[label=Sample];
  N05[label=0.75];
  N06[label=Bernoulli];
  N07[label=Sample];
  N08[label=0.5];
  N09[label=Bernoulli];
  N10[label=Sample];
  N11[label=0.125];
  N12[label=Bernoulli];
  N13[label=Sample];
  N14[label=0.875];
  N15[label=Bernoulli];
  N16[label=Sample];
  N17[label=0.625];
  N18[label=Bernoulli];
  N19[label=Sample];
  N20[label=ToMatrix];
  N21[label=Query];
  N22[label="Observation False"];
  N23[label="Observation False"];
  N24[label="Observation False"];
  N25[label="Observation True"];
  N26[label="Observation True"];
  N27[label="Observation True"];
  N00 -> N20;
  N01 -> N20;
  N02 -> N03;
  N03 -> N04;
  N04 -> N20;
  N04 -> N22;
  N05 -> N06;
  N06 -> N07;
  N07 -> N20;
  N07 -> N23;
  N08 -> N09;
  N09 -> N10;
  N10 -> N20;
  N10 -> N24;
  N11 -> N12;
  N12 -> N13;
  N13 -> N20;
  N13 -> N25;
  N14 -> N15;
  N15 -> N16;
  N16 -> N20;
  N16 -> N26;
  N17 -> N18;
  N18 -> N19;
  N19 -> N20;
  N19 -> N27;
  N20 -> N21;
}
    """
        self.assertEqual(expected.strip(), observed.strip())