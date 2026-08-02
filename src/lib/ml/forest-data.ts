import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

/**
 * Data for the Random Forests lesson.
 *
 * A larger sample of the same rental market as the previous chapter — 240 flats
 * — but with the honest version of the truth. A flat lets quickly when rent plus
 * the cost of getting to campus is low, so the real boundary runs diagonally:
 * cheap-and-far and dear-and-close both work.
 *
 * That diagonal is the point. A tree can only cut straight across one axis, so
 * it is forced to approximate the line with a staircase, and a deep tree builds
 * that staircase out of individual flats. Averaging many differently-wrong trees
 * is what recovers the line.
 *
 * Every tree, bootstrap sample and feature choice comes from a fixed seed at
 * module scope, so the forest is byte-identical on the server and in the
 * browser. See @/lib/ml/random.
 */

const random = mulberry32(20260817);

export interface Flat {
  rent: number;
  distance: number;
  letFast: boolean;
}

export const RENT_RANGE = [300, 1200] as const;
export const DISTANCE_RANGE = [0, 8] as const;

const FEATURES = ["rent", "distance"] as const;
type Feature = (typeof FEATURES)[number];

/** Rent plus roughly £60 a month of travel per kilometre. */
export function trueScore(rent: number, distance: number): number {
  return rent + distance * 62;
}
export const TRUE_THRESHOLD = 900;
export const NOISE_RATE = 0.1;

export const ALL_FLATS: readonly Flat[] = Array.from({ length: 250 }, () => {
  const rent = normalish(random, 680, 210, { min: RENT_RANGE[0], max: RENT_RANGE[1] });
  const distance = normalish(random, 3.6, 2.1, { min: DISTANCE_RANGE[0], max: DISTANCE_RANGE[1] });
  const truth = trueScore(rent, distance) < TRUE_THRESHOLD;
  const flip = random() < NOISE_RATE;
  return { rent, distance, letFast: flip ? !truth : truth };
});

/**
 * Fifty flats to learn from and two hundred held back — the reverse of the usual
 * ratio, and deliberate. A small training set is exactly when a deep tree
 * overfits hardest, which is the effect this chapter is about, and a two
 * hundred flat test set makes the score stable enough to trust to half a point.
 */
const ORDER = shuffled(
  ALL_FLATS.map((_, i) => i),
  mulberry32(20260824),
);
const TEST_INDICES = new Set(ORDER.slice(0, 200));

export const TRAIN: readonly Flat[] = ALL_FLATS.filter((_, i) => !TEST_INDICES.has(i));
export const TEST: readonly Flat[] = ALL_FLATS.filter((_, i) => TEST_INDICES.has(i));

/* -------------------------------------------------------------------------- */
/* Trees                                                                       */
/* -------------------------------------------------------------------------- */

function gini(flats: readonly Flat[]): number {
  if (flats.length === 0) return 0;
  const p = flats.filter((f) => f.letFast).length / flats.length;
  return 2 * p * (1 - p);
}

function majority(flats: readonly Flat[]): boolean {
  return flats.filter((f) => f.letFast).length * 2 >= flats.length;
}

interface Node {
  feature?: Feature;
  threshold?: number;
  left?: Node;
  right?: Node;
  prediction: boolean;
}

function splitOn(flats: readonly Flat[], feature: Feature, threshold: number) {
  const left: Flat[] = [];
  const right: Flat[] = [];
  for (const flat of flats) (flat[feature] < threshold ? left : right).push(flat);
  return { left, right };
}

/** Best cut on one named feature. Returns null when no cut separates anything. */
function bestOn(flats: readonly Flat[], feature: Feature) {
  const values = Array.from(new Set(flats.map((f) => f[feature]))).sort((a, b) => a - b);
  const parent = gini(flats);
  let best: { feature: Feature; threshold: number; gain: number } | null = null;
  for (let i = 1; i < values.length; i += 1) {
    const threshold = (values[i - 1] + values[i]) / 2;
    const { left, right } = splitOn(flats, feature, threshold);
    if (left.length === 0 || right.length === 0) continue;
    const weighted = (left.length * gini(left) + right.length * gini(right)) / flats.length;
    const gain = parent - weighted;
    if (!best || gain > best.gain) best = { feature, threshold, gain };
  }
  return best && best.gain > 1e-9 ? best : null;
}

const MIN_SAMPLES = 2;

/**
 * `mtry` is how many features the node may consider. Passing 2 gives the plain
 * greedy tree from the previous chapter; passing 1 gives a forest member, which
 * must split on whichever single feature the coin handed it.
 */
function grow(flats: readonly Flat[], depth: number, maxDepth: number, mtry: number): Node {
  const node: Node = { prediction: majority(flats) };
  if (depth >= maxDepth || flats.length < MIN_SAMPLES || gini(flats) === 0) return node;

  let best: { feature: Feature; threshold: number; gain: number } | null = null;
  if (mtry >= FEATURES.length) {
    for (const feature of FEATURES) {
      const candidate = bestOn(flats, feature);
      if (candidate && (!best || candidate.gain > best.gain)) best = candidate;
    }
  } else {
    best = bestOn(flats, FEATURES[Math.floor(random() * FEATURES.length)]);
  }
  if (!best) return node;

  const { left, right } = splitOn(flats, best.feature, best.threshold);
  if (left.length === 0 || right.length === 0) return node;

  node.feature = best.feature;
  node.threshold = best.threshold;
  node.left = grow(left, depth + 1, maxDepth, mtry);
  node.right = grow(right, depth + 1, maxDepth, mtry);
  return node;
}

