import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

/**
 * The Baselines lesson.
 *
 * Four hundred students and six recorded columns, of which exactly one has
 * anything to do with the outcome. That is the ordinary case, not a trick: real
 * tables are mostly columns somebody collected because collecting them was
 * easy.
 *
 * Every contestant below is trained on the same 250 students and scored on the
 * same 150, so the comparison is like for like. Two of the results are meant to
 * be uncomfortable.
 *
 * Seeded at module scope. See @/lib/ml/random.
 */

const random = mulberry32(20260907);

export const FEATURE_NAMES = [
  "hours revised",
  "hours slept",
  "commute minutes",
  "siblings",
  "height in cm",
  "shoe size",
] as const;

export type Row = {
  values: readonly number[];
  passed: boolean;
};

export const TOTAL = 400;

export const ROWS: readonly Row[] = Array.from({ length: TOTAL }, () => {
  const hours = normalish(random, 7.5, 3.4, { min: 0, max: 18 });
  const slept = normalish(random, 7, 1.1, { min: 3.5, max: 10 });
  const commute = normalish(random, 34, 17, { min: 2, max: 95 });
  const siblings = Math.floor(random() * 4);
  const height = normalish(random, 170, 9.5, { min: 148, max: 197 });
  const shoe = normalish(random, 8.5, 1.8, { min: 3, max: 14 });

  // Only `hours` is connected to the outcome. Everything else is furniture.
  const passed = hours * 0.62 + normalish(random, 0, 1.35) > 5.1;

  return { values: [hours, slept, commute, siblings, height, shoe], passed };
});

export const PASS_RATE = ROWS.filter((r) => r.passed).length / TOTAL;

const ORDER = shuffled(
  ROWS.map((_, i) => i),
  mulberry32(20260908),
);
const TEST_SET = new Set(ORDER.slice(0, 150));

export const TRAIN: readonly Row[] = ROWS.filter((_, i) => !TEST_SET.has(i));
export const TEST: readonly Row[] = ROWS.filter((_, i) => TEST_SET.has(i));

const DIMENSIONS = FEATURE_NAMES.length;

function accuracyOf(predict: (row: Row) => boolean): number {
  return TEST.filter((row) => predict(row) === row.passed).length / TEST.length;
}

/* -------------------------------------------------------------------------- */
/* The baselines                                                               */
/* -------------------------------------------------------------------------- */

const TRAIN_MAJORITY = TRAIN.filter((r) => r.passed).length * 2 >= TRAIN.length;

/** Say the commoner answer, every time, forever. */
const MAJORITY_ACCURACY = accuracyOf(() => TRAIN_MAJORITY);

/**
 * Guess at random, in the proportions the training set showed. Drawn once from
 * a fixed seed so the number never moves between renders.
 */
const STRATIFIED_ACCURACY = (() => {
  const rate = TRAIN.filter((r) => r.passed).length / TRAIN.length;
  const guesser = mulberry32(20260909);
  const draws = TEST.map(() => guesser() < rate);
  return TEST.filter((row, i) => draws[i] === row.passed).length / TEST.length;
})();

/** One feature, one threshold, chosen by trying every combination. */
interface Stump {
  feature: number;
  threshold: number;
  above: boolean;
  trainAccuracy: number;
}

const STUMP: Stump = (() => {
  let best: Stump = { feature: 0, threshold: 0, above: true, trainAccuracy: 0 };
  for (let d = 0; d < DIMENSIONS; d += 1) {
    const values = Array.from(new Set(TRAIN.map((r) => r.values[d]))).sort((a, b) => a - b);
    for (let i = 1; i < values.length; i += 1) {
      const threshold = (values[i - 1] + values[i]) / 2;
      for (const above of [true, false]) {
        const correct = TRAIN.filter(
          (r) => (above ? r.values[d] >= threshold : r.values[d] < threshold) === r.passed,
        ).length;
        const trainAccuracy = correct / TRAIN.length;
        if (trainAccuracy > best.trainAccuracy) {
          best = { feature: d, threshold, above, trainAccuracy };
        }
      }
    }
  }
  return best;
})();

const STUMP_ACCURACY = accuracyOf((row) =>
  STUMP.above ? row.values[STUMP.feature] >= STUMP.threshold : row.values[STUMP.feature] < STUMP.threshold,
);

/* -------------------------------------------------------------------------- */
/* The real models                                                             */
/* -------------------------------------------------------------------------- */

const MEANS = Array.from(
  { length: DIMENSIONS },
  (_, d) => TRAIN.reduce((a, r) => a + r.values[d], 0) / TRAIN.length,
);
const SPREADS = Array.from({ length: DIMENSIONS }, (_, d) => {
  const v = TRAIN.reduce((a, r) => a + (r.values[d] - MEANS[d]) ** 2, 0) / TRAIN.length;
  return Math.sqrt(v) || 1;
});

function scaled(row: Row): number[] {
  return row.values.map((v, d) => (v - MEANS[d]) / SPREADS[d]);
}

const TRAIN_SCALED = TRAIN.map(scaled);

