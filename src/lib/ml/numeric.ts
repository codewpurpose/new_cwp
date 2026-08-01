/** Small numeric helpers shared by the ML lesson data modules. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function linspace(start: number, stop: number, count: number): number[] {
  if (count <= 1) return [start];
  const step = (stop - start) / (count - 1);
  return Array.from({ length: count }, (_, i) => start + step * i);
}

/** A sum of nothing IS zero. */
export function sum(values: readonly number[]): number {
  let total = 0;
  for (const value of values) total += value;
  return total;
}

/**
 * An average of nothing is NOT zero — it is undefined.
 *
 * The asymmetry with `sum` is deliberate and matches how the lessons treat
 * every other ratio: undefined renders as an em dash, never as 0.00.
 */
export function mean(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return sum(values) / values.length;
}

export function variance(
  values: readonly number[],
  options?: { sample?: boolean },
): number | null {
  const n = values.length;
  const divisor = options?.sample ? n - 1 : n;
  if (n === 0 || divisor <= 0) return null;
  const average = sum(values) / n;
  let total = 0;
  for (const value of values) total += (value - average) ** 2;
  return total / divisor;
}

export function minMax(values: readonly number[]): { min: number; max: number } | null {
  if (values.length === 0) return null;
  let min = values[0];
  let max = values[0];
  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return { min, max };
}

/** Linear interpolation between order statistics. Input must be sorted ascending. */
export function quantile(sortedAscending: readonly number[], q: number): number | null {
  const n = sortedAscending.length;
  if (n === 0) return null;
  if (n === 1) return sortedAscending[0];
  const position = clamp(q, 0, 1) * (n - 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sortedAscending[lower];
  return lerp(sortedAscending[lower], sortedAscending[upper], position - lower);
}

export interface Extremum {
  index: number;
  value: number;
  score: number;
}

/** Null scores are skipped, so an undefined metric never wins by accident. */
export function argmax(
  values: readonly number[],
  score: (value: number, index: number) => number | null,
): Extremum | null {
  let best: Extremum | null = null;
  values.forEach((value, index) => {
    const s = score(value, index);
    if (s === null) return;
    if (best === null || s > best.score) best = { index, value, score: s };
  });
  return best;
}

export function argmin(
  values: readonly number[],
  score: (value: number, index: number) => number | null,
): Extremum | null {
  return argmax(values, (value, index) => {
    const s = score(value, index);
    return s === null ? null : -s;
  });
}
