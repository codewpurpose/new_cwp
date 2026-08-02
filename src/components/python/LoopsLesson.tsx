import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { LoopStepper } from "@/components/python/LoopStepper";

export function LoopsLesson() {
  return (
    <div>
      <Lead>
        Looping in Python means iterating over the thing itself, not counting up to its
        length and hoping you stop in time. Step through a collection one item at a time and
        watch the loop variable outlive the loop that created it.
      </Lead>

      <LessonSection id="iterating-over-the-thing-not-an-index-into-it" title="Iterating over the thing, not an index into it">
        <P>
          Many languages loop by counting: start at 0, stop before the length, index in each
          time. Python&apos;s <Strong>for</Strong> hands you the items directly.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for fruit in ["apple", "banana", "cherry"]:
...     print(fruit)
apple
banana
cherry`}
        />
        <P>
          <Strong>fruit</Strong> is not an index — it <em>is</em> each item, in turn. If you
          genuinely need the position too, <Strong>enumerate()</Strong> hands you both without
          you tracking a counter yourself: <Strong>{"for i, fruit in enumerate(fruits):"}</Strong>.
        </P>
      </LessonSection>

      <LoopStepper />

      <LessonSection id="while-repeating-until-something-changes" title="While: repeating until something changes">
        <P>
          Use <Strong>for</Strong> when you already have the collection to iterate over. Use{" "}
          <Strong>while</Strong> when you are repeating until a condition changes, and you do
          not know in advance how many times that will take.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> total = 0
>>> while total < 10:
...     total += 3
>>> total
12`}
        />
        <Callout tone="warning" title="The bug this always eventually causes">
          If nothing inside the loop ever makes the condition false, <Strong>while</Strong>{" "}
          never stops. Before you write one, check that something inside the loop body
          actually moves it toward being finished.
        </Callout>
      </LessonSection>

      <LessonSection id="the-loop-variable-outlives-the-loop" title="The loop variable is still there after the loop ends">
        <P>
          Unlike some languages, Python does not create a fresh scope for a loop body. The
          variable you loop with is an ordinary name in the surrounding function or module,
          and it keeps whatever value it last held once the loop finishes.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for fruit in ["apple", "banana", "cherry"]:
...     pass
>>> fruit
'cherry'`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "for iterates over the items directly. Use enumerate() if you also need the position.",
          "Use while when you are repeating until a condition changes, not counting through a known collection.",
          "A while loop whose condition never becomes false never stops — check that the body moves it toward finishing.",
          "A loop variable is not deleted when the loop ends. It keeps the last value it was assigned.",
        ]}
      />
    </div>
  );
}
