import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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

      <LessonSection id="the-illusion-of-one-continuous-conversation" title="The illusion of one continuous conversation">
        <P>
          The chat window makes this harder to see, because it is designed to look continuous.
          Your messages stay on screen, scrolling upward, reading like a conversation with
          someone who remembers what you said earlier. Nothing about the interface tells you
          that underneath, each message you send triggers a completely fresh request — the model
          wakes up, is handed the transcript so far as plain text, answers, and then, in every
          sense that matters, stops existing until the next message arrives.
        </P>
        <P>
          &ldquo;Remembering&rdquo; what you said five minutes ago is not memory in any sense a
          person would recognise. It is re-reading. The transcript is included again, in full,
          every single time — right up until it gets too large to fit, at which point the tool
          starts quietly leaving parts of it out, usually the oldest parts first. You experience
          that as the model forgetting. What actually happened is closer to someone being handed
          a shorter and shorter set of notes to read before answering.
        </P>
        <Callout tone="note" title="Why closing the tab doesn't lose anything">
          Since nothing is genuinely remembered between requests, starting a new conversation
          costs you nothing except having to restate context the model needs. It does not erase
          your code, and it does not erase progress — the code was never in the model&rsquo;s
          memory to begin with. It was always just on your disk.
        </Callout>
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

      <LessonSection id="how-big-a-window-actually-is-in-practice" title="How big a window actually is, in practice">
        <P>
          &ldquo;Hundreds of thousands of tokens&rdquo; is an abstract number until you put your
          own project next to it. Roughly speaking a token is three-quarters of a word, and the
          maths runs in a direction most people do not expect: a paragraph of prose is cheap, a
          single file is still cheap, and a whole codebase adds up far faster than either.
        </P>
        <LabelRows
          rows={[
            { label: "Short prompt", text: "Around fifty tokens — roughly the sentence you just typed." },
            { label: "One file", text: "A few hundred to a couple of thousand tokens, depending on how long it is." },
            { label: "This lesson", text: "Somewhere in the low thousands of tokens, as plain text." },
            { label: "A small project", text: "Tens of thousands of tokens once you count every file." },
            { label: "A mid-sized repo", text: "Easily past a million tokens — more than any single request can hold, whichever tool or model you are using." },
          ]}
        />
        <P>
          The jump from &ldquo;one file&rdquo; to &ldquo;the whole repo&rdquo; is where budgets
          actually run out. A single component fits with room to spare. A directory of forty
          related files starts competing with everything else that also needs a place in the
          package: the system prompt, your rules file, the conversation so far. Something gives,
          and it is rarely the part you would have chosen yourself.
        </P>
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

      <LessonSection id="two-different-kinds-of-knowing" title="Two different kinds of knowing">
        <P>
          There are two entirely different sources a model draws on, and mixing them up is most
          of why hallucination feels unpredictable. The first is what it learned during
          training: the shape of idiomatic code, common library APIs, the usual name for the
          usual pattern, absorbed from a huge amount of text it cannot point back to and cannot
          quote a source for.
        </P>
        <P>
          The second is what is sitting in the context window right now — your actual files, in
          this actual request. The model does not experience these as different in kind, so it
          does not warn you when it switches from one to the other. It writes your project&rsquo;s{" "}
          <InlineCode>formatDate</InlineCode> helper using the second source, and a
          plausible-looking substitute using the first, in exactly the same confident voice.
        </P>
        <Callout tone="warning" title="The tell, when there is one">
          Trained-in knowledge tends to be generically correct and locally wrong — it matches
          how most projects do a thing, not how yours does it. If a suggestion reads like a
          tutorial answer rather than something that reflects your other files, that is usually
          why.
        </Callout>
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
              note: "That is Chapter 15, and it is the highest-payoff thing in this part of the course.",
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
          "The model has no memory. Every request ships a fresh package of text, and that package is its whole world for that one reply.",
          "The chat window's continuity is an illusion — 'remembering' is re-reading the transcript, and once a message ages out of the window it is genuinely gone from what the model can see.",
          "The context window is a budget, and a handful of files eats it far faster than any amount of prose.",
          "Hallucinated functions come from two different sources, trained-in patterns and your actual files, and the model never tells you which one it used.",
          "Ask a tool what it can see before you trust its answer. The honest reply is often narrower than you assumed.",
        ]}
      />
    </div>
  );
}
