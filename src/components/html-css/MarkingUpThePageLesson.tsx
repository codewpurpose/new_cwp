import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function MarkingUpThePageLesson() {
  return (
    <div>
      <Lead>
        Build a complete personal site as markup alone — no styles, no colours, nothing but
        structure. It will look like a 1994 document, and it will already be readable, navigable, and
        correct, which is the entire point.
      </Lead>

      <LessonSection
        id="decide-the-content-before-you-decide-anything-else"
        title="Decide the content before you decide anything else"
      >
        <P>
          The instinct is to start with a layout. Resist it for twenty minutes. A layout is a
          container, and until you know what goes in it you are designing a shape rather than a page.
        </P>
        <P>
          The page we are building is a one-page personal site, which is the most useful first
          project there is: a real thing you can send someone.
        </P>
        <LabelRows
          rows={[
            { label: "Header", text: "Your name, and links to the sections below." },
            { label: "Hero", text: "One sentence saying who you are and what you do. Not a paragraph." },
            { label: "Projects", text: "Three things you have made, each with a title, a line of description, and a link." },
            { label: "About", text: "Two or three sentences. Nobody reads more on a personal site." },
            { label: "Contact", text: "A short form, plus a direct email address for people who prefer one." },
            { label: "Footer", text: "A copyright line and your social links." },
          ]}
        />
        <Callout tone="tip" title="Write the words first, in a plain text file">
          Real words, not lorem ipsum. Placeholder text is uniform in a way real writing never is —
          it has no long titles, no awkward two-line descriptions, no empty fields — so a layout
          designed around it breaks the moment real content arrives. Real content also tells you what
          structure you need.
        </Callout>
      </LessonSection>

      <LessonSection id="the-skeleton-and-the-four-regions" title="The skeleton and the four regions">
        <P>
          Start with the document from chapter 5 and the landmarks from chapter 10.
        </P>
        <CodeBlock
          label="index.html — the frame"
          code={`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Priya Raman — student and maker</title>
  <meta name="description" content="Second-year student. I build small tools and write about what breaks.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header>
    <a href="#main" class="skip-link">Skip to content</a>

    <a href="/" class="wordmark">Priya Raman</a>

    <nav aria-label="Main">
      <ul>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <!-- everything unique to this page -->
  </main>

  <footer>
    <p>&copy; 2026 Priya Raman</p>
    <ul>
      <li><a href="https://github.com/example">GitHub</a></li>
      <li><a href="mailto:hello@example.com">Email</a></li>
    </ul>
  </footer>

</body>
</html>`}
        />
        <P>
          Three details worth naming. The <Strong>skip link</Strong> is the first focusable thing on
          the page and lets a keyboard user jump past the navigation — it is hidden until focused,
          which is two lines of CSS next chapter. The nav has an{" "}
          <Strong>aria-label</Strong> because a page can have more than one, and &quot;Main&quot;
          distinguishes it. And the footer links are a list, because they are several of the same
          kind of thing.
        </P>
        <P>
          The stylesheet is linked already, and the file does not exist yet. That is fine — a missing
          stylesheet is a 404 in the network tab and nothing else.
        </P>
      </LessonSection>

      <LessonSection id="the-hero-and-the-project-list" title="The hero and the project list">
        <P>
          Inside <Strong>main</Strong>, the one <Strong>h1</Strong> on the page, then the projects as
          what they are: a list of self-contained items.
        </P>
        <CodeBlock
          label="Inside main"
          code={`<section class="hero">
  <h1>Priya Raman</h1>
  <p class="lead">
    Second-year student. I build small tools and write about what breaks.
  </p>
  <a href="#projects" class="btn">See my work</a>
</section>

<section id="projects">
  <h2>Projects</h2>

  <ul class="project-list">
    <li>
      <article class="project">
        <h3><a href="https://example.com/split">Split</a></h3>
        <p>A bill-splitting calculator that handles uneven shares. Vanilla JS, no dependencies.</p>
        <ul class="tags">
          <li>JavaScript</li>
          <li>CSS Grid</li>
        </ul>
      </article>
    </li>

    <li>
      <article class="project">
        <h3><a href="https://example.com/tide">Tide</a></h3>
        <p>Tide times for my nearest beach, because every existing app has adverts.</p>
        <ul class="tags">
          <li>API</li>
          <li>Fetch</li>
        </ul>
      </article>
    </li>
  </ul>
</section>`}
        />
        <LabelRows
          rows={[
            { label: "ul of articles", text: "Several of the same kind of thing, so a list — and each one is self-contained enough to stand alone, so an article inside each li." },
            { label: "h3 inside h2", text: "The outline is h1 → h2 (Projects) → h3 (each project). No level is skipped, and the structure reads correctly with no CSS." },
            { label: "The link is in the heading", text: "So the link text is the project name, which is what a screen reader's link list should say." },
            { label: "Tags are a list too", text: "Rendered as pills later. Still a list of several things now." },
          ]}
        />
        <Callout tone="warning" title="No div has appeared yet">
          Not because divs are banned, but because nothing so far has needed one — every region had
          an element that described it. Divs will turn up in the next chapter, if a layout
          needs a wrapper with no meaning. Notice how far you get before that happens.
        </Callout>
      </LessonSection>

      <LessonSection id="the-contact-form-and-the-footer" title="The contact form and the footer">
        <P>
          The form uses everything from chapter 9: labels joined to inputs, appropriate types, and
          autocomplete.
        </P>
        <CodeBlock
          label="About and contact"
          code={`<section id="about">
  <h2>About</h2>
  <p>
    I am in my second year studying computer science. I like problems where
    the answer is obvious afterwards, and I write up the ones that were not.
  </p>
  <p>
    Currently learning: CSS grid, and how to stop rewriting things that work.
  </p>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>
    Email me at <a href="mailto:hello@example.com">hello@example.com</a>,
    or use the form.
  </p>

  <form action="https://formspree.io/f/example" method="post">
    <div class="field">
      <label for="name">Your name</label>
      <input type="text" id="name" name="name" autocomplete="name" required>
    </div>

    <div class="field">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" autocomplete="email" required>
    </div>

    <div class="field">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit">Send</button>
  </form>
</section>`}
        />
        <P>
          There is the first <Strong>div</Strong>: <Strong>class=&quot;field&quot;</Strong>, wrapping
          each label-and-input pair so they can be spaced as a unit. It carries no meaning and it is
          honest about that. This is exactly the case chapter 10 described as legitimate.
        </P>
        <P>
          The <Strong>action</Strong> points at a form service, because a static site has no server
          to receive a post. The email address is there as well — some people prefer their own mail
          client, and a form that fails silently is worse than no form.
        </P>
      </LessonSection>

      <LessonSection id="read-it-once-with-no-styles-at-all" title="Read it once, with no styles at all">
        <P>
          Open it. It is black Times New Roman on white, the headings are various sizes, the links
          are blue and underlined, and the lists have bullets. It looks like 1994.
        </P>
        <P>
          Read it anyway, top to bottom, and check these things — because every one of them is
          currently true or currently broken, and adding CSS will hide the difference rather than fix
          it.
        </P>
        <ChecklistCard
          title="Before writing a single line of CSS"
          marker="check"
          items={[
            "Read top to bottom: does it make sense in this order? That order is what a screen reader announces and what the tab key follows",
            "Press Tab repeatedly: does focus move through every link, field, and button in a sensible order?",
            "Does the skip link appear first and jump to main?",
            "Do the nav links jump to the right sections?",
            "Is there exactly one h1, and do the levels descend without skipping?",
            "Does clicking each form label focus its field?",
            "Run it through validator.w3.org — fix everything it reports now, while there are 90 lines",
            "Turn on your browser's reader mode: does it find the article?",
          ]}
        />
        <Callout tone="success" title="This is the version that works for the most people">
          What you are looking at right now is what a search engine indexes, roughly what a screen
          reader announces, what reader mode produces, and what a visitor on a failing connection
          sees. Everything from here is presentation layered on top — and if this version is right,
          none of that can make it wrong.
        </Callout>
        <P>
          One more habit worth forming: <Strong>keep this file open in a second tab</Strong> while
          you style. When a CSS change makes something behave strangely, checking whether the unstyled
          version is still correct tells you immediately whether you have a markup problem or a
          styling one.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Decide the content before the layout. A layout is a container and you cannot size it before you know what goes in.",
          "Write real words, not lorem ipsum — placeholder text is uniform in ways real content is not.",
          "Start from the document skeleton and the four landmarks: header, nav, main, footer.",
          "A skip link is the first focusable element and lets keyboard users bypass the navigation.",
          "Name a nav with aria-label when a page could have more than one.",
          "Several of the same kind of thing is a list; something self-contained is an article. Both, nested, is normal.",
          "Put the link inside the heading, so link text is the project name.",
          "The first div appears only when a wrapper has no meaning — like a form field group.",
          "A static site needs a form service to receive a post; give the email address too.",
          "Read the unstyled page top to bottom and tab through it before writing any CSS.",
          "Validate now, at 90 lines, rather than at 400.",
          "Unstyled is what search engines, screen readers, reader mode, and failing connections get.",
        ]}
      />
    </div>
  );
}
