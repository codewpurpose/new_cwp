import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function FeatureDetectorsLesson() {
  return (
    <div>
      <Lead>
        Take two photos of the same building, one from the pavement and one from across the
        street, angled and cropped differently, shot an hour apart under a different sky. Your
        eyes match them up in an instant. A computer comparing raw pixel values cannot, because
        almost none of those pixel values survived the move. Something in the image has to.
      </Lead>

      <LessonSection id="a-point-worth-finding-again" title="A point worth finding again">
        <P>
          The problem is not &ldquo;what is in this photo&rdquo;, it is narrower and more mechanical than
          that: given a point in one photo, find the same physical point — the same rivet, the
          same window corner — in a second photo of the same scene shot from a different angle,
          a different crop, a different light. Solve that reliably and panorama stitching,
          3D reconstruction, and tracking an object across video frames all become the same
          problem solved twice.
        </P>
        <P>
          Comparing raw pixels does not work. The pixel that sat at row 40, column 120 in the
          first photo is not at the same coordinates in the second, and even if you found the
          right coordinates, its brightness has already changed with the light.
        </P>
      </LessonSection>

      <LessonSection id="why-corners-beat-flat-patches" title="Why corners beat flat patches">
        <P>
          Look at a three-by-three patch of clear sky. Now look at the patch of sky next to it.
          They are identical, and so is every other patch of sky in the photo. A flat, uniform
          region carries no information about where inside itself it is — slide a window over it
          in any direction and the view does not change. It is unlocatable, in principle, not
          just in practice.
        </P>
        <P>
          Now look at a corner — two edges meeting, like the top of a window frame.{" "}
          <Strong>Slide the window in any direction and the view changes.</Strong> Up, down,
          left, right, diagonally — every direction shows you something different. That property,
          not the sharpness of the angle, is what a corner detector is actually testing for, and
          it is exactly what makes a corner locatable again in a second photo.
        </P>
        <CompareGrid
          items={[
            {
              title: "Flat patch",
              tone: "caution",
              children: (
                <P>
                  Shift the window a few pixels in any direction and the pixels underneath barely
                  change. Nothing to distinguish this position from its neighbours.
                </P>
              ),
            },
            {
              title: "Corner",
              tone: "positive",
              children: (
                <P>
                  Shift the window and the pixels underneath change sharply in every direction.
                  This position is distinguishable from everywhere nearby.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="describing-a-point-so-it-survives"
        title="Describing a point so it survives a rotation"
      >
        <P>
          Finding a corner is only half the job. You still need to recognise it again in a
          second photo, and &ldquo;the pixels near coordinate (140, 62)&rdquo; is useless once the camera has
          moved. The answer is a <Strong>descriptor</Strong>: a small vector of numbers computed
          from the neighbourhood around the keypoint, built deliberately so that rotating the
          patch, brightening it, or scaling it changes the descriptor as little as possible.
        </P>
        <P>
          A typical descriptor looks at the local pattern of gradient directions — which way
          brightness is changing, and how much, in the ring of pixels around the point — and
          bins that into a fixed-length numeric fingerprint. Two photos of the same corner, shot
          from different angles, should produce two descriptors that are close to each other in
          that numeric space, even though not one raw pixel value matches.
        </P>
      </LessonSection>

      <LessonSection
        id="matching-two-photos-by-their-points"
        title="Matching two photos by their points"
      >
        <P>
          Detect a few hundred keypoints in each photo, compute a descriptor for each one, and
          matching the photos becomes matching the descriptors: for every keypoint in photo one,
          find the keypoint in photo two whose descriptor is numerically closest. Enough
          consistent matches and you can work out exactly how the camera moved between the two
          shots — which is the whole basis of panorama stitching.
        </P>
        <Callout tone="note" title="Where this line of work went">
          For two decades, hand-designed descriptors like this one were the standard approach to
          almost every vision problem. They were eventually outcompeted by features a network
          learns directly from data, rather than ones a person designed by hand — the subject of
          the chapters ahead.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Matching the same physical point across two photos of a scene fails on raw pixel values, because viewpoint and lighting change almost everything.",
          "A flat patch looks identical to its own neighbours in every direction, which makes it unlocatable in principle, not just difficult.",
          "A corner looks different from every direction you view it, which is exactly what makes it findable again in a second photo.",
          "A descriptor is a numeric fingerprint of a keypoint's neighbourhood, designed to stay close to itself under rotation and lighting change.",
          "Matching two photos reduces to pairing up their keypoint descriptors — the basis for panorama stitching and, for years, most of computer vision.",
          "Hand-designed descriptors like these were eventually outcompeted by features a network learns on its own.",
        ]}
      />
    </div>
  );
}
