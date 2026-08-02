import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

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

      <TakeawayCard
        items={[
          "A need is defined by consequence, not importance — its absence creates an immediate practical problem.",
          "A want survives being delayed a month without anything actually breaking.",
          "The test for either is 'what happens if this waits', not 'how much do I want it'.",
          "The line between the two moves with your actual circumstances — a car or a gym membership can be a need for one person and a want for another.",
        ]}
      />
    </div>
  );
}
