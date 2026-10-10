"use client";

import { useRef, type ReactNode } from "react";

/**
 * A soft band of light that sweeps across a panel on hover, adapted from
 * React Bits' GlareHover (https://reactbits.dev/animations/glare-hover).
 *
 * Changes from the original:
 * - No fixed width, height, background or border: the caller's classes lay
 *   the panel out, so it can stand in for an existing grid cell unchanged.
 * - The sweep is a leaf-green tint by default; white glare vanishes on sand.
 * - Keyboard focus inside the panel plays it too, not only the mouse.
 * - With Reduce Motion on the band is never moved.
 */
export default function GlareHover({
  children,
  className = "",
  glareColor = "219, 239, 219",
  glareOpacity = 0.75,
  glareAngle = -45,
  glareSize = 250,
  duration = 700,
}: {
  children: ReactNode;
  className?: string;
  /** "r, g, b" so the opacity can be applied separately. */
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  duration?: number;
}) {
  const overlay = useRef<HTMLSpanElement>(null);

  const sweep = (to: string) => {
    const el = overlay.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transition = `background-position ${duration}ms ease`;
    el.style.backgroundPosition = to;
  };
  const enter = () => sweep("100% 100%");
  const leave = () => sweep("-100% -100%");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") enter();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") leave();
      }}
      onFocus={enter}
      onBlur={leave}
    >
      {children}
      <span
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(${glareAngle}deg, transparent 60%, rgba(${glareColor}, ${glareOpacity}) 70%, transparent 100%)`,
          backgroundSize: `${glareSize}% ${glareSize}%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-100% -100%",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
