import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          Nothing requires the items in a list to share a type — <Strong>{'[1, "two", 3.0]'}</Strong>{" "}
          is a perfectly ordinary list of three items, an int, a string, and a float, all in
          the same one. Python does not check or care; it only cares that the list itself
          stays ordered and stays a list.
        </P>
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

      <LessonSection id="the-copy-versus-reference-trap" title="The copy-versus-reference trap">
        <P>
          You already know from the earlier lesson on variables that a name points at a
          value, it does not hold a copy of one. Lists make the consequence hard to miss:
          assigning one list to a second name never copies it, no matter how much the
          assignment looks like it should.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> original = [1, 2, 3]
>>> copy = original
>>> copy.append(4)
>>> original
[1, 2, 3, 4]`}
          lineTones={{ 4: "warn" }}
        />
        <P>
          <Strong>copy</Strong> was never a copy. It is a second name on the same list, so
          changing it through one name is visible through the other. The same trap reappears
          the moment you hand a list to a function — the parameter inside the function is
          another name on your original list, not a private version of it.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`def add_bonus(scores):
    scores.append(100)

results = [88, 92, 79]
add_bonus(results)
print(results)
# [88, 92, 79, 100]`}
        />
        <P>
          Nothing about <Strong>add_bonus</Strong> looks dangerous, and the effect on{" "}
          <Strong>results</Strong> was not written anywhere in the calling code. If you meant
          to work on a private copy, you have to ask for one explicitly — there are three
          equivalent ways.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> original = [1, 2, 3]
>>> safe = original.copy()
>>> safe = list(original)
>>> safe = original[:]
>>> safe.append(4)
>>> original
[1, 2, 3]`}
        />
        <Callout tone="tip" title="This copy is shallow">
          <Strong>.copy()</Strong> copies the list itself, not what is inside it. A list of
          lists still shares its inner lists after copying — only a true nested copy, which
          is a problem for later, avoids that.
        </Callout>
      </LessonSection>

      <LessonSection
        id="methods-that-return-something-and-the-one-that-does-not"
        title="Methods that return something, and the one that does not"
      >
        <P>
          A list comes with a handful of methods that change it in place. Most of them hand
          you something useful back as well — except the one every beginner eventually
          assigns away by accident.
        </P>
        <LabelRows
          rows={[
            {
              label: "append(x)",
              text: "Adds x to the end. Returns None — the list itself changes in place.",
            },
            {
              label: "pop()",
              text: "Removes and returns the last item, or the item at a given index.",
            },
            {
              label: "remove(x)",
              text: "Removes the first x it finds. Returns None. Raises ValueError if x is not there.",
            },
            {
              label: "sort()",
              text: "Sorts the list in place. Returns None — never assign a list to the result of calling this.",
            },
            {
              label: "count(x)",
              text: "Returns how many times x appears, without changing the list at all.",
            },
          ]}
        />
        <Callout tone="danger" title="numbers = numbers.sort() deletes your list">
          <Strong>{"numbers.sort()"}</Strong> sorts in place and hands back{" "}
          <Strong>None</Strong>, on purpose, as a reminder that it mutated rather than built
          something new. Write <Strong>{"numbers = numbers.sort()"}</Strong> out of habit —
          the way you might with a string method, which does return something — and{" "}
          <Strong>numbers</Strong> is now <Strong>None</Strong>. The sorted list existed for
          one line and then you overwrote it.
        </Callout>
        <P>
          The safe alternative already has a different name, on purpose: the built-in{" "}
          <Strong>sorted()</Strong> function.
        </P>
        <CompareGrid
          items={[
            {
              title: "sorted(numbers)",
              tone: "positive",
              children: (
                <P>
                  Returns a brand new sorted list and leaves the original untouched. Always
                  safe to write <Strong>{"numbers = sorted(numbers)"}</Strong>.
                </P>
              ),
            },
            {
              title: "numbers.sort()",
              tone: "caution",
              children: (
                <P>
                  Sorts the existing list in place and returns <Strong>None</Strong>. Call it
                  on its own line — never assign its result back to anything.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Lists and tuples are both ordered — the difference is that a list can change size and contents, a tuple cannot.",
          "A tuple being unchangeable is deliberate: it guarantees nothing downstream can alter what you handed it.",
          "Assigning a list to a new name never copies it. Use .copy(), list(x), or x[:] when you actually need a separate list.",
          "A list passed into a function is the same list, not a private copy — changes made inside are visible after the call returns.",
          "sort() mutates in place and returns None. sorted() returns a new sorted list and leaves the original alone — never assign the first one to a name.",
        ]}
      />
    </div>
  );
}
