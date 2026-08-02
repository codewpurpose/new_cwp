import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { GeneratorStepper } from "@/components/python/GeneratorStepper";

export function IteratorsAndGeneratorsLesson() {
  return (
    <div>
      <Lead>
        A list built to hold a million numbers holds all million in memory at once, whether
        you need them yet or not. Write a generator instead, pull one value at a time, and
        watch it produce the next number only when asked.
      </Lead>

      <LessonSection id="a-list-you-already-have-versus-a-value-not-made-yet" title="A list you already have, versus a value you have not made yet">
        <P>
          <Strong>{"[n for n in range(1_000_000)]"}</Strong> computes all one million values
          immediately and holds every one in memory before the line even finishes. If the
          program only ever needed the first three, the other 999,997 were wasted work.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def fibonacci_below(limit):
...     a, b = 1, 1
...     while a < limit:
...         yield a
...         a, b = b, a + b
...
>>> gen = fibonacci_below(20)
>>> gen
<generator object fibonacci_below at 0x1046a3...>`}
        />
        <P>
          Calling <Strong>fibonacci_below(20)</Strong> runs none of the function&apos;s body.
          It returns a <Strong>generator</Strong> — an object that remembers where to resume,
          but has not computed a single value yet.
        </P>
      </LessonSection>

      <LessonSection id="yield-pauses-a-function-instead-of-ending-it" title="yield pauses a function instead of ending it">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> next(gen)
1
>>> next(gen)
1
>>> next(gen)
2`}
        />
        <P>
          Every <Strong>next(gen)</Strong> call resumes the function exactly where{" "}
          <Strong>yield</Strong> last paused it, runs until the next{" "}
          <Strong>yield</Strong>, and hands back that one value. <Strong>return</Strong> would
          end the function for good — <Strong>yield</Strong> only pauses it.
        </P>
      </LessonSection>

      <GeneratorStepper />

      <LessonSection id="why-laziness-is-the-entire-point" title="Why laziness is the entire point">
        <P>
          A generator that never finishes, like one counting upward forever, would be
          impossible as a list — there would be no last value to stop at. As a generator it
          works fine, because nothing is computed until something actually asks{" "}
          <Strong>next()</Strong> for it.
        </P>
        <Callout tone="note" title="Where this shows up without you writing yield">
          <Strong>range()</Strong>, dictionary <Strong>.items()</Strong>, and reading a file
          line by line with <Strong>for line in f:</Strong> all behave lazily for exactly this
          reason — none of them build the full sequence in memory before the loop starts.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A generator function contains yield and returns a paused generator object the moment it's called — none of its body has run yet.",
          "next(generator) resumes the function until the next yield, then pauses again and hands back that one value.",
          "Unlike return, yield doesn't end the function — the next next() call picks up right where it left off.",
          "A generator computes values one at a time on demand, which is the only way to represent a sequence that's huge or never-ending.",
        ]}
      />
    </div>
  );
}
