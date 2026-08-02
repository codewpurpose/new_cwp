import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { StepList } from "@/components/learn/primitives/StepList";

export function DecoratorsLesson() {
  return (
    <div>
      <Lead>
        Adding logging to ten functions usually means editing ten functions. Write the logging
        once as a decorator, apply it with one line above each function, and leave the original
        code untouched.
      </Lead>

      <LessonSection id="a-function-is-a-value-like-any-other" title="A function is a value like any other">
        <P>
          Everything a decorator does rests on one fact that is easy to forget once you are
          used to calling functions with parentheses: a function is a value, the same as a
          number or a string, and a name can point at it without calling it.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def shout(text):
...     return text.upper()
...
>>> greeting = shout
>>> greeting("hello")
'HELLO'
>>> functions = [shout, len, print]`}
        />
        <P>
          <Strong>greeting = shout</Strong> does not call{" "}
          <Strong>shout</Strong> — there are no parentheses — it makes a second name point at
          the exact same function object, the same way two variables can point at the same
          list. <Strong>functions = [shout, len, print]</Strong> works for the identical
          reason: a list can hold functions just as easily as it holds numbers, because to
          Python they are both just values.
        </P>
        <P>
          A decorator is built entirely out of this one fact, applied twice: a function that
          takes a function in as an argument, and a function that returns a function as its
          result.
        </P>
      </LessonSection>

      <LessonSection id="a-function-that-takes-a-function-and-returns-one" title="A function that takes a function and returns one">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def log_calls(func):
...     def wrapper(*args):
...         print(f"calling {func.__name__}")
...         return func(*args)
...     return wrapper
...
>>> def add(a, b):
...     return a + b
...
>>> add = log_calls(add)
>>> add(2, 3)
calling add
5`}
        />
        <P>
          <Strong>log_calls</Strong> takes a function in and returns a different function —{" "}
          <Strong>wrapper</Strong> — that does the logging, then calls the original underneath.
          Reassigning <Strong>add = log_calls(add)</Strong> replaces the name{" "}
          <Strong>add</Strong> with the wrapped version; the original function still exists, just
          without a name pointing at it anymore.
        </P>
        <P>
          The part that makes this work is a <Strong>closure</Strong>: even after{" "}
          <Strong>log_calls</Strong> has finished running and returned, <Strong>wrapper</Strong>{" "}
          still remembers which <Strong>func</Strong> was passed in. That is not something you
          arranged by hand — a nested function automatically keeps hold of the variables from
          the function that defined it, for as long as the nested function itself still
          exists. Without a closure, <Strong>wrapper</Strong> would have no way to know which
          function it was supposed to be wrapping by the time you actually called it.
        </P>
      </LessonSection>

      <LessonSection id="the-at-sign-is-not-special-syntax" title="@ is not special syntax, it is one line saved">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> @log_calls
... def add(a, b):
...     return a + b
...
>>> add(2, 3)
calling add
5`}
        />
        <P>
          <Strong>{"@log_calls"}</Strong> written above{" "}
          <Strong>def add(...)</Strong> does exactly what{" "}
          <Strong>add = log_calls(add)</Strong> did on the previous line — Python runs it
          automatically, immediately after the function is defined.
        </P>
        <P>
          Stack more than one decorator and Python applies them from the bottom up, closest to
          the function first: <Strong>{"@a"}</Strong> above{" "}
          <Strong>{"@b"}</Strong> above <Strong>def f(): ...</Strong> is{" "}
          <Strong>{"a(b(f))"}</Strong>, not <Strong>{"b(a(f))"}</Strong>. Get the order backwards
          and the code still runs, which is exactly what makes the mistake easy to miss — a
          logging decorator applied outside a timing decorator logs before the clock starts
          rather than after, and nothing about the syntax warns you.
        </P>
      </LessonSection>

      <LessonSection id="what-a-decorator-costs-you-when-it-goes-wrong" title="What a decorator costs you when it goes wrong">
        <P>
          Every decorated function now runs through <Strong>wrapper</Strong> first, which makes
          errors inside it harder to trace — a traceback that should point at{" "}
          <Strong>add</Strong> often points at <Strong>wrapper</Strong> instead, one layer
          removed from where the real work happens.
        </P>
        <RevealCard
          summaryTag="Before"
          summary="add.__name__ after decorating with a plain wrapper"
          detailTag="After"
          detail={
            <>
              <Strong>add.__name__</Strong> reports{" "}
              <Strong>&apos;wrapper&apos;</Strong>, not{" "}
              <Strong>&apos;add&apos;</Strong> — the decorator quietly replaced the function&apos;s
              identity along with its behaviour. Adding{" "}
              <Strong>@functools.wraps(func)</Strong> above the inner{" "}
              <Strong>def wrapper</Strong> copies the original name and docstring back onto it,
              fixing this without changing what the decorator does.
            </>
          }
          footnote="This is the one line every real decorator in the standard library and popular packages includes, and the one line most hand-written ones forget."
        />
        <Callout tone="warning" title="A cost worth naming, not avoiding">
          None of this is a reason to skip decorators — it is a reason to keep them thin, and to
          reach for <Strong>functools.wraps</Strong> by habit, not as an afterthought.
        </Callout>
      </LessonSection>

      <LessonSection id="a-decorator-that-takes-its-own-arguments" title="A decorator that takes its own arguments">
        <P>
          <Strong>{"@log_calls"}</Strong> has no way to be configured — every function it
          wraps gets the exact same behaviour. A decorator that needs its own argument, like{" "}
          <Strong>{"@repeat(3)"}</Strong> to call a function three times, needs one more layer
          of nesting than <Strong>log_calls</Strong> had.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def repeat(times):
...     def decorator(func):
...         def wrapper(*args):
...             result = None
...             for _ in range(times):
...                 result = func(*args)
...             return result
...         return wrapper
...     return decorator
...
>>> @repeat(3)
... def greet(name):
...     print(f"Hello, {name}")
...
>>> greet("Ada")
Hello, Ada
Hello, Ada
Hello, Ada`}
        />
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Python evaluates repeat(3) first",
              detail: "This runs immediately, on its own, and returns decorator — with times fixed at 3 inside its closure.",
            },
            {
              label: "The returned decorator is applied to greet",
              detail: "Exactly like log_calls was applied to add — decorator(greet) runs next.",
            },
            {
              label: "decorator(greet) returns wrapper",
              detail: "wrapper now closes over two things: func (greet) and times (3), both remembered from the layers above it.",
            },
            {
              label: "The name greet is reassigned to wrapper",
              detail: "Identical to the plain decorator case — just built on the fly, with times baked in for this particular use.",
            },
          ]}
        />
        <P>
          The three layers are easy to lose track of, so it helps to name them by what each
          one takes: <Strong>repeat</Strong> takes the decorator&apos;s own argument,{" "}
          <Strong>decorator</Strong> takes the function being wrapped, and{" "}
          <Strong>wrapper</Strong> takes the arguments of an actual call. A decorator with
          arguments still needs <Strong>functools.wraps(func)</Strong> on its innermost
          wrapper — the extra layer changes nothing about that.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A function is a value like any other — a name can point at one without calling it, which is what makes wrapping a function possible at all.",
          "A decorator is a function that takes a function and returns a replacement — usually one that wraps the original with extra behaviour.",
          "@decorator_name above a def is shorthand for func = decorator_name(func), run automatically right after the function is defined.",
          "A decorated function runs through the wrapper first, which is why tracebacks from decorated code can look one layer removed from the real error.",
          "functools.wraps(func) on the inner wrapper preserves the original function's name and docstring, which a bare wrapper silently loses — a decorator with its own arguments still needs it.",
        ]}
      />
    </div>
  );
}
