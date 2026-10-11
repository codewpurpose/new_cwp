import type { ReactNode } from "react";

/** Keep buttons stationary so pointer movement does not trigger layout reads and renders. */
export default function Magnet({ children, className = "" }: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  return <span className={`inline-block ${className}`}>{children}</span>;
}
