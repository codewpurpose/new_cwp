<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for the CodeWithPurpose website
alwaysApply: true
---
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CodeWithPurpose

The website for [CodeWithPurpose](https://codewithpurpose.org), a student-run nonprofit making coding education free. This repo is the marketing site *and* the learning platform — the interactive lessons under `/learn` are part of the app, not an embed.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4, no config file. Tokens in `public/learn/shared/learn-tokens.css`, mapped through the `@theme inline` block in `globals.css`
- **UI:** Base UI + shadcn/ui primitives, `cn()` utility
- **Animation:** Motion
- **Icons:** Lucide React, alongside hand-drawn SVG marks

## Commands
- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build and serve
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run learn:check` — validate the lesson graph (also runs on `prebuild`)
- `npm run learn:new -- --track <ml|vibecoding> --slug <slug> --title "..."` — scaffold a draft lesson
- `npm run check` — lint + typecheck + build. The gate CI uses. Run before pushing.

## Working on /learn

**Read `docs/contributing/LESSON_AUTHORING.md` in full before writing or editing any lesson content.** It has the anatomy, a worked example, the prose-primitive API, the voice standard, and every validator failure with its fix. Do not improvise from this file alone.

The short version:

- **A chapter is either a draft or published, never in between.** A draft (`status: "draft"`) is registered nowhere. A published chapter is registered in **both** the `[slug]` bodies map and the cover map. The validator rejects every intermediate state. Scaffold drafts; publish deliberately.
- `<track>` is a **literal route directory**, not a dynamic segment, and `LearnTrackId` is a closed union. Adding a track is 13 edits. Do not "generalise" this as a side effect of another task.
- **Bodies are plain TSX.** There is no MDX in this repo. Do not add a pipeline.
- **Compose from `src/components/learn/primitives/`.** Do not hand-roll a styled block inside a lesson body.
- Heading ids in a chapter's `headings` array are a public API. External links point at them — never rename one.

## Non-negotiables

- **Lesson data is seeded at module scope.** No `Math.random()`, no `Date.now()`, no `new Date()`. Use `mulberry32(<integer literal>)` from `@/lib/ml/random`. Server and client must render byte-identically by construction, not by patching afterwards.
- **`toLocaleString` and `Intl.NumberFormat` are banned in lesson modules.** They are locale- and ICU-dependent, the likeliest source of a hydration mismatch in a component printing forty numbers. Use `toFixed`, via the helpers in `@/lib/ml/format`.
- **Charts are hand-written SVG** with a fluid `viewBox`. No chart library, no `<canvas>`, no `ResizeObserver`.
- Chapter hrefs come only from `chapterHref()` in `learn-nav.ts`. `trailingSlash: true` is global.
- Text colours meet WCAG AA on the cream background. Two-class charts vary mark **shape** as well as hue — fern and rust converge under deuteranopia.

## Code Style
- TypeScript strict, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation. Lesson data files are formatted at two-space object indentation because the validator's source scan depends on it — there is no Prettier here to fix it for you.
- Responsive: mobile-first
- British spelling in reader-facing prose (`behaviour`, `colour`, `optimise`); American in code identifiers and CSS properties

## Project Structure
```
src/
  app/
    learn/              Track index, then <track>/(chapters)/[slug] routes
  components/
    learn/primitives/   Prose primitives — compose lessons from these
    learn/shell/        Sidebar, TOC, pager, chapter header (track-agnostic)
    ml/ vibecoding/     Lesson bodies, interactives, cover art
    ui/                 shadcn/ui primitives
  lib/
    learn-types.ts      LearnTrackId, LearnChapter, LearnPart, LearnHeading
    learn-nav.ts        The lesson graph: ordering, prerequisites, adjacency
    <track>-lessons.ts  Chapter and part data
    ml/                 Seeded lesson data and pure maths helpers
    links.ts            Route and external link constants
    images.ts           Asset path map
public/
  learn/shared/         Design tokens and docs shell CSS
  seo/                  Favicons and OG images
scripts/
  validate-learn-nav.mjs  Lesson-graph validator (runs on prebuild)
  new-lesson.mjs          Draft-lesson scaffold
  lib/learn-source.mjs    Shared track descriptors and source parser
docs/contributing/
  LESSON_AUTHORING.md     The deep guide for lesson contributors
```

## Notes
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate the platform-specific instruction files.
- When launching agent teams, give each teammate its own worktree branch and merge at the end, resolving conflicts with full context of the shared goal.
