import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { VibecodingLessonCover } from "@/components/vibecoding/VibecodingLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { LEARN_ML_HREF, VIBECODING_COURSE_HREF } from "@/lib/links";
import { chapterHref, getChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Vibe Coding",
  description:
    "Free interactive vibe coding lessons from CodeWithPurpose. Learn to prompt, pair-program, debug, and ship real apps with AI.",
  alternates: { canonical: "/learn/vibecoding/" },
};

export default function LearnVibecodingPage() {
  // Published chapters come back in reading order, so this is lesson one. It is
  // read defensively because a track with nothing published is a valid state
  // for the validator, and a missing chapter must not take the build down.
  const firstLesson = getChapters("vibecoding")[0];

  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/vibecoding/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/vibecoding/" }])} />
      <LearnSpaceShell track="vibecoding">
        <CourseHome
          track="vibecoding"
          title="Vibe coding, one step at a time"
          description="CodeWithPurpose lessons that turn AI-assisted coding into a repeatable skill: clear animated walkthroughs, no setup required."
          udemy={{ href: VIBECODING_COURSE_HREF, label: "Udemy Vibecoding Course" }}
          chapterMedia={(chapter) => <VibecodingLessonCover slug={chapter.slug} partId={chapter.partId} order={chapter.order} />}
        />

        <ContributeBand noun="chapter" />

        {/* The band promises more vibe coding, so its actions stay inside /learn.
            Sending the strongest action to /courses was what closed the
            exploration cycle; /courses is in the nav on every page anyway. */}
        <CtaBand
          title="Keep building your vibe coding practice"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            ...(firstLesson
              ? ([
                  {
                    href: chapterHref("vibecoding", firstLesson.slug),
                    label: "Start the first lesson",
                    variant: "primary",
                  },
                ] as const)
              : []),
            { href: LEARN_ML_HREF, label: "Try Machine Learning", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
