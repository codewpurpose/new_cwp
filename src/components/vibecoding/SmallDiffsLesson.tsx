import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function SmallDiffsLesson() {
  return (
    <div>
      <Lead>
        The single most common way people fail at vibe coding is asking for too much at once.
        It feels efficient. It is the opposite, and the reason why is worth understanding
        precisely rather than taking on faith.
      </Lead>

      <LessonSection id="the-mega-prompt-trap" title="The mega-prompt trap">
        <P>Here is the prompt almost everyone writes in their first week:</P>
        <CodeBlock
          variant="prompt"
          label="Don't do this"
          code={`Build me a task app with user accounts, projects, due dates,
tags, a calendar view, email reminders, and dark mode.`}
        />
        <P>You will get something. It will run. And then you are stuck, for three reasons.</P>
        <StepList
          steps={[
            {
              label: "You cannot review it",
              detail:
                "Two thousand lines across fifteen files. Nobody reviews that properly, so you accept it unread — and now you are maintaining code you have never seen.",
            },
            {
              label: "You cannot debug it",
              detail:
                "Something is broken. Which of the eight features caused it? Every one is a suspect, because they all arrived together.",
            },
            {
              label: "You cannot steer it",
              detail:
                "The AI made a hundred decisions you never saw. By the time you disagree with one, the rest are built on top of it.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-good-looks-like" title="What good looks like">
        <P>Same app. Ten prompts instead of one:</P>
        <CodeBlock
          variant="prompt"
          label="Do this"
          code={`1. Set up the project with a page that lists hardcoded tasks.
2. Add a form to create a task. Keep it in React state.
3. Add a checkbox to mark a task done.
4. Persist the list to localStorage.
5. Add due dates with a date picker.
...`}
        />
        <P>
          Each one is reviewable in a minute, runnable immediately, and{" "}
          <Strong>committable</Strong>. If step 5 breaks something, steps 1 to 4 are still good
          and you know exactly where the problem is.
        </P>
        <Callout tone="success" title="The definition worth internalising">
          A good prompt produces a change you can hold in your head, verify in under two
          minutes, and describe in one commit message. If you cannot write that commit message,
          the prompt was too big.
        </Callout>
      </LessonSection>

      <LessonSection id="why-the-ai-does-better-too" title="Why the AI does better too">
        <P>
          This is not only about your comprehension. Small requests get{" "}
          <Strong>better output</Strong>, for a reason that follows directly from the previous
          part of this course.
        </P>
        <CompareGrid
          items={[
            {
              title: "One large request",
              tone: "caution",
              children: (
                <p>
                  The model must satisfy eight constraints at once. Anything it produces for
                  feature one has to remain consistent through feature eight, and consistency
                  degrades as the output grows.
                </p>
              ),
            },
            {
              title: "Eight small requests",
              tone: "positive",
              children: (
                <p>
                  Each has one goal, and each new one can see the real, working code from the
                  last. It is building on facts rather than on its own predictions.
                </p>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="commit-like-you-mean-it" title="Commit like you mean it">
        <P>
          Small diffs only pay off if you actually snapshot them. The loop is short enough to
          become muscle memory:
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git add .
git commit -m "Add due dates to tasks"`}
        />
        <P>
          Do that after every prompt that works. It costs three seconds and it is what makes{" "}
          <InlineCode>git restore .</InlineCode> a real option instead of a threat — you can
          always throw away the current mess without losing the last good state.
        </P>
        <Callout tone="warning" title="The failure mode this prevents">
          Without commits, an AI change that breaks something leaves you picking through a diff
          that mixes six unrelated edits, trying to remember which parts you wanted. With
          commits, you throw the bad one away and lose four minutes.
        </Callout>
      </LessonSection>

      <LessonSection id="when-bigger-is-fine" title="When bigger is actually fine">
        <P>
          The rule is not absolute. A large change is reasonable when it is{" "}
          <Strong>mechanical and verifiable</Strong> — renaming a symbol across forty files,
          say, where the type checker confirms the result and any error is loud rather than
          subtle.
        </P>
        <P>
          The distinction is not size. It is whether you can tell that the change is correct.
          Forty files of a rename you can verify beats one file of logic you cannot.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "If you cannot write the commit message, the prompt was too big.",
          "Small requests produce better AI output, not just more reviewable output — each one builds on real code instead of predictions.",
          "Commit after every prompt that works. Three seconds buys you a working undo.",
          "When something breaks, small diffs tell you where. Large ones make everything a suspect.",
          "Size is not the real test — verifiability is. A big mechanical change the compiler checks is fine.",
        ]}
      />
    </div>
  );
}
