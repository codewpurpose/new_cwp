import { fetchGithubContributionDays, isGithubStatsConfigured, isValidGithubUsername } from "@/lib/github/stats";
import { renderGithubReadmeEmbed } from "@/lib/github/readme-embed";
import { checkGithubLookupRateLimit } from "@/lib/github/rate-limit";

const SUCCESS_CACHE_CONTROL = "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

function errorResponse(message: string, status: number, retryAfterMs?: number): Response {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  if (retryAfterMs !== undefined) {
    headers.set("Retry-After", String(Math.ceil(retryAfterMs / 1000)));
  }

  return new Response(message, {
    status,
    headers,
  });
}

export async function GET(request: Request): Promise<Response> {
  const username = new URL(request.url).searchParams.get("username")?.trim() ?? "";

  if (!isValidGithubUsername(username)) {
    return errorResponse("A valid GitHub username is required.", 400);
  }
  if (!isGithubStatsConfigured) {
    return errorResponse("GitHub stats are not configured on this deployment.", 503);
  }

  const rateLimit = await checkGithubLookupRateLimit(request);
  if (rateLimit.limited) {
    return errorResponse("That's a few too many lookups. Give it an hour.", 429, rateLimit.retryAfterMs);
  }

  const result = await fetchGithubContributionDays(username);
  if (!result.ok) {
    if (result.error.kind === "not-found") return errorResponse("GitHub user not found.", 404);
    if (result.error.kind === "rate-limited") return errorResponse("GitHub is rate-limiting this embed.", 503);
    return errorResponse("GitHub activity is temporarily unavailable.", 502);
  }

  return new Response(renderGithubReadmeEmbed(username, result.contributionDays), {
    headers: {
      "Cache-Control": SUCCESS_CACHE_CONTROL,
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
