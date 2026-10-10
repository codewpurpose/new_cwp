"use client";

import { useEffect, useId, useMemo, useRef, useState, type PointerEvent } from "react";

/**
 * Text gliding along a gentle curve, adapted from React Bits' CurvedLoop
 * (https://reactbits.dev/text-animations/curved-loop).
 *
 * Changes from the original:
 * - Server-rendered and visible: the text sits on the curve from the first
 *   paint, then starts moving once measured. The original hid itself until
 *   JavaScript had measured the text.
 * - The frame loop writes the offset straight to the DOM; the original also
 *   set React state every frame, re-rendering sixty times a second.
 * - Stops when scrolled out of view or the tab is hidden, and never moves
 *   with Reduce Motion on (it can still be dragged).
 * - Sized for a decorative band, not a full-screen section, and hidden from
 *   assistive tech: it repeats facts already on the page.
 */
export default function CurvedLoop({
  text,
  speed = 0.6,
  curveAmount = 140,
  className = "",
}: {
  text: string;
  /** Pixels per frame. */
  speed?: number;
  /** How far the middle of the curve dips, in viewBox units. */
  curveAmount?: number;
  className?: string;
}) {
  const unit = useMemo(() => `${text.trim()} `, [text]);
  const measureRef = useRef<SVGTextElement>(null);
  const pathTextRef = useRef<SVGTextPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [spacing, setSpacing] = useState(0);
  const offset = useRef(0);
  const drag = useRef({ active: false, lastX: 0, velocity: 0 });
  const direction = useRef(-1);
  const id = `curve-${useId().replace(/:/g, "")}`;
  const pathD = `M-100,40 Q720,${40 + curveAmount} 1540,40`;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    };
    measure();
    // The display face may swap in after first paint and change the width.
    void document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    const resizeObserver = wrapRef.current ? new ResizeObserver(measure) : null;
    if (wrapRef.current) resizeObserver?.observe(wrapRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [unit]);

  const repeats = spacing ? Math.ceil(1800 / spacing) + 2 : 4;
  const loopText = Array(repeats).fill(unit).join("");

  const apply = (value: number) => {
    let next = value;
    if (spacing) {
      while (next <= -spacing) next += spacing;
      while (next > 0) next -= spacing;
    }
    offset.current = next;
    pathTextRef.current?.setAttribute("startOffset", `${next}px`);
  };

  useEffect(() => {
    if (!spacing) return;
    let frame: number | null = null;
    let visible = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const step = () => {
      if (!drag.current.active) apply(offset.current + direction.current * speed);
      frame = requestAnimationFrame(step);
    };
    const update = () => {
      const run = visible && document.visibilityState === "visible" && !reduce.matches;
      if (run && frame === null) frame = requestAnimationFrame(step);
      if (!run && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (wrapRef.current) observer.observe(wrapRef.current);
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
      if (frame !== null) cancelAnimationFrame(frame);
    };
    // `apply` only closes over `spacing`, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacing, speed]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, lastX: event.clientX, velocity: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.lastX;
    drag.current.lastX = event.clientX;
    drag.current.velocity = dx;
    apply(offset.current + dx);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (drag.current.velocity !== 0) direction.current = drag.current.velocity > 0 ? 1 : -1;
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <svg viewBox="0 0 1440 200" className="block w-full overflow-visible">
        <text ref={measureRef} className={className} style={{ visibility: "hidden" }} xmlSpace="preserve">
          {unit}
        </text>
        <defs>
          <path id={id} d={pathD} fill="none" />
        </defs>
        <text className={className} xmlSpace="preserve">
          <textPath ref={pathTextRef} href={`#${id}`} startOffset="0px" xmlSpace="preserve">
            {loopText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
