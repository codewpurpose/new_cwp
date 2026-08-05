"use client";

import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { DASHBOARD_HREF, LOGIN_HREF, LEADERBOARD_HREF } from "@/lib/links";

/**
 * Clerk-powered auth card. `mode` picks sign-in vs sign-up; both give Google and
 * email/password with no extra wiring. Before Clerk is configured we show an
 * honest "coming soon" card and point at the local-first dashboard.
 */
export function LoginForm({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  if (!isClerkConfigured) {
    return (
      <div className="home-card mx-auto max-w-md p-8 text-center">
        <h2 className="font-serif text-2xl">Accounts are coming soon</h2>
        <p className="mt-3 text-[15px] text-[var(--home-ink-soft)]">
          Sign-in isn&apos;t switched on yet. Good news: you don&apos;t need it to start.
          Everything you learn — XP, streak, badges, unlocked Kodas — saves right on
          this device, completely free.
        </p>
        <Link href={DASHBOARD_HREF} className="home-btn home-btn-fill mt-6 inline-flex">
          Go to My Progress
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {mode === "signup" ? (
        <SignUp
          routing="hash"
          signInUrl={LOGIN_HREF}
          fallbackRedirectUrl={DASHBOARD_HREF}
        />
      ) : (
        <SignIn
          routing="hash"
          signUpUrl="/sign-up"
          fallbackRedirectUrl={LEADERBOARD_HREF}
        />
      )}
    </div>
  );
}
