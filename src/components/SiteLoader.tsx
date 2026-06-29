"use client";

import { useEffect, useState } from "react";

const LOADER_SEEN_KEY = "cwp-loader-seen";
const MIN_VISIBLE_MS = 1900;
const EXIT_MS = 650;

type LoaderPhase = "loading" | "exit" | "done";

export function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || sessionStorage.getItem(LOADER_SEEN_KEY)) {
      setPhase("done");
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("cwp-loader-active");

    const startedAt = Date.now();
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
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

    return () => {
      window.removeEventListener("load", finish);
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
