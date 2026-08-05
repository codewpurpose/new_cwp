/**
 * Auto-drafted lesson quizzes.
 *
 * Each lesson's own section headings are written as claim-clauses (the house
 * voice rule), so they double as "the things this lesson established." A quiz
 * is drafted from them: the correct answer is one of this lesson's claims, and
 * the distractors are real claims pulled from *other* lessons — plausible, but
 * not what this lesson taught.
 *
 * Everything is deterministic (seeded from the slug), so the server and client
 * render the exact same options in the exact same order — no hydration drift.
 * These are DRAFTS meant for a human review pass, per the team's choice.
 */

import { getChapters } from "@/lib/learn-nav";
import type { LearnTrackId } from "@/lib/learn-types";
import { mulberry32, shuffled } from "@/lib/ml/random";

const TRACKS: LearnTrackId[] = [
  "python",
  "financial-literacy",
  "health-in-tech",
  "ml",
  "vibecoding",
];

/** Every heading-claim across the whole curriculum, used as a distractor pool. */
const ALL_CLAIMS: string[] = Array.from(
  new Set(
    TRACKS.flatMap((t) => getChapters(t).flatMap((c) => c.headings.map((h) => h.text))),
  ),
);

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}
export interface Quiz {
  questions: QuizQuestion[];
  passMark: number;
}

function seedFrom(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const MAX_QUESTIONS = 4;
const OPTIONS_PER_Q = 4;

export function getQuiz(track: LearnTrackId, slug: string): Quiz | null {
  const chapter = getChapters(track).find((c) => c.slug === slug);
  if (!chapter) return null;
  const claims = chapter.headings.map((h) => h.text);
  if (claims.length === 0) return null;

  const rand = mulberry32(seedFrom(`${track}/${slug}`));
  const pool = ALL_CLAIMS.filter((c) => !claims.includes(c));
  const corrects = shuffled(claims, rand).slice(0, Math.min(MAX_QUESTIONS, claims.length));

  const questions: QuizQuestion[] = corrects.map((correct) => {
    const distractors = shuffled(pool, rand).slice(0, OPTIONS_PER_Q - 1);
    const options = shuffled([correct, ...distractors], rand);
    return {
      q: "Which of these does this lesson establish?",
      options,
      answer: options.indexOf(correct),
    };
  });

  return { questions, passMark: Math.max(1, Math.ceil(questions.length * 0.67)) };
}
