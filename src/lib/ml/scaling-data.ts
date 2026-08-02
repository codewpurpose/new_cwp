import { mulberry32, normalish } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

/**
 * Data for the Feature Scaling lesson.
 *
 * Sixty loan applicants, each with two columns living on wildly different
 * scales: years of credit history (2-30) and annual income (18,000-240,000).
 * The verdict a real underwriter would reach depends mostly on credit
 * history — income moves it only slightly. But income's raw range is nearly
 * eight thousand times wider than credit history's, so a Euclidean distance
 * computed on the raw numbers is decided almost entirely by income. Putting
 * both columns on a common scale is what lets credit history be heard at
 * all.
 *
 * Generated at module scope from a fixed seed, so the server and the browser
 * build byte-identical arrays. See @/lib/ml/random.
 */

const random = mulberry32(20260802);

export interface LoanApplicant {
  /** Years of credit history. The column that actually drives the verdict. */
  creditYears: number;
  /** Annual income in dollars. Weakly informative, and numerically enormous. */
  income: number;
  /** Whether the loan was approved. */
  approved: boolean;
}

/** The universe each column is drawn from — also its axis range in the chart. */
export const CREDIT_RANGE = [2, 30] as const;
export const INCOME_RANGE = [18000, 240000] as const;
export const CREDIT_SPAN = CREDIT_RANGE[1] - CREDIT_RANGE[0];
export const INCOME_SPAN = INCOME_RANGE[1] - INCOME_RANGE[0];

/** How many neighbours vote. Odd, so a two-class vote can never tie. */
export const K = 5;

function generate(): LoanApplicant[] {
  return Array.from({ length: 60 }, () => {
    const creditYears = normalish(random, 15, 8, {
      min: CREDIT_RANGE[0],
      max: CREDIT_RANGE[1],
    });
    const income = normalish(random, 118000, 72000, {
      min: INCOME_RANGE[0],
      max: INCOME_RANGE[1],
    });
    const wobble = normalish(random, 0, 12);
    // Credit history carries almost all the weight; income barely moves the
    // outcome. The raw distance calculation, below, gets this backwards.
    const score = creditYears * 3.2 + (income - 118000) * 0.00013 + wobble;
    return { creditYears, income, approved: score > 45 };
  });
}

export const APPLICANTS: readonly LoanApplicant[] = generate();
export const APPROVED_COUNT = APPLICANTS.filter((a) => a.approved).length;

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: readonly number[], average: number): number {
  const variance = values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export const CREDIT_MEAN = mean(APPLICANTS.map((a) => a.creditYears));
export const CREDIT_STD = standardDeviation(APPLICANTS.map((a) => a.creditYears), CREDIT_MEAN);
export const INCOME_MEAN = mean(APPLICANTS.map((a) => a.income));
export const INCOME_STD = standardDeviation(APPLICANTS.map((a) => a.income), INCOME_MEAN);

/* -------------------------------------------------------------------------- */
/* Scaling                                                                     */
/* -------------------------------------------------------------------------- */

export type ScaleMode = "raw" | "minmax" | "standard";

/**
 * Maps an applicant onto the coordinate system a given scaling mode measures
 * distance in. "raw" leaves the two columns in their own units. "minmax"
 * squashes each onto [0, 1] using the fixed universe above. "standard"
 * centres each on its own mean and divides by its own standard deviation.
 */
export function transform(
  applicant: Pick<LoanApplicant, "creditYears" | "income">,
  mode: ScaleMode,
): Point {
  if (mode === "raw") {
    return { x: applicant.creditYears, y: applicant.income };
  }
  if (mode === "minmax") {
    return {
      x: (applicant.creditYears - CREDIT_RANGE[0]) / CREDIT_SPAN,
      y: (applicant.income - INCOME_RANGE[0]) / INCOME_SPAN,
    };
  }
  return {
    x: (applicant.creditYears - CREDIT_MEAN) / CREDIT_STD,
    y: (applicant.income - INCOME_MEAN) / INCOME_STD,
  };
}

function distanceBetween(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export interface Neighbour {
  index: number;
  applicant: LoanApplicant;
  distance: number;
}

/** The `k` applicants closest to `query` under `mode`, nearest first. */
export function nearestTo(
  query: Pick<LoanApplicant, "creditYears" | "income">,
  k: number,
  mode: ScaleMode,
): Neighbour[] {
  const queryPoint = transform(query, mode);
  return APPLICANTS.map((applicant, index) => ({
    index,
    applicant,
    distance: distanceBetween(queryPoint, transform(applicant, mode)),
  }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

export interface Verdict {
  approved: boolean;
  approveVotes: number;
  denyVotes: number;
}

/** Majority vote among `neighbours`. `K` is odd, so this never ties. */
export function verdictOf(neighbours: readonly Neighbour[]): Verdict {
  const approveVotes = neighbours.filter((n) => n.applicant.approved).length;
  const denyVotes = neighbours.length - approveVotes;
  return { approved: approveVotes > denyVotes, approveVotes, denyVotes };
}

export interface Contribution {
  /** Fraction, in [0, 1], of the total squared distance from the query to
   *  every applicant that comes from credit history. */
  credit: number;
  /** The complementary fraction that comes from income. */
  income: number;
}

/**
 * How much of the distance from `query` to the rest of the applicants comes
 * from each column, under `mode`. This is what "a column dominates" means as
 * a number rather than an assertion: sum the squared per-column differences
 * across every applicant, and see what share each column owns.
 */
export function contributionOf(
  query: Pick<LoanApplicant, "creditYears" | "income">,
  mode: ScaleMode,
): Contribution {
  const queryPoint = transform(query, mode);
  let creditSquares = 0;
  let incomeSquares = 0;
  for (const applicant of APPLICANTS) {
    const point = transform(applicant, mode);
    creditSquares += (point.x - queryPoint.x) ** 2;
    incomeSquares += (point.y - queryPoint.y) ** 2;
  }
  const total = creditSquares + incomeSquares || 1;
  return { credit: creditSquares / total, income: incomeSquares / total };
}

/** The applicant the widget asks about. Deliberately long on credit history
 *  and short on income — the shape that raw distance gets wrong. */
export const QUERY: Pick<LoanApplicant, "creditYears" | "income"> = {
  creditYears: 27,
  income: 45000,
};
