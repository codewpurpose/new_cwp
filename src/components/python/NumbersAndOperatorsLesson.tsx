import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
      </LessonSection>

      <ExpressionEvaluator />

      <LessonSection id="the-order-operations-actually-run-in" title="The order operations actually run in">
        <P>
          Python follows the order you were taught in school — exponents, then
          multiplication and division, then addition and subtraction — with one addition:{" "}
          <Strong>{"**"}</Strong> is exponentiation, and it binds tighter than everything else.
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
          When an expression gets more than two operators deep, add parentheses even where
          they are not required. <Strong>(2 + 3) * 4</Strong> costs you two characters and
          removes any question of what the next reader thinks runs first.
        </P>
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
        <Callout tone="warning" title="Where this actually bites">
          Comparing a float to an int with <Strong>==</Strong> mostly works, but comparing two
          floats for exact equality after arithmetic often does not —{" "}
          <Strong>0.1 + 0.2 == 0.3</Strong> returns <Strong>False</Strong>, because neither
          side can be represented exactly in binary. Compare floats by checking they are close
          enough, not identical.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "/ is true division and always returns a float. // is floor division and rounds down.",
          "** is exponentiation, and it binds tighter than * and + — add parentheses rather than rely on memory.",
          "Mixing an int and a float in one expression upgrades the whole result to a float.",
          "Never compare floats with == after arithmetic. 0.1 + 0.2 == 0.3 is False.",
        ]}
      />
    </div>
  );
}
