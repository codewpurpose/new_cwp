import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { GridPlayground } from "@/components/html-css/GridPlayground";

export function GridLesson() {
  return (
    <div>
      <Lead>
        Grid is the first CSS layout system designed for layout rather than adapted into it, and it
        makes a page skeleton about four lines long. Draw columns, span a cell across two of them,
        and meet the unit that only exists here.
      </Lead>

      <LessonSection id="grid-defines-the-tracks-and-then-fills-them" title="Grid defines the tracks, and then fills them">
        <P>
          Flexbox arranges items and lets their content decide the sizes. Grid works the other way
          around: you define the <Strong>tracks</Strong> — the columns and rows — first, and items
          are placed into the cells they make.
        </P>
        <CodeBlock
          label="Three equal columns"
          code={`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}`}
        />
        <P>
          No classes on the children, no widths, no wrapper elements. The container defines the shape
          and the items fall into it in order.
        </P>
        <GridPlayground />
        <P>
          Rows are usually left implicit — <Strong>grid-template-rows</Strong> exists and you rarely
          need it, because the browser creates as many rows as the items require and sizes them to
          their content.
        </P>
      </LessonSection>

      <LessonSection id="the-fr-unit-divides-what-is-left-over" title="The fr unit divides what is left over">
        <P>
          <Strong>fr</Strong> is a fraction of the available space, and it exists only in grid. It is
          the piece that makes the whole system pleasant.
        </P>
        <CodeBlock
          label="fr in practice"
          code={`grid-template-columns: 1fr 1fr;          /* two equal columns              */
grid-template-columns: 2fr 1fr;          /* first twice as wide as second */
grid-template-columns: 200px 1fr;        /* fixed sidebar, flexible main   */
grid-template-columns: 200px 1fr 200px;  /* two sidebars                   */`}
        />
        <P>
          The important difference from percentages: <Strong>fr divides what is left after
          gaps and fixed tracks are taken out</Strong>. Percentages divide the whole container and
          know nothing about the gap.
        </P>
        <CompareGrid
          items={[
            {
              title: "Percentages overflow",
              tone: "caution",
              children: (
                <P>
                  Three columns at 33.333% with a 1rem gap adds up to 100% <em>plus</em> two gaps —
                  so the row is wider than its container and the page scrolls sideways. Fixing it
                  means calc() and arithmetic that changes whenever the gap does.
                </P>
              ),
            },
            {
              title: "fr just fits",
              tone: "positive",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">1fr 1fr 1fr</span> with
                  any gap always fits. The gaps come out first and the remainder is split three ways.
                  Change the gap and nothing else needs touching.
                </P>
              ),
            },
          ]}
        />
        <P>
          Mixing units in one definition is normal and useful:
        </P>
        <CodeBlock
          label="Mixed tracks"
          code={`grid-template-columns: auto 1fr auto;
/* first and last sized to their content, middle takes the rest —
   an icon, a label, and a button in a row */`}
        />
      </LessonSection>

      <LessonSection id="spanning-cells-is-what-flexbox-cannot-do" title="Spanning cells is what flexbox cannot do">
        <P>
          A flex item can grow and shrink. It cannot occupy two columns while its siblings stay
          aligned in the grid, because in flexbox there is no grid for them to stay aligned to.
        </P>
        <CodeBlock
          label="Spanning"
          code={`.featured {
  grid-column: span 2;      /* two columns wide          */
}

.tall {
  grid-row: span 2;         /* two rows tall             */
}

.hero {
  grid-column: 1 / -1;      /* first line to last: full width */
}`}
        />
        <P>
          <Strong>grid-column: 1 / -1</Strong> is worth remembering. Grid numbers the{" "}
          <em>lines</em> between tracks rather than the tracks themselves, and negative numbers count
          from the end — so <Strong>-1</Strong> is always the final line whatever the column count.
          That makes it a full-width row that survives changing the grid.
        </P>
        <Callout tone="note" title="Named areas, for a whole page skeleton">
          Grid can name regions and let you draw the layout as text. It is genuinely readable, and it
          is the clearest thing in CSS to hand somebody who has not seen it before.
        </Callout>
        <CodeBlock
          label="grid-template-areas"
          code={`.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 1rem;
}

.page > header  { grid-area: header;  }
.page > aside   { grid-area: sidebar; }
.page > main    { grid-area: main;    }
.page > footer  { grid-area: footer;  }`}
        />
        <P>
          Rearranging the whole page is then editing those three strings. Note that this changes only
          the <em>visual</em> order — the DOM order is what a screen reader and the tab key follow, so
          do not use it to reorder anything where sequence carries meaning.
        </P>
      </LessonSection>

      <LessonSection id="repeat-and-minmax-remove-the-media-query" title="repeat and minmax remove the media query">
        <P>
          Two functions, and together they produce the most useful single line in modern CSS.
        </P>
        <CodeBlock
          label="repeat and minmax"
          code={`grid-template-columns: repeat(3, 1fr);            /* same as 1fr 1fr 1fr */
grid-template-columns: repeat(4, minmax(0, 1fr));  /* four, and they may shrink */

/* The line worth memorising */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`}
        />
        <P>
          Read it as: as many columns as fit, each at least 250 pixels, sharing any leftover space
          equally. On a phone that is one column. On a tablet, two. On a wide monitor, five. There is
          no media query and no breakpoint to choose.
        </P>
        <LabelRows
          rows={[
            { label: "repeat(n, …)", text: "Repeat a track definition n times. Purely a shorthand." },
            { label: "auto-fit", text: "As many as fit, and COLLAPSE any empty tracks so the existing items stretch to fill." },
            { label: "auto-fill", text: "As many as fit, and KEEP empty tracks, so three items in a five-column space stay at their size. Usually auto-fit is what you want." },
            { label: "minmax(a, b)", text: "At least a, at most b. minmax(250px, 1fr) means never narrower than 250 and otherwise share the space." },
          ]}
        />
        <Callout tone="warning" title="minmax(0, 1fr) fixes overflowing grid items">
          <span className="font-[family-name:var(--learn-font-mono)]">1fr</span> is really{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">minmax(auto, 1fr)</span>, and
          that <span className="font-[family-name:var(--learn-font-mono)]">auto</span> minimum means
          a track will not shrink below its content — so one long unbroken string or a wide image
          blows the whole grid out. Writing{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">minmax(0, 1fr)</span> permits
          shrinking. This is an obscure fix for a common symptom.
        </Callout>
      </LessonSection>

      <LessonSection id="grid-for-the-page-flex-for-the-parts" title="Grid for the page, flex for the parts">
        <P>
          The two are not competitors and real layouts use both, usually nested. The question is how
          many dimensions you are controlling.
        </P>
        <CompareGrid
          items={[
            {
              title: "Reach for grid when",
              tone: "positive",
              children: (
                <P>
                  You need rows <em>and</em> columns to line up with each other. Page skeletons, card
                  grids, image galleries, forms with aligned labels, anything that should look like a
                  grid.
                </P>
              ),
            },
            {
              title: "Reach for flex when",
              tone: "neutral",
              children: (
                <P>
                  One direction, sized by content. Nav bars, button rows, a card&apos;s internals, an
                  icon beside a label, anything that should wrap naturally rather than snap to
                  tracks.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Both, nested — how real layouts are built"
          code={`/* Grid places the cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Flex arranges the inside of each one */
.card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* And this pushes the button to the bottom, so every card's
   button lines up regardless of how long its text is. */
.card .btn {
  margin-top: auto;
}`}
        />
        <P>
          That last rule is a small piece of craft worth keeping. In a column flex container,{" "}
          <Strong>margin-top: auto</Strong> absorbs all the spare vertical space and pins the element
          to the bottom — so a row of cards with different amounts of text still has its buttons on
          one line.
        </P>
        <Callout tone="success" title="Both are supported everywhere">
          Grid has been in every major browser since 2017 and flexbox for longer. The float-based and
          table-based layouts in older tutorials are not more compatible; they are just older. There
          is no reason to learn them.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Grid defines tracks first and places items into the cells; flexbox arranges items and lets content decide sizes.",
          "Rows are usually implicit — the browser makes as many as the items need.",
          "fr divides what is left after gaps and fixed tracks, which is why 1fr 1fr 1fr always fits and three 33.3% columns do not.",
          "Mixing units — auto 1fr auto — gives content-sized ends and a flexible middle.",
          "grid-column: span 2 spans columns; 1 / -1 is full width whatever the column count.",
          "Grid numbers the lines between tracks, and negative numbers count from the end.",
          "grid-template-areas lets you draw a page skeleton as text, but it changes visual order only — the DOM order is what keyboards and screen readers follow.",
          "repeat(auto-fit, minmax(250px, 1fr)) is a fully responsive grid in one line with no media query.",
          "auto-fit collapses empty tracks; auto-fill keeps them.",
          "minmax(0, 1fr) instead of 1fr stops a long word or wide image from blowing out the grid.",
          "Grid for the page, flex for the parts, and nest them — that is how real layouts are built.",
          "In a column flex container, margin-top: auto pins an element to the bottom so buttons line up across cards.",
        ]}
      />
    </div>
  );
}
