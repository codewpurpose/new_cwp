/**
 * Seeded score distributions for the precision & recall lesson.
 *
 * The data is generated from a fixed seed so every reader sees the same chart
 * and the numbers quoted in the prose stay true.
 */

export interface ScoredExample {
  /** Model confidence that this example is positive, in [0, 1]. */
  score: number;
  /** Ground truth. */
  actual: "positive" | "negative";
}

export interface HistogramBin {
  /** Left edge of the bin, in [0, 1). */
  start: number;
  /** Right edge of the bin, in (0, 1]. */
  end: number;
  positives: number;
  negatives: number;
}

export interface ConfusionCounts {
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  trueNegatives: number;
}

export interface Metrics extends ConfusionCounts {
  /** Null when nothing was flagged — the ratio is undefined, not zero. */
  precision: number | null;
  recall: number | null;
  f1: number | null;
}

export const BIN_COUNT = 20;
export const BIN_WIDTH = 1 / BIN_COUNT;

/** Deterministic PRNG. Small, fast, and stable across environments. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Approximates a normal draw by summing uniforms (Irwin-Hall), then clamps to
 * [0, 1]. Good enough for a teaching visual and cheap to compute.
 *
 * The sum of n uniforms has mean n/2 and standard deviation sqrt(n/12), so
 * dividing the centred sum by that constant yields a unit-variance value and
 * `spread` is a true standard deviation.
 */
const IRWIN_HALL_N = 6;
const IRWIN_HALL_SD = Math.sqrt(IRWIN_HALL_N / 12);

function normalish(random: () => number, mean: number, spread: number): number {
  let sum = 0;
  for (let i = 0; i < IRWIN_HALL_N; i += 1) sum += random();
  const standard = (sum - IRWIN_HALL_N / 2) / IRWIN_HALL_SD;
  return Math.min(1, Math.max(0, mean + standard * spread));
}

function generate(): ScoredExample[] {
  const random = mulberry32(20260801);
  const examples: ScoredExample[] = [];

  // A deliberately imbalanced but still readable split. Enough overlap between
  // the two populations that no threshold gets both metrics near 1.
  for (let i = 0; i < 340; i += 1) {
    examples.push({ score: normalish(random, 0.33, 0.17), actual: "negative" });
  }
  for (let i = 0; i < 160; i += 1) {
    examples.push({ score: normalish(random, 0.67, 0.18), actual: "positive" });
  }

  return examples;
}

export const EXAMPLES: readonly ScoredExample[] = generate();

export const TOTAL_POSITIVES = EXAMPLES.filter((e) => e.actual === "positive").length;
export const TOTAL_NEGATIVES = EXAMPLES.length - TOTAL_POSITIVES;

export const HISTOGRAM: readonly HistogramBin[] = Array.from(
  { length: BIN_COUNT },
  (_, index) => {
    const start = index * BIN_WIDTH;
    const end = start + BIN_WIDTH;
    // The final bin owns score === 1 so no example is dropped.
    const inBin = EXAMPLES.filter((e) =>
      index === BIN_COUNT - 1 ? e.score >= start : e.score >= start && e.score < end,
    );
    return {
      start,
      end,
      positives: inBin.filter((e) => e.actual === "positive").length,
      negatives: inBin.filter((e) => e.actual === "negative").length,
    };
  },
);

export const MAX_BIN_POSITIVES = Math.max(...HISTOGRAM.map((b) => b.positives));
export const MAX_BIN_NEGATIVES = Math.max(...HISTOGRAM.map((b) => b.negatives));

/** Everything scoring at or above the threshold is predicted positive. */
export function countAt(threshold: number): ConfusionCounts {
  let truePositives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  let trueNegatives = 0;

  for (const example of EXAMPLES) {
    const flagged = example.score >= threshold;
    if (example.actual === "positive") {
      if (flagged) truePositives += 1;
      else falseNegatives += 1;
    } else if (flagged) {
      falsePositives += 1;
    } else {
      trueNegatives += 1;
    }
  }

  return { truePositives, falsePositives, falseNegatives, trueNegatives };
}

export function metricsAt(threshold: number): Metrics {
  const counts = countAt(threshold);
  const { truePositives, falsePositives, falseNegatives } = counts;

  const flagged = truePositives + falsePositives;
  const actual = truePositives + falseNegatives;

  const precision = flagged === 0 ? null : truePositives / flagged;
  const recall = actual === 0 ? null : truePositives / actual;

  const f1 =
    precision === null || recall === null || precision + recall === 0
      ? null
      : (2 * precision * recall) / (precision + recall);

  return { ...counts, precision, recall, f1 };
}

/** The threshold that maximises F1, used by the "Balanced" preset. */
export const BEST_F1_THRESHOLD = (() => {
  let best = 0;
  let bestScore = -1;
  for (let step = 0; step <= 100; step += 1) {
    const threshold = step / 100;
    const { f1 } = metricsAt(threshold);
    if (f1 !== null && f1 > bestScore) {
      bestScore = f1;
      best = threshold;
    }
  }
  return best;
})();
