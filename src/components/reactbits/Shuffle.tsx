"use client";

import { useEffect, useRef } from "react";

/**
 * Letters that tumble through random glyphs and land one after another, the
 * idea of React Bits' Shuffle (https://reactbits.dev/text-animations/shuffle)
 * rebuilt on a plain animation-frame loop.
 *
 * Changes from the original:
 * - No GSAP or SplitText: the scramble writes `textContent` on one span per
 *   animation frame, so it adds no dependency and never re-renders React.
 * - The server (and a reader without JavaScript) gets the finished text. The
 *   scramble only plays after mount, once, when the text is on screen.
 * - Screen readers read a visually hidden copy of the real text; the
 *   scrambling span is aria-hidden, so nobody hears the noise.
 * - Glyphs are drawn from the text's own character class (digits shuffle
 *   through digits), and spaces stay put, so the width barely moves when the
 *   caller uses a monospaced face.
 * - With Reduce Motion on it does nothing at all.
 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

function glyphFor(char: string, seed: number) {
  if (/\s/.test(char)) return char;
  const pool = /\d/.test(char) ? DIGITS : /[a-z]/.test(char) ? LETTERS.toLowerCase() : LETTERS;
  return pool[Math.floor(seed * pool.length) % pool.length];
}

export default function Shuffle({
  text,
  className = "",
  duration = 900,
  delay = 150,
}: {
  text: string;
  className?: string;
  /** Total time until the last letter lands, in milliseconds. */
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.textContent = text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = Array.from(text);
    let raf = 0;
    let start = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      let out = "";
      chars.forEach((char, i) => {
        // Each letter lands at its own moment, left to right.
        const landsAt = (duration * (i + 1)) / chars.length;
        out += t >= landsAt ? char : glyphFor(char, Math.random());
      });
      node.textContent = out;
      if (t < duration) raf = requestAnimationFrame(frame);
      else node.textContent = text;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = setTimeout(() => {
        raf = requestAnimationFrame(frame);
      }, delay);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, duration, delay]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
