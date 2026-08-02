import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

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
      </LessonSection>

      <LessonSection id="paths-behave-differently-depending-on-where-you-run-from" title="Paths behave differently depending on where the program runs from">
        <P>
          <Strong>&quot;notes.txt&quot;</Strong> is a <Strong>relative path</Strong> — Python
          looks for it relative to wherever the program was started from, not relative to the{" "}
          <Strong>.py</Strong> file itself. Run the same script from two different folders, and
          it can read two entirely different files, or fail to find one at all.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> from pathlib import Path
>>> Path("notes.txt").resolve()
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

      <TakeawayCard
        items={[
          'open("notes.txt", "w") creates or empties a file; "r", the default, reads it instead.',
          "Nothing is guaranteed to reach disk until close() runs, and a crash mid-program can skip it.",
          "with closes the file automatically when the block ends, even if an error interrupts it partway through.",
          "A relative path like \"notes.txt\" is resolved against where the program was started, not where the .py file lives — Path(...).resolve() shows exactly which file that is.",
        ]}
      />
    </div>
  );
}
