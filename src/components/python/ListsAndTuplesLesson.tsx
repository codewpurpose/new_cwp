import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { ListVsTuple } from "@/components/python/ListVsTuple";

export function ListsAndTuplesLesson() {
  return (
    <div>
      <Lead>
        Python gives you two ways to hold an ordered group of things, and the difference is
        not the brackets. Try to change a tuple the way you would a list, and read exactly
        what it refuses, and why.
      </Lead>

      <LessonSection id="an-ordered-collection-you-can-change" title="An ordered collection you can change">
        <P>
          A <Strong>list</Strong> holds items in order, and you can add to it, remove from
          it, or replace an item at a position, all after it already exists.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> fruit = ["apple", "banana"]
>>> fruit.append("cherry")
>>> fruit
['apple', 'banana', 'cherry']
>>> fruit[0] = "avocado"
>>> fruit
['avocado', 'banana', 'cherry']`}
        />
      </LessonSection>

      <LessonSection id="the-same-idea-deliberately-locked" title="The same idea, deliberately locked">
        <P>
          A <Strong>tuple</Strong> looks almost identical — ordered, indexable, written with{" "}
          <Strong>()</Strong> instead of <Strong>[]</Strong> — except that once it is created,
          it cannot be changed at all.
        </P>
      </LessonSection>

      <ListVsTuple />

      <LessonSection id="why-the-distinction-is-worth-keeping" title="Why the distinction is worth keeping">
        <P>
          A tuple being locked is not a missing feature, it is the point. A function that
          returns a pair of coordinates, <Strong>{"(x, y)"}</Strong>, returns a tuple on
          purpose — nothing downstream can accidentally reorder or extend it, because nothing
          downstream is allowed to touch it at all.
        </P>
        <P>
          As a rule of thumb: reach for a tuple when the number of items is fixed by what the
          data <em>is</em> — a coordinate is always two numbers, a date is always three. Reach
          for a list when the number of items is expected to change while the program runs.
        </P>
        <Callout tone="note" title="One tuple worth knowing about">
          A tuple with one item needs a trailing comma —{" "}
          <Strong>{"(1,)"}</Strong>, not <Strong>{"(1)"}</Strong>. Without it, Python reads
          the parentheses as grouping, not a tuple, and{" "}
          <Strong>{"(1)"}</Strong> is just the number 1.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Lists and tuples are both ordered — the difference is that a list can change size and contents, a tuple cannot.",
          "A tuple being unchangeable is deliberate: it guarantees nothing downstream can alter what you handed it.",
          "Use a tuple when the number of items is fixed by what the data is. Use a list when it is expected to grow or shrink.",
          "A one-item tuple needs a trailing comma — (1,) — or Python does not treat it as a tuple at all.",
        ]}
      />
    </div>
  );
}
