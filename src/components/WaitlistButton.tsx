"use client";

import { useEffect, useId, useRef, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AUTO_OPENED_KEY = "cwp-start-learning-auto-opened";
const JOINED_KEY = "cwp-start-learning-joined";

function hasSessionFlag(key: string) {
  try {
    return window.sessionStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

function setSessionFlag(key: string) {
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // ignore
  }
}

function isPastScrollFraction({
  scrollY,
  scrollHeight,
  innerHeight,
  fraction,
}: {
  scrollY: number;
  scrollHeight: number;
  innerHeight: number;
  fraction: number;
}) {
  const total = scrollHeight - innerHeight;
  return !(total <= 0) && scrollY / total >= fraction;
}

type SubmitState = "idle" | "submitting" | "error" | "ok";

export function WaitlistButton({
  location,
  className,
  children,
  onOpen,
  autoOpenAtScrollFraction,
}: {
  location: string;
  className?: string;
  children?: React.ReactNode;
  onOpen?: () => void;
  autoOpenAtScrollFraction?: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const headingId = useId();
  const inputId = useId();
  const errorId = useId();

  useEffect(() => {
    if (
      autoOpenAtScrollFraction === undefined ||
      hasSessionFlag(AUTO_OPENED_KEY) ||
      hasSessionFlag(JOINED_KEY)
    ) {
      return;
    }
    let frame = 0;
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = 0;
    };
    const check = () => {
      frame = 0;
      if (
        isPastScrollFraction({
          scrollY: window.scrollY,
          scrollHeight: document.documentElement.scrollHeight,
          innerHeight: window.innerHeight,
          fraction: autoOpenAtScrollFraction,
        })
      ) {
        cleanup();
        if (
          !hasSessionFlag(JOINED_KEY) &&
          !document.querySelector("dialog[open]")
        ) {
          setSessionFlag(AUTO_OPENED_KEY);
          onOpen?.();
          dialogRef.current?.showModal();
        }
      }
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(check);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return cleanup;
  }, [autoOpenAtScrollFraction, location, onOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Enter a valid email address.");
      setState("error");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setState("error");
        return;
      }
      setState("ok");
      setSessionFlag(JOINED_KEY);
    } catch {
      setError("Network error. Try again.");
      setState("error");
    }
  };

  const submitting = state === "submitting";

  return (
    <>
      {children !== undefined && (
        <button
          type="button"
          className={className}
          onClick={() => {
            onOpen?.();
            dialogRef.current?.showModal();
          }}
        >
          {children}
        </button>
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        className="waitlist-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="relative p-6 md:p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-xl text-[#818181] hover:bg-[#f2f2f2] hover:text-[#0a0e19]"
          >
            {"×"}
          </button>
          {state === "ok" ? (
            <div role="status">
              <h2 id={headingId} className="pr-8 text-2xl font-medium">
                You&apos;re ready to learn.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                We&apos;ll send course links to{" "}
                <span className="text-[#0a0e19]">{email.trim()}</span> so you
                can start learning free today.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 id={headingId} className="pr-8 text-2xl font-medium">
                Start learning free
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                Enter your email and we&apos;ll send you links to our free
                courses. No payment required. Ever.
              </p>
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state === "error") {
                    setState("idle");
                  }
                }}
                aria-invalid={state === "error"}
                aria-describedby={state === "error" ? errorId : undefined}
                placeholder="you@school.edu"
                disabled={submitting}
                className="mt-5 w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2 text-base text-[#0a0e19] placeholder:text-[#818181] focus:outline-2 focus:outline-[#0a0e19] disabled:opacity-60"
              />
              {state === "error" && (
                <p id={errorId} role="alert" className="mt-2 text-sm text-[#b42318]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting || !email.trim()}
                className="mt-4 w-full cursor-pointer rounded-lg border border-[#0a0e19] bg-[#0a0e19] px-3 py-2 text-base text-white transition-colors hover:bg-[#1a2030] disabled:cursor-default disabled:opacity-60"
              >
                {submitting ? "Signing up…" : "Start Learning Free"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
