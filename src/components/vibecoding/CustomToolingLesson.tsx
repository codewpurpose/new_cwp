import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function CustomToolingLesson() {
  return (
    <div>
      <Lead>
        Once a workflow is good, typing it out every time is waste — and worse, you will type a
        slightly worse version on the days you are tired. Custom commands make the good version
        the default one.
      </Lead>

      <LessonSection id="notice-the-repetition" title="Start by noticing the repetition">
        <P>
          You already have candidates. Look for the prompts you have written more than three
          times with only small changes:
        </P>
        <StepList
          steps={[
            { label: "“Review this for security issues, checking for…”", detail: "The security pass from Chapter 21." },
            { label: "“Write tests covering the normal case, empty input, and the boundaries”", detail: "Your standard test request." },
            { label: "“Explain what this file does and where it is used, then wait”", detail: "The comprehension pattern." },
            { label: "“Write a commit message from my staged changes”", detail: "Every single commit." },
          ]}
        />
        <P>
          Each of those is a command waiting to exist.
        </P>
      </LessonSection>

      <LessonSection id="slash-commands" title="Slash commands">
        <P>
          Most agent tools let you save a prompt as a file and invoke it by name. In Claude Code
          that is a markdown file in <InlineCode>.claude/commands/</InlineCode>; other tools use
          their own directory but the idea is identical.
        </P>
        <CodeBlock
          label=".claude/commands/security-review.md"
          code={`Review the staged changes for security problems.

Check specifically:
- secrets or credentials in source
- unvalidated input reaching a query, command, or the DOM
- endpoints that check authentication but not ownership
- errors that leak internals to users

For each issue, give the attack and the fix. If a category
is clean, say so explicitly rather than staying silent.`}
        />
        <P>
          Now <InlineCode>/security-review</InlineCode> runs the full, careful version every
          time — including on the day you would have typed &ldquo;check this for security
          stuff.&rdquo;
        </P>
        <Callout tone="success" title="Why this is more than a shortcut">
          The value is consistency, not keystrokes. Your best prompt, applied uniformly, beats a
          prompt you rewrite from memory each time and unconsciously shorten.
        </Callout>
      </LessonSection>

      <LessonSection id="commit-them" title="Commit them to the repo">
        <P>
          Keep commands in the project, not in your personal settings. Then everyone working on
          it — including future you on another machine — gets the same workflow, and improving a
          command improves it for the whole team in one commit.
        </P>
        <P>
          It also makes the commands reviewable. A prompt that shapes how code gets written
          deserves the same scrutiny as the code.
        </P>
      </LessonSection>

      <LessonSection id="scripts-beat-prompts" title="When a script beats a prompt">
        <P>
          Important boundary: if a task is fully deterministic, do not use a model for it. Write
          a script. It is faster, free, and cannot have an off day.
        </P>
        <StepList
          steps={[
            { label: "Deterministic — write a script", detail: "Formatting, renaming by pattern, generating an index file, checking for forbidden strings." },
            { label: "Requires judgement — write a command", detail: "Reviewing, explaining, naming things, deciding what to test." },
          ]}
        />
        <P>
          This repository has both: <InlineCode>scripts/validate-learn-nav.mjs</InlineCode>{" "}
          checks curriculum data mechanically and fails the build, because that check has one
          right answer and should never be a matter of opinion.
        </P>
      </LessonSection>

      <LessonSection id="the-compounding-part" title="The part that compounds">
        <P>
          Each command you write makes the next task slightly cheaper. After a few months the
          accumulated set is genuinely more valuable than any individual model improvement,
          because it encodes <Strong>how your project specifically wants to be worked on</Strong>{" "}
          — which no vendor can ship you.
        </P>
        <P>
          That is also the thing you take with you. Models will keep changing. A well-shaped
          workflow outlives whichever one you are using this year.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A prompt you have typed three times is a command waiting to be written.",
          "The value is consistency: your best prompt applied every time, not a shortened version from memory.",
          "Commit commands to the repo so the workflow is shared and reviewable.",
          "Deterministic work belongs in a script, not a prompt. Judgement work belongs in a command.",
          "Accumulated commands encode how your project wants to be worked on — that is yours, and it outlasts the model.",
        ]}
      />
    </div>
  );
}
