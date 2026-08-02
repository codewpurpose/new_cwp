# Writing a lesson

Everything you need to add a lesson to `/learn`, whether you are a person or an
agent working on someone's behalf.

Read it before you start. The architecture here is opinionated in ways that are
not guessable, and the build validator is strict enough that improvising costs
more time than reading does.

---

## 0. The short version

A lesson is **a data entry plus a prose component plus two registrations**. There
is no MDX, no CMS, and no markdown pipeline. Bodies are plain TypeScript React
components composed from a fixed set of primitives.

Scaffold one:

```bash
npm run learn:new -- --track ml --slug decision-trees --title "Decision Trees"
```

Check your work at any point:

```bash
npm run learn:check
```

The single most useful thing to understand is the two-state rule in §1.

---

## 1. The two-state rule

A chapter is either:

- **draft** — `status: "draft"` in the data file, registered *nowhere*, or
- **published** — `status: "published"`, registered in **both** the `[slug]`
  bodies map **and** the cover map.

There is no legal state in between, and the validator enforces it in both
directions. A published chapter missing a registration fails the build. A draft
that *is* registered also fails the build.

This is the rule that makes contribution safe: **you can commit and push a draft
at any stage of writing and the build stays green.** Drafts are filtered out of
routing, the sidebar, the pager and `generateStaticParams`, so a half-written
lesson is invisible to readers rather than broken for them.

`npm run learn:new` always scaffolds a draft, and deliberately does not register
anything. Publish by hand when the lesson is actually finished.

---

## 2. Anatomy

| Artifact | Path | Required | Enforced by |
| --- | --- | --- | --- |
| Chapter entry | `src/lib/<track>-lessons.ts` → `<TRACK>_CHAPTERS` | always | order / slug / prereq / heading checks |
| Prose body | `src/components/<track>/<Name>Lesson.tsx` | always | body-map + heading-anchor checks |
| Interactive | `src/components/<track>/<Widget>.tsx` (`"use client"`) | optional | — |
| Seeded data | `src/lib/ml/<topic>-data.ts` | only with an interactive | — |
| Bodies map | `src/app/learn/<track>/(chapters)/[slug]/page.tsx` | on publish | "published but has no entry" |
| Cover art | `src/components/ml/MlLessonCover.tsx` or `src/components/vibecoding/VibecodingIcons.tsx` | on publish | "published but has no entry in COVERS" |

The shared types are in [`src/lib/learn-types.ts`](../../src/lib/learn-types.ts).
Both tracks use the same shape, so one set of navigation components serves both.

```ts
export interface LearnChapter {
  slug: string;
  partId: LearnPart["id"];
  /** Globally unique and contiguous within a track. Drives ordering and the pager. */
  order: number;
  title: string;
  description: string;
  level: LearnLevel;              // "beginner" | "intermediate" | "advanced"
  minutes: number;
  /** Non-adjacent prerequisites only — "the previous chapter" is implied by `order`. */
  prerequisites: string[];
  tags: string[];
  thumbnail?: string;             // vestigial; nothing renders it. Leave unset.
  headings: LearnHeading[];
  status: "draft" | "published";
  lastReviewed?: string;          // ISO date, for content that goes stale (tooling, pricing)
}
```

Two fields deserve emphasis.

**`headings` is authored in data, not extracted from the body.** The table of
contents is built from this array, and the validator checks that every id in it
appears as a literal `id="..."` somewhere in your component. The two must agree.

**Heading ids are a public API.** External links point at them. Never rename one
on an existing lesson — add a new heading instead.

---

## 3. Worked example: adding a lesson to an existing track

Adding `decision-trees` to the ML track. The order below is chosen so that
`npm run learn:check` passes at every checkpoint.

### Step 1 — scaffold

```bash
npm run learn:new -- --track ml --slug decision-trees --title "Decision Trees" \
  --part doing-it-well --minutes 12 --tags "Foundations,Interactive" \
  --headings "The question a tree asks;Splitting on the best feature;When a tree memorises"
```

This creates `src/components/ml/DecisionTreesLesson.tsx` and appends a
`status: "draft"` chapter to `src/lib/ml-lessons.ts` at the next `order`. It runs
the validator itself and rolls both changes back if anything is wrong, so it
cannot leave you red.

