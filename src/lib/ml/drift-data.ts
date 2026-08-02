/**
 * Seeded twenty-four-month history for a deployed model, used by the
 * "From Notebook to Production" chapter's drift monitor.
 *
 * Three things move together every month: the model's true accuracy (only
 * knowable once labels arrive), how far the inputs it is scoring have drifted
 * from the training distribution, and how many predictions it served. A
 * one-off shock at `DRIFT_MONTH` stands in for a real change in the world —
 * a pricing change, a new competitor, a policy update — that the model was
 * never told about.
 *
 * The data is generated from a fixed seed so every reader sees the same
 * history and the numbers quoted in the prose stay true.
 */

import { mulberry32, normalish } from "@/lib/ml/random";
import { clamp } from "@/lib/ml/numeric";

export interface MonthRecord {
  /** 1-indexed month since deployment. */
  month: number;
  /** True accuracy that month, had the model never been retrained. Only knowable once labels arrive. */
  accuracy: number;
  /** Distance between that month's inputs and the training distribution, a PSI-like score where 0 is identical. */
  inputShift: number;
  /** Predictions served that month. Business volume, not affected by drift or retraining. */
  volume: number;
}

export const MONTH_COUNT = 24;

/** The month something in the world changed — not a bug, a regime shift. */
export const DRIFT_MONTH = 9;

/** How long ground-truth labels take to arrive after a prediction is made. */
export const LABEL_DELAY_MONTHS = 3;

/** Extra time before enough freshly labelled cases have piled up for a human to trust the number. */
export const DETECTION_LAG_MONTHS = 1;

/** The month a human monitoring accuracy would actually have noticed. */
export const DISCOVERY_MONTH = DRIFT_MONTH + LABEL_DELAY_MONTHS + DETECTION_LAG_MONTHS;

/** Months of degraded predictions that sat unnoticed before discovery. */
export const BLIND_WINDOW_MONTHS = DISCOVERY_MONTH - DRIFT_MONTH;

export const INITIAL_ACCURACY = 0.91;

/** A commonly used rule of thumb: a population-stability-style score above this is a "significant" shift. */
export const INPUT_SHIFT_ALERT = 0.2;

const ORGANIC_ACCURACY_DECAY_PER_MONTH = 0.0015;
const SHOCK_ACCURACY_DROP = 0.085;
const POST_SHOCK_ACCURACY_DECAY_PER_MONTH = 0.004;
const RETRAIN_RESIDUAL = 0.012;

const ORGANIC_SHIFT_PER_MONTH = 0.006;
const SHOCK_SHIFT = 0.14;

const VOLUME_BASE = 8200;
const VOLUME_GROWTH_PER_MONTH = 140;
const VOLUME_SEASONAL_AMPLITUDE = 600;

interface MonthSeed {
  accuracyNoise: number;
  accuracyNoiseRetrained: number;
  shiftNoise: number;
  shiftNoiseRetrained: number;
  volumeNoise: number;
}

function buildSeeds(): readonly MonthSeed[] {
  const random = mulberry32(20260802);
  return Array.from({ length: MONTH_COUNT }, () => ({
    accuracyNoise: normalish(random, 0, 0.006, { min: -0.016, max: 0.016 }),
    accuracyNoiseRetrained: normalish(random, 0, 0.006, { min: -0.016, max: 0.016 }),
    shiftNoise: normalish(random, 0, 0.009, { min: -0.02, max: 0.02 }),
    shiftNoiseRetrained: normalish(random, 0, 0.009, { min: -0.02, max: 0.02 }),
    volumeNoise: normalish(random, 0, 220, { min: -520, max: 520 }),
  }));
}

const SEEDS = buildSeeds();

function seedAt(month: number): MonthSeed {
  return SEEDS[month - 1];
}

