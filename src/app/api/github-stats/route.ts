import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/clerk";
import { fetchGithubStats } from "@/lib/github/stats";
import { isValidGithubUsername } from "@/lib/github/username";
import { checkSyncGate, upsertGithubStats } from "@/lib/supabase/github-stats";

const LOOKUP_WINDOW_MS = 60 * 60 * 1000;
const MAX_LOOKUPS_PER_WINDOW = 20;
const lookupHits = new Map<string, number[]>();
type GithubStatsFetchResult = Awaited<ReturnType<typeof fetchGithubStats>>;
type GithubStatsFetchError = Extract<GithubStatsFetchResult, { ok: false }>;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function lookupRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (lookupHits.get(ip) ?? []).filter((time) => now - time < LOOKUP_WINDOW_MS);
  if (recent.length >= MAX_LOOKUPS_PER_WINDOW) {
    lookupHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  lookupHits.set(ip, recent);

  if (lookupHits.size > 5000) {
    for (const [key, times] of lookupHits) {
      if (times.every((time) => now - time >= LOOKUP_WINDOW_MS)) lookupHits.delete(key);
    }
  }
  return false;
}

function githubStatsErrorResponse(result: GithubStatsFetchError) {
  switch (result.error.kind) {
    case "unconfigured":
      return NextResponse.json(
        { error: "GitHub commit lookups aren't configured on the server yet. Please ask an administrator to add GITHUB_TOKEN." },
        { status: 503 },
      );
    case "not-found":
      return NextResponse.json({ error: "No GitHub user with that username." }, { status: 404 });
    case "rate-limited":
      return NextResponse.json({ error: "GitHub is rate-limiting us — try again shortly." }, { status: 503 });
    case "failed":
      console.error("[cwp] github-stats: fetch failed:", result.error.error);
      return NextResponse.json({ error: "Couldn't reach GitHub. Try again shortly." }, { status: 502 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username")?.trim() ?? "";

  if (!isValidGithubUsername(username)) {
    return NextResponse.json({ error: "That doesn't look like a GitHub username." }, { status: 400 });
  }

  if (lookupRateLimited(clientIp(request))) {
    return NextResponse.json({ error: "That's a few too many lookups. Give it an hour." }, { status: 429 });
  }

  const result = await fetchGithubStats(username);
  if (!result.ok) return githubStatsErrorResponse(result);

  return NextResponse.json(
    {
      ok: true,
      stats: {
        profile: result.stats.profile,
        totalStars: result.stats.totalStars,
        totalCommits: result.stats.publicCommits + result.stats.privateContributions,
        contributionDays: result.stats.contributionDays,
      },
    },
    { status: 200 },
  );
}

/**
 * Links (or resyncs) the signed-in student's GitHub username on the commits
 * leaderboard.
 *
 * Requires a Clerk session — see CommitsLeaderboard, which is the only caller.
 * The username in the request body is the ONLY untrusted input; everything
 * this writes to `github_stats` comes back from GitHub's own API, never from
 * the request. No student can set their own commit count any more than they
 * can set their own XP (see the note atop supabase/schema.sql) — the same
 * shape of problem, solved the same way: derive the number server-side, grant
 * the browser nothing to overwrite it with.
 *
 * Node runtime (the default) because @clerk/nextjs/server needs it.
 */
export async function POST(request: Request) {
  if (!isClerkConfigured || !process.env.CLERK_SECRET_KEY?.trim()) {
    return NextResponse.json(
      { error: "GitHub account linking is not configured on this deployment yet." },
      { status: 503 },
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let username: unknown;
  try {
    ({ username } = await request.json());
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }
  if (typeof username !== "string" || !isValidGithubUsername(username.trim())) {
    return NextResponse.json({ error: "That doesn't look like a GitHub username." }, { status: 400 });
  }
  const requestedUsername = username.trim();

  const gate = await checkSyncGate(userId);
  if (!gate.allowed) {
    if (gate.reason === "unconfigured") {
      return NextResponse.json(
        { error: "GitHub leaderboard storage isn't configured on the server yet. Please ask an administrator to check the Supabase server credentials." },
        { status: 503 },
      );
    }
    if (gate.reason === "failed") {
      console.error("[cwp] github-stats: sync gate failed:", gate.error);
      return NextResponse.json({ error: "Couldn't check your current GitHub link. Try again." }, { status: 500 });
    }
    return NextResponse.json(
      { error: "You just synced — try again in a bit.", retryAfterMs: gate.retryAfterMs },
      { status: 429 },
    );
  }

  const existingCommitsByYear =
    gate.existing?.github_username.toLowerCase() === requestedUsername.toLowerCase()
      ? gate.existing.commits_by_year
      : {};
  const result = await fetchGithubStats(requestedUsername, existingCommitsByYear);
  if (!result.ok) return githubStatsErrorResponse(result);

  const stored = await upsertGithubStats(userId, result.stats);
  if (!stored.ok) {
    if (stored.reason === "username-taken") {
      return NextResponse.json(
        { error: "That GitHub account is already linked to another CodeWithPurpose account." },
        { status: 409 },
      );
    }
    console.error("[cwp] github-stats: store failed:", stored.error);
    return NextResponse.json({ error: "Fetched your stats but couldn't save them. Try again." }, { status: 500 });
  }

  return NextResponse.json(
    {
      ok: true,
      githubUsername: result.stats.profile.login,
      totalCommits: result.stats.publicCommits + result.stats.privateContributions,
    },
    { status: 200 },
  );
}
