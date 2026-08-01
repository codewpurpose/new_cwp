/** Shared shape for both learning tracks, so one set of nav components serves both. */

export type LearnTrackId = "vibecoding" | "ml";

export type LearnLevel = "beginner" | "intermediate" | "advanced";

export interface LearnHeading {
  /** Anchor slug. Stable — external links point at these, so never rename one. */
  id: string;
  /** Rendered heading text and the TOC label. Authored here, not in the body. */
  text: string;
  level: 2 | 3;
}

export interface LearnPart {
  id: string;
  number: number;
  title: string;
  summary: string;
}

export interface LearnChapter {
  slug: string;
  partId: LearnPart["id"];
  /** Globally unique and contiguous within a track. Drives ordering and the pager. */
  order: number;
  title: string;
  description: string;
  level: LearnLevel;
  minutes: number;
  /**
   * Non-adjacent prerequisites only — "the previous chapter" is implied by
   * `order`. Listing it on every chapter would be 29 fields to keep in sync.
   */
  prerequisites: string[];
  tags: string[];
  /** Card art for the track index. Not every track uses one. */
  thumbnail?: string;
  headings: LearnHeading[];
  /** Drafts are excluded from routing, the sidebar, and the pager. */
  status: "draft" | "published";
  /** ISO date. Set on chapters whose content goes stale quickly (tooling, pricing). */
  lastReviewed?: string;
}

export interface LearnTrack {
  id: LearnTrackId;
  title: string;
  href: string;
  parts: readonly LearnPart[];
  chapters: readonly LearnChapter[];
}
