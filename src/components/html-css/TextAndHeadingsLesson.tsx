import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function TextAndHeadingsLesson() {
  return (
    <div>
      <Lead>
        There are six heading levels and they are an outline, not six font sizes — using h3 because
        it looked right is a common HTML mistake. Learn what each text element claims,
        and which two look identical and are not.
      </Lead>

      <LessonSection id="headings-are-an-outline-not-a-size-chart" title="Headings are an outline, not a size chart">
        <P>
          <Strong>h1</Strong> through <Strong>h6</Strong> are section levels, exactly like the
          numbered headings in an essay. They happen to render at decreasing sizes, and that
          coincidence is responsible for most misuse of HTML anywhere.
        </P>
        <CodeBlock
          label="A page outline"
          code={`<h1>Learning to Cook</h1>

  <h2>Equipment</h2>
    <h3>Knives</h3>
    <h3>Pans</h3>

  <h2>Techniques</h2>
    <h3>Heat control</h3>
      <h4>Searing</h4>
    <h3>Seasoning</h3>`}
        />
        <P>
          That structure is real and machine-readable. A screen reader can list every heading and
          jump between them — which is how blind users skim a page, the same way you skim it with
          your eyes. A search engine reads it as the shape of your content.
        </P>
        <Callout tone="danger" title="Never choose a heading level for its size">
          Wanting smaller text is a CSS question with a CSS answer:{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">h2 {"{ font-size: 20px; }"}</span>
          . Using{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">h4</span> to get small text
          breaks the document outline for everyone navigating by it, and gains you nothing that one
          line of CSS would not.
        </Callout>
      </LessonSection>

      <LessonSection id="one-h-one-per-page-and-no-skipped-levels" title="One h1 per page, and no skipped levels">
        <P>
          Two conventions, both easy, both frequently broken.
        </P>
        <CompareGrid
          items={[
            {
              title: "One h1",
              tone: "positive",
              children: (
                <P>
                  It is the title of this page — what the page is about, not what the site is called.
                  HTML5 technically permits several; screen reader users overwhelmingly expect one,
                  and it is the first thing many of them jump to.
                </P>
              ),
            },
            {
              title: "No skipping",
              tone: "positive",
              children: (
                <P>
                  h1 then h3 with no h2 between reads as a missing section. Go down one level at a
                  time. Coming back up is fine and normal — h3 to h2 just means a new section
                  started.
                </P>
              ),
            },
          ]}
        />
        <RevealCard
          summaryTag="A common mistake"
          summary="<h1>My Blog</h1> at the top of every page, then <h1>How I Built a Desk</h1> under it"
          detailTag="What to write instead"
          detail="The site name belongs in a link inside the header, not in a heading — it is navigation, not the subject of this page. Then one h1 per page saying what THIS page is: How I Built a Desk. The reader already knows which site they are on; the h1 should tell them something they do not know."
          footnote="Two h1 elements is not a validation error. It is a page whose outline says it is about two things."
          openLabel="See the fix"
          closeLabel="Hide it"
        />
      </LessonSection>

      <LessonSection
        id="a-paragraph-is-a-block-and-whitespace-is-not"
        title="A paragraph is a block, and whitespace is not"
      >
        <P>
          HTML collapses whitespace on the first page you build:
          any run of spaces, tabs, and newlines becomes a single space.
        </P>
        <CodeBlock
          label="What you write"
          copyable={false}
          code={`<p>This     has        lots

of      space.</p>`}
        />
        <CodeBlock
          label="What renders"
          copyable={false}
          code={`This has lots of space.`}
          lineTones={{ 0: "ok" }}
        />
        <P>
          So you cannot lay out a page by pressing Enter or Space. Blank lines in your source do
          nothing, and that is deliberate — it lets you indent your markup for readability without
          affecting the output.
        </P>
        <P>
          The gap between paragraphs comes from <Strong>&lt;p&gt;</Strong> being a block element with
          a default margin, not from the newline you typed.
        </P>
        <LabelRows
          rows={[
            { label: "p", text: "A paragraph. Block-level, with margin above and below. The workhorse of every page." },
            { label: "br", text: "A line break WITHIN a paragraph — an address, a line of a poem. Not for spacing. A stack of <br> is CSS margin, written badly." },
            { label: "hr", text: "A thematic break: the subject changes. It renders as a line, and the meaning is the change of topic, not the line." },
            { label: "pre", text: "Preformatted. The one element where whitespace is preserved exactly. Renders in a monospace font, and is what wraps code blocks." },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="strong-and-em-mean-more-than-bold-and-italic"
        title="strong and em mean more than bold and italic"
      >
        <P>
          Four elements, two visual results, and a real distinction underneath.
        </P>
        <CodeBlock
          label="Two pairs"
          code={`<p><strong>Warning:</strong> this deletes everything.</p>
<p>I said <em>her</em> book, not his.</p>

<p>The <b>Acme Corp</b> results are in.</p>
<p>The word <i>schadenfreude</i> has no English equivalent.</p>`}
        />
        <CompareGrid
          items={[
            {
              title: "strong and em — meaning",
              tone: "positive",
              children: (
                <P>
                  <Strong>strong</Strong> is importance or urgency. <Strong>em</Strong> is stress
                  emphasis — the word you would say louder, which can change the sentence&apos;s
                  meaning. Screen readers may change tone for these.
                </P>
              ),
            },
            {
              title: "b and i — convention",
              tone: "neutral",
              children: (
                <P>
                  <Strong>b</Strong> draws attention with no added importance — a keyword, a product
                  name. <Strong>i</Strong> marks something set apart: a foreign phrase, a
                  ship&apos;s name, a technical term. Neither implies emphasis.
                </P>
              ),
            },
          ]}
        />
        <P>
          In practice: reach for <Strong>strong</Strong> and <Strong>em</Strong>. They are right far
          more often, and if you want bold text with no particular meaning, that is CSS
          (&quot;font-weight: 600&quot;) rather than a tag.
        </P>
        <P>
          A few more text elements, all of which say something a{" "}
          <Strong>span</Strong> would not:
        </P>
        <CodeBlock
          label="Elements that mean something"
          code={`<blockquote cite="https://example.com/post">
  <p>A quotation long enough to stand on its own.</p>
</blockquote>

<p>She said <q>this is a short inline quote</q> and left.</p>
<p>Run <code>npm install</code> to begin.</p>
<p>Published <time datetime="2026-08-09">9 August 2026</time>.</p>
<p><abbr title="Cascading Style Sheets">CSS</abbr> is the second half.</p>
<p>The price is <s>£40</s> £25.</p>`}
        />
      </LessonSection>

      <LessonSection id="entities-are-for-characters-html-would-eat" title="Entities are for characters HTML would eat">
        <P>
          Three characters are structural in HTML, so writing them literally is ambiguous at best.
          Write them as <Strong>entities</Strong> instead — an ampersand, a name, a semicolon.
        </P>
        <LabelRows
          rows={[
            { label: "&lt;", text: "A less-than sign. Written literally, the browser starts reading a tag. This one breaks things." },
            { label: "&gt;", text: "Greater-than. Less dangerous, but write it as an entity for symmetry." },
            { label: "&amp;", text: "An ampersand. It is how every entity starts, so a bare & followed by a word can be misread." },
            { label: "&nbsp;", text: "A non-breaking space: a space that will not wrap. For \"10 km\" or \"Chapter 4\", where a line break would read badly. Not for indentation, ever." },
          ]}
        />
        <CodeBlock
          label="Writing about HTML, in HTML"
          copyable={false}
          code={`<p>Use the &lt;p&gt; element for paragraphs.</p>

renders as:  Use the <p> element for paragraphs.`}
        />
        <P>
          Everything else you can type directly, provided your{" "}
          <Strong>&lt;meta charset=&quot;utf-8&quot;&gt;</Strong> is in place — em dashes, curly
          quotes, accented letters, emoji, every script on earth. The old lists of hundreds of named
          entities are a relic of the days before UTF-8 was universal.
        </P>
        <Callout tone="tip" title="A comment, while you are here">
          <span className="font-[family-name:var(--learn-font-mono)]">
            &lt;!-- like this --&gt;
          </span>
          . Ignored by the browser and useful for notes to yourself. Note that it is not hidden —
          anybody can read it in view source, so it is not the place for anything private.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "h1–h6 are outline levels, not font sizes. Choosing one for its appearance breaks the outline for everyone who navigates by it.",
          "Screen reader users jump between headings to skim, the way you skim visually.",
          "One h1 per page, saying what this page is. The site name is navigation, not a heading.",
          "Do not skip levels going down. Coming back up is fine.",
          "HTML collapses all whitespace to a single space. Blank lines and repeated spaces do nothing.",
          "Spacing comes from block elements and CSS margin, never from <br> or pressing Enter.",
          "strong is importance, em is stress emphasis; b and i are conventional appearance with no added meaning.",
          "blockquote, code, time, abbr and cite all say something a span would not.",
          "Write &lt; &gt; &amp; as entities. With utf-8 everything else can be typed directly.",
          "Comments are ignored by the browser and fully visible in view source.",
        ]}
      />
    </div>
  );
}
