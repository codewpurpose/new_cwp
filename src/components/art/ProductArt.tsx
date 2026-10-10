"use client";

import { useId, type ReactNode } from "react";
import { ArtSvg } from "@/components/art/ArtSvg";
import {
  INK,
  LEAF,
  MINT,
  MOSS,
  MUTED_TEXT,
  PAPER,
  PISTACHIO,
  QUIET,
  SAND,
  SAND_DEEP,
  WHITE,
  sparkle,
} from "@/components/art/palette";

/**
 * The four spot illustrations in the homepage's "Courses built for the
 * curious" grid (ProductSection).
 *
 * All four share one 200 × 200 canvas, one 1.5 stroke in ink, a mint wash
 * behind the subject, a sand sheet of paper under it and the offset shadow
 * from ArtSvg, so they read as a set. Each stays fully drawn with one reaction
 * to hovering its grid cell (the cell carries `art-host`; see the art block in
 * globals.css):
 *
 * - Python: on hover the sprout stretches up a little.
 * - Vibecoding: on hover the sparkles spin.
 * - Free forever: on hover the tag jingles.
 * - Students: on hover the grad cap is tossed.
 *
 * Hover rules respect `prefers-reduced-motion`; there are no idle loops.
 */

const CLASS =
  "aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:w-[40%] md:self-auto";

const MONO = "home-mono";

function Canvas({ children }: { children: ReactNode }) {
  return (
    <ArtSvg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={CLASS}
      shadow={{ dx: 3.5, dy: 4, opacity: 0.1 }}
      backdrop={
        <>
          <circle cx="100" cy="108" r="78" fill={MINT} opacity="0.55" />
          <circle cx="100" cy="104" r="90" stroke={QUIET} strokeWidth="1" strokeDasharray="1.5 6" strokeLinecap="round" />
        </>
      }
    >
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </ArtSvg>
  );
}

/** Line numbers down an editor gutter. */
function Gutter({ x, ys }: { x: number; ys: number[] }) {
  return (
    <>
      {ys.map((y, i) => (
        <text key={y} x={x} y={y} fontSize="6.5" fill={MUTED_TEXT} stroke="none" textAnchor="end" className={MONO}>
          {i + 1}
        </text>
      ))}
    </>
  );
}

/** Window chrome: body, sand title bar, three dots and a file tab. */
function Window({ x, y, w, h, file }: { x: number; y: number; w: number; h: number; file: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={WHITE} />
      <path d={`M${x} ${y + 10}a10 10 0 0 1 10-10h${w - 20}a10 10 0 0 1 10 10v8H${x}Z`} fill={SAND} />
      <path d={`M${x} ${y + 18}h${w}`} strokeWidth="1" />
      <circle cx={x + 11} cy={y + 9} r="2.2" fill={WHITE} strokeWidth="1" />
      <circle cx={x + 19} cy={y + 9} r="2.2" fill={WHITE} strokeWidth="1" />
      <circle cx={x + 27} cy={y + 9} r="2.2" fill={PISTACHIO} strokeWidth="1" />
      <text x={x + w - 12} y={y + 11.5} fontSize="6.5" fill={INK} stroke="none" textAnchor="end" className={MONO}>
        {file}
      </text>
    </>
  );
}

