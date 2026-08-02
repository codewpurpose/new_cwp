import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { StepList } from "@/components/learn/primitives/StepList";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { formatCurrency } from "@/lib/finance-format";

export function AutomatingSavingsLesson() {
  return (
    <div>
      <Lead>
        Automating a transfer sounds like a productivity trick, not a real financial strategy —
        something for a blog post, not a plan. It works better than almost anything else in this
        track precisely because it isn&apos;t clever. It just removes a decision, rather than
        asking you to make the same disciplined one correctly, every month, forever.
      </Lead>

      <LessonSection id="a-transfer-that-happens-before-you-can-spend-it" title="A transfer that happens before you can spend it">
        <P>
          &ldquo;Pay yourself first&rdquo; means treating savings like a bill that&apos;s due the
          day you&apos;re paid, not a leftover you get to at the end of the month. Set up an
          automatic transfer from checking to savings for the same day your paycheck lands, and
          the money is gone from checking before there&apos;s ever a version of the month where
          it competes with anything else.
        </P>
        <P>
          The mechanism is entirely about order of operations. A transfer dated to fire an hour
          after your paycheck is scheduled to post moves the money before your brain has
          registered the balance change at all — there is no moment where {formatCurrency(200)} of
          &ldquo;spare&rdquo; money sits visible in checking, tempting a decision either way. What
          you never see, you don&apos;t have to resist spending.
        </P>
      </LessonSection>

      <LessonSection id="why-willpower-loses-to-automation" title="Why willpower loses to automation">
        <P>
          Manual saving asks you to make the same disciplined decision, correctly, roughly thirty
          times a month, forever. Automation asks you to make it once. Every study of habit
          formation says the same thing in different words: a system that removes a repeated
          decision beats a system that relies on repeating it correctly.
        </P>
        <P>
          This isn&apos;t a character judgement. A decision made under willpower has to win
          against every other pull on that same balance — a card declined at the register, a
          friend&apos;s birthday, a bad week where a takeout order feels earned. An automated
          transfer never has to win an argument, because by the time the argument would start, the
          money has already left. Willpower is a finite resource spent once per decision.
          Automation spends it once, total.
        </P>
      </LessonSection>

      <RevealCard
        summaryTag="Before"
        summary="Manual saving: transfer whatever's left over at the end of the month."
        detailTag="After"
        detail={
          <>
            Most months, &ldquo;whatever&apos;s left over&rdquo; turns out to be close to zero —
            not because nothing was earned, but because spending expands to fill whatever hasn&apos;t
            already been claimed. An automatic transfer of even {formatCurrency(50)} on payday
            claims that amount before spending gets the chance.
          </>
        }
        footnote="This is the same reason a 401(k) contribution taken out of a paycheck before it arrives is so much stickier than a plan to 'invest what's left'."
      />

      <LessonSection
        id="automation-fails-in-two-specific-avoidable-ways"
        title="Automation fails in two specific, avoidable ways"
      >
        <P>
          None of this makes automation foolproof. It just moves the failure points from
          &ldquo;did I have the discipline&rdquo; to two much narrower, much more fixable
          questions about how the transfer is actually set up.
        </P>
        <CompareGrid
          items={[
            {
              title: "The transfer that overdraws",
              tone: "caution",
              children: (
                <>
                  <P>
                    A paycheck &ldquo;landing&rdquo; and a paycheck actually clearing aren&apos;t
                    always the same moment — some banks post a deposit as pending for a day before
                    the funds are fully available. Schedule a transfer for the exact same calendar
                    day and it can fire against a balance that hasn&apos;t caught up yet.
                  </P>
                  <P>
                    The result is a bounced transfer and, on many accounts, an overdraft fee
                    averaging around {formatCurrency(35)} — on a {formatCurrency(50)} automatic
                    transfer, that&apos;s a 70% penalty for the automation working exactly as
                    configured.
                  </P>
                </>
              ),
            },
            {
              title: "The fund you can see too easily",
              tone: "caution",
              children: (
                <>
                  <P>
                    Automating a transfer into a savings account at the same bank, visible in the
                    same app as checking, one tap away, defeats a good chunk of the point. The
                    money left checking, but it never actually left view.
                  </P>
                  <P>
                    On a bad week, a fund you can see and move in ten seconds gets raided the same
                    way a manual &ldquo;leftover&rdquo; transfer would have been skipped —
                    automation stopped the spending decision at the transfer, not at the account it
                    landed in.
                  </P>
                </>
              ),
            },
          ]}
        />
        <StepList
          steps={[
            {
              label: "Confirm the paycheck has actually posted before the transfer date",
              detail: "Not just \"scheduled\" — check that a prior deposit cleared on the same weekday before trusting the pattern.",
            },
            {
              label: "Build in a one- to two-day buffer between payday and transfer day",
              detail: "A transfer dated the day after payday, rather than the same day, absorbs most posting delays without you doing anything.",
            },
            {
              label: "Send savings to a separate bank, not a linked sub-account",
              detail: "An account without a debit card and without a one-tap view in your everyday banking app is genuinely harder to raid on impulse.",
            },
            {
              label: "Raise the transfer amount the same day a raise arrives",
              detail: "A pay increase you never adjusted your spending to is the easiest increase you'll ever make — automate that decision too.",
            },
          ]}
        />
        <Callout tone="warning" title="An overdraft fee usually costs more than the transfer itself">
          Check the account&apos;s available balance against the transfer schedule once, when you
          set it up, rather than finding out from a fee. A one-time fix; a recurring problem if
          skipped.
        </Callout>
      </LessonSection>

      <LessonSection id="starting-small-and-still-getting-somewhere" title="Starting small and still getting somewhere">
        <P>
          The transfer amount matters less than the habit existing at all. {formatCurrency(25)} a
          week, automated and left alone, reliably outperforms an ambitious {formatCurrency(400)}
          -a-month plan that survives two months and quietly stops. Start at an amount small
          enough that you won&apos;t cancel it, then raise it the next time your income goes up
          — a raise you never adjusted to spending is the easiest increase you&apos;ll ever make.
        </P>
        <P>
          The instinct to wait until you can automate a &ldquo;serious&rdquo; amount is exactly
          backwards. A small transfer running for years compounds — the previous lesson in this
          track works out precisely how much — while a large transfer planned for &ldquo;when I
          can afford it properly&rdquo; usually starts later than the small one would have, or
          never starts at all.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Paying yourself first means the savings transfer happens on payday, before spending gets a chance to compete for the money.",
          "Automation beats willpower because it turns thirty correct decisions a month into one correct decision, made once, rather than asking for repeated discipline.",
          `Scheduling a transfer for the exact day a paycheck "lands," rather than a day after, risks an overdraft — and a ${formatCurrency(35)} fee on a ${formatCurrency(50)} transfer is a 70% penalty for automating correctly on the wrong date.`,
          "An emergency fund kept in an account visible in the same banking app as checking is one tap away from being spent — the automation stopped the decision at the transfer, not at the account.",
          "A small automated amount that survives is worth more than an ambitious manual plan that quietly stops after two months.",
        ]}
      />
    </div>
  );
}
