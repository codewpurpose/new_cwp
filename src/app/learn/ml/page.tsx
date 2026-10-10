import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { MlLessonCover } from "@/components/ml/MlLessonCover";
import { LEARN_VIBECODING_HREF, ML_PART_1_COURSE_HREF } from "@/lib/links";
import { chapterHref, getChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Machine Learning",
  description:
    "Free interactive machine learning lessons from CodeWithPurpose. Start from nothing: what ML is, what data has to look like, how a model learns, and how to tell whether it worked.",
  alternates: { canonical: "/learn/ml/" },
};

export default function LearnMlPage() {
  const lessons = getChapters("ml");
  // Published chapters come back in reading order, so this is lesson one. It is
  // read defensively because a track with nothing published is a valid state
  // for the validator, and a missing chapter must not take the build down.
  const firstLesson = lessons[0];

  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/ml/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/ml/" }])} />
      <LearnSpaceShell track="ml">
        <CourseHome
          track="ml"
          title="Machine learning, made visual"
          description="CodeWithPurpose lessons that explain core ML ideas through live demos and clear visuals. Click any topic to explore — no setup required."
          udemy={{ href: ML_PART_1_COURSE_HREF, label: "Udemy ML Course" }}
          chapterMedia={(chapter) => <MlLessonCover slug={chapter.slug} />}
        />

        <ContributeBand />

        {/* The band promises more ML, so its actions stay inside /learn. Sending
            the strongest action to /courses was what closed the exploration
            cycle; /courses is reachable from the nav on every page anyway. */}
        <CtaBand
          title="Keep building your ML foundation"
          body="These lessons are part of CodeWithPurpose's free learning library — built by students, for students, everywhere."
          actions={[
            ...(firstLesson
              ? ([
                  {
                    href: chapterHref("ml", firstLesson.slug),
                    label: "Start the first lesson",
                    variant: "primary",
                  },
                ] as const)
              : []),
            { href: LEARN_VIBECODING_HREF, label: "Try Vibe Coding", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
