import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { DictBuilder } from "@/components/python/DictBuilder";

export function DictionariesLesson() {
  return (
    <div>
      <Lead>
        A list makes you remember where something is. A dictionary lets you forget. Build one
        from scratch, look something up by name instead of position, and ask for a key that
        was never there.
      </Lead>

      <LessonSection id="looking-up-by-name-instead-of-position" title="Looking up by name instead of position">
        <P>
          A list of prices tells you nothing unless you already remember that index 0 is
          apples. A dictionary stores the name alongside the value, and you look up by that
          name directly.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> prices = {"apple": 0.60, "banana": 0.35}
>>> prices["banana"]
0.35`}
        />
        <P>
          Each entry is a <Strong>key</Strong> and a <Strong>value</Strong>. The key is what
          you look up with; the value is what you get back. Keys are unique — assign to a key
          that already exists, and you overwrite the value, you do not add a second entry.
          Assign to a key that does not exist yet, and Python creates it on the spot.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> prices["banana"] = 0.40
>>> prices["mango"] = 0.90
>>> prices
{'apple': 0.6, 'banana': 0.4, 'mango': 0.9}`}
        />
        <P>
          Notice <Strong>mango</Strong> lands at the end, not sorted alphabetically and not
          sorted by price. A dictionary keeps keys in the order they were first inserted, and
          that has been a guarantee of the language since Python 3.7 — not an accident you
          happened to observe once.
        </P>
      </LessonSection>

      <DictBuilder />

      <LessonSection id="what-makes-a-key-valid" title="What makes a key valid">
        <P>
          A dictionary works by turning each key into a number the moment it is stored, and
          looking for that same number again on every lookup. That trick is called{" "}
          <Strong>hashing</Strong>, and it only works if the key can never change after its
          number has been computed — otherwise the dictionary would be searching for the wrong
          number the next time you asked.
        </P>
        <P>
          Strings, numbers, and tuples qualify, because none of them can be edited in place.
          A tuple of coordinates makes a perfectly good key for exactly that reason.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> board = {(0, 0): "empty", (0, 1): "empty"}
>>> board[(0, 0)]
'empty'
>>> cache = {}
>>> cache[[1, 2]] = "nope"
TypeError: unhashable type: 'list'`}
          lineTones={{ 5: "err" }}
        />
        <P>
          A list fails outright, and on purpose. A list can change after you build it — append
          to it, and the same object now means something different. Python will not let a
          value that can shift underneath you sit at the front of a lookup table, so it raises{" "}
          <Strong>TypeError</Strong> the instant you try, rather than let a key quietly go
          stale.
        </P>
        <LabelRows
          rows={[
            {
              label: "Works",
              text: "Strings, numbers, tuples, frozensets — anything Python considers immutable.",
            },
            {
              label: "Fails",
              text: "Lists, dictionaries, sets — anything whose contents can change after creation.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="a-missing-key-is-not-zero-it-is-an-error" title="A missing key is not zero, it is an error">
        <P>
          Ask for a key that is not there, and Python does not return{" "}
          <Strong>None</Strong> or <Strong>0</Strong> to be helpful. It raises{" "}
          <Strong>KeyError</Strong> and stops the program, the same way an undefined variable
          would.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> prices["mango"]
0.9
>>> prices["fig"]
KeyError: 'fig'`}
          lineTones={{ 3: "err" }}
        />
        <Callout tone="tip" title="Asking without risking the error">
          <Strong>{"prices.get(\"fig\")"}</Strong> returns <Strong>None</Strong> instead of
          raising — and{" "}
          <Strong>{"prices.get(\"fig\", 0)"}</Strong> lets you choose the fallback value
          yourself. Reach for <Strong>.get()</Strong> whenever a missing key is a normal
          outcome, not a bug. If you only want to know whether the key exists at all,{" "}
          <Strong>{'"fig" in prices'}</Strong> answers that without touching the value.
        </Callout>
        <P>
          Sometimes a <Strong>KeyError</Strong> is exactly what you want. A configuration
          dictionary that is missing <Strong>{'"host"'}</Strong> should not quietly hand back{" "}
          <Strong>None</Strong> and let the program limp on for another twenty lines before it
          fails somewhere confusing. Let it crash immediately, at the line with the typo, with
          the name of the missing key printed right there. Swallowing the error with{" "}
          <Strong>.get()</Strong> in that situation does not fix the bug — it just moves the
          failure somewhere harder to find.
        </P>
      </LessonSection>

      <LessonSection id="walking-a-dictionarys-keys-values-and-items" title="Walking a dictionary's keys, values, and items">
        <P>
          Loop over a dictionary directly, and Python hands you its keys, one at a time. The
          values are one lookup away from each one.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for fruit in prices:
