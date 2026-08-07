import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhatIsRobloxStudioLesson } from "@/components/roblox/WhatIsRobloxStudioLesson";
import { TheDataModelLesson } from "@/components/roblox/TheDataModelLesson";
import { PartsAndPropertiesLesson } from "@/components/roblox/PartsAndPropertiesLesson";
import { YourFirstScriptLesson } from "@/components/roblox/YourFirstScriptLesson";
import { VariablesAndValuesLesson } from "@/components/roblox/VariablesAndValuesLesson";
import { InstancesAndPropertiesLesson } from "@/components/roblox/InstancesAndPropertiesLesson";
import { ClientAndServerLesson } from "@/components/roblox/ClientAndServerLesson";
import { EventsAndConnectionsLesson } from "@/components/roblox/EventsAndConnectionsLesson";
import { DebounceLesson } from "@/components/roblox/DebounceLesson";
import { TheKillbrickLesson } from "@/components/roblox/TheKillbrickLesson";
import { TheDisappearingPlatformLesson } from "@/components/roblox/TheDisappearingPlatformLesson";
import { TheOneWayPlatformLesson } from "@/components/roblox/TheOneWayPlatformLesson";
import { DebuggingInStudioLesson } from "@/components/roblox/DebuggingInStudioLesson";
import { PublishingYourExperienceLesson } from "@/components/roblox/PublishingYourExperienceLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "roblox" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const ROBLOX_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-roblox-studio": WhatIsRobloxStudioLesson,
  "the-data-model": TheDataModelLesson,
  "parts-and-properties": PartsAndPropertiesLesson,
  "your-first-script": YourFirstScriptLesson,
  "variables-and-values": VariablesAndValuesLesson,
  "instances-and-properties": InstancesAndPropertiesLesson,
  "client-and-server": ClientAndServerLesson,
  "events-and-connections": EventsAndConnectionsLesson,
  debounce: DebounceLesson,
  "the-killbrick": TheKillbrickLesson,
  "the-disappearing-platform": TheDisappearingPlatformLesson,
  "the-one-way-platform": TheOneWayPlatformLesson,
  "debugging-in-studio": DebuggingInStudioLesson,
  "publishing-your-experience": PublishingYourExperienceLesson,
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
  if (!chapter) return { title: "Roblox Studio" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/roblox/${slug}/` },
  };
}

export default async function RobloxLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? ROBLOX_LESSON_BODIES[slug] : undefined;
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