export function PythonSproutArt() {
  return (
    <Canvas>
      {/* A second sheet behind the window, for depth. */}
      <rect x="42" y="62" width="122" height="98" rx="10" fill={SAND} transform="rotate(6 103 111)" />
      <Window x={30} y={66} w={128} h={100} file="grow.py" />

      {/* The current line, then real code. */}
      <rect x="51" y="141" width="102" height="10" rx="2" fill={MINT} stroke="none" />
      <path d="M49 90v70" stroke={QUIET} strokeWidth="1" />
      <Gutter x={45} ys={[99, 111, 123, 135, 147]} />
      <g fontSize="7" fill={INK} stroke="none" className={MONO}>
        <text x="54" y="99">
          <tspan fill={LEAF}>def</tspan> grow(seed):
        </text>
        <text x="62" y="111">
          water = <tspan fill={LEAF}>3</tspan>
        </text>
        <text x="62" y="123">
          <tspan fill={LEAF}>for</tspan> day <tspan fill={LEAF}>in</tspan> week:
        </text>
        <text x="70" y="135">seed += water</text>
        <text x="62" y="147">
          <tspan fill={LEAF}>return</tspan> seed
        </text>
      </g>
      <rect className="home-blink" x="110" y="141" width="1.6" height="8" fill={INK} stroke="none" />

      {/* The sprout, growing out of a crack in the window's top edge. */}
      <path d="M116 66c2-6 7-9 13-9s11 3 13 9" fill={SAND_DEEP} />
      <path d="M124 60l2 3M134 60l-2 3" strokeWidth="1" />
      <g className="art-hover art-grow" style={{ transformOrigin: "129px 58px" }}>
        <g className="art-loop art-sway" style={{ transformOrigin: "129px 58px" }}>
          <path d="M129 58c0-10-3-20 1-32" stroke={LEAF} strokeWidth="2" />
          <path d="M129 46c-4-10-14-15-25-12 2 10 13 16 25 12Z" fill={MINT} />
          <path d="M127 44c-6-3-11-6-17-8" stroke={LEAF} strokeWidth="1" />
          <path d="M130 36c4-10 14-15 25-12-2 10-13 16-25 12Z" fill={PISTACHIO} />
          <path d="M132 34c6-3 11-6 17-8" stroke={LEAF} strokeWidth="1" />
          <path d="M130 27c-3.5-3-3.5-9 0-12 3.5 3 3.5 9 0 12Z" fill={MINT} />
        </g>
      </g>
      <g className="art-loop art-twinkle" style={{ transformOrigin: "164px 42px" }}>
        <path d={sparkle(164, 42, 5)} fill={WHITE} />
      </g>
      <g className="art-loop art-twinkle" style={{ transformOrigin: "92px 40px", animationDelay: "1.1s" }}>
        <path d={sparkle(92, 40, 3.5)} fill={PISTACHIO} />
      </g>
    </Canvas>
  );
}

export function VibecodingArt() {
  const clip = `art-type-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <Canvas>
      <defs>
        <clipPath id={clip}>
          <rect className="art-loop art-type" x="54" y="121" width="60" height="12" style={{ transformOrigin: "54px 0px" }} />
        </clipPath>
      </defs>

      <rect x="34" y="94" width="138" height="88" rx="10" fill={SAND} transform="rotate(-5 103 138)" />
      <Window x={22} y={88} w={142} h={92} file="app.js" />

      <path d="M41 112v62" stroke={QUIET} strokeWidth="1" />
      <Gutter x={37} ys={[120, 131, 142, 153, 164]} />
      <g fontSize="7" fill={INK} stroke="none" className={MONO}>
        <text x="46" y="120">
          <tspan fill={LEAF}>function</tspan> hi() {"{"}
        </text>
        <text x="46" y="142">{"}"}</text>
        <text x="46" y="164" fill={MUTED_TEXT}>
          {"// tab to accept"}
        </text>
      </g>

      {/* The AI's suggestion, typing in as ghost text, with its cursor. */}
      <rect x="52" y="123.5" width="62" height="10" rx="2" fill={MINT} stroke="none" />
      <g clipPath={`url(#${clip})`}>
        <text x="54" y="131" fontSize="7" fill={LEAF} stroke="none" className={MONO}>
          return &quot;hey!&quot;
        </text>
      </g>
      <g className="art-loop art-type-cursor">
        <rect className="home-blink" x="113" y="124.5" width="1.6" height="8" fill={INK} stroke="none" />
      </g>

      {/* A tab keycap, pressed as each suggestion lands. */}
      <g className="art-loop art-keypress">
        <rect x="124" y="153" width="30" height="16" rx="4" fill={SAND_DEEP} />
        <rect x="124" y="150" width="30" height="16" rx="4" fill={PAPER} />
        <text x="139" y="160.5" fontSize="6.5" fill={INK} stroke="none" textAnchor="middle" className={MONO}>
          tab ⇥
        </text>
      </g>

      {/* The chat bubble the suggestion came from. */}
      <path
        d="M92 18h80a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-48l-14 12v-12h-18a10 10 0 0 1-10-10V28a10 10 0 0 1 10-10Z"
        fill={MINT}
      />
      <circle cx="98" cy="41" r="9" fill={WHITE} />
      <path d={sparkle(98, 41, 5)} fill={PISTACHIO} strokeWidth="1.2" />
      <g fontSize="7" stroke="none" className={MONO}>
        <text x="113" y="38" fill={INK}>
          add a greeting
        </text>
        <text x="113" y="49" fill={LEAF}>
          to hi() ✓
        </text>
      </g>
      <path className="home-flow-dash" d="M110 76c0 4-1 7-3 10" stroke={LEAF} strokeWidth="1.2" />

      <g className="art-hover art-spin" style={{ transformOrigin: "30px 66px" }}>
        <g className="art-loop art-twinkle" style={{ transformOrigin: "30px 66px" }}>
          <path d={sparkle(30, 66, 7)} fill={WHITE} />
        </g>
      </g>
      <g className="art-hover art-spin" style={{ transformOrigin: "180px 84px" }}>
        <g className="art-loop art-twinkle" style={{ transformOrigin: "180px 84px", animationDelay: "0.9s" }}>
          <path d={sparkle(180, 84, 5)} fill={PISTACHIO} />
        </g>
      </g>
      <g className="art-hover art-spin" style={{ transformOrigin: "60px 28px" }}>
        <g className="art-loop art-twinkle" style={{ transformOrigin: "60px 28px", animationDelay: "1.7s" }}>
          <path d={sparkle(60, 28, 4)} fill={MINT} />
        </g>
      </g>
    </Canvas>
  );
}

