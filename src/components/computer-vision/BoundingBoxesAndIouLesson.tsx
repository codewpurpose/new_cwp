import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { IouDragger } from "@/components/computer-vision/IouDragger";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function BoundingBoxesAndIouLesson() {
  return (
    <div>
      <Lead>
        Two predicted boxes can both look roughly right to your eye and be numerically nowhere
        near each other. Intersection over Union is the number that ends the argument.
      </Lead>

      <LessonSection id="two-boxes-and-a-disagreement" title="Two boxes and a disagreement">
        <P>
          Draw a box around a dog by hand and someone else draws their own box around the same
          dog, and the two will not match exactly. One runs a little wide, the other clips an ear.
          Both look &ldquo;about right&rdquo;.
        </P>
        <P>
          &ldquo;About right&rdquo; is not something a benchmark can grade. Comparing a
          detector&rsquo;s predicted box against the true box needs a single number, computed the
          same way every time, that turns two rectangles into one verdict.
        </P>
      </LessonSection>

      <LessonSection id="the-overlap-divided-by-the-union" title="The overlap, divided by the union">
        <P>
          Intersection over Union, IoU, is exactly what its name says: take the area where the two
          boxes overlap, and divide it by the total area either box covers.
        </P>
        <P>
          Take a concrete pair. A true box covering 12,000 square pixels and a predicted box
          covering 10,000 square pixels overlap in a region of 8,000 square pixels. The union —
          everything covered by at least one of the two boxes — is 12,000 + 10,000 − 8,000 =
          14,000 (subtracting the overlap once, so it is not counted twice). IoU is 8,000 divided
          by 14,000, which is about 0.57.
        </P>
        <P>
          Two boxes sitting exactly on top of each other score 1.0. Two boxes that do not touch at
          all score 0. Everything a detector actually produces lands somewhere in between, and the
          interactive below lets you watch that number move.
        </P>
        <div className="mt-6">
          <RevealCard
            summaryTag="Try it yourself"
            summary="The true box is 100 by 100 pixels. The predicted box is exactly the same size but sits 50 pixels to the right. Is it a hit at an IoU threshold of 0.5?"
            detailTag="Answer"
            detail="The overlap is 50 × 100 = 5,000. The union is 10,000 + 10,000 − 5,000 = 15,000. IoU = 5,000 / 15,000 ≈ 0.33, so it is a miss — even though half of the true box is covered. Sliding a box by half its width costs far more than half the IoU."
            openLabel="Show the answer"
            closeLabel="Hide the answer"
          />
        </div>
      </LessonSection>

      <IouDragger />

      <LessonSection
        id="what-counts-as-a-correct-detection"
        title="What counts as a correct detection"
      >
        <P>
          IoU is what turns &ldquo;roughly right&rdquo; into a hard yes or no. A detection only
          counts as correct if its IoU against the true box clears a chosen threshold — everything
          at or above it is a hit, everything below is a miss, with nothing in between.
        </P>
        <P>
          Nudge the predicted box in the interactive above until the number crosses 0.5, and
          notice there is no visual moment where the box &ldquo;suddenly&rdquo; becomes wrong. The
          picture changes continuously. <Strong>The verdict does not</Strong> — it flips the
          instant the number crosses the line.
        </P>
        <P>
          Here is IoU as a function, with a 100-by-100 prediction slid further and further right
          of the true box.
        </P>
        <CodeBlock
          label="iou.py"
          code={`def area(box):
    x1, y1, x2, y2 = box
    return max(0, x2 - x1) * max(0, y2 - y1)

def iou(a, b):
    # The overlap is itself a box: the inner edges of the two.
    overlap = (max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3]))
    inter = area(overlap)
    union = area(a) + area(b) - inter      # subtract the overlap once
    return inter / union

truth = (0, 0, 100, 100)                   # (left, top, right, bottom) in pixels
for shift in [0, 10, 25, 50, 100]:         # slide the prediction right
    predicted = (shift, 0, 100 + shift, 100)
    score = iou(truth, predicted)
    verdict = "hit" if score >= 0.5 else "miss"
    print(f"shifted {shift:3} px: IoU {score:.2f}  ({verdict} at 0.5)")`}
        />
        <P>
          A 25-pixel slide still scores 0.60, a hit. At 50 pixels it is 0.33, the miss from the
          exercise above. Change the threshold to 0.75 and the 25-pixel box becomes a miss
          without moving.
        </P>
      </LessonSection>

      <LessonSection id="why-one-half-is-a-choice-not-a-law" title="Why 0.5 is a choice, not a law">
        <P>
          0.5 is the threshold you will see quoted most often, but it is a convention, not a
          property of geometry. A benchmark can and does choose differently — some standard
          evaluations report results at 0.75, a noticeably stricter bar, and some report a whole
          curve of scores across every threshold from 0.5 to 0.95 rather than commit to one.
        </P>
        <P>
          Raising the threshold does not just get &ldquo;harder&rdquo; in the abstract. It can
          flip a specific detection from correct to wrong without the predicted box moving a
          single pixel — the box stays exactly where it was, and the number needed to call it
          right went up underneath it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Two boxes can both look right by eye while scoring very differently — IoU exists to replace that judgement with one number.",
          "IoU is the overlap area divided by the union area: identical boxes score 1.0, boxes that do not touch score 0.",
          "A detection only counts as correct once its IoU against the true box clears a chosen threshold — there is no partial credit at the boundary.",
          "0.5 is the threshold quoted most often, but it is a convention. Stricter benchmarks require 0.75 or report accuracy across a whole range of thresholds.",
          "Raising the threshold can turn a previously correct detection into a wrong one without the predicted box changing at all.",
        ]}
      />
    </div>
  );
}
