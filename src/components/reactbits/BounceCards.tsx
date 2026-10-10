"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * A fanned stack of photos that bounces in and spreads apart on hover, adapted
 * from React Bits' BounceCards (https://reactbits.dev/components/bounce-cards).
 *
 * Changes from the original:
 * - Fluid instead of fixed-pixel. The original takes a container width and
 *   height and a card size in pixels; here the fan fills its parent, each card
 *   is a percentage of that width, and every offset is measured in card widths
 *   (x) or card heights (y) through `translate(%)`, so it fits a phone and a
 *   desktop column alike with no measuring.
 * - Cards are 4:3 rather than square, so less of each photo is cropped away.
 * - The server renders the finished fan. The original starts every card at
 *   `scale(0)` in its class list, which left the photos invisible until
 *   JavaScript ran and forever without it. Here the bounce-in only plays when
 *   the fan mounts below the fold: the cards are gathered while off screen and
 *   spring out once a third of the fan is visible. If it is already on screen
 *   at hydration nothing moves, so a reader never sees the photos jump.
 * - Gentler numbers: smaller pushes, a 1.07 hover scale and a softer bounce.
 * - Touch gets tap-to-peek (tap a card to bring it forward, tap again to put
 *   it back) instead of the original's hover-on-pointerdown, and a vertical
 *   swipe over the fan still scrolls the page.
 * - With Reduce Motion on there is no bounce-in and nothing slides; the card
 *   under the pointer just comes to the front.
 * - Warm paper border and an ink-tinted shadow to match DESIGN.md, and the
 *   click/keyboard "button" mode is gone since these photos don't link
 *   anywhere.
 * - Images keep their alt text and take `loading`, so callers can defer them.
 */

export type BounceCardImage = { src: string; alt: string };

type Slot = { x: number; y: number; rotate: number };
type Body = Slot & { scale: number; vx: number; vy: number; vr: number; vs: number };

// The original's rotation pattern, so neighbouring cards lean different ways.
const PATTERN = [1, 0.5, -0.3, -1, 0.2, 0.75, -0.6, 0.35, -0.85, 0.1];

// One string format for both the server render and every animation frame.
const transformFor = ({ x, y, rotate, scale }: Slot & { scale: number }) =>
  `translate(calc(-50% + ${(x * 100).toFixed(2)}%), calc(-50% + ${(y * 100).toFixed(2)}%)) rotate(${rotate.toFixed(3)}deg) scale(${Math.max(0, scale).toFixed(4)})`;

