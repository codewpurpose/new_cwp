import {
  COURSES_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";
import GlareHover from "@/components/reactbits/GlareHover";
import {
  FreeForeverArt,
  PythonSproutArt,
  StudentsArt,
  VibecodingArt,
} from "@/components/art/ProductArt";

// The illustrations live in art/ProductArt. Each cell carries `art-host` so
// hovering anywhere in it (GlareHover's panel) plays that drawing's reaction.

export function ProductSection() {
  return (
    <div id="courses" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="home-card overflow-hidden rounded-[20px]">
            {/* The heading and its subhead used to be two spans inside one h2 at
                the same size, separated only by colour — which read as one grey
                paragraph and put a non-heading inside a heading. */}
            <div className="px-5 pt-7 sm:px-6 sm:pt-8 md:px-10 md:pt-12">
              <h2 className="home-serif text-[1.75rem] leading-[1.08] md:text-[2.375rem]">
                Courses built for the curious.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
                Coding skills taught by students and used by learners in 150+ countries.
                Free for everyone.
              </p>
            </div>
            <div className="mt-8 grid border-t border-[var(--home-hairline)] md:mt-10 md:grid-cols-2">
              <GlareHover className="art-host flex flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[var(--home-hairline)] border-b-[0.5px] border-b-[var(--home-hairline)] ">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl">Python for Complete Beginners</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                    Zero experience? Perfect. You&apos;ll go from nothing to
                    building real projects, just like 800+ students across 50+
                    countries already have.
                  </p>
                  <a
                    href={PYTHON_COURSE_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="home-arrow-link mt-5"
                  >
                    Enrol free <span className="home-arrow">→</span>
                  </a>
                </div>
                <PythonSproutArt />
              </GlareHover>
              <GlareHover className="art-host flex flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14  border-b-[0.5px] border-b-[var(--home-hairline)] ">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl">Vibecoding 101</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                    Build apps with AI tools like Cursor and Copilot while you
                    learn how the code works.
                  </p>
                  <a
                    href={VIBECODING_COURSE_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="home-arrow-link mt-5"
                  >
                    Enrol free <span className="home-arrow">→</span>
                  </a>
                </div>
                <VibecodingArt />
              </GlareHover>
              <GlareHover className="art-host flex flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[var(--home-hairline)] border-b-[0.5px] border-b-[var(--home-hairline)] md:border-b-0">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl">Completely free, forever</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                    Quality coding education should cost nothing. Every course,
                    every resource, every minute of teaching is free, with no
                    strings attached, for every student everywhere.
                  </p>
                  <a href={COURSES_HREF} className="home-arrow-link mt-5">
                    Browse all courses <span className="home-arrow">→</span>
                  </a>
                </div>
                <FreeForeverArt />
              </GlareHover>
              <GlareHover className="art-host flex flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14   md:border-b-0">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl">Made by students, for students</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                    We&apos;re a student-run nonprofit built on one belief:
                    every young person deserves the same chance to learn code,
                    no matter where they live or what they can afford.
                  </p>
                  <a href={COURSES_HREF} className="home-arrow-link mt-5">
                    Start today, it costs nothing{" "}
                    <span className="home-arrow">→</span>
                  </a>
                </div>
                <StudentsArt />
              </GlareHover>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
