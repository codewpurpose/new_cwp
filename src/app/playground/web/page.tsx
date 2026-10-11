import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { WebPlaygroundIsland } from "@/components/webplay/WebPlaygroundIsland";
import { LEARN_HTML_CSS_HREF, PLAYGROUND_HREF } from "@/lib/links";

const DESCRIPTION =
  "Write HTML, CSS and JavaScript and watch the page update as you type. Free, no sign-up, and your code stays in your browser.";

export const metadata: Metadata = {
  title: "Web Playground",
  description: DESCRIPTION,
  alternates: { canonical: "/playground/web/" },
  openGraph: {
    title: "Web Playground | CodeWithPurpose",
    description: DESCRIPTION,
    url: "/playground/web/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Playground | CodeWithPurpose",
    description: DESCRIPTION,
  },
};

const NOTES = [
  {
    title: "It updates as you type",
    body: "Pause for a moment and the preview redraws. Switch between the HTML, CSS and JS tabs; they all feed the same page.",
  },
  {
    title: "Nothing leaves your browser",
    body: "Your code is saved in this browser only. Share puts it in the link itself, after the #, which browsers never send to a server.",
  },
  {
    title: "The preview is walled off",
    body: "It runs in a sandboxed frame with no network access, so external images, fonts and scripts won't load. Inline code and data: URLs work.",
  },
] as const;

export default function WebPlaygroundPage() {
  return (
    <PageShell>
      <section className="border-b-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <p className="font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-medium tracking-[0.12em] text-[var(--home-link-green)] uppercase">
            Web playground
          </p>
          <h1 className="home-display mt-3 text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]">
            Build a web page, live
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-[1.5] text-[var(--home-ink-soft)]">
            Pick a starter or clear it out and write your own. Change one thing, watch the preview,
            and keep going.
          </p>

          <div className="mt-8 md:mt-10">
            <WebPlaygroundIsland />
          </div>
        </div>
      </section>

      <section aria-labelledby="web-playground-notes" className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 id="web-playground-notes" className="home-display text-[1.75rem] leading-[1.1] md:text-[2.25rem]">
            Good to know
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {NOTES.map((item) => (
              <div key={item.title} className="border-t-[0.5px] border-[var(--home-hairline-strong)] pt-5">
                <h3 className="text-[1.0625rem] font-semibold text-[var(--home-ink)]">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[var(--home-ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.9375rem] text-[var(--home-ink-soft)]">
            New to all this? The{" "}
            <Link href={LEARN_HTML_CSS_HREF} className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
              HTML and CSS track
            </Link>{" "}
            starts from what a web page is. Prefer Python? Try the{" "}
            <Link href={PLAYGROUND_HREF} className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
              Python playground
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
