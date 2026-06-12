# tryglen.com — Behavior Bible

All values verified from decompiled client chunks (`docs/research/chunks/*-pretty.js`) and live CSS (`home-styles-pretty.css`). These are exact, not estimated.

## 1. Hero globe — scroll-driven dissipation (module 6597 + chunk 9611)
- **Interaction model:** scroll-driven (rAF-throttled scroll listener), plus continuous time-driven shader animation.
- Section: `<section class="relative mt-10 md:mt-14" aria-label="A globe of particles, the shared learning every agent orbits">`
  - inner placeholder: `mx-auto w-full max-w-[85rem] px-5 md:px-10` > `aspect-[455/256] w-full`
  - canvas wrapper: `pointer-events-none absolute inset-x-0 -inset-y-[150%] md:-inset-y-[30%]`, scene fills it `absolute inset-0 h-full w-full`.
- **Dissipation formula:** `d = clamp01((0.4*innerHeight − rect.top) / (0.6*innerHeight))` where `rect` is the section's bounding rect; recomputed on scroll via `requestAnimationFrame`, passive listener; initial call on mount.
- **Mobile:** `matchMedia('(max-width: 767px)')` → `scale = 0.25`, else `0.5`.
- Scene props: `transparent`, `dust:false`, `baseColor:[10,14,25]`, `noiseColor:[99,99,99]`.
- Scene internals (chunk 9611): R3F `Canvas camera={{position:[0,0,7], fov:50}} dpr={[1,2]} gl={{antialias:true, alpha:transparent, powerPreference:'high-performance'}} style={{pointerEvents:'none'}}`.
  - Geometry: 25,000 points, fibonacci sphere radius 2.2, per-point `aAlpha = 0.5+0.5*rand`, `aRandomness = (rand-0.5)*0.08` per axis.
  - Uniforms: uSize 1, uAmplitude 0.12, uFrequency 1.2, uSpeed 0.3, uDepth 0.5, uPixelRatio min(dpr,2).
  - Vertex shader: simplex-noise fbm (4 octaves) displaces radius `1+0.12*noise`, plus jitter `uDepth*aRandomness*snoise(pos+time*speed)`; dissipation pushes `outward*(8+|aRandomness|*60)*d + aRandomness*40*d`; point size `clamp(uSize*dpr*80/dist, 0.5, 6)`; alpha `clamp(aAlpha*(80/dist)*(1-d), 0, 0.9)`; color lerps base→noise color by `clamp(noise,0,1)*2`.
  - Fragment: round point (discard d>0.4), hard edge.
  - Per-frame: `uTime=elapsed`, points group `rotation.y = 0.06*t`, `rotation.x = 0.1*sin(0.03*t)`.
  - Camera rig: aspect<0.8→base 7, <1.2→6.2, else 5.5; `z += (base/scale − z)*0.05` lerp each frame (also x/y for offsetX/offsetY, here 0).
  - Material: `transparent, depthWrite:false, blending: AdditiveBlending` (s.NTi = THREE.AdditiveBlending; verify visually — dots are dark on light bg, NormalBlending may match better; test both).
  - ambientLight intensity 0.05; no background color when transparent.

## 2. Header (module 984)
- **Interaction model:** static sticky (`sticky top-0 z-10`); no scroll-triggered style change.
- Grid `grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-8`, max-w-[85rem].
- Center nav pill ≥1200px only: links Product/#product, Why Glen/#why-glen, How it works/#how, Security/#security, FAQ/#faq, class `px-3 py-2`, pill style inline: `background: linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85); border: 0.5px solid rgba(206,206,206,0.22)`.
- **Nav pill hover:** `.home-nav-pill:has(a:hover)>:not(:hover){opacity:.4}`, children `transition: opacity .2s`.
- Right: "Speak with us" glass link (≥1200px, href cal.com), WaitlistButton "Join the waitlist" glass, hamburger (<1200px) toggles mobile menu (`absolute inset-x-0 top-full mx-5 flex flex-col rounded-xl p-2 backdrop-blur-[10px]`, same glass style; links close it; hamburger icon swaps 3-lines ↔ X paths).

