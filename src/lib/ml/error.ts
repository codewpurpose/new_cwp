import type { Point } from "@/lib/ml/types";

/**
 * Error measures. Every one returns null rather than 0 for an empty input —
 * the average error of no predictions is undefined, not perfect.
 */

export function meanAbsoluteError(
  points: readonly Point[],
  predict: (x: number) => number,
): number | null {
  if (points.length === 0) return null;
  let total = 0;
  for (const p of points) total += Math.abs(p.y - predict(p.x));
  return total / points.length;
}

export function meanSquaredError(
  points: readonly Point[],
  predict: (x: number) => number,
): number | null {
  if (points.length === 0) return null;
  let total = 0;
  for (const p of points) {
    const miss = p.y - predict(p.x);
    total += miss * miss;
  }
  return total / points.length;
}

export function rootMeanSquaredError(
  points: readonly Point[],
  predict: (x: number) => number,
): number | null {
  const mse = meanSquaredError(points, predict);
  return mse === null ? null : Math.sqrt(mse);
}

/** Null when nothing was predicted — the same rule precision follows. */
export function accuracy(correctCount: number, total: number): number | null {
  return total === 0 ? null : correctCount / total;
}
