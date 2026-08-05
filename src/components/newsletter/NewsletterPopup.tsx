"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NEWSLETTER_SUBSCRIBE_PATH } from "@/lib/links";

/**
 * The little card Koda opens when a signed-out visitor taps him.
 *
 * Anchored beside the mascot rather than thrown up as a full-screen modal: this
 * is an offer, not a demand, and it shouldn't block the page to make its case.
 * It is still a dialog for assistive tech — Escape closes it, focus lands on the
 * field when it opens and returns to whatever opened it on the way out.
 */

type Status = "idle" | "sending" | "done" | "error";

interface NewsletterPopupProps {
  onClose: () => void;
  /** Called once the address is accepted, so the opener can stop re-offering. */
  onSubscribed: () => void;
}

export function NewsletterPopup({ onClose, onSubscribed }: NewsletterPopupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  // Send focus into the card, and hand it back to the opener on the way out.
  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => returnTo?.focus?.();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(NEWSLETTER_SUBSCRIBE_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { error?: string; warning?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "That didn't go through. Try again in a moment.");
        return;
      }

      setStatus("done");
      setMessage(data.warning ?? "");
      onSubscribed();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach us just now — check your connection.");
    }
  };

  return (
    <div className="koala-signup" role="dialog" aria-modal="false" aria-labelledby={headingId}>
      <button
        type="button"
        className="koala-signup-close"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>

      {status === "done" ? (
        <>
          <p className="koala-signup-title" id={headingId}>
            You&rsquo;re on the list 🐨
          </p>
          <p className="koala-signup-body">
            {message || "Check your inbox — Koda just sent you something."}
          </p>
        </>
      ) : (
        <>
          <p className="koala-signup-title" id={headingId}>
            Want the free lessons by email?
          </p>
          <p className="koala-signup-body">
            New chapters as we publish them. No spam, and you can leave whenever.
          </p>

          <form onSubmit={submit} className="koala-signup-form">
            <label className="sr-only" htmlFor={`${headingId}-email`}>
              Your email address
            </label>
            <input
              ref={inputRef}
              id={`${headingId}-email`}
              className="koala-signup-input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              autoComplete="email"
              required
              disabled={status === "sending"}
              aria-invalid={status === "error"}
            />
            <button
              type="submit"
              className="koala-signup-submit"
              disabled={status === "sending" || !email.trim()}
            >
              {status === "sending" ? "Sending…" : "Send it"}
            </button>
          </form>

          {status === "error" && (
            <p className="koala-signup-error" role="alert">
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
