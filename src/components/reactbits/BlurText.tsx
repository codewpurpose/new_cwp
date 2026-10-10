"use client";

import { motion, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Word-by-word blur-in, adapted from React Bits' BlurText
 * (https://reactbits.dev/text-animations/blur-text).
 *
 * Changes from the original, to fit DESIGN.md's "brief, purposeful" motion:
 * - Renders as any heading tag and keeps normal inline flow instead of
 *   `flex flex-wrap`, so `text-center` and `text-balance` still work.
 * - A `\n` in `text` becomes a line break from `sm` up and a space below it,
 *   matching how the hero headings already handle their `<br>`.
 * - Travel is 10px rather than 50px and the blur is lighter.
 * - The heading carries the full sentence as its accessible name and the word
 *   spans are hidden from assistive tech, so screen readers hear one phrase.
 * - The `rb-anim` class lets the <noscript> rule in layout.tsx show the text
 *   when JavaScript never runs; MotionProvider's `reducedMotion="user"` drops
 *   the movement for readers who have asked for less.
 */
type Tag = "h1" | "h2" | "h3" | "p" | "span";

export default function BlurText({
  text,
  as: Component = "p",
  className = "",
  delay = 70,
  stepDuration = 0.32,
}: {
  text: string;
  as?: Tag;
  className?: string;
  /** Stagger between words, in milliseconds. */
  delay?: number;
  stepDuration?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  // Once every word has landed, clear the leftover `blur(0px)` filter and
  // layer hint: a no-op filter still forces each word onto its own layer.
  const [settled, setSettled] = useState(false);
  const wordCount = text.split(/\s+/).length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const total = (wordCount - 1) * delay + stepDuration * 2000 + 50;
    const timeout = setTimeout(() => setSettled(true), total);
    return () => clearTimeout(timeout);
  }, [inView, wordCount, delay, stepDuration]);

  const from = { filter: "blur(8px)", opacity: 0, y: 10 };
  const to = {
    filter: ["blur(8px)", "blur(3px)", "blur(0px)"],
    opacity: [0, 0.6, 1],
    y: [10, -2, 0],
  };

  const lines = text.split("\n");
  let wordIndex = 0;

  return (
    <Component
      ref={ref as never}
      className={`rb-anim ${className}`}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} aria-hidden="true">
          {lineIndex > 0 && (
            <>
              {" "}
              <br className="hidden sm:block" />
            </>
          )}
          {line.split(" ").map((word, i, words) => {
            const transition: Transition = {
              duration: stepDuration * 2,
              times: [0, 0.5, 1],
              delay: (wordIndex++ * delay) / 1000,
              ease: [0.22, 1, 0.36, 1],
            };
            return (
              <span key={i}>
                <motion.span
                  className={`inline-block ${settled ? "[filter:none!important]" : "will-change-[transform,filter,opacity]"}`}
                  initial={from}
                  animate={inView ? to : from}
                  transition={transition}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
