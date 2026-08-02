import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";

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
        <P>
          The moves themselves are narrower than the word &ldquo;finance&rdquo; makes them sound:
          read a payslip and know what each deduction is, tell a fixed expense from a variable
          one, size a fund against expenses rather than income, compare an APY to a stated rate.
          None of it requires aptitude with numbers beyond arithmetic you already have. What it
          requires is being shown, once, precisely — which is the entire premise of this track.
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
        <P>
          Run the arithmetic on just one of those and the gap stops being abstract. An employer
          matching 3% of a {formatCurrency(50000)} salary is offering {formatCurrency(1500)} a
          year for opening an account and checking a box. Skip it for five years running and
          you haven&apos;t saved conservatively — you have quietly declined{" "}
          {formatCurrency(7500)} that was never yours to turn down in the first place.
        </P>
        <Callout tone="note" title="This isn't about willpower">
          Budgeting advice often sounds like a lecture about discipline. Most of the expensive
          mistakes in personal finance are not discipline failures — they are information
          failures. You cannot optimise a decision you don&apos;t know you&apos;re making.
        </Callout>
      </LessonSection>

      <LessonSection id="present-bias-has-a-specific-shape" title="Present bias has a specific shape">
        <P>
          There is a name for the psychological pattern doing most of the actual damage:{" "}
          <Strong>present bias</Strong>. Offer someone {formatCurrency(50)} today or{" "}
          {formatCurrency(100)} in a year, and a large share of people choose the{" "}
          {formatCurrency(50)} — the future money is real on paper, but it doesn&apos;t feel real
          yet. Move the same choice a year further out — {formatCurrency(50)} in five years or{" "}
          {formatCurrency(100)} in six — and most of those same people flip to preferring the{" "}
          {formatCurrency(100)}. Nothing about the trade changed. Only how close &ldquo;now&rdquo;
          was to the decision.
        </P>
        <P>
          That is what makes it a specific, testable pattern rather than a vague claim about
          discipline. It predicts something concrete: a benefit or a cost gets undervalued the
          moment it is available immediately, and valued normally the moment it isn&apos;t. A
          401(k) match skipped this month and a credit card balance carried this month are the
          same bias wearing two different outfits — a future consequence losing weight simply for
          being in the future.
        </P>
        <Callout tone="tip" title="Naming it is the fix that discipline isn't">
          Present bias doesn&apos;t go away because you resolve to try harder — it is a feature of
          how the brain weighs time, not a character defect. What actually works is removing the
          moment of choice: automating the 401(k) contribution and the savings transfer so the
          biased decision never has to be made in real time, on purpose, under pressure. Chapter
          eight covers exactly that mechanism.
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
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Money Basics",
              detail:
                "Where your money actually goes, the line between a need and a want, and a budget that survives contact with a real month.",
            },
            {
              label: "Saving",
              detail:
                "The fund you hope to never use, how a savings account actually earns, and why starting early beats a bigger rate.",
            },
            {
              label: "Credit & Borrowing",
              detail:
                "What a credit score is actually measuring, how a credit card really works, and what a loan payment is made of.",
            },
            {
              label: "Debt & Risk",
              detail:
                "Telling good debt from bad, paying it off on purpose, and the insurance and scam-spotting instincts that protect the rest.",
            },
            {
              label: "Investing",
              detail:
                "Why cash alone loses ground, the building blocks of a portfolio, and what diversification does and doesn't protect against.",
            },
            {
              label: "Planning Ahead",
              detail:
                "Retirement accounts, what a tax bracket actually taxes, and turning twenty-three lessons into one page you'll actually keep.",
            },
          ]}
        />
        <P>
          <Strong>Start wherever you already feel shaky.</Strong> The chapters build on each
          other loosely, but nothing here requires the one before it to make sense.
        </P>
        <ChecklistCard
          title="How to actually use this track"
          items={[
            "Read the chapter about a decision before you make it, not after — the value sits in front of the mistake, not behind it.",
            "Do the exercise where there is one. A number you calculated sticks; a concept you read past doesn't.",
            "Skip a chapter that's already familiar. The prerequisites listed in the sidebar are the only ones that actually require order.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Handling money well is a set of learnable moves, not a personality trait you either have or don't.",
          "Most expensive money mistakes are information failures, not discipline failures — you can't optimise a decision you don't know you're making.",
          "Present bias is a documented, testable pattern: the same trade-off looks different depending on how close 'now' is, which is why automation beats willpower.",
          "This track runs in the order real decisions arrive: budgeting, saving, credit, debt, investing, then planning.",
          "Every chapter ends with something concrete you calculated or built, not just a concept you read past.",
        ]}
      />
    </div>
  );
}
