import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { ComputerVisionLessonCover } from "@/components/computer-vision/ComputerVisionLessonCover";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  COMPUTER_VISION_COURSE_HREF,
  COURSES_HREF,
  LEARN_ML_HREF,
} from "@/lib/links";
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
      <PageShell>
      <PageHero
        title="Computer vision, made visual"
        description="CodeWithPurpose lessons that explain how a machine turns a photo into a label, a box, or a mask — through live demos and clear visuals. Click any topic to explore, no setup required."
        image={images.codingLaptop}
        imageAlt="Student exploring computer vision with CodeWithPurpose"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={COMPUTER_VISION_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-violet"
        >
          Udemy CV Course
        </a>
      </PageHero>

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <Reveal key={lesson.slug} delay={index * 0.08}>
              <LessonCard
                href={chapterHref("computer-vision", lesson.slug)}
                title={lesson.title}
                description={lesson.description}
                tags={lesson.tags}
                meta={`${lesson.minutes} min read`}
                media={<ComputerVisionLessonCover slug={lesson.slug} />}
              />
            </Reveal>
          ))}
        </div>
      </PageSection>

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
      </PageShell>
    </>
  );
}
