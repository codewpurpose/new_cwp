import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhyMoneyRulesMatterLesson } from "@/components/financial-literacy/WhyMoneyRulesMatterLesson";
import { IncomeAndExpensesLesson } from "@/components/financial-literacy/IncomeAndExpensesLesson";
import { NeedsVsWantsLesson } from "@/components/financial-literacy/NeedsVsWantsLesson";
import { BuildingABudgetLesson } from "@/components/financial-literacy/BuildingABudgetLesson";
import { TheEmergencyFundLesson } from "@/components/financial-literacy/TheEmergencyFundLesson";
import { HowSavingsAccountsWorkLesson } from "@/components/financial-literacy/HowSavingsAccountsWorkLesson";
import { CompoundInterestLesson } from "@/components/financial-literacy/CompoundInterestLesson";
import { AutomatingSavingsLesson } from "@/components/financial-literacy/AutomatingSavingsLesson";
import { WhatACreditScoreActuallyMeasuresLesson } from "@/components/financial-literacy/WhatACreditScoreActuallyMeasuresLesson";
import { HowCreditCardsReallyWorkLesson } from "@/components/financial-literacy/HowCreditCardsReallyWorkLesson";
import { TheCostOfCarryingABalanceLesson } from "@/components/financial-literacy/TheCostOfCarryingABalanceLesson";
import { LoansAndAmortizationLesson } from "@/components/financial-literacy/LoansAndAmortizationLesson";
import { GoodDebtBadDebtLesson } from "@/components/financial-literacy/GoodDebtBadDebtLesson";
import { PayingOffDebtStrategicallyLesson } from "@/components/financial-literacy/PayingOffDebtStrategicallyLesson";
import { InsuranceBasicsLesson } from "@/components/financial-literacy/InsuranceBasicsLesson";
import { AvoidingScamsAndPredatoryProductsLesson } from "@/components/financial-literacy/AvoidingScamsAndPredatoryProductsLesson";
import { WhyInvestingBeatsSavingAloneLesson } from "@/components/financial-literacy/WhyInvestingBeatsSavingAloneLesson";
import { StocksBondsAndFundsLesson } from "@/components/financial-literacy/StocksBondsAndFundsLesson";
import { RiskAndDiversificationLesson } from "@/components/financial-literacy/RiskAndDiversificationLesson";
import { IndexFundsAndTimeInMarketLesson } from "@/components/financial-literacy/IndexFundsAndTimeInMarketLesson";
import { RetirementAccountsLesson } from "@/components/financial-literacy/RetirementAccountsLesson";
import { TaxesTheBasicsLesson } from "@/components/financial-literacy/TaxesTheBasicsLesson";
import { BigPurchasesAndOpportunityCostLesson } from "@/components/financial-literacy/BigPurchasesAndOpportunityCostLesson";
import { BuildingYourFinancialPlanLesson } from "@/components/financial-literacy/BuildingYourFinancialPlanLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "financial-literacy" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const FINANCIAL_LITERACY_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "why-money-rules-matter": WhyMoneyRulesMatterLesson,
  "income-and-expenses": IncomeAndExpensesLesson,
  "needs-vs-wants": NeedsVsWantsLesson,
  "building-a-budget": BuildingABudgetLesson,
  "the-emergency-fund": TheEmergencyFundLesson,
  "how-savings-accounts-work": HowSavingsAccountsWorkLesson,
  "compound-interest": CompoundInterestLesson,
  "automating-savings": AutomatingSavingsLesson,
  "what-a-credit-score-actually-measures": WhatACreditScoreActuallyMeasuresLesson,
  "how-credit-cards-really-work": HowCreditCardsReallyWorkLesson,
  "the-cost-of-carrying-a-balance": TheCostOfCarryingABalanceLesson,
  "loans-and-amortization": LoansAndAmortizationLesson,
  "good-debt-bad-debt": GoodDebtBadDebtLesson,
  "paying-off-debt-strategically": PayingOffDebtStrategicallyLesson,
  "insurance-basics": InsuranceBasicsLesson,
  "avoiding-scams-and-predatory-products": AvoidingScamsAndPredatoryProductsLesson,
  "why-investing-beats-saving-alone": WhyInvestingBeatsSavingAloneLesson,
  "stocks-bonds-and-funds": StocksBondsAndFundsLesson,
  "risk-and-diversification": RiskAndDiversificationLesson,
  "index-funds-and-time-in-market": IndexFundsAndTimeInMarketLesson,
  "retirement-accounts": RetirementAccountsLesson,
  "taxes-the-basics": TaxesTheBasicsLesson,
  "big-purchases-and-opportunity-cost": BigPurchasesAndOpportunityCostLesson,
  "building-your-financial-plan": BuildingYourFinancialPlanLesson,
};

export function generateStaticParams() {
  return getChapters(TRACK).map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  if (!chapter) return { title: "Financial Literacy" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/financial-literacy/${slug}/` },
  };
}

export default async function FinancialLiteracyLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? FINANCIAL_LITERACY_LESSON_BODIES[slug] : undefined;
  if (!chapter || !LessonBody) notFound();

  const { prev, next } = getAdjacent(TRACK, slug);

  return (
    <LearnShell
      track={TRACK}
      aside={<LearnToc headings={chapter.headings} />}
      mobileBar={<LearnMobileBar track={TRACK} label={getPositionLabel(TRACK, slug)} />}
    >
      <LearnChapterHeader track={TRACK} chapter={chapter} />

      <LessonGate
        track={TRACK}
        slug={slug}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
      >
        <div className="learn-prose mt-10">
          <LessonBody />
        </div>

      <LessonQuiz
        track={TRACK}
        slug={slug}
        quiz={getQuiz(TRACK, slug)}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        endHref={COURSES_HREF}
      />
      </LessonGate>
    </LearnShell>
  );
}
