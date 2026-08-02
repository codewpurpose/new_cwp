/**
 * Card art for the Financial Literacy track.
 *
 * Each cover is a miniature of that lesson's own idea, drawn from the design
 * tokens rather than shipped as an image. That keeps the track free of binary
 * assets, scales cleanly at any size, and means the card actually previews what
 * the reader is about to open.
 */

interface CoverProps {
  slug: string;
}

const W = 160;
const H = 90;
const INK = "var(--learn-ink)";
const MUTED = "var(--learn-ink-subtle)";
const ACCENT = "var(--learn-accent)";
const HIGHLIGHT = "var(--learn-chart-highlight)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--learn-chart-plot)" />
      {children}
    </svg>
  );
}

/* ---------------------------- Part 1 · Money Basics ---------------------------- */

function WhyMoneyRulesMatterCover() {
  return (
    <Frame>
      <circle cx={80} cy={42} r={22} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <text x={80} y={49} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>$</text>
      <path d="M80 66 L80 76 M70 76 L90 76" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
    </Frame>
  );
}

function IncomeAndExpensesCover() {
  return (
    <Frame>
      <path d="M36 30 L64 30 L64 20 L84 36 L64 52 L64 42 L36 42 Z" fill={HIGHLIGHT} stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M124 58 L96 58 L96 48 L76 64 L96 80 L96 70 L124 70 Z" fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.3} strokeLinejoin="round" />
    </Frame>
  );
}

function NeedsVsWantsCover() {
  return (
    <Frame>
      <path d="M80 18 L80 66" stroke={INK} strokeWidth={2} />
      <path d="M46 34 L114 34" stroke={INK} strokeWidth={2} />
      <path d="M46 34 L36 54 L56 54 Z" fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M114 34 L104 50 L124 50 Z" fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M64 72 L96 72" stroke={MUTED} strokeWidth={2} strokeLinecap="round" />
    </Frame>
  );
}

function BuildingABudgetCover() {
  return (
    <Frame>
      {[0, 1, 2, 3].map((i) => {
        const heights = [40, 26, 32, 18];
        const h = heights[i];
        return (
          <rect
            key={i}
            x={34 + i * 24}
            y={70 - h}
            width={16}
            height={h}
            rx={3}
            fill={i === 3 ? ACCENT : HIGHLIGHT}
            stroke={INK}
            strokeWidth={1.1}
          />
        );
      })}
      <path d="M28 70 L134 70" stroke={INK} strokeWidth={1.4} />
    </Frame>
  );
}

/* ------------------------------- Part 2 · Saving ------------------------------- */

function TheEmergencyFundCover() {
  return (
    <Frame>
      <rect x={54} y={26} width={52} height={44} rx={6} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <path d="M80 40 L80 56 M72 48 L88 48" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M54 40 L36 40 M54 56 L36 56" stroke={MUTED} strokeWidth={1.4} />
    </Frame>
  );
}

function HowSavingsAccountsWorkCover() {
  return (
    <Frame>
      <rect x={40} y={30} width={80} height={36} rx={8} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M40 42 h80" stroke={INK} strokeWidth={1.2} />
      <text x={80} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={ACCENT}>APY</text>
    </Frame>
  );
}

function CompoundInterestCover() {
  return (
    <Frame>
      <path d="M32 68 C 56 68 56 40 80 40 C 104 40 104 20 128 20" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M32 68 L128 68" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function AutomatingSavingsCover() {
  return (
    <Frame>
      <circle cx={50} cy={45} r={16} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.3} />
      <path d="M50 39 L50 45 L55 49" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M70 45 L118 45" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <path d="M110 38 L119 45 L110 52" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/* ---------------------------- Part 3 · Credit & Borrowing ---------------------------- */

function WhatACreditScoreCover() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => {
        const widths = [46, 40, 20, 14, 14];
        return (
          <rect
            key={i}
            x={30}
            y={20 + i * 10}
            width={widths[i]}
            height={6}
            rx={3}
            fill={i < 2 ? ACCENT : HIGHLIGHT}
            stroke={INK}
            strokeWidth={0.8}
          />
        );
      })}
      <text x={112} y={30} fontSize={22} fontWeight={700} fill={INK}>720</text>
    </Frame>
  );
}

