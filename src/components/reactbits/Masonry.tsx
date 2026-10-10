"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A masonry photo wall whose tiles rise and blur into focus as they scroll in,
 * adapted from React Bits' Masonry (https://reactbits.dev/components/masonry).
 *
 * Changes from the original:
 * - Layout is CSS columns, not absolutely positioned tiles placed by
 *   JavaScript after measuring the container. The original renders nothing
 *   until it knows its width, so the server sent an empty box and a reader
 *   without JavaScript saw no photos at all. Columns lay out on the server,
 *   reflow with the viewport, and keep the photos in source order for screen
 *   readers.
 * - Tiles are real <img> elements with alt text and lazy loading, not
 *   background images, and they don't open a URL on click.
 * - Tile heights come from each photo's own shape (this gallery mixes portrait
 *   and landscape shots) instead of a hand-entered `height`. Until a photo has
 *   loaded it is assumed to be 3:4, the shape most of them are, so the wall is
 *   already close to final on the server; lazy images load well before they
 *   are scrolled to, so the small correction happens off screen.
 * - Motion instead of gsap, which the site already ships, so no new
 *   dependency. The entrance is shorter and closer: 24px of rise and a 6px
 *   blur, not a flight up from below the window. Each tile animates when it
 *   reaches the viewport rather than all at once on mount, and only tiles that
 *   start below the fold are hidden first, so nothing a reader can already see
 *   ever blinks out. With Reduce Motion on, tiles only fade.
 * - Hover is a CSS press-in (the original's 0.95 scale, softened to 0.97). It
 *   uses Tailwind's `hover:`, which only applies on devices that can hover, so
 *   a tap on a phone does nothing.
 */
const DEFAULT_RATIO = "3 / 4";

export default function Masonry({
  photos,
  className = "",
  fallbackRatio = DEFAULT_RATIO,
}: {
  photos: readonly { src: string; alt: string }[];
  /** Column classes, e.g. `columns-2 md:columns-3`. */
  className?: string;
  /** Shape each tile holds until its photo loads and reports its own. */
  fallbackRatio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<Record<string, string>>({});

  const measure = (img: HTMLImageElement, src: string) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    setRatios((prev) => (prev[src] === ratio ? prev : { ...prev, [src]: ratio }));
  };

  // A cached photo can finish loading before React hydrates and attaches
  // onLoad, so pick up anything that is already complete.
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLImageElement>("img[data-src]").forEach((img) => {
      if (img.complete) measure(img, img.dataset.src ?? "");
    });
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>("[data-masonry-tile]")).filter(
      (tile) => tile.getBoundingClientRect().top > window.innerHeight,
    );
    if (!tiles.length) return undefined;

    tiles.forEach((tile) => {
      tile.style.opacity = "0";
      if (!reduce) {
        tile.style.transform = "translateY(24px)";
        tile.style.filter = "blur(6px)";
      }
    });

    const clear = (tile: HTMLElement) => {
      tile.style.removeProperty("opacity");
      tile.style.removeProperty("transform");
      tile.style.removeProperty("filter");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Tiles that arrive together (a new row) stagger left to right.
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const tile = entry.target as HTMLElement;
            observer.unobserve(tile);
            const delay = i * 0.06;
            const done = reduce
              ? animate(tile, { opacity: 1 }, { duration: 0.3, delay })
              : animate(
                  tile,
                  { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
                  { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
                );
            // Drop the finished inline styles so a settled tile carries no
            // leftover filter layer. Motion writes its final frame just after
            // the promise resolves, hence the extra frame.
            done.then(() => requestAnimationFrame(() => clear(tile)));
          });
      },
      { threshold: 0.1 },
    );
    tiles.forEach((tile) => observer.observe(tile));

    return () => {
      observer.disconnect();
      tiles.forEach(clear);
    };
  }, []);

  return (
    <div ref={ref} className={`gap-2.5 ${className}`}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          data-masonry-tile=""
          className="home-card mb-2.5 break-inside-avoid overflow-hidden rounded-xl transition-[scale,box-shadow] duration-300 ease-out hover:scale-[0.97] hover:shadow-[var(--home-shadow-lg)] motion-reduce:hover:scale-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            data-src={photo.src}
            loading="lazy"
            decoding="async"
            onLoad={(event) => measure(event.currentTarget, photo.src)}
            className="block w-full object-cover"
            style={{ aspectRatio: ratios[photo.src] ?? fallbackRatio }}
          />
        </div>
      ))}
    </div>
  );
}
