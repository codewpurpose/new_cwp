"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A gentle pull toward the pointer, adapted from React Bits' Magnet
 * (https://reactbits.dev/animations/magnet).
 *
 * Changes from the original:
 * - Only listens on devices with a fine pointer that hover, and not at all
 *   with Reduce Motion on; a phone tap would otherwise jolt the button.
 * - Defaults are much quieter (a few pixels of travel, not half the gap).
 * - The pointer listener is passive and stops updating state once the
 *   button has settled back, so idle pages don't re-render on every move.
 */
export default function Magnet({
  children,
  padding = 60,
  strength = 6,
  className = "",
}: {
  children: ReactNode;
  /** How far outside the element the pull starts, in pixels. */
  padding?: number;
  /** Higher is weaker: the offset is the pointer distance divided by this. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resetWhenDisabled = () => {
      if (!canHover.matches || reduce.matches) {
        setOffset((prev) => prev.active ? { x: 0, y: 0, active: false } : prev);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !canHover.matches || reduce.matches) return;
      const node = ref.current;
      if (!node) return;
      const { left, top, width, height } = node.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const near =
        Math.abs(cx - event.clientX) < width / 2 + padding &&
        Math.abs(cy - event.clientY) < height / 2 + padding;
      setOffset((prev) => {
        if (near) {
          return { x: (event.clientX - cx) / strength, y: (event.clientY - cy) / strength, active: true };
        }
        return prev.active ? { x: 0, y: 0, active: false } : prev;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    canHover.addEventListener("change", resetWhenDisabled);
    reduce.addEventListener("change", resetWhenDisabled);
    return () => {
      window.removeEventListener("pointermove", onMove);
      canHover.removeEventListener("change", resetWhenDisabled);
      reduce.removeEventListener("change", resetWhenDisabled);
    };
  }, [padding, strength]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span
        className="inline-block will-change-transform"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.active ? "transform 0.25s ease-out" : "transform 0.5s ease-in-out",
        }}
      >
        {children}
      </span>
    </span>
  );
}
