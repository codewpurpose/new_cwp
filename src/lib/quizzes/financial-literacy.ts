import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the financial-literacy track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "why-money-rules-matter": [
    {
      q: "An employer matches 3% of a $50,000 salary. Skip enrolling for five years and roughly how much match money have you turned down?",
      options: ["$1,500", "$7,500", "$3,000", "$15,000"],
      answer: 1,
    },
    {
      q: "Someone takes $50 today over $100 in a year, but takes $100 in six years over $50 in five. What pattern is that?",
      options: ["Present bias", "Loss aversion", "Hedonic adaptation", "Compound interest"],
      answer: 0,
    },
    {
      q: "According to the chapter, what works better against present bias than resolving to try harder?",
      options: [
        "Checking your balance every day",
        "Setting stricter spending rules",
        "Automating the decision so it isn't made in the moment",
        "Waiting until your income is higher",
      ],
      answer: 2,
    },
    {
      q: "The chapter argues most expensive money mistakes are what kind of failure?",
      options: ["Discipline failures", "Arithmetic failures", "Income failures", "Information failures"],
      answer: 3,
    },
  ],

  "income-and-expenses": [
    {
      q: "Gross biweekly pay is $2,400 and deductions total $695. Which number should a budget be built on?",
      options: [
        "$2,400, the gross pay",
        "$1,705, the net pay that lands",
        "$2,184, gross minus federal tax",
        "$2,280, gross minus the 401(k)",
      ],
      answer: 1,
    },
    {
      q: "Which of these is a variable expense?",
      options: ["Rent", "A phone plan", "Groceries", "A car payment"],
      answer: 2,
    },
    {
      q: "Your car registration costs $180 once a year. How should a monthly budget handle it?",
      options: [
        "Set aside $15 a month in an irregular-expenses category",
        "Ignore it until the month it comes due",
        "Put it on a credit card when it arrives",
        "Treat it as that month's variable spending",
      ],
      answer: 0,
    },
    {
      q: "FICA is 7.65% (Social Security plus Medicare). On a $2,400 paycheck, that comes to about:",
      options: ["$90", "$120", "$216", "$184"],
      answer: 3,
    },
  ],

  "needs-vs-wants": [
    {
      q: "What does the chapter use to decide whether something is a need?",
      options: [
        "How much you want it",
        "Whether going without it causes a real, practical problem",
        "How expensive it is",
        "Whether most people consider it essential",
      ],
      answer: 1,
    },
    {
      q: "You upgraded from a $60 phone plan to a $110 one. Six months later, going back feels like a loss. What is that?",
      options: ["Present bias", "Opportunity cost", "Hedonic adaptation", "Inflation"],
      answer: 2,
    },
    {
      q: "Why can a car be a need for one person and a want for another?",
      options: [
        "The line moves with circumstances, like how far work is",
        "Cars are always wants, whatever the situation",
        "It depends only on how expensive the car is",
        "It depends on what friends and family think",
      ],
      answer: 0,
    },
    {
      q: "A cheaper version does exactly the same job as the one you're eyeing. What does the three-question test say?",
      options: [
        "The whole purchase becomes a want",
        "The whole purchase stays a need",
        "You must always buy the cheapest version",
        "The base version is the need; the price gap is the want",
      ],
      answer: 3,
    },
  ],

  "building-a-budget": [
    {
      q: "Net income is $3,000 and planned categories total $2,850. How does the chapter treat the $150 left?",
      options: [
        "As a category you assign on purpose, like savings",
        "As leftover money to spend freely",
        "As a sign the budget is broken",
        "As extra income to add to next month",
      ],
      answer: 0,
    },
    {
      q: "Apply a 50/30/20 split to $3,000 of take-home pay. What do needs, wants, and savings get?",
      options: [
        "$1,500 / $600 / $900",
        "$1,000 / $1,000 / $1,000",
        "$1,500 / $900 / $600",
        "$1,800 / $900 / $300",
      ],
      answer: 2,
    },
    {
      q: "Your categories add up to $200 more than your income. What fix does the chapter recommend?",
      options: [
        "Resolve to be more careful in general",
        "Cut a named category by a named amount",
        "Plan against gross pay instead of net",
        "Leave it and see how the month goes",
      ],
      answer: 1,
    },
    {
      q: "What separates a budget from a record of tracked spending?",
      options: [
        "A budget only covers fixed expenses",
        "A record is always more accurate than a budget",
        "They are the same document with different names",
        "A budget is decided before the month; a record after",
      ],
      answer: 3,
    },
  ],

  "the-emergency-fund": [
    {
      q: "Someone earns $5,000 a month but spends $2,800 on essentials. What is a three-month emergency fund target?",
      options: ["$15,000", "$8,400", "$5,600", "$16,800"],
      answer: 1,
    },
    {
      q: "Which of these counts as an emergency under the chapter's definition?",
      options: [
        "A car repair on the only way you get to work",
        "A sale that ends today on something you wanted",
        "An annual bill you knew about but forgot",
        "Replacing a phone that still works fine",
      ],
      answer: 0,
    },
    {
      q: "Where does the chapter say an emergency fund should live?",
      options: [
        "A stock index fund, for growth",
        "A five-year CD, for a higher rate",
        "Your everyday checking balance",
        "A high-yield savings account",
      ],
      answer: 3,
    },
    {
      q: "You have a credit card balance at 22% APR and no savings. What order does the chapter suggest?",
      options: [
        "Build the full six-month fund, then pay the card",
        "Pay the card with every dollar and keep no buffer",
        "Small starter fund, then the card, then the full fund",
        "Invest first, since returns beat the card over time",
      ],
      answer: 2,
    },
  ],

  "how-savings-accounts-work": [
    {
      q: "Why is APY the right number for comparing two savings accounts?",
      options: [
        "It already includes the effect of compounding",
        "It leaves compounding out for a cleaner comparison",
        "It is the rate the bank charges its borrowers",
        "It is already adjusted for inflation",
      ],
      answer: 0,
    },
    {
      q: "$10,000 sits in checking at 0.01% APY for a year while inflation runs at 3%. What happened to its buying power?",
      options: [
        "It grew by about $1",
        "It stayed exactly the same",
        "It fell by about $299",
        "It fell by about $1",
      ],
      answer: 2,
    },
    {
      q: "The same 4% nominal rate on $10,000 for one year: what does monthly compounding pay compared with annual?",
      options: [
        "$10,400 either way",
        "About $10,407 versus $10,400",
        "About $10,480 versus $10,400",
        "About $10,400 versus $10,407",
      ],
      answer: 1,
    },
    {
      q: "How much does FDIC insurance protect at an insured bank?",
      options: [
        "$100,000 per account",
        "Everything, with no limit",
        "$250,000 per household in total",
        "$250,000 per depositor, per bank",
      ],
      answer: 3,
    },
  ],

  "compound-interest": [
    {
      q: "$1,000 earns 7% simple interest for 20 years. What is the total at the end?",
      options: ["$3,870", "$2,400", "$1,400", "$2,000"],
      answer: 1,
    },
    {
      q: "Using the rule of 72, roughly how long does money take to double at 8%?",
      options: ["About 9 years", "About 8 years", "About 12 years", "About 6 years"],
      answer: 0,
    },
    {
      q: "A $5,000 card balance at 24% APR sits with no payments or new charges. Roughly when does it double?",
      options: ["In about 6 years", "In about 12 years", "In about 24 months", "In about 3 years"],
      answer: 3,
    },
    {
      q: "Both put in $200 a month until 65: one starts at 25 earning 7%, the other at 35 earning 9%. Who ends with more?",
      options: [
        "The one starting at 35, thanks to the higher rate",
        "They end within a few dollars of each other",
        "The one starting at 25, at the lower rate",
        "It depends entirely on inflation",
      ],
      answer: 2,
    },
  ],

  "automating-savings": [
    {
      q: "Why does the chapter suggest scheduling the savings transfer a day after payday rather than the same day?",
      options: [
        "The deposit may still be pending, so the transfer could overdraw",
        "Banks don't allow transfers on the day of a deposit",
        "Transfers on payday earn less interest",
        "Same-day transfers are taxed differently",
      ],
      answer: 0,
    },
    {
      q: "Which setup makes an automated savings balance easiest to raid on a bad week?",
      options: [
        "A separate bank with no debit card",
        "A transfer dated a day after payday",
        "A linked sub-account one tap away in your checking app",
        "A small weekly amount instead of a monthly one",
      ],
      answer: 2,
    },
    {
      q: "Compare an automated $25 a week that keeps running with a manual $400-a-month plan that stops after two months. Per the chapter:",
      options: [
        "The $400 plan wins, because the amount is larger",
        "They come out roughly even after a year",
        "Neither works without a budget behind it",
        "The small transfer that survives wins",
      ],
      answer: 3,
    },
    {
      q: "When does the chapter say to raise the automatic transfer?",
      options: [
        "Once a year, on January 1st",
        "The same day a raise arrives",
        "Only after the emergency fund is full",
        "Whenever the balance looks too low",
      ],
      answer: 1,
    },
  ],

  "what-a-credit-score-actually-measures": [
    {
      q: "A card with a $5,000 limit is carrying a $1,500 balance. What is its utilisation?",
      options: ["15%", "33%", "30%", "3%"],
      answer: 2,
    },
    {
      q: "Which two factors make up 65% of a FICO score?",
      options: [
        "Payment history and amounts owed",
        "Income and savings balance",
        "Credit mix and new credit",
        "Length of history and hard inquiries",
      ],
      answer: 0,
    },
    {
      q: "You pay your card in full every due date, but a mortgage application is coming. How do you lower the utilisation that gets reported?",
      options: [
        "Pay on the due date, as usual",
        "Carry a small balance from month to month",
        "Open a new card the week before applying",
        "Pay the balance down before the statement closes",
      ],
      answer: 3,
    },
    {
      q: "What happens to your score when you check it in your bank's app?",
      options: [
        "It drops a few points as a hard inquiry",
        "Nothing; it's a soft inquiry lenders don't see",
        "It rises slightly for showing engagement",
        "It drops only if you check more than monthly",
      ],
      answer: 1,
    },
  ],

  "how-credit-cards-really-work": [
    {
      q: "Your statement balance is $850 and you pay $800 by the due date. What typically happens?",
      options: [
        "No interest, since you paid most of it",
        "Interest on $50, starting from the due date",
        "You lose the grace period; interest runs back to purchase dates",
        "A late fee, but no interest at all",
      ],
      answer: 2,
    },
    {
      q: "A minimum is 1% of the balance plus the month's interest. On $2,000 at 24.99% APR, about how much is it?",
      options: ["$20.00", "$41.65", "$25.00", "$61.65"],
      answer: 3,
    },
    {
      q: "What makes a cash advance different from an ordinary purchase on the same card?",
      options: [
        "Interest starts immediately, with no grace period",
        "It gets a longer grace period",
        "It never shows up on the statement",
        "It uses the card's lowest interest rate",
      ],
      answer: 0,
    },
    {
      q: "A '0% for 18 months' deferred-interest deal ends with $50 still owed on a $1,200 purchase. What is charged?",
      options: [
        "Interest on the $50 only, from today",
        "Nothing, since most of it was paid",
        "A flat $25 fee",
        "Interest backdated to day one on the purchase",
      ],
      answer: 3,
    },
  ],

  "the-cost-of-carrying-a-balance": [
    {
      q: "A card charges 22.99% APR as a daily rate. About what is that rate per day?",
      options: ["0.63%", "0.063%", "0.0063%", "2.3%"],
      answer: 1,
    },
    {
      q: "A $1,000 balance at 22.99% APR accrues about $19 of interest in month one, and the minimum is $25. How much of that payment reduces the balance?",
      options: ["About $6", "About $19", "All $25", "About $12"],
      answer: 0,
    },
    {
      q: "Compared with the 22.99% printed on the card, the effective annual rate after daily compounding is:",
      options: [
        "Lower, about 20%",
        "Exactly 22.99%",
        "Higher, about 25.8%",
        "Higher, about 46%",
      ],
      answer: 2,
    },
    {
      q: "In the chapter's example, how long does a $1,000 balance take to clear with minimums only versus $100 a month?",
      options: [
        "24 months versus 10 months",
        "12 months versus 6 months",
        "About the same either way",
        "77 months versus 12 months",
      ],
      answer: 3,
    },
  ],

  "loans-and-amortization": [
    {
      q: "A $20,000 loan at 6% APR: how much of the first monthly payment is interest?",
      options: ["$100", "$286.66", "$386.66", "$1,200"],
      answer: 0,
    },
    {
      q: "Why are a loan's early payments mostly interest?",
      options: [
        "Lenders front-load fees on purpose",
        "Interest is charged on the remaining balance, largest at the start",
        "The interest rate starts high and falls over time",
        "Early payments are smaller than later ones",
      ],
      answer: 1,
    },
    {
      q: "On the chapter's five-year loan, a one-time $1,000 extra payment saves the most interest when made in:",
      options: ["Month 55", "Month 30", "Month 1", "It saves the same in any month"],
      answer: 2,
    },
    {
      q: "Paying half the monthly amount every two weeks works out to how many full payments a year?",
      options: ["12", "24", "26", "13"],
      answer: 3,
    },
  ],

  "good-debt-bad-debt": [
    {
      q: "Of the chapter's four questions, which one can override the other three?",
      options: [
        "Whether the payment survives a lost paycheck",
        "What the money was spent on",
        "Whether the rate is below 10%",
        "How long the term is",
      ],
      answer: 0,
    },
    {
      q: "A $22,000 car loan at 18% over seven years costs only about $38 a month more than 5.9% over five years. What's the catch?",
      options: [
        "The payment jumps after year three",
        "It needs a much larger down payment",
        "Total interest is nearly five times higher",
        "There isn't one; the payments are close",
      ],
      answer: 2,
    },
    {
      q: "You take a five-year loan on a car you plan to trade in after three years. Which question flags the problem?",
      options: ["The rate", "The term", "Whether it holds value", "What it was spent on"],
      answer: 1,
    },
    {
      q: "Which of these tends toward bad debt?",
      options: [
        "A fixed-rate mortgage you can afford",
        "A student loan with a clear path to higher pay",
        "A small business loan backed by a real plan",
        "A vacation carried on a 22% APR card",
      ],
      answer: 3,
    },
  ],

  "paying-off-debt-strategically": [
    {
      q: "Card A: $3,000 at 24%. Card B: $1,200 at 19%. Loan: $5,000 at 12%. Where does the avalanche method send the extra money first?",
      options: ["Card B", "The loan", "Card A", "Split evenly"],
      answer: 2,
    },
    {
      q: "Same three debts. Where does the snowball method send the extra money first?",
      options: ["Card B", "Card A", "The loan", "Split evenly"],
      answer: 0,
    },
    {
      q: "In the chapter's $400-a-month example, how did the two methods compare?",
      options: [
        "Avalanche finished a year sooner",
        "Snowball cost about $73 more; both were debt-free in month 28",
        "Snowball cost less interest overall",
        "They were identical in every way",
      ],
      answer: 1,
    },
    {
      q: "Three years into a five-year car loan, you refinance into a new five-year loan at a lower rate. What's the risk?",
      options: [
        "Your credit score resets to zero",
        "The rate rises again after a year",
        "You can no longer pay early",
        "The term resets, so total interest can go up",
      ],
      answer: 3,
    },
  ],

  "insurance-basics": [
    {
      q: "A $600 covered repair, on a policy with a $500 deductible. How much does the insurer pay?",
      options: ["$100", "$600", "$500", "Nothing"],
      answer: 0,
    },
    {
      q: "A health plan has a $2,000 deductible and an $8,000 out-of-pocket maximum. What's the most you'd pay for covered care in a year, not counting premiums?",
      options: ["$2,000", "$10,000", "$8,000", "There is no ceiling"],
      answer: 2,
    },
    {
      q: "Which of these is the chapter most likely to call worth insuring?",
      options: [
        "An extended warranty on headphones",
        "A phone screen-protection plan",
        "Trip cancellation on a cheap ticket",
        "Liability coverage on your car",
      ],
      answer: 3,
    },
    {
      q: "Raising a policy's deductible usually does what to the premium?",
      options: ["Raises it", "Lowers it", "Leaves it unchanged", "Doubles it"],
      answer: 1,
    },
  ],

  "avoiding-scams-and-predatory-products": [
    {
      q: "A $300 payday loan charges $15 per $100 borrowed for two weeks. What is the fee?",
      options: ["$15", "$30", "$45", "$135"],
      answer: 2,
    },
    {
      q: "Which two tells does the chapter call the biggest signs of a predatory offer?",
      options: [
        "Urgency and secrecy",
        "High rates and long terms",
        "Online-only and no branches",
        "Small print and long forms",
      ],
      answer: 0,
    },
    {
      q: "A lender will release your $5,000 loan once you wire a $250 processing fee. What is going on?",
      options: [
        "Normal practice for an unsecured loan",
        "A standard credit check fee",
        "A deposit that comes back with the loan",
        "The advance-fee pattern; real lenders deduct fees from the loan",
      ],
      answer: 3,
    },
    {
      q: "A caller says they're from the tax agency and wants payment in gift card codes. What should you do?",
      options: [
        "Pay a small amount to buy time",
        "Hang up and call the agency's official number yourself",
        "Ask the caller for their badge number",
        "Offer a bank transfer instead",
      ],
      answer: 1,
    },
  ],

  "why-investing-beats-saving-alone": [
    {
      q: "$10,000 sits at 1% APY for 20 years while inflation runs at 3%. About what is it worth in today's purchasing power?",
      options: ["$12,200", "$10,000", "$6,756", "$8,200"],
      answer: 2,
    },
    {
      q: "An account pays 4% while inflation runs at 3%. Roughly what is the real return?",
      options: ["About 1%", "About 7%", "About 4%", "About -3%"],
      answer: 0,
    },
    {
      q: "You're saving for a car you'll buy in 18 months. Where does the chapter suggest that money belongs?",
      options: [
        "A stock index fund, for higher returns",
        "Split evenly between stocks and bonds",
        "A single stock you know well",
        "Savings, because the job is stability",
      ],
      answer: 3,
    },
    {
      q: "Why does the emergency fund stay in savings even though investing has historically earned more?",
      options: [
        "Investment accounts can't be withdrawn early",
        "It may be needed in exactly the week a portfolio is down",
        "Savings are taxed less than investments",
        "Investing needs at least $10,000 to start",
      ],
      answer: 1,
    },
  ],

  "stocks-bonds-and-funds": [
    {
      q: "A company goes bankrupt. Who gets paid first?",
      options: [
        "Stockholders, because they own the company",
        "Bondholders, before stockholders",
        "Everyone is paid at the same time",
        "Whoever invested most recently",
      ],
      answer: 1,
    },
    {
      q: "A company skips a dividend one quarter and a bond payment the next. What's the difference?",
      options: [
        "Both are defaults with legal consequences",
        "Neither has any consequence",
        "Skipping a dividend is a default; the bond is optional",
        "Skipping the bond payment is a default; the dividend was optional",
      ],
      answer: 3,
    },
    {
      q: "$10,000 grows at a 7% market return for 30 years. About how much less does a 1% expense ratio leave than a 0.03% one?",
      options: ["About $300", "About $3,000", "About $18,000", "About $57,000"],
      answer: 2,
    },
    {
      q: "What is the core difference between an index fund and an actively managed fund?",
      options: [
        "An index fund holds a benchmark; an active fund tries to beat it",
        "Only index funds can hold bonds",
        "An active fund is guaranteed to beat the market",
        "Index funds hold just a handful of stocks",
      ],
      answer: 0,
    },
  ],

  "risk-and-diversification": [
    {
      q: "How does the chapter define risk?",
      options: [
        "The chance of losing everything",
        "How dangerous an investment feels",
        "The spread of outcomes an investment could produce",
        "How much an investment costs to buy",
      ],
      answer: 2,
    },
    {
      q: "You own twenty different software companies that sell to the same customers. Why is that weak diversification?",
      options: [
        "Twenty is too few holdings",
        "They tend to move together for the same reasons",
        "Software companies never pay dividends",
        "Each holding is too small to matter",
      ],
      answer: 1,
    },
    {
      q: "Which risk can diversifying across many stocks NOT remove?",
      options: [
        "One company's product recall",
        "A single CEO's bad decision",
        "One firm's accounting fraud",
        "A recession that hits the whole market",
      ],
      answer: 3,
    },
    {
      q: "You put $10,000 into one company and it loses 80% in a year. What's left?",
      options: ["$2,000", "$8,000", "$9,200", "$800"],
      answer: 0,
    },
  ],

  "index-funds-and-time-in-market": [
    {
      q: "Why must the average actively managed dollar trail the index after costs?",
      options: [
        "Active managers are less skilled than index providers",
        "Before costs the average equals the market; costs then come off",
        "Index funds receive a government subsidy",
        "Active funds aren't allowed to hold the biggest companies",
      ],
      answer: 1,
    },
    {
      q: "An investor sells after a crash to 'wait for safety.' What does the chapter say that risks?",
      options: [
        "Paying a higher expense ratio",
        "Losing FDIC protection",
        "Missing the best days, which tend to cluster near the worst",
        "Owing tax on the losses",
      ],
      answer: 2,
    },
    {
      q: "An active fund finished in the top quarter of its peers this year. What does the evidence say about next year?",
      options: [
        "It will very likely stay on top",
        "It is guaranteed to fall to the bottom",
        "It will match the index exactly",
        "Its odds of repeating are about what luck alone predicts",
      ],
      answer: 3,
    },
    {
      q: "Roughly what yearly expense ratio does the chapter give for a typical index fund?",
      options: ["0.03% to 0.1%", "0.5% to 1%", "2% to 3%", "5% or more"],
      answer: 0,
    },
  ],

  "retirement-accounts": [
    {
      q: "You earn an extra $100 and your tax rate is 22%. Put it into a Roth account and about how much lands there?",
      options: ["$100", "$122", "$78", "$22"],
      answer: 2,
    },
    {
      q: "You expect to be in a higher tax bracket in retirement than you are today. Which account type tends to win?",
      options: ["Traditional", "Roth", "They always come out the same", "Neither, use a savings account"],
      answer: 1,
    },
    {
      q: "Salary $60,000; the match is 100% on the first 3% and 50% on the next 2%. You contribute 3%. How much match goes unclaimed each year?",
      options: ["$600", "$1,200", "$1,800", "Nothing"],
      answer: 0,
    },
    {
      q: "A graded vesting schedule gives you 20% of the match per year. You leave after two years. How much of the match do you keep?",
      options: ["All of it", "None of it", "20%", "40%"],
      answer: 3,
    },
  ],

  "taxes-the-basics": [
    {
      q: "Someone with $60,000 of taxable income owes $8,253 in federal tax. What is their effective rate?",
      options: ["22%", "12%", "About 13.8%", "About 10%"],
      answer: 2,
    },
    {
      q: "A raise pushes $1,000 of income into the 22% bracket. What gets taxed at 22%?",
      options: [
        "Only that $1,000",
        "All of your income",
        "Everything above $11,600",
        "The raise and the slice just below it",
      ],
      answer: 0,
    },
    {
      q: "In the 22% bracket, how do a $1,000 deduction and a $1,000 credit compare?",
      options: [
        "Both cut the tax bill by $1,000",
        "Both cut the tax bill by $220",
        "The deduction saves $1,000; the credit saves $220",
        "The deduction saves $220; the credit saves $1,000",
      ],
      answer: 3,
    },
    {
      q: "You get a large refund every spring. What does the chapter say that means?",
      options: [
        "The government paid you a bonus",
        "Too much was withheld from your paychecks all year",
        "You underpaid, and the refund is a loan",
        "You qualified for a tax credit",
      ],
      answer: 1,
    },
  ],

  "big-purchases-and-opportunity-cost": [
    {
      q: "A $28,000 car plus insurance, fuel, and maintenance over five years costs roughly how much to own?",
      options: ["$28,000", "$32,000", "About $48,000", "About $90,000"],
      answer: 2,
    },
    {
      q: "Instead of spending $2,000, you invest it at 7% a year for 10 years. About what does it become?",
      options: ["$3,400", "$3,934", "$2,140", "$14,000"],
      answer: 1,
    },
    {
      q: "Besides tuition, what is the big opportunity cost of a four-year degree?",
      options: [
        "The wages given up while studying",
        "The interest a savings account pays",
        "The cost of textbooks",
        "The tax deduction for tuition",
      ],
      answer: 0,
    },
    {
      q: "What does the chapter say opportunity cost should change about how you spend?",
      options: [
        "Never make a large purchase",
        "Invest every spare dollar",
        "Only buy things that hold their value",
        "Spend on purpose, knowing the full cost",
      ],
      answer: 3,
    },
  ],

  "building-your-financial-plan": [
    {
      q: "What does the chapter say a plan should start with?",
      options: [
        "A list of goals for the next ten years",
        "Real numbers from a tracked month and current balances",
        "A target net worth",
        "An investment account",
      ],
      answer: 1,
    },
    {
      q: "How many goals should you set for each time horizon?",
      options: ["One", "Three", "As many as possible", "None until the debt is gone"],
      answer: 0,
    },
    {
      q: "When does the chapter suggest revisiting the one-page plan?",
      options: [
        "Every single week",
        "Only once a year, on a fixed date",
        "After a real change, like a raise, a move, or new debt",
        "Never, once it's written",
      ],
      answer: 2,
    },
    {
      q: "You have $4,200 saved and essential expenses of $1,400 a month. How many months does your emergency fund cover?",
      options: ["1.4 months", "6 months", "4.2 months", "3 months"],
      answer: 3,
    },
  ],
};
