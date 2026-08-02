import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { StepList } from "@/components/learn/primitives/StepList";

export function FirstAppLesson() {
  return (
    <div>
      <Lead>
        You have the tools installed. Now build something with them — a small habit tracker
        that runs in your browser. The point is not the app. The point is to go once around the
        whole loop, so that every later chapter has something concrete to attach to.
      </Lead>

      <Callout tone="tip" title="Budget about twenty minutes">
        If you get stuck for more than a few minutes on any step, skip ahead to the debugging
        chapter and come back. Being stuck is normal and it is a skill, not a signal.
      </Callout>

      <LessonSection id="scaffold-the-project" title="Step 1: scaffold the project">
        <P>
          Do not ask the AI to create the project structure. Use the official generator — it is
          faster, it is correct, and it gives the AI a familiar layout to work in.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`npx create-next-app@latest habit-tracker
cd habit-tracker
npm run dev`}
        />
        <P>
          Accept the defaults when it asks. Then open{" "}
          <InlineCode>http://localhost:3000</InlineCode> in your browser — you should see a
          starter page. Leave this terminal running; it rebuilds the site every time you save.
        </P>
        <Callout tone="success" title="Commit before you change anything">
          A clean starting snapshot means any mess you or the AI make is one command away from
          being undone. In a second terminal:{" "}
          <InlineCode>git add . && git commit -m &quot;Fresh scaffold&quot;</InlineCode>
        </Callout>
      </LessonSection>

      <LessonSection id="the-first-prompt" title="Step 2: the first prompt">
        <P>
          Open the <Strong>folder</Strong> in your AI tool. Now write a prompt that says what
          you want, what it should look like, and what not to touch. Notice how much more this
          says than &ldquo;make a habit tracker&rdquo;:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Replace the contents of the home page with a simple habit tracker.

It should:
- let me type a habit name and add it to a list
- show each habit with a checkbox for today
- keep the list in React state (no database yet)

Keep it to the existing home page file. Do not add any new
dependencies. Use the styling approach already in the project.`}
        />
        <P>
          Four things are doing the work there: the goal, the specific behaviours, the
          constraints, and the boundary of what may change. Drop any one of them and the reply
          gets noticeably worse.
        </P>
      </LessonSection>

      <RevealCard
        summaryTag="What you sent"
        summary="The prompt above, sent to a repo-aware tool with the project folder open."
        detailTag="What a reasonable reply changes"
        detail={
          <>
            It rewrites the home page alone: a text input bound to a piece of state, a button
            that pushes the trimmed value onto a list, and a row of checkboxes below it. Nothing
            else moves — no new file appears, no dependency gets added, no config file is
            touched. If your tool&rsquo;s diff differs in kind rather than in style, that is
            worth pausing on before you accept it.
          </>
        }
        footnote="The exact JSX varies by tool and model. The shape — one file, one new piece of state, one handler — should not."
      />

      <LessonSection id="read-before-you-run" title="Step 3: read it before you run it">
        <P>
          The temptation is to accept and refresh. Resist it for sixty seconds and skim the
          diff, asking three questions:
        </P>
        <StepList
          steps={[
            {
              label: "Did it change only what I asked?",
              detail: "New files or edits outside the home page mean the scope leaked.",
            },
            {
              label: "Can I follow what it does?",
              detail:
                "Not every line — but the shape. Where is the list stored? What happens when I click add?",
            },
            {
              label: "Did it invent anything?",
              detail:
                "A new dependency, an import from a file that does not exist, a date-formatting library nobody installed.",
            },
          ]}
        />
        <P>
          Then save and look at the browser. It reloads by itself.
        </P>
      </LessonSection>

      <LessonSection id="make-it-yours" title="Step 4: make it yours">
        <P>
          Now the part that actually teaches you something. Ask for one change at a time, and
          check the result after each one:
        </P>
        <CodeBlock
          variant="prompt"
          label="Follow-up prompts, one at a time"
          code={`Add a delete button next to each habit.

Show a count at the top: "3 of 5 done today".

If the list is empty, show "No habits yet — add one above"
instead of an empty list.`}
        />
        <P>
          Three small prompts beat one large one, for a reason worth internalising early: when
          something breaks, you know exactly which change broke it. That is the entire argument
          for small diffs, and you just felt it rather than being told it.
        </P>
      </LessonSection>

      <LessonSection id="when-it-breaks" title="Step 5: when it breaks">
        <P>
          It will. A white screen, or red text in the terminal. This is the normal state of
          building software, not evidence you did something wrong.
        </P>
        <P>
          A likely spot for it here: click delete before you have added a habit, or click it on
          the last one left, and if the delete handler was written without checking the list is
          still there, you will see something like{" "}
          <InlineCode>TypeError: Cannot read properties of undefined (reading &apos;name&apos;)</InlineCode>{" "}
          in the terminal and a blank page in the browser. That is not a mysterious AI failure —
          it is an ordinary bug, the kind you would write yourself, and the fix is the same
          either way: read the message, find the line it names, fix the one thing it says is
          wrong.
        </P>
        <P>
          Copy the <Strong>entire</Strong> error — not your summary of it — and paste it back
          with what you were doing:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`I added the delete button and now the page is blank.
Here is the full error from the terminal:

[paste the whole error here]`}
        />
        <Callout tone="warning" title="If two attempts do not fix it">
          Stop prompting and run <InlineCode>git restore .</InlineCode> to return to your last
          commit. Then make the change again in smaller steps. Arguing with a model that has
          lost the thread costs more time than starting the step over.
        </Callout>
      </LessonSection>

      <LessonSection id="what-you-actually-end-up-with" title="What you actually end up with">
        <P>
          Here is a plausible final version — roughly what four prompts and one debugging round
          produce. Yours will differ in the details: different variable names, maybe a different
          way of splitting the component. The shape should match closely, because the shape is
          what the prompts asked for.
        </P>
        <CodeBlock
          variant="code"
          label="app/page.tsx"
          code={`"use client";

import { useState } from "react";

interface Habit {
  name: string;
  done: boolean;
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const doneCount = habits.filter((h) => h.done).length;

  function addHabit() {
    if (!name.trim()) return;
    setHabits([...habits, { name, done: false }]);
    setName("");
  }

  function toggle(index: number) {
    setHabits(habits.map((h, i) => (i === index ? { ...h, done: !h.done } : h)));
  }

  function remove(index: number) {
    setHabits(habits.filter((_, i) => i !== index));
  }

  return (
    <main>
      <h1>{doneCount} of {habits.length} done today</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addHabit}>Add</button>

      {habits.length === 0 && <p>No habits yet — add one above</p>}

      <ul>
        {habits.map((habit, index) => (
          <li key={habit.name + index}>
            <input type="checkbox" checked={habit.done} onChange={() => toggle(index)} />
            {habit.name}
            <button onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}`}
        />
        <P>
          Forty-something lines, zero new dependencies, about twenty minutes including the part
          where you got stuck. That is not a number picked to sound impressive — it is what one
          file, four small prompts, and a single restart actually cost.
        </P>
        <LabelRows
          rows={[
            {
              label: "Prompts",
              text: "Four: the base build, then delete, count, and the empty state, each checked before the next.",
            },
            {
              label: "New dependencies",
              text: "Zero. Everything came from React state already in the starter.",
            },
            {
              label: "Files touched",
              text: "One: the home page. If yours touched more, that is worth asking about before you move on.",
            },
            {
              label: "Restarts",
              text: "At most one, if the debugging step above did not resolve it within two tries.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="you-did-the-whole-loop" title="You just did the whole loop">
        <ChecklistCard
          marker="check"
          title="What you actually practised"
          items={[
            "Scaffolding with a real generator instead of asking the AI to invent one",
            "Committing before changes, so nothing is unrecoverable",
            "Writing a prompt with a goal, behaviours, constraints, and a boundary",
            "Reading a diff before running it",
            "Iterating in small steps so failures stay traceable",
            "Handing a full error back instead of describing it",
          ]}
        />
        <P>
          Every remaining chapter is a deeper look at one of those six things. If the app is
          ugly and the code is imperfect, that is fine — it runs, and you can explain what it
          does.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Use official generators to scaffold. Save the AI for the part that is actually yours.",
          "Commit before you prompt, every time.",
          "One change per prompt: when something breaks you will know which change did it.",
          "Sixty seconds of reading the diff saves an hour of debugging.",
          "Paste whole errors. Your summary drops the part that mattered.",
          "Two failed fixes means restore and retry smaller, not prompt harder.",
        ]}
      />
    </div>
  );
}
