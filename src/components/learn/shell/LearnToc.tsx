"use client";

import { useMemo } from "react";
import type { LearnHeading } from "@/lib/learn-types";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface LearnTocProps {
  headings: readonly LearnHeading[];
  label?: string;
  /** Below this many headings a table of contents is noise, so render nothing. */
  minHeadings?: number;
}

export function LearnToc({ headings, label = "On this page", minHeadings = 2 }: LearnTocProps) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const { activeId, beginProgrammaticScroll } = useScrollSpy(ids);

  if (headings.length < minHeadings) return null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    beginProgrammaticScroll(id);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

    // replaceState, not pushState — a history entry per heading across 29
    // chapters makes the back button useless.
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label={label}>
      <p className="learn-nav-heading">{label}</p>
      <ul className="learn-toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              data-level={heading.level}
              // "location" is the correct ARIA value for current position
              // within a page; "page" would mean the current document.
              aria-current={activeId === heading.id ? "location" : undefined}
              className="learn-toc-link"
              onClick={(event) => handleClick(event, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
