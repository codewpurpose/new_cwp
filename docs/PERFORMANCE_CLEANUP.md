# Website loading and UI cleanup

Branch starts from `main` at `4066564`.

## Loading measurements

Production builds compared on the same machine using `next start`.
The measurements sum the scripts referenced by each initial HTML response,
compressing each script with Python gzip. These are reproducible payload estimates,
not measured network transfer, CPU time, Core Web Vitals, or total eventual downloads.
On-demand chunks, third-party scripts, media, CSS, and fonts are excluded.

| Route | Before (gzip bytes) | After (gzip bytes) | Reduction |
| --- | ---: | ---: | ---: |
| `/` | 428,940 | 353,652 | 17.6% |
| `/courses/` | 407,104 | 336,353 | 17.4% |
| `/dashboard/` | 465,906 | 395,601 | 15.1% |
| `/about/` | 408,311 | 332,570 | 18.5% |
| `/impact/` | 403,543 | 331,235 | 17.9% |

Example avatar: `/team-vetri.png` is 4,988,121 bytes. The image optimiser serves
its 256px variant as an 8,002-byte WebP. Cards now request responsive sizes instead
of downloading full-size portraits for small circles.

## Changes

- Render headings, quotes, and impact figures immediately. Previously the hero
  heading was blank at first paint and stat animations reset correct figures to zero.
- Remove decorative canvas dots, pointer magnets, per-card spotlight listeners,
  repeating tickers, word blur effects, automatic koala easter eggs, and an unused
  commit distribution chart. Keep artwork, useful controls, and the mascot.
- Stop perpetual decorative CSS pulse, spin, blink, and message fade cycles.
- Load whiteboard code and styles only when its dashboard tab is opened.
- Load database synchronisation only after sign-in. Existing sync logic is unchanged.
- Defer the floating mascot until after the initial page load and omit it from
  lesson readers. Decode its alternate images only when requested; warm hero poses
  after interaction rather than on a startup timer.
- Use a stable click-to-play video frame instead of changing its height after hydration.
  No movie element or download is created before play is pressed.
- Keep collapsed impact details inert so keyboard focus cannot enter hidden content.
- Make course filtering immediate and give filter controls explicit accessible labels.
- Count all nine tracks in the homepage lesson total and add Computer Vision to the
  dashboard. Both now report 211 chapters. Ignore obsolete or duplicate saved chapter
  slugs when calculating dashboard completion percentages.
- Clarify account requirements and quick-check completion; simplify the FAQ heading;
  correct British spelling and the remaining inconsistent impact wording in llms.txt.

## Validation

- `npm run check` passed: lint, TypeScript, lesson graph validation, production build.
- HTTP audit of 237 public prerendered pages: all returned 200, with no broken local
  links or missing rendered image assets. Framework error routes were excluded.
- Browser checks at 390px and 1440px: homepage headings, navigation, course filters,
  FAQ expansion, video playback, dashboard course list, whiteboard readiness, and
  a Python lesson. The main public pages fit the mobile viewport without horizontal overflow.
- Story playback reached readyState 4 and played with controls; no browser errors
  were reported in the checked flows. The lesson reader did not mount the floating mascot.
- Manual browser checks used a signed-out session. Account synchronisation was
  reviewed in code; no production database or account data was changed.

## Reproducing the payload comparison

Build each revision with `npm run build`, serve it with `npm run start`, fetch each
route's HTML, collect unique `<script src>` URLs, and read the corresponding files
under `.next/static`. Sum their raw lengths and `gzip.compress()` lengths using the
same Python version for both builds. Restart the production server after each build
so its cached asset manifest matches the build directory.
