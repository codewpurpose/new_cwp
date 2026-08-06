import { getSupabaseAdmin } from "./server";

/**
 * The guard that stops a new account being welcomed twice.
 *
 * Clerk delivers webhooks at least once and retries anything that isn't a 2xx,
 * so `user.created` genuinely does arrive more than once. Rather than trusting
 * the route to notice, the claim is a row insert against a primary key: the
 * first delivery wins, every later one collides and is told to stand down.
 * Postgres arbitrates, so two deliveries landing at the same instant on two
 * instances still produce exactly one email.
 */

export type WelcomeClaim =
  /** This delivery owns the send. Nobody else will. */
  | { status: "claimed" }
  /** Someone already sent it. Do nothing and report success. */
  | { status: "already-sent" }
  /** No Supabase — the caller must decide whether to send unguarded. */
  | { status: "unconfigured" }
  /** The database is reachable but unhappy. Worth a retry. */
  | { status: "failed"; error: string };

/** Postgres unique_violation — the claim was already taken. */
const UNIQUE_VIOLATION = "23505";

/**
 * Claims the right to send `userId` their account welcome.
 *
 * Insert, not upsert: a collision here is the signal, not an error to smooth
 * over. Call this BEFORE sending, and call releaseAccountWelcome if the send
 * then fails, or a transient Resend outage would permanently consume the only
 * chance this user had at a welcome.
 */
export async function claimAccountWelcome(
  userId: string,
  email: string,
): Promise<WelcomeClaim> {
  const admin = getSupabaseAdmin();
  if (!admin) return { status: "unconfigured" };

  const { error } = await admin.from("account_welcomes").insert({ user_id: userId, email });

  if (!error) return { status: "claimed" };
  if (error.code === UNIQUE_VIOLATION) return { status: "already-sent" };
  return { status: "failed", error: error.message };
}

/**
 * Gives the claim back after a failed send, so Clerk's next retry can try
 * again. Best-effort: if this itself fails there is nothing sensible left to
 * do, and the cost is one person missing a welcome email rather than anything
 * being lost.
 */
export async function releaseAccountWelcome(userId: string): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) return;

  const { error } = await admin.from("account_welcomes").delete().eq("user_id", userId);
  if (error) {
    console.error(
      `[cwp] account-welcome: could not release the claim on ${userId}; they will not be ` +
        `retried. Delete the row by hand to re-enable it:`,
      error.message,
    );
  }
}
