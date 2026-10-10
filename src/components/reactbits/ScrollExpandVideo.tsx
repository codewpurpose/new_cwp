"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A video that grows from a tilted card to full width as the reader scrolls
 * past it, adapted from React Bits' ScrollExpand
 * (https://reactbits.dev/components/scroll-expand).
 *
 * Changes from the original:
 * - Driven by motion's useScroll and a sticky stage instead of the original's
 *   hand-rolled scroll loop, so it adds no dependency and inherits
 *   MotionProvider's reduced-motion handling.
 * - A real poster sits over the video until the reader presses play. The
 *   promo opens on an empty cream frame, so without it the section showed a
 *   blank box (the bug this replaces). The video isn't fetched until then.
 * - The pinned, expanding version only switches on after mount, on screens at
 *   least 768px wide and with Reduce Motion off. The server, phones and
 *   reduced-motion readers get the same frame at full size with no pinning,
 *   so first render matches and nobody is scroll-jacked on a small screen.
 */
export default function ScrollExpandVideo({
  src,
  poster,
  posterAlt,
  title,
  caption,
  koda,
}: {
  src: string;
  poster: string;
  posterAlt: string;
  title: string;
  caption?: string;
  /** Optional mascot pose in the frame's corner. Off by default: most pages
   *  already have the floating corner Koda, and two side by side crowd. */
  koda?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [pinned, setPinned] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  // Grow over the first 70% of the pin, then hold at full size.
  const width = useTransform(progress, [0, 0.7], ["58%", "100%"]);
  const radius = useTransform(progress, [0, 0.7], [36, 20]);
  const tilt = useTransform(progress, [0, 0.7], [10, 0]);
  const zoom = useTransform(progress, [0, 0.7], [1.25, 1]);
  const titleOpacity = useTransform(progress, [0, 0.35], [1, 0]);
  const titleLift = useTransform(progress, [0, 0.35], [0, -40]);
  const controlsOpacity = useTransform(progress, [0.45, 0.7], [0, 1]);

  const play = () => {
    setPlaying(true);
    // Start on the next frame, once the <video> has its src.
    requestAnimationFrame(() => void video.current?.play().catch(() => {}));
  };

  const frame = (
    <motion.div
      className="relative mx-auto aspect-video overflow-hidden bg-[#1e3c2c] shadow-[0_30px_80px_-30px_rgba(21,18,12,0.45)]"
      style={pinned ? { width, borderRadius: radius, rotateX: tilt, transformPerspective: 1400 } : { width: "100%", borderRadius: 20 }}
    >
      {playing ? (
        <video
          ref={video}
          src={src}
          controls
          playsInline
          preload="auto"
          className="h-full w-full bg-black object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={play}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 block h-full w-full cursor-pointer text-left focus-visible:outline-none"
        >
          <motion.span className="absolute inset-0 block" style={pinned ? { scale: zoom } : undefined}>
            <Image src={poster} alt={posterAlt} fill sizes="(max-width: 1359px) 100vw, 1280px" className="object-cover" />
          </motion.span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#15120c]/75 via-[#15120c]/20 to-transparent"
          />

          {pinned && (
            <motion.span
              aria-hidden="true"
              className="home-serif absolute inset-x-0 top-[38%] block text-center text-[clamp(2rem,5vw,4.25rem)] leading-none text-[#fcf4e8]"
              style={{ opacity: titleOpacity, y: titleLift }}
            >
              {title}
            </motion.span>
          )}

          <motion.span
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8"
            style={pinned ? { opacity: controlsOpacity } : undefined}
          >
            <span className="flex items-center gap-4">
              <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-[#fcf4e8] text-[#1e3c2c] shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-[-4px] group-focus-visible:outline-[#9fd3a8] md:size-20">
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#fcf4e8]/40 motion-reduce:hidden" />
                <svg viewBox="0 0 24 24" className="relative ml-1 size-7 md:size-8" aria-hidden="true" fill="currentColor">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                </svg>
              </span>
              <span className="leading-tight text-[#fcf4e8]">
                <span className="home-serif block text-xl md:text-2xl">{title}</span>
                {caption && <span className="block text-sm text-[#fcf4e8]/80 md:text-base">{caption}</span>}
              </span>
            </span>
            {koda && (
            <span aria-hidden="true" className="relative hidden h-24 w-24 shrink-0 sm:block md:h-32 md:w-32">
              <Image
                src={koda}
                alt=""
                fill
                sizes="128px"
                className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-6deg]"
              />
            </span>
            )}
          </motion.span>
        </button>
      )}
    </motion.div>
  );

  // One wrapper in both layouts, so useScroll keeps the same target element
  // when the pinned version switches on after mount.
  return (
    <div ref={track} className={pinned ? "relative mt-6 h-[190vh]" : "relative mt-6"}>
      {pinned ? (
        <div className="sticky top-[10vh] flex h-[80vh] items-center">
          <div className="w-full">{frame}</div>
        </div>
      ) : (
        frame
      )}
    </div>
  );
}
