import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { fetchGithubStats } from "@/lib/github/stats";
import { isValidGithubUsername } from "@/lib/github/username";
import { checkSyncGate, upsertGithubStats } from "@/lib/supabase/github-stats";

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
      return NextResponse.json({ error: "The commits leaderboard isn't switched on yet." }, { status: 503 });
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
  if (!result.ok) {
    switch (result.error.kind) {
      case "unconfigured":
        return NextResponse.json({ error: "The commits leaderboard isn't switched on yet." }, { status: 503 });
      case "not-found":
        return NextResponse.json({ error: "No GitHub user with that username." }, { status: 404 });
      case "rate-limited":
        return NextResponse.json({ error: "GitHub is rate-limiting us — try again shortly." }, { status: 503 });
      case "failed":
        console.error("[cwp] github-stats: fetch failed:", result.error.error);
        return NextResponse.json({ error: "Couldn't reach GitHub. Try again shortly." }, { status: 502 });
    }
  }

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
      publicCommits: result.stats.publicCommits,
    },
    { status: 200 },
  );
}
