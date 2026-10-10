/** The illustration palette, from DESIGN.md's sand, paper, ink and moss. */
export const INK = "#15120c";
export const LEAF = "#3e7f5c";
export const MOSS = "#1e3c2c";
export const MINT = "#dbefdb";
export const PISTACHIO = "#bfe0bd";
export const SAND = "#fcf4e8";
export const SAND_DEEP = "#efe2cc";
export const PAPER = "#fffbf5";
export const WHITE = "#ffffff";
export const QUIET = "#cfc5b4";
export const MUTED_TEXT = "#9a907f";

/** A four-point sparkle centred on (x, y), the same shape the site already uses. */
export function sparkle(x: number, y: number, r: number) {
  const a = +(r * 0.667).toFixed(2);
  const b = +(r * 0.333).toFixed(2);
  return `M${x} ${y - r}c0 ${a} ${b} ${r} ${r} ${r}c${-a} 0 ${-r} ${b} ${-r} ${r}c0 ${-a} ${-b} ${-r} ${-r} ${-r}c${a} 0 ${r} ${-b} ${r} ${-r}Z`;
}
