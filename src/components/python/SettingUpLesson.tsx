import { LessonSection, Lead, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
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
        <P>
          Type <Strong>python3</Strong>, specifically — not the bare <Strong>python</Strong>.
          Python 2 reached its end of life in January 2020, and on some older Linux and macOS
          installs, the unqualified <Strong>python</Strong> command still quietly points at
          the version nobody should be writing new code against. Everything in this track, and
          almost everything written since 2020, targets Python 3.
        </P>
        <Callout tone="warning" title="A Windows trap that looks like success">
          On a fresh Windows install with nothing set up yet, typing <Strong>python</Strong>{" "}
          does not print &ldquo;command not found&rdquo;. It opens the Microsoft Store, to a
          page for installing Python. Follow it once and you end up properly set up — it is
          just disorienting the first time, when you were expecting an error and got a shop
          instead.
        </Callout>
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
        <P>
          Not every line prints something. An <Strong>assignment</Strong> runs silently,
          because storing a value and evaluating one are different actions — Python only ever
          prints the second kind. Name the variable on its own line afterwards, and it prints
          exactly like anything else would.
        </P>
        <CodeBlock
          label="REPL"
          variant="terminal"
          code={`>>> x = 5
>>> x
5`}
        />
        <P>
          Leave the REPL with <Strong>exit()</Strong>, or <Strong>Ctrl+D</Strong> on macOS and
          Linux, <Strong>Ctrl+Z</Strong> then Enter on Windows.
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
        <P>
          Run the command from the same folder the file is saved in, or point at it with a
          path — <Strong>python3 scripts/hello.py</Strong> works one directory up. Get the path
          wrong and Python says so plainly: <Strong>can&apos;t open file &apos;hello.py&apos;:
          No such file or directory</Strong> is a path problem, not a Python problem, and no
          amount of fixing your code will touch it.
        </P>
        <Callout tone="tip" title="A plain text editor is enough, to start">
          VS Code, with the official Python extension, is the practical default — it underlines
          a mistake before you run the file, not after. Notepad or TextEdit will also save a{" "}
          <Strong>.py</Strong> file correctly; they simply will not warn you about anything.
        </Callout>
      </LessonSection>

      <LessonSection
        id="why-every-tutorial-tells-you-to-make-one"
        title="Why every tutorial tells you to make one"
      >
        <P>
          Every package you install lands in one place by default: the interpreter itself.
          That is fine until a second project needs a different, incompatible version of the
          same package — which happens more often than it sounds like it should. A{" "}
          <Strong>virtual environment</Strong> is a private copy of the interpreter and its
          installed packages, scoped to a single project folder, so two projects never fight
          over the same shared copy of anything.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Create one, inside your project folder",
              detail:
                "One command makes a folder holding a private copy of Python and pip, separate from the system installation.",
            },
            {
              label: "Activate it",
              detail:
                "The command differs by platform. Once active, every python3 and every pip install you run uses this private copy, not the system one.",
            },
            {
              label: "Install into it",
              detail: "From here on, pip install only ever affects this one project.",
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`python3 -m venv .venv
source .venv/bin/activate
# the prompt now starts with (.venv)
pip install requests`}
          lineTones={{ 1: "accent" }}
        />
        <LabelRows
          rows={[
            {
              label: "macOS / Linux",
              text: (
                <>
                  Activate with <Strong>source .venv/bin/activate</Strong>.
                </>
              ),
            },
            {
              label: "Windows",
              text: (
                <>
                  Activate with <Strong>{".venv\\Scripts\\activate"}</Strong>.
                </>
              ),
            },
          ]}
        />
        <P>
          Leave it with <Strong>deactivate</Strong>, typed on its own — nothing about a virtual
          environment is permanent. It is a folder you can delete and recreate at any time,
          which is exactly why the advice to make one is so unconditional.
        </P>
        <Callout tone="note" title="Do not commit it">
          A <Strong>.venv</Strong> folder can hold hundreds of megabytes and is entirely
          reproducible from a list of package names. Add it to <Strong>.gitignore</Strong>{" "}
          rather than committing it — the chapter on working with libraries covers what should
          be tracked instead.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "You need one thing to start: a Python interpreter reachable from a terminal, as python3.",
          "The REPL (python3 with nothing after it) evaluates expressions immediately and prints the result — but an assignment runs silently.",
          "Nothing typed into the REPL is saved. Real programs live in .py files, run with python3 <filename>.py.",
          "A virtual environment is a private copy of the interpreter and its packages, scoped to one project folder.",
          "Activate a virtual environment before installing anything, or every package lands in the shared system interpreter instead.",
        ]}
      />
    </div>
  );
}
