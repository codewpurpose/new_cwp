import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { NmsThreshold } from "@/components/computer-vision/NmsThreshold";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";

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
        <P>
          In practice this runs separately for each class. A box labelled &ldquo;dog&rdquo; never
          suppresses a box labelled &ldquo;person&rdquo;, however much they overlap — someone
          holding a puppy is two objects, not one described twice.
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
          a validation set that looks like the scenes you expect. Crowded scenes, where real
          objects genuinely overlap, usually want a higher threshold than sparse ones.
        </P>
        <P>
          The six boxes from the interactive, run through the algorithm at three thresholds. All
          of them are labelled dog, so every box is compared with every kept box.
        </P>
        <CodeBlock
          label="nms.py"
          code={`def iou(a, b):
    ix = max(0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    union = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / union

# (left, top, right, bottom, confidence), all labelled "dog".
# Five boxes crowd one dog; box f sits on a second dog nearby.
boxes = {
    "a": (60, 60, 200, 160, 0.95), "b": (68, 58, 208, 158, 0.91),
    "c": (55, 66, 195, 166, 0.88), "d": (72, 70, 212, 170, 0.82),
    "e": (50, 50, 190, 150, 0.77), "f": (130, 100, 270, 200, 0.85),
}

def nms(boxes, threshold):
    kept = []
    for name in sorted(boxes, key=lambda n: boxes[n][4], reverse=True):
        if all(iou(boxes[name], boxes[k]) <= threshold for k in kept):
            kept.append(name)
    return kept

for threshold in [0.1, 0.5, 0.9]:   # try your own
    print(f"threshold {threshold}: kept {nms(boxes, threshold)}")`}
        />
        <P>
          At 0.5 it keeps a and f, one box per dog. At 0.1 the second dog&rsquo;s box f is
          swallowed by a, and at 0.9 all six survive.
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
