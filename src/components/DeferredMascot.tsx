"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KoalaMascot = dynamic(() => import("@/components/KoalaMascot").then((module) => module.KoalaMascot), { ssr: false });

/** Give page content priority, and never initialise the floating mascot in the lesson reader. */
export function DeferredMascot() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lesson = /^\/learn\/[^/]+\/[^/]+/.test(pathname);
  useEffect(() => {
    if (lesson) return;
    const timer = window.setTimeout(() => setReady(true), 5000);
    return () => window.clearTimeout(timer);
  }, [lesson]);
  return ready && !lesson ? <KoalaMascot /> : null;
}
