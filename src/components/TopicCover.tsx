import type { ReactNode } from "react";
import { ArtSvg } from "@/components/art/ArtSvg";

export type TopicCoverVariant =
  | "ml1"
  | "ml2"
  | "finance"
  | "health"
  | "origin"
  | "global"
  | "congress"
  | "python"
  | "vibecoding"
  | "roblox"
  | "github"
  | "htmlcss"
  | "computervision";

const INK = "#15120c";
const PISTACHIO = "#dbefdb";
const FERN = "#3e7f5c";
const GREY = "#cfc5b4";
const PAPER = "#f9f3e9";
const DOT = "#dccfb9";
const SAND = "#fcf4e8";

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
        <path className="home-flow-dash" d="M316 115h26" stroke={FERN} strokeWidth="1.5" />
        <g className="art-loop art-pop" style={{ transformOrigin: "354px 115px" }}>
          <rect x="342" y="103" width="24" height="24" rx="6" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
          <path d="M348 115l4 4 7-8" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
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
        ].map(([x, y], i) => (
          <g key={x} className="art-loop art-pop" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.5}s` }}>
            <circle cx={x} cy={y} r="6" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
          </g>
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
        <g className="art-loop art-bob">
          <circle cx="196" cy="116" r="44" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
          <circle cx="196" cy="116" r="35" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="2 4" />
          <text x="196" y="131" textAnchor="middle" fontSize="42" fill={INK} className="home-mono">
            $
          </text>
        </g>
        <path d="M158 176l-12 14M172 182l-8 10" stroke={GREY} strokeWidth="1.2" />
      </g>
    ),
  },
  health: {
    label: "HEALTH × TECH",
    scene: (
      <g>
        <g className="art-loop art-beat" style={{ transformOrigin: "252px 125px" }}>
          <path
            d="M252 184s-62-37-62-80c0-23 17.5-38 36.5-38 10.5 0 20 5 25.5 13.5C257.5 71 267 66 277.5 66c19 0 36.5 15 36.5 38 0 43-62 80-62 80Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.4"
          />
        </g>
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
        <rect x="194" y="84" width="92" height="86" rx="14" fill={SAND} stroke={INK} strokeWidth="1.2" transform="rotate(-6 240 127)" />
        <g className="art-loop art-twinkle" style={{ transformOrigin: "206px 72px", animationDelay: "0s" }}>
          <path d="M206 65c0 4.7 2.3 7 7 7-4.7 0-7 2.3-7 7 0-4.7-2.3-7-7-7 4.7 0 7-2.3 7-7Z" fill="#ffffff" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
        </g>
        <g className="art-loop art-twinkle" style={{ transformOrigin: "280px 184px", animationDelay: "1.2s" }}>
          <path d="M280 179c0 3.3 1.7 5 5 5-3.3 0-5 1.7-5 5 0-3.3-1.7-5-5-5 3.3 0 5-1.7 5-5Z" fill="#dbefdb" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
        </g>
        <path d="M176 78l-34 47 34 47" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M304 78l34 47-34 47" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <g className="art-loop art-beat" style={{ transformOrigin: "240px 128px" }}>
          <path
            d="M240 164s-36-22-36-48c0-14 10.5-23 21.5-23 6 0 11.5 3 14.5 8 3-5 8.5-8 14.5-8 11 0 21.5 9 21.5 23 0 26-36 48-36 48Z"
            fill={PISTACHIO}
            stroke={INK}
            strokeWidth="1.6"
          />
        </g>
        <circle cx="240" cy="125" r="78" stroke={GREY} strokeWidth="1" strokeDasharray="2 6" fill="none" />
      </g>
    ),
  },
  global: {
    label: "150+ COUNTRIES",
    scene: (
      <g>
        {/* A desk globe: stand first, then the sphere, its land and its flight paths. */}
        <path d="M240 195v10" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="212" y="204" width="56" height="8" rx="4" fill={SAND} stroke={INK} strokeWidth="1.4" />
        <path d="M176 150a68 68 0 0 0 128 0" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="240" cy="124" r="62" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M206 92c8-8 22-10 30-4 4 4-2 10 4 14 6 4 2 12-6 12-8 0-10 8-18 6-8-2-14-10-14-18 0-4 2-8 4-10Z" fill={PISTACHIO} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
        <path d="M252 132c6-4 16-2 20 4 4 6 0 16-6 22-4 4-10 4-12-2-2-6-8-8-6-14 0-4 2-8 4-10Z" fill={PISTACHIO} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
        <path d="M258 84c6-2 14 0 16 6 1 4-4 6-8 5-5-1-10-3-11-7Z" fill={PISTACHIO} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
        <ellipse cx="240" cy="124" rx="26" ry="62" fill="none" stroke={INK} strokeWidth="1" />
        <path d="M178 124h124M186 96h108M186 152h108" stroke={GREY} strokeWidth="1" />
        <path className="home-flow-dash" d="M214 102c10-22 34-24 48-14M228 142c14 10 30 6 42-8" fill="none" stroke={FERN} strokeWidth="1.4" strokeLinecap="round" />
        {[
          [214, 102],
          [262, 88],
          [228, 142],
          [270, 134],
          [246, 116],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}`} className="art-loop art-pop" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.7}s` }}>
            <circle cx={x} cy={y} r="4" fill={PISTACHIO} stroke={INK} strokeWidth="1" />
          </g>
        ))}
        <g className="art-loop art-orbit" style={{ transformOrigin: "240px 124px" }}>
          <circle cx="240" cy="124" r="80" stroke={GREY} strokeWidth="1" strokeDasharray="2 6" fill="none" />
          <circle cx="240" cy="44" r="5" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        </g>
      </g>
    ),
  },
  congress: {
    label: "RECOGNITION",
    scene: (
      <g>
        {/* A flag on the roof, waving. */}
        <path d="M240 52V22" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <g className="art-loop art-wave" style={{ transformOrigin: "240px 28px" }}>
          <path d="M240 23c8-4 14 4 24 0v13c-10 4-16-4-24 0Z" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
        </g>
        <rect x="156" y="178" width="168" height="9" rx="3" fill={SAND} stroke={INK} strokeWidth="1.2" />
        <path d="M240 52l-78 36h156L240 52Z" fill="#ffffff" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M186 104v62M222 104v62M258 104v62M294 104v62" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M170 178h140" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M178 104h124" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M162 88h156v8H162Z" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M178 172h124v6H178Z" fill="#ffffff" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
        <g className="art-loop art-pop" style={{ transformOrigin: "240px 74px" }}>
          <circle cx="240" cy="74" r="9" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
          <path
            d="M240 69.5l1.3 2.8 3 .4-2.2 2.1.6 3-2.7-1.5-2.7 1.5.6-3-2.2-2.1 3-.4 1.3-2.8Z"
            fill={INK}
          />
        </g>
        <path d="M330 92c10 0 16 8 16 16M348 76c0 10 8 16 16 16" stroke={GREY} strokeWidth="1.2" fill="none" />
      </g>
    ),
  },
  python: {
    label: "PYTHON BOOTCAMP",
    scene: (
      <g>
        <rect x="170" y="48" width="168" height="124" rx="10" fill="#fcf4e8" stroke={INK} strokeWidth="1.2" transform="rotate(4 254 110)" />
        <rect x="156" y="58" width="168" height="124" rx="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M166 58h148a10 10 0 0 1 10 10v14H156V68a10 10 0 0 1 10-10Z" fill="#fcf4e8" stroke={INK} strokeWidth="1.4" />
        <rect x="166" y="139" width="148" height="18" rx="3" fill={PISTACHIO} opacity="0.6" />
        <circle cx="172" cy="70" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="184" cy="70" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="196" cy="70" r="3" fill={PISTACHIO} stroke={INK} strokeWidth="1" />
        <text x="172" y="108" fontSize="13" fill={FERN} className="home-mono">
          &gt;&gt;&gt; print(&quot;hello&quot;)
        </text>
        <text x="172" y="130" fontSize="13" fill="var(--home-ink-soft)" className="home-mono">
          hello
        </text>
        <text x="172" y="152" fontSize="13" fill={INK} className="home-mono">
          &gt;&gt;&gt;
        </text>
        <rect className="home-blink" x="204" y="142" width="7" height="13" fill={INK} />
        <path className="home-flow-dash" d="M338 96c14 8 14 48 0 56" stroke={FERN} strokeWidth="1.2" fill="none" />
      </g>
    ),
  },
  roblox: {
    label: "ROBLOX STUDIO",
    scene: (
      <g>
        {/* Three floating platforms, ascending — an obby in profile. */}
        <rect x="132" y="184" width="76" height="14" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
        <rect x="222" y="146" width="76" height="14" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
        <rect x="312" y="108" width="76" height="14" rx="4" fill="#ffffff" stroke={INK} strokeWidth="1.4" strokeDasharray="7 5" />
        <path d="M208 191h14M298 153h14" stroke={GREY} strokeWidth="1.2" strokeDasharray="4 4" />

        {/* The laser between two posts, crossing the middle gap. */}
        <rect x="206" y="96" width="10" height="42" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <rect x="304" y="96" width="10" height="42" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <path d="M216 117h88" stroke={FERN} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M216 117h88" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />

        {/* A blocky character standing on the first platform. */}
        <g className="art-loop art-hop">
          <rect x="156" y="150" width="26" height="30" rx="4" fill={FERN} stroke={INK} strokeWidth="1.4" />
          <rect x="158" y="124" width="22" height="22" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
          <circle cx="165" cy="134" r="1.8" fill={INK} />
          <circle cx="174" cy="134" r="1.8" fill={INK} />
        </g>
      </g>
    ),
  },
  htmlcss: {
    label: "HTML & CSS",
    scene: (
      <g>
        {/* The markup, on the left — angle brackets around a nested tag. */}
        <path
          d="M186 78l-30 34 30 34"
          fill="none"
          stroke={INK}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M214 70l-14 84" stroke={GREY} strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M228 78l30 34-30 34"
          fill="none"
          stroke={INK}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* A brace pair between them — CSS, applying to it. */}
        <path
          d="M262 96c8 0 4 12 12 16-8 4-4 16-12 16"
          fill="none"
          stroke={FERN}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* The rendered result — a small page taking shape. */}
        <rect x="286" y="62" width="102" height="100" rx="8" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M286 82h102" stroke={GREY} strokeWidth="1" />
        <circle cx="298" cy="72" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="308" cy="72" r="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="318" cy="72" r="3" fill={PISTACHIO} stroke={INK} strokeWidth="1" />

        {/* A heading, a line of body copy, and a two-column grid below it. */}
        <path d="M300 100h42" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M300 114h72" stroke={GREY} strokeWidth="2.4" strokeLinecap="round" />
        <g className="art-loop art-pop" style={{ transformOrigin: "317px 139px" }}>
          <rect x="300" y="126" width="34" height="26" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        </g>
        <g className="art-loop art-pop" style={{ transformOrigin: "357px 139px", animationDelay: "0.4s" }}>
          <rect x="340" y="126" width="34" height="26" rx="4" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        </g>
      </g>
    ),
  },
  github: {
    label: "GIT & GITHUB",
    scene: (
      <g>
        {/* main, running left to right along the bottom. */}
        <path d="M136 176h180" stroke={INK} strokeWidth="1.6" />
        {[136, 196, 256, 316].map((x) => (
          <circle key={x} cx={x} cy="176" r="11" fill={PISTACHIO} stroke={INK} strokeWidth="1.6" />
        ))}

        {/* A branch leaving at the second commit and merging back at the last. */}
        <path
          d="M196 165c14-8 16-40 34-46"
          fill="none"
          stroke={GREY}
          strokeWidth="1.6"
        />
        <path
          d="M290 113c18 6 12 46 26 54"
          fill="none"
          stroke={GREY}
          strokeWidth="1.6"
        />
        <path d="M247 113h36" stroke={GREY} strokeWidth="1.6" />
        <circle cx="240" cy="113" r="11" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        <circle cx="290" cy="113" r="11" fill="#ffffff" stroke={INK} strokeWidth="1.6" />

        {/* The merge commit: heavier ring, because two lines arrive at it. */}
        <g className="art-loop art-pop" style={{ transformOrigin: "316px 176px" }}>
          <circle cx="316" cy="176" r="14" fill={FERN} stroke={INK} strokeWidth="2" />
        </g>

        {/* A pull-request label pinned to the branch. */}
        <rect x="196" y="62" width="98" height="26" rx="13" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />
        <text x="245" y="80" textAnchor="middle" fontSize="14" fill={INK} className="home-mono">
          #483
        </text>
        <path className="home-flow-dash" d="M245 88v14" stroke={FERN} strokeWidth="1.2" />

        {/* A green tick — the check that gates the merge. */}
        <circle cx="344" cy="126" r="15" fill="#ffffff" stroke={FERN} strokeWidth="1.8" />
        <path
          d="M337 126l5 5 9-11"
          fill="none"
          stroke={FERN}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        <path className="home-flow-dash" d="M240 102v18" stroke={FERN} strokeWidth="1.2" />
        <rect x="172" y="122" width="136" height="78" rx="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path d="M172 140h136" stroke={GREY} strokeWidth="1" />
        <circle cx="186" cy="131" r="2.5" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <circle cx="196" cy="131" r="2.5" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <rect x="184" y="150" width="32" height="38" rx="5" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <path d="M228 158h64M228 170h48M228 182h56" stroke={GREY} strokeWidth="1.2" />
        <g className="art-loop art-twinkle" style={{ transformOrigin: "330px 104px" }}>
          <path
            d="M330 96c0 5.5 2.8 8.3 8.3 8.3-5.5 0-8.3 2.8-8.3 8.3 0-5.5-2.8-8.3-8.3-8.3 5.5 0 8.3-2.8 8.3-8.3Z"
            fill={PISTACHIO}
            stroke={INK}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
        <g className="art-loop art-twinkle" style={{ transformOrigin: "150px 70px", animationDelay: "1.2s" }}>
          <path
            d="M150 64c0 4 2 6 6 6-4 0-6 2-6 6 0-4-2-6-6-6 4 0 6-2 6-6Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      </g>
    ),
  },
  computervision: {
    label: "COMPUTER VISION",
    scene: (
      <g>
        {/* The lens, left — an aperture with iris blades. */}
        <circle cx="182" cy="120" r="46" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <circle cx="182" cy="120" r="58" fill="none" stroke={GREY} strokeWidth="1" strokeDasharray="2 6" />
        <path
          d="M182 120v-30M182 120l26 15M182 120l-26 15M182 120l26-15M182 120l-26-15M182 120v30"
          stroke={INK}
          strokeWidth="1.2"
        />
        <circle cx="182" cy="120" r="13" fill={PISTACHIO} stroke={INK} strokeWidth="1.4" />

        {/* The scan, crossing to what the lens sees. */}
        <path className="home-flow-dash" d="M228 120h30" stroke={FERN} strokeWidth="1.5" />

        {/* The frame it's looking at, with a detection box drawn around the subject. */}
        <rect x="270" y="64" width="118" height="112" rx="8" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
        <path
          d="M286 168c0-30 10-56 43-56s43 26 43 56"
          fill={PISTACHIO}
          stroke={INK}
          strokeWidth="1.2"
        />
        <circle cx="329" cy="98" r="16" fill={PISTACHIO} stroke={INK} strokeWidth="1.2" />
        <rect
          x="294"
          y="80"
          width="70"
          height="88"
          rx="4"
          fill="none"
          stroke={FERN}
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />
        <g className="art-loop art-pop" style={{ transformOrigin: "317px 75px" }}>
          <rect x="294" y="66" width="46" height="18" rx="9" fill={FERN} />
          <text x="317" y="79" textAnchor="middle" fontSize="11" fill="#ffffff" className="home-mono">
            0.98
          </text>
        </g>
      </g>
    ),
  },
};

/**
 * The cover art on /courses, /impact and blog posts. The scene is drawn on
 * warm paper over a mint wash and sits on ArtSvg's offset shadow; it draws in
 * when scrolled into view, keeps one small loop (a heartbeat, an orbit, a
 * blinking prompt, a hop...) and lifts when its card is hovered. The server
 * renders it finished, so it is complete without JavaScript, and Reduce
 * Motion leaves it still.
 */
export function TopicCover({
  variant,
  className,
}: {
  variant: TopicCoverVariant;
  className?: string;
}) {
  const { label, scene } = art[variant];
  return (
    <ArtSvg
      viewBox="0 0 480 270"
      role="img"
      aria-label={label}
      className={`art-lift ${className ?? ""}`}
      preserveAspectRatio="xMidYMid slice"
      shadow={{ dx: 4, dy: 5, opacity: 0.09 }}
      backdrop={
        <>
          <rect width="480" height="270" fill={PAPER} />
          <g fill={DOT} opacity="0.7">
            {Array.from({ length: 12 }, (_, row) =>
              Array.from({ length: 21 }, (_, col) => (
                <circle key={`${row}-${col}`} cx={24 + col * 22} cy={22 + row * 22} r="1" />
              ))
            )}
          </g>
          <ellipse cx="256" cy="140" rx="150" ry="96" fill={PISTACHIO} opacity="0.55" />
        </>
      }
    >
      <g transform="translate(0 14)">{scene}</g>
    </ArtSvg>
  );
}
