import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function ImageSegmentationLesson() {
  return (
    <div>
      <Lead>
        A rectangle around a dog is never just the dog. It is the dog plus however much fence,
        grass, or empty air happened to be inside the smallest box that contained it.
      </Lead>

      <LessonSection
        id="a-box-still-includes-the-background"
        title="A box still includes the background"
      >
        <P>
          Take a photo of a dog with one leg stretched forward and its tail out behind it. The
          smallest rectangle that contains the whole animal also contains the gap under its raised
          leg, the triangle of grass behind its tail, and a strip of fence on either side. None of
          that is dog.
        </P>
        <P>
          Boxes are cheap to draw and cheap to grade with IoU, which is exactly why the last few
          lessons used them. But for some questions a box&rsquo;s precision is the whole point, and
          a rectangle around an irregular shape structurally cannot deliver it.
        </P>
      </LessonSection>

      <LessonSection id="a-label-for-every-pixel" title="A label for every pixel">
        <P>
          Segmentation asks a different question entirely: not &ldquo;where is a box that contains
          the object&rdquo;, but &ldquo;for every single pixel in the photo, what does it belong
          to&rdquo;. The output is not four numbers — it is one label per pixel, for every pixel in
          the image.
        </P>
        <P>
          For a 640×480 photo that is 307,200 individual decisions, not one. The result is a mask
          that follows the actual outline of the dog: the gap under its leg is correctly labelled
          background, the strip of fence is correctly labelled fence, and only the pixels that are
          actually dog are labelled dog.
        </P>
      </LessonSection>

      <LessonSection
        id="semantic-versus-instance"
        title="Semantic versus instance, and why the difference matters"
      >
        <P>
          There are two real versions of this question, and they are not the same question wearing
          different names. Semantic segmentation labels every dog pixel in the photo
          &ldquo;dog&rdquo; — full stop. If there are two dogs standing side by side, every pixel
          belonging to either of them gets the identical label, and the output has no idea there
          are two animals rather than one oddly shaped one.
        </P>
        <P>
          Instance segmentation keeps the pixel-level precision and adds the count back: each
          individual dog gets its own separate mask, so the two overlapping animals are known,
          correctly, to be two distinct objects rather than one. Which version you need depends
          entirely on the question:{" "}
          <Strong>
            counting cars in a parking lot needs instance segmentation; measuring what fraction of
            a photo is sky needs only semantic
          </Strong>
          .
        </P>
      </LessonSection>

      <LessonSection id="what-you-pay-for-that-precision" title="What you pay for that precision">
        <P>
          Producing a segmentation label needs a human to trace the actual outline of every object
          in every training photo, not draw a rectangle around it or type one word describing the
          whole image. Labelling a single photo this way routinely takes many times longer than
          boxing it, and boxing it already takes longer than giving the whole photo one label.
        </P>
        <P>
          The models pay a cost too. Predicting one label per pixel is a larger, slower prediction
          than four box coordinates, so a segmentation model is typically slower to run than a
          comparable detector on the same photo. Precision bought at the pixel level is bought with
          real hours of labelling time and real milliseconds of runtime, not a free upgrade over
          drawing a box.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A rectangular box around an irregular object always includes some background — the gap under a raised leg, the fence behind a tail — that a mask would correctly exclude.",
          "Segmentation's actual output is a label for every pixel in the image, not four box coordinates, producing a mask that follows the object's real outline.",
          "Semantic segmentation labels every pixel of a class the same way and has no idea how many separate objects it is looking at.",
          "Instance segmentation keeps that precision and adds the count back, giving each individual object — including two overlapping ones — its own separate mask.",
          "That precision is paid for twice: pixel-level labels take far longer for a human to produce than a box or a single tag, and segmentation models are typically slower to run than detectors.",
        ]}
      />
    </div>
  );
}
