/** Rendered as monochrome wordmarks rather than official brand artwork: a logo
 *  wall reads as deliberate when every mark shares one height and one ink
 *  colour, and it keeps third-party trademark files out of the repo. */
const ORGANIZATIONS: string[] = [
  "Y Combinator",
  "Stanford",
  "Microsoft",
  "UC Berkeley",
  "MIT",
  "Harvard",
  "Google",
  "OpenAI",
  "Anthropic",
];

export function TrustedBySection() {
  return (
    <section className="py-4">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <p className="home-mono text-center text-[11px] uppercase tracking-[0.18em] text-[#818181] md:text-xs">
          Trusted By
        </p>
      </div>

      <div className="home-marquee mt-6">
        <div className="home-marquee-track items-center">
          {/* The list is rendered twice so the track can loop seamlessly at
              -50%. The second pass is hidden from assistive tech, which would
              otherwise announce all nine names over again. */}
          {[0, 1].map((pass) =>
            ORGANIZATIONS.map((name) => (
              <span
                key={`${pass}-${name}`}
                aria-hidden={pass === 1 ? true : undefined}
                className="shrink-0 whitespace-nowrap px-7 text-[19px] font-medium tracking-[-0.01em] text-[#9a9a9a] transition-colors duration-200 hover:text-[#1f1f1f] md:px-9 md:text-[22px]"
              >
                {name}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
