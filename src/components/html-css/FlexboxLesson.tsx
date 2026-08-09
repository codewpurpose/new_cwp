import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { FlexPlayground } from "@/components/html-css/FlexPlayground";

export function FlexboxLesson() {
  return (
    <div>
      <Lead>
        Flexbox exists because centring a box vertically used to require a genuine trick. Set four
        properties, watch a row become a column and back, and learn which axis each property is
        actually talking about.
      </Lead>

      <LessonSection
        id="display-flex-changes-the-children-not-the-parent"
        title="display: flex changes the children, not the parent"
      >
        <P>
          One declaration on a container, and every direct child becomes a{" "}
          <Strong>flex item</Strong> — laid out in a row, side by side, in a way normal flow never
          would.
        </P>
        <CodeBlock
          label="One line"
          code={`.nav {
  display: flex;
}`}
        />
        <P>
          The container itself is still a block: full width, on its own line. What changed is how it
          arranges its children.
        </P>
        <LabelRows
          rows={[
            { label: "Direct children only", text: "Grandchildren are unaffected — they are laid out by their own parent. Flex is one level deep, always." },
            { label: "Every child becomes an item", text: "Including inline elements. A span inside a flex container stops being inline and starts respecting width and height." },
            { label: "Items sit in a row", text: "By default. Even if they are all block elements that would otherwise stack." },
            { label: "Items shrink to fit", text: "Rather than overflowing. This is flexbox's namesake behaviour and it is why a nav bar does not break the layout." },
          ]}
        />
        <FlexPlayground />
      </LessonSection>

      <LessonSection
        id="the-main-axis-is-whichever-direction-you-chose"
        title="The main axis is whichever direction you chose"
      >
        <P>
          This is the concept the whole system rests on, and it is where most confusion comes from.
          Flexbox has two axes, and <Strong>which is which depends on flex-direction</Strong>.
        </P>
        <CodeBlock
          label="flex-direction"
          code={`flex-direction: row;             /* default — main axis is horizontal */
flex-direction: column;          /* main axis is now VERTICAL         */
flex-direction: row-reverse;     /* right to left                     */
flex-direction: column-reverse;  /* bottom to top                     */`}
        />
        <CompareGrid
          items={[
            {
              title: "flex-direction: row",
              tone: "positive",
              children: (
                <P>
                  Main axis horizontal, cross axis vertical.{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">justify-content</span>{" "}
                  moves things left and right;{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">align-items</span> up
                  and down.
                </P>
              ),
            },
            {
              title: "flex-direction: column",
              tone: "neutral",
              children: (
                <P>
                  Main axis vertical, cross axis horizontal. The <em>same two properties</em> now do
                  the opposite:{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">justify-content</span>{" "}
                  moves things up and down.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="danger" title="Do not memorise &quot;justify is horizontal&quot;">
          It is true exactly half the time, and the first column layout you build will contradict it
          — at which point flexbox looks broken rather than misremembered. The rule is{" "}
          <strong>justify-content follows the main axis, align-items crosses it</strong>, and the
          main axis is whatever flex-direction says. Toggle direction in the widget above and watch
          them swap.
        </Callout>
      </LessonSection>

      <LessonSection id="justify-content-runs-along-the-main-axis" title="justify-content runs along the main axis">
        <P>
          <Strong>justify-content</Strong> distributes items along the main axis, and it only has
          anything to do when there is spare space.
        </P>
        <LabelRows
          rows={[
            { label: "flex-start", text: "Packed at the start. The default." },
            { label: "center", text: "Packed in the middle." },
            { label: "flex-end", text: "Packed at the end." },
            { label: "space-between", text: "First at the start, last at the end, gaps equal. The classic nav bar: logo left, links right." },
            { label: "space-around", text: "Equal space around each item, so edge gaps are half the size of the gaps between." },
            { label: "space-evenly", text: "Every gap identical, including the edges. Usually what people mean when they reach for space-around." },
          ]}
        />
        <CodeBlock
          label="The nav bar that used to need a float"
          code={`.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* <header class="header"><a>Logo</a><nav>…</nav></header> */`}
        />
      </LessonSection>

      <LessonSection id="align-items-runs-across-it" title="align-items runs across it">
        <P>
          <Strong>align-items</Strong> positions items on the cross axis — perpendicular to the main
          one.
        </P>
        <LabelRows
          rows={[
            { label: "stretch", text: "The default. Items fill the cross axis, which is why boxes in a row all come out the same height without you asking. Usually what you want." },
            { label: "center", text: "Centred on the cross axis. Half of the famous centring problem." },
            { label: "flex-start / flex-end", text: "Packed to one edge of the cross axis." },
            { label: "baseline", text: "Text baselines line up, regardless of box size. Right for a row of items with different font sizes." },
          ]}
        />
        <CodeBlock
          label="Centring, in two lines, in both directions"
          code={`.centre {
  display: flex;
  justify-content: center;   /* centred on the main axis  */
  align-items: center;       /* centred on the cross axis */
  min-height: 100vh;
}`}
        />
        <P>
          That is the problem flexbox was invented for. It used to require absolute positioning and a
          negative-margin trick that depended on knowing the box&apos;s size in advance, and now it
          is two declarations that work whatever the content is.
        </P>
        <Callout tone="note" title="align-self overrides it for one item">
          <span className="font-[family-name:var(--learn-font-mono)]">align-items</span> is set on
          the container and applies to all of them.{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">align-self</span> goes on a
          single item and overrides it — one badge pushed to the top of an otherwise centred row.
        </Callout>
      </LessonSection>

      <LessonSection id="gap-replaced-margins-between-children" title="gap replaced margins between children">
        <P>
          <Strong>gap</Strong> puts space between flex items and none on the outside edges. Before
          it, everybody wrote a margin on every child and then a rule removing it from the last one.
        </P>
        <CodeBlock
          label="Then, and now"
          code={`/* The old way — and you had to remember the second rule */
.item { margin-right: 1rem; }
.item:last-child { margin-right: 0; }

/* Now */
.list { display: flex; gap: 1rem; }`}
        />
        <P>
          Two more properties finish the picture. <Strong>flex-wrap</Strong> lets items move onto a
          new line instead of shrinking indefinitely — and the combination below is a genuinely
          responsive layout with no media query.
        </P>
        <CodeBlock
          label="Wrapping cards"
          code={`.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 250px;   /* grow | shrink | ideal width */
}`}
        />
        <P>
          <Strong>flex: 1 1 250px</Strong> is three values in one: may grow to fill spare space, may
          shrink if there is not enough, and would ideally be 250 pixels. Cards fill the row, wrap
          when they cannot fit, and share the leftover space — at any screen size.
        </P>
        <LabelRows
          rows={[
            { label: "flex: 1", text: "Shorthand for 1 1 0%: take an equal share of the space. Two items with flex: 1 are exactly half each." },
            { label: "flex: auto", text: "1 1 auto: grow and shrink, but start from the content's own size. Bigger items get more room." },
            { label: "flex: none", text: "0 0 auto: never grow, never shrink. For something that must keep its size, like a logo." },
            { label: "margin-left: auto", text: "On one item, this absorbs all the spare space and pushes that item to the end. The idiomatic way to send one link to the right of a nav." },
          ]}
        />
        <Callout tone="tip" title="Flex for the parts, grid for the page">
          Flexbox is one-dimensional: a row, or a column, and it decides sizes from content. It is
          ideal for a nav bar, a row of buttons, a card&apos;s internals, anything that should wrap
          naturally. When you need rows <em>and</em> columns to align with each other, that is grid —
          the next chapter.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "display: flex on a container makes its DIRECT children flex items. Grandchildren are unaffected.",
          "The container stays a block; only the arrangement of its children changes.",
          "Flexbox has a main axis and a cross axis, and flex-direction decides which is which.",
          "justify-content follows the main axis; align-items crosses it. They swap when you switch to column.",
          "Memorising \"justify is horizontal\" is true half the time and breaks on your first column.",
          "space-between is the nav bar: first at the start, last at the end.",
          "align-items: stretch is the default and is why boxes in a row come out equal height.",
          "justify-content: center plus align-items: center is the centring that used to need a trick.",
          "align-self overrides align-items for a single item.",
          "gap spaces items with nothing on the outside, replacing margin-on-every-child-except-the-last.",
          "flex-wrap plus flex: 1 1 250px is a responsive card grid with no media query.",
          "margin-left: auto on one item pushes it to the end of the row.",
        ]}
      />
    </div>
  );
}
