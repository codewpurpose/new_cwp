import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { FoldRotator } from "@/components/ml/FoldRotator";

export function CrossValidationLesson() {
  return (
    <div>
      <Lead>
        Chapter five ended on an uncomfortable note. You hold data back, you score the model
        once, and the number you write down depends on which examples happened to land in the
        drawer. You accepted that because there was nothing else to do. There is something else
        to do.
      </Lead>

      <LessonSection id="one-split-is-one-opinion" title="One split is one opinion">
        <P>
          The problem with a single split is not that it is biased. Run it a thousand times and
          the average comes out right. The problem is that you run it <em>once</em>, and one
          draw from a wide range is a poor way to learn where the middle is.
        </P>
        <P>
          There is a second cost, quieter and worse. Every student in the drawer is a student the
          model never learned from. Holding back 20% of a small dataset means training on 80% of
          what you collected, and you paid for all of it.
        </P>
        <P>
          Cross-validation fixes both with one idea: stop choosing which examples go in the
          drawer, and use all of them, in turn.
        </P>
      </LessonSection>

      <LessonSection id="using-every-row-twice" title="Using every row twice">
        <P>
          Deal the sixty students into five blocks of twelve. Hold back block one, train on the
          other forty-eight, score. Put block one back, hold back block two, train, score. Five
          rounds, five models, five scores. Average them.
        </P>
        <P>
          Every student is tested exactly once and trained on exactly four times. Nothing is
          wasted, and no student is ever tested by a model that studied them. That last clause is
          the rule from chapter five, and it survives intact — which is the only reason this is
          legitimate rather than clever.
        </P>
      </LessonSection>

      <FoldRotator />

      <LessonSection id="the-spread-is-the-point" title="The spread is the point, not the average" delay={0.05}>
        <P>
          Step through the five rounds and watch the individual scores: 3.44, 4.67, 3.89, 3.90,
          then 5.67. The average is 4.31, and that is the number you would report.
        </P>
        <P>
          But look at the range those five came from. The kindest fold and the cruellest differ
          by 2.23 points. Same model, same procedure, same sixty students — the only difference
          is which twelve were being marked. Fold five got a batch this model handles badly.
        </P>
        <P>
          Most people average the folds and throw the rest away. Do not. The spread across folds
          is a measurement you cannot get from a single split, and it answers a question the
          average never touches: <Strong>how much does this score depend on luck?</Strong> A
          model scoring 4.31 give or take 0.1 and a model scoring 4.31 give or take 2.2 are not
          the same result, and only one of them is worth defending.
        </P>
        <P>
          The bottom panel makes the payoff concrete. Repeat the whole experiment forty times with
          forty different shuffles. Report from a single 20% holdout and you land somewhere across
          a 3.84-point range — as low as 2.59, as high as 6.43, entirely by luck. Report the
          five-fold average and you land within 0.69 points. The estimate is five and a half times
          tighter for five times the compute.
        </P>
        <Callout tone="note" title="Why five, and what k does here">
          Five and ten are conventions, not results. More folds means each model trains on more
          data, so the estimate is less pessimistic, and it means more models to fit. Push it to
          the limit — one fold per row — and you get leave-one-out cross-validation, which trains
          n models and is what the k-Nearest Neighbours chapter quietly used to score every k.
          The letter k is doing an unrelated job in each chapter, which is unfortunate and too
          entrenched to fix.
        </Callout>
      </LessonSection>

      <LessonSection id="when-not-to-bother" title="When not to bother">
        <P>
          Cross-validation costs five times the training. That is the whole objection, and it is
          decisive more often than tutorials admit.
        </P>
        <P>
          With a large dataset it stops earning its keep. Hold back 20% of two million rows and
          the test set has four hundred thousand examples in it — the lottery has already been
          averaged away, and a single split gives a stable number for a fifth of the work. The
          rule of thumb is that cross-validation matters most exactly when data is scarce, which
          is also when a single split is least trustworthy.
        </P>
        <Callout tone="warning" title="Two ways to deal the folds wrongly">
          If your data has an order that matters — anything measured over time — dealing at
          random lets a model train on Thursday and be tested on Wednesday. Use folds that
          respect time. And if rows are grouped, with several rows per patient or per user,
          splitting inside a group puts the same person on both sides of the wall. Both mistakes
          produce a beautiful score and a model that fails in production, which is the subject of
          the next chapter.
        </Callout>
        <P>
          There is one more use for this that matters more than honest reporting. When you need
          to <em>choose</em> something — a depth for a tree, a k for a neighbour vote — you need
          to compare candidates without burning the test set. Cross-validating on the training
          data lets you compare as many as you like, and keeps the real test set sealed for the
          single measurement at the end.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Cross-validation splits the data into k blocks and takes turns holding each one back, then averages the scores.",
          "Every row is tested exactly once and trained on k-1 times, so nothing is wasted and the chapter-five rule is never broken.",
          "Here five folds scored 3.44, 4.67, 3.89, 3.90 and 5.67 — an average of 4.31 from scores spanning 2.23 points.",
          "Report the spread across folds, not only the average. It tells you how much the score depends on which rows were held back.",
          "Across forty repeats a single holdout ranged over 3.84 points and five-fold cross-validation over 0.69 — a five-and-a-half-fold tightening.",
          "It costs k times the training, and stops being worth it once the dataset is large enough that one split is already stable.",
          "Use it to choose settings without touching the test set, which stays sealed for one final measurement.",
        ]}
      />
    </div>
  );
}
