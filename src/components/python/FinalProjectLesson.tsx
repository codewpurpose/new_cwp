import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function FinalProjectLesson() {
  return (
    <div>
      <Lead>
        Every chapter until now has proven one idea in isolation. Build one program that needs
        variables, a loop, a function, and a dictionary all in the same twenty lines, and watch
        them stop being separate topics.
      </Lead>

      <LessonSection id="planning-the-shape-before-writing-a-line" title="Planning the shape before writing a line">
        <P>
          The project: a command-line word-frequency counter. Give it a sentence, and it
          reports how many times each word appears — the smallest program that needs
          a loop, a dictionary, and a function working together rather than in isolation.
        </P>
        <P>
          It is a deliberately small choice. A word counter is not an impressive-sounding
          project, and that is the point — every piece of it maps onto something a previous
          chapter already taught, so nothing about finishing it depends on learning something
          new mid-build. What it asks of you is putting those pieces together correctly, which
          turns out to be its own separate skill from knowing each one in isolation.
        </P>
        <CompareGrid
          items={[
            {
              title: "Minimum version",
              tone: "positive",
              children: (
                <>
                  Splits text into words, counts each one in a dictionary, and returns it from
                  a function. Handles the empty string without crashing. That is a complete,
                  finished project on its own.
                </>
              ),
            },
            {
              title: "Stretch version",
              tone: "neutral",
              children: (
                <>
                  Also folds case so <Strong>&quot;The&quot;</Strong> and{" "}
                  <Strong>&quot;the&quot;</Strong> count together, strips punctuation off each
                  word, and reports the single most common one. None of it is required to call
                  the project done.
                </>
              ),
            },
          ]}
        />
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Split the text into words",
              detail: "A string method turns one long sentence into a list of individual words.",
            },
            {
              label: "Count each word with a dictionary",
              detail: "Loop over the words, using each one as a key and a running count as its value.",
            },
            {
              label: "Wrap it in a function",
              detail: "word_counts(text) takes a sentence in and returns the finished dictionary out.",
            },
            {
              label: "Test it before trusting it",
              detail: "One normal sentence, and one edge case — an empty string — each with an assertion.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="building-it-piece-by-piece-testing-each-one" title="Building it piece by piece, testing each one">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> text = "the cat sat on the mat the cat ran"
>>> words = text.split()
>>> words
['the', 'cat', 'sat', 'on', 'the', 'mat', 'the', 'cat', 'ran']`}
        />
        <P>
          <Strong>split()</Strong> with no argument breaks on any run of whitespace — the
          comprehensions and loops chapters both used exactly this kind of list as their
          starting point.
        </P>
        <CodeBlock
          label="word_count.py"
          code={`def word_counts(text):
    counts = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts`}
        />
        <P>
          <Strong>counts.get(word, 0)</Strong> returns the running total if{" "}
          <Strong>word</Strong> has been seen before, or <Strong>0</Strong> if this is its
          first appearance — the same dictionary-with-a-default pattern from the dictionaries
          chapter, now doing real work.
        </P>
        <RevealCard
          summaryTag="Before testing"
          summary="word_counts('the cat sat on the mat the cat ran')"
          detailTag="After testing"
          detail={
            <>
              <Strong>{"{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1, 'ran': 1}"}</Strong>{" "}
              — and <Strong>assert word_counts(&quot;&quot;) == {"{}"}</Strong> passes too,
              because an empty string&apos;s <Strong>split()</Strong> produces an empty list,
              and the loop simply never runs.
            </>
          }
        />
        <P>
          Both of those checks are worth writing as real{" "}
          <Strong>assert</Strong> statements before moving on, not just typed into a shell and
          read by eye — the testing chapter&apos;s whole argument was that a check you write
          down catches a regression a check you only glance at will not.
        </P>
        <CodeBlock
          label="test_word_count.py"
          code={`def test_counts_repeated_words():
    result = word_counts("the cat sat on the mat the cat ran")
    assert result == {"the": 3, "cat": 2, "sat": 1, "on": 1, "mat": 1, "ran": 1}

def test_empty_string_returns_empty_dict():
    assert word_counts("") == {}`}
        />
      </LessonSection>

      <LessonSection id="extending-it-once-the-basics-hold" title="Extending it once the basics hold">
        <P>
          The minimum version above is finished, honestly — but it has a known gap. Feed it two
          sentences that repeat a word with different punctuation attached, and it counts them
          as different words entirely, because <Strong>&quot;cat.&quot;</Strong> and{" "}
          <Strong>&quot;cat&quot;</Strong> are different strings as far as a dictionary key
          is concerned.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          lineTones={{ 1: "err" }}
          code={`>>> word_counts("The cat, calm, sat. The cat ran fast.")
{'The': 2, 'cat,': 1, 'calm,': 1, 'sat.': 1, 'cat': 1, 'ran': 1, 'fast.': 1}`}
        />
        <P>
          Seven keys for what a person reading the sentence would call six distinct words —{" "}
          <Strong>&apos;cat,&apos;</Strong> and <Strong>&apos;cat&apos;</Strong> land as two
          separate entries purely because one of them happened to sit next to a comma.
          Fixing it needs two small additions, both already covered:{" "}
          <Strong>str.lower()</Strong> from the strings chapter to fold case, and{" "}
          <Strong>str.strip(string.punctuation)</Strong> to remove punctuation from the edges
          of each word before it becomes a key.
        </P>
        <CodeBlock
          label="word_count.py"
          lineTones={{ 4: "accent", 5: "accent" }}
          code={`import string

def word_counts(text):
    counts = {}
    for word in text.lower().split():
        word = word.strip(string.punctuation)
        counts[word] = counts.get(word, 0) + 1
    return counts`}
        />
        <P>
          With that change,{" "}
          <Strong>word_counts(&quot;The cat, calm, sat. The cat ran fast.&quot;)</Strong>{" "}
          returns{" "}
          <Strong>{"{'the': 2, 'cat': 2, 'calm': 1, 'sat': 1, 'ran': 1, 'fast': 1}"}</Strong> —
          six keys instead of seven, and <Strong>&apos;cat&apos;</Strong> correctly counted
          twice. It is a genuine improvement, and also a reminder that &quot;finished&quot;
          for a real program is a judgement call, not a fixed line: the version without this
          fix was complete enough to call done a section ago, and this version is more correct
          without either one being the objectively right answer for every use.
        </P>
        <P>
          One more extension worth trying alone, using only what this track already covers:
          the single most common word. <Strong>{"max(counts, key=counts.get)"}</Strong> finds
          the key whose value is largest without writing a loop yourself — the same{" "}
          <Strong>key=</Strong> argument idea the sorting built-ins in Python use throughout
          the standard library.
        </P>
        <Callout tone="tip" title="Reach for this before writing your own loop">
          Whenever the plan is &quot;find the biggest thing by some rule,&quot; check first
          whether <Strong>max(..., key=...)</Strong> or <Strong>sorted(..., key=...)</Strong>{" "}
          already does it — both take an ordinary function as their <Strong>key</Strong>{" "}
          argument, which is the same fact about functions being values that made decorators
          possible earlier in the track.
        </Callout>
      </LessonSection>

      <LessonSection id="where-to-go-from-here" title="Where to go from here">
        <P>
          Nothing about this program is specific to counting words — the same shape, a loop
          filling a dictionary, is the core of a shopping cart total, a vote tally, or a log
          file summary. The twenty-four chapters behind this one are not separate tools; they
          are the vocabulary this one program was written in.
        </P>
        <P>
          They are also not everything. This track never touched a database, never built
          anything a browser could talk to, and never covered the tooling that turns a script
          into something you could hand to a stranger and have it just work on their machine.
          That is not an oversight to feel behind on — it is simply where this particular map
          ends, and where the next ones start.
        </P>
        <LabelRows
          rows={[
            {
              label: "Web apps",
              text: (
                <>
                  Flask or FastAPI turn a function like <Strong>word_counts</Strong> into
                  something a browser can call — the same function, behind a new front door.
                </>
              ),
            },
            {
              label: "Data at scale",
              text: (
                <>
                  pandas replaces hand-rolled dictionaries and loops once a dataset stops
                  fitting comfortably in your head, or in memory.
                </>
              ),
            },
            {
              label: "Type safety",
              text: (
                <>
                  Adding hints, <Strong>{"def word_counts(text: str) -> dict:"}</Strong>, and
                  running a checker like mypy over them catches a category of bug this track
                  never asked you to think about.
                </>
              ),
            },
            {
              label: "Reading real code",
              text: (
                <>
                  Contributing to an existing open-source project teaches you to read code you
                  did not write, which is a different skill from writing your own from
                  scratch.
                </>
              ),
            },
          ]}
        />
        <P>
          Pick whichever one of those solves a problem you actually have, rather than the one
          that sounds most impressive — the word counter above did not become useful because
          it was ambitious. It became useful because every idea in it was one you had already
          proven you understood on its own, put to work together.
        </P>
      </LessonSection>

      <ChecklistCard
        title="Before calling the minimum version finished"
        items={[
          "word_counts(text) returns a dictionary, not a printed string — printing is a separate, later step.",
          "An empty string produces an empty dictionary, not an error.",
          "Punctuation attached to a word (\"cat,\" versus \"cat\") is counted separately in this version — the extension above shows one way to close that gap.",
          "Every function in the program has at least one assert proving what it claims to do, written down rather than checked once by eye.",
          "You could hand the function to someone else and they'd know what it returns without reading the body — the name and a docstring say enough on their own.",
        ]}
      />

      <TakeawayCard
        items={[
          "A real program combines ideas that were taught separately — this one needed a loop, a function, and a dictionary together, not in isolation.",
          "counts.get(word, 0) is the dictionary-with-a-default pattern from earlier in the track, doing work here for the first time.",
          "Testing the empty-string case here is the same habit the testing chapter argued for: prove the edge, not just the common case.",
          "\"Finished\" is a judgement call, not a fixed line — the minimum version and the extended one are both legitimately complete, for different purposes.",
          "The shape of this program — loop, accumulate into a dict, wrap in a function — recurs constantly outside of word counting specifically.",
        ]}
      />
    </div>
  );
}
