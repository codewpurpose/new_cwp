"use client";

import Image from "next/image";
import { useState } from "react";

/** A stable, click-to-play frame: no sticky scroll stage or layout changes after hydration. */
export default function ScrollExpandVideo({ src, poster, posterAlt, title, caption }: {
  src: string;
  poster: string;
  posterAlt: string;
  title: string;
  caption?: string;
  koda?: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative mt-6 aspect-video overflow-hidden rounded-[20px] bg-[#1e3c2c]">
      {playing ? (
        <video src={src} controls autoPlay playsInline preload="metadata" poster={poster}
          aria-label={title} className="h-full w-full bg-black object-contain" />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9fd3a8]">
          <Image src={poster} alt={posterAlt} fill sizes="(max-width: 1359px) 100vw, 1280px" className="object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#15120c]/85 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 md:gap-4 md:p-8">
            <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fcf4e8] text-[#1e3c2c] transition-transform group-hover:scale-105 md:size-16">
              <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
            </span>
            <span className="leading-tight text-[#fcf4e8]">
              <span className="home-serif block text-base md:text-2xl">{title}</span>
              {caption && <span className="mt-1 block text-xs text-[#fcf4e8]/90 md:text-base">{caption}</span>}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
