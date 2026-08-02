import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { NeighbourVote } from "@/components/ml/NeighbourVote";

export function KNearestNeighboursLesson() {
  return (
    <div>
      <Lead>
        Every model so far has had numbers inside it that training adjusts. This one has none.
        It never fits anything, never improves, and has no training step worth the name — and on
        the right data it will still beat a carefully tuned model. It is worth understanding
        early, because it makes obvious a problem that stays hidden inside every other algorithm.
      </Lead>

      <LessonSection id="a-model-that-learns-nothing" title="A model that learns nothing">
        <P>
          Here is the whole algorithm. Keep every example you were given. When a new case
          arrives, find the handful most similar to it, and answer whatever they answered.
        </P>
        <P>
          That is it. There is no equation, no slope to find, no bowl to roll down. Training
          consists of writing the data to disk. People call it a{" "}
          <Strong>lazy learner</Strong>, which is accurate rather than rude: it defers all the
          work to the moment you ask it something.
        </P>
        <P>
          The consequences are immediate. It costs nothing to train and a great deal to use,
          which is the opposite of every model you have met. It can express a wildly complicated
          boundary without anybody designing one. And it cannot tell you why it answered — the
          justification is a list of neighbours, not a rule.
        </P>
      </LessonSection>

      <LessonSection id="asking-the-nearest-few" title="Asking the nearest few">
        <P>
          Below are fifty-four students, placed by how long they revised and what they scored on
          the previous exam. The cross is somebody new. The lines run to the students the model
          considers nearest, and those students vote.
        </P>
        <P>
          Start on <Strong>Ten hours in</Strong>. Every neighbour agrees, the vote is lopsided,
          and moving k changes nothing. Most predictions look like this, which is exactly why a
          model that gets the easy cases right has told you almost nothing.
        </P>
      </LessonSection>

      <NeighbourVote />

      <LessonSection id="k-is-the-entire-model" title="k is the entire model" delay={0.05}>
        <P>
          Now switch to <Strong>On the fence</Strong> and walk k upward. At k=1 the answer is
          fail. At k=5 it is pass. At k=7 it is fail again. The student has not moved. The data
          has not changed. The only thing you altered was how many opinions to collect.
        </P>
        <P>
          k is the one dial this model has, and it is the same dial you met two lessons ago
          wearing a different coat. At k=1 every training point gets its own little island of
          territory, and the model reproduces the training data perfectly — including its
          mistakes. That is overfitting, arrived at by a completely different route. Push k
          toward fifty-four and every query returns the majority class no matter where it sits.
          That is underfitting.
        </P>
        <P>
          The strip under the scatter plots accuracy at every k. The rescaled line climbs from
          83% at k=1 to about 91% by k=15. The raw line does the opposite: it starts at 78% and
          sags to 63%. Twenty-eight of these fifty-four students failed, so a rule that ignores
          the data entirely and says &ldquo;fail&rdquo; every time already scores 52%. At k=15
          the raw model is worth eleven points over knowing nothing.
        </P>
        <Callout tone="tip" title="Why the k values here are all odd">
          With two classes and an even k, a vote can tie, and then the model needs a
          tie-break rule that has nothing to do with the data. Using odd k sidesteps the problem
          entirely. With three or more classes ties come back regardless, and most libraries
          break them by falling back to the single nearest neighbour.
        </Callout>
      </LessonSection>

      <LessonSection id="when-distance-lies-to-you" title="When distance lies to you">
        <P>
          The raw line falling apart is not a quirk of this dataset. It is the flaw that makes
          this model worth teaching.
        </P>
        <P>
          &ldquo;Nearest&rdquo; means nearest by some measurement, and the obvious measurement is
          straight-line distance. Revision hours run from 0 to 12. Previous scores run from 20 to
          100. A gap of ten points on the previous exam and a gap of ten hours of revision count
          the same in that sum — and since the score axis is roughly eight times wider, it
          contributes roughly eight times as much. The model is not weighing your features. Your
          units are.
        </P>
        <P>
          Select <Strong>Coasting on a good record</Strong>: two hours of revision, a previous
          score of 80. In raw units the five nearest are whoever else scored around 80, three of
          whom passed, so the answer is pass. Rescale both features to run 0 to 1 and the
          neighbours become people who also barely revised. Five of five failed. Same data, same
          k, opposite answer.
        </P>
        <P>
          <Strong>Grinding with a bad record</Strong> is the mirror image and the more expensive
          error. Nine hours of revision, a weak previous score. Raw distance writes the student
          off three votes to two, on the strength of a number they have already done the work to
          overturn.
        </P>
        <Callout tone="warning" title="This one is on you, not the algorithm">
          Rescaling features is a decision you make before the model sees anything, and no
          error message will ever remind you. The two usual moves are squashing each feature onto
          0-1, or subtracting the mean and dividing by the standard deviation. Either fixes this.
          Forgetting both is one of the most common reasons a distance-based model quietly
          underperforms — and because the code still runs and still reports a number, nothing
          announces the mistake.
        </Callout>
        <P>
          One caution that will matter later: work out the scaling from the training data alone.
          If you compute the minimum and maximum across the whole dataset before splitting, the
          test set has already influenced how the training set is represented. That is a small
          leak, and leaks get a chapter of their own in Part 4.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "k-Nearest Neighbours has no training step. It stores the data and defers every decision to prediction time.",
          "k controls the same trade-off as model complexity: k=1 overfits and reproduces the noise, large k underfits and drifts toward the majority answer.",
          "Use an odd k with two classes so a vote cannot tie.",
          "Distance is measured in whatever units your columns happen to use, so a feature with a wide range silently dominates one with a narrow range.",
          "Rescale every feature before measuring distance, and compute the scaling from the training set only.",
          "Here, rescaling moved accuracy from 63% to 91% without touching the model. The fix was in the data, not the algorithm.",
        ]}
      />
    </div>
  );
}
