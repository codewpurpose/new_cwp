import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";

export function FilesAndPathsLesson() {
  return (
    <div>
      <Lead>
        Everything so far has lived inside the program and vanished the moment it stopped
        running. Write a line to an actual file on disk, close it properly, and read the same
        line back in a program that starts fresh.
      </Lead>

      <LessonSection id="opening-a-file-is-not-the-same-as-using-it-safely" title="Opening a file is not the same as using it safely">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> f = open("notes.txt", "w")
>>> f.write("first line\\n")
11
>>> f.close()`}
        />
        <P>
          <Strong>{'open("notes.txt", "w")'}</Strong> creates the file if it does not exist yet, or
          empties it if it does — the <Strong>&quot;w&quot;</Strong> means write mode.{" "}
          <Strong>write()</Strong> returns the number of characters written, which is easy to
          ignore and easy to forget you are ignoring.
        </P>
        <Callout tone="warning" title="The step that is easy to skip">
          Nothing is guaranteed to actually reach the disk until <Strong>close()</Strong> runs.
          Skip it, and the file can end up empty or half-written, especially if the program
          crashes before it gets there.
        </Callout>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> f = open("notes.txt", "w")
>>> f.write("first line\\n")
11
>>> 1 / 0
Traceback (most recent call last):
ZeroDivisionError: division by zero
>>> f.closed
False`}
          lineTones={{ 5: "err", 7: "warn" }}
        />
        <P>
          The error skipped straight past <Strong>f.close()</Strong> — it was never reached.{" "}
          <Strong>f.closed</Strong> still reports <Strong>False</Strong>, and depending on the
          operating system&apos;s buffering, &ldquo;first line&rdquo; might not have actually
          reached the disk at all yet. That is the exact failure the next section fixes.
        </P>
      </LessonSection>

      <LessonSection id="with-closes-the-file-even-when-something-goes-wrong" title="with closes the file even when something goes wrong">
        <P>
          <Strong>with</Strong> wraps the open file in a block that closes it automatically the
          moment the block ends — including when an error is raised partway through, which a
          manual <Strong>close()</Strong> call would never reach.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("notes.txt", "w") as f:
...     f.write("first line\\n")
...     f.write("second line\\n")
...
>>> f.closed
True`}
        />
        <P>
          Reading uses the same shape, with{" "}
          <Strong>&quot;r&quot;</Strong> in place of{" "}
          <Strong>&quot;w&quot;</Strong> — and it is the default, so it can be left out entirely.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("notes.txt") as f:
...     contents = f.read()
...
>>> print(contents)
first line
second line`}
        />
        <P>
          Compare that to the same mistake as before, this time inside a with block.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("notes.txt", "w") as f:
