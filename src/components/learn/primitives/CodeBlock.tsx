import { FileCode, MessageCircle, Terminal } from "lucide-react";
import { CodeCopyButton } from "@/components/learn/primitives/CodeCopyButton";
import { cn } from "@/lib/utils";

/** Language tag inferred from a file-name label, e.g. "grades.py" -> "Python". */
const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  py: "Python",
  js: "JavaScript",
  mjs: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  lua: "Luau",
  luau: "Luau",
  md: "Markdown",
  sh: "Shell",
  yml: "YAML",
  yaml: "YAML",
  sql: "SQL",
  csv: "CSV",
  toml: "TOML",
  txt: "Text",
};

function languageOf(label: string | undefined): string | null {
  const match = label?.match(/\.([a-z0-9]+)$/i);
  return match ? (LANGUAGE_BY_EXTENSION[match[1].toLowerCase()] ?? null) : null;
}

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
  const language = variant === "code" ? languageOf(label) : null;
  const HeaderIcon = variant === "terminal" ? Terminal : isPrompt ? MessageCircle : FileCode;

  return (
    <figure
      className={cn(
        "lr-code mt-6 overflow-hidden rounded-learn-md",
        isPrompt
          ? "border-[0.5px] border-learn-line bg-learn-surface"
          : "bg-learn-code-bg shadow-[0_1px_0_rgba(21,18,12,0.04),0_8px_24px_-16px_rgba(21,18,12,0.35)]",
        className,
      )}
    >
      {(label || copyable) && (
        <figcaption
          className={cn(
            "flex min-h-11 items-center justify-between gap-3 py-1 pl-4 pr-1.5 text-[11.5px]",
            isPrompt
              ? "border-b-[0.5px] border-learn-line text-learn-subtle"
              : "border-b border-learn-code-line text-learn-code-dim",
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <HeaderIcon className="size-3.5 shrink-0 opacity-80" aria-hidden="true" />
            {/* File names keep their case; generic labels stay small caps. */}
            <span
              className={cn(
                "truncate",
                label && /^[^\s]+\.[a-z][a-z0-9]*$/i.test(label)
                  ? "font-[family-name:var(--learn-font-mono)] normal-case tracking-normal"
                  : "uppercase tracking-[0.08em]",
              )}
            >
              {label ?? (variant === "terminal" ? "Terminal" : isPrompt ? "Prompt" : "Code")}
            </span>
            {language && (
              <span className="lr-code-lang">{language}</span>
            )}
          </span>
          {copyable && <CodeCopyButton value={code} tone={isPrompt ? "light" : "dark"} />}
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
