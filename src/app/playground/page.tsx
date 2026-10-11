import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import { PlaygroundIsland } from "@/components/playground/PlaygroundIsland";
import { PYODIDE_VERSION } from "@/components/playground/protocol";
import { LEARN_ML_HREF, LEARN_PYTHON_HREF, PROJECTS_HREF } from "@/lib/links";

const DESCRIPTION =
  "Write and run real Python, NumPy, pandas, scikit-learn and matplotlib in your browser, or drag blocks together to train a machine-learning model. Free, no sign-up, and your code never leaves your device.";

export const metadata: Metadata = {
  title: "Code Playground",
  description: DESCRIPTION,
  alternates: { canonical: "/playground/" },
  openGraph: {
    title: "Code Playground | CodeWithPurpose",
    description: DESCRIPTION,
    url: "/playground/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Playground | CodeWithPurpose",
    description: DESCRIPTION,
  },
};

const HOW_IT_WORKS = [
  {
    title: "Everything runs in your browser",
    body: `Python here is Pyodide ${PYODIDE_VERSION}: the real Python 3.12 interpreter, compiled to WebAssembly. Your code runs on your own device, in a background worker, so the page stays responsive even if a loop never ends.`,
  },
  {
    title: "Nothing is uploaded",
    body: "There is no server and no account. Your code is saved in this browser only, and Share packs it into the link itself, after the #, which browsers never send to a server.",
  },
  {
    title: "The ML builder writes real code",
    body: "Each block you drag in becomes a commented section of ordinary scikit-learn code, shown beside the pipeline. Open it in the editor whenever you want to change it by hand.",
  },
  {
    title: "Good to know",
    body: "The first Run downloads Python (about 10 MB), and big libraries load the first time you import them; after that your browser keeps a copy. Runs stop after 30 seconds, input() reads from an answer box you fill in first, and Python here has no internet access.",
  },
] as const;

export default function PlaygroundPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] pt-10 pb-12 md:pt-14 md:pb-16">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <Reveal>
            <p className="font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[var(--home-link-green)]">
              Code playground
            </p>
            <BlurText
              as="h1"
              text="Run real Python, right here"
              className="home-display mt-3 text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]"
            />
            <p className="mt-4 max-w-2xl text-lg leading-[1.5] text-[var(--home-ink-soft)]">
              Pick a starter or write your own, then press Run. Or open the ML builder
              and drag blocks together to train a real model. Free, no sign-up, and your
              code never leaves this page.
            </p>
            <p className="mt-3 text-[0.9375rem] text-[var(--home-ink-soft)]">
              Building a web page instead?{" "}
              <Link href="/playground/web/" className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
                Open the HTML &amp; CSS editor
              </Link>
              , or pick a guided{" "}
              <Link href={PROJECTS_HREF} className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
                project
              </Link>
              .
            </p>
          </Reveal>

          <div className="mt-8 md:mt-10">
            <PlaygroundIsland />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-it-works" className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 id="how-it-works" className="home-display text-[1.75rem] leading-[1.1] md:text-[2.25rem]">
            How it works
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="border-t-[0.5px] border-[var(--home-hairline-strong)] pt-5">
                <h3 className="text-[1.0625rem] font-semibold text-[var(--home-ink)]">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[var(--home-ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.9375rem] text-[var(--home-ink-soft)]">
            Want something to build? The{" "}
            <Link href={LEARN_PYTHON_HREF} className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
              Python track
            </Link>{" "}
            and the{" "}
            <Link href={LEARN_ML_HREF} className="font-medium text-[var(--home-link-green)] underline underline-offset-2">
              machine learning track
            </Link>{" "}
            have Run buttons on their Python examples, too.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
