/**
 * GitHub commit-history lookups for /leaderboard/commits.
 *
 * Modelled on github.com/peetzweg/commit-history's approach — a single
 * server-side token, GitHub's GraphQL API, and an incremental cache keyed by
 * calendar year (a finished year's commit count never changes, so a resync
 * only re-queries the current year onward) — reimplemented against this
 * repo's Next.js route handlers instead of that project's Nitro server.
 *
 * SERVER-ONLY. `GITHUB_TOKEN` has no `NEXT_PUBLIC_` prefix; importing this
 * from a client component is a build error, same rule as `supabase/server.ts`.
 */

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const token = process.env.GITHUB_TOKEN;

export const isGithubStatsConfigured = Boolean(token);

export { isValidGithubUsername } from "./username";

/** A repo's star count is capped here for stars-sum pagination — plenty for any student's account. */
const MAX_REPOS_FOR_STARS = 500;

export interface GithubProfile {
  githubUserId: number;
  login: string;
  name: string | null;
  avatarUrl: string;
  joinedGithubAt: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalPrs: number;
  totalIssues: number;
}

export interface GithubStatsResult {
  profile: GithubProfile;
  totalStars: number;
  publicCommits: number;
  privateContributions: number;
  commitsByYear: Record<string, { public: number; private: number }>;
  syncedThroughYear: number;
}

export type GithubStatsError =
  | { kind: "unconfigured" }
  | { kind: "not-found" }
  | { kind: "rate-limited" }
  | { kind: "failed"; error: string };

interface GraphQLResponse<T> {
  data?: T;
  errors?: { type?: string; message: string }[];
}

async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<{ ok: true; data: T } | { ok: false; error: GithubStatsError }> {
  let res: Response;
  try {
    res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (err) {
    return { ok: false, error: { kind: "failed", error: String(err) } };
  }

  if (res.status === 401 || res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining === "0") return { ok: false, error: { kind: "rate-limited" } };
    return { ok: false, error: { kind: "failed", error: `GitHub returned ${res.status}` } };
  }
  if (!res.ok) {
    return { ok: false, error: { kind: "failed", error: `GitHub returned ${res.status}` } };
  }

  const body = (await res.json()) as GraphQLResponse<T>;
  if (body.errors?.some((e) => e.type === "NOT_FOUND")) {
    return { ok: false, error: { kind: "not-found" } };
  }
  if (body.errors?.length) {
    return { ok: false, error: { kind: "failed", error: body.errors[0].message } };
  }
  if (!body.data) {
    return { ok: false, error: { kind: "failed", error: "GitHub returned no data" } };
  }
  return { ok: true, data: body.data };
}

const PROFILE_QUERY = `
  query($login: String!) {
    user(login: $login) {
      databaseId
      login
      name
      avatarUrl
      createdAt
      followers { totalCount }
      following { totalCount }
      repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) { totalCount }
      pullRequests { totalCount }
      issues { totalCount }
    }
  }
`;

interface ProfileQueryData {
  user: {
    databaseId: number;
    login: string;
    name: string | null;
    avatarUrl: string;
    createdAt: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
  } | null;
}

async function fetchProfile(
  login: string,
): Promise<{ ok: true; profile: GithubProfile } | { ok: false; error: GithubStatsError }> {
  const result = await githubGraphQL<ProfileQueryData>(PROFILE_QUERY, { login });
  if (!result.ok) return result;
  const user = result.data.user;
  if (!user) return { ok: false, error: { kind: "not-found" } };
  return {
    ok: true,
    profile: {
      githubUserId: user.databaseId,
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      joinedGithubAt: user.createdAt,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: user.repositories.totalCount,
      totalPrs: user.pullRequests.totalCount,
      totalIssues: user.issues.totalCount,
    },
  };
}

