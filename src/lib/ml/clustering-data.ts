/**
 * Seeded data and a hand-rolled k-means for the clustering lesson.
 *
 * Ninety-eight points, built from three overlapping blobs so the data looks
 * like it has real structure without making that structure obvious from a
 * glance. Nothing about a point records which blob it came from — the label
 * exists only while this module is generating the data, and is thrown away
 * before `POINTS` is exported. k-means never sees it, exactly like a real
 * unsupervised problem.
 *
 * Generated at module scope from a fixed seed, so the server and the browser
 * build byte-identical arrays. See @/lib/ml/random.
 */

import { mulberry32, normalish } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

export const DOMAIN_X = [0, 360] as const;
export const DOMAIN_Y = [0, 240] as const;

function blob(
  random: () => number,
  count: number,
  cx: number,
  cy: number,
  sx: number,
  sy: number,
): Point[] {
  return Array.from({ length: count }, () => ({
    x: normalish(random, cx, sx, { min: DOMAIN_X[0], max: DOMAIN_X[1] }),
    y: normalish(random, cy, sy, { min: DOMAIN_Y[0], max: DOMAIN_Y[1] }),
  }));
}

function generate(): Point[] {
  const random = mulberry32(20260802);
  return [
    ...blob(random, 40, 70, 90, 24, 20),
    ...blob(random, 24, 165, 60, 20, 18),
    ...blob(random, 34, 150, 190, 28, 22),
  ];
}

/** No field here says which of the three blobs a point came from — on purpose. */
export const POINTS: readonly Point[] = generate();

/* -------------------------------------------------------------------------- */
/* Named starting positions                                                    */
/* -------------------------------------------------------------------------- */

export type ClusterCount = 2 | 3 | 4;

export const K_VALUES: readonly ClusterCount[] = [2, 3, 4];

export interface StartOption {
  key: string;
  label: string;
  centres: readonly Point[];
}

/**
 * Hand-picked, not random — a start is a decision the reader makes, not a draw
 * from the seed. Each list has at least one start that lands on the best
 * grouping this data has to offer, and one that does not.
 */
export const START_OPTIONS: Record<ClusterCount, readonly StartOption[]> = {
  2: [
    {
      key: "near-groups",
      label: "Near the two big groups",
      centres: [
        { x: 70, y: 90 },
        { x: 160, y: 120 },
      ],
    },
    {
      key: "opposite-corners",
      label: "Opposite corners of the plot",
      centres: [
        { x: 10, y: 230 },
        { x: 340, y: 10 },
      ],
    },
  ],
  3: [
    {
      key: "near-groups",
      label: "One centre near each group you can see",
      centres: [
        { x: 70, y: 90 },
        { x: 165, y: 60 },
        { x: 150, y: 190 },
      ],
    },
    {
      key: "one-corner",
      label: "All three bunched in one corner",
      centres: [
        { x: 250, y: 150 },
        { x: 230, y: 120 },
        { x: 270, y: 170 },
      ],
    },
  ],
  4: [
    {
      key: "near-groups",
      label: "One centre near each group, plus a spare",
      centres: [
        { x: 70, y: 90 },
        { x: 165, y: 60 },
        { x: 150, y: 190 },
        { x: 250, y: 150 },
      ],
    },
    {
      key: "four-corners",
      label: "Four corners of the plot",
      centres: [
        { x: 10, y: 10 },
        { x: 340, y: 10 },
        { x: 10, y: 230 },
        { x: 340, y: 230 },
      ],
    },
    {
      key: "one-corner",
      label: "All four bunched in one corner",
      centres: [
        { x: 250, y: 150 },
        { x: 230, y: 120 },
        { x: 270, y: 170 },
        { x: 240, y: 140 },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* k-means, one half-step at a time                                            */
/* -------------------------------------------------------------------------- */

export type FrameKind = "assign" | "move";

export interface KMeansFrame {
  /** 0-based, counting both assign and move half-steps. */
  index: number;
  kind: FrameKind;
  centres: readonly Point[];
  /** Cluster index per point in `POINTS`, in order. */
  assignments: readonly number[];
  /** Total squared distance from every point to the centre it is assigned to. */
  inertia: number;
  /**
   * For an "assign" frame: whether any point changed cluster since the
   * previous assign frame. Null for the first assign and for every "move"
   * frame, where the question does not apply.
   */
  assignmentsChanged: boolean | null;
}

function squaredDistance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/** Every point joins whichever centre is closest. Ties go to the lower index. */
function assignPoints(centres: readonly Point[]): number[] {
  return POINTS.map((point) => {
    let best = 0;
    let bestDistance = Infinity;
    centres.forEach((centre, index) => {
      const d = squaredDistance(point, centre);
      if (d < bestDistance) {
        bestDistance = d;
        best = index;
      }
    });
    return best;
  });
}

/**
 * Each centre moves to the mean of the points currently assigned to it. A
 * centre nobody is assigned to does not move — there is nothing to average,
 * and it stays exactly where it was abandoned.
 */
function moveCentres(centres: readonly Point[], assignments: readonly number[]): Point[] {
  const sums = centres.map(() => ({ x: 0, y: 0, n: 0 }));
  POINTS.forEach((point, i) => {
    const cluster = sums[assignments[i]];
    cluster.x += point.x;
    cluster.y += point.y;
    cluster.n += 1;
  });
  return centres.map((centre, i) => {
    const s = sums[i];
    return s.n === 0 ? centre : { x: s.x / s.n, y: s.y / s.n };
  });
}

function computeInertia(centres: readonly Point[], assignments: readonly number[]): number {
  let total = 0;
  POINTS.forEach((point, i) => {
    total += squaredDistance(point, centres[assignments[i]]);
  });
  return total;
}

function sameAssignments(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((value, i) => value === b[i]);
}

/**
 * The full assign/move history for one starting position, stopping the first
 * time an assign step changes nothing. Twelve iterations is generous headroom
 * — nothing in `START_OPTIONS` needs more than six.
 */
export function runKMeans(initialCentres: readonly Point[], maxIterations = 12): KMeansFrame[] {
  const frames: KMeansFrame[] = [];
  let centres = initialCentres;
  let assignments = assignPoints(centres);
  let index = 0;

  frames.push({
    index,
    kind: "assign",
    centres,
    assignments,
    inertia: computeInertia(centres, assignments),
    assignmentsChanged: null,
  });

  let previousAssignments = assignments;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    index += 1;
    centres = moveCentres(centres, assignments);
    frames.push({
      index,
      kind: "move",
      centres,
      assignments,
      inertia: computeInertia(centres, assignments),
      assignmentsChanged: null,
    });

    index += 1;
    const nextAssignments = assignPoints(centres);
    const changed = !sameAssignments(nextAssignments, previousAssignments);
    assignments = nextAssignments;
    frames.push({
      index,
      kind: "assign",
      centres,
      assignments,
      inertia: computeInertia(centres, assignments),
      assignmentsChanged: changed,
    });

    if (!changed) break;
    previousAssignments = assignments;
  }

  return frames;
}

/** How many points each cluster holds in a given frame. */
export function clusterCounts(k: ClusterCount, assignments: readonly number[]): number[] {
  const counts = new Array(k).fill(0) as number[];
  assignments.forEach((cluster) => {
    counts[cluster] += 1;
  });
  return counts;
}
