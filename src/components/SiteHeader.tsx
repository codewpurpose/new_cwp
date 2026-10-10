"use client";

import { useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { CwpLogo } from "@/components/icons";
import { isClerkConfigured } from "@/lib/clerk";
import { DASHBOARD_HREF, DONATE_HREF, HOME_HREF, LOGIN_HREF, NAV_LINKS } from "@/lib/links";

const PRIMARY_NAV_LINKS = NAV_LINKS.filter(({ label }) =>
  ["Courses", "About Us", "Stories", "Join Us"].includes(label),
);
const MORE_NAV_LINKS = NAV_LINKS.filter(({ label }) =>
  ["AI Resources", "Code Playground", "Commits", "Media", "Contact"].includes(label),
);

function LogInButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a href={LOGIN_HREF} onClick={onNavigate} className="home-btn home-btn-fill whitespace-nowrap">
      Sign in
    </a>
  );
}

/**
 * The header account control. Signed out (or before Clerk is configured) it's a
 * plain "Sign in" button; signed in it becomes a "My Progress" link plus Clerk's
 * avatar menu. `isClerkConfigured` is a build-time constant, so the hook branch
 * is stable across renders.
 */
function AuthAction({ onNavigate }: { onNavigate?: () => void }) {
  if (!isClerkConfigured) return <LogInButton onNavigate={onNavigate} />;
  return <ClerkAuthAction onNavigate={onNavigate} />;
}

function ClerkAuthAction({ onNavigate }: { onNavigate?: () => void }) {
  const { isSignedIn } = useUser();
  // Before load isSignedIn is undefined -> show "Sign in", matching SSR (no flash).
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

function MobileMenu({ onClose }: { onClose: () => void }) {
  const isPresent = useIsPresent();

  return (
    <motion.nav
      id="home-mobile-menu"
      aria-label="Primary"
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={{ opacity: 0, y: -8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.99, pointerEvents: "none" }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute inset-x-0 top-full mx-4 flex origin-top flex-col rounded-xl p-2 backdrop-blur-[10px] sm:mx-5 md:mx-10 min-[1200px]:hidden"
      style={GLASS_STYLE}
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`rounded-lg px-3 py-3.5 text-[1rem] ${link.label === "Courses" ? "learn-nav-item" : ""}`}
        >
          {link.label}
        </a>
      ))}
      <div className="mt-2 flex justify-center">
        <AuthAction onNavigate={onClose} />
      </div>
    </motion.nav>
  );
}

function LogoLink() {
  return (
    <a
      href={HOME_HREF}
      /* home-hit-expand: the wordmark's box is 23px tall, a hair under the 24px
         minimum. Expanded rather than padded so the header height is unchanged. */
      className="home-hit-expand flex items-center"
      aria-label="CodeWithPurpose home"
    >
      <CwpLogo className="cwp-logo-header" />
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[var(--home-moss)] focus:px-4 focus:py-3 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--home-fern)] focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-10">
      {/* Flex below desktop; the three-column grid keeps the primary navigation
          centered without letting it collide with the wordmark or actions. */}
      <div className="mx-auto flex w-full max-w-[85rem] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-10 min-[1200px]:grid min-[1200px]:grid-cols-[1fr_auto_1fr] min-[1200px]:gap-4 min-[1200px]:py-8">
        <div className="min-w-0 min-[1200px]:justify-self-start">
          <LogoLink />
        </div>
        <nav
          aria-label="Primary"
          className="home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex"
          style={GLASS_STYLE}
        >
          {PRIMARY_NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={`px-3 py-2 ${link.label === "Courses" ? "learn-nav-item" : ""}`}>
              {link.label}
            </a>
          ))}
          <details className="group relative">
            <summary className="home-hit-expand cursor-pointer list-none rounded-md px-3 py-2 [&::-webkit-details-marker]:hidden">
              More
              <ChevronDown aria-hidden="true" className="ml-1 inline-block size-4 align-[-0.125em] transition-transform duration-200 group-open:rotate-180" strokeWidth={2.25} />
            </summary>
            <div
              className="absolute right-0 top-full z-20 mt-2 flex min-w-40 flex-col rounded-lg p-1 shadow-lg backdrop-blur-[10px]"
              style={GLASS_STYLE}
            >
              {MORE_NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="rounded-md px-3 py-2.5 hover:bg-black/5 focus-visible:bg-black/5">
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </nav>
        <div className="flex shrink-0 items-center gap-2 min-[1200px]:col-start-3 min-[1200px]:justify-self-end">
          <div className="hidden min-[1200px]:block">
            <AuthAction />
          </div>
          <a
            href={DONATE_HREF}
            className="home-btn home-btn-compact home-btn-glass whitespace-nowrap"
          >
            Donate
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
      <AnimatePresence initial={false}>
        {menuOpen && (
          <MobileMenu onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
      </header>
    </>
  );
}
