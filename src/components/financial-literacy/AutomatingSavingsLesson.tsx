import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { formatCurrency } from "@/lib/finance-format";

export function AutomatingSavingsLesson() {
  return (
    <div>
      <Lead>
        Nobody has ever regretted money moving to savings before they got a chance to see it in
        checking. The entire trick of automating savings is removing a decision, not adding more
        discipline to it.
      </Lead>

      <LessonSection id="a-transfer-that-happens-before-you-can-spend-it" title="A transfer that happens before you can spend it">
        <P>
          &ldquo;Pay yourself first&rdquo; means treating savings like a bill that&apos;s due the
          day you&apos;re paid, not a leftover you get to at the end of the month. Set up an
          automatic transfer from checking to savings for the same day your paycheck lands, and
          the money is gone from checking before there&apos;s ever a version of the month where
          it competes with anything else.
        </P>
      </LessonSection>

      <LessonSection id="why-willpower-loses-to-automation" title="Why willpower loses to automation">
        <P>
          Manual saving asks you to make the same disciplined decision, correctly, roughly thirty
          times a month, forever. Automation asks you to make it once. Every study of habit
          formation says the same thing in different words: a system that removes a repeated
          decision beats a system that relies on repeating it correctly.
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

      <LessonSection id="starting-small-and-still-getting-somewhere" title="Starting small and still getting somewhere">
        <P>
          The transfer amount matters less than the habit existing at all. {formatCurrency(25)} a
          week, automated and left alone, reliably outperforms an ambitious {formatCurrency(400)}
          -a-month plan that survives two months and quietly stops. Start at an amount small
          enough that you won&apos;t cancel it, then raise it the next time your income goes up
          — a raise you never adjusted to spending is the easiest increase you&apos;ll ever make.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Paying yourself first means the savings transfer happens on payday, before spending gets a chance to compete for the money.",
          "Automation beats willpower because it turns thirty correct decisions a month into one correct decision, made once.",
          "Money left to be saved 'at the end of the month' is usually close to zero, because spending expands to fill whatever hasn't already been claimed.",
          "A small automated amount that survives is worth more than an ambitious manual plan that quietly stops after two months.",
        ]}
      />
    </div>
  );
}
