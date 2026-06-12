# HowItWorksSection + FaqSection Specification

## Overview
- **Target files:** `src/components/HowItWorksSection.tsx`, `src/components/FaqSection.tsx`
- **Authoritative sources:**
  - `docs/research/sections/main-13-how.html` — how-it-works SSR markup (convert verbatim).
  - `docs/research/chunks/page-pretty.js` **module 3861** (lines ~64–157) — complete decompiled FAQ component with all 6 Q&A strings and accordion implementation. Reproduce exactly.
  - `docs/research/sections/main-15-faq.html` — SSR cross-reference.
- **Interaction model:** How = static; FAQ = click-driven accordion, items independent.

## HowItWorksSection
From fragment: `<section id="how" class="scroll-mt-24">`; container; grey card (`bg-[#ececec]`-ish rounded panel per fragment) with `flex flex-col md:flex-row`:
- Left: dark moss illustration card (rounded, `bg-[#1e3c2c]`) containing the Glen logo mark SVG and dashed orbit circles (copy inline SVG/styles verbatim from fragment).
- Right: "HOW IT WORKS" label, h2 "Give your intern superpowers.", paragraph, `home-arrow-link` WaitlistButton or anchor "Join the waitlist →" — check fragment: it's a button (waitlist) — wire to `WaitlistButton` with `location="how_it_works"` keeping classes.

## FaqSection (client)
Reproduce module 3861 exactly:
- Section + container; h2 centered `text-center text-base md:text-lg`: "What teams usually ask before connecting Glen. Still have a question? [Speak with us](SPEAK_WITH_US_HREF, class `text-[#397554] underline-offset-2 hover:underline`) and ask us anything."
- List `mx-auto mt-8 flex max-w-[51rem] flex-col gap-2` of 6 FaqItem cards (`home-card rounded-xl`):
  - h3 > button `flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left md:p-8`, aria-expanded/controls with useId; question span `text-lg leading-[1.2] md:text-xl`; plus SVG 14×14 (path `M7 1v12M1 7h12`, stroke #818181, width 1.5, round caps) with `shrink-0 transition-transform duration-300 motion-reduce:transition-none` + `rotate-45` when open.
  - Answer container: `grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none` + `grid-rows-[1fr]`/`grid-rows-[0fr]`; inner `overflow-hidden`; p `px-6 pb-6 text-sm leading-[1.5] text-[#636363] transition-opacity duration-300 motion-reduce:transition-none md:px-8 md:pb-8 md:text-[15px]` + `opacity-100`/`opacity-0`.
- All 6 question/answer strings verbatim from module 3861 (copy from the decompiled file, preserving apostrophes).

## Verification
`npx tsc --noEmit` passes.
