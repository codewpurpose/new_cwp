import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { LayerToggle } from "@/components/html-css/LayerToggle";

export function HowABrowserBuildsAPageLesson() {
  return (
    <div>
      <Lead>
        HTML, CSS, and JavaScript are not three ways to do the same thing — they answer three
        different questions, and mixing up which is which is the root of most beginner confusion.
        Strip a page back to each layer in turn.
      </Lead>

      <LessonSection
        id="html-is-what-it-is-css-is-what-it-looks-like"
        title="HTML is what it is; CSS is what it looks like"
      >
        <P>
          Every web page is made of the same three languages, and each one answers exactly one
          question about the page.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "HTML — what is it?",
              tone: "positive",
              children: (
                <P>
                  This is a heading. That is a paragraph. This is a link to somewhere else. Structure
                  and meaning, and nothing about appearance.
                </P>
              ),
            },
            {
              title: "CSS — what does it look like?",
              tone: "neutral",
              children: (
                <P>
                  Headings are 32 pixels and dark green. Paragraphs have room to breathe. The
                  navigation sits in a row. Presentation only.
                </P>
              ),
            },
            {
              title: "JavaScript — what happens?",
              tone: "neutral",
              children: (
                <P>
                  When somebody clicks this, open that. Fetch more results as they scroll. Behaviour,
                  in response to something the visitor did.
                </P>
              ),
            },
          ]}
        />
        <P>
          Keeping these apart is a genuine skill and it is worth building early. The most common
          beginner mistake in HTML is reaching for a tag because of how it <em>looks</em> — using{" "}
          <Strong>h3</Strong> because you wanted smaller text, or <Strong>b</Strong> because you
          wanted bold. Those are CSS questions being answered in the wrong language.
        </P>
        <Callout tone="note" title="The separation is not academic">
          It is why one stylesheet can restyle a thousand pages, why a site can have a dark mode
          without touching its markup, and why a screen reader can read a page it cannot see. All
          three depend on the meaning living somewhere separate from the appearance.
        </Callout>
      </LessonSection>

      <LessonSection
        id="javascript-is-what-happens-when-you-touch-it"
        title="JavaScript is what happens when you touch it"
      >
        <P>
          JavaScript is a full programming language — variables, conditions, loops, functions — and
          it is not covered in this track. Know what it is <em>for</em>, so you can tell when a
          problem is not yours yet.
        </P>
        <P>
          It runs after the page has loaded, and it changes things: text, styles, whole sections of
          the page appearing and disappearing. If something on a page responds to you without
          fetching a new page, that is JavaScript.
        </P>
        <CompareGrid
          items={[
            {
              title: "Does not need JavaScript",
              tone: "positive",
              children: (
                <P>
                  Links. Forms that submit. A dropdown menu on hover. Smooth scrolling. An accordion.
                  Nearly all of a personal site, a portfolio, a blog, or a documentation page.
                </P>
              ),
            },
            {
              title: "Needs JavaScript",
              tone: "neutral",
              children: (
                <P>
                  Live search as you type. A map you can drag. Content that loads as you scroll.
                  Anything that changes without the page reloading.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="a-page-with-no-css-still-works" title="A page with no CSS still works">
        <P>
          Turn off the stylesheet on any well-built page and it does not break. It becomes plain —
          black text, blue underlined links, headings in decreasing sizes — and it remains completely
          readable and completely usable.
        </P>
        <LayerToggle />
        <P>
          That first panel is what a search engine crawls, roughly what a screen reader announces,
          and what a browser&apos;s reader mode produces. It is also what your visitor sees for the
          first moment before your CSS arrives on a slow connection.
        </P>
        <Callout tone="tip" title="This is why HTML comes before CSS in this track">
          A page with good markup and no CSS is plain but works. A page with beautiful CSS over bad
          markup looks fine and is broken for anyone not using it the way you do. Seven chapters of
          HTML before any styling is a deliberate order, not a delay.
        </Callout>
      </LessonSection>

      <LessonSection id="the-browser-parses-then-paints" title="The browser parses, then paints">
        <P>
          Between receiving text and showing pixels, the browser runs a fixed sequence. You will
          never write any of it, and knowing the shape explains several things that otherwise look
          arbitrary.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Parse the HTML into a tree",
              detail: "Every element becomes a node with a parent and children. This structure is called the DOM, and it is what CSS selects from and JavaScript manipulates.",
            },
            {
              label: "Parse the CSS into rules",
              detail: "Every stylesheet, plus the browser's own defaults, plus anything in a style attribute — collected and sorted.",
            },
            {
              label: "Work out the style of every node",
              detail: "For each element, which declarations apply and which win. This is the cascade, and it gets its own chapter because it is where most confusion lives.",
            },
            {
              label: "Lay out — calculate every box",
              detail: "Position and size for everything, computed from the top down. Change one width and the browser may have to redo a large part of this, which is why layout is the expensive step.",
            },
            {
              label: "Paint, and composite",
              detail: "Fill in the pixels, then stack the layers. Now it is on screen.",
            },
          ]}
        />
        <P>
          One practical consequence: a <Strong>&lt;script&gt;</Strong> in the middle of your HTML
          stops parsing until it has downloaded and run. That is why scripts conventionally go at the
          end of the body, or carry the <Strong>defer</Strong> attribute.
        </P>
      </LessonSection>

      <LessonSection id="view-source-is-the-whole-lesson" title="View source is the whole lesson">
        <P>
          Every page you have ever visited will show you its own source, for free, right now. This is
          not a developer feature that was left switched on — the web was designed this way, and it
          is the reason a generation of people learned to build things by reading other
          people&apos;s.
        </P>
        <CodeBlock
          label="Two things worth doing on any page"
          copyable={false}
          code={`Ctrl/Cmd + U        View source — the HTML the server sent
F12  or  Ctrl/Cmd + Shift + I    Devtools — the live page, after the browser
                                 finished with it`}
        />
        <P>
          Those are not the same thing, and the difference matters more the further you get.{" "}
          <Strong>View source</Strong> shows the file as delivered. <Strong>Devtools</Strong> shows
          the tree as it exists now, including anything JavaScript has changed since. On a modern
          site they can look completely different.
        </P>
        <Callout tone="success" title="Go and look at something now">
          Open a site you like, press Ctrl/Cmd + U, and read. Most of it will be unfamiliar and it
          does not matter — look for the tags you meet in the next few chapters and watch them turn
          up everywhere. This is a good habit and it costs nothing.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "HTML answers what is it, CSS answers what does it look like, JavaScript answers what happens when you touch it.",
          "Choosing a tag for its appearance is answering a CSS question in the wrong language.",
          "A well-built page with no CSS is plain and completely usable. That is what crawlers and screen readers get.",
          "JavaScript is not needed for links, forms, navigation, or most of a personal site.",
          "The browser parses HTML into a tree, parses CSS into rules, computes styles, lays out boxes, then paints.",
          "That tree is the DOM — what CSS selects from and JavaScript changes.",
          "A script in the middle of the HTML blocks parsing; put it at the end or use defer.",
          "View source shows the delivered file. Devtools shows the live tree. On a modern site these differ.",
        ]}
      />
    </div>
  );
}
