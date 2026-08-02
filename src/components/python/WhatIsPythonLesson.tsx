import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          The design goes deep enough that it is written down inside the language itself. Type
          one line into any Python interpreter and it prints its own list of priorities.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.`}
        />
        <P>
          Nobody expects you to memorise that. What is worth noticing is that a language
          shipping its own design philosophy as an importable module is unusual, and it tells
          you what the people who built it were optimising for on every decision after this
          one.
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
        <P>
          You can actually see the evidence of this step on disk. Run a program that imports a
          second file, and Python quietly caches the compiled version so it does not have to
          redo the translation next time nothing in that file has changed.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`python3 main.py
ls __pycache__
# helpers.cpython-312.pyc`}
        />
        <P>
          That <Strong>.pyc</Strong> file is the bytecode, sitting between your source and the
          interpreter. Delete <Strong>__pycache__</Strong> entirely and nothing breaks —
          Python just regenerates it the next time it needs to.
        </P>
      </LessonSection>

      <LessonSection
        id="the-price-of-not-being-told-in-advance"
        title="The price of not being told in advance"
      >
        <P>
          Python never asks what type a variable is going to hold. You do not declare{" "}
          <Strong>int</Strong> or <Strong>string</Strong> before a name, the way you would in
          Java or C — a name can point at a number today and a list tomorrow, and nothing
          stops you. That is what <Strong>dynamically typed</Strong> means, and it is the
          other half of why Python reads so easily: there is less to write before you write
          the thing you actually meant.
        </P>
        <P>
          The cost of that freedom is that Python cannot warn you about a type mistake before
          you run the program, because it never checked what any of your types were going to
          be in the first place. A statically typed language would refuse to compile the
          function below. Python compiles it happily, and only fails the moment this exact
          line actually executes — which might be seconds into a long-running program, or
          might be after it has already emailed a customer.
        </P>
        <CodeBlock
          label="pricing.py"
          code={`def total_price(items):
    return sum(item["price"] for item in items)

print(total_price([{"price": 10}, {"price": "20"}]))`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`python3 pricing.py
Traceback (most recent call last):
  File "pricing.py", line 4, in <module>
    print(total_price([{"price": 10}, {"price": "20"}]))
  File "pricing.py", line 2, in total_price
    return sum(item["price"] for item in items)
TypeError: unsupported operand type(s) for +: 'int' and 'str'`}
          lineTones={{ 6: "err" }}
        />
        <P>
          One of the four prices was typed as text — <Strong>{"\"20\""}</Strong> instead of{" "}
          <Strong>20</Strong> — probably because it came from a form field or a spreadsheet
          column that nobody checked. Nothing about the program looked wrong until Python
          tried to add an int and a string together and had no idea how.
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
        <CompareGrid
          items={[
            {
              title: "Genuinely good for",
              tone: "positive",
              children: (
                <>
                  <P>
                    Scripts, data analysis, and backends — anywhere the real bottleneck is a
                    database query or a network call, not the loop running while it waits.
                  </P>
                  <P>
                    Getting an idea running fast, because there is no compile step between
                    changing a line and seeing what it does.
                  </P>
                </>
              ),
            },
            {
              title: "Genuinely awkward for",
              tone: "caution",
              children: (
                <>
                  <P>
                    Shipping a native mobile app — nothing on iOS or Android runs Python
                    directly, so it is never the tool for that job.
                  </P>
                  <P>
                    A CPU-bound inner loop with millions of iterations and no library to hand
                    it off to — the exact case above.
                  </P>
                </>
              ),
            },
          ]}
        />
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
          "Python never checks a variable's type until the line using it actually runs, which is what dynamically typed means.",
          "That interpretation step is why raw Python loops run slower than raw C loops, and why fast Python code usually calls into C libraries instead of being fast itself.",
          "Do not optimise for speed before you have a program. Solve the problem first, then measure.",
        ]}
      />
    </div>
  );
}
