import type { MediaItem } from "@/lib/media";

/**
 * Pulls the channel's recent uploads from the YouTube Data API so the media
 * library stays current on its own — post a new video and it shows up here
 * on the next revalidation, no code change or redeploy required.
 *
 * YouTube is optional, in the same way Resend and Supabase are: without a key
 * (or channel) the library just falls back to whatever is in MEDIA_ITEMS,
 * rather than the build failing or the page throwing for every visitor.
 *
 * Server-only. YOUTUBE_API_KEY has no NEXT_PUBLIC_ prefix precisely so it can
 * never be bundled into the browser — importing this from a client component
 * is a build error, which is the behaviour we want.
 */
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE;

export const isYouTubeConfigured = Boolean(API_KEY && (CHANNEL_ID || CHANNEL_HANDLE));

const API_BASE = "https://www.googleapis.com/youtube/v3";

/**
 * How long an upload list is served from cache before Next.js refetches in
 * the background. An hour keeps this well under the free 10,000-unit daily
 * quota (channels.list + playlistItems.list cost 1 unit each, so this is at
 * most ~48 units/day) while still feeling "automatic" to whoever posts.
 */
const REVALIDATE_SECONDS = 60 * 60;
const MAX_RESULTS = 12;
const UPLOADS_TAG = "youtube-uploads";

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

interface ChannelsResponse {
  items?: Array<{
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
}

interface PlaylistItemsResponse {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      resourceId?: { videoId?: string };
    };
  }>;
}

async function youtubeGet<T>(
  path: string,
  params: Record<string, string>,
): Promise<T | null> {
  if (!API_KEY) return null;

  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set("key", API_KEY);

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [UPLOADS_TAG] },
    });

    if (!response.ok) {
      console.warn(
        `[media] YouTube API request to ${path} failed with ${response.status}: ${await response.text()}`,
      );
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[media] YouTube API request to ${path} threw`, error);
    return null;
  }
}

async function getUploadsPlaylistId(): Promise<string | null> {
  if (!CHANNEL_ID && !CHANNEL_HANDLE) return null;

  const data = await youtubeGet<ChannelsResponse>("/channels", {
    part: "contentDetails",
    ...(CHANNEL_ID
      ? { id: CHANNEL_ID }
      : { forHandle: (CHANNEL_HANDLE as string).replace(/^@/, "") }),
  });

  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

function toMediaItem(
  item: NonNullable<PlaylistItemsResponse["items"]>[number],
): MediaItem | null {
  const videoId = item.snippet?.resourceId?.videoId;
  const title = item.snippet?.title?.trim();

  // Skip anything malformed rather than throwing — one bad entry from the
  // API should never take the whole library down for every visitor.
  if (!videoId || !YOUTUBE_ID.test(videoId) || !title) return null;

  return {
    id: `youtube-${videoId}`,
    platform: "youtube",
    title,
    description: item.snippet?.description?.trim() || title,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    videoId,
    featured: false,
    publishedAt: item.snippet?.publishedAt,
  };
}

/** Fetches the channel's most recent uploads. Fails soft to an empty list. */
export async function fetchYouTubeUploads(): Promise<MediaItem[]> {
  if (!isYouTubeConfigured) return [];

  const uploadsPlaylistId = await getUploadsPlaylistId();
  if (!uploadsPlaylistId) return [];

  const data = await youtubeGet<PlaylistItemsResponse>("/playlistItems", {
    part: "snippet",
    playlistId: uploadsPlaylistId,
    maxResults: String(MAX_RESULTS),
  });

  return (data?.items ?? [])
    .map(toMediaItem)
    .filter((item): item is MediaItem => item !== null);
}