function baseAccuracy(month: number): number {
  const organic = ORGANIC_ACCURACY_DECAY_PER_MONTH * month;
  const shock =
    month >= DRIFT_MONTH
      ? SHOCK_ACCURACY_DROP + POST_SHOCK_ACCURACY_DECAY_PER_MONTH * (month - DRIFT_MONTH)
      : 0;
  return clamp(INITIAL_ACCURACY - organic - shock + seedAt(month).accuracyNoise, 0.4, 0.99);
}

function baseInputShift(month: number): number {
  const organic = ORGANIC_SHIFT_PER_MONTH * month;
  const shock = month >= DRIFT_MONTH ? SHOCK_SHIFT : 0;
  return Math.max(0, organic + shock + seedAt(month).shiftNoise);
}

function monthVolume(month: number): number {
  const trend = VOLUME_BASE + VOLUME_GROWTH_PER_MONTH * month;
  const seasonal = VOLUME_SEASONAL_AMPLITUDE * Math.sin((month / 12) * 2 * Math.PI);
  return Math.max(0, Math.round(trend + seasonal + seedAt(month).volumeNoise));
}

/** The full twenty-four-month history, as if the model were never retrained. */
export const MONTHS: readonly MonthRecord[] = Array.from({ length: MONTH_COUNT }, (_, i) => {
  const month = i + 1;
  return {
    month,
    accuracy: baseAccuracy(month),
    inputShift: baseInputShift(month),
    volume: monthVolume(month),
  };
});

/**
 * True accuracy for a given month, given an optional retraining month.
 * Retraining resets the model to the current world, so decay resumes from a
 * slightly lower ceiling — a retrained model is not free, it is honest work
 * repeated on a harder problem.
 */
export function accuracyAt(month: number, retrainMonth: number | null): number {
  if (retrainMonth === null || month <= retrainMonth) return baseAccuracy(month);
  const sinceRetrain = month - retrainMonth;
  const organic = ORGANIC_ACCURACY_DECAY_PER_MONTH * sinceRetrain;
  return clamp(
    INITIAL_ACCURACY - RETRAIN_RESIDUAL - organic + seedAt(month).accuracyNoiseRetrained,
    0.4,
    0.99,
  );
}

/** Input drift for a given month, given an optional retraining month. */
export function inputShiftAt(month: number, retrainMonth: number | null): number {
  if (retrainMonth === null || month <= retrainMonth) return baseInputShift(month);
  const sinceRetrain = month - retrainMonth;
  return Math.max(
    0,
    ORGANIC_SHIFT_PER_MONTH * sinceRetrain + seedAt(month).shiftNoiseRetrained,
  );
}

/** Predictions served that month. Unaffected by drift or retraining. */
export function volumeAt(month: number): number {
  return MONTHS[month - 1].volume;
}

/**
 * Predictions served between the world changing and the point a human,
 * limited by how far the reader has scrubbed, would have noticed. Freezes at
 * the total once `currentMonth` reaches `DISCOVERY_MONTH` — after discovery
 * the predictions are no longer *quietly* degraded, whatever the model's
 * accuracy is doing.
 */
export function predictionsWhileDegraded(currentMonth: number): number {
  if (currentMonth < DRIFT_MONTH) return 0;
  const through = Math.min(currentMonth, DISCOVERY_MONTH);
  let total = 0;
  for (let month = DRIFT_MONTH; month <= through; month += 1) total += volumeAt(month);
  return total;
}

/** The fixed total for the full blind window, quoted in the prose. */
export const BLIND_WINDOW_VOLUME = predictionsWhileDegraded(DISCOVERY_MONTH);

/** Accuracy at the moment of discovery, had nothing been retrained — for the prose. */
export const ACCURACY_AT_DISCOVERY = accuracyAt(DISCOVERY_MONTH, null);

/** Accuracy at month 24, had nothing been retrained — for the prose. */
export const ACCURACY_AT_END = accuracyAt(MONTH_COUNT, null);
