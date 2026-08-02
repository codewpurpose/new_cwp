import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";

export function NeedsVsWantsLesson() {
  return (
    <div>
      <Lead>
        Rent is a need. A concert ticket is a want. Everyone agrees on the two ends of that line
        and disagrees about almost everything in the middle — and the disagreement is not a
        character flaw, it&apos;s the actual shape of the problem.
      </Lead>

      <LessonSection id="a-need-keeps-you-fed-housed-and-employed" title="A need keeps you fed, housed, and employed">
        <P>
          A need is something whose absence creates an immediate, practical problem: you lose
          somewhere to live, you can&apos;t get to work, you can&apos;t eat. Housing, groceries,
          utilities, transportation to your job, and the minimum payment on existing debt all
          qualify. Notice what&apos;s doing the work in that definition — it&apos;s not
          <Strong> importance</Strong>, it&apos;s <Strong>consequence</Strong>.
        </P>
        <P>
          That test is stricter than it feels. A {formatCurrency(6)}-a-day coffee habit adds up
          to about {formatCurrency(165)} a month — real money, and a real routine — but it fails
          the test cleanly. Skip it for a week and nothing breaks except your morning habit. The
          question was never how much you want something. It was always what happens if you
          don&apos;t get it.
        </P>
      </LessonSection>

      <LessonSection id="a-want-survives-being-delayed" title="A want survives being delayed">
        <P>
          A want makes life better without anything breaking if it waits. A nicer apartment than
          the one you need, a car nicer than the one that gets you to work, a streaming
          subscription, a night out — none of these fail catastrophically if postponed a month.
          That&apos;s the test: not &ldquo;do I want this less than the alternative,&rdquo; but{" "}
          <Strong>&ldquo;does delaying this cause an actual problem?&rdquo;</Strong>
        </P>
        <CompareGrid
          items={[
            {
              title: "Need",
              tone: "neutral",
              children: <P>Groceries. The bus pass that gets you to your shift. This month&apos;s rent.</P>,
            },
            {
              title: "Want",
              tone: "positive",
              children: <P>Takeout instead of groceries. A rideshare instead of the bus. A bigger apartment than this one.</P>,
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="hedonic-adaptation-quietly-turns-wants-into-needs" title="Hedonic adaptation quietly turns wants into needs">
        <P>
          There is a documented psychological pattern that explains why the line drifts over
          time even when nothing about your circumstances has changed:{" "}
          <Strong>hedonic adaptation</Strong>. The extra satisfaction from an upgrade fades back
          toward your prior baseline within weeks — but the new spending level doesn&apos;t fade
          with it. It just becomes normal, and normal is very hard to notice, let alone reverse.
        </P>
        <P>
          Upgrade a {formatCurrency(60)}-a-month phone plan to a {formatCurrency(110)} one for
          more data, and within a couple of billing cycles the extra {formatCurrency(50)} stops
          registering as a decision at all. Try reverting to the old plan six months later and it
          feels like a real loss, even though that plan covered everything you actually needed
          the day before you upgraded. Nothing about your need changed. Only your baseline did.
        </P>
        <Callout tone="warning" title="The want stops applying on the way back down">
          The test in the previous section — does delaying this cause a problem — was built for
          a purchase you haven&apos;t made yet. It gets harder to apply once something is already
          routine, because cancelling it now competes with loss aversion, not just habit. That
          asymmetry is exactly why &ldquo;wants&rdquo; rarely uninstall themselves without a
          deliberate decision to go looking for them.
        </Callout>
      </LessonSection>

      <LessonSection id="the-line-moves-with-circumstances-not-morals" title="The line moves with circumstances, not morals">
        <P>
          A car is a want for someone who can walk to work and a need for someone whose job is
          thirty miles from the nearest bus stop. A gym membership is a want in general and closer
          to a need for someone managing a health condition their doctor has told them to exercise
          for. The category depends on your actual circumstances, not on a universal rulebook —
          and it is not anyone else&apos;s place to redraw your line for you.
        </P>
        <Callout tone="note" title="Where this actually gets used">
          The line matters most when a budget is tight and something has to give. The next
          chapter builds that budget — this distinction is the tool you&apos;ll reach for first
          when a category runs over.
        </Callout>
      </LessonSection>

      <LessonSection id="a-three-question-test-for-the-blurry-middle" title="A three-question test for the blurry middle">
        <P>
          Most purchases don&apos;t sit cleanly at either end. For the ones stuck in the middle,
          three questions do more work than any amount of guilt or willpower:
        </P>
        <StepList
          steps={[
            {
              label: "Does its absence create an actual problem within thirty days?",
              detail: "Not a worse mood — an actual, specific problem. If the honest answer is no, it's a want, however habitual it feels.",
            },
            {
              label: "Would you choose to buy it today, at full price, if you didn't already have it?",
              detail: "This catches hedonic adaptation directly. Sunk enjoyment from having had it doesn't count toward the answer.",
            },
            {
              label: "Is there a cheaper version that does the identical job?",
              detail: "If yes, the base version is the need and the gap between the two prices is the want, even inside one purchase.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A need is defined by consequence, not importance — its absence creates an immediate practical problem.",
          "A want survives being delayed a month without anything actually breaking.",
          "Hedonic adaptation is a documented pattern: the extra satisfaction from an upgrade fades within weeks, but the new spending becomes the new normal, and reverting starts to feel like a loss rather than a neutral choice.",
          "The test for either is 'what happens if this waits, and would I choose it again today at full price' — not 'how much do I want it'.",
          "The line between the two moves with your actual circumstances — a car or a gym membership can be a need for one person and a want for another.",
        ]}
      />
    </div>
  );
}
