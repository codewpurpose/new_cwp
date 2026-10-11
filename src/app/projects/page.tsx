import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProjectFilter, type ProjectCardItem } from "@/components/projects/ProjectFilter";
import { COURSES_HREF, PLAYGROUND_HREF, PROJECTS_HREF } from "@/lib/links";
import { PROJECTS, PROJECT_TRACKS, trackLabel } from "@/lib/projects";

const DESCRIPTION =
  "Free, beginner-friendly build projects in Python, HTML and CSS, and machine learning. Follow short steps, peek at hints, and run everything in your browser.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: PROJECTS_HREF },
  openGraph: {
    title: "Projects | CodeWithPurpose",
    description: DESCRIPTION,
    url: PROJECTS_HREF,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | CodeWithPurpose",
    description: DESCRIPTION,
  },
};

const HOW_IT_GOES = [
  { title: "Pick one that sounds fun", body: "Each project is small enough to finish and starts from code that already runs." },
  { title: "Follow the steps", body: "Short steps, each with a hint tucked away for when you get stuck." },
  { title: "Check, then stretch", body: "Compare with an example solution, then try the stretch goal to make it yours." },
] as const;

export default function ProjectsPage() {
  // Only what a card draws crosses into the client filter, not the code.
  const items: ProjectCardItem[] = PROJECTS.map((project) => ({
    slug: project.slug,
    href: `${PROJECTS_HREF}${project.slug}/`,
    track: project.track,
    trackLabel: trackLabel(project.track),
    title: project.title,
    pitch: project.pitch,
    skills: project.skills,
  }));

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] pt-10 pb-12 md:pt-14 md:pb-16">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <p className="font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[var(--home-link-green)]">
            Projects
          </p>
          <h1 className="home-display mt-3 max-w-3xl text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]">
            Build something real, one small step at a time
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-[1.5] text-[var(--home-ink-soft)]">
            Guided projects for when you&apos;ve learned a little and want to make something with it.
            Everything runs free in your browser, with nothing to install.
          </p>

          <ol className="mt-10 grid max-w-5xl gap-x-8 gap-y-6 md:grid-cols-3">
            {HOW_IT_GOES.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--home-pistachio)] font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-medium text-[var(--home-moss)]"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-[1rem] font-semibold text-[var(--home-ink)]">{item.title}</h2>
                  <p className="mt-1 text-[0.9375rem] leading-[1.55] text-[var(--home-ink-soft)]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="all-projects" className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 id="all-projects" className="sr-only">
            All projects
          </h2>
          <ProjectFilter items={items} tracks={PROJECT_TRACKS} />

          <div className="mt-14 rounded-2xl bg-[#dbefdb]/60 px-6 py-6 md:flex md:items-center md:justify-between md:gap-8 md:px-8">
            <p className="max-w-2xl text-[0.9375rem] leading-[1.6] text-[var(--home-moss)]">
              Want to brush up first? Every project links to the course chapters that help, and the
              playground is always open if you&apos;d rather just tinker.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
              <a href={COURSES_HREF} className="home-btn home-btn-outline">
                Browse courses
              </a>
              <a href={PLAYGROUND_HREF} className="home-btn home-btn-outline">
                Open the playground
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
