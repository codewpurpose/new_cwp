import { Brain, LayoutTemplate, SquareTerminal } from "lucide-react";
import type { ProjectTrack } from "@/lib/projects";

const ICONS = { python: SquareTerminal, web: LayoutTemplate, ml: Brain } as const;

/** A small mint badge marking a project's track. Decorative. */
export function TrackIcon({ track, className = "" }: { track: ProjectTrack; className?: string }) {
  const Icon = ICONS[track];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dbefdb] text-[#3e7f5c] ${className}`}
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  );
}
