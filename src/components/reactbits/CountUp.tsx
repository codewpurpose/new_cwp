"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
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
 * - A timed ease-out instead of the original's spring. The spring was so
 *   overdamped on big figures that it crawled through the last few units for
 *   seconds ("5,994" on a 6,000 stat); a tween lands exactly on `to` after
 *   `delay + duration`, and the last frame writes `to` itself.
 * - The digits drop to `from` while the figure is still below the viewport,
 *   so a reader scrolling down never sees the finished number flick back to
 *   zero as it starts. Only a figure on screen at hydration shows that, the
 *   price of the server rendering the real value.
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
  const isNear = useInView(ref, { once: true, margin: "0px 0px 40% 0px" });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reducedMotion = useReducedMotion();

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
    if (reducedMotion) return;

    const node = ref.current;
    node.textContent = format(from);
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
      onComplete: () => {
        node.textContent = format(to);
      },
    });
    return () => controls.stop();
  }, [isInView, delay, duration, format, from, to, reducedMotion]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {prefix}
        <span ref={ref} className="tabular-nums">
          {(isNear || isInView) && !reducedMotion ? format(from) : format(to)}
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
