/**
 * Grid search over a scalar parameter, run once at module scope.
 *
 * This is how a lesson finds its own "best" preset instead of hardcoding a
 * magic number that silently drifts when the data changes.
 */

export interface GridResult {
  value: number;
  score: number;
}

/** Scans `steps + 1` evenly spaced values, inclusive of both ends. Null scores are skipped. */
export function gridSearchMax(
  from: number,
  to: number,
  steps: number,
  score: (value: number) => number | null,
): GridResult | null {
  let best: GridResult | null = null;
  for (let i = 0; i <= steps; i += 1) {
    const value = from + ((to - from) * i) / steps;
    const s = score(value);
    if (s === null) continue;
    if (best === null || s > best.score) best = { value, score: s };
  }
  return best;
}

export function gridSearchMin(
  from: number,
  to: number,
  steps: number,
  score: (value: number) => number | null,
): GridResult | null {
  const best = gridSearchMax(from, to, steps, (value) => {
    const s = score(value);
    return s === null ? null : -s;
  });
  return best === null ? null : { value: best.value, score: -best.score };
}
