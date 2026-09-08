import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { NmsThreshold } from "@/components/computer-vision/NmsThreshold";

export function NonMaxSuppressionLesson() {
  return (
    <div>
      <Lead>
        A detector rarely proposes one box for a dog. It proposes a dozen, all roughly agreeing
        that a dog is there and disagreeing about the exact rectangle. Something has to throw the
        extras away.
      </Lead>

      <LessonSection id="a-dozen-boxes-for-one-dog" title="A dozen boxes for one dog">
        <P>
          Run a real detector over a photo of one dog and look at its raw output before any
          cleanup. You will not see one box. You will typically see somewhere between five and
          twenty, clustered tightly around the same animal, each one a slightly different size and
          position, each one confident that it has found a dog.
        </P>
        <P>
          This is not a bug in the detector. Every location near the real dog does
          contain most of a dog, so the network is not wrong to flag it — it is only wrong to flag
          it a dozen times over.
        </P>
      </LessonSection>

      <LessonSection id="keeping-the-most-confident-one" title="Keeping the most confident one">
        <P>
          Non-max suppression&rsquo;s first move is unconditional: sort every proposed box for the
          whole image by its confidence score and keep the single highest-scoring one outright, no
          comparison needed yet.
        </P>
        <P>
          That box becomes the first entry in the final output. Everything that happens next only
          decides what else, if anything, gets added to it.
        </P>
      </LessonSection>

      <LessonSection id="suppressing-its-neighbours" title="Suppressing its neighbours">
        <P>
          Walk through every remaining box in order of confidence, highest to lowest. For each
          one, compute its IoU — from the last lesson — against every box you have already kept.
          If that overlap clears a chosen threshold, discard the new box. If it does not, keep it.
        </P>
        <P>
          The logic is that much overlap is not two dogs standing precisely on top of each other.
          It is one dog, described twice. Suppressing the extra box loses nothing; keeping it would
          double-count the same animal in the final result.
        </P>
      </LessonSection>

      <NmsThreshold />

      <LessonSection
        id="what-a-badly-chosen-threshold-costs"
        title="What a badly chosen threshold costs"
      >
        <P>
          The threshold above fails in two directions, and the interactive shows both. Set it too
          low and boxes get suppressed on the slightest overlap — including a second,
          separate object sitting near the first one, which gets wrongly merged into a single
          detection.
        </P>
        <P>
          Set it too high and almost nothing gets suppressed — a dozen boxes around one dog
          survive, because none of them overlap each other by quite enough to trip the threshold,
          and your final output still reports several dogs where there is one.{" "}
          <Strong>There is no threshold that is safe for every photo</Strong>; it is tuned against
          a validation set, the same way the IoU threshold in the last lesson was.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A real detector's raw output over one object is usually a cluster of boxes, not one — every nearby location contains most of the object.",
          "Non-max suppression always keeps the single highest-confidence box in a cluster outright, with no comparison needed.",
          "Every remaining box is then discarded if its IoU with an already-kept box clears a threshold — heavy overlap almost certainly means the same object, not two.",
          "Set the threshold too low and it merges separate nearby objects into one detection.",
          "Set it too high and it fails to merge duplicates, leaving several boxes for a single object in the final output.",
        ]}
      />
    </div>
  );
}
