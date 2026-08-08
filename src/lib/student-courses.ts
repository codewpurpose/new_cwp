/**
 * The student store's course-shaped half.
 *
 * Split out of `student.ts` on purpose. Building `COURSES` means reading the
 * whole lesson graph, and anything importing that pulls every chapter of all
 * five tracks into its bundle. Only the dashboard renders a course checklist,
 * so only the dashboard should pay for one — the sidebar, chapter gate, quiz,
 * and leaderboard import `student.ts` alone and stay small.
 *
 * If you need a helper in a lesson-page client component, put it in
 * `student.ts`, not here.
 */

import { getChapters, getTrack } from "@/lib/learn-nav";
import type { LearnTrackId } from "@/lib/learn-types";
import type { Derived, StudentState } from "@/lib/student";

/** The seven on-site tracks, in the order they appear on the dashboard. */
const TRACK_IDS: LearnTrackId[] = [
  "python",
  "github",
  "roblox",
  "financial-literacy",
  "health-in-tech",
  "ml",
  "vibecoding",
];

export interface Course {
  id: LearnTrackId;
  title: string;
  href: string;
  chapters: { slug: string; title: string }[];
}

/** Built once from the real curriculum data — checklists mirror actual chapters. */
export const COURSES: Course[] = TRACK_IDS.map((id) => {
  const track = getTrack(id);
  return {
    id,
    title: track.title,
    href: track.href,
    chapters: getChapters(id).map((c) => ({ slug: c.slug, title: c.title })),
  };
});

export const TOTAL_CHAPTERS = COURSES.reduce((n, c) => n + c.chapters.length, 0);

export function derive(state: StudentState): Derived {
  let completed = 0;
  let coursesStarted = 0;
  let coursesDone = 0;
  for (const c of COURSES) {
    const done = (state.progress[c.id] || []).length;
    completed += done;
    if (done > 0) coursesStarted += 1;
    if (done >= c.chapters.length && c.chapters.length > 0) coursesDone += 1;
  }
  return {
    completed,
    coursesStarted,
    coursesDone,
    overallPct: TOTAL_CHAPTERS ? Math.round((completed / TOTAL_CHAPTERS) * 100) : 0,
  };
}

export function courseProgress(state: StudentState, course: Course) {
  const done = (state.progress[course.id] || []).length;
  const total = course.chapters.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
