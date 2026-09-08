import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function DevtoolsLesson() {
  return (
    <div>
      <Lead>
        Every browser ships a tool that shows you the live page, every rule applied to any element,
        and which ones were crossed out and why. Most beginners never open it, and it answers nearly
        every question they ask.
      </Lead>

      <LessonSection
        id="inspect-element-shows-the-live-tree-not-your-file"
        title="Inspect element shows the live tree, not your file"
      >
        <P>
          Right-click anything on any page and choose <Strong>Inspect</Strong>. Or press{" "}
          <Strong>F12</Strong>, or <Strong>Ctrl/Cmd + Shift + I</Strong>.
        </P>
        <P>
          The Elements panel is the DOM from chapter 5 — the tree the browser built, live, right now.
          It is not your HTML file, and that distinction matters more than it sounds.
        </P>
        <LabelRows
          rows={[
            { label: "View source", text: "The bytes the server sent. What you wrote." },
            { label: "Elements panel", text: "The tree as it exists now, including anything the browser corrected and anything JavaScript changed since." },
            { label: "Why they differ", text: "A tag you forgot to close appears closed here, in whatever place the browser decided. That difference is the bug." },
          ]}
        />
        <P>
          Hover any node and the browser highlights it on the page, with its box model shaded —
          content, padding, border, and margin in four colours. That overlay alone explains most
          &quot;why is there a gap there&quot; questions in about two seconds.
        </P>
        <Callout tone="tip" title="The element picker is the fastest way in">
          The arrow-in-a-box icon at the top left of devtools, or{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">Ctrl/Cmd + Shift + C</span>.
          Click anything on the page and devtools jumps straight to that node with its styles loaded.
          Start here rather than scrolling the tree.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-styles-panel-lists-every-rule-in-order"
        title="The styles panel lists every rule, in order"
      >
        <P>
          With an element selected, the Styles panel on the right lists every rule that matched it —
          in cascade order, most specific first, with the file and line number each came from.
        </P>
        <CodeBlock
          label="Roughly what you see"
          copyable={false}
          code={`element.style { }                        ← inline style attribute, if any

.project:hover                styles.css:142
  border-color: var(--accent);

.project                      styles.css:128
  padding: 1.5rem;
  background: var(--raised);
  border-radius: 8px;

li                            styles.css:44
  max-width: 65ch;

Inherited from section
  body                        styles.css:31
    line-height: 1.6;
    color: var(--ink);`}
        />
        <P>
          Three things in that list explain most of the panel&apos;s behaviour.
        </P>
        <LabelRows
          rows={[
            { label: "The file and line", text: "Click it and devtools opens that exact line in the Sources panel. This is how you find which of four stylesheets a rule came from." },
            { label: "The order", text: "Top of the list wins. It is the cascade from chapter 13, rendered as a list you can read." },
            { label: "Inherited from", text: "A separate section at the bottom for values that came down the tree rather than from a rule targeting this element. Chapter 13's other mechanism, labelled." },
            { label: "user agent stylesheet", text: "The browser's own defaults, shown as a source like any other. This is where you can actually read them." },
          ]}
        />
        <P>
          The <Strong>Computed</Strong> tab beside it answers a different question: not which rules
          matched, but what the final value of every property ended up being. When you want to know
          what the font size actually <em>is</em>, after everything, that is the tab.
        </P>
      </LessonSection>

      <LessonSection
        id="a-crossed-out-declaration-tells-you-it-lost"
        title="A crossed-out declaration tells you it lost"
      >
        <P>
          This is one of the most useful devtools habits and the reason chapter 13 ends by pointing
          here. When a declaration is overridden, devtools draws a line through it.
        </P>
        <CodeBlock
          label="Your rule, beaten"
          copyable={false}
          code={`#sidebar .card                site.css:88
  background: white;

.card                         styles.css:210
  background: hotpink;        ← struck through`}
          lineTones={{ 1: "ok", 4: "err" }}
        />
        <P>
          You wrote the pink one, it is later in the file, and it lost. The struck-through line tells
          you it lost; the rule above it tells you what to. <Strong>#sidebar .card</Strong> is 1-1-0
          and yours is 0-1-0, so specificity decided it before source order was ever consulted.
        </P>
        <P>
          Hovering a struck-through declaration usually explains why. Three reasons cover almost
          everything:
        </P>
        <LabelRows
          rows={[
            { label: "Overridden", text: "A more specific rule won. The winner is somewhere above it in the same list." },
            { label: "Invalid property or value", text: "Shown with a warning icon rather than a strike. A typo, or a value the property does not accept." },
            { label: "Does not apply", text: "Valid, matched, and meaningless for this element — width on an inline element from chapter 16. Devtools often does NOT flag this one, which is why chapter 16 exists." },
          ]}
        />
        <Callout tone="success" title="This turns the cascade from theory into reading">
          &quot;Why is my rule not applying&quot; stops being a puzzle. Inspect the element, find your
          declaration, see whether it is struck through, and read what beat it. Thirty seconds, every
          time, with no guessing.
        </Callout>
      </LessonSection>

      <LessonSection
        id="editing-in-devtools-changes-nothing-on-disk"
        title="Editing in devtools changes nothing on disk"
      >
        <P>
          Everything in the Styles panel is editable. Click a value and type a new one; click the
          blank space in a rule and add a declaration; tick and untick the checkbox beside any
          declaration to toggle it.
        </P>
        <P>
          Changes appear instantly and are <Strong>lost on refresh</Strong>. Nothing touches your
          files. That makes it the ideal place to experiment: try six values in ten seconds, then
          write the one that worked into your stylesheet.
        </P>
        <LabelRows
          rows={[
            { label: "Arrow keys", text: "With the cursor in a numeric value, Up and Down nudge by 1. Shift+Up moves by 10, Alt/Option+Up by 0.1. Excellent for finding a spacing value by feel." },
            { label: ":hov", text: "A button at the top of the Styles panel that force-applies :hover, :focus, or :active — so you can style a hover state while actually looking at it." },
            { label: "Colour swatches", text: "Click one for a picker and an eyedropper. Shift-click the swatch to cycle between hex, rgb, and hsl." },
            { label: "Add a rule", text: "The + button creates a new rule for the current element, which you can then copy into your file." },
          ]}
        />
        <Callout tone="warning" title="Do not forget to write it down">
          The commonest devtools mistake is spending twenty minutes getting a layout right, being
          pleased, and pressing refresh. Copy the working declarations into your stylesheet as you
          go.
        </Callout>
      </LessonSection>

      <LessonSection id="the-device-toolbar-and-the-network-tab" title="The device toolbar and the network tab">
        <P>
          Two more panels earn their place for the work in this track.
        </P>
        <P>
          The <Strong>device toolbar</Strong> — the phone-and-tablet icon, or{" "}
          <Strong>Ctrl/Cmd + Shift + M</Strong> — simulates a narrow viewport with touch input and a
          device pixel ratio. Presets are there, and the more useful thing is the{" "}
          <Strong>Responsive</Strong> mode where you drag the edge: every layout problem announces
          itself somewhere between 1400 and 320 pixels, and you find breakpoints you would not have
          guessed.
        </P>
        <P>
          The <Strong>Network</Strong> tab lists every file the page requested, with its status code.
          Refresh with it open, and two questions get answered immediately:
        </P>
        <LabelRows
          rows={[
            { label: "A 404 in red", text: "Your stylesheet, image, or font is not where the page thinks it is. This is the answer to \"why is my page unstyled\" essentially every time — a path problem, not a CSS problem." },
            { label: "A large file", text: "Sort by size. An unresized phone photo at 4 MB will be at the top, and it is why the page feels slow." },
            { label: "Disable cache", text: "A checkbox at the top. Tick it while devtools is open so a hard refresh is not needed after every CSS change." },
          ]}
        />
        <ChecklistCard
          title="Devtools habits worth having by the end of this track"
          marker="check"
          items={[
            "Ctrl/Cmd + Shift + C, click the thing, read its styles — before guessing",
            "Look for the strike-through when a rule does not apply",
            "Read the box model overlay when spacing is wrong",
            "Nudge values with the arrow keys instead of editing, saving, and refreshing",
            "Drag the responsive width from wide to narrow before calling a layout done",
            "Check the network tab for a red 404 whenever something is mysteriously missing",
            "Run the Lighthouse tab on a finished page — it audits accessibility, performance, and SEO in one click",
          ]}
        />
        <Callout tone="note" title="Every browser has these, and they are close enough">
          Chrome, Edge, Firefox, and Safari all ship devtools with the same core panels under
          slightly different names. Firefox&apos;s grid and flexbox inspectors are notably good —
          overlaying track lines directly on the page — and are worth opening specifically when
          chapters 17 and 18 are not behaving. On Safari, devtools must be enabled first in Settings
          &rarr; Advanced.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Ctrl/Cmd + Shift + I opens devtools; Ctrl/Cmd + Shift + C picks an element directly.",
          "The Elements panel is the live DOM, not your file — a tag you forgot to close appears closed, wherever the browser decided.",
          "Hovering a node shades its box model on the page, which explains most unexplained gaps.",
          "The Styles panel lists every matching rule in cascade order with its file and line.",
          "\"Inherited from\" is a separate section, because inheritance is a separate mechanism.",
          "A struck-through declaration lost. The rule that beat it is above it in the same list.",
          "The Computed tab answers what the final value is, rather than which rules matched.",
          "Devtools edits are live and lost on refresh — ideal for experimenting, and copy the result into your file.",
          "Arrow keys nudge numeric values; the :hov button force-applies hover and focus states.",
          "The responsive device toolbar is for dragging, not for presets.",
          "A red 404 in the network tab is the answer to \"why is my page unstyled\" nearly every time.",
          "Firefox's grid and flexbox inspectors overlay the tracks on the page, which is worth switching browsers for.",
        ]}
      />
    </div>
  );
}
