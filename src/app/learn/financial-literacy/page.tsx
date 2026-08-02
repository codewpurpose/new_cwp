import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { FinancialLiteracyLessonCover } from "@/components/financial-literacy/FinancialLiteracyLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import { COURSES_HREF, FINANCIAL_LITERACY_COURSE_HREF, LEARN_HEALTH_IN_TECH_HREF } from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Financial Literacy",
  description:
    "Free interactive financial literacy lessons from CodeWithPurpose, running from your first budget through investing, taxes, and retirement accounts.",
  alternates: { canonical: "/learn/financial-literacy" },
};

export default function LearnFinancialLiteracyPage() {
  return (
    <PageShell>
      <PageHero
        title="Money skills, from your first budget to your first plan"
        description="CodeWithPurpose lessons that turn personal finance into a set of skills you actually use, not jargon you look up. Twenty-four chapters, no experience required."
        image={images.codingLaptop}
        imageAlt="Student reviewing a budget"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={FINANCIAL_LITERACY_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Udemy Financial Literacy Course
        </a>
      </PageHero>

      {getPartsWithChapters("financial-literacy").map((group, groupIndex) => (
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
                  href={chapterHref("financial-literacy", chapter.slug)}
                  title={chapter.title}
                  description={chapter.description}
                  tags={chapter.tags}
                  meta={`${chapter.minutes} min read`}
                  cta="Start chapter"
                  media={<FinancialLiteracyLessonCover slug={chapter.slug} />}
                />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ))}

      <ContributeBand noun="chapter" />

      <CtaBand
        title="Keep building your money skills"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_HEALTH_IN_TECH_HREF, label: "Try Health in Tech", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
