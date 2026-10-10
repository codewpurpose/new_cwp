"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * A thin leaf-green bar along the top of the window that fills as the reader
 * moves through the post (the element with `targetId`), not the whole page,
 * so it reads "done" at the last paragraph rather than after the footer.
 *
 * Decorative and aria-hidden: it starts empty, and without JavaScript it simply
 * never appears to fill, which loses nothing. It follows the reader's own
 * scrolling, so it is not motion in the Reduce Motion sense, but the spring is
 * stiff enough that it never lags behind or overshoots noticeably.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = target.getBoundingClientRect();
      // 0 as the first paragraph rises into view, 1 once the last one has
      // passed 40% of the way up the screen. Proportional all the way, so a
      // short post doesn't read "done" before its second paragraph.
      const vh = window.innerHeight;
      const read = (vh - rect.top) / Math.max(rect.height + vh * 0.6, 1);
      progress.set(Math.min(1, Math.max(0, read)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId, progress]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#3e7f5c]"
      style={{ scaleX: reducedMotion ? progress : scaleX }}
    />
  );
}
