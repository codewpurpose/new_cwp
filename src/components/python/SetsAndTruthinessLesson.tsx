import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
      </LessonSection>

      <TruthinessChecker />

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
          exist.
        </P>
      </LessonSection>

      <LessonSection id="testing-membership-without-a-loop" title="Testing membership without a loop">
        <P>
          Checking whether a value is in a list means Python walks the list from the start
          until it finds it, or reaches the end. Checking a set is close to instant regardless
          of size, because a set is built for exactly this question.
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
          "0, empty strings, empty collections, and None are all falsy. Everything else, including \"False\" the string, is truthy.",
          "A set holds each value at most once — adding a duplicate does nothing, silently.",
          "set(some_list) is the fastest way to deduplicate a list, at the cost of losing its order.",
          "Membership tests (in) are close to instant on a set, and get slower the longer a list is.",
        ]}
      />
    </div>
  );
}
