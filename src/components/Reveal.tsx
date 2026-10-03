"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Adds a quiet entrance as a block scrolls into view. Content starts fully
 * readable so it stays usable if client animation never starts.
 *
 * There is deliberately no `useReducedMotion()` branch here. That hook reads a
 * media query, so it returns false during SSR and true on a reader's machine
 * with Reduce Motion on — which made this component render a `motion.div` on
 * the server and a plain `div` on the client. React does not patch attribute
 * mismatches during hydration, so the server's `style="opacity:0"` survived on
 * a node the client no longer animated, and every wrapped block stayed
 * invisible forever. On a lesson page that is the entire body.
 *
 * Reduction is handled one level up instead: MotionProvider's
 * `MotionConfig reducedMotion="user"` drops the transform and keeps the
 * opacity, which is the behaviour that file already documents.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: Math.min(delay, 0.12), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