export function FreeForeverArt() {
  return (
    <Canvas>
      {/* Confetti, drifting a touch. */}
      <g className="art-loop art-drift">
        <rect x="38" y="70" width="8" height="4" rx="1" fill={LEAF} strokeWidth="1" transform="rotate(28 42 72)" />
        <rect x="150" y="104" width="8" height="4" rx="1" fill={PISTACHIO} strokeWidth="1" transform="rotate(-24 154 106)" />
        <rect x="44" y="146" width="7" height="3.5" rx="1" fill={MINT} strokeWidth="1" transform="rotate(-40 47 148)" />
        <path d="M150 146c3-3 5 3 8 0s5 3 8 0" stroke={LEAF} strokeWidth="1.3" />
        <path d="M34 108c3-3 5 3 8 0" stroke={INK} strokeWidth="1.2" />
        <circle cx="160" cy="70" r="2.5" fill={MINT} strokeWidth="1" />
        <circle cx="56" cy="118" r="2" fill={LEAF} stroke="none" />
        <path d="M58 52l7-2-2 7Z" fill={PISTACHIO} strokeWidth="1" />
        <path d={sparkle(160, 130, 4)} fill={WHITE} strokeWidth="1.2" />
      </g>

      {/* The nail the tag hangs from. */}
      <circle cx="100" cy="28" r="5" fill={PAPER} />
      <circle cx="100" cy="28" r="1.5" fill={INK} stroke="none" />

      {/* The tag swings from the nail; hovering the cell jingles it. */}
      <g className="art-loop art-swing" style={{ transformOrigin: "100px 28px" }}>
        <g className="art-hover art-jingle" style={{ transformOrigin: "100px 28px" }}>
          <path d="M100 33c-5 12-5 26 0 40M100 33c5 12 5 26 0 40" strokeWidth="1.1" />
          <path d="M100 56l30 23v72a10 10 0 0 1-10 10H80a10 10 0 0 1-10-10V79Z" fill={SAND} transform="rotate(5 100 108)" />
          <path d="M100 56l30 23v72a10 10 0 0 1-10 10H80a10 10 0 0 1-10-10V79Z" fill={MINT} />
          <path
            d="M100 64l23 18v67a5 5 0 0 1-5 5H82a5 5 0 0 1-5-5V82Z"
            stroke={LEAF}
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle cx="100" cy="75" r="5" fill={PAPER} />
          <text
            x="100"
            y="125"
            fontSize="34"
            fill={INK}
            stroke="none"
            textAnchor="middle"
            className="home-serif"
          >
            $0
          </text>
          <text
            x="100"
            y="142"
            fontSize="7.5"
            fill={LEAF}
            stroke="none"
            textAnchor="middle"
            letterSpacing="2"
            className={MONO}
          >
            FOREVER
          </text>
        </g>
      </g>

      {/* A small heart, floating up. */}
      <g className="art-loop art-heart" style={{ transformOrigin: "146px 60px" }}>
        <path
          d="M146 68s-8-4.8-8-10c0-2.6 1.9-4.4 4.1-4.4 1.7 0 3.1.9 3.9 2.3.8-1.4 2.2-2.3 3.9-2.3 2.2 0 4.1 1.8 4.1 4.4 0 5.2-8 10-8 10Z"
          fill={LEAF}
          strokeWidth="1.2"
        />
      </g>
    </Canvas>
  );
}

