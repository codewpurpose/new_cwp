import type { ReactNode } from "react";

/** A light hover tint; opacity avoids repainting a moving background gradient. */
export default function GlareHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** Legacy prop retained for existing callers. */
  glareOpacity?: number;
}) {
  return (
    <div className={`group/glare relative overflow-hidden ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#dbefdb]/15 opacity-0 transition-opacity duration-200 group-hover/glare:opacity-100 group-focus-within/glare:opacity-100 motion-reduce:transition-none"
      />
    </div>
  );
}
