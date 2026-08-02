import { DONATE_HREF, COURSES_HREF } from "@/lib/links";

export function FinalCtaSection() {
  return (
    <section id="join" className="scroll-mt-24 pb-16 md:pb-32">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
        <h2 className="home-serif mx-auto max-w-4xl text-[1.75rem] leading-[1.08] md:text-[2.5rem]">
          Join 4,000+ students across 130 countries already learning with us.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
          Free. Forever. Start learning today or support our mission to bring
          coding education to every student, everywhere.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a href={COURSES_HREF} className="home-btn home-btn-fill">Explore courses</a>
          <a href={DONATE_HREF} className="home-btn home-btn-outline">
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}
