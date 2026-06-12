"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SpaceScrollScene = dynamic(
  () => import("./SpaceScrollScene").then((m) => m.SpaceScrollScene),
  { ssr: false },
);

export function HeroGlobe() {
  const [dissipation, setDissipation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      rafRef.current = 0;
      const el = sectionRef.current;
      if (!el) return;
      const vh = window.innerHeight || 1;
      setDissipation(
        Math.min(1, Math.max(0, (0.4 * vh - el.getBoundingClientRect().top) / (0.6 * vh))),
      );
    };
    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-10 md:mt-14"
      aria-label="A globe of particles, the shared learning every agent orbits"
    >
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="aspect-[455/256] w-full" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -inset-y-[150%] md:-inset-y-[30%]">
        <SpaceScrollScene
          className="absolute inset-0 h-full w-full"
          transparent
          scale={isMobile ? 0.25 : 0.5}
          dust={false}
          dissipation={dissipation}
          baseColor={[10, 14, 25]}
          noiseColor={[99, 99, 99]}
        />
      </div>
    </section>
  );
}
