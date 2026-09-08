import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { SelectorPlayground } from "@/components/html-css/SelectorPlayground";

export function SelectorsLesson() {
  return (
    <div>
      <Lead>
        Everything CSS does begins with picking elements, and there are about eight selectors worth
        knowing out of the hundred that exist. Try each against a real document and watch exactly
        which elements light up.
      </Lead>

      <LessonSection
        id="type-selectors-match-every-element-of-a-kind"
        title="Type selectors match every element of a kind"
      >
        <P>
          The simplest selector is an element name, and it matches every one of them in the document.
        </P>
        <CodeBlock
          label="Type selectors"
          code={`p    { line-height: 1.6; }
h1   { font-size: 2rem; }
img  { max-width: 100%; }
body { margin: 0; }`}
        />
        <P>
          These are right for site-wide defaults — the base look of paragraphs, headings, links.
          They become a problem the moment you want <em>some</em> paragraphs different, because
          there is no way to say which.
        </P>
        <P>
          The universal selector <Strong>*</Strong> matches everything. It has one common use, and
          otherwise you should be suspicious of it.
        </P>
        <CodeBlock
          label="The one you will write"
          code={`*, *::before, *::after { box-sizing: border-box; }`}
        />
        <SelectorPlayground />
      </LessonSection>

      <LessonSection
        id="classes-are-the-ones-you-will-use-constantly"
        title="Classes are the ones you will use constantly"
      >
        <P>
          A class is a label you put on elements yourself, and a class selector is a full stop
          followed by the name. This is the workhorse — most real stylesheets are mostly classes.
        </P>
        <CodeBlock
          label="Classes"
          code={`<p class="intro">The first paragraph.</p>
<p>An ordinary one.</p>
<button class="btn btn-primary">Send</button>`}
        />
        <CodeBlock
          label="And the CSS"
          code={`.intro       { font-size: 1.2rem; color: #555; }
.btn         { padding: 0.5rem 1rem; border-radius: 6px; }
.btn-primary { background: #3e7f5c; color: white; }`}
        />
        <P>
          An element can carry several classes, separated by spaces, and every matching rule applies.
          That button gets both <Strong>.btn</Strong> and <Strong>.btn-primary</Strong> — shared
          styling plus a variant, which is one of the most useful patterns in CSS.
        </P>
        <LabelRows
          rows={[
            { label: "Reusable", text: "Apply the same class to fifty elements. Change one rule, change all fifty." },
            { label: "Specific", text: "You decide what matches. No accidental reach into elements you had not thought about." },
            { label: "Composable", text: "Several classes combine on one element, so shared and variant styles can live separately." },
            { label: "Named for purpose", text: "class=\"warning\" survives a redesign; class=\"red\" becomes a lie the day warnings turn orange." },
          ]}
        />
        <Callout tone="tip" title="Combine a type and a class with no space">
          <span className="font-[family-name:var(--learn-font-mono)]">p.intro</span> means &quot;a
          paragraph that also has the class intro&quot;. No space, because a space means something
          else entirely — see the combinators below. In practice{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">.intro</span> alone is usually
          better: it lets you change the element later without touching the stylesheet.
        </Callout>
      </LessonSection>

      <LessonSection
        id="ids-match-one-element-and-cause-trouble-later"
        title="IDs match one element, and cause trouble later"
      >
        <P>
          An <Strong>id</Strong> is a unique name for one element, and the selector is a hash.
        </P>
        <CodeBlock
          label="IDs"
          code={`<div id="main-nav">…</div>

#main-nav { background: #f5f5f5; }`}
        />
        <P>
          An id must be unique in the document — the same id twice is invalid, and behaviour with
          things like <Strong>#fragment</Strong> links becomes undefined.
        </P>
        <CompareGrid
          items={[
            {
              title: "IDs are useful for",
              tone: "positive",
              children: (
                <P>
                  Link targets (<span className="font-[family-name:var(--learn-font-mono)]">href=&quot;#contact&quot;</span>),
                  joining a label to its input, and being found by JavaScript. All three are about
                  identity, which is what an id is for.
                </P>
              ),
            },
            {
              title: "For styling, prefer a class",
              tone: "caution",
              children: (
                <P>
                  An id beats <em>any</em> number of classes on specificity, so styling with one
                  starts an escalation you lose. It is also unique by definition, so the moment you
                  want a second of something you are rewriting rather than reusing.
                </P>
              ),
            },
          ]}
        />
        <P>
          Both can coexist happily: <Strong>&lt;section id=&quot;contact&quot;
          class=&quot;panel&quot;&gt;</Strong> — the id for linking to, the class for styling.
        </P>
      </LessonSection>

      <LessonSection
        id="descendant-and-child-combinators-are-different"
        title="Descendant and child combinators are different"
      >
        <P>
          Combinators describe a <em>relationship</em> between elements. Two of them cover almost
          everything, and confusing them is the most common reason a selector matches nothing.
        </P>
        <CodeBlock
          label="The four combinators"
          code={`nav a       { }   /* descendant: an a ANYWHERE inside a nav       */
nav > a     { }   /* child: an a that is a DIRECT child of a nav   */
h2 + p      { }   /* adjacent sibling: the p IMMEDIATELY after h2  */
h2 ~ p      { }   /* general sibling: every p after h2, same parent */`}
        />
        <P>
          The first two are the ones to be careful with. Given a nav containing a list containing
          links, <Strong>nav a</Strong> matches the links and <Strong>nav &gt; a</Strong> matches
          nothing at all — the anchors are children of the <Strong>li</Strong>, not of the nav.
        </P>
        <CodeBlock
          label="Why nav > a fails here"
          copyable={false}
          code={`<nav>          ← nav
  <ul>         ← a CHILD of nav
    <li>       ← a child of ul, a DESCENDANT of nav
      <a>      ← a descendant of nav, not a child
    </li>
  </ul>
</nav>`}
        />
        <Callout tone="note" title="Do not chain descendants for the sake of it">
          <span className="font-[family-name:var(--learn-font-mono)]">
            body main section div ul li a
          </span>{" "}
          works and is a trap: it is fragile — any structural change breaks it — it is slow to match,
          and it has high specificity, so overriding it later is painful. A single class on the
          anchor does the same job and survives a redesign. Two levels is plenty.
        </Callout>
      </LessonSection>

      <LessonSection
        id="pseudo-classes-match-a-state-not-an-element"
        title="Pseudo-classes match a state, not an element"
      >
        <P>
          A pseudo-class is a colon and a keyword, and it matches elements in a particular{" "}
          <em>condition</em> — hovered, focused, first of their kind.
        </P>
        <CodeBlock
          label="The selectors to know"
          code={`a:hover           { text-decoration: underline; }
a:focus-visible   { outline: 2px solid #3e7f5c; }
button:disabled   { opacity: 0.5; }
input:checked     { }

li:first-child    { }
li:last-child     { border-bottom: none; }
li:nth-child(2n)  { background: #fafafa; }   /* every second one */

p:not(.intro)     { }                        /* every p WITHOUT that class */`}
        />
        <LabelRows
          rows={[
            { label: ":hover", text: "The pointer is over it. Note that this does not exist on touch devices — never hide anything important behind hover alone." },
            { label: ":focus-visible", text: "Focused via the keyboard. Prefer this to :focus, which also fires on mouse clicks and produces outlines people find noisy." },
            { label: ":nth-child()", text: "By position. 2n is every second, odd and even work, 3 is the third exactly." },
            { label: ":not()", text: "Everything that does NOT match. Useful for \"all of them except the last\"." },
          ]}
        />
        <Callout tone="danger" title="Never remove a focus outline without replacing it">
          <span className="font-[family-name:var(--learn-font-mono)]">
            :focus {"{ outline: none; }"}
          </span>{" "}
          is common advice and it makes a site unusable for anybody navigating by keyboard — there is
          no longer any indication of where they are. If the default outline is ugly, style it. Never
          delete it.
        </Callout>
        <P>
          Related but different: <Strong>pseudo-elements</Strong> use two colons and create something
          that is not in your HTML at all.
        </P>
        <CodeBlock
          label="Pseudo-elements"
          code={`.quote::before  { content: "\\201C"; font-size: 2em; }
p::first-line   { font-variant: small-caps; }
::selection     { background: #dbefdb; }`}
        />
        <P>
          <Strong>::before</Strong> and <Strong>::after</Strong> need a{" "}
          <Strong>content</Strong> property, even if it is empty, or nothing is generated. And their
          content is not real text in the document — it is not always announced by screen readers and
          cannot be found by the browser&apos;s in-page search, so decoration only.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A type selector matches every element of that name — right for site-wide defaults, useless for \"only these ones\".",
          "Classes are the workhorse: reusable, composable, and you decide what matches.",
          "An element can carry several classes; shared styling plus a variant is the most useful pattern in CSS.",
          "Name classes for purpose, not appearance. .warning survives a redesign; .red becomes a lie.",
          "IDs are for link targets, labels, and JavaScript. For styling they win specificity fights you did not want to start.",
          "A space means descendant (any depth); a > means direct child. Confusing them is the top cause of a selector matching nothing.",
          "Long descendant chains are fragile, slow, and hard to override. Two levels is plenty; a class is usually better.",
          "Pseudo-classes match a state: :hover, :focus-visible, :nth-child(), :not().",
          ":hover does not exist on touch devices, so never hide anything important behind it.",
          "Never remove a focus outline without replacing it — it is how keyboard users know where they are.",
          "Pseudo-elements use :: and need a content property; their text is decoration and is not reliably announced or searchable.",
        ]}
      />
    </div>
  );
}
