"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";

/**
 * Koda — the CodeWithPurpose koala. A floating companion that idles with a
 * gentle bob and, when tapped, cycles through every pose from the brand set
 * with a line of on-brand encouragement. Dismissable, remembers being sent
 * away for the session, hidden on the immersive lesson reader so it never
 * covers the pager, and fully still under prefers-reduced-motion (handled in
 * globals.css).
 *
 * Koda is also where the newsletter lives. A signed-out visitor's first tap
 * opens the email card instead of a pose — the mascot is the friendliest thing
 * on the page to be asked by, and it costs us no extra chrome. Ask once: close
 * it, or subscribe, and every tap after that is the pose carousel again. People
 * who are already signed in never see it at all.
 */

interface Pose {
  src: string;
  line: string;
  /**
   * Intrinsic pixel size. These are not uniform — Koda asleep is landscape
   * while every other pose is portrait — so the pair has to travel with the
   * pose. Passing one fixed square for all eight would reserve the wrong box
   * and cause the very layout shift the attributes exist to prevent.
   */
  w: number;
  h: number;
}

// Ordered as a little arc: a hello, then Koda showing off the rest of the set.
const POSES: Pose[] = [
  { src: "/koala/koala-wave.png", line: "Hi, I'm Koda! Give me a tap 🐨", w: 523, h: 560 },
  { src: "/koala/koala-heart.png", line: "We teach coding for free — made with a lot of love.", w: 507, h: 560 },
  { src: "/koala/koala-read.png", line: "Psst… every one of our lessons is free. Go have a peek!", w: 464, h: 560 },
  { src: "/koala/koala-branch.png", line: "Every expert was once a total beginner. Promise.", w: 530, h: 560 },
  { src: "/koala/koala-hang.png", line: "Stuck on a bug? Hang in there. 🌿", w: 505, h: 560 },
  { src: "/koala/koala-climb.png", line: "Learning's just a curve you climb one branch at a time.", w: 539, h: 560 },
  { src: "/koala/koala-tree.png", line: "4,000+ students across 130+ countries. Wild, right?", w: 440, h: 560 },
  { src: "/koala/koala-sleep.png", line: "Even koalas nap after 15,000 minutes of teaching. 💤", w: 560, h: 355 },
];

const STORAGE_KEY = "cwp-koala-dismissed";
const SUBSCRIBED_KEY = "cwp-newsletter-v1";

/** Koda's thank-you after a sign-up. Looked up so reordering POSES is safe. */
const THANKS_POSE = Math.max(
  0,
  POSES.findIndex((p) => p.src.endsWith("koala-heart.png")),
);
const THANKS_LINE = "Thanks! Keep an eye on your inbox 💚";

/**
 * Clerk's hooks need a ClerkProvider above them, and the provider only mounts
 * when keys exist (see the root layout). Splitting on the build-time flag keeps
 * the hook out of the tree entirely when there is no provider to read.
 */
export function KoalaMascot() {
  return isClerkConfigured ? <KoalaWithAuth /> : <KoalaBase canOfferSignup />;
}

function KoalaWithAuth() {
  const { isLoaded, isSignedIn } = useUser();
  // Until Clerk resolves, assume signed in: briefly withholding the offer is a
  // far smaller error than pitching a newsletter at someone with an account.
  return <KoalaBase canOfferSignup={isLoaded && !isSignedIn} />;
}

function KoalaBase({ canOfferSignup }: { canOfferSignup: boolean }) {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [bubble, setBubble] = useState(false);
  const [taps, setTaps] = useState(0);
  const [special, setSpecial] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true); // default hidden until we check storage (avoids a flash)
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupSettled, setSignupSettled] = useState(true); // as above: assume asked until storage says otherwise

  // Only show once we've confirmed the visitor hasn't sent Koda away this
  // session. Storage can't be read during SSR, so this reads it on mount
  // — a legitimate external-store sync, not a cascading render.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (sessionStorage.getItem(STORAGE_KEY) !== "1") setDismissed(false);
    if (localStorage.getItem(SUBSCRIBED_KEY) !== "1") setSignupSettled(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Wave hello shortly after arriving (deferred inside a timer).
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setBubble(true), 1400);
    return () => clearTimeout(t);
  }, [dismissed]);

  const handOffTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHandOff = () => {
    if (handOffTimer.current) clearTimeout(handOffTimer.current);
    handOffTimer.current = null;
  };
  useEffect(() => clearHandOff, []);

  const closeSignup = useCallback(() => {
    clearHandOff();
    setSignupOpen(false);
    setSignupSettled(true); // asked once; from here on, tapping means poses
  }, []);

  /**
   * Subscribed. Leave the confirmation up long enough to be read, then close it
   * and hand the mascot back to its ordinary self — a thank-you on the heart
   * pose, and every tap after that is the carousel again. The visitor did what
   * was asked; Koda should stop asking without them having to dismiss anything.
   */
  const onSubscribed = useCallback(() => {
    try {
      localStorage.setItem(SUBSCRIBED_KEY, "1");
    } catch {
      /* private mode — fine, it just won't persist */
    }
    setSignupSettled(true);

    clearHandOff();
    handOffTimer.current = setTimeout(() => {
      setSignupOpen(false);
      setIndex(THANKS_POSE);
      setSpecial(THANKS_LINE);
      setBubble(true);
      handOffTimer.current = null;
    }, 2400);
  }, []);

  // The immersive lesson reader (/learn/<track>/<slug>) has its own bottom
  // pager and mobile bar — keep Koda out of the way there.
  const segments = (pathname ?? "").split("/").filter(Boolean);
  const isLessonReader = segments[0] === "learn" && segments.length >= 3;
  if (dismissed || isLessonReader) return null;

  const pose = POSES[index];
  const shouldAskForEmail = canOfferSignup && !signupSettled;

  const onTap = () => {
    if (shouldAskForEmail) {
      setSignupOpen(true);
      setBubble(false);
      return;
    }
    const t = taps + 1;
    setTaps(t);
    setIndex((i) => (i + 1) % POSES.length);
    setBubble(true);
    // Hidden reward for the persistent: a rare line every seventh tap.
    setSpecial(t % 7 === 0 ? "Okay okay — you really like me, huh? 🐨💚" : null);
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — fine, it just won't persist */
    }
  };

  return (
    <div className="koala-mascot">
      {signupOpen && (
        <NewsletterPopup onClose={closeSignup} onSubscribed={onSubscribed} />
      )}

      {bubble && !signupOpen && (
        <div className="koala-bubble" role="status" aria-live="polite">
          <span className="koala-bubble-name">Koda</span>
          {special ?? pose.line}
        </div>
      )}

      <button
        type="button"
        className="koala-btn"
        onClick={onTap}
        aria-expanded={shouldAskForEmail ? signupOpen : undefined}
        aria-label={
          shouldAskForEmail
            ? "Koda the koala — tap to get the free lessons by email"
            : "Koda the koala — tap for a little encouragement"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          className="koala-img"
          src={pose.src}
          alt="Koda, the CodeWithPurpose koala"
          width={pose.w}
          height={pose.h}
          draggable={false}
          decoding="async"
        />
      </button>

      <button
        type="button"
        className="koala-dismiss"
        onClick={dismiss}
        aria-label="Hide Koda for now"
      >
        &times;
      </button>
    </div>
  );
}
