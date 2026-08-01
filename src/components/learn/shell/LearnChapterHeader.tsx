import Link from "next/link";
import type { LearnChapter, LearnTrackId } from "@/lib/learn-types";
import { chapterHref, getPositionLabel, getPrerequisites, getTrack } from "@/lib/learn-nav";

const LEVEL_LABEL: Record<LearnChapter["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface LearnChapterHeaderProps {
  track: LearnTrackId;
  chapter: LearnChapter;
}

export function LearnChapterHeader({ track, chapter }: LearnChapterHeaderProps) {
  const trackMeta = getTrack(track);
  const prerequisites = getPrerequisites(track, chapter.slug);

  return (
    <header className="learn-measure">
      <nav aria-label="Breadcrumb" className="learn-eyebrow">
        <Link href={trackMeta.href} className="learn-focusable hover:text-learn-strong">
          {trackMeta.title}
        </Link>
        <span aria-hidden="true">/</span>
        <span>{getPositionLabel(track, chapter.slug)}</span>
      </nav>

      <h1 className="home-serif mt-4 text-[2rem] leading-[1.1] tracking-[-0.02em] text-learn-strong md:text-[2.5rem]">
        {chapter.title}
      </h1>

      <p className="mt-4 text-lg leading-[1.55] text-learn-muted">{chapter.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.78rem] text-learn-subtle">
        <span className="rounded-full bg-learn-quiet px-2.5 py-1 font-medium uppercase tracking-[0.06em] text-learn-strong">
          {LEVEL_LABEL[chapter.level]}
        </span>
        <span>{chapter.minutes} min read</span>
        {chapter.lastReviewed && (
          <>
            <span aria-hidden="true">·</span>
            {/* Tooling and pricing chapters go stale fast, so say when they
                were last checked rather than letting readers guess. */}
            <span>
              Reviewed{" "}
              <time dateTime={chapter.lastReviewed}>
                {new Date(chapter.lastReviewed).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
          </>
        )}
      </div>

      {prerequisites.length > 0 && (
        <p className="mt-4 text-[0.85rem] text-learn-muted">
          Worth reading first:{" "}
          {prerequisites.map((prereq, index) => (
            <span key={prereq.slug}>
              {index > 0 && ", "}
              <Link
                href={chapterHref(track, prereq.slug)}
                className="learn-focusable text-learn-link underline"
              >
                {prereq.title}
              </Link>
            </span>
          ))}
        </p>
      )}

      <hr className="mt-8 border-0 border-t border-learn-line" />
    </header>
  );
}