function ask(node: Node, rent: number, distance: number): boolean {
  let current = node;
  while (current.feature && current.left && current.right) {
    const value = current.feature === "rent" ? rent : distance;
    current = value < current.threshold! ? current.left : current.right;
  }
  return current.prediction;
}

function scoreTree(node: Node, flats: readonly Flat[]): number {
  return flats.filter((f) => ask(node, f.rent, f.distance) === f.letFast).length / flats.length;
}

/* -------------------------------------------------------------------------- */
/* The single tree the forest is racing                                        */
/* -------------------------------------------------------------------------- */

export const SINGLE_DEPTH = 14;
const SINGLE_TREE = grow(TRAIN, 0, SINGLE_DEPTH, FEATURES.length);

export const SINGLE_TRAIN = scoreTree(SINGLE_TREE, TRAIN);
export const SINGLE_TEST = scoreTree(SINGLE_TREE, TEST);

/** The best a single pruned tree manages, found by trying every depth. */
const PRUNED = Array.from({ length: SINGLE_DEPTH }, (_, i) => {
  const tree = grow(TRAIN, 0, i + 1, FEATURES.length);
  return { depth: i + 1, test: scoreTree(tree, TEST) };
});
export const BEST_PRUNED = PRUNED.reduce((best, p) => (p.test > best.test ? p : best));

/* -------------------------------------------------------------------------- */
/* The forest                                                                  */
/* -------------------------------------------------------------------------- */

export const TREE_COUNT = 120;
const FOREST_DEPTH = 14;

function bootstrap(flats: readonly Flat[]): Flat[] {
  return Array.from({ length: flats.length }, () => flats[Math.floor(random() * flats.length)]);
}

const TREES: readonly Node[] = Array.from({ length: TREE_COUNT }, () =>
  grow(bootstrap(TRAIN), 0, FOREST_DEPTH, 1),
);

/** The first tree, kept so the lesson can show one member on its own. */
export const FIRST_TREE_TEST = scoreTree(TREES[0], TEST);

export const TREE_STEPS = [1, 2, 3, 5, 8, 12, 20, 32, 50, 80, 120] as const;

export const GRID_COLUMNS = 60;
export const GRID_ROWS = 30;

const CELL_RENT = Array.from(
  { length: GRID_COLUMNS },
  (_, i) => RENT_RANGE[0] + ((i + 0.5) / GRID_COLUMNS) * (RENT_RANGE[1] - RENT_RANGE[0]),
);
const CELL_DISTANCE = Array.from(
  { length: GRID_ROWS },
  (_, j) => DISTANCE_RANGE[0] + ((j + 0.5) / GRID_ROWS) * (DISTANCE_RANGE[1] - DISTANCE_RANGE[0]),
);

export interface ForestStep {
  trees: number;
  /** Share of trees voting "lets within a week", one per grid cell. */
  grid: readonly number[];
  testAccuracy: number;
  trainAccuracy: number;
}

function accuracyFrom(votes: readonly number[], flats: readonly Flat[], trees: number): number {
  let correct = 0;
  flats.forEach((flat, i) => {
    if (votes[i] * 2 >= trees === flat.letFast) correct += 1;
  });
  return correct / flats.length;
}

function buildSteps(): ForestStep[] {
  const gridVotes = new Array<number>(GRID_COLUMNS * GRID_ROWS).fill(0);
  const testVotes = new Array<number>(TEST.length).fill(0);
  const trainVotes = new Array<number>(TRAIN.length).fill(0);
  const wanted = new Set<number>(TREE_STEPS);
  const steps: ForestStep[] = [];

  TREES.forEach((tree, t) => {
    for (let j = 0; j < GRID_ROWS; j += 1) {
      for (let i = 0; i < GRID_COLUMNS; i += 1) {
        if (ask(tree, CELL_RENT[i], CELL_DISTANCE[j])) gridVotes[j * GRID_COLUMNS + i] += 1;
      }
    }
    TEST.forEach((flat, i) => {
      if (ask(tree, flat.rent, flat.distance)) testVotes[i] += 1;
    });
    TRAIN.forEach((flat, i) => {
      if (ask(tree, flat.rent, flat.distance)) trainVotes[i] += 1;
    });

    const trees = t + 1;
    if (!wanted.has(trees)) return;
    steps.push({
      trees,
      grid: gridVotes.map((v) => v / trees),
      testAccuracy: accuracyFrom(testVotes, TEST, trees),
      trainAccuracy: accuracyFrom(trainVotes, TRAIN, trees),
    });
  });

  return steps;
}

export const FOREST_STEPS: readonly ForestStep[] = buildSteps();
export const FINAL_STEP = FOREST_STEPS[FOREST_STEPS.length - 1];
