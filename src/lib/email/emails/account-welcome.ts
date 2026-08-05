import { renderEmail, type RenderedEmail } from "../layout";
import { TRACK_LINKS } from "./tracks";
import { CONTACT_EMAIL, DISCORD_HREF, SITE_URL } from "@/lib/links";

/**
 * The email a new account holder gets, once, the moment Clerk creates them.
 *
 * Deliberately NOT the newsletter welcome. That one opens "You're on the list"
 * and thanks the reader for subscribing, which is the wrong thing to say to
 * someone who just made an account — they signed up to learn, and the first
 * thing this email owes them is what the account actually does for them.
 *
 * It does carry an unsubscribe link, because creating an account also adds the
 * address to the newsletter list. An email that grants list membership has to
 * offer a way out of it, whatever its trigger.
 */

/** The recipient's first name, when Clerk has one. Google sign-ins usually do. */
function greeting(firstName?: string | null): string {
  const name = firstName?.trim();
  return name ? `Welcome, ${name}.` : "You're all set.";
}

export function renderAccountWelcome(
  firstName?: string | null,
  unsubscribeUrl?: string,
): RenderedEmail {
  return renderEmail({
    subject: "Your CodeWithPurpose account is ready",
    preheader: "Your progress now follows you between devices. Here's where to start.",
    heading: greeting(firstName),
    siteUrl: `${SITE_URL}/`,
    logoUrl: `${SITE_URL}/codewp-logo.png`,
    contactEmail: CONTACT_EMAIL,
    unsubscribeUrl,
    masthead: {
      imageUrl: `${SITE_URL}/koala/koala-heart.png`,
      alt: "Koda, the CodeWithPurpose koala, holding a heart",
      caption: "Koda's glad you're here",
    },
    footerNote:
      "You're getting this because you created an account at codewithpurpose.org. We don't buy lists or share your address.",
    blocks: [
      {
        kind: "text",
        text: "Your account is live. We're CodeWithPurpose — a nonprofit run by students, for students, teaching real skills to anyone who wants them.",
      },
      {
        kind: "text",
        text: "Everything here is free. No paywall, no trial, no upsell at chapter three — that isn't a launch offer, it's the entire point.",
      },
      { kind: "button", label: "Open your dashboard →", href: `${SITE_URL}/dashboard/` },
      { kind: "divider" },
      {
        kind: "callout",
        title: "What the account changes",
        text: "Your progress now saves to your account instead of one browser, so you can start a chapter on a laptop and finish it on a phone. Completions are verified by the quick check at the end of each chapter, they earn XP, and XP is what places you on the leaderboard.",
      },
      { kind: "divider" },
      { kind: "eyebrow", text: "123 chapters, five tracks" },
      { kind: "links", items: TRACK_LINKS },
      { kind: "divider" },
      {
        kind: "text",
        text: `See where you stand on [the leaderboard](${SITE_URL}/leaderboard/) once you've finished your first chapter — it ranks on XP, and everyone starts at zero.`,
      },
      {
        kind: "text",
        text: "Stuck on something, or spotted a mistake in a lesson? Reply to this email — a student on the team reads every one.",
      },
      {
        kind: "text",
        text: `— The CodeWithPurpose team & [the Discord](${DISCORD_HREF})`,
      },
    ],
  });
}
