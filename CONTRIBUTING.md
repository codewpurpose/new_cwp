# Contributing to CodeWithPurpose

Thanks for wanting to help. This is a student-run nonprofit making coding
education free, and the site is built by volunteers.

## What we most want

**Lessons.** That is the main thing. Both tracks under `/learn` are open, and new
topics are welcome. In rough order of usefulness to us:

1. **A new lesson in an existing track** — Machine Learning or Vibe Coding. Best
   place to start.
2. **A fix or improvement to an existing lesson** — a wrong claim, a confusing
   passage, a broken interactive. Genuinely valuable and much smaller.
3. **An interactive for a lesson that has none** — several lessons are prose-only
   and would land harder with one control to drag.
4. **A whole new track** — a new topic entirely. Talk to us first; see below.
5. **Site and marketing changes** — lowest priority. We may decline these without
   it being a judgement on the work.

## Propose it before you write it

**Open a [lesson proposal issue](../../issues/new?template=lesson_proposal.yml)
and wait for a maintainer to confirm the slot before you start writing.**

This is not bureaucracy. A lesson is several hundred lines of prose plus
hand-drawn SVG cover art. Rejecting one after it is written wastes a real day of
somebody's life, and we would rather spend ten minutes agreeing on the shape up
front.

A proposal is short:

- Which track, and where it goes — which part, before or after which chapter
- Proposed slug and title
- **The one idea the reader leaves with**
- The misconception it corrects
- The interactive, if any: the *one* control the reader manipulates, and what
  changes on screen when they do
- Your 3–6 section headings
- Any non-adjacent prerequisites

A new track needs the same thing for the whole curriculum, not one lesson. A
track is a commitment to finish it.

## Setup

```bash
git clone https://github.com/codewpurpose/new_cwp
cd new_cwp
npm install
npm run dev
```

Node 24+ is required.

## Writing the lesson

Read **[docs/contributing/LESSON_AUTHORING.md](docs/contributing/LESSON_AUTHORING.md)**
before you start. It has the anatomy, a full worked example, the prose-primitive
API, the house voice standard, and every validator error with its fix. It is the
difference between one review round and four.

Scaffold with:

```bash
npm run learn:new -- --track ml --slug your-slug --title "Your Title"
```

This creates a `status: "draft"` chapter and a prose skeleton. **Drafts are
excluded from routing, so you can commit and push half-finished work without
breaking anything.**

## Pull requests

- Fork, then branch: `lesson/<track>-<slug>` or `fix/<short-description>`
- Commit as you go — a draft chapter is always safe to push
- Run `npm run check` before opening the PR. It runs lint, typecheck, the lesson
  validator and a production build — the same gate CI uses.
- **One lesson per PR.** A PR that adds a lesson *and* refactors the learn shell
  will be asked to split.
- Link your proposal issue.

CI runs on every PR. Green is required, but not sufficient — the voice and
pedagogy are reviewed by a person.

## The review bar

Use this as a self-review before you open the PR.

**Gets merged:**

- The lead paragraph names a belief the reader probably holds, then dismantles it
- Claims are concrete and numeric wherever numbers exist
- Every takeaway is a full sentence somebody could disagree with
- Composed entirely from the existing primitives
- The interactive has exactly one primary control, and the concept is *felt*
  before it is named
- Data is seeded at module scope; no `toLocaleString`
- Reads correctly at 375px and with reduced motion
- The cover art is a miniature of that lesson's own chart

**Gets sent back:**

- Generic-textbook voice — could have been written about any topic by anyone
- Hype, emoji, exclamation marks, "let's dive in", "in today's fast-paced world"
- **Copied or lightly paraphrased from another course, book, or blog.** Stated
  plainly because it matters: an earlier version of this site vendored
  third-party lesson bundles. Those were removed and rewritten from scratch,
  which is what makes the CodeWithPurpose byline on these lessons accurate. We
  are not going back.
- Hand-rolled styled `div`s instead of primitives
- Renamed heading ids on an existing lesson — those are permanent links
- Placeholder or fallback cover art
- A new chart library, a `<canvas>`, or an MDX pipeline
- Bundled with an unrelated refactor

## Using an AI agent

Encouraged. Two conditions:

1. Point it at `docs/contributing/LESSON_AUTHORING.md` explicitly. `AGENTS.md`
   in the repo root already tells it to, but say so anyway.
2. Read every word before you push. You are the author; the byline is yours.

Honestly: the voice standard in §4 of the guide is the thing agents get wrong
most consistently. Expect to rewrite the lead paragraph yourself.

## Found a problem in a lesson?

Open a [bug report](../../issues/new?template=bug_report.yml) with the page URL,
what it says, and what is actually true. You do not need to fix it yourself.

## Questions

Ask on [Discord](https://discord.gg/W948bWbCAK).

## Licence and conduct

Contributions are MIT licensed, same as the project.

Be decent to each other. This is a student project and many contributors are
beginners — that is the point of it.
