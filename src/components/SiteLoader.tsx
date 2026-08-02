"use client";

import { useEffect, useState } from "react";

const LOADER_SEEN_KEY = "cwp-loader-seen";
const MIN_VISIBLE_MS = 1900;
/**
 * Hard ceiling on the splash, counted from mount.
 *
 * The loader covers the page with an opaque layer and takes `overflow: hidden`
 * on <html>, so for as long as it is up the site is neither readable nor
 * scrollable. It used to come down only on `window.load` — an event that waits
 * for every subresource on the page, including images far below the fold and
 * third-party requests the visitor's network may drop rather than refuse. One
 * stalled request and the event never fires at all, leaving the visitor on a
 * cream screen with a pulsing logo and no way out.
 *
 * A brand splash is not a progress indicator, so it no longer behaves like
 * one: whichever comes first, `load` or this ceiling, takes it down.
 */
const MAX_VISIBLE_MS = 3500;
const EXIT_MS = 650;

type LoaderPhase = "loading" | "exit" | "done";

export function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || sessionStorage.getItem(LOADER_SEEN_KEY)) {
      // `enabled` stays false, so the render guard below already returns null.
      return;
    }

    // Client-only render gate. Whether the loader shows at all depends on
    // matchMedia and sessionStorage, neither of which exists during SSR, so
    // the decision cannot be made before hydration. The transition happens
    // once on mount and never again.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cwp-loader-active");

    const startedAt = Date.now();
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let dismissing = false;

    // Idempotent: `load` and the ceiling below race, and whichever loses must
    // not schedule a second pair of timers.
    const finish = () => {
      if (dismissing) return;
      dismissing = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));
      exitTimer = setTimeout(() => setPhase("exit"), wait);
      doneTimer = setTimeout(() => {
        sessionStorage.setItem(LOADER_SEEN_KEY, "1");
        document.documentElement.classList.remove("cwp-loader-active");
        setPhase("done");
      }, wait + EXIT_MS);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const ceilingTimer = setTimeout(finish, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(ceilingTimer);
      if (exitTimer) clearTimeout(exitTimer);
      if (doneTimer) clearTimeout(doneTimer);
      document.documentElement.classList.remove("cwp-loader-active");
    };
  }, []);

  if (!enabled || phase === "done") {
    return null;
  }

  return (
    <div
      className={`cwp-loader ${phase === "exit" ? "cwp-loader--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading CodeWithPurpose"
    >
      <div className="cwp-loader__backdrop" aria-hidden="true" />
      <div className="cwp-loader__grid" aria-hidden="true" />

      <div className="cwp-loader__content">
        <div className="cwp-loader__mark" aria-hidden="true">
          <svg
            className="cwp-loader__svg"
            viewBox="0 0 46 32"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="cwp-loader__bracket cwp-loader__bracket--left"
              d="M10 7 2.5 16 10 25"
              strokeWidth="2.4"
            />
            <path
              className="cwp-loader__bracket cwp-loader__bracket--right"
              d="M36 7l7.5 9L36 25"
              strokeWidth="2.4"
            />
            <path
              className="cwp-loader__heart"
              d="M23 24.5s-7-4.3-7-9.3c0-2.7 2-4.4 4.1-4.4 1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6 2.1 0 4.1 1.7 4.1 4.4 0 5-7 9.3-7 9.3Z"
              strokeWidth="1.8"
            />
          </svg>
          <span className="cwp-loader__glow" aria-hidden="true" />
        </div>

        <p className="cwp-loader__wordmark home-serif">CodeWithPurpose</p>
        <p className="cwp-loader__tagline">Together in Learning, Stronger in Purpose</p>
      </div>
    </div>
  );
}
