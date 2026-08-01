/**
 * Number formatting for the ML lessons.
 *
 * `toLocaleString` and `Intl.NumberFormat` are BANNED in these modules. They
 * are locale- and ICU-version-dependent, which makes them the single most
 * likely source of a server/client text mismatch in a component that prints
 * forty numbers. Use `toFixed` only.
 */

const EM_DASH = "—";
const MINUS = "−";

/** An undefined ratio renders as an em dash. It is never 0. */
export function formatRatio(value: number | null, digits = 2): string {
  return value === null ? EM_DASH : value.toFixed(digits);
}

export function formatPercent(value: number | null, digits = 0): string {
  return value === null ? EM_DASH : `${(value * 100).toFixed(digits)}%`;
}

export function formatNumber(value: number | null, digits = 1): string {
  return value === null ? EM_DASH : value.toFixed(digits);
}

/** Uses a true minus sign so digits stay aligned in tabular-nums columns. */
export function formatSigned(value: number, digits = 2): string {
  const fixed = Math.abs(value).toFixed(digits);
  return value < 0 ? `${MINUS}${fixed}` : `+${fixed}`;
}

/** Plain integer, no grouping separators — see the ban above. */
export function formatCount(value: number): string {
  return String(Math.round(value));
}
