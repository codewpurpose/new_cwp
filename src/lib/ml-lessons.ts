import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_ML_HREF } from "@/lib/links";

/**
 * The Machine Learning track: seven lessons covering only the fundamentals, in
 * order, each built around a single interactive.
 *
 * Written natively as LearnChapters (rather than adapted from a thinner shape)
 * so the track gets the same sidebar, table of contents, and prev/next pager as
 * the Vibe Coding chapters.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const ML_PARTS: readonly LearnPart[] = [
  {
    id: "foundations",
    number: 1,
    title: "What Machine Learning Is",
    summary:
      "What the field actually does, what data has to look like, and what it means for a model to learn.",
  },
  {
    id: "doing-it-well",
    number: 2,
    title: "Getting It Right",
    summary:
      "The two questions you can ask, why you hold data back, and the failure that catches everyone.",
  },
];

export const ML_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "what-is-ml",
    partId: "foundations",
    order: 1,
    title: "What Is Machine Learning?",
    description:
      "Some problems cannot be solved by writing rules, no matter how many you write. Stack rules one at a time and watch each one buy you less than the last.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-problem-you-can-write-rules-for", text: "A problem you can write rules for", level: 2 },
      { id: "a-problem-you-cannot", text: "A problem you cannot", level: 2 },
      { id: "what-the-machine-does-instead", text: "What the machine does instead", level: 2 },
      { id: "what-this-costs-you", text: "What this costs you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "features-and-labels",
    partId: "foundations",
    order: 2,
    title: "Features and Labels",
    description:
      "Data does not arrive ready to learn from. See how two measurements that are each useless on their own combine into one that works.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "the-two-words", text: "The two words", level: 2 },
      { id: "a-feature-is-a-choice", text: "A feature is a choice", level: 2 },
      { id: "inventing-a-better-one", text: "Inventing a better one", level: 2 },
      { id: "where-labels-come-from", text: "Where labels come from", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-models-learn",
    partId: "foundations",
    order: 3,
    title: "How a Model Learns",
    description:
      "Learning sounds mysterious. It is not. Drag one number, watch total error rise and fall, and find the bottom of the bowl yourself.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-model-with-one-number", text: "A model with one number", level: 2 },
      { id: "measuring-how-wrong-you-are", text: "Measuring how wrong you are", level: 2 },
      { id: "the-shape-of-being-wrong", text: "The shape of being wrong", level: 2 },
      { id: "that-is-the-whole-trick", text: "That is the whole trick", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "classification-vs-regression",
    partId: "doing-it-well",
    order: 4,
    title: "Classification vs Regression",
    description:
      "Categories or numbers? The line between them is a choice you make — and chopping a number into categories can make your accuracy look better while the model gets less useful.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["how-models-learn"],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "two-kinds-of-question", text: "Two kinds of question", level: 2 },
      { id: "the-same-model-both-ways", text: "The same model, both ways", level: 2 },
      { id: "accuracy-is-not-comparable", text: "Accuracy is not comparable", level: 2 },
      { id: "choosing-the-shape", text: "Choosing the shape of your answer", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "train-test-split",
    partId: "doing-it-well",
    order: 5,
    title: "Train/Test Split",
    description:
      "A model graded on the data it studied will always flatter itself. Re-roll the split and watch the score you would have reported swing by six points.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "grading-your-own-homework", text: "Grading your own homework", level: 2 },
      { id: "holding-some-back", text: "Holding some back", level: 2 },
      { id: "the-score-is-a-lottery-ticket", text: "The score is a lottery ticket", level: 2 },
      { id: "how-much-to-hold-back", text: "How much to hold back", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "overfitting",
    partId: "doing-it-well",
    order: 6,
    title: "Overfitting and Underfitting",
    description:
      "The central failure of machine learning. Add bends to a curve until it passes through every training point — and gets dramatically worse at everything else.",
    level: "beginner",
    minutes: 12,
    prerequisites: ["train-test-split"],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "too-simple", text: "Too simple", level: 2 },
      { id: "too-complicated", text: "Too complicated", level: 2 },
      { id: "the-gap-is-the-definition", text: "The gap is the definition", level: 2 },
      { id: "why-training-error-cannot-help", text: "Why training error cannot help you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "precision-recall",
    partId: "doing-it-well",
    order: 7,
    title: "Measuring a Model",
    description:
      "Accuracy is the first number everyone reaches for and the first one that will mislead you. Drag a decision threshold and watch precision and recall trade against each other.",
    level: "beginner",
    minutes: 13,
    prerequisites: [],
    tags: ["Classification", "Interactive"],
    headings: [
      { id: "a-model-that-does-nothing", text: "A model that does nothing, and scores 99.7%", level: 2 },
      { id: "four-ways-a-prediction-lands", text: "Four ways a yes-or-no prediction can land", level: 2 },
      { id: "precision", text: "Precision: of everything I flagged, how much was real?", level: 2 },
      { id: "recall", text: "Recall: of everything real, how much did I catch?", level: 2 },
      { id: "the-dial-between-them", text: "The dial between them", level: 2 },
      { id: "which-one-do-you-optimise", text: "So which one do you optimise?", level: 2 },
    ],
    status: "published",
  },
];

/** @deprecated Use ML_CHAPTERS. Kept so existing imports keep compiling. */
export const ML_LESSONS = ML_CHAPTERS;

export type { LearnChapter as MlLesson } from "@/lib/learn-types";
