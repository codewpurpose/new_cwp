# SiteHeader + WaitlistButton + SiteFooter Specification

## Overview
- **Target files:** `src/components/SiteHeader.tsx`, `src/components/WaitlistButton.tsx`, `src/components/SiteFooter.tsx`, `src/app/api/request-access/route.ts`
- **Authoritative sources (read these):**
  - `docs/research/chunks/header-pretty.js` — decompiled original React source for header (module 984), WaitlistButton + dialog (module 2678), logo (module 2807), link constants (module 2625). Reproduce this JSX structure, classNames, and logic exactly (drop the PostHog analytics module 7999 — replace calls with no-ops).
  - `docs/research/sections/00-header.html` — exact SSR markup of header.
  - `docs/research/sections/99-footer.html` — exact SSR markup of footer.
- **Interaction model:** header static sticky; mobile menu click-toggle; waitlist modal click + scroll-fraction auto-open.

## SiteHeader
- `sticky top-0 z-10`; inner grid `mx-auto grid w-full max-w-[85rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-8`.
- Logo link (`#top`) uses `GlenLogo` from `src/components/icons.tsx` with `size={28} color="#0a0e19"`, aria-label "Glen home".
- Nav pill (≥1200px): links Product→#product, Why Glen→#why-glen, How it works→#how, Security→#security, FAQ→#faq. Inline style glass: `background: linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85); border: 0.5px solid rgba(206,206,206,0.22)`. Class `home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex`; links `px-3 py-2`.
- Right cluster: "Speak with us" glass anchor → `SPEAK_WITH_US_HREF` from `src/lib/links.ts` (hidden <1200px), WaitlistButton (glass, "Join the waitlist"), hamburger button (<1200px) toggling mobile menu with aria-expanded/controls; icon paths: open `M3 3l10 10M13 3L3 13`, closed `M2 4.5h12M2 8h12M2 11.5h12` (16×16, stroke currentColor 1.5, round caps).
- Mobile menu: `absolute inset-x-0 top-full mx-5 flex flex-col rounded-xl p-2 backdrop-blur-[10px] min-[1200px]:hidden` + glass style; nav links `rounded-lg px-3 py-2.5 text-[1rem]` close menu on click; final "Speak with us" link `mt-1 rounded-lg border-t-[0.5px] border-[#e1e1e1] px-3 py-2.5 text-[1rem]`.

## WaitlistButton (client component)
Reproduce module 2678 exactly: props `{ location: string; className?: string; children?: ReactNode; onOpen?: () => void; autoOpenAtScrollFraction?: number }`.
- Renders optional trigger button + native `<dialog className="waitlist-dialog">` (CSS for dialog/backdrop already in globals.css).
- Auto-open effect: only when `autoOpenAtScrollFraction` defined; sessionStorage guards `glen-waitlist-auto-opened` / `glen-waitlist-joined` (try/catch wrapped); rAF-throttled passive scroll listener; trigger when `scrollY/(scrollHeight−innerHeight) >= fraction` and no `dialog[open]` in document; then `showModal()` and set the auto-opened key.
- Dialog content (copy classNames from decompiled source verbatim): × close button; form state machine idle/submitting/error/ok; email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; error message "Enter a valid work email."; POST `/api/request-access` JSON `{email}`; on ok → success view "You're on the list." with email echo, sets `glen-waitlist-joined`; submit button text "Join the waitlist" / "Joining…". Click on backdrop (e.target === dialog) closes.

## API route
`src/app/api/request-access/route.ts`: POST handler validating email shape, returns `Response.json({ ok: true })` (mock; no persistence).

## SiteFooter
Use `docs/research/sections/99-footer.html` verbatim (convert to JSX):
- `<footer class="pb-6">`, container `mx-auto w-full max-w-[85rem] px-5 md:px-10`, white rounded card `home-card rounded-xl p-6 md:p-10` (verify against fragment), grid with logo column + 3 link columns (Product: How it works/#how, Product/#product, Use cases/#use-cases; Resources: Blog→/blog, Thesis→/thesis; Legal: Privacy→/privacy, Terms→/terms), `home-footer-link` hover class on links.
- Bottom row: "© 2026 Glen Labs Incorporated", YC badge image `/images/backed-by-yc.svg` (`next/image` or `<img>` matching fragment dims), LinkedIn + X icon links (inline SVGs from fragment, verbatim paths).

## States & Behaviors
- Nav pill hover dimming + glass hover handled by existing `home-nav-pill`/`home-btn-glass` CSS.
- Footer link hover overlay via `home-footer-link`.
- Dialog: native modal semantics.

## Responsive
Encoded in the classes; copy them verbatim from fragments/decompiled source.

## Verification
`npx tsc --noEmit` must pass. No `any`. Named exports.
