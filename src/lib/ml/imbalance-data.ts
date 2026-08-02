import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

/**
 * The Class Imbalance lesson.
 *
 * Two thousand card transactions of which about one in fifty-five is fraud.
 * Every strategy below trains a real logistic regression by gradient descent
 * and is scored on the same held-back transactions, left at their natural rate
 * — because a test set you have rebalanced is a test set that answers a
 * question nobody asked.
 *
 * Seeded at module scope. See @/lib/ml/random.
 */

const random = mulberry32(20260901);

export interface Transaction {
  /** Pounds. Fraud skews larger, but the overlap is heavy. */
  amount: number;
  /** 0-23. Fraud skews toward the small hours. */
  hour: number;
  /** Whether the merchant is outside the cardholder's usual country. */
  foreign: boolean;
  fraud: boolean;
}

export const TOTAL = 4000;

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

export const TRANSACTIONS: readonly Transaction[] = Array.from({ length: TOTAL }, () => {
  const amount = Math.exp(normalish(random, 3.4, 1.15, { min: 0.5, max: 8.2 }));
  const hour = Math.floor(random() * 24);
  const foreign = random() < 0.11;

  // Genuine signal, deliberately weak — the classes overlap heavily, which is
  // what makes the rare class hard rather than merely rare.
  const nightness = hour >= 1 && hour <= 5 ? 1 : 0;
  const logit =
    -6.35 + Math.log(amount) * 0.42 + nightness * 1.15 + (foreign ? 1.35 : 0) + normalish(random, 0, 0.55);
  return { amount, hour, foreign, fraud: random() < sigmoid(logit) };
});

export const FRAUD_COUNT = TRANSACTIONS.filter((t) => t.fraud).length;
export const FRAUD_RATE = FRAUD_COUNT / TOTAL;

/* -------------------------------------------------------------------------- */
/* Split                                                                       */
/* -------------------------------------------------------------------------- */

const ORDER = shuffled(
  TRANSACTIONS.map((_, i) => i),
  mulberry32(20260902),
);
const TEST_SET = new Set(ORDER.slice(0, 1400));

export const TRAIN: readonly Transaction[] = TRANSACTIONS.filter((_, i) => !TEST_SET.has(i));
/** Left at the natural rate on purpose. Never rebalance a test set. */
export const TEST: readonly Transaction[] = TRANSACTIONS.filter((_, i) => TEST_SET.has(i));

export const TEST_FRAUD = TEST.filter((t) => t.fraud).length;

/* -------------------------------------------------------------------------- */
/* Logistic regression                                                         */
/* -------------------------------------------------------------------------- */

function features(t: Transaction): number[] {
  const nightness = t.hour >= 1 && t.hour <= 5 ? 1 : 0;
  return [Math.log(t.amount), nightness, t.foreign ? 1 : 0];
}

const DIMENSIONS = 3;
const EPOCHS = 600;
const LEARNING_RATE = 0.32;

const TRAIN_MATRIX = TRAIN.map(features);
const MEANS = Array.from(
  { length: DIMENSIONS },
  (_, d) => TRAIN_MATRIX.reduce((a, row) => a + row[d], 0) / TRAIN_MATRIX.length,
);
const SPREADS = Array.from({ length: DIMENSIONS }, (_, d) => {
  const v =
    TRAIN_MATRIX.reduce((a, row) => a + (row[d] - MEANS[d]) ** 2, 0) / TRAIN_MATRIX.length;
  return Math.sqrt(v) || 1;
});

function standardise(t: Transaction): number[] {
  return features(t).map((v, d) => (v - MEANS[d]) / SPREADS[d]);
}

const TRAIN_X = TRAIN.map(standardise);
const TEST_X = TEST.map(standardise);

/**
 * Full-batch gradient descent. `weights` lets a caller make each fraud count
 * for more than one transaction, which is how class weighting works.
 */
function fitLogistic(
  rows: readonly number[][],
  labels: readonly boolean[],
  weights: readonly number[],
): number[] {
  const w = new Array<number>(DIMENSIONS + 1).fill(0);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  for (let epoch = 0; epoch < EPOCHS; epoch += 1) {
    const grad = new Array<number>(DIMENSIONS + 1).fill(0);
    for (let i = 0; i < rows.length; i += 1) {
      let z = w[0];
      for (let d = 0; d < DIMENSIONS; d += 1) z += w[d + 1] * rows[i][d];
      const error = (sigmoid(z) - (labels[i] ? 1 : 0)) * weights[i];
      grad[0] += error;
      for (let d = 0; d < DIMENSIONS; d += 1) grad[d + 1] += error * rows[i][d];
    }
    for (let d = 0; d <= DIMENSIONS; d += 1) w[d] -= (LEARNING_RATE * grad[d]) / totalWeight;
  }
  return w;
}

function probability(w: readonly number[], x: readonly number[]): number {
  let z = w[0];
  for (let d = 0; d < DIMENSIONS; d += 1) z += w[d + 1] * x[d];
  return sigmoid(z);
}

/* -------------------------------------------------------------------------- */
/* Scoring                                                                     */
/* -------------------------------------------------------------------------- */

export interface Outcome {
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  accuracy: number;
  /** Null when the model flagged nothing — undefined, not zero. */
  precision: number | null;
  recall: number;
  f1: number | null;
  /** How many transactions a human would have to review. */
  flagged: number;
}

