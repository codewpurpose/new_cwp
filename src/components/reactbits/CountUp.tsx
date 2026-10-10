"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Counts a figure up when it scrolls into view, adapted from React Bits'
 * CountUp (https://reactbits.dev/text-animations/count-up).
 *
 * Changes from the original:
 * - The server renders the finished figure, so the number is correct for
 *   search engines, without JavaScript, and if the reader scrolls past
 *   before it starts. The original rendered an empty span.
 * - `prefix` and `suffix` keep marks like "+" and "k" outside the count.
 * - Readers with Reduce Motion on just see the final figure.
 * - The animating digits are hidden from assistive tech and a visually
 *   hidden copy carries the real value, so screen readers don't hear every
 *   intermediate number.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  delay = 0,
  separator = ",",
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  const format = useCallback(
    (value: number) => {
      const formatted = Intl.NumberFormat("en-US", {
        useGrouping: Boolean(separator),
        maximumFractionDigits: 0,
      }).format(Math.round(value));
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator],
  );

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ref.current.textContent = format(from);
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    const timeout = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [isInView, delay, format, from, motionValue, springValue, to]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {prefix}
        <span ref={ref} className="tabular-nums">
          {format(to)}
        </span>
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(to)}
        {suffix}
      </span>
    </span>
  );
}
