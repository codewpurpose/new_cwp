"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * Koda's speech, typed out a letter at a time — the idea of React Bits'
 * TextType (https://reactbits.dev/text-animations/text-type), rebuilt on a
 * plain timer.
 *
 * - The whole line is always in the DOM. Untyped letters are kept in place with
 *   `visibility: hidden`, so the line's box is its final size from the first
 *   frame: no reflow, no bubble growing as it types, no centred text drifting.
 * - Screen readers get the full line once, from a visually hidden copy. The
 *   typed letters are aria-hidden, so the live region never chatters per
 *   character.
 * - The server (and a reader without JavaScript) sees the full line. Typing
 *   only starts when the line changes, or on mount when `animateOnMount` is set
 *   for something that is client-only anyway.
 * - Reduced motion shows each new line at once.
 */
export function TypeLine({
  text,
  animateOnMount = false,
  speed = 22,
  live = true,
  srPrefix = "",
}: {
  text: string;
  animateOnMount?: boolean;
  /** Milliseconds per character. Punctuation holds a little longer. */
  speed?: number;
  /** Mark the screen reader copy as a polite live region. */
  live?: boolean;
  /** Read before the line by screen readers only, e.g. the speaker's name. */
  srPrefix?: string;
}) {
  const chars = Array.from(text);
  const [state, setState] = useState(() => ({
    text,
    shown: animateOnMount && !prefersReducedMotion() ? 0 : chars.length,
  }));

  // A new line restarts the typing. Adjusting state during render (rather than
  // in an effect) is React's documented pattern for "reset when a prop changes"
  // and avoids painting one frame of the full new line first.
  let shown = state.shown;
  if (state.text !== text) {
    shown = prefersReducedMotion() ? chars.length : 0;
    setState({ text, shown });
  }

  const total = chars.length;
  const previous = chars[shown - 1] ?? "";
  useEffect(() => {
    if (shown >= total) return;
    const pause = /[.,!?…—]/.test(previous) ? speed * 6 : speed;
    const timer = setTimeout(() => {
      setState((s) => (s.text === text ? { ...s, shown: s.shown + 1 } : s));
    }, pause);
    return () => clearTimeout(timer);
  }, [shown, total, previous, speed, text]);

  const typing = shown < total;

  return (
    <span className="koda-type">
      <span className="sr-only" {...(live ? { role: "status", "aria-live": "polite" as const } : {})}>
        {srPrefix}
        {text}
      </span>
      <span aria-hidden="true">
        {chars.slice(0, shown).join("")}
        {/* The caret is a pseudo-element on the hidden remainder, so it adds
            no box of its own and cannot change where the line wraps. */}
        {typing && <span className="koda-type-rest">{chars.slice(shown).join("")}</span>}
      </span>
    </span>
  );
}
