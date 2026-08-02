import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

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
          lineTones={{ 5: "err" }}
        />
        <P>
          <Strong>total</Strong> was assigned, and the function ran without error. It still
          does not exist outside the function, because a name created inside a function
          belongs to that function&apos;s own local scope, and that scope disappears the
          moment the function returns.
        </P>
        <P>
          This is not Python being restrictive for its own sake. Every call to{" "}
          <Strong>set_total()</Strong> gets a fresh local scope, discarded when the call ends —
          if it did not, a function that runs a thousand times would leave a thousand stale
          copies of every local name behind it, and no function could ever reuse a variable
          name safely.
        </P>
      </LessonSection>

      <LessonSection id="the-four-places-python-looks-legb" title="The four places Python looks: LEGB">
        <P>
          When code reads a name, Python does not search one place. It checks four scopes in
          order, and stops at the first one that has the name — an order usually remembered by
          its initials, <Strong>LEGB</Strong>.
        </P>
        <LabelRows
          rows={[
            { label: "L — Local", text: "Names assigned inside the current function." },
            {
              label: "E — Enclosing",
              text: "Names in any function this one is nested inside, checked one level out at a time.",
            },
            { label: "G — Global", text: "Names assigned at the top level of the module." },
            {
              label: "B — Built-in",
              text: "Names Python itself provides, like len, print, and range.",
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> value = "global"
>>> def outer():
...     value = "enclosing"
...     def inner():
...         print(value)
...     inner()
...
>>> outer()
enclosing`}
        />
        <P>
          <Strong>inner()</Strong> has no local <Strong>value</Strong> of its own, so Python
          steps out one level to the enclosing function&apos;s <Strong>value</Strong>, finds it
          there, and stops — the module-level <Strong>&quot;global&quot;</Strong> is never
          even checked, because the search already succeeded at the enclosing scope.
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

      <LessonSection id="nonlocal-reaches-one-enclosing-scope" title="nonlocal reaches into the enclosing scope, not all the way out">
        <P>
          <Strong>global</Strong> only ever reaches the module level. A function nested inside
          another function needs a different keyword to modify a name in the scope one level
          out — <Strong>nonlocal</Strong>.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def make_counter():
...     count = 0
...     def increment():
...         nonlocal count
...         count += 1
...         return count
...     return increment
...
>>> counter = make_counter()
>>> counter()
1
>>> counter()
2`}
        />
        <P>
          Without <Strong>nonlocal</Strong>, <Strong>count += 1</Strong> inside{" "}
          <Strong>increment</Strong> would hit the exact same <Strong>UnboundLocalError</Strong>{" "}
          as the previous section, for the same reason — the assignment makes Python treat{" "}
          <Strong>count</Strong> as local to <Strong>increment</Strong>, unless told otherwise.
          With it, each call to <Strong>counter()</Strong> reaches back into{" "}
          <Strong>make_counter</Strong>&apos;s scope and updates the same{" "}
          <Strong>count</Strong> that persists between calls.
        </P>
        <Callout tone="note" title="You will reach for this rarely, and that is by design">
          Both <Strong>global</Strong> and <Strong>nonlocal</Strong> let a function reach
          outside itself and change something the caller cannot see coming. A function that
          takes what it needs as a parameter and returns what it produces is almost always
          easier to test and easier to reason about than one that mutates a name living
          somewhere else. Reach for these keywords when you have a specific reason, not as a
          default.
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
          lineTones={{ 7: "warn" }}
        />
        <P>
          The second call did not start from an empty basket. Both calls share the exact same
          list, created once when Python read the <Strong>def</Strong> line. The fix is to
          default to <Strong>None</Strong> and create a fresh list inside the function body
          when nothing was passed.
        </P>
      </LessonSection>

      <LessonSection id="mutating-an-argument-vs-reassigning-it" title="Mutating an argument changes it for the caller too; reassigning it does not">
        <P>
          Python passes arguments by handing the function a reference to the same object the
          caller has — not a copy of it. What the function does with that reference determines
          whether the caller ever notices.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add_score(scores):
...     scores.append(100)
...
>>> my_scores = [88, 91]
>>> add_score(my_scores)
>>> my_scores
[88, 91, 100]`}
        />
        <P>
          <Strong>scores</Strong> inside the function and <Strong>my_scores</Strong> outside it
          are two names pointing at the exact same list. <Strong>.append()</Strong> mutates
          that list in place, so the change is visible through either name — the function
          never had to return anything for the caller to see it.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> def add_score(scores):
...     scores = scores + [100]
...
>>> my_scores = [88, 91]
>>> add_score(my_scores)
>>> my_scores
[88, 91]`}
          lineTones={{ 6: "warn" }}
        />
        <P>
          This time nothing changes outside the function. <Strong>scores + [100]</Strong>{" "}
          builds a brand new list, and <Strong>scores = ...</Strong> points the local name{" "}
          <Strong>scores</Strong> at it — <Strong>my_scores</Strong>, outside, still points at
          the original. Rebinding a name only ever affects that name, never the object it used
          to point at.
        </P>
        <Callout tone="tip" title="The question to ask">
          Does the line mutate the object in place (<Strong>.append()</Strong>,{" "}
          <Strong>.sort()</Strong>, <Strong>[i] = ...</Strong>) or does it assign a new object
          to the parameter name (<Strong>{"= "}</Strong>)? The first is visible to the caller.
          The second never is.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A name created inside a function belongs to that function and disappears when it returns.",
          "Python resolves a name by checking Local, then Enclosing, then Global, then Built-in scope, and stops at the first match — LEGB.",
          "Assigning to a name anywhere in a function makes Python treat it as local throughout the whole function, even before the assignment line runs.",
          "global reaches the module level; nonlocal reaches one enclosing function's scope. Prefer passing values in and returning them over reaching for either.",
          "Mutating an argument in place changes the object the caller sees too; rebinding the parameter name to a new object never does.",
        ]}
      />
    </div>
  );
}
