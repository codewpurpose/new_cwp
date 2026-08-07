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

/** Small inline marks. Emoji are banned in reader-facing UI, and these scale with the text. */
function TickIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" fill="none">
      <path
        d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" fill="none">
      <path
        d="M4 4 L12 12 M12 4 L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px]" aria-hidden="true" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type OptionState = "idle" | "chosen" | "correct" | "wrong";

/**
 * What each option should look like, given where the learner is.
 *
 * The important rule is in the `checked && !passed` branch: a failed attempt
 * marks the options the learner actually chose and says nothing about the rest.
 * This used to highlight the correct answer on every failure, which meant the
 * first wrong attempt handed over the whole answer key and "Try again" became a
 * formality — the gate could not be failed twice.
 */
function optionState(
  { checked, passed, selected, isAnswer }: {
    checked: boolean;
    passed: boolean;
    selected: boolean;
    isAnswer: boolean;
  },
): OptionState {
  if (passed) {
    if (isAnswer) return "correct";
    return selected ? "wrong" : "idle";
  }
  if (checked && selected) return isAnswer ? "correct" : "wrong";
  return selected ? "chosen" : "idle";
}

const OPTION_TONE: Record<OptionState, string> = {
  idle: "border-learn-line bg-white",
  chosen: "border-learn-accent bg-learn-quiet",
  correct: "border-learn-success-line bg-learn-success-bg",
  wrong: "border-learn-danger-line bg-learn-danger-bg",
};

/** Never colour alone — every state that means something also says so. */
const OPTION_BADGE: Record<OptionState, { label: string; className: string } | null> = {
  idle: null,
  chosen: null,
  correct: { label: "Correct", className: "text-learn-success-fg" },
  wrong: { label: "Not this one", className: "text-learn-danger-fg" },
};

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

  /**
   * Keep the answers. Clearing them was the old behaviour and it threw away the
   * questions the learner got right along with the ones they did not, so a
   * retake meant re-answering four questions to change one.
   */
  const retry = () => setChecked(false);

  const allAnswered = quiz ? answers.every((a) => a >= 0) : true;

  return (
    <div className="mt-14">
      {quiz && (
        <section
          aria-labelledby={`${slug}-quiz-heading`}
          className="rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id={`${slug}-quiz-heading`} className="text-lg text-learn-strong md:text-xl">
              Quick check
            </h2>
            {passed && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-learn-success-bg px-3 py-1 text-xs font-medium text-learn-success-fg">
                <TickIcon />
                Passed
              </span>
            )}
          </div>
          <p className="mt-1 text-[14px] text-learn-muted">
            {passed
              ? "You have passed this one. Your answers are below, with the correct choice marked."
              : `Answer these to unlock the next chapter — ${quiz.passMark} of ${quiz.questions.length} to pass. You can retake it anytime.`}
          </p>

          <ol className="mt-6 space-y-7">
            {quiz.questions.map((question, qi) => {
              const groupId = `${slug}-q${qi}`;
              return (
                <li key={qi}>
                  <fieldset>
                    <legend
                      id={groupId}
                      className="text-[15px] font-medium text-learn-strong"
                    >
                      {qi + 1}. {question.q}
                    </legend>
                    <div className="mt-3 flex flex-col gap-2">
                      {question.options.map((opt, oi) => {
                        const state = optionState({
                          checked,
                          passed,
                          selected: answers[qi] === oi,
                          isAnswer: oi === question.answer,
                        });
                        const badge = OPTION_BADGE[state];
                        return (
                          <label
                            key={oi}
                            className={`flex cursor-pointer items-start gap-3 rounded-learn-md border-[0.5px] px-4 py-2.5 text-[14px] leading-[1.45] text-learn-strong transition-colors motion-reduce:transition-none has-[:focus-visible]:border-learn-accent has-[:disabled]:cursor-default ${OPTION_TONE[state]}`}
                          >
                            <input
                              type="radio"
                              name={groupId}
                              value={oi}
                              checked={answers[qi] === oi}
                              disabled={passed}
                              onChange={() =>
                                setAnswers((prevA) => prevA.map((a, i) => (i === qi ? oi : a)))
                              }
                              className="learn-focusable mt-0.5 h-4 w-4 shrink-0 accent-learn-accent"
                            />
                            <span className="flex-1">{opt}</span>
                            {badge && (
                              <span
                                className={`inline-flex shrink-0 items-center gap-1 text-[12px] font-medium ${badge.className}`}
                              >
                                {state === "correct" ? <TickIcon /> : <CrossIcon />}
                                {badge.label}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </li>
              );
            })}
          </ol>

          {/*
           * Results are announced. Pressing "Check answers" used to change the
           * score, the option colours and the pass state without any of it
           * reaching a screen reader.
           */}
          <div aria-live="polite" className="mt-6">
            {!passed && checked && (
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-learn-danger-fg">
                  <CrossIcon />
                  {score} of {quiz.questions.length} correct — you need {quiz.passMark} to
                  continue.
                </p>
                <button
                  type="button"
                  onClick={retry}
                  className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-5 py-2.5 text-sm font-medium text-learn-strong transition-colors hover:border-learn-line-strong motion-reduce:transition-none"
                >
                  Try again
                </button>
              </div>
            )}
            {passed && (
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-learn-success-fg">
                <TickIcon />
                Chapter complete. The next one is unlocked below.
              </p>
            )}
          </div>

          {!passed && !checked && (
            <div className="mt-6">
              <button
                type="button"
                onClick={check}
                disabled={!allAnswered}
                className="learn-focusable rounded-full bg-learn-inverse px-5 py-2.5 text-sm font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-40"
              >
                Check answers
              </button>
              {!allAnswered && (
                <p className="mt-2 text-[13px] text-learn-subtle">
                  Answer every question to check.
                </p>
              )}
            </div>
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
              <span className="learn-pager-direction">
                <LockIcon />
                Locked
              </span>
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
            <span className="learn-pager-direction">
              <LockIcon />
              Locked
            </span>
            <span className="learn-pager-title">Pass the quick check to finish</span>
          </span>
        )}
      </nav>
    </div>
  );
}
