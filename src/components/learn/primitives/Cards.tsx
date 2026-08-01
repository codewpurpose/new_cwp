import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * ChecklistCard — the arrow-bullet list that appeared in four lessons.
 * ---------------------------------------------------------------------- */

const MARKER = {
  arrow: "→",
  check: "✓",
  dot: "•",
} as const;

interface ChecklistCardProps {
  title?: string;
  intro?: React.ReactNode;
  items: readonly React.ReactNode[];
  marker?: keyof typeof MARKER;
  className?: string;
}

export function ChecklistCard({
  title,
  intro,
  items,
  marker = "arrow",
  className,
}: ChecklistCardProps) {
  return (
    <div
      className={cn(
        "mt-10 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-6 md:p-8",
        className,
      )}
    >
      {title && <h3 className="text-lg text-learn-strong">{title}</h3>}
      {intro && <p className="mt-3 text-[15px] leading-[1.5] text-learn-muted">{intro}</p>}
      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-[14px] leading-[1.5] text-learn-strong"
          >
            <span aria-hidden="true" className="mt-0.5 text-learn-accent-text">
              {MARKER[marker]}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * TakeawayCard — previously only IntroLesson had one. Now every chapter closes
 * with the same shape.
 * ---------------------------------------------------------------------- */

interface TakeawayCardProps {
  title?: string;
  items: readonly React.ReactNode[];
}

export function TakeawayCard({ title = "Key takeaways", items }: TakeawayCardProps) {
  return (
    <div className="learn-on-inverse mt-12 rounded-learn-lg bg-learn-inverse p-6 text-learn-on-inverse md:p-8">
      <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em]">{title}</h3>
      <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] opacity-90">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * CompareGrid — the two-up "good for / careful with" grid.
 * ---------------------------------------------------------------------- */

interface CompareGridProps {
  columns?: 2 | 3;
  items: readonly {
    title: React.ReactNode;
    tone?: "neutral" | "positive" | "caution";
    children: React.ReactNode;
  }[];
  className?: string;
}

const COMPARE_TONE = {
  neutral: "border-learn-line",
  positive: "border-learn-accent",
  caution: "border-learn-warning-line",
} as const;

export function CompareGrid({ columns = 2, items, className }: CompareGridProps) {
  return (
    <div
      className={cn(
        "mt-6 grid gap-4",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "rounded-learn-lg border-[0.5px] bg-learn-surface p-5",
            COMPARE_TONE[item.tone ?? "neutral"],
          )}
        >
          <h3 className="text-[15px] font-semibold text-learn-strong">{item.title}</h3>
          <div className="mt-3 space-y-2 text-[14px] leading-[1.5] text-learn-muted">
            {item.children}
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * LabelRows — label pill on the left, text on the right.
 * ---------------------------------------------------------------------- */

interface LabelRowsProps {
  rows: readonly { label: string; text: React.ReactNode }[];
  className?: string;
}

export function LabelRows({ rows, className }: LabelRowsProps) {
  return (
    <div
      className={cn(
        "mt-5 space-y-4 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:p-6",
        className,
      )}
    >
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <span className="mt-0.5 w-24 shrink-0 rounded-full bg-learn-quiet px-2.5 py-1 text-center text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
            {row.label}
          </span>
          <p className="text-[14px] leading-[1.5] text-learn-strong">{row.text}</p>
        </div>
      ))}
    </div>
  );
}