/** k=5 neighbours over all six scaled features — including the five useless ones. */
const KNN_ACCURACY = accuracyOf((row) => {
  const q = scaled(row);
  const near = TRAIN_SCALED.map((t, i) => {
    let sum = 0;
    for (let d = 0; d < DIMENSIONS; d += 1) sum += (q[d] - t[d]) ** 2;
    return { sum, passed: TRAIN[i].passed };
  })
    .sort((a, b) => a.sum - b.sum)
    .slice(0, 5);
  return near.filter((n) => n.passed).length >= 3;
});

/** A depth-4 greedy tree, free to use any of the six columns. */
interface Node {
  feature?: number;
  threshold?: number;
  left?: Node;
  right?: Node;
  prediction: boolean;
}

function gini(rows: readonly Row[]): number {
  if (rows.length === 0) return 0;
  const p = rows.filter((r) => r.passed).length / rows.length;
  return 2 * p * (1 - p);
}

function grow(rows: readonly Row[], depth: number): Node {
  const prediction = rows.filter((r) => r.passed).length * 2 >= rows.length;
  const node: Node = { prediction };
  if (depth >= 4 || rows.length < 6 || gini(rows) === 0) return node;

  let best: { feature: number; threshold: number; gain: number } | null = null;
  const parent = gini(rows);
  for (let d = 0; d < DIMENSIONS; d += 1) {
    const values = Array.from(new Set(rows.map((r) => r.values[d]))).sort((a, b) => a - b);
    for (let i = 1; i < values.length; i += 1) {
      const threshold = (values[i - 1] + values[i]) / 2;
      const left = rows.filter((r) => r.values[d] < threshold);
      const right = rows.filter((r) => r.values[d] >= threshold);
      if (left.length === 0 || right.length === 0) continue;
      const gain = parent - (left.length * gini(left) + right.length * gini(right)) / rows.length;
      if (!best || gain > best.gain) best = { feature: d, threshold, gain };
    }
  }
  if (!best || best.gain <= 1e-9) return node;

  node.feature = best.feature;
  node.threshold = best.threshold;
  node.left = grow(
    rows.filter((r) => r.values[best!.feature] < best!.threshold),
    depth + 1,
  );
  node.right = grow(
    rows.filter((r) => r.values[best!.feature] >= best!.threshold),
    depth + 1,
  );
  return node;
}

const TREE = grow(TRAIN, 0);

const TREE_ACCURACY = accuracyOf((row) => {
  let node = TREE;
  while (node.feature !== undefined && node.left && node.right) {
    node = row.values[node.feature] < node.threshold! ? node.left : node.right;
  }
  return node.prediction;
});

/* -------------------------------------------------------------------------- */
/* The race                                                                    */
/* -------------------------------------------------------------------------- */

export interface Contestant {
  key: string;
  name: string;
  kind: "baseline" | "model";
  description: string;
  accuracy: number;
  /** One line of code, near enough. */
  code: string;
}

export const CONTESTANTS: readonly Contestant[] = [
  {
    key: "majority",
    name: "Always say the commoner answer",
    kind: "baseline",
    description:
      "Ignore every column. Look at which outcome was more frequent in training and say that, every single time.",
    accuracy: MAJORITY_ACCURACY,
    code: `predict = lambda row: ${TRAIN_MAJORITY ? "True" : "False"}`,
  },
  {
    key: "stratified",
    name: "Guess at the right rate",
    kind: "baseline",
    description:
      "Ignore every column, but guess randomly in the proportion the training set showed. Worse than the majority rule, always — and worth running once so you can see that for yourself.",
    accuracy: STRATIFIED_ACCURACY,
    code: "predict = lambda row: random() < pass_rate",
  },
  {
    key: "stump",
    name: "One rule on one column",
    kind: "baseline",
    description: `Try every column at every cut-off and keep the single best rule. Here that is "${FEATURE_NAMES[STUMP.feature]} ${STUMP.above ? "at or above" : "below"} ${STUMP.threshold.toFixed(1)}".`,
    accuracy: STUMP_ACCURACY,
    code: `predict = lambda row: row["${FEATURE_NAMES[STUMP.feature]}"] ${STUMP.above ? ">=" : "<"} ${STUMP.threshold.toFixed(1)}`,
  },
  {
    key: "knn",
    name: "k-Nearest Neighbours",
    kind: "model",
    description:
      "Five nearest neighbours over all six scaled features. Distance treats every column as equally important, and five of the six are noise.",
    accuracy: KNN_ACCURACY,
    code: "KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)",
  },
  {
    key: "tree",
    name: "Decision tree, depth 4",
    kind: "model",
    description:
      "A greedy tree, free to use any of the six columns and to ask up to four questions. It chooses which columns matter, which is exactly what the neighbour vote cannot do.",
    accuracy: TREE_ACCURACY,
    code: "DecisionTreeClassifier(max_depth=4).fit(X_train, y_train)",
  },
];

export const BEST_BASELINE = CONTESTANTS.filter((c) => c.kind === "baseline").reduce((a, b) =>
  b.accuracy > a.accuracy ? b : a,
);
export const BEST_OVERALL = CONTESTANTS.reduce((a, b) => (b.accuracy > a.accuracy ? b : a));
export const LOSERS = CONTESTANTS.filter(
  (c) => c.kind === "model" && c.accuracy <= BEST_BASELINE.accuracy,
);
export const STUMP_RULE = STUMP;
export const STUMP_FEATURE_NAME = FEATURE_NAMES[STUMP.feature];
