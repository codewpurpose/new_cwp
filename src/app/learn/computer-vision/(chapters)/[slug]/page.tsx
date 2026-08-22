import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhatIsComputerVisionLesson } from "@/components/computer-vision/WhatIsComputerVisionLesson";
import { ImagesAsNumbersLesson } from "@/components/computer-vision/ImagesAsNumbersLesson";
import { ColourAndChannelsLesson } from "@/components/computer-vision/ColourAndChannelsLesson";
import { ConvolutionLesson } from "@/components/computer-vision/ConvolutionLesson";
import { EdgeDetectionLesson } from "@/components/computer-vision/EdgeDetectionLesson";
import { FeatureDetectorsLesson } from "@/components/computer-vision/FeatureDetectorsLesson";
import { ImagePreprocessingLesson } from "@/components/computer-vision/ImagePreprocessingLesson";
import { ImageClassificationLesson } from "@/components/computer-vision/ImageClassificationLesson";
import { PixelsToPredictionsLesson } from "@/components/computer-vision/PixelsToPredictionsLesson";
import { ConvolutionalNeuralNetworksLesson } from "@/components/computer-vision/ConvolutionalNeuralNetworksLesson";
import { TransferLearningLesson } from "@/components/computer-vision/TransferLearningLesson";
import { ObjectDetectionLesson } from "@/components/computer-vision/ObjectDetectionLesson";
import { BoundingBoxesAndIouLesson } from "@/components/computer-vision/BoundingBoxesAndIouLesson";
import { NonMaxSuppressionLesson } from "@/components/computer-vision/NonMaxSuppressionLesson";
import { ImageSegmentationLesson } from "@/components/computer-vision/ImageSegmentationLesson";
import { ConfusionMatrixForVisionLesson } from "@/components/computer-vision/ConfusionMatrixForVisionLesson";
import { MeanAveragePrecisionLesson } from "@/components/computer-vision/MeanAveragePrecisionLesson";
import { DatasetBiasLesson } from "@/components/computer-vision/DatasetBiasLesson";
import { OverfittingInVisionLesson } from "@/components/computer-vision/OverfittingInVisionLesson";
import { FaceDetectionAndPrivacyLesson } from "@/components/computer-vision/FaceDetectionAndPrivacyLesson";
import { VisionInSelfDrivingCarsLesson } from "@/components/computer-vision/VisionInSelfDrivingCarsLesson";
import { FromPrototypeToProductionLesson } from "@/components/computer-vision/FromPrototypeToProductionLesson";
import { LEARN_VIBECODING_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "computer-vision" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const COMPUTER_VISION_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-computer-vision": WhatIsComputerVisionLesson,
  "images-as-numbers": ImagesAsNumbersLesson,
  "colour-and-channels": ColourAndChannelsLesson,
  convolution: ConvolutionLesson,
  "edge-detection": EdgeDetectionLesson,
  "feature-detectors": FeatureDetectorsLesson,
  "image-preprocessing": ImagePreprocessingLesson,
  "image-classification": ImageClassificationLesson,
  "pixels-to-predictions": PixelsToPredictionsLesson,
  "convolutional-neural-networks": ConvolutionalNeuralNetworksLesson,
  "transfer-learning": TransferLearningLesson,
  "object-detection": ObjectDetectionLesson,
  "bounding-boxes-and-iou": BoundingBoxesAndIouLesson,
  "non-max-suppression": NonMaxSuppressionLesson,
  "image-segmentation": ImageSegmentationLesson,
  "confusion-matrix-for-vision": ConfusionMatrixForVisionLesson,
  "mean-average-precision": MeanAveragePrecisionLesson,
  "dataset-bias": DatasetBiasLesson,
  "overfitting-in-vision": OverfittingInVisionLesson,
  "face-detection-and-privacy": FaceDetectionAndPrivacyLesson,
  "vision-in-self-driving-cars": VisionInSelfDrivingCarsLesson,
  "from-prototype-to-production": FromPrototypeToProductionLesson,
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
  if (!chapter) return { title: "Computer Vision" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/computer-vision/${slug}/` },
  };
}

export default async function ComputerVisionLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? COMPUTER_VISION_LESSON_BODIES[slug] : undefined;
  if (!chapter || !LessonBody) notFound();

  const { prev, next } = getAdjacent(TRACK, slug);

  return (
    <LearnShell
      track={TRACK}
      aside={<LearnToc headings={chapter.headings} />}
      mobileBar={<LearnMobileBar track={TRACK} label={getPositionLabel(TRACK, slug)} />}
    >
      <LearnChapterHeader track={TRACK} chapter={chapter} />

      <LessonGate
        key={slug}
        track={TRACK}
        slug={slug}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
      >
        <div className="learn-prose mt-10">
          <LessonBody />
        </div>

        <LessonQuiz
          track={TRACK}
          slug={slug}
          quiz={getQuiz(TRACK, slug)}
          prev={prev ? { slug: prev.slug, title: prev.title } : null}
          next={next ? { slug: next.slug, title: next.title } : null}
          endHref={LEARN_VIBECODING_HREF}
        />
      </LessonGate>
    </LearnShell>
  );
}
