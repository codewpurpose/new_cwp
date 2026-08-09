import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function SemanticHtmlLesson() {
  return (
    <div>
      <Lead>
        A div says nothing about its contents, and a page built from thirty of them is invisible to a
        screen reader, a search engine, and reader mode alike. Swap them for the elements that mean
        something and lose nothing at all.
      </Lead>

      <LessonSection id="a-div-is-a-box-with-no-meaning" title="A div is a box with no meaning">
        <P>
          <Strong>&lt;div&gt;</Strong> is a generic block container and <Strong>&lt;span&gt;</Strong>{" "}
          is a generic inline one. Neither says anything at all about what is inside. That is their
          entire specification.
        </P>
        <P>
          They are not bad elements. They are <em>empty</em> ones, and the mistake is using them
          where a meaningful element exists.
        </P>
        <RevealCard
          summaryTag="Div soup — a real page"
          summary="<div class='header'> … <div class='nav'> … <div class='content'> … <div class='footer'>"
          detailTag="The same page, saying what it is"
          detail="<header> … <nav> … <main> … <footer>. Identical rendering, identical CSS effort — the class names were already describing exactly these things, so the markup was carrying the information and hiding it in a place only your stylesheet could read."
          footnote="This is the whole chapter. The names were right; they were in the wrong attribute."
          openLabel="See the same page, semantically"
          closeLabel="Hide it"
        />
        <P>
          The tell is a class name that names a region — <Strong>class=&quot;header&quot;</Strong>,{" "}
          <Strong>class=&quot;nav&quot;</Strong>, <Strong>class=&quot;article&quot;</Strong>. If you
          are writing the name of an HTML element into a class attribute, use the element.
        </P>
      </LessonSection>

      <LessonSection
        id="header-nav-main-and-footer-name-the-regions"
        title="header, nav, main, and footer name the regions"
      >
        <P>
          Four elements cover the skeleton of almost every page, and they create{" "}
          <Strong>landmarks</Strong> — regions a screen reader user can jump between directly.
        </P>
        <CodeBlock
          label="A page skeleton"
          code={`<body>
  <header>
    <a href="/">My site</a>
    <nav>
      <ul>
        <li><a href="/work/">Work</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Page title</h1>
    <p>The actual content of this page.</p>
  </main>

  <footer>
    <p>&copy; 2026</p>
  </footer>
</body>`}
        />
        <LabelRows
          rows={[
            { label: "header", text: "Introductory content for its nearest section. A page can have several — one for the page, one inside each article. It is not \"the top of the page\"." },
            { label: "nav", text: "A major block of navigation links. Not every group of links: the three in your footer do not need it. One or two per page." },
            { label: "main", text: "The content unique to THIS page — not the header, nav, or footer. Exactly one per page, and it must not be nested inside the others." },
            { label: "footer", text: "Closing content for its nearest section. Like header, it can appear inside an article as well as at the end of the page." },
            { label: "aside", text: "Tangentially related content: a sidebar, a pull quote, related links. Removing it should not damage the main content." },
          ]}
        />
        <Callout tone="success" title="main is the one that pays off immediately">
          Screen readers offer &quot;skip to main content&quot; based on it, so a user can bypass
          your whole navigation on every page rather than listening to it again each time. So does
          reader mode. So do several search engines when deciding what the page is about. One
          element, and it takes a keystroke instead of thirty.
        </Callout>
      </LessonSection>

      <LessonSection
        id="article-and-section-are-not-interchangeable"
        title="article and section are not interchangeable"
      >
        <P>
          These two get confused constantly, and there is a clean test.
        </P>
        <CompareGrid
          items={[
            {
              title: "article — stands alone",
              tone: "positive",
              children: (
                <P>
                  Would this still make sense republished somewhere else, on its own? A blog post, a
                  news story, a product card, a comment, a forum reply. The test is syndication: if
                  it could go in an RSS feed by itself, it is an article.
                </P>
              ),
            },
            {
              title: "section — a thematic part",
              tone: "neutral",
              children: (
                <P>
                  A chunk of something larger that would not stand alone. Chapters of a document,
                  the tabs of a panel, grouped parts of a long page. A section should essentially
                  always have a heading — if it does not, it is probably a div.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Both, together"
          code={`<main>
  <h1>Blog</h1>

  <article>
    <h2>Building a desk</h2>
    <p>…</p>

    <section>
      <h3>Materials</h3>
      <p>…</p>
    </section>

    <footer>Published <time datetime="2026-08-09">9 August</time></footer>
  </article>

  <article>
    <h2>Learning to weld</h2>
    <p>…</p>
  </article>
</main>`}
        />
        <Callout tone="warning" title="section is not a div with better manners">
          Wrapping things in{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">section</span> purely to style
          them is div soup with extra letters. If there is no heading and no thematic grouping, a
          div is the honest answer. Being able to say what a section <em>is</em> is the test.
        </Callout>
      </LessonSection>

      <LessonSection id="semantic-markup-is-free-accessibility" title="Semantic markup is free accessibility">
        <P>
          This is the argument that matters, and it is not really about disability — it is that four
          completely different consumers read your markup, and only one of them has eyes.
        </P>
        <LabelRows
          rows={[
            { label: "Screen readers", text: "Announce landmarks, list headings, and let a user jump straight to main. A page of divs offers none of that: it is one undifferentiated run of text." },
            { label: "Search engines", text: "Use structure to work out what a page is about and what to show. main and article carry weight that a div cannot." },
            { label: "Reader mode", text: "Every browser has one, and it works by guessing which element holds the article. Semantic markup makes it a fact rather than a guess." },
            { label: "Your future self", text: "Reading </main> is instantly clearer than the fourth </div> in a row. This one is not a small benefit." },
          ]}
        />
        <P>
          The cost of all of it is typing a different word. There is no performance difference, no
          extra CSS, and no browser support question — these have been supported everywhere for over
          a decade.
        </P>
        <P>
          Two more elements worth knowing, because they replace a common pile of JavaScript with
          nothing at all:
        </P>
        <CodeBlock
          label="A working accordion, no script"
          code={`<details>
  <summary>What is included?</summary>
  <p>Everything. This opens and closes with no JavaScript,
     it is keyboard accessible, and it is findable by
     the browser's own in-page search.</p>
</details>`}
        />
      </LessonSection>

      <LessonSection
        id="when-a-div-is-genuinely-the-right-answer"
        title="When a div is genuinely the right answer"
      >
        <P>
          Divs are not deprecated and this chapter is not asking you to eliminate them. Use one when
          you need a box <em>for layout</em> and there is genuinely no meaning to express.
        </P>
        <CodeBlock
          label="Legitimate divs"
          code={`<!-- A wrapper that exists purely to be a flex container -->
<div class="card-grid">
  <article class="card">…</article>
  <article class="card">…</article>
</div>

<!-- A scroll container around a wide table -->
<div class="table-scroll">
  <table>…</table>
</div>`}
        />
        <P>
          Both of those are honest. The div is a styling hook and it makes no claim about the
          content, which is exactly what a div is for.
        </P>
        <Callout tone="tip" title="The question to ask before typing div">
          &quot;Is there an element that describes this?&quot; A list of things is{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">ul</span>. A self-contained
          post is{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">article</span>. Something you
          click that navigates is{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">a</span>; something you click
          that acts is{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">button</span>. If the honest
          answer is no, reach for the div and move on — the rule is div as the last resort, not div
          as a failure.
        </Callout>
        <P>
          One last note, because it is the most consequential version of this mistake:{" "}
          <Strong>a div with a click handler is not a button</Strong>. It cannot be focused with the
          keyboard, does not respond to Enter or Space, and is not announced as anything actionable.
          Use a real <Strong>&lt;button&gt;</Strong> and style it however you like.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "div and span are generic containers that say nothing. That is their whole specification.",
          "A class name that names a region — class=\"header\" — is a sign the element exists already.",
          "header, nav, main, and footer create landmarks a screen reader user can jump between.",
          "There is exactly one main per page, and it holds what is unique to that page.",
          "main is what powers \"skip to main content\", reader mode, and part of how search engines read a page.",
          "article stands alone and could be syndicated; section is a thematic part of something bigger and should have a heading.",
          "section used purely for styling is div soup with extra letters.",
          "Four different consumers read your markup and only one of them has eyes.",
          "<details> and <summary> give you an accessible accordion with no JavaScript.",
          "A div is right when you need a box for layout with no meaning to express — but a div with a click handler is never a button.",
        ]}
      />
    </div>
  );
}
