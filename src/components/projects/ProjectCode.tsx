import type { ProjectCode as Code } from "@/lib/projects";
import { projectPlaygroundHref } from "./playground-links";

function CodeFile({ name, code }: { name: string; code: string }) {
  return (
    <figure className="m-0 overflow-hidden rounded-xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)]">
      <figcaption className="border-b-[0.5px] border-[var(--home-hairline)] bg-[#eef6ee] px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[0.75rem] text-[var(--home-moss)]">
        {name}
      </figcaption>
      {/* tabIndex lets keyboard users scroll a long line sideways. */}
      <pre
        tabIndex={0}
        className="m-0 max-h-[28rem] overflow-auto p-4 font-[family-name:var(--learn-font-mono)] text-[0.8125rem] leading-[1.6] text-[var(--home-ink)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--home-fern)]"
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}

/** The code files for a starter or a solution. */
export function CodeFiles({ code }: { code: Code }) {
  if (code.kind === "python") return <CodeFile name="main.py" code={code.code} />;
  return (
    <div className="grid gap-4">
      <CodeFile name="index.html" code={code.html} />
      <CodeFile name="style.css" code={code.css} />
      {code.js !== "" && <CodeFile name="script.js" code={code.js} />}
    </div>
  );
}

export function PlaygroundButton({
  code,
  label,
  variant = "fill",
}: {
  code: Code;
  label: string;
  variant?: "fill" | "outline";
}) {
  return (
    <a
      href={projectPlaygroundHref(code)}
      className={`home-btn ${variant === "fill" ? "home-btn-fill" : "home-btn-outline"}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
