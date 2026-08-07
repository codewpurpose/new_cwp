/**
 * Track identity and chapter URLs — the leaf of the /learn module graph.
 *
 * This file exists so client components can build a chapter link without
 * importing the curriculum. `learn-nav.ts` holds every chapter of all five
 * tracks; anything that touches it ships roughly 110 KB of lesson metadata to
 * the browser. The chapter gate, the quiz, and the sidebar each needed one
 * three-line function out of that module, and were paying the whole bill.
 *
 * Nothing here may import lesson data. Keep it that way — a single import of
 * `@/lib/<track>-lessons` in this file silently undoes the split for every
 * client component downstream.
 */

import type { LearnTrackId } from "@/lib/learn-types";
import {
  LEARN_FINANCIAL_LITERACY_HREF,
  LEARN_HEALTH_IN_TECH_HREF,
  LEARN_ML_HREF,
  LEARN_PYTHON_HREF,
  LEARN_ROBLOX_HREF,
  LEARN_VIBECODING_HREF,
} from "@/lib/links";

export interface LearnTrackRoute {
  id: LearnTrackId;
  title: string;
  href: string;
}

/** The identity half of a track: what it's called and where it lives. */
export const TRACK_ROUTES: Record<LearnTrackId, LearnTrackRoute> = {
  vibecoding: { id: "vibecoding", title: "Vibe Coding", href: LEARN_VIBECODING_HREF },
  ml: { id: "ml", title: "Machine Learning", href: LEARN_ML_HREF },
  python: { id: "python", title: "Python", href: LEARN_PYTHON_HREF },
  "financial-literacy": {
    id: "financial-literacy",
    title: "Financial Literacy",
    href: LEARN_FINANCIAL_LITERACY_HREF,
  },
  "health-in-tech": {
    id: "health-in-tech",
    title: "Health in Tech",
    href: LEARN_HEALTH_IN_TECH_HREF,
  },
  roblox: { id: "roblox", title: "Roblox Studio", href: LEARN_ROBLOX_HREF },
};

/**
 * The only place chapter hrefs are constructed. `trailingSlash: true` is set
 * globally, so a missing slash costs a 308 redirect on every navigation.
 *
 * `learn-nav.ts` re-exports this, so server code can keep importing it from
 * there; there is still exactly one implementation.
 */
export function chapterHref(track: LearnTrackId, slug: string): string {
  return `${TRACK_ROUTES[track].href}/${slug}/`;
}
