/**
 * The rules for the one field a student writes that everybody else can read.
 *
 * `profiles.display_name` is selected by the leaderboard with the `anon` key —
 * it is world-readable by design, and most of the people it names are minors.
 * That combination is why this is a shared module rather than a `maxLength` on
 * one input: the same rules have to hold at the keyboard, at the sync that
 * pushes the value, and in the database, and there is no version of "we'll
 * validate it in the component" that survives someone posting straight to
 * PostgREST with their own token.
 *
 * The CHECK constraint in `supabase/schema.sql` is the real guarantee. What is
 * here is the half that can explain itself to a student before they hit save,
 * plus the sanitiser the sync uses so a legacy local value can never fail that
 * constraint and take the whole profile write down with it.
 *
 * Deliberately free of any `learn-nav` import, for the reason `student.ts`
 * gives: this is pulled in by the always-mounted sync.
 */

/** Long enough for a real handle, short enough not to wreck the board's layout. */
export const DISPLAY_NAME_MAX = 24;

/**
 * Substrings that turn a display name into a broadcast channel. A public list
 * of names next to a link is an advert, and the leaderboard is not one.
 */
const CONTACT_RE = /(https?:\/\/|www\.|@)/i;

/**
 * Characters that render as nothing, or that reorder what follows them.
 *
 * `Cc` is the C0/C1 control block; `Cf` covers the zero-width family, the
 * bidirectional overrides, and the byte-order mark. Written as Unicode property
 * escapes rather than a numeric range on purpose — the literal characters are
 * invisible in an editor, which makes for a line nobody can review and a file
 * `grep` reports as binary.
 */
const INVISIBLE_RE = /[\p{Cc}\p{Cf}]/u;

/**
 * At least one character that actually shows up — the JS side of the
 * `display_name ~ '[[:alnum:]]'` clause in the constraint. A name made entirely
 * of spaces and punctuation is not a name, and is the shape someone reaches for
 * when they want to occupy a leaderboard row without being identifiable on it.
 */
const VISIBLE_RE = /[\p{L}\p{N}]/u;

/**
 * A first line, and honestly not much more than that.
 *
 * Word filters are trivially defeated by anyone who wants to defeat one, and a
 * list that tried to be exhaustive would be both enormous and wrong. This
 * catches the lazy case — someone typing the obvious thing to see whether it
 * sticks — and buys time. Anything past that needs a report button and a human,
 * which this codebase does not have yet. Do not mistake this for moderation.
 *
 * Two lists, because the matching rule is not the same for both, and getting
 * that wrong is how a filter starts rejecting real people.
 *
 * These are checked against the name with every non-letter removed, so "s h i t"
 * and "s.h.i.t" are caught too. That fold is only safe for terms which do not
 * occur inside ordinary words — the ones below do not.
 */
const BLOCKED_ANYWHERE = ["fuck", "shit", "bitch", "whore", "slut", "nazi", "porn"];

/**
 * The same idea, matched as whole words only, because these DO occur inside
 * perfectly ordinary ones: Essex, Sussex, Middlesex; grape, drape, scrape; and
 * Scunthorpe, the Lincolnshire town this failure mode is named after.
 *
 * The cost of getting it wrong is not symmetrical. A rude name that slips
 * through is a nuisance somebody can report. A filter that tells a student from
 * Essex their name is unacceptable is the site insulting a child for where they
 * are from, and they have no way to argue with it. So evasion by spacing beats
 * this half of the list, and that is the right way round.
 */
const BLOCKED_AS_WORD = ["sex", "rape", "cunt"];

/**
 * Coerces anything into a value the database will accept, or into the empty
 * string when there is nothing salvageable.
 *
 * Total by construction — every path returns a value that satisfies the CHECK
 * constraint — because the sync calls this on a `localStorage` value written
 * before any of these rules existed. A profile push is not the place to
 * discover that a name from six months ago is three characters too long.
 *
 * Note this does NOT apply the word list. Sanitising profanity into asterisks
 * hands someone a name they did not choose; `displayNameIssue` refuses it at
 * the input instead, which is where that judgement belongs.
 */
export function sanitizeDisplayName(raw: string): string {
  const cleaned = raw
    .replace(/[\p{Cc}\p{Cf}]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, DISPLAY_NAME_MAX)
    .trim();

  // Every rejection below mirrors a clause of the CHECK constraint, so that
  // whatever this returns is guaranteed to be storable. A name carrying a link
  // or an address is dropped whole rather than edited down: "sam@school.edu"
  // with the domain filed off is not a name anybody chose.
  if (!cleaned) return "";
  if (CONTACT_RE.test(cleaned)) return "";
  if (!VISIBLE_RE.test(cleaned)) return "";

  return cleaned;
}

/**
 * Why this name cannot be used, phrased for the person typing it, or null when
 * it is fine. An empty draft is not an issue — it just means they have not
 * chosen one yet, and `fallbackDisplayName` covers that.
 */
export function displayNameIssue(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.length > DISPLAY_NAME_MAX) {
    return `Keep it to ${DISPLAY_NAME_MAX} characters or fewer.`;
  }
  if (CONTACT_RE.test(trimmed)) {
    return "No links or email addresses — everyone can see this one.";
  }
  if (INVISIBLE_RE.test(raw)) {
    return "That has characters that won't show up. Try plain text.";
  }
  if (!VISIBLE_RE.test(trimmed)) {
    return "Use at least one letter or number.";
  }

  const lower = trimmed.toLowerCase();
  const folded = lower.replace(/[^a-z]/g, "");
  const words = lower.split(/[^a-z]+/).filter(Boolean);

  if (
    BLOCKED_ANYWHERE.some((word) => folded.includes(word)) ||
    BLOCKED_AS_WORD.some((word) => words.includes(word))
  ) {
    return "Pick something else — this one's on a page anyone can open.";
  }

  return null;
}

/**
 * The name shown when a student has not chosen one.
 *
 * It used to be their Clerk `fullName`, which meant creating an account
 * silently published a child's real name on a page anyone can load. The schema
 * has said "a display name, not a real full name" since the platform landed;
 * this is the part that makes that true rather than aspirational.
 *
 * Derived from the Clerk user id so it is stable across devices and sessions
 * without storing anything, and distinct enough that a board of unnamed
 * learners is still a board rather than forty rows reading "Learner". FNV-1a
 * because it is four lines and this is a label, not a security boundary.
 */
export function fallbackDisplayName(userId: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < userId.length; i += 1) {
    hash ^= userId.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `Learner-${(hash % 10000).toString().padStart(4, "0")}`;
}
