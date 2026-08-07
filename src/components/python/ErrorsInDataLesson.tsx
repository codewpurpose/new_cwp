import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { LookupSafety } from "@/components/python/LookupSafety";

export function ErrorsInDataLesson() {
  return (
    <div>
      <Lead>
        Three exceptions account for almost every crash involving real data, and each one
        names the exact thing that was not there. Ask a dictionary for a key it has never
        heard of, four different ways, and compare what each one hands back.
      </Lead>

      <LessonSection
        id="three-exceptions-cover-almost-every-data-crash"
        title="Three exceptions cover almost every data crash"
      >
        <P>
          You already know how to read a traceback and how to catch what you expect. What is
          worth having by heart is which three exceptions data actually produces, because
          recognising the name tells you what went wrong before you read another word.
        </P>
        <LabelRows
          rows={[
            {
              label: "KeyError",
              text: "A dictionary was asked for a key it does not have. The message quotes the key, which is usually the whole diagnosis.",
            },
            {
              label: "IndexError",
              text: "A list or string was asked for a position past its end. Almost always an empty collection you assumed had at least one item.",
            },
            {
              label: "TypeError",
              text: "You went down a level from something with no levels, or did arithmetic on a None. Frequently the delayed consequence of an earlier missing value.",
            },
          ]}
        />
        <P>
          The first two are honest and immediate: they fail at the line that made the wrong
          assumption. The third is the one that costs an afternoon, because it usually fires a
          long way from wherever the value actually went missing.
        </P>
      </LessonSection>

      <LessonSection id="get-returns-a-default-instead-of-raising" title="get returns a default instead of raising">
        <P>
          <Strong>.get()</Strong> asks the same question as square brackets and declines to
          raise when the answer is no. With one argument it hands back{" "}
          <Strong>None</Strong>; with two, whatever you nominated.
        </P>
        <CodeBlock
          label="Python"
          code={`scores = {"amara": 18, "ben": 6}

scores["dara"]         # KeyError: 'dara'
scores.get("dara")     # None
scores.get("dara", 0)  # 0`}
          lineTones={{ 2: "err", 3: "warn", 4: "ok" }}
        />
      </LessonSection>

      <LookupSafety />

      <LessonSection id="setdefault-fills-the-gap-as-it-reads" title="setdefault fills the gap as it reads">
        <P>
          <Strong>.get()</Strong> reads without writing. <Strong>.setdefault()</Strong> reads,
          and writes the default into the dictionary if the key was missing — which is exactly
          what building a grouping needs.
        </P>
        <CodeBlock
          label="Python"
          code={`by_track = {}

for student in students:
    by_track.setdefault(student["track"], []).append(student["name"])

# {'python': ['Amara', 'Chidi'], 'ml': ['Ben']}`}
        />
        <P>
          The first student on each track finds no list, so <Strong>setdefault</Strong> puts an
          empty one in and returns it. Every later student on that track finds the list already
          there and appends to it. No conditional, and no key checked twice.
        </P>
        <Callout tone="note" title="There is a cleaner version of this">
          <Strong>defaultdict</Strong>, in the next chapter, does the same job without naming
          the empty list at every call site. <Strong>setdefault</Strong> is still worth knowing
          — it needs no import, and it is what you will find in other people&apos;s code.
        </Callout>
      </LessonSection>

      <LessonSection id="asking-forgiveness-instead-of-permission" title="Asking forgiveness instead of permission">
        <P>
          There are two ways to write code that might fail, and Python has a stated preference
          between them. Check first, or attempt and handle the failure.
        </P>
        <CodeBlock
          label="Python"
          code={`# Look before you leap: check, then act.
if "dara" in scores:
    total += scores["dara"]

# Easier to ask forgiveness: act, then handle the failure.
try:
    total += scores["dara"]
except KeyError:
    pass`}
        />
        <P>
          The second is the more Pythonic of the two, and not merely by convention. The first
          asks the dictionary the same question twice — once to check, once to fetch — and
          leaves a gap between the two in which the answer could change. In a program with
          threads, or where anything else can touch that dictionary, the gap is a real bug and
          not a theoretical one.
        </P>
        <P>
          Where checking first genuinely wins is when failure is the common case rather than
          the exception. Setting up a <Strong>try</Strong> is nearly free; raising and catching
          is not, so a lookup that misses nine times in ten is better off with the{" "}
          <Strong>in</Strong> check.
        </P>
      </LessonSection>

      <LessonSection id="catching-the-narrowest-exception-that-fits" title="Catching the narrowest exception that fits">
        <P>
          A bare <Strong>except:</Strong> catches everything, including the typo three lines
          down and the interrupt you pressed to stop the program. It is the single fastest way
          to turn a five-second bug into an hour-long one.
        </P>
        <CodeBlock
          label="Python"
          code={`# Hides every mistake in the block, including your own typos.
try:
    total += scores[name]
except:
    total += 0

# Names the one failure you actually anticipated.
try:
    total += scores[name]
except KeyError:
    total += 0`}
          lineTones={{ 3: "err", 4: "err" }}
        />
        <P>
          The second version still crashes if <Strong>scores</Strong> turns out to be{" "}
          <Strong>None</Strong>, and that is the point — that is a different bug, it deserves a
          traceback, and the narrow except is what lets it get one.
        </P>
      </LessonSection>

      <LessonSection id="a-none-that-travels-is-worse-than-a-crash" title="A None that travels is worse than a crash">
        <P>
          <Strong>.get()</Strong> is a good tool with one sharp edge: reaching for it
          reflexively converts a loud, precise failure into a quiet, vague one that surfaces
          somewhere else entirely.
        </P>
        <CodeBlock
          label="Python"
          code={`minutes = record.get("minutes")   # missing key → None, no complaint
average = minutes / chapters      # TypeError, forty lines later`}
          lineTones={{ 1: "err" }}
        />
        <P>
          The <Strong>TypeError</Strong> names the division, which is the one line in the
          program that is not the problem. Had the first line raised a{" "}
          <Strong>KeyError</Strong>, it would have quoted the missing key and pointed at the
          record that lacked it.
        </P>
        <Callout tone="warning" title="Supply a default only when it means something">
          <Strong>{'.get("minutes", 0)'}</Strong> is correct when a record with no recorded
          minutes genuinely represents zero minutes. It is wrong when the field is missing
          because the data is broken — there, a zero silently drags every average you compute
          downwards, and no exception is ever raised to tell you.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "KeyError, IndexError, and TypeError cover almost every data crash, and each names the thing that was missing.",
          "KeyError and IndexError fail at the line that made the wrong assumption. TypeError usually fires a long way from where the value went missing.",
          ".get() returns None for a missing key, or a default you supply. It never raises, which is both its use and its risk.",
          ".setdefault() writes the default in as it reads, which is what makes it the one-line way to build a grouping.",
          "Attempting and catching beats checking first: the check asks the same question twice and leaves a gap between the answers.",
          "Check first only when failure is the common case — setting up a try is nearly free, but raising is not.",
          "A bare except: swallows your own typos and the interrupt key. Name the exception you actually expected.",
          "A default is right only when it means something. A zero standing in for broken data corrupts every number computed from it, silently.",
        ]}
      />
    </div>
  );
}
