"use client";

import { useAnimate, useMotionValue } from "motion/react";
import { useCallback } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * Koda's physical reactions, shared by the hero and the corner mascot.
 *
 * - `squash()` is a cartoon squash-and-stretch: Koda squishes down, springs up
 *   into the new pose and settles. Applied to the element holding `scope`,
 *   whose transform-origin is its bottom edge so his feet stay planted.
 * - `hop()` is a small jump on hover, driven through `hopY` so it composes with
 *   the squash instead of fighting over the same transform.
 *
 * Both are skipped outright with Reduce Motion on; pose changes are then
 * instant. MotionProvider would also drop the transforms, but skipping here
 * means no animation is scheduled at all.
 */
export function useKodaBody() {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const hopY = useMotionValue(0);

  const squash = useCallback(() => {
    if (prefersReducedMotion() || !scope.current) return;
    animate(
      scope.current,
      {
        scaleX: [1, 1.14, 0.93, 1.03, 1],
        scaleY: [1, 0.84, 1.1, 0.98, 1],
        y: [0, 3, -14, 0, 0],
      },
      { duration: 0.6, times: [0, 0.18, 0.45, 0.75, 1], ease: "easeOut" },
    );
  }, [animate, scope]);

  const hop = useCallback(
    (height = 9) => {
      if (prefersReducedMotion()) return;
      animate(hopY, [0, -height, 0], { duration: 0.42, ease: [0.33, 1, 0.68, 1] });
    },
    [animate, hopY],
  );

  /** A happy little wiggle, for saying hello again. */
  const wiggle = useCallback(() => {
    if (prefersReducedMotion() || !scope.current) return;
    animate(scope.current, { rotate: [0, -7, 6, -4, 0] }, { duration: 0.7, ease: "easeInOut" });
  }, [animate, scope]);

  return { scope, hopY, squash, hop, wiggle };
}
