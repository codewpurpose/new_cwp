import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function TestingYourCodeLesson() {
  return (
    <div>
      <Lead>
        Running a program and reading the output by eye works fine until it has more than one
        path through it. Write an assertion that checks the answer for you, and let it fail
        loudly the moment the code stops agreeing with itself.
      </Lead>

      <LessonSection id="assert-is-the-smallest-test-you-can-write" title="assert is the smallest test you can write">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add(a, b):
...     return a + b
...
>>> assert add(2, 3) == 5
>>> assert add(2, 3) == 6
Traceback (most recent call last):
  ...
AssertionError`}
        />
        <P>
          <Strong>assert condition</Strong> does nothing at all if{" "}
          <Strong>condition</Strong> is true, and raises an{" "}
          <Strong>AssertionError</Strong> the instant it is false. That is the entire
          mechanism every testing tool in Python — including{" "}
          <Strong>pytest</Strong> — is ultimately built on top of.
        </P>
      </LessonSection>

      <LessonSection id="a-test-that-only-ever-passes-is-not-testing-anything" title="A test that only ever passes is not testing anything">
        <P>
          A test is only proof of something if it is possible for it to fail. Check three cases
          below, each testing a small function for finding the largest number in a list — see
          which ones actually earn their place.
        </P>
        <div className="mt-6 space-y-4">
          <RevealCard
            summaryTag="Case 1"
            summary="assert largest([3, 1, 4]) == 4"
            detailTag="Verdict"
            detail={
              <>
                A real test. It picks a specific input, states the one correct answer, and
                would fail loudly if <Strong>largest</Strong> ever returned{" "}
                <Strong>3</Strong> or <Strong>1</Strong> instead.
              </>
            }
            openLabel="See the verdict"
            closeLabel="Hide the verdict"
          />
          <RevealCard
            summaryTag="Case 2"
            summary="assert largest([3, 1, 4]) == largest([3, 1, 4])"
            detailTag="Verdict"
            detail={
              <>
                Not a real test. Both sides call the exact same function on the exact same
                input, so this passes even if <Strong>largest</Strong> is completely broken —
                it is only checking that the function agrees with itself, not that it is
                correct.
              </>
            }
            openLabel="See the verdict"
            closeLabel="Hide the verdict"
          />
          <RevealCard
            summaryTag="Case 3"
            summary="assert largest([]) == None"
            detailTag="Verdict"
            detail={
              <>
                A real test, and an important one — the empty-list case is exactly the kind of
                edge a normal run-and-eyeball check tends to skip entirely.
              </>
            }
            openLabel="See the verdict"
            closeLabel="Hide the verdict"
          />
        </div>
      </LessonSection>

      <LessonSection id="naming-a-test-after-what-it-proves" title="Naming a test after what it proves, not what it calls">
        <CodeBlock
          label="test_largest.py"
          code={`def test_returns_the_maximum_value():
    assert largest([3, 1, 4]) == 4

def test_empty_list_returns_none():
    assert largest([]) is None`}
        />
        <P>
          <Strong>test_largest</Strong> says only which function is involved.{" "}
          <Strong>test_returns_the_maximum_value</Strong> says what the test actually proves —
          when it fails months later, the name alone tells you what broke, before you have read
          a single line of the assertion.
        </P>
        <Callout tone="tip" title="Why this matters more than it seems to">
          A failing test named after its function tells you <em>where</em>. A failing test
          named after its claim tells you <em>what</em> — and <em>what</em> is the half you
          actually need first.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "assert condition does nothing if the condition is true, and raises AssertionError immediately if it's false.",
          "A test only proves something if it's possible for it to fail — checking a function against a call to itself never can.",
          "Testing an edge case, like an empty list, catches the exact class of bug an eyeball check on normal input tends to miss.",
          "Naming a test after what it proves (test_empty_list_returns_none) tells you what broke on failure, faster than a name that only says which function it calls.",
        ]}
      />
    </div>
  );
}
