import { ABOUT_HREF } from "@/lib/links";
import { COURSES_HREF } from "@/lib/links";
import { KodaGreeting } from "@/components/KodaGreeting";

const HERO_STATS = [
  { value: "5,000+", label: "Students Reached" },
  { value: "150+", label: "Countries" },
  { value: "30+", label: "Languages Taught" },
  { value: "20k", label: "Minutes of Teaching" },
  { value: "150k+", label: "Total Students Reached" },
];

export function HeroSection() {
  return (
    /* overflow-x-clip: the stats marquee track is wider than the viewport by
       design; clip here so a transform never widens the page on phones. */
    <section className="overflow-x-clip pt-8 md:pt-[3.69rem]">
      <div className="hero-message-grid mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="hero-message-copy">
          <h1 className="home-display text-center text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
            Talent Is Everywhere.{" "}<br className="hidden sm:block" />Opportunity Isn&apos;t.
          </h1>
          <p className="mx-auto mt-5 max-w-[44rem] text-center text-base text-[var(--home-ink-soft)] sm:text-lg">
            We&apos;re students teaching students real coding skills in 150+
            countries. Completely free, forever. No catch, no fine print.
          </p>
          <div className="hero-message-actions mt-8 flex flex-wrap items-center justify-center gap-2">
            <a href={COURSES_HREF} className="home-btn home-btn-fill">Explore courses</a>
            <a href={ABOUT_HREF} className="home-btn home-btn-outline">Our Story</a>
          </div>
        </div>
        <KodaGreeting />
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
          {HERO_STATS.map((stat) => (
            <li key={stat.label} className="home-stat-stop">
              <div className="home-stat-content">
                <p className="home-stat-value home-serif">{stat.value}</p>
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
