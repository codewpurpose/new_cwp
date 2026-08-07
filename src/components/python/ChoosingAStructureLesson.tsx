import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { MembershipCost } from "@/components/python/MembershipCost";

export function ChoosingAStructureLesson() {
  return (
    <div>
      <Lead>
        A list and a set both answer whether they contain something, and on ten thousand items
        one of them does ten thousand times more work to say so. Slide the collection size up
        and watch the number of checks each one performs pull apart.
      </Lead>

      <LessonSection
        id="four-structures-and-the-question-each-answers-fast"
        title="Four structures, and the question each answers fast"
      >
        <P>
          You now have every collection this track will teach you. They are not four flavours
          of the same thing — each one is fast at a different question, and choosing well means
          knowing which question you are actually asking.
        </P>
        <LabelRows
          rows={[
            {
              label: "list",
              text: "What is at position 7, and what order did these arrive in? Fast to append, fast to index, slow to search.",
            },
            {
              label: "dict",
              text: "What value is filed under this name? Fast to look up, fast to insert, and it remembers insertion order.",
            },
            {
              label: "set",
              text: "Have I seen this before, and what do these two collections share? Fast membership, no duplicates, no order.",
            },
            {
              label: "tuple",
              text: "A fixed group that must not change. Can be a dictionary key, which a list can never be.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="membership-in-a-list-checks-every-item" title="Membership in a list checks every item">
        <P>
          <Strong>{'"dara" in students'}</Strong> reads like one operation. On a list it is
          not: Python compares the value against the first item, then the second, and continues
          until it finds a match or runs out. If the value is absent, it has compared against
          every single item before it can say so.
        </P>
        <CodeBlock
          label="Python"
          code={`names = ["amara", "ben", "chidi"]

"chidi" in names    # 3 comparisons — found at the end
"dara" in names     # 3 comparisons — never found`}
        />
        <P>
          At three items this is irrelevant. The trouble is that the code does not change as the
          data grows, so the line that was instant during development is the line that stalls in
          production, and it looks exactly the same in both.
        </P>
      </LessonSection>

      <MembershipCost />

      <LessonSection id="a-set-and-a-dict-jump-straight-there" title="A set and a dict jump straight there">
        <P>
          A set does not search. It computes a <Strong>hash</Strong> of the value — a number
          derived from the value itself — and uses that number to go directly to the one place
          the value could possibly be. If it is not there, it is not in the set, and no other
          item was ever consulted.
        </P>
        <P>
          A dictionary works the same way on its keys, which is why looking up{" "}
          <Strong>scores[&quot;amara&quot;]</Strong> does not get slower as you add more
          students. The conversion is one line and usually worth it.
        </P>
        <CodeBlock
          label="Python"
          code={`# Slow: a scan of the whole list, once per lookup.
allowed = ["amara", "ben", "chidi"]
if name in allowed:
    ...

# Fast: build the set once, then every lookup is a single hash.
allowed = {"amara", "ben", "chidi"}
if name in allowed:
    ...`}
          lineTones={{ 6: "ok" }}
        />
        <Callout tone="tip" title="Build it once, outside the loop">
          <Strong>{"if name in set(allowed)"}</Strong> inside a loop rebuilds the entire set on
          every iteration, which is slower than the list scan it was meant to replace. The
          conversion belongs before the loop, not inside it.
        </Callout>
      </LessonSection>

      <LessonSection id="what-you-give-up-for-that-speed" title="What you give up for that speed">
        <P>
          The speed is not free, and the price is paid in what a set is allowed to hold and what
          it will remember.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> {[1, 2], [3, 4]}
TypeError: unhashable type: 'list'

>>> {(1, 2), (3, 4)}
{(1, 2), (3, 4)}`}
          lineTones={{ 1: "err" }}
        />
        <P>
          A hash is computed from a value, so the value must not be able to change — otherwise
          an item could quietly move to a different place while sitting in the set, and never be
          found again. That is why lists and dictionaries cannot go in a set or be used as
          dictionary keys, and why tuples can.
        </P>
        <P>
          You also give up duplicates and, in a set, order. Both are frequently the point rather
          than a loss: <Strong>list(set(names))</Strong> is the shortest way to remove
          duplicates, and it is worth remembering that it discards the original order while
          doing it.
        </P>
      </LessonSection>

      <LessonSection
        id="order-uniqueness-and-mutability-as-a-decision"
        title="Order, uniqueness, and mutability as a decision"
      >
        <P>
          Three questions settle almost every choice, and asking them takes less time than
          rewriting the wrong one later.
        </P>
        <ChecklistCard
          marker="arrow"
          title="Before you pick"
          items={[
            "Do I need to look things up by name? A dictionary, and nothing else comes close.",
            "Am I only ever asking whether something is present? A set — the whole structure exists for that question.",
            "Does the order matter, or will I index by position? A list.",
            "Must this group never change, or be used as a dictionary key? A tuple.",
            "Am I scanning the same list again and again to find one item? Build a dictionary keyed by that field once, then stop scanning.",
          ]}
        />
        <P>
          That last one is the upgrade most worth making in real code. A list of records scanned
          repeatedly to find a student by name is a dictionary keyed by name that has not been
          written yet, and the conversion is a single comprehension.
        </P>
        <CodeBlock
          label="Python"
          code={`by_name = {s["name"]: s for s in students}

by_name["Amara"]["chapters"]   # one hash, no scan`}
        />
      </LessonSection>

      <LessonSection id="measure-before-you-reach-for-the-clever-one" title="Measure before you reach for the clever one">
        <P>
          Everything above describes how the work grows, not how long it takes. On small
          collections a list frequently beats a set outright, because building the set costs
          more than the scan it saves — and &quot;small&quot; here can mean a few hundred items,
          not a few.
        </P>
        <P>
          The standard library will tell you rather than leave you guessing.
        </P>
        <CodeBlock
          label="Python"
          code={`import timeit

timeit.timeit('"dara" in names', globals=globals(), number=100000)`}
        />
        <Callout tone="note" title="The honest order of operations">
          Write the version that reads most clearly. If it turns out to be slow, measure to find
          out where — and only then reach for the structure that fixes that specific line. A
          program full of sets chosen on instinct is not faster, it is just harder to read.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Each structure is fast at a different question: list for order and position, dict for lookup by name, set for membership, tuple for a fixed group.",
          "`in` on a list compares against every item until it finds a match — and against all of them when the value is absent.",
          "A set hashes the value to go straight to where it would be, so membership costs the same at ten items or ten thousand.",
          "Hashing requires the value cannot change, which is why lists and dicts cannot go in a set or be dictionary keys, and tuples can.",
          "Build the set once, before the loop. Converting inside the loop is slower than the scan it replaced.",
          "list(set(names)) removes duplicates and discards the original order in the same move.",
          "Scanning a list repeatedly to find one record means you wanted a dictionary keyed by that field — one comprehension away.",
          "Growth rate is not runtime. On small collections a list often wins; measure with timeit before optimising anything.",
        ]}
      />
    </div>
  );
}
