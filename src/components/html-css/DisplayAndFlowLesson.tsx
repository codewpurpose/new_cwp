import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { DisplayFlow } from "@/components/html-css/DisplayFlow";

export function DisplayAndFlowLesson() {
  return (
    <div>
      <Lead>
        Before any layout system, the browser already has one, and half of learning CSS layout is
        understanding what it does by default. Find out why width does nothing on a span and why an
        image leaves a gap underneath it.
      </Lead>

      <LessonSection
        id="normal-flow-is-a-layout-you-did-not-ask-for"
        title="Normal flow is a layout you did not ask for"
      >
        <P>
          Write a page with no CSS and the content still arranges itself: headings and paragraphs
          stack down the page, words run left to right and wrap at the edge. That is{" "}
          <Strong>normal flow</Strong>, and every layout technique in the next chapters is a
          modification of it rather than a replacement.
        </P>
        <P>
          Normal flow has two directions running at once, and the difference between them is the
          whole of this chapter.
        </P>
        <CompareGrid
          items={[
            {
              title: "Block direction — down",
              tone: "positive",
              children: (
                <P>
                  Block-level boxes stack vertically, each on a new line, each filling the available
                  width. Headings, paragraphs, sections, lists.
                </P>
              ),
            },
            {
              title: "Inline direction — across",
              tone: "neutral",
              children: (
                <P>
                  Inline boxes sit in a line of text, side by side, wrapping to a new line when they
                  run out of room. Links, spans, strong, images.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="tip" title="Work with the flow before overriding it">
          A stack of full-width blocks is already correct on a phone. A great deal of layout work is
          people fighting normal flow into a desktop shape and then fighting it back for mobile — the
          mobile-first approach in chapter 19 exists partly because the default is already the small
          screen answer.
        </Callout>
      </LessonSection>

      <LessonSection id="block-elements-take-the-whole-line" title="Block elements take the whole line">
        <P>
          A block element starts on a new line and takes the full width of its container, whatever
          its content actually needs. A three-word heading still occupies the whole row.
        </P>
        <CodeBlock
          label="Block by default"
          copyable={false}
          code={`div  p  h1–h6  section  article  header  footer  nav  main
ul  ol  li  form  figure  blockquote  table  hr`}
        />
        <LabelRows
          rows={[
            { label: "New line", text: "Always starts on one, and the next element starts on another." },
            { label: "Full width", text: "Fills the container by default, regardless of content." },
            { label: "width and height", text: "Both respected." },
            { label: "All four margins", text: "Respected, and vertical ones collapse — chapter 14." },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="inline-elements-ignore-width-and-vertical-margin"
        title="Inline elements ignore width and vertical margin"
      >
        <P>
          An inline element is part of a line of text. It is as wide as its content, sits alongside
          its neighbours, and — this is the part that catches everyone —{" "}
          <Strong>ignores width and height entirely</Strong>.
        </P>
        <DisplayFlow />
        <P>
          Switch that to <Strong>inline</Strong> and watch the boxes collapse to the width of their
          text while the CSS still says <Strong>width: 120px</Strong>. Nothing warns you, and
          devtools shows the declaration applied and not crossed out — because it{" "}
          <em>is</em> applied. It simply has no meaning for this display type.
        </P>
        <LabelRows
          rows={[
            { label: "width / height", text: "Ignored. This is the answer to \"why is my width not working\", and it is nearly always a span or an a." },
            { label: "Vertical margin", text: "Ignored. Top and bottom margins do nothing at all." },
            { label: "Vertical padding", text: "Renders — the background extends — but does not push the surrounding lines apart. It overlaps them instead." },
            { label: "Horizontal margin and padding", text: "Both respected normally." },
          ]}
        />
        <Callout tone="note" title="The mysterious gap under an image">
          An <span className="font-[family-name:var(--learn-font-mono)]">img</span> is inline, so it
          sits on the text baseline — and the baseline leaves room for descenders, the tails of{" "}
          <em>g</em> and <em>y</em>. That space is the four-pixel gap under an image inside a
          container. Two fixes:{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">img {"{ display: block; }"}</span>{" "}
          or{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            img {"{ vertical-align: middle; }"}
          </span>
          . It is not a border, a margin, or a bug.
        </Callout>
      </LessonSection>

      <LessonSection id="inline-block-is-the-compromise" title="inline-block is the compromise">
        <P>
          <Strong>display: inline-block</Strong> flows inline with its neighbours and behaves like a
          block on the inside: width, height, and vertical margins all work.
        </P>
        <CodeBlock
          label="The classic use"
          code={`.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin-bottom: 0.5rem;   /* works — would be ignored if inline */
  border-radius: 999px;
  background: #dbefdb;
}`}
        />
        <P>
          For a decade this was how you laid out a row of anything. Flexbox does that job better now,
          and inline-block remains right for something that genuinely belongs{" "}
          <em>within a line of text</em> — a tag, a badge, a small button inside a sentence.
        </P>
        <Callout tone="warning" title="inline-block has a whitespace gap">
          Because they are inline, the newline between two inline-block elements in your HTML renders
          as a space — so a row of them has small gaps you did not write. The old fixes were ugly
          (removing the newlines, negative margins). Flexbox does not have this problem at all, which
          is a good reason to reach for it instead.
        </Callout>
        <P>
          The other display values you will meet:
        </P>
        <LabelRows
          rows={[
            { label: "flex", text: "The children become flex items, laid out in one dimension. Chapter 17." },
            { label: "grid", text: "The children become grid items, in two dimensions. Chapter 18." },
            { label: "inline-flex / inline-grid", text: "The same, but the container itself sits inline." },
            { label: "flow-root", text: "A block that contains its children's margins and floats. The modern answer to a problem people used to call clearfix." },
          ]}
        />
      </LessonSection>

      <LessonSection id="display-none-versus-visibility-hidden" title="display: none versus visibility: hidden">
        <P>
          Three ways to hide something, with three different consequences. Picking the wrong one is
          an accessibility bug rather than a visual one.
        </P>
        <LabelRows
          rows={[
            { label: "display: none", text: "Removed from the layout entirely. Takes no space, is not read by screen readers, is not focusable. The right answer for genuinely hidden content." },
            { label: "visibility: hidden", text: "Invisible but STILL OCCUPIES ITS SPACE. Not announced, not focusable. Right when you need the layout to stay put." },
            { label: "opacity: 0", text: "Fully transparent, still occupies space, and is STILL FOCUSABLE AND ANNOUNCED. A keyboard user can tab into something nobody can see." },
            { label: "The visually-hidden class", text: "Invisible on screen, still read by screen readers. For text that gives context to assistive technology only." },
          ]}
        />
        <CodeBlock
          label="Visually hidden, and still announced"
          code={`.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* <a href="/cart">Cart <span class="visually-hidden">(3 items)</span></a> */`}
        />
        <P>
          That pattern is standard, it appears in essentially every design system, and it is the
          correct way to add context for screen readers without changing the visual design.
        </P>
        <Callout tone="danger" title="Do not hide things with opacity or off-screen positioning">
          An <span className="font-[family-name:var(--learn-font-mono)]">opacity: 0</span> menu is
          still in the tab order, so a keyboard user tabs into invisible links and their focus
          disappears off the page. Use{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">display: none</span> for closed
          menus, or add{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">visibility: hidden</span> to the
          transition so it leaves the tab order once the animation ends.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Normal flow is a layout you already have: blocks stack down, inline content runs across and wraps.",
          "Layout techniques modify normal flow rather than replacing it, and its default is already the small-screen answer.",
          "Block elements start on a new line, fill the width, and respect width, height, and all four margins.",
          "Inline elements ignore width, height, and vertical margins entirely — this is why \"my width does nothing\".",
          "Vertical padding on an inline element renders but does not push other lines away; it overlaps them.",
          "The gap under an image is baseline space for descenders. display: block or vertical-align: middle removes it.",
          "inline-block flows inline and honours width, height, and vertical margins — right for badges inside a sentence.",
          "inline-block has a whitespace gap between items because the newline in your HTML is a space. Flexbox does not.",
          "display: none removes it from layout and from screen readers; visibility: hidden keeps the space.",
          "opacity: 0 keeps it focusable and announced — a keyboard user can tab into something invisible.",
          "The .visually-hidden pattern hides something on screen while keeping it available to screen readers.",
        ]}
      />
    </div>
  );
}
