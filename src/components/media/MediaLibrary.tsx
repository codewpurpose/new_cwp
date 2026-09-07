"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MediaGrid } from "@/components/media/MediaCard";
import type { MediaItem, MediaPlatform } from "@/lib/media";

type MediaFilter = "all" | MediaPlatform;

const FILTERS: readonly { label: string; value: MediaFilter }[] = [
  { label: "All videos", value: "all" },
  { label: "YouTube", value: "youtube" },
  { label: "Instagram", value: "instagram" },
];

function matchesSearch(item: MediaItem, search: string): boolean {
  if (!search.trim()) return true;

  const query = search.trim().toLowerCase();
  return `${item.title} ${item.description}`.toLowerCase().includes(query);
}

export function MediaLibrary({ items }: { items: readonly MediaItem[] }) {
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [search, setSearch] = useState("");
  const availableFilters = FILTERS.filter(
    (option) => option.value === "all" || items.some((item) => item.platform === option.value),
  );

  const filteredItems = items.filter(
    (item) =>
      (filter === "all" || item.platform === filter) && matchesSearch(item, search),
  );

  const hasActiveFilters = filter !== "all" || search.trim().length > 0;
  const resultLabel = items.length === 1 ? "video" : "videos";

  return (
    <div>
      <div className="home-card rounded-[20px] p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--home-ink)]">Find a video</p>
            <p className="mt-1 text-sm text-[var(--home-ink-soft)]">
              Filter by platform or search the collection.
            </p>
            <div
              aria-label="Filter media by platform"
              className="mt-4 flex flex-wrap gap-2"
              role="group"
            >
              {availableFilters.map((option) => {
                const isActive = filter === option.value;
                const count =
                  option.value === "all"
                    ? items.length
                    : items.filter((item) => item.platform === option.value).length;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    className={`home-btn ${
                      isActive ? "home-btn-fill" : "home-btn-outline"
                    }`}
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label}
                    <span
                      aria-hidden="true"
                      className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-[var(--home-grey-400)] text-[var(--home-ink-soft)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:max-w-xs">
            <label htmlFor="media-search" className="text-sm font-medium text-[var(--home-ink)]">
              Search videos
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--home-ink-quiet)]"
              />
              <input
                id="media-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try “students”"
                className="min-h-11 w-full rounded-lg border border-[var(--home-hairline-strong)] bg-[var(--home-page)] py-2.5 pl-10 pr-3.5 text-[15px] text-[var(--home-ink)] outline-none transition-shadow placeholder:text-[var(--home-ink-quiet)] focus-visible:ring-2 focus-visible:ring-[var(--home-fern)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-white)]"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--home-hairline)] pt-4 text-sm text-[var(--home-ink-soft)]">
          <p aria-live="polite">
            Showing {filteredItems.length} of {items.length} {resultLabel}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              className="home-arrow-link text-sm"
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <MediaGrid
          items={filteredItems}
          layout="library"
          emptyTitle={items.length === 0 ? undefined : "No videos match those filters"}
          emptyDescription={
            items.length === 0
              ? undefined
              : "Try a different platform or search term, or clear the filters to see the full library."
          }
        />
      </div>
    </div>
  );
}