export default function BounceCards({
  images,
  className = "",
  cardWidth = 40,
  spread = 0.48,
  rotation = 8,
  arc = 0.08,
  stagger = 0.07,
  bounciness = 0.5,
  pushDistance = 0.1,
  hoverScale = 1.07,
  borderColor = "#fcf4e8",
  loading,
}: {
  images: readonly BounceCardImage[];
  /** Sizes the fan box; give it a width and an aspect ratio or height. */
  className?: string;
  /** Card width as a percentage of the container width. */
  cardWidth?: number;
  /** Gap between card centres, in card widths. */
  spread?: number;
  /** Largest lean of a resting card, in degrees. */
  rotation?: number;
  /** How far the outer cards drop below the middle ones, in card heights. */
  arc?: number;
  /** Seconds between each card's bounce-in. */
  stagger?: number;
  /** 0 settles without overshoot, 1 is very springy. */
  bounciness?: number;
  /** How far the other cards slide away from a hovered one, in card widths. */
  pushDistance?: number;
  hoverScale?: number;
  borderColor?: string;
  loading?: "lazy" | "eager";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = images.length;
  const middle = (count - 1) / 2;
  const reach = Math.max(1, middle);
  const slots: Slot[] = images.map((_, i) => {
    const offset = i - middle;
    return {
      x: offset * spread,
      y: arc * (offset / reach) ** 2,
      rotate: rotation * PATTERN[i % PATTERN.length],
    };
  });
  // The animation loop lives in an effect that runs once; it reads the latest
  // props through this ref so a re-render never restarts the bounce.
  const settingsRef = useRef({ slots, stagger, bounciness, pushDistance, hoverScale });
  useEffect(() => {
    settingsRef.current = { slots, stagger, bounciness, pushDistance, hoverScale };
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { hovered: -1, layer: -1, entered: -1, time: 0 };
    let raf = 0;
    let last = performance.now();
    let alive = true;

    // Below the fold at mount: gather the cards into a small pile now, while
    // nobody can see it, and let them bounce out when the fan scrolls in.
    const rect = root.getBoundingClientRect();
    const offscreen = rect.top > window.innerHeight || rect.bottom < 0;
    const intro = offscreen && !reduce;
    const bodies: Body[] = settingsRef.current.slots.map((slot) => ({
      ...(intro ? { x: 0, y: 0.15, rotate: 0, scale: 0.35 } : { ...slot, scale: 1 }),
      vx: 0,
      vy: 0,
      vr: 0,
      vs: 0,
    }));
    if (intro) {
      cardRefs.current.forEach((el, i) => {
        if (el && bodies[i]) el.style.transform = transformFor(bodies[i]);
      });
    } else {
      state.entered = 0;
    }

    const step = (value: number, velocity: number, target: number, k: number, c: number, dt: number) => {
      const next = velocity + ((target - value) * k - velocity * c) * dt;
      return [value + next * dt, next] as const;
    };

    const frame = (now: number) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000));
      last = now;
      state.time += dt;

      const hovered = state.hovered;
      const popK = 170;
      const popC = 2 * (1 - 0.8 * s.bounciness) * Math.sqrt(popK);
      const moveK = 210;
      const moveC = 2 * 0.75 * Math.sqrt(moveK);
      const substeps = Math.ceil(dt / (1 / 240));
      const h = dt / substeps;
      let moving = false;

      s.slots.forEach((slot, i) => {
        const el = cardRefs.current[i];
        const card = bodies[i];
        if (!el || !card) return;
        const appeared = state.entered >= 0 && state.time - state.entered >= i * s.stagger;
        let target: Slot & { scale: number } = appeared
          ? { ...slot, scale: 1 }
          : { x: 0, y: 0.15, rotate: 0, scale: 0.35 };
        if (!reduce && appeared && hovered >= 0) {
          target =
            i === hovered
              ? { x: slot.x, y: slot.y - 0.06, rotate: 0, scale: s.hoverScale }
              : { ...target, x: slot.x + Math.sign(i - hovered) * s.pushDistance };
        }
        if (reduce) {
          Object.assign(card, target);
        } else {
          for (let k = 0; k < substeps; k++) {
            [card.x, card.vx] = step(card.x, card.vx, target.x, moveK, moveC, h);
            [card.y, card.vy] = step(card.y, card.vy, target.y, moveK, moveC, h);
            [card.rotate, card.vr] = step(card.rotate, card.vr, target.rotate, moveK, moveC, h);
            [card.scale, card.vs] = step(card.scale, card.vs, target.scale, popK, popC, h);
          }
        }
        if (
          (state.entered >= 0 && !appeared) ||
          Math.abs(card.vx) + Math.abs(card.vy) + Math.abs(card.vs) > 1e-3 ||
          Math.abs(card.vr) > 0.02 ||
          Math.abs(target.x - card.x) + Math.abs(target.y - card.y) + Math.abs(target.scale - card.scale) > 1e-3 ||
          Math.abs(target.rotate - card.rotate) > 0.02
        ) {
          moving = true;
        }
        el.style.transform = transformFor(card);
      });

      if (state.layer !== hovered) {
        state.layer = hovered;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.zIndex = String(i === hovered ? s.slots.length + 1 : i + 1);
          el.toggleAttribute("data-active", i === hovered);
        });
      }

      if (moving) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Which card is nearest the pointer, along the row of slots.
    const pick = (event: PointerEvent | MouseEvent): number => {
      const s = settingsRef.current;
      const box = root.getBoundingClientRect();
      const cardPx = cardRefs.current[0]?.offsetWidth || 1;
      const px = (event.clientX - box.left - box.width / 2) / cardPx;
      const py = (event.clientY - box.top - box.height / 2) / (cardPx * 0.75);
      let best = -1;
      let distance = Infinity;
      s.slots.forEach((slot, i) => {
        const gap = Math.abs(px - slot.x);
        if (gap < distance) {
          distance = gap;
          best = i;
        }
      });
      if (best < 0 || distance > 0.6 || Math.abs(py - s.slots[best].y) > 0.65) return -1;
      // A little stickiness so the cursor sitting on a seam doesn't flicker.
      if (state.hovered >= 0 && state.hovered !== best) {
        const current = s.slots[state.hovered];
        if (current && Math.abs(px - current.x) - distance < 0.04) return state.hovered;
      }
      return best;
    };

    const setHovered = (next: number) => {
      if (next === state.hovered) return;
      state.hovered = next;
      wake();
    };

    let lastPointer = "mouse";
    const onDown = (event: PointerEvent) => {
      lastPointer = event.pointerType;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setHovered(pick(event));
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "touch") setHovered(-1);
    };
    // `click` only fires for a tap, never for a scroll, so swiping past the fan
    // on a phone leaves it alone.
    const onClick = (event: MouseEvent) => {
      if (lastPointer === "mouse") return;
      const next = pick(event);
      setHovered(next === state.hovered ? -1 : next);
    };

    let observer: IntersectionObserver | null = null;
    if (intro) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          state.entered = state.time;
          wake();
        },
        { threshold: 0.35 },
      );
      observer.observe(root);
    }

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("click", onClick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative touch-pan-y [-webkit-tap-highlight-color:transparent] ${className}`}
      style={
        {
          "--bounce-cards-border-color": borderColor,
        } as CSSProperties
      }
    >
      {images.map((image, i) => (
        <div
          key={image.src}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute top-1/2 left-1/2 aspect-[4/3] overflow-hidden rounded-[14px] border-[5px] border-solid border-[color:var(--bounce-cards-border-color)] bg-[color:var(--bounce-cards-border-color)] shadow-[0_1px_2px_rgba(21,18,12,0.1),0_10px_24px_-8px_rgba(21,18,12,0.3)] transition-shadow duration-300 will-change-transform data-[active]:shadow-[0_2px_4px_rgba(21,18,12,0.12),0_20px_40px_-12px_rgba(21,18,12,0.4)]"
          style={{
            width: `${cardWidth}%`,
            zIndex: i + 1,
            transform: transformFor({ ...slots[i], scale: 1 }),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading={loading}
            decoding="async"
            draggable={false}
            className="pointer-events-none block h-full w-full object-cover select-none"
          />
        </div>
      ))}
    </div>
  );
}
