import { cn } from "@/lib/utils";

export type TagTone = "mint" | "neutral" | "accent" | "warning" | "danger";

const TONE: Record<TagTone, string> = {
  mint: "bg-learn-quiet text-learn-strong",
  neutral: "bg-learn-sunken text-learn-muted",
  accent: "bg-learn-accent text-white",
  warning: "bg-learn-warning-bg text-learn-warning-fg",
  danger: "bg-learn-danger-bg text-learn-danger-fg",
};

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}

/** The uppercase pill that appeared in nine hand-written variants. */
export function Tag({ children, tone = "mint", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
