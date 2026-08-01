import { meanAbsoluteError } from "@/lib/ml/error";
import { evaluatePolynomial, fitPolynomial, type PolynomialFit } from "@/lib/ml/fit";
import { linspace } from "@/lib/ml/numeric";
import { MAX_HOURS, STUDENTS } from "@/lib/ml/practice-data";
import type { Point } from "@/lib/ml/types";

/**
 * The overfitting lesson: same sixty students, but only fourteen to learn from.
 *
 * Fourteen is deliberate. With forty-two training points a degree-12 polynomial
 * is well determined and barely wiggles, so the classic failure never shows up.
 * With fourteen it has thirteen unknowns against fourteen equations, so it
 * near-interpolates and the damage is visible on one screen.
 */

export const TRAIN_COUNT = 14;
export const MAX_DEGREE = 12;
export const CURVE_SAMPLES = 160;
/** Test error past this is clamped, so a five-digit number never reaches the UI. */
export const ERROR_CEILING = 25;

export const TRAIN_STUDENTS: readonly Point[] = STUDENTS.slice(0, TRAIN_COUNT);
export const TEST_STUDENTS: readonly Point[] = STUDENTS.slice(TRAIN_COUNT);

const SAMPLE_XS = linspace(0, MAX_HOURS, CURVE_SAMPLES);

export interface DegreeStep {
  degree: number;
  fit: PolynomialFit | null;
  trainMae: number | null;
  testMae: number | null;
  gap: number | null;
  /** One coefficient per bend, plus the constant. */
  parameters: number;
  /** Damning when it falls outside 0-100, and it does at high degree. */
  predictionAtZero: number | null;
  curve: readonly Point[];
}

function stepFor(degree: number): DegreeStep {
  const fit = fitPolynomial(TRAIN_STUDENTS, degree, { ridge: 1e-8 });
  if (!fit) {
    return {
      degree,
      fit: null,
      trainMae: null,
      testMae: null,
      gap: null,
      parameters: degree + 1,
      predictionAtZero: null,
      curve: [],
    };
  }

  const predict = (x: number) => evaluatePolynomial(fit, x);
  const trainMae = meanAbsoluteError(TRAIN_STUDENTS, predict);
  const testMae = meanAbsoluteError(TEST_STUDENTS, predict);

  return {
    degree,
    fit,
    trainMae,
    testMae,
    gap: trainMae === null || testMae === null ? null : testMae - trainMae,
    parameters: degree + 1,
    predictionAtZero: predict(0),
    // Precomputed so dragging the slider is a pure array read.
    curve: SAMPLE_XS.map((x) => ({ x, y: predict(x) })),
  };
}

export const DEGREE_STEPS: readonly DegreeStep[] = Array.from(
  { length: MAX_DEGREE + 1 },
  (_, degree) => stepFor(degree),
);

export const BEST_TEST_DEGREE: number = DEGREE_STEPS.reduce((best, step) => {
  if (step.testMae === null) return best;
  const bestMae = DEGREE_STEPS[best].testMae;
  return bestMae === null || step.testMae < bestMae ? step.degree : best;
}, 0);
