"use client";

import { useEffect, useRef, useState } from "react";

/** Reads the header height token so rootMargin can be an absolute px string. */
function headerHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--learn-header-h");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 66;
}

/**
 * Tracks which heading the reader is currently under.
 *
 * `rootMargin` cannot contain calc() or var(), so the header height has to be
 * read out of the custom property in JS rather than expressed in CSS.
 */
export interface ScrollSpy {
  activeId: string | null;
  /** Call before a programmatic scroll so the tracker stops fighting it. */
  beginProgrammaticScroll: (id: string) => void;
}

export function useScrollSpy(ids: readonly string[]): ScrollSpy {
  const [activeId, setActiveId] = useState<string | null>(null);
  /** Set while a click-driven smooth scroll is in flight, so the observer does
   *  not strobe the highlight through every intervening section. */
  const suppressed = useRef(false);
  const key = ids.join("|");

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const offset = headerHeight();

    const pick = () => {
      if (suppressed.current) return;

      // At the very bottom, force the last heading — a short final section can
      // never win the reading band on its own.
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      const band = offset + 8;
      let current: string | null = null;

      for (const element of elements) {
        const { top } = element.getBoundingClientRect();
        // The last heading whose top has passed the band is the section we are
        // inside. Falling back to elements[0] instead — as the older vanilla
        // implementation did — snaps the highlight to the top of the page
        // whenever you are midway through a long section.
        if (top <= band) current = element.id;
      }

      if (current === null) current = elements[0].id;
      setActiveId(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);

    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [key, ids]);

  const beginProgrammaticScroll = (id: string) => {
    suppressed.current = true;
    setActiveId(id);

    const release = () => {
      suppressed.current = false;
      window.removeEventListener("scrollend", release);
    };

    window.addEventListener("scrollend", release);
    // Safari has no scrollend event, so time out as well.
    window.setTimeout(release, 700);
  };

  // Derived rather than cleared in an effect: with no headings there is nothing
  // to be active, and deriving it avoids a redundant render pass.
  return { activeId: ids.length === 0 ? null : activeId, beginProgrammaticScroll };
}