Use `--dry-run` first if you want to see the output without writing.

### Step 2 — seeded data, if you are building an interactive

Data lives in `src/lib/ml/<topic>-data.ts`, generated at module scope from a
fixed seed:

```ts
import { mulberry32, normalish } from "@/lib/ml/random";

const random = mulberry32(20260614);

export const SAMPLES = Array.from({ length: 60 }, () => ({
  hours: normalish(random, 6, 2, { min: 0, max: 12 }),
  slept: normalish(random, 7, 1.2, { min: 3, max: 10 }),
}));
```

See §6 for why this is not negotiable.

### Step 3 — the interactive, if you have one

`"use client"`, hand-written SVG with a fluid `viewBox`, one primary control.
Look at [`SplitLottery`](../../src/components/ml/SplitLottery.tsx) or
[`ThresholdExplorer`](../../src/components/ml/ThresholdExplorer.tsx) for the
shape. Route every number through `@/lib/ml/format`.

### Step 4 — write the prose

Replace the `TODO`s in the scaffolded body. Compose from the primitives in §5;
do not hand-roll a styled block. Drop the interactive in between sections:

```tsx
      <LessonSection id="splitting-on-the-best-feature" title="Splitting on the best feature">
        <P>…</P>
      </LessonSection>

      <TreeSplitter />

      <LessonSection id="when-a-tree-memorises" title="When a tree memorises">
        <P>…</P>
      </LessonSection>
```

**Checkpoint:** `npm run learn:check` → `ml — 8 chapters (7 published, 1 draft)`.

### Step 5 — cover art

In [`src/components/ml/MlLessonCover.tsx`](../../src/components/ml/MlLessonCover.tsx),
add a cover function and its `COVERS` entry:

```tsx
const COVERS: Record<string, () => React.ReactElement> = {
  // …
  "decision-trees": DecisionTreesCover,
};
```

Covers are hand-drawn SVG, built from the design tokens rather than shipped as
images — that is what keeps the tracks free of binary assets. Each one is a
miniature of that lesson's own chart. A cover that does not preview the lesson
will be sent back in review.

### Step 6 — register the body

In [`src/app/learn/ml/(chapters)/[slug]/page.tsx`](../../src/app/learn/ml/\(chapters\)/[slug]/page.tsx):

```tsx
import { DecisionTreesLesson } from "@/components/ml/DecisionTreesLesson";

const ML_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  // …
  "decision-trees": DecisionTreesLesson,
};
```

### Step 7 — publish

Flip `status: "draft"` → `"published"` in `src/lib/ml-lessons.ts`.

Registering (steps 5–6) *before* flipping the status is the safe order. The
reverse leaves a window where the build is red.

**Checkpoint:**

```bash
npm run learn:check
npm run check
```

---

## 4. The house voice

This is the section contributors skip and reviewers send work back over. Agents
in particular default to a generic-explainer register that does not match
anything already on the site.

Read [`TrainTestSplitLesson.tsx`](../../src/components/ml/TrainTestSplitLesson.tsx)
end to end before writing. Then:

**Second person, present tense.** You are talking to one reader.

> You would score brilliantly, and the score would tell nobody anything about
> whether you understood the subject.

**Open by naming a belief the reader holds, then take it apart.** Do not open by
summarising what the lesson covers.

> It feels efficient. It is the opposite, and the reason why is worth
> understanding precisely rather than taking on faith.

**Short declaratives. Fragments for emphasis.**

> Learning sounds mysterious. It is not.

**Concrete numbers wherever numbers exist.** "The reported score swings by nearly
six points." Never "significantly", never "dramatically improves", never
"much better".

**Name the trade-off; refuse to state a law.**

> In practice people hold back somewhere between 20% and 30%, which is a
> compromise rather than a law.

**`description` is a promise, not a summary.** Two sentences: the tension, then
what the reader will physically do.

> A model graded on the data it studied will always flatter itself. Re-roll the
> split and watch the score you would have reported swing by six points.

**Takeaways are claims, not labels.** Every `TakeawayCard` item is a full
sentence somebody could disagree with. "Training error sits below test error at
every split. It always flatters, so never quote it." — not "Training error".

**Headings are clauses, not nouns.** "The score is a lottery ticket", "A problem
you cannot", "Grading your own homework".

