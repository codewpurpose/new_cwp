/**
 * Marks for the AI coding tools discussed in the Tools and Install chapters.
 *
 * These deliberately depict WHERE A TOOL RUNS rather than reproducing anybody's
 * brand logo. Two reasons. Redrawing a company's trademark from memory produces
 * a subtly wrong version of their mark, which is worse than having none. And
 * more usefully: the entire point of those chapters is that tools differ by
 * where they run and what they can see, so a mark showing "an editor" or "a
 * terminal" teaches the distinction the lesson is making.
 *
 * Drawn on a 48x36 grid, stroke-only, inheriting colour from the caller.
 */

type Mark = () => React.ReactElement;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 36" className="h-9 w-12" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

/** An AI-first editor: whole-project sidebar plus code. */
export const EditorMark: Mark = () => (
  <Frame>
    <rect x={3} y={4} width={42} height={28} rx={3} />
    <path d="M15 4 v28" />
    <path d="M7 11 h4 M7 17 h4 M7 23 h4" strokeWidth={1.5} />
    <path d="M20 12 h18 M20 18 h13 M20 24 h16" strokeWidth={1.5} />
  </Frame>
);

/** A plugin inside your existing editor: the dashed line is the suggestion. */
export const EditorPluginMark: Mark = () => (
  <Frame>
    <rect x={3} y={4} width={42} height={28} rx={3} />
    <path d="M3 11 h42" />
    <path d="M9 18 h13" strokeWidth={1.5} />
    <path d="M24 18 h15" strokeWidth={1.5} strokeDasharray="3 3" />
    <path d="M9 25 h9" strokeWidth={1.5} />
  </Frame>
);

/** A terminal agent: a prompt, and it runs commands. */
export const TerminalMark: Mark = () => (
  <Frame>
    <rect x={3} y={4} width={42} height={28} rx={3} />
    <path d="M3 11 h42" />
    <path d="M10 17 l4 4 -4 4" strokeWidth={1.6} />
    <path d="M18 25 h12" strokeWidth={1.6} />
  </Frame>
);

/** A browser chat: sees only what you paste. */
export const BrowserChatMark: Mark = () => (
  <Frame>
    <rect x={3} y={4} width={42} height={28} rx={3} />
    <path d="M3 11 h42" />
    <circle cx={7.5} cy={7.5} r={1.1} fill="currentColor" stroke="none" />
    <path d="M10 16 h16 a2 2 0 0 1 2 2 v3 a2 2 0 0 1 -2 2 h-11 l-4 3 v-3 a2 2 0 0 1 -1 -2 v-3 a2 2 0 0 1 0 -2 z" strokeWidth={1.5} />
    <path d="M32 26 h6" strokeWidth={1.5} />
  </Frame>
);

/** Keyed by the tool keys used in ToolsLesson and InstallLesson. */
export const TOOL_MARKS: Record<string, Mark> = {
  cursor: EditorMark,
  copilot: EditorPluginMark,
  "claude-code": TerminalMark,
  chat: BrowserChatMark,
};
