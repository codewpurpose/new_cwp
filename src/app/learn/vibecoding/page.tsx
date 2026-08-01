import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { VibecodingLessonCover } from "@/components/vibecoding/VibecodingLessonCover";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { LessonCard } from "@/components/learn/cards/LessonCard";
import { images } from "@/lib/images";
import {
  COURSES_HREF,
  LEARN_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";

export const metadata: Metadata = {
  title: "Vibe Coding | CWP",
  description:
    "Free interactive vibe coding lessons from CodeWithPurpose. Learn to prompt, pair-program, debug, and ship real apps with AI.",
};

export default function LearnVibecodingPage() {
  return (
    <PageShell>
      <PageHero
        title="Vibe coding, one step at a time"
        description="CodeWithPurpose lessons that turn AI-assisted coding into a repeatable skill: clear animated walkthroughs, no setup required."
        image={images.codingLaptop}
        imageAlt="Student vibe coding with AI tools"
      >
        <Link href={LEARN_HREF} className="home-btn home-btn-outline">
          All Learning Tracks
        </Link>
        <a
          href={VIBECODING_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Udemy Vibecoding Course
        </a>
      </PageHero>

      {getPartsWithChapters("vibecoding").map((group, groupIndex) => (
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
            {group.chapters.map((chapter, index) => {
              return (
                <Reveal key={chapter.slug} delay={index * 0.08}>
                  <LessonCard
                    href={chapterHref("vibecoding", chapter.slug)}
                    title={chapter.title}
                    description={chapter.description}
                    tags={chapter.tags}
                    meta={`${chapter.minutes} min read`}
                    cta="Start chapter"
                    media={
                      <VibecodingLessonCover
                        slug={chapter.slug}
                        partId={chapter.partId}
                        order={chapter.order}
                      />
                    }
                  />
                </Reveal>
              );
            })}
          </div>
        </PageSection>
      ))}

      <CtaBand
        title="Keep building your vibe coding practice"
        body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
        actions={[
          { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
          { href: LEARN_HREF, label: "Back to Learn", variant: "secondary" },
        ]}
      />
    </PageShell>
  );
}
