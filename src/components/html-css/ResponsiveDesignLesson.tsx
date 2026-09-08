import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ViewportSim } from "@/components/html-css/ViewportSim";

export function ResponsiveDesignLesson() {
  return (
    <div>
      <Lead>
        More than half of everyone reading your page is holding it in one hand, and a page that
        ignores that is unusable rather than merely ugly. Drag a viewport across a breakpoint and
        watch a media query fire.
      </Lead>

      <LessonSection
        id="one-meta-tag-decides-whether-any-of-this-works"
        title="One meta tag decides whether any of this works"
      >
        <P>
          Before any CSS, one line in the head. Without it, nothing else in this chapter has any
          effect at all.
        </P>
        <CodeBlock
          label="In every page, always"
          code={`<meta name="viewport" content="width=device-width, initial-scale=1">`}
        />
        <P>
          Phones default to pretending they are about 980 pixels wide and then zooming out to fit,
          because in 2007 no page was designed for a phone and rendering them at real width would
          have broken everything. That default is still there.
        </P>
        <LabelRows
          rows={[
            { label: "Without it", text: "The phone renders at 980px and scales the result down. Your page appears tiny, text is unreadable, and every media query is evaluated against 980 — so none of them fire." },
            { label: "width=device-width", text: "Use the device's real width — 390px on a typical phone. Now the CSS knows the truth." },
            { label: "initial-scale=1", text: "Start at 100% zoom rather than zoomed out." },
            { label: "user-scalable=no", text: "Never add this. It blocks pinch-to-zoom, which people with low vision rely on. It is an accessibility failure and browsers increasingly ignore it anyway." },
          ]}
        />
        <Callout tone="warning" title="This is the first thing to check when a phone layout is wrong">
          A page that looks fine on a laptop and shrunken on a phone, with no media query taking
          effect, is missing this tag roughly nine times out of ten. Check it before debugging any
          CSS.
        </Callout>
      </LessonSection>

      <LessonSection id="a-media-query-applies-rules-conditionally" title="A media query applies rules conditionally">
        <P>
          A media query wraps a block of CSS in a condition. When the condition is true the rules
          apply; when it is false they are ignored entirely.
        </P>
        <CodeBlock
          label="The syntax"
          code={`/* Base styles — every device gets these */
.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* Applies only from 640px upwards */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`}
        />
        <ViewportSim />
        <P>
          Note what happens as you drag past 1024: <em>both</em> queries match. There is nothing
          special about that — they are ordinary rules with equal specificity, so the later one wins
          by source order, exactly as chapter 13 described.
        </P>
        <Callout tone="danger" title="Which is why min-width queries must be ordered smallest first">
          Write the 1024 block above the 640 block and the 640 rules win at every width, because they
          come later. There is no error and the page simply refuses to widen. This is one of the most
          confusing bugs in CSS and it is pure source order.
        </Callout>
        <P>
          Beyond width, a few other conditions matter:
        </P>
        <CodeBlock
          label="Other useful queries"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

@media (prefers-color-scheme: dark) {
  :root { --bg: #17241d; --ink: #e7efe7; }
}

@media print {
  nav, footer, .no-print { display: none; }
}`}
        />
        <P>
          The first is not optional if you animate anything. Some people get motion sickness or
          migraines from movement on screen, and they have set that preference in their operating
          system to tell you so.
        </P>
      </LessonSection>

      <LessonSection
        id="mobile-first-means-the-base-styles-are-the-small-ones"
        title="Mobile-first means the base styles are the small ones"
      >
        <P>
          Two ways to write the same responsive layout. They are not equivalent in practice.
        </P>
        <CompareGrid
          items={[
            {
              title: "Mobile-first — min-width",
              tone: "positive",
              children: (
                <P>
                  Base styles are the phone layout, and queries add complexity as the screen grows.
                  Less CSS overall, because a single-column stack is mostly what normal flow already
                  does — you are adding, not undoing.
                </P>
              ),
            },
            {
              title: "Desktop-first — max-width",
              tone: "caution",
              children: (
                <P>
                  Base styles are the desktop layout, and queries strip things away for smaller
                  screens. Every query has to undo something, so rules accumulate and overriding gets
                  progressively harder.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          label="The same layout, both ways"
          code={`/* Mobile-first: add as it grows */
.sidebar { display: none; }
@media (min-width: 900px) {
  .layout  { display: grid; grid-template-columns: 200px 1fr; }
  .sidebar { display: block; }
}

/* Desktop-first: take away as it shrinks */
.layout { display: grid; grid-template-columns: 200px 1fr; }
@media (max-width: 899px) {
  .layout  { display: block; }
  .sidebar { display: none; }
}`}
        />
        <P>
          The mobile-first version is shorter, and it also degrades better: a browser that fails to
          apply a query still shows a usable single-column page.
        </P>
        <P>
          If you mix both, mind the boundary — <Strong>min-width: 900px</Strong> and{" "}
          <Strong>max-width: 900px</Strong> both match at exactly 900, so use{" "}
          <Strong>899.98px</Strong> for the max side or, better, do not mix them.
        </P>
      </LessonSection>

      <LessonSection
        id="breakpoints-come-from-the-content-not-from-devices"
        title="Breakpoints come from the content, not from devices"
      >
        <P>
          There is a strong instinct to pick breakpoints matching popular devices. It is the wrong
          approach and it dates badly — the iPhone widths people memorised in 2014 describe almost
          nothing sold today.
        </P>
        <P>
          The right method is to widen the browser slowly and add a breakpoint wherever the layout
          starts looking wrong. That is a property of your content, and it will not be a round
          number.
        </P>
        <LabelRows
          rows={[
            { label: "Content-driven", text: "\"The cards get too narrow to read below about 700px.\" A reason you can state, and one that stays true as devices change." },
            { label: "Device-driven", text: "\"768px is an iPad.\" It was, in 2010, in portrait. It describes no constraint your layout actually has." },
            { label: "How many", text: "Two or three for most sites. Every breakpoint is another state to test." },
            { label: "Where", text: "Somewhere around 600–700 and somewhere around 1000–1100 is a common shape. Adjust to your content rather than adopting the numbers." },
          ]}
        />
        <Callout tone="tip" title="Test by dragging, not by preset">
          Devtools has a device toolbar with phone presets, and the more useful thing is to grab the
          edge of the window and drag it slowly from wide to narrow. Every layout problem announces
          itself, and you find breakpoints you would not have guessed. Chapter 23.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-most-responsive-css-has-no-media-queries"
        title="The most responsive CSS has no media queries at all"
      >
        <P>
          Media queries are a blunt instrument: they respond to the <em>viewport</em>, not to the
          space a component actually has. Several modern techniques adapt automatically, and reaching
          for these first leaves you with far fewer breakpoints to maintain.
        </P>
        <CodeBlock
          label="Intrinsically responsive, all without a query"
          code={`/* A grid that reflows on its own */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* A container that never exceeds the readable measure */
.prose { max-width: 65ch; margin: 0 auto; padding: 0 1rem; }

/* Images that never overflow */
img { max-width: 100%; height: auto; }

/* Type that scales smoothly between two bounds */
h1 { font-size: clamp(1.75rem, 5vw, 3rem); }

/* Wrap when there is no room, without being told when */
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }`}
        />
        <P>
          <Strong>clamp(min, preferred, max)</Strong> is useful on its own: never smaller than
          the first value, never larger than the third, and scaling with the viewport in between.
          One declaration replaces a font-size plus two media queries.
        </P>
        <Callout tone="note" title="Container queries are the newer answer">
          <span className="font-[family-name:var(--learn-font-mono)]">@container</span> responds to
          the size of a component&apos;s <em>container</em> rather than the viewport — so a card can
          lay itself out differently in a narrow sidebar and a wide main column, on the same screen.
          It is supported in all current browsers, but you do not need it for a hand-written site.
        </Callout>
        <P>
          Two last things that are not layout and matter as much on a phone. Tap targets should be at
          least 44 by 44 pixels — a link with padding, not a bare word. And check that nothing causes
          horizontal scrolling, one of the most common mobile bugs:
        </P>
        <CodeBlock
          label="Find what is too wide"
          code={`/* Temporarily, in devtools — outlines every element so the
   one sticking out past the edge is obvious. */
* { outline: 1px solid red; }`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Without the viewport meta tag a phone renders at 980px and no media query fires. Check it first.",
          "Never add user-scalable=no; it blocks pinch-to-zoom for people who need it.",
          "A media query wraps rules in a condition. Matching queries are ordinary rules and resolve by the normal cascade.",
          "min-width queries must be ordered smallest first, or later ones lose on source order and the page never widens.",
          "prefers-reduced-motion is not optional if you animate anything.",
          "Mobile-first adds complexity as the screen grows; desktop-first has to undo it, so it accumulates rules.",
          "Pick breakpoints where your content breaks, not where a 2014 device was. Two or three is usually enough.",
          "Drag the window slowly rather than clicking device presets — that is how you find the real breakpoints.",
          "auto-fit + minmax, max-width in ch, max-width: 100% on images, and flex-wrap all respond with no query at all.",
          "clamp(min, preferred, max) replaces a font-size plus two media queries.",
          "Tap targets need about 44×44px, and horizontal scrolling is the most common mobile bug.",
        ]}
      />
    </div>
  );
}
