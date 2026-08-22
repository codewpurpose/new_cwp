import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ThresholdCurve } from "@/components/computer-vision/ThresholdCurve";

export function MeanAveragePrecisionLesson() {
  return (
    <div>
      <Lead>
        Ask a classifier &ldquo;is this right?&rdquo; and the answer is yes or no, one photo, one
        label. Ask a detector the same question and it does not know what you mean — right about
        which of its eleven boxes? Right about the class, wrong about the box by how much? Missing
        two objects entirely? Detection needed a different kind of number, and mAP is what it got.
      </Lead>

      <LessonSection
        id="why-accuracy-does-not-transfer-to-detection"
        title="Why accuracy does not transfer to detection"
      >
        <P>
          Accuracy assumes one prediction per example: the model says a label, the label is right
          or wrong, divide correct by total. A detector breaks that assumption before you can even
          start counting. One photo might produce zero predictions, three, or eleven, and the
          number of predictions has no fixed relationship to the number of real objects in the
          scene.
        </P>
        <P>
          A prediction can also be right and wrong <Strong>at the same time</Strong>: correct class,
          badly placed box; well-placed box, wrong class; or a box that overlaps two real objects
          and cannot be cleanly credited to either. &ldquo;Accuracy&rdquo; has no sensible
          definition here, because there is no fixed-size list of comparisons to divide correct by
          total.
        </P>
      </LessonSection>

      <LessonSection
        id="precision-and-recall-again-with-boxes"
        title="Precision and recall again, now with boxes"
      >
        <P>
          The fix is the same two numbers a plain classifier uses, redefined for boxes.{" "}
          <Strong>Precision</Strong> asks: of everything the model flagged, how much was real?{" "}
          <Strong>Recall</Strong> asks: of everything real, how much did it catch? &ldquo;Correct&rdquo;
          now means the predicted box overlapped a real one enough — the IoU threshold from the
          earlier chapter — and cleared the model&rsquo;s confidence threshold too.
        </P>
        <P>
          Ten fixed detections below are already labelled correct or incorrect against that IoU
          test, sorted by how confident the model was. Slide the threshold down and more of them
          get flagged: precision and recall move, and not always in the direction you would guess.
        </P>
      </LessonSection>

      <ThresholdCurve />

      <LessonSection id="averaging-across-every-threshold" title="Averaging across every threshold">
        <P>
          Notice precision does not fall smoothly as the threshold drops — it dips whenever a false
          alarm gets included, then partially recovers when the next correct detection joins. Pick
          any single threshold to report and you are making an arbitrary call about where on that
          jagged curve to stand.
        </P>
        <P>
          <Strong>Average precision</Strong> sidesteps the choice: instead of one threshold, take
          the precision value at every point along the sweep and average them. It is a way of
          scoring the whole trade-off curve with one number instead of committing to a threshold
          nobody agreed on in advance. <Strong>Mean</Strong> average precision then averages that
          score again, across every object class the detector was tested on — one AP for
          &ldquo;pedestrian&rdquo;, one for &ldquo;bicycle&rdquo;, one for &ldquo;traffic
          light&rdquo;, meaned into the single number that gets reported.
        </P>
      </LessonSection>

      <LessonSection id="what-map-still-will-not-tell-you" title="What mAP still will not tell you">
        <P>
          mAP quietly bakes in a choice it never surfaces: the IoU threshold that defined
          &ldquo;correct&rdquo; in the first place. mAP at IoU 0.5 is a much easier bar to clear
          than the stricter mAP averaged over IoU 0.5 through 0.95 that benchmarks like COCO now
          report — the same detector can score respectably on one and mediocrely on the other, and
          &ldquo;mAP&rdquo; alone does not say which was used.
        </P>
        <P>
          It also treats every miss as equally costly, which is never true in practice. A detector
          that misses a parked car and one that misses a pedestrian stepping into the road produce
          the same one-point deduction to AP, and only one of those two failures matters at
          highway speed. <Strong>A single mAP number is a fair summary of overall detection
          quality and a poor guide to which failures you can actually tolerate.</Strong>
        </P>
        <Callout tone="warning" title="Read the fine print">
          Before comparing two reported mAP scores, check they used the same IoU threshold and the
          same class list. A 0.5 mAP of 62 and a 0.5:0.95 mAP of 41 can describe the exact same
          detector.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Detection has a variable number of predictions per image, some right, some wrong, some missing — plain accuracy has no sensible definition for it.",
          "Precision and recall return with boxes, where 'correct' means a prediction cleared both an IoU test against ground truth and the confidence threshold.",
          "Average precision summarises the whole precision/recall sweep into one number rather than committing to an arbitrary threshold; mean average precision averages that again across every class.",
          "mAP hides which IoU threshold was used to define 'correct' — 0.5 and the stricter 0.5:0.95 average produce very different numbers for the same model.",
          "mAP treats every missed object as equally costly, when in practice missing a pedestrian and missing a parked car are not remotely the same failure.",
        ]}
      />
    </div>
  );
}
