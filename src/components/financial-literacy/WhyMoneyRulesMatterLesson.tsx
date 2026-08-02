import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function WhyMoneyRulesMatterLesson() {
  return (
    <div>
      <Lead>
        Nobody sits you down and explains what a credit score actually rewards, or what an
        employer match is worth in real dollars. Most people find out by making the expensive
        version of the mistake first, then patching the gap years later. This track exists so
        you don&apos;t have to.
      </Lead>

      <LessonSection id="money-skills-are-learned-not-inherited" title="Money skills are learned, not inherited">
        <P>
          Some people grow up watching a parent balance a chequebook, negotiate a rate, or
          explain why the emergency fund is untouchable. Most people don&apos;t. Either way,
          nothing about handling money is instinct — it is a set of specific, learnable moves,
          the same way long division is a specific, learnable move rather than a trait you are
          born with.
        </P>
        <P>
          That reframing matters more than it sounds like it should. If personal finance were a
          personality trait, being bad at it would be a fact about you. Since it is a skill, being
          bad at it is just a fact about what you haven&apos;t practised yet.
        </P>
      </LessonSection>

      <LessonSection id="the-cost-of-never-being-taught-this" title="The cost of never being taught this">
        <P>
          The gap shows up in specific, costly ways: a credit card carried at 22% APR because
          nobody explained the grace period, a 401(k) match left unclaimed because nobody
          mentioned it was free money, a car loan signed at a rate that could have been beaten by
          asking one more question. None of these are stupidity. They are the predictable result
          of never once being taught the mechanics.
        </P>
        <Callout tone="note" title="This isn't about willpower">
          Budgeting advice often sounds like a lecture about discipline. Most of the expensive
          mistakes in personal finance are not discipline failures — they are information
          failures. You cannot optimise a decision you don&apos;t know you&apos;re making.
        </Callout>
      </LessonSection>

      <LessonSection id="what-this-track-actually-covers" title="What this track actually covers">
        <P>
          Twenty-four chapters, in the order the decisions actually arrive: a budget that
          survives a real month, an emergency fund sized to your own expenses, how credit is
          actually scored, what debt is worth taking on, and the investing and tax mechanics that
          only start mattering once the basics are handled. Each one ends with something concrete
          — a number you calculated, a plan you can reuse, not just a concept you nodded along to.
        </P>
        <P>
          <Strong>Start wherever you already feel shaky.</Strong> The chapters build on each
          other loosely, but nothing here requires the one before it to make sense.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Handling money well is a set of learnable moves, not a personality trait you either have or don't.",
          "Most expensive money mistakes are information failures, not discipline failures — you can't optimise a decision you don't know you're making.",
          "This track runs in the order real decisions arrive: budgeting, saving, credit, debt, investing, then planning.",
          "Every chapter ends with something concrete you calculated or built, not just a concept you read past.",
        ]}
      />
    </div>
  );
}
