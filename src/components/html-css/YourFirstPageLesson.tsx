import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function YourFirstPageLesson() {
  return (
    <div>
      <Lead>
        You need a text editor and a browser, both of which you already have. Write six lines, save
        the file, double-click it, and you are a web developer — then learn the two habits that stop
        the next hundred files from being painful.
      </Lead>

      <LessonSection id="the-entire-toolchain-is-a-text-editor" title="The entire toolchain is a text editor">
        <P>
          There is no compiler, no build step, no package to install, and no account to make. HTML
          and CSS are plain text, and the browser reads them directly.
        </P>
        <P>
          Any editor that saves plain text will work — Notepad, TextEdit, whatever is already on the
          machine. One free editor makes the next few weeks easier:
        </P>
        <LabelRows
          rows={[
            {
              label: "VS Code",
              text: "Free, on every platform, and the one most tutorials assume. Colours your tags, closes them for you, and warns about mistakes as you type.",
            },
            {
              label: "Live Server",
              text: "Install this VS Code extension on day one. It reloads the browser every time you save, which removes the only repetitive part of this whole process.",
            },
            {
              label: "Anything else",
              text: "Sublime, Zed, Notepad++, Vim, or a browser-based editor like CodePen. All fine. Nothing in this track depends on your choice.",
            },
          ]}
        />
        <Callout tone="warning" title="Not a word processor">
          Word, Google Docs, and Pages save formatting, not plain text — and TextEdit on macOS
          defaults to rich text, which produces a file the browser cannot read. In TextEdit:{" "}
          <Strong>Format &rarr; Make Plain Text</Strong> first. This wastes an afternoon roughly once
          per person.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-extension-is-what-makes-it-a-web-page"
        title="The extension is what makes it a web page"
      >
        <P>
          Here is a complete, valid web page. Everything in it is explained in the next chapter —
          type it anyway.
        </P>
        <CodeBlock
          label="index.html"
          code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>I made this.</p>
  </body>
</html>`}
        />
        <P>
          Save it as <Strong>index.html</Strong>. The <Strong>.html</Strong> is the entire
          difference between a text file and a web page — it is what tells your operating system to
          open it in a browser, and what tells a server to send it as{" "}
          <Strong>Content-Type: text/html</Strong>.
        </P>
        <Callout tone="warning" title="Windows hides file extensions by default">
          Which means &quot;index.html&quot; typed into Notepad&apos;s save dialog can quietly become{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">index.html.txt</span>, and it
          opens as text rather than a page. Turn extensions on: File Explorer &rarr; View &rarr; File
          name extensions. Do it now rather than when it confuses you.
        </Callout>
      </LessonSection>

      <LessonSection
        id="double-clicking-the-file-is-a-real-way-to-view-it"
        title="Double-clicking the file is a real way to view it"
      >
        <P>
          Find the file and double-click it. Your browser opens and the page is there. Look at the
          address bar:
        </P>
        <CodeBlock
          label="The address bar"
          copyable={false}
          code={`file:///Users/you/my-site/index.html`}
        />
        <P>
          <Strong>file://</Strong>, not <Strong>https://</Strong>. No server was involved, nothing
          touched the network, and the page works. This is how you will build for most of
          this track.
        </P>
        <P>
          There are two limits to know about, so they do not surprise you later.
        </P>
        <StepList
          steps={[
            {
              label: "Nobody else can open it",
              detail: "The address names a path on your disk. Sending it to somebody is sending them a path to a file they do not have — publishing is chapter 24.",
            },
            {
              label: "Some features refuse to run over file://",
              detail: "Anything fetching data, and JavaScript modules, are blocked by browser security rules that have nothing to do with your code. Live Server, which serves over http://localhost, removes this entirely.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="index-html-is-a-name-with-a-meaning" title="index.html is a name with a meaning">
        <P>
          <Strong>index.html</Strong> is a convention every web server understands: ask for a folder
          and you get the index.html inside it, without naming the file.
        </P>
        <CodeBlock
          label="Why the URL is shorter than the path"
          copyable={false}
          code={`codewithpurpose.org/          →  serves  /index.html
codewithpurpose.org/about/    →  serves  /about/index.html
codewithpurpose.org/about.html →  serves  /about.html   (also fine)`}
        />
        <P>
          Two ways to organise a small site, and the difference shows up in your URLs:
        </P>
        <CodeBlock
          label="Flat, or foldered"
          copyable={false}
          code={`# Flat — simple, and the .html is visible in the URL
my-site/
  index.html         →  /
  about.html         →  /about.html
  styles.css

# Foldered — tidier URLs, one more folder each
my-site/
  index.html         →  /
  about/
    index.html       →  /about/
  styles.css`}
        />
        <P>
          Either is correct. Pick one and stay with it — mixing them is what produces a site where
          half the links have <Strong>.html</Strong> on the end and half do not.
        </P>
        <Callout tone="tip" title="Name files in lowercase, with hyphens">
          <span className="font-[family-name:var(--learn-font-mono)]">about-me.html</span>, never{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">About Me.html</span>. Spaces
          become <span className="font-[family-name:var(--learn-font-mono)]">%20</span> in URLs, and
          most web servers are case-sensitive while macOS and Windows are not — so{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">Photo.JPG</span> works
          perfectly on your laptop and 404s the moment you publish. This is chapter 24&apos;s most
          common bug, created here.
        </Callout>
      </LessonSection>

      <LessonSection id="save-then-refresh-is-the-whole-loop" title="Save, then refresh, is the whole loop">
        <P>
          Editor on one side, browser on the other. Change something, save, refresh. That is the
          entire development cycle for everything in this track, and its tightness is the best thing
          about learning the web first — you see the result of every change in under a second.
        </P>
        <ChecklistCard
          title="Set this up once, before chapter 4"
          marker="check"
          items={[
            "A folder for the site — Desktop is fine, and one folder per project from the start",
            "index.html inside it, with the ten lines above",
            "The editor and the browser side by side, not overlapping. Half the screen each",
            "Live Server installed, or Ctrl/Cmd + R ready in the browser",
            "File extensions visible in your file manager",
          ]}
        />
        <P>
          One thing that catches everyone at least once: you save, you refresh, and nothing changes.
          Before assuming your code is wrong, check the three boring causes.
        </P>
        <LabelRows
          rows={[
            { label: "Saved?", text: "An unsaved file shows a dot or an asterisk in the tab. This is the answer far more often than anybody admits." },
            { label: "Same file?", text: "Check the address bar path matches the file you are editing. Two index.html files in two folders is a classic." },
            { label: "Cached?", text: "Hard refresh — Ctrl/Cmd + Shift + R — bypasses the cache. Mostly bites with CSS and images rather than HTML." },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "There is no toolchain. A text editor and a browser, both of which you already have.",
          "Word processors save formatting, not plain text. TextEdit needs Format → Make Plain Text.",
          "The .html extension is what makes a text file a web page. Turn on file extensions in Windows so you can see it.",
          "Double-clicking opens the file over file:// with no server. That is a real and normal way to build.",
          "file:// pages cannot be shared and block a few features; a local server like Live Server removes both limits.",
          "index.html is served when somebody asks for a folder, which is why URLs are shorter than paths.",
          "Lowercase, hyphenated filenames. Servers are case-sensitive and your laptop is not — that mismatch is a deploy-day bug.",
          "Save, refresh, look. If nothing changed: did you save, is it the same file, is it cached?",
        ]}
      />
    </div>
  );
}
