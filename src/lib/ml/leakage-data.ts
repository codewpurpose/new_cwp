import { mulberry32, normalish, shuffled } from "@/lib/ml/random";

/**
 * The Data Leakage lesson.
 *
 * Three hundred and sixty loan applications, and four pipelines that differ
 * only in how carefully they were assembled. Every score here is computed, not
 * asserted: each pipeline trains a real k=5 neighbour classifier under its own
 * flawed protocol, reports what that protocol says, and is then re-scored under
 * the honest one.
 *
 * The dataset carries three planted traps:
 *   - `collectionsCalls` is recorded AFTER the outcome is known, so it is not
 *     available when a real decision has to be made.
 *   - Forty-five of the 270 applicants reapply twice, so a quarter of the rows
 *     are near-duplicates of an earlier one and share its outcome.
 *   - The default rate drifts upward over twenty-four months, so a random split
 *     lets a model train on the future.
 *
 * Seeded at module scope. See @/lib/ml/random.
 */

const random = mulberry32(20260829);

export interface Application {
  applicantId: number;
  month: number;
  income: number;
  amount: number;
  termMonths: number;
  priorDefaults: number;
  /** Only known after the loan has run its course. Using it is cheating. */
  collectionsCalls: number;
  defaulted: boolean;
}

export const MONTHS = 24;
const BASE_COUNT = 270;
/** Applicants who reapply, each contributing two further near-identical rows. */
const REPEAT_APPLICANTS = 45;

function makeApplication(applicantId: number, month: number): Application {
  const income = normalish(random, 31000, 9000, { min: 12000, max: 62000 });
  const amount = normalish(random, 6200, 2600, { min: 1000, max: 15000 });
  const termMonths = [12, 24, 36, 48, 60][Math.floor(random() * 5)];
  const priorDefaults = random() < 0.72 ? 0 : Math.floor(random() * 3) + 1;

  // Strain, plus a slow drift upward across the two years.
  const strain =
    (amount / income) * 6.4 + priorDefaults * 0.42 + (termMonths / 60) * 0.35 + (month / MONTHS) * 0.5;
  const defaulted = strain + normalish(random, 0, 0.34) > 2.42;

  // Recorded only once the outcome is in. Near-zero for a loan that was repaid.
  const collectionsCalls = defaulted
    ? Math.round(normalish(random, 7.4, 2.4, { min: 1, max: 14 }))
    : Math.round(normalish(random, 0.4, 0.7, { min: 0, max: 3 }));

  return { applicantId, month, income, amount, termMonths, priorDefaults, collectionsCalls, defaulted };
}

const BASE: Application[] = Array.from({ length: BASE_COUNT }, (_, i) =>
  makeApplication(i, Math.floor(random() * MONTHS)),
);

/**
 * Reapplications: the same person, a later month, barely changed circumstances
 * and the same outcome. In a real table these are separate rows with no marker
 * saying they belong together.
 */
const REPEATS: Application[] = Array.from({ length: REPEAT_APPLICANTS }, () => {
  const original = BASE[Math.floor(random() * BASE.length)];
  return [1, 2].map((step) => ({
    ...original,
    month: Math.min(MONTHS - 1, original.month + step * (1 + Math.floor(random() * 2))),
    income: original.income * (1 + normalish(random, 0, 0.012)),
    amount: original.amount * (1 + normalish(random, 0, 0.018)),
  }));
}).flat();

export const APPLICATIONS: readonly Application[] = [...BASE, ...REPEATS];
export const DEFAULT_RATE =
  APPLICATIONS.filter((a) => a.defaulted).length / APPLICATIONS.length;

/* -------------------------------------------------------------------------- */
/* A small classifier, so the scores are real                                  */
/* -------------------------------------------------------------------------- */

const HONEST_FEATURES = ["income", "amount", "termMonths", "priorDefaults"] as const;
type FeatureName = (typeof HONEST_FEATURES)[number] | "collectionsCalls";

