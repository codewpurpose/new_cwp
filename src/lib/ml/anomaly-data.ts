/**
 * Seeded data for the Anomaly Detection lesson.
 *
 * Four hundred ordinary transactions, placed in a standardised two-feature
 * space centred on (0, 0) — think "how unusual the amount was" against "how
 * unusual the timing was", both already expressed as deviations from typical
 * behaviour. Nine genuine frauds are scattered around them at varying
 * distances: a couple sit almost inside the ordinary cloud, camouflaged;
 * most sit somewhere out in the crowd; one is unmistakable.
 *
 * The anomaly score used throughout is simply the Euclidean distance from the
 * origin — "distance from the centre of normal". Moving the cut-off is
 * therefore the same thing as drawing a circle: everything outside it gets
 * flagged.
 *
 * Seeded at module scope. See @/lib/ml/random.
 */

import { mulberry32, normalish } from "@/lib/ml/random";

export interface Transaction {
  x: number;
  y: number;
  fraud: boolean;
  /** Distance from the origin — the anomaly score. */
  score: number;
}

export const NORMAL_COUNT = 400;
export const FRAUD_COUNT = 9;
export const TOTAL_COUNT = NORMAL_COUNT + FRAUD_COUNT;

function generate(): readonly Transaction[] {
  const random = mulberry32(20260803);
  const points: { x: number; y: number; fraud: boolean }[] = [];

  for (let i = 0; i < NORMAL_COUNT; i += 1) {
    points.push({ x: normalish(random, 0, 1), y: normalish(random, 0, 1), fraud: false });
  }

  // Frauds are placed by angle and radius rather than by two independent
  // normals, so the radius — the thing the score actually measures — is the
  // one value under direct control. A couple land inside the ordinary cloud
  // on purpose: no cut-off ever recovers those two.
  for (let i = 0; i < FRAUD_COUNT; i += 1) {
    const angle = random() * Math.PI * 2;
    const radius = normalish(random, 2.2, 1.2, { min: 0.2, max: 6.5 });
    points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, fraud: true });
  }

  return points.map((p) => ({ ...p, score: Math.sqrt(p.x * p.x + p.y * p.y) }));
}

export const TRANSACTIONS: readonly Transaction[] = generate();

/** Half-width of the plotted feature space, with a small margin. */
export const AXIS_EXTENT = (() => {
  const raw = Math.max(...TRANSACTIONS.map((t) => Math.max(Math.abs(t.x), Math.abs(t.y))));
  return Math.ceil(raw * 10) / 10 + 0.2;
})();

export const MAX_SCORE = Math.max(...TRANSACTIONS.map((t) => t.score));

export const CUTOFF_MIN = 0;
export const CUTOFF_MAX = Math.ceil(MAX_SCORE * 20) / 20;
export const CUTOFF_STEP = 0.05;

/** Catches seven of the nine at a cost that is worth sitting with. */
export const DEFAULT_CUTOFF = 1.9;

export interface CutoffMetrics {
  cutoff: number;
  /** Everything past the cut-off, fraud and legitimate alike. */
  flagged: number;
  /** Real frauds among the flagged. */
  caught: number;
  /** Real frauds left below the cut-off. */
  missed: number;
  /** Legitimate transactions caught up in the sweep. */
  falseAlarms: number;
  /** Alerts an analyst opens for every real fraud among them. Null when nothing was caught. */
  alertsPerCatch: number | null;
}

export function metricsAt(cutoff: number): CutoffMetrics {
  let flagged = 0;
  let caught = 0;
  let falseAlarms = 0;

  for (const t of TRANSACTIONS) {
    if (t.score >= cutoff) {
      flagged += 1;
      if (t.fraud) caught += 1;
      else falseAlarms += 1;
    }
  }

  return {
    cutoff,
    flagged,
    caught,
    missed: FRAUD_COUNT - caught,
    falseAlarms,
    alertsPerCatch: caught === 0 ? null : flagged / caught,
  };
}

export interface CutoffPreset {
  key: string;
  label: string;
  cutoff: number;
  note: string;
}

export const PRESETS: readonly CutoffPreset[] = [
  {
    key: "everything",
    label: "Catch every known fraud",
    cutoff: 1.4,
    note: "All nine caught, at the cost of 165 legitimate transactions also flagged — 19 alerts opened for every real fraud in them.",
  },
  {
    key: "balanced",
    label: "A cut-off worth sitting with",
    cutoff: DEFAULT_CUTOFF,
    note: "Seven of nine caught. Getting them costs 64 false alarms — about ten alerts opened for every real fraud found.",
  },
  {
    key: "obvious",
    label: "Only the unmistakable",
    cutoff: 3.2,
    note: "Zero false alarms, and only the three most extreme frauds are still visible. Six of nine now pass straight through.",
  },
] as const;
