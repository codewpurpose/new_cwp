import assert from "node:assert/strict";
import test from "node:test";
import { githubRateLimitKey } from "../src/lib/github/client-ip.ts";
import {
  CONTRIBUTION_LEVEL_COLORS,
  contributionDateValue,
  contributionLevel,
} from "../src/lib/github/contribution-grid.ts";

test("rate-limit keys ignore caller-controlled forwarding headers", () => {
  const headers = new Headers({
    "x-forwarded-for": "198.51.100.9",
    "x-real-ip": "198.51.100.9",
  });
  assert.equal(githubRateLimitKey(headers, true), "unknown");
  assert.equal(githubRateLimitKey(headers, false), "unknown");
});

test("rate-limit keys accept only a valid Vercel edge address", () => {
  const headers = new Headers({
    "x-vercel-id": "sfo1::example",
    "x-vercel-forwarded-for": "2001:0db8:0:0:0:0:0:1",
    "x-forwarded-for": "203.0.113.8",
  });
  assert.equal(githubRateLimitKey(headers, true), "2001:db8::1");
  headers.set("x-vercel-forwarded-for", "not-an-ip");
  assert.equal(githubRateLimitKey(headers, true), "unknown");
});

test("contribution grid uses one shared UTC date and level scale", () => {
  assert.deepEqual(
    [[0, 0, 0], [0, 8, 0], [1, 8, 1], [8, 8, 4], [9, 8, 4]].map(([count, maximum]) =>
      contributionLevel(count, maximum),
    ),
    [0, 0, 1, 4, 4],
  );
  assert.equal(contributionDateValue("2024-01-01").toISOString(), "2024-01-01T00:00:00.000Z");
  assert.equal(CONTRIBUTION_LEVEL_COLORS.length, 5);
});
