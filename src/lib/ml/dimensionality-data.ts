import { mulberry32, normalish } from "@/lib/ml/random";
import { argmax, mean, variance } from "@/lib/ml/numeric";

/**
 * Two exam scores for the Dimensionality Reduction lesson.
 *
 * Algebra and geometry marks are generated from a shared "major" trait (the
 * direction most of the class spreads out along) plus a much smaller
 * independent "minor" trait, the two rotated 48 degrees apart so the best
 * projection line is not a round number a reader could guess.
 *
 * A student is flagged `needsSupport` when their minor-axis value is well
 * below average — the two subjects disagree sharply for them, in a way the
 * major axis barely notices. That is deliberate: it means the direction that
 * best separates the flagged students is close to the direction PCA is
 * *least* interested in, which is exactly the trade-off the lesson is about.
 */

export interface ExamScore {
  algebra: number;
  geometry: number;
  needsSupport: boolean;
}

const STUDENT_COUNT = 64;
const CENTRE = 64;
const MAJOR_SD = 11;
const MINOR_SD = 4;
const ROTATION_DEGREES = 48;
const SCORE_MIN = 24;
const SCORE_MAX = 99;
const SUPPORT_CUTOFF = -MINOR_SD * 0.65;

function generate(): ExamScore[] {
  const random = mulberry32(20260802);
  const rotation = (ROTATION_DEGREES * Math.PI) / 180;
  const students: ExamScore[] = [];

  for (let i = 0; i < STUDENT_COUNT; i += 1) {
    const major = normalish(random, 0, MAJOR_SD);
    const minor = normalish(random, 0, MINOR_SD);
    const dx = major * Math.cos(rotation) - minor * Math.sin(rotation);
    const dy = major * Math.sin(rotation) + minor * Math.cos(rotation);
    const algebra = Math.min(SCORE_MAX, Math.max(SCORE_MIN, CENTRE + dx));
    const geometry = Math.min(SCORE_MAX, Math.max(SCORE_MIN, CENTRE + dy));
    students.push({ algebra, geometry, needsSupport: minor < SUPPORT_CUTOFF });
  }

  return students;
}

export const STUDENTS: readonly ExamScore[] = generate();
export const STUDENT_TOTAL = STUDENTS.length;
export const NEEDS_SUPPORT_COUNT = STUDENTS.filter((s) => s.needsSupport).length;

export const MEAN_ALGEBRA = mean(STUDENTS.map((s) => s.algebra)) ?? 0;
export const MEAN_GEOMETRY = mean(STUDENTS.map((s) => s.geometry)) ?? 0;

export const TOTAL_VARIANCE =
  (variance(STUDENTS.map((s) => s.algebra)) ?? 0) +
  (variance(STUDENTS.map((s) => s.geometry)) ?? 0);

/** How far the furthest student sits from the centroid — the shared radius every angle's line is drawn to. */
export const MAX_RADIUS = Math.max(
  ...STUDENTS.map((s) => Math.hypot(s.algebra - MEAN_ALGEBRA, s.geometry - MEAN_GEOMETRY)),
);

export const SCORE_DOMAIN: readonly [number, number] = (() => {
  const all = STUDENTS.flatMap((s) => [s.algebra, s.geometry]);
  return [Math.min(...all) - 5, Math.max(...all) + 5];
})();

export const PROJECTION_DOMAIN: readonly [number, number] = [
  -MAX_RADIUS - 3,
  MAX_RADIUS + 3,
];

export const ANGLE_MIN = 0;
export const ANGLE_MAX = 180;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** The centred position of one student along the projection line at this angle. */
export function projectedValue(student: ExamScore, angleDegrees: number): number {
  const rad = toRadians(angleDegrees);
  return (
    (student.algebra - MEAN_ALGEBRA) * Math.cos(rad) +
    (student.geometry - MEAN_GEOMETRY) * Math.sin(rad)
  );
}

/** Fraction (0-1) of the cloud's total spread that survives projection onto this line. */
export function varianceRetainedAt(angleDegrees: number): number {
  if (TOTAL_VARIANCE === 0) return 0;
  const projected = STUDENTS.map((s) => projectedValue(s, angleDegrees));
  return (variance(projected) ?? 0) / TOTAL_VARIANCE;
}

/** The line's direction expressed as weights on the two original columns. */
export function loadingsAt(angleDegrees: number): { algebra: number; geometry: number } {
  const rad = toRadians(angleDegrees);
  return { algebra: Math.cos(rad), geometry: Math.sin(rad) };
}

/** The gap, in raw score points, between the flagged and unflagged groups' averages on this line. */
export function groupGapAt(angleDegrees: number): number {
  const flagged = STUDENTS.filter((s) => s.needsSupport).map((s) => projectedValue(s, angleDegrees));
  const rest = STUDENTS.filter((s) => !s.needsSupport).map((s) => projectedValue(s, angleDegrees));
  const a = mean(flagged);
  const b = mean(rest);
  if (a === null || b === null) return 0;
  return Math.abs(a - b);
}

const ANGLE_STEPS = Array.from(
  { length: ANGLE_MAX - ANGLE_MIN + 1 },
  (_, i) => ANGLE_MIN + i,
);

export const VARIANCE_CURVE: readonly { angle: number; retained: number }[] = ANGLE_STEPS.map(
  (angle) => ({ angle, retained: varianceRetainedAt(angle) }),
);

const best = argmax(ANGLE_STEPS, (angle) => varianceRetainedAt(angle));
export const BEST_ANGLE_DEGREES = best?.value ?? 0;
export const BEST_VARIANCE_RETAINED = best?.score ?? 0;

/** The angle 90 degrees off the best one — the direction PCA likes least. */
export const WORST_ALIGNED_ANGLE_DEGREES = (BEST_ANGLE_DEGREES + 90) % 180;
export const WORST_ALIGNED_VARIANCE_RETAINED = varianceRetainedAt(WORST_ALIGNED_ANGLE_DEGREES);
export const WORST_ALIGNED_GROUP_GAP = groupGapAt(WORST_ALIGNED_ANGLE_DEGREES);
export const BEST_GROUP_GAP = groupGapAt(BEST_ANGLE_DEGREES);
