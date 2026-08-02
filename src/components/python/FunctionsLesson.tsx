import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          The alternative is copying the body wherever you need it. Three copies means three
          places to remember to update when the greeting changes, and it is exactly the third
          one, six months from now, that someone forgets.
        </P>
      </LessonSection>

      <LessonSection id="writing-the-docstring-so-help-can-find-it" title="Writing the docstring so help can find it">
        <P>
          A comment above a function explains it to someone reading the source file. A{" "}
          <Strong>docstring</Strong> — a string literal as the first line inside the function
          body — explains it to anyone calling the function, whether or not they ever open the
          file it lives in.
        </P>
        <CodeBlock
          label="greet.py"
          code={`def greet(name):
    """Print a friendly greeting to the given name."""
    print(f"Hello, {name}!")`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> help(greet)
Help on function greet in module __main__:

greet(name)
    Print a friendly greeting to the given name.`}
        />
        <P>
          <Strong>help()</Strong> reads that string straight out of the function object and
          shows it, along with the signature, without you opening the source file at all. An
          editor&apos;s autocomplete pulls from the same place — the docstring you write once
          is what shows up as documentation everywhere the function is used afterward.
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
        <P>
          Arguments can be passed by position, matching the order parameters were declared in,
          or by name, which reads more clearly the moment a function takes more than one or
          two of them.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def describe(name, age, role):
...     print(f"{name}, {age}, {role}")
...
>>> describe("Ada", 36, "admin")
Ada, 36, admin
>>> describe(role="admin", name="Ada", age=36)
Ada, 36, admin`}
        />
      </LessonSection>

      <LessonSection id="default-arguments-and-the-trap-everyone-eventually-hits" title="Default arguments, and the trap everyone eventually hits">
        <P>
          A parameter can carry a default, so a caller who does not have anything special to
          say for it can just leave it out.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def greet(name, greeting="Hello"):
...     print(f"{greeting}, {name}!")
...
>>> greet("Ada")
Hello, Ada!
>>> greet("Grace", "Hi")
Hi, Grace!`}
        />
        <P>
          That default is evaluated exactly once — when Python reads the{" "}
          <Strong>def</Strong> line, not fresh on every call. For an immutable default like the
          string above, that distinction is invisible. For a mutable one, like a list, it is
          the single most common bug beginners write in their first week with functions.
        </P>
        <Callout tone="danger" title="Never default a parameter to a mutable value">
          <Strong>{"def add_item(item, basket=[]):"}</Strong> creates one list, once, when the
          function is defined. Every call that relies on the default shares that exact same
          list — not a fresh empty one each time.
        </Callout>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add_item(item, basket=[]):
...     basket.append(item)
...     return basket
...
>>> add_item("apple")
['apple']
>>> add_item("banana")
['apple', 'banana']`}
          lineTones={{ 7: "warn" }}
        />
        <P>
          The second call did not start from an empty basket, and nothing about the call site
          hints why. The fix is to default to <Strong>None</Strong>, then create a fresh list
          inside the function body only when nothing was passed in:
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add_item(item, basket=None):
...     if basket is None:
...         basket = []
...     basket.append(item)
...     return basket
...
>>> add_item("apple")
['apple']
>>> add_item("banana")
['banana']`}
          lineTones={{ 9: "ok" }}
        />
      </LessonSection>

      <LessonSection id="packing-extra-arguments-with-args-and-kwargs" title="Packing extra arguments with *args and **kwargs">
        <P>
          Sometimes you do not know how many arguments a function should accept until it is
          called — a logging function might take one message or five. <Strong>*args</Strong>{" "}
          collects any number of extra positional arguments into a tuple.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def total(*numbers):
...     return sum(numbers)
...
>>> total(1, 2, 3)
6
>>> total(10, 20, 30, 40)
100`}
        />
        <P>
          <Strong>**kwargs</Strong> does the same for keyword arguments, collecting anything
          passed by name into a dictionary instead.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def describe(**details):
...     for key, value in details.items():
...         print(f"{key}: {value}")
...
>>> describe(name="Ada", role="admin")
name: Ada
role: admin`}
        />
        <P>
          The names <Strong>args</Strong> and <Strong>kwargs</Strong> are convention, not
          syntax — the asterisks are what matter. Reach for either only when a function
          genuinely needs to accept an open-ended set of inputs; a fixed, named parameter list
          is easier to read and easier for an editor to check for you whenever you can get
          away with one.
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
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def show_total(a, b):
...     print(a + b)
...
>>> result = show_total(3, 4)
7
>>> result
>>> print(result)
None`}
          lineTones={{ 4: "warn", 7: "warn" }}
        />
        <P>
          <Strong>show_total(3, 4)</Strong> printed <Strong>7</Strong> to the screen while it
          ran, which is easy to mistake for the function having returned it. <Strong>result</Strong>{" "}
          holds <Strong>None</Strong>, because nothing inside the function ever wrote{" "}
          <Strong>return</Strong>. Reaching the end of a function body falls off the end and
          returns <Strong>None</Strong> exactly as if that had been the last line.
        </P>
      </LessonSection>

      <CompareGrid
        items={[
          {
            title: "return",
            tone: "positive",
            children: (
              <P>
                Hands a value back to the caller. Use it whenever the result needs to be
                stored, compared, or passed on to something else.
              </P>
            ),
          },
          {
            title: "print",
            tone: "neutral",
            children: (
              <P>
                Shows something on screen for a human to read. The function still returns{" "}
                <Strong>None</Strong> unless it also has a <Strong>return</Strong>.
              </P>
            ),
          },
        ]}
      />

      <TakeawayCard
        items={[
          "A function names a piece of work once. Every call reuses that same definition.",
          "A docstring — a string literal as the first line of the body — is what help() and an editor's autocomplete show, so write one for anything you expect someone else to call.",
          "Parameters are local to each call — one call's values never leak into another's.",
          "Never default a parameter to a mutable value like a list. It is created once and shared across every call that relies on the default; default to None and build the value inside the function instead.",
          "print shows you something on screen and returns nothing to the program. return hands a value back, and a function with no return statement returns None.",
        ]}
      />
    </div>
  );
}
