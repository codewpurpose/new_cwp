"use client";

import { useMemo, useState } from "react";
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

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (filter === "all" || item.platform === filter) &&
          matchesSearch(item, search),
      ),
    [filter, items, search],
  );

  const hasActiveFilters = filter !== "all" || search.trim().length > 0;
  const resultLabel = filteredItems.length === 1 ? "video" : "videos";

  return (
    <div>
      <div className="home-card rounded-[20px] p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[var(--home-ink-soft)]">
              Browse the library by platform or search the collection.
            </p>
            <div
              aria-label="Filter media by platform"
              className="mt-4 flex flex-wrap gap-2"
              role="group"
            >
              {FILTERS.map((option) => {
                const isActive = filter === option.value;

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
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:max-w-xs">
            <label
              htmlFor="media-search"
              className="text-sm font-medium text-[var(--home-ink)]"
            >
              Search videos
            </label>
            <input
              id="media-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try “students”"
              className="mt-2 min-h-11 w-full rounded-lg border border-[var(--home-hairline-strong)] bg-[var(--home-page)] px-3.5 text-[15px] text-[var(--home-ink)] outline-none transition-shadow placeholder:text-[var(--home-ink-quiet)] focus-visible:ring-2 focus-visible:ring-[var(--home-fern)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-white)]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--home-hairline)] pt-4 text-sm text-[var(--home-ink-soft)]">
          <p aria-live="polite">
            Showing {filteredItems.length} {resultLabel}
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
