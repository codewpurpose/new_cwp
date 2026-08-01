import { meanAbsoluteError } from "@/lib/ml/error";
import { evaluatePolynomial, fitPolynomial } from "@/lib/ml/fit";
import { STUDENT_COUNT, STUDENTS } from "@/lib/ml/practice-data";
import { mulberry32, permutations } from "@/lib/ml/random";

/**
 * The Train/Test Split lesson.
 *
 * The point is that a test score is a lottery ticket: with six students held
 * back you would report anywhere in a six-point range depending purely on WHICH
 * six — and you only ever buy one ticket. So instead of one split we compute
 * many, and draw the ones you did not get.
 *
 * The model is a degree-3 polynomial. Not a straight line, because a
 * mis-specified linear model makes train and test error track each other and
 * the "training error flatters the model" gap never appears. Not a high degree,
 * because model capacity is the NEXT lesson's subject and must not leak in.
 */

/** 24 was 48 ms of module-eval work, which runs on every client import too.
 * 12 keeps the lottery legible and the cost reasonable. */
export const REPLICATE_COUNT = 12;
export const MODEL_DEGREE = 3;
export const MIN_TEST_PERCENT = 5;
/** Beyond 80% the training set drops under 12 points, a cubic interpolates, and
 *  the y-scale explodes. The cap is a hard requirement, not a preference. */
export const MAX_TEST_PERCENT = 80;

const SPLITS = permutations(STUDENT_COUNT, REPLICATE_COUNT, 20260906);

/** Stable per-replicate jitter, so dots do not dance while dragging. */
export const JITTER: readonly number[] = (() => {
  const random = mulberry32(20260907);
  return Array.from({ length: REPLICATE_COUNT }, () => random() * 2 - 1);
})();

export interface SplitStep {
  testPercent: number;
  trainCount: number;
  testCount: number;
  trainErrors: readonly number[];
  testErrors: readonly number[];
  trainMedian: number;
  testMedian: number;
  testBest: number;
  testWorst: number;
  testSpread: number;
  /** Shuffles that would have let you report a score better than CLAIM_BAR. */
  underBarCount: number;
}

function median(values: readonly number[]): number {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * The bar a reader might want to claim they beat. Set just under the typical
 * test error so that at small test sets luck decides whether you clear it.
 */
export const CLAIM_BAR = 4;

function stepFor(testPercent: number): SplitStep {
  const testCount = Math.max(1, Math.round((testPercent / 100) * STUDENT_COUNT));
  const trainCount = STUDENT_COUNT - testCount;

  const trainErrors: number[] = [];
  const testErrors: number[] = [];

  for (const order of SPLITS) {
    const testIdx = new Set(order.slice(0, testCount));
    const train = STUDENTS.filter((_, i) => !testIdx.has(i));
    const test = STUDENTS.filter((_, i) => testIdx.has(i));

    const fit = fitPolynomial(train, MODEL_DEGREE);
    if (!fit) continue;
    const predict = (x: number) => evaluatePolynomial(fit, x);

    const trainMae = meanAbsoluteError(train, predict);
    const testMae = meanAbsoluteError(test, predict);
    if (trainMae !== null) trainErrors.push(trainMae);
    if (testMae !== null) testErrors.push(testMae);
  }

  return {
    testPercent,
    trainCount,
    testCount,
    trainErrors,
    testErrors,
    trainMedian: median(trainErrors),
    testMedian: median(testErrors),
    testBest: Math.min(...testErrors),
    testWorst: Math.max(...testErrors),
    testSpread: Math.max(...testErrors) - Math.min(...testErrors),
    underBarCount: testErrors.filter((e) => e < CLAIM_BAR).length,
  };
}

export const SPLIT_STEPS: readonly SplitStep[] = Array.from(
  { length: MAX_TEST_PERCENT - MIN_TEST_PERCENT + 1 },
  (_, i) => stepFor(MIN_TEST_PERCENT + i),
);

export function stepAt(testPercent: number): SplitStep {
  return SPLIT_STEPS[testPercent - MIN_TEST_PERCENT];
}

/** Replicate #1's assignment, for the strip that shows who is held back. */
export function firstAssignment(testPercent: number): readonly boolean[] {
  const testCount = Math.max(1, Math.round((testPercent / 100) * STUDENT_COUNT));
  const testIdx = new Set(SPLITS[0].slice(0, testCount));
  return Array.from({ length: STUDENT_COUNT }, (_, i) => testIdx.has(i));
}

export const MAX_ERROR: number = Math.max(
  ...SPLIT_STEPS.flatMap((s) => [s.testWorst, Math.max(...s.trainErrors)]),
);
