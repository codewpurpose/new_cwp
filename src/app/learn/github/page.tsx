import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { GithubLessonCover } from "@/components/github/GithubLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import { COURSES_HREF, GITHUB_COURSE_HREF, LEARN_PYTHON_HREF } from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Git and GitHub",
  description:
    "Free interactive Git and GitHub lessons from CodeWithPurpose. Twenty-one chapters from your first commit through branches, merge conflicts, rebasing, pull requests, code review, and open-source contribution.",
  alternates: { canonical: "/learn/github/" },
};

export default function LearnGithubPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/github/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/github/" }])} />
      <PageShell>
      <PageHero
        title="Git and GitHub, from your first commit to your first open-source pull request"
        description="CodeWithPurpose lessons that teach the tool and the platform as one subject. Twenty-one chapters: commits, branches, conflicts, rebasing, pull requests, code review, Actions, and contributing to somebody else's project."
        image={images.codingLaptop}
        imageAlt="Student working through a code review on a laptop"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={GITHUB_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-violet"
        >
          Udemy GitHub Course
        </a>
      </PageHero>

      {getPartsWithChapters("github").map((group, groupIndex) => (
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
                  href={chapterHref("github", chapter.slug)}
                  title={chapter.title}
                  description={chapter.description}
                  tags={chapter.tags}
                  meta={`${chapter.minutes} min read`}
                  cta="Start chapter"
                  media={<GithubLessonCover slug={chapter.slug} />}
                />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ))}

      <ContributeBand noun="chapter" />

      <CtaBand
        title="Every project you build from here lives in a repository"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_PYTHON_HREF, label: "Try Python", variant: "secondary" },
        ]}
      />
      </PageShell>
    </>
  );
}
