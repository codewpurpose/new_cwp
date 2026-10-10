"use client";

import { useEffect, useRef } from "react";
import { readingProgress } from "@/components/learn/reader/events";

/**
 * A thin moss line across the top of the viewport that fills as the reader
 * moves through the chapter.
 *
 * Purely decorative (the "chapter X of Y" label and the table of contents say
 * where you are in words), so it is aria-hidden. The fill is written straight
 * to the node's transform inside one requestAnimationFrame per scroll burst,
 * never through React state, so scrolling never re-renders the lesson.
 */
export function ReadingProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const p = readingProgress();
      fill.style.transform = `scaleX(${p})`;
      fill.dataset.complete = p >= 0.995 ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Lesson widgets can change the page height (tabs, reveal cards), which
    // moves the reader's position without any scroll event.
    const observer = new ResizeObserver(schedule);
    const main = document.querySelector(".learn-main");
    if (main) observer.observe(main);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="lr-progress" aria-hidden="true">
      <div ref={fillRef} className="lr-progress-fill" />
    </div>
  );
}
