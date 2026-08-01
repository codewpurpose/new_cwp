import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

interface Pattern {
  name: string;
  when: string;
  prompt: string;
  why: string;
}

const PATTERNS: Pattern[] = [
  {
    name: "Explain before you change",
    when: "You are about to touch code you do not fully understand.",
    prompt: `Before changing anything, explain what this file does and how
it is used elsewhere in the project. Then wait — do not edit yet.`,
    why: "Splits comprehension from modification. If the explanation is wrong, you have caught it before any code moved.",
  },
  {
    name: "Give me three options",
    when: "There is more than one reasonable approach and you do not know the tradeoffs.",
    prompt: `Give me three ways to solve this, with the tradeoff for each.
Do not write code yet. Recommend one and say why.`,
    why: "The first idea a model produces is the most common one, not the best one. Asking for three surfaces the alternatives it would otherwise skip.",
  },
  {
    name: "Constrain the blast radius",
    when: "Always, on any codebase you care about.",
    prompt: `Change only src/components/Cart.tsx. Do not add dependencies,
do not modify tests, and do not reformat code you are not
otherwise changing.`,
    why: "Unbounded requests produce unbounded diffs. Stating the boundary makes an over-reaching change obvious instead of invisible.",
  },
  {
    name: "Show me the diff first",
    when: "The change spans multiple files.",
    prompt: `Describe exactly what you plan to change, file by file,
before making any edits. I will confirm.`,
    why: "Reviewing a plan takes thirty seconds. Reviewing eleven files of applied changes takes twenty minutes.",
  },
  {
    name: "Reproduce, then fix",
    when: "Fixing a bug.",
    prompt: `First write a failing test that reproduces this bug.
Show me the test failing. Only then fix it.`,
    why: "Proves the bug is understood before it is patched, and leaves behind a test that stops it returning.",
  },
  {
    name: "Match what exists",
    when: "Adding to an established codebase.",
    prompt: `Find an existing component that does something similar and
follow its conventions — naming, file layout, error handling,
styling approach. Tell me which one you used as the model.`,
    why: "Prevents the AI from importing patterns from its training data that clash with everything around them.",
  },
  {
    name: "Name the failure modes",
    when: "The code handles user input, money, or anything external.",
    prompt: `List the ways this could fail — empty input, network error,
concurrent access, malformed data — then handle the ones that
are realistic here.`,
    why: "Happy-path code is the default output. Edge cases only appear when you ask for them by name.",
  },
  {
    name: "Rubber duck it back",
    when: "You are not sure the AI understood the request.",
    prompt: `Restate what I am asking for in your own words, including
anything you think is ambiguous. Do not start yet.`,
    why: "A misunderstanding costs one message to catch here, or an hour to catch after the code is written.",
  },
  {
    name: "Set the stopping condition",
    when: "Handing off a longer task.",
    prompt: `Work until npm run check passes with no errors. If you get
stuck twice on the same problem, stop and tell me rather
than trying another approach.`,
    why: "Gives an objective finish line and prevents the flailing loop where each 'fix' creates the next problem.",
  },
  {
    name: "Ask what it is unsure about",
    when: "Right before you accept anything substantial.",
    prompt: `What in this change are you least confident about,
and what should I check by hand?`,
    why: "Models are poorly calibrated but not uncalibrated. This reliably surfaces the weakest part of the diff.",
  },
];

export function PromptPatternsLesson() {
  return (
    <div>
      <Lead>
        Once you have written a few hundred prompts, you notice you are writing the same ten
        shapes over and over. Here they are, ready to copy. Learn the reasoning behind each and
        you will stop needing the list.
      </Lead>

      <Callout tone="tip" title="How to use this chapter">
        Do not try to memorise ten patterns. Pick the two that match a problem you have this
        week, use them until they are automatic, then come back.
      </Callout>

      <LessonSection id="the-patterns" title="The ten patterns">
        <div className="mt-2 space-y-8">
          {PATTERNS.map((pattern, index) => (
            <div key={pattern.name}>
              <h3 className="text-lg text-learn-strong">
                <span className="text-learn-accent-text">{index + 1}.</span> {pattern.name}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-learn-subtle">
                <Strong>Use when:</Strong> {pattern.when}
              </p>
              <CodeBlock variant="prompt" label="Prompt" code={pattern.prompt} />
              <p className="mt-3 text-[14px] leading-[1.55] text-learn-muted">
                <Strong>Why it works:</Strong> {pattern.why}
              </p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="the-thread-running-through-them" title="The thread running through them">
        <P>
          Read the ten together and one idea repeats: <Strong>separate thinking from doing</Strong>.
          Explain before changing. Plan before editing. Reproduce before fixing. Restate before
          starting.
        </P>
        <P>
          That is not a trick specific to language models. It is how you would brief a capable
          colleague who is fast, widely read, and has never seen your codebase — which is very
          close to what you are actually working with.
        </P>
      </LessonSection>

      <LessonSection id="building-your-own" title="Building your own">
        <P>
          When you catch yourself typing the same clarification for the third time, that is a
          pattern forming. Two options: keep it in a notes file you paste from, or — better —
          put it in a rules file so it applies automatically to every prompt without you typing
          anything. That is the next part of the course.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Separate thinking from doing. Almost every good pattern is some version of that.",
          "Ask for options before implementations when the approach is genuinely open.",
          "State the boundary explicitly, or the diff will decide its own size.",
          "“What are you least confident about?” is the cheapest review you can run.",
          "A clarification you have typed three times belongs in a rules file, not in your fingers.",
        ]}
      />
    </div>
  );
}
