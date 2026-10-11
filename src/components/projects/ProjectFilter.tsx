"use client";

import { useState } from "react";
import type { ProjectTrack } from "@/lib/projects";
import { TrackIcon } from "./TrackIcon";

export interface ProjectCardItem {
  slug: string;
  href: string;
  track: ProjectTrack;
  trackLabel: string;
  title: string;
  pitch: string;
  skills: readonly string[];
}

type Filter = ProjectTrack | "all";

/**
 * The project grid with a simple track filter. Every card is in the server
 * HTML; filtering only hides cards, so the page reads fine without JS.
 */
export function ProjectFilter({
  items,
  tracks,
}: {
  items: readonly ProjectCardItem[];
  tracks: readonly { id: ProjectTrack; label: string }[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const options: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...tracks];
  const visible = filter === "all" ? items : items.filter((item) => item.track === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects by track" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === filter;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={`min-h-10 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] ${
                active
                  ? "border-[#3e7f5c] bg-[#dbefdb] text-[var(--home-moss)]"
                  : "border-[var(--home-hairline-strong)] bg-[var(--home-white)] text-[var(--home-ink-soft)] hover:border-[#3e7f5c] hover:text-[var(--home-moss)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filter === "all" ? "Showing all projects" : `Showing ${options.find((o) => o.id === filter)?.label} projects`}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.slug} className="flex">
            <a
              href={item.href}
              className="group flex w-full flex-col rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-6 shadow-[var(--home-shadow-sm)] transition-[border-color,box-shadow] duration-200 hover:border-[#3e7f5c] hover:shadow-[var(--home-shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)]"
            >
              <div className="flex items-center gap-3">
                <TrackIcon track={item.track} />
                <span className="font-[family-name:var(--learn-font-mono)] text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[#3e7f5c]">
                  {item.trackLabel}
                </span>
              </div>
              <h3 className="home-display mt-5 text-[1.375rem] leading-[1.15] text-[var(--home-ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.55] text-[var(--home-ink-soft)]">{item.pitch}</p>
              <p className="mt-4 text-[0.8125rem] leading-[1.5] text-[var(--home-ink-quiet)]">
                {item.skills.join(" · ")}
              </p>
              <span className="home-arrow-link mt-auto pt-5 text-[0.9375rem] font-medium">
                Start project <span className="home-arrow" aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
