import { ABOUT_HREF } from "@/lib/links";
import { COURSES_HREF } from "@/lib/links";
import { chapterHref, getChapters } from "@/lib/learn-nav";
import { TRACK_ROUTES } from "@/lib/learn-routes";
import { KodaGreeting } from "@/components/KodaGreeting";
import BlurText from "@/components/reactbits/BlurText";
import CountUp from "@/components/reactbits/CountUp";
import Magnet from "@/components/reactbits/Magnet";
import DotGrid from "@/components/reactbits/DotGrid";
import { IMPACT_STATS } from "@/lib/stats";


/* The first Python chapter is written for complete beginners and is always
   unlocked (LessonGate), so it is the shortest path from here to learning. */
const FIRST_PYTHON_CHAPTER = getChapters("python")[0];
const FIRST_LESSON_HREF = FIRST_PYTHON_CHAPTER
  ? chapterHref("python", FIRST_PYTHON_CHAPTER.slug)
  : TRACK_ROUTES.python.href;

export function HeroSection() {
  return (
    /* overflow-x-clip: the stats marquee track is wider than the viewport by
       design; clip here so a transform never widens the page on phones. */
    <section className="overflow-x-clip pt-8 md:pt-[3.69rem]">
      {/* The dot field reacts to the pointer anywhere over the hero copy; it
          listens on this wrapper, and the copy sits above it. */}
      <div className="relative">
        <DotGrid />
      <div className="hero-message-grid relative mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="hero-message-copy">
          <BlurText
            as="h1"
            text={"Talent Is Everywhere.\nOpportunity Isn't."}
            className="home-display text-center text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]"
          />
          <p className="mx-auto mt-5 max-w-[44rem] text-center text-base text-[var(--home-ink-soft)] sm:text-lg">
            We&apos;re students teaching students real coding skills in 150+
            countries. Completely free, forever. No catch, no fine print.
          </p>
          <div className="hero-message-actions mt-8 flex flex-wrap items-center justify-center gap-2">
            <Magnet>
              <a href={COURSES_HREF} className="home-btn home-btn-fill">Explore courses</a>
            </Magnet>
            <a href={ABOUT_HREF} className="home-btn home-btn-outline">Our Story</a>
          </div>
          <p className="mt-4 text-center text-sm text-[var(--home-ink-quiet)]">
            Or{" "}
            <a href={FIRST_LESSON_HREF} className="home-arrow-link !inline-flex">
              jump straight into your first free lesson <span className="home-arrow">→</span>
            </a>
          </p>
        </div>
        <KodaGreeting />
      </div>
      </div>

      <div className="home-stats-roadmap mt-10 md:mt-14">
        <svg
          className="home-stats-route home-stats-route-wide"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="home-stats-route-base" d="M0 110 C40 78 64 78 100 110 S164 142 200 110 S264 78 300 110 S364 142 400 110 S464 78 500 110 S564 142 600 110 S664 78 700 110 S764 142 800 110 S864 78 900 110 S964 142 1000 110" />
          <path className="home-stats-route-center" d="M0 110 C40 78 64 78 100 110 S164 142 200 110 S264 78 300 110 S364 142 400 110 S464 78 500 110 S564 142 600 110 S664 78 700 110 S764 142 800 110 S864 78 900 110 S964 142 1000 110" />
        </svg>
        <svg
          className="home-stats-route home-stats-route-mobile"
          viewBox="0 0 64 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="home-stats-route-base" d="M32 0 C48 20 16 30 32 50 S48 80 32 100 S16 130 32 150 S48 180 32 200 S16 230 32 250 S48 280 32 300 S16 330 32 350 S48 380 32 400 S16 430 32 450 S48 480 32 500" />
          <path className="home-stats-route-center" d="M32 0 C48 20 16 30 32 50 S48 80 32 100 S16 130 32 150 S48 180 32 200 S16 230 32 250 S48 280 32 300 S16 330 32 350 S48 380 32 400 S16 430 32 450 S48 480 32 500" />
        </svg>
        <ul className="home-stats-list" aria-label="Impact statistics">
          {IMPACT_STATS.map((stat) => (
            <li key={stat.label} className="home-stat-stop">
              <div className="home-stat-content">
                <p className="home-stat-value home-serif">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="home-stat-label">{stat.label}</p>
              </div>
              <span className="home-stat-marker" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
