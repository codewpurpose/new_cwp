import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhatAiSeesLesson() {
  return (
    <div>
      <Lead>
        Almost every frustrating moment with an AI coding tool traces back to one thing: it
        answered using less information than you assumed it had. This chapter is about what
        actually reaches the model, so that its mistakes stop being mysterious.
      </Lead>

      <LessonSection id="the-model-has-no-memory" title="The model has no memory">
        <P>
          Start here, because it explains most of the rest. A language model does not remember
          your last conversation. It does not remember your project between sessions. Every
          single time you press enter, the tool assembles a package of text and sends the whole
          thing — and that package is the entire world as far as the model is concerned.
        </P>
        <P>That package usually contains:</P>
        <StepList
          steps={[
            { label: "A system prompt", detail: "Instructions from the tool vendor you never see." },
            { label: "Your rules file", detail: "AGENTS.md, CLAUDE.md, or .cursorrules, if one exists." },
            { label: "Some of your code", detail: "The open file, files you referenced, and whatever the tool's search decided was relevant." },
            { label: "The conversation so far", detail: "Earlier messages in this session, until they get too long and start being dropped." },
            { label: "Your actual prompt", detail: "The smallest part, and the only one you fully control." },
          ]}
        />
        <P>
          When the model &ldquo;forgets&rdquo; something you said twenty minutes ago, nothing
          mystical happened. That text stopped being included in the package.
        </P>
      </LessonSection>

      <LessonSection id="the-context-window" title="The context window is a budget">
        <P>
          There is a hard ceiling on how much text can go in that package, measured in{" "}
          <Strong>tokens</Strong> — roughly ¾ of a word each, so 1,000 tokens is about 750
          words. Modern models take a lot: hundreds of thousands of tokens. That sounds
          limitless until you notice a mid-sized codebase is millions.
        </P>
        <P>
          So the tool is constantly choosing what to include and what to leave out. It is
          usually good at this. It is never perfect. And critically:{" "}
          <Strong>it will not tell you what it left out</Strong>.
        </P>
        <Callout tone="warning" title="The practical consequence">
          A long conversation is not a free good. As it grows, earlier messages get squeezed
          out to make room — which is why a model that understood your architecture perfectly
          at message five can contradict it at message fifty. Starting a fresh conversation is
          often the fix, not a defeat.
        </Callout>
      </LessonSection>

      <LessonSection id="why-it-invents-things" title="Why it invents functions you never wrote">
        <P>
          This is the behaviour people find most alarming, and it has a mundane explanation.
          The model predicts plausible text. When it cannot see your actual{" "}
          <InlineCode>formatDate</InlineCode> helper, it does not think &ldquo;I lack
          information.&rdquo; It thinks &ldquo;what would a <InlineCode>formatDate</InlineCode>{" "}
          helper look like in a project like this?&rdquo; — and writes that.
        </P>
        <P>
          The output is confident because plausible text is confident text. There is no
          internal signal that distinguishes &ldquo;I read this&rdquo; from &ldquo;I inferred
          this.&rdquo;
        </P>
        <CompareGrid
          items={[
            {
              title: "What it feels like",
              tone: "caution",
              children: (
                <p>
                  The AI lied to you, or is broken, or is not as capable as advertised.
                </p>
              ),
            },
            {
              title: "What actually happened",
              tone: "positive",
              children: (
                <p>
                  It filled a gap in what it could see with the most likely thing. Give it the
                  file and the invention stops.
                </p>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="test-what-it-can-see" title="Test what it can see">
        <P>
          Rather than guessing, ask. This costs one message and tells you more about your setup
          than any amount of theory:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Before answering anything else: list the files you can currently
see in this project, and tell me which parts of my codebase you
cannot see. Do not guess — if you are unsure, say so.`}
        />
        <P>
          Run this in each tool you use. A repo-aware agent lists real files. An autocomplete
          extension names your open file and little else. A browser chat says it sees nothing
          but what you pasted. All three answers are correct, and knowing which one you are
          holding changes how you prompt.
        </P>
      </LessonSection>

      <LessonSection id="working-with-the-limit" title="Working with the limit instead of against it">
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Reference files explicitly",
              detail:
                "Do not make the tool guess which of your 200 files matters. Naming two files is faster than any search it can run.",
            },
            {
              label: "Start fresh when the thread wanders",
              detail:
                "A new conversation with a good opening prompt beats a long one that has drifted. You are not losing progress — the code is on disk.",
            },
            {
              label: "Put durable facts in a rules file",
              detail:
                "Anything you find yourself repeating every session belongs somewhere the tool loads automatically.",
              note: "That is Chapter 15, and it is the highest-leverage thing in this part of the course.",
            },
            {
              label: "Paste errors in full",
              detail:
                "Your summary of an error drops the stack frame that identified the file. The raw text costs you nothing.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "The model has no memory. Every request ships a fresh package of text, and that package is its whole world.",
          "The context window is a budget, and the tool silently decides what to drop.",
          "Hallucinated functions are gap-filling, not dishonesty. Show it the real file and they stop.",
          "Ask a tool what it can see. The answer is often narrower than you assumed.",
          "A long, drifting conversation is worse than a fresh one with a good opening prompt.",
        ]}
      />
    </div>
  );
}
