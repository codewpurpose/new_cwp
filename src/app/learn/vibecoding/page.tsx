import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  COURSES_HREF,
  LEARN_HREF,
  LEARN_VIBECODING_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";
import { VIBECODING_LESSONS } from "@/lib/vibecoding-lessons";

export const metadata: Metadata = {
  title: "Vibe Coding | CWP",
  description:
    "Free interactive vibe coding lessons from CodeWithPurpose. Learn to prompt, pair-program, debug, and ship real apps with AI.",
};

const INK = "#0a0e19";
const PISTACHIO = "#dbefdb";
const FERN = "#3e7f5c";

function IntroIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <path d="M14 12 5 32l9 20" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 12l9 20-9 20" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M32 40s-9-5.5-9-12c0-3.4 2.6-5.6 5.3-5.6 1.5 0 2.9.8 3.7 2 .8-1.2 2.2-2 3.7-2 2.7 0 5.3 2.2 5.3 5.6 0 6.5-9 12-9 12Z"
        fill={PISTACHIO}
        stroke={INK}
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PromptIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <path
        d="M9 15h38a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H27l-11 10V41H9a6 6 0 0 1-6-6V21a6 6 0 0 1 6-6Z"
        fill={PISTACHIO}
        stroke={INK}
        strokeWidth="1.6"
        transform="translate(6 2)"
      />
      <path d="M15 25h26M15 33h18" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M46 44v10M41 49h10" stroke={FERN} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <path
        d="M14 20a18 18 0 0 1 30-4M50 44a18 18 0 0 1-30 4"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M40 12l4 6-7 1M24 52l-4-6 7-1" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="7" fill={PISTACHIO} stroke={INK} strokeWidth="1.6" />
    </svg>
  );
}

function DebugIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <ellipse cx="32" cy="35" rx="12" ry="15" fill={PISTACHIO} stroke={INK} strokeWidth="1.6" />
      <path d="M20 26 12 18M44 26l8-8M20 44l-8 8M44 44l8 8M14 35H6M58 35h-8" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 22v-6a7 7 0 0 1 14 0v6" stroke={INK} strokeWidth="1.8" fill="none" />
      <path d="M26 36l4 4 8-9" stroke={FERN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <rect x="14" y="14" width="16" height="16" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
      <rect x="34" y="14" width="16" height="16" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.6" />
      <rect x="14" y="34" width="16" height="16" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
      <rect x="34" y="34" width="16" height="16" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
      <path d="M39 20.5l2 2 4-4.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <circle cx="27" cy="27" r="14" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <path d="M37 37l14 14" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 27l5 5 9-10" stroke={FERN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CodebaseIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <rect x="12" y="20" width="34" height="26" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
      <rect x="18" y="14" width="34" height="26" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.6" />
      <path d="M25 27h20M25 33h14" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShipIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-9 w-9">
      <path
        d="M32 8c9 8 13 19 13 28a13 13 0 0 1-26 0c0-9 4-20 13-28Z"
        fill={PISTACHIO}
        stroke={INK}
        strokeWidth="1.6"
      />
      <circle cx="32" cy="34" r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      <path d="M24 46l-7 12M40 46l7 12" stroke={FERN} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<string, () => React.ReactElement> = {
  intro: IntroIcon,
  tools: ToolsIcon,
  prompts: PromptIcon,
  loop: LoopIcon,
  debugging: DebugIcon,
  review: ReviewIcon,
  codebase: CodebaseIcon,
  shipping: ShipIcon,
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

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {VIBECODING_LESSONS.map((lesson, index) => {
            const Icon = ICONS[lesson.slug];
            return (
              <Reveal key={lesson.slug} delay={index * 0.08}>
                <Link
                  href={`${LEARN_VIBECODING_HREF}/${lesson.slug}/`}
                  className="home-card home-lift home-template-row group block overflow-hidden rounded-[20px]"
                >
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-[#f2f2f2]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-[0.5px] border-[#e1e1e1] bg-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      <Icon />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                      {lesson.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-4 text-xl md:text-2xl">{lesson.title}</h2>
                    <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                      {lesson.description}
                    </p>
                    <p className="home-arrow-link mt-5">
                      Start lesson{" "}
                      <span className="home-row-arrow text-[#397554]">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[#1e3c2c]">
        <div className="mx-auto max-w-3xl text-center text-[#dbefdb]">
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]">
            Keep building your vibe coding practice
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] opacity-90">
            These lessons are part of CodeWithPurpose&apos;s free learning
            library, built by students, for students, everywhere.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={COURSES_HREF}
              className="home-btn home-btn-fill !border-[#dbefdb] !bg-[#dbefdb] !text-[#1e3c2c]"
            >
              Browse All Courses
            </Link>
            <Link href={LEARN_HREF} className="home-btn home-btn-outline !border-[#dbefdb] !text-[#dbefdb]">
              Back to Learn
            </Link>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
