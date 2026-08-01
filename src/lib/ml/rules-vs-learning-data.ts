import { gridSearchMax } from "@/lib/ml/search";
import { mulberry32, normalish } from "@/lib/ml/random";

/**
 * Spam messages for the "What Is Machine Learning?" lesson.
 *
 * The true boundary is a DIAGONAL — a two-line message with three links is
 * spam, a 300-word newsletter with three links is not. Axis-aligned rules can
 * only staircase toward a diagonal, so the visual metaphor and the maths are
 * the same object: the staircase never becomes the line.
 *
 * The 4% label noise puts a ceiling below 100% on every approach including the
 * learned one, which stops a reader concluding that enough rules would finish
 * the job.
 */

export const MESSAGE_COUNT = 240;
export const MAX_RULES = 8;
export const MAX_WORDS = 320;
export const MAX_LINKS = 12;

export interface Message {
  words: number;
  links: number;
  isSpam: boolean;
}

function generate(): Message[] {
  const random = mulberry32(20260901);
  return Array.from({ length: MESSAGE_COUNT }, () => {
    const words = 20 + Math.round(random() * 300);
    const links = Math.round(normalish(random, 3.2, 2.4, { min: 0, max: MAX_LINKS }));
    let isSpam = links > 0.026 * words - 0.9;
    if (random() < 0.04) isSpam = !isSpam;
    return { words, links, isSpam };
  });
}

export const MESSAGES: readonly Message[] = generate();
export const TOTAL_SPAM = MESSAGES.filter((m) => m.isSpam).length;
export const TOTAL_NOT_SPAM = MESSAGE_COUNT - TOTAL_SPAM;

/** "Flag it if it has at least `linksMin` links and at most `wordsMax` words." */
export interface Rule {
  wordsMax: number;
  linksMin: number;
  sentence: string;
}

function matches(rule: Rule, m: Message): boolean {
  return m.links >= rule.linksMin && m.words <= rule.wordsMax;
}

function flaggedBy(rules: readonly Rule[], m: Message): boolean {
  return rules.some((r) => matches(r, m));
}

export interface RuleStep {
  rules: readonly Rule[];
  newest: Rule | null;
  accuracy: number;
  gain: number;
  flagged: number;
  wrong: number;
  /** Null at zero rules — nothing was flagged, so the ratio is undefined. */
  precision: number | null;
}

function evaluate(rules: readonly Rule[]): { accuracy: number; flagged: number; wrong: number; precision: number | null } {
  let correct = 0;
  let flagged = 0;
  let truePositives = 0;
  for (const m of MESSAGES) {
    const predicted = flaggedBy(rules, m);
    if (predicted) {
      flagged += 1;
      if (m.isSpam) truePositives += 1;
    }
    if (predicted === m.isSpam) correct += 1;
  }
  return {
    accuracy: correct / MESSAGE_COUNT,
    flagged,
    wrong: MESSAGE_COUNT - correct,
    precision: flagged === 0 ? null : truePositives / flagged,
  };
}

/** Greedy: at each step add whichever single rule improves accuracy most. */
function buildSteps(): RuleStep[] {
  const candidates: Rule[] = [];
  for (let wordsMax = 20; wordsMax <= MAX_WORDS; wordsMax += 20) {
    for (let linksMin = 0; linksMin <= MAX_LINKS; linksMin += 1) {
      candidates.push({
        wordsMax,
        linksMin,
        sentence: `flag it if it has ${linksMin} or more links and is under ${wordsMax} words`,
      });
    }
  }

  const chosen: Rule[] = [];
  const base = evaluate([]);
  const steps: RuleStep[] = [
    { rules: [], newest: null, accuracy: base.accuracy, gain: 0, flagged: base.flagged, wrong: base.wrong, precision: base.precision },
  ];

  let previousAccuracy = base.accuracy;
  for (let i = 0; i < MAX_RULES; i += 1) {
    let best: { rule: Rule; accuracy: number } | null = null;
    for (const candidate of candidates) {
      const { accuracy } = evaluate([...chosen, candidate]);
      if (best === null || accuracy > best.accuracy) best = { rule: candidate, accuracy };
    }
    if (!best) break;
    chosen.push(best.rule);
    const result = evaluate(chosen);
    steps.push({
      rules: [...chosen],
      newest: best.rule,
      accuracy: result.accuracy,
      gain: result.accuracy - previousAccuracy,
      flagged: result.flagged,
      wrong: result.wrong,
      precision: result.precision,
    });
    previousAccuracy = result.accuracy;
  }

  return steps;
}

export const RULE_STEPS: readonly RuleStep[] = buildSteps();

/** What a model learns instead: one straight line, found by search. */
export const LEARNED_BOUNDARY: { slope: number; intercept: number } = (() => {
  let best = { slope: 0.026, intercept: -0.9, score: -1 };
  const slopeSearch = gridSearchMax(0.01, 0.045, 35, (slope) => {
    const inner = gridSearchMax(-3, 3, 60, (intercept) => {
      let correct = 0;
      for (const m of MESSAGES) {
        if (m.links > slope * m.words + intercept === m.isSpam) correct += 1;
      }
      return correct / MESSAGE_COUNT;
    });
    if (inner && inner.score > best.score) {
      best = { slope, intercept: inner.value, score: inner.score };
    }
    return inner?.score ?? null;
  });
  void slopeSearch;
  return { slope: best.slope, intercept: best.intercept };
})();

export const LEARNED_ACCURACY: number = (() => {
  let correct = 0;
  for (const m of MESSAGES) {
    const predicted = m.links > LEARNED_BOUNDARY.slope * m.words + LEARNED_BOUNDARY.intercept;
    if (predicted === m.isSpam) correct += 1;
  }
  return correct / MESSAGE_COUNT;
})();

export function isFlagged(rules: readonly Rule[], m: Message): boolean {
  return flaggedBy(rules, m);
}
