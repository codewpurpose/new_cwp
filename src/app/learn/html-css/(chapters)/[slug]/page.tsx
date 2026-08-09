import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhatIsAWebsiteLesson } from "@/components/html-css/WhatIsAWebsiteLesson";
import { HowABrowserBuildsAPageLesson } from "@/components/html-css/HowABrowserBuildsAPageLesson";
import { YourFirstPageLesson } from "@/components/html-css/YourFirstPageLesson";
import { ElementsAndTagsLesson } from "@/components/html-css/ElementsAndTagsLesson";
import { DocumentStructureLesson } from "@/components/html-css/DocumentStructureLesson";
import { TextAndHeadingsLesson } from "@/components/html-css/TextAndHeadingsLesson";
import { LinksAndImagesLesson } from "@/components/html-css/LinksAndImagesLesson";
import { ListsAndTablesLesson } from "@/components/html-css/ListsAndTablesLesson";
import { FormsAndInputsLesson } from "@/components/html-css/FormsAndInputsLesson";
import { SemanticHtmlLesson } from "@/components/html-css/SemanticHtmlLesson";
import { HowCssAttachesLesson } from "@/components/html-css/HowCssAttachesLesson";
import { SelectorsLesson } from "@/components/html-css/SelectorsLesson";
import { TheCascadeAndSpecificityLesson } from "@/components/html-css/TheCascadeAndSpecificityLesson";
import { TheBoxModelLesson } from "@/components/html-css/TheBoxModelLesson";
import { ColourAndTypographyLesson } from "@/components/html-css/ColourAndTypographyLesson";
import { DisplayAndFlowLesson } from "@/components/html-css/DisplayAndFlowLesson";
import { FlexboxLesson } from "@/components/html-css/FlexboxLesson";
import { GridLesson } from "@/components/html-css/GridLesson";
import { ResponsiveDesignLesson } from "@/components/html-css/ResponsiveDesignLesson";
import { MarkingUpThePageLesson } from "@/components/html-css/MarkingUpThePageLesson";
import { StylingThePageLesson } from "@/components/html-css/StylingThePageLesson";
import { AccessibilityBasicsLesson } from "@/components/html-css/AccessibilityBasicsLesson";
import { DevtoolsLesson } from "@/components/html-css/DevtoolsLesson";
import { PublishingYourSiteLesson } from "@/components/html-css/PublishingYourSiteLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "html-css" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const HTML_CSS_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-a-website": WhatIsAWebsiteLesson,
  "how-a-browser-builds-a-page": HowABrowserBuildsAPageLesson,
  "your-first-page": YourFirstPageLesson,
  "elements-and-tags": ElementsAndTagsLesson,
  "document-structure": DocumentStructureLesson,
  "text-and-headings": TextAndHeadingsLesson,
  "links-and-images": LinksAndImagesLesson,
  "lists-and-tables": ListsAndTablesLesson,
  "forms-and-inputs": FormsAndInputsLesson,
  "semantic-html": SemanticHtmlLesson,
  "how-css-attaches": HowCssAttachesLesson,
  selectors: SelectorsLesson,
  "the-cascade-and-specificity": TheCascadeAndSpecificityLesson,
  "the-box-model": TheBoxModelLesson,
  "colour-and-typography": ColourAndTypographyLesson,
  "display-and-flow": DisplayAndFlowLesson,
  flexbox: FlexboxLesson,
  grid: GridLesson,
  "responsive-design": ResponsiveDesignLesson,
  "marking-up-the-page": MarkingUpThePageLesson,
  "styling-the-page": StylingThePageLesson,
  "accessibility-basics": AccessibilityBasicsLesson,
  devtools: DevtoolsLesson,
  "publishing-your-site": PublishingYourSiteLesson,
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
  if (!chapter) return { title: "HTML and CSS" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/html-css/${slug}/` },
  };
}

export default async function HtmlCssLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? HTML_CSS_LESSON_BODIES[slug] : undefined;
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
          endHref={COURSES_HREF}
        />
      </LessonGate>
    </LearnShell>
  );
}
