import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { StepList } from "@/components/learn/primitives/StepList";

export function SteeringLesson() {
  return (
    <div>
      <Lead>
        Watching an AI go the wrong way is uncomfortable, and most people respond by waiting
        politely for it to finish. Do not. Interrupting early is cheap; letting a wrong
        approach complete is expensive, and then you have to argue it back out.
      </Lead>

      <LessonSection id="what-off-course-actually-looks-like" title="What off course actually looks like">
        <P>
          &ldquo;Wrong&rdquo; rarely announces itself with an error. Long before the code fails
          to run, there are signals — if you are watching for them rather than waiting for a red
          terminal to tell you.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "Touching files you did not name",
              tone: "caution",
              children: (
                <p>
                  Ask why before it goes further. Sometimes it found a real dependency you
                  missed. More often it is guessing at scope.
                </p>
              ),
            },
            {
              title: "Inventing a function or API that is not there",
              tone: "caution",
              children: (
                <p>
                  A sign it is pattern-matching from training data instead of reading your code —
                  the same mechanism behind the hallucinated imports from the chapter on what the
                  AI can see.
                </p>
              ),
            },
            {
              title: "Fixing something you did not ask about",
              tone: "caution",
              children: (
                <p>
                  It found a real bug on the way, or it is filling silence with visible progress.
                  Either way it is now solving two problems on your one prompt&apos;s budget.
                </p>
              ),
            },
            {
              title: "A diff that keeps growing while you watch",
              tone: "caution",
              children: (
                <p>
                  Each additional file is another decision built on the one you have not yet
                  confirmed. The longer you wait, the more expensive the interrupt gets.
                </p>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="interrupt-early" title="Interrupt early">
        <P>
          Every agent-style tool lets you stop it mid-run — usually Escape or Ctrl+C. Use it
          the moment you see the approach is wrong, not after.
        </P>
        <P>
          The instinct to wait comes from conversational politeness that does not apply here.
          There is nobody to offend, and every additional file it touches is another thing you
          will need to review or revert.
        </P>
        <CodeBlock
          variant="prompt"
          label="Stop, then redirect"
          code={`Stop — you are editing the wrong file. The cart total is
calculated in src/lib/pricing.ts, not in the component.
Start again there.`}
        />
      </LessonSection>

      <LessonSection id="redirect-with-specifics" title="Redirect with specifics, not vibes">
        <P>
          &ldquo;No, that&rsquo;s wrong&rdquo; gives the model nothing to work with. It will
          try a different guess, which is as likely to be wrong as the first. Say what was
          wrong and what you want instead.
        </P>
        <StepList
          steps={[
            {
              label: "Weak",
              detail: "“That's not right, try again.”",
            },
            {
              label: "Better",
              detail: "“You used a global variable for the theme. Use React context instead, like ThemeProvider already does in src/app/providers.tsx.”",
            },
          ]}
        />
        <P>
          The second version costs ten more seconds and removes an entire round trip. It also
          removes the failure mode where the model cycles through three wrong approaches
          because it never learned which dimension it got wrong.
        </P>
      </LessonSection>

      <LessonSection id="rejecting-well" title="Rejecting well">
        <P>
          You do not have to accept a change to learn from it. Reading a rejected diff often
          tells you the prompt was ambiguous, which is worth knowing before you rewrite it.
        </P>
        <ChecklistCard
          title="Ask before rejecting"
          items={[
            "Did it do what I literally asked, rather than what I meant? Then fix the prompt, not the code.",
            "Did it invent something it could not see? Then attach the real file and retry.",
            "Is it right but not how I would do it? Consider whether that matters before spending prompts on style.",
            "Is it right and I simply do not understand it? Ask for an explanation instead of rejecting.",
          ]}
        />
      </LessonSection>

      <LessonSection id="the-two-strike-rule" title="The two-strike rule">
        <P>
          This is the most useful habit in the chapter. If two consecutive attempts fail to fix
          the same problem, <Strong>stop prompting</Strong>. Do not send a third.
        </P>
        <P>
          Two failures almost always mean the model is missing context rather than lacking
          ability, and a third prompt into the same hole produces a third variation of the same
          misunderstanding — often while adding new damage on top.
        </P>
        <Callout tone="warning" title="What to do instead">
          Run <InlineCode>git restore .</InlineCode> to get back to your last commit. Then
          either attach the file it was clearly missing, break the task into a smaller step, or
          escalate to a reasoning model. All three beat prompting again.
        </Callout>
        <P>
          What that looks like in practice, on a real bug:
        </P>
        <RevealCard
          summaryTag="Attempts one and two"
          summary={
            <>
              Both replies patched the symptom in <InlineCode>Cart.tsx</InlineCode> — clamping
              the total to zero whenever it went negative — without touching the discount
              calculation that was actually producing the negative number.
            </>
          }
          detailTag="What changed for attempt three"
          detail={
            <>
              Restoring, then attaching the real discount logic in{" "}
              <InlineCode>pricing.ts</InlineCode>, gave it the one file it had been guessing
              about. The fix landed in a single message once it could see the actual bug instead
              of a symptom of it.
            </>
          }
          footnote="Same model, same bug. The difference was the input it was given, not a cleverer prompt for the same input."
        />
      </LessonSection>

      <LessonSection id="restart-the-conversation" title="Restart the conversation, not just the prompt">
        <P>
          Long threads accumulate wrong turns. Once a conversation contains three rejected
          approaches, those rejections are still in the context — the model is now steering
          around its own past mistakes rather than solving your problem cleanly.
        </P>
        <P>
          Starting fresh feels like losing progress. It is not: your code is on disk, and a new
          conversation with one good prompt that describes the current state will usually beat
          twenty messages of accumulated correction.
        </P>
        <CodeBlock
          variant="prompt"
          label="A good restart prompt"
          code={`Fresh start. The cart total in src/lib/pricing.ts double-counts
discounts when an item has both a percentage and a fixed
discount. Read that file and the tests in pricing.test.ts,
then explain the cause before fixing anything.`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Interrupt the moment the approach is wrong. There is nobody to be polite to.",
          "Say what was wrong and what to do instead — “try again” just buys another guess.",
          "A rejected diff often means the prompt was ambiguous. Fix the prompt.",
          "Two failures in a row: restore, add context, and change the approach. Never send a third.",
          "When a thread fills with wrong turns, start a new one. The code is safe on disk.",
        ]}
      />
    </div>
  );
}
