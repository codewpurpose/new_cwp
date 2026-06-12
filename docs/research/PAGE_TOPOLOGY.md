# tryglen.com — Page Topology

Single landing page (`/`). Total height ~8,670px at 1440×900. Next.js App Router, React SSR + small client islands. Tailwind utility classes + a custom `home-*` utility layer (see `home-styles-pretty.css`). All static markup is in `docs/research/sections/*.html` (exact SSR output).

## Layout shell
- `body > div.home-root.__variable_*` wraps everything; `.home-root` sets bg `#f9f9f9`, ink `#0a0e19`, Inter, `letter-spacing:-.02em`.
- Content container pattern: `mx-auto w-full max-w-[85rem] px-5 md:px-10`.
- `<header>` is `sticky top-0 z-10` (does NOT change style on scroll; nav pill is glass from the start).
- `<main id="top">` holds all sections; spacer divs (`h-16 md:h-40`, `h-12 md:h-20`) between sections.
- `<footer class="pb-6">` at bottom.
- A `<section>` sits after `</main>` in body — the sticky-header offset anchor (empty). Waitlist `<dialog>` elements are rendered inline by each WaitlistButton.

## Sections in order (fragment file → component)
| # | Fragment | Top px | Component | Interaction model |
|---|----------|--------|-----------|-------------------|
| 0 | `00-header.html` | sticky | `SiteHeader` | click (mobile menu toggle, anchors) |
| 1 | `main-00-_R_1c55fknnb_.html` | 105 | `HeroSection` (h1 + sub + CTAs) | static + waitlist modal button |
| 2 | `main-01-section.html` | 550 | `HeroGlobe` (Three.js particle sphere) | scroll-driven dissipation |
| 3 | `main-02-section.html` | 1271 | `PromptsMarquee` (3 rows of prompt pills) | time-driven CSS marquee, hover pauses |
| 4 | `main-04-product.html` | 1731 | `ProductSection` (#product, 2×2 bento) | time-driven SVG animations |
| 5 | `main-06-use-cases.html` | 2754 | `UseCasesSection` (#use-cases, 3 cards) | static, CSS animations in mockups |
| 6 | `main-07-why-glen.html` | 4513 | `WhyGlenSection` (#why-glen, dark panel + accordion) | click-driven detail expand |
| 7 | `main-09-security.html` | 5391 | `SecuritySection` (#security) | static |
| 8 | `main-11-section.html` | 5921 | `QuoteSection` (moss quote + Day/Month/Year cards) | static, cards have home-lift hover |
| 9 | `main-13-how.html` | 6826 | `HowItWorksSection` (#how) | static |
| 10 | `main-15-faq.html` | 7330 | `FaqSection` (#faq, 6 accordions) | click-driven grid-rows accordion |
| 11 | `main-17-_R_1e95fknnb_.html` | 8124 | `FinalCtaSection` | waitlist modal button |
| 12 | `99-footer.html` | 8395 | `SiteFooter` | hover states |

## Z-index / overlay layers
- header: `z-10` sticky.
- Hero globe canvas: absolutely positioned wrapper `pointer-events-none absolute inset-x-0 -inset-y-[150%] md:-inset-y-[30%]` around an aspect-ratio placeholder (`aspect-[455/256]`), canvas extends beyond section bounds, behind nothing (transparent canvas).
- Why Glen detail rows: `relative z-[1]` over gradient background layers.
- `<dialog class="waitlist-dialog">` native modal + `::backdrop` blur.

## Decompiled client source (authoritative)
- `chunks/header-pretty.js` — SiteHeader (module 984), WaitlistButton + dialog (module 2678), GlenLogo (module 2807), links (module 2625: mailto founders@tryglen.com, cal.com link), analytics events (module 7999; clone may no-op).
- `chunks/page-pretty.js` — FAQ data + accordion (module 3861), Why Glen data + accordion (module 8001), hero globe wrapper w/ scroll handler (module 6597).
- `chunks/spacescene-pretty.js` — SpaceScrollScene: R3F Canvas (fov 50, cam z 7, dpr [1,2]), 25,000-point fibonacci sphere r=2.2, custom shader (full GLSL source inline), camera rig lerp, dust off.

## Fonts
- `--font-home-sans`: Inter (weights 100–900 variable), fallback Arial-adjusted.
- `--font-home-serif`: Newsreader 300 normal + italic, fallback Times New Roman.
- `--font-home-mono`: Spline Sans Mono 400 + 500.
- Headlines use `.home-serif` (Newsreader 300, ls -0.02em). Body is Inter.

## Anchors
`#top` (main), `#product`, `#use-cases` (not in nav), `#why-glen`, `#security`, `#how`, `#faq`. All use `scroll-mt-24`. Native smooth scroll NOT set (scrollBehavior: auto) — anchor jumps are instant. No Lenis/Locomotive.
