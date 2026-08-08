import type {
  LearnChapter,
  LearnNavData,
  LearnPart,
  LearnTrack,
  LearnTrackId,
} from "@/lib/learn-types";
import { TRACK_ROUTES, chapterHref } from "@/lib/learn-routes";
import { FINANCIAL_LITERACY_CHAPTERS, FINANCIAL_LITERACY_PARTS } from "@/lib/financial-literacy-lessons";
import { GITHUB_CHAPTERS, GITHUB_PARTS } from "@/lib/github-lessons";
import { HEALTH_IN_TECH_CHAPTERS, HEALTH_IN_TECH_PARTS } from "@/lib/health-in-tech-lessons";
import { ML_CHAPTERS, ML_PARTS } from "@/lib/ml-lessons";
import { PYTHON_CHAPTERS, PYTHON_PARTS } from "@/lib/python-lessons";
import { ROBLOX_CHAPTERS, ROBLOX_PARTS } from "@/lib/roblox-lessons";
import { VIBECODING_CHAPTERS, VIBECODING_PARTS } from "@/lib/vibecoding-lessons";

/** Track identity comes from `learn-routes.ts`; this pairs it with the data. */
const TRACKS: Record<LearnTrackId, LearnTrack> = {
  vibecoding: {
    ...TRACK_ROUTES.vibecoding,
    parts: VIBECODING_PARTS,
    chapters: VIBECODING_CHAPTERS,
  },
  ml: {
    ...TRACK_ROUTES.ml,
    parts: ML_PARTS,
    chapters: ML_CHAPTERS,
  },
  python: {
    ...TRACK_ROUTES.python,
    parts: PYTHON_PARTS,
    chapters: PYTHON_CHAPTERS,
  },
  "financial-literacy": {
    ...TRACK_ROUTES["financial-literacy"],
    parts: FINANCIAL_LITERACY_PARTS,
    chapters: FINANCIAL_LITERACY_CHAPTERS,
  },
  "health-in-tech": {
    ...TRACK_ROUTES["health-in-tech"],
    parts: HEALTH_IN_TECH_PARTS,
    chapters: HEALTH_IN_TECH_CHAPTERS,
  },
  roblox: {
    ...TRACK_ROUTES.roblox,
    parts: ROBLOX_PARTS,
    chapters: ROBLOX_CHAPTERS,
  },
  github: {
    ...TRACK_ROUTES.github,
    parts: GITHUB_PARTS,
    chapters: GITHUB_CHAPTERS,
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
  python: TRACKS.python.chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
  "financial-literacy": TRACKS["financial-literacy"].chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
  "health-in-tech": TRACKS["health-in-tech"].chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
  roblox: TRACKS.roblox.chapters
    .filter((c) => c.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order),
  github: TRACKS.github.chapters
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
 * Re-exported from `learn-routes.ts`, where it lives so client components can
 * build a link without pulling the curriculum in behind it. Still one
 * implementation, still the only place chapter hrefs are constructed.
 */
export { chapterHref };

/**
 * The sidebar's data, flattened to the few fields it draws.
 *
 * Call this on the server and pass the result down. The alternative — letting
 * the client sidebar call `getPartsWithChapters` itself — is what put all five
 * tracks' chapters into every lesson page's bundle.
 */
export function getSidebarNav(track: LearnTrackId): LearnNavData {
  return {
    trackTitle: TRACKS[track].title,
    groups: getPartsWithChapters(track).map(({ part, chapters }) => ({
      part: { id: part.id, number: part.number, title: part.title },
      chapters: chapters.map((chapter) => ({ slug: chapter.slug, title: chapter.title })),
    })),
  };
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
