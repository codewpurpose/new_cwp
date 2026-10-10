"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { KodaBurstLayer, useKodaBurst, type BurstKind } from "@/components/koda/KodaBurst";
import { TypeLine } from "@/components/koda/TypeLine";
import { useKodaBody } from "@/components/koda/useKodaBody";
import {
  QUIZ_RESULT_EVENT,
  readingProgress,
  type QuizResultDetail,
} from "@/components/learn/reader/events";

/**
 * Koda as a study buddy, docked at the foot of the lesson sidebar.
 *
 * The site-wide KoalaMascot deliberately hides on lesson pages; this is the
 * reader's own, quieter version. Rules it keeps:
 *
 * - It lives in the sidebar rail, which only exists at >=1200px. Below that the
 *   rail is display:none, so Koda can never sit on top of lesson text on a
 *   phone or tablet. (The quiz has its own inline Koda for the pass moment.)
 * - It only ever says generic study encouragement. It does not know what the
 *   chapter teaches and must never pretend to: no invented facts.
 * - It is client-only chrome. The server renders an empty slot, because the
 *   collapsed/expanded choice lives in localStorage and the greeting types out.
 * - Its chatter is not a live region. The quiz announces results itself, and a
 *   koala reading every tip aloud would be noise for a screen-reader user.
 * - Reduce Motion: no squash, hop or bursts (the shared koda helpers skip them)
 *   and lines appear whole instead of typing.
 */

type PoseId = "wave" | "read" | "heart" | "hang" | "climb" | "branch";

const POSES: Record<PoseId, { src: string; w: number; h: number; burst: BurstKind }> = {
  wave: { src: "/koala/koala-wave.png", w: 523, h: 560, burst: "sparkle" },
  read: { src: "/koala/koala-read.png", w: 464, h: 560, burst: "code" },
  heart: { src: "/koala/koala-heart.png", w: 507, h: 560, burst: "heart" },
  hang: { src: "/koala/koala-hang.png", w: 505, h: 560, burst: "leaf" },
  climb: { src: "/koala/koala-climb.png", w: 539, h: 560, burst: "leaf" },
  branch: { src: "/koala/koala-branch.png", w: 530, h: 560, burst: "leaf" },
};

const GREETINGS = [
  "Hi! I'll keep you company through this chapter.",
  "Welcome back. Let's take this one a section at a time.",
  "Ready when you are. Read at your own pace.",
];

/** Generic study habits only. Nothing here may claim anything about a lesson. */
const TIPS: { line: string; pose: PoseId }[] = [
  { line: "Try guessing what each example does before reading the explanation.", pose: "read" },
  { line: "A tricky paragraph often clicks on the second, slower read.", pose: "read" },
  { line: "Say the main idea of a section in your own words. If you can, you've got it.", pose: "branch" },
  { line: "Stretch, sip some water. The chapter will wait for you.", pose: "climb" },
  { line: "Got an editor open? Change one thing in an example and see what happens.", pose: "read" },
  { line: "A one-line note per section makes the quick check much easier.", pose: "branch" },
];

const STORAGE_KEY = "cwp-lesson-koda-collapsed";
const TIP_EVERY_MS = 90_000;

/* ---- collapsed preference: localStorage, read through an external store -- */

const listeners = new Set<() => void>();
/** Used when storage throws (private mode, blocked site data, full quota). */
let memoryCollapsed = false;
/**
 * The last write failed, so storage may still hold an older value than the
 * one the reader just chose. Not a permanent latch: the next successful
 * write, or another tab saving the preference, clears it. Read failures need
 * no flag at all; each read simply tries storage again.
 */
let writeFailed = false;

function readCollapsed(): boolean {
  if (writeFailed) return memoryCollapsed;
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return memoryCollapsed;
  }
}

function writeCollapsed(value: boolean) {
  memoryCollapsed = value;
  try {
    if (value) localStorage.setItem(STORAGE_KEY, "1");
    else localStorage.removeItem(STORAGE_KEY);
    writeFailed = false;
  } catch {
    writeFailed = true;
  }
  listeners.forEach((listener) => listener());
}

function subscribeCollapsed(listener: () => void) {
  // A storage event means another tab saved successfully, so storage is
  // current again and its value wins.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) writeFailed = false;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Small stable hash so each chapter gets the same greeting every visit. */
function pick<T>(list: readonly T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return list[Math.abs(h) % list.length];
}

export function LessonKoda() {
  const collapsed = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => null);
  if (collapsed === null) return <div className="lr-koda-slot" />;
  return (
    <div className="lr-koda-slot">
      {collapsed ? <CollapsedKoda /> : <DockedKoda />}
    </div>
  );
}

