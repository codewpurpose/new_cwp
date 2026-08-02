import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CreditScoreFactors } from "@/components/financial-literacy/CreditScoreFactors";
import { formatPercent } from "@/lib/finance-format";

export function WhatACreditScoreActuallyMeasuresLesson() {
  return (
    <div>
      <Lead>
        A credit score is not a grade on how responsible you are as a person. It is a lender&apos;s
        prediction of one specific thing — how likely you are to repay — built from five factors
        that are not weighted anywhere close to equally.
      </Lead>

      <LessonSection id="a-score-is-a-prediction-not-a-report-card" title="A score is a prediction, not a report card">
        <P>
          A FICO score, the most widely used model, runs from 300 to 850 and is calculated purely
          from what&apos;s on your credit reports: accounts, balances, and payment history. It
          says nothing about your income, your savings, or your character — only about patterns
          in borrowing and repaying that have historically predicted whether someone pays back
          what they owe.
        </P>
      </LessonSection>

      <LessonSection id="the-five-factors-and-how-much-each-one-weighs" title="The five factors, and how much each one weighs">
        <P>
          Select a factor below to see what it actually measures. Notice how lopsided the weights
          are — the top two factors alone account for {formatPercent(65)} of the score, and both
          are things you have direct, ongoing control over.
        </P>
      </LessonSection>

      <CreditScoreFactors />

      <LessonSection id="one-late-payment-does-more-damage-than-one-early-payoff-helps" title="One late payment does more damage than one early payoff helps">
        <P>
          The scale is asymmetric. A single payment 30 days or more late can drop a good score by
          60 to 100 points and stay on your report for seven years. Paying a card off a week early
          instead of on the due date does essentially nothing extra for your score — on-time is
          on-time. The lesson isn&apos;t to pay early; it&apos;s that avoiding a single late
          payment is worth more than almost anything else on this list.
        </P>
        <Callout tone="warning" title="Set up autopay for at least the minimum">
          Autopay for the minimum payment on every card and loan removes the single most damaging
          mistake from the list of things that can go wrong in a busy month.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A credit score predicts repayment likelihood from your credit reports — it isn't a judgement of income, savings, or character.",
          "Payment history and amounts owed together make up 65% of a FICO score, and both are within your direct control.",
          "Length of credit history only improves with time, which is why closing your oldest card can quietly hurt a score.",
          "A single payment 30+ days late can cost 60 to 100 points and lingers for seven years — avoiding that is worth more than any other single move.",
        ]}
      />
    </div>
  );
}
