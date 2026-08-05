"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Lock } from "lucide-react";
import type { LearnNavData, LearnTrackId } from "@/lib/learn-types";
import { chapterHref } from "@/lib/learn-routes";
import { readStudent } from "@/lib/student";

interface LearnSidebarProps {
  track: LearnTrackId;
  /**
   * Built on the server by `getSidebarNav`. Passed in rather than read here so
   * this component never imports the lesson graph — see `learn-routes.ts`.
   */
  nav: LearnNavData;
  /** "drawer" drops the sticky rail styling; the drawer owns its own scroll. */
  variant?: "rail" | "drawer";
  onNavigate?: () => void;
}

export function LearnSidebar({ track, nav, variant = "rail", onNavigate }: LearnSidebarProps) {
  // Layouts do not re-render on navigation and cannot read the pathname, so the
  // active-chapter highlight has to come from a client hook.
  const pathname = usePathname();
  const { groups, trackTitle } = nav;

  // Completion drives the lock/tick marks. It lives in the local store (kept in
  // sync with Supabase when signed in), so it's read on the client after mount.
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const read = () => {
      setCompleted(new Set(readStudent().progress[track] ?? []));
      setLoaded(true);
    };
    read();
    window.addEventListener("cwp:progress-changed", read);
    return () => window.removeEventListener("cwp:progress-changed", read);
  }, [track]);

  // Walk chapters in reading order: a chapter is unlocked if it's the first or
  // the one before it is complete — the same rule the lesson gate enforces.
  const status = new Map<string, { done: boolean; unlocked: boolean }>();
  let prevDone = true;
  for (const { chapters } of groups) {
    for (const chapter of chapters) {
      const done = completed.has(chapter.slug);
      status.set(chapter.slug, { done, unlocked: prevDone });
      prevDone = done;
    }
  }

  return (
    <nav aria-label={`${trackTitle} chapters`} data-variant={variant}>
      <p className="learn-nav-heading">{trackTitle}</p>

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
              const st = status.get(chapter.slug) ?? { done: false, unlocked: true };
              const showLock = loaded && !st.unlocked && !isCurrent;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={href}
                    // A sticky sidebar puts every link in the viewport, and Next
                    // prefetches on viewport entry — so all 29 would fetch at
                    // once. Hover/focus intent is enough here.
                    prefetch={false}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`learn-nav-link ${showLock ? "opacity-55" : ""}`}
                    onClick={onNavigate}
                  >
                    <span className="flex w-full items-center gap-2">
                      <span className="min-w-0 flex-1 truncate">{chapter.title}</span>
                      {loaded && st.done && (
                        <Check className="size-3.5 shrink-0 text-learn-accent-text" aria-label="Completed" />
                      )}
                      {showLock && (
                        <Lock className="size-3 shrink-0 text-learn-muted" aria-label="Locked" />
                      )}
                    </span>
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
