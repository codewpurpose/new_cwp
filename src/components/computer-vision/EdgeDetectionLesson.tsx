import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { EdgeThreshold } from "@/components/computer-vision/EdgeThreshold";

export function EdgeDetectionLesson() {
  return (
    <div>
      <Lead>
        Point at any edge in a photo and you can name it instantly: the rim of a mug, the collar
        of a shirt, the line where a roof meets the sky. Nobody drew that line. It is not stored
        anywhere in the file. It is something you compute, and the computation is smaller than
        it sounds.
      </Lead>

      <LessonSection id="brightness-that-changes-fast" title="Brightness that changes fast">
        <P>
          Take two adjacent pixels with values 118 and 121. Neighbours, three brightness levels
          apart, on a scale that runs to 255. Nothing happened there. Now take two adjacent
          pixels with values 30 and 210. That is not a gentle slope, it is a cliff, and a cliff
          in brightness between neighbouring pixels is the entire definition of an edge.
        </P>
        <P>
          <Strong>An edge is not a line the camera drew.</Strong> It is a place where the
          brightness surface has a steep slope, and steepness is measured pixel to pixel,
          nowhere else.
        </P>
      </LessonSection>

      <LessonSection id="turning-a-slope-into-a-line" title="Turning a slope into a line">
        <P>
          The slope itself is called a gradient — at every pixel it has a magnitude (how steep)
          and a direction (which way brightness is rising fastest). Compute it by comparing each
          pixel to its right neighbour and its neighbour below, and add up how much they
          disagree. A flat wall of paint gives you a gradient magnitude near zero at every pixel
          inside it. The join between wall and doorway gives you a spike.
        </P>
        <P>
          A gradient magnitude is still just a number, though, and a number is not a yes-or-no
          answer. The whole trick of edge detection is one more step:{" "}
          <Strong>pick a cutoff, and call anything above it an edge.</Strong> That single
          decision — a threshold — is what turns a field of slopes into a clean line drawing.
        </P>
      </LessonSection>

      <LessonSection
        id="the-threshold-is-a-judgement-call"
        title="The threshold is a judgement call"
      >
        <P>
          There is no correct threshold, only a threshold that suits what you are looking for.
          Set it low and you catch every real edge — and also every camera sensor&rsquo;s noise, every
          strand of fabric texture, every visual disagreement between two pixels that happened to
          land on different sides of a shadow. Set it high and the noise goes away, but so does
          a faint, real edge: the soft border of a shadow, a low-contrast seam between two similar
          greys.
        </P>
        <P>
          Drag the threshold below and watch it happen on a ten-by-ten photo of a house. At the
          low end the whole outline shows. Somewhere past the middle, the faintest steps in the
          roofline are the first to disappear — not because they stopped being edges, but because
          you told the threshold not to count them anymore.
        </P>
      </LessonSection>

      <EdgeThreshold />

      <LessonSection id="what-edges-cannot-tell-you" title="What edges cannot tell you">
        <P>
          Run this on any photo and you get a drawing made entirely of lines — and nothing else.
          An edge map has no idea what is on either side of a line. It cannot tell you the shape
          on the left is a dog. It cannot even tell you the line closes into a shape at all; a
          gap of a few missing pixels along one edge is enough to turn a closed outline into an
          open one, and the edge detector has no way to notice.
        </P>
        <Callout tone="note" title="A hint, not an answer">
          Edge detection is the first stage in a pipeline, never the whole pipeline. Everything
          that happens after it — grouping edges into shapes, matching shapes to objects — is a
          separate problem, solved by separate machinery, starting in the next few chapters.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "An edge is a place where brightness changes fast between neighbouring pixels, not a line anyone drew or stored.",
          "The gradient gives every pixel a magnitude and a direction; thresholding that magnitude is what turns a slope into a binary edge decision.",
          "A low threshold catches real edges and also noise and texture; a high one misses real but faint edges, such as a soft shadow boundary.",
          "There is no universally correct threshold, only one suited to a particular photo and a particular purpose.",
          "An edge map cannot tell you what is on either side of a line, or even that the line closes into a shape — later stages have to interpret it.",
        ]}
      />
    </div>
  );
}
