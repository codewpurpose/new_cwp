import { groupedHistogram } from "@/lib/ml/histogram";
import { mulberry32, normalish } from "@/lib/ml/random";

/**
 * Loaves of bread: baking time against oven temperature, for the Features and
 * Labels lesson.
 *
 * The heat-dose threshold is calibrated against real baking — 30 min at 200 °C
 * is done, 30 min at 160 °C is not — so a beginner can sanity-check the labels
 * against their own intuition rather than taking them on trust.
 *
 * Neither raw measurement separates the classes on its own. A blend of the two
 * nearly does. That is the entire lesson: a feature is something you can invent,
 * not only something you were handed.
 */

export const LOAF_COUNT = 140;
export const MIN_MINUTES = 14;
export const MAX_MINUTES = 44;
export const MIN_CELSIUS = 170;
export const MAX_CELSIUS = 250;
export const BIN_COUNT = 14;
export const BLEND_STEPS_COUNT = 101;

export interface Loaf {
  minutes: number;
  celsius: number;
  /** Both normalised to 0-1 so the blend is a fair mix rather than unit-dominated. */
  mNorm: number;
  cNorm: number;
  cooked: boolean;
}

function generate(): Loaf[] {
  const random = mulberry32(20260902);
  return Array.from({ length: LOAF_COUNT }, () => {
    const minutes = MIN_MINUTES + random() * (MAX_MINUTES - MIN_MINUTES);
    const celsius = MIN_CELSIUS + random() * (MAX_CELSIUS - MIN_CELSIUS);
    const dose = (minutes - 8) * (celsius - 120);
    // Per-loaf thickness variation: the same dose does not always cook.
    let cooked = dose > 1500 * (1 + normalish(random, 0, 0.16));
    if (random() < 0.03) cooked = !cooked;
    return {
      minutes,
      celsius,
      mNorm: (minutes - MIN_MINUTES) / (MAX_MINUTES - MIN_MINUTES),
      cNorm: (celsius - MIN_CELSIUS) / (MAX_CELSIUS - MIN_CELSIUS),
      cooked,
    };
  });
}

export const LOAVES: readonly Loaf[] = generate();
export const TOTAL_COOKED = LOAVES.filter((l) => l.cooked).length;
export const TOTAL_UNDER = LOAF_COUNT - TOTAL_COOKED;

/** The invented feature: t = 0 is time only, t = 1 is temperature only. */
export function blendValue(loaf: Loaf, t: number): number {
  return (1 - t) * loaf.mNorm + t * loaf.cNorm;
}

export interface BlendStep {
  t: number;
  cut: number;
  wrong: number;
  errorRate: number;
  cookedCalledUnder: number;
  underCalledCooked: number;
  histogram: readonly { start: number; end: number; cooked: number; under: number }[];
  /** The cut translated back into the world, so the invented feature means something. */
  minutesAt200: number;
  minutesAt235: number;
}

/**
 * Sorts once per blend and sweeps the cut in a single pass, rather than nesting
 * a candidate loop inside a point loop.
 */
function stepFor(t: number): BlendStep {
  const scored = LOAVES.map((l) => ({ value: blendValue(l, t), cooked: l.cooked })).sort(
    (a, b) => a.value - b.value,
  );

  // Sweep: everything at or above the cut is called cooked.
  let bestWrong = Number.POSITIVE_INFINITY;
  let bestCut = 0;
  let bestCookedCalledUnder = 0;
  let bestUnderCalledCooked = 0;

  let cookedBelow = 0;
  let underBelow = 0;
  for (let i = 0; i <= scored.length; i += 1) {
    // Below the cut we call "under"; above we call "cooked".
    const cookedCalledUnder = cookedBelow;
    const underCalledCooked = TOTAL_UNDER - underBelow;
    const wrong = cookedCalledUnder + underCalledCooked;
    if (wrong < bestWrong) {
      bestWrong = wrong;
      bestCut = i === 0 ? 0 : i === scored.length ? 1 : (scored[i - 1].value + scored[i].value) / 2;
      bestCookedCalledUnder = cookedCalledUnder;
      bestUnderCalledCooked = underCalledCooked;
    }
    if (i < scored.length) {
      if (scored[i].cooked) cookedBelow += 1;
      else underBelow += 1;
    }
  }

  const histogram = groupedHistogram(
    LOAVES.map((l) => ({ value: blendValue(l, t), group: l.cooked ? "cooked" : "under" as const })),
    { min: 0, max: 1, binCount: BIN_COUNT, groups: ["cooked", "under"] as const },
  ).map((b) => ({ start: b.start, end: b.end, cooked: b.counts.cooked, under: b.counts.under }));

  // Invert the blend to find the minutes that hit the cut at a given temperature.
  const minutesFor = (celsius: number) => {
    const cNorm = (celsius - MIN_CELSIUS) / (MAX_CELSIUS - MIN_CELSIUS);
    if (t >= 1) return Number.NaN;
    const mNorm = (bestCut - t * cNorm) / (1 - t);
    return MIN_MINUTES + mNorm * (MAX_MINUTES - MIN_MINUTES);
  };

  return {
    t,
    cut: bestCut,
    wrong: bestWrong,
    errorRate: bestWrong / LOAF_COUNT,
    cookedCalledUnder: bestCookedCalledUnder,
    underCalledCooked: bestUnderCalledCooked,
    histogram,
    minutesAt200: minutesFor(200),
    minutesAt235: minutesFor(235),
  };
}

export const BLEND_STEPS: readonly BlendStep[] = Array.from(
  { length: BLEND_STEPS_COUNT },
  (_, i) => stepFor(i / (BLEND_STEPS_COUNT - 1)),
);

export function stepAtBlend(t: number): BlendStep {
  return BLEND_STEPS[Math.round(t * (BLEND_STEPS_COUNT - 1))];
}

export const BEST_BLEND: number = BLEND_STEPS.reduce(
  (best, step) => (step.wrong < BLEND_STEPS[Math.round(best * 100)].wrong ? step.t : best),
  0,
);

export const MAX_BIN: number = Math.max(
  ...BLEND_STEPS.flatMap((s) => s.histogram.flatMap((b) => [b.cooked, b.under])),
);
