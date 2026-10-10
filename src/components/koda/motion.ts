"use client";

import { useEffect, type RefObject } from "react";

/**
 * Shared helpers for Koda's motion.
 *
 * Reduced motion is read at the moment something would animate (in an event
 * handler or a timer), never during render. Branching the rendered markup on
 * the media query is what broke hydration in Reveal.tsx: the server cannot
 * know the answer, so the two renders disagreed. Here the markup is identical
 * everywhere and only the side effects change.
 */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Pauses an element's CSS idle loop while it is off screen or the tab is
 * hidden, by toggling `data-paused` directly on the node (no re-render). The
 * CSS pairs it with `animation-play-state: paused`.
 */
export function useIdlePause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let onScreen = true;
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") delete node.dataset.paused;
      else node.dataset.paused = "true";
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);
}
