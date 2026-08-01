import type { Range } from "@/lib/ml/types";

/**
 * A linear scale from a data domain to a pixel range.
 *
 * Replaces the hand-written `xFor` in each chart. Call it once at module scope,
 * exactly where those constants already live — the returned function is pure.
 * Reversing the range (e.g. [bottom, top]) is how a y-axis is flipped.
 */
export interface LinearScale {
  (value: number): number;
  invert(pixel: number): number;
  domain: Range;
  range: Range;
}

export function linearScale(domain: Range, range: Range): LinearScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;

  const scale = ((value: number) => r0 + ((value - d0) / span) * (r1 - r0)) as LinearScale;
  scale.invert = (pixel: number) => d0 + ((pixel - r0) / (r1 - r0 || 1)) * span;
  scale.domain = domain;
  scale.range = range;
  return scale;
}
