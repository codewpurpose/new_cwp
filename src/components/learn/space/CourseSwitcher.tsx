"use client";

import { Menu } from "@base-ui/react/menu";
import Link from "next/link";
import type { SwitcherCourse } from "@/components/courses/catalog";
import type { LearnTrackId } from "@/lib/learn-types";
import { COURSES_HREF } from "@/lib/links";
import { Ring } from "@/components/learn/space/TrackProgress";
import { useProgressMap } from "@/components/learn/space/progress";

/**
 * Jump between courses without going back out to the catalogue.
 *
 * Without JavaScript the trigger does nothing, which is acceptable here: the
 * same destinations are one click away through "All courses" in the hero and
 * "Back to site" beside this button.
 */
export function CourseSwitcher({
  current,
  courses,
}: {
  current: LearnTrackId;
  courses: readonly SwitcherCourse[];
}) {
  const progress = useProgressMap();

  return (
    <Menu.Root>
      <Menu.Trigger
        className="learn-focusable inline-flex h-9 items-center gap-1.5 rounded-full border border-[#fcf4e8]/25 px-3 text-[13px] font-medium text-[#fcf4e8] transition-colors hover:bg-[#fcf4e8]/10 data-[popup-open]:bg-[#fcf4e8]/15"
        aria-label="Switch course"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="hidden md:inline">Courses</span>
        <svg viewBox="0 0 12 12" className="h-3 w-3 opacity-70" aria-hidden="true" fill="none">
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end" className="z-50">
          <Menu.Popup className="learnspace-menu w-[min(20rem,calc(100vw-2rem))] origin-[var(--transform-origin)] rounded-2xl border-[0.5px] border-[var(--home-grey-500)] bg-[#fffbf5] p-1.5 text-[#15120c] shadow-[var(--home-shadow-lg)] outline-none">
            <p className="home-mono px-3 pt-2 pb-1.5 text-[10.5px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
              Switch course
            </p>
            {courses.map((course) => {
              const completed = new Set(progress[course.track] ?? []);
              const done = course.chapterSlugs.filter((slug) => completed.has(slug)).length;
              const isCurrent = course.track === current;
              return (
                <Menu.LinkItem
                  key={course.track}
                  render={<Link href={course.href} />}
                  aria-current={isCurrent ? "page" : undefined}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] outline-none data-[highlighted]:bg-[#dbefdb]/70 aria-[current=page]:font-semibold"
                >
                  <Ring
                    value={course.chapterSlugs.length ? done / course.chapterSlugs.length : 0}
                    size={18}
                    stroke={2.5}
                    track="var(--home-grey-500)"
                    fill="#3e7f5c"
                  />
                  <span className="min-w-0 flex-1 truncate">{course.title}</span>
                  <span className="home-mono shrink-0 text-[11px] tabular-nums text-[var(--home-ink-quiet)]">
                    {done > 0 ? `${done}/${course.chapterSlugs.length}` : `${course.chapterSlugs.length} ch`}
                  </span>
                </Menu.LinkItem>
              );
            })}
            <div className="my-1.5 h-px bg-[var(--home-hairline-strong)]" />
            <Menu.LinkItem
              render={<Link href={COURSES_HREF} />}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-medium text-[#1e3c2c] outline-none data-[highlighted]:bg-[#dbefdb]/70"
            >
              All courses
              <span aria-hidden="true">→</span>
            </Menu.LinkItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
