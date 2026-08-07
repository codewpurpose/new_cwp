import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { LuauValueInspector } from "@/components/roblox/LuauValueInspector";

export function VariablesAndValuesLesson() {
  return (
    <div>
      <Lead>
        Luau agrees with most languages about what a variable is and disagrees sharply about
        what counts as false. Hand it a zero and an empty string, and find that it treats both
        as true.
      </Lead>

      <LessonSection id="local-is-not-optional-decoration" title="local is not optional decoration">
        <P>
          Write <Strong>health = 100</Strong> in Luau and it works. Write{" "}
          <Strong>local health = 100</Strong> and it also works, and the second one is right.
          Without <Strong>local</Strong>, the name becomes global — visible to every other
          piece of code in that script, kept alive for as long as the script is, and slower to
          read every single time.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = script.Parent      -- lives in this script, and only here
local damage = 100

count = 0                        -- global: works, and you did not mean it`}
          lineTones={{ 3: "warn" }}
        />
        <P>
          The practical damage is collisions. Two scripts that both forget{" "}
          <Strong>local</Strong> on a variable called <Strong>count</Strong> are now sharing
          one number, and each will see it change for reasons that are nowhere in its own code.
        </P>
        <Callout tone="tip" title="A rule with no exceptions worth learning">
          Put <Strong>local</Strong> in front of every variable you declare. There are
          legitimate uses for globals in Luau and you will not meet one in an obby.
        </Callout>
      </LessonSection>

      <LessonSection id="the-types-you-will-actually-meet" title="The types you will actually meet">
        <P>
          Luau has a short list of types and you will use six of them constantly.
        </P>
        <LabelRows
          rows={[
            { label: "number", text: "One numeric type. 3 and 3.5 are both numbers; there is no separate integer." },
            { label: "string", text: "Text, in double or single quotes. Joined with two dots, not a plus." },
            { label: "boolean", text: "true or false. The properties you toggle in Studio are these." },
            { label: "nil", text: "Nothing here. What you get from a lookup that found no object." },
            { label: "table", text: "The only container. Acts as a list, a dictionary, or both at once." },
            { label: "Instance", text: "An object in the tree — a Part, a Script, a Humanoid. Roblox's own addition." },
          ]}
        />
        <P>
          Use <Strong>typeof()</Strong> rather than Lua&apos;s older{" "}
          <Strong>type()</Strong>. The old one reports every Roblox object as{" "}
          <Strong>&quot;userdata&quot;</Strong>, which tells you nothing;{" "}
          <Strong>typeof()</Strong> reports <Strong>&quot;Instance&quot;</Strong>,{" "}
          <Strong>&quot;Vector3&quot;</Strong>, <Strong>&quot;CFrame&quot;</Strong> and the
          rest by name.
        </P>
        <P>
          Luau also lets you annotate a type, and Studio will check it as you write rather than
          when you run.
        </P>
        <CodeBlock
          label="Luau"
          code={`local damage: number = 100
local partName: string = "Laser"
local target: BasePart? = nil   -- the ? means "or nil", and is honest`}
        />
      </LessonSection>

      <LessonSection id="nil-is-a-value-and-it-spreads" title="nil is a value, and it spreads">
        <P>
          <Strong>nil</Strong> is not an error and not an absence of a variable. It is a
          value meaning &quot;there is nothing here&quot;, and it is what you get from any
          lookup that failed.
        </P>
        <P>
          The trouble is that nil travels. A part that was not found is nil; storing it in a
          variable stores nil; passing that variable to a function passes nil; and the crash
          finally happens wherever somebody tries to use it, which can be a long way from where
          the lookup went wrong.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = workspace.Obby:FindFirstChild("Platfrom")  -- typo
print(platform)              --> nil, and no error yet

platform.CanCollide = false  --> attempt to index nil with 'CanCollide'`}
          lineTones={{ 0: "warn", 3: "err" }}
        />
        <P>
          Line one is the bug and line four is the error. This is the single most common shape
          of failure in Roblox scripting, and the chapter on debugging is largely about reading
          your way back from the second line to the first.
        </P>
      </LessonSection>

      <LessonSection id="only-nil-and-false-are-false" title="Only nil and false are false">
        <P>
          Here is the one that will catch you. In Python, an empty list is false. In JavaScript,
          zero is false. In Luau, <Strong>nil</Strong> and <Strong>false</Strong> are false, and
          every other value in the language is true.
        </P>
        <P>
          Zero is true. An empty string is true. An empty table is true. The string{" "}
          <Strong>&quot;false&quot;</Strong> is true.
        </P>
      </LessonSection>

      <LuauValueInspector />

      <P>
        The consequence in an obby is immediate:{" "}
        <Strong>if humanoid.Health then</Strong> is true for a player who is already dead,
        because their health is 0 and 0 is true. What you meant was{" "}
        <Strong>if humanoid.Health &gt; 0 then</Strong>. Compare explicitly whenever the value
        is a number.
      </P>

      <P>
        The upside is that <Strong>if part then</Strong> is an exact and idiomatic test for
        &quot;did that lookup find anything&quot;, because the only way it fails is nil. That
        guard appears in nearly every script in the rest of this track.
      </P>

      <LessonSection id="joining-strings-with-two-dots" title="Joining strings with two dots">
        <P>
          Luau joins strings with <Strong>..</Strong>, not <Strong>+</Strong>. A plus between
          two strings is an arithmetic error, and the message it gives you names the operation
          rather than the mistake.
        </P>
        <CodeBlock
          label="Luau"
          code={`local name = "Amara"

print("Welcome, " .. name)     --> Welcome, Amara
print("Score: " .. 42)         --> Score: 42   (numbers convert on their own)

-- print takes several arguments and adds the spaces itself:
print("Welcome,", name)        --> Welcome, Amara`}
        />
        <P>
          That last form is the one to prefer while debugging. It needs no concatenation, so it
          cannot fail on a nil, and it prints something useful even when a value is not what
          you expected — <Strong>print(&quot;part:&quot;, part)</Strong> on a nil prints{" "}
          <Strong>part: nil</Strong>, where the <Strong>..</Strong> version would throw before
          telling you anything.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Put local in front of every variable. Without it the name is global, shared with every other script, and collides silently.",
          "Use typeof() rather than type() — the old one reports every Roblox object as \"userdata\".",
          "Luau has one number type. 3 and 3.5 are both numbers.",
          "nil is a value meaning nothing is here, and it travels: the crash lands wherever it is finally used, not where the lookup failed.",
          "Only nil and false are false. Zero, the empty string, and the empty table are all true.",
          "if humanoid.Health then is true for a dead player. Compare numbers explicitly with > 0.",
          "if part then is an exact test for whether a lookup found anything, because nil is the only way it fails.",
          "Join strings with .. rather than +. While debugging, prefer print(\"label:\", value) — it never fails on a nil.",
        ]}
      />
    </div>
  );
}
