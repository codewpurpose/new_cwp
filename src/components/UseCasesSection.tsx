import { ArtSvg } from "@/components/art/ArtSvg";

/*
 * The small drawn marks in these mock screens (the globe, the seed on day one,
 * the recognition star, the tick) use ArtSvg, so they draw in when the section
 * scrolls into view and share the illustrations' offset shadow and idle loops.
 */
export function UseCasesSection() {
  return (
    <div id="about" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="mb-8 md:mb-10">
            <h2 className="home-serif text-[1.75rem] leading-[1.08] md:text-[2.5rem]">
              Free lessons for students who need them
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
              We&apos;re a community of students who share one belief: quality coding education
              should cost nothing.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:gap-8">
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-hairline)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 md:px-6 md:pt-6">
                    <div className="flex flex-1 gap-3 md:gap-4">
                      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-white p-3 md:p-4">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)] md:text-[10px]">
                          <span className="cwp-pulse h-[5px] w-[5px] shrink-0 rounded-full bg-[#3e7f5c]"></span>
                          Lagos, Nigeria
                        </div>
                        <div className="text-[10px] leading-snug text-[var(--home-ink)] md:text-[12px]">How do I make my first loop?</div>
                        <div className="cwp-cycle mt-auto rounded-md bg-[#dbefdb] p-2 text-[10px] leading-snug text-[var(--home-ink)] md:p-2.5 md:text-[12px]">
                          Start with <span className="home-mono">for day in week:</span> and we&apos;ll build it together.
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-white p-3 md:p-4">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)] md:text-[10px]">
                          <span className="cwp-pulse h-[5px] w-[5px] shrink-0 rounded-full bg-[#3e7f5c]" style={{ animationDelay: "1.3s" }}></span>
                          Bangalore, India
                        </div>
                        <div className="text-[10px] leading-snug text-[var(--home-ink)] md:text-[12px]">What can I build with Python?</div>
                        <div className="cwp-cycle mt-auto rounded-md bg-[#dbefdb] p-2 text-[10px] leading-snug text-[var(--home-ink)] md:p-2.5 md:text-[12px]" style={{ animationDelay: "4.5s" }}>
                          Your own quiz app. Lesson 3 shows you how.
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-16 md:gap-24">
                      <svg viewBox="0 0 2 20" preserveAspectRatio="none" aria-hidden="true" className="h-4 w-[2px] md:h-5">
                        <path className="home-flow-dash" d="M1 20V0" stroke="#3e7f5c" strokeWidth="1.5"></path>
                      </svg>
                      <svg viewBox="0 0 2 20" preserveAspectRatio="none" aria-hidden="true" className="h-4 w-[2px] md:h-5">
                        <path className="home-flow-dash" d="M1 20V0" stroke="#3e7f5c" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                    <div className="mx-auto mb-4 flex items-center gap-2 rounded-lg border-[0.5px] border-[#cecece] bg-white px-3 py-2 md:mb-6">
                      <ArtSvg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="shrink-0 overflow-visible" shadow={{ dx: 1, dy: 1, color: "#3e7f5c", opacity: 0.3 }}>
                        <g className="art-loop art-orbit" style={{ transformOrigin: "8px 8px" }}>
                          <circle cx="8" cy="8" r="6.5" fill="#dbefdb" stroke="#1e3c2c" strokeWidth="1.1" />
                          <ellipse cx="8" cy="8" rx="2.6" ry="6.5" stroke="#1e3c2c" strokeWidth="1" />
                          <path d="M1.5 8h13" stroke="#1e3c2c" strokeWidth="1" />
                        </g>
                      </ArtSvg>
                      <div>
                        <div className="text-[9px] font-medium leading-tight text-[var(--home-ink)] md:text-[11px]">Lesson shared worldwide</div>
                        <div className="text-[8px] leading-tight text-[var(--home-ink-quiet)] md:text-[10px]">Python Basics · taught in 30+ languages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-5 sm:p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.25rem] leading-[1.1] sm:text-[1.375rem] md:text-[1.875rem]">Knowledge where it&apos;s needed most</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
              We got tired of watching $15,000 bootcamps decide who gets to
              learn. We built free courses instead. Students in 150+ countries,
              from rural villages in India to classrooms in Nigeria, can use the
              same lessons without paying.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[var(--home-ink-soft)]">
                  Students in 150+ countries are already learning with us, for
                  free, with no strings attached.
                </div>
              </div>
            </article>
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-2">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-hairline)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 gap-2 p-3 md:gap-3 md:p-4">
                    <div className="flex w-[32%] min-w-0 flex-col justify-center gap-2 rounded-lg bg-[var(--home-grey-450)] p-2.5 md:p-3">
                      <div className="w-fit max-w-full rounded-full bg-[#1e3c2c] px-2 py-0.5 text-[8px] leading-tight text-[#dbefdb] md:text-[9px]">Volunteer mentor</div>
                      <div className="cwp-cycle space-y-0.5 rounded-md border-[0.5px] border-[var(--home-hairline)] bg-white p-2" style={{ animationDelay: "0.6s" }}>
                        <div className="text-[8px] font-medium leading-tight text-[var(--home-ink)] md:text-[10px]">Hint</div>
                        <div className="text-[8px] leading-tight text-[var(--home-ink-quiet)] md:text-[10px]">Indent the line inside your loop</div>
                      </div>
                      <div className="cwp-cycle space-y-0.5 rounded-md border-[0.5px] border-[var(--home-hairline)] bg-white p-2" style={{ animationDelay: "1.6s" }}>
                        <div className="text-[8px] font-medium leading-tight text-[var(--home-ink)] md:text-[10px]">Cheer</div>
                        <div className="text-[8px] leading-tight text-[var(--home-ink-quiet)] md:text-[10px]">Run it again, you&apos;ve got this!</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 20 2" preserveAspectRatio="none" aria-hidden="true" className="h-[2px] w-4 self-center md:w-6">
                      <path className="home-flow-dash" d="M0 1H20" stroke="#3e7f5c" strokeWidth="1.5"></path>
                    </svg>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-white p-3 md:p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-[9px] font-medium text-[var(--home-ink)] md:text-[12px]">Maya&apos;s first program</div>
                        <div className="cwp-pulse flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbefdb]">
                          <ArtSvg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" shadow={false}>
                            <path d="M2 5.2 4.2 7.4 8 3" stroke="#1e3c2c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                          </ArtSvg>
                        </div>
                      </div>
                      <div className="mt-1 space-y-1.5 text-[9px] leading-snug md:text-[11px]">
                        <div className="cwp-cycle flex items-center gap-1.5" style={{ animationDelay: "2.4s" }}>
                          <span className="text-[#1e3c2c]">+</span>
                          <span className="home-mono rounded-sm bg-[#dbefdb] px-1 text-[var(--home-ink)]">print(&quot;Hello, Lagos!&quot;)</span>
                        </div>
                        <div className="cwp-cycle flex items-center gap-1.5" style={{ animationDelay: "3.2s" }}>
                          <span className="text-[#1e3c2c]">+</span>
                          <span className="home-mono rounded-sm bg-[#dbefdb] px-1 text-[var(--home-ink)]">for day in week:</span>
                        </div>
                        <div className="text-[var(--home-ink-quiet)]">Written day one · ran on the first try</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-5 sm:p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.25rem] leading-[1.1] sm:text-[1.375rem] md:text-[1.875rem]">Volunteers who help</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                  Our volunteers don&apos;t just teach. They mentor, troubleshoot,
                  and celebrate every breakthrough right alongside our students.
                  Hands-on help in classrooms, workshops, and one-on-one sessions
                  makes coding feel doable for everyone.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[var(--home-ink-soft)]">
                  A volunteer leaning in to help a young student at their laptop.
                  That moment is what CodeWithPurpose is all about.
                </div>
              </div>
            </article>
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-hairline)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-hairline)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 items-center justify-center gap-2.5 px-4 py-6 md:gap-4 md:px-6 md:py-0">
                    <div className="flex flex-col items-center gap-1.5">
                      <ArtSvg viewBox="0 0 44 44" fill="none" aria-hidden="true" className="h-9 w-9 overflow-visible md:h-11 md:w-11" shadow={{ dx: 1.5, dy: 1.5, opacity: 0.1 }}>
                        {/* A seed in a pot of soil: day one, before anything has sprouted. */}
                        <circle cx="22" cy="22" r="21" fill="#fcf4e8" stroke="#cfc5b4" strokeWidth="1" strokeDasharray="1.5 3.5" strokeLinecap="round" />
                        <path d="M12 26h20l-3 10H15Z" fill="#efe2cc" stroke="#15120c" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M10.5 26h23" stroke="#15120c" strokeWidth="1.2" strokeLinecap="round" />
                        <g className="art-loop art-bob">
                          <ellipse cx="22" cy="21" rx="3.2" ry="4.2" fill="#dbefdb" stroke="#15120c" strokeWidth="1.1" transform="rotate(-20 22 21)" />
                          <path d="M21 19.5c.8 1 1.4 2.2 1.6 3.4" stroke="#3e7f5c" strokeWidth="0.9" strokeLinecap="round" />
                        </g>
                      </ArtSvg>
                      <div className="text-center text-[8px] leading-tight text-[var(--home-ink-quiet)] md:text-[10px]">
                        Day one,
                        <br />
                        zero experience
                      </div>
                    </div>
                    <svg viewBox="0 0 20 2" preserveAspectRatio="none" aria-hidden="true" className="h-[2px] w-6 md:w-10">
                      <path className="home-flow-dash" d="M0 1H20" stroke="#3e7f5c" strokeWidth="1.5"></path>
                    </svg>
                    <div className="w-2/5 min-w-0 space-y-1.5 rounded-lg border-[0.5px] border-[#cecece] bg-white p-3 md:p-4">
                      <div className="inline-flex items-center rounded-full bg-[#1e3c2c] px-2 py-0.5 text-[8px] leading-none text-[#dbefdb] md:text-[9px]">CodeWithPurpose</div>
                      <div className="text-[9px] leading-snug text-[var(--home-ink)] md:text-[11px]">Free courses · live workshops</div>
                      <div className="cwp-cycle w-fit rounded-sm bg-[#dbefdb] px-1 text-[9px] leading-snug text-[var(--home-ink)] md:text-[11px]" style={{ animationDelay: "1s" }}>1:1 mentoring, every step</div>
                    </div>
                    <svg viewBox="0 0 20 2" preserveAspectRatio="none" aria-hidden="true" className="h-[2px] w-6 md:w-10">
                      <path className="home-flow-dash" d="M0 1H20" stroke="#3e7f5c" strokeWidth="1.5"></path>
                    </svg>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="cwp-pulse relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-[#1e3c2c] bg-[#dbefdb] md:h-11 md:w-11">
                        <div className="cwp-spin absolute -inset-1.5 rounded-full border-[0.5px] border-dashed border-[#3e7f5c]"></div>
                        <ArtSvg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="overflow-visible" shadow={{ dx: 0.8, dy: 0.8, color: "#3e7f5c", opacity: 0.35 }}>
                          <g className="art-loop art-pop" style={{ transformOrigin: "7px 7px" }}>
                            <path d="M7 1.5l1.6 3.4 3.7.5-2.7 2.6.7 3.7L7 9.9 3.7 11.7l.7-3.7L1.7 5.4l3.7-.5L7 1.5Z" fill="#ffffff" stroke="#1e3c2c" strokeWidth="1" strokeLinejoin="round"></path>
                          </g>
                        </ArtSvg>
                      </div>
                      <div className="text-center text-[8px] leading-tight text-[var(--home-ink-soft)] md:text-[10px]">
                        Honored by the U.S.
                        <br />
                        House of Representatives
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-5 sm:p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.25rem] leading-[1.1] sm:text-[1.375rem] md:text-[1.875rem]">Recognized for leadership and service</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[var(--home-ink-soft)] md:text-base">
                  Recognized by the U.S. House of Representatives, we work every
                  day to prove that student-led education can reach the highest
                  standards of service to students.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[var(--home-ink-soft)]">
                  &ldquo;Tremendous leadership and service to your community.&rdquo;
                  Representative Mark DeSaulnier, U.S. House of Representatives
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
