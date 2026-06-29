export { LEARN_ML_HREF } from "@/lib/links";

export interface MlLesson {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export const ML_LESSONS: MlLesson[] = [
  {
    slug: "train-test-validation",
    title: "Train, Test, and Validation Sets",
    description:
      "Learn why it is best practice to split your data into training, testing, and validation sets, and explore the utility of each with a live machine learning model.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-train-test-validation.jpeg",
    tags: ["Foundations", "Interactive"],
  },
  {
    slug: "precision-recall",
    title: "Precision & Recall",
    description:
      "When accuracy is not enough, precision and recall tell a clearer story. Explore F1-scores and confusion matrices with hands-on visuals.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-precision-recall.jpg",
    tags: ["Classification", "Interactive"],
  },
  {
    slug: "decision-tree",
    title: "Decision Trees",
    description:
      "Explore one of machine learning's most popular supervised algorithms. Learn how trees split data, what entropy means, and why depth matters.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-decision-tree.jpg",
    tags: ["Algorithms", "Interactive"],
  },
  {
    slug: "random-forest",
    title: "Random Forest",
    description:
      "See how majority vote and smart randomness turn simple decision trees into one of machine learning's most widely used algorithms.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-random-forest.jpg",
    tags: ["Algorithms", "Interactive"],
  },
  {
    slug: "bias-variance",
    title: "The Bias Variance Tradeoff",
    description:
      "Understand underfitting vs. overfitting, how bias and variance shape model error, and explore interactive examples with LASSO and KNN.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-bias-variance.jpg",
    tags: ["Theory", "Interactive"],
  },
  {
    slug: "double-descent",
    title: "Double Descent",
    description:
      "Meet the double descent phenomenon: what it is, how it relates to bias-variance, and why the interpolation regime matters in modern ML.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-double-descent.jpg",
    tags: ["Theory", "Interactive"],
  },
  {
    slug: "double-descent2",
    title: "Double Descent, Part 2",
    description:
      "Go deeper on double descent with a mathematical walkthrough of the cubic spline example from Part 1.",
    thumbnail: "/learn/ml/assets/thumbnails/thumbnail-double-descent2.jpg",
    tags: ["Theory", "Advanced"],
  },
];
