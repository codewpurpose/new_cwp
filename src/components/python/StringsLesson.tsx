import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          Negative indices count backwards from the end, so you never need to know a
          string&apos;s length just to reach its last character.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name[-1]
'n'
>>> name[-6]
'p'`}
        />
        <P>
          Two of the ordinary arithmetic operators work on strings too, because a string is a
          sequence and sequences can be joined and repeated. <Strong>+</Strong> concatenates;{" "}
          <Strong>*</Strong> repeats.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> "py" + "thon"
'python'
>>> "ab" * 3
'ababab'`}
        />
      </LessonSection>

      <LessonSection id="slicing-without-the-off-by-one" title="Slicing without the off-by-one">
        <P>
          A slice, <Strong>text[start:end]</Strong>, pulls out a whole range at once. The part
          everyone gets wrong at least once: <Strong>end</Strong> is not included.
        </P>
      </LessonSection>

      <StringSlicer />

      <LessonSection id="f-strings-are-the-modern-default" title="f-strings are the modern default">
        <P>
          Building a message out of a string and a variable used to mean concatenating pieces
          by hand, watching the types and the spacing yourself. An <Strong>f-string</Strong>{" "}
          does the whole job in place.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> name = "Ada"
>>> age = 28
>>> f"{name} is {age} years old"
'Ada is 28 years old'`}
        />
        <P>
          The <Strong>f</Strong> before the opening quote is what turns the braces from
          literal characters into holes Python fills in. Anything that evaluates to a value
          can go inside them — not just a variable name, but a full expression.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> price = 19.5
>>> f"Total: {price * 2:.2f}"
'Total: 39.00'`}
          lineTones={{ 1: "accent" }}
        />
        <P>
          The part after the colon, <Strong>.2f</Strong>, is a <em>format spec</em> —
          &ldquo;fixed-point, two decimal places&rdquo;. It runs on the value after the
          expression is evaluated, which is why it can turn a plain <Strong>39.0</Strong> into
          the two-decimal <Strong>39.00</Strong> a price actually needs to display.
        </P>
        <Callout tone="tip" title="The two older ways still exist">
          You will see <Strong>{'"%s is %s" % (name, age)'}</Strong> and{" "}
          <Strong>{'"{} is {}".format(name, age)'}</Strong> in code written before 2016. Both
          still work. Neither is where new code should start — an f-string is shorter, and
          keeps the variable sitting right next to the spot it fills instead of in a separate
          list you have to count along.
        </Callout>
      </LessonSection>

      <LessonSection id="a-handful-of-methods-worth-memorising" title="A handful of methods worth memorising">
        <P>
          A string comes with dozens of built-in methods. Most of what you write day to day
          leans on a small handful of them.
        </P>
        <LabelRows
          rows={[
            {
              label: ".strip()",
              text: "Removes whitespace from both ends — the first thing to reach for on anything typed by a person.",
            },
            {
              label: ".split()",
              text: "Breaks a string into a list, on whitespace by default, or on whatever separator you pass it.",
            },
            {
              label: ".join()",
              text: "The reverse of split — glues a list of strings back together with the string you call it on, in between each piece.",
            },
            {
              label: ".lower()",
              text: "Returns a lowercase copy, useful for comparing text without caring how it was capitalised.",
            },
            {
              label: ".replace()",
              text: "Returns a copy with every match of one substring swapped for another.",
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> "  Ada Lovelace  ".strip()
'Ada Lovelace'
>>> "Ada Lovelace".split()
['Ada', 'Lovelace']
>>> "-".join(["Ada", "Lovelace"])
'Ada-Lovelace'`}
        />
        <P>
          Notice the shape all five share: every one of them <Strong>returns</Strong> a new
          value instead of announcing what it did. Nothing prints unless you print it, and
          nothing changes unless you keep the result — which is exactly the next section.
        </P>
      </LessonSection>

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
        <P>
          Immutability is not an arbitrary restriction. It is what lets Python use a string
          safely as a dictionary key, or hash it at all — a value that could silently change
          size or content out from under you would break every dictionary relying on it
          staying exactly as it was the moment it was stored.
        </P>
        <Callout tone="tip" title="If you need to build one up">
          Reassign the name to the new string it returns — <Strong>{"name = name.upper()"}</Strong>{" "}
          — rather than expecting the method to change anything in place. Nothing about a
          string ever does.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-encoding-issue-you-will-eventually-hit"
        title="The encoding issue you will eventually hit"
      >
        <P>
          Everything so far has treated a string as a sequence of characters. Underneath, a
          file on disk is not characters — it is bytes, and something has to agree on how
          those bytes map back to text. That agreement is an <Strong>encoding</Strong>, and
          getting it wrong is one of the most common ways a beginner&apos;s program crashes on
          someone else&apos;s machine but not their own.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> "café".encode("utf-8")
b'caf\\xc3\\xa9'
>>> "café".encode("utf-8").decode("ascii")
UnicodeDecodeError: 'ascii' codec can't decode byte 0xc3 in position 3: ordinal not in range(128)`}
          lineTones={{ 3: "err" }}
        />
        <P>
          <Strong>.encode()</Strong> turns text into bytes under a given encoding;{" "}
          <Strong>.decode()</Strong> turns bytes back into text, and it has to be told the
          same encoding the bytes were written in, or it guesses wrong. <Strong>é</Strong> is
          one character but two bytes in UTF-8 — <Strong>ascii</Strong>, an older encoding
          that only covers the first 128 characters, has no representation for either of them.
        </P>
        <Callout tone="warning" title="Say the encoding out loud">
          Reading a file with <Strong>{'open("data.txt")'}</Strong> uses whatever encoding
          your operating system defaults to — usually UTF-8 on macOS and Linux, not always on
          Windows. Pass it explicitly: <Strong>{'open("data.txt", encoding="utf-8")'}</Strong>.
          It costs one keyword argument and removes an entire category of bug that only ever
          shows up on someone else&apos;s computer.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A string is indexed like any sequence, counting starts at 0, and negative indices count backwards from the end.",
          "A slice text[start:end] never includes the character at end — its length is always end minus start.",
          "An f-string fills {expression} holes directly in the text, and a format spec like :.2f controls how the value is displayed.",
          "Strings are immutable. Every method that looks like it edits one, such as .strip() or .replace(), returns a new string instead.",
          "A file is bytes, not text. Pass encoding=\"utf-8\" explicitly when opening one, or the default can differ by operating system.",
        ]}
      />
    </div>
  );
}
