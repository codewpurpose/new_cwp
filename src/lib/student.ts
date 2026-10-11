/**
 * Local-first course completion state. Completed chapters stay on this device
 * unless the learner signs in, in which case ClerkDataSync mirrors them to
 * Supabase so the course reader can resume on another device.
 */

export const STUDENT_KEY = "cwp-student-v1";
export interface StudentState {
  progress: Record<string, string[]>;
}

export const DEFAULT_STUDENT: StudentState = {
  progress: {},
};

/**
 * Ignore legacy profile and gamification fields left by earlier versions.
 * Only course completions are still used.
 */
export function readStudent(): StudentState {
  if (typeof window === "undefined") return DEFAULT_STUDENT;
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STUDENT_KEY) || "null");
    if (!raw || typeof raw !== "object") return DEFAULT_STUDENT;
    const value = raw as { progress?: unknown };
    const progress: Record<string, string[]> = {};
    if (value.progress && typeof value.progress === "object") {
      for (const [courseId, slugs] of Object.entries(value.progress)) {
        if (Array.isArray(slugs)) {
          progress[courseId] = slugs.filter((slug): slug is string => typeof slug === "string");
        }
      }
    }
    return { progress };
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function writeStudent(state: StudentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(state));
  } catch {
    /* private mode */
  }
}

export function isLessonComplete(courseId: string, slug: string): boolean {
  return (readStudent().progress[courseId] || []).includes(slug);
}

/** Marks a lesson done (idempotent). */
export function markLessonComplete(courseId: string, slug: string): void {
  const state = readStudent();
  const done = state.progress[courseId] || [];
  if (done.includes(slug)) return;

  const next: StudentState = {
    ...state,
    progress: { ...state.progress, [courseId]: [...done, slug] },
  };
  writeStudent(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cwp:lesson-complete", { detail: { courseId, slug } }));
    window.dispatchEvent(new Event("cwp:progress-changed"));
  }
}
