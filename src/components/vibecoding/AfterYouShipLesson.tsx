import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function AfterYouShipLesson() {
  return (
    <div>
      <Lead>
        Shipping is the start of the interesting part. Real users do things you never
        considered, on devices you do not own, and the feedback they generate is worth more
        than any amount of further polishing in private.
      </Lead>

      <LessonSection id="know-when-it-breaks" title="Find out before your users tell you">
        <P>
          The worst way to learn about an outage is a message from someone who hit it an hour
          ago. Two things fix most of that, and both are free at small scale.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Error tracking",
              detail:
                "Sentry or your host's built-in equivalent. It reports what broke, on what page, with the stack trace and browser.",
              note: "This is the single highest-value thing to add after launch.",
            },
            {
              label: "Uptime checks",
              detail:
                "A service that loads your site every few minutes and emails you when it stops responding.",
            },
          ]}
        />
        <P>
          You are not building an observability practice. You are answering two questions: is it
          up, and is it throwing errors.
        </P>
      </LessonSection>

      <LessonSection id="reading-bug-reports" title="Reading a real bug report">
        <P>
          Real reports are vague. &ldquo;It doesn&rsquo;t work&rdquo; is the median. Your job is
          to convert that into something reproducible before you prompt anything.
        </P>
        <ChecklistCard
          title="Get these four things"
          items={[
            "What were you trying to do?",
            "What did you expect to happen?",
            "What happened instead?",
            "What device and browser?",
          ]}
        />
        <P>
          The fourth catches a surprising share of issues outright — a layout that only breaks
          on Safari, or a feature that assumed a mouse.
        </P>
        <Callout tone="warning" title="Never prompt from a summary">
          Passing on your paraphrase of a user&rsquo;s description compounds two lossy steps.
          Get to a reproduction you have seen with your own eyes first, then hand over that.
        </Callout>
      </LessonSection>

      <LessonSection id="know-when-to-roll-back" title="Know when to roll back instead of fixing forward">
        <P>
          A live bug and a bug caught in review are not the same problem. One of them is
          actively costing someone something right now, and the instinct to fully understand it
          before you touch anything is exactly backwards under that kind of pressure.
        </P>
        <P>
          If the last deploy is the obvious suspect — a change went out an hour ago and the
          errors started ten minutes later — the fastest fix is usually not a fix. It is putting
          the previous, known-good version back in front of people, then debugging calmly with
          the fire already out.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Is the last deploy the suspect?",
              detail:
                "Check error timestamps against your deploy log. A tight correlation is your answer before you have read a single line of the diff.",
            },
            {
              label: "Can you undo it in under a minute?",
              detail:
                "Most hosts let you redeploy the previous build directly, and a git revert undoes the commit without rewriting history the way a reset would.",
            },
            {
              label: "Roll back, then debug",
              detail:
                "Once the previous version is live, you are debugging a problem, not fighting an outage. Those are different tasks, and the second one is much easier to think clearly about.",
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git log --oneline -5
git revert <bad-commit-sha>
git push`}
        />
        <Callout tone="tip" title="Reverting is not admitting defeat">
          Shipping a rollback in five minutes and a real fix the next day beats shipping a real
          fix in five minutes that turns out to be wrong. Treat them as two separate decisions,
          made at two separate times.
        </Callout>
      </LessonSection>

      <LessonSection id="the-fix-loop" title="The fix loop, with the AI in it">
        <P>
          Once you can reproduce it, the loop is the one you already know — with one addition
          that stops the same bug returning:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Users on Safari cannot submit the contact form. I reproduced it:
the date field stays empty and the submit button does nothing.
Works in Chrome.

Relevant file: src/components/ContactForm.tsx

First write a test that reproduces this, then explain the cause,
then fix it.`}
        />
        <P>
          Test first, cause second, fix third. The test is what makes this a permanent fix
          rather than a temporary one.
        </P>
        <P>
          Skip the test and you have closed today&rsquo;s report. The same defect can resurface
          through a different input next month, and nothing will flag it until another user
          finds it — now annoyed twice, by the same bug you already fixed once.
        </P>
      </LessonSection>

      <LessonSection id="what-users-actually-do" title="Watch what people do, not what they say">
        <P>
          Analytics answer questions your intuition cannot. Which pages do people land on? Where
          do they leave? Which feature you spent a weekend on has never been used?
        </P>
        <P>
          A privacy-respecting analytics tool — Plausible, Fathom, or your host&rsquo;s built-in
          option — is a few lines to add and does not require a cookie banner. Start with page
          views. Do not build a dashboard nobody reads.
        </P>
      </LessonSection>

      <LessonSection id="keeping-it-alive" title="Keeping it alive">
        <P>
          A shipped project needs maintenance that is easy to skip because nothing is visibly
          broken:
        </P>
        <StepList
          steps={[
            { label: "Update dependencies monthly", detail: "npm outdated shows what has moved; run your check command after updating." },
            { label: "Act on security advisories", detail: "npm audit, and GitHub will open PRs for you if you enable Dependabot." },
            { label: "Keep your rules file current", detail: "It rots, and a stale one confidently misleads the AI." },
            { label: "Delete what is unused", detail: "Every feature nobody uses is still code you have to keep working." },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-honest-part" title="The part nobody says out loud">
        <P>
          Most projects get few users, and that is a normal outcome rather than a failure. The
          value of shipping is not traffic — it is that <Strong>reality gives you feedback that
          imagination cannot</Strong>.
        </P>
        <P>
          One real user hitting one real bug teaches you more about building software than
          another week of adding features in private. Ship the small thing, watch what happens,
          and let that decide what you build next.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Add error tracking on day one. It is the highest-value post-launch addition.",
          "Convert vague reports into a reproduction you have seen yourself before prompting.",
          "Ask which device and browser — it resolves a surprising share of bugs immediately.",
          "When the last deploy is the obvious cause, revert first and debug second. They are different tasks under different amounts of pressure.",
          "Write a failing test for every real bug, so the fix is permanent rather than a repeat performance.",
          "Analytics tell you which of your features nobody uses. Believe them.",
          "Few users is the normal outcome. The feedback is the point, not the traffic.",
        ]}
      />
    </div>
  );
}