**British spelling in reader-facing prose** — `behaviour`, `colour`, `optimise`,
`recognise`. Code identifiers and CSS properties stay American (`color`,
`strokeWidth`). This is a prose-only convention, and it is what the existing
lessons do.

**Banned outright:** "In today's fast-paced world", "Let's dive in", "It's
important to note", "unlock", "leverage", "game-changing", "seamless", emoji,
exclamation marks, and rhetorical questions used as headings.

**The smell test:** read your lead paragraph aloud. If it could open any lesson
on this topic anywhere on the internet, rewrite it.

---

## 5. Prose primitives

All in [`src/components/learn/primitives/`](../../src/components/learn/primitives/).
Import them explicitly — there is no MDX provider injecting them.

**Do not invent a new styled block inside a lesson body.** If nothing here fits,
propose a new primitive in a separate PR. The directory exists because seventeen
hand-rolled `whileInView` copies each dropped `Reveal`'s `useReducedMotion`
guard — hand-rolling is how accessibility regressions get in.

### Structure

**`Lead`** — the opening paragraph. One per lesson, before the first section.

```tsx
<Lead>There is one rule in machine learning that everything else leans on…</Lead>
```

**`LessonSection`** — `{ id, title, children, delay? }`. `id` **must** equal an
id in the chapter's `headings` array. `delay` staggers the reveal animation.

```tsx
<LessonSection id="holding-some-back" title="Holding some back">
  <P>…</P>
</LessonSection>
```

**`P`** — body paragraph. **`Strong`** — inline emphasis in the moss ink.
**`InlineCode`** — inline code in prose.

### Emphasis

**`Callout`** — `{ tone?, title?, children }`. Tones and the label each renders
by default:

| tone | default label | use for |
| --- | --- | --- |
| `note` | Note | an aside that must not break the argument's flow |
| `tip` | Tip | a practical shortcut |
| `success` | Worth knowing | a satisfying consequence |
| `warning` | Careful | a real foot-gun |
| `danger` | Don't do this | something that will actively hurt them |

`danger` means "this will hurt you", not "this is suboptimal".

```tsx
<Callout tone="tip" title="What it costs — and what it does not, here">
  The usual warning is that holding back too much starves the model…
</Callout>
```

**`Tag`** — `{ children, tone?: "mint" | "neutral" | "accent" | "warning" | "danger" }`.
The uppercase pill.

### Code

**`CodeBlock`** — `{ code, label?, variant?, copyable?, lineTones? }`. `code` is
a raw string, not children, so the copy button hands over exactly that text.

- `variant="terminal"` **auto-prefixes `$ `** on non-indented, non-comment
  lines. Never write `$ ` yourself.
- `variant="prompt"` is for text you type at an AI, not at a shell.
- `lineTones` colours individual lines by zero-based index:
  `"err" | "warn" | "ok" | "dim" | "accent"`.

```tsx
<CodeBlock variant="terminal" label="Terminal" code={`npm install\nnpm run dev`} />
```

### Density

**`StepList`** — `{ steps: { label, detail?, note? }[], variant?: "inline" | "timeline", startAt? }`.
`timeline` draws a connecting rail.

**`TakeawayCard`** — `{ title?, items }`. Closes every lesson. Default title is
"Key takeaways".

**`ChecklistCard`** — `{ title?, intro?, items, marker?: "arrow" | "check" | "dot" }`.

**`CompareGrid`** — `{ columns?: 2 | 3, items: { title, tone?, children }[] }`,
tones `"neutral" | "positive" | "caution"`. The two-up "good for / careful with"
grid.

**`LabelRows`** — `{ rows: { label, text }[] }`. Label pill left, text right.

**`RevealCard`** — `{ summaryTag, summary, detailTag, detail, footnote?, openLabel?, closeLabel? }`.
Click-to-reveal, for before/after where the reveal is the point.

**`SegmentedControl`** — generic over `T extends string`;
`{ options, value, onValueChange, label, variant?: "track" | "chips" }`. `label`
is required — it becomes the radiogroup's accessible name.

### Which one

| You want | Reach for |
| --- | --- |
| Two sides compared | `CompareGrid` |
| An ordered procedure | `StepList` |
| An aside that must not break the flow | `Callout` |
| A before/after where the reveal is the point | `RevealCard` |
| A set of things to verify | `ChecklistCard` |
| To close the lesson | `TakeawayCard` |

