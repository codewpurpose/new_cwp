"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LearnTrackId } from "@/lib/learn-types";
import { chapterHref, getPartsWithChapters, getTrack } from "@/lib/learn-nav";

interface LearnSidebarProps {
  track: LearnTrackId;
  /** "drawer" drops the sticky rail styling; the drawer owns its own scroll. */
  variant?: "rail" | "drawer";
  onNavigate?: () => void;
}

export function LearnSidebar({ track, variant = "rail", onNavigate }: LearnSidebarProps) {
  // Layouts do not re-render on navigation and cannot read the pathname, so the
  // active-chapter highlight has to come from a client hook.
  const pathname = usePathname();
  const groups = getPartsWithChapters(track);
  const trackMeta = getTrack(track);

  return (
    <nav aria-label={`${trackMeta.title} chapters`} data-variant={variant}>
      <p className="learn-nav-heading">{trackMeta.title}</p>

      {groups.map(({ part, chapters }) => (
        <div key={part.id} className="learn-nav-part">
          {groups.length > 1 && (
            <h2 className="learn-nav-part-title">
              <span className="learn-nav-part-number">{part.number}</span>
              {part.title}
            </h2>
          )}
          <ul className="learn-nav-list">
            {chapters.map((chapter) => {
              const href = chapterHref(track, chapter.slug);
              const isCurrent = pathname === href || `${pathname}/` === href;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={href}
                    // A sticky sidebar puts every link in the viewport, and Next
                    // prefetches on viewport entry — so all 29 would fetch at
                    // once. Hover/focus intent is enough here.
                    prefetch={false}
                    aria-current={isCurrent ? "page" : undefined}
                    className="learn-nav-link"
                    onClick={onNavigate}
                  >
                    {chapter.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
