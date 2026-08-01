import Link from "next/link";
import { Tag } from "@/components/learn/primitives/Tag";

interface LessonCardProps {
  href: string;
  title: string;
  description: string;
  tags: readonly string[];
  /** Image for the ML track, icon tile for Vibe Coding — the only real difference. */
  media: React.ReactNode;
  meta?: React.ReactNode;
  cta?: string;
}

export function LessonCard({
  href,
  title,
  description,
  tags,
  media,
  meta,
  cta = "Start lesson",
}: LessonCardProps) {
  return (
    <Link
      href={href}
      className="home-card home-lift home-template-row learn-focusable group block overflow-hidden rounded-learn-xl"
    >
      {media}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h3 className="mt-4 text-xl md:text-2xl">{title}</h3>
        <p className="mt-3 text-[15px] leading-[1.55] text-learn-muted">{description}</p>
        {meta && <p className="mt-4 text-[0.78rem] text-learn-subtle">{meta}</p>}
        <p className="home-arrow-link mt-4">
          {cta} <span className="home-row-arrow text-learn-link">→</span>
        </p>
      </div>
    </Link>
  );
}
