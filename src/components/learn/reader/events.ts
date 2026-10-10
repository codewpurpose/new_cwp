/**
 * Window events the lesson reader uses to let its pieces react to each other
 * without sharing React state: the quiz lives inside the chapter body, the
 * study buddy lives in the sidebar, and neither should import the other.
 *
 * `cwp:progress-changed` and `cwp:lesson-complete` (from lib/student.ts) still
 * carry the stored progress; this one carries the moment itself.
 */
export const QUIZ_RESULT_EVENT = "cwp:quiz-result";

export interface QuizResultDetail {
  passed: boolean;
  score: number;
  total: number;
}

export function emitQuizResult(detail: QuizResultDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<QuizResultDetail>(QUIZ_RESULT_EVENT, { detail }));
}

/**
 * How far through the chapter the reader is, 0 to 1. Measured against
 * `.learn-main` (header, body, quiz and pager) rather than the document, so
 * the site footer does not count as unread lesson.
 */
export function readingProgress(): number {
  const main = document.querySelector<HTMLElement>(".learn-main");
  if (!main) return 0;
  const rect = main.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  if (travel <= 0) return 1;
  return Math.min(1, Math.max(0, -rect.top / travel));
}
