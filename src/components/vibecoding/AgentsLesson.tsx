import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function AgentsLesson() {
  return (
    <div>
      <Lead>
        Everything so far has had you in the loop for every step. An agent removes you from the
        middle: you describe an outcome, it works until it gets there. That shift is genuinely
        powerful and it changes which mistakes are possible.
      </Lead>

      <LessonSection id="what-changes" title="What actually changes">
        <CompareGrid
          items={[
            {
              title: "Assistant mode",
              tone: "neutral",
              children: (
                <p>
                  You prompt, it responds, you review, you prompt again. You see every step and
                  approve every change. Slow, and very controlled.
                </p>
              ),
            },
            {
              title: "Agent mode",
              tone: "positive",
              children: (
                <p>
                  You describe the destination. It reads files, edits, runs commands, reads the
                  errors, and tries again — for minutes at a time — then reports back.
                </p>
              ),
            },
          ]}
        />
        <P>
          The important part is not speed. It is that the agent can{" "}
          <Strong>run your code and read the result</Strong>, which means it can correct itself
          without you relaying error messages back and forth.
        </P>
      </LessonSection>

      <LessonSection id="what-makes-a-good-task" title="What makes a good agent task">
        <P>
          Agents succeed when there is a machine-checkable definition of done, and drift badly
          when there is not.
        </P>
        <StepList
          steps={[
            { label: "Good: “make the failing tests pass”", detail: "Unambiguous finish line the agent can check itself." },
            { label: "Good: “fix every type error in this directory”", detail: "The type checker is the judge, not the model's taste." },
            { label: "Good: “add tests until this file is covered”", detail: "Measurable, and low risk if imperfect." },
            { label: "Bad: “improve the code quality”", detail: "No definition of done, so it will keep going and touch everything." },
            { label: "Bad: “redesign the homepage”", detail: "Aesthetic judgement it cannot verify. You will get changes you did not want." },
          ]}
        />
        <Callout tone="tip" title="The test to apply">
          Could a script tell whether the task is finished? If yes, an agent is a good fit. If
          the answer requires your judgement, stay in the loop.
        </Callout>
      </LessonSection>

      <LessonSection id="setting-it-up-safely" title="Setting it up so mistakes are cheap">
        <P>
          An agent runs commands on your machine and edits many files without pausing. Do three
          things before letting one loose.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Commit first, always",
              detail: "A clean tree means the entire run can be discarded with one command.",
            },
            {
              label: "Work on a branch",
              detail: "So even a committed mess costs nothing to abandon.",
            },
            {
              label: "Give it the check command",
              detail:
                "Its stopping condition should be your real verification, not its own opinion of doneness.",
            },
          ]}
        />
        <CodeBlock
          variant="prompt"
          label="A well-formed agent task"
          code={`The tests in src/lib/pricing.test.ts are failing.

Fix the implementation in src/lib/pricing.ts so they pass.
Do not change the tests.

Run npm run check when you think you are done. If it fails,
keep going. If you get stuck on the same error twice, stop
and tell me what you tried.`}
        />
        <P>
          Note the last sentence. Without a stop condition, a stuck agent will keep trying, and
          each attempt piles more changes on top of the previous failed one.
        </P>
      </LessonSection>

      <LessonSection id="worktrees" title="Parallel work with worktrees">
        <P>
          A git worktree is a second checkout of the same repository in another folder, on its
          own branch. That lets an agent work in one folder while you work in another, with no
          conflicts:
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git worktree add ../myapp-agent -b agent/fix-pricing
cd ../myapp-agent
# let the agent work here while you keep working in the original

git worktree remove ../myapp-agent    # when finished`}
        />
        <Callout tone="warning" title="Where this bites">
          Both folders share one repository, so a branch checked out in one cannot be checked
          out in the other. Also remember to install dependencies in the new worktree — it has
          no <InlineCode>node_modules</InlineCode> of its own.
        </Callout>
      </LessonSection>

      <LessonSection id="reviewing-agent-output" title="Reviewing what comes back">
        <P>
          An agent run produces a large diff you did not watch being made. Review it differently
          from a change you steered.
        </P>
        <StepList
          steps={[
            { label: "Read the full diff on GitHub", detail: "Not in the terminal transcript. You want the finished state, not the narrative." },
            { label: "Check for scope creep first", detail: "Files it touched that have nothing to do with the task are the strongest signal something went sideways." },
            { label: "Verify the check actually passed", detail: "Run it yourself. “It says it passes” is not the same as it passing." },
            { label: "Look for deleted tests", detail: "The fastest way to make tests pass is to remove them. Confirm the count went up, not down." },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "The real shift is that an agent can run your code and read the result, so it self-corrects.",
          "Good agent tasks have a machine-checkable finish line. If a script cannot judge it, stay in the loop.",
          "Commit and branch before every run — that is what makes a bad run cost nothing.",
          "Always give a stop condition, or a stuck agent piles failures on failures.",
          "Worktrees let an agent work in parallel with you, in a separate folder.",
          "Check that tests were fixed, not deleted. That is the shortcut you must look for.",
        ]}
      />
    </div>
  );
}
