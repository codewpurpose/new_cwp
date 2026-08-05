#!/usr/bin/env node
/**
 * Find or create the Resend audience the newsletter subscribes people to, and
 * print the id to paste into RESEND_AUDIENCE_ID.
 *
 * An "audience" is Resend's word for a contact list. It is NOT the record —
 * `subscribers` in Supabase is, and sign-ups work without any audience at all.
 * Set one when you want to send a campaign from Resend's own UI, which needs
 * the addresses on Resend's side too.
 *
 *   npm run resend:audience           list what already exists
 *   npm run resend:audience -- --create   create one if there is none
 *
 * Reads RESEND_API_KEY from .env.local, then .env, then the shell.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const AUDIENCE_NAME = "CodeWithPurpose Newsletter";

/** Minimal .env reader — enough for KEY=value, quoted or not. No dependency. */
function readEnvFile(file) {
  const path = join(ROOT, file);
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    out[match[1]] = match[2].trim().replace(/^["'](.*)["']$/, "$1");
  }
  return out;
}

const env = { ...readEnvFile(".env"), ...readEnvFile(".env.local") };
const apiKey = process.env.RESEND_API_KEY || env.RESEND_API_KEY;

if (!apiKey) {
  console.error(`
No RESEND_API_KEY found.

  1. Go to https://resend.com/api-keys and create one ("Sending access" is enough).
  2. Add it to .env.local (gitignored) or .env:

       RESEND_API_KEY=re_...

  3. Run this again.
`);
  process.exit(1);
}

async function resend(path, init = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = body?.message || body?.error?.message || res.statusText;
    throw new Error(
      res.status === 401
        ? "That API key was rejected (401). Check it was copied whole."
        : `Resend returned ${res.status}: ${message}`,
    );
  }
  return body;
}

function report(id) {
  console.log(`
Add this to your .env (or .env.local):

    RESEND_AUDIENCE_ID=${id}

Then restart the dev server. Sign-ups will be recorded from that point on.
`);
}

try {
  const { data } = await resend("/audiences");
  const audiences = data ?? [];

  if (audiences.length > 0) {
    console.log(`Found ${audiences.length} audience${audiences.length === 1 ? "" : "s"}:\n`);
    for (const a of audiences) {
      console.log(`  ${a.name}`);
      console.log(`    id: ${a.id}`);
    }
    // Prefer one we recognise; otherwise the account's only/first list.
    const chosen = audiences.find((a) => a.name === AUDIENCE_NAME) ?? audiences[0];
    report(chosen.id);
    process.exit(0);
  }

  if (!process.argv.includes("--create")) {
    console.log(`
No audiences in this Resend account yet — expected, if you have never made one.

Create one with:

    npm run resend:audience -- --create

That makes an empty list called "${AUDIENCE_NAME}" and prints its id. Or make it
by hand at https://resend.com/audiences and copy the id from the URL.
`);
    process.exit(0);
  }

  const created = await resend("/audiences", {
    method: "POST",
    body: JSON.stringify({ name: AUDIENCE_NAME }),
  });
  console.log(`Created audience "${AUDIENCE_NAME}".`);
  report(created.id);
} catch (error) {
  console.error(`\n${error.message}\n`);
  process.exit(1);
}
