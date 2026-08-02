import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ExpressionEvaluator } from "@/components/python/ExpressionEvaluator";

export function NumbersAndOperatorsLesson() {
  return (
    <div>
      <Lead>
        Two slashes and one slash look like a typo of each other. They are not — they answer
        two different questions, and confusing them is one of the most common bugs a beginner
        writes without noticing.
      </Lead>

      <LessonSection id="two-kinds-of-division" title="Two kinds of division">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 7 / 2
3.5
>>> 7 // 2
3`}
        />
        <P>
          <Strong>/</Strong> is <em>true division</em> — it answers &ldquo;what is 7 divided
          by 2, exactly?&rdquo; and always returns a float, even when the numbers divide
          evenly. <Strong>{"//"}</Strong> is <em>floor division</em> — it answers &ldquo;how many
          whole times does 2 go into 7?&rdquo; and rounds the result down. Use{" "}
          <Strong>{"//"}</Strong> when the question is really about a count, like splitting 7
          items into groups of 2.
        </P>
        <P>
          The two show up together more often than either shows up alone. <Strong>{"//"}</Strong>{" "}
          gives you the number of whole groups; <Strong>%</Strong>, the <em>modulo</em>{" "}
          operator, gives you what is left over once those groups are taken out.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 7 // 2
3
>>> 7 % 2
1`}
        />
        <P>
          Seven items split into groups of two makes three full groups, with one item left
          over — <Strong>{"//"}</Strong> and <Strong>%</Strong> are the same division, read
          two different ways.
        </P>
      </LessonSection>

      <ExpressionEvaluator />

      <LessonSection id="the-order-operations-actually-run-in" title="The order operations actually run in">
        <LabelRows
          rows={[
            { label: "/", text: "True division. Always returns a float, even 6 / 3." },
            { label: "//", text: "Floor division. Rounds the result down to a whole number." },
            { label: "%", text: "Modulo. The remainder left over after floor division." },
            { label: "**", text: "Exponentiation. Binds tighter than every other operator here." },
          ]}
        />
        <P>
          Python follows the order you were taught in school — exponents, then
          multiplication and division, then addition and subtraction — with{" "}
          <Strong>{"**"}</Strong> added at the top, binding tighter than everything else.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 2 + 3 * 4
14
>>> 2 ** 3 * 4
32`}
        />
        <P>
          Exponentiation has one more quirk worth knowing: stack two of them, and Python
          works right to left instead of left to right the way every other operator here
          does.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 2 ** 3 ** 2
512`}
          lineTones={{ 1: "accent" }}
        />
        <P>
          Read left to right, <Strong>{"2 ** 3 ** 2"}</Strong> looks like{" "}
          <Strong>{"(2 ** 3) ** 2"}</Strong>, which is <Strong>64</Strong>. Python actually
          computes <Strong>{"3 ** 2"}</Strong> first, then <Strong>{"2 ** 9"}</Strong>, which
          is <Strong>512</Strong>. When an expression gets more than two operators deep, add
          parentheses even where they are not required — <Strong>(2 + 3) * 4</Strong> costs
          you two characters and removes any question of what the next reader thinks runs
          first.
        </P>
      </LessonSection>

      <LessonSection id="not-every-decimal-fits-in-binary" title="Not every decimal fits in binary">
        <P>
          Ask Python for something that should be trivial, and it hands back an answer that
          looks broken.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 0.1 + 0.2
