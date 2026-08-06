import { renderEmail, type RenderedEmail } from "../layout";
import { TRACK_LINKS } from "./tracks";
import { CONTACT_EMAIL, DISCORD_HREF, SITE_URL } from "@/lib/links";

/**
 * The one email a newsletter subscriber gets immediately.
 *
 * Every link points at a page that is open to signed-out visitors: the
 * catalogue and the five track indexes. Individual chapters are behind the
 * sign-in gate in `proxy.ts`, so linking one from here would send a brand-new
 * subscriber straight into a login wall — a poor first impression from an email
 * whose whole argument is that nothing is gated behind a payment.
 */

export function renderNewsletterWelcome(unsubscribeUrl?: string): RenderedEmail {
  return renderEmail({
    subject: "You're on the list — CodeWithPurpose",
    preheader: "123 chapters across five tracks, free forever. Here's where to start.",
    heading: "You're on the list.",
    siteUrl: `${SITE_URL}/`,
    logoUrl: `${SITE_URL}/codewp-logo.png`,
    contactEmail: CONTACT_EMAIL,
    unsubscribeUrl,
    masthead: {
      imageUrl: `${SITE_URL}/koala/koala-wave.png`,
      alt: "Koda, the CodeWithPurpose koala, waving hello",
      caption: "Koda says hello",
    },
    footerNote:
      "You're getting this because you subscribed at codewithpurpose.org. That's the only reason — we don't buy lists or share your address.",
    blocks: [
      {
        kind: "text",
        text: "Thanks for subscribing. We're CodeWithPurpose — a nonprofit run by students, for students, teaching real skills to anyone who wants them.",
      },
      {
        kind: "text",
        text: "Everything we make is free. No paywall, no trial, no upsell at chapter three — that isn't a launch offer, it's the entire point.",
      },
      { kind: "button", label: "Browse the courses →", href: `${SITE_URL}/courses/` },
      { kind: "divider" },
      { kind: "eyebrow", text: "123 chapters, five tracks" },
      { kind: "links", items: TRACK_LINKS },
      {
        kind: "callout",
        title: "What you'll actually get",
        text: "An email when we publish a new chapter or track, and the occasional note on what the team is building. We write when there's something worth your time, and not otherwise.",
      },
      { kind: "divider" },
      {
        kind: "text",
        text: "Questions, ideas, or a mistake you spotted in a lesson? Reply to this email — a student on the team reads every one.",
      },
      {
        kind: "text",
        text: `— The CodeWithPurpose team & [the Discord](${DISCORD_HREF})`,
      },
    ],
  });
}
