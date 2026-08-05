import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { CodebaseLesson } from "@/components/vibecoding/CodebaseLesson";
import { DebuggingLesson } from "@/components/vibecoding/DebuggingLesson";
import { FirstAppLesson } from "@/components/vibecoding/FirstAppLesson";
import { InstallLesson } from "@/components/vibecoding/InstallLesson";
import { IntroLesson } from "@/components/vibecoding/IntroLesson";
import { LoopLesson } from "@/components/vibecoding/LoopLesson";
import { PromptsLesson } from "@/components/vibecoding/PromptsLesson";
import { ReviewLesson } from "@/components/vibecoding/ReviewLesson";
import { ShippingLesson } from "@/components/vibecoding/ShippingLesson";
import { ToolsLesson } from "@/components/vibecoding/ToolsLesson";
import { WhatYouNeedLesson } from "@/components/vibecoding/WhatYouNeedLesson";
import { WhatAiSeesLesson } from "@/components/vibecoding/WhatAiSeesLesson";
import { PromptPatternsLesson } from "@/components/vibecoding/PromptPatternsLesson";
import { ChoosingAModelLesson } from "@/components/vibecoding/ChoosingAModelLesson";
import { SmallDiffsLesson } from "@/components/vibecoding/SmallDiffsLesson";
import { SteeringLesson } from "@/components/vibecoding/SteeringLesson";
import { GivingContextLesson } from "@/components/vibecoding/GivingContextLesson";
import { RulesFilesLesson } from "@/components/vibecoding/RulesFilesLesson";
import { McpAndToolsLesson } from "@/components/vibecoding/McpAndToolsLesson";
import { RefactorsLesson } from "@/components/vibecoding/RefactorsLesson";
import { TestsLesson } from "@/components/vibecoding/TestsLesson";
import { SecurityLesson } from "@/components/vibecoding/SecurityLesson";
import { WhenNotToLesson } from "@/components/vibecoding/WhenNotToLesson";
import { GitLesson } from "@/components/vibecoding/GitLesson";
import { AfterYouShipLesson } from "@/components/vibecoding/AfterYouShipLesson";
import { AgentsLesson } from "@/components/vibecoding/AgentsLesson";
import { OrchestrationLesson } from "@/components/vibecoding/OrchestrationLesson";
import { CustomToolingLesson } from "@/components/vibecoding/CustomToolingLesson";
import { GettingBetterLesson } from "@/components/vibecoding/GettingBetterLesson";
import { LEARN_ML_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "vibecoding" as const;

/**
 * Every published chapter needs an entry here. Drafts deliberately have none —
 * getChapters() filters them out, so they never reach routing.
 */
const LESSON_BODIES: Record<string, () => React.ReactElement> = {
  intro: IntroLesson,
  "what-you-need": WhatYouNeedLesson,
  tools: ToolsLesson,
  install: InstallLesson,
  "first-app": FirstAppLesson,
  prompts: PromptsLesson,
  loop: LoopLesson,
  debugging: DebuggingLesson,
  review: ReviewLesson,
  codebase: CodebaseLesson,
  shipping: ShippingLesson,
  "what-ai-sees": WhatAiSeesLesson,
  "prompt-patterns": PromptPatternsLesson,
  "choosing-a-model": ChoosingAModelLesson,
  "small-diffs": SmallDiffsLesson,
  steering: SteeringLesson,
  "giving-context": GivingContextLesson,
  "rules-files": RulesFilesLesson,
  "mcp-and-tools": McpAndToolsLesson,
  refactors: RefactorsLesson,
  tests: TestsLesson,
  security: SecurityLesson,
  "when-not-to": WhenNotToLesson,
  git: GitLesson,
  "after-you-ship": AfterYouShipLesson,
  agents: AgentsLesson,
  orchestration: OrchestrationLesson,
  "custom-tooling": CustomToolingLesson,
  "getting-better": GettingBetterLesson,
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
  if (!chapter) return { title: "Vibe Coding" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/vibecoding/${slug}` },
  };
}

export default async function VibecodingChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? LESSON_BODIES[slug] : undefined;
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
        endHref={LEARN_ML_HREF}
      />
      </LessonGate>
    </LearnShell>
  );
}
