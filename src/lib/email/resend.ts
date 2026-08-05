import { Resend } from "resend";
import type { RenderedEmail } from "./layout";

/**
 * Resend is optional, in the same way Clerk and Supabase are: without a key the
 * subscribe endpoint reports itself unavailable and the popup says so, rather
 * than the build failing or a student watching a spinner that never resolves.
 *
 * Server-only. RESEND_API_KEY has no NEXT_PUBLIC_ prefix precisely so it can
 * never be bundled into the browser — importing this from a client component is
 * a build error, which is the behaviour we want.
 */
const apiKey = process.env.RESEND_API_KEY;

/** Which audience new subscribers are added to. Not a secret, just config. */
export const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

export const isResendConfigured = Boolean(apiKey);

/**
 * Must be an address on the domain registered in Resend — which is the root,
 * codewithpurpose.org.
 *
 * Not `send.codewithpurpose.org`: that subdomain carries the SPF and MX records
 * for the bounce return-path, which Resend creates as part of registering the
 * root. It is not a domain you send from, and naming it here makes Resend look
 * for a registration that does not exist ("domain is not verified").
 *
 * The mailbox need not exist — DKIM is what authorises the send, and replies go
 * to EMAIL_REPLY_TO below, which is a real inbox.
 */
export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "CodeWithPurpose <hello@codewithpurpose.org>";

/** Replies should reach a human, not the sending subdomain. */
export const EMAIL_REPLY_TO = "team@codewithpurpose.org";

let client: Resend | null = null;

function getResend(): Resend | null {
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export interface SendResult {
  ok: boolean;
  /** Present when ok is false. Safe to log; never surfaced to the browser verbatim. */
  error?: string;
}

/** Sends one rendered email. Both the HTML and text parts always go together. */
export async function sendEmail(to: string, email: RenderedEmail): Promise<SendResult> {
  const resend = getResend();
  if (!resend) return { ok: false, error: "Resend is not configured" };

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    to,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Adds a subscriber to the audience. Resend treats a repeat address as a no-op
 * rather than an error, so this is safe to call on every submission.
 */
export async function addContact(email: string): Promise<SendResult> {
  const resend = getResend();
  if (!resend) return { ok: false, error: "Resend is not configured" };
  if (!RESEND_AUDIENCE_ID) return { ok: false, error: "RESEND_AUDIENCE_ID is not set" };

  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: RESEND_AUDIENCE_ID,
  });

  return error ? { ok: false, error: error.message } : { ok: true };
}
