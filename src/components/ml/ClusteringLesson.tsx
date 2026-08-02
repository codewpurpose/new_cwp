import { InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { ClusterStepper } from "@/components/ml/ClusterStepper";

export function ClusteringLesson() {
  return (
    <div>
      <Lead>
        Every chapter before this one gave you something to check your answer against. A held-out
        label, a test score, a confusion matrix you could argue with. This one does not. You are
        about to hand an algorithm a pile of points with nothing written on them and ask it to
        find the groups, and it will find them — with total confidence, whether or not there was
        anything there to find.
      </Lead>

      <LessonSection id="when-nobody-labelled-anything" title="When nobody labelled anything">
        <P>
          Look back at Part 4. Train/test splitting, cross-validation, precision and recall — all
          of it assumed somebody had already written down the right answer for every example, so
          the model&rsquo;s answer could be compared against it. That comparison is the entire honesty
          toolbox. Take away the right answers and every tool in it stops working, not because
          the problem got harder, but because the ingredient they all need is gone.
        </P>
        <P>
          Nobody labelled which customers belong together, which genes switch on as a set, which
          documents are about the same thing. There is no drawer of correct groupings to hold
          back and grade against later, because no correct grouping was ever written down. This
          is <Strong>unsupervised learning</Strong>: structure found in the points themselves,
          with no answer key anywhere in the building.
        </P>
        <P>
          The algorithm in this chapter, <Strong>k-means</Strong>, is the simplest and most
          common way to do it. You tell it how many groups to look for. It looks. It always
          reports back a grouping — never a shrug, never an &ldquo;I don&rsquo;t see anything
          here.&rdquo; Whether that grouping means anything is a question the algorithm has no
          way to answer, and neither will you until you build the habit of asking it separately,
          every time.
        </P>
      </LessonSection>

      <LessonSection id="two-moves-repeated" title="Two moves, repeated until nothing changes">
        <P>
          Start by dropping <InlineCode>k</InlineCode> points onto the plot — the{" "}
          <Strong>centres</Strong>. Everything else follows from two moves, repeated:
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Assign",
              detail:
                "Every point joins whichever centre is currently closest to it, measured in plain straight-line distance.",
            },
            {
              label: "Move",
              detail:
                "Each centre slides to the mean position of the points that just joined it — its own little average.",
              note: "A centre nobody joined does not move. There was nothing to average.",
            },
          ]}
        />
        <P>
          Repeat both steps until an assign round changes nobody&rsquo;s group. That has to
          happen eventually: each move can only shrink or hold the total squared distance from
          every point to its centre — never grow it — and there are only finitely many ways to
          split a fixed set of points into <InlineCode>k</InlineCode> groups. A quantity that
          keeps shrinking and can only take finitely many values has to stop shrinking. That is
          the whole termination argument, and it says nothing about where it stops.
        </P>
        <P>
          That squared-distance total has a name: <Strong>inertia</Strong>. It is the only thing
          k-means is minimising. Not how sensible the groups look to you, not whether they match
          anything you care about — just that one number, and it will happily settle for a bad
          answer as long as moving further would not lower it.
        </P>
      </LessonSection>

      <ClusterStepper />

      <LessonSection id="choosing-k-is-your-problem" title="Choosing k is your problem, not the algorithm's">
        <P>
          Run <InlineCode>k = 3</InlineCode> on the data above with a centre dropped near each
          group you can actually see, and it converges in two rounds to an inertia of about
          88,639. Drop all three centres together in one corner instead, and it takes three
          rounds to land at roughly 255,560 — nearly three times worse — with one centre never
          claiming a single point. Both runs finish. Both print a number with the same
          confidence. Nothing about the output tells you which one to trust; you have to already
          know, or go find out.
        </P>
        <Callout tone="warning" title="Why you cannot just pick the k with the lowest inertia">
          Inertia never goes up as <InlineCode>k</InlineCode> grows — give every point its own
          centre and inertia hits zero. That is not a good clustering, it is the absence of one.
          The usual compromise is the <Strong>elbow method</Strong>: run k-means at several
          values of <InlineCode>k</InlineCode>, plot inertia against it, and look for where the
          curve stops dropping fast and goes flat. On this data, pushing from three groups to
          four drops inertia from about 88,639 to as low as 73,817 if the fourth centre lands
          somewhere useful — a real drop, and still not proof that a fourth group exists. The
          elbow is read by eye. Two people can read the same curve and pick different k.
        </Callout>
        <P>
          There is a second assumption buried in the method itself, and it is easy to miss
          because nothing in the algorithm checks it. Distance to a single centre is only a
          sensible way to describe a group if the group is roughly round and roughly the same
          size as the others.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "What k-means is built for",
              tone: "positive",
              children: (
                <P>
                  Round, roughly equal-sized blobs, spread out enough that the gaps between them
                  are wider than the blobs themselves. Every group has one honest centre, and
                  distance to it is a fair summary of belonging.
                </P>
              ),
            },
            {
              title: "Where it quietly breaks",
              tone: "caution",
              children: (
                <P>
                  A crescent with a small round cluster tucked into its concave side. One huge
                  diffuse group next to one small tight one. Two rings, one inside the other.
                  k-means will draw straight boundaries through all of them and report an inertia
                  number as if nothing were wrong, because nothing in the maths checks whether a
                  straight boundary was the right kind of boundary to draw.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="when-the-groups-mean-nothing" title="When the groups mean nothing">
        <P>
          Here is the part that should worry you more than a bad elbow chart. Feed k-means pure
          noise — points scattered with no structure in them at all — and ask for three groups.
          It will not tell you there is nothing to find. It will draw three regions, hand you
          three centres, and report an inertia number exactly as confidently as it would on real
          structure. Clusters always come back. The algorithm has no mechanism for reporting
          &ldquo;this is meaningless,&rdquo; because meaning was never part of what it computes.
        </P>
        <P>
          That confidence is manufactured, not earned, and it is the single most dangerous thing
          about this chapter&rsquo;s algorithm. A classifier that is wrong will eventually meet a
          test set that says so. A clustering that is wrong meets nothing — there is no label to
          contradict it, so a meaningless grouping and a real one look identical in the output.
          The only thing that tells them apart is a check you choose to run.
        </P>
        <ChecklistCard
          title="Before you act on a clustering"
          intro="None of these are computed by the algorithm. All of them are yours to do."
          items={[
            "Do the groups differ on something you did not feed the algorithm — spend, tenure, outcome — or only on the coordinates it was given?",
            "Does someone who actually knows this data recognise the groups, or do they look like an arbitrary cut?",
            "Do the same groups show up again with a different k, or a different starting position, or does the story change every time?",
            "Would you make a decision — a budget, a diagnosis, a policy — on this grouping, or only put it in a slide?",
          ]}
        />
        <P>
          None of that turns a hypothesis into proof. It turns a number the algorithm was
          obligated to produce into a claim you are willing to stand behind, which is a different
          and much smaller thing.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Clustering has no answer key. Every honesty tool from Part 4 needed one, and none of them apply here.",
          "k-means repeats two moves — assign to the nearest centre, move the centre to the mean — until an assign round changes nobody. It has to stop; it does not have to stop somewhere good.",
          "It minimises inertia and nothing else. A grouping that looks wrong to you can still have the lowest inertia the run ever found.",
          "k is a choice you make, not a fact the data hands you. The elbow method is a heuristic for making that choice, not a proof you made it correctly.",
          "A cluster is a hypothesis, not a finding. The algorithm will hand you one from pure noise without blinking — checking whether it means anything is entirely on you.",
        ]}
      />
    </div>
  );
}