...     f.write("first line\\n")
...     1 / 0
...
Traceback (most recent call last):
ZeroDivisionError: division by zero
>>> f.closed
True`}
          lineTones={{ 7: "ok" }}
        />
        <P>
          The exception still happens — with does not hide it, and code after the block still
          needs to handle it if you care. What changes is <Strong>f.closed</Strong>:{" "}
          <Strong>True</Strong>, because the file handle was released the instant the block
          exited, error or not. That is the entire justification for treating with as
          non-negotiable rather than a style preference: skipping it does not just look worse,
          it leaves a real resource open exactly when a crash makes it most likely nobody is
          coming back to close it by hand.
        </P>
      </LessonSection>

      <LessonSection id="text-mode-and-binary-mode-are-not-the-same-open" title="Text mode and binary mode are not the same open" delay={0.05}>
        <P>
          Every open() so far has used the default, <Strong>text mode</Strong> — Python
          decodes whatever bytes are actually on disk into a <Strong>str</Strong>, using a
          text encoding, and encodes a str back into bytes on write. Add{" "}
          <Strong>&quot;b&quot;</Strong> to the mode string and that decoding step is skipped
          entirely: <Strong>read()</Strong> then hands back raw bytes, exactly as they sit on
          disk.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("photo.png", "rb") as f:
...     header = f.read(8)
...
>>> header
b'\\x89PNG\\r\\n\\x1a\\n'`}
        />
        <P>
          Open an image, a zip file, or anything that is not text in plain{" "}
          <Strong>&quot;r&quot;</Strong> mode, and Python tries to decode bytes that were
          never meant to be text — usually raising <Strong>UnicodeDecodeError</Strong> partway
          through the file, on whichever byte sequence happens not to form valid text.
        </P>
        <P>
          The decoding step in text mode has to pick a rule for turning bytes into characters,
          and that rule is the <Strong>encoding</Strong>. Python&apos;s default is usually
          UTF-8, but &ldquo;usually&rdquo; is exactly the problem: a file written on a
          different system, or by a different program, can be encoded differently, and opening
          it with the wrong encoding produces either an error or, worse, text that reads back
          subtly wrong without complaining at all.
        </P>
        <CodeBlock
          label="Terminal"
          code={`with open("notes.txt", encoding="utf-8") as f:
    contents = f.read()`}
        />
        <Callout tone="tip" title="Name the encoding instead of trusting the default">
          <Strong>encoding=&quot;utf-8&quot;</Strong> costs one keyword argument and removes an
          entire class of bug that only shows up on someone else&apos;s machine, where the
          system default encoding happens to differ from yours.
        </Callout>
      </LessonSection>

      <LessonSection id="paths-behave-differently-depending-on-where-you-run-from" title="Paths behave differently depending on where the program runs from">
        <P>
          <Strong>&quot;notes.txt&quot;</Strong> is a <Strong>relative path</Strong> — Python
          looks for it relative to wherever the program was started from, not relative to the{" "}
          <Strong>.py</Strong> file itself. Run the same script from two different folders, and
          it can read two entirely different files, or fail to find one at all.
        </P>
        <CompareGrid
          items={[
            {
              title: "String concatenation",
              tone: "caution",
              children: (
                <>
                  <Strong>{'"data" + "/" + "notes.txt"'}</Strong> hardcodes a forward slash,
                  which is wrong on Windows, and breaks the moment a folder name changes.
                </>
              ),
            },
            {
              title: "pathlib.Path",
              tone: "positive",
              children: (
                <>
                  <Strong>{'Path("data") / "notes.txt"'}</Strong> uses the operating
                  system&apos;s own separator automatically, and the result is still a Path
                  you can call .exists() or .resolve() on directly.
                </>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> from pathlib import Path
>>> data_dir = Path("data")
>>> notes_path = data_dir / "notes.txt"
>>> notes_path
PosixPath('data/notes.txt')`}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> Path("notes.txt").resolve()
PosixPath('/Users/you/project/notes.txt')
>>> Path("notes.txt").exists()
True`}
        />
        <Callout tone="tip" title="Why Path is worth reaching for">
          <Strong>pathlib.Path</Strong> builds and checks paths without string-gluing slashes
          by hand — <Strong>resolve()</Strong> shows exactly which file a relative path points
          at right now, which is the fastest way to find out why a &quot;file not found&quot;
          error happened.
        </Callout>
      </LessonSection>

      <LessonSection id="reading-a-huge-file-line-by-line-instead-of-all-at-once" title="Reading a huge file line by line, instead of all at once" delay={0.05}>
        <P>
          <Strong>f.read()</Strong> hands back the entire file as one string, which is fine
          for notes.txt and a real problem for a two-gigabyte log file — Python has to hold
          all two gigabytes in memory at once before your code even looks at the first line.
        </P>
        <P>
          A file object is iterable, though, the same way a list is, and iterating over it
          yields one line at a time without ever holding the rest of the file in memory.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> with open("access.log") as f:
...     for line in f:
...         if "ERROR" in line:
...             print(line.strip())
...`}
          lineTones={{ 1: "accent" }}
        />
        <P>
          At any point during that loop, exactly one line is in memory — the one currently
          being checked. Whether the file is nine lines long or nine million makes no
          difference to how much memory the loop uses, only to how long it takes to finish.
        </P>
        <Callout tone="warning" title="readlines() defeats the point">
          <Strong>f.readlines()</Strong> looks similar and is not: it still reads the entire
          file first, then hands back a list of every line at once. Iterate over{" "}
          <Strong>f</Strong> directly when the file might be large; reach for readlines() only
          once you already know it is small.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          'open("notes.txt", "w") creates or empties a file; "r", the default, reads it instead — and forgetting to close it can leave the write unfinished on disk.',
          "with closes the file the instant its block ends, even when an exception interrupts it partway through — that's not a style preference, it's the difference between a file handle actually being released and one that silently isn't.",
          'Text mode decodes bytes into a str using an encoding, usually UTF-8 by default; binary mode ("rb") skips decoding and hands back raw bytes — naming the encoding explicitly avoids a bug that only appears on someone else\'s machine.',
          "pathlib.Path builds a path with the operating system's own separator via /, rather than gluing strings together by hand, and the result is still a Path you can call .resolve() or .exists() on.",
          "Iterate over an open file with a for loop to process it one line at a time; f.read() and f.readlines() both load the entire file into memory first, which stops scaling once the file gets large.",
        ]}
      />
    </div>
  );
}
