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

const ROW_THREE: string[] = [
  "2,000+ students worldwide",
  "110+ countries",
  "20+ languages taught",
  "8,000+ minutes of teaching",
  "Free forever",
  "Student-run nonprofit",
];

function MarqueeRow({
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
            className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
          >
            {item}
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
        <p className="text-center text-[13px] text-[#818181] md:text-sm">
          Students on every corner of the Earth
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-2.5">
        <MarqueeRow items={ROW_ONE} />
        <MarqueeRow items={ROW_TWO} reverse />
        <MarqueeRow items={ROW_THREE} />
      </div>
    </section>
  );
}