const K = 5;

interface Scaler {
  low: Record<string, number>;
  span: Record<string, number>;
}

/**
 * Min-max scaling — squash each feature onto 0-1 — because it is what every
 * introduction teaches and because it is the scaler leakage actually moves. A
 * single extreme value in the test set redefines the range for every row,
 * where a mean and a standard deviation would barely flinch.
 */
function fitScaler(rows: readonly Application[], features: readonly FeatureName[]): Scaler {
  const low: Record<string, number> = {};
  const span: Record<string, number> = {};
  for (const f of features) {
    const values = rows.map((r) => r[f] as number);
    const min = Math.min(...values);
    const max = Math.max(...values);
    low[f] = min;
    span[f] = max - min || 1;
  }
  return { low, span };
}

function encode(
  row: Application,
  features: readonly FeatureName[],
  scaler: Scaler,
  blanked: readonly FeatureName[] = [],
): number[] {
  return features.map((f) => {
    if (blanked.includes(f)) return 0;
    return ((row[f] as number) - scaler.low[f]) / scaler.span[f];
  });
}

function classify(
  query: readonly number[],
  train: readonly { vector: number[]; defaulted: boolean }[],
): boolean {
  const near = train
    .map((t) => {
      let sum = 0;
      for (let i = 0; i < query.length; i += 1) {
        const d = query[i] - t.vector[i];
        sum += d * d;
      }
      return { d: sum, defaulted: t.defaulted };
    })
    .sort((a, b) => a.d - b.d)
    .slice(0, K);
  return near.filter((n) => n.defaulted).length * 2 > K;
}

interface RunOptions {
  features: readonly FeatureName[];
  train: readonly Application[];
  test: readonly Application[];
  /** Rows the scaler is fitted on. Passing everything is the subtle leak. */
  scalerRows: readonly Application[];
  /** Features unavailable at prediction time, zeroed on the test side. */
  blankedAtTest?: readonly FeatureName[];
}

function run({ features, train, test, scalerRows, blankedAtTest = [] }: RunOptions): number {
  const scaler = fitScaler(scalerRows, features);
  const encoded = train.map((row) => ({
    vector: encode(row, features, scaler),
    defaulted: row.defaulted,
  }));
  const correct = test.filter(
    (row) => classify(encode(row, features, scaler, blankedAtTest), encoded) === row.defaulted,
  ).length;
  return correct / test.length;
}

/* -------------------------------------------------------------------------- */
/* The splits each pipeline uses                                               */
/* -------------------------------------------------------------------------- */

const ORDER = shuffled(
  APPLICATIONS.map((_, i) => i),
  mulberry32(20260830),
);
const RANDOM_TEST = new Set(ORDER.slice(0, 120));

const RANDOM_TRAIN = APPLICATIONS.filter((_, i) => !RANDOM_TEST.has(i));
const RANDOM_HOLD = APPLICATIONS.filter((_, i) => RANDOM_TEST.has(i));

/** The honest split: everything from month 18 onward is the future. */
const CUTOFF_MONTH = 18;
const PAST = APPLICATIONS.filter((a) => a.month < CUTOFF_MONTH);
const FUTURE_RAW = APPLICATIONS.filter((a) => a.month >= CUTOFF_MONTH);

/** Applicants seen in the past cannot also appear in the future set. */
const PAST_IDS = new Set(PAST.map((a) => a.applicantId));
const FUTURE = FUTURE_RAW.filter((a) => !PAST_IDS.has(a.applicantId));

/* -------------------------------------------------------------------------- */
/* Four pipelines                                                              */
/* -------------------------------------------------------------------------- */

export interface Pipeline {
  key: string;
  name: string;
  /** What the code looks like, one line per step. */
  steps: readonly string[];
  /** The score this pipeline's own evaluation prints. */
  reported: number;
  /** The same model measured on genuinely future, unseen applicants. */
  honest: number;
  leak: string | null;
  tell: string;
}

