const ROW_ONE: string[] = [
  "India",
  "Nigeria",
  "United States",
  "Brazil",
  "Bangalore",
  "Lagos",
  "São Paulo",
];

const ROW_TWO: string[] = [
  "San Francisco",
  "Kenya",
  "Philippines",
  "Ghana",
  "Mexico",
  "Pakistan",
  "South Africa",
];

const ROW_THREE: { value: string; label: string }[] = [
  { value: "4,000+", label: "students worldwide" },
  { value: "130+", label: "countries" },
  { value: "30+", label: "languages taught" },
  { value: "15,000", label: "minutes of teaching" },
  { value: "Free", label: "forever" },
  { value: "100%", label: "student-run nonprofit" },
];

function LocationRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className={reverse ? "home-marquee home-marquee-reverse" : "home-marquee"}>
      <div className="home-marquee-track">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="home-card home-chip flex shrink-0 items-center gap-2.5 rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
          >
            <span
              className="home-chip-dot"
              style={{ animationDelay: `${(index % items.length) * 0.4}s` }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="home-marquee">
      <div className="home-marquee-track">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="home-card home-chip flex shrink-0 items-baseline gap-2 rounded-lg px-4 py-2.5 text-[15px] leading-none"
          >
            <span className="home-mono text-[13px] font-medium tracking-[-0.01em] text-[#3e7f5c]">
              {item.value}
            </span>
            <span className="text-[#1f1f1f]">{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PromptsMarquee() {
  return (
    <section className="pt-16 md:pt-32">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <p className="home-mono flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#818181] md:text-xs">
          <span className="home-live-dot" />
          Students on every corner of the Earth
        </p>
      </div>
      <div className="home-marquee-stack mt-6 flex flex-col gap-2.5">
        <LocationRow items={ROW_ONE} />
        <LocationRow items={ROW_TWO} reverse />
        <StatRow items={ROW_THREE} />
      </div>
    </section>
  );
}
