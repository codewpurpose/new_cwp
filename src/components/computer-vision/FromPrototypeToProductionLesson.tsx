import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function FromPrototypeToProductionLesson() {
  return (
    <div>
      <Lead>
        A notebook cell that prints 94% accuracy feels finished. It is not a product — it is a
        measurement of one static test set, taken once, on hardware that never changes and a
        camera that never ages. A product is a camera bolted to a wall for three years, a phone
        that is not this year&rsquo;s, and a latency budget that does not care how good your model
        tested.
      </Lead>

      <LessonSection
        id="the-notebook-number-was-never-the-product"
        title="The notebook number was never the product"
      >
        <P>
          Every metric this track has built up — accuracy, the confusion matrix, mAP — describes
          performance on a fixed test set, measured once, under conditions that held still for the
          duration of the measurement. That number is real and it is useful for comparing models.
          It is not a description of what happens when the same model faces a continuous stream of
          camera frames arriving from the actual world, which does not hold still.
        </P>
        <P>
          Production input is not a bigger version of the test set. It is a different kind of thing
          entirely: unbounded, arriving in real time, drawn from conditions the test set could only
          sample a slice of. <Strong>A 94% test accuracy is a fact about the test set, not a promise
          about tomorrow&rsquo;s camera feed.</Strong>
        </P>
      </LessonSection>

      <LessonSection
        id="the-camera-you-ship-to-is-not-the-camera-you-trained-on"
        title="The camera you ship to is not the camera you trained on"
      >
        <P>
          A deployed camera drifts, in ways a training set fixed at one point in time cannot
          anticipate. A security camera&rsquo;s lens picks up a scratch or a light film of dust over
          months of outdoor exposure. Its white balance shifts gradually with the seasons, as the
          colour temperature of daylight itself changes. A phone released two years after the
          training photos were captured carries a different camera sensor, a different default
          sharpening pipeline, sometimes a visibly different colour response out of the box.
        </P>
        <P>
          None of this shows up as a dramatic failure. It shows up as a slow, unannounced decline —
          the model still runs, still returns confident-looking numbers, and is quietly working
          against slightly different input than the one it was tuned against.
        </P>
      </LessonSection>

      <LessonSection
        id="the-latency-budget-you-do-not-get-to-ignore"
        title="The latency budget you do not get to ignore"
      >
        <P>
          A live video feed at 30 frames per second hands the model a new frame every 33
          milliseconds, whether or not it has finished with the last one. A large, highly accurate
          model that takes 200 milliseconds per frame is not a slower version of a usable system —
          it is unusable at that frame rate, full stop, regardless of how it scored offline.
        </P>
        <P>
          This is a genuine trade-off against accuracy, not an implementation footnote to solve
          later. A smaller, faster, slightly less accurate model that keeps up with 33 milliseconds
          per frame is often the only real option; a bigger model that cannot keep up does not get
          partial credit for its offline score.
        </P>
        <Callout tone="tip" title="The budget, concretely">
          33ms per frame at 30fps. 16.7ms at 60fps. If inference plus preprocessing plus any
          post-processing does not fit inside that number, the system falls behind the incoming
          feed — it does not just run a little slower, it starts processing frames that are already
          stale.
        </Callout>
      </LessonSection>

      <LessonSection
        id="monitoring-a-model-nobody-is-relabelling"
        title="Monitoring a model nobody is relabelling"
      >
        <P>
          A benchmark had labels: every image had a known right answer, so accuracy could be
          computed directly. Production traffic has no such thing — nobody is sitting behind the
          live camera feed manually labelling every frame the moment it arrives, and a clean
          accuracy number requires exactly that.
        </P>
        <P>
          Monitoring in practice means watching proxies instead of the real metric. A model&rsquo;s
          confidence-score distribution drifting lower over weeks, even without any single dramatic
          failure, is a signal something in the input has shifted. A sudden spike in low-confidence
          predictions on a specific camera is a signal worth investigating before it becomes a
          user complaint. User-reported corrections, sparse as they are, are often the closest thing
          to ground truth a production system gets in real time.
        </P>
        <ChecklistCard
          title="What to actually watch, absent ground truth"
          items={[
            "The shape of the confidence-score distribution over time, not just its average.",
            "Sudden spikes in low-confidence predictions, broken out by camera or device if possible.",
            "User-reported corrections, even at low volume — they are close to the only ground truth available.",
            "Any known hardware or firmware change on the deployed cameras, correlated against the above.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A benchmark score is a fact about a static test set measured once; it is not a promise about a continuous, real-time production camera feed.",
          "Deployed cameras drift from what the model trained on through scratched lenses, seasonal white-balance shifts, and newer sensor generations, and the decline is usually gradual, not dramatic.",
          "At 30 frames per second a model has roughly 33 milliseconds per frame; a 200-millisecond model is unusable at that rate regardless of its offline accuracy.",
          "Choosing a smaller, faster, slightly less accurate model to fit the latency budget is a genuine engineering trade-off, not a footnote to accept reluctantly.",
          "Production traffic has no automatic ground truth, so monitoring means watching proxy signals — confidence-score drift, spikes in low-confidence predictions, user corrections — rather than a clean accuracy number.",
        ]}
      />
    </div>
  );
}
