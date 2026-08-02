import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { ErrorPicker } from "@/components/python/ErrorPicker";

export function ErrorsLesson() {
  return (
    <div>
      <Lead>
        A traceback looks like the program&apos;s way of failing at you. Read one from the
        bottom up instead of the top down, and it turns into the most specific bug report you
        will ever get for free.
      </Lead>

      <LessonSection id="reading-a-traceback-from-the-bottom-not-the-top" title="Reading a traceback from the bottom, not the top">
        <P>
          The <em>last</em> line of a traceback names the exception and the message — that is
          what actually went wrong. The lines above it, read bottom to top, are the chain of
          calls that led there: the line your own code was on comes first, then whatever
          called that, and so on outward.
        </P>
      </LessonSection>

      <ErrorPicker />

      <LessonSection id="catching-the-error-you-expect-not-every-error" title="Catching the error you expect, not every error">
        <P>
          <Strong>try</Strong> and <Strong>except</Strong> let a program recover from an
          error instead of crashing — but only if you catch the specific exception you
          actually anticipated.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> try:
...     price = prices["mango"]
... except KeyError:
...     price = 0
...
>>> price
0`}
        />
        <Callout tone="danger" title="Do not write a bare except:">
          <Strong>{"except:"}</Strong> with nothing after it catches every possible error,
          including ones you never considered and genuinely need to see — a typo in a variable
          name will fail silently instead of telling you it exists. Name the specific
          exception you expect.
        </Callout>
      </LessonSection>

      <LessonSection id="raising-one-on-purpose-before-it-happens-by-accident" title="Raising one on purpose, before it happens by accident">
        <P>
          You can trigger an exception deliberately with <Strong>raise</Strong>, which is
          often clearer than letting bad input travel deep into a program before it fails on
          its own, somewhere confusing.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def set_age(age):
...     if age < 0:
...         raise ValueError("age cannot be negative")
...     return age
...
>>> set_age(-5)
ValueError: age cannot be negative`}
        />
        <P>
          Failing loudly and immediately, at the exact line where the impossible value
          appeared, is far easier to debug than a program that accepts{" "}
          <Strong>-5</Strong> quietly and produces a nonsensical answer four functions later.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Read a traceback's last line first — it names the actual exception and message.",
          "try/except recovers from an error you anticipated. Name the specific exception; never write a bare except:.",
          "A bare except: also swallows errors you did not anticipate, hiding real bugs instead of surfacing them.",
          "raise a specific exception the moment you detect an impossible value, rather than letting it travel further into the program.",
        ]}
      />
    </div>
  );
}
