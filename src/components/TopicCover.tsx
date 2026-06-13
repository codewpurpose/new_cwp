import type { ReactNode } from "react";

export type TopicCoverVariant =
  | "ml1"
  | "ml2"
  | "finance"
  | "health"
  | "origin"
  | "global"
  | "congress"
  | "python"
  | "vibecoding";

const INK = "#0a0e19";
const PISTACHIO = "#dbefdb";
const FERN = "#3e7f5c";
const GREY = "#cecece";

const art: Record<TopicCoverVariant, { label: string; scene: ReactNode }> = {
  ml1: {
    label: "MACHINE LEARNING · 01",
    scene: (
      <g>
        <path
          d="M168 95l66-26M168 95l66 22M168 95l66 64M168 135l66-66M168 135l66 22M168 135l66 24M168 175l66-106M168 175l66-18M168 175l66-16M234 69l64 46M234 117l64-2M234 159l64-44M234 69l64 88M234 117l64 40M234 159l64-2"
          stroke={GREY}
          strokeWidth="1"
        />
        {[95, 135, 175].map((y) => (
          <circle key={y} cx="168" cy={y} r="10" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        ))}
        {[69, 117, 159].map((y, i) => (
          <circle
            key={y}
            cx="234"
            cy={y}
            r="10"
            fill={i === 1 ? PISTACHIO : "#ffffff"}
            stroke={INK}
            strokeWidth="1.2"
          />
        ))}
        {[115, 157].map((y, i) => (
          <circle
            key={y}
            cx="298"
            cy={y}
            r="10"
            fill={i === 0 ? PISTACHIO : "#ffffff"}
            stroke={INK}
            strokeWidth="1.2"
          />
        ))}
        <path d="M316 115h26" stroke={FERN} strokeWidth="1.5" strokeDasharray="3 5" />
        <rect x="342" y="103" width="24" height="24" rx="6" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path d="M348 115l4 4 7-8" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    ),
  },
  ml2: {
    label: "MACHINE LEARNING · 02",
    scene: (
      <g>
        <path d="M150 60v130M150 190h190" stroke={INK} strokeWidth="1.2" />
        <path d="M150 158h190M150 126h190M150 94h190" stroke={GREY} strokeWidth="1" strokeDasharray="2 5" />
        <path
          d="M150 178c30-6 44-22 62-30s38-2 56-26 36-38 64-48"
          stroke={FERN}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M150 184c34 0 60-10 84-18s52-16 98-24"
          stroke={GREY}
          strokeWidth="1.4"
          strokeDasharray="4 5"
          fill="none"
        />
        {[
          [212, 148],
          [268, 122],
          [332, 74],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="6" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        ))}
      </g>
    ),
  },
  finance: {
    label: "FINANCIAL LITERACY",
    scene: (
      <g>
        <rect x="262" y="142" width="26" height="48" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <rect x="296" y="118" width="26" height="72" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <rect x="330" y="88" width="26" height="102" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path d="M254 190h112" stroke={INK} strokeWidth="1.2" />
        <circle cx="196" cy="116" r="44" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
        <circle cx="196" cy="116" r="35" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="2 4" />
        <text x="196" y="131" textAnchor="middle" fontSize="42" fill={INK} className="home-mono">
          $
        </text>
        <path d="M158 176l-12 14M172 182l-8 10" stroke={GREY} strokeWidth="1.2" />
      </g>
    ),
  },
  health: {
    label: "HEALTH × TECH",
    scene: (
      <g>
        <path
          d="M252 184s-62-37-62-80c0-23 17.5-38 36.5-38 10.5 0 20 5 25.5 13.5C257.5 71 267 66 277.5 66c19 0 36.5 15 36.5 38 0 43-62 80-62 80Z"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.4"
        />
        <path
          d="M140 124h54l10-22 14 44 12-30 8 8h66"
          stroke={FERN}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="344" cy="124" r="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <rect x="318" y="58" width="22" height="22" rx="5" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path d="M329 63v12M323 69h12" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    ),
  },
  origin: {
    label: "OUR STORY",
    scene: (
      <g>
        <path d="M176 78l-34 47 34 47" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M304 78l34 47-34 47" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M240 164s-36-22-36-48c0-14 10.5-23 21.5-23 6 0 11.5 3 14.5 8 3-5 8.5-8 14.5-8 11 0 21.5 9 21.5 23 0 26-36 48-36 48Z"
          fill={PISTACHIO}
          stroke={INK}
          strokeWidth="1.6"
        />
        <circle cx="240" cy="125" r="78" stroke={GREY} strokeWidth="1" strokeDasharray="2 6" fill="none" />
      </g>
    ),
  },
  global: {
    label: "130+ COUNTRIES",
    scene: (
      <g>
        <circle cx="240" cy="124" r="62" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <ellipse cx="240" cy="124" rx="26" ry="62" fill="none" stroke={INK} strokeWidth="1" />
        <path d="M178 124h124M186 96h108M186 152h108" stroke={GREY} strokeWidth="1" />
        {[
          [214, 102],
          [262, 88],
          [228, 142],
          [270, 134],
          [246, 116],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={PISTACHIO} stroke={INK} strokeWidth="1" />
        ))}
        <circle cx="240" cy="124" r="80" stroke={GREY} strokeWidth="1" strokeDasharray="2 6" fill="none" />
        <circle cx="240" cy="44" r="5" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
      </g>
    ),
  },
  congress: {
    label: "RECOGNITION",
    scene: (
      <g>
        <path d="M240 52l-78 36h156L240 52Z" fill="#ffffff" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M186 104v62M222 104v62M258 104v62M294 104v62" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M170 178h140" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="240" cy="74" r="9" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path
          d="M240 69.5l1.3 2.8 3 .4-2.2 2.1.6 3-2.7-1.5-2.7 1.5.6-3-2.2-2.1 3-.4 1.3-2.8Z"
          fill={INK}
        />
        <path d="M330 92c10 0 16 8 16 16M348 76c0 10 8 16 16 16" stroke={GREY} strokeWidth="1.2" fill="none" />
      </g>
    ),
  },
  python: {
    label: "PYTHON BOOTCAMP",
    scene: (
      <g>
        <rect x="156" y="58" width="168" height="124" rx="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M156 82h168" stroke={GREY} strokeWidth="1" />
        <circle cx="172" cy="70" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="184" cy="70" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="196" cy="70" r="3" fill={PISTACHIO} stroke={INK} strokeWidth="1" />
        <text x="172" y="108" fontSize="13" fill={FERN} className="home-mono">
          &gt;&gt;&gt; print(&quot;hello&quot;)
        </text>
        <text x="172" y="130" fontSize="13" fill="#636363" className="home-mono">
          hello
        </text>
        <text x="172" y="152" fontSize="13" fill={INK} className="home-mono">
          &gt;&gt;&gt;
        </text>
        <rect className="home-blink" x="204" y="142" width="7" height="13" fill={INK} />
        <path d="M338 96c14 8 14 48 0 56" stroke={GREY} strokeWidth="1.2" strokeDasharray="3 5" fill="none" />
      </g>
    ),
  },
  vibecoding: {
    label: "VIBECODING 101",
    scene: (
      <g>
        <path
          d="M196 42h78a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-64l-18 16V52a10 10 0 0 1 10-10Z"
          fill={PISTACHIO}
          stroke={INK}
          strokeWidth="1.2"
        />
        <path
          d="M206 53c0 7 3.5 10.5 10.5 10.5-7 0-10.5 3.5-10.5 10.5 0-7-3.5-10.5-10.5-10.5 7 0 10.5-3.5 10.5-10.5Z"
          transform="translate(14 0)"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M242 56h32M242 68h22" stroke={INK} strokeWidth="1.2" />
        <path d="M240 102v18" stroke="#b9b9b9" strokeWidth="1.2" strokeDasharray="3 5" />
        <rect x="172" y="122" width="136" height="78" rx="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M172 140h136" stroke={GREY} strokeWidth="1" />
        <circle cx="186" cy="131" r="2.5" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="196" cy="131" r="2.5" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <rect x="184" y="150" width="32" height="38" rx="5" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path d="M228 158h64M228 170h48M228 182h56" stroke={GREY} strokeWidth="1.2" />
        <path
          d="M330 96c0 5.5 2.8 8.3 8.3 8.3-5.5 0-8.3 2.8-8.3 8.3 0-5.5-2.8-8.3-8.3-8.3 5.5 0 8.3-2.8 8.3-8.3Z"
          fill={PISTACHIO}
          stroke={INK}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
};

export function TopicCover({
  variant,
  className,
}: {
  variant: TopicCoverVariant;
  className?: string;
}) {
  const { label, scene } = art[variant];
  return (
    <svg
      viewBox="0 0 480 270"
      role="img"
      aria-label={label}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="480" height="270" fill="#f2f2f2" />
      <g fill={GREY} opacity="0.55">
        {Array.from({ length: 12 }, (_, row) =>
          Array.from({ length: 21 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={24 + col * 22} cy={22 + row * 22} r="1" />
          ))
        )}
      </g>
      <g transform="translate(0 14)">{scene}</g>
    </svg>
  );
}
