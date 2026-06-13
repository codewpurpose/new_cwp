import { ABOUT_HREF } from "@/lib/links";
import { WaitlistButton } from "@/components/WaitlistButton";

const HERO_STATS = [
  { value: "4,000+", label: "Students Reached" },
  { value: "130+", label: "Countries" },
  { value: "30+", label: "Languages Taught" },
  { value: "15,000", label: "Minutes of Teaching" },
];

export function HeroSection() {
  return (
    <section className="pt-8 md:pt-[3.69rem]">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <h1 className="home-serif text-center text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
          Talent Is Everywhere.
          <br className="hidden sm:block" /> Opportunity Isn&apos;t.
        </h1>
        <p className="mx-auto mt-5 max-w-[44rem] text-center text-lg text-[#636363]">
          We&apos;re students teaching students real coding skills in 130+
          countries. Completely free, forever. No catch, no fine print.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <WaitlistButton
            location="hero"
            autoOpenAtScrollFraction={0.4}
            className="home-btn home-btn-fill"
          >
            Start Learning Free
          </WaitlistButton>
          <a href={ABOUT_HREF} className="home-btn home-btn-outline">
            Our Story
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="home-card rounded-xl px-4 py-5 text-center md:px-6 md:py-6"
            >
              <p className="home-serif text-[1.5rem] leading-none text-[#3e7f5c] md:text-[2rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] text-[#636363] md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
