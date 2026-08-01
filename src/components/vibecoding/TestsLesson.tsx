import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function TestsLesson() {
  return (
    <div>
      <Lead>
        Tests were always worth writing. They become considerably more valuable when you did not
        write the code yourself — because a test is the only mechanism that checks behaviour
        rather than checking your reading of it.
      </Lead>

      <LessonSection id="why-they-matter-more-now" title="Why they matter more now">
        <P>
          When you write code by hand, you build a mental model as you go. You know which
          branches exist because you typed them. With generated code you have a{" "}
          <Strong>reviewed</Strong> model, which is thinner — you read it once, quickly, and
          moved on.
        </P>
        <P>
          A test closes that gap. It does not care how carefully you read; it runs the code and
          reports what happened.
        </P>
        <Callout tone="tip" title="The honest version of the argument">
          You are going to accept more code than you deeply understand. That is the trade vibe
          coding makes. Tests are what keep that trade from compounding into a codebase nobody
          can safely change.
        </Callout>
      </LessonSection>

      <LessonSection id="asking-for-good-tests" title="Asking for tests that test something">
        <P>
          Ask for &ldquo;some tests&rdquo; and you get tests that assert the code does what the
          code does — passing, useless, and mildly reassuring. Ask for behaviour and edge cases
          and you get something worth having.
        </P>
        <CompareGrid
          items={[
            {
              title: "Weak request",
              tone: "caution",
              children: <p>&ldquo;Write tests for this function.&rdquo;</p>,
            },
            {
              title: "Strong request",
              tone: "positive",
              children: (
                <p>
                  &ldquo;Write tests covering: an empty cart, a single item, a coupon that
                  exceeds the total, and two coupons applied together. Test behaviour through
                  the public function, not internals.&rdquo;
                </p>
              ),
            },
          ]}
        />
        <CodeBlock
          variant="prompt"
          label="A reusable shape"
          code={`Write tests for src/lib/pricing.ts.

Cover: the normal case, empty input, the boundary where a
discount exceeds the subtotal, and two discounts combined.

Test through the exported functions only — do not test
private helpers. Each test name should describe the behaviour,
not the implementation.`}
        />
      </LessonSection>

      <LessonSection id="failing-first" title="Make it fail first">
        <P>
          A test that has never failed has not been shown to work. This matters more than usual
          with generated tests, because a subtly wrong assertion passes just as quietly as a
          correct one.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "For a bug fix: write the failing test first",
              detail:
                "It proves you have reproduced the bug before you patch it, and proves the patch worked when it goes green.",
            },
            {
              label: "For new code: break it deliberately",
              detail:
                "Change a value in the implementation and confirm the test fails. Then change it back.",
              note: "Ten seconds. It is the difference between a test and a decoration.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-to-test" title="What to actually test">
        <P>
          You do not need full coverage, and chasing it wastes time on code where failure is
          obvious anyway. Spend the effort where a silent wrong answer is possible:
        </P>
        <StepList
          steps={[
            { label: "Money, quantities, and dates", detail: "Off-by-one and rounding errors are invisible until they are expensive." },
            { label: "Anything with branches", detail: "Every if is a path someone must have checked." },
            { label: "Boundaries", detail: "Empty, one, many, and one-past-the-end. Most bugs live at the edges." },
            { label: "Bugs you have already had", detail: "A regression test is the cheapest test you will ever write, because the case is already known." },
          ]}
        />
        <P>
          What rarely needs tests: pure layout, thin wrappers around a library, and code the
          type checker already constrains.
        </P>
      </LessonSection>

      <LessonSection id="wiring-it-in" title="Wire it into your check command">
        <P>
          Tests only help if they run. Add them to the command you already ask the AI to run,
          and every future request inherits the safety net:
        </P>
        <CodeBlock
          label="package.json"
          code={`"scripts": {
  "test": "vitest run",
  "check": "npm run lint && npm run typecheck && npm run test && npm run build"
}`}
        />
        <CodeBlock
          variant="prompt"
          label="Then this works"
          code={`Make the change, then run npm run check and fix anything
that fails. Do not stop until it is green.`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Generated code gets read, not reasoned through. Tests are what close that gap.",
          "Name the cases you want covered — “write some tests” produces decorative ones.",
          "Watch every test fail once. A test that has never failed has not been shown to work.",
          "Prioritise money, branches, boundaries, and bugs you have already had.",
          "Put tests in your check command so every later prompt benefits automatically.",
        ]}
      />
    </div>
  );
}
