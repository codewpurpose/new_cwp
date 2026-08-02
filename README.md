# CodeWithPurpose

The website for [CodeWithPurpose](https://codewithpurpose.org) — a student-run nonprofit making coding education free for everyone, everywhere.

We got tired of $15,000 bootcamps deciding who gets to learn. So we built free courses, real curriculum, and a community of volunteers that now reaches students in 130+ countries. In March 2026 the work was recognized by U.S. Representative Mark DeSaulnier for "tremendous leadership and service to your community."

This repository is the marketing site *and* the learning platform — the interactive lessons are part of the app, not an embed.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Requires Node.js 24+.

## Commands

```bash
npm run dev        # Start the dev server
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build — run this before pushing
```

`npm run learn:check` validates the lesson navigation on its own. It also runs automatically on `prebuild`, so a broken lesson graph fails the build rather than shipping.

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — design tokens, no config file
- **Motion** — animation
- **Base UI + shadcn/ui** — accessible primitives
- **Lucide React** — icons, alongside custom SVG marks

## The Learn Section

Two self-paced tracks live under `/learn`. Both run on the same documentation shell — sidebar, table of contents, prev/next pager — so they read as one product.

| Track | Path | Content |
| ----- | ---- | ------- |
| Machine Learning | `/learn/ml` | 7 lessons, absolute basics through measuring a model |
| Vibe Coding | `/learn/vibecoding` | 29 chapters, setup through advanced practice |

Every ML lesson is built around a single hero interactive: one control the reader drags, with the concept made *felt* before it is named. Drag a decision threshold and watch precision trade against recall; stack hand-written rules and watch each one buy less than the last.

These lessons are original work. An earlier version of this site vendored third-party lesson bundles; those were removed and rewritten from scratch, which is what makes the CodeWithPurpose byline on them accurate.

### How lessons are built

A lesson is three files plus a registration:

```
src/lib/ml/<topic>-data.ts          Seeded data + pure query functions
src/components/ml/<Name>.tsx        The interactive ("use client")
src/components/ml/<Name>Lesson.tsx  The prose
```

then an entry in `ML_LESSONS` (or `VIBECODING_LESSONS`) and in the `[slug]` body map.

Two rules are load-bearing rather than stylistic:

- **Data is seeded at module scope** so the server and the client render byte-identically. Hydration mismatches are prevented by construction, not patched afterward.
- **`toLocaleString` and `Intl.NumberFormat` are banned** in lesson modules. They are locale- and ICU-dependent, which makes them the likeliest source of a server/client mismatch in a component printing forty numbers. Use `toFixed`.

Charts are hand-written SVG with a fluid `viewBox` — no chart library, no canvas, no `ResizeObserver`.

## Project Structure

```
src/
  app/              Routes (App Router)
    learn/          The two lesson tracks
  components/
    ml/             ML lesson interactives and prose
    vibecoding/     Vibe coding chapters
    ui/             shadcn/ui primitives
  lib/
    ml/             Seeded lesson data and pure math helpers
    images.ts       Asset path map
    learn-nav.ts    Lesson graph: ordering, prerequisites, adjacency
public/
  learn/shared/     Design tokens and docs shell CSS
  seo/              Favicons and OG images
scripts/
  validate-learn-nav.mjs  Lesson graph validator (runs on prebuild)
docs/
  research/         Inspection guide for reverse-engineering reference sites
```

## Design Tokens

Tokens live in `public/learn/shared/learn-tokens.css` as plain CSS custom properties, and are mapped to Tailwind utilities through the `@theme inline` block in `globals.css`. The `inline` keyword matters — without it the utilities bake in literal values instead of emitting `var()`, and runtime theming breaks.

Colors used as text meet WCAG AA on the cream background. The chart palette additionally avoids relying on fern-and-rust as the sole distinction between two states, since those converge under deuteranopia; two-class charts vary mark shape as well as hue.

## Contributing

Run `npm run check` before pushing. It runs lint, typecheck, the lesson-graph validator, and a production build — the same gate CI uses.

Project instructions for AI coding agents live in `AGENTS.md`, which `CLAUDE.md` and the other platform files import.

## License

MIT
