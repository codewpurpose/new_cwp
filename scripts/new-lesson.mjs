#!/usr/bin/env node
/**
 * new-lesson.mjs — scaffold a DRAFT lesson.
 *
 * Writes one new file (the prose body) and makes one edit (append a
 * `status: "draft"` chapter to the track's data module). Everything that makes
 * a lesson reachable — the [slug] bodies map, the cover map, the status flip —
 * is deliberately left to a human.
 *
 * That is not laziness. The validator rejects a *registered draft* as hard as
 * it rejects an unregistered publication, so "half scaffolded" is not a legal
 * state. And a placeholder cover is worse than no cover: it compiles, it
 * renders, and it survives review. An unregistered draft is the one shape a
 * half-finished lesson can safely take.
 *
 * Re-runs the validator after writing and restores the original bytes if it
 * fails, so this script cannot hand back a repo where `learn:check` is red.
 *
 * Usage:
 *   npm run learn:new -- --track ml --slug decision-trees --title "Decision Trees"
 *
 * Full guide: docs/contributing/LESSON_AUTHORING.md
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";
import { REPO_ROOT, TRACKS, parseChapters, parsePartIds, trackByName } from "./lib/learn-source.mjs";

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VALIDATOR = join(REPO_ROOT, "scripts", "validate-learn-nav.mjs");
const TRACK_NAMES = TRACKS.map((t) => t.name);

function die(message) {
  console.error(`\nlearn:new — ${message}\n`);
  process.exit(1);
}

function rel(path) {
  return relative(REPO_ROOT, path);
}

/** "decision-trees" -> "DecisionTrees" */
function toPascal(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

/** "The score is a lottery ticket" -> "the-score-is-a-lottery-ticket" */
function toKebab(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Escape a value destined for a double-quoted TS string literal. */
function quote(text) {
  return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

let parsed;
try {
  parsed = parseArgs({
    options: {
      track: { type: "string" },
      slug: { type: "string" },
      title: { type: "string" },
      part: { type: "string" },
      description: { type: "string" },
      level: { type: "string", default: "beginner" },
      minutes: { type: "string", default: "10" },
      tags: { type: "string", default: "Foundations" },
      headings: { type: "string" },
      component: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
    allowPositionals: false,
  });
} catch (error) {
  die(`${error.message}\n\nTry: npm run learn:new -- --help`);
}

const opts = parsed.values;

if (opts.help) {
  console.log(`
learn:new — scaffold a draft lesson

  npm run learn:new -- --track <${TRACK_NAMES.join("|")}> --slug <kebab-slug> --title "Title"

Options
  --track        Which learning track. One of: ${TRACK_NAMES.join(", ")}
  --slug         URL slug, kebab-case. Must be unique within the track.
  --title        Chapter title, as the reader sees it.
  --part         Part id to file it under. Defaults to the track's last part.
  --description  Two sentences: the tension, then what the reader will do.
  --level        beginner | intermediate | advanced   (default: beginner)
  --minutes      Estimated reading time                (default: 10)
  --tags         Comma-separated                       (default: Foundations)
  --headings     Semicolon-separated section headings. Commas are common inside
                 heading text, which is why the separator is ";".
  --component    PascalCase component name. Letters only — the validator
                 extracts it with ([A-Za-z]+) and would silently truncate a
                 name containing a digit. Defaults to <Slug>Lesson.
  --dry-run      Print what would be written, change nothing.

Creates a status:"draft" chapter, which is excluded from routing, the sidebar
and the pager. Commit it freely — the build stays green until you publish.

Full guide: docs/contributing/LESSON_AUTHORING.md
`);
  process.exit(0);
}

// Prompt only when a human is actually watching. An agent running this in CI
// or a subshell must get a clean error rather than hang forever on stdin.
const interactive = process.stdin.isTTY && process.stdout.isTTY;

async function demand(name, value, hint) {
  if (value) return value;
  if (!interactive) die(`--${name} is required.${hint ? ` ${hint}` : ""}`);
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`${name}${hint ? ` (${hint})` : ""}: `)).trim();
  rl.close();
  if (!answer) die(`--${name} is required.`);
  return answer;
}

const trackName = await demand("track", opts.track, TRACK_NAMES.join(" | "));
const track = trackByName(trackName);
if (!track) die(`unknown track "${trackName}". Expected one of: ${TRACK_NAMES.join(", ")}`);

const dataSource = readFileSync(track.data, "utf8");
const existing = parseChapters(dataSource, track.chaptersConst);
const partIds = parsePartIds(dataSource);

if (existing.length === 0) {
  die(
    `parsed zero chapters from ${rel(track.data)}. The source scan is out of date — ` +
      `fix scripts/lib/learn-source.mjs before scaffolding.`,
  );
}

const slug = (await demand("slug", opts.slug, "kebab-case")).trim();
const title = (await demand("title", opts.title)).trim();

const partId = (opts.part ?? existing[existing.length - 1]?.partId ?? [...partIds][0] ?? "").trim();

const component = (opts.component ?? `${toPascal(slug)}Lesson`).trim();

const headingTexts = (opts.headings ?? "TODO first section;TODO second section;TODO third section")
  .split(";")
  .map((text) => text.trim())
  .filter(Boolean);

const headings = headingTexts.map((text) => ({ id: toKebab(text), text }));

const description =
  opts.description?.trim() ||
  "TODO: two sentences. Name the tension, then say what the reader will do.";

const level = opts.level.trim();
const minutes = Number(opts.minutes);
const tags = opts.tags
  .split(",")
  .map((tag) => tag.trim())
  .filter(Boolean);

// ---------------------------------------------------------------------------
// Preflight — every check runs before anything is written
// ---------------------------------------------------------------------------

if (!KEBAB.test(slug)) {
  die(`slug "${slug}" is not kebab-case. Expected lowercase letters, digits and single hyphens.`);
}

const collision = existing.find((chapter) => chapter.slug === slug);
if (collision) {
  die(`slug "${slug}" already exists in the ${track.name} track (order ${collision.order}).`);
}

if (!partIds.has(partId)) {
  die(
    `part "${partId}" does not exist in ${rel(track.data)}.\n` +
      `  Available parts: ${[...partIds].join(", ")}`,
  );
}

if (!/^[A-Za-z]+$/.test(component)) {
  die(
    `component name "${component}" must be letters only.\n` +
      `  The validator extracts it with ([A-Za-z]+) and would truncate at the first\n` +
      `  digit, then fail with "cannot read body component". Slugs may contain digits;\n` +
      `  component names may not. Pass --component with a letters-only PascalCase name.`,
  );
}

if (!["beginner", "intermediate", "advanced"].includes(level)) {
  die(`level "${level}" must be one of: beginner, intermediate, advanced.`);
}

if (!Number.isInteger(minutes) || minutes <= 0) {
  die(`minutes "${opts.minutes}" must be a positive integer.`);
}

for (const heading of headings) {
  if (!KEBAB.test(heading.id)) {
    die(`heading "${heading.text}" produces id "${heading.id}", which is not kebab-case.`);
  }
}

const seenHeadings = new Set();
for (const heading of headings) {
  if (seenHeadings.has(heading.id)) die(`duplicate heading id "${heading.id}".`);
  seenHeadings.add(heading.id);
}

const bodyFile = join(track.bodiesDir, `${component}.tsx`);
if (existsSync(bodyFile)) {
  die(`${rel(bodyFile)} already exists. Pass --component to pick a different name.`);
}

const order = Math.max(0, ...existing.map((chapter) => chapter.order)) + 1;

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/**
 * Emit the chapter literal in exactly the shape the source scan expects:
 * the object opens as `  {` alone on its line and closes as `  },`, with
 * fields at four spaces. There is no formatter in this repo to fix it later.
 */
function renderChapter() {
  const headingLines = headings.map(
    (heading) => `      { id: "${quote(heading.id)}", text: "${quote(heading.text)}", level: 2 },`,
  );

  return [
    "  {",
    `    slug: "${quote(slug)}",`,
    `    partId: "${quote(partId)}",`,
    `    order: ${order},`,
    `    title: "${quote(title)}",`,
    "    description:",
    `      "${quote(description)}",`,
    `    level: "${level}",`,
    `    minutes: ${minutes},`,
    "    prerequisites: [],",
    `    tags: [${tags.map((tag) => `"${quote(tag)}"`).join(", ")}],`,
    "    headings: [",
    ...headingLines,
    "    ],",
    '    status: "draft",',
    "  },",
  ].join("\n");
}

/**
 * The prose skeleton, with section ids already matching the authored headings
 * so the chapter is internally consistent from its first commit.
 */
function renderBody() {
  const sections = headings
    .map((heading) =>
      [
        `      <LessonSection id="${quote(heading.id)}" title="${quote(heading.text)}">`,
        "        <P>TODO: write this section.</P>",
        "      </LessonSection>",
      ].join("\n"),
    )
    .join("\n\n");

  return `import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";

export function ${component}() {
  return (
    <div>
      <Lead>
        TODO: open by naming a belief the reader probably holds, then take it
        apart. Do not summarise what the lesson covers.
      </Lead>

${sections}

      <TakeawayCard
        items={[
          "TODO: a full sentence somebody could disagree with.",
          "TODO: another.",
        ]}
      />
    </div>
  );
}
`;
}

/**
 * Append a chapter to the CHAPTERS array.
 *
 * The anchor is `\\n];` — a closing bracket at column zero. No nested array in
 * these files can produce that: `prerequisites: []` is inline and `headings: [`
 * closes at four spaces. That is what makes this the one edit worth doing by
 * regex.
 */
function appendChapter(source, chaptersConst, block) {
  const declaration = `export const ${chaptersConst}`;
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error(`could not find "${declaration}" in ${rel(track.data)}.`);

  const close = source.indexOf("\n];", start);
  if (close === -1) throw new Error(`could not find the end of ${chaptersConst}.`);

  return `${source.slice(0, close)}\n${block}${source.slice(close)}`;
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

const chapterBlock = renderChapter();

if (opts["dry-run"]) {
  console.log(`\nlearn:new — dry run, nothing written.\n`);
  console.log(`Would create ${rel(bodyFile)}:\n`);
  console.log(renderBody());
  console.log(`Would append to ${rel(track.data)} (order ${order}):\n`);
  console.log(chapterBlock);
  console.log("");
  process.exit(0);
}

let nextSource;
try {
  nextSource = appendChapter(dataSource, track.chaptersConst, chapterBlock);
} catch (error) {
  die(error.message);
}

writeFileSync(bodyFile, renderBody(), "utf8");
writeFileSync(track.data, nextSource, "utf8");

// ---------------------------------------------------------------------------
// Verify, or undo
// ---------------------------------------------------------------------------

const check = spawnSync(process.execPath, [VALIDATOR], { cwd: REPO_ROOT, encoding: "utf8" });

if (check.status !== 0) {
  writeFileSync(track.data, dataSource, "utf8");
  rmSync(bodyFile, { force: true });
  console.error(check.stdout ?? "");
  console.error(check.stderr ?? "");
  die("the validator rejected the scaffold, so nothing was changed. Please report this.");
}

// ---------------------------------------------------------------------------
// Next steps
// ---------------------------------------------------------------------------

console.log(`
Scaffolded a DRAFT lesson.

  created  ${rel(bodyFile)}
  edited   ${rel(track.data)}  (order ${order}, status: "draft")

${(check.stdout ?? "").trim()}

Drafts are excluded from routing, the sidebar and the pager, so you can commit
and push this right now without breaking anything.

Write the lesson first. Then publish it in this order — registering before
flipping the status keeps the build green the whole way:

  1. Add cover art in ${rel(track.coverFile)}:
       "${slug}": ${toPascal(slug)}Cover,

  2. Register the body in ${rel(track.route)}:
       import { ${component} } from "@/components/${track.name}/${component}";
       "${slug}": ${component},

  3. Flip status to "published" in ${rel(track.data)}.

  4. npm run learn:check && npm run check

Voice, primitives, and the full checklist: docs/contributing/LESSON_AUTHORING.md
`);
