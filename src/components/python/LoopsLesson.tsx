import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
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
          <Strong>fruit</Strong> is not an index — it <em>is</em> each item, in turn. That is
          the idiom: if you catch yourself writing{" "}
          <Strong>{"for i in range(len(fruits)):"}</Strong> and then immediately indexing{" "}
          <Strong>{"fruits[i]"}</Strong>, you have written the position-counting version of a
          loop that Python already gives you directly.
        </P>
        <P>
          If you need the position too, <Strong>enumerate()</Strong> hands you both without
          you tracking a counter yourself.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for i, fruit in enumerate(["apple", "banana", "cherry"]):
...     print(i, fruit)
0 apple
1 banana
2 cherry`}
        />
      </LessonSection>

      <LessonSection id="range-is-a-sequence-you-can-count-through" title="range is a sequence you can count through, not a list">
        <P>
          <Strong>{"range(5)"}</Strong> looks like it should produce a list of five numbers,
          and printing the result of looping over it certainly behaves that way. It is not
          one — it is a lazy sequence that produces each number only as the loop asks for it.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> range(5)
range(0, 5)
>>> list(range(5))
[0, 1, 2, 3, 4]
>>> list(range(2, 10, 3))
[2, 5, 8]`}
        />
        <P>
          <Strong>{"range(5)"}</Strong> counts from 0 up to, but never including, 5 — five
          numbers, not six. <Strong>{"range(2, 10, 3)"}</Strong> adds a start and a step: begin
          at 2, add 3 each time, stop before 10. The stop value is never itself produced,
          which is the same off-by-one convention string slicing uses.
        </P>
        <Callout tone="tip" title="Why the laziness matters">
          <Strong>{"range(1_000_000_000)"}</Strong> does not build a billion-item list in
          memory — it holds three numbers, start, stop, and step, and computes each value on
          demand. Looping over it costs the same either way; storing it as a list would not.
        </Callout>
      </LessonSection>

      <LessonSection id="zip-walks-two-collections-side-by-side" title="zip walks two collections side by side">
        <P>
          Looping over two lists in step usually starts as indexing both of them by the same
          counter. <Strong>zip()</Strong> pairs them up directly, one item from each per
          iteration.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> names = ["Ada", "Grace", "Alan"]
>>> scores = [98, 91, 87]
>>> for name, score in zip(names, scores):
...     print(f"{name}: {score}")
Ada: 98
Grace: 91
Alan: 87`}
        />
        <P>
          If the two collections are different lengths, <Strong>zip()</Strong> stops as soon
          as the shorter one runs out, silently. A fourth name with no matching score never
          produces a pairing and never raises an error — worth checking for explicitly if
          mismatched lengths would actually be a bug in your program rather than expected.
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

      <LessonSection id="break-continue-and-what-else-means-on-a-loop" title="break, continue, and what else means on a loop">
        <P>
          Two keywords change a loop&apos;s path through its own body without changing the
          condition that controls it. <Strong>break</Strong> exits the loop immediately, skipping
          every remaining iteration. <Strong>continue</Strong> skips only the rest of the
          current iteration and moves on to the next one.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "break stops the loop outright",
              detail: "Found what you were looking for? Stop checking the rest — nothing after break in that iteration runs, and no further iterations happen either.",
            },
            {
              label: "continue skips to the next iteration",
              detail: "Want to ignore this one item and move on? continue jumps straight back to the top of the loop for the next value, without exiting.",
            },
            {
              label: "else runs only if the loop was never broken",
              detail: "A for or while loop can carry its own else block, which runs when the loop finishes normally — and is skipped entirely if break ever fired.",
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for n in [2, 4, 6, 9, 10]:
...     if n % 2 != 0:
...         print(f"found an odd one: {n}")
...         break
... else:
...     print("every number was even")
found an odd one: 9`}
          lineTones={{ 6: "accent" }}
        />
        <P>
          Change the list to all-even numbers and the loop finishes without ever hitting{" "}
          <Strong>break</Strong>, so the <Strong>else</Strong> block runs and prints{" "}
          <Strong>&quot;every number was even&quot;</Strong>. This is the one place{" "}
          <Strong>else</Strong> does not mean &quot;otherwise&quot; the way it does on an{" "}
          <Strong>if</Strong> — here it means &quot;the loop completed without a break&quot;,
          which is precisely the condition you would otherwise track with a separate flag
          variable.
        </P>
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
        <Callout tone="danger" title="Never add to or remove from a list while looping over it">
          A <Strong>for</Strong> loop tracks its position in the list it is iterating, by
          index, behind the scenes. Remove an item mid-loop and every item after it shifts
          down one slot into the position the loop has already passed — silently skipping the
          next item without raising any error at all.
        </Callout>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> numbers = [2, 4, 6, 7, 8]
>>> for n in numbers:
...     if n % 2 == 0:
...         numbers.remove(n)
>>> numbers
[4, 7]`}
          lineTones={{ 5: "err" }}
        />
        <P>
          4 survives, and it is even — it never gets checked. Removing 2 shifts 4 down into
          the slot the loop has already passed, so the loop&apos;s cursor jumps straight over
          it to 6. Loop over{" "}
          <Strong>{"numbers[:]"}</Strong>, a copy, or build a new list with a comprehension
          instead, and the loop you are iterating never changes shape underneath you.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "for iterates over the items directly. If you are indexing with a counter, you have written the version Python already does for you.",
          "range is lazy: range(1_000_000_000) holds three numbers, not a billion, and produces each value only when the loop asks.",
          "zip pairs two collections item by item and stops silently at the shorter one — check lengths yourself if a mismatch would be a bug.",
          "break exits a loop outright; continue skips to the next iteration; a loop's own else runs only if break never fired.",
          "Never add to or remove from a list while a for loop is iterating over it — items shift underneath the loop and get silently skipped.",
        ]}
      />
    </div>
  );
}
