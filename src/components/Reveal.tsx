import type { ReactNode } from "react";

/** Content is visible immediately, including during hydration and without JavaScript. */
export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}
