import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { GeneratorStepper } from "@/components/python/GeneratorStepper";

export function IteratorsAndGeneratorsLesson() {
  return (
    <div>
      <Lead>
        A list built to hold a million numbers holds all million in memory at once, whether
        you need them yet or not. Write a generator instead, pull one value at a time, and
        watch it produce the next number only when asked.
      </Lead>

      <LessonSection id="what-for-is-actually-doing-underneath" title="What for is actually doing underneath">
        <P>
          <Strong>for item in collection:</Strong> looks like the language just knows how to
          step through anything you hand it. It does not — it is calling two methods you have
          never had to type yourself, and every object that works in a{" "}
          <Strong>for</Strong> loop has agreed to support them the same way.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          lineTones={{ 1: "accent", 11: "err" }}
          code={`>>> numbers = [10, 20, 30]
>>> iterator = iter(numbers)
>>> next(iterator)
10
>>> next(iterator)
20
>>> next(iterator)
30
>>> next(iterator)
Traceback (most recent call last):
  ...
StopIteration`}
        />
        <P>
          <Strong>iter(numbers)</Strong> asks the list for a fresh iterator — an object that
          remembers position and knows how to produce the next value.{" "}
          <Strong>next(iterator)</Strong> asks it for exactly one value, and the fourth call,
          with nothing left, raises <Strong>StopIteration</Strong>. A{" "}
          <Strong>for</Strong> loop is this same pair of calls, written by the language for
          you: it calls <Strong>iter()</Strong> once, calls{" "}
          <Strong>next()</Strong> repeatedly, and quietly catches{" "}
          <Strong>StopIteration</Strong> as its signal to stop rather than let it crash the
          program.
        </P>
        <Callout tone="note" title="Iterable and iterator are not the same word by accident">
          A list is <Strong>iterable</Strong> — you can ask it for an iterator — but it is not
          itself one; calling <Strong>next(numbers)</Strong> directly fails. That split is why
          you can loop over the same list twice: each{" "}
          <Strong>for</Strong> loop calls <Strong>iter()</Strong> fresh and gets a new
          iterator starting from the beginning, even though the list underneath never
          changed.
        </Callout>
      </LessonSection>

      <LessonSection id="a-list-you-already-have-versus-a-value-not-made-yet" title="A list you already have, versus a value you have not made yet">
        <P>
          <Strong>{"[n for n in range(1_000_000)]"}</Strong> computes all one million values
          immediately and holds every one in memory before the line even finishes. If the
          program only ever needed the first three, the other 999,997 were wasted work.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          lineTones={{ 2: "warn", 4: "ok" }}
          code={`>>> import sys
>>> sys.getsizeof([n for n in range(1_000_000)])
8448728
>>> sys.getsizeof((n for n in range(1_000_000)))
112`}
        />
        <P>
          That is not a rounding difference — it is the difference between a container that
          already holds a million pointers and an object that holds only the instruction for
          how to make the next number, plus a note on where it stopped. The list has to exist
          in full before the line finishes. The generator expression on the right never builds
          anything until something asks it to.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def fibonacci_below(limit):
...     a, b = 1, 1
...     while a < limit:
...         yield a
...         a, b = b, a + b
...
>>> gen = fibonacci_below(20)
>>> gen
<generator object fibonacci_below at 0x1046a3...>`}
        />
        <P>
          Calling <Strong>fibonacci_below(20)</Strong> runs none of the function&apos;s body.
          It returns a <Strong>generator</Strong> — an object that remembers where to resume,
          but has not computed a single value yet.
        </P>
      </LessonSection>

      <LessonSection id="yield-pauses-a-function-instead-of-ending-it" title="yield pauses a function instead of ending it">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> next(gen)
1
>>> next(gen)
1
>>> next(gen)
2`}
        />
        <P>
          Every <Strong>next(gen)</Strong> call resumes the function exactly where{" "}
          <Strong>yield</Strong> last paused it, runs until the next{" "}
          <Strong>yield</Strong>, and hands back that one value. <Strong>return</Strong> would
          end the function for good — <Strong>yield</Strong> only pauses it.
        </P>
        <P>
          Everything local to the function survives the pause. <Strong>a</Strong> and{" "}
          <Strong>b</Strong> keep their exact values between calls, the same way they would if
          the function had never stopped running — the only thing that actually stopped is
          your access to the rest of the body, until you ask for more.
        </P>
      </LessonSection>

      <GeneratorStepper />

      <LessonSection id="why-laziness-is-the-entire-point" title="Why laziness is the entire point">
        <P>
          A generator that never finishes, like one counting upward forever, would be
          impossible as a list — there would be no last value to stop at. As a generator it
          works fine, because nothing is computed until something actually asks{" "}
          <Strong>next()</Strong> for it.
        </P>
        <Callout tone="note" title="Where this shows up without you writing yield">
          <Strong>range()</Strong>, dictionary <Strong>.items()</Strong>, and reading a file
          line by line with <Strong>for line in f:</Strong> all behave lazily for exactly this
          reason — none of them build the full sequence in memory before the loop starts.
        </Callout>
      </LessonSection>

      <LessonSection id="how-a-huge-file-fits-in-constant-memory" title="How a huge file fits in constant memory">
        <P>
          An open file is an iterator, the same as the list example above — <Strong>for line
          in f:</Strong> calls <Strong>next()</Strong> on it once per line, and each call reads
          only as far as the next newline character before handing that one line back.
        </P>
        <CodeBlock
          label="count_errors.py"
          lineTones={{ 5: "ok" }}
          code={`def count_errors(path):
    total = 0
    with open(path) as f:
        for line in f:
            if "ERROR" in line:
                total += 1
    return total`}
        />
        <P>
          This runs in the same, small, constant amount of memory whether{" "}
          <Strong>path</Strong> points at a ten-line log or a ten-gigabyte one, because at any
          moment only one line is ever actually in memory — the one just read, being checked,
          about to be discarded. The counterexample is{" "}
          <Strong>open(path).readlines()</Strong>, which reads the entire file into a list of
          lines before your code sees a single one of them, and on a ten-gigabyte file tries
          to hold roughly ten gigabytes in RAM to do it.
        </P>
      </LessonSection>

      <LessonSection id="a-generator-expression-is-a-comprehension-that-stays-lazy" title="A generator expression is a comprehension that stays lazy">
        <P>
          Swap the square brackets of a list comprehension for round parentheses and you get a{" "}
          <Strong>generator expression</Strong> — the same filtering and transforming syntax
          from the comprehensions chapter, but producing values lazily instead of building the
          whole list up front.
        </P>
        <CompareGrid
          items={[
            {
              title: "[n * n for n in range(1_000_000)]",
              tone: "caution",
              children: (
                <>
                  Builds the full list of a million squares immediately, and keeps all of them
                  in memory for as long as the list exists.
                </>
              ),
            },
            {
              title: "(n * n for n in range(1_000_000))",
              tone: "positive",
              children: (
                <>
                  Builds nothing yet. Each square is computed the moment something calls{" "}
                  <Strong>next()</Strong> on it, then forgotten.
                </>
              ),
            },
          ]}
        />
        <P>
          <Strong>{"sum(n * n for n in range(1_000_000))"}</Strong> never needs the intermediate
          list at all — the parentheses can even be dropped when the generator expression is
          the sole argument to a function call, which is why you will see it written with no
          extra punctuation around it.
        </P>
      </LessonSection>

      <LessonSection id="a-generator-you-can-only-drain-once" title="A generator you can only drain once">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          lineTones={{ 2: "ok", 4: "err" }}
          code={`>>> squares = (n * n for n in range(5))
>>> list(squares)
[0, 1, 4, 9, 16]
>>> list(squares)
[]`}
        />
        <P>
          A generator does not reset once it is exhausted. The second{" "}
          <Strong>list(squares)</Strong> does not error and does not repeat the sequence — it
          simply has nothing left to give, because every value was already pulled out and
          thrown away the first time.
        </P>
        <Callout tone="danger" title="The generator bug almost everyone hits once">
          Passing the same generator into two places that each expect to see the full
          sequence — once to check its length, then again to actually use it — is the single
          most common generator mistake. The second use gets nothing, with no error to point
          you at why. If you need the values more than once, either build a list from the
          generator with <Strong>list(...)</Strong> and keep that, or call the generator
          function again to get back a fresh, unstarted generator.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A for loop calls iter() once and next() repeatedly, catching StopIteration as its cue to stop — that pairing is the entire mechanism, no magic involved.",
          "A generator function contains yield and returns a paused generator object the moment it's called — none of its body has run yet.",
          "next(generator) resumes the function until the next yield, then pauses again and hands back that one value, with every local variable intact.",
          "Reading a file with for line in f: holds only one line in memory at a time, which is why it works identically on a ten-line file and a ten-gigabyte one.",
          "A generator can only be drained once — the second pass over an exhausted one silently returns nothing, which is the bug to watch for.",
        ]}
      />
    </div>
  );
}
