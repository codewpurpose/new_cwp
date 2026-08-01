import { cn } from "@/lib/utils";

export type CalloutTone = "note" | "tip" | "success" | "warning" | "danger";

const TONE: Record<CalloutTone, { box: string; label: string }> = {
  note: {
    box: "bg-learn-info-bg text-learn-info-fg border-learn-info-line",
    label: "Note",
  },
  tip: {
    box: "bg-learn-sunken text-learn-strong border-learn-line",
    label: "Tip",
  },
  success: {
    box: "bg-learn-success-bg text-learn-success-fg border-learn-success-line",
    label: "Worth knowing",
  },
  warning: {
    box: "bg-learn-warning-bg text-learn-warning-fg border-learn-warning-line",
    label: "Careful",
  },
  danger: {
    box: "bg-learn-danger-bg text-learn-danger-fg border-learn-danger-line",
    label: "Don't do this",
  },
};

interface CalloutProps {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ tone = "note", title, children, className }: CalloutProps) {
  const { box, label } = TONE[tone];
  return (
    <aside
      className={cn(
        "mt-6 rounded-learn-lg border-[0.5px] p-5 text-[14px] leading-[1.6]",
        box,
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-80">
        {title ?? label}
      </p>
      <div className="mt-2">{children}</div>
    </aside>
  );
}
