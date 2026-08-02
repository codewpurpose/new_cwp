import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { TruthinessChecker } from "@/components/python/TruthinessChecker";

export function SetsAndTruthinessLesson() {
  return (
    <div>
      <Lead>
        Python will evaluate almost anything as true or false, including things that are
        neither. Feed in an empty list, the number zero, and the string that spells the word
        False, and see which ones the language actually treats as false.
      </Lead>

      <LessonSection id="what-counts-as-empty" title="What counts as empty">
        <P>
          Write <Strong>if some_list:</Strong> instead of{" "}
          <Strong>{"if len(some_list) > 0:"}</Strong> and Python will do exactly what you
          mean — but only because it treats every empty collection, and the number zero, as
          false.
        </P>
        <ChecklistCard
          title="What Python treats as false"
          intro="Everything below is falsy. Every other value in the language, no matter how it looks, is truthy."
          marker="dot"
          items={[
            <>
              <Strong>0</Strong> and <Strong>0.0</Strong> — but no other number, including{" "}
              <Strong>-1</Strong>.
            </>,
            <>
              <Strong>{'""'}</Strong> — the empty string, and only the empty string.
            </>,
            <>
              <Strong>[]</Strong>, <Strong>{"{}"}</Strong>, and <Strong>set()</Strong> — an
              empty list, dictionary, or set.
            </>,
            <>
              <Strong>None</Strong> — Python&apos;s stand-in for &quot;no value at all&quot;.
            </>,
            <>
              <Strong>False</Strong> itself, which is where the whole idea starts.
            </>,
          ]}
        />
        <P>
          The list is short, and the trap is what is missing from it. The string{" "}
          <Strong>{'"False"'}</Strong> is not empty — it has five characters in it — so it is
          truthy, despite spelling out the word. A list holding a single{" "}
          <Strong>0</Strong> is not empty either; it has one item, so it too is truthy.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> bool(0)
False
>>> bool("False")
True
>>> bool([])
False
>>> bool([0])
True`}
        />
      </LessonSection>

      <TruthinessChecker />

      <LessonSection id="empty-does-not-mean-missing" title="Empty does not mean missing">
        <P>
          <Strong>if x:</Strong> treats an empty list, the number <Strong>0</Strong>, and{" "}
          <Strong>None</Strong> as exactly the same kind of false. Most of the time that is
          fine. It stops being fine the moment an empty list or a zero is a valid answer you
          still need to tell apart from no answer having arrived at all.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def summarise(votes=None):
...     if votes:
...         print(f"{len(votes)} votes counted")
...     else:
...         print("no votes yet")
...
>>> summarise([])
no votes yet
>>> summarise([1, 2, 3])
3 votes counted`}
        />
        <P>
          The round with zero votes and the round that has not started yet print the identical
          message, because <Strong>[]</Strong> and <Strong>None</Strong> both fail{" "}
          <Strong>if votes:</Strong>. Ask the narrower question instead, and the two cases
          separate:
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def summarise(votes=None):
...     if votes is not None:
...         print(f"{len(votes)} votes counted")
...     else:
...         print("no votes yet")
...
>>> summarise([])
0 votes counted`}
        />
        <Callout tone="note" title="Reach for is not None whenever zero is a real answer">
          The bug is invisible in testing if you never happen to pass an empty list, a zero, or
          an empty string as a genuine result. It shows up later, in production, on the one
          input nobody tried by hand.
        </Callout>
      </LessonSection>

      <LessonSection id="the-same-value-is-not-the-same-object" title="The same value is not the same object">
        <P>
          <Strong>==</Strong> asks whether two things hold equal values. <Strong>is</Strong>{" "}
          asks whether two names point at the exact same object sitting in memory. Almost every
          comparison you write wants <Strong>==</Strong>.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> a = [1, 2, 3]
>>> b = [1, 2, 3]
>>> a == b
True
>>> a is b
False`}
        />
        <P>
          <Strong>a</Strong> and <Strong>b</Strong> are two separate lists that happen to hold
          equal contents, built on two separate lines. <Strong>is</Strong> sees straight
          through the equal values to the fact that they are different objects — change{" "}
          <Strong>a</Strong>, and <Strong>b</Strong> does not move.
        </P>
        <P>
          The one place <Strong>is</Strong> is the right tool, always, is comparing against{" "}
          <Strong>None</Strong>. <Strong>None</Strong> is a single object that exists exactly
          once for the whole program, so identity is precisely the question you mean to ask.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> x = None
