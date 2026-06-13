import { COURSES_HREF, DONATE_HREF } from "@/lib/links";

export function QuoteSection() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="rounded-xl bg-[#1e3c2c] px-6 py-16 text-center md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]">
          <p className="home-serif text-base text-[#dbefdb] md:text-lg">
            Free education for every student, everywhere
          </p>
          <blockquote className="home-serif mx-auto mt-6 max-w-[70.5rem] text-[1.75rem] leading-[1.1] text-[#f9f9f9] md:text-[2.5rem] lg:text-[3.25rem]">
            Education is a right,
            <br className="hidden sm:block" />
            not a privilege.
          </blockquote>
          <a
            href={COURSES_HREF}
            className="home-arrow-link mt-12 justify-center !text-[#dbefdb] md:mt-20"
          >
            Start Learning Free <span className="home-arrow">→</span>
          </a>
        </div>
        <div className="mt-4 grid gap-2.5 md:mt-6 md:grid-cols-3">
          <div className="home-card home-lift rounded-xl px-8 py-12">
            <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[3.5rem]">
              130+
            </p>
            <p className="mt-3 text-sm text-[#636363] md:text-base">
              Countries where students are already learning with us.
            </p>
          </div>
          <div className="home-card home-lift rounded-xl px-8 py-12">
            <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[3.5rem]">
              4,000+
            </p>
            <p className="mt-3 text-sm text-[#636363] md:text-base">
              Students reached with free, real coding education worldwide.
            </p>
          </div>
          <div className="home-card home-lift rounded-xl px-8 py-12">
            <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[3.5rem]">
              Free
            </p>
            <p className="mt-3 text-sm text-[#636363] md:text-base">
              Always. Every course, every resource. No cost, no strings attached.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center md:mt-6">
          <a href={DONATE_HREF} className="home-btn home-btn-outline">
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}