function score(w: readonly number[], threshold: number): Outcome {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;
  TEST.forEach((t, i) => {
    const flag = probability(w, TEST_X[i]) >= threshold;
    if (flag && t.fraud) tp += 1;
    else if (flag && !t.fraud) fp += 1;
    else if (!flag && t.fraud) fn += 1;
    else tn += 1;
  });
  const precision = tp + fp === 0 ? null : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 =
    precision === null || precision + recall === 0 ? null : (2 * precision * recall) / (precision + recall);
  return {
    truePositives: tp,
    falsePositives: fp,
    trueNegatives: tn,
    falseNegatives: fn,
    accuracy: (tp + tn) / TEST.length,
    precision,
    recall,
    f1,
    flagged: tp + fp,
  };
}

/* -------------------------------------------------------------------------- */
/* Strategies                                                                  */
/* -------------------------------------------------------------------------- */

const LABELS = TRAIN.map((t) => t.fraud);
const ONES = TRAIN.map(() => 1);

const PLAIN_W = fitLogistic(TRAIN_X, LABELS, ONES);

/** Keep every fraud, throw away most of the legitimate transactions. */
const UNDER = (() => {
  const fraudIndices = TRAIN.map((t, i) => (t.fraud ? i : -1)).filter((i) => i >= 0);
  const legitIndices = shuffled(
    TRAIN.map((t, i) => (t.fraud ? -1 : i)).filter((i) => i >= 0),
    mulberry32(20260903),
  ).slice(0, fraudIndices.length);
  const keep = [...fraudIndices, ...legitIndices];
  return fitLogistic(
    keep.map((i) => TRAIN_X[i]),
    keep.map((i) => LABELS[i]),
    keep.map(() => 1),
  );
})();

/** Copy each fraud until the classes are level. */
const OVER = (() => {
  const fraudIndices = TRAIN.map((t, i) => (t.fraud ? i : -1)).filter((i) => i >= 0);
  const legitCount = TRAIN.length - fraudIndices.length;
  const copies = Math.round(legitCount / fraudIndices.length);
  const indices = [...TRAIN.map((_, i) => i)];
  for (let c = 1; c < copies; c += 1) indices.push(...fraudIndices);
  return fitLogistic(
    indices.map((i) => TRAIN_X[i]),
    indices.map((i) => LABELS[i]),
    indices.map(() => 1),
  );
})();

/** Same rows, but a missed fraud costs as much as every legitimate row it hides behind. */
const WEIGHTED = (() => {
  const fraudCount = LABELS.filter(Boolean).length;
  const ratio = (TRAIN.length - fraudCount) / fraudCount;
  return fitLogistic(
    TRAIN_X,
    LABELS,
    LABELS.map((isFraud) => (isFraud ? ratio : 1)),
  );
})();

export interface Strategy {
  key: string;
  name: string;
  blurb: string;
  cost: string;
  outcome: Outcome;
}

export const STRATEGIES: readonly Strategy[] = [
  {
    key: "none",
    name: "Train on it as it is",
    blurb:
      "Fit the model on the raw data and take the usual 0.5 cut-off. The maths works perfectly and the result is a model that has noticed the cheapest available strategy.",
    cost: "Nothing, which is the problem.",
    outcome: score(PLAIN_W, 0.5),
  },
  {
    key: "under",
    name: "Throw away legitimate rows",
    blurb:
      "Undersampling: keep every fraud, discard legitimate transactions at random until the two classes are level.",
    cost: "You delete almost all of your data. Here that means learning the honest side of the problem from a few dozen rows.",
    outcome: score(UNDER, 0.5),
  },
  {
    key: "over",
    name: "Copy the frauds",
    blurb:
      "Oversampling: duplicate each fraud until the classes are level. No data is thrown away, and no information is added either.",
    cost: "The model sees the same handful of frauds many times over and grows confident about their particular quirks.",
    outcome: score(OVER, 0.5),
  },
  {
    key: "weight",
    name: "Make each fraud count for more",
    blurb:
      "Class weighting: the rows are untouched, but a mistake on a fraud is charged at the ratio between the classes.",
    cost: "Nothing is duplicated or deleted, so this is usually the first thing to reach for.",
    outcome: score(WEIGHTED, 0.5),
  },
];

export const BASELINE = STRATEGIES[0];
export const NEVER_FLAG_ACCURACY = 1 - TEST_FRAUD / TEST.length;

/* -------------------------------------------------------------------------- */
/* The same model, with the line moved instead                                 */
/* -------------------------------------------------------------------------- */

/**
 * The untouched model scored at forty-one thresholds. Every point a resampling
 * strategy reaches is somewhere on this curve, which is the argument of the
 * second half of the lesson: rebalancing moves the cut-off the expensive way.
 */
export const THRESHOLDS: readonly number[] = Array.from({ length: 41 }, (_, i) =>
  Number((0.002 * Math.pow(1.15, i)).toFixed(6)),
).filter((t) => t < 0.95);

export interface ThresholdPoint extends Outcome {
  threshold: number;
}

export const THRESHOLD_CURVE: readonly ThresholdPoint[] = THRESHOLDS.map((threshold) => ({
  threshold,
  ...score(PLAIN_W, threshold),
}));

/** Where the curve passes closest to the weighted model's recall. */
export const MATCHING_INDEX = THRESHOLD_CURVE.reduce(
  (best, point, i) =>
    Math.abs(point.recall - STRATEGIES[3].outcome.recall) <
    Math.abs(THRESHOLD_CURVE[best].recall - STRATEGIES[3].outcome.recall)
      ? i
      : best,
  0,
);

/** The threshold with the best F1 — a defensible default when nothing else guides you. */
export const BEST_F1_INDEX = THRESHOLD_CURVE.reduce(
  (best, point, i) => ((point.f1 ?? 0) > (THRESHOLD_CURVE[best].f1 ?? 0) ? i : best),
  0,
);
