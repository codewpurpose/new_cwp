import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { StepList } from "@/components/learn/primitives/StepList";

export function TestingYourCodeLesson() {
  return (
    <div>
      <Lead>
        Running a program and reading the output by eye works fine until it has more than one
        path through it. Write an assertion that checks the answer for you, and let it fail
        loudly the moment the code stops agreeing with itself.
      </Lead>

      <LessonSection id="assert-is-the-smallest-test-you-can-write" title="assert is the smallest test you can write">
        <P>
          Eyeballing output scales fine for one function with one path through it. It stops
          scaling the moment a function has a branch, an edge case, or a second person changing
          it three months later — you cannot re-read fifty print statements by hand every time,
          and after the second or third time, nobody does. A test is that eyeballing, written
          down once and run automatically forever after.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          lineTones={{ 7: "err" }}
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
        <P>
          <Strong>pytest</Strong> is what turns a scattering of asserts into a suite you run
          with one command. It looks for files named <Strong>test_*.py</Strong> and functions
          inside them named <Strong>test_*</Strong>, runs every one it finds, and reports which
          passed and which raised — no test runner of your own to write.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`$ pytest
test_largest.py::test_returns_the_maximum_value PASSED
test_largest.py::test_empty_list_returns_none PASSED

2 passed in 0.01s`}
        />
      </LessonSection>

      <LessonSection id="the-arrange-act-assert-shape" title="The arrange, act, assert shape">
        <P>
          A test that mixes setup, the call being tested, and the check into one tangled block
          is hard to read back later. Most well-written tests fall into the same three-part
          shape, in the same order, every time.
        </P>
        <StepList
          steps={[
            {
              label: "Arrange",
              detail: "Set up whatever the test needs — here, just the two numbers being added.",
            },
            {
              label: "Act",
              detail: "Call the one thing actually being tested, and nothing else.",
            },
            {
              label: "Assert",
              detail: "Check the result against exactly one expected answer.",
            },
          ]}
        />
        <CodeBlock
          label="test_add.py"
          code={`def test_add_negative_numbers():
    # Arrange
    a, b = -2, -3

    # Act
    result = add(a, b)

    # Assert
    assert result == -5`}
        />
        <P>
          The comments are not required — the value of the shape is that it usually gives each
          test exactly one thing to prove. A test that will not fit cleanly into arrange, act,
          assert is often a sign it is quietly trying to check two behaviours at once, and
          would read more clearly split into two tests instead of one.
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
        <P>
          Case 3 is one example of a whole category worth writing on purpose: the empty
          collection, the single-item collection, the negative number, the duplicate value,
          the input right on the boundary of a condition. None of these show up if you only
          ever run the &quot;normal&quot; case by hand and read the output — they are precisely
          the inputs a human tester tends to skip, and precisely the ones most likely to break
          a real function later.
        </P>
      </LessonSection>

      <LessonSection id="naming-a-test-after-what-it-proves" title="Naming a test after what it proves, not what it calls">
        <CodeBlock
          label="test_largest.py"
          code={`def test_largest():
    assert largest([3, 1, 4]) == 4

def test_returns_the_maximum_value():
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

      <LessonSection id="fixtures-set-up-the-scene-so-a-test-doesnt-have-to" title="Fixtures set up the scene so a test doesn't have to">
        <P>
          Several tests often need the same setup — the same sample data, the same open file,
          the same list to test against. Repeating that setup in every test function works, but
          a <Strong>pytest.fixture</Strong> lets you write it once and have pytest hand it to
          any test that asks for it.
        </P>
        <CodeBlock
          label="test_scores.py"
          code={`import pytest

@pytest.fixture
def sample_scores():
    return [88, 92, 79, 95]

def test_average_of_sample_scores(sample_scores):
    assert average(sample_scores) == 88.5`}
        />
        <P>
          <Strong>sample_scores</Strong> as a parameter name in{" "}
          <Strong>test_average_of_sample_scores</Strong> is not a coincidence — pytest matches a
          test&apos;s parameters against fixture names by that exact name, runs the matching
          fixture first, and passes in whatever it returned. It is a small piece of machinery,
          worth knowing exists, and rarely worth reaching for until the same setup has already
          been copied into three or four tests.
        </P>
      </LessonSection>

      <LessonSection id="what-a-green-coverage-number-actually-proves" title="What a green coverage number actually proves">
        <P>
          A coverage tool reports the percentage of lines your test suite actually ran — 100%
          means every line executed at least once while the tests were running, nothing more
          specific than that.
        </P>
        <Callout tone="warning" title="Coverage answers a narrower question than it sounds like it does">
          <Strong>{'assert largest([3, 1, 4]) == largest([3, 1, 4])'}</Strong> from earlier
          runs every line inside <Strong>largest</Strong> — it counts as full coverage, while
          proving nothing about whether the function is correct. A coverage percentage answers
          &quot;did we run this line,&quot; never &quot;did we check the right values against
          it.&quot; A green number is a floor worth having, not a ceiling worth trusting.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "assert condition does nothing if the condition is true, and raises AssertionError immediately if it's false.",
          "pytest discovers test_*.py files and test_* functions automatically and runs every one — no test runner of your own to write.",
          "The arrange, act, assert shape gives most tests exactly one thing to prove; a test that won't fit it is often testing two things at once.",
          "A test only proves something if it's possible for it to fail, and testing an edge case like an empty list catches what an eyeball check tends to miss.",
          "A green coverage number proves every line ran at least once — it never proves the test checked the line against the right answer.",
        ]}
      />
    </div>
  );
}
