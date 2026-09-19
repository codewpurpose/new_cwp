const LOOKUP_WINDOW_MS = 60 * 60 * 1000;
const MAX_LOOKUPS_PER_WINDOW = 20;
const lookupHits = new Map<string, number[]>();

export interface GithubLookupRateLimit {
  limited: boolean;
  retryAfterMs: number;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/**
 * Best-effort per-instance protection for unauthenticated GitHub lookups.
 *
 * The CDN should cache successful embeds, but the origin still needs a guard
 * for cache misses and GitHub errors. A shared store can replace this map if
 * the app moves to multiple long-lived instances.
 */
export function checkGithubLookupRateLimit(request: Request): GithubLookupRateLimit {
  const now = Date.now();
  const ip = clientIp(request);
  const recent = (lookupHits.get(ip) ?? []).filter((time) => now - time < LOOKUP_WINDOW_MS);

  if (recent.length >= MAX_LOOKUPS_PER_WINDOW) {
    lookupHits.set(ip, recent);
    const oldest = recent[0] ?? now;
    return {
      limited: true,
      retryAfterMs: Math.max(1000, LOOKUP_WINDOW_MS - (now - oldest)),
    };
  }

  recent.push(now);
  lookupHits.set(ip, recent);

  if (lookupHits.size > 5000) {
    for (const [key, times] of lookupHits) {
      if (times.every((time) => now - time >= LOOKUP_WINDOW_MS)) lookupHits.delete(key);
    }
  }

  return { limited: false, retryAfterMs: 0 };
}
