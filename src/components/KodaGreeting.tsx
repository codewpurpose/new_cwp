"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const poses = [
  { src: "/koala/koala-wave.png", width: 523, height: 560, description: "waving hello", line: "Hi, I'm Koda. Tap to say hello." },
  { src: "/koala/koala-heart.png", width: 507, height: 560, description: "holding a heart", line: "Glad you're here." },
  { src: "/koala/koala-read.png", width: 464, height: 560, description: "reading a book", line: "Let's learn something together." },
  { src: "/koala/koala-sleep.png", width: 560, height: 355, description: "taking a nap", line: "A little break is good, too." },
];

export function KodaGreeting() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const pose = poses[index % poses.length];

  return (
    <div className="koda-greeting">
      <button type="button" className="koda-greeting-button" aria-label="Say hello to Koda the koala" onClick={() => setIndex((value) => value + 1)}>
        <motion.div
          key={index}
          className="koda-greeting-art"
          initial={reducedMotion ? false : { y: 0, rotate: 0 }}
          animate={reducedMotion ? { y: 0, rotate: 0 } : { y: [0, -8, 0], rotate: [0, -4, 3, 0] }}
          transition={{ duration: .8, ease: "easeInOut" }}
          whileHover={reducedMotion ? undefined : { y: -5, rotate: -3 }}
        >
          <Image src={pose.src} alt={`Koda the koala ${pose.description}`} width={pose.width} height={pose.height} priority />
        </motion.div>
      </button>
      <p className="koda-greeting-line" aria-live="polite">{pose.line}</p>
    </div>
  );
}
