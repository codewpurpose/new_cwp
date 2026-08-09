import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RequestJourney } from "@/components/html-css/RequestJourney";

export function WhatIsAWebsiteLesson() {
  return (
    <div>
      <Lead>
        Between pressing Enter and seeing a page, six things happen, and none of them are magic.
        Follow one request from your keyboard to a server on another continent and back, and see
        exactly which step you will be writing.
      </Lead>

      <LessonSection
        id="a-website-is-files-on-somebody-elses-computer"
        title="A website is files on somebody else's computer"
      >
        <P>
          That is not a simplification. A website is a folder, on a machine that is switched on, with
          a program listening for requests. Somebody asks for a file; the machine sends it.
        </P>
        <P>
          The folder for a small site looks like a folder. There is nothing else in it.
        </P>
        <CodeBlock
          label="A real website"
          copyable={false}
          code={`my-site/
  index.html        the home page
  about.html        another page
  styles.css        how it all looks
  photo.jpg         a picture`}
        />
        <P>
          The machine holding it is called a <Strong>server</Strong>, and the word describes a job
          rather than a kind of hardware. Your laptop can be one. It usually is one, briefly, while
          you are building something.
        </P>
        <Callout tone="note" title="This is why the first thing you build is a file">
          You do not need a server, a host, an account, or an internet connection to make a web page.
          You need a file. Everything in this track happens in files you can see, and publishing them
          — the last chapter — is a five-minute job at the end rather than a prerequisite at the
          start.
        </Callout>
      </LessonSection>

      <LessonSection id="the-url-is-an-address-in-four-parts" title="The URL is an address in four parts">
        <P>
          The string in the address bar is not one thing. It is four, and once you can see the seams
          a lot of otherwise-mysterious behaviour stops being mysterious.
        </P>
        <CodeBlock
          label="One URL, taken apart"
          copyable={false}
          code={`https://codewithpurpose.org/courses/index.html
└─┬─┘   └────────┬────────┘└──┬──┘└────┬────┘
  │              │            │        │
protocol       domain        path     file`}
        />
        <LabelRows
          rows={[
            {
              label: "Protocol",
              text: "https means \"fetch this the usual way, encrypted\". The s is TLS, and it is what puts the padlock in the address bar. Plain http still works and browsers now warn about it.",
            },
            {
              label: "Domain",
              text: "Which machine. A name somebody rented, pointed at a server. This is the part you buy when you \"buy a domain\".",
            },
            {
              label: "Path",
              text: "Which folder on that machine. Very often it maps to real directories on a real disk, which is exactly how your own folder will work.",
            },
            {
              label: "File",
              text: "Which file. Usually invisible, because of a convention covered in chapter 3 — asking for a folder gets you the index.html inside it.",
            },
          ]}
        />
        <P>
          Two more pieces turn up regularly. A <Strong>query string</Strong> after a{" "}
          <Strong>?</Strong> passes information to the server —{" "}
          <Strong>?search=css</Strong>. A <Strong>fragment</Strong> after a{" "}
          <Strong>#</Strong> points at a place <em>within</em> the page, and never reaches the server
          at all — the browser handles it locally by scrolling.
        </P>
      </LessonSection>

      <LessonSection id="dns-turns-a-name-into-a-number" title="DNS turns a name into a number">
        <P>
          The network cannot route to <Strong>codewithpurpose.org</Strong>. It routes to numbers. So
          before anything else happens, the browser has to convert one to the other, and that lookup
          is called <Strong>DNS</Strong> — the Domain Name System.
        </P>
        <P>
          It works like a phone book that is spread across thousands of machines, and the answer is
          cached at every level: your browser, your operating system, your router, your internet
          provider. Most lookups never leave your building.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Ask for it yourself, from any terminal
nslookup codewithpurpose.org
# Name:    codewithpurpose.org
# Address: 76.76.21.21`}
        />
        <Callout tone="tip" title="This is why a new domain takes a while to work">
          When you point a domain at a new server, every cached copy of the old answer is still out
          there and still valid until it expires. That is DNS propagation, it takes minutes to hours,
          and it is not something being broken.
        </Callout>
      </LessonSection>

      <LessonSection id="the-server-sends-text-not-a-picture" title="The server sends text, not a picture">
        <P>
          This is the sentence worth stopping on. What comes back over the network is{" "}
          <Strong>text</Strong> — the same characters you will type into your editor. Not an image of
          a page. Not a layout. Not anything the server has drawn.
        </P>
        <CodeBlock
          label="What the server actually sends"
          copyable={false}
          code={`HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 187

<!doctype html>
<html>
  <head><title>My site</title></head>
  <body>
    <h1>Hello</h1>
    <p>This is a page.</p>
  </body>
</html>`}
          lineTones={{ 0: "ok", 1: "dim", 2: "dim" }}
        />
        <P>
          A few header lines, a blank line, then your file. The <Strong>200</Strong> is a status
          code, and you already know one of its siblings: <Strong>404</Strong> means the server
          looked and there is no such file.
        </P>
        <LabelRows
          rows={[
            { label: "200", text: "Here it is. What you want to see." },
            { label: "301 / 308", text: "It moved permanently; go here instead. The browser follows automatically." },
            { label: "404", text: "No such file. Almost always a typo in a path or a file that was renamed." },
            { label: "500", text: "The server broke while trying. Not your browser's fault, and not a URL you can fix." },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-browser-is-the-thing-that-draws-it" title="The browser is the thing that draws it">
        <P>
          Everything visual happens on the visitor&apos;s machine. The browser reads your text, works
          out what each part means, applies whatever styling it finds, calculates where every box
          goes, and paints pixels.
        </P>
        <RequestJourney />
        <P>
          Step through that and notice how little of it is yours. You write the file in step five.
          Everything before it is infrastructure you will never touch, and everything after it is the
          browser interpreting what you wrote.
        </P>
        <Callout tone="success" title="Which is the good news">
          You do not have to learn networking to build websites. You have to learn what to put in the
          file. That is HTML and CSS, and it is the rest of this track.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A website is files in a folder on a machine that is switched on and listening.",
          "A URL is a protocol, a domain, a path, and a file — plus an optional ?query and #fragment.",
          "A #fragment never reaches the server; the browser scrolls to it locally.",
          "DNS converts a domain name into an IP address, and the answer is cached everywhere, which is why domain changes take time to appear.",
          "The server sends text, not a picture. The same characters you type are what travels.",
          "200 means here it is, 404 means no such file, 500 means the server broke.",
          "The browser does all the drawing, on the visitor's machine.",
          "You write one step of the seven. The rest is infrastructure you never touch.",
        ]}
      />
    </div>
  );
}
