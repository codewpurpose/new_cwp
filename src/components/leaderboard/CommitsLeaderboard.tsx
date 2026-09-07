"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { isClerkConfigured } from "@/lib/clerk";
import { isValidGithubUsername } from "@/lib/github/username";
import { DASHBOARD_HREF, GITHUB_STATS_SYNC_PATH, LOGIN_HREF } from "@/lib/links";
import { CommitDistributionChart } from "@/components/leaderboard/CommitDistributionChart";

interface Row {
  user_id: string;
  github_username: string;
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
  last_synced_at: string | null;
}

interface LookupStats {
  profile: {
    login: string;
    name: string | null;
    avatarUrl: string;
    joinedGithubAt: string;
    followers: number;
    following: number;
    publicRepos: number;
    totalPrs: number;
    totalIssues: number;
  };
  totalStars: number;
  publicCommits: number;
  privateContributions: number;
}

interface LookupResponse {
  ok?: boolean;
  stats?: LookupStats;
  error?: string;
  retryAfterMs?: number;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** No `toLocaleString`/`Intl` here, matching the rest of the site's plain-number style. */
function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function commitLabel(count: number): string {
  return count === 1 ? "1 public commit" : `${count} public commits`;
}

function compactCommitLabel(count: number): string {
  return count === 1 ? "1 commit" : `${count} commits`;
}

function retryAfterLabel(retryAfterMs: number): string {
  const minutes = Math.ceil(retryAfterMs / 60000);
  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}

function readSyncError(body: unknown): string | null {
  if (!body || typeof body !== "object" || !("error" in body)) return null;
  const error = body.error;
  return typeof error === "string" ? error : null;
}

function readRetryAfterMs(body: unknown): number | null {
  if (!body || typeof body !== "object" || !("retryAfterMs" in body)) return null;
  const retryAfterMs = body.retryAfterMs;
  return typeof retryAfterMs === "number" && Number.isFinite(retryAfterMs) ? retryAfterMs : null;
}

function ComingSoon() {
  return (
    <div className="home-card mx-auto max-w-xl p-8 text-center">
      <h2 className="font-serif text-2xl">The commits leaderboard is almost here</h2>
      <p className="mt-3 text-[15px] text-[var(--home-ink-soft)]">
        Ranking students by their real GitHub commit history needs accounts switched on.
        Check back once it&apos;s live.
      </p>
      <Link href={DASHBOARD_HREF} className="home-btn home-btn-fill mt-6 inline-flex">
        Go to My Progress
      </Link>
    </div>
  );
}

export function CommitsLeaderboard() {
  if (!isClerkConfigured || !isSupabaseConfigured) return <ComingSoon />;
  return <CommitsLeaderboardLive />;
}

function CommitsLeaderboardLive() {
  const { isLoaded, user } = useUser();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let active = true;
    supabase
      .from("github_stats")
      .select(
        "user_id, github_username, avatar_url, name, joined_github_at, public_commits, " +
          "private_contributions, public_repos, followers, following, total_prs, total_issues, " +
          "total_stars, last_synced_at",
      )
      .order("public_commits", { ascending: false })
      .limit(100)
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) {
          setError(err.message);
          return;
        }
        setError(null);
        setRows((data as unknown as Row[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const ownRow = rows?.find((r) => r.user_id === user?.id) ?? null;

  return (
    <div className="mx-auto max-w-2xl">
      <PublicGithubLookup
        isLoaded={isLoaded}
        isSignedIn={Boolean(user)}
        onSynced={() => setRefreshKey((k) => k + 1)}
      />

      {!isLoaded && (
        <div className="home-card mb-6 p-4 text-[14px] text-[var(--home-ink-soft)]">
          Checking your account…
        </div>
      )}

      {isLoaded && !user && (
        <div className="home-card mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <span className="text-[14px] text-[var(--home-ink-soft)]">
            Log in to link your GitHub and claim your spot.
          </span>
          <Link href={LOGIN_HREF} className="home-btn home-btn-fill">
            Log in
          </Link>
        </div>
      )}

      {isLoaded && user && (
        <LinkGithubPanel
          ownRow={ownRow}
          onSynced={() => setRefreshKey((k) => k + 1)}
        />
      )}

      {error && (
        <p className="mx-auto max-w-xl text-center text-[14px] text-[var(--home-ink-soft)]">
          Couldn&apos;t load the commits leaderboard right now. Please try again shortly.
        </p>
      )}

      {rows === null && !error && (
        <p className="mx-auto max-w-xl text-center text-[14px] text-[var(--home-ink-soft)]">
          Loading the commits leaderboard…
        </p>
      )}

      {rows !== null && !error && (
        <>
          {rows.length > 0 && (
            <div className="mb-6">
              <CommitDistributionChart commitCounts={rows.map((r) => r.public_commits)} />
            </div>
          )}

          {rows.length === 0 ? (
            <p className="text-center text-[14px] text-[var(--home-ink-soft)]">
              No one&apos;s linked a GitHub account yet — be the first.
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {rows.map((row, i) => {
                const me = user?.id === row.user_id;
                const expanded = expandedId === row.user_id;
                return (
                  <li
                    key={row.user_id}
                    className={`home-card rounded-2xl p-3 ${me ? "ring-2 ring-[var(--home-moss)]" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : row.user_id)}
                      aria-expanded={expanded}
                      className="flex w-full items-center gap-4 text-left"
                    >
                      <span className="w-8 shrink-0 text-center font-serif text-lg text-[var(--home-ink-soft)]">
                        {i + 1}
                      </span>
                      {row.avatar_url ? (
                        <Image
                          src={row.avatar_url}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="h-9 w-9 shrink-0 rounded-full bg-[var(--home-grey-450)]" />
                      )}
                      <span className="min-w-0 flex-1 truncate font-medium">
                        {row.name || row.github_username}
                        {me && <span className="ml-2 text-[13px] text-[var(--home-ink-soft)]">(you)</span>}
                        <span className="ml-2 text-[13px] text-[var(--home-ink-quiet)]">
                          @{row.github_username}
                        </span>
                      </span>
                      <span className="w-24 shrink-0 text-right font-medium tabular-nums">
                        {compactCommitLabel(row.public_commits)}
                      </span>
                      <span
                        className="shrink-0 text-[var(--home-ink-quiet)] transition-transform"
                        style={{ transform: expanded ? "rotate(180deg)" : undefined }}
                        aria-hidden
                      >
                        ▾
                      </span>
                    </button>

                    {expanded && (
                      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--home-hairline)] pt-4 text-[14px] sm:grid-cols-3">
                        <Stat label="GitHub since" value={formatDate(row.joined_github_at)} />
                        <Stat label="Public repos" value={String(row.public_repos)} />
                        <Stat label="Followers" value={String(row.followers)} />
                        <Stat label="Following" value={String(row.following)} />
                        <Stat label="Pull requests" value={String(row.total_prs)} />
                        <Stat label="Issues opened" value={String(row.total_issues)} />
                        <Stat label="Stars earned" value={String(row.total_stars)} />
                        {row.private_contributions > 0 && (
                          <Stat label="Private contributions" value={String(row.private_contributions)} />
                        )}
                      </dl>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] uppercase tracking-[0.06em] text-[var(--home-ink-quiet)]">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function PublicGithubLookup({
  isLoaded,
  isSignedIn,
  onSynced,
}: {
  isLoaded: boolean;
  isSignedIn: boolean;
  onSynced: () => void;
}) {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<LookupStats | null>(null);
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "error">("idle");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const lookup = useCallback(async (name: string) => {
    setLookupStatus("loading");
    setSaveStatus("idle");
    setMessage(null);
    setResult(null);
    try {
      const params = new URLSearchParams({ username: name });
      const res = await fetch(`${GITHUB_STATS_SYNC_PATH}?${params.toString()}`);
      const body = (await res.json().catch(() => ({}))) as LookupResponse;
      if (!res.ok || !body.stats) {
        setLookupStatus("error");
        setMessage(body.error ?? "Couldn't look up that GitHub account.");
        return;
      }
      setLookupStatus("idle");
      setResult(body.stats);
    } catch {
      setLookupStatus("error");
      setMessage("Couldn't reach GitHub. Try again shortly.");
    }
  }, []);

  const save = useCallback(async () => {
    if (!result) return;
    setSaveStatus("saving");
    setMessage(null);
    try {
      const res = await fetch(GITHUB_STATS_SYNC_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: result.profile.login }),
      });
      const body: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const retryAfterMs = readRetryAfterMs(body);
        const retryAfterText = retryAfterMs
          ? ` Try again in about ${retryAfterLabel(retryAfterMs)}.`
          : "";
        setSaveStatus("error");
        setMessage(`${readSyncError(body) ?? "Couldn't save this account."}${retryAfterText}`);
        return;
      }
      setSaveStatus("success");
      setMessage("Saved to the CodeWithPurpose leaderboard.");
      onSynced();
    } catch {
      setSaveStatus("error");
      setMessage("Couldn't reach the server. Try again shortly.");
    }
  }, [onSynced, result]);

  return (
    <section className="home-card mb-6 p-5 md:p-6" aria-labelledby="github-lookup-title">
      <div className="flex flex-col gap-2">
        <h2 id="github-lookup-title" className="font-serif text-2xl">
          Look up GitHub commits
        </h2>
        <p className="text-[14px] text-[var(--home-ink-soft)]">
          Enter any public GitHub username to fetch lifetime public commits and profile stats.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = username.trim();
          if (!isValidGithubUsername(trimmed)) {
            setLookupStatus("error");
            setMessage("That doesn't look like a GitHub username.");
            return;
          }
          lookup(trimmed);
        }}
        className="mt-5 flex flex-wrap items-center gap-3"
      >
        <label htmlFor="github-lookup-username" className="home-mono text-[13px] text-[var(--home-ink-quiet)]">
          github.com/
        </label>
        <input
          id="github-lookup-username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (lookupStatus !== "loading") {
              setLookupStatus("idle");
              setSaveStatus("idle");
              setMessage(null);
            }
          }}
          placeholder="octocat"
          maxLength={39}
          className="min-w-0 flex-1 rounded-full border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-white)] px-4 py-2 text-[14px] outline-none focus:border-[var(--home-fern)]"
        />
        <button
          type="submit"
          disabled={lookupStatus === "loading" || username.trim().length === 0}
          className="home-btn home-btn-fill"
        >
          {lookupStatus === "loading" ? "Fetching…" : "Fetch"}
        </button>
      </form>

      {result && (
        <div className="mt-5 rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-white)] p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={result.profile.avatarUrl}
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {result.profile.name || result.profile.login}
                <span className="ml-2 text-[14px] text-[var(--home-ink-quiet)]">
                  @{result.profile.login}
                </span>
              </p>
              <p className="mt-1 text-[14px] text-[var(--home-ink-soft)]">
                {commitLabel(result.publicCommits)} since {formatDate(result.profile.joinedGithubAt)}.
              </p>
            </div>
            {isLoaded && isSignedIn ? (
              <button
                type="button"
                onClick={save}
                disabled={saveStatus === "saving"}
                className="home-btn home-btn-outline"
              >
                {saveStatus === "saving" ? "Saving…" : "Save to leaderboard"}
              </button>
            ) : (
              <Link href={LOGIN_HREF} className="home-btn home-btn-outline">
                Log in to save
              </Link>
            )}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--home-hairline)] pt-4 text-[14px] sm:grid-cols-4">
            <Stat label="Public repos" value={String(result.profile.publicRepos)} />
            <Stat label="Pull requests" value={String(result.profile.totalPrs)} />
            <Stat label="Issues opened" value={String(result.profile.totalIssues)} />
            <Stat label="Stars earned" value={String(result.totalStars)} />
            <Stat label="Followers" value={String(result.profile.followers)} />
            <Stat label="Following" value={String(result.profile.following)} />
            <Stat label="Private contributions" value={String(result.privateContributions)} />
          </dl>
        </div>
      )}

      {message && (
        <p className={`mt-3 text-[13px] ${lookupStatus === "error" || saveStatus === "error" ? "text-[#a13c28]" : "text-[var(--home-ink-soft)]"}`}>
          {message}
        </p>
      )}
    </section>
  );
}

function LinkGithubPanel({
  ownRow,
  onSynced,
}: {
  ownRow: Row | null;
  onSynced: () => void;
}) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "syncing" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const sync = useCallback(
    async (name: string) => {
      setStatus("syncing");
      setMessage(null);
      try {
        const res = await fetch(GITHUB_STATS_SYNC_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name }),
        });
        const body: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          const retryAfterMs = readRetryAfterMs(body);
          const retryAfterText = retryAfterMs
            ? ` Try again in about ${retryAfterLabel(retryAfterMs)}.`
            : "";
          setStatus("error");
          setMessage(`${readSyncError(body) ?? "Couldn't sync right now."}${retryAfterText}`);
          return;
        }
        setStatus("success");
        setUsername("");
        setMessage("GitHub linked. Refreshing the leaderboard now.");
        onSynced();
      } catch {
        setStatus("error");
        setMessage("Couldn't reach the server. Try again shortly.");
      }
    },
    [onSynced],
  );

  if (ownRow) {
    return (
      <div className="home-card mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
        <span className="text-[14px] text-[var(--home-ink-soft)]">
          Linked as <strong>@{ownRow.github_username}</strong> — {commitLabel(ownRow.public_commits)}.
        </span>
        <button
          type="button"
          onClick={() => sync(ownRow.github_username)}
          disabled={status === "syncing"}
          className="home-btn home-btn-outline"
        >
          {status === "syncing" ? "Syncing…" : "Resync"}
        </button>
        {message && (
          <p className={`w-full text-[13px] ${status === "error" ? "text-[#a13c28]" : "text-[var(--home-ink-soft)]"}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = username.trim();
        if (!isValidGithubUsername(trimmed)) {
          setStatus("error");
          setMessage("That doesn't look like a GitHub username.");
          return;
        }
        sync(trimmed);
      }}
      className="home-card mb-6 flex flex-wrap items-center gap-3 p-4"
    >
      <label htmlFor="github-username" className="text-[14px] text-[var(--home-ink-soft)]">
        Link your GitHub:
      </label>
      <input
        id="github-username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (status !== "syncing") {
            setStatus("idle");
            setMessage(null);
          }
        }}
        placeholder="your-username"
        maxLength={39}
        className="min-w-0 flex-1 rounded-full border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-white)] px-4 py-2 text-[14px] outline-none focus:border-[var(--home-fern)]"
      />
      <button
        type="submit"
        disabled={status === "syncing" || username.trim().length === 0}
        className="home-btn home-btn-fill"
      >
        {status === "syncing" ? "Linking…" : "Link"}
      </button>
      {message && (
        <p className={`w-full text-[13px] ${status === "error" ? "text-[#a13c28]" : "text-[var(--home-ink-soft)]"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
