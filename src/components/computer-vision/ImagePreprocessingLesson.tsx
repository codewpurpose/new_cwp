import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { AugmentationPreview } from "@/components/computer-vision/AugmentationPreview";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";

export function ImagePreprocessingLesson() {
  return (
    <div>
      <Lead>
        You know a face is still a face upside down, in orange streetlight, cropped to the chin.
        A model trained on photos that were always right-side up, always evenly lit, always
        centred, does not know that at all. It only knows what sat in its training set, and if
        every one of those photos looked the same way, &ldquo;the same way&rdquo; is the only thing it has
        learned to recognise.
      </Lead>

      <LessonSection
        id="the-model-only-sees-what-you-feed-it"
        title="The model only sees what you feed it"
      >
        <P>
          There is no common sense underneath a trained model, ready to fall back on when a
          real photo does not match the training set. There is only the arithmetic that was
          fitted to whatever pixels it was shown. Photograph the same dog sideways, in shadow,
          from three metres further back, and a model trained exclusively on straight-on,
          daylight, close-up dogs has no guarantee of getting it right — not because it forgot,
          but because it never learned that case existed.
        </P>
        <P>
          <Strong>Everything downstream of this chapter assumes the input already looks
          reasonable.</Strong> Getting it there is not a formality before the real work starts.
          It is part of the real work.
        </P>
      </LessonSection>

      <LessonSection
        id="resizing-without-lying-about-the-content"
        title="Resizing without lying about the content"
      >
        <P>
          A model expects every input at one fixed size — say 224 by 224 — and your photos
          arrive at whatever size the camera produced, in whatever aspect ratio the scene
          happened to have. The laziest fix, stretching each photo to fit the target square,
          quietly lies about the content: a circular clock face comes out an oval, a tall
          person comes out squat.
        </P>
        <P>
          The honest options all trade something instead of hiding it. Pad the image with a
          plain border to reach the target aspect ratio before scaling, and you keep the shapes
          correct at the cost of some wasted pixels of background. Crop to the target ratio, and
          you keep the shapes correct at the cost of possibly cutting off part of the subject.
          Neither is free. Both are more honest than a stretch.
        </P>
      </LessonSection>

      <LessonSection
        id="normalising-onto-the-same-scale"
        title="Normalising onto the same scale"
      >
        <P>
          Raw pixel values run from 0 to 255, and a photo taken in bright sun and one taken at
          dusk can differ by hundreds of units in average brightness before either image says
          anything about content. Feed that difference straight into the arithmetic and the
          unusually bright photo simply outweighs the others — the same failure mode as an
          unscaled feature dominating a plain statistical model, for the same reason: the
          numbers are bigger, not more important.
        </P>
        <P>
          Normalising fixes the scale rather than the content: divide every pixel by 255 to land
          in the 0–1 range, or subtract the dataset&rsquo;s mean and divide by its standard deviation
          so brightness differences between photos stop swamping the differences that actually
          matter — edges, shapes, colour. If you use a dataset mean and standard deviation,
          compute them from the training photos only, and reuse those same two numbers on every
          validation, test and live image.
        </P>
      </LessonSection>

      <LessonSection
        id="augmentation-manufactures-variety-you-do-not-have"
        title="Augmentation manufactures variety you do not have"
      >
        <P>
          Collecting ten thousand more photos of the same object, shot from every angle and
          every lighting condition you can imagine, is expensive and usually impossible on a
          deadline. Augmentation gets you most of the same benefit from the photos you already
          have: rotate one, flip it, crop it a little differently, relight it, and you have
          taught the model something true without taking a single new picture — that the object
          is still the same object, regardless of its exact pixel arrangement.
        </P>
        <P>
          Try it below. Each toggle is one independent choice, and because the choices combine,
          four independent augmentations do not give you four new photos — they give you every
          combination of the four, all deterministic, all derived from one original.
        </P>
      </LessonSection>

      <AugmentationPreview />

      <Callout tone="tip" title="What augmentation cannot manufacture">
        Every augmented photo is still a variation on your one original scene, lighting rig, and
        camera. Augmentation multiplies variety around what you already collected — it does not
        add a new pose, background, or object you never photographed in the first
        place.
      </Callout>

      <Callout tone="warning" title="Two common augmentation mistakes">
        First, an augmentation must not change the right answer. Rotate a handwritten 6 by 180
        degrees and it becomes a 9 that is still labelled 6; flip a photo of text left to right
        and it stops being text. Pick only the transformations your real inputs could plausibly
        go through. Second, augment the training set only. Validation and test photos should look
        like the real inputs the model will meet, so they get resized and normalised, never
        randomly rotated or relit.
      </Callout>
      <P>
        Both halves of that in one run. Normalising uses numbers from the training photos only,
        and then a 6 from the test set is rotated by 180 degrees.
      </P>
      <CodeBlock
        label="rotate_a_six.py"
        code={`import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

images, labels = load_digits(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    images, labels, test_size=0.3, random_state=0)

# Normalise with numbers computed from the training photos only.
mean, std = X_train.mean(), X_train.std()
model = KNeighborsClassifier(3).fit((X_train - mean) / std, y_train)
print(f"test accuracy: {model.score((X_test - mean) / std, y_test):.0%}")

# An augmentation that changes the right answer: rotate a 6 by 180 degrees.
six = X_test[y_test == 6][0].reshape(8, 8)
for name, image in [("as drawn", six), ("rotated 180", np.rot90(six, 2))]:
    guess = model.predict(((image.reshape(1, -1)) - mean) / std)[0]
    print(f"a 6, {name:12} -> the model says {guess}")`}
      />
      <P>
        The model reads the 6 correctly, and calls the rotated one a 9. If that rotation were
        used as augmentation, the training set would be full of 9s labelled 6.
      </P>

      <TakeawayCard
        items={[
          "A trained model has no fallback beyond what its training photos actually contained — it does not generalise to a case it never saw by common sense.",
          "Stretching an image to a fixed size distorts its content; padding or cropping keeps shapes honest at the cost of wasted background or a tighter frame.",
          "Normalising pixel values onto a shared scale stops an unusually bright photo from dominating the arithmetic the way an unscaled feature would.",
          "Augmentation manufactures variety from photos you already have, rather than requiring you to collect it, by rotating, flipping, cropping, and relighting.",
          "Independent augmentations combine: four on/off choices produce every combination of the four, not just four new images.",
          "Augmentation still only varies what you photographed — it cannot invent a pose, background, or object absent from the original set.",
          "Only use augmentations that keep the label true, and apply them to training photos only — never to validation or test images.",
        ]}
      />
    </div>
  );
}
