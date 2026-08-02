import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LearnPager, LearnPagerEnd } from "@/components/learn/shell/LearnPager";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { ClassificationVsRegressionLesson } from "@/components/ml/ClassificationVsRegressionLesson";
import { BaselinesLesson } from "@/components/ml/BaselinesLesson";
import { ClassImbalanceLesson } from "@/components/ml/ClassImbalanceLesson";
import { CrossValidationLesson } from "@/components/ml/CrossValidationLesson";
import { DataLeakageLesson } from "@/components/ml/DataLeakageLesson";
import { DecisionTreesLesson } from "@/components/ml/DecisionTreesLesson";
import { FeaturesAndLabelsLesson } from "@/components/ml/FeaturesAndLabelsLesson";
import { KNearestNeighboursLesson } from "@/components/ml/KNearestNeighboursLesson";
import { WhatIsMlLesson } from "@/components/ml/WhatIsMlLesson";
import { HowModelsLearnLesson } from "@/components/ml/HowModelsLearnLesson";
import { TrainTestSplitLesson } from "@/components/ml/TrainTestSplitLesson";
import { OverfittingLesson } from "@/components/ml/OverfittingLesson";
import { PrecisionRecallLesson } from "@/components/ml/PrecisionRecallLesson";
import { RandomForestsLesson } from "@/components/ml/RandomForestsLesson";
import { ClusteringLesson } from "@/components/ml/ClusteringLesson";
import { DimensionalityReductionLesson } from "@/components/ml/DimensionalityReductionLesson";
import { AnomalyDetectionLesson } from "@/components/ml/AnomalyDetectionLesson";
import { FeatureScalingLesson } from "@/components/ml/FeatureScalingLesson";
import { GradientDescentLesson } from "@/components/ml/GradientDescentLesson";
import { RegularisationLesson } from "@/components/ml/RegularisationLesson";
import { NeuralNetworksLesson } from "@/components/ml/NeuralNetworksLesson";
import { FromNotebookToProductionLesson } from "@/components/ml/FromNotebookToProductionLesson";
import { LEARN_VIBECODING_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "ml" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const ML_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-ml": WhatIsMlLesson,
  "features-and-labels": FeaturesAndLabelsLesson,
  "how-models-learn": HowModelsLearnLesson,
  "classification-vs-regression": ClassificationVsRegressionLesson,
  "train-test-split": TrainTestSplitLesson,
  overfitting: OverfittingLesson,
  "precision-recall": PrecisionRecallLesson,
  "k-nearest-neighbours": KNearestNeighboursLesson,
  "decision-trees": DecisionTreesLesson,
  "random-forests": RandomForestsLesson,
  "cross-validation": CrossValidationLesson,
  "data-leakage": DataLeakageLesson,
  "class-imbalance": ClassImbalanceLesson,
  baselines: BaselinesLesson,
  clustering: ClusteringLesson,
  "dimensionality-reduction": DimensionalityReductionLesson,
  "anomaly-detection": AnomalyDetectionLesson,
  "feature-scaling": FeatureScalingLesson,
  "gradient-descent": GradientDescentLesson,
  regularisation: RegularisationLesson,
  "neural-networks": NeuralNetworksLesson,
  "from-notebook-to-production": FromNotebookToProductionLesson,
};

export function generateStaticParams() {
  return getChapters(TRACK).map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  if (!chapter) return { title: "Machine Learning" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/ml/${slug}` },
  };
}

export default async function MlLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? ML_LESSON_BODIES[slug] : undefined;
  if (!chapter || !LessonBody) notFound();

  const { prev, next } = getAdjacent(TRACK, slug);

  return (
    <LearnShell
      track={TRACK}
      aside={<LearnToc headings={chapter.headings} />}
      mobileBar={<LearnMobileBar track={TRACK} label={getPositionLabel(TRACK, slug)} />}
    >
      <LearnChapterHeader track={TRACK} chapter={chapter} />

      <div className="learn-prose mt-10">
        <LessonBody />
      </div>

      <LearnPager
        track={TRACK}
        prev={prev}
        next={next}
        fallback={
          /* Finishing the track earns a real next step, not a bounce out to
             the catalog. The other track is the one thing here the reader
             provably has not done. */
          <LearnPagerEnd href={LEARN_VIBECODING_HREF} eyebrow="You reached the end" title="Start the Vibe Coding track" />
        }
      />
    </LearnShell>
  );
}