>>> x is None
True`}
        />
        <Callout tone="tip" title="Write is None, not == None">
          Both work today, but <Strong>is None</Strong> is the idiom — it is faster, and it
          stays correct even against an object whose class has redefined what{" "}
          <Strong>==</Strong> means.
        </Callout>
      </LessonSection>

      <LessonSection id="a-collection-that-refuses-duplicates" title="A collection that refuses duplicates">
        <P>
          A <Strong>set</Strong> is an unordered collection that will not hold the same value
          twice — add a duplicate, and nothing happens, silently.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> tags = ["python", "beginner", "python", "tutorial"]
>>> set(tags)
{'python', 'beginner', 'tutorial'}`}
        />
        <P>
          Turning a list into a set is the fastest way to deduplicate it. Notice the order is
          not preserved — a set does not remember which item came first, only which items
          exist. If you need the duplicates gone <em>and</em> the original order kept, a
          dictionary does the job instead, because a dictionary&apos;s keys can never repeat
          and it does remember insertion order:
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> list(dict.fromkeys(tags))
['python', 'beginner', 'tutorial']`}
        />
      </LessonSection>

      <LessonSection id="the-operations-a-set-is-actually-for" title="The operations a set is actually for">
        <P>
          A set is not just a list with duplicates removed. It carries its own arithmetic for
          comparing two collections at once, straight out of how you would describe sets on a
          maths whiteboard.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> admins = {"ada", "grace"}
>>> editors = {"grace", "alan"}
>>> admins | editors
{'ada', 'grace', 'alan'}
>>> admins & editors
{'grace'}
>>> admins - editors
{'ada'}
>>> admins ^ editors
{'ada', 'alan'}`}
        />
        <LabelRows
          rows={[
            { label: "| union", text: "Everyone in either set." },
            { label: "& intersection", text: "Only the people who are in both." },
            { label: "- difference", text: "In the first set, and not in the second." },
            { label: "^ symmetric diff", text: "In exactly one of the two, never both." },
          ]}
        />
        <P>
          <Strong>admins & editors</Strong> answers &quot;who has both roles&quot; in one
          expression, with no loop and no temporary list — which is usually why a set was the
          right choice before deduplication even came into it.
        </P>
      </LessonSection>

      <LessonSection id="testing-membership-without-a-loop" title="Testing membership without a loop">
        <P>
          Membership testing is the reason sets exist at all. Checking whether a value is in a
          list means Python walks the list from the start until it finds it, or reaches the
          end. Checking a set is close to instant regardless of size, because a set is built,
          internally, for exactly this question.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> allowed = {"admin", "editor", "viewer"}
>>> "editor" in allowed
True`}
        />
        <Callout tone="tip" title="When the speed actually shows up">
          For a handful of items the difference is invisible. Checking membership against
          thousands of items, repeatedly, inside a loop, is where reaching for a set instead
          of a list changes a program from slow to instant.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "0, empty strings, empty collections, and None are all falsy. Everything else, including the string \"False\", is truthy.",
          "if x: and if x is not None: are different questions — use the second whenever an empty value is a real, valid answer you must not confuse with a missing one.",
          "== compares values; is compares identity. Use is only for None, and == for everything else.",
          "A set holds each value at most once, and set(some_list) is the fastest way to deduplicate — at the cost of losing the original order.",
          "Membership tests (in) are close to instant on a set and get slower the longer a list is. That speed is the reason sets exist.",
        ]}
      />
    </div>
  );
}
