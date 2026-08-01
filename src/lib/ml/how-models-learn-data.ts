import { fitSlopeThroughOrigin } from "@/lib/ml/fit";
import { mulberry32, normalish } from "@/lib/ml/random";
import type { Point } from "@/lib/ml/types";

/**
 * Fuel used against distance driven, for the "How a Model Learns" lesson.
 *
 * Fuel consumption is the rare beginner regression where the intercept is
 * genuinely zero — a trip of zero kilometres uses zero litres — so the model
 * honestly has exactly ONE number to learn. That is what earns the single
 * slider, rather than merely tolerating it.
 *
 * 7.8 L/100km is a real figure for a small car, and sigma = 1.4 L on trips
 * averaging ~10 L is enough noise that no line passes through more than a
 * couple of points. That kills the "line of best fit touches the most dots"
 * misconception before it forms.
 */

export const TRIP_COUNT = 36;
export const SLOPE_MIN = 3;
export const SLOPE_MAX = 13;
export const SLOPE_STEP = 0.05;

function generate(): Point[] {
  const random = mulberry32(20260903);
  return Array.from({ length: TRIP_COUNT }, () => {
    const km = 10 + random() * 230;
    return { x: km, y: 0.078 * km + normalish(random, 0, 1.4) };
  });
}

export const TRIPS: readonly Point[] = generate();

/** Litres per 100 km — the one number the model has to learn. */
export const BEST_SLOPE: number = (() => {
  const perKm = fitSlopeThroughOrigin(TRIPS);
  return perKm === null ? 7.8 : perKm * 100;
})();

export function predictAt(slopePer100: number, km: number): number {
  return (slopePer100 / 100) * km;
}

export interface Loss {
  mse: number;
  mae: number;
  /** Total litres the line sits BELOW the trips it under-predicts. */
  pullUp: number;
  /** Total litres it sits ABOVE the trips it over-predicts. */
  pullDown: number;
}

/** Cheap enough to run live during a drag — 36 points, no lookup table needed. */
export function lossAt(slopePer100: number): Loss {
  let squared = 0;
  let absolute = 0;
  let pullUp = 0;
  let pullDown = 0;

  for (const trip of TRIPS) {
    const miss = trip.y - predictAt(slopePer100, trip.x);
    squared += miss * miss;
    absolute += Math.abs(miss);
    if (miss > 0) pullUp += miss;
    else pullDown -= miss;
  }

  return {
    mse: squared / TRIPS.length,
    mae: absolute / TRIPS.length,
    pullUp,
    pullDown,
  };
}

export function residualsAt(slopePer100: number): readonly number[] {
  return TRIPS.map((trip) => trip.y - predictAt(slopePer100, trip.x));
}

export interface LossPoint {
  slopePer100: number;
  mse: number;
}

/** 201 samples across the slider range, for drawing the error bowl. */
export const LOSS_CURVE: readonly LossPoint[] = Array.from(
  { length: Math.round((SLOPE_MAX - SLOPE_MIN) / SLOPE_STEP) + 1 },
  (_, i) => {
    const slopePer100 = SLOPE_MIN + i * SLOPE_STEP;
    return { slopePer100, mse: lossAt(slopePer100).mse };
  },
);

export const BEST_LOSS: number = lossAt(BEST_SLOPE).mse;
export const MAX_LOSS: number = Math.max(...LOSS_CURVE.map((p) => p.mse));

export const MAX_KM: number = Math.max(...TRIPS.map((t) => t.x));
export const MAX_LITRES: number = Math.max(...TRIPS.map((t) => t.y));

/**
 * Which way is downhill from here — this is gradient descent, named without
 * using the word. Null when the two neighbours are level, i.e. at the bottom.
 */
export function downhillFrom(slopePer100: number): "lower" | "higher" | null {
  const delta = 0.05;
  const here = lossAt(slopePer100).mse;
  const lower = lossAt(slopePer100 - delta).mse;
  const higher = lossAt(slopePer100 + delta).mse;
  if (lower < here && lower <= higher) return "lower";
  if (higher < here) return "higher";
  return null;
}
