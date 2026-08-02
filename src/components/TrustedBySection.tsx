interface Organization {
  name: string;
  file: string;
  /** Per-logo height, because a single uniform height does not work here.
   *  The artwork ranges from 1:1 (Y Combinator's square tile) to 8.91:1
   *  (Anthropic's wordmark); matching heights would make Anthropic nine times
   *  wider than YC. Stacked lockups (MIT, Berkeley, Harvard) also need extra
   *  height or their second and third lines of type stop being legible. */
  height: string;
}

const ORGANIZATIONS: Organization[] = [
  { name: "Y Combinator", file: "y-combinator.svg", height: "h-8 md:h-9" },
  { name: "Stanford University", file: "stanford.svg", height: "h-6 md:h-7" },
  { name: "Microsoft", file: "microsoft.svg", height: "h-6 md:h-7" },
  { name: "UC Berkeley", file: "uc-berkeley.svg", height: "h-9 md:h-11" },
  { name: "MIT", file: "mit.svg", height: "h-9 md:h-11" },
  { name: "Harvard University", file: "harvard.svg", height: "h-9 md:h-11" },
  { name: "Google", file: "google.svg", height: "h-6 md:h-7" },
  { name: "OpenAI", file: "openai.svg", height: "h-6 md:h-7" },
  { name: "Anthropic", file: "anthropic.svg", height: "h-4 md:h-5" },
];

export function TrustedBySection() {
  return (
    <section className="py-4">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <p className="home-mono text-center text-[11px] uppercase tracking-[0.18em] text-[#818181] md:text-xs">
          Used by people at
        </p>
      </div>

      <div className="home-marquee mt-7">
        <div className="home-marquee-track items-center">
          {/* Rendered twice so the track loops seamlessly at -50%. The second
              pass is hidden from assistive tech, which would otherwise
              announce all nine names over again. */}
          {[0, 1].map((pass) =>
            ORGANIZATIONS.map((org) => (
              <span
                key={`${pass}-${org.file}`}
                className="flex shrink-0 items-center px-6 md:px-9"
              >
                {/* Full colour, not the usual desaturated logo wall: measured
                    against this cream background, grayscale at 70% opacity put
                    Google at 1.93:1 and Microsoft at 2.14:1 — effectively
                    invisible. Greyscale preserves luminance, so hue is the only
                    thing separating those marks from the page. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${org.file}`}
                  alt={pass === 0 ? org.name : ""}
                  aria-hidden={pass === 1 ? true : undefined}
                  loading="lazy"
                  decoding="async"
                  className={`w-auto opacity-90 transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none ${org.height}`}
                />
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
