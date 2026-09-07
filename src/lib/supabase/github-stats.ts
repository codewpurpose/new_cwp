import { getSupabaseAdmin } from "./server";
import type { GithubStatsResult } from "@/lib/github/stats";

/**
 * Reads and writes `public.github_stats` for /api/github-stats.
 *
 * Always the admin (service_role) client — see supabase/github-stats.sql for
 * why: every column here is server-computed, so there is no student-owned
 * write for a Clerk-authenticated Supabase session to make, unlike `profiles`.
 */

/** Shape of a row, as Supabase returns it (snake_case, matches the SQL). */
export interface GithubStatsRow {
  user_id: string;
  github_username: string;
  github_user_id: number | null;
  avatar_url: string | null;
  name: string | null;
  joined_github_at: string | null;
  public_commits: number;
  private_contributions: number;
  public_repos: number;
  followers: number;
  following: number;
  total_prs: number;
  total_issues: number;
  total_stars: number;
  commits_by_year: Record<string, { public: number; private: number }>;
  synced_through_year: number | null;
  last_synced_at: string | null;
  created_at: string;
}

/**
 * A resync hits GitHub's API once per calendar year the account has existed,
 * plus a paginated stars query — not free on GitHub's rate limit, and not
 * something a student needs more than occasionally. One hour is generous for
 * "I just made a commit and want to see it count" while making a refresh
 * button mashed in a loop harmless.
 */
export const SYNC_COOLDOWN_MS = 60 * 60 * 1000;

export type SyncGate =
  | { allowed: true; existing: GithubStatsRow | null }
  | { allowed: false; reason: "cooldown"; retryAfterMs: number }
  | { allowed: false; reason: "unconfigured" }
  | { allowed: false; reason: "failed"; error: string };

/** Whether `userId` may sync right now, and their existing row (the incremental cache) if any. */
export async function checkSyncGate(userId: string): Promise<SyncGate> {
  const admin = getSupabaseAdmin();
  if (!admin) return { allowed: false, reason: "unconfigured" };

  const { data, error } = await admin
    .from("github_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return { allowed: false, reason: "failed", error: error.message };

  const existing = (data as GithubStatsRow | null) ?? null;

  if (existing?.last_synced_at) {
    const elapsed = Date.now() - new Date(existing.last_synced_at).getTime();
    if (elapsed < SYNC_COOLDOWN_MS) {
      return { allowed: false, reason: "cooldown", retryAfterMs: SYNC_COOLDOWN_MS - elapsed };
    }
  }
  return { allowed: true, existing };
}

export interface StoreResult {
  ok: boolean;
  error?: string;
  /** Set when another CWP account already claimed this GitHub username. */
  reason?: "username-taken" | "failed";
}

/** Upserts one student's fetched stats, keyed on their Clerk user id. */
export async function upsertGithubStats(
  userId: string,
  stats: GithubStatsResult,
): Promise<StoreResult> {
  const admin = getSupabaseAdmin();
  if (!admin) return { ok: false, reason: "failed", error: "SUPABASE_SERVICE_ROLE_KEY is not set" };

  const { error } = await admin.from("github_stats").upsert(
    {
      user_id: userId,
      github_username: stats.profile.login,
      github_user_id: stats.profile.githubUserId,
      avatar_url: stats.profile.avatarUrl,
      name: stats.profile.name,
      joined_github_at: stats.profile.joinedGithubAt,
      public_commits: stats.publicCommits,
      private_contributions: stats.privateContributions,
      public_repos: stats.profile.publicRepos,
      followers: stats.profile.followers,
      following: stats.profile.following,
      total_prs: stats.profile.totalPrs,
      total_issues: stats.profile.totalIssues,
      total_stars: stats.totalStars,
      commits_by_year: stats.commitsByYear,
      synced_through_year: stats.syncedThroughYear,
      last_synced_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (!error) return { ok: true };
  // Postgres unique_violation, from github_stats_username_lower_idx.
  if (error.code === "23505") {
    return { ok: false, reason: "username-taken", error: error.message };
  }
  return { ok: false, reason: "failed", error: error.message };
}
