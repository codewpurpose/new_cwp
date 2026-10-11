import { CodeBlock, type CodeLineTone } from "@/components/learn/primitives/CodeBlock";
import { Tag } from "@/components/learn/primitives/Tag";

interface TryItProps {
  /** A .py file name, so the block gets a Run button. */
  label: `${string}.py`;
  /** A complete program that runs as-is in the browser runner. */
  code: string;
  /** One line: what to change before running it again. */
  prompt: React.ReactNode;
  lineTones?: Readonly<Record<number, CodeLineTone>>;
}

/**
 * A runnable snippet with a single nudge underneath it: run it, change one
 * thing, run it again. The prompt stays to one short line on purpose.
 */
export function TryIt({ label, code, prompt, lineTones }: TryItProps) {
  return (
    <>
      <CodeBlock label={label} code={code} lineTones={lineTones} />
      <p className="mt-3 flex items-baseline gap-2.5 text-pretty text-[15px] leading-[1.6] text-learn-muted">
        <Tag tone="mint" className="shrink-0">
          Try it
        </Tag>
        <span>{prompt}</span>
      </p>
    </>
  );
}
