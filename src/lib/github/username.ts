/**
 * Split out from lib/github/stats.ts (which is server-only — it reads
 * `GITHUB_TOKEN` at module scope) so the input form in CommitsLeaderboard can
 * validate a username client-side without pulling that module into the
 * browser bundle.
 */

/** GitHub usernames: letters, digits, single hyphens, 1–39 chars, no leading/trailing hyphen. */
const USERNAME_RE = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

export function isValidGithubUsername(username: string): boolean {
  return USERNAME_RE.test(username);
}
