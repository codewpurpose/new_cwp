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
    <Reveal delay={delay} className="mt-12">
      <section>
        <h2
          id={id}
          className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]"
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
  return <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">{children}</p>;
}

/** Lead paragraph that opens a chapter. */
export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.6] text-learn-muted">{children}</p>;
}

/** Inline emphasis in the moss ink. */
export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-learn-strong">{children}</strong>;
}
