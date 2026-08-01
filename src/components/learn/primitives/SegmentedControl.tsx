"use client";

import { cn } from "@/lib/utils";

interface SegmentedControlProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T | null;
  onValueChange: (value: T) => void;
  /** Becomes the group's accessible name. */
  label: string;
  /** "track" is the enclosed pill row; "chips" is a loose wrap. */
  variant?: "track" | "chips";
  className?: string;
}

/**
 * Replaces the two hand-rolled toggle shapes across three lessons, and adds the
 * radiogroup semantics none of them had.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  label,
  variant = "track",
  className,
}: SegmentedControlProps<T>) {
  const isTrack = variant === "track";

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        isTrack
          ? "inline-flex rounded-full border-[0.5px] border-learn-line bg-white p-1"
          : "flex flex-wrap gap-2",
        className,
      )}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "learn-focusable rounded-full px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
              isTrack
                ? selected
                  ? "bg-learn-inverse text-learn-on-inverse"
                  : "text-learn-muted hover:text-learn-strong"
                : selected
                  ? "border-[0.5px] border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
