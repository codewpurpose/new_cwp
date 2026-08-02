/**
 * Number formatting for the Financial Literacy and Health in Tech lessons.
 *
 * `toLocaleString` and `Intl.NumberFormat` are BANNED in these modules, same
 * as the ML lessons. They are locale- and ICU-version-dependent, which makes
 * them the single most likely source of a server/client text mismatch. The
 * comma grouping below is plain string manipulation instead — deterministic,
 * and identical on every engine.
 */

const EM_DASH = "—";

/** $1,234 or -$1,234 — never $-1,234. digits defaults to 0: money in these
 *  lessons is illustrative, and cents rarely earn their place on the page. */
export function formatCurrency(value: number | null, digits = 0): string {
  if (value === null) return EM_DASH;
  const sign = value < 0 ? "-" : "";
  const fixed = Math.abs(value).toFixed(digits);
  const [whole, decimal] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}$${grouped}${decimal ? `.${decimal}` : ""}`;
}

export function formatPercent(value: number | null, digits = 0): string {
  return value === null ? EM_DASH : `${value.toFixed(digits)}%`;
}

export function formatYears(value: number, digits = 1): string {
  return `${value.toFixed(digits)}`;
}
