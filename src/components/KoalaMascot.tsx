"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";
import { motion } from "motion/react";
import { KodaBurstLayer, useKodaBurst, type BurstKind } from "@/components/koda/KodaBurst";
import { TypeLine } from "@/components/koda/TypeLine";
import { useIdlePause } from "@/components/koda/motion";
import { useKodaBody } from "@/components/koda/useKodaBody";

/**
 * Koda — the CodeWithPurpose koala. A floating companion that, when tapped, cycles through every pose from the brand set
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
 *
 * Once asked, the card stays REACHABLE rather than gone. Closing it used to be
 * a dead end for the rest of the page view — the only way back was a reload —
 * so anyone who dismissed it and then changed their mind had nowhere to go.
 * The speech bubble now carries a small "get them by email" action whenever the
 * ask has been settled without a sign-up, which keeps the popup one tap away
 * without going back to hijacking every tap. It is deliberately not shown to
 * people who already subscribed: they answered, and asking again is nagging.
 *
 * Motion, React Bits style (all transform-only, all skipped under reduced
 * motion — CSS loops via media queries, JS reactions inside their handlers):
 * Koda peeks up from the corner with a wave, floats and breathes while idle,
 * hops and leans on hover, squash-and-stretches into each new pose with a small
 * themed burst, types his lines out, braces when the page is flung past, and
 * does a happy wiggle when the reader comes back to the tab after a while.
 *
 * Page-aware, too. Each route opens with its own short line and a pose to
 * match (`PAGE_LINES` below), so Koda reads as part of the page he's on rather
 * than a sticker on top of it. Around that:
 * - reaching the bottom of a long page earns a hop and a sparkle (and, where
 *   the bubble sits in the margin, a "made it" line);
 * - hovering a primary call to action with a mouse makes him lean over to
 *   peek at it (`data-peek`, CSS only, so touch never triggers it);
 * - after a minute with no input at all he dozes off on the sleep pose with
 *   the odd drifting "z", and wakes with a hop on the next interaction;
 * - the 404 page has its own big, puzzled Koda (koda/KodaLost.tsx), and this
 *   one steps aside there via a `:has(.koala-lost)` rule in globals.css.
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
  /** The little celebration that plays as Koda lands in this pose. */
  burst: BurstKind;
}

// Ordered as a little arc: a hello, then Koda showing off the rest of the set.
const POSES: Pose[] = [
  { src: "/koala/koala-wave.png", line: "Hi, I'm Koda! Give me a tap 🐨", w: 523, h: 560, burst: "sparkle" },
  { src: "/koala/koala-heart.png", line: "We teach coding for free — made with a lot of love.", w: 507, h: 560, burst: "heart" },
  { src: "/koala/koala-read.png", line: "Psst… every one of our lessons is free. Go have a peek!", w: 464, h: 560, burst: "code" },
  { src: "/koala/koala-branch.png", line: "Every expert was once a total beginner. Promise.", w: 530, h: 560, burst: "leaf" },
  { src: "/koala/koala-hang.png", line: "Stuck on a bug? Hang in there. 🌿", w: 505, h: 560, burst: "leaf" },
  { src: "/koala/koala-climb.png", line: "Learning's just a curve you climb one branch at a time.", w: 539, h: 560, burst: "leaf" },
  { src: "/koala/koala-tree.png", line: "6,000+ students across 150+ countries. Wild, right?", w: 440, h: 560, burst: "leaf" },
  { src: "/koala/koala-sleep.png", line: "Even koalas nap after 20k minutes of teaching. 💤", w: 560, h: 355, burst: "zzz" },
];

/** Index into POSES by file name, so reordering the carousel stays safe. */
function poseIndex(file: string) {
  return Math.max(
    0,
    POSES.findIndex((p) => p.src.endsWith(file)),
  );
}

/**
 * The line (and pose) each section of the site opens with. Short and plain:
 * no promises and no figures, since these sit beside the page's own copy.
 * Keyed by the first path segment; anything unlisted gets the default hello.
 */