...     print(fruit, prices[fruit])
apple 0.6
banana 0.4
mango 0.9`}
        />
        <P>
          <Strong>.items()</Strong> skips the extra lookup and hands you both halves of each
          pair at once, which is almost always what you actually want inside a loop.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> for fruit, price in prices.items():
...     print(f"{fruit}: {price}")
apple: 0.6
banana: 0.4
mango: 0.9`}
        />
        <P>
          <Strong>.keys()</Strong> and <Strong>.values()</Strong> exist for when only one side
          matters — <Strong>{"list(prices.values())"}</Strong> gets you just the numbers, with
          no fruit names attached to slow you down.
        </P>
      </LessonSection>

      <LessonSection id="nesting-dictionaries-inside-dictionaries" title="Nesting dictionaries inside dictionaries">
        <P>
          A value in a dictionary can be anything, including another dictionary. That is how
          you model a record with more than one field per key, instead of juggling several
          dictionaries that all happen to share the same keys.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> users = {
...     "ada": {"age": 36, "role": "admin"},
...     "grace": {"age": 41, "role": "editor"},
... }
>>> users["ada"]["role"]
'admin'`}
        />
        <P>
          Each level is looked up the same way, one bracket at a time. That is convenient right
          up until an outer key is missing — <Strong>.get()</Strong> on a missing key returns{" "}
          <Strong>None</Strong>, and <Strong>None</Strong> has no <Strong>.get()</Strong> of its
          own to chain onto.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> users.get("nobody").get("role")
AttributeError: 'NoneType' object has no attribute 'get'`}
          lineTones={{ 1: "err" }}
        />
        <Callout tone="warning" title="A chained .get() fails at the first missing link">
          Give the outer lookup a fallback of an empty dictionary, and the second{" "}
          <Strong>.get()</Strong> has something safe to call:{" "}
          <Strong>{'users.get("nobody", {}).get("role")'}</Strong> returns{" "}
          <Strong>None</Strong> quietly instead of crashing.
        </Callout>
      </LessonSection>

      <LessonSection id="when-a-dictionary-is-the-right-tool" title="When a dictionary is the right tool, and when a list still is">
        <P>
          Neither structure is the better one in general — they answer different questions,
          and picking the wrong one shows up later as code that fights the shape of its own
          data.
        </P>
        <CompareGrid
          items={[
            {
              title: "Reach for a dictionary",
              tone: "positive",
              children: (
                <P>
                  When you look things up by a meaningful name — a username, a product code, a
                  configuration setting, a record with several named fields. The name is the
                  point; position is irrelevant.
                </P>
              ),
            },
            {
              title: "Reach for a list",
              tone: "neutral",
              children: (
                <P>
                  When what matters is order and position — a queue of tasks, a sequence of
                  moves, a leaderboard, anything where <Strong>first</Strong> and{" "}
                  <Strong>next</Strong> mean something.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A dictionary stores key/value pairs and looks up by key, not by position — and it keeps insertion order while doing it.",
          "Keys must be hashable: strings, numbers, and tuples work as keys; a list or another dictionary never can, on purpose.",
          "A missing key raises KeyError by default, and that is often the behaviour you want — .get() is for when a missing key is a normal outcome, not a bug you want to hide.",
          ".items() hands you both the key and the value in one loop, which is almost always what you actually want.",
          "Choose a dictionary when you look things up by name; choose a list when order and position are what matter.",
        ]}
      />
    </div>
  );
}
