import { Fragment } from "react";

/** Renders `backticked` spans of project copy as inline code. */
export function InlineCode({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="rounded bg-[#eef6ee] px-1 py-px font-[family-name:var(--learn-font-mono)] text-[0.88em] text-[var(--home-moss)]"
          >
            {part}
          </code>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
