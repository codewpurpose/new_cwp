import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          That neutrality is the entire reason it won: a Python program, a JavaScript program
          in a browser, and a service written in a language neither of them uses can all agree
          on what <Strong>{'{"name": "Ada", "age": 36}'}</Strong> means, without any of them
          knowing or caring what the others are written in.
        </P>
      </LessonSection>

      <JsonDictToggle />

      <LessonSection id="the-exact-mapping-between-json-and-python" title="The exact mapping between JSON and Python">
        <P>
          The two look alike because most JSON types map onto a Python type directly — but
          &quot;most&quot; is doing real work in that sentence, and the exceptions are exactly
          where a hand-written JSON string breaks.
        </P>
        <LabelRows
          rows={[
            { label: "object", text: <>Becomes a Python <Strong>dict</Strong>, key order preserved.</> },
            { label: "array", text: <>Becomes a Python <Strong>list</Strong>.</> },
            { label: "string", text: <>Becomes a Python <Strong>str</Strong>, always double-quoted in JSON — single quotes are not legal JSON.</> },
            { label: "number", text: <>Becomes an <Strong>int</Strong> if it has no decimal point, otherwise a <Strong>float</Strong> — JSON itself has only one number type.</> },
            { label: "true / false", text: <>Become Python&apos;s <Strong>True</Strong> / <Strong>False</Strong>, capitalised.</> },
            { label: "null", text: <>Becomes Python&apos;s <Strong>None</Strong>.</> },
          ]}
        />
        <P>
          The mapping runs in both directions — <Strong>json.dumps</Strong> turns a Python
          value back into JSON text using the same table read the other way, a{" "}
          <Strong>dict</Strong> becoming an object, a <Strong>None</Strong> becoming{" "}
          <Strong>null</Strong>. A Python <Strong>tuple</Strong> has no row in this table at
          all; <Strong>json.dumps</Strong> converts one to a JSON array anyway, and once it
          comes back through <Strong>json.loads</Strong> it is a plain list, not a tuple — the
          round trip does not always return the exact type you started with.
        </P>
      </LessonSection>

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
        <P>
          <Strong>json.loads</Strong> takes a string you already have in memory.{" "}
          <Strong>json.load</Strong> — no <Strong>s</Strong> — takes an open file object and
          reads directly from it, which matters because it is the difference between{" "}
          <Strong>{'json.load(f)'}</Strong> and the far more common mistake,{" "}
          <Strong>{'json.loads(f)'}</Strong>, which fails: <Strong>loads</Strong> expects text,
          and a file object is not text, it is something you read text from.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("record.json") as f:
...     record = json.load(f)
...
>>> record["name"]
'Ada'`}
        />
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

      <LessonSection id="making-a-request-and-actually-checking-what-came-back" title="Making a request and actually checking what came back">
        <P>
          <Strong>requests.get(url).json()</Strong> parses whatever the server sent as JSON,
          without asking first whether the request actually succeeded. A 404, a 500, or a
          server that is simply down still returns a response — often with a body that is not
          JSON at all — and calling <Strong>.json()</Strong> on it fails with a{" "}
          <Strong>JSONDecodeError</Strong> that has nothing to do with JSON being the real
          problem.
        </P>
        <CodeBlock
          label="fetch_user.py"
          lineTones={{ 5: "ok", 7: "err" }}
          code={`import requests

response = requests.get("https://api.github.com/users/octocat", timeout=5)

if response.status_code == 200:
    data = response.json()
else:
    print(f"Request failed: {response.status_code}")`}
        />
        <P>
          Checking <Strong>response.status_code</Strong> before touching{" "}
          <Strong>.json()</Strong> catches the failure at the point it actually happened, with
          a message that says what went wrong. <Strong>response.raise_for_status()</Strong>{" "}
          does the same check the other way around — it raises an exception immediately on any
          error status, which suits a script that should stop rather than continue on bad data.
        </P>
      </LessonSection>

      <LessonSection id="timeouts-rate-limits-and-the-key-you-should-never-commit" title="Timeouts, rate limits, and the key you should never commit">
        <P>
          A request with no <Strong>timeout</Strong> argument waits forever if the server never
          responds — not slowly, <Strong>forever</Strong>, hanging the entire program on a
          single stalled connection.{" "}
          <Strong>requests.get(url, timeout=5)</Strong> gives up after five seconds and raises a{" "}
          <Strong>requests.exceptions.Timeout</Strong> instead, which is at least something a
          program can catch and react to.
        </P>
        <P>
          A <Strong>429</Strong> status code means the API is rate-limiting you — you have
          called it too many times too quickly, and it is refusing to answer for a while. Many
          APIs send a <Strong>Retry-After</Strong> header alongside it stating exactly how many
          seconds to wait; reading that header and pausing before trying again is the polite,
          working response, and hammering the endpoint immediately again is the one move
          guaranteed to make the block last longer.
        </P>
        <Callout tone="danger" title="An API key belongs in an environment variable, never in a file you commit">
          <Strong>{'requests.get(url, headers={"Authorization": "Bearer sk-abc123..."})'}</Strong>{" "}
          written with the real key typed directly into the source puts that key in your git
          history permanently, even if you delete the line in a later commit — anyone with
          access to the repository, or a public copy of it, can read it out of the log. Read
          the key from <Strong>os.environ.get(&quot;API_KEY&quot;)</Strong> instead, keep the
          actual value in a local <Strong>.env</Strong> file that is listed in{" "}
          <Strong>.gitignore</Strong>, and if a key ever does end up committed, rotate it —
          treat it as compromised the moment it is, not as something a later commit can undo.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "JSON is a text format, not Python or JavaScript specifically — it's the shared shape most web APIs speak.",
          "JSON's object, array, string, number, true/false, and null map onto Python's dict, list, str, int or float, True/False, and None, in that order.",
          "json.loads parses a string you already have; json.load reads directly from an open file — mixing them up is a common, silent bug.",
          "Checking response.status_code before calling .json() catches a failed request where it actually failed, instead of as a confusing JSONDecodeError later.",
          "A timeout keeps one dead connection from hanging your whole program forever, and an API key belongs in an environment variable, never typed into a file you commit.",
        ]}
      />
    </div>
  );
}