const PAGE_LINES: Record<string, { line: string; pose: string }> = {
  donate: { line: "Every bit keeps courses free 💚", pose: "koala-heart.png" },
  join: { line: "We'd love your help!", pose: "koala-wave.png" },
  courses: { line: "Pick something fun to learn?", pose: "koala-read.png" },
  learn: { line: "Pick something fun to learn?", pose: "koala-read.png" },
  contact: { line: "Say hi — we read everything.", pose: "koala-wave.png" },
  blog: { line: "Enjoy the story!", pose: "koala-read.png" },
  impact: { line: "The stories behind the numbers 🌏", pose: "koala-tree.png" },
  about: { line: "Meet the students behind the lessons!", pose: "koala-heart.png" },
  media: { line: "Pull up a seat — videos live here 🎬", pose: "koala-wave.png" },
  leaderboard: { line: "A little friendly competition 🏆", pose: "koala-climb.png" },
  dashboard: { line: "Your progress lives here 🌿", pose: "koala-climb.png" },
  toolkit: { line: "Grab a template and jot it down ✏️", pose: "koala-read.png" },
  login: { line: "Welcome — glad you're here!", pose: "koala-wave.png" },
  "sign-up": { line: "Welcome — glad you're here!", pose: "koala-wave.png" },
};

function pageGreeting(pathname: string | null) {
  const section = (pathname ?? "").split("/").filter(Boolean)[0] ?? "";
  const entry = Object.prototype.hasOwnProperty.call(PAGE_LINES, section)
    ? PAGE_LINES[section]
    : undefined;
  return entry
    ? { line: entry.line, index: poseIndex(entry.pose) }
    : { line: POSES[0].line, index: 0 };
}

const SLEEP_POSE = poseIndex("koala-sleep.png");
const BOTTOM_LINE = "You made it to the bottom! 🎉";
/** How long without any input before Koda dozes off. */
const NAP_AFTER_MS = 60_000;

const STORAGE_KEY = "cwp-koala-dismissed";
const SUBSCRIBED_KEY = "cwp-newsletter-v1";

/** Koda's thank-you after a sign-up. Looked up so reordering POSES is safe. */
const THANKS_POSE = Math.max(
  0,
  POSES.findIndex((p) => p.src.endsWith("koala-heart.png")),
);
const THANKS_LINE = "Thanks! Keep an eye on your inbox 💚";

