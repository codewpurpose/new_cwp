"use client";

import { motion, useSpring, type SpringOptions } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * A gentle 3D tilt toward the pointer, adapted from React Bits' TiltedCard
 * (https://reactbits.dev/components/tilted-card).
 *
 * Changes from the original:
 * - Wraps `children` instead of drawing its own <img>, so the page hero keeps
 *   `next/image` with `priority` (it is the LCP element) and its own sizing.
 * - The cursor-following caption tooltip and the "not optimized for mobile"
 *   notice are gone; the hero has no caption and works fine on phones.
 * - Much quieter defaults: about 5° of tilt and a 1.02 scale, not 14° and 1.1.
 * - Only reacts to a mouse or pen on a device that hovers, and not at all with
 *   Reduce Motion on, so a tap on a phone never jolts the picture. Nothing
 *   about the rendered markup depends on that check (see Reveal.tsx for why),
 *   and the resting state is simply untilted, so the server render, the
 *   no-JavaScript page and the first paint all look the same.
 * - Pointer events replace mouse events, and the last-position state that drove
 *   the tooltip is gone, so moving the cursor no longer re-renders React.
 */
const spring: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 5,
  scaleOnHover = 1.02,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees at the card's edge. */
  rotateAmplitude?: number;
  scaleOnHover?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Decided once on mount; read inside the handlers rather than used to pick
  // different markup, so hydration always matches the server.
  const enabled = useRef(false);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const wasEnabled = enabled.current;
      enabled.current = hover.matches && !reduce.matches;
      if (wasEnabled && !enabled.current) {
        rotateX.jump(0);
        rotateY.jump(0);
        scale.jump(1);
      }
    };
    update();
    hover.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [rotateX, rotateY, scale]);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled.current || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    scale.set(scaleOnHover);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <div
      ref={ref}
      className={`[perspective:900px] ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
