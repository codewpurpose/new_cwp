import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function TransferLearningLesson() {
  return (
    <div>
      <Lead>
        The convolutional network from the last lesson needed millions of labelled photos and
        days of GPU time before it was any good at all. Almost nobody re-earns that cost from
        zero — and the reason is that what a trained network already knows can be borrowed.
      </Lead>

      <LessonSection id="the-cost-of-starting-from-nothing" title="The cost of starting from nothing">
        <P>
          Training a serious image classifier from a random start wants somewhere in the range of
          a million labelled photos, spread reasonably evenly across your classes, and several
          days on a bank of GPUs to converge. ImageNet, the dataset most of these networks were
          first proven on, has about 1.2 million training images across 1,000 categories.
        </P>
        <P>
          A student project, or a small team building a tool for one specific problem, has none of
          that. You might have four hundred photos of a specific product defect, gathered over a
          month, with no budget for more. Training the last lesson&rsquo;s network on four hundred
          photos from scratch does not produce a worse classifier. It produces one that has
          memorised four hundred photos and generalises to nothing.
        </P>
      </LessonSection>

      <LessonSection
        id="what-a-pretrained-network-already-knows"
        title="What a pretrained network already knows"
      >
        <P>
          A network trained on a broad photo dataset — a million images spanning cars, dogs,
          kitchens, mountains — has already been through everything the last lesson described. Its
          early layers settled on edge and colour detectors. Its middle layers settled on corners,
          textures, and simple parts. None of that is specific to the exact 1,000 categories it
          was scored on.
        </P>
        <P>
          An edge detector that helps recognise a bicycle wheel helps just as much recognising a
          clock face. A texture detector trained to spot fur helps with carpet. The knowledge
          sitting in those layers is closer to <Strong>how to see</Strong> than{" "}
          <Strong>how to name these 1,000 things</Strong>, and how to see transfers.
        </P>
      </LessonSection>

      <LessonSection
        id="keeping-the-body-replacing-the-head"
        title="Keeping the body, replacing the head"
      >
        <P>
          The mechanic is direct. Take a network already trained on the broad dataset. Freeze
          every layer except the last — literally stop their weights from updating — and replace
          the final classification layer, the one that outputs one of the original 1,000
          categories, with a new one that outputs your handful of categories instead.
        </P>
        <P>
          Retrain only that new final layer, on your four hundred photos. You are not asking the
          network to relearn what an edge is or what a wheel looks like; those layers are
          untouched. You are only asking it to learn a new mapping from features it can already
          extract onto your specific labels, which is a far smaller thing to learn and needs far
          fewer examples to learn it — dozens or low hundreds of photos per class is often enough,
          not a million.
        </P>
        <Callout tone="note" title="Body and head">
          &ldquo;Body&rdquo; and &ldquo;head&rdquo; is the usual shorthand: the body is every layer
          up to the last, doing the seeing; the head is the final layer, doing the naming.
          Transfer learning keeps the body and swaps the head.
        </Callout>
      </LessonSection>

      <LessonSection
        id="when-transfer-learning-does-not-help"
        title="When transfer learning does not help"
      >
        <P>
          This is not a universal fix, and the limit is exactly where you would guess from how it
          works. Transfer learning helps when your new photos are visually similar in kind to what
          the network originally saw — natural photos, ordinary lighting, everyday objects at
          everyday distances.
        </P>
        <P>
          It helps far less carrying that same network onto a chest X-ray or a satellite image.
          Those images do not have the same edges, textures, or colour statistics that produced
          the original layers; an X-ray has no colour at all, and a satellite photo has no sense
          of a horizon or a gravity-consistent orientation. The features a natural-photo network
          learned are a poor match for what actually distinguishes a healthy lung scan from a
          fractured rib, so freezing them buys you far less.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Training a serious image classifier from a random start wants roughly a million labelled photos and days of GPU time — far more than most small teams or student projects have.",
          "A network trained on a broad dataset has already learned edges, textures, and common parts, and that knowledge is not specific to the categories it was originally scored on.",
          "Transfer learning freezes those early and middle layers and retrains only the final classification layer, so it only has to learn a new mapping onto your labels, not how to see from nothing.",
          "That is why it needs far fewer examples: dozens or low hundreds of photos per class can be enough, instead of a million.",
          "It works best when your new photos resemble natural photos. Carry the same network onto X-rays or satellite imagery and the learned edges and textures are a worse match, so the transfer helps far less.",
        ]}
      />
    </div>
  );
}
