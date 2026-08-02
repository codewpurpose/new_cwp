import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_ML_HREF } from "@/lib/links";

/**
 * The Machine Learning track: twenty-two lessons, in order, each built around a
 * single interactive. Parts 1 to 4 are the fundamentals; parts 5 and 6 go past
 * them, into learning without labels and into what the optimiser is doing.
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
  {
    id: "models-you-can-picture",
    number: 3,
    title: "Models You Can Picture",
    summary:
      "Three real algorithms, each simple enough to run by hand on paper — and each wrong in its own instructive way.",
  },
  {
    id: "making-it-honest",
    number: 4,
    title: "Making the Number Honest",
    summary:
      "Every way a score lies to you, and what to do about each one. This is the part that separates a demo from a result.",
  },
  {
    id: "beyond-labels",
    number: 5,
    title: "Learning Without Labels",
    summary:
      "Every model so far needed somebody to write the right answer down first. Three that do not, and the new ways each of them can be wrong.",
  },
  {
    id: "how-fitting-works",
    number: 6,
    title: "How the Fitting Actually Works",
    summary:
      "Under the fit is a search, and under the search is a step size. What the optimiser is doing, what it costs, and what happens to a model after it ships.",
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
  {
    slug: "k-nearest-neighbours",
    partId: "models-you-can-picture",
    order: 8,
    title: "k-Nearest Neighbours",
    description:
      "A model that learns nothing at all, and still beats a careless one. Move a student across the chart and watch five neighbours vote on their future.",
    level: "beginner",
    minutes: 12,
    prerequisites: ["overfitting"],
    tags: ["Algorithms", "Interactive"],
    headings: [
      { id: "a-model-that-learns-nothing", text: "A model that learns nothing", level: 2 },
      { id: "asking-the-nearest-few", text: "Asking the nearest few", level: 2 },
      { id: "k-is-the-entire-model", text: "k is the entire model", level: 2 },
      { id: "when-distance-lies-to-you", text: "When distance lies to you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "decision-trees",
    partId: "models-you-can-picture",
    order: 9,
    title: "Decision Trees",
    description:
      "Twenty questions, asked in the right order. Pick the split yourself, see how much confusion each one clears, and find out why the greedy choice is not always the best one.",
    level: "beginner",
    minutes: 13,
    prerequisites: ["overfitting"],
    tags: ["Algorithms", "Interactive"],
    headings: [
      { id: "a-flowchart-nobody-wrote", text: "A flowchart nobody wrote", level: 2 },
      { id: "what-makes-a-question-good", text: "What makes a question good", level: 2 },
      { id: "choosing-the-split", text: "Choosing the split, one level at a time", level: 2 },
      { id: "a-tree-left-to-grow", text: "A tree left to grow will memorise", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "random-forests",
    partId: "models-you-can-picture",
    order: 10,
    title: "Random Forests",
    description:
      "One deep tree memorises its training data. Two hundred of them, each deliberately handicapped, do not. Add trees one at a time and watch the boundary settle down.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["decision-trees"],
    tags: ["Algorithms", "Interactive"],
    headings: [
      { id: "many-mediocre-opinions", text: "Many mediocre opinions", level: 2 },
      { id: "making-the-trees-disagree", text: "Making the trees disagree on purpose", level: 2 },
      { id: "watching-the-vote-settle", text: "Watching the vote settle", level: 2 },
      { id: "what-you-give-up", text: "What you give up for it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "cross-validation",
    partId: "making-it-honest",
    order: 11,
    title: "Cross-Validation",
    description:
      "Chapter five left you with a score that was partly luck. Rotate which slice is held back, average the five results, and watch a lottery ticket turn into a measurement.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["train-test-split"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "one-split-is-one-opinion", text: "One split is one opinion", level: 2 },
      { id: "using-every-row-twice", text: "Using every row twice", level: 2 },
      { id: "the-spread-is-the-point", text: "The spread is the point, not the average", level: 2 },
      { id: "when-not-to-bother", text: "When not to bother", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "data-leakage",
    partId: "making-it-honest",
    order: 12,
    title: "Data Leakage",
    description:
      "The bug that makes your model look brilliant in testing and useless in production. Four realistic pipelines, one of them honest — find the leak before you scroll to the answer.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["train-test-split"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "a-score-too-good-to-be-true", text: "A score too good to be true", level: 2 },
      { id: "the-column-that-knows-the-answer", text: "The column that knows the answer", level: 2 },
      { id: "leaks-through-the-back-door", text: "Leaks that come through the back door", level: 2 },
      { id: "catching-it-before-production", text: "Catching it before production does", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "class-imbalance",
    partId: "making-it-honest",
    order: 13,
    title: "Class Imbalance",
    description:
      "When one answer is rare, accuracy stops meaning anything and most fixes quietly make the model worse. Rebalance a fraud dataset and watch what each repair actually costs.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["precision-recall"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "the-rare-thing-is-the-point", text: "The rare thing is the whole point", level: 2 },
      { id: "three-ways-to-rebalance", text: "Three ways to rebalance, and what each costs", level: 2 },
      { id: "moving-the-threshold-instead", text: "Moving the threshold instead", level: 2 },
      { id: "what-to-report", text: "What to report when the classes are lopsided", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "baselines",
    partId: "making-it-honest",
    order: 14,
    title: "Baselines",
    description:
      "Before you can say a model is good you need something for it to be better than. Race four models against a rule a child could write, and find out which ones lose.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["precision-recall"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "better-than-what", text: "Better than what?", level: 2 },
      { id: "the-four-baselines", text: "The four you should always run", level: 2 },
      { id: "racing-them", text: "Racing them against the real thing", level: 2 },
      { id: "when-the-baseline-wins", text: "When the baseline wins", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "clustering",
    partId: "beyond-labels",
    order: 15,
    title: "Clustering",
    description:
      "Every model up to here needed somebody to write the right answer down first. Step a k-means run one move at a time and watch the groups it settles on change with where you started it.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["features-and-labels"],
    tags: ["Unsupervised", "Interactive"],
    headings: [
      { id: "when-nobody-labelled-anything", text: "When nobody labelled anything", level: 2 },
      { id: "two-moves-repeated", text: "Two moves, repeated until nothing changes", level: 2 },
      { id: "choosing-k-is-your-problem", text: "Choosing k is your problem, not the algorithm's", level: 2 },
      { id: "when-the-groups-mean-nothing", text: "When the groups mean nothing", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "dimensionality-reduction",
    partId: "beyond-labels",
    order: 16,
    title: "Dimensionality Reduction",
    description:
      "Forty columns is not forty times more information than one, and the extra ones cost you accuracy. Rotate the line a cloud of points is flattened onto and watch how much of the spread survives.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["features-and-labels", "overfitting"],
    tags: ["Unsupervised", "Interactive"],
    headings: [
      { id: "more-columns-is-not-more-information", text: "More columns is not more information", level: 2 },
      { id: "flattening-without-losing-the-point", text: "Flattening without losing the point", level: 2 },
      { id: "what-a-component-actually-is", text: "What a component actually is", level: 2 },
      { id: "what-you-give-up", text: "What you give up, and when it is worth it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "anomaly-detection",
    partId: "beyond-labels",
    order: 17,
    title: "Anomaly Detection",
    description:
      "The cases you care about most are the ones you have almost no examples of, which is exactly why training a classifier on them fails. Move a cut-off and watch caught fraud trade against false alarms.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["class-imbalance", "precision-recall"],
    tags: ["Unsupervised", "Interactive"],
    headings: [
      { id: "the-class-you-cannot-collect", text: "The class you cannot collect", level: 2 },
      { id: "describe-normal-instead", text: "Describe normal instead", level: 2 },
      { id: "where-to-draw-the-cut-off", text: "Where to draw the cut-off", level: 2 },
      { id: "why-normal-moves", text: "Why normal moves under you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "feature-scaling",
    partId: "how-fitting-works",
    order: 18,
    title: "Feature Scaling",
    description:
      "Distance arithmetic does not know that one column is in years and another in pounds, so the big column quietly decides every answer. Rescale the axes and watch a nearest-neighbour verdict flip.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["k-nearest-neighbours", "data-leakage"],
    tags: ["Preprocessing", "Interactive"],
    headings: [
      { id: "the-column-that-shouts", text: "The column that shouts over the others", level: 2 },
      { id: "two-ways-onto-one-scale", text: "Two ways onto one scale", level: 2 },
      { id: "which-models-care", text: "Which models care, and which genuinely do not", level: 2 },
      { id: "scaling-belongs-inside-the-split", text: "Scaling belongs inside the split", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "gradient-descent",
    partId: "how-fitting-works",
    order: 19,
    title: "Gradient Descent",
    description:
      "Trying every slope works with one parameter and never works again after that. Set a step size and watch the same search converge, crawl, or throw itself off the hill entirely.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["how-models-learn"],
    tags: ["Optimisation", "Interactive"],
    headings: [
      { id: "why-you-cannot-try-everything", text: "Why you cannot just try everything", level: 2 },
      { id: "walking-downhill", text: "Walking downhill on the error", level: 2 },
      { id: "the-step-size-decides-everything", text: "The step size decides everything", level: 2 },
      { id: "what-it-does-not-promise", text: "What it does not promise you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "regularisation",
    partId: "how-fitting-works",
    order: 20,
    title: "Regularisation",
    description:
      "Overfitting has a fix that is not \"collect more data\", and it works by charging the model rent on its own complexity. Turn the penalty up and watch coefficients fall over one at a time.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["overfitting", "cross-validation"],
    tags: ["Evaluation", "Interactive"],
    headings: [
      { id: "charging-rent-on-complexity", text: "Charging rent on complexity", level: 2 },
      { id: "two-penalties-two-behaviours", text: "Two penalties, two different behaviours", level: 2 },
      { id: "the-strength-is-a-dial", text: "The strength is a dial, not a switch", level: 2 },
      { id: "choosing-it-honestly", text: "Choosing it without cheating", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "neural-networks",
    partId: "how-fitting-works",
    order: 21,
    title: "Neural Networks",
    description:
      "A neural network is not a brain. It is the straight-line fit you already understand, stacked, with one small bend between the layers — add hidden units one at a time and watch a flat boundary learn to curve.",
    level: "advanced",
    minutes: 14,
    prerequisites: ["how-models-learn", "gradient-descent"],
    tags: ["Models", "Interactive"],
    headings: [
      { id: "what-is-actually-inside-one", text: "What is actually inside one", level: 2 },
      { id: "the-bend-that-changes-everything", text: "The bend that changes everything", level: 2 },
      { id: "width-depth-and-what-each-buys", text: "Width, depth, and what each one buys", level: 2 },
      { id: "what-they-cost-you", text: "What they cost you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "from-notebook-to-production",
    partId: "how-fitting-works",
    order: 22,
    title: "From Notebook to Production",
    description:
      "A model that scored well on Tuesday's data is not a system, and the gap between the two is where most projects quietly die. Age a deployed model month by month and watch the score decay before anyone files a bug.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["baselines", "data-leakage"],
    tags: ["Practice", "Interactive"],
    headings: [
      { id: "the-score-was-never-the-product", text: "The score was never the product", level: 2 },
      { id: "the-world-moves-your-model-does-not", text: "The world moves, your model does not", level: 2 },
      { id: "monitoring-when-labels-are-late", text: "Monitoring when the labels arrive late", level: 2 },
      { id: "retraining-without-fooling-yourself", text: "Retraining without fooling yourself", level: 2 },
    ],
    status: "published",
  },
];

/** @deprecated Use ML_CHAPTERS. Kept so existing imports keep compiling. */
export const ML_LESSONS = ML_CHAPTERS;

export type { LearnChapter as MlLesson } from "@/lib/learn-types";
