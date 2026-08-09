import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function HowCssAttachesLesson() {
  return (
    <div>
      <Lead>
        CSS can be written in an attribute, in the head, or in its own file, and only one of those
        scales past a single page. See what a rule is made of, then meet the styles the browser
        applied before you wrote anything.
      </Lead>

      <LessonSection
        id="a-rule-is-a-selector-and-a-block-of-declarations"
        title="A rule is a selector and a block of declarations"
      >
        <P>
          All of CSS is this shape. Learn the four words and every error message afterwards is
          readable.
        </P>
        <CodeBlock
          label="One rule"
          copyable={false}
          code={`h1 { color: #1e3c2c; font-size: 32px; }
│    └──┬──┘  └───┬───┘
│       │         └── value
│       └── property        ← property: value is one DECLARATION
└── selector                ← the { … } is the DECLARATION BLOCK`}
        />
        <LabelRows
          rows={[
            { label: "Selector", text: "Which elements. h1, .card, nav a — chapter 12 is entirely about these." },
            { label: "Property", text: "What aspect to change. color, font-size, margin. There are several hundred; you will use about forty." },
            { label: "Value", text: "What to change it to. Valid values depend on the property, and an invalid one is silently discarded." },
            { label: "Declaration", text: "One property and value pair. The semicolon after it is optional on the LAST one and required on every other — so always write it." },
          ]}
        />
        <P>
          Formatting is entirely free. One line or many, spaces or not — the browser does not care.
          One declaration per line is conventional because it makes diffs readable and mistakes
          visible.
        </P>
        <Callout tone="warning" title="CSS fails silently, exactly like HTML">
          Misspell a property, give it a value it does not accept, or forget a semicolon, and nothing
          reports it. The declaration is dropped and the rest of the rule usually still applies. A
          missing semicolon typically kills the declaration <em>after</em> it too, which is why the
          symptom often points at the wrong line. Devtools crosses out invalid declarations — that
          is chapter 23, and it is the fastest way to find these.
        </Callout>
        {/* The comment markers have to be string expressions: as bare JSX text
            they parse as comment tokens, which is a lint error and would render
            nothing at all. */}
        <P>
          Comments are <Strong>{"/* like this */"}</Strong> — there is no single-line comment form
          in CSS, and <Strong>{"//"}</Strong> does not work.
        </P>
      </LessonSection>

      <LessonSection
        id="inline-styles-are-the-fastest-and-the-worst"
        title="Inline styles are the fastest and the worst"
      >
        <P>
          The first way in: a <Strong>style</Strong> attribute directly on an element.
        </P>
        <CodeBlock
          label="Inline"
          code={`<p style="color: red; font-size: 18px;">Some text.</p>`}
        />
        <P>
          No selector, because there is nothing to select — it applies to this element and only this
          one. It is the quickest possible way to see a change, and it is the worst way to build
          anything.
        </P>
        <CompareGrid
          items={[
            {
              title: "Why it fails",
              tone: "caution",
              children: (
                <P>
                  It applies to one element, so styling twenty paragraphs means twenty copies.
                  Changing them means twenty edits. It mixes appearance back into your markup, which
                  is the separation chapter 2 was about. And it beats almost every rule in your
                  stylesheet on specificity, so overriding it needs{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">!important</span>.
                </P>
              ),
            },
            {
              title: "When it is fine",
              tone: "neutral",
              children: (
                <P>
                  A genuinely one-off value that cannot be known in advance — a progress bar&apos;s
                  width, a colour swatch from data. That is why several interactives in this course
                  use it: the value <em>is</em> the thing being demonstrated. Handwritten static
                  styling is a different matter.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="a-style-tag-works-for-exactly-one-page" title="A style tag works for exactly one page">
        <P>
          The second way: a <Strong>&lt;style&gt;</Strong> element in the head. Now you can write
          real rules with real selectors.
        </P>
        <CodeBlock
          label="Internal"
          code={`<head>
  <title>My page</title>
  <style>
    h1 { color: #1e3c2c; }
    p  { line-height: 1.6; }
  </style>
</head>`}
        />
        <P>
          Much better: one rule styles every matching element on the page. The limit is in the name —
          it is on <em>this page</em>. A second page needs its own copy, and now two files must be
          kept in step by hand.
        </P>
        <Callout tone="note" title="It has one real use">
          A tiny amount of critical CSS inlined in the head renders before any extra file has to be
          fetched, which removes a flash of unstyled content on a slow connection. That is a
          performance technique for large sites, not a way to organise a stylesheet.
        </Callout>
      </LessonSection>

      <LessonSection
        id="an-external-stylesheet-is-the-real-answer"
        title="An external stylesheet is the real answer"
      >
        <P>
          The third way, and the one to use for essentially everything: a separate{" "}
          <Strong>.css</Strong> file, linked from the head.
        </P>
        <CodeBlock
          label="index.html"
          code={`<head>
  <meta charset="utf-8">
  <title>My page</title>
  <link rel="stylesheet" href="styles.css">
</head>`}
        />
        <CodeBlock
          label="styles.css — no HTML in here at all"
          code={`body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  color: #1e3c2c;
  font-size: 2rem;
}`}
        />
        <P>
          Note that the CSS file contains no HTML, no <Strong>&lt;style&gt;</Strong> tags, nothing
          but rules. Putting a style tag inside a .css file is a common first-day mistake and it
          breaks the whole file — everything after it is treated as invalid.
        </P>
        <LabelRows
          rows={[
            { label: "One file, every page", text: "Link the same stylesheet from all of them. Change a colour once and the whole site changes." },
            { label: "Cached", text: "The browser downloads it once and reuses it across pages, so every page after the first is faster." },
            { label: "Separated", text: "Markup is structure, stylesheet is appearance. You can restyle a site completely without touching a single HTML file." },
            { label: "Several are fine", text: "Multiple <link> elements load in order, and later files can override earlier ones. Useful for splitting a large stylesheet." },
          ]}
        />
        <P>
          One thing to watch: <Strong>href</Strong> is a path, and it follows the same rules as
          chapter 7. A stylesheet in a <Strong>css/</Strong> folder is{" "}
          <Strong>href=&quot;css/styles.css&quot;</Strong>, and from a page one level deep it is{" "}
          <Strong>href=&quot;../css/styles.css&quot;</Strong>. A page that is suddenly unstyled is
          almost always a wrong path, not broken CSS — devtools&apos; network tab shows a 404.
        </P>
      </LessonSection>

      <LessonSection
        id="the-browser-had-a-stylesheet-before-you-did"
        title="The browser had a stylesheet before you did"
      >
        <P>
          Open a page with no CSS whatsoever and headings are still large and bold, links are still
          blue and underlined, lists still have bullets. Something styled them, and it was the
          browser.
        </P>
        <P>
          Every browser ships a <Strong>user-agent stylesheet</Strong>. It is a real stylesheet with
          real rules, and your CSS is layered on top of it rather than replacing it.
        </P>
        <CodeBlock
          label="Roughly what the browser already applied"
          copyable={false}
          code={`h1     { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
p      { margin: 1em 0; }
a      { color: -webkit-link; text-decoration: underline; }
ul, ol { padding-left: 40px; }
body   { margin: 8px; }`}
        />
        <P>
          That last one explains a question every beginner asks: the small white gap around the edge
          of the page is <Strong>body {"{ margin: 8px }"}</Strong>, applied by the browser.
        </P>
        <P>
          Because these defaults differ slightly between browsers, most projects start with a{" "}
          <Strong>reset</Strong> — a few rules that normalise them. A minimal one is three
          declarations and covers most of the pain:
        </P>
        <CodeBlock
          label="A reset worth starting every project with"
          code={`*, *::before, *::after {
  box-sizing: border-box;   /* chapter 14 — the important one */
}

body {
  margin: 0;                /* remove the browser's 8px */
}

img {
  max-width: 100%;          /* never overflow the container */
  height: auto;
}`}
        />
        <Callout tone="tip" title="You do not need a library for this">
          Normalize.css and larger resets exist and are fine. For a hand-written site, those nine
          lines cover nearly everything they would, and you can read all of them — which matters more
          at this stage than completeness.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A rule is a selector plus a block of declarations; a declaration is one property and value.",
          "Semicolons are optional after the last declaration and required after every other, so always write them.",
          "CSS fails silently: an invalid declaration is discarded and the missing semicolon usually kills the NEXT line too.",
          "Comments are /* … */ only. There is no // in CSS.",
          "Inline style attributes apply to one element, mix appearance into markup, and beat almost everything on specificity.",
          "A <style> tag in the head works well and works for exactly one page.",
          "An external .css file linked with <link rel=\"stylesheet\"> is the answer for essentially everything.",
          "A .css file contains rules only — no <style> tags, no HTML.",
          "An unstyled page is usually a wrong href path, not broken CSS. Check the network tab for a 404.",
          "The browser applied its own stylesheet first; your CSS layers on top. body { margin: 8px } is where the page's edge gap comes from.",
        ]}
      />
    </div>
  );
}
