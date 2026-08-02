import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

/**
 * Data for the Decision Trees lesson.
 *
 * Seventy-two student flats, each with a monthly rent and a distance from
 * campus, labelled by whether it was let within a week. The truth is a cheap
 * flat close in, plus a strip of very cheap flats at any distance — deliberately
 * rectangular, because axis-aligned rectangles are exactly what a tree can draw
 * and a straight line cannot.
 *
 * Every tree in this module is built at module scope from a fixed seed, so the
 * server and the browser produce byte-identical structures. See @/lib/ml/random.
 */

const random = mulberry32(20260803);

export interface Flat {
  /** Monthly rent in pounds. */
  rent: number;
  /** Distance from campus in kilometres. */
  distance: number;
  /** Whether it was let within a week. */
  letFast: boolean;
}

export const RENT_RANGE = [300, 1200] as const;
export const DISTANCE_RANGE = [0, 8] as const;

export const FEATURES = ["rent", "distance"] as const;
export type Feature = (typeof FEATURES)[number];

export const FEATURE_LABEL: Record<Feature, string> = {
  rent: "rent",
  distance: "distance",
};

export const ALL_FLATS: readonly Flat[] = Array.from({ length: 72 }, () => {
  const rent = normalish(random, 660, 195, { min: RENT_RANGE[0], max: RENT_RANGE[1] });
  const distance = normalish(random, 3.4, 1.9, { min: DISTANCE_RANGE[0], max: DISTANCE_RANGE[1] });
  const truth = (rent < 700 && distance < 3.5) || rent < 430;
  // Roughly one flat in eleven defies the rule, so no tree can reach 100%.
  const flip = random() < 0.09;
  return { rent, distance, letFast: flip ? !truth : truth };
});

/**
 * A fixed train/test split. Held out once, at module scope, so every depth in
 * the interactive is scored against the same flats.
 */
const ORDER = shuffled(
  ALL_FLATS.map((_, i) => i),
  mulberry32(90210),
);
const TEST_SIZE = 22;
const TEST_INDICES = new Set(ORDER.slice(0, TEST_SIZE));

export const TRAIN: readonly Flat[] = ALL_FLATS.filter((_, i) => !TEST_INDICES.has(i));
export const TEST: readonly Flat[] = ALL_FLATS.filter((_, i) => TEST_INDICES.has(i));
export const IS_TEST: readonly boolean[] = ALL_FLATS.map((_, i) => TEST_INDICES.has(i));

/* -------------------------------------------------------------------------- */
/* Impurity                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Gini impurity: the chance of mislabelling a random member of the group if you
 * guessed by the group's own class proportions. Zero when every flat agrees,
 * 0.5 when the group is an even mix.
 */
export function gini(flats: readonly Flat[]): number {
  if (flats.length === 0) return 0;
  const p = flats.filter((f) => f.letFast).length / flats.length;
  return 2 * p * (1 - p);
}

export function majority(flats: readonly Flat[]): boolean {
  const fast = flats.filter((f) => f.letFast).length;
  return fast * 2 >= flats.length;
}

function partition(flats: readonly Flat[], feature: Feature, threshold: number) {
  const left: Flat[] = [];
  const right: Flat[] = [];
  for (const flat of flats) (flat[feature] < threshold ? left : right).push(flat);
  return { left, right };
}

/** Impurity of the two children, weighted by how many flats fall into each. */
export function weightedImpurity(
  flats: readonly Flat[],
  feature: Feature,
  threshold: number,
): number {
  const { left, right } = partition(flats, feature, threshold);
  if (left.length === 0 || right.length === 0) return gini(flats);
  return (left.length * gini(left) + right.length * gini(right)) / flats.length;
}

/** Midpoints between neighbouring values — the only thresholds worth testing. */
function candidates(flats: readonly Flat[], feature: Feature): number[] {
  const values = Array.from(new Set(flats.map((f) => f[feature]))).sort((a, b) => a - b);
  const mids: number[] = [];
  for (let i = 1; i < values.length; i += 1) mids.push((values[i - 1] + values[i]) / 2);
  return mids;
}

export interface Split {
  feature: Feature;
  threshold: number;
  /** Parent impurity minus weighted child impurity. Higher is better. */
  gain: number;
}

export function bestSplit(flats: readonly Flat[]): Split | null {
  const parent = gini(flats);
  let best: Split | null = null;
  for (const feature of FEATURES) {
    for (const threshold of candidates(flats, feature)) {
      const gain = parent - weightedImpurity(flats, feature, threshold);
      if (!best || gain > best.gain) best = { feature, threshold, gain };
    }
  }
  return best && best.gain > 1e-9 ? best : null;
}

