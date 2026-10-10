import { Reveal } from "@/components/Reveal";

interface LessonSectionProps {
  /** Must match a heading id authored in the chapter's `headings` array.
   *  scripts/validate-learn-nav.mjs fails the build if it does not. */
  id: string;
  title: string;
  children: React.ReactNode;
  /** Stagger for the reveal animation. */
  delay?: number;
}

/**
 * A titled section inside a chapter body.
 *
 * Routes through Reveal rather than re-implementing whileInView inline — the
 * seventeen hand-written copies across the lesson files each dropped Reveal's
 * useReducedMotion guard.
 */
export function LessonSection({ id, title, children, delay }: LessonSectionProps) {
  return (
    <Reveal delay={delay} className="lr-section mt-14 md:mt-16">
      <section>
        {/* The small "01" above each title is a CSS counter (globals.css reader
            block), so it needs no prop and cannot drift from the order. */}
        <h2
          id={id}
          className="lr-section-title home-serif text-balance text-[1.55rem] leading-[1.18] tracking-[-0.01em] text-learn-strong md:text-[1.95rem]"
        >
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </section>
    </Reveal>
  );
}

/** Body paragraph with the standard measure and colour. */
export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-pretty text-[16px] leading-[1.75] text-learn-muted">{children}</p>;
}

/** Lead paragraph that opens a chapter. */
export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-pretty text-[17.5px] leading-[1.7] text-learn-ink/80 md:text-[18.5px]">{children}</p>
  );
}

/** Inline emphasis in the moss ink. */
export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-learn-strong">{children}</strong>;
}
