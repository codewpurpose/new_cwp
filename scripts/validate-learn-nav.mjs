#!/usr/bin/env node
/**
 * validate-learn-nav.mjs — data-integrity checks for the /learn curriculum.
 *
 * Runs from `prebuild` so a broken curriculum fails the build rather than
 * producing a subtly wrong sidebar at runtime.
 *
 * Deliberately a source scan rather than an import: the data modules are
 * TypeScript with @/ path aliases, and adding a transpile step to a pre-build
 * hook is more machinery than these checks are worth.
 *
 * The block-splitting regex below assumes chapter objects are formatted at
 * two-space indentation. A data file formatted differently parses as zero
 * chapters, which the first check catches loudly rather than passing silently.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const TRACKS = [
  {
    name: "vibecoding",
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
    name: "ml",
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

const problems = [];

/** Pull one field out of a chapter object literal. */
function field(block, name, { quoted = true } = {}) {
  const pattern = quoted
    ? new RegExp(`${name}:\\s*"([^"]*)"`)
    : new RegExp(`${name}:\\s*([0-9]+)`);
  const match = block.match(pattern);
  return match ? match[1] : undefined;
}

function validateTrack(track) {
  const fail = (message) => problems.push(`[${track.name}] ${message}`);

  const source = readFileSync(track.data, "utf8");

  const chaptersStart = source.indexOf(track.chaptersConst);
  const blocks = source
    .slice(chaptersStart)
    .split(/\n  \{\n/)
    .slice(1)
    .map((block) => block.split(/\n  \},?/)[0]);

  const chapters = blocks.map((block) => ({
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

  if (chapters.length === 0) {
    fail("Parsed zero chapters — the scan pattern is out of date.");
    return { chapters, published: 0, parts: 0 };
  }

  // Part ids must resolve.
  const partIds = new Set(
    [...source.matchAll(/id:\s*"([a-z-]+)",\n\s*number:/g)].map((m) => m[1]),
  );
  for (const chapter of chapters) {
    if (!partIds.has(chapter.partId)) {
      fail(`${chapter.slug}: partId "${chapter.partId}" does not match any part.`);
    }
  }

  // Slugs unique.
  const seen = new Set();
  for (const chapter of chapters) {
    if (seen.has(chapter.slug)) fail(`Duplicate slug: ${chapter.slug}`);
    seen.add(chapter.slug);
  }

  // Order contiguous from 1.
  const orders = chapters.map((c) => c.order).sort((a, b) => a - b);
  orders.forEach((order, index) => {
    if (order !== index + 1) {
      fail(`Chapter order is not contiguous at ${order} (expected ${index + 1}).`);
    }
  });

  // Prerequisites resolve and come earlier.
  const bySlug = new Map(chapters.map((c) => [c.slug, c]));
  for (const chapter of chapters) {
    for (const prereq of chapter.prerequisites) {
      const target = bySlug.get(prereq);
      if (!target) {
        fail(`${chapter.slug}: prerequisite "${prereq}" does not exist.`);
      } else if (target.order >= chapter.order) {
        fail(
          `${chapter.slug} (order ${chapter.order}) requires "${prereq}" ` +
            `(order ${target.order}), which comes later.`,
        );
      }
    }
  }

  // Heading ids unique per chapter and kebab-case.
  for (const chapter of chapters) {
    const ids = new Set();
    for (const id of chapter.headingIds) {
      if (ids.has(id)) fail(`${chapter.slug}: duplicate heading id "${id}".`);
      ids.add(id);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
        fail(`${chapter.slug}: heading id "${id}" is not kebab-case.`);
      }
    }
  }

  // Every published chapter must have a body registered, and every authored
  // heading must have a matching anchor in that body.
  const routeSource = readFileSync(track.route, "utf8");
  // Lazy match up to "= {": the type annotation contains "=>", so a greedy
  // [^=]* would stop inside it.
  const bodyMapBlock =
    routeSource.match(
      new RegExp(`${track.bodiesConst}[\\s\\S]*?=\\s*\\{([\\s\\S]*?)\\n\\};`),
    )?.[1] ?? "";
  // Hyphenated slugs must be quoted keys in a JS object literal.
  const registered = new Set(
    [...bodyMapBlock.matchAll(/^\s*"?([a-z0-9-]+)"?\s*:/gm)].map((m) => m[1]),
  );

  for (const chapter of chapters.filter((c) => c.status === "published")) {
    if (!registered.has(chapter.slug)) {
      fail(`${chapter.slug} is published but has no entry in ${track.bodiesConst}.`);
      continue;
    }
    if (chapter.headingIds.length === 0) continue;

    const componentName = bodyMapBlock.match(
      new RegExp(`"?${chapter.slug}"?\\s*:\\s*([A-Za-z]+)`),
    )?.[1];
    if (!componentName) continue;

    let body;
    try {
      body = readFileSync(join(track.bodiesDir, `${componentName}.tsx`), "utf8");
    } catch {
      fail(`${chapter.slug}: cannot read body component ${componentName}.tsx`);
      continue;
    }

    for (const id of chapter.headingIds) {
      if (!body.includes(`id="${id}"`)) {
        fail(
          `${chapter.slug}: heading "${id}" is authored in data but no element in ` +
            `${componentName}.tsx carries id="${id}" — the TOC link would go nowhere.`,
        );
      }
    }
  }

  // Card art must exist for every published chapter.
  //
  // Both cover components fall back to a default when a slug is missing, which
  // is exactly how 21 vibecoding chapters and 6 ML chapters shipped with wrong
  // or absent art. A silent fallback is not a safety net, it is a hidden bug.
  if (track.coverFile) {
    let coverSource;
    try {
      coverSource = readFileSync(track.coverFile, "utf8");
    } catch {
      coverSource = null;
      fail(`cannot read cover component ${track.coverFile}`);
    }

    if (coverSource) {
      if (track.partKeyedCover) {
        // One motif per part: every part used by a published chapter needs one.
        const covered = new Set(
          [...coverSource.matchAll(/^  ([a-z-]+):\s*\{/gm)].map((m) => m[1]),
        );
        const usedParts = new Set(
          chapters.filter((c) => c.status === "published").map((c) => c.partId),
        );
        for (const partId of usedParts) {
          if (!covered.has(partId)) {
            fail(`part "${partId}" has published chapters but no cover motif.`);
          }
        }
      } else if (track.coverConst) {
        const block =
          coverSource.match(
            new RegExp(`${track.coverConst}[\\s\\S]*?=\\s*\\{([\\s\\S]*?)\\n\\};`),
          )?.[1] ?? "";
        const covered = new Set(
          [...block.matchAll(/^\s*"?([a-z0-9-]+)"?\s*:/gm)].map((m) => m[1]),
        );
        for (const chapter of chapters.filter((c) => c.status === "published")) {
          if (!covered.has(chapter.slug)) {
            fail(`${chapter.slug} is published but has no entry in ${track.coverConst}.`);
          }
        }
      }
    }
  }

  // Any thumbnail path that is declared must point at a real file.
  for (const chapter of chapters) {
    if (!chapter.thumbnail) continue;
    const asset = join(REPO_ROOT, "public", chapter.thumbnail.replace(/^\//, ""));
    if (!existsSync(asset)) {
      fail(`${chapter.slug}: thumbnail "${chapter.thumbnail}" does not exist on disk.`);
    }
  }

  // Drafts must NOT be registered, or they would become reachable.
  for (const chapter of chapters.filter((c) => c.status === "draft")) {
    if (registered.has(chapter.slug)) {
      fail(`${chapter.slug} is a draft but is registered in ${track.bodiesConst}.`);
    }
  }

  const published = chapters.filter((c) => c.status === "published").length;
  return { chapters, published, parts: partIds.size };
}

for (const track of TRACKS) {
  const { chapters, published, parts } = validateTrack(track);
  console.log(
    `learn-nav: ${track.name} — ${chapters.length} chapters ` +
      `(${published} published, ${chapters.length - published} draft) across ${parts} parts`,
  );
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log("learn-nav: all checks passed.");
