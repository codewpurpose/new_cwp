import { CircleCheck, CircleX, Info, Lightbulb, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutTone = "note" | "tip" | "success" | "warning" | "danger";

/**
 * Each tone pairs a colour with an icon and a label, so the meaning never rests
 * on colour alone. The left rule (`lr-callout`, globals.css reader block) takes
 * the tone's line colour via --lr-callout-rule.
 */
const TONE: Record<CalloutTone, { box: string; label: string; icon: LucideIcon; rule: string }> = {
  note: {
    box: "bg-learn-info-bg text-learn-info-fg border-learn-info-line",
    label: "Note",
    icon: Info,
    rule: "#7fa9c6",
  },
  tip: {
    box: "bg-learn-quiet-wash text-learn-strong border-learn-success-line",
    label: "Tip",
    icon: Lightbulb,
    rule: "var(--learn-accent)",
  },
  success: {
    box: "bg-learn-success-bg text-learn-success-fg border-learn-success-line",
    label: "Key point",
    icon: CircleCheck,
    rule: "var(--learn-ink-strong)",
  },
  warning: {
    box: "bg-learn-warning-bg text-learn-warning-fg border-learn-warning-line",
    label: "Careful",
    icon: TriangleAlert,
    rule: "#d9a441",
  },
  danger: {
    box: "bg-learn-danger-bg text-learn-danger-fg border-learn-danger-line",
    label: "Don't do this",
    icon: CircleX,
    rule: "#c4644f",
  },
};

interface CalloutProps {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ tone = "note", title, children, className }: CalloutProps) {
  const { box, label, icon: Icon, rule } = TONE[tone];
  return (
    <aside
      className={cn(
        "lr-callout mt-7 rounded-learn-lg border-[0.5px] py-4 pl-5 pr-5 text-[14.5px] leading-[1.65]",
        box,
        className,
      )}
      style={{ "--lr-callout-rule": rule } as React.CSSProperties}
    >
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] opacity-90">
        <Icon className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
        {title ?? label}
      </p>
      <div className="mt-1.5">{children}</div>
    </aside>
  );
}
