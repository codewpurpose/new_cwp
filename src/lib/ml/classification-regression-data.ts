import { meanAbsoluteError } from "@/lib/ml/error";
import { fitLine } from "@/lib/ml/fit";
import { mulberry32, normalish } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

/**
 * Delivery time against distance, for the Classification vs Regression lesson.
 *
 * The control is how many buckets you chop the continuous target into. ONE
 * model and ONE dataset throughout — only the shape of the answer changes,
 * which is what makes the comparison fair.
 *
 * sigma = 7 minutes is the load-bearing choice: large enough that at 20 buckets
 * (3-minute bands) almost nothing lands in the right band, small enough that at
 * 2 buckets (30-minute bands) almost everything does. That contrast is the
 * lesson.
 */

export const DELIVERY_COUNT = 180;
export const MIN_KM = 0.5;
export const MAX_KM = 14;
export const MIN_BUCKETS = 2;
export const MAX_BUCKETS = 20;
/** The worked example the readouts phrase three different ways. */
export const EXAMPLE_KM = 9;

function generate(): Point[] {
  const random = mulberry32(20260904);
  return Array.from({ length: DELIVERY_COUNT }, () => {
    const km = MIN_KM + random() * (MAX_KM - MIN_KM);
    const minutes = Math.max(5, 9 + 3.6 * km + normalish(random, 0, 7));
    return { x: km, y: minutes };
  });
}

export const DELIVERIES: readonly Point[] = generate();

export const FIT = fitLine(DELIVERIES) ?? { slope: 3.6, intercept: 9 };
export function predictMinutes(km: number): number {
  return FIT.slope * km + FIT.intercept;
}

export const MIN_MINUTES = Math.min(...DELIVERIES.map((d) => d.y));
export const MAX_MINUTES = Math.max(...DELIVERIES.map((d) => d.y));

/** The same model reporting a plain number — the reference the buckets are judged against. */
export const REGRESSION_MAE: number = meanAbsoluteError(DELIVERIES, predictMinutes) ?? 0;

export interface BucketStep {
  buckets: number;
  width: number;
  edges: readonly number[];
  accuracy: number;
  mae: number;
  correctCount: number;
  /** How the model would phrase its answer for a 9 km delivery. */
  exampleLabel: string;
  exampleRange: readonly [number, number];
}

function bucketOf(minutes: number, edges: readonly number[]): number {
  for (let i = 0; i < edges.length - 1; i += 1) {
    if (minutes < edges[i + 1]) return i;
  }
  return edges.length - 2;
}

function stepFor(buckets: number): BucketStep {
  const lo = MIN_MINUTES;
  const hi = MAX_MINUTES;
  const width = (hi - lo) / buckets;
  const edges = Array.from({ length: buckets + 1 }, (_, i) => lo + width * i);
  const centre = (i: number) => (edges[i] + edges[i + 1]) / 2;

  let correct = 0;
  let absError = 0;
  for (const d of DELIVERIES) {
    // Same underlying model; only the output format changes.
    const predicted = bucketOf(predictMinutes(d.x), edges);
    const actual = bucketOf(d.y, edges);
    if (predicted === actual) correct += 1;
    absError += Math.abs(d.y - centre(predicted));
  }

  const exampleBucket = bucketOf(predictMinutes(EXAMPLE_KM), edges);
  const exampleRange: [number, number] = [edges[exampleBucket], edges[exampleBucket + 1]];

  return {
    buckets,
    width,
    edges,
    accuracy: correct / DELIVERY_COUNT,
    mae: absError / DELIVERY_COUNT,
    correctCount: correct,
    exampleLabel:
      buckets === 2
        ? exampleBucket === 0
          ? "fast"
          : "slow"
        : `${exampleRange[0].toFixed(0)} to ${exampleRange[1].toFixed(0)} minutes`,
    exampleRange,
  };
}

export const BUCKET_STEPS: readonly BucketStep[] = Array.from(
  { length: MAX_BUCKETS - MIN_BUCKETS + 1 },
  (_, i) => stepFor(MIN_BUCKETS + i),
);

export function stepAtBuckets(buckets: number): BucketStep {
  return BUCKET_STEPS[buckets - MIN_BUCKETS];
}

export const MAX_STEP_MAE: number = Math.max(...BUCKET_STEPS.map((s) => s.mae));
