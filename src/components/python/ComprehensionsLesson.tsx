import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { ComprehensionSideBySide } from "@/components/python/ComprehensionSideBySide";

export function ComprehensionsLesson() {
  return (
    <div>
      <Lead>
        Building a new list from an old one usually starts as three lines: an empty list, a
        loop, and an append. Write the same transformation as one line, and read it back
        exactly as fast as you wrote it.
      </Lead>

      <LessonSection id="the-three-line-version-first" title="The three-line version, first">
        <P>
          <Strong>squares = []</Strong> starts empty. The loop runs once per number, and{" "}
          <Strong>squares.append(n * n)</Strong> grows the list by one each time. Nothing here
          is wrong — it is just three lines to say one idea.
        </P>
      </LessonSection>

      <ComprehensionSideBySide />

      <LessonSection id="the-same-idea-written-as-one-expression" title="The same idea, written as one expression">
        <P>
          <Strong>{"[n * n for n in numbers]"}</Strong> is a{" "}
          <Strong>list comprehension</Strong>: the same loop and the same append, written in the
          order you would say it aloud — &ldquo;n squared, for every n in numbers&rdquo;. Adding{" "}
          <Strong>if n % 2 == 0</Strong> at the end filters which values make it in, doing the
          work of the loop&apos;s <Strong>if</Strong> check without a separate line.
        </P>
      </LessonSection>

      <LessonSection id="when-a-comprehension-makes-code-harder-to-read" title="When a comprehension makes code harder to read, not easier">
        <P>
          A comprehension earns its place when the body is one short expression. Nest two loops
          inside it, or stack three conditions, and it stops being readable in one glance — at
          that point the three-line loop is the clearer choice, not a worse one.
        </P>
        <Callout tone="tip" title="A rule of thumb that holds up">
          If explaining a comprehension out loud takes longer than reading the equivalent loop
          would, write the loop.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A list comprehension is a loop and an append, written as one expression in the order you'd say it aloud.",
          "[expression for item in iterable] builds the list; adding if condition at the end filters which items are kept.",
          "Both forms produce identical output — there is no performance or correctness reason to prefer one over the other for simple cases.",
          "Once the body needs nested loops or several conditions, a plain loop reads more clearly than a comprehension does.",
        ]}
      />
    </div>
  );
}
