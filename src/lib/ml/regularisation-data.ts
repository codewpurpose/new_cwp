import { solveLinearSystem } from "@/lib/ml/fit";
import { clamp } from "@/lib/ml/numeric";
import { mulberry32, normalish } from "@/lib/ml/random";

/**
 * Seeded data for the regularisation lesson: a rent regression with nine
 * correlated predictors, only three of which the target actually depends on.
 *
 * The three that matter (`size_sqm`, `transit_minutes`, `light_score`) each
 * get a genuine coefficient in the generating model below. Three more
 * (`elevation_m`, `parking_score`, `park_distance_min`) are built to *look*
 * like a true predictor — each is a blend of a real one plus independent
 * noise — without the target depending on them at all. The last three
 * (`building_age_years`, `noise_level_db`, `energy_rating`) are plain,
 * unrelated noise. An unpenalised fit cannot tell any of this apart from the
 * training data alone; that is the entire problem this lesson answers.
 */

export type PredictorRole = "true" | "correlated" | "independent";

export interface Predictor {
  key: string;
  label: string;
  unit: string;
  role: PredictorRole;
  /** For a "correlated" predictor, the key of the true predictor it echoes. */
  pairsWith?: string;
}

export const PREDICTORS: readonly Predictor[] = [
  { key: "size_sqm", label: "Floor size", unit: "sqm", role: "true" },
  { key: "transit_minutes", label: "Walk to transit", unit: "min", role: "true" },
  { key: "light_score", label: "Natural light", unit: "/10", role: "true" },
  {
    key: "elevation_m",
    label: "Height above street",
    unit: "m",
    role: "correlated",
    pairsWith: "light_score",
  },
  {
    key: "parking_score",
    label: "Parking access",
    unit: "/10",
    role: "correlated",
    pairsWith: "size_sqm",
  },
  {
    key: "park_distance_min",
    label: "Walk to a park",
    unit: "min",
    role: "correlated",
    pairsWith: "transit_minutes",
  },
  { key: "building_age_years", label: "Building age", unit: "yrs", role: "independent" },
  { key: "noise_level_db", label: "Street noise", unit: "dB", role: "independent" },
  { key: "energy_rating", label: "Energy rating", unit: "/10", role: "independent" },
] as const;

export const PREDICTOR_COUNT = PREDICTORS.length;

const TOTAL_COUNT = 240;
export const TRAIN_COUNT = 16;
export const VALID_COUNT = TOTAL_COUNT - TRAIN_COUNT;

// The generating relationship. Rent depends on exactly these three latent
// factors, in dollars per standard deviation of the factor.
const TRUE_WEIGHTS = { size: 420, transit: -260, light: 150 } as const;
const BASE_RENT = 1800;
const IRREDUCIBLE_NOISE_SD = 250;

interface RawRow {
  features: number[];
  rent: number;
}

function generateRows(): RawRow[] {
  const random = mulberry32(20260802);
  const rows: RawRow[] = [];

  for (let i = 0; i < TOTAL_COUNT; i += 1) {
    const sizeZ = normalish(random, 0, 1);
    const transitZ = normalish(random, 0, 1);
    const lightZ = normalish(random, 0, 1);
    const elevationNoise = normalish(random, 0, 1);
    const parkingNoise = normalish(random, 0, 1);
    const parkDistanceNoise = normalish(random, 0, 1);
    const ageZ = normalish(random, 0, 1);
    const noiseDbZ = normalish(random, 0, 1);
    const energyZ = normalish(random, 0, 1);
    const irreducibleZ = normalish(random, 0, 1);

    // Correlated look-alikes: part real predictor, part independent noise.
    const elevationZ = 0.4 * lightZ + 0.9165 * elevationNoise;
    const parkingZ = 0.4 * sizeZ + 0.9165 * parkingNoise;
    const parkDistanceZ = 0.4 * transitZ + 0.9165 * parkDistanceNoise;

    const features = [
      clamp(75 + 22 * sizeZ, 28, 160), // size_sqm
      clamp(14 + 7 * transitZ, 1, 40), // transit_minutes
      clamp(6 + 2.2 * lightZ, 0, 10), // light_score
      clamp(9 + 6 * elevationZ, 0, 45), // elevation_m
      clamp(5 + 2 * parkingZ, 0, 10), // parking_score
      clamp(12 + 6 * parkDistanceZ, 1, 40), // park_distance_min
      clamp(25 + 15 * ageZ, 0, 80), // building_age_years
      clamp(55 + 8 * noiseDbZ, 35, 85), // noise_level_db
      clamp(5 + 2 * energyZ, 0, 10), // energy_rating
    ];

    const rent =
      BASE_RENT +
      TRUE_WEIGHTS.size * sizeZ +
      TRUE_WEIGHTS.transit * transitZ +
      TRUE_WEIGHTS.light * lightZ +
      IRREDUCIBLE_NOISE_SD * irreducibleZ;

    rows.push({ features, rent });
  }

  return rows;
}

