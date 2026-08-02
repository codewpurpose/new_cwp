import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { NamePointer } from "@/components/python/NamePointer";

export function VariablesLesson() {
  return (
    <div>
      <Lead>
        Most introductions call a variable a box that holds a value. That picture works right
        up until you assign one name to another — and then it actively misleads you.
      </Lead>

      <LessonSection
        id="a-name-pointing-at-a-value-not-holding-it"
        title="A name pointing at a value, not holding it"
      >
        <P>
          Run this, and predict the output before you check it:
        </P>
        <CodeBlock
          label="pointer.py"
          code={`a = [1, 2, 3]
b = a
b.append(4)
print(a)`}
        />
        <P>
          If a variable were a box, <Strong>a</Strong> would still read{" "}
          <Strong>[1, 2, 3]</Strong> — you only changed <Strong>b</Strong>. But{" "}
          <Strong>a</Strong> prints <Strong>[1, 2, 3, 4]</Strong>. Line 2 did not copy the
          list into a second box. It pointed a second name at the same list. There was only
          ever one list in this program.
        </P>
        <P>
          This only ever shows up with values you can change after they exist, like a list.
          Numbers, strings, and tuples cannot be edited in place at all — later lessons call
          that <Strong>immutable</Strong> — so pointing two names at one of those never
          produces a surprise like this. The box picture happens to work for those values by
          accident, which is exactly what makes it dangerous: it stops working the moment you
          touch something mutable, and nothing warns you in advance which kind you are holding.
        </P>
      </LessonSection>

      <NamePointer />

      <LessonSection
        id="reassigning-a-name-never-touches-the-value"
        title="Reassigning a name never touches the value"
      >
        <P>
          Now the case that actually reassures people. If <Strong>a</Strong> and{" "}
          <Strong>b</Strong> both point at <Strong>3</Strong>, and you write{" "}
          <Strong>a = 5</Strong>, does <Strong>b</Strong> change too?
        </P>
        <CodeBlock
          label="reassign.py"
          code={`a = 3
b = a
a = 5
print(b)
# 3`}
        />
        <P>
          It does not, and the toggle above shows why. <Strong>a = 5</Strong> does not reach
          into the number 3 and edit it — numbers cannot be edited. It points the name{" "}
          <Strong>a</Strong> at a different value entirely and leaves <Strong>b</Strong>{" "}
          exactly where it was. Assignment always moves an arrow. It only <em>looks</em> like
          mutation when the arrow happens to point at something, like a list, that can be
          changed from where it sits.
        </P>
      </LessonSection>

      <LessonSection
        id="same-object-or-just-equal-values"
        title="Same object, or just equal values"
      >
        <P>
          Two names can point at separate values that happen to look identical. Python has two
          different operators for the two different questions this raises, and treating them
          as interchangeable is a quiet source of bugs.
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
          lineTones={{ 5: "accent" }}
        />
        <P>
          <Strong>a</Strong> and <Strong>b</Strong> here are two separate lists that happen to
          hold the same three numbers — equal, but not the same object. Compare that with
          what you already saw above: assign <Strong>b = a</Strong> directly, and there is
          only one list on two names.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> a = [1, 2, 3]
>>> b = a
>>> a is b
True`}
        />
        <CompareGrid
          items={[
            {
              title: "==",
              children: (
                <P>
                  Equality. Asks &ldquo;do these hold the same value?&rdquo; — the question you
                  want almost all of the time, for numbers, strings, lists, anything.
                </P>
              ),
            },
            {
              title: "is",
              children: (
                <P>
                  Identity. Asks &ldquo;are these literally the same object?&rdquo; — the
                  question behind the bug above, and behind idiomatic checks like{" "}
                  <Strong>x is None</Strong>.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="Do not use is to compare ordinary values">
          CPython quietly reuses a handful of small integers, so{" "}
          <Strong>{"1 is 1"}</Strong> can print <Strong>True</Strong> by accident of how the
          interpreter happens to be implemented — not by any promise the language makes. It
          stops being true for larger numbers, and relying on it is relying on a detail that
          could change. Use <Strong>==</Strong> to compare values, and keep{" "}
          <Strong>is</Strong> for identity checks like <Strong>None</Strong>.
        </Callout>
      </LessonSection>

      <LessonSection id="names-python-will-not-let-you-use" title="Names Python will not let you use">
        <P>
          A name can contain letters, digits, and underscores, but cannot start with a digit,
          and cannot be one of Python&apos;s reserved words —{" "}
          <Strong>if</Strong>, <Strong>for</Strong>, <Strong>class</Strong>, and about thirty
          others that mean something fixed to the language itself.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`2nd_place = "Alice"
  File "<stdin>", line 1
    2nd_place = "Alice"
    ^
SyntaxError: invalid decimal literal`}
        />
        <P>
          Names are also case-sensitive, which trips people up in a quieter way than a
          <Strong> SyntaxError</Strong> does — Python treats <Strong>score</Strong> and{" "}
          <Strong>Score</Strong> as two entirely unrelated names, not two spellings of the
          same one.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> score = 90
>>> Score
NameError: name 'Score' is not defined`}
        />
        <Callout tone="note" title="A convention, not a rule">
          Python does not enforce it, but every style guide expects{" "}
          <Strong>snake_case</Strong> for variable names —{" "}
          <Strong>total_score</Strong>, not <Strong>totalScore</Strong> or{" "}
          <Strong>TotalScore</Strong>. Following it is what makes your code look like
          everyone else&apos;s.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A variable is a name pointing at a value, not a box that contains one.",
          "Two names can point at the same value — change it through one, and the other sees the change too, but only if the value is mutable.",
          "Reassigning a name moves that name's arrow. It never edits the value the arrow used to point at.",
          "== compares values; is compares identity. Use == unless you specifically need to know they are the exact same object.",
          "Names use letters, digits, and underscores; cannot start with a digit; cannot be a reserved word; and are case-sensitive.",
        ]}
      />
    </div>
  );
}
