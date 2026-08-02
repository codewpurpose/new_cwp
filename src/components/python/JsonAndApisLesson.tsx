import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { JsonDictToggle } from "@/components/python/JsonDictToggle";

export function JsonAndApisLesson() {
  return (
    <div>
      <Lead>
        JSON looks almost exactly like a Python dictionary, right up until you notice the
        differences. Convert one into the other in both directions, and find the two places the
        conversion is not quite what you expected.
      </Lead>

      <LessonSection id="the-format-everything-on-the-internet-already-speaks" title="The format everything on the internet already speaks">
        <P>
          <Strong>JSON</Strong> — JavaScript Object Notation, despite the name — is the text
          format almost every web API sends and receives data in. It is not Python, and not
          JavaScript; it is a shared, language-neutral shape that both happen to read easily.
        </P>
      </LessonSection>

      <JsonDictToggle />

      <LessonSection id="loading-json-turns-it-into-ordinary-python-values" title="Loading JSON turns it into ordinary Python values">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> import json
>>> text = '{"name": "Ada", "age": 36}'
>>> record = json.loads(text)
>>> record
{'name': 'Ada', 'age': 36}
>>> record["age"]
36`}
        />
        <P>
          <Strong>json.loads(text)</Strong> parses a JSON string into an ordinary Python{" "}
          <Strong>dict</Strong> — after this line, it behaves exactly like any dictionary built
          by hand, with no trace of where it came from.{" "}
          <Strong>json.dumps(record)</Strong> does the reverse, turning a dict back into a JSON
          string.
        </P>
      </LessonSection>

      <LessonSection id="where-the-two-formats-quietly-disagree" title="Where the two formats quietly disagree">
        <P>
          JSON has no distinct type for a whole number versus a decimal the way some languages
          do, and more importantly: JSON spells its boolean and null values{" "}
          <Strong>true</Strong>, <Strong>false</Strong>, and <Strong>null</Strong>, lowercase —
          Python spells the same values <Strong>True</Strong>, <Strong>False</Strong>, and{" "}
          <Strong>None</Strong>, capitalised. The <Strong>json</Strong> module translates
          between them automatically in both directions, but writing raw JSON by hand with{" "}
          <Strong>True</Strong> instead of <Strong>true</Strong> is a common, easy-to-miss
          source of a parse error.
        </P>
        <Callout tone="warning" title="A failure that looks unrelated to the actual cause">
          A <Strong>json.JSONDecodeError</Strong> from a hand-written string is very often just
          this — a capitalised <Strong>True</Strong>/<Strong>None</Strong> where JSON expected
          lowercase, or a trailing comma JSON does not allow at all.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "JSON is a text format, not Python or JavaScript specifically — it's the shared shape most web APIs speak.",
          "json.loads(text) parses a JSON string into an ordinary Python dict; json.dumps(record) reverses it.",
          "JSON spells its booleans and null lowercase (true, false, null); Python spells the same values capitalised (True, False, None).",
          "A JSONDecodeError from hand-written JSON is often just a capitalised True/None, or a trailing comma, sitting where JSON doesn't allow one.",
        ]}
      />
    </div>
  );
}
