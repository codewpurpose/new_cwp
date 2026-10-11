import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Code2, Globe, MessageCircle, X } from "lucide-react";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PromptBuilder } from "@/components/resources/PromptBuilder";
import {
  DONTS,
  DOS,
  GLOSSARY,
  START_STEPS,
  TOOL_GROUPS,
  type ToolGroup,
} from "@/components/resources/ai-coding-content";
import { DISCORD_HREF, LEARN_VIBECODING_HREF, PLAYGROUND_HREF } from "@/lib/links";

const TITLE = "AI-Coding Resources";
const DESCRIPTION =
  "A free, student-friendly guide to learning to code with AI tools responsibly: picking a tool, prompts that teach, a healthy workflow and staying safe.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resources/ai-coding/" },
  openGraph: {
    title: `${TITLE} | CodeWithPurpose`,
    description: DESCRIPTION,
    url: "/resources/ai-coding/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | CodeWithPurpose`,
    description: DESCRIPTION,
  },
};

const EYEBROW = "text-[11px] uppercase tracking-[0.16em] text-[#397554]";
const H2 = "home-serif text-[1.75rem] leading-[1.1] md:text-[2.25rem]";
const LEAD = "mt-3 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base";
const DIVIDER = "scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)]";

const GROUP_ICONS: Record<ToolGroup["id"], typeof MessageCircle> = {
  chat: MessageCircle,
  editor: Code2,
  browser: Globe,
};

function SectionIntro({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <div>
      <p className={EYEBROW}>{eyebrow}</p>
      <h2 id={id} className={`${H2} mt-2`}>
        {title}
      </h2>
      {lead && <p className={LEAD}>{lead}</p>}
    </div>
  );
}

function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`home-arrow-link text-[15px] ${className}`}>
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
      <span className="sr-only"> (official site, opens in a new tab)</span>
    </a>
  );
}

