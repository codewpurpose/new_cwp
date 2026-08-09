import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function PublishingYourSiteLesson() {
  return (
    <div>
      <Lead>
        A folder of HTML files is a website the moment somebody else can open it, and for a static
        page that is free and takes about five minutes. Then the three checks worth doing before you
        send anyone the link.
      </Lead>

      <LessonSection id="a-static-site-needs-no-server-you-manage" title="A static site needs no server you manage">
        <P>
          What you built is a <Strong>static site</Strong>: files that are sent exactly as they are,
          identical for every visitor. No database, no server-side code, nothing to run.
        </P>
        <P>
          That is the easiest possible thing to host, which is why every option below is free at the
          scale you need.
        </P>
        <CompareGrid
          items={[
            {
              title: "Static — what you have",
              tone: "positive",
              children: (
                <P>
                  HTML, CSS, images, maybe some JavaScript. The server hands over files. Fast,
                  cheap, almost nothing to attack, and it will still work in ten years with no
                  maintenance.
                </P>
              ),
            },
            {
              title: "Dynamic — what you do not",
              tone: "neutral",
              children: (
                <P>
                  A program builds each page per request, usually against a database. Needed for
                  accounts, user content, and anything personalised. More power, and a thing you now
                  have to keep running and patched.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="note" title="A great many real sites are static">
          Documentation, blogs, portfolios, marketing sites, and event pages are overwhelmingly
          static, including plenty that look sophisticated. Reaching for a server is a decision that
          should follow a requirement, not precede one.
        </Callout>
      </LessonSection>

      <LessonSection id="github-pages-is-a-repository-with-a-switch" title="GitHub Pages is a repository with a switch">
        <P>
          If your files are in a GitHub repository — and after this site&apos;s Git and GitHub track
          they can be — publishing is a settings toggle.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Push the folder to a repository",
              detail: "index.html must be at the root of it, not inside a subfolder. This is the step people get wrong.",
            },
            {
              label: "Settings → Pages",
              detail: "Under Build and deployment, set Source to \"Deploy from a branch\", pick main and the / (root) folder, and save.",
            },
            {
              label: "Wait a minute",
              detail: "The page shows a URL: https://yourname.github.io/repository-name/. First publish takes a minute or two; later pushes are faster.",
            },
            {
              label: "Push to update",
              detail: "Every push to that branch republishes automatically. There is no separate deploy step.",
            },
          ]}
        />
        <P>
          One naming trick worth knowing: a repository called{" "}
          <Strong>yourname.github.io</Strong> publishes at that bare domain rather than in a
          subfolder — which is both tidier and avoids the path problem in the section below.
        </P>
        <Callout tone="warning" title="A repository must be public for free Pages">
          On a free account, Pages only serves public repositories. Anything in that repository is
          readable by anyone — so no API keys, no personal data, nothing in a comment you would not
          publish.
        </Callout>
      </LessonSection>

      <LessonSection id="netlify-and-vercel-take-a-dragged-folder" title="Netlify and Vercel take a dragged folder">
        <P>
          Two alternatives, both free for a personal site, and both with a genuinely
          drag-a-folder-onto-a-page option that needs no Git at all.
        </P>
        <LabelRows
          rows={[
            {
              label: "Netlify Drop",
              text: "app.netlify.com/drop — drag the folder onto the page and it is live in seconds on a random subdomain you can rename. The fastest way to put something on the internet, full stop.",
            },
            {
              label: "Netlify (Git)",
              text: "Connect a repository and it rebuilds on every push. Also gives you Netlify Forms, which receives a form submission with no server — the missing half of chapter 9.",
            },
            {
              label: "Vercel",
              text: "Same shape. Excellent at frameworks, and perfectly happy with a folder of HTML.",
            },
            {
              label: "Cloudflare Pages",
              text: "Also free, also fine, and notably fast internationally.",
            },
          ]}
        />
        <P>
          All of them give you <Strong>HTTPS</Strong> automatically, on a certificate they renew
          themselves. That is worth stating because it used to be an annual chore with a fee.
        </P>
        <P>
          A custom domain costs roughly £10 a year from any registrar and points at your host with
          one DNS record. Chapter 1 explains why the change takes a while to appear everywhere.
        </P>
      </LessonSection>

      <LessonSection
        id="relative-paths-and-case-sensitivity-break-on-deploy"
        title="Relative paths and case sensitivity break on deploy"
      >
        <P>
          Two bugs account for nearly every &quot;it worked on my laptop&quot; report, and both are
          created weeks earlier by habits from chapter 3.
        </P>
        <CompareGrid
          items={[
            {
              title: "Case sensitivity",
              tone: "caution",
              children: (
                <P>
                  macOS and Windows treat{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">Photo.JPG</span> and{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">photo.jpg</span> as the
                  same file. Every Linux web server does not. So a mis-cased path works perfectly
                  locally and 404s the instant you publish.
                </P>
              ),
            },
            {
              title: "Root-relative paths",
              tone: "caution",
              children: (
                <P>
                  <span className="font-[family-name:var(--learn-font-mono)]">/styles.css</span>{" "}
                  means the site root. Published to{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    yourname.github.io/my-site/
                  </span>
                  , the root is{" "}
                  <span className="font-[family-name:var(--learn-font-mono)]">
                    yourname.github.io
                  </span>{" "}
                  — so it looks one level too high and finds nothing.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Safe from a project subfolder"
          copyable={false}
          code={`<link rel="stylesheet" href="styles.css">      relative — works anywhere
<img src="images/photo.jpg" alt="…">           relative — works anywhere

<link rel="stylesheet" href="/styles.css">     root — breaks in a subfolder
<img src="/images/Photo.JPG" alt="…">          root AND mis-cased — twice broken`}
          lineTones={{ 0: "ok", 1: "ok", 3: "err", 4: "err" }}
        />
        <P>
          The fix for both: lowercase, hyphenated filenames everywhere, and relative paths unless you
          are publishing at a bare domain. If you must use root-relative paths, publish to a{" "}
          <Strong>yourname.github.io</Strong> repository or a custom domain so the root is the root.
        </P>
        <Callout tone="tip" title="The network tab finds these in five seconds">
          Open the published site, open devtools, refresh with the Network tab open, and look for red
          404s. Each one names the exact path that failed, which is usually enough to see the
          mis-cased letter or the leading slash. Chapter 23.
        </Callout>
      </LessonSection>

      <LessonSection id="three-checks-before-you-send-the-link" title="Three checks before you send the link">
        <P>
          Publishing is the easy part. These are the three that catch the things you cannot see from
          your own machine.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Open the published URL, not localhost",
              detail: "In a private window, so nothing is served from your cache. Click every link, load every image, submit the form. This is where a mis-cased path shows up.",
            },
            {
              label: "Open it on an actual phone",
              detail: "Not the device toolbar — a real one. Real touch targets, real text size, real connection. Send yourself the link.",
            },
            {
              label: "Run Lighthouse on the live URL",
              detail: "The devtools tab audits performance, accessibility, best practices, and SEO in one click. Read the accessibility and SEO sections in particular; they are specific and actionable.",
            },
          ]}
        />
        <ChecklistCard
          title="The launch checklist"
          marker="check"
          items={[
            "Every page has a unique <title> and a meta description",
            "The viewport meta tag is present — check it once more, it is the one that ruins a phone",
            "Every image has an alt and has been resized for the web",
            "No 404s in the network tab on any page",
            "It works in a private window, on a phone, on somebody else's connection",
            "Tab through it once on the live site",
            "The HTML validates at validator.w3.org",
            "A favicon exists, so the tab is not a blank page icon",
            "No API keys, no personal data, nothing in a comment you would not publish",
          ]}
        />
        <CodeBlock
          label="The bits of head that are easy to forget"
          code={`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- The preview card when somebody pastes your link into a chat -->
<meta property="og:title" content="Priya Raman — student and maker">
<meta property="og:description" content="Second-year student. I build small tools.">
<meta property="og:image" content="https://example.com/og.png">
<meta property="og:url" content="https://example.com/">
<meta name="twitter:card" content="summary_large_image">`}
        />
        <Callout tone="success" title="That is the whole track">
          You can now write a document that means something, style it deliberately, lay it out in two
          dimensions, make it work on any screen and for anyone reading it, debug it when it
          misbehaves, and put it on the internet. Everything after this — a framework, a build step,
          a component library — is a way of doing these same things at larger scale. None of it
          replaces knowing what the browser is doing, and all of it is easier from here.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "What you built is a static site: files sent as they are, with nothing to run and nothing to maintain.",
          "GitHub Pages publishes a repository from Settings → Pages, and republishes on every push.",
          "index.html must be at the root of the repository, and free Pages requires a public one.",
          "A repository named yourname.github.io publishes at the bare domain instead of a subfolder.",
          "Netlify Drop takes a dragged folder and is live in seconds with no Git at all.",
          "Netlify Forms receives form submissions with no server — the missing half of chapter 9.",
          "Every one of these gives you HTTPS automatically.",
          "Linux servers are case-sensitive and your laptop is not, so Photo.JPG works locally and 404s live.",
          "Root-relative paths break when published into a subfolder. Use relative paths, or publish at a bare domain.",
          "The network tab finds both of those in five seconds.",
          "Check the live URL in a private window, on a real phone, and with Lighthouse before sending the link.",
          "Do not skip the favicon and the og: tags — they are the first thing anyone sees of the link.",
        ]}
      />
    </div>
  );
}
