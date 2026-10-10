"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { KodaBurstLayer, useKodaBurst } from "./KodaBurst";
import { TypeLine } from "./TypeLine";
import { useKodaBody } from "./useKodaBody";

/**
 * Koda on the 404 page: big, puzzled, and looking for the page with you.
 *
 * The corner mascot steps aside here (a `:has(.koala-lost)` rule in
 * globals.css), so this is the only Koda on screen. He tilts his head from
 * side to side with a few question marks bobbing over him (CSS loops, off with
 * Reduce Motion), and each tap moves him to another branch with a new line.
 *
 * Everything is server-rendered and visible as-is: the first line is typed
 * out only when it changes, never on mount, so a reader without JavaScript
 * sees the full sentence.
 */
const STEPS = [
  { src: "/koala/koala-branch.png", w: 530, h: 560, line: "Hmm, this page climbed away…" },
  { src: "/koala/koala-hang.png", w: 505, h: 560, line: "Not up this branch either…" },
  { src: "/koala/koala-climb.png", w: 539, h: 560, line: "Maybe higher? Nope. Still gone." },
  { src: "/koala/koala-read.png", w: 464, h: 560, line: "The buttons below know the way back." },
];

export function KodaLost() {
  const [step, setStep] = useState(0);
  const { scope, hopY, squash, hop } = useKodaBody();
  const { bursts, fire } = useKodaBurst();
  const current = STEPS[step];

  // Decode the other branches up front so a tap never paints a blank frame.
  useEffect(() => {
    for (const s of STEPS) {
      const img = new Image();
      img.src = s.src;
      void img.decode?.().catch(() => {});
    }
  }, []);

  const onTap = () => {
    setStep((s) => (s + 1) % STEPS.length);
    squash();
    fire("question");
  };

  return (
    <div className="koala-lost">
      <div className="koala-lost-bubble">
        <p className="koala-bubble-text">
          <span className="koala-bubble-name" aria-hidden="true">Koda</span>
          <TypeLine text={current.line} srPrefix="Koda: " speed={20} />
        </p>
      </div>

      <button
        type="button"
        className="koala-lost-btn"
        onClick={onTap}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hop(10);
        }}
        aria-label="Koda the koala, looking for the missing page. Tap to help him search."
      >
        <motion.span className="koala-layer" style={{ y: hopY }}>
          <span className="koala-layer koala-lost-tilt">
            <motion.span ref={scope} className="koala-layer koala-squash">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="koala-img"
                src={current.src}
                alt=""
                width={current.w}
                height={current.h}
                draggable={false}
              />
            </motion.span>
          </span>
        </motion.span>
        <span className="koala-lost-q koala-lost-q1" aria-hidden="true">?</span>
        <span className="koala-lost-q koala-lost-q2" aria-hidden="true">?</span>
        <span className="koala-lost-q koala-lost-q3" aria-hidden="true">?</span>
        <KodaBurstLayer bursts={bursts} />
      </button>
    </div>
  );
}