## 3. Waitlist modal (module 2678)
- **Triggers:** (a) click any WaitlistButton → `dialog.showModal()`; (b) **auto-open at scroll fraction** — only for the instance with `autoOpenAtScrollFraction` set (hero instance; observed auto-open mid-page ≈ 0.4): when `scrollY/(scrollHeight−innerHeight) >= fraction`, once per session (sessionStorage keys `glen-waitlist-auto-opened`, `glen-waitlist-joined`), skipped if another dialog open.
- Native `<dialog class="waitlist-dialog">`: white card, radius .75rem, width `min(26rem, 100vw−2.5rem)`, backdrop `#0a0e1959` + blur(3px). Click outside (target===dialog) closes; × button top-right.
- Form: email input, validation regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, error "Enter a valid work email."; POST `/api/request-access` {email}; states idle/submitting("Joining…")/error(red #b42318)/ok → success view "You're on the list." + email echo. Sets `glen-waitlist-joined`.
- Clone: implement same UI; API route returns `{ok:true}` mock.

## 4. Prompts marquee (`main-02-section.html` + CSS)
- **Interaction model:** time-driven CSS animation; hover pauses.
- 3 rows; each `.home-marquee` (mask fade `linear-gradient(90deg,transparent,#000 12% 88%,transparent)`) containing `.home-marquee-track` (`flex gap-.625rem w-max`, `animation: home-marquee 48s linear infinite`), middle row has `home-marquee-reverse` (direction reverse). Keyframes translateX 0 → −50%. Track content duplicated 2× (aria-hidden on dup) for seamless loop. Hover: `animation-play-state: paused`.
- Pills: `home-card` (white bg, 0.5px #e1e1e1 border) rounded-lg, `px-4 py-3 text-[15px] whitespace-nowrap text-[#1f1f1f]` (verify exact classes in fragment).

## 5. Product bento SVG animations (CSS)
- `.home-flow-dash`: `stroke-dasharray:3 5; animation:home-flow 1.4s linear infinite` (dashoffset → −8) — animated connection lines.
- `.home-orbit`: rotate 360° 30s linear infinite, origin 100px 100px — orbiting node ring.
- `.home-node`: fill cycles #dbefdb → #ffffff over 7.2s steps (0–14% pistachio, 22%–100% white) with per-node `animation-delay` stagger (in fragment inline styles).
- Cards hover: none (cards are static; check fragment for home-lift usage).

## 6. Why Glen accordion (module 8001 + `.home-detail` CSS)
- **Interaction model:** click-driven. State: `open: number|null`, `lastIdx` keeps content during close.
- Click row i: if already open → close (null); else set open=i.
- Desktop ≥1200px: `<aside id="why-glen-detail">` expands **width** 0 → `min(392px,38vw)`, transition `.55s cubic-bezier(.22,1,.36,1)`; inner slides in (`opacity 0→1, translateX(20px)→0, .45s +0.1s delay`); white/95 card, backdrop-blur 10px, × close button.
- Mobile <1200px: per-row `.home-detail` expands **max-height** 0 → 1400px under the row.
- Active row: `rounded-lg bg-[#f3f3f1]`; row arrow `→` fades/slides in on hover (`.home-row-arrow`/`.home-template-row:hover`).
- Panel background: `radial-gradient(120% 90% at 18% 22%, #2c4636 0%, transparent 55%), radial-gradient(110% 80% at 85% 75%, #20303f 0%, transparent 60%), radial-gradient(70% 60% at 60% 35%, #3a3128 0%, transparent 65%), #11161c` + overlay `bg-gradient-to-r from-black/40 via-black/15 to-black/30`; rounded-[24px], md:min-h-[760px].
- Full 7-item data (labels, 20×20 SVG icons, detail title/body/scenario) in `chunks/page-pretty.js` module 8001.

## 7. FAQ accordion (module 3861)
- **Interaction model:** click-driven, independent items (multiple can be open).
- Wrapper `home-card rounded-xl`; button `flex w-full p-6 md:p-8 justify-between`; question `text-lg md:text-xl leading-[1.2]`; plus icon 14×14 stroke #818181 rotates 45° when open (`transition-transform duration-300`).
- Answer reveal: CSS grid `grid-rows-[0fr] → [1fr]`, `transition-[grid-template-rows] duration-300 ease-out`, inner `overflow-hidden`, text `opacity-0→100 duration-300`, `px-6 pb-6 md:px-8 md:pb-8 text-sm md:text-[15px] text-[#636363]`.
- 6 Q&A pairs verbatim in module 3861.

## 8. Misc hover states (CSS, all in home-styles-pretty.css)
- `.home-btn`: active scale(.97); fill/outline/glass/moss variants with hover colors; transition `background .3s, border .3s, color .3s, transform .1s`.
- `.home-arrow-link:hover .home-arrow`: translateX(2px), `.2s ease-out`; green #397554.
- `.home-footer-link:hover:before`: currentColor overlay at 8% opacity, inset −0.2/−0.4rem.
- `.home-lift:hover`: translateY(−2px) + bg #f2f2f2, transition `.4s cubic-bezier(.19,1,.22,1)` (Day/Month/Year cards).
- `::selection`: bg #dbefdb, color #1e3c2c.
- FAQ/Why-Glen × buttons: color #818181 → #0a0e19.

## 9. Responsive (from Tailwind classes — copy classes verbatim and this is free)
- Breakpoints: default Tailwind (md 768, lg 1024, xl 1280) + custom `min-[1200px]` for nav/detail panel.
- h1: 2rem → md 2.75rem → lg 3.5rem → xl 4rem.
- Globe canvas wrapper: `-inset-y-[150%]` mobile / `md:-inset-y-[30%]`; scale 0.25 mobile / 0.5 desktop.
- Bento 2×2 → single column (fragment classes); use-case cards `flex-col md:flex-row`; quote text 1.75→3.25rem.

## 10. Reduced motion
`@media (prefers-reduced-motion: reduce)`: marquee/orbit/node/flow animations off; home-detail transitions off; FAQ uses `motion-reduce:transition-none`.

## 11. NOT present
- No Lenis/smooth-scroll lib, no scroll-snap, no scroll-linked header change, no IntersectionObserver entrance animations (page chunk has none), no videos. `__THREE__` only WebGL usage.
