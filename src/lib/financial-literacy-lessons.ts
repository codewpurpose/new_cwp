import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_FINANCIAL_LITERACY_HREF } from "@/lib/links";

/**
 * The Financial Literacy track: twenty-four lessons running from why a
 * budget is worth building at all through taxes, investing, and a one-page
 * financial plan.
 *
 * Written natively as LearnChapters (rather than adapted from a thinner shape)
 * so the track gets the same sidebar, table of contents, and prev/next pager as
 * the ML, Vibe Coding, and Python chapters.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const FINANCIAL_LITERACY_PARTS: readonly LearnPart[] = [
  {
    id: "foundations",
    number: 1,
    title: "Money Basics",
    summary:
      "Where your money actually goes, the line between a need and a want, and a budget that survives contact with a real month.",
  },
  {
    id: "saving",
    number: 2,
    title: "Saving",
    summary:
      "The fund you hope to never use, how a savings account actually earns, and why starting early beats a bigger rate.",
  },
  {
    id: "credit",
    number: 3,
    title: "Credit & Borrowing",
    summary:
      "What a credit score is actually measuring, how a credit card really works, and what a loan payment is made of.",
  },
  {
    id: "debt",
    number: 4,
    title: "Debt & Risk",
    summary:
      "Telling good debt from bad, paying it off on purpose, and the insurance and scam-spotting instincts that protect the rest.",
  },
  {
    id: "investing",
    number: 5,
    title: "Investing",
    summary:
      "Why cash alone loses ground, the building blocks of a portfolio, and what diversification does and doesn't protect against.",
  },
  {
    id: "planning",
    number: 6,
    title: "Planning Ahead",
    summary:
      "Retirement accounts, what a tax bracket actually taxes, and turning twenty-three lessons into one page you'll actually keep.",
  },
];

export const FINANCIAL_LITERACY_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "why-money-rules-matter",
    partId: "foundations",
    order: 1,
    title: "Why Personal Finance Is a Skill, Not a Personality Trait",
    description:
      "Nobody is born knowing what a credit score rewards or what a 401(k) match is worth. Every part of this track is a skill you can learn on a schedule you control, starting now instead of after the first expensive mistake.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "money-skills-are-learned-not-inherited", text: "Money skills are learned, not inherited", level: 2 },
      { id: "the-cost-of-never-being-taught-this", text: "The cost of never being taught this", level: 2 },
      { id: "what-this-track-actually-covers", text: "What this track actually covers", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "income-and-expenses",
    partId: "foundations",
    order: 2,
    title: "Where Your Money Actually Goes",
    description:
      "Most people can name their salary to the dollar and their monthly spending to the nearest few hundred. Track one real month, and the gap between those two numbers usually turns out to be the most useful thing you learn all year.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "income-is-everything-that-comes-in", text: "Income is everything that comes in", level: 2 },
      { id: "expenses-split-into-fixed-and-variable", text: "Expenses split into fixed and variable", level: 2 },
      { id: "tracking-for-one-month-changes-what-you-believe", text: "Tracking for one month changes what you believe", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "needs-vs-wants",
    partId: "foundations",
    order: 3,
    title: "The Line Everyone Draws Differently",
    description:
      "Rent is a need. A concert ticket is a want. Almost everything else sits somewhere in between, and the line moves with your actual circumstances, not with anyone else's opinion of what you deserve.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "a-need-keeps-you-fed-housed-and-employed", text: "A need keeps you fed, housed, and employed", level: 2 },
      { id: "a-want-survives-being-delayed", text: "A want survives being delayed", level: 2 },
      { id: "the-line-moves-with-circumstances-not-morals", text: "The line moves with circumstances, not morals", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "building-a-budget",
    partId: "foundations",
    order: 4,
    title: "A Budget Is a Plan, Not a Punishment",
    description:
      "A budget has one job: decide where money goes before it's already gone. Build one live below, watch the categories fight for the same dollars, and see what actually happens when they don't add up.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-budget-is-just-income-minus-planned-spending", text: "A budget is just income minus planned spending", level: 2 },
      { id: "the-50-30-20-split-as-a-starting-point-not-a-rule", text: "The 50/30/20 split as a starting point, not a rule", level: 2 },
      { id: "what-happens-when-the-categories-dont-add-up", text: "What happens when the categories don't add up", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-emergency-fund",
    partId: "saving",
    order: 5,
    title: "The Fund You Hope to Never Use",
    description:
      "An emergency fund doesn't grow your money — it stops one bad month from becoming debt. See how many months of real expenses your own numbers would cover, and why that number matters more than the balance itself.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Saving", "Interactive"],
    headings: [
      { id: "an-emergency-fund-is-insurance-you-self-underwrite", text: "An emergency fund is insurance you self-underwrite", level: 2 },
      { id: "three-to-six-months-of-expenses-not-income", text: "Three to six months of expenses, not income", level: 2 },
      { id: "where-it-should-live-while-it-waits", text: "Where it should live while it waits", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-savings-accounts-work",
    partId: "saving",
    order: 6,
    title: "Where Saved Money Actually Lives",
    description:
      "A savings account is a loan you make to your bank, and the bank pays you interest for the privilege. The rate it pays is the entire difference between an account that helps and one that just holds.",
    level: "beginner",
    minutes: 7,
    prerequisites: [],
    tags: ["Saving"],
    headings: [
      { id: "a-savings-account-is-a-loan-to-the-bank", text: "A savings account is a loan to the bank", level: 2 },
      { id: "apy-is-the-rate-that-actually-matters", text: "APY is the rate that actually matters", level: 2 },
      { id: "why-a-high-yield-account-beats-a-checking-account", text: "Why a high-yield account beats a checking account", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "compound-interest",
    partId: "saving",
    order: 7,
    title: "The Math That Rewards Starting Early",
    description:
      "Interest earning interest on itself sounds small until a chart makes it visible. Move the starting age ten years earlier below, and watch the same monthly amount turn into a completely different number.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Saving", "Interactive"],
    headings: [
      { id: "interest-earning-interest-on-itself", text: "Interest earning interest on itself", level: 2 },
      { id: "the-same-monthly-amount-ten-years-earlier", text: "The same monthly amount, ten years earlier", level: 2 },
      { id: "why-the-rate-matters-less-than-the-runway", text: "Why the rate matters less than the runway", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "automating-savings",
    partId: "saving",
    order: 8,
    title: "Paying Yourself Before Anyone Else",
    description:
      "A transfer that happens automatically on payday never has to survive a moment of temptation later in the month. That's the entire mechanism — not more willpower, just one less decision to make each time.",
    level: "beginner",
    minutes: 6,
    prerequisites: [],
    tags: ["Saving"],
    headings: [
      { id: "a-transfer-that-happens-before-you-can-spend-it", text: "A transfer that happens before you can spend it", level: 2 },
      { id: "why-willpower-loses-to-automation", text: "Why willpower loses to automation", level: 2 },
      { id: "starting-small-and-still-getting-somewhere", text: "Starting small and still getting somewhere", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-a-credit-score-actually-measures",
    partId: "credit",
    order: 9,
    title: "What a Credit Score Actually Measures",
    description:
      "A credit score isn't a report card on your character — it's a lender's prediction of how likely you are to repay. Five factors build that prediction, and they are not weighted anywhere close to equally.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Credit", "Interactive"],
    headings: [
      { id: "a-score-is-a-prediction-not-a-report-card", text: "A score is a prediction, not a report card", level: 2 },
      { id: "the-five-factors-and-how-much-each-one-weighs", text: "The five factors, and how much each one weighs", level: 2 },
      { id: "one-late-payment-does-more-damage-than-one-early-payoff-helps", text: "One late payment does more damage than one early payoff helps", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-credit-cards-really-work",
    partId: "credit",
    order: 10,
    title: "How Credit Cards Really Work",
    description:
      "Every swipe is a short-term loan, due in full at the end of the statement period — interest-free, if you pay it off. Miss that grace period once, and the entire arrangement changes underneath you.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Credit", "Interactive"],
    headings: [
      { id: "a-credit-card-is-a-short-term-loan-every-purchase", text: "A credit card is a short-term loan, every purchase", level: 2 },
      { id: "the-grace-period-is-the-entire-trick", text: "The grace period is the entire trick", level: 2 },
      { id: "why-the-statement-balance-and-the-current-balance-differ", text: "Why the statement balance and the current balance differ", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-cost-of-carrying-a-balance",
    partId: "credit",
    order: 11,
    title: "The Cost of Carrying a Balance",
    description:
      "Card interest compounds daily on most cards, and the minimum payment is calculated to keep that going as long as possible. Watch what carrying $1,000 actually costs over a year of minimum payments alone.",
    level: "intermediate",
    minutes: 9,
    prerequisites: ["how-credit-cards-really-work"],
    tags: ["Credit", "Interactive"],
    headings: [
      { id: "apr-compounds-daily-on-most-cards", text: "APR compounds daily on most cards", level: 2 },
      { id: "the-minimum-payment-is-designed-to-be-slow", text: "The minimum payment is designed to be slow", level: 2 },
      { id: "what-carrying-1000-actually-costs-over-a-year", text: "What carrying $1,000 actually costs over a year", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "loans-and-amortization",
    partId: "credit",
    order: 12,
    title: "Loans and Amortization",
    description:
      "Every loan payment splits between interest and principal, and that split moves every month. Step through an amortization schedule below and see why an early extra payment is worth so much more than a late one.",
    level: "intermediate",
    minutes: 10,
    prerequisites: [],
    tags: ["Credit", "Interactive"],
    headings: [
      { id: "every-payment-splits-between-interest-and-principal", text: "Every payment splits between interest and principal", level: 2 },
      { id: "early-payments-are-mostly-interest", text: "Early payments are mostly interest", level: 2 },
      { id: "why-an-extra-payment-early-saves-more-than-one-late", text: "Why an extra payment early saves more than one late", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "good-debt-bad-debt",
    partId: "debt",
    order: 13,
    title: "Good Debt, Bad Debt",
    description:
      "The same word covers a mortgage on an appreciating home and a payday loan against next week's paycheck. The label depends entirely on what the debt buys and the terms it buys it on, not on the word itself.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["Debt & Risk"],
    headings: [
      { id: "debt-that-builds-an-asset-or-your-earning-power", text: "Debt that builds an asset, or your earning power", level: 2 },
      { id: "debt-that-buys-something-already-losing-value", text: "Debt that buys something already losing value", level: 2 },
      { id: "the-same-loan-can-be-either-depending-on-the-terms", text: "The same loan can be either, depending on the terms", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "paying-off-debt-strategically",
    partId: "debt",
    order: 14,
    title: "Paying Off Debt Strategically",
    description:
      "The avalanche method targets the highest interest rate first and saves the most money on paper. The snowball method targets the smallest balance first and tends to actually get finished. Both are legitimate — they're optimizing for different things.",
    level: "intermediate",
    minutes: 9,
    prerequisites: ["what-a-credit-score-actually-measures"],
    tags: ["Debt & Risk", "Interactive"],
    headings: [
      { id: "the-avalanche-method-attacks-the-highest-rate-first", text: "The avalanche method attacks the highest rate first", level: 2 },
      { id: "the-snowball-method-attacks-the-smallest-balance-first", text: "The snowball method attacks the smallest balance first", level: 2 },
      { id: "the-math-favors-one-the-motivation-favors-the-other", text: "The math favors one, the motivation favors the other", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "insurance-basics",
    partId: "debt",
    order: 15,
    title: "Insurance Basics",
    description:
      "Insurance trades a small, certain cost today for protection against a large, uncertain one later. A premium, a deductible, and a payout are the only three pieces you actually need to compare any policy.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["Debt & Risk"],
    headings: [
      { id: "insurance-trades-a-small-certain-cost-for-a-large-uncertain-one", text: "Insurance trades a small, certain cost for a large, uncertain one", level: 2 },
      { id: "a-premium-a-deductible-and-a-payout", text: "A premium, a deductible, and a payout", level: 2 },
      { id: "the-coverage-thats-hardest-to-skip", text: "The coverage that's hardest to skip", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "avoiding-scams-and-predatory-products",
    partId: "debt",
    order: 16,
    title: "Avoiding Scams and Predatory Products",
    description:
      "Urgency and secrecy are the two biggest tells a financial offer is designed to be taken advantage of, not taken up on. A short checklist catches most of them before a signature does any damage.",
    level: "intermediate",
    minutes: 7,
    prerequisites: [],
    tags: ["Debt & Risk"],
    headings: [
      { id: "urgency-and-secrecy-are-the-two-biggest-tells", text: "Urgency and secrecy are the two biggest tells", level: 2 },
      { id: "a-loan-designed-to-be-impossible-to-pay-off", text: "A loan designed to be impossible to pay off", level: 2 },
      { id: "the-checklist-that-catches-most-of-them", text: "The checklist that catches most of them", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "why-investing-beats-saving-alone",
    partId: "investing",
    order: 17,
    title: "Why Investing Beats Saving Alone",
    description:
      "Inflation quietly shrinks cash that just sits, even in a savings account earning a little interest. Investing accepts more risk in exchange for a real shot at outrunning that shrinkage over time.",
    level: "intermediate",
    minutes: 8,
    prerequisites: ["compound-interest"],
    tags: ["Investing", "Interactive"],
    headings: [
      { id: "inflation-quietly-shrinks-cash-that-just-sits", text: "Inflation quietly shrinks cash that just sits", level: 2 },
      { id: "investing-is-accepting-risk-for-a-chance-at-a-higher-return", text: "Investing is accepting risk for a chance at a higher return", level: 2 },
      { id: "why-the-emergency-fund-stays-in-savings-anyway", text: "Why the emergency fund stays in savings anyway", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "stocks-bonds-and-funds",
    partId: "investing",
    order: 18,
    title: "Stocks, Bonds, and Funds",
    description:
      "A stock is a small piece of ownership in a company. A bond is a loan you make to one. A fund bundles hundreds of either into a single purchase — three building blocks, and almost every portfolio is some mix of them.",
    level: "intermediate",
    minutes: 8,
    prerequisites: [],
    tags: ["Investing"],
    headings: [
      { id: "a-stock-is-a-small-piece-of-ownership", text: "A stock is a small piece of ownership", level: 2 },
      { id: "a-bond-is-a-loan-you-make-to-someone-else", text: "A bond is a loan you make to someone else", level: 2 },
      { id: "a-fund-is-hundreds-of-both-in-one-purchase", text: "A fund is hundreds of both in one purchase", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "risk-and-diversification",
    partId: "investing",
    order: 19,
    title: "Risk and Diversification",
    description:
      "Putting everything into one company means one bad outcome costs everything. Spreading it across many doesn't remove that risk — it reshapes it into something far less likely to wipe you out at once.",
    level: "advanced",
    minutes: 9,
    prerequisites: [],
    tags: ["Investing", "Interactive"],
    headings: [
      { id: "concentration-means-one-bad-outcome-costs-everything", text: "Concentration means one bad outcome costs everything", level: 2 },
      { id: "diversification-spreads-that-single-point-of-failure", text: "Diversification spreads that single point of failure", level: 2 },
      { id: "diversification-doesnt-remove-risk-it-reshapes-it", text: "Diversification doesn't remove risk, it reshapes it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "index-funds-and-time-in-market",
    partId: "investing",
    order: 20,
    title: "Index Funds and Time in the Market",
    description:
      "An index fund just buys the whole market instead of betting on which piece of it wins. Try to time it by dodging the worst days below, and discover you can't do that without also missing the best ones.",
    level: "advanced",
    minutes: 10,
    prerequisites: ["compound-interest"],
    tags: ["Investing", "Interactive"],
    headings: [
      { id: "an-index-fund-just-buys-the-whole-market", text: "An index fund just buys the whole market", level: 2 },
      { id: "time-in-the-market-beats-timing-the-market", text: "Time in the market beats timing the market", level: 2 },
      { id: "missing-the-ten-best-days-changes-everything", text: "Missing the ten best days changes everything", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "retirement-accounts",
    partId: "planning",
    order: 21,
    title: "Retirement Accounts",
    description:
      "A 401(k) or IRA isn't an investment itself — it's a tax-advantaged wrapper around one. Skip an employer match inside it, and you're turning down money that was never yours to decline in the first place.",
    level: "advanced",
    minutes: 10,
    prerequisites: ["compound-interest"],
    tags: ["Planning", "Interactive"],
    headings: [
      { id: "a-retirement-account-is-a-tax-advantaged-wrapper-not-an-investment-itself", text: "A retirement account is a tax-advantaged wrapper, not an investment itself", level: 2 },
      { id: "an-employer-match-is-money-left-on-the-table-if-skipped", text: "An employer match is money left on the table if skipped", level: 2 },
      { id: "starting-at-twenty-five-versus-thirty-five", text: "Starting at twenty-five versus thirty-five", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "taxes-the-basics",
    partId: "planning",
    order: 22,
    title: "Taxes: The Basics",
    description:
      "A tax bracket only taxes the income that falls inside it, not your entire income at that rate. That single fact is why your effective rate is always lower than your top bracket, and why a raise can never shrink your paycheck.",
    level: "advanced",
    minutes: 9,
    prerequisites: [],
    tags: ["Planning", "Interactive"],
    headings: [
      { id: "a-tax-bracket-only-taxes-the-income-inside-it", text: "A tax bracket only taxes the income inside it", level: 2 },
      { id: "your-effective-rate-is-lower-than-your-top-bracket", text: "Your effective rate is lower than your top bracket", level: 2 },
      { id: "why-a-raise-can-never-actually-shrink-your-paycheck", text: "Why a raise can never actually shrink your paycheck", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "big-purchases-and-opportunity-cost",
    partId: "planning",
    order: 23,
    title: "Big Purchases and Opportunity Cost",
    description:
      "Every dollar spent is a dollar that can no longer also be invested. That doesn't mean never spending it — it means knowing what a purchase actually costs once what it could have become is part of the price.",
    level: "advanced",
    minutes: 9,
    prerequisites: [],
    tags: ["Planning", "Interactive"],
    headings: [
      { id: "every-dollar-spent-is-a-dollar-that-cant-also-be-invested", text: "Every dollar spent is a dollar that can't also be invested", level: 2 },
      { id: "the-real-cost-of-a-purchase-includes-what-it-could-have-become", text: "The real cost of a purchase includes what it could have become", level: 2 },
      { id: "this-doesnt-mean-never-spend-it-means-spend-on-purpose", text: "This doesn't mean never spend — it means spend on purpose", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "building-your-financial-plan",
    partId: "planning",
    order: 24,
    title: "Building Something From All of It",
    description:
      "Every lesson until now has proven one idea in isolation. Build one page that turns a budget, an emergency fund goal, and a retirement contribution into a plan you'll actually keep looking at.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["building-a-budget", "the-emergency-fund"],
    tags: ["Planning"],
    headings: [
      { id: "starting-with-where-the-money-already-goes", text: "Starting with where the money already goes", level: 2 },
      { id: "setting-one-goal-for-each-time-horizon", text: "Setting one goal for each time horizon", level: 2 },
      { id: "the-one-page-plan-you-can-actually-maintain", text: "The one-page plan you can actually maintain", level: 2 },
    ],
    status: "published",
  },
];
