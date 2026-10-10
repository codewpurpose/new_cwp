import type { ReactNode } from "react";

/** A restrained CSS lift without pointer tracking or a JavaScript spring. */
export default function TiltedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** Legacy props retained for existing lesson callers. */
  rotateAmplitude?: number;
  scaleOnHover?: number;
}) {
  return (
    <div className={`relative motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}
