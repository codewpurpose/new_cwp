import type { Point } from "@/lib/ml/types";

/**
 * Least-squares curve fitting for the ML lessons.
 *
 * The overfitting lesson fits polynomials up to degree 12. That only works
 * because `fitPolynomial` centres and scales x before building the normal
 * equations — see the comment there. Removing that step makes degree 12 return
 * NaN, and the lesson is entirely dependent on it.
 */

export interface PolynomialFit {
  degree: number;
  /** Ascending powers of the CENTRED, SCALED variable u = (x - centre) / scale. */
  coefficients: readonly number[];
  centre: number;
  scale: number;
}

export interface FitOptions {
  /** Added to the normal-equation diagonal. Keeps near-singular systems solvable. */
  ridge?: number;
}

/** Gaussian elimination with partial pivoting. Null when the system is singular. */
export function solveLinearSystem(
  matrix: number[][],
  rhs: readonly number[],
): number[] | null {
  const n = rhs.length;
  const a = matrix.map((row, i) => [...row, rhs[i]]);

  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < n; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    }
    if (Math.abs(a[pivot][col]) < 1e-12) return null;
    [a[col], a[pivot]] = [a[pivot], a[col]];

    for (let row = col + 1; row < n; row += 1) {
      const factor = a[row][col] / a[col][col];
      if (factor === 0) continue;
      for (let k = col; k <= n; k += 1) a[row][k] -= factor * a[col][k];
    }
  }

  const out = new Array<number>(n).fill(0);
  for (let row = n - 1; row >= 0; row -= 1) {
    let acc = a[row][n];
    for (let col = row + 1; col < n; col += 1) acc -= a[row][col] * out[col];
    out[row] = acc / a[row][row];
  }

  return out.every(Number.isFinite) ? out : null;
}

/**
 * Fits a polynomial of the given degree.
 *
 * Returns null when there are fewer points than coefficients, or the system is
 * singular.
 *
 * x is centred and rescaled to roughly [-1, 1] first. Without that, a degree-12
 * Vandermonde matrix on raw x in [0, 20] has a condition number past what
 * float64 can carry and the solve returns NaN. The ridge term handles the
 * remaining near-singular cases.
 */
export function fitPolynomial(
  points: readonly Point[],
  degree: number,
  options?: FitOptions,
): PolynomialFit | null {
  const terms = degree + 1;
  if (points.length < terms) return null;

  const xs = points.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const centre = (minX + maxX) / 2;
  const scale = (maxX - minX) / 2 || 1;

  const ridge = options?.ridge ?? 1e-9;

  // Normal equations: (VᵀV + ridge·I) c = Vᵀy, built without materialising V.
  const normal: number[][] = Array.from({ length: terms }, () =>
    new Array<number>(terms).fill(0),
  );
  const rhs = new Array<number>(terms).fill(0);

  for (const point of points) {
    const u = (point.x - centre) / scale;
    const powers = new Array<number>(terms);
    powers[0] = 1;
    for (let i = 1; i < terms; i += 1) powers[i] = powers[i - 1] * u;

    for (let i = 0; i < terms; i += 1) {
      rhs[i] += powers[i] * point.y;
      for (let j = 0; j < terms; j += 1) normal[i][j] += powers[i] * powers[j];
    }
  }

  for (let i = 0; i < terms; i += 1) normal[i][i] += ridge;

  const coefficients = solveLinearSystem(normal, rhs);
  if (!coefficients) return null;

  return { degree, coefficients, centre, scale };
}

export function evaluatePolynomial(fit: PolynomialFit, x: number): number {
  const u = (x - fit.centre) / fit.scale;
  // Horner's method, descending.
  let acc = 0;
  for (let i = fit.coefficients.length - 1; i >= 0; i -= 1) {
    acc = acc * u + fit.coefficients[i];
  }
  return acc;
}

export function fitLine(
  points: readonly Point[],
): { slope: number; intercept: number } | null {
  const n = points.length;
  if (n < 2) return null;

  let sumX = 0;
  let sumY = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let covariance = 0;
  let varianceX = 0;
  for (const p of points) {
    const dx = p.x - meanX;
    covariance += dx * (p.y - meanY);
    varianceX += dx * dx;
  }
  if (varianceX === 0) return null;

  const slope = covariance / varianceX;
  return { slope, intercept: meanY - slope * meanX };
}

/**
 * Fits y = k·x through the origin.
 *
 * Used where the intercept is genuinely zero rather than merely small — a trip
 * of zero kilometres uses zero litres — so the model honestly has exactly one
 * parameter.
 */
export function fitSlopeThroughOrigin(points: readonly Point[]): number | null {
  let numerator = 0;
  let denominator = 0;
  for (const p of points) {
    numerator += p.x * p.y;
    denominator += p.x * p.x;
  }
  if (denominator === 0) return null;
  return numerator / denominator;
}