0.30000000000000004`}
          lineTones={{ 1: "warn" }}
        />
        <P>
          Python did the arithmetic correctly. The problem sits one step earlier:{" "}
          <Strong>0.1</Strong> itself cannot be stored exactly in binary floating point, the
          same way <Strong>1/3</Strong> cannot be written exactly in decimal — the digits
          repeat forever, and a float only has 64 bits to hold them in. Both{" "}
          <Strong>0.1</Strong> and <Strong>0.2</Strong> are already tiny approximations before
          you add anything, and the sum surfaces the rounding error that was hiding in them
          the whole time.
        </P>
        <P>
          This is not a Python bug, and switching languages will not fix it — JavaScript,
          Java, and C all print the identical <Strong>0.30000000000000004</Strong> for the
          same sum, because they store floats in the same IEEE 754 format underneath. It only
          surprises people the first time, because most code never prints a float with enough
          decimal places to expose it.
        </P>
        <Callout tone="warning" title="Never compare floats with ==">
          <Strong>{"0.1 + 0.2 == 0.3"}</Strong> is <Strong>False</Strong>. Round both sides to
          a sensible number of decimal places before comparing —{" "}
          <Strong>{"round(0.1 + 0.2, 2) == 0.3"}</Strong> is <Strong>True</Strong> — or check
          that the difference between them is smaller than a tiny tolerance, instead of
          checking for exact equality.
        </Callout>
      </LessonSection>

      <LessonSection id="where-an-int-quietly-becomes-a-float" title="Where an int quietly becomes a float">
        <P>
          Whole numbers in Python are <Strong>int</Strong>. Numbers with a decimal point are{" "}
          <Strong>float</Strong>. Mixing them in one expression is allowed, and Python resolves
          it by upgrading the int — the result comes back as a float, even if the value looks
          whole.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 6 / 3
2.0
>>> type(6 / 3)
<class 'float'>`}
        />
        <P>
          The rule holds for every operator, not just <Strong>/</Strong>. Even floor division
          upgrades to a float the moment one side already is one — <Strong>{"7.0 // 2"}</Strong>{" "}
          is <Strong>3.0</Strong>, not <Strong>3</Strong>, because once a float enters an
          expression it never quietly turns back into an int on its own.
        </P>
        <P>
          Going the other way needs to be asked for explicitly. <Strong>int()</Strong>{" "}
          converts a float to an int, and it <em>truncates</em> — it cuts off everything
          after the decimal point rather than rounding to the nearest whole number.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> int(9.9)
9
>>> int(-9.9)
-9`}
          lineTones={{ 1: "accent" }}
        />
        <Callout tone="warning" title="int() is not round()">
          <Strong>{"int(9.9)"}</Strong> is <Strong>9</Strong>, not <Strong>10</Strong>. If you
          want the nearest whole number, call <Strong>round()</Strong> instead —{" "}
          <Strong>int()</Strong> only ever moves toward zero, regardless of which way the
          decimal is closer to.
        </Callout>
      </LessonSection>

      <LessonSection id="why-an-int-can-grow-forever" title="Why an int can grow forever">
        <P>
          In most languages, an integer has a fixed size in memory, and arithmetic that runs
          past the top of that size wraps around silently — a 32-bit signed integer, for
          instance, tops out at 2,147,483,647 and flips to a large negative number the moment
          you add one more. Python integers do not have a ceiling.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> 2 ** 100
1267650600228229401496703205376
>>> 2 ** 100 + 1
1267650600228229401496703205377`}
          lineTones={{ 1: "accent" }}
        />
        <P>
          That is not a special case handled somewhere — a Python <Strong>int</Strong>{" "}
          automatically grows to however many digits the answer needs, limited only by how
          much memory the machine actually has. There is no maximum <Strong>int</Strong>{" "}
          constant to check yourself against, and no silent wraparound bug waiting in code
          that happens to compute something unexpectedly large.
        </P>
        <Callout tone="note" title="What this costs">
          Nothing is free. A genuinely huge int is slower to add and multiply than a small
          one, because Python is doing real multi-digit arithmetic underneath rather than one
          fixed-size CPU instruction. For the numbers most programs ever touch, the difference
          is not measurable — it only shows up once you are deliberately working with
          hundred-digit numbers.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "/ is true division and always returns a float. // is floor division and rounds down; % gives you what // left over.",
          "** is exponentiation, and it binds tighter than every other operator, right to left — 2 ** 3 ** 2 is 512, not 64.",
          "Mixing an int and a float in one expression upgrades the whole result to a float, and it stays a float from then on.",
          "Never compare floats with == after arithmetic. 0.1 + 0.2 == 0.3 is False, because neither side can be stored exactly in binary.",
          "A Python int never overflows — it grows to however many digits the answer needs, unlike the fixed-size integers most other languages use.",
        ]}
      />
    </div>
  );
}
