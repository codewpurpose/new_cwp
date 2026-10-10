"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/components/koda/motion";

/**
 * The motion engine behind every drawn illustration on the site.
 *
 * The server renders each drawing finished, and that finished markup is what
 * a reader without JavaScript, or with Reduce Motion on, keeps. Nothing here
 * changes the rendered markup; it only adds side effects after mount:
 *
 * 1. Draw-on. When a drawing enters view, every stroke in its `.art-scene` is measured with getTotalLength() and
 *    given a paused Web Animation that dashes it out of sight (`fill:
 *    "backwards"` holds that first frame). When the drawing scrolls into view
 *    the animations play: strokes draw in back to front, then fills and text
 *    fade up. Once they finish the animations end and the element's own
 *    attributes take over again, so the result is exactly the server markup.
 *    Measurement is deferred until the shared observer says the drawing is
 *    entering view.
 * 2. Idle loops. The CSS loops in globals.css (`.art-loop` and friends) run
 *    only under `prefers-reduced-motion: no-preference`. This hook sets
 *    `data-paused` on the svg while it is off screen or the tab is hidden,
 *    which pauses them.
 *
 * Reduced motion is read when the effect runs, never during render, for the
 * hydration reason recorded in Reveal.tsx.
 */

const SHAPES = "path, circle, rect, line, polyline, polygon, ellipse, text";
const SKIP = "defs, clipPath, marker, mask, pattern, [data-art-still]";

const DRAW_MS = 820;
const FADE_MS = 420;
const SPREAD_MS = 900;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// Share viewport and tab visibility subscriptions across all inline artwork.
const artSubscribers = new Map<Element, (visible: boolean) => void>();
const visibilitySubscribers = new Set<() => void>();
let artObserver: IntersectionObserver | null = null;
let visibilityListening = false;

function observeArt(svg: SVGSVGElement, callback: (visible: boolean) => void) {
  if (!artObserver) {
    artObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => artSubscribers.get(entry.target)?.(entry.isIntersecting)),
      { threshold: 0.01, rootMargin: "0px 0px -6% 0px" },
    );
  }
  artSubscribers.set(svg, callback);
  artObserver.observe(svg);
  return () => {
    artSubscribers.delete(svg);
    artObserver?.unobserve(svg);
  };
}

function onDocumentVisibilityChange() {
  visibilitySubscribers.forEach((callback) => callback());
}

function subscribeDocumentVisibility(callback: () => void) {
  visibilitySubscribers.add(callback);
  if (!visibilityListening) {
    document.addEventListener("visibilitychange", onDocumentVisibilityChange);
    visibilityListening = true;
  }
  return () => {
    visibilitySubscribers.delete(callback);
    if (visibilitySubscribers.size === 0 && visibilityListening) {
      document.removeEventListener("visibilitychange", onDocumentVisibilityChange);
      visibilityListening = false;
    }
  };
}

function buildDrawOn(svg: SVGSVGElement) {
  const scene = svg.querySelector(".art-scene");
  if (!scene) return [];
  const shapes = Array.from(scene.querySelectorAll<SVGGraphicsElement>(SHAPES)).filter(
    (el) => !el.closest(SKIP)
  );
  const count = shapes.length;
  const animations: Animation[] = [];

  shapes.forEach((el, index) => {
    const delay = count > 1 ? (index / (count - 1)) * SPREAD_MS : 0;
    const style = getComputedStyle(el);
    const opacity = style.opacity || "1";
    const fillOpacity = style.fillOpacity || "1";
    const stroked =
      style.stroke !== "none" &&
      parseFloat(style.strokeWidth) > 0 &&
      style.strokeDasharray === "none" &&
      el.tagName !== "text";

    let length = 0;
    if (stroked && "getTotalLength" in el) {
      try {
        length = (el as unknown as SVGGeometryElement).getTotalLength();
      } catch {
        length = 0;
      }
    }

    if (length > 0.5) {
      const dash = `${length} ${length}`;
      animations.push(
        el.animate(
          [
            { strokeDasharray: dash, strokeDashoffset: `${length}`, fillOpacity: 0 },
            { strokeDasharray: dash, strokeDashoffset: "0", fillOpacity: 0, offset: 0.62 },
            { strokeDasharray: dash, strokeDashoffset: "0", fillOpacity },
          ],
          { duration: DRAW_MS + 260, delay, easing: EASE, fill: "backwards" }
        )
      );
    } else {
      animations.push(
        el.animate([{ opacity: 0 }, { opacity }], {
          duration: FADE_MS,
          delay: delay + DRAW_MS * 0.45,
          easing: "ease-out",
          fill: "backwards",
        })
      );
    }
  });

  animations.forEach((animation) => animation.pause());
  return animations;
}

export function useArtMotion(ref: RefObject<SVGSVGElement | null>, { draw = true } = {}) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    // Pause the CSS loops while off screen or in a hidden tab.
    let onScreen = false;
    let didDraw = false;
    let animations: Animation[] = [];
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") delete svg.dataset.paused;
      else svg.dataset.paused = "true";
    };
    const unsubscribeObserver = observeArt(svg, (visible) => {
      onScreen = visible;
      sync();
      if (visible && !didDraw && draw && !prefersReducedMotion() && typeof svg.animate === "function") {
        didDraw = true;
        animations = buildDrawOn(svg);
        animations.forEach((animation) => animation.play());
      }
    });
    const unsubscribeVisibility = subscribeDocumentVisibility(sync);

    return () => {
      unsubscribeObserver();
      unsubscribeVisibility();
      animations.forEach((animation) => animation.cancel());
    };
  }, [ref, draw]);
}
