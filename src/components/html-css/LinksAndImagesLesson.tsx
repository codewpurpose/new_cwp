import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function LinksAndImagesLesson() {
  return (
    <div>
      <Lead>
        A link and an image are the whole reason the web is a web rather than a pile of documents.
        Both are one tag with one critical attribute — and both have a second attribute people skip
        that decides whether the page works at all.
      </Lead>

      <LessonSection
        id="an-anchor-is-a-tag-around-the-thing-you-click"
        title="An anchor is a tag around the thing you click"
      >
        <P>
          The element is <Strong>&lt;a&gt;</Strong>, for anchor. Whatever you wrap becomes clickable,
          and <Strong>href</Strong> says where it goes.
        </P>
        <CodeBlock
          label="Links"
          code={`<a href="/about.html">About us</a>
<a href="https://example.com">Another site</a>
<a href="#contact">Jump to contact</a>
<a href="mailto:hello@example.com">Email us</a>
<a href="tel:+441234567890">Call us</a>
<a href="cv.pdf" download>Download my CV</a>

<a href="/gallery.html"><img src="thumb.jpg" alt="Gallery"></a>`}
        />
        <P>
          An anchor without an <Strong>href</Strong> is not a link. It renders as plain text, cannot
          be focused with the keyboard, and is not announced as a link. If you need something
          clickable that does not navigate, that is a <Strong>&lt;button&gt;</Strong>.
        </P>
        <LabelRows
          rows={[
            { label: "target", text: 'target="_blank" opens in a new tab. Add rel="noopener" with it — without that, the new page gets a reference back to yours and can redirect it.' },
            { label: "download", text: "Downloads rather than navigates. Give it a value to rename the file on the way down." },
            { label: "#id", text: "Jumps to the element with that id on this page. Never touches the network." },
            { label: "rel", text: 'Describes the relationship. rel="noopener noreferrer" on external new-tab links; rel="nofollow" to tell search engines not to pass ranking.' },
          ]}
        />
        <Callout tone="note" title="Think twice before target=&quot;_blank&quot;">
          It takes the back button away, which is the control people rely on most. The usual
          justification — &quot;so they do not leave my site&quot; — is about you rather than them.
          Reasonable exceptions: a documentation link from inside a form, or a PDF.
        </Callout>
      </LessonSection>

      <LessonSection
        id="relative-and-absolute-paths-answer-from-where"
        title="Relative and absolute paths answer: from where?"
      >
        <P>
          This trips up everybody and it is worth ten minutes now rather than an hour later. A path
          is either relative to the current file, or absolute from the site root.
        </P>
        <CodeBlock
          label="Given this structure"
          copyable={false}
          code={`my-site/
  index.html
  styles.css
  about/
    index.html
  images/
    logo.png`}
        />
        <CodeBlock
          label="Linking from about/index.html"
          copyable={false}
          code={`<a href="../index.html">Home</a>          up one level, then the file
<a href="/index.html">Home</a>            from the site root
<a href="/">Home</a>                      the root's index.html
<img src="../images/logo.png" alt="">     up one, into images
<img src="/images/logo.png" alt="">       from the root — clearer`}
        />
        <LabelRows
          rows={[
            { label: "file.html", text: "In the same folder as the current file." },
            { label: "folder/file.html", text: "Down into a subfolder of the current one." },
            { label: "../file.html", text: "Up one level, then across. Stack them: ../../file.html." },
            { label: "/images/logo.png", text: "From the site ROOT, regardless of where this file lives. A leading slash always means root." },
            { label: "https://…", text: "A different site entirely. Fully absolute." },
          ]}
        />
        <Callout tone="warning" title="A leading slash does not work over file://">
          Opening a page by double-clicking makes the root your entire disk, so{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">/images/logo.png</span> looks
          for a folder at the top of your hard drive and finds nothing. Use relative paths while
          building locally, or run a local server. This is a common &quot;my images
          work locally and break when published&quot; bug, in reverse.
        </Callout>
      </LessonSection>

      <LessonSection id="link-text-is-read-out-of-context" title="Link text is read out of context">
        <P>
          Screen readers can list every link on a page, as a menu, with no surrounding sentences.
          &quot;Click here&quot; nine times is a menu of nine identical entries.
        </P>
        <CompareGrid
          items={[
            {
              title: "Useless out of context",
              tone: "caution",
              children: (
                <P>
                  To read the report, <u>click here</u>.
                  <br />
                  More information <u>here</u>.
                  <br />
                  <u>https://example.com/2026/report-final-v2.pdf</u>
                  <br />
                  <u>Read more</u>
                </P>
              ),
            },
            {
              title: "Says where it goes",
              tone: "positive",
              children: (
                <P>
                  Read the <u>2026 impact report</u>.
                  <br />
                  See our <u>volunteer guide</u>.
                  <br />
                  <u>Download the report (PDF, 2 MB)</u>
                  <br />
                  <u>Read more about our Python course</u>
                </P>
              ),
            },
          ]}
        />
        <P>
          This is also better for everybody else. Sighted readers scan for links rather than reading
          every sentence, and a link that names its destination is faster for them too. Flagging the
          format and size of a download is ordinary courtesy.
        </P>
      </LessonSection>

      <LessonSection id="img-needs-alt-and-alt-is-not-a-caption" title="img needs alt, and alt is not a caption">
        <P>
          <Strong>&lt;img&gt;</Strong> is a void element with two required attributes:{" "}
          <Strong>src</Strong>, where the file is, and <Strong>alt</Strong>, what it shows.
        </P>
        <CodeBlock
          label="Images"
          code={`<img src="/images/team.jpg" alt="Six students building a robot at a workbench">

<!-- Decorative only: an EMPTY alt, deliberately -->
<img src="/images/swirl.svg" alt="">

<!-- With a visible caption -->
<figure>
  <img src="/images/chart.png" alt="Enrolment tripled between 2024 and 2026">
  <figcaption>Enrolment, 2024–2026. Source: our own records.</figcaption>
</figure>`}
        />
        <P>
          <Strong>alt</Strong> is what a screen reader announces, what shows if the image fails to
          load, and what a search engine indexes. It should say what the image{" "}
          <em>communicates</em>, not what it is.
        </P>
        <LabelRows
          rows={[
            { label: "Bad", text: 'alt="image" or alt="photo" or alt="team.jpg". Announces nothing and takes the reader\'s time to say so.' },
            { label: "Good", text: 'alt="Six students building a robot at a workbench". Describes what somebody would see.' },
            { label: "Decorative", text: 'alt="" — empty, and present. Tells assistive technology to skip it entirely. This is correct and deliberate.' },
            { label: "Missing", text: "No alt attribute at all is different from an empty one. Some screen readers fall back to reading the filename aloud, character by character." },
          ]}
        />
        <Callout tone="tip" title="Use figure when there is a visible caption">
          <span className="font-[family-name:var(--learn-font-mono)]">figcaption</span> is shown to
          everybody;{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">alt</span> is for people who
          cannot see the image. They do different jobs, so do not duplicate one into the other —
          repeating the caption in the alt means it is announced twice.
        </Callout>
      </LessonSection>

      <LessonSection
        id="width-and-height-stop-the-page-from-jumping"
        title="width and height stop the page from jumping"
      >
        <P>
          Images load after the HTML. Without dimensions the browser does not know how much room to
          leave, so it lays out the page without them and then re-lays it out when each one arrives —
          which is the shifting text you have sworn at while trying to click something.
        </P>
        <CodeBlock
          label="Reserve the space"
          code={`<img src="photo.jpg" alt="…" width="800" height="600">`}
        />
        <P>
          Those are the image&apos;s real pixel dimensions and they are not a display size. The
          browser uses the <em>ratio</em> to reserve the right shape, then your CSS scales it. This
          is the modern advice and it reverses guidance from about 2015. Older tutorials say the
          opposite because browsers used to handle images differently.
        </P>
        <CodeBlock
          label="The one CSS rule every page needs"
          code={`img {
  max-width: 100%;   /* never wider than its container */
  height: auto;      /* keep the proportions */
}`}
        />
        <P>
          Without those two lines an 4000-pixel photo blows out your layout on a phone and produces
          horizontal scrolling. Three more image rules matter:
        </P>
        <LabelRows
          rows={[
            { label: "Format", text: "JPEG for photographs, PNG for anything needing transparency, SVG for logos and icons (it is markup, so it scales infinitely), WebP for smaller files with wide support." },
            { label: "Size", text: "Resize before uploading. A 4 MB photo from a phone camera displayed at 600px wide is the commonest reason a page feels slow." },
            { label: "loading", text: 'loading="lazy" on images below the fold defers them until the visitor scrolls near. One attribute, real gain. Do NOT put it on the first image — that one is needed immediately.' },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "<a href=\"…\"> wraps whatever should be clickable. No href means it is not a link and cannot be focused.",
          "target=\"_blank\" needs rel=\"noopener\", and takes the back button away — use it sparingly.",
          "A leading slash means the site root; ../ goes up one level; anything else is relative to the current file.",
          "Root-relative paths do not work over file://, which is why local pages break differently from published ones.",
          "Screen readers list links out of context, so \"click here\" is a menu of identical entries.",
          "alt says what the image communicates. Empty alt=\"\" is correct for decoration; a missing alt is not the same thing.",
          "figcaption is for everyone, alt is for people who cannot see it. Do not duplicate one into the other.",
          "width and height on an img reserve the space and stop the page jumping as images arrive.",
          "img { max-width: 100%; height: auto; } belongs in every stylesheet you write.",
          "Resize images before uploading, and use loading=\"lazy\" for anything below the fold.",
        ]}
      />
    </div>
  );
}
