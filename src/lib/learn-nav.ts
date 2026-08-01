import type { LearnChapter, LearnPart, LearnTrack, LearnTrackId } from "@/lib/learn-types";
import { LEARN_ML_HREF, LEARN_VIBECODING_HREF } from "@/lib/links";
import { ML_CHAPTERS, ML_PARTS } from "@/lib/ml-lessons";
import { VIBECODING_CHAPTERS, VIBECODING_PARTS } from "@/lib/vibecoding-lessons";

const TRACKS: Record<LearnTrackId, LearnTrack> = {
  vibecoding: {
    id: "vibecoding",
    title: "Vibe Coding",
    href: LEARN_VIBECODING_HREF,
    parts: VIBECODING_PARTS,
    chapters: VIBECODING_CHAPTERS,
  },
  ml: {
    id: "ml",
    title: "Machine Learning",
    href: LEARN_ML_HREF,
    parts: ML_PARTS,
    chapters: ML_CHAPTERS,
  },
};

/** Computed once at module scope rather than per render. */
const PUBLISHED: Record<LearnTrackId, readonly LearnChapter[]> = {
  vibecoding: TRACKS.vibecoding.chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
  ml: TRACKS.ml.chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
};

export function getTrack(track: LearnTrackId): LearnTrack {
  return TRACKS[track];
}

/** Published chapters only, in reading order. Drafts never reach the UI. */
export function getChapters(track: LearnTrackId): readonly LearnChapter[] {
  return PUBLISHED[track];
}

export function getChapter(track: LearnTrackId, slug: string): LearnChapter | undefined {
  return PUBLISHED[track].find((chapter) => chapter.slug === slug);
}

export function getPart(track: LearnTrackId, partId: string): LearnPart | undefined {
  return TRACKS[track].parts.find((part) => part.id === partId);
}

/** Parts that contain at least one published chapter, each with its chapters. */
export function getPartsWithChapters(
  track: LearnTrackId,
): readonly { part: LearnPart; chapters: readonly LearnChapter[] }[] {
  return TRACKS[track].parts
    .map((part) => ({
      part,
      chapters: PUBLISHED[track].filter((chapter) => chapter.partId === part.id),
    }))
    .filter((group) => group.chapters.length > 0);
}

/**
 * The only place chapter hrefs are constructed. `trailingSlash: true` is set
 * globally, so a missing slash costs a 308 redirect on every navigation.
 */
export function chapterHref(track: LearnTrackId, slug: string): string {
  return `${TRACKS[track].href}/${slug}/`;
}

/** No modulo wrap: the last chapter genuinely has no next. */
export function getAdjacent(
  track: LearnTrackId,
  slug: string,
): { prev?: LearnChapter; next?: LearnChapter } {
  const chapters = PUBLISHED[track];
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};
  return { prev: chapters[index - 1], next: chapters[index + 1] };
}

export interface LearnPosition {
  partNumber: number;
  partTotal: number;
  indexInPart: number;
  partChapterTotal: number;
  indexInTrack: number;
  total: number;
}

export function getPosition(track: LearnTrackId, slug: string): LearnPosition | undefined {
  const groups = getPartsWithChapters(track);
  const chapters = PUBLISHED[track];
  const indexInTrack = chapters.findIndex((chapter) => chapter.slug === slug);
  if (indexInTrack === -1) return undefined;

  const groupIndex = groups.findIndex((group) =>
    group.chapters.some((chapter) => chapter.slug === slug),
  );
  if (groupIndex === -1) return undefined;

  const group = groups[groupIndex];
  return {
    partNumber: groupIndex + 1,
    partTotal: groups.length,
    indexInPart: group.chapters.findIndex((chapter) => chapter.slug === slug) + 1,
    partChapterTotal: group.chapters.length,
    indexInTrack: indexInTrack + 1,
    total: chapters.length,
  };
}

/**
 * Counts both numbers on the same axis. "Part 3 · Chapter 12 of 29" reads as a
 * bug, because chapter 12 being in part 3 looks like an off-by-something.
 */
export function getPositionLabel(track: LearnTrackId, slug: string): string {
  const position = getPosition(track, slug);
  if (!position) return "";
  if (position.partTotal <= 1) {
    return `Lesson ${position.indexInTrack} of ${position.total}`;
  }
  return (
    `Part ${position.partNumber} of ${position.partTotal} · ` +
    `Chapter ${position.indexInPart} of ${position.partChapterTotal}`
  );
}

export function getPrerequisites(track: LearnTrackId, slug: string): readonly LearnChapter[] {
  const chapter = getChapter(track, slug);
  if (!chapter) return [];
  return chapter.prerequisites
    .map((prereq) => getChapter(track, prereq))
    .filter((c): c is LearnChapter => Boolean(c));
}
