import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { MlLessonCover } from "@/components/ml/MlLessonCover";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  COURSES_HREF,
  LEARN_HREF,
  ML_PART_1_COURSE_HREF,
} from "@/lib/links";
import { chapterHref, getChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Machine Learning | CWP",
  description:
    "Free interactive machine learning lessons from CodeWithPurpose. Start from nothing: what ML is, what data has to look like, how a model learns, and how to tell whether it worked.",
};

export default function LearnMlPage() {
  return (
    <PageShell>
      <PageHero
        title="Machine learning, made visual"
        description="CodeWithPurpose lessons that explain core ML ideas through live demos and clear visuals. Click any topic to explore — no setup required."
        image={images.codingLaptop}
        imageAlt="Student exploring machine learning with CodeWithPurpose"
      >
        <Link href={LEARN_HREF} className="home-btn home-btn-outline">
          All Learning Tracks
        </Link>
        <a
          href={ML_PART_1_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Udemy ML Course
        </a>
      </PageHero>

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {getChapters("ml").map((lesson, index) => (
            <Reveal key={lesson.slug} delay={index * 0.08}>
              <LessonCard
                href={chapterHref("ml", lesson.slug)}
                title={lesson.title}
                description={lesson.description}
                tags={lesson.tags}
                meta={`${lesson.minutes} min read`}
                media={<MlLessonCover slug={lesson.slug} />}
              />
            </Reveal>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Keep building your ML foundation"
        body="These lessons are part of CodeWithPurpose's free learning library — built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_HREF, label: "Back to Learn", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
