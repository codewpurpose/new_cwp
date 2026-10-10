"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { CourseEntryProvider, CourseLink } from "@/components/courses/CourseEntry";
import type { Enrolment, OutlineChapter, TopicId, TrackStats } from "@/components/courses/catalog";
import { summarise, useProgressMap, type TrackProgress } from "@/components/learn/space/progress";
import { SPOTLIGHT_PROPS } from "@/lib/spotlight";
import type { LearnTrackId } from "@/lib/learn-types";

export interface CatalogItem {
  track: LearnTrackId;
  title: string;
  tags: string[];
  description: string;
  topic: TopicId;
  topicLabel: string;
  enrol: Enrolment[];
  href: string;
  stats: TrackStats;
  duration: string;
  outline: OutlineChapter[];
  cover: ReactNode;
}

type Filter = "all" | TopicId;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The catalogue: a "pick up where you left off" row, topic filters, and the
 * course cards.
 *
 * Everything renders on the server with every course visible and nobody's
 * progress — the filters simply don't apply without JavaScript. Progress is
 * read after mount and only ever changes text and bar fills inside boxes that
 * already have their final size.
 */
export function CourseCatalog({
  items,
  topics,
  startHere,
}: {
  items: CatalogItem[];
  topics: readonly { id: TopicId; label: string }[];
  /** Tracks suggested to newcomers, from the courses' own "Start Here" / "Beginner" tags. */
  startHere: LearnTrackId[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const map = useProgressMap();

  const progress = useMemo(() => {
    const out = {} as Record<LearnTrackId, TrackProgress>;
    for (const item of items) out[item.track] = summarise(item.outline, map[item.track]);
    return out;
  }, [items, map]);

  const inProgress = items
    .filter((item) => progress[item.track].started)
    .sort((a, b) => {
      const pa = progress[a.track];
      const pb = progress[b.track];
      if (pa.finished !== pb.finished) return pa.finished ? 1 : -1;
      return pb.count / pb.total - pa.count / pa.total;
    });
  const hasProgress = inProgress.length > 0;
  const rowItems = hasProgress
    ? inProgress
    : startHere.map((track) => items.find((item) => item.track === track)).filter((item): item is CatalogItem => Boolean(item));

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All courses", count: items.length },
    ...topics.map((topic) => ({
      id: topic.id,
      label: topic.label,
      count: items.filter((item) => item.topic === topic.id).length,
    })),
  ];
  const visible = filter === "all" ? items : items.filter((item) => item.topic === filter);

  return (
    <CourseEntryProvider>
      {/* ---- Continue / start row ---------------------------------------- */}
      <div className="mb-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="home-serif truncate text-[1.5rem] leading-tight text-[#15120c] md:text-[1.9rem]">
            {hasProgress ? "Continue learning" : "Good places to start"}
          </h2>
          <p className="hidden text-[13.5px] text-[var(--home-ink-quiet)] sm:block">
            {hasProgress ? "Saved on this device" : "Free, interactive, and saved as you go"}
          </p>
        </div>
        {/* The server always sends the suggestions. When saved progress turns up
            after mount the row is swapped for it and fades in; the server's
            copy never starts transparent, so it reads without JavaScript. */}
        <motion.ul
            key={hasProgress ? "continue" : "start"}
            className="learnspace-scroll mt-5 grid auto-cols-[minmax(17.5rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 md:auto-cols-[minmax(20rem,calc((100%-2rem)/3))]"
            initial={hasProgress ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {rowItems.map((item) => (
              <li key={item.track} className="snap-start">
                <ContinueCard item={item} progress={progress[item.track]} suggestion={!hasProgress} />
              </li>
            ))}
          </motion.ul>
      </div>

      {/* ---- Filters ------------------------------------------------------ */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="home-serif text-[1.75rem] leading-tight text-[#15120c] md:text-[2.25rem]">
            Every course
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-[var(--home-ink-soft)]">
            Each one has free interactive lessons here, and a full course on Udemy.
          </p>
        </div>
        <div
          role="group"
          aria-label="Filter courses by topic"
          className="learnspace-scroll learnspace-noscrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:rounded-full md:border-[0.5px] md:border-[var(--home-grey-500)] md:bg-[#fffbf5] md:p-1"
        >
          {filters.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={`learn-focusable relative shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  active ? "text-[#fcf4e8]" : "text-[var(--home-ink-soft)] hover:text-[#15120c]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="courses-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#1e3c2c]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">
                  {option.label}
                  <span className={`home-mono ml-1.5 text-[11px] ${active ? "text-[#9fd3a8]" : "text-[var(--home-ink-quiet)]"}`}>
                    {option.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Grid --------------------------------------------------------- */}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {items.length} courses
      </p>
      <motion.ul layout className="relative mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.track}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="h-full"
            >
              <CourseCard item={item} progress={progress[item.track]} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </CourseEntryProvider>
  );
}

/* ---- Cards ------------------------------------------------------------- */

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`block h-1.5 overflow-hidden rounded-full bg-[var(--home-grey-500)] ${className}`}>
      <span
        className="learnspace-bar-fill block h-full rounded-full bg-[#3e7f5c]"
        style={{ transform: `scaleX(${Math.max(0, Math.min(1, value))})` }}
      />
    </span>
  );
}

function ContinueCard({
  item,
  progress,
  suggestion,
}: {
  item: CatalogItem;
  progress: TrackProgress;
  suggestion: boolean;
}) {
  const pct = progress.total ? progress.count / progress.total : 0;
  const line = progress.finished
    ? "Complete. Review any chapter"
    : progress.next
      ? `${progress.started ? "Next" : "Chapter 1"}: ${progress.next.title}`
      : `${item.stats.chapters} chapters`;
  const eyebrow = suggestion
    ? item.tags.join(" · ")
    : progress.finished
      ? "Finished"
      : `${progress.count} of ${progress.total} chapters`;

  return (
    <CourseLink
      href={item.href}
      title={item.title}
      data-course-card=""
      className="learn-focusable home-card home-lift group flex h-[7.75rem] items-stretch gap-4 overflow-hidden rounded-[18px] bg-[#fffbf5] p-3"
    >
      <span aria-hidden="true" className="relative w-[6.5rem] shrink-0 overflow-hidden rounded-[12px] [&_svg]:h-full [&_svg]:w-full">
        {item.cover}
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <span className="min-w-0">
          <span className="home-mono block truncate text-[10.5px] uppercase tracking-[0.12em] text-[#3e7f5c]">
            {eyebrow}
          </span>
          <span className="mt-1 block truncate text-[15.5px] font-medium text-[#15120c]">{item.title}</span>
          <span className="mt-0.5 block truncate text-[13px] text-[var(--home-ink-quiet)]">{line}</span>
        </span>
        <span className="flex items-center gap-2">
          <ProgressBar value={pct} className="flex-1" />
          <span aria-hidden="true" className="text-[#3e7f5c] transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </span>
    </CourseLink>
  );
}

const LEVEL_COLOURS = { beginner: "#9fd3a8", intermediate: "#3e7f5c", advanced: "#1e3c2c" } as const;

function CourseCard({ item, progress }: { item: CatalogItem; progress: TrackProgress }) {
  const { stats } = item;
  const pct = progress.total ? progress.count / progress.total : 0;
  const levelKeys = (Object.keys(LEVEL_COLOURS) as (keyof typeof LEVEL_COLOURS)[]).filter((k) => stats.levels[k] > 0);
  const levelSummary = levelKeys.map((k) => `${stats.levels[k]} ${k}`).join(", ");

  return (
    <SpotlightCard
      {...SPOTLIGHT_PROPS}
      data-course-card=""
      className="home-card group flex h-full flex-col rounded-[22px] bg-[#fffbf5] transition-shadow hover:shadow-[var(--home-shadow-lg)]"
    >
      <CourseLink href={item.href} title={item.title} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out [&_svg]:block [&_svg]:aspect-[16/9] [&_svg]:w-full group-hover:scale-[1.02]">
          {item.cover}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-[#fffbf5]/90 px-2.5 py-1 text-[11px] font-medium text-[#1e3c2c] backdrop-blur">
          {item.topicLabel}
        </span>
      </CourseLink>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 text-xl leading-snug md:text-[1.4rem]">
          <CourseLink href={item.href} title={item.title} className="learn-focusable hover:text-[#1e3c2c]">
            {item.title}
          </CourseLink>
        </h3>
        <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">{item.description}</p>

        <dl className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[13px] text-[var(--home-ink-quiet)]">
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Chapters</dt>
            <dd className="home-serif text-[1.35rem] leading-none text-[#1e3c2c]">
              <CountUp to={stats.chapters} duration={1.2} />
            </dd>
            <span aria-hidden="true">chapters</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Parts</dt>
            <dd className="home-serif text-[1.35rem] leading-none text-[#1e3c2c]">{stats.parts}</dd>
            <span aria-hidden="true">{stats.parts === 1 ? "part" : "parts"}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Reading time</dt>
            <dd>about {item.duration}</dd>
          </div>
        </dl>

        <div className="mt-3" title={levelSummary}>
          <span className="flex h-1 overflow-hidden rounded-full" aria-hidden="true">
            {levelKeys.map((k) => (
              <span key={k} style={{ width: `${(stats.levels[k] / stats.chapters) * 100}%`, background: LEVEL_COLOURS[k] }} />
            ))}
          </span>
          <p className="mt-1.5 text-[12px] text-[var(--home-ink-quiet)]">
            <span className="sr-only">Chapter levels: </span>
            {levelSummary}
          </p>
        </div>

        {/* Fixed height: "Not started" and "7 of 31 · Next: …" share one line. */}
        <div className="mt-5 flex h-9 items-center gap-3 rounded-xl bg-[var(--home-grey-400)] px-3">
          <ProgressBar value={pct} className="w-16 shrink-0" />
          <span className="min-w-0 truncate text-[12.5px] text-[var(--home-ink-soft)]">
            {progress.finished
              ? "Course complete"
              : progress.started
                ? `${progress.count}/${progress.total} · Next: ${progress.next?.title ?? ""}`
                : "Not started"}
          </span>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            <CourseLink href={item.href} title={item.title} className="home-btn home-btn-fill learn-focusable min-w-[12.5rem] justify-center gap-1.5">
              {progress.finished ? "Review course" : progress.started ? "Continue" : "Interactive Lessons"}
              <span aria-hidden="true">→</span>
            </CourseLink>
            {item.enrol.map((enrol) => (
              <a
                key={enrol.href}
                href={enrol.href}
                target="_blank"
                rel="noreferrer"
                className="home-btn home-btn-violet learn-focusable gap-1.5"
              >
                {enrol.label}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(on Udemy, opens in a new tab)</span>
              </a>
            ))}
          </div>
          <p className="mt-2.5 text-[12px] text-[var(--home-ink-quiet)]">
            Enrol buttons open the full course on Udemy in a new tab.
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}