function CollapsedKoda() {
  return (
    <button
      type="button"
      className="lr-koda-pill learn-focusable"
      onClick={() => writeCollapsed(false)}
      aria-label="Show Koda, your study buddy"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSES.wave.src} alt="" width={28} height={30} className="lr-koda-pill-img" />
      <span>Koda</span>
    </button>
  );
}

function DockedKoda() {
  const pathname = usePathname() ?? "";
  const [state, setState] = useState<{ line: string; pose: PoseId }>(() => ({
    line: pick(GREETINGS, pathname),
    pose: "wave",
  }));
  const { scope, hopY, squash, hop, wiggle } = useKodaBody();
  const { bursts, fire } = useKodaBurst();
  const tipIndex = useRef(Math.abs(pathname.length * 7) % TIPS.length);
  const lastSpoke = useRef(0);
  const milestones = useRef({ half: false, end: false });
  /** After a quiz reaction, tips stay quiet so the celebration is not stepped on. */
  const quietUntil = useRef(0);

  const say = useCallback(
    (line: string, pose: PoseId, react = true) => {
      setState({ line, pose });
      lastSpoke.current = Date.now();
      if (react) {
        squash();
        fire(POSES[pose].burst);
      }
    },
    [squash, fire],
  );

  // Hello: a wiggle and a sparkle once the dock appears.
  useEffect(() => {
    lastSpoke.current = Date.now();
    const timer = window.setTimeout(() => {
      wiggle();
      fire("sparkle");
    }, 350);
    return () => window.clearTimeout(timer);
  }, [wiggle, fire]);

  // Quiz reactions.
  useEffect(() => {
    const onResult = (event: Event) => {
      const { passed } = (event as CustomEvent<QuizResultDetail>).detail;
      quietUntil.current = Date.now() + 60_000;
      if (passed) say("You passed! Chapter complete. That's real progress.", "heart");
      else say("So close. Look over the ones marked, then give it another go.", "hang");
    };
    window.addEventListener(QUIZ_RESULT_EVENT, onResult);
    return () => window.removeEventListener(QUIZ_RESULT_EVENT, onResult);
  }, [say]);

  // Reading milestones, checked at most once per animation frame.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      if (Date.now() < quietUntil.current) return;
      const p = readingProgress();
      if (!milestones.current.half && p >= 0.5 && p < 0.85) {
        milestones.current.half = true;
        say("Halfway through. Nice steady pace.", "climb");
      } else if (!milestones.current.end && p >= 0.85) {
        milestones.current.end = true;
        milestones.current.half = true;
        say("The quick check is just below. You've got this.", "branch");
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [say]);

  // An occasional tip while the reader is actually here.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() < quietUntil.current) return;
      if (Date.now() - lastSpoke.current < TIP_EVERY_MS) return;
      tipIndex.current = (tipIndex.current + 1) % TIPS.length;
      const tip = TIPS[tipIndex.current];
      say(tip.line, tip.pose, false);
    }, 15_000);
    return () => window.clearInterval(timer);
  }, [say]);

  const onTap = () => {
    tipIndex.current = (tipIndex.current + 1) % TIPS.length;
    const tip = TIPS[tipIndex.current];
    say(tip.line, tip.pose);
  };

  const pose = POSES[state.pose];

  return (
    <div className="lr-koda">
      <button
        type="button"
        className="lr-koda-art learn-focusable"
        onClick={onTap}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hop(6);
        }}
        aria-label="Koda the koala, tap for a study tip"
      >
        <motion.span className="lr-koda-layer" style={{ y: hopY }}>
          <motion.span ref={scope} className="lr-koda-layer lr-koda-squash">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lr-koda-img"
              src={pose.src}
              alt=""
              width={pose.w}
              height={pose.h}
              draggable={false}
            />
          </motion.span>
        </motion.span>
        <KodaBurstLayer bursts={bursts} spread={0.55} />
      </button>

      <div className="lr-koda-talk">
        <p className="lr-koda-bubble">
          <span className="lr-koda-name" aria-hidden="true">
            Koda
          </span>
          <TypeLine text={state.line} animateOnMount live={false} speed={20} />
        </p>
        <button
          type="button"
          className="lr-koda-hide learn-focusable"
          onClick={() => writeCollapsed(true)}
          aria-label="Hide Koda"
        >
          <X className="size-3" aria-hidden="true" />
          Hide
        </button>
      </div>
    </div>
  );
}
