/**
 * Repository-owned media entries for the public video library.
 *
 * YouTube is embedded directly with its privacy-enhanced host. Instagram is
 * represented as a lightweight card that links to the original Reel or post;
 * Instagram's embed script is intentionally not loaded on every page.
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
}

/** Add published video entries here. Keep this list empty until real URLs exist. */
export const MEDIA_ITEMS: readonly MediaItem[] = [];

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

function isYouTubeUrl(value: string, videoId: string): boolean {
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" &&
      (url.hostname === "youtube.com" ||
        url.hostname === "www.youtube.com" ||
        url.hostname === "m.youtube.com" ||
        url.hostname === "youtu.be")
    ) {
      const candidate =
        url.hostname === "youtu.be"
          ? url.pathname.slice(1)
          : url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).at(-1);
      return candidate === videoId;
    }
    return false;
  } catch {
    return false;
  }
}

function isInstagramUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "instagram.com" || url.hostname === "www.instagram.com") &&
      /^\/(reel|p|tv)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

/**
 * Fails loudly during development/build instead of rendering a broken card.
 * An empty list is valid while the team is collecting the first URLs; once
 * entries exist, the homepage must have exactly three featured items.
 */
export function validateMediaItems(items: readonly MediaItem[]): void {
  const ids = new Set<string>();
  const featured = items.filter((item) => item.featured);

  if (featured.length !== 0 && featured.length !== 3) {
    throw new Error(
      `Media library must have either zero or three featured items; found ${featured.length}.`,
    );
  }

  for (const item of items) {
    if (ids.has(item.id)) {
      throw new Error(`Media item ids must be unique; duplicate id: ${item.id}.`);
    }
    ids.add(item.id);

    if (!item.title.trim()) {
      throw new Error(`Media item ${item.id} needs a title.`);
    }
    if (!item.description.trim()) {
      throw new Error(`Media item ${item.id} needs a description.`);
    }
    if (item.thumbnail && !item.thumbnail.startsWith("/")) {
      throw new Error(`Media item ${item.id} must use a local thumbnail path.`);
    }

    if (item.platform === "youtube") {
      if (!item.videoId || !YOUTUBE_ID.test(item.videoId)) {
        throw new Error(`YouTube item ${item.id} needs an 11-character videoId.`);
      }
      if (!isYouTubeUrl(item.url, item.videoId)) {
        throw new Error(`YouTube item ${item.id} needs a valid HTTPS YouTube URL.`);
      }
    } else {
      if (item.videoId) {
        throw new Error(`Instagram item ${item.id} must not define a videoId.`);
      }
      if (!isInstagramUrl(item.url)) {
        throw new Error(`Instagram item ${item.id} needs a valid Reel, post, or TV URL.`);
      }
    }
  }
}

validateMediaItems(MEDIA_ITEMS);

export function getMediaItems(): readonly MediaItem[] {
  return MEDIA_ITEMS;
}

export function getFeaturedMedia(): readonly MediaItem[] {
  return MEDIA_ITEMS.filter((item) => item.featured);
}

export function getYouTubeEmbedUrl(videoId: string): string {
  if (!YOUTUBE_ID.test(videoId)) {
    throw new Error(`Invalid YouTube videoId: ${videoId}.`);
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}
