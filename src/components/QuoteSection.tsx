import CountUp from "@/components/reactbits/CountUp";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { COURSES_HREF, DONATE_HREF } from "@/lib/links";
import { STATS } from "@/lib/stats";

const PROOF_CARDS = [
  { ...STATS.countries, body: "Countries where students are already learning with us." },
  { ...STATS.students, body: "Students reached with free, real coding education worldwide." },
  { figure: "Free", body: "Always. Every course, every resource. No cost, no strings attached." },
] as const;

export function QuoteSection() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="rounded-xl bg-[#1e3c2c] px-5 py-12 text-center sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]">
          <p className="home-serif text-base text-[#dbefdb] md:text-lg">
            Free education for every student, everywhere
          </p>
          <blockquote className="home-display mx-auto mt-6 max-w-[70.5rem] text-[1.75rem] leading-[1.1] text-[#f9f9f9] md:text-[2.5rem] lg:text-[3.25rem]">
            {/* See HeroSection: with the <br> hidden below sm this read
                "a right,not a privilege". */}
            <ScrollReveal text={"Education is a right,\nnot a privilege."} />
          </blockquote>
          <a
            href={COURSES_HREF}
            className="home-arrow-link mt-12 justify-center !text-[#dbefdb] md:mt-20"
          >
            Explore courses <span className="home-arrow">→</span>
          </a>
        </div>
        <div className="mt-4 grid gap-2.5 md:mt-6 md:grid-cols-3">
          {PROOF_CARDS.map((card) => (
            <div
              key={card.body}

              className="home-card home-lift rounded-xl px-5 py-8 sm:px-8 sm:py-12"
            >
              <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[3.5rem]">
                {"to" in card ? <CountUp to={card.to} suffix={card.suffix} /> : card.figure}
              </p>
              <p className="mt-3 text-sm leading-snug text-[var(--home-ink-soft)] md:text-base">
                {card.body}
              </p>
            </div>
          ))}
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
