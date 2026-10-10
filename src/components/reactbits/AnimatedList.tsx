"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * A list row that pops in as it scrolls into view and glides to its new place
 * when the order changes, adapted from React Bits' AnimatedList
 * (https://reactbits.dev/components/animated-list).
 *
 * Changes from the original:
 * - Only the row (AnimatedItem) is kept, rendered as an `<li>` so the caller's
 *   `<ol>` keeps its ranking semantics. The scroll box, gradients, selection
 *   state and arrow-key navigation are dropped: these rows already hold their
 *   own buttons and links, and a second keyboard model would fight them.
 * - Rows animate in once instead of every time they re-enter the viewport,
 *   and start at 0.94 scale rather than 0.7, so a long board settles quickly.
 * - `layout` is added, so a re-ranked row slides to its new position.
 * - Stagger is capped, so row 40 doesn't wait two seconds to appear.
 * - `rb-anim` lets the <noscript> rule in layout.tsx show rows at full
 *   strength; MotionProvider's `reducedMotion="user"` drops the scale and
 *   layout movement for readers who asked for less, keeping a short fade.
 *
 * Only use it for lists that are rendered on the client (fetched rows): the
 * starting frame is transparent.
 */
export function AnimatedListItem({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.li
      layout="position"
      className={`rb-anim ${className}`}
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.32,
        delay: Math.min(index, 10) * 0.045,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: "spring", stiffness: 420, damping: 38 },
      }}
    >
      {children}
    </motion.li>
  );
}
