"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapterHref } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { isLessonComplete, markLessonComplete } from "@/lib/student";
import type { Quiz } from "@/lib/quiz";

interface Adjacent {
  slug: string;
  title: string;
}

interface LessonQuizProps {
  track: LearnTrackId;
  slug: string;
  quiz: Quiz | null;
  prev: Adjacent | null;
  next: Adjacent | null;
  endHref: string;
}

export function LessonQuiz({ track, slug, quiz, prev, next, endHref }: LessonQuizProps) {
  const [passed, setPassed] = useState(false);
  const [answers, setAnswers] = useState<number[]>(quiz ? quiz.questions.map(() => -1) : []);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // A lesson with no quiz auto-completes; otherwise reflect a prior pass.
    if (!quiz) markLessonComplete(track, slug);
    const done = quiz ? isLessonComplete(track, slug) : true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPassed(done);
  }, [track, slug, quiz]);

  const score = quiz ? answers.filter((a, i) => a === quiz.questions[i].answer).length : 0;

  const check = () => {
    if (!quiz) return;
    setChecked(true);
    if (score >= quiz.passMark) {
      markLessonComplete(track, slug);
      setPassed(true);
    }
  };

  const retry = () => {
    setChecked(false);
    setAnswers(quiz ? quiz.questions.map(() => -1) : []);
  };

  const allAnswered = quiz ? answers.every((a) => a >= 0) : true;

  return (
    <div className="mt-14">
      {quiz && (
        <section className="rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg text-learn-strong md:text-xl">Quick check</h2>
            {passed && (
              <span className="rounded-full bg-learn-quiet px-3 py-1 text-xs font-medium text-learn-accent-text">
                ✓ Passed
              </span>
            )}
          </div>
          <p className="mt-1 text-[14px] text-learn-muted">
            Answer these to unlock the next chapter. You can retake it anytime.
          </p>

          <ol className="mt-6 space-y-6">
            {quiz.questions.map((question, qi) => (
              <li key={qi}>
                <p className="text-[15px] font-medium text-learn-strong">
                  {qi + 1}. {question.q}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {question.options.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    const isAnswer = oi === question.answer;
                    let tone = "border-learn-line bg-white";
                    if (checked && selected && isAnswer) tone = "border-learn-accent bg-learn-quiet";
                    else if (checked && selected && !isAnswer) tone = "border-learn-code-err bg-learn-danger-bg";
                    else if (checked && isAnswer) tone = "border-learn-accent bg-learn-quiet";
                    else if (selected) tone = "border-learn-accent bg-learn-quiet";
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={passed}
                        onClick={() =>
                          setAnswers((prevA) => prevA.map((a, i) => (i === qi ? oi : a)))
                        }
                        className={`learn-focusable rounded-learn-md border-[0.5px] px-4 py-2.5 text-left text-[14px] leading-[1.45] text-learn-strong transition-colors ${tone} disabled:cursor-default`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>

          {!passed && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {!checked ? (
                <button
                  type="button"
                  onClick={check}
                  disabled={!allAnswered}
                  className="learn-focusable rounded-full bg-learn-inverse px-5 py-2.5 text-sm font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Check answers
                </button>
              ) : (
                <>
                  <span className="text-sm text-learn-code-err">
                    {score}/{quiz.questions.length} correct — you need {quiz.passMark} to continue.
                  </span>
                  <button
                    type="button"
                    onClick={retry}
                    className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-5 py-2.5 text-sm font-medium text-learn-strong"
                  >
                    Try again
                  </button>
                </>
              )}
            </div>
          )}
          {passed && (
            <p className="mt-6 text-sm font-medium text-learn-accent-text">
              Nice — chapter complete. The next one is unlocked below. 🐨
            </p>
          )}
        </section>
      )}

      {/* Pager — "next" stays locked until the quiz is passed. */}
      <nav className="learn-pager" aria-label="Chapter navigation">
        {prev ? (
          <Link href={chapterHref(track, prev.slug)} data-direction="prev" className="learn-pager-link">
            <span className="learn-pager-direction">&larr; Previous</span>
            <span className="learn-pager-title">{prev.title}</span>
          </Link>
        ) : (
          <span className="learn-pager-slot" aria-hidden="true" />
        )}

        {next ? (
          passed ? (
            <Link href={chapterHref(track, next.slug)} data-direction="next" className="learn-pager-link">
              <span className="learn-pager-direction">Next &rarr;</span>
              <span className="learn-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span
              data-direction="next"
              aria-disabled="true"
              className="learn-pager-link cursor-not-allowed opacity-55"
            >
              <span className="learn-pager-direction">🔒 Locked</span>
              <span className="learn-pager-title">Pass the quick check to unlock</span>
            </span>
          )
        ) : passed ? (
          <Link
            href={endHref}
            data-direction="next"
            className="learn-pager-link learn-on-inverse learn-focusable !border-transparent !bg-learn-inverse"
          >
            <span className="learn-pager-direction !text-learn-on-inverse opacity-80">You reached the end</span>
            <span className="learn-pager-title !text-learn-heading-on-inverse underline">Browse all courses</span>
          </Link>
        ) : (
          <span data-direction="next" aria-disabled="true" className="learn-pager-link cursor-not-allowed opacity-55">
            <span className="learn-pager-direction">🔒 Locked</span>
            <span className="learn-pager-title">Pass the quick check to finish</span>
          </span>
        )}
      </nav>
    </div>
  );
}
