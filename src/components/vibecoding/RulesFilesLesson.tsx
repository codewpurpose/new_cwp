import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function RulesFilesLesson() {
  return (
    <div>
      <Lead>
        A rules file is a markdown file in your repo that your AI tool reads automatically
        before every request. It is the highest-payoff thing in this course: written once, it
        improves every prompt you will ever write in that project.
      </Lead>

      <LessonSection id="what-they-are" title="What they are">
        <P>
          Different tools look for different filenames, but they all do the same job — inject a
          file into the context of every request without you asking.
        </P>
        <CodeBlock
          label="Where each tool looks"
          code={`AGENTS.md        an emerging cross-tool convention
CLAUDE.md        Claude Code
.cursorrules     Cursor
.github/copilot-instructions.md    GitHub Copilot`}
        />
        <P>
          Several tools now read <InlineCode>AGENTS.md</InlineCode>, and the others can be
          one-line pointer files that import it — which keeps one source of truth instead of
          four files drifting apart.
        </P>
        <Callout tone="success" title="This site is a live example">
          The CodeWithPurpose repository has an <InlineCode>AGENTS.md</InlineCode> at its root,
          with <InlineCode>CLAUDE.md</InlineCode> importing it and a script that regenerates
          the other platforms&rsquo; files from it. Everything in this chapter is what we
          actually do.
        </Callout>
      </LessonSection>

      <LessonSection id="what-to-put-in-one" title="What to put in one">
        <P>
          The test for whether something belongs is simple:{" "}
          <Strong>have you explained it in a prompt more than twice?</Strong> If so, it belongs
          here.
        </P>
        <CodeBlock
          label="AGENTS.md"
          code={`# Project

A Next.js 16 app using the App Router. TypeScript strict mode.

## Commands
- npm run dev     start the dev server
- npm run check   lint + typecheck + build — must pass before any PR

## Conventions
- Named exports only, no default exports
- Tailwind utility classes, never inline styles
- Components in PascalCase, utilities in camelCase
- 2-space indentation

## Things that will bite you
- Colours come from design tokens, never hardcoded hex values
- Every route href must end in a trailing slash
- Lesson data is seeded — never use Math.random in a component`}
        />
      </LessonSection>

      <LessonSection id="what-stays-out" title="What's better said once, per request">
        <P>
          Not everything true about your project belongs in the file that loads on every single
          request. Some things are better said once, in the prompt where they matter, and left
          out otherwise.
        </P>
        <CompareGrid
          items={[
            {
              title: "Belongs in the file",
              tone: "positive",
              children: (
                <p>
                  Stable, and applies to nearly every request: naming conventions, the check
                  command, which state library you use, where secrets live.
                </p>
              ),
            },
            {
              title: "Better said per request",
              tone: "caution",
              children: (
                <p>
                  True today but volatile — &ldquo;we&rsquo;re mid-migration off X&rdquo; — a
                  one-off exception, or anything specific to the single file you are editing
                  right now.
                </p>
              ),
            },
          ]}
        />
        <P>
          Put a migration note in the rules file and it outlives the migration by months,
          actively misleading every request that comes after. Put a one-off exception in there
          and it silently applies everywhere, not just the one place you meant it.
        </P>
        <P>
          There is a second reason to be selective, independent of staleness. A rules file that
          has grown past a page stops behaving like a set of rules the model reliably follows
          and starts behaving like reference material it skims. You will see it honour rule four
          and quietly ignore rule forty — not carelessness, just what happens to a long,
          undifferentiated list of instructions. The fix is not a longer file. It is a shorter
          one, with the volatile and the one-off routed to the prompt instead.
        </P>
        <Callout tone="warning" title="If it's growing, it's the wrong file">
          A rules file north of a couple hundred lines is a sign the project needs a second,
          narrower file loaded only where relevant — or that half of what is in there should
          have been said in the prompt instead.
        </Callout>
      </LessonSection>

      <LessonSection id="what-makes-a-good-rule" title="What makes a good rule">
        <P>
          Rules compete for the same context budget as your code, so a bloated rules file makes
          things worse. Aim for specific, checkable, and non-obvious.
        </P>
        <ChecklistCard
          title="Good rules are"
          items={[
            <>
              <Strong>Specific.</Strong> &ldquo;Use named exports&rdquo; beats &ldquo;write
              clean code.&rdquo;
            </>,
            <>
              <Strong>Checkable.</Strong> Someone can tell whether the rule was followed.
            </>,
            <>
              <Strong>Non-obvious.</Strong> The model already writes reasonable code — spend
              the space on what is unusual about <em>your</em> project.
            </>,
            <>
              <Strong>Current.</Strong> A rule describing a refactor you abandoned is worse
              than no rule.
            </>,
          ]}
        />
        <Callout tone="warning" title="The most common mistake">
          Writing a style guide the model already knows. It does not need to be told that
          variables should have meaningful names. It does need to be told that{" "}
          every colour must come from a design token rather than a hex literal — because
          it has no way to know that.
        </Callout>
      </LessonSection>

      <LessonSection id="the-commands-section" title="The commands section earns its keep">
        <P>
          If you include nothing else, include how to run the checks. It converts the AI from
          something that writes plausible code into something that verifies its own work.
        </P>
        <CodeBlock
          variant="prompt"
          label="What this unlocks"
          code={`Add the feature, then run npm run check and fix anything
it reports. Do not stop until it passes.`}
        />
        <P>
          That prompt only works if the model knows the command exists. Put it in the rules file
          and every future request can lean on it.
        </P>
      </LessonSection>

      <LessonSection id="keeping-it-honest" title="Keeping it honest">
        <P>
          A rules file rots like any other documentation, and a stale one actively misleads —
          the model will follow a convention you abandoned six months ago with total confidence.
        </P>
        <P>
          Treat it as code. When you change a convention, change the file in the same commit.
          When you notice yourself correcting the AI on the same thing repeatedly, that is a
          missing rule telling you about itself.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A rules file is loaded into every request automatically. Write it once, benefit forever.",
          "The test: have you explained it in a prompt more than twice?",
          "Volatile and one-off information belongs in the prompt, not the file — it outlives its truth and misleads every request after.",
          "Spend the space on what is unusual about your project, not on general good practice.",
          "Include your check command — it turns the AI into something that verifies its own work.",
          "A stale rule is worse than no rule. Update it in the same commit as the convention.",
        ]}
      />
    </div>
  );
}