function Face({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x - 4} cy={y + 1} r="1.1" fill={INK} stroke="none" />
      <circle cx={x + 4} cy={y + 1} r="1.1" fill={INK} stroke="none" />
      <path d={`M${x - 3} ${y + 5.5}c2 1.6 4 1.6 6 0`} strokeWidth="1.1" />
    </>
  );
}

export function StudentsArt() {
  return (
    <Canvas>
      {/* The middle student stands behind the laptop, cap on. */}
      <path d="M64 156c0-28 15-46 36-46s36 18 36 46" fill={WHITE} />
      <path d="M93 111l7 7 7-7" strokeWidth="1.1" />
      <circle cx="100" cy="94" r="14" fill="#e3bf98" />
      <Face x={100} y={95} />

      <g className="art-hover art-toss" style={{ transformOrigin: "100px 74px" }}>
        <path d="M86 78v6c0 4 6 7 14 7s14-3 14-7v-6" fill={MOSS} />
        <path d="M100 62l32 12-32 12-32-12Z" fill={MOSS} />
        <path d="M100 66l18 7" stroke={LEAF} strokeWidth="1" />
        <g className="art-loop art-tassel" style={{ transformOrigin: "100px 74px" }}>
          <path d="M100 74l24 5v12" strokeWidth="1.1" />
          <path d="M121.5 91h5l-1 6h-3Z" fill={PISTACHIO} strokeWidth="1.1" />
        </g>
      </g>

      {/* Left student, short hair, pointing at the screen. */}
      <path d="M22 162c0-20 11-32 28-32s28 12 28 32" fill={PISTACHIO} />
      <circle cx="50" cy="110" r="13" fill="#f3dcc1" />
      <path d="M37 109c-1-9 5-15 13-15s14 5 13 14c-3-4-8-6-13-6s-10 2-13 7Z" fill={INK} />
      <Face x={50} y={111} />
      <path d="M66 146c6 2 12 6 16 11" />

      {/* Right student, hair in a bun. */}
      <path d="M122 162c0-20 11-32 28-32s28 12 28 32" fill={MINT} />
      <circle cx="150" cy="110" r="13" fill="#c99a72" />
      <circle cx="150" cy="93" r="5.5" fill={INK} />
      <path d="M137 111c-1-11 5-17 13-17s14 6 13 17c-3-5-7-8-13-8s-10 3-13 8Z" fill={INK} />
      <Face x={150} y={112} />

      {/* The desk and the shared laptop, sprout sticker on the lid. */}
      <rect x="18" y="158" width="164" height="9" rx="4.5" fill={SAND_DEEP} />
      <rect x="72" y="118" width="56" height="38" rx="5" fill={PAPER} />
      <path d="M100 145c0-5 0-9 1-13" stroke={LEAF} strokeWidth="1.3" />
      <path d="M100.5 138c-2-4-6-6-10-5 1 4 5 6 10 5Z" fill={MINT} strokeWidth="1.1" />
      <path d="M101 134c2-4 6-6 10-5-1 4-5 6-10 5Z" fill={PISTACHIO} strokeWidth="1.1" />
      <path d="M64 156h72l-5 4H69Z" fill={SAND} />

      <g className="art-loop art-twinkle" style={{ transformOrigin: "146px 60px" }}>
        <path d={sparkle(146, 60, 5)} fill={WHITE} />
      </g>
      <g className="art-loop art-twinkle" style={{ transformOrigin: "54px 70px", animationDelay: "1.3s" }}>
        <path d={sparkle(54, 70, 4)} fill={PISTACHIO} />
      </g>
    </Canvas>
  );
}
