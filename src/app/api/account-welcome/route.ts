import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { renderAccountWelcome } from "@/lib/email/emails/account-welcome";
import { addContact, isResendConfigured, sendEmail } from "@/lib/email/resend";
import { claimAccountWelcome, releaseAccountWelcome } from "@/lib/supabase/account-welcomes";
import { recordSubscriber } from "@/lib/supabase/subscribers";
import { CONTACT_EMAIL } from "@/lib/links";

/**
 * Sends a new account holder their welcome email, once.
 *
 * Triggered by the browser on first sign-in (see ClerkDataSync in
 * lib/supabase/with-clerk.tsx), NOT by a Clerk webhook. That means no webhook
 * endpoint to register and no signing secret to manage — the caller's Clerk
 * session is the authentication, and CLERK_SECRET_KEY is already configured.
 *
 * The trade this makes: the email is sent when the person first loads the site
 * while signed in, rather than the instant the account row is created. In
 * practice that is the same moment, because Clerk's sign-up flow lands them
 * back on the site. An account created and then never revisited gets nothing.
 *
 * Nothing here trusts the request body — there isn't one. The user id and the
 * address both come from the session server-side, so the only thing a caller
 * can do by hitting this endpoint repeatedly is send *themselves* one email.
 *
 * This runs on the Node runtime (the default) because the Resend SDK needs it.
 */

/** A working opt-out, because this send also puts the address on the list. */
const UNSUBSCRIBE_URL = `mailto:${CONTACT_EMAIL}?subject=Unsubscribe`;

/** Where the address came from, recorded on the subscribers row. */
const SOURCE = "account";

/**
 * How new an account has to be to be worth welcoming.
 *
 * Without this, the first person to sign in after deploying would be treated as
 * brand new — and so would every other existing account, because none of them
 * are in `account_welcomes` yet. The result would be a welcome blast to the
 * entire user base, all at once, for accounts they made months ago.
 *
 * Seven days is generous for the real case (people sign in within seconds of
 * signing up) while making that blast impossible.
 */
const MAX_ACCOUNT_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!isResendConfigured) {
    // Not the caller's problem, and not worth an error in their console.
    console.warn("[cwp] account-welcome: RESEND_API_KEY is not set; nothing to send.");
    return NextResponse.json({ ok: true, skipped: "email-unconfigured" }, { status: 200 });
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  // Old account signing in after this shipped. See MAX_ACCOUNT_AGE_MS.
  if (Date.now() - user.createdAt > MAX_ACCOUNT_AGE_MS) {
    return NextResponse.json({ ok: true, skipped: "not-new" }, { status: 200 });
  }

  const address = user.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
  if (!address) {
    console.warn(`[cwp] account-welcome: ${user.id} has no primary email address.`);
    return NextResponse.json({ ok: true, skipped: "no-email" }, { status: 200 });
  }

  // Claim before sending. Two tabs opening at once is the ordinary case here,
  // so the guard has to be the database's primary key rather than our own
  // judgement — see lib/supabase/account-welcomes.ts.
  const claim = await claimAccountWelcome(user.id, address);
  if (claim.status === "already-sent") {
    return NextResponse.json({ ok: true, skipped: "already-sent" }, { status: 200 });
  }
  if (claim.status === "failed") {
    console.error("[cwp] account-welcome: could not claim the welcome:", claim.error);
    return NextResponse.json({ error: "Try again." }, { status: 500 });
  }
  if (claim.status === "unconfigured") {
    console.warn(
      "[cwp] account-welcome: no Supabase, so nothing is guarding against a duplicate " +
        `welcome to ${address}. Set SUPABASE_SERVICE_ROLE_KEY.`,
    );
  }

  // Creating an account also puts the address on the newsletter list. Neither
  // of these is allowed to stop the welcome: the email is the thing the person
  // is waiting for, and a missed list entry is recoverable from the logs.
  const stored = await recordSubscriber(address, SOURCE);
  if (!stored.ok && stored.reason === "failed") {
    console.error("[cwp] account-welcome: could not record subscriber:", stored.error);
  }

  const contact = await addContact(address);
  if (!contact.ok && contact.reason === "failed") {
    console.error("[cwp] account-welcome: Resend rejected the contact:", contact.error);
  }

  const sent = await sendEmail(
    address,
    renderAccountWelcome(user.firstName, UNSUBSCRIBE_URL),
  );
  if (!sent.ok) {
    console.error("[cwp] account-welcome: welcome failed to send:", sent.error);
    // Hand the claim back before reporting failure, or the next attempt finds
    // the claim taken and sends nothing — a permanent miss from a transient fault.
    if (claim.status === "claimed") await releaseAccountWelcome(user.id);
    return NextResponse.json({ error: "Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
