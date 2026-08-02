import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { OutlierDial } from "@/components/ml/OutlierDial";

export function AnomalyDetectionLesson() {
  return (
    <div>
      <Lead>
        You have labelled data. Nine fraudulent transactions, sitting inside a few thousand
        legitimate ones. The obvious move is the one you already know: train a classifier, show
        it both classes, let it learn where the boundary sits. This chapter is about why that
        move fails here specifically, and what to do instead.
      </Lead>

      <LessonSection id="the-class-you-cannot-collect" title="The class you cannot collect">
        <P>
          The class-imbalance lesson had one fraud in fifty-three, and that was already a hard
          problem — the model learned, correctly, that guessing &ldquo;legitimate&rdquo; every
          time was the cheapest available strategy. Nine examples in a few thousand is a
          different order of problem. It is not that the classifier is lazy. It is that there is
          almost nothing to learn.
        </P>
        <P>
          A model finds the shape of a class by seeing enough of it to notice what varies and
          what does not. Nine points do not have a shape. They have nine points, and a model
          asked to draw a boundary around them will draw one around whatever those nine happened
          to look like — not around fraud in general, which it has not seen enough of to
          describe.
        </P>
        <P>
          It gets worse under evaluation. Split nine examples five ways for cross-validation and
          some folds hold one or two frauds, and some hold <Strong>none at all</Strong>. A fold
          with zero positives cannot report a recall, because there is nothing in it to recall.
          The score you would quote from that fold is not low. It is undefined, and averaging it
          in anyway is how a confident-looking number gets reported from a computation that never
          happened.
        </P>
      </LessonSection>

      <LessonSection id="describe-normal-instead" title="Describe normal instead">
        <P>
          The fix is to stop asking the question that needs two classes. Instead of learning the
          boundary between fraud and not-fraud, learn the shape of ordinary behaviour — the one
          class with thousands of examples — and measure how far a new case sits from it. Far
          enough, and it gets a second look. Nothing about this needs to have ever seen a fraud.
        </P>
        <P>
          &ldquo;Far&rdquo; has to mean something precise, and there is more than one way to
          define it. A cut-off on distance or local density is the simplest version, and the one
          this chapter uses: measure how far a point sits from the centre of everything ordinary,
          scaled by how spread out ordinary already is. Isolation forests take a different route,
          timing how few random splits it takes to cut a point off on its own — outliers separate
          fast. A one-class SVM draws the tightest boundary it can around the ordinary data and
          flags whatever falls outside it. An autoencoder learns to compress and rebuild ordinary
          examples faithfully, and a case it reconstructs badly is a case that did not look like
          anything it was trained on. Different mechanisms, the same underlying move.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "Distance or density threshold",
              children: (
                <P>
                  How far from the middle of ordinary, or how few neighbours nearby. Cheap,
                  explainable, and what the panel below uses.
                </P>
              ),
            },
            {
              title: "Isolation forests",
              children: (
                <P>
                  Outliers take fewer random splits to isolate than ordinary points do. Scales
                  well and needs almost no tuning.
                </P>
              ),
            },
            {
              title: "One-class SVM",
              children: (
                <P>
                  Draws the tightest boundary it can around ordinary data. Sensitive to how that
                  tightness is set.
                </P>
              ),
            },
            {
              title: "Autoencoder reconstruction error",
              children: (
                <P>
                  Learns to rebuild ordinary examples faithfully. A case it reconstructs badly did
                  not resemble its training data.
                </P>
              ),
            },
          ]}
        />
        <P>
          The panel below is the simplest of these made visible: four hundred ordinary
          transactions plotted by two measurements of how unusual they were, nine genuine frauds
          scattered among them, and a circle whose radius is the cut-off. Everything the circle
          does not contain gets flagged.
        </P>
      </LessonSection>

      <OutlierDial />

      <LessonSection id="where-to-draw-the-cut-off" title="Where to draw the cut-off" delay={0.05}>
        <P>
          Drag the circle in and the trade shows itself immediately. At a cut-off of 1.90 the
          panel catches seven of the nine frauds, and getting them costs 64 false alarms — about
          ten alerts opened for every real fraud sitting in the pile. Tighten it to 1.40 and every
          known fraud is caught, at the cost of 165 legitimate transactions swept up alongside
          them. Loosen it to 3.20 and the false alarms disappear entirely, and with them six of
          the nine frauds — the ones that were never that far from ordinary to begin with.
        </P>
        <P>
          Notice that no setting is <Strong>correct</Strong>. The precision-recall lesson made
          the same point about a threshold on a classifier&apos;s confidence, and it applies here
          without modification: which mistake you would rather make is not a fact the data can
          hand you. It is a decision about how many alerts a review team can actually open in a
          day, and what a missed fraud costs when nobody opens one at all.
        </P>
        <P>
          Which is why the honest unit here is not precision, and not recall on its own. It is{" "}
          <Strong>alerts per real fraud found</Strong> — because that is what an analyst&apos;s
          day is made of. A model that reports 78% recall sounds finished. A model that means a
          person opens ten cases to find one fraud is a staffing decision wearing a metric&apos;s
          clothes, and it should be argued about as one.
        </P>
        <Callout tone="warning" title="An anomaly is not a fraud">
          The model in the panel has never seen a single labelled fraud. It finds{" "}
          <Strong>unusual</Strong>, and unusual is not the same thing as criminal. A customer who
          suddenly spends abroad because they are on holiday is an anomaly. So is a shop having
          its best sales day of the year. You are being paid to catch fraud; the model is only
          able to hand you weird, and the gap between the two is exactly what the human on the
          other end of that alert is for.
        </Callout>
      </LessonSection>

      <LessonSection id="why-normal-moves" title="Why normal moves under you" delay={0.05}>
        <P>
          Everything above assumes &ldquo;ordinary&rdquo; holds still, and it does not. A new
          product launch changes the typical transaction. A payday shifts the typical hour.
          Ordinary behaviour is a moving target, and a cut-off fitted to last quarter&apos;s
          ordinary starts flagging this quarter&apos;s normal simply for having changed shape —
          which is precisely the false-alarm cost the panel above already made expensive.
        </P>
        <P>
          The failure is quiet rather than sudden. Nothing crashes. The false-alarm rate simply
          climbs, review queues back up, and eventually someone loosens the cut-off just to make
          the noise stop — which is the one change that also lets fraud back through unnoticed.
          A threshold that is never revisited is a threshold that is already decaying; it just has
          not been measured yet.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Watch the false-alarm rate, not just the catch rate",
              detail:
                "A rising rate of alerts that turn out clean is the first sign that ordinary has moved, well before recall visibly drops.",
            },
            {
              label: "Re-fit the shape of normal on a rolling window",
              detail:
                "Recent weeks, not the whole history — the point is to describe what ordinary looks like now, not what it looked like when the model was built.",
            },
            {
              label: "Re-check the cut-off against what the review team can absorb",
              detail:
                "A refit changes the scores. The cut-off that produced ten alerts per catch last month may produce thirty this month unless it is re-checked alongside the data.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Nine examples of fraud are not enough to train a classifier on. There is no shape to learn, and a cross-validation fold can easily hold zero of them.",
          "Anomaly detection swaps the question: stop learning the boundary between two classes, and instead learn the shape of normal and measure distance from it.",
          "Distance thresholds, isolation forests, one-class SVMs and autoencoder reconstruction error are different mechanisms for the same underlying move.",
          "The cut-off is a business decision, not a statistical one, and the honest unit to report is alerts opened per real fraud found — that is what fills an analyst's day.",
          "An anomaly is not automatically a fraud, and normal drifts. A fixed cut-off decays as behaviour changes, and has to be re-fitted on a rolling window.",
        ]}
      />
    </div>
  );
}
