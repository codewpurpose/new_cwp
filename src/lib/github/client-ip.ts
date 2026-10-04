import { isIP } from "node:net";

/**
 * Return a rate-limit key only when the request carries the client address
 * from Vercel's edge. Generic forwarding headers are caller controlled.
 */
export function githubRateLimitKey(headers: Headers, isVercelDeployment: boolean): string {
  if (!isVercelDeployment || !headers.has("x-vercel-id")) return "unknown";
  const forwardedIp = headers.get("x-vercel-forwarded-for")?.trim();
  if (!forwardedIp || isIP(forwardedIp) === 0) return "unknown";
  const hostname = new URL(`http://${forwardedIp.includes(":") ? `[${forwardedIp}]` : forwardedIp}`).hostname;
  return hostname.replace(/^\[|\]$/g, "").toLowerCase();
}
