import { CodeCopyButton } from "@/components/learn/primitives/CodeCopyButton";
import { cn } from "@/lib/utils";

export type CodeLineTone = "err" | "warn" | "ok" | "dim" | "accent";

const LINE_TONE: Record<CodeLineTone, string> = {
  err: "text-learn-code-err",
  warn: "text-learn-code-warn",
  ok: "text-learn-code-ok",
  dim: "text-learn-code-dim",
  accent: "text-learn-code-accent",
};

interface CodeBlockProps {
  /** Raw text, not children — so the copy button can hand over exactly this. */
  code: string;
  /** Shown in the header strip, e.g. "Terminal" or "src/app/page.tsx". */
  label?: string;
  variant?: "code" | "terminal" | "prompt";
  copyable?: boolean;
  /** Per-line colour, keyed by zero-based line index. */
  lineTones?: Readonly<Record<number, CodeLineTone>>;
  className?: string;
}

/**
 * Replaces the hand-indented `{"  "}` string literals the lesson bodies used.
 * Whitespace is preserved by the renderer, so code can be written as a normal
 * template literal.
 */
export function CodeBlock({
  code,
  label,
  variant = "code",
  copyable = true,
  lineTones,
  className,
}: CodeBlockProps) {
  const lines = code.replace(/\n$/, "").split("\n");
  const isPrompt = variant === "prompt";

  return (
    <figure
      className={cn(
        "mt-6 overflow-hidden rounded-learn-md",
        isPrompt
          ? "border-[0.5px] border-learn-line bg-learn-surface"
          : "bg-learn-code-bg",
        className,
      )}
    >
      {(label || copyable) && (
        <figcaption
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-2 text-[11px] uppercase tracking-[0.08em]",
            isPrompt
              ? "border-b-[0.5px] border-learn-line text-learn-subtle"
              : "border-b border-learn-code-line text-learn-code-dim",
          )}
        >
          <span>{label ?? (variant === "terminal" ? "Terminal" : "Code")}</span>
          {copyable && <CodeCopyButton value={code} />}
        </figcaption>
      )}

      <pre
        className={cn(
          "overflow-x-auto p-4 text-[13px] leading-[1.7]",
          isPrompt ? "text-learn-strong" : "text-learn-code-fg",
        )}
      >
        <code className="font-[family-name:var(--learn-font-mono)]">
          {lines.map((line, index) => {
            // Only real commands get a shell prompt. Comments, indented
            // continuations, and blank lines must not: prefixing "$ " onto a
            // "# note" line presents it as something you would type, which is
            // exactly backwards in a teaching example.
            const isComment = line.trimStart().startsWith("#");
            const isCommand =
              variant === "terminal" &&
              line.length > 0 &&
              !line.startsWith(" ") &&
              !isComment;

            return (
              <span
                key={index}
                className={cn(
                  "block",
                  isComment && !lineTones?.[index] && "text-learn-code-dim",
                  lineTones?.[index] && LINE_TONE[lineTones[index]],
                )}
              >
                {isCommand && <span className="select-none text-learn-code-dim">$ </span>}
                {line.length === 0 ? " " : line}
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

/** Inline code inside prose. Uses the mono font that is actually loaded. */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[4px] bg-learn-sunken px-1.5 py-0.5 font-[family-name:var(--learn-font-mono)] text-[0.9em] text-learn-strong">
      {children}
    </code>
  );
}
