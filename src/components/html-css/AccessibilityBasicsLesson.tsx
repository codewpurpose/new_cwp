import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ContrastChecker } from "@/components/html-css/ContrastChecker";

export function AccessibilityBasicsLesson() {
  return (
    <div>
      <Lead>
        Most accessibility is not extra work — it is the HTML you already know, used correctly, plus
        enough contrast to read. Check a real colour pair against the standard and find out how many
        popular palettes fail it.
      </Lead>

      <LessonSection
        id="semantic-html-was-most-of-the-work-already"
        title="Semantic HTML was most of the work already"
      >
        <P>
          Accessibility is presented as a specialism with its own standards and audits, and the
          version that matters for a hand-written site is much smaller than that. If you followed
          chapters 4 to 10, most of it is done.
        </P>
        <LabelRows
          rows={[
            { label: "Landmarks", text: "header, nav, main, footer let a screen reader user jump between regions instead of listening from the top." },
            { label: "Headings", text: "A correct h1–h6 outline is how blind users skim. Skipping levels for size breaks it." },
            { label: "Labels", text: "Every input joined to a label by for/id or wrapping. Otherwise the field announces nothing." },
            { label: "alt text", text: "Says what the image communicates; empty alt=\"\" for decoration; never a missing alt." },
            { label: "Real buttons and links", text: "<button> for actions, <a href> for navigation. Both are focusable and announced. A div with a click handler is neither." },
            { label: "Link text", text: "Says where it goes, because screen readers list links out of context." },
          ]}
        />
        <Callout tone="success" title="The first rule of ARIA is not to use ARIA">
          There is a whole vocabulary of{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">role</span> and{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">aria-*</span> attributes for
          describing custom components. Its own specification says that a native HTML element with
          the right semantics is always preferable — a{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            &lt;div role=&quot;button&quot; tabindex=&quot;0&quot;&gt;
          </span>{" "}
          with two keyboard handlers is a worse{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">&lt;button&gt;</span>. Bad
          ARIA is measurably worse than no ARIA.
        </Callout>
        <P>
          These are the ARIA attributes most likely to appear on a static site:
        </P>
        <CodeBlock
          label="Useful, and small"
          code={`<nav aria-label="Main">…</nav>          <!-- distinguishes multiple navs -->
<button aria-expanded="false">Menu</button>   <!-- open or closed state    -->
<button aria-label="Close">&times;</button>   <!-- names an icon-only button -->
<div role="status">Saved</div>          <!-- announces a change politely -->
<span aria-hidden="true">→</span>       <!-- hides decoration from readers -->`}
        />
      </LessonSection>

      <LessonSection id="contrast-is-a-ratio-with-a-number-to-hit" title="Contrast is a ratio, with a number to hit">
        <P>
          Contrast is the one part of this that is pure arithmetic, and it is the part most sites
          fail. The ratio between text and its background runs from 1:1 (identical) to 21:1 (black on
          white).
        </P>
        <ContrastChecker />
        <LabelRows
          rows={[
            { label: "4.5:1", text: "AA for normal text. This is the number to hit, and the one referenced by law in several jurisdictions." },
            { label: "3:1", text: "AA for large text — 24px, or 19px bold and above. Also the minimum for meaningful borders and icons." },
            { label: "7:1", text: "AAA. Stricter, and a good target for body copy on a site you control." },
            { label: "Exempt", text: "Purely decorative graphics, and disabled controls. Placeholder text is NOT exempt." },
          ]}
        />
        <P>
          Try the placeholder grey in that widget. <Strong>#999999</Strong> on white is one of the
          most common colours on the web for secondary text, and it scores about 2.8:1 — it fails at
          every size. So does white on most pastel buttons.
        </P>
        <Callout tone="warning" title="Your laptop is the best possible viewing condition">
          A bright indoor screen at full brightness, in your thirties, with no glare. Your readers
          have older screens, sunlight, cheap projectors, night mode, and a range of eyesight. The
          ratio is not a judgement about how it looks to you — it is a measurement that holds up
          outside your office.
        </Callout>
      </LessonSection>

      <LessonSection id="never-signal-with-colour-alone" title="Never signal with colour alone">
        <P>
          About one man in twelve and one woman in two hundred has some form of colour vision
          deficiency. Red and green, specifically, are the pair most likely to converge — which is
          unfortunate, because red-means-bad and green-means-good is the most common signalling
          convention there is.
        </P>
        <CompareGrid
          items={[
            {
              title: "Colour alone",
              tone: "caution",
              children: (
                <P>
                  A red border on an invalid field. A green tick and a red cross that differ only in
                  hue. &quot;Click the green button.&quot; A chart with a red line and a green line
                  and a colour key.
                </P>
              ),
            },
            {
              title: "Colour plus something else",
              tone: "positive",
              children: (
                <P>
                  A red border <em>and</em> an error message. A tick shape and a cross shape. A named
                  button. A chart where one line is dashed and one is solid, labelled directly.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          label="An error that does not rely on red"
          code={`<div class="field field--error">
  <label for="email">Email address</label>
  <input type="email" id="email" aria-describedby="email-error" aria-invalid="true">
  <p id="email-error" class="error">
    <span aria-hidden="true">⚠</span> Enter an email address, like name@example.com
  </p>
</div>`}
        />
        <P>
          The border colour is still there and still useful. It is simply no longer the only thing
          carrying the message — which is the whole rule.
        </P>
        <P>
          The same applies to links in body text. If a link is only distinguished by colour, it needs
          at least 3:1 contrast against the surrounding text as well as 4.5:1 against the background —
          which is hard. Underlining them solves it completely and is the reason underlined links
          were the default in the first place.
        </P>
      </LessonSection>

      <LessonSection id="everything-must-work-from-the-keyboard" title="Everything must work from the keyboard">
        <P>
          Not everyone uses a mouse. People with motor impairments, people using screen readers,
          people with a broken trackpad, and a large number of people who are simply fast at typing.
        </P>
        <LabelRows
          rows={[
            { label: "Tab", text: "Move to the next focusable element. Shift+Tab goes back." },
            { label: "Enter", text: "Follow a link, or press a button." },
            { label: "Space", text: "Press a button, tick a checkbox, scroll the page." },
            { label: "Arrows", text: "Move within radio groups, selects, and sliders." },
            { label: "Escape", text: "Close a dialog or a menu." },
          ]}
        />
        <P>
          Every one of those works automatically on native elements. They work on nothing you build
          out of divs.
        </P>
        <CodeBlock
          label="Test your own page in thirty seconds"
          copyable={false}
          code={`Click the address bar, then press Tab repeatedly.

  Can you see where focus is, at every single stop?
  Does the order follow the visual layout?
  Can you reach every link, button, and field?
  Can you activate everything with Enter or Space?
  Does focus ever disappear into something invisible?`}
        />
        <Callout tone="danger" title="outline: none is the most damaging one line in CSS">
          Removing focus outlines because they look untidy makes a site unusable for anybody
          navigating by keyboard — there is no longer any way to tell where you are. Style the
          outline instead. Chapter 21 does it once, for everything, in four lines with{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">:focus-visible</span>.
        </Callout>
        <P>
          Two other keyboard traps matter. A hidden menu at{" "}
          <Strong>opacity: 0</Strong> is still focusable, so a keyboard user tabs into invisible
          links — use <Strong>display: none</Strong> or <Strong>visibility: hidden</Strong>. And
          positive <Strong>tabindex</Strong> values scramble the tab order for the whole page; the
          only values worth using are <Strong>0</Strong> and <Strong>-1</Strong>.
        </P>
      </LessonSection>

      <LessonSection id="alt-text-and-the-images-that-need-none" title="Alt text, and the images that need none">
        <P>
          Chapter 7 covered the syntax. The judgement is what alt text should <em>say</em>, and it
          depends entirely on the image&apos;s job.
        </P>
        <LabelRows
          rows={[
            { label: "Informative", text: "Describe what it communicates. A photo of students at a workbench: \"Six students building a robot at a workbench\" — not \"photo\" and not the filename." },
            { label: "Decorative", text: 'alt="" — empty and present. A background flourish, a divider. Tells assistive technology to skip it, which is exactly right.' },
            { label: "Functional", text: "Describe the ACTION, not the picture. A magnifying glass in a search button is alt=\"Search\", not \"magnifying glass\"." },
            { label: "Text in an image", text: "The alt is the text. A logo reading \"CodeWithPurpose\" is alt=\"CodeWithPurpose\"." },
            { label: "Complex", text: "A chart needs the finding, not the shape: \"Enrolment tripled between 2024 and 2026\". Put the data in a table nearby if it matters." },
            { label: "Already described", text: 'If a caption right beside it says the same thing, alt="" avoids announcing it twice.' },
          ]}
        />
        <ChecklistCard
          title="An accessibility pass that takes ten minutes"
          marker="check"
          items={[
            "Tab through the whole page. Focus visible everywhere, sensible order, nothing unreachable",
            "Check every text colour pair at 4.5:1 with the widget above",
            "Find anything signalled by colour alone and add a shape, an icon, or a word",
            "Check every image has an alt, and that decorative ones have an empty one",
            "Check every form input has a label you can click",
            "Zoom the browser to 200%: does anything overlap or get cut off?",
            "Run Lighthouse in devtools — it catches contrast, missing alt, and label problems automatically",
            "Read the page with CSS off. That is roughly the screen reader experience",
          ]}
        />
        <Callout tone="note" title="Automated tools catch about a third of it">
          Lighthouse and axe are useful and will find missing alt attributes, contrast
          failures, and unlabelled inputs in seconds. They cannot tell whether your alt text is{" "}
          <em>good</em>, whether your heading order makes sense, or whether the tab order is logical.
          Run them, and then use the keyboard yourself.
        </Callout>
        <P>
          The last thing worth saying: nearly everything here helps people who are not disabled.
          Captions help in a noisy room. Contrast helps in sunlight. Keyboard access helps a power
          user. Clear link text helps someone skimming. Good structure helps search engines. It is
          not a separate version of your site for a separate group of people — it is the same site,
          built to work in more conditions than your own.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Most accessibility is semantic HTML used correctly — landmarks, headings, labels, alt text, real buttons and links.",
          "The first rule of ARIA is not to use ARIA: a native element beats a div with role and tabindex.",
          "Text contrast must be at least 4.5:1, or 3:1 for large text. #999 on white fails at every size.",
          "Your bright indoor laptop is the best possible viewing condition; the ratio is what holds up outside it.",
          "Never signal with colour alone — add a shape, an icon, or a word. Red and green are the pair most likely to converge.",
          "Underlining links in body text solves the link-contrast problem completely.",
          "Tab, Enter, Space, arrows, and Escape all work on native elements and on nothing built from divs.",
          "outline: none makes a site unusable by keyboard. Style the outline; never delete it.",
          "opacity: 0 keeps things focusable, and positive tabindex scrambles the whole page order.",
          "Alt text describes what the image communicates; functional images describe the action; decorative ones get alt=\"\".",
          "Lighthouse catches roughly a third of the problems automatically. Use the keyboard yourself for the rest.",
          "Almost all of it helps people who are not disabled too — it is one site that works in more conditions.",
        ]}
      />
    </div>
  );
}
