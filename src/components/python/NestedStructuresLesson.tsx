import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { StepList } from "@/components/learn/primitives/StepList";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { NestedPathExplorer } from "@/components/python/NestedPathExplorer";

export function NestedStructuresLesson() {
  return (
    <div>
      <Lead>
        Every real API response is a dictionary holding lists holding more dictionaries, and
        the error for guessing wrong is four words long. Click down through a nested structure
        one level at a time and watch the access path build itself as you go.
      </Lead>

      <LessonSection
        id="depth-arrives-whether-you-planned-for-it-or-not"
        title="Depth arrives whether you planned for it or not"
      >
        <P>
          Nothing in the last chapter said a dictionary&apos;s values had to be simple. They
          can be lists. Those lists can hold dictionaries. Those dictionaries can hold more
          lists, and at no point does Python object or even notice.
        </P>
        <CodeBlock
          label="Python"
          code={`club = {
    "name": "Robotics",
    "room": {"building": "C", "number": 214},
    "members": [
        {"name": "Amara", "badges": ["solder", "cad"]},
        {"name": "Ben", "badges": ["python"]},
    ],
}`}
        />
        <P>
          Three keys, and the three values are a string, a dictionary, and a list of
          dictionaries each holding a list. You did not choose this shape — it is what a club
          actually is, and any structure that described it faithfully would end up about this
          deep.
        </P>
      </LessonSection>

      <LessonSection id="each-bracket-moves-you-down-one-level" title="Each bracket moves you down exactly one level">
        <P>
          A long access path looks intimidating and is entirely mechanical. Read it left to
          right; each bracket takes the value you are holding and asks it for one thing.
        </P>
        <StepList
          variant="timeline"
          steps={[
            { label: "club", detail: "A dictionary of three keys." },
            { label: 'club["members"]', detail: "A list of two dictionaries." },
            { label: 'club["members"][0]', detail: "The first of those dictionaries." },
            { label: 'club["members"][0]["badges"]', detail: "A list of two strings." },
            { label: 'club["members"][0]["badges"][1]', detail: 'The string "cad".' },
          ]}
        />
        <P>
          The bracket type follows from what you are holding, not from where you are: square
          brackets with a quoted name for a dictionary, square brackets with a number for a
          list. Write <Strong>{'club["members"]["0"]'}</Strong> and the list will tell you,
          fairly, that list indices must be integers.
        </P>
      </LessonSection>

      <NestedPathExplorer />

      <LessonSection id="looping-over-something-that-nests" title="Looping over something that nests">
        <P>
          Nested data usually wants nested loops, and the shape of the loops mirrors the shape
          of the data closely enough that you can almost read one off the other.
        </P>
        <CodeBlock
          label="Python"
          code={`for member in club["members"]:
    for badge in member["badges"]:
        print(member["name"], "→", badge)

# Amara → solder
# Amara → cad
# Ben → python`}
        />
        <P>
          The outer loop names one member; the inner one names one badge belonging to that
          member. Naming the loop variables after what they actually hold is doing real work
          here — <Strong>for m in club[&quot;members&quot;]</Strong> would be two characters
          shorter and considerably harder to follow three levels in.
        </P>
        <P>
          A comprehension can flatten the same two levels into one list, which is the neatest
          way to answer &quot;every badge anyone holds&quot;.
        </P>
        <CodeBlock
          label="Python"
          code={`all_badges = [
    badge
    for member in club["members"]
    for badge in member["badges"]
]
# ['solder', 'cad', 'python']`}
        />
      </LessonSection>

      <LessonSection id="the-error-names-the-level-that-broke" title="The error names the level that broke">
        <P>
          When a long path fails, the exception tells you precisely which step could not be
          taken — and that is more useful than it first appears, because the name it quotes is
          the one that was missing.
        </P>
        <CodeBlock
          label="Python"
          code={`>>> club["members"][0]["email"]
KeyError: 'email'

>>> club["members"][5]
IndexError: list index out of range

>>> club["name"]["first"]
TypeError: string indices must be integers`}
          lineTones={{ 1: "err", 4: "err", 7: "err" }}
        />
        <P>
          Three different failures at three different depths. The first says a key was
          missing, the second that a position did not exist, and the third that you tried to
          go down a level from something with no levels left. Read the exception name first:
          it tells you what kind of thing you were holding when the path ran out.
        </P>
      </LessonSection>

      <LessonSection id="building-a-nested-structure-on-purpose" title="Building a nested structure on purpose">
        <P>
          Reading depth is the common case; creating it has one wrinkle. You cannot write into
          a level that does not exist yet, so building nested data means creating each level
          before you fill it.
        </P>
        <CodeBlock
          label="Python"
          code={`club = {"name": "Robotics"}

club["members"] = []
club["members"].append({"name": "Amara", "badges": []})
club["members"][0]["badges"].append("solder")`}
        />
        <Callout tone="warning" title="The line that looks like it should work">
          <Strong>{'club["members"][0]["badges"].append("solder")'}</Strong> only works because
          all three levels were created first. Run it against{" "}
          <Strong>{'club = {"name": "Robotics"}'}</Strong> alone and it raises{" "}
          <Strong>KeyError: &apos;members&apos;</Strong> — Python will happily create a key you
          assign to, but never one you merely read through.
        </Callout>
      </LessonSection>

      <LessonSection id="when-nesting-has-gone-too-deep" title="When nesting has gone too deep">
        <P>
          There is no rule about how deep is too deep, but there is a reliable symptom: you
          have gone too far when you can no longer name what a level holds without going back
          and looking.
        </P>
        <P>
          Two fixes, both cheap. Pull an intermediate level into a named variable, which turns
          one unreadable line into two obvious ones. Or, if the shape has become a genuine
          thing in your program rather than a passing response, give it a class — that was the
          argument for bundling data with behaviour, and it applies with more force at four
          levels than it did at one.
        </P>
        <CodeBlock
          label="Python"
          code={`# Hard to read, and harder to debug when it raises:
print(club["members"][0]["badges"][1].upper())

# The same thing, with the level that matters given a name:
first_member = club["members"][0]
print(first_member["badges"][1].upper())`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Nesting is not a design choice you make, it is what real data looks like — dictionaries holding lists holding dictionaries is the normal case, not an unusual one.",
          "Read an access path left to right: each bracket takes what you are holding and asks it for exactly one thing.",
          "The bracket you write follows from what you are holding — a quoted name for a dictionary, an integer for a list.",
          "Nested loops mirror the shape of nested data. Name the loop variables after what they hold, not after the collection.",
          "KeyError, IndexError, and TypeError each name a different way a path can run out, and each quotes the thing that was missing.",
          "Python creates a key you assign to, never one you read through. Build each level before filling the one below it.",
          "You have nested too deep when you cannot say what a level holds without checking. Name an intermediate variable, or promote the shape to a class.",
        ]}
      />
    </div>
  );
}
