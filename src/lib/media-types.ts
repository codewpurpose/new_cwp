/**
 * Client-safe types and pure helpers shared by the media UI and server data
 * assembly. Keep YouTube API access in lib/youtube.ts instead.
 */

export type MediaPlatform = "youtube" | "instagram";

export interface MediaItem {
  id: string;
  platform: MediaPlatform;
  title: string;
  description: string;
  url: string;
  /** Required for YouTube entries; omitted for Instagram entries. */
  videoId?: string;
  /** A local path under /public, used for Instagram preview cards. */
  thumbnail?: string;
  featured: boolean;
  /** ISO 8601. Set on fetched YouTube entries; optional on hand-curated ones. */
  publishedAt?: string;
}

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function isValidYouTubeVideoId(videoId: string): boolean {
  return YOUTUBE_ID.test(videoId);
}

export function getYouTubeEmbedUrl(videoId: string): string {
  if (!isValidYouTubeVideoId(videoId)) {
    throw new Error(`Invalid YouTube videoId: ${videoId}.`);
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Keeps date ordering deterministic without requiring the UI to know how
 * media entries are assembled.
 */
export function sortMediaByPublishedDate(items: readonly MediaItem[]): MediaItem[] {
  return items.slice().sort((a, b) => {
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
