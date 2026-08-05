/**
 * Auth is optional at build time. Clerk only mounts when its publishable key is
 * present, so the site still builds and runs (local-first) before keys exist.
 */
export const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
