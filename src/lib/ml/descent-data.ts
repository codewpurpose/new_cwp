/**
 * Seeded data + pure maths for the Gradient Descent lesson.
 *
 * The error surface here is a plain quadratic bowl — not fitted through noisy
 * data, unlike the fuel-efficiency bowl in the "How Models Learn" lesson.
 * That is deliberate: every number the search touches (the gradient, the
 * update, the point where it converges or blows up) is exactly reproducible
 * from the four constants below, with no dataset and no floating-point sum
 * in between to round differently on two machines.
 *
 * loss(w) = CURVATURE * (w - W_STAR) ** 2 + BASE_LOSS
 * gradient(w) = 2 * CURVATURE * (w - W_STAR)
 *
 * W_STAR and CURVATURE are picked so the four learning rates named in the
 * lesson land on the three outcomes it promises: 0.001 is still most of the
 * way from the answer after fifty steps, 0.03 arrives in single digits, and
 * 0.3 and 1.02 both throw the search off the hill — one oscillating outward
 * over a few steps, the other in a single violent jump.
 */

export interface DescentStep {
  step: number;
  weight: number;
  loss: number;
  gradient: number;
}

/** Where the bowl bottoms out — the setting the search is hunting for. */
export const W_STAR = 7.8;

/** How steeply the bowl rises around W_STAR. */
export const CURVATURE = 8;

/** The bowl never quite touches zero — real error rarely does either. */
export const BASE_LOSS = 0.4;

/** Every run starts from the same guess, deliberately far from the answer. */
export const START_WEIGHT = 0.5;

/** Plotted range of the parameter. */
export const WEIGHT_MIN = -1;
export const WEIGHT_MAX = 16.5;

/** A run stops offering more steps here even if it has not settled. */
export const MAX_STEPS = 50;

/** Closer than this to W_STAR counts as arrived. */
export const CONVERGED_TOLERANCE = 0.05;

/** Further than this from W_STAR counts as diverged, not just slow. */
export const DIVERGED_DISTANCE = (WEIGHT_MAX - WEIGHT_MIN) * 3;

/** Hard stop on the raw computation, so a divergent run cannot print a number a hundred digits long. */
const BREAK_DISTANCE = 2000;

export function lossAt(weight: number): number {
  const d = weight - W_STAR;
  return CURVATURE * d * d + BASE_LOSS;
}

export function gradientAt(weight: number): number {
  return 2 * CURVATURE * (weight - W_STAR);
}

/** The entire update rule: new = old − rate × gradient. */
export function stepWeight(weight: number, rate: number): number {
  return weight - rate * gradientAt(weight);
}

/**
 * Walks up to `steps` updates from START_WEIGHT at the given learning rate.
 * Stops early only once the run has gone well past DIVERGED_DISTANCE — far
 * enough that another point would only make the axis label harder to read,
 * never because the value itself was clamped.
 */
export function runDescent(rate: number, steps: number): DescentStep[] {
  const path: DescentStep[] = [
    {
      step: 0,
      weight: START_WEIGHT,
      loss: lossAt(START_WEIGHT),
      gradient: gradientAt(START_WEIGHT),
    },
  ];

  for (let i = 1; i <= steps; i += 1) {
    const previous = path[path.length - 1].weight;
    const weight = stepWeight(previous, rate);
    path.push({ step: i, weight, loss: lossAt(weight), gradient: gradientAt(weight) });
    if (Math.abs(weight - W_STAR) > BREAK_DISTANCE) break;
  }

  return path;
}

export function hasConverged(weight: number): boolean {
  return Math.abs(weight - W_STAR) < CONVERGED_TOLERANCE;
}

export interface RatePreset {
  key: string;
  label: string;
  rate: number;
  note: string;
}

export const RATE_PRESETS: readonly RatePreset[] = [
  {
    key: "tiny",
    label: "0.001",
    rate: 0.001,
    note: "The right direction every time, at a pace that will not arrive this century.",
  },
  {
    key: "good",
    label: "0.03",
    rate: 0.03,
    note: "The same search, converging in single digits of steps.",
  },
  {
    key: "large",
    label: "0.3",
    rate: 0.3,
    note: "Overshoots the bottom, then overshoots the overshoot. Each step is worse than the last.",
  },
  {
    key: "reckless",
    label: "1.02",
    rate: 1.02,
    note: "One step is enough to throw it off the hill entirely.",
  },
] as const;

export interface BowlPoint {
  weight: number;
  loss: number;
}

/** Fixed samples across the plotted range, for drawing the bowl itself. */
export const BOWL_CURVE: readonly BowlPoint[] = Array.from({ length: 121 }, (_, i) => {
  const weight = WEIGHT_MIN + (i / 120) * (WEIGHT_MAX - WEIGHT_MIN);
  return { weight, loss: lossAt(weight) };
});

export const MAX_BOWL_LOSS: number = Math.max(...BOWL_CURVE.map((p) => p.loss));
