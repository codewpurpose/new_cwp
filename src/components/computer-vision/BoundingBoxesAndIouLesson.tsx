import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { IouDragger } from "@/components/computer-vision/IouDragger";

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
      </LessonSection>

      <LessonSection id="why-one-half-is-a-choice-not-a-law" title="Why 0.5 is a choice, not a law">
        <P>
          0.5 is the threshold you will see quoted most often, but it is a convention, not a
          property of geometry. A benchmark can and does choose differently — some standard
          evaluations report accuracy at 0.75, a noticeably stricter bar, and some report a whole
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
