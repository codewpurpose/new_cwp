import Link from "next/link";
import type { LearnChapter, LearnTrackId } from "@/lib/learn-types";
import { chapterHref } from "@/lib/learn-nav";

interface LearnPagerProps {
  track: LearnTrackId;
  prev?: LearnChapter;
  next?: LearnChapter;
  /** Rendered in place of "next" on the final chapter. */
  fallback?: React.ReactNode;
}

export function LearnPager({ track, prev, next, fallback }: LearnPagerProps) {
  if (!prev && !next && !fallback) return null;

  return (
    <nav className="learn-pager" aria-label="Chapter navigation">
      {prev ? (
        <Link
          href={chapterHref(track, prev.slug)}
          data-direction="prev"
          className="learn-pager-link"
        >
          <span className="learn-pager-direction">&larr; Previous</span>
          <span className="learn-pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={chapterHref(track, next.slug)}
          data-direction="next"
          className="learn-pager-link"
        >
          <span className="learn-pager-direction">Next &rarr;</span>
          <span className="learn-pager-title">{next.title}</span>
        </Link>
      ) : (
        fallback ?? <span aria-hidden="true" />
      )}
    </nav>
  );
}