/* -------------------------------------------------------------------------- */
/* The tree                                                                    */
/* -------------------------------------------------------------------------- */

export interface TreeNode {
  /** Absent on a leaf. */
  split?: Split;
  left?: TreeNode;
  right?: TreeNode;
  prediction: boolean;
  count: number;
  impurity: number;
  depth: number;
}

const MIN_SAMPLES = 3;

function grow(flats: readonly Flat[], depth: number, maxDepth: number): TreeNode {
  const node: TreeNode = {
    prediction: majority(flats),
    count: flats.length,
    impurity: gini(flats),
    depth,
  };
  if (depth >= maxDepth || flats.length < MIN_SAMPLES || node.impurity === 0) return node;

  const split = bestSplit(flats);
  if (!split) return node;

  const { left, right } = partition(flats, split.feature, split.threshold);
  if (left.length === 0 || right.length === 0) return node;

  node.split = split;
  node.left = grow(left, depth + 1, maxDepth);
  node.right = grow(right, depth + 1, maxDepth);
  return node;
}

export function predict(node: TreeNode, flat: Pick<Flat, "rent" | "distance">): boolean {
  let current = node;
  while (current.split) {
    const goLeft = flat[current.split.feature] < current.split.threshold;
    const next = goLeft ? current.left : current.right;
    if (!next) break;
    current = next;
  }
  return current.prediction;
}

function accuracy(node: TreeNode, flats: readonly Flat[]): number {
  const correct = flats.filter((f) => predict(node, f) === f.letFast).length;
  return correct / flats.length;
}

/** Every leaf as a rectangle, for shading the plot. */
export interface Region {
  rentLow: number;
  rentHigh: number;
  distanceLow: number;
  distanceHigh: number;
  prediction: boolean;
  count: number;
  impurity: number;
}

function collect(node: TreeNode, bounds: Region, out: Region[]): void {
  if (!node.split || !node.left || !node.right) {
    out.push({ ...bounds, prediction: node.prediction, count: node.count, impurity: node.impurity });
    return;
  }
  const { feature, threshold } = node.split;
  if (feature === "rent") {
    collect(node.left, { ...bounds, rentHigh: threshold }, out);
    collect(node.right, { ...bounds, rentLow: threshold }, out);
  } else {
    collect(node.left, { ...bounds, distanceHigh: threshold }, out);
    collect(node.right, { ...bounds, distanceLow: threshold }, out);
  }
}

export const MAX_DEPTH = 7;
export const DEPTHS = Array.from({ length: MAX_DEPTH }, (_, i) => i + 1);

export interface DepthResult {
  depth: number;
  tree: TreeNode;
  regions: readonly Region[];
  trainAccuracy: number;
  testAccuracy: number;
  leaves: number;
}

function countLeaves(node: TreeNode): number {
  if (!node.split || !node.left || !node.right) return 1;
  return countLeaves(node.left) + countLeaves(node.right);
}

export const BY_DEPTH: readonly DepthResult[] = DEPTHS.map((depth) => {
  const tree = grow(TRAIN, 0, depth);
  const regions: Region[] = [];
  collect(
    tree,
    {
      rentLow: RENT_RANGE[0],
      rentHigh: RENT_RANGE[1],
      distanceLow: DISTANCE_RANGE[0],
      distanceHigh: DISTANCE_RANGE[1],
      prediction: tree.prediction,
      count: tree.count,
      impurity: tree.impurity,
    },
    regions,
  );
  return {
    depth,
    tree,
    regions,
    trainAccuracy: accuracy(tree, TRAIN),
    testAccuracy: accuracy(tree, TEST),
    leaves: countLeaves(tree),
  };
});

export const ROOT_IMPURITY = gini(TRAIN);
export const ROOT_SPLIT = bestSplit(TRAIN);

/** The impurity curve for every candidate threshold on each feature. */
export const CANDIDATE_CURVE: Record<Feature, readonly { threshold: number; impurity: number }[]> =
  {
    rent: candidates(TRAIN, "rent").map((threshold) => ({
      threshold,
      impurity: weightedImpurity(TRAIN, "rent", threshold),
    })),
    distance: candidates(TRAIN, "distance").map((threshold) => ({
      threshold,
      impurity: weightedImpurity(TRAIN, "distance", threshold),
    })),
  };

export const BEST_TEST = BY_DEPTH.reduce((best, d) => (d.testAccuracy > best.testAccuracy ? d : best));
