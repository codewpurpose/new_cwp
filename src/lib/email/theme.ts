/**
 * Email design tokens.
 *
 * Deliberately a separate copy of the site's palette rather than an import of
 * globals.css: email clients don't run CSS custom properties reliably, so every
 * value has to be inlined as a literal at render time. Keep these in step with
 * the `--home-*` block in `src/app/globals.css` by hand — there are only a
 * dozen, and they change about once a year.
 */

export const emailTheme = {
  page: "#fcf4e8",
  card: "#fffbf5",
  moss: "#1e3c2c",
  mossSoft: "#a8c9b4",
  quiet: "#dbefdb",
  link: "#397554",
  ink: "#15120c",
  inkSoft: "#4f483d",
  inkQuiet: "#6b6255",
  line: "#e0d4c4",
  onMoss: "#ffffff",
} as const;

/**
 * Webfonts don't load in most clients, so both stacks resolve to something
 * already on the device. Georgia stands in for Fraunces — it is the warm,
 * high-contrast serif every desktop and phone already has.
 */
export const emailFont = {
  serif: "Georgia,'Times New Roman',serif",
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",
} as const;

/** Max width of the message body. 600px is the widest safe column in Outlook. */
export const EMAIL_WIDTH = 600;
