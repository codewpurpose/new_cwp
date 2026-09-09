"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  commits_by_year: Record<string, { public: number; private: number }>;
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

function totalCommitCount(row: Pick<Row, "public_commits" | "private_contributions">): number {
  return row.public_commits + row.private_contributions;
}

function commitLabel(row: Pick<Row, "public_commits" | "private_contributions">): string {
  const total = totalCommitCount(row);
  return total === 1 ? "1 total commit" : `${total} total commits`;
}

function compactCommitLabel(count: number): string {
  return count === 1 ? "1 commit" : `${count} commits`;
}

function yearRows(commitsByYear: Row["commits_by_year"]): [string, { public: number; private: number }][] {
  return Object.entries(commitsByYear ?? {}).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));
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
        Ranking students by their real GitHub commit history is not available in this deployment yet.
        Please check back later.
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
    if (!supabase) {
      setError("Supabase is not configured for this deployment.");
      return;
    }
    let active = true;
    supabase
      .from("github_stats")
      .select(
        "user_id, github_username, avatar_url, name, joined_github_at, public_commits, " +
          "private_contributions, commits_by_year, public_repos, followers, following, total_prs, " +
          "total_issues, total_stars, last_synced_at",
      )
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
  const rankedRows = useMemo(
    () => (rows ? [...rows].sort((a, b) => totalCommitCount(b) - totalCommitCount(a)) : null),
    [rows],
  );

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
              <CommitDistributionChart commitCounts={rows.map(totalCommitCount)} />
            </div>
          )}

          {rows.length === 0 ? (
            <p className="text-center text-[14px] text-[var(--home-ink-soft)]">
              No one&apos;s linked a GitHub account yet — be the first.
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {rankedRows?.map((row, i) => {
                const me = user?.id === row.user_id;
                const expanded = expandedId === row.user_id;
                const total = totalCommitCount(row);
                return (
                  <li
                    key={row.user_id}
                    className={`home-card rounded-2xl p-3 sm:p-4 ${me ? "ring-2 ring-[var(--home-moss)]" : ""}`}
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : row.user_id)}
                        aria-expanded={expanded}
                        aria-controls={expanded ? `github-stats-${row.user_id}` : undefined}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left sm:gap-4"
                      >
                        <span className="w-7 shrink-0 text-center font-serif text-lg text-[var(--home-ink-soft)] sm:w-8">
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
                      </button>
                      <CommitTotalDisclosure
                        total={total}
                        publicCommits={row.public_commits}
                        privateContributions={row.private_contributions}
                      />
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : row.user_id)}
                        aria-expanded={expanded}
                        aria-controls={expanded ? `github-stats-${row.user_id}` : undefined}
                        aria-label={`${expanded ? "Hide" : "Show"} details for ${row.name || row.github_username}`}
                        className="shrink-0 rounded-md p-1 text-[var(--home-ink-quiet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)]"
                      >
                        <span
                          className={`commit-row-chevron text-base transition-transform ${expanded ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          ▾
                        </span>
                      </button>
                    </div>

                    {expanded && (
                      <div id={`github-stats-${row.user_id}`} className="mt-4 border-t border-[var(--home-hairline)] pt-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[14px] sm:grid-cols-3">
                          <Stat label="Total commits" value={String(total)} />
                          <Stat label="Public commits" value={String(row.public_commits)} />
                          <Stat label="Private contributions" value={String(row.private_contributions)} />
                          <Stat label="GitHub since" value={formatDate(row.joined_github_at)} />
                          <Stat label="Public repos" value={String(row.public_repos)} />
                          <Stat label="Followers" value={String(row.followers)} />
                          <Stat label="Following" value={String(row.following)} />
                          <Stat label="Pull requests" value={String(row.total_prs)} />
                          <Stat label="Issues opened" value={String(row.total_issues)} />
                          <Stat label="Stars earned" value={String(row.total_stars)} />
                        </dl>
                        <YearlyCommitsTable commitsByYear={row.commits_by_year} />
                      </div>
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

function CommitTotalDisclosure({
  total,
  publicCommits,
  privateContributions,
}: {
  total: number;
  publicCommits: number;
  privateContributions: number;
}) {
  return (
    <details className="commit-total-details shrink-0">
      <summary
        className="commit-total-summary rounded-md px-1 py-1 text-right text-[13px] font-medium tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] sm:text-[14px]"
        aria-label={`${compactCommitLabel(total)}: ${publicCommits} public, ${privateContributions} private contributions`}
      >
        <span>{compactCommitLabel(total)}</span>
        <span className="commit-total-chevron ml-0.5 text-[var(--home-ink-quiet)]" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="commit-total-tooltip home-card rounded-lg p-3 text-left text-[13px]" role="tooltip">
        <p className="font-medium">{compactCommitLabel(total)}</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[var(--home-ink-soft)]">
          <div>
            <dt>Public</dt>
            <dd className="font-medium tabular-nums text-[var(--home-ink)]">{publicCommits}</dd>
          </div>
          <div>
            <dt>Private</dt>
            <dd className="font-medium tabular-nums text-[var(--home-ink)]">{privateContributions}</dd>
          </div>
        </dl>
      </div>
    </details>
  );
}

function YearlyCommitsTable({ commitsByYear }: { commitsByYear: Row["commits_by_year"] }) {
  const entries = yearRows(commitsByYear);
  if (entries.length === 0) return null;

  return (
    <section className="mt-5" aria-labelledby="commits-by-year-heading">
      <h3 id="commits-by-year-heading" className="text-[13px] font-medium text-[var(--home-ink)]">
        Commits by year
      </h3>
      <p className="mt-1 text-[13px] text-[var(--home-ink-soft)]">
        Public commits and private contributions are shown separately for every available year.
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[280px] text-left text-[13px]">
          <caption className="sr-only">Year-by-year GitHub commit breakdown</caption>
          <thead className="text-[var(--home-ink-quiet)]">
            <tr>
              <th scope="col" className="pb-2 font-medium">Year</th>
              <th scope="col" className="pb-2 text-right font-medium">Public</th>
              <th scope="col" className="pb-2 text-right font-medium">Private</th>
              <th scope="col" className="pb-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([year, counts]) => (
              <tr key={year} className="border-t border-[var(--home-hairline)]">
                <th scope="row" className="py-2 font-medium">{year}</th>
                <td className="py-2 text-right tabular-nums">{counts.public}</td>
                <td className="py-2 text-right tabular-nums">{counts.private}</td>
                <td className="py-2 text-right font-medium tabular-nums">
                  {counts.public + counts.private}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
          Linked as <strong>@{ownRow.github_username}</strong> — {commitLabel(ownRow)}.
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
