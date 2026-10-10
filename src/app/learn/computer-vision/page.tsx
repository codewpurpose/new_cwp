import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { ComputerVisionLessonCover } from "@/components/computer-vision/ComputerVisionLessonCover";
import { COMPUTER_VISION_COURSE_HREF, LEARN_ML_HREF } from "@/lib/links";
import { chapterHref, getChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Computer Vision",
  description:
    "Free interactive computer vision lessons from CodeWithPurpose. Start from a photo as a grid of numbers and work up to classification, detection, segmentation, and what changes once a model has to run in the world.",
  alternates: { canonical: "/learn/computer-vision/" },
};

export default function LearnComputerVisionPage() {
  const lessons = getChapters("computer-vision");
  // Published chapters come back in reading order, so this is lesson one. It is
  // read defensively because a track with nothing published is a valid state
  // for the validator, and a missing chapter must not take the build down.
  const firstLesson = lessons[0];

  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/computer-vision/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/computer-vision/" }])} />
      <LearnSpaceShell track="computer-vision">
        <CourseHome
          track="computer-vision"
          title="Computer vision, made visual"
          description="CodeWithPurpose lessons that explain how a machine turns a photo into a label, a box, or a mask — through live demos and clear visuals. Click any topic to explore, no setup required."
          udemy={{ href: COMPUTER_VISION_COURSE_HREF, label: "Udemy CV Course" }}
          chapterMedia={(chapter) => <ComputerVisionLessonCover slug={chapter.slug} />}
        />

        <ContributeBand />

        {/* The band promises more CV, so its actions stay inside /learn. Sending
            the strongest action to /courses was what closed the exploration
            cycle; /courses is reachable from the nav on every page anyway. */}
        <CtaBand
          title="Keep building your computer vision foundation"
          body="These lessons are part of CodeWithPurpose's free learning library — built by students, for students, everywhere."
          actions={[
            ...(firstLesson
              ? ([
                  {
                    href: chapterHref("computer-vision", firstLesson.slug),
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
