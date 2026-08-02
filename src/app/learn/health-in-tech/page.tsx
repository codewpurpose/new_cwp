import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { HealthInTechLessonCover } from "@/components/health-in-tech/HealthInTechLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import { COURSES_HREF, HEALTH_IN_TECH_COURSE_HREF, LEARN_FINANCIAL_LITERACY_HREF } from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Health in Tech",
  description:
    "Free interactive Health in Tech lessons from CodeWithPurpose, running from what health tech actually is through AI diagnosis bias, cybersecurity, and where it's headed.",
  alternates: { canonical: "/learn/health-in-tech" },
};

export default function LearnHealthInTechPage() {
  return (
    <PageShell>
      <PageHero
        title="Where healthcare meets technology, chapter by chapter"
        description="CodeWithPurpose lessons that turn health tech into a subject you actually understand, not headlines you half-follow. Twenty-four chapters, no medical or coding background required."
        image={images.codingLaptop}
        imageAlt="Student learning about health technology"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={HEALTH_IN_TECH_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Udemy Health in Tech Course
        </a>
      </PageHero>

      {getPartsWithChapters("health-in-tech").map((group, groupIndex) => (
        <PageSection
          key={group.part.id}
          className={groupIndex > 0 ? "!pt-0" : undefined}
        >
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
              <span className="text-learn-accent-text">{group.part.number}.</span>{" "}
              {group.part.title}
            </h2>
            <span className="text-[0.8rem] text-learn-subtle">
              {group.chapters.length}{" "}
              {group.chapters.length === 1 ? "chapter" : "chapters"}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] text-learn-muted">
            {group.part.summary}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {group.chapters.map((chapter, index) => (
              <Reveal key={chapter.slug} delay={index * 0.08}>
                <LessonCard
                  href={chapterHref("health-in-tech", chapter.slug)}
                  title={chapter.title}
                  description={chapter.description}
                  tags={chapter.tags}
                  meta={`${chapter.minutes} min read`}
                  cta="Start chapter"
                  media={<HealthInTechLessonCover slug={chapter.slug} />}
                />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ))}

      <ContributeBand noun="chapter" />

      <CtaBand
        title="Keep exploring health tech"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_FINANCIAL_LITERACY_HREF, label: "Try Financial Literacy", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
