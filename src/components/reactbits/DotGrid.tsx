"use client";

import { useEffect, useRef } from "react";

/**
 * A field of dots that warms to leaf green and drifts aside as the pointer
 * passes, adapted from React Bits' DotGrid
 * (https://reactbits.dev/backgrounds/dot-grid).
 *
 * Changes from the original:
 * - Plain spring physics instead of GSAP's InertiaPlugin, so it adds no
 *   dependency. Clicks send a soft ripple outward, as the original's shock
 *   wave did, but gentler.
 * - Palette defaults are the site's sand and leaf green, faded out toward
 *   the edges so the hero copy above it keeps its contrast.
 * - The frame loop only runs while something is moving, the section is on
 *   screen and the tab is visible. Idle, it costs nothing.
 * - Touch and Reduce Motion get the same dots, drawn once and left still.
 * - Purely decorative: aria-hidden, no pointer capture, sits behind content.
 */
interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  heat: number;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export default function DotGrid({
  gap = 30,
  dotSize = 3,
  baseColor = "#dccaa8",
  activeColor = "#3e7f5c",
  proximity = 130,
  className = "",
}: {
  gap?: number;
  dotSize?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const base = hexToRgb(baseColor);
    const active = hexToRgb(activeColor);
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame: number | null = null;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    let pointerAt = 0;

    const layout = () => {
      const rect = host.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * gap;
          const y = offsetY + r * gap;
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, heat: 0 });
        }
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const reach = Math.hypot(cx, cy);
      for (const d of dots) {
        // Fade toward the edges so the field reads as texture, not a frame.
        const edge = 1 - Math.min(1, Math.hypot(d.ox - cx, d.oy - cy) / reach);
        const alpha = 0.25 + 0.75 * edge;
        const r = base[0] + (active[0] - base[0]) * d.heat;
        const g = base[1] + (active[1] - base[1]) * d.heat;
        const b = base[2] + (active[2] - base[2]) * d.heat;
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.min(1, alpha + d.heat)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotSize / 2 + d.heat * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      let moving = false;
      for (const d of dots) {
        const dx = d.ox - pointer.x;
        const dy = d.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        const pointerIsRecent = performance.now() - pointerAt < 100;
        const target = pointerIsRecent && dist < proximity ? 1 - dist / proximity : 0;
        d.heat += (target - d.heat) * 0.18;
        if (target > 0) {
          const push = target * target * 2.2;
          d.vx += (dx / (dist || 1)) * push;
          d.vy += (dy / (dist || 1)) * push;
        }
        // Spring home with damping.
        d.vx += (d.ox - d.x) * 0.08;
        d.vy += (d.oy - d.y) * 0.08;
        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.heat - target) > 0.004 || Math.abs(d.vx) + Math.abs(d.vy) > 0.02 || Math.abs(d.x - d.ox) > 0.1) {
          moving = true;
        }
      }
      draw();
      frame = moving && visible ? requestAnimationFrame(tick) : null;
    };
    const wake = () => {
      if (frame === null && visible && !still) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointerAt = performance.now();
      wake();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      wake();
    };
    const onDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      pointerAt = performance.now();
      for (const d of dots) {
        const dx = d.ox - px;
        const dy = d.oy - py;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const kick = (1 - dist / 220) * 9;
          d.vx += (dx / (dist || 1)) * kick;
          d.vy += (dy / (dist || 1)) * kick;
        }
      }
      wake();
    };

    const resize = new ResizeObserver(layout);
    resize.observe(host);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible";
      if (visible) wake();
    });
    seen.observe(host);
    layout();

    if (!still) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown, { passive: true });
    }
    return () => {
      resize.disconnect();
      seen.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [gap, dotSize, baseColor, activeColor, proximity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
