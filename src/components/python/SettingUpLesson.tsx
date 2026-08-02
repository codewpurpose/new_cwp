import { LessonSection, Lead, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { OsSetup } from "@/components/python/OsSetup";

export function SettingUpLesson() {
  return (
    <div>
      <Lead>
        The usual first step in a Python tutorial is an hour of installer screenshots. Most of
        that hour is unnecessary — check what is already on your machine before you install
        anything.
      </Lead>

      <LessonSection id="the-one-thing-you-actually-need" title="The one thing you actually need">
        <P>
          You need exactly one thing to start: a working Python interpreter you can reach from
          a terminal. You do not need an editor with plugins, a virtual environment, or a
          project folder yet — those matter later, once you have more than a few lines to
          organise.
        </P>
      </LessonSection>

      <OsSetup />

      <LessonSection id="a-terminal-that-already-has-it" title="A terminal that already has it">
        <P>
          Typing <Strong>python3</Strong> (or <Strong>py</Strong> on Windows) with nothing
          after it drops you into the interactive interpreter, usually called the{" "}
          <Strong>REPL</Strong> — read, evaluate, print, loop. Type an expression, press
          return, and it is evaluated immediately.
        </P>
        <CodeBlock
          label="REPL"
          variant="terminal"
          code={`>>> 2 + 2
4
>>> "hello".upper()
'HELLO'`}
        />
        <P>
          Everything after the <Strong>{">>>"}</Strong> was typed by you. Everything on the
          line below it is Python printing the result back, unprompted — the REPL shows you
          the value of every expression you enter, which is why it is the fastest way to check
          a small idea.
        </P>
      </LessonSection>

      <LessonSection id="where-a-file-stops-and-a-script-begins" title="Where a file stops and a script begins">
        <P>
          The REPL is for trying something out. A <Strong>.py</Strong> file is for keeping it.
          Save a few lines in a file named <Strong>hello.py</Strong>, and run the file itself
          rather than typing its contents by hand:
        </P>
        <CodeBlock
          label="hello.py"
          code={`print("Hello, world!")`}
        />
        <CodeBlock label="Terminal" variant="terminal" code={`python3 hello.py
Hello, world!`} />
        <P>
          Nothing you type into the REPL is saved anywhere once you close it. Every program in
          the rest of this track assumes you are working in a file, not the REPL, for exactly
          that reason.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "You need one thing to start: a Python interpreter reachable from a terminal.",
          "The REPL (python3 with nothing after it) evaluates expressions immediately and shows you the result.",
          "Nothing typed into the REPL is saved — real programs live in .py files.",
          "Run a file with python3 <filename>.py, not by retyping its contents into the REPL.",
        ]}
      />
    </div>
  );
}
