import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
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
      </LessonSection>

      <LessonSection id="where-to-go-from-here" title="Where to go from here">
        <P>
          Nothing about this program is specific to counting words — the same shape, a loop
          filling a dictionary, is the core of a shopping cart total, a vote tally, or a log
          file summary. The twenty-four chapters behind this one are not separate tools; they
          are the vocabulary this one program was written in.
        </P>
      </LessonSection>

      <ChecklistCard
        title="Before calling this finished"
        items={[
          "word_counts(text) returns a dictionary, not a printed string — printing is a separate, later step.",
          "An empty string produces an empty dictionary, not an error.",
          "Punctuation attached to a word (\"cat,\" versus \"cat\") is counted separately right now — worth noticing, even if you don't fix it yet.",
          "Every function in the program has at least one assert proving what it claims to do.",
        ]}
      />

      <TakeawayCard
        items={[
          "A real program combines ideas that were taught separately — this one needed a loop, a function, and a dictionary together, not in isolation.",
          "counts.get(word, 0) is the dictionary-with-a-default pattern from earlier in the track, doing work here for the first time.",
          "Testing the empty-string case here is the same habit the testing chapter argued for: prove the edge, not just the common case.",
          "The shape of this program — loop, accumulate into a dict, wrap in a function — recurs constantly outside of word counting specifically.",
        ]}
      />
    </div>
  );
}
