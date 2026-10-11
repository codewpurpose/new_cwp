import Link from "next/link";
import BlurText from "@/components/reactbits/BlurText";
import CountUp from "@/components/reactbits/CountUp";
import { TopicCover, type TopicCoverVariant } from "@/components/TopicCover";
import { ABOUT_HREF } from "@/lib/links";

/**
 * The catalogue's opening. Copy is the page's existing hero; the three figures
 * are counted from the catalogue and the lesson graph by the page, never typed.
 */
export function CoursesHero({
  courses,
  chapters,
  enrolments,
  fan,
}: {
  courses: number;
  chapters: number;
  enrolments: number;
  /** Three covers fanned out beside the copy on wide screens. */
  fan: readonly [TopicCoverVariant, TopicCoverVariant, TopicCoverVariant];
}) {
  const stats = [
    { value: courses, label: "courses" },
    { value: chapters, label: "free interactive chapters" },
    { value: enrolments, label: "full courses on Udemy" },
  ];

  return (
    <section className="relative overflow-hidden border-b-[0.5px] border-[var(--grass-5)] bg-[linear-gradient(180deg,#e9f6e9_0%,#f3f9f0_55%,var(--home-page)_100%)]">
      <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-[85rem] items-center gap-12 px-5 pt-12 pb-14 md:px-10 md:pt-20 md:pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="home-mono text-[11px] uppercase tracking-[0.14em] text-[#3e7f5c]">
            Free · Taught by students
          </p>
          <BlurText
            as="h1"
            text="Courses built for the curious"
            className="home-display mt-4 text-[2.25rem] leading-[1.03] tracking-[-0.02em] md:text-[3rem] lg:text-[3.6rem]"
          />
          <p className="mt-5 max-w-xl text-lg leading-[1.5] text-[var(--home-ink-soft)]">
            Coding courses taught by students and available for free. Take a full course on Udemy
            or work through the interactive lessons here.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href="#catalog" className="home-btn home-btn-fill">
              Explore courses
            </a>
            <Link href={ABOUT_HREF} className="home-btn home-btn-outline">
              Our Story
            </Link>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t-[0.5px] border-[var(--home-hairline-strong)] pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col-reverse">
                <dt className="mt-2 text-[13px] leading-snug text-[var(--home-ink-quiet)]">{stat.label}</dt>
                <dd className="home-serif text-[1.9rem] leading-none text-[#1e3c2c] md:text-[2.4rem]">
                  <CountUp to={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div aria-hidden="true" className="relative hidden h-[22rem] lg:block">
          {fan.map((variant, index) => (
            <div
              key={variant}
              className="courses-fan-card home-card absolute left-1/2 top-1/2 w-[19rem] overflow-hidden rounded-[18px] bg-[#fffbf5] p-2"
              style={
                {
                  "--fan-x": `${(index - 1) * 7.5}rem`,
                  "--fan-y": `${index === 1 ? -1.25 : 0.75}rem`,
                  "--fan-r": `${(index - 1) * 7}deg`,
                  zIndex: index === 1 ? 2 : 1,
                } as React.CSSProperties
              }
            >
              <TopicCover variant={variant} className="block aspect-[16/9] w-full rounded-[12px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
