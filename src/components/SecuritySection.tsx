import { CONGRESS_LETTER_HREF } from "@/lib/links";

export function SecuritySection() {
  return (
    <div id="recognition" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="home-card rounded-xl px-6 py-10 md:px-16 md:py-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554]">
                Congressional Recognition · 2026
              </p>
              <h2 className="home-serif mt-4 text-[2rem] leading-[1.05] md:text-[3rem]">
                Tremendous leadership and service to your community.
              </h2>
              <p className="mt-4 max-w-[36rem] text-[15px] text-[#636363] md:text-base">
                Representative Mark DeSaulnier of the U.S. House of
                Representatives recognized CodeWithPurpose for our work bringing
                free coding education to students worldwide. We&apos;re proud to
                serve communities across 130+ countries with the same commitment
                every day.
              </p>
              <p className="mt-3 text-sm text-[#818181]">
                Representative Mark DeSaulnier · March 4, 2026
              </p>
              <div className="mt-8">
                <a
                  href={CONGRESS_LETTER_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="home-btn home-btn-moss"
                >
                  Read the letter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
