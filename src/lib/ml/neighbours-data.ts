import { mulberry32, normalish } from "@/lib/ml/random";

/**
 * Data for the k-Nearest Neighbours lesson.
 *
 * Fifty-four students, each with revision hours and a previous exam score. The
 * truth leans hard on hours and only slightly on the previous score, which is
 * the entire point of the lesson: measured in raw units, the previous score
 * (range 20-100) swamps hours (range 0-12) in the distance calculation, so the
 * neighbours a query gets are chosen almost entirely by the feature that
 * matters least. Putting both features on the same scale fixes it.
 *
 * Generated at module scope from a fixed seed, so the server and the browser
 * build byte-identical arrays. See @/lib/ml/random.
 */

const random = mulberry32(20260731);

export interface Student {
  /** Hours spent revising. The feature that actually predicts the outcome. */
  hours: number;
  /** Previous exam score, 20-100. Weakly informative, and numerically huge. */
  previous: number;
  /** Whether they passed. */
  passed: boolean;
}

export const HOURS_RANGE = [0, 12] as const;
export const PREVIOUS_RANGE = [20, 100] as const;

/** Odd values only, so a two-class vote can never tie. */
export const K_VALUES = [1, 3, 5, 7, 9, 11, 13, 15] as const;

export const STUDENTS: readonly Student[] = Array.from({ length: 54 }, () => {
  const hours = normalish(random, 6, 3.1, { min: HOURS_RANGE[0], max: HOURS_RANGE[1] });
  const previous = normalish(random, 62, 16, { min: PREVIOUS_RANGE[0], max: PREVIOUS_RANGE[1] });
  const wobble = normalish(random, 0, 6);
  // Hours carry roughly six times the weight of the previous score.
  const score = hours * 7 + (previous - 62) * 0.22 + wobble;
  return { hours, previous, passed: score > 42 };
});

export const PASS_COUNT = STUDENTS.filter((s) => s.passed).length;

/* -------------------------------------------------------------------------- */
/* Distance                                                                    */
/* -------------------------------------------------------------------------- */

export type Metric = "raw" | "scaled";

const HOURS_SPAN = HOURS_RANGE[1] - HOURS_RANGE[0];
const PREVIOUS_SPAN = PREVIOUS_RANGE[1] - PREVIOUS_RANGE[0];

/**
 * Euclidean distance, either in the features' own units or after squashing each
 * onto 0-1. The two disagree because the units disagree, not because the maths
 * does.
 */
export function distance(a: Student, b: Student, metric: Metric): number {
  if (metric === "raw") {
    const dh = a.hours - b.hours;
    const dp = a.previous - b.previous;
    return Math.sqrt(dh * dh + dp * dp);
  }
  const dh = (a.hours - b.hours) / HOURS_SPAN;
  const dp = (a.previous - b.previous) / PREVIOUS_SPAN;
  return Math.sqrt(dh * dh + dp * dp);
}

export interface Neighbour {
  index: number;
  student: Student;
  distance: number;
}

/** The `k` closest students to `query`, nearest first. */
export function nearest(
  query: Pick<Student, "hours" | "previous">,
  k: number,
  metric: Metric,
  exclude = -1,
): Neighbour[] {
  const probe = { ...query, passed: false };
  return STUDENTS.map((student, index) => ({
    index,
    student,
    distance: distance(probe, student, metric),
  }))
    .filter((n) => n.index !== exclude)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

/** Majority vote among `neighbours`. `k` is always odd, so this never ties. */
export function vote(neighbours: readonly Neighbour[]): {
  passed: boolean;
  passVotes: number;
  failVotes: number;
} {
  const passVotes = neighbours.filter((n) => n.student.passed).length;
  const failVotes = neighbours.length - passVotes;
  return { passed: passVotes > failVotes, passVotes, failVotes };
}

/* -------------------------------------------------------------------------- */
/* Accuracy against k                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Leave-one-out accuracy: predict every student from the other fifty-three.
 * Cheap enough to run at module scope for both metrics and all eight k values.
 */
function looAccuracy(k: number, metric: Metric): number {
  let correct = 0;
  STUDENTS.forEach((student, index) => {
    const predicted = vote(nearest(student, k, metric, index)).passed;
    if (predicted === student.passed) correct += 1;
  });
  return correct / STUDENTS.length;
}

export interface AccuracyPoint {
  k: number;
  raw: number;
  scaled: number;
}

export const ACCURACY: readonly AccuracyPoint[] = K_VALUES.map((k) => ({
  k,
  raw: looAccuracy(k, "raw"),
  scaled: looAccuracy(k, "scaled"),
}));

export const BEST_SCALED = ACCURACY.reduce((best, p) => (p.scaled > best.scaled ? p : best));
export const BEST_RAW = ACCURACY.reduce((best, p) => (p.raw > best.raw ? p : best));

/* -------------------------------------------------------------------------- */
/* Query positions the lesson walks through                                    */
/* -------------------------------------------------------------------------- */

export interface Probe {
  key: string;
  label: string;
  hours: number;
  previous: number;
  note: string;
}

export const PROBES: readonly Probe[] = [
  {
    key: "clear",
    label: "Ten hours in",
    hours: 10,
    previous: 70,
    note: "Deep inside the region where nearly everyone passed. Every neighbour agrees, so k changes nothing and the two distance metrics pick almost the same students. Most predictions look this easy, which is why the easy ones tell you nothing about a model.",
  },
  {
    key: "boundary",
    label: "On the fence",
    hours: 6,
    previous: 60,
    note: "Right where the classes meet. The vote is close, and moving k by two can flip the answer. A model that reports 'pass' here is telling you far less than the same word meant a moment ago.",
  },
  {
    key: "coasting",
    label: "Coasting on a good record",
    hours: 2,
    previous: 80,
    note: "Two hours of revision, a previous score of 80. In raw units the previous score runs on a scale eight times wider than hours, so the nearest students are whoever else scored around 80 — and three of the five passed. Put both features on the same scale and the neighbours become people who also barely revised: five of five failed. Same data, same k, opposite answer.",
  },
  {
    key: "grinding",
    label: "Grinding with a bad record",
    hours: 9,
    previous: 30,
    note: "The mirror image, and the more expensive mistake. Nine hours of revision behind a weak previous score. Raw units fetch neighbours who also scored around 30 and predict a fail, three votes to two. Scaled, the neighbours are the other people who put in nine hours, and four of the five passed. Raw distance wrote this student off for something they had already fixed.",
  },
];
