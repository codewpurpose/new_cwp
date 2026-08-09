import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { HtmlCssLessonCover } from "@/components/html-css/HtmlCssLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import { COURSES_HREF, HTML_CSS_COURSE_HREF, LEARN_GITHUB_HREF } from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "HTML and CSS",
  description:
    "Free interactive HTML and CSS lessons from CodeWithPurpose. Twenty-four chapters from your first file through semantic markup, the cascade, the box model, flexbox, grid, and a real page you publish.",
  alternates: { canonical: "/learn/html-css/" },
};

export default function LearnHtmlCssPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/html-css/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/html-css/" }])} />
      <PageShell>
      <PageHero
        title="HTML and CSS, from one file to a page you can send someone"
        description="CodeWithPurpose lessons that build one real page by hand and explain the browser underneath it. Twenty-four chapters: elements, semantic markup, the cascade, the box model, flexbox, grid, accessibility, and publishing. No framework, no build step."
        image={images.codingLaptop}
        imageAlt="Student writing HTML on a laptop"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={HTML_CSS_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-violet"
        >
          Udemy HTML &amp; CSS Course
        </a>
      </PageHero>

      {getPartsWithChapters("html-css").map((group, groupIndex) => (
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
                  href={chapterHref("html-css", chapter.slug)}
                  title={chapter.title}
                  description={chapter.description}
                  tags={chapter.tags}
                  meta={`${chapter.minutes} min read`}
                  cta="Start chapter"
                  media={<HtmlCssLessonCover slug={chapter.slug} />}
                />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ))}

      <ContributeBand noun="chapter" />

      <CtaBand
        title="The first thing you build is a page somebody can open"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_GITHUB_HREF, label: "Then Publish It With Git", variant: "secondary" },
        ]}
      />
      </PageShell>
    </>
  );
}
