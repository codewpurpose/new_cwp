import { NextResponse } from "next/server";
import { renderNewsletterWelcome } from "@/lib/email/emails/newsletter-welcome";
import { addContact, isResendConfigured, sendEmail } from "@/lib/email/resend";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";
import { recordSubscriber } from "@/lib/supabase/subscribers";
import { CONTACT_EMAIL } from "@/lib/links";

/**
 * Newsletter sign-up. The only server surface the mascot's popup talks to.
 *
 * One submission lands in two places: the `subscribers` table in Supabase, which
 * is the record, and the Resend audience, which is the mailing tool's working
 * copy. Supabase is the one that decides whether the sign-up succeeded.
 *
 * Note the trailing slash: `trailingSlash: true` in next.config.ts means a POST
 * to `/api/subscribe` is answered with a 308 to `/api/subscribe/`. Callers must
 * use the slashed form — see NEWSLETTER_SUBSCRIBE_PATH in lib/links.ts.
 *
 * This runs on the Node runtime (the default) because the Resend SDK needs it.
 */

/** A working opt-out is required the moment this stops being one-to-one mail. */
const UNSUBSCRIBE_URL = `mailto:${CONTACT_EMAIL}?subject=Unsubscribe`;

/**
 * Deliberately permissive: one @, something either side, a dot in the domain.
 * Anything stricter starts rejecting real addresses, and Resend does the
 * authoritative validation anyway.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

/**
 * Which sign-up surface sent this, recorded on the row so the two can be told
 * apart later. An allowlist rather than free text: the body is attacker-
 * controlled, and there is no reason for this column to hold arbitrary strings.
 * Anything else — including a request that says nothing — is stored as
 * "website", which is vague but true.
 */
const ALLOWED_SOURCES = ["koda-popup", "footer"] as const;

/**
 * Per-IP rate limit. This endpoint is unauthenticated and causes mail to be
 * sent, so it needs a ceiling or it is an open relay pointed at strangers.
 *
 * In-memory, therefore per-instance and reset on deploy — which is the right
 * trade for a site on a single standalone server. Move it to a shared store the
 * day this runs on more than one instance.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  // Either store on its own makes this endpoint worth having: Supabase can
  // record someone without Resend, and Resend could greet someone without
  // Supabase. Only when neither exists is there nothing to offer.
  if (!isSupabaseServerConfigured && !isResendConfigured) {
    return NextResponse.json(
      { error: "Email sign-up isn't switched on yet." },
      { status: 503 },
    );
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "That's a few too many tries. Give it an hour." },
      { status: 429 },
    );
  }

  let email: unknown;
  let source: unknown;
  try {
    ({ email, source } = await req.json());
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Enter an email address." }, { status: 400 });
  }

  const address = email.trim().toLowerCase();
  if (address.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(address)) {
    return NextResponse.json(
      { error: "That doesn't look like an email address." },
      { status: 400 },
    );
  }

  // An unrecognised source is not worth a 400 — the address is the point, and
  // rejecting a real sign-up over a label would be absurd. Fall back instead.
  const from = ALLOWED_SOURCES.find((s) => s === source);

  // Store before greeting: a subscriber we failed to greet is recoverable, a
  // greeting we failed to record is not. Both stores treat a repeat address as
  // a no-op, so this is safe to call on every submission.
  //
  // Supabase goes first because it is the record. If it is configured and the
  // write fails, stop — claiming success would quietly drop a real subscriber,
  // and a retry costs nothing.
  const stored = await recordSubscriber(address, from);
  if (!stored.ok && stored.reason === "failed") {
    console.error("[cwp] subscribe: could not record subscriber:", stored.error);
    return NextResponse.json(
      { error: "Couldn't add you to the list just now. Try again shortly." },
      { status: 502 },
    );
  }

  // Resend's audience is the mailing tool's copy, so a failure here is only
  // fatal when Supabase isn't holding the address either. Otherwise the two
  // lists have drifted, which is a problem for us and not for the visitor.
  const contact = await addContact(address);
  if (!contact.ok && contact.reason === "failed") {
    if (!stored.ok) {
      console.error("[cwp] subscribe: could not store contact:", contact.error);
      return NextResponse.json(
        { error: "Couldn't add you to the list just now. Try again shortly." },
        { status: 502 },
      );
    }
    console.error(
      "[cwp] subscribe: recorded in Supabase but Resend rejected the contact:",
      contact.error,
    );
  }

  // Neither store switched on. The site is running welcome-email-only: an
  // intentional state while setting the services up, and the sign-up still does
  // the visible thing. It is NOT a state to launch in — nobody is being kept.
  if (!stored.ok && !contact.ok) {
    console.warn(
      `[cwp] subscribe: sending the welcome but NOT recording ${address} anywhere — ` +
        "set SUPABASE_SERVICE_ROLE_KEY or RESEND_AUDIENCE_ID before launch, or " +
        "every subscriber is lost.",
    );
  }

  const sent = await sendEmail(address, renderNewsletterWelcome(UNSUBSCRIBE_URL));
  if (!sent.ok) {
    console.error("[cwp] subscribe: welcome email failed:", sent.error);
    // Genuinely on the list now, so don't imply the sign-up itself failed.
    return NextResponse.json(
      { ok: true, warning: "You're on the list — the welcome email didn't send, though." },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