const STARS_QUERY = `
  query($login: String!, $after: String) {
    user(login: $login) {
      repositories(
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        first: 100
        after: $after
      ) {
        nodes { stargazerCount }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

interface StarsQueryData {
  user: {
    repositories: {
      nodes: { stargazerCount: number }[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  } | null;
}

function fetchStarsPage(
  login: string,
  after: string | null,
): Promise<{ ok: true; data: StarsQueryData } | { ok: false; error: GithubStatsError }> {
  return githubGraphQL<StarsQueryData>(STARS_QUERY, { login, after });
}

/** Sums stargazer counts across a user's own, non-fork public repos, capped at MAX_REPOS_FOR_STARS. */
async function fetchTotalStars(
  login: string,
): Promise<{ ok: true; totalStars: number } | { ok: false; error: GithubStatsError }> {
  let totalStars = 0;
  let after: string | null = null;
  let seen = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await fetchStarsPage(login, after);
    if (!result.ok) return result;
    const repos = result.data.user?.repositories;
    if (!repos) return { ok: false, error: { kind: "not-found" } };
    for (const node of repos.nodes) totalStars += node.stargazerCount;
    seen += repos.nodes.length;
    after = repos.pageInfo.hasNextPage ? repos.pageInfo.endCursor : null;
    hasMore = Boolean(after) && seen < MAX_REPOS_FOR_STARS;
  }

  return { ok: true, totalStars };
}

const CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        restrictedContributionsCount
      }
    }
  }
`;

interface ContributionsQueryData {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      restrictedContributionsCount: number;
    };
  } | null;
}

/**
 * One year's commit contributions. GitHub caps `contributionsCollection` at a
 * one-year window, which is why this is one query per calendar year rather
 * than a single lifetime query.
 */
async function fetchYearContributions(
  login: string,
  year: number,
): Promise<
  { ok: true; public: number; private: number } | { ok: false; error: GithubStatsError }
> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year + 1}-01-01T00:00:00Z`;
  const result = await githubGraphQL<ContributionsQueryData>(CONTRIBUTIONS_QUERY, {
    login,
    from,
    to,
  });
  if (!result.ok) return result;
  const collection = result.data.user?.contributionsCollection;
  if (!collection) return { ok: false, error: { kind: "not-found" } };
  return {
    ok: true,
    public: collection.totalCommitContributions,
    private: collection.restrictedContributionsCount,
  };
}

/**
 * Full stats for one GitHub username, reusing whatever calendar years were
 * already fetched. Every year strictly before the current one is treated as
 * final and never re-queried; the current year always is, since it is still
 * in progress.
 */
export async function fetchGithubStats(
  login: string,
  existingCommitsByYear: Record<string, { public: number; private: number }> = {},
): Promise<{ ok: true; stats: GithubStatsResult } | { ok: false; error: GithubStatsError }> {
  if (!isGithubStatsConfigured) return { ok: false, error: { kind: "unconfigured" } };

  const profileResult = await fetchProfile(login);
  if (!profileResult.ok) return profileResult;
  const { profile } = profileResult;

  const starsResult = await fetchTotalStars(login);
  if (!starsResult.ok) return starsResult;

  const joinedYear = new Date(profile.joinedGithubAt).getUTCFullYear();
  const currentYear = new Date().getUTCFullYear();

  const commitsByYear: Record<string, { public: number; private: number }> = {
    ...existingCommitsByYear,
  };

  for (let year = joinedYear; year <= currentYear; year += 1) {
    const key = String(year);
    // A past year already on file is final; only ever refetch it if it's
    // missing (e.g. an interrupted first sync) or it's the current year.
    if (commitsByYear[key] && year !== currentYear) continue;
    const yearResult = await fetchYearContributions(profile.login, year);
    if (!yearResult.ok) return yearResult;
    commitsByYear[key] = { public: yearResult.public, private: yearResult.private };
  }

  let publicCommits = 0;
  let privateContributions = 0;
  for (const { public: pub, private: priv } of Object.values(commitsByYear)) {
    publicCommits += pub;
    privateContributions += priv;
  }

  return {
    ok: true,
    stats: {
      profile,
      totalStars: starsResult.totalStars,
      publicCommits,
      privateContributions,
      commitsByYear,
      syncedThroughYear: currentYear,
    },
  };
}
