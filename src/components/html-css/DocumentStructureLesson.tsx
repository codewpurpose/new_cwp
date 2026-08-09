import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { DomTree } from "@/components/html-css/DomTree";

export function DocumentStructureLesson() {
  return (
    <div>
      <Lead>
        Every page on the internet starts with the same eight lines, and each one is doing a job you
        can name. Then see the same markup as a tree, because that is what the browser turns it into
        and what CSS selects from.
      </Lead>

      <LessonSection id="doctype-is-not-a-tag-and-is-not-optional" title="doctype is not a tag, and is not optional">
        <P>
          The first line of every page is this, and it is not an element — it has no closing tag,
          holds nothing, and is not part of the tree.
        </P>
        <CodeBlock label="Line one, always" code={`<!doctype html>`} />
        <P>
          It answers one question for the browser: <em>which set of rules am I using?</em> Present,
          the browser uses <Strong>standards mode</Strong> — the modern, specified behaviour. Absent,
          it falls back to <Strong>quirks mode</Strong>, which emulates bugs from Internet Explorer 5
          so that pages from 1998 still render.
        </P>
        <Callout tone="warning" title="Quirks mode changes the box model">
          In quirks mode, <span className="font-[family-name:var(--learn-font-mono)]">width</span>{" "}
          includes padding and border — the opposite of the standard behaviour you will learn in
          chapter 14. So a page missing its doctype lays out subtly differently from every example
          you will read, and nothing anywhere says why. One line, at the top, every time.
        </Callout>
        <P>
          Older doctypes were long and unreadable. HTML5 reduced it to those fifteen characters,
          and they are all any page needs now.
        </P>
      </LessonSection>

      <LessonSection id="head-is-about-the-page-body-is-the-page" title="head is about the page; body is the page">
        <P>
          Under the doctype, one <Strong>html</Strong> element contains exactly two children, and the
          split between them is the cleanest division in HTML.
        </P>
        <CodeBlock
          label="The skeleton"
          code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My site</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Everything visible goes here</h1>
  </body>
</html>`}
        />
        <LabelRows
          rows={[
            {
              label: "html",
              text: "The root. Everything is inside it. The lang attribute tells screen readers which language to pronounce, and translation tools whether to offer.",
            },
            {
              label: "head",
              text: "Information ABOUT the page. Nothing here is drawn: the title, the character encoding, links to stylesheets, metadata for search engines and social previews.",
            },
            {
              label: "body",
              text: "The page itself. Every heading, paragraph, image, and link the visitor sees is in here.",
            },
          ]}
        />
        <P>
          <Strong>lang</Strong> is one attribute and genuinely worth typing. Without it a screen
          reader may read English with a French pronunciation model, which is not a subtle
          degradation — it is unintelligible.
        </P>
      </LessonSection>

      <LessonSection id="the-four-things-that-belong-in-head" title="The four things that belong in head">
        <P>
          Head can hold a great deal. Four things belong in every page you write, in this order.
        </P>
        <CodeBlock
          label="The non-negotiable four"
          code={`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page name — Site name</title>
<link rel="stylesheet" href="styles.css">`}
        />
        <LabelRows
          rows={[
            {
              label: "charset",
              text: "Which character encoding. utf-8 covers every writing system on earth. Omit it and accented letters, curly quotes, and every non-Latin script turn into mojibake. Put it FIRST — the browser must know the encoding before it reads anything else.",
            },
            {
              label: "viewport",
              text: "Without this, a phone renders your page at 980 pixels wide and zooms out, so everything is tiny and no CSS media query ever fires. Chapter 19 is entirely about what this unlocks.",
            },
            {
              label: "title",
              text: "The browser tab, the bookmark name, and the blue headline in search results. Not shown on the page. Specific first, site name second — a tab reading only your site name is useless with twelve tabs open.",
            },
            {
              label: "link",
              text: "Your stylesheet. rel says what kind of relationship, href says where. This is a void element; there is no closing tag.",
            },
          ]}
        />
        <Callout tone="tip" title="Two more worth adding to anything public">
          <span className="font-[family-name:var(--learn-font-mono)]">
            &lt;meta name=&quot;description&quot; content=&quot;…&quot;&gt;
          </span>{" "}
          is the grey text under your search result — about 155 characters, written for a human. And
          the <span className="font-[family-name:var(--learn-font-mono)]">og:</span> tags control the
          preview card when somebody pastes your link into a chat. Neither affects the page; both
          affect whether anyone arrives at it.
        </Callout>
      </LessonSection>

      <LessonSection id="your-markup-becomes-a-tree" title="Your markup becomes a tree">
        <P>
          The browser reads your file top to bottom and builds a structure out of it. That structure
          is the <Strong>DOM</Strong> — the Document Object Model — and from this point on it is what
          everything else operates on.
        </P>
        <DomTree />
        <P>
          The two panels are the same information. Your indentation is a convention the browser
          ignores completely; what creates the nesting is which tags close before which others. Write
          the whole file on one line and you get an identical tree and an unreadable file.
        </P>
      </LessonSection>

      <LessonSection
        id="parents-children-and-siblings-are-css-vocabulary"
        title="Parents, children, and siblings are CSS vocabulary"
      >
        <P>
          The tree comes with family words, and they are not decorative — CSS selectors are built
          from them and so is every explanation of why a style did not apply.
        </P>
        <LabelRows
          rows={[
            { label: "Parent", text: "The element directly containing this one. Every element has exactly one, except html, which has none." },
            { label: "Child", text: "An element directly inside. head and body are both children of html." },
            { label: "Descendant", text: "Inside at ANY depth — child, grandchild, and further. Every element in a page is a descendant of html." },
            { label: "Sibling", text: "Shares a parent. head and body are siblings; so are two paragraphs in the same section." },
            { label: "Ancestor", text: "Any element that contains this one, at any depth. The reverse of descendant." },
          ]}
        />
        <P>
          The child-versus-descendant distinction is the one to hold onto. In chapter 12,{" "}
          <Strong>main &gt; a</Strong> means &quot;an anchor that is a direct child of main&quot; and{" "}
          <Strong>main a</Strong> means &quot;an anchor anywhere inside main&quot;. Those select
          different elements, and picking the wrong one is the most common reason a rule appears to
          do nothing.
        </P>
        <Callout tone="note" title="Inheritance runs down this tree too">
          Set{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">color</span> on body and every
          descendant gets it, unless something overrides it — because a handful of CSS properties
          inherit from parent to child. It is the reason a stylesheet can be short, and it is
          chapter 13.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "<!doctype html> is line one of every page. It is not an element and is not optional.",
          "Without it, quirks mode changes the box model, so your layout differs from every example you read.",
          "html has exactly two children: head, which is about the page, and body, which is the page.",
          "lang on html tells screen readers how to pronounce your words.",
          "charset utf-8 goes first, before anything the browser has to decode.",
          "The viewport meta tag is what makes a phone render your page at its real width — without it no media query fires.",
          "title is the tab, the bookmark, and the search headline. Specific first, site name second.",
          "The browser turns your markup into a tree called the DOM. Your indentation is ignored.",
          "Parent, child, descendant, sibling, ancestor — these are CSS selector vocabulary, not jargon.",
          "Child means one level down. Descendant means any depth. That difference breaks more selectors than anything else.",
        ]}
      />
    </div>
  );
}
