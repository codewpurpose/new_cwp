"use client";

import { useEffect, useState } from "react";

const PROOF_POINTS = [
  "Free forever",
  "4,000+ students",
  "130+ countries",
  "30+ languages",
  "15,000 minutes taught",
  "Student-run",
  "Real projects",
];

export function ProofPointStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % PROOF_POINTS.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="proof-point-strip" aria-live="polite" aria-atomic="true">
      <span aria-hidden="true">✦</span>
      <span key={PROOF_POINTS[index]} className="proof-point-text">{PROOF_POINTS[index]}</span>
      <span aria-hidden="true">✦</span>
    </div>
  );
}
