import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { SpecificityScorer } from "@/components/html-css/SpecificityScorer";

export function TheCascadeAndSpecificityLesson() {
  return (
    <div>
      <Lead>
        Two rules target the same element and one of them wins, by a procedure that is completely
        deterministic and almost never taught. Score two selectors against each other and find out
        why the one you wrote lost.
      </Lead>

      <LessonSection
        id="three-questions-decide-every-conflict-in-order"
        title="Three questions decide every conflict, in order"
      >
        <P>
          The <Strong>C</Strong> in CSS is Cascading, and this is what it names: the procedure for
          resolving conflicts. It is not vague, it is not a heuristic, and it is not
          &quot;whatever comes last&quot;.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Is one of them !important?",
              detail: "An !important declaration beats every normal one regardless of anything else. If both are, the comparison continues on to the next question between them.",
            },
            {
              label: "Which has higher specificity?",
              detail: "Count the selector's IDs, classes, and types. Higher wins. This is where most conflicts are actually settled, and it is the part people skip.",
            },
            {
              label: "Which is written later?",
              detail: "Only if the first two are exact ties. Later in the file, or in a later file, wins. This is the tie-breaker — not the rule.",
            },
          ]}
        />
        <P>
          Almost everybody learns step three first and stops there. That is why &quot;my rule is at
          the bottom and it still does not work&quot; feels arbitrary: source order never got
          consulted, because step two had already decided.
        </P>
        <Callout tone="note" title="There is a step zero: origin">
          Before any of this, declarations are sorted by where they came from — the browser&apos;s
          own stylesheet, then the user&apos;s own settings, then yours. Yours nearly always wins,
          which is why this rarely matters. User styles with{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">!important</span> beat
          everything of yours — deliberately, so somebody who needs 24-point text can have it.
        </Callout>
      </LessonSection>

      <LessonSection id="specificity-is-counted-not-weighed" title="Specificity is counted, not weighed">
        <P>
          Specificity is three numbers, counted from the selector itself. Nothing about the
          declaration matters, only the selector in front of it.
        </P>
        <LabelRows
          rows={[
            { label: "First column", text: "IDs. Every # in the selector." },
            { label: "Second column", text: "Classes, attribute selectors ([type=\"text\"]), and pseudo-classes (:hover, :nth-child)." },
            { label: "Third column", text: "Element types (p, div, a) and pseudo-elements (::before)." },
            { label: "Counted from", text: "The whole selector, including everything in the descendant chain. * and combinators count for nothing." },
          ]}
        />
        <CodeBlock
          label="Counting"
          copyable={false}
          code={`p                      0-0-1
.intro                 0-1-0
p.intro                0-1-1
nav ul li a            0-0-4
.nav .item a           0-2-1
#header                1-0-0
#header .nav a:hover   1-2-1
*                      0-0-0`}
        />
        <SpecificityScorer />
        <P>
          The crucial rule is the one the widget demonstrates: the columns are compared{" "}
          <em>left to right and the comparison stops at the first difference</em>. It is not a
          three-digit number.
        </P>
        <CompareGrid
          items={[
            {
              title: "This is why",
              tone: "positive",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">#header</span> (1-0-0)
                  beats{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    .a .b .c .d .e .f
                  </span>{" "}
                  (0-6-0). One ID, and the classes column is never reached.
                </P>
              ),
            },
            {
              title: "And this",
              tone: "neutral",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">.card</span> (0-1-0)
                  beats{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    body main article section p
                  </span>{" "}
                  (0-0-5). One class beats any number of element names.
                </P>
              ),
            },
          ]}
        />
        <P>
          An <Strong>inline style attribute</Strong> sits above all three columns, which is the
          practical reason inline styles are hard to work with: nothing in your stylesheet can
          override one except <Strong>!important</Strong>.
        </P>
      </LessonSection>

      <LessonSection id="source-order-only-breaks-an-exact-tie" title="Source order only breaks an exact tie">
        <P>
          When specificity is identical, the later declaration wins. This is useful and it
          is what makes an override file work.
        </P>
        <CodeBlock
          label="Same specificity — later wins"
          code={`.btn { background: grey; }
.btn { background: green; }   /* green: same 0-1-0, written later */`}
        />
        <CodeBlock
          label="Different specificity — order is irrelevant"
          code={`#save .btn { background: green; }   /* 1-1-0 — wins */
.btn       { background: grey;  }   /* 0-1-0 — loses, despite being later */`}
          lineTones={{ 0: "ok", 1: "err" }}
        />
        <P>
          Two practical consequences. Link stylesheets in the order you want them to override — a
          theme file after a base file. And within one file, put general rules first and specific
          ones after, so ties resolve the way you would expect while reading.
        </P>
        <Callout tone="tip" title="This is what @layer was invented for">
          Modern CSS has{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">@layer</span>, which lets you
          declare an explicit override order that beats specificity entirely — so a low-specificity
          rule in a later layer wins over a high-specificity one in an earlier layer. It is well
          supported, but it is not needed for a hand-written site, so look it up rather than learn it
          now.
        </Callout>
      </LessonSection>

      <LessonSection
        id="inheritance-is-a-separate-mechanism-entirely"
        title="Inheritance is a separate mechanism entirely"
      >
        <P>
          Inheritance is not the cascade and the two are constantly confused. The cascade decides
          between rules that <em>target the same element</em>. Inheritance passes values{" "}
          <em>down the tree</em> to elements no rule targeted at all.
        </P>
        <CodeBlock
          label="Set it once, high up"
          code={`body {
  font-family: system-ui, sans-serif;
  color: #333;
  line-height: 1.6;
}
/* Every paragraph, list item, heading and link inside inherits
   all three — no rule mentions them. */`}
        />
        <LabelRows
          rows={[
            { label: "Inherits", text: "Text-related properties: color, font-family, font-size, font-weight, line-height, text-align, letter-spacing, list-style, visibility, cursor." },
            { label: "Does not inherit", text: "Box-related properties: margin, padding, border, width, height, background, display, position. A paragraph does not get its parent's border." },
            { label: "Why the split", text: "Text properties are almost always wanted throughout a subtree; box properties almost never are. Inheriting a border would put one on every descendant." },
            { label: "Force it", text: "value: inherit takes the parent's. initial resets to the CSS default. unset does whichever of those applies to that property." },
          ]}
        />
        <P>
          Two things this explains. Links do not inherit colour from body, because the browser&apos;s
          own <Strong>a {"{ color: … }"}</Strong> rule targets them directly, and a rule always beats
          an inherited value. And form controls do not inherit your font at all — they take the
          operating system&apos;s, which is why forms often look out of place until you fix it:
        </P>
        <CodeBlock
          label="The one-line fix people never find"
          code={`input, textarea, select, button {
  font: inherit;
}`}
        />
      </LessonSection>

      <LessonSection id="important-is-a-debt-not-a-tool" title="!important is a debt, not a tool">
        <P>
          Adding <Strong>!important</Strong> to a declaration lifts it above every normal one,
          whatever its specificity.
        </P>
        <CodeBlock
          label="The escape hatch"
          code={`.btn { background: green !important; }`}
        />
        <P>
          It works. That is the problem: it works immediately, so it is reached for whenever a rule
          does not apply, and it removes the pressure to find out why.
        </P>
        <CompareGrid
          items={[
            {
              title: "What it costs",
              tone: "caution",
              children: (
                <P>
                  The next override needs its own{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">!important</span>, and
                  then you are comparing important declarations by specificity — the same problem one
                  level up, with a smaller escape hatch left. Stylesheets do reach the
                  point where every rule has one.
                </P>
              ),
            },
            {
              title: "When it is fair",
              tone: "neutral",
              children: (
                <P>
                  Overriding a third-party stylesheet you cannot edit. A utility class that must
                  always win, like a{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">.hidden</span> helper.
                  Both are deliberate, both are rare, and both deserve a comment saying why.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="success" title="What to do instead, when a rule does not apply">
          Open devtools and inspect the element. The styles panel lists every rule that matched, in
          cascade order, with the losing declarations <em>crossed out</em> — so you can see exactly
          which rule beat yours and what its selector was. That is chapter 23, and it turns this
          entire subject from guesswork into reading.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Conflicts resolve in order: !important, then specificity, then source order.",
          "Source order is the last tie-breaker, not the rule — which is why \"but mine is at the bottom\" fails.",
          "Specificity is three counts: IDs, then classes/attributes/pseudo-classes, then types.",
          "Columns compare left to right and stop at the first difference. It is not a three-digit number.",
          "One ID beats any number of classes; one class beats any number of element names.",
          "An inline style attribute outranks all three columns.",
          "Inheritance is not the cascade: it passes text properties down to elements no rule targeted.",
          "Text properties inherit; box properties do not. Form controls inherit nothing until you write font: inherit.",
          "A rule always beats an inherited value, which is why links ignore body's colour.",
          "!important buys a fix now and an escalation later. Devtools shows you which rule actually won.",
        ]}
      />
    </div>
  );
}
