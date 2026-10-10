"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Lock } from "lucide-react";
import type { LearnNavData, LearnTrackId } from "@/lib/learn-types";
import { chapterHref } from "@/lib/learn-routes";
import { useTrackProgress } from "@/components/learn/reader/useTrackProgress";

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

const EMPTY: ReadonlySet<string> = new Set();

export function LearnSidebar({ track, nav, variant = "rail", onNavigate }: LearnSidebarProps) {
  // Layouts do not re-render on navigation and cannot read the pathname, so the
  // active-chapter highlight has to come from a client hook.
  const pathname = usePathname();
  const { groups, trackTitle } = nav;

  // Completion drives the lock/tick marks and the progress meter. It lives in
  // the local store (kept in sync with Supabase when signed in), so it is null
  // on the server and read on the client after hydration.
  const progress = useTrackProgress(track);
  const loaded = progress !== null;
  const completed = progress ?? EMPTY;
  const navRef = useRef<HTMLElement>(null);

  // Long tracks put the current chapter below the fold of the rail (or the
  // drawer). Scroll its own container — never scrollIntoView, which would also
  // scroll the window away from the top of the lesson.
  //
  // Deferred a beat: the docked Koda below the rail mounts after hydration and
  // changes how far the rail can scroll, and the drawer is still sliding in.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nav = navRef.current;
      const scroller = nav?.closest<HTMLElement>(".learn-sidebar, .lr-drawer-body");
      const current = nav?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!scroller || !current) return;
      const box = scroller.getBoundingClientRect();
      const link = current.getBoundingClientRect();
      if (link.top >= box.top + 40 && link.bottom <= box.bottom - 180) return;
      scroller.scrollTop += link.top - box.top - box.height / 3;
    }, 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Walk chapters in reading order: a chapter is unlocked if it's the first or
  // the one before it is complete — the same rule the lesson gate enforces.
  const status = new Map<string, { done: boolean; unlocked: boolean }>();
  let prevDone = true;
  let total = 0;
  let doneCount = 0;
  for (const { chapters } of groups) {
    for (const chapter of chapters) {
      const done = completed.has(chapter.slug);
      status.set(chapter.slug, { done, unlocked: prevDone });
      prevDone = done;
      total += 1;
      if (done) doneCount += 1;
    }
  }
  const percent = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <nav ref={navRef} aria-label={`${trackTitle} chapters`} data-variant={variant}>
      {variant === "rail" && <p className="learn-nav-heading">{trackTitle}</p>}

      {/* Track progress. Rendered with an empty bar on the server so the rail
          keeps its height; the numbers arrive with the local store. */}
      <div className="lr-track-progress">
        <div className="lr-track-progress-text">
          <span>
            {loaded ? (
              <>
                <strong>{doneCount}</strong> of {total} complete
              </>
            ) : (
              <>{total} chapters</>
            )}
          </span>
          {loaded && <span className="lr-track-progress-pct">{percent}%</span>}
        </div>
        <div
          className="lr-meter"
          role={loaded ? "progressbar" : undefined}
          aria-label={loaded ? `${trackTitle} progress` : undefined}
          aria-valuemin={loaded ? 0 : undefined}
          aria-valuemax={loaded ? total : undefined}
          aria-valuenow={loaded ? doneCount : undefined}
          aria-hidden={loaded ? undefined : true}
        >
          <span className="lr-meter-fill" style={{ transform: `scaleX(${loaded ? doneCount / (total || 1) : 0})` }} />
        </div>
      </div>

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
                    data-done={loaded && st.done ? "true" : undefined}
                    onClick={onNavigate}
                  >
                    <span className="flex w-full items-center gap-2">
                      <span className="min-w-0 flex-1 truncate">{chapter.title}</span>
                      {loaded && st.done && (
                        <span className="lr-nav-done">
                          <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                          <span className="sr-only">Completed</span>
                        </span>
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
