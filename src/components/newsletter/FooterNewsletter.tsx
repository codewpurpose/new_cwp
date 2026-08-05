"use client";

import { useId, useState } from "react";
import { useSubscribe } from "@/components/newsletter/useSubscribe";

/**
 * Newsletter sign-up in the site footer.
 *
 * The primary way in. Koda's popup is the playful one — it only appears for
 * signed-out visitors, and only until they answer it once — which makes it a
 * poor sole entry point for a list we actually want people to join. This one is
 * on every page, for everyone, and stays put.
 */
export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const { status, message, subscribe } = useSubscribe();
  const id = useId();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    await subscribe(email);
  };

  return (
    <div>
      <h3 className="mb-3 text-xs opacity-60">Newsletter</h3>

      {status === "done" ? (
        <p className="text-xs leading-relaxed text-[var(--home-ink-soft)] xl:text-sm">
          {message || "You're on the list — check your inbox. 🐨"}
        </p>
      ) : (
        <>
          <p className="mb-3 text-xs leading-relaxed text-[var(--home-ink-soft)]">
            New chapters as we publish them. Free, like everything else here.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <label className="sr-only" htmlFor={id}>
              Your email address
            </label>
            <input
              id={id}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              autoComplete="email"
              required
              disabled={status === "sending"}
              aria-invalid={status === "error"}
              className="w-full rounded-full border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] px-3.5 py-2 text-xs text-[var(--home-ink)] placeholder:text-[var(--home-ink-quiet)] focus-visible:outline-2 focus-visible:outline-[var(--home-fern)]"
            />
            <button
              type="submit"
              disabled={status === "sending" || !email.trim()}
              className="rounded-full bg-[var(--home-moss)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--home-moss-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-2 text-[11px] leading-snug text-[#a13c28]" role="alert">
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
