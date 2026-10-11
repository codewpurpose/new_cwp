"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimate } from "motion/react";
import { ArrowRight } from "lucide-react";
import { chapterHref } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { isLessonComplete, markLessonComplete } from "@/lib/student";
import type { Quiz } from "@/lib/quiz";
import { prefersReducedMotion } from "@/components/koda/motion";
import { emitQuizResult } from "@/components/learn/reader/events";
import { fireConfetti } from "@/components/learn/reader/confetti";

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
  idle: "border-learn-line bg-white hover:border-learn-line-strong hover:bg-[#fffdf9]",
  chosen: "border-learn-accent bg-learn-quiet-wash shadow-[inset_0_0_0_1px_var(--learn-accent)]",
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
  /** True only when the pass happened in this visit, which is what earns confetti. */
  const [freshPass, setFreshPass] = useState(false);
  const [answers, setAnswers] = useState<number[]>(quiz ? quiz.questions.map(() => -1) : []);
  const [checked, setChecked] = useState(false);
  /**
   * The one sentence the live region speaks per check. Kept separate from the
   * visible messages so a returning reader's "already passed" state is not
   * announced on load, and each result is announced exactly once.
   */
  const [announce, setAnnounce] = useState("");
  const [listRef, animate] = useAnimate<HTMLOListElement>();
  const celebrateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A lesson with no quiz auto-completes; otherwise reflect a prior pass.
    if (!quiz) markLessonComplete(track, slug);
    const done = quiz ? isLessonComplete(track, slug) : true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPassed(done);
  }, [track, slug, quiz]);

  // After a check: a small shake on the wrong picks, a pop on the right ones.
  // Runs after the commit so the data-state attributes are already in place.
  useEffect(() => {
    const list = listRef.current;
    if (!checked || !list || prefersReducedMotion()) return;
    if (list.querySelector('[data-state="wrong"]')) {
      animate('[data-state="wrong"]', { x: [0, -6, 6, -4, 3, 0] }, { duration: 0.42, ease: "easeOut" });
    }
    if (list.querySelector('[data-state="correct"]')) {
      animate('[data-state="correct"]', { scale: [1, 1.015, 1] }, { duration: 0.35, ease: "easeOut" });
    }
  }, [checked, animate, listRef]);

  // The chapter-complete moment: confetti from the celebration card.
  useEffect(() => {
    if (!freshPass) return;
    const card = celebrateRef.current;
    const rect = card?.getBoundingClientRect();
    const timer = window.setTimeout(() => {
      fireConfetti(rect ? { x: rect.left + 56, y: rect.top + rect.height / 2 } : undefined);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [freshPass]);

  const score = quiz ? answers.filter((a, i) => a === quiz.questions[i].answer).length : 0;
  const answeredCount = answers.filter((a) => a >= 0).length;
  const allAnswered = quiz ? answers.every((a) => a >= 0) : true;

  const check = () => {
    if (!quiz || !allAnswered || passed) return;
    setChecked(true);
    const total = quiz.questions.length;
    if (score >= quiz.passMark) {
      markLessonComplete(track, slug);
      setPassed(true);
      setFreshPass(true);
      setAnnounce(
        `${score} of ${total} correct. Chapter complete. ` +
          (next ? `Next chapter unlocked: ${next.title}.` : "You have finished this track."),
      );
    } else {
      setAnnounce(`${score} of ${total} correct. You need ${quiz.passMark} to continue. Try again when ready.`);
    }
    emitQuizResult({ passed: score >= quiz.passMark, score, total });
  };

  /**
   * Keep the answers. Clearing them was the old behaviour and it threw away the
   * questions the learner got right along with the ones they did not, so a
   * retake meant re-answering four questions to change one.
   *
   * Focus goes to the first question that was wrong, so a keyboard user lands
   * exactly where the work is instead of at the top of the form.
   */
  const retry = () => {
    if (!quiz) return;
    const firstWrong = quiz.questions.findIndex((question, i) => answers[i] !== question.answer);
    setChecked(false);
    setAnnounce("");
    if (firstWrong >= 0) {
      // After React has committed (the retry button this was called from is
      // gone by then, so focus would otherwise fall back to <body>).
      window.setTimeout(() => {
        document
          .querySelector<HTMLInputElement>(`input[name="${slug}-q${firstWrong}"]:checked`)
          ?.focus();
      }, 0);
    }
  };

  return (
    <div className="mt-16">
      {quiz && (
        <section
          aria-labelledby={`${slug}-quiz-heading`}
          className="lr-quiz rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="lr-kicker">Before you move on</p>
              <h2 id={`${slug}-quiz-heading`} className="home-serif mt-1 text-[1.45rem] text-learn-strong md:text-[1.7rem]">
                Quick check
              </h2>
            </div>
            {passed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-learn-success-bg px-3 py-1 text-xs font-medium text-learn-success-fg">
                <TickIcon />
                Passed
              </span>
            ) : (
              <span className="lr-quiz-count" aria-hidden="true">
                {quiz.questions.map((_, i) => (
                  <span key={i} className="lr-quiz-dot" data-on={answers[i] >= 0 ? "true" : undefined} />
                ))}
                <span className="ml-1.5">
                  {answeredCount}/{quiz.questions.length} answered
                </span>
              </span>
            )}
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-learn-muted">
            {passed
              ? "You have passed this one. Your answers are below, with the correct choice marked."
              : `Answer these to unlock the next chapter: ${quiz.passMark} of ${quiz.questions.length} to pass. You can retake it anytime.`}
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              check();
            }}
          >
            <ol ref={listRef} className="mt-6 space-y-7">
              {quiz.questions.map((question, qi) => {
                const groupId = `${slug}-q${qi}`;
                return (
                  <li key={qi}>
                    <fieldset>
                      <legend id={groupId} className="flex gap-2 text-[15.5px] font-medium leading-snug text-learn-strong">
                        <span className="lr-quiz-num" aria-hidden="true">{qi + 1}</span>
                        <span>
                          <span className="sr-only">Question {qi + 1}. </span>
                          {question.q}
                        </span>
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
                              data-state={state}
                              className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-learn-md border-[0.5px] px-4 py-2.5 text-[14.5px] leading-[1.45] text-learn-strong transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-learn-ink has-[:disabled]:cursor-default ${OPTION_TONE[state]}`}
                            >
                              <input
                                type="radio"
                                name={groupId}
                                value={oi}
                                checked={answers[qi] === oi}
                                disabled={passed}
                                onChange={() => {
                                  setAnswers((prevA) => prevA.map((a, i) => (i === qi ? oi : a)));
                                  // Changing an answer after a failed check starts a
                                  // fresh attempt rather than leaving stale marks.
                                  if (checked && !passed) {
                                    setChecked(false);
                                    setAnnounce("");
                                  }
                                }}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-learn-accent focus-visible:outline-none"
                              />
                              <span className="flex-1">{opt}</span>
                              {badge && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                                  className={`inline-flex shrink-0 items-center gap-1 text-[12px] font-medium ${badge.className}`}
                                >
                                  {state === "correct" ? <TickIcon /> : <CrossIcon />}
                                  {badge.label}
                                </motion.span>
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
             * Results are announced, once per check. Pressing "Check answers"
             * used to change the score, the option colours and the pass state
             * without any of it reaching a screen reader.
             */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {announce}
            </div>

            {!passed && checked && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="lr-quiz-retry mt-7"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/koala/koala-hang.png" alt="" width={505} height={560} className="lr-quiz-retry-koda" />
                <div className="min-w-0 flex-[1_1_12rem]">
                  <p className="flex items-start gap-1.5 text-sm font-medium text-learn-danger-fg [&>svg]:mt-0.5">
                    <CrossIcon />
                    {score} of {quiz.questions.length} correct. You need {quiz.passMark} to continue.
                  </p>
                  <p className="mt-1 text-[13.5px] text-learn-muted">
                    Nearly there. Your right answers are kept, so only change the ones marked.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={retry}
                  className="learn-focusable min-h-11 rounded-full border-[0.5px] border-learn-line-strong bg-white px-5 py-2.5 text-sm font-medium text-learn-strong transition-colors hover:border-learn-accent motion-reduce:transition-none"
                >
                  Try again
                </button>
              </motion.div>
            )}

            {!passed && !checked && (
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                  type="submit"
                  disabled={!allAnswered}
                  className="learn-focusable inline-flex min-h-11 items-center rounded-full bg-learn-inverse px-6 py-2.5 text-sm font-medium text-learn-heading-on-inverse transition-[transform,opacity] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 motion-reduce:transition-none"
                >
                  Check answers
                </button>
                <p className="text-[13px] text-learn-subtle">
                  {allAnswered
                    ? "All answered. Press Enter or the button to check."
                    : "Answer every question to check. Arrow keys move between choices."}
                </p>
              </div>
            )}
          </form>

          {passed && (
            <motion.div
              ref={celebrateRef}
              initial={freshPass ? { opacity: 0, y: 14, scale: 0.98 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lr-celebrate mt-8"
              data-fresh={freshPass ? "true" : undefined}
            >
              <motion.span
                className="lr-celebrate-koda"
                initial={freshPass ? { y: 10, rotate: -6 } : false}
                animate={{ y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={freshPass ? "/koala/koala-heart.png" : "/koala/koala-read.png"}
                  alt=""
                  width={freshPass ? 507 : 464}
                  height={560}
                />
              </motion.span>
              <div className="min-w-0 flex-1">
                <p className="lr-kicker">{freshPass ? "Chapter complete" : "Already passed"}</p>
                <p className="home-serif mt-1 text-[1.3rem] leading-tight text-learn-strong md:text-[1.45rem]">
                  {freshPass ? "Nice work. Koda is proud of you!" : "You have this one down."}
                </p>
                {freshPass && (
                  <p className="mt-1 text-[13.5px] text-learn-muted">
                    {score} of {quiz.questions.length} correct
                  </p>
                )}
                <div className="mt-4">
                  {next ? (
                    <Link href={chapterHref(track, next.slug)} className="lr-next-cta learn-focusable">
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] opacity-75">
                          Next chapter
                        </span>
                        <span className="line-clamp-2 block leading-snug">{next.title}</span>
                      </span>
                      <ArrowRight className="lr-next-cta-arrow size-4 shrink-0" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link href={endHref} className="lr-next-cta learn-focusable">
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] opacity-75">
                          You reached the end
                        </span>
                        <span className="line-clamp-2 block leading-snug">Browse all courses</span>
                      </span>
                      <ArrowRight className="lr-next-cta-arrow size-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
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
