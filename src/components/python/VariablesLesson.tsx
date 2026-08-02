import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
          "Two names can point at the same value — change it through one, and the other sees the change too.",
          "Reassigning a name moves that name's arrow. It never edits the value the arrow used to point at.",
          "Names use letters, digits, and underscores; cannot start with a digit; cannot be a reserved word.",
          "snake_case is the convention every Python style guide expects for variable names.",
        ]}
      />
    </div>
  );
}
