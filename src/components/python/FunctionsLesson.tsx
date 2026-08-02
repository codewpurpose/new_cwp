import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { FunctionMachine } from "@/components/python/FunctionMachine";

export function FunctionsLesson() {
  return (
    <div>
      <Lead>
        Copy the same five lines into three places in a program and you have created three
        bugs waiting to happen, not three features. Wrap them in a function once, and watch
        every copy become a single name you can call.
      </Lead>

      <LessonSection id="naming-a-piece-of-work-you-will-repeat" title="Naming a piece of work you will repeat">
        <CodeBlock
          label="greet.py"
          code={`def greet(name):
    print(f"Hello, {name}!")

greet("Ada")
greet("Grace")`}
        />
        <P>
          <Strong>def</Strong> defines the function once. Every line after it that calls{" "}
          <Strong>greet(...)</Strong> reuses that same definition — fix a bug inside{" "}
          <Strong>greet</Strong>, and every call to it is fixed, everywhere, in one edit.
        </P>
      </LessonSection>

      <FunctionMachine />

      <LessonSection id="parameters-are-just-names-local-to-the-call" title="Parameters are just names local to the call">
        <P>
          <Strong>name</Strong> inside <Strong>greet</Strong> is a name that exists only while
          that particular call is running. Each call gets its own — calling{" "}
          <Strong>{'greet("Ada")'}</Strong> and <Strong>{'greet("Grace")'}</Strong> back to
          back does not leave <Strong>name</Strong> holding <Strong>&quot;Ada&quot;</Strong>{" "}
          by the time the second call starts.
        </P>
      </LessonSection>

      <LessonSection id="return-sends-a-value-back-print-only-shows-it" title="Return sends a value back; print only ever shows you one">
        <P>
          <Strong>print</Strong> writes text to the screen and hands nothing back to the rest
          of the program. <Strong>return</Strong> sends a value back to wherever the function
          was called from, so it can be stored, compared, or passed to something else.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add(a, b):
...     return a + b
...
>>> result = add(3, 4)
>>> result
7`}
        />
        <Callout tone="warning" title="A function with no return statement">
          Still returns something — <Strong>None</Strong>. If you print the result of a
          function that only ever prints internally and never returns, you get{" "}
          <Strong>None</Strong>, not the value you saw printed.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A function names a piece of work once. Every call reuses that same definition.",
          "Parameters are local to each call — one call's values never leak into another's.",
          "print shows you something on screen and returns nothing to the program. return hands a value back.",
          "A function with no return statement returns None, whether or not it printed something along the way.",
        ]}
      />
    </div>
  );
}
