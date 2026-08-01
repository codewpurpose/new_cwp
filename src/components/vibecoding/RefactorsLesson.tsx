import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function RefactorsLesson() {
  return (
    <div>
      <Lead>
        A refactor is where AI assistance is most tempting and most dangerous: enormous
        mechanical effort, and a failure mode where everything still compiles but something
        subtle is now wrong. The trick is sequencing it so every step is verifiable.
      </Lead>

      <LessonSection id="the-two-kinds" title="Two kinds of large change">
        <P>
          Before starting, work out which one you have — because they need opposite treatment.
        </P>
        <StepList
          steps={[
            {
              label: "Mechanical",
              detail:
                "Renaming a symbol, changing an import path, moving files. The compiler or type checker can confirm the result. Safe to do all at once.",
            },
            {
              label: "Semantic",
              detail:
                "Changing what code does — splitting a component, altering a data shape, replacing a state approach. Nothing automatic confirms correctness. Must be done in steps.",
            },
          ]}
        />
        <P>
          People get hurt by treating a semantic refactor as if it were mechanical, because it
          looked mechanical while it was happening.
        </P>
      </LessonSection>

      <LessonSection id="make-it-verifiable-first" title="Make it verifiable first">
        <P>
          The most important work happens before any refactoring. If you cannot tell whether
          behaviour changed, you cannot safely change it — with or without AI.
        </P>
        <CodeBlock
          variant="prompt"
          label="Step zero"
          code={`Before we refactor anything: write tests that capture the
current behaviour of src/lib/pricing.ts, including the edge
cases. Do not change the implementation. These tests should
pass against the code exactly as it is now.`}
        />
        <P>
          These are <Strong>characterisation tests</Strong> — they do not assert that the code
          is right, only that it does what it currently does. That is precisely what you need,
          because a refactor is by definition supposed to preserve behaviour.
        </P>
        <Callout tone="success" title="Why this is the highest-value prompt in the chapter">
          With characterisation tests, a refactor becomes falsifiable: the tests pass or they do
          not. Without them you are relying on reading the diff carefully, which does not scale
          past a few hundred lines.
        </Callout>
      </LessonSection>

      <LessonSection id="sequence-it" title="Sequence it so each step stands alone">
        <P>
          Ask for a plan before any edits, and require that each step compile and pass tests on
          its own:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`I want to split the 600-line Dashboard component into smaller
pieces. Plan this as a sequence of steps where each one:

- changes as few files as possible
- leaves the app compiling and tests passing
- can be committed on its own

Show me the plan. Do not edit anything yet.`}
        />
        <P>
          Then execute one step per prompt, running your checks and committing between each.
          This is the small-diffs principle applied to a change that superficially looks like it
          has to happen all at once.
        </P>
      </LessonSection>

      <LessonSection id="use-the-type-checker" title="Let the type checker do the reviewing">
        <P>
          In a typed codebase there is a technique that turns a risky refactor into a guided
          one: <Strong>change the type first and let the errors tell you where to go</Strong>.
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Change the User type so that 'name' becomes 'firstName' and
'lastName'. Do not fix any of the resulting errors yet —
just run the type checker and show me the full list of
places that now break.`}
        />
        <P>
          That list is an exhaustive, machine-generated inventory of every call site. It is more
          reliable than any search, and more reliable than the model&rsquo;s own sense of
          completeness — which is the thing you should least want to depend on here.
        </P>
      </LessonSection>

      <LessonSection id="what-goes-wrong" title="What goes wrong, specifically">
        <StepList
          steps={[
            {
              label: "Silent behaviour changes",
              detail:
                "It “simplifies” logic while moving it, and an edge case quietly disappears. Characterisation tests catch this; reading does not.",
            },
            {
              label: "Partial application",
              detail:
                "Eleven of thirteen call sites updated. Compiles if the types are loose. Ask explicitly whether any were missed, and verify with a search.",
            },
            {
              label: "Scope creep",
              detail:
                "Reformatting, renaming, and reordering mixed into the same diff, hiding the two lines that actually matter. State up front that unrelated changes are not wanted.",
            },
            {
              label: "Losing the thread",
              detail:
                "Step nine of a twelve-step refactor contradicts step three. This is the context window filling up — restart the conversation with the plan and current state.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-escape-hatch" title="The escape hatch">
        <P>
          Do the whole refactor on a branch. If it goes wrong three steps in, you delete the
          branch rather than trying to reverse-engineer your way back:
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git switch -c refactor/split-dashboard
# ... work, committing after each verified step ...
git switch main        # if it went badly
git branch -D refactor/split-dashboard`}
        />
        <P>
          Abandoning a refactor is a normal outcome, not a failure. The branch makes it cost
          nothing but the time already spent.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Decide whether the change is mechanical or semantic. Semantic changes must be stepped.",
          "Write characterisation tests first — they make “did behaviour change?” answerable.",
          "Ask for a plan where every step compiles, passes, and commits on its own.",
          "Change the type first and let the compiler produce an exhaustive list of call sites.",
          "Work on a branch, so abandoning it costs nothing.",
          "If step nine contradicts step three, the context is full. Restart with the plan.",
        ]}
      />
    </div>
  );
}
