/**
 * Media entries for the public video library.
 *
 * YouTube entries are pulled live from the channel by fetchYouTubeUploads()
 * (see lib/youtube.ts) so new uploads appear without a code change. This
 * file's MEDIA_ITEMS is now only for hand-curated entries — chiefly
 * Instagram, since there is no equivalent auto-pull for it yet (that needs a
 * Business/Creator account and a Meta Graph API token; see lib/youtube.ts's
 * comment for why YouTube alone was wired up first). It can also pin a
 * specific YouTube video that isn't in the channel's recent uploads.
 *
 * YouTube is embedded directly with its privacy-enhanced host. Instagram is
 * represented as a lightweight card that links to the original Reel or post;
 * Instagram's embed script is intentionally not loaded on every page.
 */

import { fetchYouTubeUploads } from "@/lib/youtube";
import {
  isValidYouTubeVideoId,
  sortMediaByPublishedDate,
} from "@/lib/media-types";
import type { MediaItem } from "@/lib/media-types";

export type { MediaItem, MediaPlatform } from "@/lib/media-types";
export { getYouTubeEmbedUrl } from "@/lib/media-types";

/** Hand-curated entries — mainly Instagram. Keep this list empty until real URLs exist. */
export const MEDIA_ITEMS: readonly MediaItem[] = [];

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

function isLocalMediaThumbnail(value: string): boolean {
  if (!value.startsWith("/media/") || value.includes("\\") || value.startsWith("//")) {
    return false;
  }

  try {
    const url = new URL(value, "https://codewithpurpose.local");
    return (
      url.origin === "https://codewithpurpose.local" &&
      url.pathname.startsWith("/media/")
    );
  } catch {
    return false;
  }
}

/**
 * Fails loudly during development/build instead of rendering a broken card.
 * An empty list is valid while the team is collecting the first URLs. The
 * "zero or three" rule only governs manually pinned featured items in this
 * file — see getFeaturedMedia() for how it combines with fetched YouTube
 * uploads, which are never marked featured here.
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
    if (item.thumbnail && !isLocalMediaThumbnail(item.thumbnail)) {
      throw new Error(
        `Media item ${item.id} must use a local thumbnail path under /media/.`,
      );
    }

    if (item.platform === "youtube") {
      if (!item.videoId || !isValidYouTubeVideoId(item.videoId)) {
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

/**
 * The full library: hand-curated entries plus the channel's recent uploads,
 * newest first. Curated entries win on id collisions (e.g. a pinned YouTube
 * video that's also in recent uploads), so nothing renders twice.
 */
export async function getMediaItems(): Promise<readonly MediaItem[]> {
  const fetched = await fetchYouTubeUploads();
  const curatedIds = new Set(MEDIA_ITEMS.map((item) => item.id));
  const merged = [...MEDIA_ITEMS, ...fetched.filter((item) => !curatedIds.has(item.id))];

  return sortMediaByPublishedDate(merged);
}

/**
 * The homepage teaser's three items. If exactly three entries in MEDIA_ITEMS
 * are manually marked featured, those win outright — a deliberate pin. Short
 * of that, the three most recent items across the whole library are used, so
 * the homepage stays current without anyone needing to flip a flag.
 */
export async function getFeaturedMedia(): Promise<readonly MediaItem[]> {
  const pinned = MEDIA_ITEMS.filter((item) => item.featured);
  if (pinned.length === 3) return pinned;

  return (await getMediaItems()).slice(0, 3);
}
