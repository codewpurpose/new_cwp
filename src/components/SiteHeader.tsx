"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CwpLogo } from "@/components/icons";
import { isClerkConfigured } from "@/lib/clerk";
import { DASHBOARD_HREF, DONATE_HREF, HOME_HREF, JOIN_HREF, LOGIN_HREF, NAV_LINKS } from "@/lib/links";

function LogInButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a href={LOGIN_HREF} onClick={onNavigate} className="home-btn home-btn-fill whitespace-nowrap">
      Log in
    </a>
  );
}

/**
 * The header account control. Signed out (or before Clerk is configured) it's a
 * plain "Log in" button; signed in it becomes a "My Progress" link plus Clerk's
 * avatar menu. `isClerkConfigured` is a build-time constant, so the hook branch
 * is stable across renders.
 */
function AuthAction({ onNavigate }: { onNavigate?: () => void }) {
  if (!isClerkConfigured) return <LogInButton onNavigate={onNavigate} />;
  return <ClerkAuthAction onNavigate={onNavigate} />;
}

function ClerkAuthAction({ onNavigate }: { onNavigate?: () => void }) {
  const { isSignedIn } = useUser();
  // Before load isSignedIn is undefined -> show "Log in", matching SSR (no flash).
  if (!isSignedIn) return <LogInButton onNavigate={onNavigate} />;
  return (
    <span className="flex items-center gap-2">
      <a href={DASHBOARD_HREF} onClick={onNavigate} className="home-btn home-btn-fill whitespace-nowrap">
        My Progress
      </a>
      <UserButton />
    </span>
  );
}

const GLASS_STYLE = {
  background:
    "linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85)",
  border: "0.5px solid rgba(206,206,206,0.22)",
};

function LogoLink() {
  return (
    <a href={HOME_HREF} className="flex items-center" aria-label="CodeWithPurpose home">
      <CwpLogo className="cwp-logo-header" />
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10">
      {/* Flex below the desktop breakpoint, grid at and above it. The three
          columns exist only to hold the nav pill optically centred; once the
          pill is display:none the two 1fr tracks still claim their gaps and
          both outer tracks still size to max-content, which is what pushed the
          menu toggle past the right edge of a phone. */}
      <div className="mx-auto flex w-full max-w-[85rem] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-10 min-[1200px]:grid min-[1200px]:grid-cols-[1fr_auto_1fr] min-[1200px]:gap-4 min-[1200px]:py-8">
        <div className="min-w-0 min-[1200px]:justify-self-start">
          <LogoLink />
        </div>
        <nav
          className="home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex"
          style={GLASS_STYLE}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={`px-3 py-2 ${link.label === "Courses" ? "learn-nav-item" : ""}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 min-[1200px]:col-start-3 min-[1200px]:justify-self-end">
          <div className="hidden min-[1200px]:block">
            <AuthAction />
          </div>
          <div className="hidden min-[1200px]:block">
            <a href={JOIN_HREF} className="home-btn home-btn-glass whitespace-nowrap">
              Volunteer
            </a>
          </div>
          <a
            href={DONATE_HREF}
            className="home-btn home-btn-compact home-btn-glass whitespace-nowrap"
          >
            {/* "Now" is the first thing to go. The threshold is 420 rather than
                the 360 where the wordmark comes back, because between the two
                the full lockup and the long label together overrun the line and
                the wordmark slides under this button.
                One outer span so the label is a single flex item — .home-btn is
                inline-flex with a 0.4rem gap, which would otherwise land between
                the two words on top of the space. */}
            <span>
              Donate<span className="hidden min-[420px]:inline">{" "}Now</span>
            </span>
          </a>
          <div className="min-[1200px]:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="home-mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="home-btn home-btn-compact home-btn-glass"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M3 3l10 10M13 3L3 13" />
                ) : (
                  <path d="M2 4.5h12M2 8h12M2 11.5h12" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="home-mobile-menu"
          className="absolute inset-x-0 top-full mx-4 flex flex-col rounded-xl p-2 backdrop-blur-[10px] sm:mx-5 md:mx-10 min-[1200px]:hidden"
          style={GLASS_STYLE}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-[1rem] ${link.label === "Courses" ? "learn-nav-item" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex justify-center">
            <AuthAction onNavigate={() => setMenuOpen(false)} />
          </div>
          <a
            href={JOIN_HREF}
            onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-lg border-t-[0.5px] border-[var(--home-hairline)] px-3 py-2.5 text-[1rem]"
          >
            Volunteer
          </a>
        </nav>
      )}
    </header>
  );
}
