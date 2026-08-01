import { DONATE_HREF, LEARN_HREF } from "@/lib/links";

export function FinalCtaSection() {
  return (
    <section id="join" className="scroll-mt-24 pb-16 md:pb-32">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
        <h2 className="text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:text-[2.5rem] md:leading-[0.98]">
          Join 4,000+ students across 130 countries already learning with us.
        </h2>
        <p className="mt-4 text-[#636363]">
          Free. Forever. Start learning today or support our mission to bring
          coding education to every student, everywhere.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a href={LEARN_HREF} className="home-btn home-btn-fill">Explore courses</a>
          <a href={DONATE_HREF} className="home-btn home-btn-outline">
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}