---

## 6. Non-negotiables

These are correctness rules, not style preferences.

### Data is seeded at module scope

No `Math.random()`, no `Date.now()`, no `new Date()` in lesson data or bodies.
Use `mulberry32(<integer literal>)` from
[`@/lib/ml/random`](../../src/lib/ml/random.ts):

> Every lesson generates its data at module scope from a fixed seed. That runs
> once on the server during SSR and once in the browser, and because nothing here
> touches Math.random or Date, both produce byte-identical arrays — no hydration
> mismatch is possible by construction.

If you use `normalish`, note that it consumes exactly `IRWIN_HALL_N` values per
call. Changing that count or the call ordering silently alters every dataset
generated afterwards.

### `toLocaleString` and `Intl.NumberFormat` are banned

From [`@/lib/ml/format`](../../src/lib/ml/format.ts):

> They are locale- and ICU-version-dependent, which makes them the single most
> likely source of a server/client text mismatch in a component that prints forty
> numbers. Use `toFixed` only.

Use the helpers: `formatRatio`, `formatPercent`, `formatNumber`, `formatSigned`,
`formatCount`. Note that `formatCount` returns a plain integer with no grouping
separators by design, and that a `null` renders as an em dash, never `0`.

The one exception in the codebase is `LearnChapterHeader`, which formats
`lastReviewed` with an explicitly pinned `"en-US"` locale. It is shell chrome,
not lesson content. Do not treat it as precedent.

### Charts are hand-written SVG

Fluid `viewBox`. No chart library, no `<canvas>`, no `ResizeObserver`. A PR
adding a charting dependency to a lesson will be declined.

### Hrefs come from `chapterHref()`

`trailingSlash: true` is global, so a missing slash costs a 308 redirect on every
navigation. [`learn-nav.ts`](../../src/lib/learn-nav.ts) is the only place
chapter hrefs are constructed.

### Colour

Text colours must meet WCAG AA on the cream background. Two-class charts must
vary mark **shape** as well as hue — fern and rust converge under deuteranopia.

---

## 7. Adding a brand-new track

The architecture is deliberately not generalised. `<track>` is a literal route
directory rather than a dynamic segment, and `LearnTrackId` is a closed union.
That buys static typing and static routing at the cost of thirteen edits per
track.

**Do not "fix" this as part of adding a track.** A `[track]` dynamic route is a
separate proposal, not a side effect of contributing content.

**Open a proposal issue with the full track outline before writing any of it.** A
track is a curriculum commitment, not a pull request.

The checklist, in dependency order:

1. [`src/lib/learn-types.ts`](../../src/lib/learn-types.ts) — widen
   `LearnTrackId`. Everything else now fails to typecheck; that is your map.
2. [`src/lib/links.ts`](../../src/lib/links.ts) —
   `export const LEARN_<TRACK>_HREF = "/learn/<track>";`
3. `src/lib/<track>-lessons.ts` — `<TRACK>_PARTS` **declared before**
   `<TRACK>_CHAPTERS` (see §8 for why), part ids matching `[a-z-]+` with **no
   digits**.
4. [`src/lib/learn-nav.ts`](../../src/lib/learn-nav.ts) — add to `TRACKS` **and**
   to `PUBLISHED`. Both are `Record<LearnTrackId, …>`, so TypeScript points at
   exactly these two spots.
5. `src/components/<track>/<Name>Lesson.tsx` — at least one body.
6. `src/components/<track>/<Track>LessonCover.tsx` — a cover map with a stable
   exported const name.
