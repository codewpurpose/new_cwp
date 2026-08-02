import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
        </P>
      </LessonSection>

      <DictBuilder />

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
KeyError: 'mango'`}
        />
        <Callout tone="tip" title="Asking without risking the error">
          <Strong>{"prices.get(\"mango\")"}</Strong> returns <Strong>None</Strong> instead of
          raising — and{" "}
          <Strong>{"prices.get(\"mango\", 0)"}</Strong> lets you choose the fallback value
          yourself. Reach for <Strong>.get()</Strong> whenever a missing key is a normal
          outcome, not a bug.
        </Callout>
      </LessonSection>

      <LessonSection id="when-a-dictionary-is-the-right-tool" title="When a dictionary is the right tool, and when a list still is">
        <P>
          Reach for a dictionary when you look things up by a meaningful name — a username, a
          product code, a configuration setting. Reach for a list when what matters is order
          and position — a queue of tasks, a sequence of moves, anything where{" "}
          <Strong>first</Strong> and <Strong>next</Strong> mean something.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A dictionary stores key/value pairs and looks up by key, not by position.",
          "Assigning to an existing key overwrites its value — keys never repeat.",
          "A missing key raises KeyError. Use .get() when a missing key is a normal, expected outcome.",
          "Choose a dictionary when you look things up by name; choose a list when order and position matter.",
        ]}
      />
    </div>
  );
}
