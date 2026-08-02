import { meanAbsoluteError } from "@/lib/ml/error";
import { evaluatePolynomial, fitPolynomial } from "@/lib/ml/fit";
import { STUDENT_COUNT, STUDENTS } from "@/lib/ml/practice-data";
import { permutations } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

/**
 * The Cross-Validation lesson.
 *
 * The same sixty students, the same degree-3 polynomial and the same mean
 * absolute error as the Train/Test Split lesson, so the two chapters are
 * directly comparable. That lesson showed one split is a lottery ticket. This
 * one buys every ticket in the book and averages them.
 *
 * Five folds of twelve. A single 20% holdout also tests on twelve, so the
 * comparison at the end is like for like: same model, same amount of held-back
 * data per evaluation, and the only difference is whether you did it once or
 * five times and averaged.
 */

export const FOLD_COUNT = 5;
export const FOLD_SIZE = STUDENT_COUNT / FOLD_COUNT;
export const MODEL_DEGREE = 3;

/** Shuffles used for the spread comparison. Each is one whole experiment. */
export const REPEAT_COUNT = 40;

const SHUFFLES = permutations(STUDENT_COUNT, REPEAT_COUNT, 20260913);

function fitAndScore(train: readonly Point[], test: readonly Point[]): number | null {
  const fit = fitPolynomial(train, MODEL_DEGREE);
  if (!fit) return null;
  return meanAbsoluteError(test, (x) => evaluatePolynomial(fit, x));
}

/** Split one shuffle into `FOLD_COUNT` blocks and score each in turn. */
function foldErrors(order: readonly number[]): number[] {
  const errors: number[] = [];
  for (let f = 0; f < FOLD_COUNT; f += 1) {
    const testIndices = new Set(order.slice(f * FOLD_SIZE, (f + 1) * FOLD_SIZE));
    const train: Point[] = [];
    const test: Point[] = [];
    STUDENTS.forEach((student, i) => (testIndices.has(i) ? test : train).push(student));
    const error = fitAndScore(train, test);
    errors.push(error ?? 0);
  }
  return errors;
}

/* -------------------------------------------------------------------------- */
/* The run the reader steps through                                            */
/* -------------------------------------------------------------------------- */

export interface Fold {
  index: number;
  /** True where this student is held back in this fold. */
  assignment: readonly boolean[];
  error: number;
  /** Mean error over folds 0..index, which is what the reader watches settle. */
  runningMean: number;
}

const HEADLINE_ORDER = SHUFFLES[0];
const HEADLINE_ERRORS = foldErrors(HEADLINE_ORDER);

/** Which fold each student belongs to, for colouring the strip. */
export const FOLD_OF: readonly number[] = (() => {
  const out = new Array<number>(STUDENT_COUNT).fill(0);
  HEADLINE_ORDER.forEach((student, position) => {
    out[student] = Math.floor(position / FOLD_SIZE);
  });
  return out;
})();

export const FOLDS: readonly Fold[] = HEADLINE_ERRORS.map((error, index) => ({
  index,
  assignment: FOLD_OF.map((f) => f === index),
  error,
  runningMean:
    HEADLINE_ERRORS.slice(0, index + 1).reduce((a, b) => a + b, 0) / (index + 1),
}));

export const CV_ESTIMATE = FOLDS[FOLD_COUNT - 1].runningMean;
export const FOLD_BEST = Math.min(...HEADLINE_ERRORS);
export const FOLD_WORST = Math.max(...HEADLINE_ERRORS);
export const FOLD_SPREAD = FOLD_WORST - FOLD_BEST;

/* -------------------------------------------------------------------------- */
/* One split versus five, repeated forty times                                 */
/* -------------------------------------------------------------------------- */

function spread(values: readonly number[]) {
  const sorted = values.slice().sort((a, b) => a - b);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return {
    values: sorted,
    mean,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    range: sorted[sorted.length - 1] - sorted[0],
  };
}

/**
 * Forty independent experiments. In each, `single` is what you would have
 * reported from one 20% holdout, and `cv` is what five-fold cross-validation
 * would have reported from exactly the same shuffle.
 */
const EXPERIMENTS = SHUFFLES.map((order) => {
  const errors = foldErrors(order);
  return {
    single: errors[0],
    cv: errors.reduce((a, b) => a + b, 0) / FOLD_COUNT,
  };
});

export const SINGLE_SPREAD = spread(EXPERIMENTS.map((e) => e.single));
export const CV_SPREAD = spread(EXPERIMENTS.map((e) => e.cv));

/** How many times narrower the cross-validated estimate is. */
export const TIGHTENING = SINGLE_SPREAD.range / CV_SPREAD.range;
