import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";
import { PROJECTS, getProject, trackLabel } from "@/lib/projects";

export const alt = "A guided project from CodeWithPurpose";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    eyebrow: project ? `${trackLabel(project.track)} project` : "Projects",
    title: project?.title ?? "Guided build projects",
  });
}
