"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * The step from the catalogue into a course.
 *
 * Clicking a course grows a moss panel out of the card until it fills the
 * screen, then navigates. The learning space's bar is the same moss, so the
 * panel hands straight over to it. About half a second, start to finish.
 *
 * It is an enhancement on an ordinary link: modified clicks (new tab, new
 * window), Reduce Motion, and no JavaScript all get a plain navigation. The
 * check for Reduce Motion happens in the click handler, not in render, so the
 * markup never differs between server and client.
 */

interface Entering {
  href: string;
  title: string;
  clip: string;
}

const EnterContext = createContext<(event: React.MouseEvent<HTMLAnchorElement>, href: string, title: string) => void>(
  () => {},
);

export function CourseEntryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [entering, setEntering] = useState<Entering | null>(null);
  const pushed = useRef(false);

  // Coming back with the browser's back button can restore this page from the
  // back/forward cache with the panel still drawn over it.
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setEntering(null);
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const go = useCallback(
    (href: string) => {
      if (pushed.current) return;
      pushed.current = true;
      router.push(href);
    },
    [router],
  );

  // Safety net in case the animation's completion callback never fires.
  useEffect(() => {
    if (!entering) return;
    const timeout = window.setTimeout(() => go(entering.href), 900);
    return () => window.clearTimeout(timeout);
  }, [entering, go]);

  const enter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string, title: string) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const source = event.currentTarget.closest("[data-course-card]") ?? event.currentTarget;
      const rect = source.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      event.preventDefault();
      pushed.current = false;
      router.prefetch(href);
      setEntering({
        href,
        title,
        clip: `inset(${Math.max(0, rect.top)}px ${Math.max(0, vw - rect.right)}px ${Math.max(0, vh - rect.bottom)}px ${Math.max(0, rect.left)}px round 22px)`,
      });
    },
    [router],
  );

  return (
    <EnterContext.Provider value={enter}>
      {children}
      {entering && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#1e3c2c] px-6 text-center text-[#fcf4e8]"
          initial={{ clipPath: entering.clip }}
          animate={{ clipPath: "inset(0px 0px 0px 0px round 0px)" }}
          transition={{ duration: 0.48, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => go(entering.href)}
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="home-mono text-[11px] uppercase tracking-[0.16em] text-[#9fd3a8]">Entering course</p>
            <p className="home-display mt-3 text-[2rem] leading-tight md:text-[2.75rem]">{entering.title}</p>
          </motion.div>
          {/* Only shows if the next page is slow to arrive. */}
          <motion.p
            className="home-mono absolute bottom-10 left-0 right-0 text-[12px] text-[#fcf4e8]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            Loading the course…
          </motion.p>
        </motion.div>
      )}
    </EnterContext.Provider>
  );
}

/** A link into a course that plays the entry transition when it can. */
export function CourseLink({
  href,
  title,
  className,
  children,
  ...rest
}: {
  href: string;
  /** Shown on the transition panel. */
  title: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "title">) {
  const enter = useContext(EnterContext);
  return (
    <Link href={href} className={className} onClick={(event) => enter(event, href, title)} {...rest}>
      {children}
    </Link>
  );
}
