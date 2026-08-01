import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LearnPager } from "@/components/learn/shell/LearnPager";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { ClassificationVsRegressionLesson } from "@/components/ml/ClassificationVsRegressionLesson";
import { FeaturesAndLabelsLesson } from "@/components/ml/FeaturesAndLabelsLesson";
import { WhatIsMlLesson } from "@/components/ml/WhatIsMlLesson";
import { HowModelsLearnLesson } from "@/components/ml/HowModelsLearnLesson";
import { TrainTestSplitLesson } from "@/components/ml/TrainTestSplitLesson";
import { OverfittingLesson } from "@/components/ml/OverfittingLesson";
import { PrecisionRecallLesson } from "@/components/ml/PrecisionRecallLesson";
import { COURSES_HREF } from "@/lib/links";
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
  if (!chapter) return { title: "Machine Learning | CWP" };
  return { title: `${chapter.title} | CWP`, description: chapter.description };
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
          <div
            data-direction="next"
            className="learn-pager-link learn-on-inverse !border-transparent !bg-learn-inverse text-right"
          >
            <span className="learn-pager-direction !text-learn-on-inverse opacity-80">
              You reached the end
            </span>
            <Link
              href={COURSES_HREF}
              className="learn-pager-title learn-focusable !text-learn-heading-on-inverse underline"
            >
              Browse all courses
            </Link>
          </div>
        }
      />
    </LearnShell>
  );
}
