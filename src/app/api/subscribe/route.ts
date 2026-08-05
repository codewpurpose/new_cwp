import { NextResponse } from "next/server";
import { renderNewsletterWelcome } from "@/lib/email/emails/newsletter-welcome";
import { addContact, isResendConfigured, sendEmail } from "@/lib/email/resend";
import { CONTACT_EMAIL } from "@/lib/links";

/**
 * Newsletter sign-up. The only server surface the mascot's popup talks to.
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
  if (!isResendConfigured) {
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
  try {
    ({ email } = await req.json());
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

  // Store first, and stop here if it fails. A subscriber we failed to greet is
  // recoverable; a greeting we failed to record is not — and mailing "you're on
  // the list" to someone who is demonstrably not on the list is worse than
  // saying the sign-up didn't work. A repeat address is a no-op on Resend's side.
  const stored = await addContact(address);
  if (!stored.ok) {
    console.error("[cwp] subscribe: could not store contact:", stored.error);
    return NextResponse.json(
      { error: "Couldn't add you to the list just now. Try again shortly." },
      { status: 502 },
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
