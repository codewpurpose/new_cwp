/**
 * One hand-written quick-check question: three or four options (keep them
 * similar in length and all plausible) and the zero-based index of the
 * correct one. The tuple types make an out-of-range answer or a wrong option
 * count a type error, rather than a question nobody can answer correctly.
 */
export type AuthoredQuestion =
  | {
      q: string;
      options: readonly [string, string, string];
      answer: 0 | 1 | 2;
    }
  | {
      q: string;
      options: readonly [string, string, string, string];
      answer: 0 | 1 | 2 | 3;
    };