/**
 * The honest protocol, and the number every other pipeline is inflating away
 * from: split on time, drop applicants the past has already seen, use only
 * columns that exist when the decision is made, and fit the scaler on the past.
 */
const HONEST_BASE = run({
  features: HONEST_FEATURES,
  train: PAST,
  test: FUTURE,
  scalerRows: PAST,
});

/**
 * Each leak below changes exactly ONE thing about that protocol, so the gap it
 * opens is attributable to that one mistake rather than to a pile of them.
 */

/** Only change: the post-outcome column is included. */
const REPORTED_TARGET = run({
  features: [...HONEST_FEATURES, "collectionsCalls"],
  train: PAST,
  test: FUTURE,
  scalerRows: PAST,
});

/** Only change: the future is not deduplicated against the past. */
const REPORTED_DUPES = run({
  features: HONEST_FEATURES,
  train: PAST,
  test: FUTURE_RAW,
  scalerRows: PAST,
});

/** Only change: the split ignores time. It also lets the duplicates back in. */
const REPORTED_RANDOM = run({
  features: HONEST_FEATURES,
  train: RANDOM_TRAIN,
  test: RANDOM_HOLD,
  scalerRows: RANDOM_TRAIN,
});

export const PIPELINES: readonly Pipeline[] = [
  {
    key: "target",
    name: "Every column we had",
    steps: [
      "features = all columns except the outcome",
      "train, test = random_split(applications, 0.33)",
      "model.fit(train)",
      "print(model.score(test))",
    ],
    reported: REPORTED_TARGET,
    honest: HONEST_BASE,
    leak: "collectionsCalls is written down after the loan defaults. It is not a cause of default, it is a consequence, and it does not exist when a real application is on the desk.",
    tell: "A single column carrying nearly all the accuracy, and a score far above anything the problem should allow.",
  },
  {
    key: "dupes",
    name: "Split on rows, not people",
    steps: [
      "past   = applications[month < 18]",
      "future = applications[month >= 18]",
      "# 45 applicants appear in both",
      "model.fit(past)",
      "print(model.score(future))",
    ],
    reported: REPORTED_DUPES,
    honest: HONEST_BASE,
    leak: "Forty-five applicants reapplied twice on barely changed terms, so the same person's rows landed on both sides of the wall. The model is being tested on people it has already met.",
    tell: "Under a point of inflation here, which is precisely why this one survives review. Give each person fifty rows instead of three and the same mistake is worth twenty.",
  },
  {
    key: "random",
    name: "Split at random",
    steps: [
      "train, test = random_split(applications, 0.33)",
      "model.fit(train)",
      "print(model.score(test))",
    ],
    reported: REPORTED_RANDOM,
    honest: HONEST_BASE,
    leak: "The default rate drifts upward across the two years, so a random split trains on month 20 and tests on month 4 — the model learns from the future. It also puts the reapplications back on both sides, which is the point: one careless line commits two leaks at once.",
    tell: "Any column that looks like a date, and a split that ignored it.",
  },
  {
    key: "honest",
    name: "Split by time, grouped by person",
    steps: [
      "past    = applications[month < 18]",
      "future  = applications[month >= 18]",
      "future  = future.drop(applicants_seen_in(past))",
      "scaler  = fit_scaler(past)",
      "model.fit(scale(past, scaler))",
      "print(model.score(scale(future, scaler)))",
    ],
    reported: HONEST_BASE,
    honest: HONEST_BASE,
    leak: null,
    tell: "The score went down and the model got better. That is what fixing a leak feels like.",
  },
];

export const HONEST_PIPELINE = PIPELINES[PIPELINES.length - 1];
export const WORST_GAP = PIPELINES.reduce((worst, p) =>
  p.reported - p.honest > worst.reported - worst.honest ? p : worst,
);
export const PAST_COUNT = PAST.length;
export const FUTURE_COUNT = FUTURE.length;