export default function AiCodingResourcesPage() {
  return (
    <PageShell>
      <PageHero
        title="Learn to code with AI, the right way"
        description="AI can explain errors, give hints and review your work. Used well, it helps you learn faster. This page shows you how."
      >
        <a href="#start" className="home-btn home-btn-fill">
          Start here
        </a>
        <a href="#prompt-builder" className="home-btn home-btn-outline">
          Build a prompt
        </a>
      </PageHero>

      {/* Start here */}
      <PageSection id="start" className="scroll-mt-24">
        <SectionIntro id="start-heading" eyebrow="Start here" title="Three steps to get going" />
        <ol aria-labelledby="start-heading" className="mt-8 grid gap-4 md:grid-cols-3">
          {START_STEPS.map((step, i) => {
            const internal = step.cta.href.startsWith("/");
            const cta = (
              <>
                {step.cta.label}
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </>
            );
            return (
              <li
                key={step.title}
                className="flex flex-col rounded-[20px] border border-[#3e7f5c]/20 bg-[#dbefdb]/60 p-6"
              >
                <span
                  aria-hidden="true"
                  className="home-mono grid size-9 place-items-center rounded-full bg-white text-sm font-medium text-[#3e7f5c] ring-1 ring-[#3e7f5c]/25"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[1.0625rem] font-semibold leading-[1.3]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">{step.body}</p>
                <div className="mt-auto pt-4">
                  {internal ? (
                    <Link href={step.cta.href} className="home-arrow-link text-[15px]">
                      {cta}
                    </Link>
                  ) : (
                    <a href={step.cta.href} className="home-arrow-link text-[15px]">
                      {cta}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </PageSection>

      {/* Prompt builder */}
      <PageSection id="prompt-builder" className={DIVIDER}>
        <SectionIntro
          id="prompt-builder-heading"
          eyebrow="Prompt builder"
          title="Ask in a way that keeps you learning"
          lead="Pick what you need, fill in the blanks and copy the result into any AI chat."
        />
        <div className="mt-8">
          <PromptBuilder />
        </div>
      </PageSection>

      {/* Tools */}
      <PageSection id="tools" className={DIVIDER}>
        <SectionIntro
          id="tools-heading"
          eyebrow="Tools"
          title="You only need one to start"
          lead="Grouped by how you'd use them. Plans change often, so check each official site for current details."
        />
        <div className="mt-10 space-y-10">
          {TOOL_GROUPS.map((group) => {
            const Icon = GROUP_ICONS[group.id];
            const headingId = `tools-${group.id}`;
            return (
              <section key={group.id} aria-labelledby={headingId}>
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--home-pistachio)] text-[#3e7f5c]"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 id={headingId} className="text-[1.0625rem] font-semibold leading-[1.3]">
                      {group.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-[1.5] text-[var(--home-ink-quiet)]">{group.blurb}</p>
                  </div>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="home-card flex flex-col rounded-[18px] p-5">
                      <h4 className="home-serif text-[1.25rem] leading-[1.2]">{tool.name}</h4>
                      <p className="mt-1.5 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">{tool.description}</p>
                      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
                        <ExternalLink href={tool.href}>Visit site</ExternalLink>
                        {tool.student && (
                          <ExternalLink href={tool.student.href} className="text-sm">
                            {tool.student.label}
                          </ExternalLink>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-[1.6] text-[var(--home-ink-quiet)]">
          Listed in no particular order. CodeWithPurpose isn&rsquo;t affiliated with any of these companies.
        </p>
      </PageSection>

      {/* Safety */}
      <PageSection id="safety" className={DIVIDER}>
        <SectionIntro
          id="safety-heading"
          eyebrow="Stay safe"
          title="A few friendly rules"
          lead="AI is helpful, but it isn't always right and it isn't a place for private information."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[20px] border border-[#3e7f5c]/25 bg-[#dbefdb]/55 p-6">
            <h3 className="flex items-center gap-2 text-[1.0625rem] font-semibold text-[var(--home-moss)]">
              <Check aria-hidden="true" className="size-5 text-[#3e7f5c]" strokeWidth={2.2} />
              Do
            </h3>
            <ul className="mt-3 space-y-2.5">
              {DOS.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#3e7f5c]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-[var(--home-hairline-strong)] bg-white p-6">
            <h3 className="flex items-center gap-2 text-[1.0625rem] font-semibold">
              <X aria-hidden="true" className="size-5 text-[var(--home-ink-quiet)]" strokeWidth={2.2} />
              Don&rsquo;t
            </h3>
            <ul className="mt-3 space-y-2.5">
              {DONTS.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--home-ink-quiet)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      {/* Glossary */}
      <PageSection id="glossary" className={DIVIDER}>
        <SectionIntro id="glossary-heading" eyebrow="Glossary" title="Words you'll hear a lot" />
        <dl aria-labelledby="glossary-heading" className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className="border-t-[0.5px] border-[var(--home-hairline)] py-4">
              <dt className="home-mono text-sm font-medium text-[#3e7f5c]">{entry.term}</dt>
              <dd className="mt-1 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      {/* Next steps */}
      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)]">
        <div className="rounded-[24px] bg-[var(--home-pistachio)] px-6 py-10 text-center md:px-10 md:py-14">
          <h2 className="home-serif mx-auto max-w-2xl text-[1.75rem] leading-[1.1] text-balance md:text-[2.25rem]">
            Ready to build something?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
            Our free Vibe Coding course walks you through building real projects with AI, one step at a time.
            Or try some code right now in the playground.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <Link href={LEARN_VIBECODING_HREF} className="home-btn home-btn-fill">
              Start the Vibe Coding course
            </Link>
            <Link href={PLAYGROUND_HREF} className="home-btn home-btn-outline bg-white/70">
              Open the playground
            </Link>
          </div>
          <p className="mt-5 text-sm text-[var(--home-ink-soft)]">
            Questions along the way?{" "}
            <a href={DISCORD_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              Ask in our Discord
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </PageSection>
    </PageShell>
  );
}
