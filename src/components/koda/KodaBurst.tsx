"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * A tiny, pose-themed burst when Koda changes pose: hearts for the heart pose,
 * drifting z's for the nap, sparkles for the wave, code glyphs for reading and
 * leaves for the tree poses, and question marks when he's puzzled (the 404
 * page). Five or six particles, gone in about a second,
 * purely decorative (aria-hidden, pointer-events: none) and never fired with
 * Reduce Motion on.
 */
export type BurstKind = "sparkle" | "heart" | "code" | "zzz" | "leaf" | "question";

interface Burst {
  id: number;
  kind: BurstKind;
}

const LEAF = "#3e7f5c";
const MOSS = "#1e3c2c";
const PINK = "#eb9aab";
const PINK_SOFT = "#f4bcc7";

/** Deterministic jitter so particles vary without Math.random in render. */
function jitter(seed: number, i: number) {
  return Math.abs(Math.sin(seed * 9.17 + i * 12.9898) * 43758.5453) % 1;
}

export function useKodaBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const fire = useCallback((kind: BurstKind) => {
    if (prefersReducedMotion()) return;
    nextId.current += 1;
    const id = nextId.current;
    // Keep at most a couple alive so rapid tapping never piles up.
    setBursts((list) => [...list.slice(-1), { id, kind }]);
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setBursts((list) => list.filter((b) => b.id !== id));
    }, 1900);
    timers.current.add(timer);
  }, []);

  return { bursts, fire };
}

function Heart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill={color} aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 5.4 3.1C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill={color} aria-hidden="true">
      <path d="M12 0c.7 6.2 5.8 11.3 12 12-6.2.7-11.3 5.8-12 12-.7-6.2-5.8-11.3-12-12C6.2 11.3 11.3 6.2 12 0z" />
    </svg>
  );
}

function Leaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path d="M4 20C4 10 10 4 21 3c-1 11-7 17-17 17z" fill={color} />
      <path d="M5 19 15 9" stroke="#fffbf5" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

interface Particle {
  content: ReactNode;
  size: number;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
  className?: string;
}

const GLYPHS = ["</>", "{ }", "( )", "=>", ";"];

function particlesFor(kind: BurstKind, seed: number, spread: number): Particle[] {
  const r = (i: number) => jitter(seed, i);
  switch (kind) {
    case "heart":
      return [0, 1, 2, 3, 4].map((i) => ({
        content: <Heart color={[PINK, LEAF, PINK_SOFT][i % 3]} />,
        size: 12 + r(i) * 8,
        x: ((i - 2) * 20 + (r(i + 7) - 0.5) * 12) * spread,
        y: -(58 + r(i + 3) * 36) * spread,
        rotate: (r(i + 5) - 0.5) * 40,
        delay: i * 0.05,
        duration: 1.25,
      }));
    case "zzz":
      return [0, 1, 2].map((i) => ({
        content: "z",
        size: 13 + i * 5,
        x: (16 + i * 16) * spread,
        y: -(26 + i * 24) * spread,
        rotate: -12 + i * 6,
        delay: i * 0.28,
        duration: 1.3,
        className: "koda-burst-z",
      }));
    case "code":
      return [0, 1, 2, 3].map((i) => {
        const angle = (-150 + i * 40 + (r(i) - 0.5) * 18) * (Math.PI / 180);
        const distance = (62 + r(i + 4) * 22) * spread;
        return {
          content: GLYPHS[(seed + i) % GLYPHS.length],
          size: 12 + r(i + 2) * 3,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: (r(i + 9) - 0.5) * 30,
          delay: i * 0.06,
          duration: 1.15,
          className: "koda-burst-code",
        };
      });
    case "question":
      return [0, 1, 2].map((i) => ({
        content: "?",
        size: 16 + r(i) * 8,
        x: ((i - 1) * 30 + (r(i + 2) - 0.5) * 10) * spread,
        y: -(48 + r(i + 5) * 30) * spread,
        rotate: (i - 1) * 18,
        delay: i * 0.12,
        duration: 1.2,
        className: "koda-burst-code",
      }));
    case "leaf":
      return [0, 1, 2, 3, 4].map((i) => ({
        content: <Leaf color={i % 2 ? LEAF : "#6d9b7f"} />,
        size: 11 + r(i) * 7,
        x: ((i - 2) * 26 + (r(i + 3) - 0.5) * 14) * spread,
        y: (18 + r(i + 6) * 34) * spread,
        rotate: 120 + r(i + 1) * 160,
        delay: i * 0.05,
        duration: 1.3,
      }));
    case "sparkle":
    default:
      return [0, 1, 2, 3, 4, 5].map((i) => {
        const angle = ((i / 6) * 360 - 90 + (r(i) - 0.5) * 30) * (Math.PI / 180);
        const distance = (48 + r(i + 4) * 22) * spread;
        return {
          content: <Sparkle color={[LEAF, PINK, MOSS][i % 3]} />,
          size: 9 + r(i + 2) * 7,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: 90,
          delay: i * 0.02,
          duration: 0.8,
        };
      });
  }
}

/** Where each kind starts, as a percentage of the art box. */
const ORIGIN: Record<BurstKind, [number, number]> = {
  sparkle: [50, 34],
  heart: [50, 38],
  code: [50, 36],
  zzz: [58, 46],
  leaf: [50, 22],
  question: [56, 20],
};

export function KodaBurstLayer({ bursts, spread = 1 }: { bursts: Burst[]; spread?: number }) {
  return (
    <span className="koda-burst-layer" aria-hidden="true">
      {bursts.map((burst) => {
        const [left, top] = ORIGIN[burst.kind];
        return particlesFor(burst.kind, burst.id, spread).map((p, i) => (
          <span key={`${burst.id}-${i}`} className="koda-burst-origin" style={{ left: `${left}%`, top: `${top}%` }}>
            <motion.span
              className={`koda-burst-particle ${p.className ?? ""}`}
              style={{ fontSize: p.size }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0, 1, 1, 0],
                scale: burst.kind === "sparkle" ? [0.3, 1.15, 0] : [0.3, 1, 0.85],
                rotate: p.rotate,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: p.duration, delay: p.delay, times: [0, 0.15, 0.7, 1] },
              }}
            >
              {p.content}
            </motion.span>
          </span>
        ));
      })}
    </span>
  );
}
