import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function StylingThePageLesson() {
  return (
    <div>
      <Lead>
        Take the page from the last chapter and style it in five passes, in an order that stops you
        from repainting the same thing four times. Reset, tokens, typography, layout, detail — and no
        markup changes at all.
      </Lead>

      <LessonSection id="a-three-line-reset-before-anything-else" title="A three-line reset before anything else">
        <P>
          The order of these five passes matters more than any individual rule in them. Each one
          settles decisions the next one depends on.
        </P>
        <StepList
          variant="timeline"
          steps={[
            { label: "Reset", detail: "Normalise the browser's defaults so you are building on a known base." },
            { label: "Tokens", detail: "Name your colours, spacing, and type sizes once, before using any of them." },
            { label: "Typography", detail: "Size, measure, and rhythm. Most of what makes a page look designed happens here." },
            { label: "Layout", detail: "Grid outside, flex inside. Only now, when you know how big the text is." },
            { label: "Detail", detail: "States, focus, transitions, the small things. Last, because they depend on everything above." },
          ]}
        />
        <P>
          Doing layout before typography is the classic mistake — you size containers around
          placeholder text, then set the real type and every container is wrong.
        </P>
        <CodeBlock
          label="styles.css — pass 1"
          code={`/* ---- Reset ------------------------------------------------------ */

*, *::before, *::after {
  box-sizing: border-box;      /* chapter 14 — the important one */
}

body {
  margin: 0;                   /* the browser's 8px */
}

img {
  max-width: 100%;
  height: auto;
  display: block;              /* removes the baseline gap, chapter 16 */
}

input, textarea, select, button {
  font: inherit;               /* form controls do not inherit, chapter 13 */
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
        />
        <P>
          Five blocks, and every one of them fixes something a previous chapter warned about. That is
          the whole reset — no library needed.
        </P>
      </LessonSection>

      <LessonSection
        id="custom-properties-are-your-design-decisions"
        title="Custom properties are your design decisions"
      >
        <P>
          Before writing a single colour into a rule, name them. A custom property is declared with
          two hyphens and read with <Strong>var()</Strong>.
        </P>
        <CodeBlock
          label="styles.css — pass 2"
          code={`/* ---- Tokens ----------------------------------------------------- */

:root {
  /* Colour — named for role, not for hue */
  --ink:        hsl(150 30% 12%);
  --ink-muted:  hsl(150  8% 38%);
  --accent:     hsl(150 34% 37%);
  --accent-ink: hsl(150 40% 24%);
  --surface:    hsl(40 60% 99%);
  --raised:     hsl(40 40% 96%);
  --line:       hsl(40 20% 88%);

  /* Spacing — one scale, used everywhere */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;

  /* Type */
  --font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --measure: 65ch;
  --radius: 8px;
}`}
        />
        <LabelRows
          rows={[
            { label: "Declared on :root", text: "The html element, so every rule in the file can read them — custom properties inherit." },
            { label: "Named for role", text: "--accent, not --green. The name should survive the day you change the colour." },
            { label: "A spacing scale", text: "Five values used everywhere beats arbitrary numbers. Consistent spacing is most of what \"designed\" looks like." },
            { label: "Overridable", text: "Redeclare any of these inside a media query or a class and everything using it changes." },
          ]}
        />
        <Callout tone="success" title="This is what makes dark mode about eight lines">
          Because every colour is read through a token, switching the whole page means redeclaring
          the tokens. No rule elsewhere in the file changes at all.
        </Callout>
        <CodeBlock
          label="Dark mode, complete"
          code={`@media (prefers-color-scheme: dark) {
  :root {
    --ink:       hsl(150 15% 92%);
    --ink-muted: hsl(150  8% 68%);
    --surface:   hsl(150 18% 10%);
    --raised:    hsl(150 14% 14%);
    --line:      hsl(150 10% 22%);
  }
}`}
        />
      </LessonSection>

      <LessonSection
        id="typography-and-measure-come-before-colour"
        title="Typography and measure come before colour"
      >
        <P>
          Pass three, and the one that does the most work. Everything here is from chapter 15.
        </P>
        <CodeBlock
          label="styles.css — pass 3"
          code={`/* ---- Typography -------------------------------------------------- */

body {
  font-family: var(--font);
  font-size: 1rem;
  line-height: 1.6;             /* unitless — chapter 15 */
  color: var(--ink);
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  line-height: 1.2;             /* tighter for large text */
  margin: 0 0 var(--space-2);
  text-wrap: balance;           /* stops a one-word last line */
}

h1 { font-size: clamp(2rem, 6vw, 3rem); letter-spacing: -0.02em; }
h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
h3 { font-size: 1.25rem; }

p, li { max-width: var(--measure); }   /* 65ch — chapter 15 */

.lead {
  font-size: 1.25rem;
  color: var(--ink-muted);
}

a {
  color: var(--accent-ink);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}

a:hover { text-decoration-thickness: 2px; }`}
        />
        <P>
          Two things worth pointing out. <Strong>clamp()</Strong> gives headings that scale between a
          floor and a ceiling with no media query. And <Strong>max-width</Strong> is on the{" "}
          <em>paragraphs</em> rather than the container — so text stays readable while a card grid
          beside it still uses the full width.
        </P>
        <Callout tone="tip" title="Stop here and look">
          At this point you have a reset, tokens, and typography, and the page already looks
          deliberate — before a single layout rule. If it does not look right yet, more layout will
          not fix it.
        </Callout>
      </LessonSection>

      <LessonSection id="layout-with-grid-outside-and-flex-inside" title="Layout with grid outside and flex inside">
        <P>
          Pass four. Chapter 18&apos;s rule: grid for the page and the card grid, flex for the parts.
        </P>
        <CodeBlock
          label="styles.css — pass 4"
          code={`/* ---- Layout ------------------------------------------------------ */

/* One centred column that everything sits in */
header, main, footer {
  max-width: 68rem;
  margin-inline: auto;
  padding-inline: var(--space-2);
}

/* Header: wordmark left, nav right */
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  padding-block: var(--space-2);
  border-bottom: 1px solid var(--line);
}

nav { margin-left: auto; }            /* pushes it right — chapter 17 */

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-3);
}

