import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function WhatIsPythonLesson() {
  return (
    <div>
      <Lead>
        You have not written a line of Python yet, and the next block of code is a real,
        working program. Read it before you read the explanation below it — you will
        understand more of it than you expect.
      </Lead>

      <LessonSection
        id="a-language-you-can-read-before-you-can-write-it"
        title="A language you can read before you can write it"
      >
        <CodeBlock
          label="grades.py"
          code={`scores = [78, 92, 65, 88]
total = sum(scores)
average = total / len(scores)

if average >= 90:
    print("Grade: A")
elif average >= 80:
    print("Grade: B")
else:
    print("Grade: C")`}
        />
        <P>
          A list of four numbers, a total, an average, and a decision based on it. Nothing in
          that program is disguised. <Strong>sum</Strong> adds the list up.{" "}
          <Strong>len</Strong> counts it. The indentation is not decoration — it is how Python
          marks which lines belong to which decision, instead of wrapping them in curly
          braces the way many other languages do.
        </P>
        <P>
          That readability is not an accident. Python was designed, from its first release in
          1991, around the idea that code is read far more often than it is written, and that
          a language should optimise for the reader.
        </P>
      </LessonSection>

      <LessonSection
        id="what-it-is-actually-running-underneath"
        title="What it is actually running underneath"
      >
        <P>
          When you run a Python file, nothing translates it directly into the ones and zeros
          your processor understands. The standard implementation, <Strong>CPython</Strong>,
          compiles your file into an intermediate form called bytecode, then an interpreter
          reads that bytecode one instruction at a time and carries it out.
        </P>
        <P>
          That extra step is what makes Python <Strong>interpreted</Strong> rather than{" "}
          <Strong>compiled</Strong> in the sense C or Rust are. You never wait for a separate
          build step — you run the file and it goes — but every instruction is costing you a
          layer of translation that a compiled language paid for once, in advance.
        </P>
      </LessonSection>

      <LessonSection
        id="where-speed-gets-traded-for-your-time-back"
        title="Where speed gets traded for your time back"
      >
        <P>
          That translation layer has a real cost. A tight numeric loop written in raw Python
          can run tens of times slower than the same loop written in C. For a program that
          spends its life adding up sixty numbers, you would never notice. For a program
          processing billions of numbers, you would.
        </P>
        <P>
          In practice, most Python code that needs to be fast is not slow, because it calls
          into libraries — for data, for machine learning, for anything numeric — that are
          themselves written in C underneath and only <Strong>driven</Strong> by Python. You
          get the reading and writing speed of Python and the execution speed of C, for the
          parts that actually run millions of times.
        </P>
        <Callout tone="tip" title="When the speed difference actually matters">
          Almost never, when you are starting out. Write the program that solves the problem
          first. If it turns out to be too slow, that is a specific, measurable question you
          can answer later — not a reason to avoid the language now.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Python is designed to be read, not just written — indentation marks structure instead of braces.",
          "CPython compiles your file to bytecode, then interprets it one instruction at a time.",
          "That interpretation step is why raw Python loops run slower than raw C loops.",
          "Most fast Python code works by calling into C libraries underneath, not by Python itself being fast.",
          "Do not optimise for speed before you have a program. Solve the problem first.",
        ]}
      />
    </div>
  );
}
