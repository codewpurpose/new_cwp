"use client";

import { useCallback, useState } from "react";
import { NEWSLETTER_SUBSCRIBE_PATH } from "@/lib/links";

/**
 * The newsletter sign-up, minus any opinion about how it looks.
 *
 * Two things trigger it — Koda's popup and the footer form — and they should
 * fail identically. Keeping the fetch, the status machine and the error copy
 * here is what stops the two drifting into different behaviour for the same
 * server response.
 */

export type SubscribeStatus = "idle" | "sending" | "done" | "error";

export interface UseSubscribe {
  status: SubscribeStatus;
  /** A warning on success, or the reason on failure. Empty when there's nothing to say. */
  message: string;
  subscribe: (email: string) => Promise<boolean>;
  reset: () => void;
}

export function useSubscribe(onSuccess?: () => void): UseSubscribe {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  const subscribe = useCallback(
    async (email: string) => {
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
          return false;
        }

        setStatus("done");
        setMessage(data.warning ?? "");
        onSuccess?.();
        return true;
      } catch {
        setStatus("error");
        setMessage("Couldn't reach us just now — check your connection.");
        return false;
      }
    },
    [onSuccess],
  );

  return { status, message, subscribe, reset };
}