const ROWS = generateRows();
const TRAIN_ROWS = ROWS.slice(0, TRAIN_COUNT);
const VALID_ROWS = ROWS.slice(TRAIN_COUNT);

interface Standardiser {
  mean: number;
  sd: number;
}

/**
 * Column mean/sd computed from the TRAINING rows only, then applied to both
 * splits. Fitting the scaler on the validation data too would be a small
 * leak of its own — the scaler is a parameter, exactly like a coefficient.
 */
function fitStandardisers(rows: readonly RawRow[]): Standardiser[] {
  const n = rows.length;
  return Array.from({ length: PREDICTOR_COUNT }, (_, j) => {
    let sum = 0;
    for (const row of rows) sum += row.features[j];
    const mean = sum / n;
    let variance = 0;
    for (const row of rows) variance += (row.features[j] - mean) ** 2;
    const sd = Math.sqrt(variance / n) || 1;
    return { mean, sd };
  });
}

const STANDARDISERS = fitStandardisers(TRAIN_ROWS);

function standardise(rows: readonly RawRow[]): number[][] {
  return rows.map((row) =>
    row.features.map((value, j) => (value - STANDARDISERS[j].mean) / STANDARDISERS[j].sd),
  );
}

const X_TRAIN = standardise(TRAIN_ROWS);
const X_VALID = standardise(VALID_ROWS);

const TRAIN_RENT_MEAN = TRAIN_ROWS.reduce((acc, r) => acc + r.rent, 0) / TRAIN_COUNT;
const Y_TRAIN = TRAIN_ROWS.map((r) => r.rent - TRAIN_RENT_MEAN);
const Y_VALID = VALID_ROWS.map((r) => r.rent - TRAIN_RENT_MEAN);

/** The unregularised spread of rent itself — what a flat, coefficient-free
 * model (predict the mean, always) scores on the held-back half. Useful as a
 * ceiling: no amount of penalty should make things worse than this. */
export const NO_MODEL_VALID_RMSE = Math.sqrt(
  Y_VALID.reduce((acc, y) => acc + y * y, 0) / VALID_COUNT,
);

// ---------------------------------------------------------------------------
// The penalty path. Log-spaced from 0.001 to 100, eight steps per decade.
// ---------------------------------------------------------------------------

const STEPS_PER_DECADE = 8;
const MIN_EXPONENT = -3;
const MAX_EXPONENT = 2;
export const LAMBDA_STEP_COUNT = (MAX_EXPONENT - MIN_EXPONENT) * STEPS_PER_DECADE + 1;

export const LAMBDAS: readonly number[] = Array.from({ length: LAMBDA_STEP_COUNT }, (_, i) =>
  Math.pow(10, MIN_EXPONENT + i / STEPS_PER_DECADE),
);

export interface PenaltyStep {
  lambda: number;
  coefficients: readonly number[];
  trainRmse: number;
  validRmse: number;
  /** Count of coefficients within a hair of exactly zero. */
  zeroCount: number;
}

const ZERO_EPSILON = 1e-6;

function rmse(X: readonly number[][], y: readonly number[], coefficients: readonly number[]): number {
  let sumSquares = 0;
  for (let i = 0; i < X.length; i += 1) {
    let prediction = 0;
    for (let j = 0; j < coefficients.length; j += 1) prediction += X[i][j] * coefficients[j];
    const residual = y[i] - prediction;
    sumSquares += residual * residual;
  }
  return Math.sqrt(sumSquares / X.length);
}

function stepFor(lambda: number, coefficients: readonly number[]): PenaltyStep {
  return {
    lambda,
    coefficients,
    trainRmse: rmse(X_TRAIN, Y_TRAIN, coefficients),
    validRmse: rmse(X_VALID, Y_VALID, coefficients),
    zeroCount: coefficients.filter((c) => Math.abs(c) < ZERO_EPSILON).length,
  };
}

/**
 * Ridge: closed form. Objective is (1/2n)||y - Xb||^2 + lambda * sum(b^2), so
 * the normal equations pick up `2 * n * lambda` on the diagonal — no
 * intercept term because both X and y are already centred.
 */
