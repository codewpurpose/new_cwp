import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { BranchHighlighter } from "@/components/python/BranchHighlighter";

export function ConditionalsLesson() {
  return (
    <div>
      <Lead>
        A program that always does the same thing is not a program, it is a constant. Feed
        one input through a chain of conditions and watch exactly one branch of it ever run.
      </Lead>

      <LessonSection id="a-program-that-chooses" title="A program that chooses">
        <CodeBlock
          label="age_check.py"
          code={`if age >= 18:
    print("adult")
else:
    print("not an adult")`}
        />
        <P>
          <Strong>if</Strong> tests a condition. If it is true, the indented block underneath
          runs and Python skips the <Strong>else</Strong> entirely. If it is false, the{" "}
          <Strong>if</Strong> block is skipped and the <Strong>else</Strong> runs instead.
          Never both.
        </P>
      </LessonSection>

      <LessonSection id="elif-is-not-a-second-if" title="elif is not a second if">
        <P>
          Stack two separate <Strong>if</Strong> statements and Python checks both of them,
          every time, even after the first one already matched. <Strong>elif</Strong> checks
          only if everything above it was false — and the moment one branch matches, every
          branch after it is skipped without being evaluated at all.
        </P>
      </LessonSection>

      <BranchHighlighter />

      <LessonSection id="what-python-accepts-in-place-of-true-or-false" title="What Python accepts in place of true or false">
        <P>
          A condition does not have to be written as a comparison. Any value can sit after{" "}
          <Strong>if</Strong>, and Python converts it to <Strong>True</Strong> or{" "}
          <Strong>False</Strong> the same way <Strong>bool()</Strong> would.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = ""
>>> if name:
...     print("has a name")
... else:
...     print("empty")
empty`}
        />
        <Callout tone="note" title="and / or, not && / ||">
          Python spells out its boolean operators as words —{" "}
          <Strong>and</Strong>, <Strong>or</Strong>, <Strong>not</Strong> — rather than the{" "}
          <Strong>{"&&"}</Strong>, <Strong>{"||"}</Strong> symbols many other languages use.
          Both read the same way you would say the condition out loud.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Exactly one branch of an if/elif/else chain runs. Once one matches, everything after it is skipped.",
          "elif only gets checked if every condition above it was false — unlike a stack of separate if statements.",
          "Any value can act as a condition; Python converts it to True or False the same way bool() would.",
          "Python's boolean operators are the words and, or, and not, not symbols.",
        ]}
      />
    </div>
  );
}
