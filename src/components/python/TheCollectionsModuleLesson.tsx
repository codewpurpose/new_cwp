import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CounterBars } from "@/components/python/CounterBars";

export function TheCollectionsModuleLesson() {
  return (
    <div>
      <Lead>
        Counting how often each word appears takes four lines and one conditional that
        everybody eventually gets wrong. Swap in the structure built for exactly that job and
        watch the same tally come out of a single line.
      </Lead>

      <LessonSection id="counter-does-the-tally-you-keep-rewriting" title="Counter does the tally you keep rewriting">
        <P>
          Tallying with a plain dictionary is a rite of passage, and the shape of it is always
          the same: check whether the key is there, start it at one if not, add one if so.
        </P>
        <CodeBlock
          label="Python"
          code={`counts = {}
for colour in colours:
    if colour in counts:
        counts[colour] += 1
    else:
        counts[colour] = 1`}
        />
        <P>
          Six lines that do one thing, and the conditional exists solely because a missing key
          raises rather than starting at zero. <Strong>Counter</Strong> is a dictionary that
          has already decided a missing key means zero.
        </P>
        <CodeBlock
          label="Python"
          code={`from collections import Counter

counts = Counter(colours)
counts.most_common(2)   # [('red', 4), ('blue', 3)]
counts["magenta"]       # 0, not a KeyError`}
          lineTones={{ 4: "ok" }}
        />
      </LessonSection>

      <CounterBars />

      <LessonSection
        id="defaultdict-stops-you-checking-before-every-write"
        title="defaultdict stops you checking before every write"
      >
        <P>
          <Strong>Counter</Strong> handles counting. <Strong>defaultdict</Strong> generalises
          the idea: you hand it a function, and any key you read that does not exist is created
          by calling it.
        </P>
        <CodeBlock
          label="Python"
          code={`from collections import defaultdict

by_track = defaultdict(list)
for student in students:
    by_track[student["track"]].append(student["name"])

# defaultdict(<class 'list'>, {'python': ['Amara', 'Chidi'], 'ml': ['Ben']})`}
        />
        <P>
          You pass <Strong>list</Strong>, not <Strong>list()</Strong> — the type itself, so the
          dictionary can call it fresh for each new key. Passing <Strong>list()</Strong> would
          hand over one already-built list, and every key would end up sharing it, which is the
          aliasing trap from the previous chapter in one of its least obvious costumes.
        </P>
        <Callout tone="warning" title="Reading a key creates it">
          This is the surprise. <Strong>by_track[&quot;chemistry&quot;]</Strong> on a{" "}
          <Strong>defaultdict</Strong> does not raise — it inserts an empty list under that key
          and returns it. Merely looking has changed the dictionary&apos;s length. Use{" "}
          <Strong>.get()</Strong> when you want to check without writing.
        </Callout>
      </LessonSection>

      <LessonSection id="namedtuple-gives-a-tuple-field-names" title="namedtuple gives a tuple field names">
        <P>
          A tuple is the right shape for a fixed group of values, and the wrong shape for
          remembering which position means what. <Strong>namedtuple</Strong> keeps the tuple
          and adds the names.
        </P>
        <CodeBlock
          label="Python"
          code={`from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)

p.x        # 3
p[0]       # 3 — still an ordinary tuple underneath
x, y = p   # still unpacks`}
        />
        <CompareGrid
          items={[
            {
              title: "Reach for namedtuple",
              tone: "positive",
              children: (
                <P>
                  A small, fixed group of values that will not change after it is built, and
                  that you want to read by name. Coordinates, RGB colours, a parsed row.
                </P>
              ),
            },
            {
              title: "Reach for a class",
              tone: "caution",
              children: (
                <P>
                  The thing needs methods, needs to change after creation, or has enough fields
                  that positional construction stops being readable. That is what classes are
                  for.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="deque-is-fast-at-the-end-a-list-is-slow-at" title="deque is fast at the end a list is slow at">
        <P>
          A list is quick to append to and quick to read by index. It is slow at exactly one
          thing: removing from or inserting at the <em>front</em>, because every remaining item
          has to shuffle down one position to close the gap.
        </P>
        <CodeBlock
          label="Python"
          code={`from collections import deque

queue = deque(["a", "b", "c"])
queue.appendleft("start")   # cheap on a deque, costly on a list
queue.popleft()             # cheap on a deque, costly on a list`}
        />
        <P>
          On a hundred items nobody notices. On a queue of a hundred thousand, processed front
          to back, a list turns a linear job into a quadratic one — and the program does not
          fail, it just gets slower in a way that looks like the data got bigger.
        </P>
        <Callout tone="tip" title="A deque with a maximum length">
          <Strong>{"deque(maxlen=100)"}</Strong> drops an item from the far end each time you
          push past the limit. That is a rolling window of the last hundred readings in one
          argument, with no bookkeeping of your own.
        </Callout>
      </LessonSection>

      <LessonSection
        id="these-are-ordinary-imports-not-language-features"
        title="These are ordinary imports, not language features"
      >
        <P>
          Nothing in this chapter is built into the language. <Strong>collections</Strong> is a
          module in the standard library, written in Python and C like any other, and every
          structure in it could be built out of the dictionaries and lists you already have.
        </P>
        <P>
          That is worth stating plainly, because it removes the mystery. A{" "}
          <Strong>Counter</Strong> is a dictionary subclass that overrides what a missing key
          means. A <Strong>defaultdict</Strong> is a dictionary subclass that calls a function
          on a miss. You could write both, and reading their source is a genuinely good way to
          spend twenty minutes.
        </P>
        <P>
          What you get by importing them instead is that they are already correct, already
          fast, and already familiar to whoever reads your code next.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Counter is a dictionary where a missing key counts as zero, which removes the conditional every hand-written tally needs.",
          "most_common() returns the pairs already ordered, so the winner is the first item rather than something you search for.",
          "defaultdict takes a function and calls it for any key you read that does not exist. Pass list, not list() — the type, not an instance.",
          "Reading a missing key on a defaultdict creates it. Merely looking changes the dictionary, so use .get() to check without writing.",
          "namedtuple keeps a tuple's behaviour and adds field names. Use it for small fixed groups; use a class once behaviour or mutation is involved.",
          "A list is slow at the front, because removing the first item shuffles every other item down. deque is fast at both ends.",
          "deque(maxlen=n) gives you a rolling window of the last n items for free.",
          "None of these are language features. They are a standard-library module, and every one could be built from a dictionary you already know how to write.",
        ]}
      />
    </div>
  );
}
