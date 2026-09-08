import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { BoxModelExplorer } from "@/components/html-css/BoxModelExplorer";

export function TheBoxModelLesson() {
  return (
    <div>
      <Lead>
        Set an element to 300 pixels wide, add padding, and measure it: it is 340. That one behaviour
        has confused every person who has ever learned CSS, and one line of code fixes it
        permanently.
      </Lead>

      <LessonSection
        id="content-padding-border-margin-from-inside-out"
        title="Content, padding, border, margin — from the inside out"
      >
        <P>
          Every element the browser draws is a rectangle, and every rectangle has four nested layers.
          Not some elements. Every one.
        </P>
        <LabelRows
          rows={[
            { label: "Content", text: "The text or image itself. Its size is what width and height normally describe." },
            { label: "Padding", text: "Space INSIDE the border. It takes the background colour, so it is what gives a button room around its label." },
            { label: "Border", text: "A line around the padding. Has a width, a style, and a colour, and all three are needed for it to appear." },
            { label: "Margin", text: "Space OUTSIDE the border. Always transparent — it shows whatever is behind the element, never its own background." },
          ]}
        />
        <BoxModelExplorer />
        <P>
          Drag the sliders and watch the sum at the bottom. That arithmetic is the rule this
          chapter builds on.
        </P>
        <CodeBlock
          label="Shorthand, and how many values mean what"
          code={`padding: 20px;                  /* all four sides            */
padding: 10px 20px;             /* top+bottom | left+right   */
padding: 10px 20px 30px;        /* top | left+right | bottom */
padding: 10px 20px 30px 40px;   /* top | right | bottom | left — clockwise */

margin: 0 auto;                 /* 0 top and bottom, auto left and right */
border: 2px solid #3e7f5c;      /* width | style | colour    */`}
        />
        <P>
          <Strong>margin: 0 auto</Strong> is worth memorising: it centres a block element
          horizontally by splitting the leftover space equally. It only works on an element that has
          a width — an element already filling its container has no leftover space to split.
        </P>
      </LessonSection>

      <LessonSection id="width-means-the-content-box-by-default" title="width means the content box, by default">
        <P>
          Here is the behaviour that surprises everybody. By default,{" "}
          <Strong>width</Strong> sets the width of the <em>content</em> only. Padding and border are
          added on the outside.
        </P>
        <CodeBlock
          label="The arithmetic"
          copyable={false}
          code={`.card {
  width: 300px;
  padding: 20px;
  border: 4px solid;
}

Actual space on screen:
  300  content
+  40  padding  (20 left + 20 right)
+   8  border   (4 left + 4 right)
────────
  348px`}
          lineTones={{ 11: "err" }}
        />
        <P>
          You asked for 300 and got 348. Nothing warns you, and the CSS clearly says{" "}
          <Strong>width: 300px</Strong>.
        </P>
        <Callout tone="danger" title="This is why two 50% columns do not fit">
          Two elements at{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">width: 50%</span> with any
          padding at all add up to more than 100%, so the second one wraps onto a new line. It is
          a common layout bug in CSS, it has nothing to do with your layout method,
          and the fix is in the next section.
        </Callout>
      </LessonSection>

      <LessonSection
        id="border-box-makes-width-mean-what-you-meant"
        title="border-box makes width mean what you meant"
      >
        <P>
          <Strong>box-sizing</Strong> changes what <Strong>width</Strong> refers to. Set it to{" "}
          <Strong>border-box</Strong> and width means the whole visible box — padding and border
          included, taken out of the width rather than added to it.
        </P>
        <CodeBlock
          label="Put this at the top of every stylesheet you write"
          code={`*, *::before, *::after {
  box-sizing: border-box;
}`}
        />
        <CompareGrid
          items={[
            {
              title: "content-box — the default",
              tone: "caution",
              children: (
                <P>
                  width: 300px + 20px padding + 4px border = <strong>348px on screen</strong>. The
                  number you type is the content, and the final size depends on three properties at
                  once.
                </P>
              ),
            },
            {
              title: "border-box — what you want",
              tone: "positive",
              children: (
                <P>
                  width: 300px + 20px padding + 4px border ={" "}
                  <strong>300px on screen</strong>, with 252px of content. Change the padding and the
                  box stays 300. Two 50% columns fit.
                </P>
              ),
            },
          ]}
        />
        <P>
          There is no downside and essentially every real project starts with it. It is not the
          default only because changing a default would have broken a large part of the existing web
          — the specification could not fix it retroactively, so you fix it in two lines.
        </P>
        <Callout tone="note" title="The universal selector is right here, unusually">
          <span className="font-[family-name:var(--learn-font-mono)]">*</span> is normally something
          to be suspicious of, and this is the exception: box-sizing should apply to
          everything, including the pseudo-elements, which is why{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">*::before, *::after</span> are
          in the selector too.
        </Callout>
      </LessonSection>

      <LessonSection
        id="vertical-margins-collapse-into-each-other"
        title="Vertical margins collapse into each other"
      >
        <P>
          The second surprising behaviour. When two vertical margins meet, they do not add up — the{" "}
          <em>larger one wins</em> and the smaller is discarded.
        </P>
        <CodeBlock
          label="30 plus 20 is 30"
          copyable={false}
          code={`h2 { margin-bottom: 30px; }
p  { margin-top:    20px; }

Gap between them: 30px, not 50px.`}
          lineTones={{ 3: "warn" }}
        />
        <P>
          This is deliberate and mostly helpful — it is why a document of headings and paragraphs
          spaces evenly without you calculating anything. It becomes confusing in two other cases.
        </P>
        <LabelRows
          rows={[
            { label: "Adjacent siblings", text: "Two elements next to each other. The larger of the two margins is the gap. The common case, and the helpful one." },
            { label: "Parent and first child", text: "A child's top margin can escape its parent and push the PARENT down instead — leaving a gap above the box you did not ask for." },
            { label: "Empty elements", text: "An element with no content, padding, or border has its own top and bottom margins collapse together into one." },
            { label: "Never horizontal", text: "Left and right margins always add. Only vertical margins collapse." },
          ]}
        />
        <P>
          The escaping-child case is the one that produces a genuine bug report. Anything that
          establishes a new formatting context stops it — padding, a border, or the modern one-liner:
        </P>
        <CodeBlock
          label="Three ways to stop margins escaping"
          code={`.parent { padding-top: 1px; }        /* works, and is a hack     */
.parent { border-top: 1px solid; }   /* works, and is visible    */
.parent { display: flow-root; }      /* the intended answer      */

/* Flex and grid containers do not collapse margins at all,
   which is why this problem largely disappears in chapters 17–18. */`}
        />
      </LessonSection>

      <LessonSection
        id="padding-versus-margin-is-inside-versus-outside"
        title="Padding versus margin is inside versus outside"
      >
        <P>
          Both create space and they are not interchangeable. The test is whether the space belongs
          to the element or sits between elements.
        </P>
        <CompareGrid
          items={[
            {
              title: "Padding — inside",
              tone: "positive",
              children: (
                <P>
                  Takes the background colour. Included in the clickable area. Does not collapse.
                  Room around a button&apos;s label, breathing space inside a card, the inset on a
                  form field.
                </P>
              ),
            },
            {
              title: "Margin — outside",
              tone: "neutral",
              children: (
                <P>
                  Always transparent. Not clickable. Collapses vertically. The gap between two cards,
                  the space under a heading, centring with{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">0 auto</span>.
                </P>
              ),
            },
          ]}
        />
        <P>
          The clearest case is a link styled as a button. Padding enlarges the target — the whole
          padded area is clickable. Margin does not; it pushes neighbours away and stays dead space.
          On a phone that is the difference between an easy tap and a missed one.
        </P>
        <Callout tone="tip" title="In flex and grid layouts, prefer gap">
          <span className="font-[family-name:var(--learn-font-mono)]">gap</span> puts space{" "}
          <em>between</em> children with none on the outside edges, which is almost always what
          spacing a row or a grid actually means. It also sidesteps margin collapsing and the
          &quot;remove the margin from the last one&quot; rule people write constantly.
        </Callout>
        <P>
          Two more properties that stop boxes from misbehaving:
        </P>
        <CodeBlock
          label="Constraints, not fixed sizes"
          code={`.container {
  max-width: 65ch;    /* never wider than this — the readable measure */
  margin: 0 auto;     /* and centred */
}

img { max-width: 100%; height: auto; }   /* never overflow */

.panel { min-height: 200px; }            /* at least this tall, more if needed */`}
        />
        <P>
          <Strong>max-width</Strong> is almost always better than <Strong>width</Strong> for a
          container: it takes the full space when there is less and stops growing when there is more,
          which is responsive behaviour for free and no media query.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Every element is a rectangle with four layers: content, padding, border, margin.",
          "Padding takes the background colour; margin is always transparent.",
          "Shorthand values run clockwise from the top; two values mean vertical then horizontal.",
          "margin: 0 auto centres a block, but only one that has a width.",
          "By default width sets the CONTENT width, so padding and border are added on top — 300 becomes 348.",
          "That is why two 50% columns with padding do not fit on one line.",
          "box-sizing: border-box makes width mean the visible box. Put it on * at the top of every stylesheet.",
          "Vertical margins collapse to the larger of the two; horizontal margins always add.",
          "A child's top margin can escape its parent. display: flow-root stops it, and flex/grid containers never collapse at all.",
          "Padding is inside and clickable; margin is outside and dead space. On a phone that decides whether a tap lands.",
          "Prefer gap in flex and grid, and max-width over width for containers.",
        ]}
      />
    </div>
  );
}
