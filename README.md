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

npm run learn:check  # validate the lesson graph
npm run learn:new -- --track ml --slug my-lesson --title "My Lesson"  # scaffold a draft lesson
```

`npm run learn:check` validates the lesson navigation on its own. It also runs automatically on `prebuild`, so a broken lesson graph fails the build rather than shipping.

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — design tokens, no config file
- **Motion** — animation
- **Base UI + shadcn/ui** — accessible primitives
- **Lucide React** — icons, alongside custom SVG marks

## The Learn Section

Five self-paced tracks live under `/learn`. All run on the same documentation shell — sidebar, table of contents, prev/next pager — so they read as one product.

| Track | Path | Content |
| ----- | ---- | ------- |
| Machine Learning | `/learn/ml` | 22 chapters, absolute basics through neural networks and production |
| Vibe Coding | `/learn/vibecoding` | 29 chapters, setup through advanced practice |
| Python | `/learn/python` | 31 chapters, first line of code through nested data and a tested capstone project |
| Financial Literacy | `/learn/financial-literacy` | 24 chapters, first budget through investing, taxes, and a one-page plan |
| Health in Tech | `/learn/health-in-tech` | 24 chapters, what health tech is through AI bias, security, and a capstone |
| Roblox Studio | `/learn/roblox` | 14 chapters, a blank baseplate through a published obby in Luau |

Every ML lesson is built around a single hero interactive: one control the reader drags, with the concept made *felt* before it is named. Drag a decision threshold and watch precision trade against recall; stack hand-written rules and watch each one buy less than the last.

These lessons are original work. An earlier version of this site vendored third-party lesson bundles; those were removed and rewritten from scratch, which is what makes the CodeWithPurpose byline on them accurate.

### How lessons are built

A lesson is three files plus a registration:

```
src/lib/ml/<topic>-data.ts          Seeded data + pure query functions
src/components/ml/<Name>.tsx        The interactive ("use client")
src/components/ml/<Name>Lesson.tsx  The prose
```

then an entry in `ML_CHAPTERS` (or `VIBECODING_CHAPTERS`), one in the `[slug]` body map, and one in the cover map.

A chapter is either a **draft** — `status: "draft"`, registered nowhere — or **published**, registered in both maps. The validator rejects every state in between, which is what makes a half-written lesson safe to commit: drafts are excluded from routing, so the build stays green until you deliberately publish.

Two rules are load-bearing rather than stylistic:

- **Data is seeded at module scope** so the server and the client render byte-identically. Hydration mismatches are prevented by construction, not patched afterward.
- **`toLocaleString` and `Intl.NumberFormat` are banned** in lesson modules. They are locale- and ICU-dependent, which makes them the likeliest source of a server/client mismatch in a component printing forty numbers. Use `toFixed`.

Charts are hand-written SVG with a fluid `viewBox` — no chart library, no canvas, no `ResizeObserver`.

## Contribute a lesson

Lessons are the main thing we want from outside contributors. Both tracks are open, and new topics are welcome.

1. **Propose it first.** Open a [lesson proposal issue](../../issues/new?template=lesson_proposal.yml) with the track, the one idea the reader leaves with, and your section headings. A maintainer confirms the slot before you write anything — a lesson is several hundred lines of prose plus hand-drawn cover art, and we would rather spend ten minutes on the shape than have you write a day's work we cannot merge.

2. **Scaffold it.**

   ```bash
   npm run learn:new -- --track ml --slug your-slug --title "Your Title"
   ```

   This creates a `status: "draft"` chapter and a prose skeleton, then validates itself and rolls back if anything is wrong. Drafts are excluded from routing, so you can commit and push half-finished work without breaking the build.

3. **Write it.** [`docs/contributing/LESSON_AUTHORING.md`](docs/contributing/LESSON_AUTHORING.md) has the anatomy, a full worked example, the prose-primitive API, the house voice standard, and every validator error with its fix. Read it before you start — it is the difference between one review round and four.

4. **Check it.** `npm run learn:check` while you work, `npm run check` before you push.

Full process, pull request conventions, and the review bar: [CONTRIBUTING.md](CONTRIBUTING.md). Working with an AI agent is encouraged — [`AGENTS.md`](AGENTS.md) points it at the right guide.

## Project Structure

```
src/
  app/              Routes (App Router)
    learn/          The five lesson tracks
  components/
    learn/primitives/  Prose primitives — lessons are composed from these
    learn/shell/       Sidebar, TOC, pager, chapter header (track-agnostic)
    ml/             ML lesson interactives and prose
    vibecoding/     Vibe coding chapters
    python/         Python lesson interactives and prose
    financial-literacy/  Financial literacy interactives and prose
    health-in-tech/      Health in tech interactives and prose
    ui/             shadcn/ui primitives
  lib/
    ml/             Seeded lesson data and pure math helpers
    images.ts       Asset path map
    learn-types.ts  Shared chapter, part, and track types
    learn-nav.ts    Lesson graph: ordering, prerequisites, adjacency
public/
  learn/shared/     Design tokens and docs shell CSS
  seo/              Favicons and OG images
scripts/
  validate-learn-nav.mjs  Lesson graph validator (runs on prebuild)
  new-lesson.mjs          Draft-lesson scaffold
  lib/learn-source.mjs    Shared track descriptors and source parser
docs/
  contributing/
    LESSON_AUTHORING.md   Everything you need to write a lesson
```

## Design Tokens

Tokens live in `public/learn/shared/learn-tokens.css` as plain CSS custom properties, and are mapped to Tailwind utilities through the `@theme inline` block in `globals.css`. The `inline` keyword matters — without it the utilities bake in literal values instead of emitting `var()`, and runtime theming breaks.

Colors used as text meet WCAG AA on the cream background. The chart palette additionally avoids relying on fern-and-rust as the sole distinction between two states, since those converge under deuteranopia; two-class charts vary mark shape as well as hue.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md) — what we want, how to propose it, and the review bar. For lessons specifically, [`docs/contributing/LESSON_AUTHORING.md`](docs/contributing/LESSON_AUTHORING.md) is the deep guide.

Run `npm run check` before pushing. It runs lint, typecheck, the lesson-graph validator, and a production build — the same gate CI uses.

Project instructions for AI coding agents live in `AGENTS.md`, which `CLAUDE.md` and the other platform files import. After editing it, run `bash scripts/sync-agent-rules.sh` to regenerate them.

## License

[Apache License 2.0](LICENSE) © CodeWithPurpose.

Earlier releases were MIT licensed; that notice is retained in [NOTICE](NOTICE)
as the MIT License requires.
