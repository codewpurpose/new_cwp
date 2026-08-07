import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { AliasTracer } from "@/components/python/AliasTracer";

export function CopyingAndAliasingLesson() {
  return (
    <div>
      <Lead>
        You copied the list, changed the copy, and the original changed with it. Point three
        different kinds of copy at the same nested list, mutate one item at the bottom, and
        see precisely which of them flinch.
      </Lead>

      <LessonSection id="a-copy-that-copied-only-the-outside" title="A copy that copied only the outside">
        <P>
          The chapter on names established that assignment never copies anything — it points a
          second name at the same object. You already know to reach for{" "}
          <Strong>.copy()</Strong> when you want a separate list. Here is where that stops
          being enough.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> a = [[1, 2], [3, 4]]
>>> b = a.copy()
>>> b[0].append(9)
>>> a
[[1, 2, 9], [3, 4]]`}
          lineTones={{ 4: "err" }}
        />
        <P>
          <Strong>b</Strong> is a genuinely separate outer list. It is also holding the exact
          same two inner lists that <Strong>a</Strong> holds, because copying a list copies
          what its slots contain — and what its slots contain are references. One level was
          duplicated. Everything below it was shared.
        </P>
      </LessonSection>

      <LessonSection
        id="three-ways-to-copy-a-flat-list-all-of-which-work"
        title="Three ways to copy a flat list, all of which work"
      >
        <P>
          When a list holds only numbers or strings, the distinction never surfaces, and all
          three of these are equivalent and correct.
        </P>
        <CodeBlock
          label="Python"
          code={`original = [1, 2, 3]

safe = original.copy()
safe = list(original)
safe = original[:]`}
        />
        <P>
          A number cannot be mutated in place, so sharing one is harmless — there is no
          operation that would change it for both names. That is why flat lists let you get
          away with the shallow copy indefinitely, and why the problem only appears once a
          list starts holding things that <em>can</em> change.
        </P>
      </LessonSection>

      <LessonSection id="the-same-three-ways-on-a-nested-list" title="The same three ways on a nested list">
        <P>
          All three still copy exactly one level. Try the two buttons below under each mode:
          the first mutates an inner list, the second mutates the outer one, and it takes both
          to tell all three cases apart.
        </P>
      </LessonSection>

      <AliasTracer />

      <P>
        Notice what the second button proves. Mutating the inner list looks identical for{" "}
        <Strong>b = a</Strong> and <Strong>b = a.copy()</Strong>, so an inner mutation alone
        can never tell you which of the two you have. Only appending to the outer list
        separates them.
      </P>

      <LessonSection id="deepcopy-follows-every-level-down" title="deepcopy follows every level down">
        <P>
          When you need a copy that shares nothing at all, the standard library has one. It is
          not a built-in, and it does not need to be.
        </P>
        <CodeBlock
          label="Python"
          code={`from copy import deepcopy

a = [[1, 2], [3, 4]]
b = deepcopy(a)
b[0].append(9)

print(a)  # [[1, 2], [3, 4]]
print(b)  # [[1, 2, 9], [3, 4]]`}
          lineTones={{ 6: "ok" }}
        />
        <P>
          <Strong>deepcopy</Strong> walks the whole structure and rebuilds every mutable thing
          it finds, however deep. It also tracks what it has already copied, so a structure
          that refers to itself does not send it into an infinite loop — which is more care
          than the problem usually gets credit for.
        </P>
      </LessonSection>

      <LessonSection id="what-deepcopy-costs-you" title="What deepcopy costs you">
        <P>
          It is not free, and reaching for it by default is its own mistake.
        </P>
        <CompareGrid
          items={[
            {
              title: "Shallow is enough when",
              tone: "positive",
              children: (
                <P>
                  The list holds only numbers, strings, or tuples of them — anything that
                  cannot be changed in place. Sharing something unchangeable costs nothing and
                  saves the walk.
                </P>
              ),
            },
            {
              title: "Go deep when",
              tone: "caution",
              children: (
                <P>
                  The structure holds lists, dictionaries, or objects that something is going
                  to mutate, and the two copies must be able to diverge. That is the only case
                  that justifies the cost.
                </P>
              ),
            },
          ]}
        />
        <P>
          The cost is real: <Strong>deepcopy</Strong> visits every object in the structure and
          allocates a new one for each. On a large nested structure copied inside a loop, that
          is usually the slowest line in the program — and often it was protecting against a
          mutation that never happens.
        </P>
        <Callout tone="tip" title="A third option worth remembering">
          Frequently the honest fix is not to copy at all, but to stop mutating. A function
          that builds and returns a new structure, rather than editing the one it was handed,
          removes the question entirely. Comprehensions make that cheap to write.
        </Callout>
      </LessonSection>

      <LessonSection id="the-mutable-default-argument-seen-again" title="The mutable default argument, seen again">
        <P>
          You met this trap when functions were introduced. It belongs here too, because it is
          the same mechanism wearing different clothes: one object, shared by everyone who
          reaches it.
        </P>
        <CodeBlock
          label="Python"
          code={`def add_badge(badge, badges=[]):
    badges.append(badge)
    return badges

print(add_badge("solder"))  # ['solder']
print(add_badge("cad"))     # ['solder', 'cad']`}
          lineTones={{ 5: "err" }}
        />
        <P>
          The default list was created once, when the function was defined, and every call
          that does not supply its own has been appending to that same list ever since. The
          fix is the standard one — default to <Strong>None</Strong> and build a fresh list
          inside the body.
        </P>
        <CodeBlock
          label="Python"
          code={`def add_badge(badge, badges=None):
    if badges is None:
        badges = []
    badges.append(badge)
    return badges`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          ".copy(), list(x), and x[:] all copy exactly one level. On a flat list that is a complete copy; on a nested one it is not.",
          "A shallow copy of a nested list gives you a new outer list holding the very same inner lists — mutating one of those is visible through both names.",
          "Mutating an inner list cannot tell b = a apart from b = a.copy(). Only changing the outer list reveals which one you have.",
          "deepcopy rebuilds every mutable object at every level, and handles structures that refer to themselves without looping forever.",
          "deepcopy costs a full walk and a new object per item. Use it when the copies must diverge, not as a reflex.",
          "Sharing something that cannot be mutated — a number, a string, a tuple of them — is always safe, which is why flat lists never show the problem.",
          "A mutable default argument is the same trap: one object created at definition time, shared by every call that does not override it.",
        ]}
      />
    </div>
  );
}
