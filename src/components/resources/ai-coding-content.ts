/**
 * Copy for /resources/ai-coding. Tool details (plans, limits, models) change
 * often, so each card describes the tool in general terms and links to the
 * official site instead of restating prices or feature lists.
 */

export type AiTool = {
  name: string;
  description: string;
  href: string;
  /** Official student / education page, only where one exists. */
  student?: { label: string; href: string };
};

export type ToolGroup = {
  id: "chat" | "editor" | "browser";
  title: string;
  blurb: string;
  tools: readonly AiTool[];
};

export const TOOL_GROUPS: readonly ToolGroup[] = [
  {
    id: "chat",
    title: "Chat helpers",
    blurb: "Paste a question, an error or a snippet and talk it through.",
    tools: [
      {
        name: "ChatGPT",
        description: "OpenAI's general-purpose assistant. Good at explaining ideas in plain language.",
        href: "https://chatgpt.com/",
      },
      {
        name: "Claude",
        description: "Anthropic's assistant. Good for talking through a problem and reviewing code you wrote.",
        href: "https://claude.ai/",
      },
      {
        name: "Gemini",
        description: "Google's assistant, on the web and inside other Google products.",
        href: "https://gemini.google.com/",
      },
    ],
  },
  {
    id: "editor",
    title: "In-editor assistants",
    blurb: "Suggestions and chat right next to your code, once you're working in an editor.",
    tools: [
      {
        name: "GitHub Copilot",
        description: "Suggests code as you type and answers questions inside VS Code and other editors.",
        href: "https://github.com/features/copilot",
        student: { label: "GitHub Education", href: "https://education.github.com/" },
      },
      {
        name: "Cursor",
        description: "A code editor built around AI, with chat that can see your whole project.",
        href: "https://cursor.com/",
      },
    ],
  },
  {
    id: "browser",
    title: "Build in the browser",
    blurb: "Nothing to install. Write and run code in a tab, with AI help nearby.",
    tools: [
      {
        name: "Replit",
        description: "Write, run and share projects in the browser, with a built-in AI assistant.",
        href: "https://replit.com/",
      },
      {
        name: "Google Colab",
        description: "Python notebooks that run in the browser, popular for data and machine learning.",
        href: "https://colab.research.google.com/",
      },
    ],
  },
];

export const START_STEPS: readonly { title: string; body: string; cta: { label: string; href: string } }[] = [
  {
    title: "Pick one chat helper",
    body: "Any of the chat tools below is enough to start. You don't need an editor plugin yet.",
    cta: { label: "See the tools", href: "#tools" },
  },
  {
    title: "Write a little code yourself",
    body: "Try something small first, even if it breaks. A real attempt gives you something real to ask about.",
    cta: { label: "Open the playground", href: "/playground/" },
  },
  {
    title: "Ask for help that teaches",
    body: "Ask for an explanation or a hint, not the finished answer. Then read every line before you use it.",
    cta: { label: "Build a prompt", href: "#prompt-builder" },
  },
];

/* ------------------------------------------------------------------ */
/* Prompt builder                                                      */
/* ------------------------------------------------------------------ */

export type PromptField = {
  key: string;
  label: string;
  /** Shown in the input and, while it's empty, as the blank in the prompt. */
  placeholder: string;
  multiline?: boolean;
};

/** A prompt is a list of literal strings and `{ field }` blanks. */
export type PromptPart = string | { field: string };

export type PromptGoal = {
  id: string;
  label: string;
  hint: string;
  fields: readonly PromptField[];
  parts: readonly PromptPart[];
};

const LANGUAGE: PromptField = { key: "language", label: "Language", placeholder: "Python" };

export const PROMPT_GOALS: readonly PromptGoal[] = [
  {
    id: "error",
    label: "Explain an error",
    hint: "Learn to read the message yourself next time.",
    fields: [
      LANGUAGE,
      { key: "error", label: "The error message", placeholder: "paste the error", multiline: true },
      { key: "code", label: "The code it points to", placeholder: "paste the relevant lines", multiline: true },
    ],
    parts: [
      "I'm learning ",
      { field: "language" },
      " and got this error. Explain what it means, point to the line that probably causes it, and tell me how I could spot this kind of bug myself next time. Please don't rewrite my whole program.\n\nError:\n",
      { field: "error" },
      "\n\nMy code:\n",
      { field: "code" },
    ],
  },
  {
    id: "hint",
    label: "Get a hint",
    hint: "Move forward without being handed the answer.",
    fields: [
      { key: "problem", label: "What you're trying to do", placeholder: "describe the problem", multiline: true },
      { key: "tried", label: "What you've tried", placeholder: "describe your attempt", multiline: true },
    ],
    parts: [
      "I'm stuck on a coding problem. Give me one small hint that moves me forward without giving away the solution. If I'm still stuck after trying it, I'll ask for another.\n\nThe problem:\n",
      { field: "problem" },
      "\n\nWhat I've tried so far:\n",
      { field: "tried" },
    ],
  },
  {
    id: "review",
    label: "Review my code",
    hint: "Get feedback while you still do the fixing.",
    fields: [
      { key: "purpose", label: "What the code should do", placeholder: "say what it should do" },
      { key: "code", label: "Your code", placeholder: "paste your code", multiline: true },
    ],
    parts: [
      "Please review my code. It's supposed to ",
      { field: "purpose" },
      ". Before giving feedback, ask me one or two questions about why I wrote it this way. Then point out the most important issue first, explain why it matters, and let me try to fix it myself.\n\n",
      { field: "code" },
    ],
  },
  {
    id: "tests",
    label: "Write tests",
    hint: "See what “working” really means.",
    fields: [
      LANGUAGE,
      { key: "code", label: "Your function", placeholder: "paste your function", multiline: true },
    ],
    parts: [
      "Help me test this ",
      { field: "language" },
      " function. Suggest a few test cases: normal inputs, edge cases like empty or very large values, and one case you think might break it. For each one, say in a sentence what it checks and what result to expect.\n\n",
      { field: "code" },
    ],
  },
];

export const BEGINNER_NOTE =
  "\n\nI'm a beginner, so please use plain language and explain any new terms.";

/* ------------------------------------------------------------------ */
/* Safety and glossary                                                 */
/* ------------------------------------------------------------------ */

export const DOS: readonly string[] = [
  "Run the code and check the result yourself.",
  "Read every line, and ask about the ones you don't understand.",
  "Check the official docs when something sounds surprising.",
  "Follow your class rules and credit AI help where it's asked for.",
];

export const DONTS: readonly string[] = [
  "Paste passwords, API keys or .env files into a prompt.",
  "Share your own or anyone else's personal information.",
  "Hand in code you can't explain.",
  "Assume it's right because it sounds confident.",
];

export const GLOSSARY: readonly { term: string; definition: string }[] = [
  {
    term: "Prompt",
    definition: "The message you give an AI tool. More context usually gets a better answer.",
  },
  {
    term: "Hallucination",
    definition: "When an AI states something false as fact, like a function that doesn't exist.",
  },
  {
    term: "Context window",
    definition: "How much text a model can take into account at once. Long chats can push early details out.",
  },
  {
    term: "Autocomplete",
    definition: "Suggestions that appear in your editor as you type. You accept or ignore them.",
  },
  {
    term: "Agent",
    definition: "An AI tool that takes several steps on its own, like reading files and editing code.",
  },
  {
    term: "Vibe coding",
    definition: "Building by describing what you want to an AI and steering the result. Works best when you still understand the code.",
  },
];
