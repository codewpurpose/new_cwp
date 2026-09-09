import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function ColourAndTypographyLesson() {
  return (
    <div>
      <Lead>
        Most of what makes a page look designed is line height, line length, and contrast — three
        properties, none of them exciting. Learn the four ways to write a colour and why the default
        line-height is wrong for body text.
      </Lead>

      <LessonSection
        id="four-ways-to-write-a-colour-and-when-each-helps"
        title="Four ways to write a colour, and when each helps"
      >
        <P>
          They all produce the same pixels. The difference is which one you can read and adjust.
        </P>
        <CodeBlock
          label="The same green, four ways"
          code={`color: darkseagreen;                  /* 1. keyword    */
color: #3e7f5c;                       /* 2. hex        */
color: rgb(62 127 92);                /* 3. rgb        */
color: hsl(150 34% 37%);              /* 4. hsl        */

/* With transparency */
color: #3e7f5c80;                     /* hex + alpha   */
color: rgb(62 127 92 / 50%);          /* modern syntax */`}
        />
        <LabelRows
          rows={[
            { label: "Keywords", text: "About 140 names, plus transparent and currentColor. Fine for prototyping; too coarse for a real palette." },
            { label: "Hex", text: "The most common in the wild. #RGB is shorthand for #RRGGBB, so #fff is white. Unreadable — nobody can tell #3e7f5c from #3e7f6c by eye." },
            { label: "rgb", text: "Three channels, 0–255. Slightly more readable than hex and still hard to adjust: making a colour lighter means changing all three numbers." },
            { label: "hsl", text: "Hue 0–360, saturation, lightness. The one you can reason about — same hue with different lightness gives a whole palette, and it is a single number to change." },
          ]}
        />
        <Callout tone="tip" title="currentColor follows the text">
          It means &quot;whatever this element&apos;s{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">color</span> is&quot;. Set a
          border or an SVG fill to{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">currentColor</span> and it
          follows the text automatically — through hover states, through dark mode, through
          inheritance, without a second declaration anywhere.
        </Callout>
        <P>
          Whichever you use, put the decisions in custom properties rather than repeating values.
          Chapter 21 builds a whole page this way.
        </P>
        <CodeBlock
          label="Name the decision, not the colour"
          code={`:root {
  --ink:     hsl(150 34% 18%);
  --muted:   hsl(0 0% 39%);
  --accent:  hsl(150 34% 37%);
  --surface: hsl(40 60% 98%);
}

body { color: var(--ink); background: var(--surface); }
a    { color: var(--accent); }`}
        />
        <P>
          <Strong>--accent</Strong> rather than <Strong>--green</Strong>, for the same reason a class
          is <Strong>.warning</Strong> rather than <Strong>.red</Strong>: the name should survive
          the day you change the colour.
        </P>
      </LessonSection>

      <LessonSection
        id="font-family-is-a-list-because-fonts-go-missing"
        title="font-family is a list, because fonts go missing"
      >
        <P>
          <Strong>font-family</Strong> takes a comma-separated stack, and the browser walks it until
          it finds one the visitor actually has. The last entry must be a generic family, because
          that one always exists.
        </P>
        <CodeBlock
          label="Font stacks"
          code={`/* The system stack: whatever this device uses natively.
   Zero download, instant render, and it looks right everywhere. */
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

code, pre {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}

h1, h2 {
  font-family: Georgia, "Times New Roman", serif;
}`}
        />
        <P>
          Quote any family name containing a space. The generic at the end —{" "}
          <Strong>sans-serif</Strong>, <Strong>serif</Strong>, <Strong>monospace</Strong> — is the
          guaranteed fallback.
        </P>
        <CompareGrid
          items={[
            {
              title: "System fonts",
              tone: "positive",
              children: (
                <P>
                  Nothing to download, so text renders on the first frame with no flash. Looks native
                  on every platform. The right default for most sites.
                </P>
              ),
            },
            {
              title: "Web fonts",
              tone: "neutral",
              children: (
                <P>
                  A file the visitor must download before your text appears in it. Use it when
                  identity matters, but account for the bytes and a flash of fallback text. Use{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    font-display: swap
                  </span>{" "}
                  so the text is readable while it loads.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="Two or three weights, not nine">
          Every weight and every italic is a separate file. A font family loaded at nine weights is
          often more bytes than every image on the page combined. Regular, bold, and perhaps one
          italic covers a whole site.
        </Callout>
      </LessonSection>

      <LessonSection
        id="line-height-does-more-for-readability-than-anything"
        title="line-height does more for readability than anything"
      >
        <P>
          If you change one property on a page of text, change this one. The browser default is about
          1.2, which is right for headings and too tight for body copy — the lines crowd and the eye
          loses its place returning to the left margin.
        </P>
        <CodeBlock
          label="Unitless, and that matters"
          code={`body { line-height: 1.6; }   /* 1.5–1.7 for body text  */
h1, h2 { line-height: 1.2; }  /* tighter for large text */`}
        />
        <P>
          Write it <Strong>without a unit</Strong>. A unitless value is a multiplier that each
          element applies to its own font size. A value with a unit computes once and then inherits
          that fixed pixel value to every child, so a large heading inherits a line height meant for
          14-pixel text and its lines overlap.
        </P>
        <CodeBlock
          label="Why the unit breaks inheritance"
          copyable={false}
          code={`body { font-size: 16px; line-height: 24px; }   /* fixed 24px inherited */
h1   { font-size: 40px; }                      /* 40px text, 24px lines — overlapping */

body { font-size: 16px; line-height: 1.5; }    /* multiplier inherited */
h1   { font-size: 40px; }                      /* 40px text, 60px lines — correct */`}
          lineTones={{ 1: "err", 4: "ok" }}
        />
        <P>
          Larger text needs proportionally less line height, not more. Long lines need more.
        </P>
      </LessonSection>

      <LessonSection id="line-length-has-a-right-answer" title="Line length has a right answer">
        <P>
          Typography research is unusually settled here: comfortable reading is roughly{" "}
          <Strong>45 to 75 characters per line</Strong>. Beyond that the return sweep to the next
          line starts failing and readers lose their place.
        </P>
        <P>
          A full-width paragraph on a 27-inch monitor is around 200 characters. Which is why an
          unstyled page feels hard to read even though nothing is wrong with it.
        </P>
        <CodeBlock
          label="The ch unit exists for exactly this"
          code={`.prose {
  max-width: 65ch;   /* about 65 characters of the current font */
  margin: 0 auto;
}`}
        />
        <P>
          <Strong>1ch</Strong> is the width of the &quot;0&quot; character in the current font, so{" "}
          <Strong>65ch</Strong> tracks your font size automatically. Change the size and the measure
          follows. Use <Strong>max-width</Strong>, not <Strong>width</Strong>, so narrow screens
          still use their full space.
        </P>
        <Callout tone="success" title="Three lines that fix most amateur-looking pages">
          A max-width around 65ch, a line-height around 1.6, and enough contrast. Applied to plain
          black-on-white text with no other styling at all, a page reads as considered. This is the
          most important rule in the chapter, and it is not a matter of taste.
        </Callout>
      </LessonSection>

      <LessonSection
        id="rem-and-em-respect-a-choice-the-reader-made"
        title="rem and em respect a choice the reader made"
      >
        <P>
          Sizes can be absolute or relative, and the difference has a real accessibility consequence.
        </P>
        <LabelRows
          rows={[
            { label: "px", text: "An absolute pixel. Predictable, and it ignores a reader who has set a larger default font size in their browser settings." },
            { label: "rem", text: "Relative to the ROOT font size — 1rem is the browser default, usually 16px, or whatever the reader chose. Use for font sizes and most spacing." },
            { label: "em", text: "Relative to the CURRENT element's font size, so it compounds through nesting. Useful for padding that should scale with its own text." },
            { label: "%", text: "Relative to the parent's corresponding dimension. Mostly for widths." },
            { label: "ch / ex", text: "Relative to character metrics. ch is the one you will use, for measure." },
            { label: "vw / vh", text: "One per cent of the viewport width or height. Handy for full-screen sections; avoid for text, where it ignores the reader entirely." },
          ]}
        />
        <CodeBlock
          label="A scale in rem"
          code={`html { font-size: 100%; }          /* respect the reader's setting — do NOT set px here */

body   { font-size: 1rem; }        /* 16px by default */
h1     { font-size: 2.5rem; }      /* 40px, scales with the reader */
h2     { font-size: 1.75rem; }
small  { font-size: 0.875rem; }

.card  { padding: 1.5rem; gap: 1rem; }`}
        />
        <Callout tone="danger" title="Never set html { font-size: 62.5% }">
          It is a widespread trick to make 1rem equal 10px for easier arithmetic. It works by
          shrinking the reader&apos;s chosen base size to 62.5% of what they asked for — so somebody
          who set 24px to be able to read gets 15px. The convenience is yours and the cost is theirs.
        </Callout>
        <ChecklistCard
          title="Typographic defaults to start with"
          marker="check"
          items={[
            "font-family: system-ui with a generic fallback last",
            "line-height: 1.6 on body, unitless, and ~1.2 on large headings",
            "max-width around 65ch on anything with paragraphs",
            "rem for font sizes, so a reader's browser setting still works",
            "Text contrast of at least 4.5:1 — chapter 22 has the checker",
            "Two or three font weights, not nine",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Keywords, hex, rgb, and hsl all produce the same pixels; hsl is the one you can reason about and adjust.",
          "currentColor follows the element's text colour automatically, through hover and inheritance.",
          "Name custom properties for their role — --accent, not --green — so the name survives a redesign.",
          "font-family is a fallback list and the last entry must be a generic family.",
          "System font stacks download nothing and render on the first frame.",
          "Every extra weight is another file. Two or three is enough for a whole site.",
          "Line-height matters most on a page of text. Use 1.5–1.7 for body copy.",
          "Write line-height WITHOUT a unit, or large headings inherit a fixed value meant for small text and overlap.",
          "Comfortable reading is 45–75 characters per line. max-width: 65ch tracks the font size for you.",
          "rem respects the reader's chosen base font size; px ignores it.",
          "html { font-size: 62.5% } shrinks that choice to make your arithmetic easier. Do not.",
        ]}
      />
    </div>
  );
}
