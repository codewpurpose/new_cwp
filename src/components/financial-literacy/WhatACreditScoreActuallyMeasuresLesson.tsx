import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CreditScoreFactors } from "@/components/financial-literacy/CreditScoreFactors";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

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
        <P>
          Two people earning the same salary, with the same savings, can carry very different
          scores — because the score never sees the salary or the savings. It only sees what
          shows up on a credit report: how many accounts, how old, how full, and how reliably
          paid. A person with no credit history at all doesn&apos;t score badly; they score{" "}
          <Strong>nothing</Strong>, because there&apos;s no pattern yet to predict from.
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

      <LessonSection id="what-utilisation-actually-measures" title="What utilisation actually measures">
        <P>
          &ldquo;Amounts owed,&rdquo; the second-heaviest factor at {formatPercent(30)}, is mostly
          one number: <Strong>credit utilisation</Strong> — the balance on a card divided by its
          credit limit, expressed as a percentage. A {formatCurrency(1500)} balance on a{" "}
          {formatCurrency(5000)} limit is {formatPercent(30)} utilisation. The same limit carrying{" "}
          {formatCurrency(500)} is {formatPercent(10)}. The same limit carrying {formatCurrency(4200)}{" "}
          is {formatPercent(84)}, and it doesn&apos;t matter that the card gets paid off in full
          every month — the number the score sees is whatever balance was reported.
        </P>
        <P>
          {formatPercent(30)} is the widely quoted ceiling, but it isn&apos;t a threshold you
          cross safely below and fail above. Utilisation scores on a curve — the excellent range
          is closer to {formatPercent(10)}, and every step down from there helps a little more,
          not just the step across {formatPercent(30)}. Utilisation is also calculated two ways at
          once: per card, and across every card combined, so one maxed-out card can drag the
          score down even while the rest sit near zero.
        </P>
      </LessonSection>

      <LessonSection
        id="the-balance-your-score-sees-isnt-the-one-you-just-paid"
        title="The balance your score sees isn't the one you just paid"
      >
        <P>
          Most issuers report a balance to the credit bureaus once a month, on or near your{" "}
          <Strong>statement closing date</Strong> — not the due date, and not whatever the balance
          happens to be today. Pay your card off in full a week after the statement closes, exactly
          as this track&apos;s credit card lesson recommends, and the balance that already got
          reported was the pre-payment number, sitting on your credit report until next
          month&apos;s statement replaces it.
        </P>
        <P>
          This is why someone with a spotless payment history can still see a utilisation-driven
          dip before a mortgage or car loan application — heavy spending in the weeks before the
          statement closed got reported at its peak, even though it was paid off in full days
          later. The fix, if a big application is coming up, is to pay down the balance{" "}
          <Strong>before</Strong> the statement closes, not just before the due date.
        </P>
        <Callout tone="tip" title="Two due dates that matter for different reasons">
          The payment due date decides whether you pay interest. The statement closing date
          decides what utilisation gets reported. They are rarely the same day, and only one of
          them is on your bill in bold.
        </Callout>
      </LessonSection>

      <LessonSection id="one-late-payment-does-more-damage-than-one-early-payoff-helps" title="One late payment does more damage than one early payoff helps">
        <P>
          The scale is asymmetric. A single payment 30 days or more late can drop a good score by
          60 to 100 points and stay on your report for seven years. Paying a card off a week early
          instead of on the due date does essentially nothing extra for your score — on-time is
          on-time. The lesson isn&apos;t to pay early; it&apos;s that avoiding a single late
          payment is worth more than almost anything else on this list.
        </P>
        <P>
          Negative marks don&apos;t all persist for the same length of time, and the difference
          matters for how urgently to fix each one.
        </P>
        <LabelRows
          rows={[
            { label: "Late payment", text: "Stays on the report for 7 years from the missed payment date, regardless of when it's eventually paid." },
            { label: "Collections account", text: "Also 7 years, counted from the original missed payment that led to it — not from when the collector took it over." },
            { label: "Chapter 7 bankruptcy", text: "Up to 10 years — the longest-lived mark a credit report carries." },
            { label: "Hard inquiry", text: "Visible on the report for 2 years, but its effect on the score itself fades out within about 12 months." },
          ]}
        />
        <Callout tone="warning" title="Set up autopay for at least the minimum">
          Autopay for the minimum payment on every card and loan removes the single most damaging
          mistake from the list of things that can go wrong in a busy month.
        </Callout>
      </LessonSection>

      <LessonSection id="two-myths-worth-retiring" title="Two myths worth retiring">
        <P>
          Two beliefs about credit scores are common, confidently repeated, and wrong. Both lead
          people to either waste money or avoid a genuinely useful habit out of caution that
          isn&apos;t earned.
        </P>
        <ChecklistCard
          title="Myths worth retiring"
          marker="check"
          items={[
            <>
              <Strong>Carrying a balance does not help your score.</Strong> Paying interest on a
              balance carried from month to month has never been a scoring factor — issuers report
              the balance whether or not you pay interest on it. Paying in full every month costs
              nothing and scores identically to carrying one.
            </>,
            <>
              <Strong>Checking your own score is not a hard pull.</Strong> Looking up your score
              through a bank app, a card issuer, or a free credit service is a{" "}
              <Strong>soft inquiry</Strong> — it never appears to lenders and never lowers your
              score, no matter how often you check it.
            </>,
            <>
              <Strong>A hard inquiry only happens when you apply for new credit.</Strong> A
              mortgage application, a new card, a car loan — each triggers one hard inquiry, and a
              handful in a short window is the only version of &ldquo;checking your credit&rdquo;
              that actually costs points.
            </>,
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A credit score predicts repayment likelihood from your credit reports — it isn't a judgement of income, savings, or character.",
          "Payment history and amounts owed together make up 65% of a FICO score, and both are within your direct control.",
          `Utilisation — balance divided by limit — scores on a curve rather than a single ${formatPercent(30)} cutoff, and it's calculated both per card and across every card at once.`,
          "Most issuers report your balance at the statement closing date, not the due date — a big purchase paid off a week later can still show up as high utilisation for a month.",
          "A single payment 30+ days late can cost 60 to 100 points and lingers for seven years, while carrying a balance or checking your own score does nothing to the number either way.",
        ]}
      />
    </div>
  );
}
