"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { KodaBurstLayer, useKodaBurst, type BurstKind } from "@/components/koda/KodaBurst";
import { TypeLine } from "@/components/koda/TypeLine";
import { prefersReducedMotion, useIdlePause } from "@/components/koda/motion";
import { useKodaBody } from "@/components/koda/useKodaBody";

const poses: { src: string; width: number; height: number; description: string; line: string; burst: BurstKind }[] = [
  { src: "/koala/koala-wave.png", width: 523, height: 560, description: "waving hello", line: "Hi, I'm Koda. Tap to say hello.", burst: "sparkle" },
  { src: "/koala/koala-heart.png", width: 507, height: 560, description: "holding a heart", line: "Glad you're here.", burst: "heart" },
  { src: "/koala/koala-read.png", width: 464, height: 560, description: "reading a book", line: "Let's learn something together.", burst: "code" },
  { src: "/koala/koala-sleep.png", width: 560, height: 355, description: "taking a nap", line: "A little break is good, too.", burst: "zzz" },
];

/** Maximum lean toward the cursor, in degrees (TiltedCard-style). */
const TILT = 10;

/**
 * The big Koda in the homepage hero.
 *
 * Layers, outermost first, so each kind of motion owns its own transform:
 *   tilt  — leans toward the cursor and hops on hover (motion values)
 *   idle  — CSS float, breathing and the odd head tilt (paused off screen)
 *   art   — squash-and-stretch on tap, plus a one-off hello on load (CSS)
 *
 * Every layer renders at rest on the server, so Koda is fully visible before
 * hydration and without JavaScript. Reduced motion is read only inside
 * handlers (see koda/motion.ts), so the markup never differs between server
 * and client; the CSS loops have their own media-query guards.
 */
export function KodaGreeting() {
  const [index, setIndex] = useState(0);
  // The other poses are mounted (hidden) shortly after load so a tap swaps to
  // an already-decoded image instead of flashing an empty box.
  const [warm, setWarm] = useState(false);
  const idleRef = useRef<HTMLSpanElement>(null);
  const { scope, hopY, squash, hop } = useKodaBody();
  const { bursts, fire } = useKodaBurst();
  useIdlePause(idleRef);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  useEffect(() => {
    const timer = setTimeout(() => setWarm(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const current = index % poses.length;
  const pose = poses[current];

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(dx * TILT * 2);
    rotateX.set(-dy * TILT * 1.6);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const onPointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    setWarm(true);
    if (event.pointerType === "mouse") hop();
  };

  const onClick = () => {
    const next = (index + 1) % poses.length;
    setWarm(true);
    setIndex(next);
    squash();
    fire(poses[next].burst);
  };

  return (
    <div className="koda-greeting">
      <ClickSpark sparkRadius={34} sparkSize={12}>
        <button
          type="button"
          className="koda-greeting-button"
          aria-label="Say hello to Koda the koala"
          onClick={onClick}
          onPointerEnter={onPointerEnter}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onFocus={() => setWarm(true)}
        >
          <motion.span className="koda-layer koda-tilt" style={{ rotateX, rotateY, y: hopY, transformPerspective: 700 }}>
            <span ref={idleRef} className="koda-layer koda-idle">
              <motion.span ref={scope} className="koda-layer koda-greeting-art">
                {poses.map((p, i) =>
                  i === current || warm ? (
                    <Image
                      key={p.src}
                      src={p.src}
                      alt={i === current ? `Koda the koala ${p.description}` : ""}
                      aria-hidden={i === current ? undefined : true}
                      data-active={i === current ? "true" : undefined}
                      width={p.width}
                      height={p.height}
                      priority={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                      draggable={false}
                    />
                  ) : null,
                )}
              </motion.span>
            </span>
          </motion.span>
          <KodaBurstLayer bursts={bursts} />
        </button>
      </ClickSpark>
      <p className="koda-greeting-line">
        <TypeLine text={pose.line} />
      </p>
    </div>
  );
}