function HowCreditCardsReallyWorkCover() {
  return (
    <Frame>
      <rect x={34} y={30} width={92} height={54} rx={8} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <rect x={34} y={44} width={92} height={12} fill={INK} opacity={0.85} />
      <circle cx={100} cy={70} r={8} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function TheCostOfCarryingABalanceCover() {
  return (
    <Frame>
      <path d="M32 66 C 56 66 56 30 80 30 C 104 30 104 60 128 60" fill="none" stroke="var(--learn-series-2)" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M32 66 L128 66" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function LoansAndAmortizationCover() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => {
        const interestShare = [0.85, 0.68, 0.5, 0.32, 0.15][i];
        const x = 32 + i * 20;
        const h = 40;
        return (
          <g key={i}>
            <rect x={x} y={64 - h} width={12} height={h * interestShare} fill="var(--learn-series-2)" />
            <rect x={x} y={64 - h * interestShare} width={12} height={h * (1 - interestShare)} fill={ACCENT} />
          </g>
        );
      })}
      <path d="M28 64 L134 64" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

/* ------------------------------- Part 4 · Debt & Risk ------------------------------- */

function GoodDebtBadDebtCover() {
  return (
    <Frame>
      <path d="M40 22 h40 v46 h-40 Z" fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <path d="M50 45 L58 53 L72 34" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 22 h40 v46 h-40 Z" fill="var(--learn-surface)" stroke="var(--learn-series-2)" strokeWidth={1.4} />
      <path d="M100 34 L124 58 M124 34 L100 58" stroke="var(--learn-series-2)" strokeWidth={2.4} strokeLinecap="round" />
    </Frame>
  );
}

function PayingOffDebtStrategicallyCover() {
  return (
    <Frame>
      <path d="M28 66 C 50 66 50 30 80 30" fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M28 66 C 60 66 60 48 80 48 C 100 48 100 66 132 66" fill="none" stroke="var(--learn-series-3)" strokeWidth={2.2} strokeDasharray="5 4" strokeLinecap="round" />
      <path d="M28 66 L132 66" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function InsuranceBasicsCover() {
  return (
    <Frame>
      <path
        d="M80 18 C96 30 100 52 92 68 L80 60 L68 68 C60 52 64 30 80 18Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M70 44 L78 52 L92 34" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function AvoidingScamsCover() {
  return (
    <Frame>
      <path d="M80 20 L124 66 L36 66 Z" fill="var(--learn-danger-bg)" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <text x={80} y={60} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--learn-danger-fg)">!</text>
    </Frame>
  );
}

/* ------------------------------- Part 5 · Investing ------------------------------- */

function WhyInvestingBeatsSavingAloneCover() {
  return (
    <Frame>
      <path d="M32 66 C 56 66 56 50 80 50 C 104 50 104 40 128 40" fill="none" stroke="var(--learn-series-2)" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M32 66 C 60 66 60 40 80 40 C 100 40 100 18 128 18" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M32 66 L128 66" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function StocksBondsAndFundsCover() {
  return (
    <Frame>
      <circle cx={44} cy={45} r={16} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.3} />
      <rect x={70} y={31} width={30} height={28} rx={5} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.3} />
      <path d="M112 30 L132 30 M112 40 L132 40 M112 50 L132 50 M112 60 L132 60" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

function RiskAndDiversificationCover() {
  return (
    <Frame>
      <circle cx={80} cy={44} r={20} fill="none" stroke="var(--learn-series-2)" strokeWidth={2} strokeDasharray="4 3" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = 80 + Math.cos(angle) * 20;
        const y = 44 + Math.sin(angle) * 20;
        return <circle key={i} cx={x} cy={y} r={4.5} fill={ACCENT} stroke={INK} strokeWidth={0.8} />;
      })}
    </Frame>
  );
}

function IndexFundsAndTimeInMarketCover() {
  return (
    <Frame>
      <path d="M32 68 C 50 68 50 55 62 50 C 74 45 78 20 90 20 C 102 20 106 45 118 40 C 124 37 126 32 128 26" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={90} cy={20} r={4} fill="var(--learn-series-2)" />
      <path d="M32 68 L128 68" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

/* ---------------------------- Part 6 · Planning Ahead ---------------------------- */

function RetirementAccountsCover() {
  return (
    <Frame>
      <rect x={44} y={26} width={72} height={44} rx={8} fill="none" stroke={INK} strokeWidth={1.4} strokeDasharray="4 4" />
      <rect x={56} y={40} width={20} height={22} rx={3} fill={ACCENT} />
      <rect x={84} y={30} width={20} height={32} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
    </Frame>
  );
}

function TaxesTheBasicsCover() {
  return (
    <Frame>
      {[0, 1, 2, 3].map((i) => {
        const heights = [14, 22, 30, 38];
        const h = heights[i];
        return (
          <rect key={i} x={34 + i * 22} y={68 - h} width={16} height={h} fill={i < 2 ? ACCENT : "var(--learn-series-2)"} stroke={INK} strokeWidth={0.8} />
        );
      })}
      <path d="M28 68 L134 68" stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function BigPurchasesAndOpportunityCostCover() {
  return (
    <Frame>
      <path d="M32 66 L60 66 L60 40 L88 40 L88 20 L128 20" fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 66 L128 66" stroke={INK} strokeWidth={1.2} />
      <circle cx={128} cy={20} r={4} fill="var(--learn-series-2)" />
    </Frame>
  );
}

function BuildingYourFinancialPlanCover() {
  return (
    <Frame>
      <rect x={46} y={18} width={68} height={54} rx={5} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M56 30 h30 M56 40 h48 M56 50 h48 M56 60 h30" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M78 48 L86 56 L100 38" fill="none" stroke={ACCENT} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "why-money-rules-matter": WhyMoneyRulesMatterCover,
  "income-and-expenses": IncomeAndExpensesCover,
  "needs-vs-wants": NeedsVsWantsCover,
  "building-a-budget": BuildingABudgetCover,
  "the-emergency-fund": TheEmergencyFundCover,
  "how-savings-accounts-work": HowSavingsAccountsWorkCover,
  "compound-interest": CompoundInterestCover,
  "automating-savings": AutomatingSavingsCover,
  "what-a-credit-score-actually-measures": WhatACreditScoreCover,
  "how-credit-cards-really-work": HowCreditCardsReallyWorkCover,
  "the-cost-of-carrying-a-balance": TheCostOfCarryingABalanceCover,
  "loans-and-amortization": LoansAndAmortizationCover,
  "good-debt-bad-debt": GoodDebtBadDebtCover,
  "paying-off-debt-strategically": PayingOffDebtStrategicallyCover,
  "insurance-basics": InsuranceBasicsCover,
  "avoiding-scams-and-predatory-products": AvoidingScamsCover,
  "why-investing-beats-saving-alone": WhyInvestingBeatsSavingAloneCover,
  "stocks-bonds-and-funds": StocksBondsAndFundsCover,
  "risk-and-diversification": RiskAndDiversificationCover,
  "index-funds-and-time-in-market": IndexFundsAndTimeInMarketCover,
  "retirement-accounts": RetirementAccountsCover,
  "taxes-the-basics": TaxesTheBasicsCover,
  "big-purchases-and-opportunity-cost": BigPurchasesAndOpportunityCostCover,
  "building-your-financial-plan": BuildingYourFinancialPlanCover,
};

export function FinancialLiteracyLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? WhyMoneyRulesMatterCover;
  return <Cover />;
}
