/** One hand-written quick-check question. */
export interface AuthoredQuestion {
  q: string;
  /** Three or four options; keep them similar in length and all plausible. */
  options: readonly string[];
  /** Zero-based index of the correct option. */
  answer: number;
}
