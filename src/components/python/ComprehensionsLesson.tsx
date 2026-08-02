import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
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
        <CodeBlock
          label="Terminal"
          code={`squares = []
for n in numbers:
    squares.append(n * n)`}
        />
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
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> numbers = [1, 2, 3, 4, 5, 6]
>>> squares = [n * n for n in numbers]
>>> squares
[1, 4, 9, 16, 25, 36]
>>> evens_squared = [n * n for n in numbers if n % 2 == 0]
>>> evens_squared
[4, 16, 36]`}
          lineTones={{ 3: "ok", 6: "ok" }}
        />
        <LabelRows
          rows={[
            {
              label: "expression",
              text: (
                <>
                  <Strong>n * n</Strong> — what to compute and put in the new list, evaluated
                  once per item kept.
                </>
              ),
            },
            {
              label: "for item in iterable",
              text: (
                <>
                  <Strong>for n in numbers</Strong> — the loop, unchanged from the three-line
                  version.
                </>
              ),
            },
            {
              label: "if condition",
              text: (
                <>
                  <Strong>if n % 2 == 0</Strong> — optional. Only items that pass are computed
                  and kept; the rest are skipped entirely.
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="dict-and-set-comprehensions-follow-the-same-shape" title="Dict and set comprehensions follow the same shape" delay={0.05}>
        <P>
          The square-bracket version builds a list, but the same idea works with curly braces
          too. Add a colon between two expressions and you get a{" "}
          <Strong>dict comprehension</Strong>; leave the colon out and you get a{" "}
          <Strong>set comprehension</Strong> instead.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> names = ["Ada", "Grace", "Alan"]
>>> lengths = {name: len(name) for name in names}
>>> lengths
{'Ada': 3, 'Grace': 5, 'Alan': 4}
>>> unique_lengths = {len(name) for name in names}
>>> unique_lengths
{3, 4, 5}`}
          lineTones={{ 3: "ok", 6: "ok" }}
        />
        <P>
          <Strong>{"{name: len(name) for name in names}"}</Strong> builds a dictionary the
          same way the loop version would — one key, one value, per iteration. Drop the key
          entirely and keep only a value, and a set comprehension collapses duplicates the
          same way <Strong>set()</Strong> always does: three names with two distinct lengths
          in <Strong>unique_lengths</Strong> produce two entries, not three.
        </P>
        <Callout tone="note" title="Same brackets, different meaning">
          Curly braces already mean two different things in Python — a dictionary literal and
          a set literal — depending on whether a colon appears. A comprehension inherits that
          same ambiguity, so <Strong>{"{x for x in things}"}</Strong> is a set, and{" "}
          <Strong>{"{}"}</Strong> on its own is always an empty dict, never an empty set.
        </Callout>
      </LessonSection>

      <LessonSection id="the-nested-case-two-loops-in-one-expression" title="The nested case: two loops in one expression" delay={0.05}>
        <P>
          A comprehension can hold more than one <Strong>for</Strong> clause, in the same
          order you would nest the loops. The most common reason is flattening — turning a
          list of lists into a single list.
        </P>
        <CodeBlock
          label="Terminal"
          code={`rows = [[1, 2, 3], [4, 5], [6]]

flat = []
for row in rows:
    for value in row:
        flat.append(value)`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> flat = [value for row in rows for value in row]
>>> flat
[1, 2, 3, 4, 5, 6]`}
          lineTones={{ 2: "ok" }}
        />
        <P>
          Read the two for clauses left to right, in the same order the nested loops ran: the
          outer loop — <Strong>for row in rows</Strong> — comes first, then the inner one —{" "}
          <Strong>for value in row</Strong>. Reverse them and Python raises a{" "}
          <Strong>NameError</Strong>, because row has to exist before{" "}
          <Strong>for value in row</Strong> makes sense.
        </P>
        <Callout tone="warning" title="Two levels is usually the ceiling">
          A single nested comprehension for flattening is common and reads fine. Three levels,
          or a nested comprehension combined with a condition on each loop, is exactly the
          case the next section warns about — write it as loops instead, and give each level
          its own line.
        </Callout>
      </LessonSection>

      <LessonSection id="when-a-comprehension-makes-code-harder-to-read" title="When a comprehension makes code harder to read, not easier">
        <P>
          A comprehension earns its place when the body is one short expression. Nest two loops
          inside it, or stack three conditions, and it stops being readable in one glance — at
          that point the three-line loop is the clearer choice, not a worse one.
        </P>
        <CodeBlock
          label="Terminal"
          code={`# technically one line — not obviously one idea
report = [f"{n}: {'even' if n % 2 == 0 else 'odd'}" for n in numbers if n > 2]`}
        />
        <P>
          Nothing about that line is illegal, and nothing about it is fast to read either — a
          condition inside the expression, a filter at the end, and a format string all
          competing for attention in one clause. The three-line loop version of the same logic
          reads in the order your eye actually moves.
        </P>
        <Callout tone="tip" title="A rule of thumb that holds up">
          If explaining a comprehension out loud takes longer than reading the equivalent loop
          would, write the loop.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A list comprehension is a loop and an append, written as one expression in the order you'd say it aloud: what to compute, what to loop over, what to keep.",
          "[expression for item in iterable if condition] — the if is optional, and only items that pass it are computed and kept.",
          "Curly braces build a dict comprehension with a colon ({k: v for ...}) or a set comprehension without one ({v for ...}) — the same shape, a different bracket.",
          "A comprehension can nest more than one for clause, read left to right in the same order the equivalent nested loops would run — useful for flattening, unreadable past two levels.",
          "Once the body needs nested loops or several conditions, a plain loop reads more clearly than a comprehension does — that's not a failure of comprehensions, it's the line where they stop being the right tool.",
        ]}
      />
    </div>
  );
}
