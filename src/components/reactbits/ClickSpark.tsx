"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A small burst of lines where the reader clicks, adapted from React Bits'
 * ClickSpark (https://reactbits.dev/animations/click-spark).
 *
 * Changes from the original:
 * - The animation frame loop only runs while sparks are on screen; the
 *   original redrew an empty canvas sixty times a second forever.
 * - Canvas is sized for the device pixel ratio so lines stay crisp.
 * - Keyboard activation (no pointer position) bursts from the centre.
 * - Nothing is drawn with Reduce Motion on.
 */
interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
}

export default function ClickSpark({
  children,
  sparkColor = "#3e7f5c",
  sparkSize = 10,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 450,
  className = "",
}: {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // The frame loop re-schedules itself, so it lives in a ref that an effect
  // refreshes whenever the spark settings change.
  const draw = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    draw.current = function tick(now: number) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((spark) => {
        const progress = (now - spark.start) / duration;
        if (progress >= 1) return false;
        const eased = progress * (2 - progress);
        const distance = eased * sparkRadius;
        const length = sparkSize * (1 - eased);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(spark.x + distance * Math.cos(spark.angle), spark.y + distance * Math.sin(spark.angle));
        ctx.lineTo(
          spark.x + (distance + length) * Math.cos(spark.angle),
          spark.y + (distance + length) * Math.sin(spark.angle),
        );
        ctx.stroke();
        return true;
      });
      frame.current = sparks.current.length ? requestAnimationFrame(tick) : null;
    };
  }, [duration, sparkColor, sparkRadius, sparkSize]);

  const burst = (event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = canvas.getBoundingClientRect();
    const fromKeyboard = event.detail === 0;
    const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left;
    const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top;
    const start = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparks.current.push({ x, y, angle: (2 * Math.PI * i) / sparkCount, start });
    }
    if (frame.current === null) frame.current = requestAnimationFrame((now) => draw.current(now));
  };

  return (
    <div className={`relative ${className}`} onClick={burst}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
}
