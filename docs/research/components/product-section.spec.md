# ProductSection Specification

## Overview
- **Target file:** `src/components/ProductSection.tsx`
- **Authoritative source:** `docs/research/sections/main-04-product.html` — exact SSR markup (7.2KB). Convert to JSX verbatim: same element tree, same class attributes, same inline SVG markup.
- **Interaction model:** static layout; time-driven SVG animations via existing CSS classes (`home-orbit` 30s rotation, `home-flow-dash` dash flow 1.4s, `home-node` fill cycle 7.2s with inline `animation-delay` styles — preserve those inline styles exactly, converting to JSX `style={{ animationDelay: "..." }}`).

## Structure (from fragment)
- `<div id="product" class="scroll-mt-24">` wrapper; container `mx-auto w-full max-w-[85rem] px-5 md:px-10`.
- White rounded panel (`home-card rounded-[24px]` per fragment) with intro block:
  - h2 "A new class of learning system." + grey span subtitle (single h2 with two spans — check fragment; classes verbatim).
- 2×2 grid of feature cells divided by 0.5px borders (grid classes from fragment). Each cell: heading, body paragraph, `home-arrow-link` ("Org-wide shared learning →", "Expertise that transfers →", "Effectively infinite retention →", "Automatic observation-level RBAC →"), and a 200×200 viewBox illustration SVG (`aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:...` classes from fragment).
- The 4 SVG illustrations are inline in the fragment with animation classes (`home-orbit`, `home-flow-dash`, `home-node`) and per-element `style="animation-delay:..."` — reproduce exactly. Convert SVG attributes to JSX camelCase (stroke-width → strokeWidth, stroke-dasharray → strokeDasharray, etc.).

## Text content
All verbatim from fragment (headings "Every agent learns as one", "Anyone can work like anyone", "Nothing is ever lost", "Nothing ever leaks" + paragraphs).

## States & Behaviors
- SVG animations run continuously (CSS already in globals.css).
- Arrow links hover: `home-arrow-link` translate.

## Responsive
Grid collapses per fragment classes (`md:` variants). Copy verbatim.

## Verification
`npx tsc --noEmit` passes. SVGs render identically (careful with self-closing tags and camelCase attrs).
