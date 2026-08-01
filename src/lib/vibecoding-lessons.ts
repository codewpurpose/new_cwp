import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_VIBECODING_HREF } from "@/lib/links";

/**
 * The Vibe Coding curriculum: 29 chapters across 7 parts, ordered from "what is
 * a terminal" to agent orchestration.
 *
 * Chapters marked `status: "draft"` are authored here but have no body yet, so
 * they are excluded from routing, the sidebar, and the pager. Adding a body
 * means writing the component, registering it in the [slug] route's LESSON_BODIES
 * map, filling in `headings`, and flipping status to "published".
 */

export const VIBECODING_PARTS: readonly LearnPart[] = [
  {
    id: "setup",
    number: 1,
    title: "Getting Set Up",
    summary:
      "Assumes nothing. What vibe coding is, what you need installed, and your first working app.",
  },
  {
    id: "model",
    number: 2,
    title: "How the Model Thinks",
    summary:
      "What the AI can actually see, and how to ask for things in a way it can act on.",
  },
  {
    id: "loop",
    number: 3,
    title: "The Working Loop",
    summary: "The cycle you repeat all day: plan, generate, review, test, commit.",
  },
  {
    id: "codebases",
    number: 4,
    title: "Real Codebases",
    summary:
      "Everything changes when the repo is large and someone else wrote most of it.",
  },
  {
    id: "correctness",
    number: 5,
    title: "Making It Correct",
    summary: "Debugging, testing, and the security pass AI output reliably needs.",
  },
  {
    id: "shipping",
    number: 6,
    title: "Shipping",
    summary: "Getting it off your laptop and in front of people, then keeping it alive.",
  },
  {
    id: "depth",
    number: 7,
    title: "Going Deeper",
    summary: "Agents, orchestration, custom tooling, and judging your own output.",
  },
];

