import { cn } from "@/lib/utils";

interface Step {
  label: React.ReactNode;
  detail?: React.ReactNode;
  note?: React.ReactNode;
}

interface StepListProps {
  steps: readonly Step[];
  /** "timeline" draws a connecting rail; "inline" is a compact numbered list. */
  variant?: "inline" | "timeline";
  startAt?: number;
  className?: string;
}

export function StepList({ steps, variant = "inline", startAt = 1, className }: StepListProps) {
  if (variant === "timeline") {
    return (
      <ol className={cn("relative mt-6 space-y-4", className)}>
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[15px] top-2 w-px bg-learn-line"
        />
        {steps.map((step, index) => (
          <li key={index} className="relative flex gap-4">
            <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-learn-inverse bg-learn-quiet text-[13px] font-semibold text-learn-strong">
              {startAt + index}
            </span>
            <div className="flex-1 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
              <p className="text-[15px] font-semibold text-learn-strong">{step.label}</p>
              {step.detail && (
                <p className="mt-2 text-[14px] leading-[1.5] text-learn-muted">{step.detail}</p>
              )}
              {step.note && (
                <p className="mt-2 text-[13px] leading-[1.5] text-learn-accent-text">{step.note}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("mt-6 space-y-3", className)}>
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-learn-quiet text-xs font-semibold text-learn-strong">
            {startAt + index}
          </span>
          <div className="text-[15px] leading-[1.5] text-learn-strong">
            {step.label}
            {step.detail && (
              <p className="mt-1 text-[14px] leading-[1.5] text-learn-muted">{step.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
