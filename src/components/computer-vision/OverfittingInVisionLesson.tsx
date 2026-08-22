import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { AugmentationGapDial } from "@/components/computer-vision/AugmentationGapDial";

export function OverfittingInVisionLesson() {
  return (
    <div>
      <Lead>
        You assume a model that scores 99% on its training photos must be excellent. It might be —
        or it might have simply memorised ten thousand specific images, pixel quirks and all, the
        way you could memorise the answer key to a test you have already seen. The only way to
        tell the difference is to check it against photos it has never met.
      </Lead>

      <LessonSection
        id="millions-of-parameters-thousands-of-photos"
        title="Millions of parameters, thousands of photos"
      >
        <P>
          A mid-sized convolutional network commonly has 20 to 60 million adjustable weights. A
          respectable but modest training set for a narrow classification task might be 10,000
          photos. Put those two numbers next to each other and the arithmetic is uncomfortable: the
          network has thousands of times more free parameters than it has training examples to
          constrain them.
        </P>
        <P>
          That much capacity does not have to find a general rule connecting pixels to labels. It
          has more than enough room to assign each of the 10,000 training photos its own private
          shortcut — a scratch on the lens, a particular background colour, a JPEG compression
          artefact — and get every single one right without learning anything that transfers to a
          photo it has not seen.
        </P>
      </LessonSection>

      <LessonSection id="what-memorising-a-photo-looks-like" title="What memorising a photo looks like">
        <P>
          Memorisation is not a vibe you get from staring at the model — it is a specific pattern
          in two numbers. <Strong>Training accuracy near 100%, validation accuracy meaningfully
          lower</Strong> — a network hitting 99% on the photos it trained on and 71% on photos it
          did not is not a slightly-imperfect learner. It is a model that solved the training set
          the way you would solve a jigsaw by tracing the picture on the box.
        </P>
        <P>
          That gap between the two numbers is the actual definition of overfitting used throughout
          this track, not an approximation of it. A model with no gap at all — training and
          validation accuracy close together — has learned something that holds up outside the
          exact examples it was shown, whatever the absolute numbers happen to be.
        </P>
      </LessonSection>

      <LessonSection
        id="augmentation-as-a-defence-not-a-decoration"
        title="Augmentation as a defence, not a decoration"
      >
        <P>
          Augmentation — the rotating, cropping and relighting from the earlier preprocessing
          chapter — turns out to be a genuine defence here, not just a way to manufacture more
          data. Every time the network sees the same photo again but rotated four degrees, cropped
          differently, or slightly darker, it is forced to find a pattern that survives all those
          versions. Memorising one exact arrangement of pixels stops working, because that exact
          arrangement is never presented twice.
        </P>
        <P>
          Drag the slider below through eleven fixed augmentation strengths, trained and validated
          on the same 10,000-photo set each time. At strength 0, training accuracy sits at 99% and
          validation lags at 71% — a 28-point gap, textbook memorisation. Turn augmentation up and
          watch the gap close: by strength 6, both numbers sit at 89%, an 18-point improvement in
          validation accuracy for a 10-point cost in training accuracy the model never deserved in
          the first place.
        </P>
      </LessonSection>

      <AugmentationGapDial />

      <LessonSection id="when-more-augmentation-stops-helping" title="When more augmentation stops helping">
        <P>
          The gap does not keep closing forever. Past strength 6 or 7, both training and
          validation accuracy start falling together — by strength 10, training accuracy has
          dropped to 78% and validation to 76%. The gap stays small, but both numbers are now
          worse than they were at the sweet spot.
        </P>
        <P>
          That decline is not noise, it is the honest cost of the technique. Rotate a photo 45
          degrees, crop out half of it, and wash out its colour, and at some point the augmented
          image no longer resembles anything a human — or a well-behaved model — could confidently
          learn from. <Strong>Augmentation stops being a defence against memorisation and starts
          being a defence against the actual signal in the photo.</Strong>
        </P>
        <Callout tone="warning" title="There is a sweet spot, not a rule">
          &ldquo;More augmentation is always better&rdquo; is false in exactly the way &ldquo;more
          training data is always better&rdquo; usually is not. Past the point where validation
          accuracy peaks, every additional unit of augmentation strength is pure cost. Find that
          peak on validation data specifically — not on training accuracy, which will look
          fine right up until the augmentation is destroying the images.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A mid-sized network's tens of millions of parameters can outnumber a training set's photos by a thousand times or more, which is more than enough capacity to memorise every example individually.",
          "Overfitting is defined by the gap between training and validation accuracy, not by either number alone — near-100% training accuracy with a much lower validation score is the signature, not a coincidence.",
          "Augmentation defends against memorisation because it stops the network from ever seeing the exact same arrangement of pixels twice.",
          "In the fixed example, the training/validation gap fell from 28 points at zero augmentation to near zero by moderate strength, with validation accuracy rising the whole way.",
          "Past the sweet spot, more augmentation stops helping and starts hurting both numbers together, because the images no longer resemble anything worth learning from.",
        ]}
      />
    </div>
  );
}
