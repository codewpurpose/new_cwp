"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Words that brighten and sharpen one after another as the reader scrolls
 * through, adapted from React Bits' ScrollReveal
 * (https://reactbits.dev/text-animations/scroll-reveal).
 *
 * Changes from the original:
 * - Driven by motion's useScroll instead of GSAP ScrollTrigger, so it adds no
 *   dependency and inherits MotionProvider's reduced-motion handling.
 * - The rotation is dropped and the blur is light: the quote it wraps is the
 *   page's emotional centre and has to stay legible mid-reveal.
 * - `rb-anim` lets the <noscript> rule in layout.tsx show it at full
 *   strength when JavaScript never runs.
 * - A `\n` breaks the line from `sm` up, like the headings it replaces.
 * - With Reduce Motion on, the quote is simply shown at full strength. The
 *   switch happens after mount, so server and first client render match.
 */
function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const blur = useTransform(progress, range, ["blur(3px)", "blur(0px)"]);
  // A fresh plain span, so no inline opacity from the motion one lingers.
  if (still) return <span className="inline-block">{word}</span>;
  return (
    <motion.span className="inline-block" style={{ opacity, filter: blur }}>
      {word}
    </motion.span>
  );
}

export default function ScrollReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const lines = text.split("\n");
  const total = text.split(/\s+/).length;
  let index = 0;

  return (
    <span ref={ref} className={`rb-anim ${className}`}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && (
            <>
              {" "}
              <br className="hidden sm:block" />
            </>
          )}
          {line.split(" ").map((word, i, words) => {
            const start = index++ / total;
            return (
              <span key={i}>
                <Word
                  word={word}
                  progress={scrollYProgress}
                  range={[start, Math.min(1, start + 1.5 / total)]}
                  still={still}
                />
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
