import Link from "next/link";
import type { ReactNode } from "react";
import BlurText from "@/components/reactbits/BlurText";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { TopicCover } from "@/components/TopicCover";
import { formatDuration, getCatalogCourse, getTrackStats } from "@/components/courses/catalog";
import {
  ChapterStatus,
  ContinueButton,
  NextUpHighlight,
  PartProgress,
  ProgressPanel,
} from "@/components/learn/space/TrackProgress";
import { chapterHref, getPartsWithChapters } from "@/lib/learn-nav";
import type { LearnChapter, LearnTrackId } from "@/lib/learn-types";
import { COURSES_HREF } from "@/lib/links";

const LEVEL_LABEL = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } as const;

/**
 * A course's home inside the learning space: a hero that answers "where am I
 * and what do I do next", then the whole syllabus, part by part.
 *
 * The title and description are each track page's own copy, passed in rather
 * than rewritten here. The figures (chapters, parts, reading time, level mix)
 * are counted from the published lesson graph.
 */
export function CourseHome({
  track,
  title,
  description,
  udemy,
  chapterMedia,
}: {
  track: LearnTrackId;
  title: string;
  description: string;
  udemy: { href: string; label: string };
  /** The track's own lesson art, drawn small beside each syllabus row. */
  chapterMedia: (chapter: LearnChapter) => ReactNode;
}) {
  const course = getCatalogCourse(track);
  const stats = getTrackStats(track);
  const parts = getPartsWithChapters(track);
  const duration = formatDuration(stats.minutes);
  // Numbered across the whole course, the order LessonGate unlocks them in.
  const numberOf = new Map(
    parts.flatMap((group) => group.chapters).map((chapter, index) => [chapter.slug, index + 1]),
  );

  return (
    <>
      <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-hairline)]">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-[85rem] gap-10 px-5 pt-8 pb-12 md:px-10 md:pt-12 md:pb-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[var(--home-ink-quiet)]">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href={COURSES_HREF} className="learn-focusable underline-offset-2 hover:underline">
                    Courses
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-[#15120c]">
                  {course.title}
                </li>
              </ol>
            </nav>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <BlurText
              as="h1"
              text={title}
              className="home-display mt-4 text-[2rem] leading-[1.06] tracking-[-0.02em] text-balance md:text-[2.6rem] lg:text-[3rem]"
            />
            <p className="mt-5 max-w-xl text-[17px] leading-[1.55] text-[var(--home-ink-soft)]">
              {description}
            </p>

            <dl className="mt-7 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-500)]">
              {[
                { label: "Chapters", value: String(stats.chapters) },
                { label: stats.parts === 1 ? "Part" : "Parts", value: String(stats.parts) },
                { label: "Reading", value: duration },
              ].map((item) => (
                <div key={item.label} className="bg-[#fffbf5] px-4 py-3">
                  <dt className="home-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
                    {item.label}
                  </dt>
                  <dd className="home-serif mt-1 text-[1.35rem] leading-none text-[#1e3c2c]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <ContinueButton />
              <a
                href={udemy.href}
                target="_blank"
                rel="noreferrer"
                className="home-btn home-btn-violet learn-focusable gap-1.5"
              >
                {udemy.label}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(on Udemy, opens in a new tab)</span>
              </a>
              <Link href={COURSES_HREF} className="home-btn home-btn-outline learn-focusable">
                All Courses
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <div className="home-card overflow-hidden rounded-[22px] bg-[#fffbf5]">
              <TiltedCard rotateAmplitude={4}>
                <TopicCover variant={course.cover} className="block aspect-[16/9] w-full" />
              </TiltedCard>
              <div className="border-t-[0.5px] border-[var(--home-grey-500)] px-5">
                <ProgressPanel durationLabel={duration} />
              </div>
            </div>
            <LevelMix levels={stats.levels} total={stats.chapters} />
          </div>
        </div>
      </section>

      <section id="syllabus" aria-labelledby="syllabus-heading" className="scroll-mt-16">
        <div className="mx-auto grid w-full max-w-[85rem] gap-10 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-[5.5rem] lg:self-start">
            <p className="home-mono text-[11px] uppercase tracking-[0.14em] text-[#3e7f5c]">Syllabus</p>
            <h2 id="syllabus-heading" className="home-serif mt-2 text-[1.6rem] leading-tight text-[#15120c]">
              {parts.length > 1 ? `${parts.length} parts, ${stats.chapters} chapters` : `${stats.chapters} chapters`}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--home-ink-quiet)]">
              Chapters open in order: pass a chapter&apos;s quick check to unlock the next.
            </p>
            {parts.length > 1 && (
              <nav aria-label="Parts" className="mt-5 hidden lg:block">
                <ol className="space-y-1 border-l-[0.5px] border-[var(--home-hairline-strong)]">
                  {parts.map((group) => (
                    <li key={group.part.id}>
                      <a
                        href={`#part-${group.part.id}`}
                        className="learn-focusable -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-snug text-[var(--home-ink-soft)] transition-colors hover:border-[#3e7f5c] hover:text-[#15120c]"
                      >
                        <span className="home-mono mr-1.5 text-[11px] text-[#3e7f5c]">{group.part.number}</span>
                        {group.part.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>

          <div className="min-w-0 space-y-12">
            {parts.map((group) => (
              <section
                key={group.part.id}
                id={`part-${group.part.id}`}
                aria-labelledby={`part-${group.part.id}-title`}
                className="scroll-mt-20"
              >
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-[0.5px] border-[var(--home-hairline-strong)] pb-4">
                  <div className="min-w-0">
                    <p className="home-mono text-[11px] uppercase tracking-[0.14em] text-[#3e7f5c]">
                      Part {group.part.number}
                    </p>
                    <h3
                      id={`part-${group.part.id}-title`}
                      className="home-serif mt-1 text-[1.4rem] leading-tight text-[#15120c] md:text-[1.65rem]"
                    >
                      {group.part.title}
                    </h3>
                  </div>
                  <PartProgress slugs={group.chapters.map((chapter) => chapter.slug)} />
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                  {group.part.summary}
                </p>

                <ol className="mt-5 space-y-1.5">
                  {group.chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <ChapterRow
                        track={track}
                        chapter={chapter}
                        number={numberOf.get(chapter.slug) ?? 0}
                        media={chapterMedia(chapter)}
                      />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ChapterRow({
  track,
  chapter,
  number,
  media,
}: {
  track: LearnTrackId;
  chapter: LearnChapter;
  number: number;
  media: ReactNode;
}) {
  return (
    <Link
      href={chapterHref(track, chapter.slug)}
      className="learnspace-row learn-focusable group relative grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-4 rounded-[14px] p-3 md:grid-cols-[2rem_8.5rem_minmax(0,1fr)_auto] md:items-center md:p-3.5"
    >
      <NextUpHighlight slug={chapter.slug} />
      <span className="relative pt-0.5 md:pt-0">
        <ChapterStatus slug={chapter.slug} number={number} />
      </span>
      <span
        aria-hidden="true"
        className="learnspace-thumb relative hidden overflow-hidden rounded-[10px] border-[0.5px] border-[var(--home-grey-500)] md:block"
      >
        {media}
      </span>
      <span className="relative min-w-0">
        <span className="block text-[15.5px] font-medium leading-snug text-[#15120c] group-hover:text-[#1e3c2c] md:text-[16.5px]">
          {chapter.title}
        </span>
        <span className="mt-1 line-clamp-2 block text-[14px] leading-[1.5] text-[var(--home-ink-quiet)]">
          {chapter.description}
        </span>
        <span className="home-mono mt-1.5 block text-[11.5px] text-[var(--home-ink-quiet)] md:hidden">
          {chapter.minutes} min · {LEVEL_LABEL[chapter.level]}
        </span>
      </span>
      <span className="relative hidden shrink-0 items-center gap-3 md:flex">
        <span className="home-mono text-right text-[11.5px] leading-tight text-[var(--home-ink-quiet)]">
          {chapter.minutes} min
          <br />
          {LEVEL_LABEL[chapter.level]}
        </span>
        <span aria-hidden="true" className="text-[#3e7f5c] transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

/** Beginner / intermediate / advanced split of the track's chapters, as one bar. */
function LevelMix({ levels, total }: { levels: Record<keyof typeof LEVEL_LABEL, number>; total: number }) {
  if (!total) return null;
  const colours = { beginner: "#9fd3a8", intermediate: "#3e7f5c", advanced: "#1e3c2c" } as const;
  const keys = (Object.keys(LEVEL_LABEL) as (keyof typeof LEVEL_LABEL)[]).filter((k) => levels[k] > 0);
  return (
    <div className="mt-4 px-1">
      <div className="flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
        {keys.map((key) => (
          <span key={key} style={{ width: `${(levels[key] / total) * 100}%`, background: colours[key] }} />
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-[var(--home-ink-quiet)]">
        {keys.map((key) => (
          <li key={key} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: colours[key] }} />
            {levels[key]} {LEVEL_LABEL[key].toLowerCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}
