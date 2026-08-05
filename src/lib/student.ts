/**
 * Local-first student progress model.
 *
 * Everything a signed-out student earns — XP, streak, which chapters they've
 * ticked off, cosmetics they've unlocked — lives in ONE localStorage blob on
 * their own device. No account, no server, nothing collected. When a real
 * backend arrives later, this shape is what gets synced.
 */

import { getChapters, getTrack } from "@/lib/learn-nav";
import type { LearnTrackId } from "@/lib/learn-types";
import { images } from "@/lib/images";

export const STUDENT_KEY = "cwp-student-v1";
export const XP_PER_CHAPTER = 20;
export const XP_PER_LEVEL = 150;

/** The five on-site tracks, in the order they appear on the dashboard. */
const TRACK_IDS: LearnTrackId[] = [
  "python",
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

export interface StudentState {
  name: string;
  avatar: string; // equipped avatar id
  theme: string; // equipped theme id
  xp: number;
  streakDays: number;
  lastActive: string; // YYYY-MM-DD
  progress: Record<string, string[]>; // courseId -> completed chapter slugs
  unlocked: string[]; // cosmetic ids the student has claimed
}

export const DEFAULT_STUDENT: StudentState = {
  name: "",
  avatar: "wave",
  theme: "fern",
  xp: 0,
  streakDays: 0,
  lastActive: "",
  progress: {},
  unlocked: ["wave", "fern"],
};

/* ---- Cosmetics ---------------------------------------------------------- */

export interface Avatar {
  id: string;
  label: string;
  src: string;
  cost: number; // XP required to unlock
}

export const AVATARS: Avatar[] = [
  { id: "wave", label: "Waving Koda", src: "/koala/koala-wave.png", cost: 0 },
  { id: "heart", label: "Heart Koda", src: "/koala/koala-heart.png", cost: 100 },
  { id: "read", label: "Reader Koda", src: "/koala/koala-read.png", cost: 250 },
  { id: "branch", label: "Branch Koda", src: "/koala/koala-branch.png", cost: 400 },
  { id: "climb", label: "Climber Koda", src: "/koala/koala-climb.png", cost: 600 },
  { id: "tree", label: "Treetop Koda", src: "/koala/koala-tree.png", cost: 800 },
  { id: "hang", label: "Hanging Koda", src: "/koala/koala-hang.png", cost: 1000 },
  { id: "sleep", label: "Sleepy Koda", src: "/koala/koala-sleep.png", cost: 1400 },
];

export interface Theme {
  id: string;
  label: string;
  accent: string;
  soft: string;
  cost: number;
}

export const THEMES: Theme[] = [
  { id: "fern", label: "Fern", accent: "#3e7f5c", soft: "#dbefdb", cost: 0 },
  { id: "sunset", label: "Sunset", accent: "#c9682e", soft: "#f7ddc6", cost: 300 },
  { id: "ocean", label: "Ocean", accent: "#2f6d86", soft: "#cfe6ee", cost: 500 },
  { id: "berry", label: "Berry", accent: "#8a4a86", soft: "#ecd6ea", cost: 700 },
];

export function avatarSrc(id: string): string {
  return AVATARS.find((a) => a.id === id)?.src ?? AVATARS[0].src;
}
export function themeById(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/* ---- Derived stats ------------------------------------------------------ */

export interface Derived {
  completed: number;
  coursesStarted: number;
  coursesDone: number;
  overallPct: number;
}

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

export interface LevelInfo {
  level: number;
  into: number;
  span: number;
}
export function levelInfo(xp: number): LevelInfo {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL, span: XP_PER_LEVEL };
}

/* ---- Achievements ------------------------------------------------------- */

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  earned: (s: StudentState, d: Derived, extra: { hasNotes: boolean }) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-steps", name: "First Steps", desc: "Complete your first chapter", emoji: "🌱", earned: (_s, d) => d.completed >= 1 },
  { id: "getting-going", name: "Getting Going", desc: "Reach 100 XP", emoji: "⚡", earned: (s) => s.xp >= 100 },
  { id: "note-taker", name: "Note-Taker", desc: "Fill in a Toolkit note", emoji: "📝", earned: (_s, _d, e) => e.hasNotes },
  { id: "on-a-roll", name: "On a Roll", desc: "Keep a 7-day streak", emoji: "🔥", earned: (s) => s.streakDays >= 7 },
  { id: "explorer", name: "Explorer", desc: "Start 3 different courses", emoji: "🧭", earned: (_s, d) => d.coursesStarted >= 3 },
  { id: "finisher", name: "Finisher", desc: "Complete a whole course", emoji: "🏅", earned: (_s, d) => d.coursesDone >= 1 },
  { id: "scholar", name: "Scholar", desc: "Reach 500 XP", emoji: "🎓", earned: (s) => s.xp >= 500 },
  { id: "koala-whisperer", name: "Koala Whisperer", desc: "Unlock every Koda avatar", emoji: "🐨", earned: (s) => AVATARS.every((a) => s.unlocked.includes(a.id)) },
];

/** Reads the Toolkit's own localStorage keys to see if any note has content. */
export function hasToolkitNotes(): boolean {
  if (typeof window === "undefined") return false;
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && key.startsWith("cwp-toolkit-")) {
      try {
        const v = JSON.parse(localStorage.getItem(key) || "{}");
        if (Object.values(v).some((x) => String(x).trim())) return true;
      } catch {
        /* ignore */
      }
    }
  }
  return false;
}

/** Today as YYYY-MM-DD in local time (no Date libs, stable). */
export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Whether `lastActive` was exactly the day before `todayStr`. */
export function wasYesterday(lastActive: string, todayStr: string): boolean {
  if (!lastActive) return false;
  const d = new Date(todayStr + "T00:00:00");
  d.setDate(d.getDate() - 1);
  const y = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return lastActive === y;
}

/* ---- Shared local store access (used by the dashboard AND lesson quizzes) - */

export function readStudent(): StudentState {
  if (typeof window === "undefined") return DEFAULT_STUDENT;
  try {
    const raw = localStorage.getItem(STUDENT_KEY);
    return raw ? { ...DEFAULT_STUDENT, ...JSON.parse(raw) } : DEFAULT_STUDENT;
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function writeStudent(s: StudentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(s));
  } catch {
    /* private mode */
  }
}

export function isLessonComplete(courseId: string, slug: string): boolean {
  return (readStudent().progress[courseId] || []).includes(slug);
}

/** Marks a lesson done (idempotent) and awards its XP. Returns the new total. */
export function markLessonComplete(courseId: string, slug: string): number {
  const s = readStudent();
  const done = s.progress[courseId] || [];
  if (done.includes(slug)) return s.xp;
  const next: StudentState = {
    ...s,
    progress: { ...s.progress, [courseId]: [...done, slug] },
    xp: s.xp + XP_PER_CHAPTER,
    lastActive: today(),
  };
  writeStudent(next);
  if (typeof window !== "undefined") {
    // `lesson-complete` triggers the remote push (Supabase, when signed in);
    // `progress-changed` tells the dashboard, gate, and sidebar to re-read.
    window.dispatchEvent(new CustomEvent("cwp:lesson-complete", { detail: { courseId, slug } }));
    window.dispatchEvent(new Event("cwp:progress-changed"));
  }
  return next.xp;
}

export { images };
