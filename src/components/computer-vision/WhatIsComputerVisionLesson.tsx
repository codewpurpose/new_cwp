import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhatIsComputerVisionLesson() {
  return (
    <div>
      <Lead>
        You open a photo and you see your dog, mid-jump, ears up, front paws off the ground. A
        computer opens the exact same file and sees none of that. Not a blurred version of it, not
        a low-confidence guess at it — nothing. What it receives has no dog-shaped hole waiting to
        be filled in. This lesson is about what a computer actually gets handed, the three separate
        jobs people flatten into the phrase &ldquo;computer vision&rdquo;, and why decades of
        smart people writing careful rules never closed the gap.
      </Lead>

      <LessonSection
        id="what-a-computer-actually-receives"
        title="What a computer actually receives"
      >
        <P>
          A digital photograph is a rectangle, and the rectangle is made of pixels, and every pixel
          is a small handful of integers. A modest phone photo might be 4032 pixels wide and 3024
          tall — over twelve million pixels, each one carrying three numbers between 0 and 255 for
          red, green and blue. That is the entire file. There is no separate layer where
          &ldquo;dog&rdquo; or &ldquo;grass&rdquo; or &ldquo;jumping&rdquo; is recorded.
        </P>
        <P>
          <Strong>The computer receives a wall of numbers with no idea what a face is.</Strong>{" "}
          It does not receive a slightly confused version of the photo you see. It receives a grid,
          and every ounce of meaning — where the edges are, which pixels belong to the same object,
          what that object is called — has to be built back up from those numbers by something
          else. That something else is the entire subject of this track.
        </P>
      </LessonSection>

      <LessonSection id="three-jobs-hiding-in-one-name" title="Three jobs hiding in one name">
        <P>
          &ldquo;Computer vision&rdquo; sounds like one skill, the way &ldquo;seeing&rdquo; feels
          like one thing to you. It is not one job. Ask a system to look at a photo and you could
          be asking it to answer three different questions, and a solution to one does
          not hand you the other two for free.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Classification",
              children: (
                <P>
                  <Strong>What is this?</Strong> One label for the whole photo — &ldquo;dog&rdquo;
                  — and nothing about where it is or how many. The easiest of the three, and still
                  not easy.
                </P>
              ),
            },
            {
              title: "Detection",
              children: (
                <P>
                  <Strong>Where, and how many?</Strong> A box around every dog in the photo, each
                  with its own label. Two dogs need two boxes; the system has to decide that on
                  its own.
                </P>
              ),
            },
            {
              title: "Segmentation",
              children: (
                <P>
                  <Strong>Which exact pixels?</Strong> Not a box that also catches six inches of
                  fence behind the dog — the actual outline, pixel by pixel.
                </P>
              ),
            },
          ]}
        />
        <P>
          People say &ldquo;computer vision can recognise faces now&rdquo; as though that settles
          it, and it settles almost nothing — recognising that a face is present, finding where it
          is in a crowd, and outlining exactly which pixels are eyebrow are three different
          engineering problems with three different failure modes.
        </P>
      </LessonSection>

      <LessonSection
        id="why-rules-never-worked-for-pixels"
        title="Why rules never worked for pixels"
      >
        <P>
          The obvious first move is to write the rule down yourself, the way you would for
          ordinary software. A face has two dark ovals above a horizontal line — eyes above a
          mouth. Write that as code, point it at a folder of photos, and it falls apart almost
          immediately.
        </P>
        <P>
          Take one photograph: someone photographed from a three-quarter angle, backlit by a
          window behind them, wearing sunglasses. The eyes are not dark ovals — they are hidden.
          The mouth is not a clean horizontal line — it is foreshortened by the angle and half in
          shadow. Nothing about the rule was wrong on the photo it was written for. The photo
          changed underneath it.
        </P>
        <P>
          That is the actual shape of the problem, not a one-off edge case: <Strong>lighting</Strong>{" "}
          changes which pixels are bright without changing what is in the scene.{" "}
          <Strong>Angle</Strong> changes an oval into a sliver. <Strong>Occlusion</Strong> — a hand,
          a scarf, another person walking past — deletes part of the thing you are looking for
          entirely. <Strong>Scale</Strong> means the same face is forty pixels wide in one photo and
          four hundred in another, and a rule tuned to one size misses the other completely.
        </P>
        <Callout tone="warning" title="Four numbers, infinite rules">
          Lighting, angle, occlusion and scale each multiply the others. A rule that survives
          strong backlight at a three-quarter angle still has to survive a hand half-covering the
          mouth, at every distance from the camera. Nobody has ever finished that list of
          exceptions, for faces or for anything else photographed in the real world.
        </Callout>
      </LessonSection>

      <LessonSection id="where-this-track-is-headed" title="Where this track is headed">
        <P>
          If rules do not survive contact with real photos, the rest of this track is about what
          does. The shape of the argument is always the same: start from the grid of numbers,
          build something that survives the four problems above, and check honestly whether it
          actually did.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Turn a photo into numbers you can actually compute on",
              detail: "Pixels, channels, resolution — what is really inside the file.",
            },
            {
              label: "Find the structure hiding in the noise",
              detail:
                "A small grid of numbers, slid across the image, is enough to find edges and corners without a single hand-written rule about faces.",
            },
            {
              label: "Teach a model to name what it sees",
              detail:
                "Not by writing the rule, but by showing it enough labelled examples that it works the boundary out for itself.",
            },
            {
              label: "Teach it to point, and to count",
              detail: "Where an object is, how many there are, and which pixels belong to it.",
            },
            {
              label: "Make the score honest",
              detail:
                "A number on a test set can flatter a model in several specific, checkable ways. Learn to catch them.",
            },
            {
              label: "Survive contact with the world",
              detail:
                "A phone's camera, a car's latency budget, and a stranger's face are not a notebook.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A computer never receives a photo the way you see it — it receives a grid of numbers with no attached meaning.",
          "\"Computer vision\" hides three different jobs: classification names the whole photo, detection finds where and how many, segmentation labels individual pixels.",
          "Solving one of those three jobs does not solve the other two — each has its own failure modes.",
          "Hand-written rules for pixels fail because lighting, angle, occlusion and scale each change the numbers without changing what is actually in the scene.",
          "The rules never ran out of exceptions, which is exactly the condition under which learning from examples starts to win.",
          "The rest of this track follows one arc: numbers, structure, naming, locating, honest measurement, then the real world.",
        ]}
      />
    </div>
  );
}
