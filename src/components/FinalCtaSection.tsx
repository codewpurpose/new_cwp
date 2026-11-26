import BlurText from "@/components/reactbits/BlurText";
import { DONATE_HREF, JOIN_HREF } from "@/lib/links";

export function FinalCtaSection() {
  return (
    <section id="join" className="scroll-mt-24 pb-16 md:pb-32">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
        <BlurText
          as="h2"
          text="Teach with CodeWithPurpose"
          delay={45}
          className="home-serif mx-auto max-w-4xl text-[1.75rem] leading-[1.08] text-balance md:text-[2.5rem]"
        />
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
          Help run a workshop, mentor a student, or contribute to a course.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a href={JOIN_HREF} className="home-btn home-btn-fill">Volunteer</a>
          <a href={DONATE_HREF} className="home-btn home-btn-outline">
            Donate
          </a>
        </div>
      </div>
    </section>
  );
}