/** Small envelope for the bubble's re-open action. */
function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" className="koala-bubble-action-icon" aria-hidden="true" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 4.5 L8 8.75 L14 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  const idleRef = useRef<HTMLSpanElement>(null);
  useIdlePause(idleRef);
  const pathname = usePathname();
  const [index, setIndex] = useState(() => pageGreeting(pathname).index);
  /** True until the first tap on this page: the bubble shows the page's line. */
  const [greeting, setGreeting] = useState(true);
  const [route, setRoute] = useState(pathname);
  const [napping, setNapping] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [taps, setTaps] = useState(0);
  const [special, setSpecial] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true); // default hidden until we check storage (avoids a flash)
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupSettled, setSignupSettled] = useState(true); // as above: assume asked until storage says otherwise
  /**
   * Tracked separately from `signupSettled`, which conflates two different
   * things: "already gave us their address" and "has been asked once on this
   * page". The re-open action needs to tell them apart — somebody who
   * subscribed must never be asked again, and somebody who closed the card
   * should be able to change their mind.
   */
  const [subscribed, setSubscribed] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const loadingPose = useRef(false);
  const { scope, hopY, squash, hop, wiggle } = useKodaBody();
  const { bursts, fire } = useKodaBurst();

  /**
   * A new page: switch to its pose and line and say it. Adjusting state while
   * rendering (rather than in an effect) is React's documented pattern for
   * "reset when a value changes" and avoids painting the old page's line for a
   * frame. Client navigations only — the first page is covered by the
   * initial state above.
   */
  if (route !== pathname) {
    setRoute(pathname);
    setIndex(pageGreeting(pathname).index);
    setGreeting(true);
    setSpecial(null);
    setNapping(false);
    if (!signupOpen) setBubble(true);
  }

  // Mirrors for the window listeners below, which must not re-subscribe on
  // every render just to read the latest value.
  const nappingRef = useRef(false);
  const signupOpenRef = useRef(false);
  useEffect(() => {
    nappingRef.current = napping;
    signupOpenRef.current = signupOpen;
  }, [napping, signupOpen]);

  /**
   * Nap after a minute with no input, wake on the next one. Any pointer, key,
   * touch or scroll counts as activity; the check runs every few seconds and
   * only while the tab is visible, so coming back to a tab never finds Koda
   * asleep the instant it appears. While napping a "z" drifts up now and then
   * (skipped under Reduce Motion, like every burst).
   */
  useEffect(() => {
    if (dismissed) return;
    let lastActive = Date.now();
    const onActivity = () => {
      lastActive = Date.now();
      if (!nappingRef.current) return;
      nappingRef.current = false;
      setNapping(false);
      hop(12);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") lastActive = Date.now();
    };
    const tick = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (nappingRef.current) {
        fire("zzz");
        return;
      }
      if (signupOpenRef.current || Date.now() - lastActive < NAP_AFTER_MS) return;
      nappingRef.current = true;
      setNapping(true);
      setBubble(false);
      fire("zzz");
    }, 5000);
    const events = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll", "wheel"] as const;
    for (const type of events) window.addEventListener(type, onActivity, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(tick);
      for (const type of events) window.removeEventListener(type, onActivity);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dismissed, hop, fire]);

  /**
   * Made it to the end: a hop and a sparkle, once per page, and only on pages
   * long enough for that to mean something. The line only joins in on wider
   * screens, where the bubble sits in the margin instead of over the footer.
   */
  useEffect(() => {
    if (dismissed) return;
    let cheered = false;
    let frame = 0;
    const checkBottom = () => {
      frame = 0;
      if (cheered) return;
      const doc = document.documentElement;
      if (doc.scrollHeight < window.innerHeight * 1.6) return;
      if (window.scrollY + window.innerHeight < doc.scrollHeight - 48) return;
      cheered = true;
      window.removeEventListener("scroll", onScroll);
      hop(14);
      fire("sparkle");
      if (signupOpenRef.current || window.matchMedia("(max-width: 640px)").matches) return;
      setSpecial(BOTTOM_LINE);
      setBubble(true);
    };
    const onScroll = () => {
      if (!frame && !cheered) frame = requestAnimationFrame(checkBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [dismissed, pathname, hop, fire]);

  /**
   * Peek at the page's main button: while a mouse is over a filled call to
   * action, Koda leans over towards it. Toggles `data-peek` on the root and
   * leaves the rest to CSS (which drops it under Reduce Motion). Touch and pen
   * are ignored, so a tap on a phone never sets it and leaves it stuck.
   */
  useEffect(() => {
    if (dismissed) return;
    const CTA = ".home-btn-fill, .home-btn-moss";
    const ctaFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest(CTA) : null;
    const onOver = (e: PointerEvent) => {
      const root = rootRef.current;
      const cta = ctaFrom(e.target);
      if (!root || e.pointerType !== "mouse" || !cta || root.contains(cta)) return;
      root.dataset.peek = "true";
    };
    const onOut = (e: PointerEvent) => {
      const root = rootRef.current;
      const cta = ctaFrom(e.target);
      if (!root || !cta) return;
      if (e.relatedTarget instanceof Node && cta.contains(e.relatedTarget)) return;
      delete root.dataset.peek;
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [dismissed]);

  // Welcome back: after a proper break from the tab (20s+), a hop and a wiggle.
  useEffect(() => {
    if (dismissed) return;
    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
      } else if (hiddenAt && Date.now() - hiddenAt > 20000) {
        hop(12);
        wiggle();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [dismissed, hop, wiggle]);

  // Only show once we've confirmed the visitor hasn't sent Koda away this
  // session. Storage can't be read during SSR, so this reads it on mount
  // — a legitimate external-store sync, not a cascading render.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (sessionStorage.getItem(STORAGE_KEY) !== "1") setDismissed(false);
    if (localStorage.getItem(SUBSCRIBED_KEY) !== "1") {
      setSignupSettled(false);
      setSubscribed(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Wave hello shortly after arriving (deferred inside a timer).
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setBubble(true), 1400);
    return () => clearTimeout(t);
  }, [dismissed]);

  // On phones the bubble sits over page content (the Courses hero image, for
  // one), so it says its line and then tucks away. Tapping Koda brings it
  // back, and each tap restarts the clock. Wider screens keep it, since there
  // it sits in the margin.
  useEffect(() => {
    if (!bubble || !window.matchMedia("(max-width: 640px)").matches) return;
    const t = setTimeout(() => setBubble(false), 6000);
    return () => clearTimeout(t);
  }, [bubble, taps, pathname]);

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
    setSubscribed(true); // stops the bubble ever offering it again

    clearHandOff();
    handOffTimer.current = setTimeout(() => {
      setSignupOpen(false);
      setGreeting(false);
      setIndex(THANKS_POSE);
      setSpecial(THANKS_LINE);
      setBubble(true);
      fire("heart");
      handOffTimer.current = null;
    }, 2400);
  }, [fire]);

  // The immersive lesson reader (/learn/<track>/<slug>) has its own bottom
  // pager and mobile bar — keep Koda out of the way there.
  const segments = (pathname ?? "").split("/").filter(Boolean);
  const isLessonReader = segments[0] === "learn" && segments.length >= 3;
  if (dismissed || isLessonReader) return null;

  const pose = POSES[napping ? SLEEP_POSE : index];
  const line = special ?? (greeting ? pageGreeting(pathname).line : pose.line);
  const shouldAskForEmail = canOfferSignup && !signupSettled;
  /**
   * The way back in. Offered only once the first ask is behind us — before
   * that the tap itself opens the card, so showing both would be two routes to
   * the same place — and never to somebody who has already subscribed.
   */
  const canReopenSignup = canOfferSignup && signupSettled && !subscribed;

  const reopenSignup = () => {
    setSignupOpen(true);
    setBubble(false);
  };

  const onTap = async () => {
    if (shouldAskForEmail) {
      setSignupOpen(true);
      setBubble(false);
      return;
    }
    if (loadingPose.current) return;
    loadingPose.current = true;
    const t = taps + 1;
    const next = (index + 1) % POSES.length;
    // Decode only the requested pose; keep the current image visible while it loads.
    const image = new Image();
    image.src = POSES[next].src;
    try { await image.decode(); } catch { return; } finally { loadingPose.current = false; }
    setGreeting(false);
    setTaps(t);
    setIndex(next);
    setBubble(true);
    squash();
    fire(POSES[next].burst);
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
    <div className="koala-mascot" ref={rootRef} data-napping={napping ? "true" : undefined}>
      {signupOpen && (
        <NewsletterPopup onClose={closeSignup} onSubscribed={onSubscribed} />
      )}

      {bubble && !signupOpen && (
        <div className="koala-bubble">
          {/* The live region wraps the LINE only. With the button inside it,
              every pose change re-announced the action alongside the new line,
              which is noise on a control that has not changed. The region
              itself is TypeLine's visually hidden copy of the full line, so it
              is announced once rather than letter by letter as it types. */}
          <p className="koala-bubble-text">
            <span className="koala-bubble-name" aria-hidden="true">Koda</span>
            <TypeLine text={line} animateOnMount srPrefix="Koda: " speed={18} />
          </p>

          {canReopenSignup && (
            <button type="button" className="koala-bubble-action" onClick={reopenSignup}>
              <MailIcon />
              Get the lessons by email
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        className="koala-btn"
        onClick={onTap}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hop();
        }}
        aria-expanded={shouldAskForEmail ? signupOpen : undefined}
        aria-label={
          shouldAskForEmail
            ? "Koda the koala — tap to get the free lessons by email"
            : "Koda the koala — tap for a little encouragement"
        }
      >
        {/* Layers, so each motion owns its own transform: the peek-in entrance,
            the hover hop, the CSS idle float/breath, then the tap squash. */}
        <span className="koala-layer koala-peek-in">
          <motion.span className="koala-layer koala-hop" style={{ y: hopY }}>
            <span ref={idleRef} className="koala-layer koala-idle">
              <motion.span ref={scope} className="koala-layer koala-squash">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="koala-img"
                  src={pose.src}
                  alt="Koda, the CodeWithPurpose koala"
                  width={pose.w}
                  height={pose.h}
                  draggable={false}
                  /* The requested pose is decoded before changing the source. */
                  decoding="sync"
                />
              </motion.span>
            </span>
          </motion.span>
          <KodaBurstLayer bursts={bursts} spread={0.7} />
        </span>
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
