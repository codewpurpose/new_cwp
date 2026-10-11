/**
 * Copy for /resources/ai-coding. Tool details (plans, limits, models) change
 * often, so each card describes the tool in general terms and links to the
 * official site instead of restating prices or feature lists.
 */

export type AiTool = {
  name: string;
  description: string;
  goodFor: string;
  href: string;
  /** Official student / education page, only where one exists. */
  student?: { label: string; href: string };
};

export const AI_TOOLS: readonly AiTool[] = [
  {
    name: "GitHub Copilot",
    description: "An AI pair programmer that suggests code inside your editor as you type.",
    goodFor: "Autocomplete, small functions and quick questions without leaving VS Code or another supported editor.",
    href: "https://github.com/features/copilot",
    student: { label: "GitHub Education for students", href: "https://education.github.com/" },
  },
  {
    name: "Cursor",
    description: "A code editor built around AI, with chat and edits that can see your project.",
    goodFor: "Asking questions about a whole codebase and making changes across several files.",
    href: "https://cursor.com/",
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant, available as a chat app and as coding tools.",
    goodFor: "Talking through a problem, explaining unfamiliar code and reviewing what you wrote.",
    href: "https://claude.ai/",
  },
  {
    name: "ChatGPT",
    description: "OpenAI's general-purpose AI chat assistant.",
    goodFor: "Explaining concepts in plain language, brainstorming and debugging pasted snippets.",
    href: "https://chatgpt.com/",
  },
  {
    name: "Gemini",
    description: "Google's AI assistant, available on the web and in other Google products.",
    goodFor: "General questions, explanations and help with code alongside other Google tools.",
    href: "https://gemini.google.com/",
  },
  {
    name: "Replit",
    description: "A browser-based place to write, run and share code, with built-in AI help.",
    goodFor: "Starting a project with nothing installed and getting AI help in the same window.",
    href: "https://replit.com/",
  },
];

export type PromptTemplate = { title: string; why: string; prompt: string };

export const PROMPT_TEMPLATES: readonly PromptTemplate[] = [
  {
    title: "Explain this error step by step",
    why: "Learn to read error messages yourself next time.",
    prompt:
      "I'm learning to code and got this error. Explain what it means step by step, point to the line that probably causes it, and tell me how to find this kind of bug myself. Don't rewrite my whole program.\n\nError:\n[paste the error]\n\nCode:\n[paste the relevant code]",
  },
  {
    title: "Review my code, but ask me questions first",
    why: "You explain your thinking before getting feedback.",
    prompt:
      "Please review my code. Before giving any feedback, ask me 2-3 questions about what I was trying to do and why I made certain choices. After I answer, point out the most important issues, starting with the biggest one.\n\n[paste your code]",
  },
  {
    title: "Give me a hint, not the answer",
    why: "Keeps the thinking (and the learning) on your side.",
    prompt:
      "I'm stuck on this problem. Give me one small hint that moves me forward without giving away the solution. If I'm still stuck after trying, I'll ask for the next hint.\n\nProblem:\n[describe the problem]\n\nWhat I've tried:\n[describe your attempt]",
  },
  {
    title: "Write tests for my function",
    why: "See what \"working\" really means, including edge cases.",
    prompt:
      "Write a few tests for this function. Include normal cases, edge cases (empty input, very large or negative values) and one case you think might fail. For each test, explain in one sentence what it checks.\n\n[paste your function]",
  },
  {
    title: "Explain this line by line for a beginner",
    why: "Understand code before you use it.",
    prompt:
      "Explain this code line by line as if I'm a beginner. Use plain language, define any new terms, and tell me what would change if I removed or edited each line.\n\n[paste the code]",
  },
  {
    title: "Turn this into a smaller exercise",
    why: "Practise the core idea on your own.",
    prompt:
      "Take this code and turn its main idea into a small practice exercise I can solve myself in about 15 minutes. Give me the task and a few example inputs and outputs, but not the solution.\n\n[paste the code or concept]",
  },
  {
    title: "Quiz me on what I just learned",
    why: "Check whether it actually stuck.",
    prompt:
      "I just learned about [topic]. Ask me 5 short questions, one at a time, that check whether I really understand it. Wait for my answer before asking the next one, and tell me where my answers are wrong.",
  },
  {
    title: "Compare two ways to solve this",
    why: "Build judgement, not just a working answer.",
    prompt:
      "Here is my solution. Show me one different way to solve the same problem, then compare the two: which is easier to read, which is faster, and when would you pick each one?\n\n[paste your solution]",
  },
];

export const WORKFLOW_STEPS: readonly { title: string; body: string }[] = [
  {
    title: "Understand the problem",
    body: "Say in your own words what the program should do, what goes in and what comes out.",
  },
  {
    title: "Try it yourself first",
    body: "Write a plan or a first attempt, even a broken one. It gives you something real to ask about.",
  },
  {
    title: "Ask for hints, not answers",
    body: "Share what you tried and ask for the next small step, not the finished code.",
  },
  {
    title: "Read every line",
    body: "Never paste code you can't explain. If a line is unclear, ask about that line.",
  },
  {
    title: "Run it and test it",
    body: "Run the code, try edge cases and check the result yourself. Looking right is not the same as working.",
  },
  {
    title: "Explain it back",
    body: "Describe how the solution works to a friend, a rubber duck or the AI. If you can't, go back a step.",
  },
];

export const SAFETY_RULES: readonly { title: string; body: string }[] = [
  {
    title: "Never paste secrets",
    body: "Keep passwords, API keys, tokens and .env files out of prompts. Treat anything you paste as something that could be stored.",
  },
  {
    title: "Protect personal data",
    body: "Don't share your own or anyone else's private information, like addresses, phone numbers or school records.",
  },
  {
    title: "Verify everything",
    body: "AI can be confidently wrong. It may invent functions, libraries or facts. Run the code and check the official docs.",
  },
  {
    title: "Check licences",
    body: "Generated code can resemble existing code. For anything you publish, check the licences of libraries and snippets you use.",
  },
  {
    title: "Follow your school's rules",
    body: "Some classes ban AI help, others allow it with credit. Know the policy and cite AI help where it's required.",
  },
];

export const GLOSSARY: readonly { term: string; definition: string }[] = [
  {
    term: "Prompt",
    definition: "The message or instructions you give an AI tool. Clearer prompts with more context usually get better answers.",
  },
  {
    term: "Context window",
    definition: "How much text (your messages, pasted code and the AI's replies) a model can take into account at once. Very long chats can push early details out.",
  },
  {
    term: "Hallucination",
    definition: "When an AI states something false as if it were true, such as a function or library that doesn't exist.",
  },
  {
    term: "Agent",
    definition: "An AI tool that can take several steps on its own, like reading files, running commands and editing code, instead of only replying in chat.",
  },
  {
    term: "Autocomplete",
    definition: "AI suggestions that appear in your editor as you type, from the rest of a line to a whole function. You accept or ignore them.",
  },
];
