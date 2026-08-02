import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { StepList } from "@/components/learn/primitives/StepList";
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

      <LessonSection id="syntax-errors-are-not-exceptions" title="Syntax errors are not exceptions">
        <P>
          Every red wall of text Python shows you looks the same at a glance, and treating them
          as one category costs you time later. A <Strong>SyntaxError</Strong> happens before
          your program runs a single line — Python read the whole file, could not make sense of
          its grammar, and refused to start at all.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def greet(name)
  File "<stdin>", line 1
    def greet(name)
                   ^
SyntaxError: expected ':'`}
          lineTones={{ 4: "err" }}
        />
        <P>
          Everything else — <Strong>KeyError</Strong>, <Strong>TypeError</Strong>,{" "}
          <Strong>ZeroDivisionError</Strong>, the ones the picker below shows — is an{" "}
          <Strong>exception</Strong>. An exception can only happen after the program has started
          running, on a line that parsed correctly but turned out, at that moment, to be
          impossible: a key that was never there, a division by a number that happened to be
          zero. The distinction matters because only exceptions can be caught with{" "}
          <Strong>try</Strong> and <Strong>except</Strong>. A SyntaxError in the file you are
          running has already stopped the program before any except clause of yours gets a
          chance to run.
        </P>
      </LessonSection>

      <LessonSection id="reading-a-traceback-from-the-bottom-not-the-top" title="Reading a traceback from the bottom, not the top">
        <P>
          The <em>last</em> line of a traceback names the exception and the message — that is
          what actually went wrong. The lines above it, read bottom to top, are the chain of
          calls that led there: the line your own code was on comes first, then whatever
          called that, and so on outward.
        </P>
        <P>
          Here is one with more than one frame in it, which is where the bottom-up habit
          actually earns its keep.
        </P>
        <CodeBlock
          label="shop.py"
          code={`CATALOGUE = {"bread": 3.2, "eggs": 4.5}

def price_for(item):
    return CATALOGUE[item]

def total(cart):
    return sum(price_for(item) for item in cart)

total(["bread", "eggs", "kombucha"])`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`Traceback (most recent call last):
  File "shop.py", line 9, in <module>
    total(["bread", "eggs", "kombucha"])
  File "shop.py", line 6, in total
    return sum(price_for(item) for item in cart)
  File "shop.py", line 3, in price_for
    return CATALOGUE[item]
           ~~~~~~~~~^^^^^^
KeyError: 'kombucha'`}
          lineTones={{ 8: "err", 5: "accent" }}
        />
        <P>
          Start at the bottom: <Strong>KeyError: &apos;kombucha&apos;</Strong>. Move up one
          frame: the crash happened inside <Strong>price_for</Strong>, on the line that looks
          up <Strong>CATALOGUE[item]</Strong>. Move up again: <Strong>price_for</Strong> was
          called from <Strong>total</Strong>, which was itself called from line 9, at the
          bottom of the file. Reading top to bottom instead tells you the same thing backwards
          — you would wade through two frames you do not need yet before reaching the one line
          that actually matters.
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
          including ones you never considered and need to see — a typo in a variable
          name will fail silently instead of telling you it exists. Name the specific
          exception you expect.
        </Callout>
        <P>
          A single except can also name more than one exception, as a tuple, when the same
          recovery applies to either: <Strong>{"except (KeyError, IndexError):"}</Strong> runs
          the same block whichever of the two happens. Reach for that instead of a bare except
          the moment you are tempted to write one.
        </P>
      </LessonSection>

      <LessonSection id="try-except-else-finally-each-clause-earns-its-place" title="try, except, else, finally: each clause earns its place" delay={0.05}>
        <P>
          Most examples stop at try and except, which makes the other two clauses look
          optional. They are not decoration — each one runs at a different, precise moment,
          and reaching for the wrong one is a real source of bugs.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> try:
...     price = catalogue[item]
... except KeyError:
...     print(f"No such item: {item}")
... else:
...     print(f"{item} costs {price}")
... finally:
...     print("Checked catalogue.")
...`}
        />
        <StepList
          variant="timeline"
          steps={[
            {
              label: "try — the code that might fail",
              detail:
                "Keep it to the smallest block that can actually raise the exception you are guarding against. Wrapping more than that risks silently catching a bug you never meant to.",
            },
            {
              label: "except — runs only if try raised that exception",
              detail:
                "This is where you recover: log it, substitute a default, or tell the user. It never runs if try succeeded.",
            },
            {
              label: "else — runs only if try succeeded",
              detail:
                "Code here runs when nothing went wrong, and an exception raised inside else is not caught by the except above it. It keeps your success-path code from being accidentally shielded by your own error handling.",
            },
            {
              label: "finally — always runs, success or failure",
              detail:
                "Used for cleanup that has to happen either way, like closing a connection or releasing a lock. It runs even if the except block re-raises the error.",
            },
          ]}
        />
        <P>
          Put the print inside try, right after fetching the price, instead of in else, and a
          bug in that print statement itself — a typo in the variable name, say — gets
          reported as though it were a KeyError, when it never was one. else exists
          specifically to stop that.
        </P>
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
        <P>
          The condition you check does not have to be this simple. Validate every assumption
          the rest of the function depends on at the top, before any of the real work runs —
          that way a bad call fails on its very first line instead of partway through a
          calculation that no longer makes sense.
        </P>
      </LessonSection>

      <LessonSection id="writing-your-own-exception-class" title="Writing your own exception class" delay={0.05}>
        <P>
          <Strong>ValueError</Strong> is honest but generic — catching it also catches every
          other ValueError anywhere else in the program, for reasons that have nothing to do
          with the one you meant. A custom exception class costs one line and buys you
          something to catch precisely.
        </P>
        <CodeBlock
          label="account.py"
          code={`class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(
            f"cannot withdraw {amount}, balance is {balance}"
        )
    return balance - amount`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> try:
...     withdraw(50, 75)
... except InsufficientFundsError as error:
...     print(f"Blocked: {error}")
...
Blocked: cannot withdraw 75, balance is 50`}
        />
        <P>
          Inheriting from <Strong>Exception</Strong> is enough — <Strong>pass</Strong>, with
          nothing else, is a complete class, because Exception already knows how to store the
          message you pass it and print it back. Now{" "}
          <Strong>except InsufficientFundsError:</Strong> catches exactly this failure, and
          nothing that merely happens to share a message with it.
        </P>
        <Callout tone="note" title="Naming and where it fits">
          Custom exceptions are usually named with an Error suffix, matching Python&apos;s own
          convention, and are typically defined alongside the code they protect rather than
          gathered in one file. Reach for one once a plain ValueError or KeyError stops
          describing what actually went wrong, in your own program&apos;s vocabulary rather
          than Python&apos;s generic one.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A SyntaxError happens before your program runs at all — Python could not parse the file. An exception happens afterwards, while the program is executing a line that turned out to be impossible.",
          "Read a traceback from the bottom: the last line names the actual exception and message, and the frames above it, read upward, are the chain of calls that led there.",
          "try/except recovers from an error you anticipated. Name the specific exception; a bare except: also swallows bugs you never anticipated and need to see.",
          "else runs only when the try block succeeded, and finally runs no matter what — even when except re-raises. Neither is decoration; each does something the other cannot.",
          "raise a specific exception the moment an impossible value appears, and write a custom exception class when the built-in ones do not carry your program's own vocabulary of what went wrong.",
        ]}
      />
    </div>
  );
}
