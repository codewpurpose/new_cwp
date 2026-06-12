# WhyGlenSection + SecuritySection + QuoteSection Specification

## Overview
- **Target files:** `src/components/WhyGlenSection.tsx`, `src/components/SecuritySection.tsx`, `src/components/QuoteSection.tsx`
- **Authoritative sources:**
  - `docs/research/chunks/page-pretty.js` **module 8001** (lines ~360–656) — complete decompiled WhyGlen component: 7-item data array (label + 20×20 SVG icon + detail{title, body, scenario}), DetailContent subcomponent, and the accordion logic. Reproduce exactly (classNames, aria attributes, state machine), importing `WaitlistButton` for the trailing "Join the waitlist →" arrow link (`location="templates_card"`).
  - `docs/research/sections/main-07-why-glen.html` — SSR markup cross-reference.
  - `docs/research/sections/main-09-security.html` — security section markup (convert verbatim).
  - `docs/research/sections/main-11-section.html` — quote section + Day 1/Month 1/Year 1 cards (convert verbatim).
- **Interaction model:** WhyGlen click-driven accordion (state `open: number|null` + `lastIndex` so closing keeps content while collapsing); Security/Quote static with hover lifts.

## WhyGlenSection (client component)
- Wrapper `<div id="why-glen" class="mt-28 scroll-mt-24 md:mt-44">` (from SSR fragment) — note the decompiled module renders the inner container; the id/margin wrapper is in the page. Include the wrapper in this component.
- Dark panel: `relative flex overflow-hidden rounded-[24px] md:min-h-[760px]` with two absolute gradient layers (exact `radial-gradient` stack + `bg-gradient-to-r from-black/40 via-black/15 to-black/30` from decompiled source).
- Content `relative z-[1] flex w-full flex-col justify-between gap-10 p-7 md:flex-row md:p-[46px]`; h3 "Why Glen?" `home-serif text-[1.75rem] leading-[1.05] text-white md:text-[2.75rem]`.
- Right: white/95 rounded-xl list (`md:w-[452px]`) of 7 rows (button: icon + label + `home-row-arrow` →; classes verbatim incl. `home-template-row group flex flex-1 items-center gap-3 border-t-[0.5px] border-[#e1e1e1] px-4 py-4 text-left first:border-t-0`, active row `rounded-lg bg-[#f3f3f1]`).
- Per-row mobile detail (`home-detail min-[1200px]:hidden` + `home-detail-open`) and desktop aside (`home-detail hidden shrink-0 min-[1200px]:block`, id `why-glen-detail`) — CSS already in globals.css. Detail card white/95 rounded-xl with × close button and DetailContent (title h4, body p, "In practice" uppercase label + scenario).
- Click behavior: clicking open row closes it; else sets lastIndex+open. Desktop aside shows `items[lastIndex].detail` so content stays during close animation.
- Below panel: right-aligned WaitlistButton arrow-link "Join the waitlist →" (`home-arrow-link cursor-pointer`, arrow span `home-arrow`).

## SecuritySection
From `main-09-security.html` verbatim: `<div id="security" class="scroll-mt-24">`; white card; "SECURITY" mono/uppercase green label; `home-serif` heading "You're in good hands."; paragraph; `home-btn home-btn-moss` "Speak with us" anchor → SPEAK_WITH_US_HREF.

## QuoteSection
From `main-11-section.html` verbatim:
- Moss panel `rounded-xl bg-[#1e3c2c] px-6 py-16 text-center md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]`; serif pistachio kicker "Organizational learning for agent fleets"; blockquote `home-serif ... text-[1.75rem] md:text-[2.5rem] lg:text-[3.25rem]` with curly-quoted line; `home-arrow-link !text-[#dbefdb]` "Speak with us →" link.
- Below: 3-card grid (Day 1 / Month 1 / Year 1) with `home-serif` green numerals and grey captions; cards use `home-card`/`home-lift` classes per fragment.

## Verification
`npx tsc --noEmit` passes. Keep aria-expanded/aria-controls/aria-hidden and tabIndex logic from decompiled source.
