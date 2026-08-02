import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { BranchHighlighter } from "@/components/python/BranchHighlighter";

export function ConditionalsLesson() {
  return (
    <div>
      <Lead>
        A program that always does the same thing is not a program, it is a constant. Feed
        one input through a chain of conditions and watch exactly one branch of it ever run.
      </Lead>

      <LessonSection id="a-program-that-chooses" title="A program that chooses">
        <CodeBlock
          label="age_check.py"
          code={`if age >= 18:
    print("adult")
else:
    print("not an adult")`}
        />
        <P>
          <Strong>if</Strong> tests a condition. If it is true, the indented block underneath
          runs and Python skips the <Strong>else</Strong> entirely. If it is false, the{" "}
          <Strong>if</Strong> block is skipped and the <Strong>else</Strong> runs instead.
          Never both.
        </P>
        <P>
          The indentation is not decoration. It is what tells Python which lines belong to the
          branch — four spaces in, consistently, or the interpreter cannot tell where the block
          ends. Mix tabs and spaces, or dedent one line by accident, and you get an{" "}
          <Strong>IndentationError</Strong> before the program runs at all.
        </P>
      </LessonSection>

      <LessonSection id="comparisons-can-be-chained" title="Comparisons can be chained">
        <P>
          Checking that a number sits between two bounds usually means writing the same
          variable twice, joined with <Strong>and</Strong>:{" "}
          <Strong>{"age >= 13 and age < 20"}</Strong>. Python lets you write the comparison the
          way you would say it out loud instead.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> age = 16
>>> 13 <= age < 20
True`}
        />
        <P>
          <Strong>13 &lt;= age &lt; 20</Strong> checks both comparisons and combines them with
          an implicit <Strong>and</Strong> — <Strong>age</Strong> is evaluated once, not
          twice, and reads left to right exactly like the number line it describes. This is not
          a special case bolted onto <Strong>if</Strong>; it works anywhere a boolean
          expression is allowed.
        </P>
      </LessonSection>

      <LessonSection id="elif-is-not-a-second-if" title="elif is not a second if">
        <P>
          Stack two separate <Strong>if</Strong> statements and Python checks both of them,
          every time, even after the first one already matched. <Strong>elif</Strong> checks
          only if everything above it was false — and the moment one branch matches, every
          branch after it is skipped without being evaluated at all.
        </P>
        <CodeBlock
          label="grade.py"
          code={`if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"`}
        />
        <P>
          A score of 95 matches the first condition and stops there — the{" "}
          <Strong>{"score >= 80"}</Strong> check never runs, because it does not need to.
          Write this as four separate <Strong>if</Strong> statements instead and a score of 95
          would still pass the second and third tests too, which does no harm here only
          because each branch happens to overwrite <Strong>grade</Strong> rather than act on
          it.
        </P>
      </LessonSection>

      <BranchHighlighter />

      <LessonSection id="the-switch-python-does-not-have" title="Python has no switch statement, on purpose">
        <P>
          Plenty of languages let you match one value against a list of cases with a{" "}
          <Strong>switch</Strong> keyword. Python never had one — a chain of{" "}
          <Strong>elif</Strong> does the same job, and for most of the language&apos;s life
          that was considered enough.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> command = "start"
>>> match command:
...     case "start":
...         print("starting")
...     case "stop":
...         print("stopping")
...     case _:
...         print("unknown command")
...
starting`}
        />
        <P>
          Python 3.10 added <Strong>match</Strong>, which reads closer to a switch but does
          more — it can pull a sequence or a dictionary apart while it matches, not just
          compare a single value. <Strong>case _:</Strong> is the catch-all, matching anything
          nothing above it caught, the same role <Strong>else</Strong> plays at the end of an{" "}
          <Strong>elif</Strong> chain.
        </P>
        <Callout tone="note" title="Reach for elif unless the shape genuinely helps">
          For a plain sequence of value comparisons, <Strong>if</Strong>/<Strong>elif</Strong>{" "}
          still reads exactly as clearly as <Strong>match</Strong> does, and runs on every
          Python version. Save <Strong>match</Strong> for when you are pulling a value apart by
          its shape, which is the problem it was actually built to solve.
        </Callout>
        <CompareGrid
          items={[
            {
              title: "elif chain",
              tone: "neutral",
              children: (
                <P>
                  Reads clearly for a plain sequence of comparisons. Works on every Python
                  version. The default choice.
                </P>
              ),
            },
            {
              title: "match statement",
              tone: "positive",
              children: (
                <P>
                  Worth it when you are pulling a value apart by its shape — a tuple, a
                  dictionary, a class — not just comparing it. Python 3.10 and newer only.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="guard-clauses-flatten-the-nesting" title="Guard clauses flatten the nesting">
        <P>
          A function that checks three things before doing its real work is tempting to write
          as three nested <Strong>if</Strong> statements, one indent deeper than the last. Read
          it back a week later and the actual logic is buried at the bottom of a staircase.
        </P>
        <RevealCard
          summaryTag="Nested"
          summary="Three checks, each one indented inside the last, with the real work squeezed into the innermost block."
          detailTag="Guard clauses"
          detail={
            <>
              <CodeBlock
                label="Terminal"
                variant="terminal"
                code={`def process(order):
    if order is not None:
        if order.items:
            if order.paid:
                ship(order)
            else:
                print("not paid")
        else:
            print("empty order")
    else:
        print("no order")`}
              />
              <p className="mt-4 text-[14px] leading-[1.5] text-learn-strong">
                Rewritten as guard clauses, each check exits early and the real work sits at the
                top level, not nested four deep:
              </p>
              <CodeBlock
                label="Terminal"
                variant="terminal"
                code={`def process(order):
    if order is None:
        print("no order")
        return
    if not order.items:
        print("empty order")
        return
    if not order.paid:
        print("not paid")
        return
    ship(order)`}
              />
            </>
          }
        />
        <P>
          Each guard states one failure and returns immediately, so by the time you reach the
          bottom of the function, every condition that could have gone wrong already has not.
          The reader never has to hold three levels of &quot;what if this branch is also
          true&quot; in their head at once.
        </P>
      </LessonSection>

      <LessonSection id="what-python-accepts-in-place-of-true-or-false" title="What Python accepts in place of true or false">
        <P>
          A condition does not have to be written as a comparison. Any value can sit after{" "}
          <Strong>if</Strong>, and Python converts it to <Strong>True</Strong> or{" "}
          <Strong>False</Strong> the same way <Strong>bool()</Strong> would.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = ""
>>> if name:
...     print("has a name")
... else:
...     print("empty")
empty`}
        />
        <Callout tone="note" title="and / or, not && / ||">
          Python spells out its boolean operators as words —{" "}
          <Strong>and</Strong>, <Strong>or</Strong>, <Strong>not</Strong> — rather than the{" "}
          <Strong>{"&&"}</Strong>, <Strong>{"||"}</Strong> symbols many other languages use.
          Both read the same way you would say the condition out loud.
        </Callout>
        <P>
          One more piece of syntax worth knowing, briefly: the walrus operator{" "}
          <Strong>:=</Strong> lets you assign a value and test it in the same expression,
          instead of on the line before.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> data = [1, 2, 3, 4, 5]
>>> if (n := len(data)) > 3:
...     print(f"{n} items, that's plenty")
5 items, that's plenty`}
        />
        <P>
          Without it you would compute <Strong>{"len(data)"}</Strong>, store it in{" "}
          <Strong>n</Strong> on its own line, then test <Strong>n</Strong> — three steps for
          one idea. It is a small convenience, reached for occasionally rather than by default.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Exactly one branch of an if/elif/else chain runs. Once one matches, everything after it is skipped.",
          "elif only gets checked if every condition above it was false — unlike a stack of separate if statements.",
          "Chained comparisons like 13 <= age < 20 evaluate the middle value once and read left to right.",
          "Python has no switch statement; match, from 3.10 onward, does more than a switch but is worth it only when you are pulling a value apart by shape.",
          "Guard clauses that return early replace a staircase of nested ifs with a flat list of failure checks, leaving the real work unindented.",
        ]}
      />
    </div>
  );
}
