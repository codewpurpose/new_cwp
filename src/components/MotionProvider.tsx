"use client";

import { MotionConfig } from "motion/react";

/**
 * Makes the motion library honour prefers-reduced-motion globally.
 *
 * The CSS `@media (prefers-reduced-motion: reduce)` blocks in globals.css only
 * cover CSS keyframes and transitions — they have no effect on JavaScript-driven
 * animation. Without this, every motion component animates at full amplitude for
 * readers who have asked their OS not to, and each one would otherwise need its
 * own useReducedMotion() guard.
 *
 * "user" disables transform and layout animation when the setting is on, while
 * still allowing opacity, so content does not simply pop in.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