section { padding-block: var(--space-5); }

/* The card grid — responsive with no media query */
.project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: var(--space-3);
}

/* Inside each card */
.project {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  height: 100%;
  padding: var(--space-3);
  background: var(--raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.project p { max-width: none; }        /* the card is already narrow */
.tags { margin-top: auto; }            /* pins tags to the bottom — chapter 18 */

.tags {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.tags li {
  padding: 0.15rem 0.6rem;
  font-size: 0.8rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
}

.field { display: grid; gap: 0.35rem; margin-bottom: var(--space-2); }
.field input, .field textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  max-width: 32rem;
}`}
        />
        <P>
          The one subtlety is <Strong>minmax(min(100%, 260px), 1fr)</Strong> rather than{" "}
          <Strong>minmax(260px, 1fr)</Strong>. On a viewport narrower than 260 pixels the plain
          version forces the track wider than the screen and causes horizontal scrolling — the
          nested <Strong>min()</Strong> caps it at the container width. It is a small fix for a real
          bug on the smallest phones.
        </P>
      </LessonSection>

      <LessonSection id="the-details-that-make-it-feel-finished" title="The details that make it feel finished">
        <P>
          Pass five: states, focus, and the skip link. These come last because they depend on
          everything above being settled.
        </P>
        <CodeBlock
          label="styles.css — pass 5"
          code={`/* ---- Detail ------------------------------------------------------ */

/* Focus, once, for everything. Never remove it — chapter 12 */
:where(a, button, input, textarea, select, summary):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* The skip link: hidden until focused */
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: var(--space-2);
  top: var(--space-2);
  z-index: 10;
  padding: var(--space-1) var(--space-2);
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
}

.btn {
  display: inline-block;
  padding: 0.7rem 1.4rem;
  background: var(--accent);
  color: white;
  text-decoration: none;
  border: 0;
  border-radius: var(--radius);
  transition: background 150ms ease;
}
.btn:hover { background: var(--accent-ink); }

.project {
  transition: border-color 150ms ease, transform 150ms ease;
}
.project:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

footer {
  padding-block: var(--space-4);
  border-top: 1px solid var(--line);
  color: var(--ink-muted);
}
footer ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: var(--space-3);
}`}
        />
        <LabelRows
          rows={[
            { label: ":where()", text: "Wraps a selector list at ZERO specificity, so this focus rule is trivially easy to override later. A genuinely useful trick from chapter 13's subject." },
            { label: "focus-visible", text: "Keyboard focus only, so mouse users do not get outlines they find noisy — while keyboard users keep the thing they navigate by." },
            { label: "The skip link", text: "Off-screen until focused, then visible. Two rules, and it is the first thing a keyboard user meets." },
            { label: "transition on specific properties", text: "Not transition: all. Naming them is faster and avoids animating something you did not intend." },
          ]}
        />
        <ChecklistCard
          title="Before you call it finished"
          marker="check"
          items={[
            "Drag the window from 1400px down to 320px slowly. Nothing overflows, nothing overlaps, no horizontal scroll",
            "Tab through the whole page. Focus is visible at every stop and the order is sensible",
            "The skip link appears on the first Tab press and works",
            "Every colour pair passes 4.5:1 — chapter 22 has the checker",
            "Turn CSS off entirely: is it still the readable document from chapter 20?",
            "Turn on prefers-reduced-motion in your OS: does the card lift stop?",
            "Validate the HTML again — styling should not have changed it, but check",
          ]}
        />
        <Callout tone="success" title="Two files, and nothing else">
          One HTML file and one CSS file, roughly 90 and 200 lines. No build step, no framework, no
          dependencies, nothing to update, and it will render identically in ten years. That is worth
          noticing before you learn a framework: this is the floor, and a surprising number of good
          sites never leave it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Style in five passes: reset, tokens, typography, layout, detail. The order stops you repainting.",
          "Layout before typography means sizing containers around text you have not chosen yet.",
          "The reset is five blocks, each fixing something an earlier chapter warned about. No library needed.",
          "Declare tokens on :root before using any of them; name them for role, not hue.",
          "A five-value spacing scale used consistently is most of what \"designed\" looks like.",
          "Because every colour is a token, dark mode is redeclaring the tokens and nothing else.",
          "clamp() gives fluid headings; max-width on paragraphs keeps the measure while containers stay wide.",
          "Grid for the page and the card grid, flex inside each card. margin-top: auto pins the tags down.",
          "minmax(min(100%, 260px), 1fr) stops the smallest phones scrolling sideways.",
          ":where() applies a rule at zero specificity, so it is trivially overridable later.",
          "focus-visible keeps the outline for keyboard users without showing it to mouse users.",
          "One HTML file and one CSS file, no build step, and it will still render in ten years.",
        ]}
      />
    </div>
  );
}
