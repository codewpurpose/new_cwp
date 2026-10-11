import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown, Lightbulb } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { InlineCode } from "@/components/projects/InlineCode";
import { CodeFiles, PlaygroundButton } from "@/components/projects/ProjectCode";
import { TrackIcon } from "@/components/projects/TrackIcon";
import { chapterHref, getChapter, getTrack } from "@/lib/learn-nav";
import { PROJECTS_HREF } from "@/lib/links";
import { PROJECTS, getProject, trackLabel, type Project } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projects" };
  const title = `${project.title} project`;
  const url = `${PROJECTS_HREF}${slug}/`;
  return {
    title,
    description: project.pitch,
    alternates: { canonical: url },
    openGraph: { title: `${title} | CodeWithPurpose`, description: project.pitch, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} | CodeWithPurpose`, description: project.pitch },
  };
}

/** Resolve chapter links at build time; a renamed slug fails loudly here. */
function resolveChapters(project: Project) {
  return project.chapters.map(({ track, slug }) => {
    const chapter = getChapter(track, slug);
    if (!chapter) throw new Error(`Project "${project.slug}" links to a missing chapter: ${track}/${slug}`);
    return { href: chapterHref(track, slug), title: chapter.title, course: getTrack(track).title };
  });
}

const SECTION_TITLE = "home-display text-[1.5rem] leading-[1.15] md:text-[1.875rem]";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const chapters = resolveChapters(project);
  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const isWeb = project.starter.kind === "web";

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] pt-8 pb-12 md:pt-12 md:pb-14">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[60rem] px-5 md:px-10">
          <a href={PROJECTS_HREF} className="home-arrow-link text-sm">
            <span className="home-arrow rotate-180" aria-hidden="true">→</span> All projects
          </a>
          <div className="mt-8 flex items-center gap-3">
            <TrackIcon track={project.track} />
            <span className="font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[#3e7f5c]">
              {trackLabel(project.track)} project
            </span>
          </div>
          <h1 className="home-display mt-4 text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem]">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-[1.55] text-[var(--home-ink-soft)]">{project.intro}</p>

          <div className="mt-6">
            <h2 className="text-[0.8125rem] font-medium text-[var(--home-ink-quiet)]">Skills you&apos;ll practise</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-[#dbefdb] px-3 py-1 text-[0.8125rem] font-medium text-[var(--home-moss)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PlaygroundButton code={project.starter} label="Open starter in playground" />
            <a href="#steps" className="home-btn home-btn-outline">
              See the steps
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[60rem] px-5 py-12 md:px-10 md:py-16">
        <section id="steps" aria-labelledby="steps-title" className="scroll-mt-24">
          <h2 id="steps-title" className={SECTION_TITLE}>
            Steps
          </h2>
          <ol className="mt-6 grid gap-4">
            {project.steps.map((step, stepIndex) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-5 md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--home-pistachio)] font-[family-name:var(--learn-font-mono)] text-[0.875rem] font-medium text-[var(--home-moss)]"
                >
                  {stepIndex + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.3] text-[var(--home-ink)]">
                    <span className="sr-only">Step {stepIndex + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-[var(--home-ink-soft)]">
                    <InlineCode text={step.body} />
                  </p>
                  {step.hint && (
                    <details className="group mt-3">
                      <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1.5 rounded-md text-[0.875rem] font-medium text-[#3e7f5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] [&::-webkit-details-marker]:hidden">
                        <Lightbulb aria-hidden="true" className="size-4" strokeWidth={2} />
                        <span className="group-open:hidden">Show a hint</span>
                        <span className="hidden group-open:inline">Hide the hint</span>
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                          strokeWidth={2}
                        />
                      </summary>
                      <p className="mt-2 rounded-lg bg-[#eef6ee] px-4 py-3 text-[0.9375rem] leading-[1.6] text-[var(--home-moss)]">
                        <InlineCode text={step.hint} />
                      </p>
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="starter-title" className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="starter-title" className={SECTION_TITLE}>
                Starter code
              </h2>
              <p className="mt-2 text-[0.9375rem] text-[var(--home-ink-soft)]">
                {isWeb
                  ? "It already shows something on the page. The TODO comments mark where to start."
                  : "It already runs. The TODO comments mark where to start."}
              </p>
            </div>
            <PlaygroundButton code={project.starter} label="Open in playground" variant="outline" />
          </div>
          <div className="mt-5">
            <CodeFiles code={project.starter} />
          </div>
        </section>

        <section aria-labelledby="solution-title" className="mt-14">
          <h2 id="solution-title" className={SECTION_TITLE}>
            Example solution
          </h2>
          <p className="mt-2 text-[0.9375rem] text-[var(--home-ink-soft)]">
            One way to finish it. Have a go first; yours doesn&apos;t need to match.
          </p>
          <details className="group mt-5 rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)]">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-3 font-medium text-[var(--home-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Reveal the solution</span>
              <span className="hidden group-open:inline">Hide the solution</span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 text-[#3e7f5c] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                strokeWidth={2}
              />
            </summary>
            <div className="border-t-[0.5px] border-[var(--home-hairline)] p-4 md:p-5">
              <CodeFiles code={project.solution} />
              <div className="mt-4">
                <PlaygroundButton code={project.solution} label="Open solution in playground" variant="outline" />
              </div>
            </div>
          </details>
        </section>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <section aria-labelledby="stretch-title" className="rounded-2xl bg-[#dbefdb]/70 p-6">
            <h2 id="stretch-title" className="text-[1.0625rem] font-semibold text-[var(--home-moss)]">
              Stretch goal
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[var(--home-moss)]">
              <InlineCode text={project.stretch} />
            </p>
          </section>
          <section
            aria-labelledby="chapters-title"
            className="rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-6"
          >
            <h2 id="chapters-title" className="text-[1.0625rem] font-semibold text-[var(--home-ink)]">
              Chapters that help
            </h2>
            <ul className="mt-3 grid gap-3">
              {chapters.map((chapter) => (
                <li key={chapter.href}>
                  <a href={chapter.href} className="group block">
                    <span className="text-[0.9375rem] font-medium text-[var(--home-link-green)] underline decoration-[#cde4cd] underline-offset-2 group-hover:decoration-current">
                      {chapter.title}
                    </span>
                    <span className="block text-[0.8125rem] text-[var(--home-ink-quiet)]">{chapter.course}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav aria-label="More projects" className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-[0.5px] border-[var(--home-hairline-strong)] pt-6">
          <a href={PROJECTS_HREF} className="home-arrow-link text-[0.9375rem]">
            <span className="home-arrow rotate-180" aria-hidden="true">→</span> All projects
          </a>
          <a href={`${PROJECTS_HREF}${next.slug}/`} className="home-arrow-link text-[0.9375rem]">
            Next: {next.title} <span className="home-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </PageShell>
  );
}
