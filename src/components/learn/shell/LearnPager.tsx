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
        <span className="learn-pager-slot" aria-hidden="true" />
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
        fallback ?? <span className="learn-pager-slot" aria-hidden="true" />
      )}
    </nav>
  );
}

interface LearnPagerEndProps {
  href: string;
  /** The uppercase line above the title. */
  eyebrow: string;
  title: string;
}

/**
 * The end-of-track card. It is a link in its own right rather than a card with
 * a link inside it: the styled block already lifts on hover, and a block that
 * lifts but only responds to a click on its inner text reads as broken.
 */
export function LearnPagerEnd({ href, eyebrow, title }: LearnPagerEndProps) {
  return (
    <Link
      href={href}
      data-direction="next"
      className="learn-pager-link learn-on-inverse learn-focusable !border-transparent !bg-learn-inverse"
    >
      <span className="learn-pager-direction !text-learn-on-inverse opacity-80">{eyebrow}</span>
      <span className="learn-pager-title !text-learn-heading-on-inverse underline">{title}</span>
    </Link>
  );
}
