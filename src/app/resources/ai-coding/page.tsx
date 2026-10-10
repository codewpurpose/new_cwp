import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CopyPromptButton } from "@/components/resources/CopyPromptButton";
import {
  AI_TOOLS,
  GLOSSARY,
  PROMPT_TEMPLATES,
  SAFETY_RULES,
  WORKFLOW_STEPS,
} from "@/components/resources/ai-coding-content";
import { DISCORD_HREF, JOIN_HREF, LEARN_VIBECODING_HREF, PLAYGROUND_HREF } from "@/lib/links";

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
const LEAD = "mt-4 max-w-2xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base";

function SectionIntro({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead: string; id: string }) {
  return (
    <Reveal>
      <p className={EYEBROW}>{eyebrow}</p>
      <h2 id={id} className={`${H2} mt-2`}>
        {title}
      </h2>
      <p className={LEAD}>{lead}</p>
    </Reveal>
  );
}

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`home-arrow-link ${className}`}>
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
      <span className="sr-only"> (external site, opens in a new tab)</span>
    </a>
  );
}

export default function AiCodingResourcesPage() {
  return (
    <PageShell>
      <PageHero
        title="Learn to code with AI, the right way"
        description="AI tools can explain errors, suggest code and review your work. Used well, they help you learn faster. Used carelessly, they do the learning for you. This guide shows how to stay on the right side of that line."
      >
        <Link href={LEARN_VIBECODING_HREF} className="home-btn home-btn-fill">
          Start the Vibe Coding course
        </Link>
        <a href={PLAYGROUND_HREF} className="home-btn home-btn-outline">
          Try code in your browser
        </a>
      </PageHero>

      {/* Pick a tool */}
      <PageSection id="tools" className="scroll-mt-24">
        <SectionIntro
          id="tools-heading"
          eyebrow="Pick a tool"
          title="Popular AI coding assistants"
          lead="You only need one to start. Most of these offer a free tier or a free trial, and some have programs for students. Plans change often, so check each official site for current details."
        />
        <ul aria-labelledby="tools-heading" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_TOOLS.map((tool, i) => (
            <li key={tool.name} className="flex">
              <Reveal delay={(i % 3) * 0.05} className="flex w-full">
                <div className="home-card home-lift flex w-full flex-col rounded-[20px] p-6">
                  <h3 className="home-serif text-[1.375rem]">{tool.name}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[var(--home-ink)]">{tool.description}</p>
                  <p className="mt-3 text-sm leading-[1.55] text-[var(--home-ink-soft)]">
                    <span className="font-medium text-[var(--home-ink)]">Good for: </span>
                    {tool.goodFor}
                  </p>
                  <div className="mt-auto flex flex-col gap-2 pt-5">
                    <ExternalLink href={tool.href}>Visit {tool.name}</ExternalLink>
                    {tool.student && (
                      <ExternalLink href={tool.student.href} className="text-sm">
                        {tool.student.label}
                      </ExternalLink>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-[1.6] text-[var(--home-ink-quiet)]">
          Listed in no particular order. CodeWithPurpose isn&rsquo;t affiliated with any of these companies.
        </p>
      </PageSection>

      {/* Prompts */}
      <PageSection id="prompts" className="scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)]">
        <SectionIntro
          id="prompts-heading"
          eyebrow="Prompt templates"
          title="Prompts that teach you, not just answer you"
          lead="Copy a template, fill in the brackets, and paste it into any AI tool. Each one keeps you doing the thinking."
        />
        <ul aria-labelledby="prompts-heading" className="mt-10 grid gap-4 lg:grid-cols-2">
          {PROMPT_TEMPLATES.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal delay={(i % 2) * 0.05} className="flex w-full">
                <div className="home-card home-lift flex w-full flex-col rounded-[20px] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[1.0625rem] font-semibold leading-[1.3]">{item.title}</h3>
                      <p className="mt-1 text-sm text-[var(--home-ink-soft)]">{item.why}</p>
                    </div>
                    <div className="relative z-[1]">
                      <CopyPromptButton text={item.prompt} title={item.title} />
                    </div>
                  </div>
                  <pre className="home-mono mt-4 whitespace-pre-wrap break-words rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] p-4 text-[13px] leading-[1.6] text-[var(--home-ink)]">
                    {item.prompt}
                  </pre>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Workflow */}
      <PageSection id="workflow" className="scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionIntro
            id="workflow-heading"
            eyebrow="A healthy AI workflow"
            title="Think first, then ask"
            lead="The order matters. Each step builds on the one before, and skipping ahead is how you end up with code that works but that you don't understand."
          />
          <ol aria-labelledby="workflow-heading" className="space-y-0">
            {WORKFLOW_STEPS.map((step, i) => (
              <li key={step.title} className="border-b-[0.5px] border-[var(--home-hairline)] py-5 first:pt-0">
                <Reveal delay={i * 0.02} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="home-mono grid size-9 shrink-0 place-items-center rounded-full bg-[#dbefdb] text-sm font-medium text-[var(--home-moss)]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold leading-[1.3]">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>

      {/* Safety */}
      <PageSection id="safety" className="scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)]">
        <SectionIntro
          id="safety-heading"
          eyebrow="Stay safe"
          title="Five rules before you hit enter"
          lead="AI tools are useful, but they aren't always right and they aren't a safe place for private information."
        />
        <ul aria-labelledby="safety-heading" className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_RULES.map((rule, i) => (
            <li key={rule.title}>
              <Reveal delay={(i % 3) * 0.05} className="border-l-2 border-[#397554] pl-4">
                <h3 className="text-[1.0625rem] font-semibold leading-[1.3]">{rule.title}</h3>
                <p className="mt-1 text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">{rule.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Glossary */}
      <PageSection id="glossary" className="scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)]">
        <SectionIntro
          id="glossary-heading"
          eyebrow="Glossary"
          title="Words you'll hear a lot"
          lead="Plain definitions for the terms that come up most when people talk about AI and code."
        />
        <Reveal>
          <dl aria-labelledby="glossary-heading" className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {GLOSSARY.map((entry) => (
              <div key={entry.term} className="border-t-[0.5px] border-[var(--home-hairline)] py-5">
                <dt className="home-mono text-sm font-medium text-[var(--home-moss)]">{entry.term}</dt>
                <dd className="mt-1.5 text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageSection>

      {/* Closing CTA */}
      <section className="border-t-[0.5px] border-[var(--home-hairline)] py-16 md:py-28">
        <div className="mx-auto w-full max-w-[85rem] px-5 text-center md:px-10">
          <h2 className="home-serif mx-auto max-w-3xl text-[1.75rem] leading-[1.08] text-balance md:text-[2.5rem]">
            Ready to build something with AI?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
            Our free Vibe Coding course walks you through building real projects with AI, one step at a
            time. Questions along the way? Ask the community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link href={LEARN_VIBECODING_HREF} className="home-btn home-btn-fill">
              Start the Vibe Coding course
            </Link>
            <a href={DISCORD_HREF} target="_blank" rel="noreferrer" className="home-btn home-btn-outline">
              Join our Discord
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href={JOIN_HREF} className="home-btn home-btn-outline">
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
