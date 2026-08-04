"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Koda's easter eggs. Five hidden ways to summon the koala, each deliberately
 * hard to stumble on. A sixth lives on the floating mascot itself (seven taps).
 *
 *   1. The Konami code (↑ ↑ ↓ ↓ ← → ← → B A)  → a koala downpour.
 *   2. Typing the word "koda" anywhere          → Koda spins into view.
 *   3. Clicking the header logo 5× in a row      → a koala peeks up from the floor.
 *   4. The browser console                       → a greeting + window.koda().
 *   5. Sitting idle for 45 seconds               → a koala quietly peeks in.
 *
 * All reveals are transient and pointer-events:none, so they never block the
 * page. Nothing here runs on the server.
 */

const POSES = [
  "/koala/koala-wave.png",
  "/koala/koala-heart.png",
  "/koala/koala-read.png",
  "/koala/koala-branch.png",
  "/koala/koala-hang.png",
  "/koala/koala-climb.png",
  "/koala/koala-tree.png",
];

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

// A stable pseudo-random so the rain looks lively without Math.random churn.
function rainDrops(seed: number) {
  const out = [];
  for (let i = 0; i < 22; i += 1) {
    const r = Math.abs(Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
    const r2 = Math.abs(Math.sin(seed + i * 78.233) * 12543.213) % 1;
    out.push({
      src: POSES[i % POSES.length],
      left: `${Math.round(r * 96)}%`,
      delay: `${(r2 * 1.6).toFixed(2)}s`,
      duration: `${(2.2 + r * 2.4).toFixed(2)}s`,
      spin: `${r2 > 0.5 ? "" : "-"}${Math.round(240 + r * 360)}deg`,
      size: `${Math.round(44 + r2 * 40)}px`,
    });
  }
  return out;
}

export function KoalaEasterEggs() {
  const [rainSeed, setRainSeed] = useState<number | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const [spin, setSpin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const clearTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    clearTimers.current.push(t);
  }, []);

  const showToast = useCallback(
    (msg: string) => {
      setToast(msg);
      after(3600, () => setToast(null));
    },
    [after],
  );

  const rain = useCallback(() => {
    setRainSeed(Date.now());
    showToast("🐨 Koala party! You found a secret.");
    after(5200, () => setRainSeed(null));
  }, [after, showToast]);

  const doSpin = useCallback(
    (msg: string) => {
      setSpin(true);
      showToast(msg);
      after(1900, () => setSpin(false));
    },
    [after, showToast],
  );

  const doPeek = useCallback(
    (msg?: string) => {
      setPeek("/koala/koala-climb.png");
      if (msg) showToast(msg);
      after(5600, () => setPeek(null));
    },
    [after, showToast],
  );

  // Console greeting + a callable hook for the truly curious.
  useEffect(() => {
    const w = window as unknown as { koda?: () => void };
    w.koda = () => {
      rain();
      return "🐨 hi.";
    };
    console.log(
      "%c🐨 Koda says hi!%c\nYou found the console. Type %ckoda()%c to summon a koala party.",
      "font-size:16px;font-weight:700;color:#3e7f5c",
      "color:#6b6255",
      "font-family:monospace;color:#1e3c2c;font-weight:700",
      "color:#6b6255",
    );
    return () => {
      delete w.koda;
    };
  }, [rain]);

  // Key-driven eggs: Konami code and the typed word "koda".
  useEffect(() => {
    let konamiIndex = 0;
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const lower = e.key.toLowerCase();
      konamiIndex =
        lower === KONAMI[konamiIndex].toLowerCase()
          ? konamiIndex + 1
          : lower === KONAMI[0].toLowerCase()
            ? 1
            : 0;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        rain();
      }
      if (e.key.length === 1 && /^[a-z]$/.test(lower)) {
        typed = (typed + lower).slice(-4);
        if (typed === "koda") {
          typed = "";
          doSpin("You said my name! 🐨💚");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rain, doSpin]);

  // Clicking the logo five times fast. The logo is a real link, so a plain
  // left-click is intercepted and its navigation deferred a beat — rapid clicks
  // cancel that and reach the egg; a lone click still goes home just after.
  // Modified clicks (⌘/ctrl/shift/middle — "open in new tab") pass through.
  useEffect(() => {
    let count = 0;
    let reset: ReturnType<typeof setTimeout>;
    let nav: ReturnType<typeof setTimeout>;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest(
        '[aria-label="CodeWithPurpose home"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      count += 1;
      clearTimeout(reset);
      clearTimeout(nav);
      if (count >= 5) {
        count = 0;
        doPeek("Peek-a-boo! 🐨");
        return;
      }
      reset = setTimeout(() => (count = 0), 1500);
      const href = link.getAttribute("href") || "/";
      nav = setTimeout(() => {
        window.location.href = href;
      }, 280);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(reset);
      clearTimeout(nav);
    };
  }, [doPeek]);

  // Idle for 45 seconds → a quiet peek. Re-arms after each reveal.
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    const arm = () => {
      clearTimeout(idle);
      idle = setTimeout(() => doPeek(), 45000);
    };
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true }));
    arm();
    return () => {
      clearTimeout(idle);
      events.forEach((ev) => window.removeEventListener(ev, arm));
    };
  }, [doPeek]);

  useEffect(() => {
    const timers = clearTimers;
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const drops = rainSeed !== null ? rainDrops(rainSeed) : [];

  return (
    <>
      {rainSeed !== null && (
        <div className="koala-egg-layer" aria-hidden="true">
          {drops.map((d, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className="koala-drop"
              src={d.src}
              alt=""
              style={{
                left: d.left,
                width: d.size,
                animationDelay: d.delay,
                animationDuration: d.duration,
                ["--koala-spin" as string]: d.spin,
              }}
            />
          ))}
        </div>
      )}
      {spin && (
        <div className="koala-spin-layer" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/koala/koala-heart.png" alt="" />
        </div>
      )}
      {peek && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="koala-peek" src={peek} alt="" aria-hidden="true" />
      )}
      {toast && <div className="koala-egg-toast">{toast}</div>}
    </>
  );
}
