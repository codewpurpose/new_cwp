import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { SortKeyPlayground } from "@/components/python/SortKeyPlayground";

export function ListMethodsInDepthLesson() {
  return (
    <div>
      <Lead>
        Sorting a list of names is one function call, right up until the names have capital
        letters in them and the answer is quietly wrong. Sort the same list four ways,
        changing only the key, and watch the order rearrange itself under each rule.
      </Lead>

      <LessonSection
        id="sorted-builds-a-new-list-sort-rewrites-yours"
        title="sorted builds a new list; sort rewrites yours"
      >
        <P>
          You met this pair briefly when lists first appeared. It is worth returning to,
          because the difference between them is the difference between a function and a
          method, and Python spells it out in what each one hands back.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> scores = [88, 61, 94]
>>> sorted(scores)
[61, 88, 94]
>>> scores
[88, 61, 94]

>>> scores.sort()
>>> scores
[61, 88, 94]`}
        />
        <P>
          <Strong>sorted()</Strong> left the original alone and returned a new list.{" "}
          <Strong>.sort()</Strong> returned nothing at all and rewrote the list in place. The
          missing return value is not an oversight — it is Python telling you, every time,
          that the work happened to the thing you called it on.
        </P>
        <Callout tone="tip" title="A rule that decides for you">
          If you still need the original order afterwards, you need{" "}
          <Strong>sorted()</Strong>. If the old order is genuinely dead to you and the list
          is large, <Strong>.sort()</Strong> avoids building a second copy of it. That is the
          entire decision.
        </Callout>
      </LessonSection>

      <LessonSection id="the-key-argument-is-the-whole-feature" title="The key argument is the whole feature">
        <P>
          Both accept a <Strong>key</Strong>: a function applied to each item purely to
          decide where it goes. The items themselves are never altered, and it is the
          returned values that get compared, not what you can see.
        </P>
        <P>
          This matters more than it sounds, because Python&apos;s default ordering for text
          is not alphabetical. It compares code points, and every capital letter sits below
          every lowercase one — so <Strong>&quot;Zoe&quot;</Strong> sorts before{" "}
          <Strong>&quot;ada&quot;</Strong> and nothing warns you.
        </P>
      </LessonSection>

      <SortKeyPlayground />

      <LessonSection id="reverse-is-not-the-same-as-reversed" title="reverse is not the same as reversed">
        <P>
          Three similar-looking things, and only two of them are related.
        </P>
        <LabelRows
          rows={[
            {
              label: "sorted(x, reverse=True)",
              text: "Sorts, then hands back the order flipped. Still uses the same comparison, so a wrong ordering stays wrong, just backwards.",
            },
            {
              label: "x.reverse()",
              text: "Reverses the list in place, with no sorting involved at all. Returns None, like sort().",
            },
            {
              label: "reversed(x)",
              text: "Returns a lazy iterator walking backwards. Not a list — wrap it in list() if you want to see it more than once.",
            },
          ]}
        />
        <Callout tone="note" title="Why reversed gives you an iterator">
          It is the same laziness you saw with generators: nothing is copied and nothing is
          computed until something asks for the next item. Printing it directly shows you a{" "}
          <Strong>list_reverseiterator</Strong> object, which is the honest answer to what it
          actually is.
        </Callout>
      </LessonSection>

      <LessonSection id="assigning-into-a-slice-changes-the-length" title="Assigning into a slice changes the length">
        <P>
          You already know a slice reads a section out of a list. What is less obvious is
          that a slice can be assigned <em>to</em> — and when it is, the replacement does not
          have to be the same size as the section it replaces.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> letters = ["a", "b", "c", "d"]
>>> letters[1:3] = ["X"]
>>> letters
['a', 'X', 'd']

>>> letters[1:2] = ["p", "q", "r"]
>>> letters
['a', 'p', 'q', 'r', 'd']`}
          lineTones={{ 3: "warn", 7: "warn" }}
        />
        <P>
          Two items became one, and then one became three. The list grew and shrank without a
          single call to <Strong>append</Strong> or <Strong>remove</Strong>. This is a sharp
          tool: it is the neatest way to splice a section out of a list, and it is also a
          silent way to change a length you thought was fixed.
        </P>
      </LessonSection>

      <LessonSection id="append-adds-one-thing-extend-adds-each-thing" title="append adds one thing; extend adds each thing">
        <P>
          These two are confused constantly, and the confusion only shows up when what you
          are adding happens to be iterable.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> a = [1, 2]
>>> a.append([3, 4])
>>> a
[1, 2, [3, 4]]

>>> b = [1, 2]
>>> b.extend([3, 4])
>>> b
[1, 2, 3, 4]`}
          lineTones={{ 3: "warn", 8: "ok" }}
        />
        <CompareGrid
          items={[
            {
              title: "append(x)",
              tone: "neutral",
              children: (
                <P>
                  Adds exactly one item, whatever it is. The list always grows by one, so a
                  list of four appended to a list of two gives you three items, not six.
                </P>
              ),
            },
            {
              title: "extend(x)",
              tone: "neutral",
              children: (
                <P>
                  Walks whatever you gave it and adds each item separately. Hand it a string
                  and you get one item per character — <Strong>{'extend("hi")'}</Strong> adds{" "}
                  <Strong>&quot;h&quot;</Strong> and <Strong>&quot;i&quot;</Strong>.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-multiplication-trap-in-a-list-of-lists" title="The multiplication trap in a list of lists">
        <P>
          Multiplying a list repeats it, which is a convenient way to build a row of zeros.
          It becomes a trap the moment the thing being repeated is itself a list.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> grid = [[0] * 3] * 3
>>> grid
[[0, 0, 0], [0, 0, 0], [0, 0, 0]]

>>> grid[0][0] = 1
>>> grid
[[1, 0, 0], [1, 0, 0], [1, 0, 0]]`}
          lineTones={{ 6: "err" }}
        />
        <P>
          One assignment changed three rows, because there are not three rows. There is one
          row, listed three times. <Strong>* 3</Strong> repeated the reference, not the list
          behind it — the same lesson names taught you, arriving in a shape that is far
          harder to spot.
        </P>
        <Callout tone="danger" title="Build rows with a comprehension instead">
          <Strong>{"[[0] * 3 for _ in range(3)]"}</Strong> runs the inner expression once per
          row, so each row is a genuinely separate list. It looks more laborious and it is
          the only version that is correct.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "sorted() returns a new list; .sort() returns None and rewrites the one you called it on. Never assign the result of .sort() to a name.",
          "Default text ordering compares code points, so every capital sorts before every lowercase letter. key=str.lower is what most people actually meant.",
          "A key function decides the order and nothing else — the items you get back are the originals, untouched.",
          "Python's sort is stable: items that compare equal keep the order they already had.",
          "Assigning into a slice can change the list's length, because the replacement need not be the same size as the section it replaces.",
          "append adds one item whatever it is; extend adds each item of what you gave it.",
          "[[0] * 3] * 3 makes one row referenced three times, not three rows. Use a comprehension when the repeated thing is mutable.",
        ]}
      />
    </div>
  );
}
