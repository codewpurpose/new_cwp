import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { StringSlicer } from "@/components/python/StringSlicer";

export function StringsLesson() {
  return (
    <div>
      <Lead>
        A string looks like one piece of text until you need the third character of it.
        Underneath, Python treats it as a sequence — the same idea it uses for a list — and
        that changes what &ldquo;the third character&rdquo; actually means.
      </Lead>

      <LessonSection id="a-string-is-a-sequence-not-a-word" title="A string is a sequence, not a word">
        <P>
          Index a string with square brackets, the same way you would a list, and counting
          starts at <Strong>0</Strong>, not <Strong>1</Strong>.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = "python"
>>> name[0]
'p'
>>> name[5]
'n'`}
        />
        <P>
          <Strong>name[0]</Strong> is the first character precisely because Python counts
          positions, not places in line — position 0 is where you start counting from, and it
          happens to hold the first character.
        </P>
      </LessonSection>

      <LessonSection id="slicing-without-the-off-by-one" title="Slicing without the off-by-one">
        <P>
          A slice, <Strong>text[start:end]</Strong>, pulls out a whole range at once. The part
          everyone gets wrong at least once: <Strong>end</Strong> is not included.
        </P>
      </LessonSection>

      <StringSlicer />

      <LessonSection id="nothing-about-a-string-changes-in-place" title="Nothing about a string ever changes in place">
        <P>
          Try to change one character of a string directly, and Python refuses outright.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = "python"
>>> name[0] = "P"
TypeError: 'str' object does not support item assignment`}
        />
        <P>
          Strings are <Strong>immutable</Strong> — once created, a string never changes. Every
          method that looks like it edits one, such as <Strong>.upper()</Strong> or{" "}
          <Strong>.replace()</Strong>, actually builds and returns a brand new string, leaving
          the original exactly as it was.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = "python"
>>> name.upper()
'PYTHON'
>>> name
'python'`}
        />
        <Callout tone="tip" title="If you need to build one up">
          Reassign the name to the new string it returns — <Strong>{"name = name.upper()"}</Strong>{" "}
          — rather than expecting the method to change anything in place. Nothing about a
          string ever does.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A string is indexed like any sequence, and counting starts at 0.",
          "A slice text[start:end] never includes the character at end — its length is always end minus start.",
          "Strings are immutable. Nothing you do to one changes it in place.",
          "String methods like .upper() return a new string. Reassign the name to keep the result.",
        ]}
      />
    </div>
  );
}
