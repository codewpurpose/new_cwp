import { getSupabaseAdmin, isSupabaseServerConfigured } from "@/lib/supabase/server";

const LOOKUP_WINDOW_MS = 60 * 60 * 1000;
const MAX_LOOKUPS_PER_WINDOW = 20;
const MAX_LOCAL_KEYS = 5000;
const DISTRIBUTED_RETRY_COOLDOWN_MS = 30 * 1000;
const lookupHits = new Map<string, number[]>();
let distributedRateLimitRetryAt = 0;

export interface GithubLookupRateLimit {
  limited: boolean;
  retryAfterMs: number;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function localRateLimit(ip: string): GithubLookupRateLimit {
  const now = Date.now();
  const existing = lookupHits.get(ip);
  const recent = (existing ?? []).filter((time) => now - time < LOOKUP_WINDOW_MS);

  if (!existing && lookupHits.size >= MAX_LOCAL_KEYS) {
    for (const [key, times] of lookupHits) {
      if (times.every((time) => now - time >= LOOKUP_WINDOW_MS)) lookupHits.delete(key);
    }
    if (lookupHits.size >= MAX_LOCAL_KEYS) {
      return { limited: true, retryAfterMs: LOOKUP_WINDOW_MS };
    }
  }

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

  if (lookupHits.size > MAX_LOCAL_KEYS) {
    for (const [key, times] of lookupHits) {
      if (times.every((time) => now - time >= LOOKUP_WINDOW_MS)) lookupHits.delete(key);
    }
  }

  return { limited: false, retryAfterMs: 0 };
}

function isDistributedDecision(value: unknown): value is { allowed: boolean; retry_after_seconds: number } {
  if (!value || typeof value !== "object") return false;
  const decision = value as Record<string, unknown>;
  return typeof decision.allowed === "boolean" && typeof decision.retry_after_seconds === "number";
}

/**
 * Distributed protection for unauthenticated GitHub lookups, with a local
 * fallback while the Supabase function is unavailable or not yet installed.
 *
 * The CDN should cache successful embeds, but the origin still needs a guard
 * for cache misses and GitHub errors. The Supabase function performs the
 * increment atomically, so multiple app instances share the same one-hour
 * budget. Run supabase/github-rate-limit.sql to enable that path.
 */
export async function checkGithubLookupRateLimit(request: Request): Promise<GithubLookupRateLimit> {
  const ip = clientIp(request);

  if (isSupabaseServerConfigured && Date.now() >= distributedRateLimitRetryAt) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.rpc("check_github_lookup_rate_limit", { p_ip: ip });
      const decision = Array.isArray(data) ? data[0] : data;
      if (!error && isDistributedDecision(decision)) {
        distributedRateLimitRetryAt = 0;
        return {
          limited: !decision.allowed,
          retryAfterMs: Math.max(0, decision.retry_after_seconds * 1000),
        };
      }
      const now = Date.now();
      if (distributedRateLimitRetryAt <= now) {
        console.error(
          "[cwp] github rate limiter unavailable; using local fallback:",
          error?.message ?? "Supabase returned an invalid rate-limit response",
        );
      }
      distributedRateLimitRetryAt = now + DISTRIBUTED_RETRY_COOLDOWN_MS;
    }
  }

  return localRateLimit(ip);
}
