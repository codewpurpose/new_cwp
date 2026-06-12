# HeroSection + PromptsMarquee + FinalCtaSection Specification

## Overview
- **Target files:** `src/components/HeroSection.tsx`, `src/components/PromptsMarquee.tsx`, `src/components/FinalCtaSection.tsx`
- **Authoritative sources (read these, convert markup to JSX with classes verbatim):**
  - `docs/research/sections/main-00-_R_1c55fknnb_.html` — hero text section (h1, subtitle, two CTA buttons).
  - `docs/research/sections/main-02-section.html` — prompts marquee section (heading + 3 marquee rows of quoted prompt pills; note each track duplicates its pill list with aria-hidden for the seamless loop — keep that).
  - `docs/research/sections/main-17-_R_1e95fknnb_.html` — final CTA section.
- **Interaction model:** hero/CTA static + waitlist modal buttons; marquee time-driven CSS (classes `home-marquee`, `home-marquee-track`, `home-marquee-reverse` already in globals.css; hover pauses).

## HeroSection
- `<section class="pt-8 md:pt-[3.69rem]">`, container `mx-auto w-full max-w-[85rem] px-5 md:px-10`.
- h1: `home-serif text-center text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]` with `<br class="hidden sm:block"/>` between the two lines. Text exactly as in fragment.
- Subtitle p: `mx-auto mt-5 max-w-[44rem] text-center text-lg text-[#636363]` — text verbatim from fragment.
- CTA row: "Speak with us" → `home-btn home-btn-fill` anchor to `SPEAK_WITH_US_HREF` (src/lib/links.ts); "Join the waitlist" → `WaitlistButton` (from `src/components/WaitlistButton.tsx`) with `home-btn home-btn-outline` class, `location="hero"`, **`autoOpenAtScrollFraction={0.4}`** (this is the page's auto-open instance). Copy wrapper classes from fragment.

## PromptsMarquee
- Heading p centered, classes from fragment ("Prompts that Glen unlocks for everyone", `text-[#818181]` style per fragment).
- 3 `.home-marquee` rows (`mt-` spacing per fragment), middle row additionally `home-marquee-reverse`. Each row: `.home-marquee-track` containing the pill list twice (second copy `aria-hidden="true"`).
- Pills: copy exact classes from fragment (home-card rounded pill, whitespace-nowrap, text styles) and the exact quoted prompt strings — three distinct rows with distinct prompt sets, taken verbatim from the fragment.
- Keep pill content as data arrays (string[] per row) and map; do NOT retype strings by hand — copy from fragment (note curly quotes “ ” must be preserved; use them inside JSX string expressions).

## FinalCtaSection
- From fragment main-17: `<section class="pb-16 md:pb-32">`; h2 "Welcome to the future of work." (classes verbatim — sans-serif, `text-[2rem] md:text-[2.75rem]`-ish per fragment); subtitle p; CTA row identical pattern to hero ("Speak with us" fill + WaitlistButton outline, `location="footer_cta"`, no auto-open).

## States & Behaviors
- Marquee pause on hover via existing CSS. 48s loop, translateX 0→−50%.
- Buttons: hover/active states via home-btn classes.

## Responsive
Encoded in fragment classes; copy verbatim.

## Verification
`npx tsc --noEmit` passes. Escape entities correctly (&#x27; → ', “smart quotes” preserved).
