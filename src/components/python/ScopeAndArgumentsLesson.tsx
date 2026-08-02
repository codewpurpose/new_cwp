import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function ScopeAndArgumentsLesson() {
  return (
    <div>
      <Lead>
        A variable created inside a function looks like it should be visible everywhere once
        the function has run. Try to read it from outside, and find out Python disagrees, on
        purpose.
      </Lead>

      <LessonSection id="a-name-only-exists-where-it-was-created" title="A name only exists where it was created">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def set_total():
...     total = 100
...
>>> set_total()
>>> total
NameError: name 'total' is not defined`}
        />
        <P>
          <Strong>total</Strong> was assigned, and the function ran without error. It still
          does not exist outside the function, because a name created inside a function
          belongs to that function&apos;s own local scope, and that scope disappears the
          moment the function returns.
        </P>
      </LessonSection>

      <LessonSection id="reading-an-outer-name-is-allowed-changing-it-is-not" title="Reading an outer name is allowed; changing it is not, by default">
        <P>
          A function can read a name defined outside it without any special syntax. The
          moment it tries to <em>assign</em> to that name, Python assumes you meant to create
          a new local variable instead — even if a variable with that name already exists
          outside.
        </P>
        <RevealCard
          summaryTag="What you might expect"
          summary="A function that adds 1 to a counter defined outside it, and the counter goes up by one."
          detailTag="What actually happens"
          detail={
            <>
              <CodeBlock
                label="Terminal"
                variant="terminal"
                code={`>>> count = 0
>>> def increment():
...     count = count + 1
...
>>> increment()
UnboundLocalError: cannot access local variable 'count'`}
              />
              <p className="mt-4 text-[14px] leading-[1.5] text-learn-strong">
                Python sees the assignment <Strong>count = count + 1</Strong> anywhere in the
                function body and decides, before the function even runs, that{" "}
                <Strong>count</Strong> is local to it. Then it tries to read that local{" "}
                <Strong>count</Strong> on the right-hand side before it has been assigned
                anything at all — hence the error.
              </p>
            </>
          }
        />
        <Callout tone="tip" title="If you need to change it">
          Declare <Strong>global count</Strong> as the first line of the function. It is rarely
          the right tool — passing the value in and returning the new one is almost always
          clearer — but it is what the keyword is for.
        </Callout>
      </LessonSection>

      <LessonSection id="default-arguments-are-evaluated-once" title="Default arguments are evaluated once, not every call">
        <P>
          A default value in a function signature is evaluated exactly once, when the
          function is defined — not fresh on every call. For a mutable default like a list,
          that single shared object gets reused across every call that relies on the default.
        </P>
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
        />
        <P>
          The second call did not start from an empty basket. Both calls share the exact same
          list, created once when Python read the <Strong>def</Strong> line. The fix is to
          default to <Strong>None</Strong> and create a fresh list inside the function body
          when nothing was passed.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A name created inside a function belongs to that function and disappears when it returns.",
          "Assigning to a name anywhere in a function makes Python treat it as local throughout the whole function, even before the assignment line runs.",
          "Use the global keyword to assign to an outer name from inside a function — but prefer passing values in and returning them instead.",
          "A mutable default argument, like basket=[], is created once and shared across every call that uses the default.",
        ]}
      />
    </div>
  );
}
