export { LEARN_VIBECODING_HREF } from "@/lib/links";

export interface VibecodingLesson {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export const VIBECODING_LESSONS: VibecodingLesson[] = [
  {
    slug: "intro",
    title: "What Is Vibe Coding?",
    description:
      "Traditional coding vs. vibe coding, side by side. See how describing what you want replaces typing every line by hand.",
    tags: ["Foundations", "Interactive"],
  },
  {
    slug: "prompts",
    title: "Writing Prompts That Work",
    description:
      "Vague prompts get vague code. Flip through real before/after examples to see what turns a so-so AI reply into a great one.",
    tags: ["Prompting", "Interactive"],
  },
  {
    slug: "loop",
    title: "The AI Pair-Programming Loop",
    description:
      "Prompt, generate, review, refine, ship. Click through the loop every vibe coder repeats, over and over, to build real features.",
    tags: ["Workflow", "Interactive"],
  },
  {
    slug: "debugging",
    title: "Debugging With AI",
    description:
      "Errors are just information. Step through a live example of handing a stack trace to AI and landing on a real fix.",
    tags: ["Debugging", "Interactive"],
  },
  {
    slug: "shipping",
    title: "From Idea to Deployed App",
    description:
      "Watch a single idea move through prompting, building, testing, and deploying, all in one afternoon, without writing it all by hand.",
    tags: ["Shipping", "Interactive"],
  },
];
