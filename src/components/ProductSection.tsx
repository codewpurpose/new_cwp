import {
  COURSES_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";
import GlareHover from "@/components/reactbits/GlareHover";
import {
  PythonSproutArt,
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
                Two courses to start with
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
                Both courses are free.
              </p>
            </div>
            <div className="mt-8 grid border-t border-[var(--home-hairline)] md:mt-10 md:grid-cols-2">
              <GlareHover className="art-host flex flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[var(--home-hairline)] border-b-[0.5px] border-b-[var(--home-hairline)] ">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl">Python for Complete Beginners</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                    Write your first Python programs and practise with variables,
                    loops, and functions.
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
            </div>
            <div className="px-5 py-5 sm:px-6 md:px-10">
              <a href={COURSES_HREF} className="home-arrow-link">Browse all courses</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
