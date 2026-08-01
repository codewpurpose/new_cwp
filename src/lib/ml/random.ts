/**
 * Deterministic randomness for the ML lessons.
 *
 * Every lesson generates its data at module scope from a fixed seed. That runs
 * once on the server during SSR and once in the browser, and because nothing
 * here touches Math.random or Date, both produce byte-identical arrays — no
 * hydration mismatch is possible by construction.
 */

/** Small, fast, and bit-identical across JS engines (32-bit integer ops only). */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface NormalishOptions {
  min?: number;
  max?: number;
}

/**
 * Approximates a normal draw by summing uniforms (Irwin-Hall).
 *
 * The sum of n uniforms has mean n/2 and standard deviation sqrt(n/12), so
 * dividing the centred sum by that constant makes `spread` a TRUE standard
 * deviation rather than a fudge factor.
 *
 * Consumes exactly IRWIN_HALL_N values from `random`. Do not change that count
 * or the ordering — lesson data is reproduced from call order, and a change
 * here silently alters every generated dataset.
 */
const IRWIN_HALL_N = 6;
const IRWIN_HALL_SD = Math.sqrt(IRWIN_HALL_N / 12);

export function normalish(
  random: () => number,
  mean: number,
  spread: number,
  options?: NormalishOptions,
): number {
  let sum = 0;
  for (let i = 0; i < IRWIN_HALL_N; i += 1) sum += random();
  const standard = (sum - IRWIN_HALL_N / 2) / IRWIN_HALL_SD;
  const value = mean + standard * spread;

  const min = options?.min;
  const max = options?.max;
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

/** Fisher-Yates. Returns a new array; never mutates the input. */
export function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** `count` independent permutations of [0..length), all from one seed. */
export function permutations(
  length: number,
  count: number,
  seed: number,
): readonly (readonly number[])[] {
  const random = mulberry32(seed);
  const indices = Array.from({ length }, (_, i) => i);
  return Array.from({ length: count }, () => shuffled(indices, random));
}
