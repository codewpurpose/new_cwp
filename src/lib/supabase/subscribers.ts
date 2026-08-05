import { getSupabaseAdmin } from "./server";

/**
 * The newsletter list, in the database we own.
 *
 * Resend also holds a copy in its audience, but that is the mailing tool's
 * working copy — this is the record. If Resend goes away, or the audience id is
 * misconfigured, or an export is needed for anything at all, the list is here.
 */

/**
 * Deliberately the same shape as SendResult in @/lib/email/resend, so the three
 * calls in the subscribe route read alike and `reason` means the same thing in
 * each: "unconfigured" is a feature that was never switched on and may
 * reasonably be tolerated; "failed" is a configured thing that went wrong.
 */
export interface StoreResult {
  ok: boolean;
  /** Present when ok is false. Safe to log; never surfaced to the browser verbatim. */
  error?: string;
  reason?: "unconfigured" | "failed";
}

/**
 * Where the address came from. There is more than one sign-up surface — Koda's
 * popup and the footer form — so this is what tells them apart. "website" is
 * the honest fallback when the request didn't say which; never guess a specific
 * surface, a wrong label is worse than a vague one.
 */
const DEFAULT_SOURCE = "website";

/**
 * Records one subscriber. The caller must pass an already trimmed, lowercased
 * address — `email` is the primary key, so normalisation is what makes a repeat
 * sign-up collide instead of creating a second row.
 *
 * A repeat is not an error: `ignoreDuplicates` leaves the existing row exactly
 * as it was, preserving the original created_at and source.
 */
export async function recordSubscriber(
  email: string,
  source: string = DEFAULT_SOURCE,
): Promise<StoreResult> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      ok: false,
      reason: "unconfigured",
      error: "SUPABASE_SERVICE_ROLE_KEY is not set",
    };
  }

  const { error } = await admin
    .from("subscribers")
    .upsert({ email, source }, { onConflict: "email", ignoreDuplicates: true });

  return error ? { ok: false, reason: "failed", error: error.message } : { ok: true };
}