7. `src/app/learn/<track>/(chapters)/layout.tsx` — a pass-through. Copy the
   comment from the ML one verbatim; it explains why the route group exists
   (a layout under `[slug]` unmounts on every chapter navigation and resets the
   sidebar's scroll position).
8. `src/app/learn/<track>/(chapters)/[slug]/page.tsx` — copy the ML file, rename
   `TRACK` and the bodies const, swap the end-of-track pager copy.
9. `src/app/learn/<track>/page.tsx` — the track index.
10. [`scripts/lib/learn-source.mjs`](../../scripts/lib/learn-source.mjs) — add the
    track descriptor, or the validator will not check your track at all.
11. [`src/components/TopicCover.tsx`](../../src/components/TopicCover.tsx) — add a
    `TopicCoverVariant` and its art entry. Easy to miss; the compiler only
    catches it once you do step 12.
12. [`src/app/learn/page.tsx`](../../src/app/learn/page.tsx) — add a card to the
    local `tracks` array.
13. `README.md` — add a row to the track table.

---

## 8. Validator failures and their fixes

Every message [`scripts/validate-learn-nav.mjs`](../../scripts/validate-learn-nav.mjs)
can emit.

| Message | Cause | Fix |
| --- | --- | --- |
| `Parsed zero chapters — the scan pattern is out of date.` | The block splitter is `split(/\n  \{\n/)`. Your chapter objects are not at exactly two-space indentation, or `{` is not alone on its line. | Format as `  {`, fields at four spaces, closing `  },`. There is no Prettier in this repo — nothing will fix indentation for you. |
| `partId "x" does not match any part.` | Part ids are found by `/id:\s*"([a-z-]+)",\n\s*number:/`. **A digit in a part id never registers** (`part-1` will not be found), and `number:` must be the very next line. | Rename the part id to letters and hyphens only. |
| the same error on *every* chapter | Your `_PARTS` const is declared *after* `_CHAPTERS`. The scan slices from the chapters const and never sees the parts. | Move `_PARTS` above `_CHAPTERS`. |
| `Duplicate slug: x` | Two chapters share a slug. | Rename one. |
| `Chapter order is not contiguous at N (expected M).` | `order` must run 1..N with no gaps, **counting drafts**. | Renumber. Inserting mid-track means renumbering everything after it — that is deliberate, so reading order stays visible in the diff. |
| `prerequisite "p" does not exist.` | Typo, or the prerequisite is in another track. | Prerequisites are within-track slugs only. |
| `x (order N) requires "p" (order M), which comes later.` | Prerequisites must have a strictly lower `order`. | Reorder, or drop it. List only *non-adjacent* prerequisites — the previous chapter is implied. |
| `duplicate heading id "x".` | Two headings in one chapter share an id. | Rename one. |
| `heading id "x" is not kebab-case.` | Pattern is `^[a-z0-9]+(-[a-z0-9]+)*$`. No leading or trailing hyphen, no `--`, no underscore, no uppercase. | Fix the id. |
| `x is published but has no entry in ML_LESSON_BODIES.` | Published without registering the body. | Register it, or set `status: "draft"`. |
| `cannot read body component X.tsx` | Either the file is not at `src/components/<track>/X.tsx`, or **the component name contains a digit** — the extractor is `([A-Za-z]+)` and truncates at the first one. | Rename the component to letters only. Slugs may contain digits; component names may not. |
| `heading "x" is authored in data but no element in X.tsx carries id="x"` | The check is a literal `body.includes('id="x"')`. A computed or single-quoted id will not match. | Write `<LessonSection id="x" …>` literally. |
| `x is published but has no entry in COVERS.` | No cover art. Both cover components fall back to a default when a slug is missing — "a silent fallback is not a safety net, it is a hidden bug". | Add real art. |
| `x: thumbnail "..." does not exist on disk.` | A declared `thumbnail` path is missing. | Leave `thumbnail` unset; nothing renders it today. |
| `x is a draft but is registered in ML_LESSON_BODIES.` | You registered the body but did not flip the status, or flipped it back. | Pick a state and be fully in it. See §1. |

---

## 9. Checking your work

```bash
npm run learn:check   # ~200ms. Run it after every edit to a data file.
npm run check         # lint + typecheck + build. The same gate CI runs.
npm run dev           # then read /learn/<track>/<slug>/  ← trailing slash required
```

Then read it back in the browser:

- [ ] Every table-of-contents entry scrolls to the right place
- [ ] The prev/next pager shows the right neighbours
- [ ] The card on the track index shows *your* cover, not the fallback
- [ ] It reads correctly at 375px and at 1440px
- [ ] It is readable with `prefers-reduced-motion` enabled
- [ ] Your interactive, if any, produces identical output on reload (no hydration warning in the console)

---

## 10. Getting it reviewed

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the proposal flow, the pull
request conventions, and the review bar.
