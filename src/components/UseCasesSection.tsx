export function UseCasesSection() {
  return (
    <div id="about" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 className="mb-8 text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:mb-10 md:text-[2.5rem] md:leading-[0.98]">
            <span>Our Mission to Bring Knowledge Where It&apos;s Needed Most</span>
            <br />
            <span className="text-[#818181]">
              We&apos;re a community of students who share one belief: quality
              coding education should cost nothing.
            </span>
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-grey-500)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 md:px-6 md:pt-6">
                    <div className="flex flex-1 gap-3 md:gap-4">
                      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border-[0.5px] border-[var(--home-grey-500)] bg-white p-3 md:p-4">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[#818181] md:text-[10px]">
                          <span className="cwp-pulse h-[5px] w-[5px] shrink-0 rounded-full bg-[#3e7f5c]"></span>
                          Lagos, Nigeria
                        </div>
                        <div className="text-[10px] leading-snug text-[#1f1f1f] md:text-[12px]">How do I make my first loop?</div>
                        <div className="cwp-cycle mt-auto rounded-md bg-[#dbefdb] p-2 text-[10px] leading-snug text-[#1f1f1f] md:p-2.5 md:text-[12px]">
                          Start with <span className="home-mono">for day in week:</span> and we&apos;ll build it together.
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border-[0.5px] border-[var(--home-grey-500)] bg-white p-3 md:p-4">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[#818181] md:text-[10px]">
                          <span className="cwp-pulse h-[5px] w-[5px] shrink-0 rounded-full bg-[#3e7f5c]" style={{ animationDelay: "1.3s" }}></span>
                          Bangalore, India
                        </div>
                        <div className="text-[10px] leading-snug text-[#1f1f1f] md:text-[12px]">What can I build with Python?</div>
                        <div className="cwp-cycle mt-auto rounded-md bg-[#dbefdb] p-2 text-[10px] leading-snug text-[#1f1f1f] md:p-2.5 md:text-[12px]" style={{ animationDelay: "4.5s" }}>
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
                      <div className="h-3.5 w-3.5 shrink-0 rounded-[4px] bg-[#1e3c2c]"></div>
                      <div>
                        <div className="text-[9px] font-medium leading-tight text-[#1f1f1f] md:text-[11px]">Lesson shared worldwide</div>
                        <div className="text-[8px] leading-tight text-[#818181] md:text-[10px]">Python Basics · taught in 30+ languages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.375rem] leading-[1.1] md:text-[1.875rem]">Knowledge where it&apos;s needed most</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[#636363] md:text-base">
                  We got tired of watching $15,000 bootcamps decide who gets to
                  learn. So we built something better: free courses, real skills,
                  and a community that shows up. Today we reach students in 130+
                  countries, from rural villages in India to classrooms in Nigeria,
                  and give them the same shot as anyone else.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[#636363]">
                  Students in 130+ countries are already learning with us, for
                  free, with no strings attached.
                </div>
              </div>
            </article>
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-2">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-grey-500)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 gap-2 p-3 md:gap-3 md:p-4">
                    <div className="flex w-[32%] min-w-0 flex-col justify-center gap-2 rounded-lg bg-[var(--home-grey-450)] p-2.5 md:p-3">
                      <div className="w-fit max-w-full rounded-full bg-[#1e3c2c] px-2 py-0.5 text-[8px] leading-tight text-[#dbefdb] md:text-[9px]">Volunteer mentor</div>
                      <div className="cwp-cycle space-y-0.5 rounded-md border-[0.5px] border-[var(--home-grey-500)] bg-white p-2" style={{ animationDelay: "0.6s" }}>
                        <div className="text-[8px] font-medium leading-tight text-[#1f1f1f] md:text-[10px]">Hint</div>
                        <div className="text-[8px] leading-tight text-[#818181] md:text-[10px]">Indent the line inside your loop</div>
                      </div>
                      <div className="cwp-cycle space-y-0.5 rounded-md border-[0.5px] border-[var(--home-grey-500)] bg-white p-2" style={{ animationDelay: "1.6s" }}>
                        <div className="text-[8px] font-medium leading-tight text-[#1f1f1f] md:text-[10px]">Cheer</div>
                        <div className="text-[8px] leading-tight text-[#818181] md:text-[10px]">Run it again, you&apos;ve got this!</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 20 2" preserveAspectRatio="none" aria-hidden="true" className="h-[2px] w-4 self-center md:w-6">
                      <path className="home-flow-dash" d="M0 1H20" stroke="#3e7f5c" strokeWidth="1.5"></path>
                    </svg>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 rounded-lg border-[0.5px] border-[var(--home-grey-500)] bg-white p-3 md:p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-[9px] font-medium text-[#1f1f1f] md:text-[12px]">Maya&apos;s first program</div>
                        <div className="cwp-pulse flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbefdb]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 5.2 4.2 7.4 8 3" stroke="#1e3c2c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="mt-1 space-y-1.5 text-[9px] leading-snug md:text-[11px]">
                        <div className="cwp-cycle flex items-center gap-1.5" style={{ animationDelay: "2.4s" }}>
                          <span className="text-[#1e3c2c]">+</span>
                          <span className="home-mono rounded-sm bg-[#dbefdb] px-1 text-[#1f1f1f]">print(&quot;Hello, Lagos!&quot;)</span>
                        </div>
                        <div className="cwp-cycle flex items-center gap-1.5" style={{ animationDelay: "3.2s" }}>
                          <span className="text-[#1e3c2c]">+</span>
                          <span className="home-mono rounded-sm bg-[#dbefdb] px-1 text-[#1f1f1f]">for day in week:</span>
                        </div>
                        <div className="text-[#818181]">Written day one · ran on the first try</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.375rem] leading-[1.1] md:text-[1.875rem]">Volunteers who lean in to help</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[#636363] md:text-base">
                  Our volunteers don&apos;t just teach. They mentor, troubleshoot,
                  and celebrate every breakthrough right alongside our students.
                  Hands-on help in classrooms, workshops, and one-on-one sessions
                  makes coding feel doable for everyone.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[#636363]">
                  A volunteer leaning in to help a young student at their laptop.
                  That moment is what CodeWithPurpose is all about.
                </div>
              </div>
            </article>
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                <div className="flex flex-col overflow-hidden rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-400)] md:aspect-[782/521]">
                  <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[var(--home-grey-500)] bg-white px-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                    <span className="h-2 w-2 rounded-full bg-[var(--home-grey-500)]"></span>
                  </div>
                  <div className="flex min-h-0 flex-1 items-center justify-center gap-2.5 px-4 py-6 md:gap-4 md:px-6 md:py-0">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="h-9 w-9 rounded-full border-[0.5px] border-dashed border-[#818181] bg-[var(--home-grey-500)] opacity-40 md:h-11 md:w-11"></div>
                      <div className="text-center text-[8px] leading-tight text-[#818181] md:text-[10px]">
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
                      <div className="text-[9px] leading-snug text-[#1f1f1f] md:text-[11px]">Free courses · live workshops</div>
                      <div className="cwp-cycle w-fit rounded-sm bg-[#dbefdb] px-1 text-[9px] leading-snug text-[#1f1f1f] md:text-[11px]" style={{ animationDelay: "1s" }}>1:1 mentoring, every step</div>
                    </div>
                    <svg viewBox="0 0 20 2" preserveAspectRatio="none" aria-hidden="true" className="h-[2px] w-6 md:w-10">
                      <path className="home-flow-dash" d="M0 1H20" stroke="#3e7f5c" strokeWidth="1.5"></path>
                    </svg>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="cwp-pulse relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-[#1e3c2c] bg-[#dbefdb] md:h-11 md:w-11">
                        <div className="cwp-spin absolute -inset-1.5 rounded-full border-[0.5px] border-dashed border-[#3e7f5c]"></div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M7 1.5l1.6 3.4 3.7.5-2.7 2.6.7 3.7L7 9.9 3.7 11.7l.7-3.7L1.7 5.4l3.7-.5L7 1.5Z" stroke="#1e3c2c" strokeWidth="1" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <div className="text-center text-[8px] leading-tight text-[#636363] md:text-[10px]">
                        Honored by the U.S.
                        <br />
                        House of Representatives
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 flex min-w-0 flex-col justify-center p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.375rem] leading-[1.1] md:text-[1.875rem]">Recognized for leadership and service</h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[#636363] md:text-base">
                  Recognized by the U.S. House of Representatives, we work every
                  day to prove that student-led education can reach the highest
                  standards of impact and community service.
                </p>
                <div className="mt-6 rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] px-4 py-3.5 text-[14px] italic leading-[1.5] text-[#636363]">
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
