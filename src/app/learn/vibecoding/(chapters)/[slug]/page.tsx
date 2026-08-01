import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LearnPager } from "@/components/learn/shell/LearnPager";
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
import { COURSES_HREF } from "@/lib/links";
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
  if (!chapter) return { title: "Vibe Coding | CWP" };
  return { title: `${chapter.title} | CWP`, description: chapter.description };
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
