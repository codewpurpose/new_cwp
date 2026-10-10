import BlurText from "@/components/reactbits/BlurText";
import CurvedLoop from "@/components/reactbits/CurvedLoop";
import Magnet from "@/components/reactbits/Magnet";
import { DONATE_HREF, COURSES_HREF } from "@/lib/links";
import { STATS, formatStat } from "@/lib/stats";

const LOOP_TEXT = [
  "Free forever",
  `${formatStat(STATS.students)} students`,
  `${formatStat(STATS.countries)} countries`,
  "Student-run",
  "Open source",
  "",
].join("  ✦  ");

export function FinalCtaSection() {
  return (
    <section id="join" className="scroll-mt-24 pb-16 md:pb-32">
      {/* Decorative: every fact in the band is stated elsewhere on the page. */}
      <div className="-mt-4 mb-6 overflow-hidden md:-mt-8 md:mb-10">
        <CurvedLoop
          text={LOOP_TEXT}
          className="home-serif fill-[#3e7f5c] text-[56px] md:text-[44px]"
        />
      </div>
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
        <BlurText
          as="h2"
          text="Join 5,000+ students across 150 countries already learning with us."
          delay={45}
          className="home-serif mx-auto max-w-4xl text-[1.75rem] leading-[1.08] text-balance md:text-[2.5rem]"
        />
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
          Start learning today, or help us keep the courses free.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Magnet>
            <a href={COURSES_HREF} className="home-btn home-btn-fill">Explore courses</a>
          </Magnet>
          <a href={DONATE_HREF} className="home-btn home-btn-outline">
            Support Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}
