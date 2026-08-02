/**
 * learn-source.mjs — where the /learn curriculum lives on disk, and how to read
 * it back out of TypeScript source.
 *
 * Shared by validate-learn-nav.mjs (which checks the curriculum) and
 * new-lesson.mjs (which appends to it). They must agree byte for byte: if the
 * scaffold emitted a chapter the validator could not parse, the failure would
 * surface as "Parsed zero chapters" on somebody else's unrelated PR.
 *
 * Deliberately a source scan rather than an import: the data modules are
 * TypeScript with @/ path aliases, and adding a transpile step to a pre-build
 * hook is more machinery than these checks are worth.
 *
 * The block-splitting regex assumes chapter objects are formatted at two-space
 * indentation. A data file formatted differently parses as zero chapters, which
 * the caller is expected to catch loudly rather than pass silently.
 */

import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * One entry per learning track. Adding a track means adding a descriptor here —
 * see the new-track checklist in docs/contributing/LESSON_AUTHORING.md.
 */
export const TRACKS = [
  {
    name: "vibecoding",
    title: "Vibe Coding",
    data: join(REPO_ROOT, "src", "lib", "vibecoding-lessons.ts"),
    chaptersConst: "VIBECODING_CHAPTERS",
    route: join(REPO_ROOT, "src", "app", "learn", "vibecoding", "(chapters)", "[slug]", "page.tsx"),
    bodiesDir: join(REPO_ROOT, "src", "components", "vibecoding"),
    bodiesConst: "LESSON_BODIES",
    coverFile: join(REPO_ROOT, "src", "components", "vibecoding", "VibecodingIcons.tsx"),
    coverConst: "VIBECODING_GLYPHS",
    partKeyedCover: false,
  },
  {
    name: "python",
    title: "Python",
    data: join(REPO_ROOT, "src", "lib", "python-lessons.ts"),
    chaptersConst: "PYTHON_CHAPTERS",
    route: join(REPO_ROOT, "src", "app", "learn", "python", "(chapters)", "[slug]", "page.tsx"),
    bodiesDir: join(REPO_ROOT, "src", "components", "python"),
    bodiesConst: "PYTHON_LESSON_BODIES",
    coverFile: join(REPO_ROOT, "src", "components", "python", "PythonLessonCover.tsx"),
    coverConst: "COVERS",
    partKeyedCover: false,
  },
  {
    name: "ml",
    title: "Machine Learning",
    data: join(REPO_ROOT, "src", "lib", "ml-lessons.ts"),
    chaptersConst: "ML_CHAPTERS",
    route: join(REPO_ROOT, "src", "app", "learn", "ml", "(chapters)", "[slug]", "page.tsx"),
    bodiesDir: join(REPO_ROOT, "src", "components", "ml"),
    bodiesConst: "ML_LESSON_BODIES",
    coverFile: join(REPO_ROOT, "src", "components", "ml", "MlLessonCover.tsx"),
    coverConst: "COVERS",
    partKeyedCover: false,
  },
];

/** Look a track up by its `name`. Returns undefined for an unknown track. */
export function trackByName(name) {
  return TRACKS.find((track) => track.name === name);
}

/** Pull one field out of a chapter object literal. */
export function field(block, name, { quoted = true } = {}) {
  const pattern = quoted
    ? new RegExp(`${name}:\\s*"([^"]*)"`)
    : new RegExp(`${name}:\\s*([0-9]+)`);
  const match = block.match(pattern);
  return match ? match[1] : undefined;
}

/**
 * Parse the chapter objects out of a track's data module.
 *
 * Slices from the chapters const so that a `_PARTS` array declared *after*
 * `_CHAPTERS` is invisible — which is why the part-id check fails on every
 * chapter when the declaration order is wrong, rather than on none of them.
 */
export function parseChapters(source, chaptersConst) {
  const start = source.indexOf(chaptersConst);
  const blocks = source
    .slice(start)
    .split(/\n  \{\n/)
    .slice(1)
    .map((block) => block.split(/\n  \},?/)[0]);

  return blocks.map((block) => ({
    slug: field(block, "slug"),
    partId: field(block, "partId"),
    order: Number(field(block, "order", { quoted: false })),
    status: field(block, "status"),
    thumbnail: field(block, "thumbnail"),
    prerequisites: (block.match(/prerequisites:\s*\[([^\]]*)\]/)?.[1] ?? "")
      .split(",")
      .map((s) => s.trim().replace(/^"|"$/g, ""))
      .filter(Boolean),
    headingIds: [...block.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map((m) => m[1]),
  }));
}

/**
 * Part ids declared in a track's data module.
 *
 * Matches `id: "..."` only when `number:` is the very next line, which is what
 * distinguishes a part from a heading. Note the character class: a part id
 * containing a digit will never be found here.
 */
export function parsePartIds(source) {
  return new Set([...source.matchAll(/id:\s*"([a-z-]+)",\n\s*number:/g)].map((m) => m[1]));
}
