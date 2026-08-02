import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { BaselineBoard } from "@/components/ml/BaselineBoard";

export function BaselinesLesson() {
  return (
    <div>
      <Lead>
        Somebody tells you their model is 87% accurate. You cannot tell from that sentence
        whether they have done something impressive or wasted a fortnight, and neither can they.
        A score on its own carries no information. It only means something next to the score of
        something stupid.
      </Lead>

      <LessonSection id="better-than-what" title="Better than what?">
        <P>
          Every number in this track has been a comparison in disguise. 82.5% for the forest
          meant something because a single tree managed 72.5%. The 98.1% in the last chapter
          meant nothing, and you could only tell because you knew that flagging nothing at all
          scored 98.1% too.
        </P>
        <P>
          A <Strong>baseline</Strong> is the stupidest thing that could possibly work, built
          first and deliberately. Not a simpler model — a rule so trivial that beating it proves
          nothing, and failing to beat it proves something rather serious.
        </P>
        <P>
          Building it first matters more than the number it produces. A baseline forces you to
          load the data, split it honestly, run a prediction and score it before you have written
          a model, which means the whole apparatus is working and debugged while there is still
          nothing to blame it on.
        </P>
      </LessonSection>

      <LessonSection id="the-four-baselines" title="The four you should always run">
        <P>
          <Strong>Say the commoner answer.</Strong> Look at which outcome is more frequent and
          predict it every time, ignoring all input. For a classifier this is the floor.
        </P>
        <P>
          <Strong>Guess at the right rate.</Strong> Predict at random in the proportions the
          training data showed. This is always worse than the majority rule, and running it once
          is the fastest way to understand why chance is not the bar to clear.
        </P>
        <P>
          <Strong>One rule on one column.</Strong> Try every feature at every cut-off, keep the
          single best if-statement. This is a decision stump: a decision tree that was stopped
          after one question. It is the baseline that will embarrass you.
        </P>
        <P>
          <Strong>Predict the last value.</Strong> For anything measured over time, predict that
          tomorrow equals today. It is devastating on forecasting problems and beats a
          surprising number of published models.
        </P>
        <P>
          The regression equivalents are the same idea with the arithmetic changed: predict the
          mean of the training targets, or predict the previous value. If your model cannot beat
          the mean, it has learned nothing at all.
        </P>
      </LessonSection>

      <BaselineBoard />

      <LessonSection id="racing-them" title="Racing them against the real thing" delay={0.05}>
        <P>
          The dataset is deliberately ordinary. Six columns were recorded because recording them
          was easy — hours revised, hours slept, commute, siblings, height, shoe size — and
          exactly one of them has anything to do with passing.
        </P>
        <P>
          The majority rule scores 56.0%. Random guessing at the right rate scores 47.3%, which
          is worse, as it always is. Then the one-rule baseline finds &ldquo;revised at least 8.2
          hours&rdquo; and scores <Strong>87.3%</Strong>.
        </P>
        <P>
          Now the two real models. The five-neighbour vote gets 78.0%. The depth-4 decision tree
          gets 76.0%. Both lose to the if-statement, by nine and eleven points.
        </P>
        <P>
          Neither is broken, and this is not a trick. The neighbour vote measures distance across
          all six scaled columns, so five-sixths of every distance it computes is noise — the
          exact failure from chapter eight, arriving through a different door. The tree does pick
          the right column first, then spends its remaining three levels splitting on shoe size
          and commute times, carving out little regions that fit the training set and mean
          nothing. It overfits into the noise the stump was too simple to reach.
        </P>
        <Callout tone="warning" title="87% would have sounded like a result">
          Run the tree on its own and you get 76.0%, on a problem where chance is about 50%.
          Written in a slide with no baseline beside it, that reads as a working model. It is a
          working model that is worse than one line of code, and only the baseline says so.
        </Callout>
      </LessonSection>

      <LessonSection id="when-the-baseline-wins" title="When the baseline wins">
        <P>
          It happens more than the literature suggests, and it is information rather than
          failure. When a trivial rule matches your model, one of four things is true.
        </P>
        <P>
          The problem may be easy, and one column carries it — as here. Your features
          may not contain the answer, in which case no algorithm will find it and the work is to
          collect better data, not to try a bigger model. The model may be misconfigured, which
          is worth ruling out before the more interesting explanations. Or the extra capacity is
          finding noise, which is chapter six wearing a hat.
        </P>
        <P>
          In every one of those cases the right move is the same: ship the baseline. It is
          faster, it is readable, it will not drift, and somebody can maintain it after you have
          left. Complexity has to be earned against a number, and here the number says it has not
          been.
        </P>

        <ChecklistCard
          title="Before the first model"
          intro="Half an hour, and it will change what you build."
          items={[
            "Write down what a majority-class or predict-the-mean rule scores. That is the floor.",
            "Fit a one-rule stump. If your model does not clear it comfortably, the extra machinery is not paying for itself.",
            "If anything is timestamped, score predict-the-last-value too. It is the hardest baseline to beat on real forecasting problems.",
            "Quote every model score next to the best baseline, always. A score without one is not a claim anybody can check.",
          ]}
        />

        <Callout tone="tip" title="Where this leaves you">
          You have reached the end of the track. You know what a model is, how one learns, three
          ways to build one, and — through five chapters of Part 4 — most of the ways a score can
          lie to you. That last part is the difference between running a library and doing the
          work, and it is not what most introductions spend their time on.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A score means nothing on its own. It is only interpretable next to the score of something trivial.",
          "Build the baseline first — it debugs your data loading, splitting and scoring while there is nothing else to blame.",
          "Always run: the majority class, a rate-matched random guess, a one-rule stump, and predict-the-last-value for anything timestamped.",
          "Here a single if-statement scored 87.3% while a five-neighbour vote managed 78.0% and a depth-4 tree 76.0%.",
          "The neighbour vote lost because five of six columns were noise diluting every distance; the tree lost by overfitting into the same noise.",
          "A model that cannot beat the baseline means easy problem, uninformative features, a misconfiguration, or overfitting — all four are worth knowing early.",
          "When the baseline wins, ship the baseline. It is faster, readable, and somebody else can maintain it.",
        ]}
      />
    </div>
  );
}