export const VIBECODING_CHAPTERS: readonly LearnChapter[] = [
  // ---- Part 1 · Getting Set Up -------------------------------------------
  {
    slug: "intro",
    partId: "setup",
    order: 1,
    title: "What Is Vibe Coding?",
    description:
      "Traditional coding vs. vibe coding, side by side. See how describing what you want replaces typing every line by hand.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "where-the-term-comes-from", text: "Where the term comes from", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-you-need",
    partId: "setup",
    order: 2,
    title: "What You Need Before You Start",
    description:
      "A terminal, an editor, a GitHub account, and the ten minutes of git that actually matter. No prior setup assumed.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["Setup"],
    headings: [
      { id: "the-four-things", text: "The four things you need", level: 2 },
      { id: "the-terminal-in-five-commands", text: "The terminal, in five commands", level: 2 },
      { id: "check-it-worked", text: "Checking it actually worked", level: 2 },
      { id: "git-in-ten-minutes", text: "Git, in ten minutes", level: 2 },
      { id: "before-you-continue", text: "Before you continue", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "tools",
    partId: "setup",
    order: 3,
    title: "Choosing Your AI Tool",
    description:
      "Cursor, Copilot, Claude Code, or a chat window? Pick a task and see which kind of tool actually fits it.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Tooling", "Interactive"],
    headings: [
      { id: "you-dont-have-to-pick-one", text: "You don't have to pick one", level: 2 },
    ],
    status: "published",
    lastReviewed: "2026-08-01",
  },
  {
    slug: "install",
    partId: "setup",
    order: 4,
    title: "Install and Configure Your First Tool",
    description:
      "Step-by-step setup for each major tool: install, sign in, pick a model, and understand what the free tier gets you.",
    level: "beginner",
    minutes: 15,
    prerequisites: [],
    tags: ["Setup", "Tooling"],
    headings: [
      { id: "point-it-at-a-folder", text: "Whatever you chose: point it at a folder", level: 2 },
      { id: "a-first-real-test", text: "A first real test", level: 2 },
    ],
    status: "published",
    lastReviewed: "2026-08-01",
  },
  {
    slug: "first-app",
    partId: "setup",
    order: 5,
    title: "Your First Vibe-Coded App",
    description:
      "One prompt to a running app in about twenty minutes, with every command you need to type.",
    level: "beginner",
    minutes: 20,
    prerequisites: ["install"],
    tags: ["Hands-on"],
    headings: [
      { id: "scaffold-the-project", text: "Step 1: scaffold the project", level: 2 },
      { id: "the-first-prompt", text: "Step 2: the first prompt", level: 2 },
      { id: "read-before-you-run", text: "Step 3: read it before you run it", level: 2 },
      { id: "make-it-yours", text: "Step 4: make it yours", level: 2 },
      { id: "when-it-breaks", text: "Step 5: when it breaks", level: 2 },
      { id: "you-did-the-whole-loop", text: "You just did the whole loop", level: 2 },
    ],
    status: "published",
  },

  // ---- Part 2 · How the Model Thinks -------------------------------------
  {
    slug: "what-ai-sees",
    partId: "model",
    order: 6,
    title: "What the AI Can and Can't See",
    description:
      "Context windows, what actually gets sent with your prompt, and why the model confidently invents functions you never wrote.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "the-model-has-no-memory", text: "The model has no memory", level: 2 },
      { id: "the-context-window", text: "The context window is a budget", level: 2 },
      { id: "why-it-invents-things", text: "Why it invents functions you never wrote", level: 2 },
      { id: "test-what-it-can-see", text: "Test what it can see", level: 2 },
      { id: "working-with-the-limit", text: "Working with the limit instead of against it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "prompts",
    partId: "model",
    order: 7,
    title: "Writing Prompts That Work",
    description:
      "Vague prompts get vague code. Flip through real before/after examples to see what turns a so-so AI reply into a great one.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["Prompting", "Interactive"],
    headings: [
      { id: "anatomy-of-a-good-prompt", text: "Anatomy of a good prompt", level: 2 },
      { id: "try-it-yourself", text: "Try it yourself", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "prompt-patterns",
    partId: "model",
    order: 8,
    title: "Prompt Patterns Worth Memorising",
    description:
      "Ten reusable shapes — from 'explain before you change' to 'give me three options' — each one copyable.",
    level: "intermediate",
    minutes: 14,
    prerequisites: ["prompts"],
    tags: ["Prompting"],
    headings: [
      { id: "the-patterns", text: "The ten patterns", level: 2 },
      { id: "the-thread-running-through-them", text: "The thread running through them", level: 2 },
      { id: "building-your-own", text: "Building your own", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "choosing-a-model",
    partId: "model",
    order: 9,
    title: "Choosing a Model",
    description:
      "Fast models vs. reasoning models, when escalating is worth it, and what latency and cost actually buy you.",
    level: "intermediate",
    minutes: 10,
    prerequisites: [],
    tags: ["Tooling"],
    headings: [
      { id: "the-two-axes", text: "The two axes that matter", level: 2 },
      { id: "when-fast-is-right", text: "When fast is right", level: 2 },
      { id: "when-to-escalate", text: "When to escalate", level: 2 },
      { id: "what-the-cost-actually-is", text: "What the cost actually is", level: 2 },
      { id: "finding-out-for-yourself", text: "Finding out for yourself", level: 2 },
    ],
    status: "published",
    lastReviewed: "2026-08-01",
  },

  // ---- Part 3 · The Working Loop -----------------------------------------
  {
    slug: "loop",
    partId: "loop",
    order: 10,
    title: "The AI Pair-Programming Loop",
    description:
      "Prompt, generate, review, refine, ship. Click through the loop every vibe coder repeats, over and over, to build real features.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Workflow", "Interactive"],
    headings: [
      { id: "applied-to-a-real-example", text: "Applied to a real example", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "small-diffs",
    partId: "loop",
    order: 11,
    title: "Small Diffs, Frequent Commits",
    description:
      "Why the one-shot mega-prompt fails, and how splitting work into reviewable pieces makes the AI dramatically more useful.",
    level: "intermediate",
    minutes: 10,
    prerequisites: [],
    tags: ["Workflow"],
    headings: [
      { id: "the-mega-prompt-trap", text: "The mega-prompt trap", level: 2 },
      { id: "what-good-looks-like", text: "What good looks like", level: 2 },
      { id: "why-the-ai-does-better-too", text: "Why the AI does better too", level: 2 },
      { id: "commit-like-you-mean-it", text: "Commit like you mean it", level: 2 },
      { id: "when-bigger-is-fine", text: "When bigger is actually fine", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "steering",
    partId: "loop",
    order: 12,
    title: "Steering Mid-Flight",
    description:
      "Interrupting, redirecting, rejecting, and knowing when to throw it away and restart instead of arguing.",
    level: "intermediate",
    minutes: 10,
    prerequisites: [],
    tags: ["Workflow"],
    headings: [
      { id: "interrupt-early", text: "Interrupt early", level: 2 },
      { id: "redirect-with-specifics", text: "Redirect with specifics, not vibes", level: 2 },
      { id: "rejecting-well", text: "Rejecting well", level: 2 },
      { id: "the-two-strike-rule", text: "The two-strike rule", level: 2 },
      { id: "restart-the-conversation", text: "Restart the conversation, not just the prompt", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "review",
    partId: "loop",
    order: 13,
    title: "Reviewing AI-Generated Code",
    description:
      "AI output still needs a human pass. Spot the planted issues in a real snippet before they ship.",
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Code Review", "Interactive"],
    headings: [
      { id: "before-you-merge-check", text: "Before you merge, check", level: 2 },
    ],
    status: "published",
  },

  // ---- Part 4 · Real Codebases -------------------------------------------
  {
    slug: "giving-context",
    partId: "codebases",
    order: 14,
    title: "Giving the AI Context",
    description:
      "File references, @-mentions, screenshots, and pasted docs — what to include and what just wastes the window.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["what-ai-sees"],
    tags: ["Real Codebases"],
    headings: [
      { id: "reference-dont-describe", text: "Reference, don't describe", level: 2 },
      { id: "what-to-attach", text: "What to attach", level: 2 },
      { id: "what-not-to-attach", text: "What not to attach", level: 2 },
      { id: "screenshots-and-errors", text: "Screenshots and errors", level: 2 },
      { id: "the-cheapest-check", text: "The cheapest check there is", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "rules-files",
    partId: "codebases",
    order: 15,
    title: "Rules Files",
    description:
      "AGENTS.md, CLAUDE.md, and .cursorrules: how to tell the AI your conventions once instead of every prompt.",
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Real Codebases"],
    headings: [
      { id: "what-they-are", text: "What they are", level: 2 },
      { id: "what-to-put-in-one", text: "What to put in one", level: 2 },
      { id: "what-makes-a-good-rule", text: "What makes a good rule", level: 2 },
      { id: "the-commands-section", text: "The commands section earns its keep", level: 2 },
      { id: "keeping-it-honest", text: "Keeping it honest", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "codebase",
    partId: "codebases",
    order: 16,
    title: "Vibe Coding in an Existing Codebase",
    description:
      '"Add a login page" means something different in a fresh repo vs. a 50k-line one. See how naming context changes the result.',
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Real Codebases", "Interactive"],
    headings: [
      { id: "before-you-prompt-gather-context", text: "Before you prompt, gather context", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "mcp-and-tools",
    partId: "codebases",
    order: 17,
    title: "MCP and Tools",
    description:
      "Connecting the model to your database, browser, and issue tracker so it can check reality instead of guessing.",
    level: "advanced",
    minutes: 14,
    prerequisites: ["rules-files"],
    tags: ["Real Codebases", "Tooling"],
    headings: [
      { id: "why-this-matters", text: "Why this changes the failure mode", level: 2 },
      { id: "what-mcp-is", text: "What MCP actually is", level: 2 },
      { id: "setting-one-up", text: "Setting one up", level: 2 },
      { id: "the-browser-tool", text: "The one worth setting up first", level: 2 },
      { id: "the-risks", text: "The risks, stated plainly", level: 2 },
    ],
    status: "published",
    lastReviewed: "2026-08-01",
  },
  {
    slug: "refactors",
    partId: "codebases",
    order: 18,
    title: "Multi-File Refactors Without Breaking Everything",
    description:
      "Sequencing a large change so each step is verifiable, and using the type checker as your safety rail.",
    level: "advanced",
    minutes: 14,
    prerequisites: ["small-diffs"],
    tags: ["Real Codebases"],
    headings: [
      { id: "the-two-kinds", text: "Two kinds of large change", level: 2 },
      { id: "make-it-verifiable-first", text: "Make it verifiable first", level: 2 },
      { id: "sequence-it", text: "Sequence it so each step stands alone", level: 2 },
      { id: "use-the-type-checker", text: "Let the type checker do the reviewing", level: 2 },
      { id: "what-goes-wrong", text: "What goes wrong, specifically", level: 2 },
      { id: "the-escape-hatch", text: "The escape hatch", level: 2 },
    ],
    status: "published",
  },

  // ---- Part 5 · Making It Correct ----------------------------------------
  {
    slug: "debugging",
    partId: "correctness",
    order: 19,
    title: "Debugging With AI",
    description:
      "Errors are just information. Step through a live example of handing a stack trace to AI and landing on a real fix.",
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Debugging", "Interactive"],
    headings: [
      { id: "questions-to-ask-when-debugging", text: "Questions to ask when debugging", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "tests",
    partId: "correctness",
    order: 20,
    title: "Tests as Your Safety Net",
    description:
      "Asking for tests that actually test something, and why they matter more when you did not write the code yourself.",
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Testing"],
    headings: [
      { id: "why-they-matter-more-now", text: "Why they matter more now", level: 2 },
      { id: "asking-for-good-tests", text: "Asking for tests that test something", level: 2 },
      { id: "failing-first", text: "Make it fail first", level: 2 },
      { id: "what-to-test", text: "What to actually test", level: 2 },
      { id: "wiring-it-in", text: "Wire it into your check command", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "security",
    partId: "correctness",
    order: 21,
    title: "The Security Pass",
    description:
      "Secrets, injection, auth, and dependency risk — the specific things AI-generated code gets wrong again and again.",
    level: "advanced",
    minutes: 15,
    prerequisites: ["review"],
    tags: ["Security"],
    headings: [
      { id: "secrets", text: "Secrets: the one that actually happens", level: 2 },
      { id: "input-is-hostile", text: "Treat every input as hostile", level: 2 },
      { id: "authorisation", text: "Authentication is not authorisation", level: 2 },
      { id: "the-review-prompt", text: "The review prompt", level: 2 },
      { id: "before-you-ship", text: "Before anything reaches real users", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "when-not-to",
    partId: "correctness",
    order: 22,
    title: "When Not to Vibe Code",
    description:
      "The situations where typing it yourself is genuinely faster, safer, or the only responsible option.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["Judgement"],
    headings: [
      { id: "when-you-are-learning", text: "When the point is that you learn it", level: 2 },
      { id: "when-you-cannot-verify", text: "When you cannot verify the answer", level: 2 },
      { id: "when-it-is-faster-to-type", text: "When it is genuinely faster to type it", level: 2 },
      { id: "when-it-is-not-yours-to-share", text: "When the code is not yours to share", level: 2 },
      { id: "when-the-thread-is-lost", text: "When the loop has stopped converging", level: 2 },
      { id: "the-underlying-principle", text: "The principle underneath all of these", level: 2 },
    ],
    status: "published",
  },

  // ---- Part 6 · Shipping --------------------------------------------------
  {
    slug: "git",
    partId: "shipping",
    order: 23,
    title: "Git and GitHub for Vibe Coders",
    description:
      "Branches, pull requests, and review — the workflow that makes AI-generated changes safe to undo.",
    level: "beginner",
    minutes: 14,
    prerequisites: ["what-you-need"],
    tags: ["Shipping"],
    headings: [
      { id: "the-four-commands", text: "The four commands you will actually use", level: 2 },
      { id: "branches", text: "Branches make experiments free", level: 2 },
      { id: "commit-messages", text: "Commit messages are notes to your future self", level: 2 },
      { id: "pull-requests", text: "Pull requests: a place to actually review", level: 2 },
      { id: "when-it-goes-wrong", text: "When it goes wrong", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "shipping",
    partId: "shipping",
    order: 24,
    title: "From Idea to Deployed App",
    description:
      "Watch a single idea move through prompting, building, testing, and deploying, all in one afternoon, without writing it all by hand.",
    level: "intermediate",
    minutes: 12,
    prerequisites: [],
    tags: ["Shipping", "Interactive"],
    headings: [
      { id: "ideas-to-try-this-week", text: "Ideas to try this week", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "after-you-ship",
    partId: "shipping",
    order: 25,
    title: "After You Ship",
    description:
      "Monitoring, reading real bug reports, and iterating on something people are already using.",
    level: "intermediate",
    minutes: 10,
    prerequisites: ["shipping"],
    tags: ["Shipping"],
    headings: [
      { id: "know-when-it-breaks", text: "Find out before your users tell you", level: 2 },
      { id: "reading-bug-reports", text: "Reading a real bug report", level: 2 },
      { id: "the-fix-loop", text: "The fix loop, with the AI in it", level: 2 },
      { id: "what-users-actually-do", text: "Watch what people do, not what they say", level: 2 },
      { id: "keeping-it-alive", text: "Keeping it alive", level: 2 },
      { id: "the-honest-part", text: "The part nobody says out loud", level: 2 },
    ],
    status: "published",
  },

  // ---- Part 7 · Going Deeper ---------------------------------------------
  {
    slug: "agents",
    partId: "depth",
    order: 26,
    title: "Agents and Background Work",
    description:
      "Long-running agents, parallel worktrees, and handing off work you do not want to sit and watch.",
    level: "advanced",
    minutes: 14,
    prerequisites: ["git"],
    tags: ["Advanced"],
    headings: [
      { id: "what-changes", text: "What actually changes", level: 2 },
      { id: "what-makes-a-good-task", text: "What makes a good agent task", level: 2 },
      { id: "setting-it-up-safely", text: "Setting it up so mistakes are cheap", level: 2 },
      { id: "worktrees", text: "Parallel work with worktrees", level: 2 },
      { id: "reviewing-agent-output", text: "Reviewing what comes back", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "orchestration",
    partId: "depth",
    order: 27,
    title: "Subagents and Orchestration",
    description:
      "Splitting a large job across several agents, and the failure modes that appear when you do.",
    level: "advanced",
    minutes: 14,
    prerequisites: ["agents"],
    tags: ["Advanced"],
    headings: [
      { id: "why-split-at-all", text: "Why split at all", level: 2 },
      { id: "the-shapes-that-work", text: "The shapes that work", level: 2 },
      { id: "what-goes-wrong", text: "What goes wrong", level: 2 },
      { id: "doing-it-by-hand", text: "Doing it by hand first", level: 2 },
      { id: "when-not-to", text: "When not to bother", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "custom-tooling",
    partId: "depth",
    order: 28,
    title: "Building Your Own Commands and Skills",
    description:
      "Turning a workflow you repeat into a command the AI can run, so the good version happens by default.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["rules-files"],
    tags: ["Advanced"],
    headings: [
      { id: "notice-the-repetition", text: "Start by noticing the repetition", level: 2 },
      { id: "slash-commands", text: "Slash commands", level: 2 },
      { id: "commit-them", text: "Commit them to the repo", level: 2 },
      { id: "scripts-beat-prompts", text: "When a script beats a prompt", level: 2 },
      { id: "the-compounding-part", text: "The part that compounds", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "getting-better",
    partId: "depth",
    order: 29,
    title: "Getting Better",
    description:
      "How to tell whether your output is actually improving, instead of just feeling faster.",
    level: "advanced",
    minutes: 10,
    prerequisites: [],
    tags: ["Advanced"],
    headings: [
      { id: "the-illusion", text: "Speed is not the same as skill", level: 2 },
      { id: "measure-something-real", text: "Measure something real", level: 2 },
      { id: "deliberate-practice", text: "Practice that actually builds skill", level: 2 },
      { id: "use-it-on-yourself", text: "Turn the tool on your own work", level: 2 },
      { id: "what-to-keep", text: "What to keep as the tools change", level: 2 },
      { id: "the-end", text: "Where this leaves you", level: 2 },
    ],
    status: "published",
  },
];

/** @deprecated Use VIBECODING_CHAPTERS. Kept so existing imports keep compiling. */
export const VIBECODING_LESSONS = VIBECODING_CHAPTERS;

export type { LearnChapter as VibecodingLesson } from "@/lib/learn-types";
