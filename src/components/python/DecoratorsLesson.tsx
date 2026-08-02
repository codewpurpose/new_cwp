import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function DecoratorsLesson() {
  return (
    <div>
      <Lead>
        Adding logging to ten functions usually means editing ten functions. Write the logging
        once as a decorator, apply it with one line above each function, and leave the original
        code untouched.
      </Lead>

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

      <TakeawayCard
        items={[
          "A decorator is a function that takes a function and returns a replacement — usually one that wraps the original with extra behaviour.",
          "@decorator_name above a def is shorthand for func = decorator_name(func), run automatically right after the function is defined.",
          "A decorated function runs through the wrapper first, which is why tracebacks from decorated code can look one layer removed from the real error.",
          "functools.wraps(func) on the inner wrapper preserves the original function's name and docstring, which a bare wrapper silently loses.",
        ]}
      />
    </div>
  );
}
