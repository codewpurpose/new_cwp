import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ElementAnatomy } from "@/components/html-css/ElementAnatomy";

export function ElementsAndTagsLesson() {
  return (
    <div>
      <Lead>
        An element, a tag, an attribute, and a value are four different things that everybody calls
        tags. Take one line of HTML apart piece by piece, and meet the handful of elements that have
        no closing tag at all.
      </Lead>

      <LessonSection
        id="an-element-is-an-opening-tag-content-and-a-closing-tag"
        title="An element is an opening tag, content, and a closing tag"
      >
        <P>
          HTML marks text up by wrapping it. The wrapper says what the text is.
        </P>
        <CodeBlock
          label="One element"
          copyable={false}
          code={`<p>This is a paragraph.</p>
│ │ └──────┬──────────┘ └┬─┘
│ │        │             └── closing tag
│ │        └── content
│ └── element name
└── opening tag starts here`}
        />
        <P>
          The three parts together are the <Strong>element</Strong>. The angle-bracket bits on either
          end are its <Strong>tags</Strong>. People say &quot;the p tag&quot; when they mean the
          whole element, and that is fine in conversation — but the distinction matters the moment
          you read an error message.
        </P>
        <ElementAnatomy />
        <P>
          Element names are case-insensitive, so <Strong>&lt;P&gt;</Strong> and{" "}
          <Strong>&lt;p&gt;</Strong> are the same element. Write them lowercase anyway; it is the
          universal convention and mixed case reads as a mistake.
        </P>
      </LessonSection>

      <LessonSection id="attributes-live-in-the-opening-tag-only" title="Attributes live in the opening tag only">
        <P>
          An attribute adds information to an element, and it goes inside the opening tag —{" "}
          <em>never</em> the closing one.
        </P>
        <CodeBlock
          label="Attributes"
          code={`<a href="/about">About us</a>
<img src="cat.jpg" alt="A cat asleep on a keyboard">
<p class="intro" id="lead">Some text.</p>
<input type="email" required>`}
        />
        <LabelRows
          rows={[
            { label: "Quoted", text: 'Always. HTML permits unquoted values in simple cases, and a value containing a space silently becomes two attributes. Double quotes are the convention.' },
            { label: "Order", text: "Irrelevant. class before id or id before class, no difference. Pick a habit for readability, not correctness." },
            { label: "Boolean", text: "Some attributes are on or off with no value: required, disabled, checked. Present means true. There is no required=\"false\" — removing it is the only way to turn it off." },
            { label: "Global", text: "class, id, style, title, lang, hidden, and data-* work on every element. Everything else belongs to specific ones — href on an anchor, src on an image." },
          ]}
        />
        <Callout tone="danger" title="required=&quot;false&quot; does the opposite of what it looks like">
          A boolean attribute is true whenever it is <em>present</em>, regardless of its value. So{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            &lt;input required=&quot;false&quot;&gt;
          </span>{" "}
          is a required field. To make it optional, delete the attribute.
        </Callout>
      </LessonSection>

      <LessonSection
        id="void-elements-have-nothing-to-close-around"
        title="Void elements have nothing to close around"
      >
        <P>
          A handful of elements have no content — they are not wrappers, they are markers. They take
          no closing tag, and writing one is an error.
        </P>
        <CodeBlock
          label="The void elements you will actually meet"
          code={`<img src="photo.jpg" alt="Description">
<br>
<hr>
<input type="text" name="email">
<meta charset="utf-8">
<link rel="stylesheet" href="styles.css">`}
        />
        <P>
          There are about fourteen in total and those six are all you will use. Note that{" "}
          <Strong>&lt;link&gt;</Strong> is void — it points at a stylesheet — while{" "}
          <Strong>&lt;a&gt;</Strong>, the one people call a link, wraps content and definitely
          closes.
        </P>
        <CompareGrid
          items={[
            {
              title: "You will also see this",
              tone: "neutral",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    &lt;br /&gt;
                  </span>{" "}
                  with a trailing slash. Legal, harmless, and completely ignored by HTML — it is left
                  over from XHTML, and it is still required in JSX. Neither style is wrong.
                </P>
              ),
            },
            {
              title: "This is wrong",
              tone: "caution",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    &lt;img&gt;photo&lt;/img&gt;
                  </span>{" "}
                  and{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">&lt;/br&gt;</span>.
                  There is no content to wrap and nothing to close. Browsers ignore the stray closing
                  tag, so it looks like it works.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="elements-nest-and-they-must-not-overlap" title="Elements nest, and they must not overlap">
        <P>
          Elements go inside other elements, and that nesting is what makes a document a tree. The
          one rule: an element opened inside another must close inside it too.
        </P>
        <CodeBlock
          label="Nesting"
          copyable={false}
          code={`<p>This is <strong>very</strong> important.</p>     correct
<p>This is <strong>very important.</p></strong>     WRONG`}
          lineTones={{ 0: "ok", 1: "err" }}
        />
        <P>
          In the second line, <Strong>strong</Strong> opens inside the paragraph and closes outside
          it. The elements overlap rather than nest, which describes no possible tree. The browser
          will silently invent one, and it will not be the one you meant.
        </P>
        <P>
          Indent one level per nesting level. It is purely for humans — the browser ignores all of it
          — and it is the difference between spotting an unclosed tag in two seconds and hunting it
          for ten minutes.
        </P>
        <CodeBlock
          label="Indented, and therefore readable"
          code={`<article>
  <h2>A post</h2>
  <p>
    Some text with a <a href="/more">link</a> in it.
  </p>
  <ul>
    <li>First</li>
    <li>Second</li>
  </ul>
</article>`}
        />
      </LessonSection>

      <LessonSection
        id="the-browser-will-forgive-you-and-that-is-the-problem"
        title="The browser will forgive you, and that is the problem"
      >
        <P>
          HTML has no error messages. Nothing refuses to load, nothing turns red, and nothing tells
          you a tag never closed. The browser guesses, patches your document into something it can
          render, and shows you the result.
        </P>
        <P>
          This was a deliberate design decision in the 1990s and it is why the web still works. It is
          also why a broken page can be so hard to debug: your mistake produced a page, just not the
          one you wrote.
        </P>
        <CodeBlock
          label="Forget one closing tag"
          copyable={false}
          code={`<p>First paragraph.
<p>Second paragraph.</p>

<!-- The browser silently closes the first p before the second
     opens, because a p cannot contain a p. Here it does the
     right thing. It will not always. -->`}
          lineTones={{ 0: "warn" }}
        />
        <Callout tone="tip" title="Two things that give you the error messages HTML does not">
          The{" "}
          <a
            href="https://validator.w3.org/nu/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-learn-accent underline-offset-2"
          >
            W3C validator
          </a>{" "}
          takes a URL or pasted markup and lists every problem with a line number. And your editor,
          if it colours tags — an unclosed element usually turns the rest of the file a strange
          colour, which is a faster signal than reading.
        </Callout>
        <P>
          The habits that avoid most of it are small: close every tag as you write the opening one,
          indent consistently, and validate before you publish anything you care about.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "An element is an opening tag, content, and a closing tag. The tags are the bracket parts; the element is the whole thing.",
          "Element names are case-insensitive; write them lowercase because everyone does.",
          "Attributes go in the opening tag only, and their values are always quoted.",
          "Boolean attributes are true when present. required=\"false\" is a required field.",
          "Void elements — img, br, hr, input, meta, link — have no content and take no closing tag.",
          "<link> is void and points at a stylesheet; <a> wraps content and is the clickable one.",
          "Elements must nest, not overlap: opened inside means closed inside.",
          "Indent one level per level of nesting. The browser ignores it; you will not.",
          "HTML never reports an error. The browser patches your mistake and renders something else.",
          "The W3C validator is the error messages HTML does not give you.",
        ]}
      />
    </div>
  );
}
