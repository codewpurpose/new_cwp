"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { LOGIN_HREF, SIGN_UP_HREF } from "@/lib/links";

/**
 * The signed-out view of a chapter: the real lesson, blurred, with an invitation
 * to make an account.
 *
 * This replaced a redirect. `proxy.ts` used to answer any signed-out request for
 * /learn/<track>/<slug> with a 307 to Clerk's hosted sign-in — off-site, before
 * a single byte of the lesson rendered. That had three costs. Crawlers were
 * bounced from all 123 chapters, so the largest body of original work on the
 * site could not be indexed. Next's <Link> prefetch fetched those URLs too and
 * got a cross-origin redirect, which fails CORS and surfaces as a bare "Failed
 * to fetch" TypeError in the console. And the newsletter had to route every link
 * around the wall to avoid dropping new subscribers onto a login screen.
 *
 * IMPORTANT — this is a soft gate, and it is meant to be. The lesson is in the
 * HTML. Anyone who opens devtools, disables CSS, or reads the page source can
 * read the chapter, and no amount of client-side blurring changes that. It is an
 * invitation with a visual cost, not access control. That is the right trade for
 * a nonprofit whose entire argument is that the material is free: the account
 * buys cross-device sync and the leaderboard, and the only thing genuinely
 * protected server-side is a student's own progress, by row-level security.
 *
 * If a chapter ever must NOT be readable signed-out, this component cannot do
 * it — that needs the content off the page, which means `auth()` in the layout
 * and every chapter losing prerendering. See MISSING.md.
 */
export function LessonPreviewWall({ children }: { children: React.ReactNode }) {
  // Stable across renders — a build-time constant, not state — so branching
  // before the hook is safe. Without keys there is no <ClerkProvider> above us
  // and useAuth() would throw, which is why this is not merely an optimisation.
  if (!isClerkConfigured) return <>{children}</>;
  return <PreviewWall>{children}</PreviewWall>;
}

function PreviewWall({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) return <>{children}</>;

  // Note the treatment of `!isLoaded`: it walls the lesson rather than revealing
  // it. Both choices flash — clear-then-blurred for signed-out readers, or
  // blurred-then-clear for signed-in ones — and there is no third option,
  // because the page is prerendered and the server cannot know which it is
  // without giving up static rendering entirely. Walling first is the right way
  // round: most readers are signed out, so the common case settles instantly,
  // and the rare flash lands on someone who is about to see the lesson anyway.
  return (
    <div className="mt-10">
      {/*
        `inert` takes the whole subtree out of the tab order and off the
        accessibility tree, which matters more than the blur does: without it a
        keyboard or screen-reader user would tab straight through forty
        interactive lesson widgets that are, visually, not there.
      */}
      <div className="relative max-h-[60vh] overflow-hidden" aria-hidden="true">
        {/* No `learn-prose` here — every chapter page already wraps its body in
            one, and nesting them doubles the prose rules. */}
        <div inert className="pointer-events-none select-none blur-[5px]">
          {children}
        </div>
        {/* Fades the clipped edge into the page rather than guillotining it. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--learn-paper)]" />
      </div>

      <div className="rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-8 text-center md:p-10">
        <h2 className="text-lg text-learn-strong md:text-xl">Make a free account to read on</h2>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-learn-muted">
          Every chapter is free — an account is how your progress, XP, and streak
          follow you from your laptop to your phone, and how you show up on the
          leaderboard. No payment, no trial.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={SIGN_UP_HREF}
            className="learn-focusable inline-flex rounded-full bg-learn-inverse px-5 py-2.5 text-sm font-medium text-learn-heading-on-inverse"
          >
            Create an account
          </Link>
          <Link
            href={LOGIN_HREF}
            className="learn-focusable inline-flex rounded-full border-[0.5px] border-learn-line px-5 py-2.5 text-sm font-medium text-learn-strong"
          >
            I already have one
          </Link>
        </div>
      </div>
    </div>
  );
}
