import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { PythonLessonCover } from "@/components/python/PythonLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import { COURSES_HREF, LEARN_ML_HREF, PYTHON_COURSE_HREF } from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Python",
  description:
    "Free interactive Python lessons from CodeWithPurpose, running from your first program through decorators, generators, and shipping tested code.",
  alternates: { canonical: "/learn/python/" },
};

export default function LearnPythonPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/python/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/python/" }])} />
      <PageShell>
      <PageHero
        title="Python, from your first line to your first library"
        description="CodeWithPurpose lessons that turn Python into a language you actually think in, not one you look up. Twenty-four chapters, no setup required."
        image={images.codingLaptop}
        imageAlt="Student learning Python"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          All Courses
        </Link>
        <a
          href={PYTHON_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-violet"
        >
          Udemy Python Course
        </a>
      </PageHero>

      {getPartsWithChapters("python").map((group, groupIndex) => (
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
                  href={chapterHref("python", chapter.slug)}
                  title={chapter.title}
                  description={chapter.description}
                  tags={chapter.tags}
                  meta={`${chapter.minutes} min read`}
                  cta="Start chapter"
                  media={<PythonLessonCover slug={chapter.slug} />}
                />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ))}

      <ContributeBand noun="chapter" />

      <CtaBand
        title="Keep building your Python practice"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_ML_HREF, label: "Try Machine Learning", variant: "secondary" },
        ]}
      />
      </PageShell>
    </>
  );
}