function ridgeCoefficients(lambda: number): number[] {
  const n = X_TRAIN.length;
  const p = PREDICTOR_COUNT;
  const normal: number[][] = Array.from({ length: p }, () => new Array<number>(p).fill(0));
  const rhs = new Array<number>(p).fill(0);

  for (const row of X_TRAIN) {
    for (let i = 0; i < p; i += 1) {
      for (let j = 0; j < p; j += 1) normal[i][j] += row[i] * row[j];
    }
  }
  for (let i = 0; i < X_TRAIN.length; i += 1) {
    for (let j = 0; j < p; j += 1) rhs[j] += X_TRAIN[i][j] * Y_TRAIN[i];
  }
  for (let i = 0; i < p; i += 1) normal[i][i] += 2 * n * lambda;

  return solveLinearSystem(normal, rhs) ?? new Array<number>(p).fill(0);
}

function softThreshold(value: number, lambda: number): number {
  if (value > lambda) return value - lambda;
  if (value < -lambda) return value + lambda;
  return 0;
}

/**
 * Lasso: pathwise coordinate descent, warm-started from the previous
 * (larger) lambda's solution. Every training column is standardised to unit
 * variance, so each coordinate's own sum of squares is exactly 1 and the
 * update collapses to a plain soft threshold on the partial-residual
 * correlation — no line search, no step size to tune.
 */
function lassoCoefficients(lambda: number, warmStart: readonly number[]): number[] {
  const n = X_TRAIN.length;
  const p = PREDICTOR_COUNT;
  const b = warmStart.slice();

  const residual = new Array<number>(n);
  for (let i = 0; i < n; i += 1) {
    let prediction = 0;
    for (let j = 0; j < p; j += 1) prediction += X_TRAIN[i][j] * b[j];
    residual[i] = Y_TRAIN[i] - prediction;
  }

  const SWEEPS = 80;
  for (let sweep = 0; sweep < SWEEPS; sweep += 1) {
    for (let j = 0; j < p; j += 1) {
      const oldBj = b[j];
      let rho = 0;
      for (let i = 0; i < n; i += 1) rho += X_TRAIN[i][j] * (residual[i] + X_TRAIN[i][j] * oldBj);
      rho /= n;

      const newBj = softThreshold(rho, lambda);
      if (newBj !== oldBj) {
        const delta = oldBj - newBj;
        for (let i = 0; i < n; i += 1) residual[i] += X_TRAIN[i][j] * delta;
      }
      b[j] = newBj;
    }
  }

  return b;
}

function buildRidgePath(): PenaltyStep[] {
  return LAMBDAS.map((lambda) => stepFor(lambda, ridgeCoefficients(lambda)));
}

function buildLassoPath(): PenaltyStep[] {
  // Walk from the strongest penalty down to the weakest, warm-starting each
  // fit from the previous (larger-lambda) solution.
  const steps: PenaltyStep[] = new Array(LAMBDAS.length);
  let previous = new Array<number>(PREDICTOR_COUNT).fill(0);
  for (let i = LAMBDAS.length - 1; i >= 0; i -= 1) {
    const coefficients = lassoCoefficients(LAMBDAS[i], previous);
    steps[i] = stepFor(LAMBDAS[i], coefficients);
    previous = coefficients;
  }
  return steps;
}

export const RIDGE_PATH: readonly PenaltyStep[] = buildRidgePath();
export const LASSO_PATH: readonly PenaltyStep[] = buildLassoPath();

function bestValidIndex(path: readonly PenaltyStep[]): number {
  let best = 0;
  for (let i = 1; i < path.length; i += 1) {
    if (path[i].validRmse < path[best].validRmse) best = i;
  }
  return best;
}

export const RIDGE_BEST_INDEX = bestValidIndex(RIDGE_PATH);
export const LASSO_BEST_INDEX = bestValidIndex(LASSO_PATH);

export type PenaltyType = "l2" | "l1";

export const PENALTY_PATHS: Record<PenaltyType, readonly PenaltyStep[]> = {
  l2: RIDGE_PATH,
  l1: LASSO_PATH,
};

export const PENALTY_BEST_INDEX: Record<PenaltyType, number> = {
  l2: RIDGE_BEST_INDEX,
  l1: LASSO_BEST_INDEX,
};

/** Index nearest lambda = 1, used as the widget's starting position. */
export const DEFAULT_LAMBDA_INDEX = (-MIN_EXPONENT) * STEPS_PER_DECADE;

export const MAX_ABS_COEFFICIENT: number = Math.max(
  ...RIDGE_PATH.flatMap((step) => step.coefficients.map(Math.abs)),
  ...LASSO_PATH.flatMap((step) => step.coefficients.map(Math.abs)),
);

export const ERROR_CEILING: number = Math.ceil(
  Math.max(
    ...RIDGE_PATH.flatMap((step) => [step.trainRmse, step.validRmse]),
    ...LASSO_PATH.flatMap((step) => [step.trainRmse, step.validRmse]),
  ) / 50,
) * 50;
