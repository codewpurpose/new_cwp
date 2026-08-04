"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Koda — the CodeWithPurpose koala. A floating companion that idles with a
 * gentle bob and, when tapped, cycles through every pose from the brand set
 * with a line of on-brand encouragement. Dismissable, remembers being sent
 * away for the session, hidden on the immersive lesson reader so it never
 * covers the pager, and fully still under prefers-reduced-motion (handled in
 * globals.css).
 */

interface Pose {
  src: string;
  line: string;
}

// Ordered as a little arc: a hello, then Koda showing off the rest of the set.
const POSES: Pose[] = [
  { src: "/koala/koala-wave.png", line: "Hi, I'm Koda! Give me a tap 🐨" },
  { src: "/koala/koala-heart.png", line: "We teach coding for free — made with a lot of love." },
  { src: "/koala/koala-read.png", line: "Psst… every one of our lessons is free. Go have a peek!" },
  { src: "/koala/koala-branch.png", line: "Every expert was once a total beginner. Promise." },
  { src: "/koala/koala-hang.png", line: "Stuck on a bug? Hang in there. 🌿" },
  { src: "/koala/koala-climb.png", line: "Learning's just a curve you climb one branch at a time." },
  { src: "/koala/koala-tree.png", line: "4,000+ students across 130+ countries. Wild, right?" },
  { src: "/koala/koala-sleep.png", line: "Even koalas nap after 15,000 minutes of teaching. 💤" },
];

const STORAGE_KEY = "cwp-koala-dismissed";

export function KoalaMascot() {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [bubble, setBubble] = useState(false);
  const [taps, setTaps] = useState(0);
  const [special, setSpecial] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true); // default hidden until we check storage (avoids a flash)

  // Only show once we've confirmed the visitor hasn't sent Koda away this
  // session. sessionStorage can't be read during SSR, so this reads it on mount
  // — a legitimate external-store sync, not a cascading render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sessionStorage.getItem(STORAGE_KEY) !== "1") setDismissed(false);
  }, []);

  // Wave hello shortly after arriving (deferred inside a timer).
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setBubble(true), 1400);
    return () => clearTimeout(t);
  }, [dismissed]);

  // The immersive lesson reader (/learn/<track>/<slug>) has its own bottom
  // pager and mobile bar — keep Koda out of the way there.
  const segments = (pathname ?? "").split("/").filter(Boolean);
  const isLessonReader = segments[0] === "learn" && segments.length >= 3;
  if (dismissed || isLessonReader) return null;

  const pose = POSES[index];

  const nextPose = () => {
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
      {bubble && (
        <div className="koala-bubble" role="status" aria-live="polite">
          <span className="koala-bubble-name">Koda</span>
          {special ?? pose.line}
        </div>
      )}
      <button
        type="button"
        className="koala-btn"
        onClick={nextPose}
        aria-label="Koda the koala — tap for a little encouragement"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          className="koala-img"
          src={pose.src}
          alt="Koda, the CodeWithPurpose koala"
          draggable={false}
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
