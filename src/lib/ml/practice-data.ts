import { clamp } from "@/lib/ml/numeric";
import { mulberry32, normalish } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

/**
 * Sixty students: hours practised against test score. Shared by the Train/Test
 * Split and Overfitting lessons, so the reader meets the same data twice and
 * the second lesson can build on the first.
 *
 * The underlying pattern is an S-curve — slow start, rapid gains, plateau —
 * which is what practice actually looks like. Crucially it is NOT a polynomial,
 * so the overfitting lesson has no exactly-right answer and its sweet spot is a
 * genuine trade-off rather than a trick.
 *
 * n = 60 is chosen so a 10% test set is 6 students (visibly a lottery) while
 * 40% is 24 (visibly steadier), and 80% held back still leaves 12 to train on —
 * few enough that the model itself degrades and the chart tells the truth.
 */

export const STUDENT_COUNT = 60;
export const MAX_HOURS = 20;
export const MAX_SCORE = 100;

/** The real pattern, which no model in these lessons ever gets to see. */
export function trueCurve(hours: number): number {
  return 10 + 78 / (1 + Math.exp(-(hours - 9) / 2.6));
}

function generate(): Point[] {
  const random = mulberry32(20260905);
  return Array.from({ length: STUDENT_COUNT }, () => {
    const hours = random() * MAX_HOURS;
    const score = clamp(trueCurve(hours) + normalish(random, 0, 5.5), 0, MAX_SCORE);
    return { x: hours, y: score };
  });
}

export const STUDENTS: readonly Point[] = generate();
