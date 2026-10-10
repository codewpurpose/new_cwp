"use client";

import { prefersReducedMotion } from "@/components/koda/motion";

/**
 * A one-shot confetti burst for the chapter-complete moment, in the spirit of
 * React Bits' ClickSpark (https://reactbits.dev/animations/click-spark),
 * stretched from lines into falling paper.
 *
 * Changes from the original idea:
 * - Imperative and one-shot: a canvas is created on demand, animates for about
 *   1.8 seconds and removes itself, so nothing sits in the tree or loops while
 *   the reader is reading.
 * - Colours come from the site palette (moss, fern, pistachio, sand, Koda's
 *   pink and a warm ochre), not a rainbow.
 * - Canvas is sized for the device pixel ratio and never takes pointer events.
 * - Nothing is drawn with Reduce Motion on.
 */
const COLORS = ["#1e3c2c", "#3e7f5c", "#dbefdb", "#e8ddcd", "#eb9aab", "#d9a441"];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
}

export function fireConfetti(origin?: { x: number; y: number }) {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = document.createElement("canvas");
  canvas.className = "lr-confetti";
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const ox = origin?.x ?? width / 2;
  const oy = origin?.y ?? height * 0.6;
  const count = width < 640 ? 70 : 110;
  const pieces: Piece[] = Array.from({ length: count }, (_, i) => {
    // A fan pointing upward, a little wider than a quarter turn.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
    const speed = 7 + Math.random() * 9;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 6 + Math.random() * 6,
      h: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: COLORS[i % COLORS.length],
    };
  });

  const duration = 1800;
  const start = performance.now();
  let last = start;

  const step = (now: number) => {
    const dt = Math.min(2, (now - last) / 16.67);
    last = now;
    const t = (now - start) / duration;
    ctx.clearRect(0, 0, width, height);
    // Fade out over the last third so pieces never vanish mid-air.
    ctx.globalAlpha = t < 0.66 ? 1 : Math.max(0, 1 - (t - 0.66) / 0.34);
    for (const p of pieces) {
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.32 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      // Squash the width with the spin so the paper seems to flip.
      ctx.scale(Math.cos(p.rot * 2), 1);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t < 1) requestAnimationFrame(step);
    else canvas.remove();
  };
  requestAnimationFrame(step);
}
