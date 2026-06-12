# UseCasesSection Specification

## Overview
- **Target file:** `src/components/UseCasesSection.tsx`
- **Authoritative source:** `docs/research/sections/main-06-use-cases.html` — exact SSR markup (10.4KB). Convert to JSX verbatim.
- **Interaction model:** static; decorative CSS animations inside mockups via existing classes (`home-flow-dash` etc.) and inline animation-delay styles if present.

## Structure (from fragment)
- `<div id="use-cases" class="scroll-mt-24">`; container `mx-auto w-full max-w-[85rem] px-5 md:px-10`.
- Intro heading block: "Every AI agent in a company wakes up knowing nothing." + grey continuation (h2 + span pattern; classes verbatim).
- 3 stacked white cards (`home-card rounded-[24px]`-ish per fragment), each `flex flex-col md:flex-row` (or reversed) pairing a browser-chrome mockup with a text column:
  1. "Every agent gives the same answer" — mockup: SUPPORT/SALES chat panels + "Shared learning / Refund policy · decided May 12" chip.
  2. "New people are productive on day one" — mockup: From Glen Decision/Lesson cards + "Maya's first PR" panel with green diff chips.
  3. "When people leave, the knowledge stays" — mockup: Sam/replacement avatars + "Why we migrated to v2 / How to roll it back" card.
- Each text column has heading, body paragraph, and an italic scenario card (`home-card` grey border rounded, italic serif or sans per fragment — copy classes).
- Browser chrome dots (three small circles), grey mockup backgrounds, green pill chips (#dbefdb backgrounds), dashed connector elements — all present in fragment markup; reproduce exactly including inline styles.

## Text content
All verbatim from fragment.

## States & Behaviors
- None interactive. Preserve any animation classes present in fragment.

## Responsive
`flex-col md:flex-row` per card from fragment; copy verbatim.

## Verification
`npx tsc --noEmit` passes.
