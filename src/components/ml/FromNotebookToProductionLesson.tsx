import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { DriftMonitor } from "@/components/ml/DriftMonitor";

export function FromNotebookToProductionLesson() {
  return (
    <div>
      <Lead>
        Somewhere there is a notebook cell that printed 0.94, and the team called that the
        model. It never was. It was one number, from one run, on data that was already ageing
        the moment anyone read it. Everything below is about the gap between that number and a
        system — and about how quietly that gap swallows projects that were, by every score that
        mattered on the day, working.
      </Lead>

      <LessonSection id="the-score-was-never-the-product" title="The score was never the product">
        <P>
          A fitted model is a function. Put a system around it and the function is now the
          smallest part of the job. Something has to receive a request. Something has to find
          the features that function expects, in milliseconds, from wherever they actually live.
          Something has to answer inside a time budget, and something has to be certain which
          version of the model just answered. None of that is machine learning, and all of it is
          why the notebook score stops being the interesting number the day you deploy.
        </P>
        <P>
          &ldquo;Find its features&rdquo; is the one that surprises people. In the notebook, every
          column sat in one tidy table, computed once, with time to check it. In production, the
          same feature — say, days since the last order — has to be recomputed live, from a
          database that may lag by minutes, by code that a different engineer wrote from a
          different specification on a different day. It is not the same computation with a
          different name. Very often it is quietly a different computation wearing the same name.
        </P>
        <Callout tone="warning" title="Which model actually answered">
          Versioning sounds like paperwork until the day a rollback does not fully take effect, or
          a shadow deployment nobody tore down starts sharing traffic, or two files with the same
          name hold different weights. When a score looks wrong, &ldquo;which model produced it,
          exactly&rdquo; has to have a one-line answer. If it does not, you are debugging blind.
        </Callout>
        <P>
          Nothing here is about whether the maths was right. The model can be exactly as good as
          the notebook said, and still fail, for reasons the notebook was never in a position to
          test.
        </P>
      </LessonSection>

      <LessonSection
        id="the-world-moves-your-model-does-not"
        title="The world moves, your model does not"
      >
        <P>
          A trained model is frozen the moment training finishes. Everything it will ever know
          about the world is whatever was true in that training window. The world keeps going.
          The gap between the two has a name — <Strong>drift</Strong> — and it comes in two
          flavours worth telling apart, because they break a model in different ways and get
          caught by different tools.
        </P>
        <P>
          <Strong>Input drift</Strong> is the population changing while the underlying
          relationship stays put. A subscription model trained before a price rise has never seen
          the more price-sensitive customers who show up after it. Nothing about how price
          predicts churn has changed — the model just spends its days on people who look less and
          less like the ones it studied.
        </P>
        <P>
          <Strong>Concept drift</Strong> is worse, because the relationship itself changes. A
          fraud model trained before a new payment method launched is now scoring transaction
          patterns that used to mean one thing and now mean another. The inputs can look
          identical to what the model saw in training. The honest answer behind them has moved.
        </P>
        <P>
          A third failure hides between the two, and it is the quietest of the three. The
          transform in the notebook and the transform in the live service are supposed to be the
          same function, and they disagree by a hair — a missing value filled with zero here and
          left as null there, a date computed in one time zone in training and another at serving
          time. This is <Strong>training/serving skew</Strong>, and it is the leakage chapter&apos;s
          discipline running forward instead of back. There, the question was whether a column
          would exist at prediction time. Here it is whether the column at prediction time is
          computed the same way it was in training. Skip either question and the score you
          trusted was never describing the system you shipped.
        </P>
      </LessonSection>

      <DriftMonitor />

      <LessonSection
        id="monitoring-when-labels-are-late"
        title="Monitoring when the labels arrive late"
      >
        <P>
          Above, the world changes in month 9 and accuracy falls from 90.2% to 81.8% in a single
          month — over eight points, overnight. If you could watch accuracy directly, you
          would catch that immediately. Almost nobody can. Ground truth for most real systems
          arrives weeks after the prediction, if it arrives at all — a loan defaults or does not
          months later, a customer churns or does not next quarter, a fraud case gets confirmed by
          a human eventually or never gets reviewed. In the chart above, the labelling delay alone
          pushes discovery to month 13, and by then four months and 47,474 predictions have
          already gone out, quietly worse than the number on anyone&apos;s dashboard.
        </P>
        <P>
          So you do not monitor accuracy. You monitor what you actually have the moment a
          prediction is made, none of which needs a label. The distribution of each input against
          the distribution it had in training, using a drift score like the one above — a
          population-stability-style number where roughly 0.2 is the usual line for &ldquo;this is
          no longer a rounding error.&rdquo; The distribution of the model&apos;s own predictions,
          since a sudden shift in how often it says yes is informative even blind. The flag rate,
          if there is a downstream action attached to a prediction. Latency and error rates,
          because a model that times out is a model that is wrong for every request it drops.
        </P>
        <P>
          And you keep the baseline from chapter fourteen running, permanently, in parallel. It
          cost half an hour to build and nothing to keep running. When labels do eventually land,
          score it alongside the real model on the same window and watch the <Strong>gap</Strong>{" "}
          between the two rather than either number on its own. Both numbers drift with the
          population, so a falling accuracy alone is ambiguous — a harder population would do
          that too. A shrinking gap is not ambiguous. The baseline cannot overfit and cannot
          adapt; if it is closing in on the model that is supposed to be smarter than it, the
          model has lost ground the baseline never had to earn.
        </P>
        <Callout tone="note" title="The delay is not a bug to fix">
          You cannot make labels arrive faster than the process that produces them. The discipline
          is not eliminating the blind window — it is knowing exactly how wide it is, in months,
          and treating every number inside it as provisional rather than trusting it the moment it
          appears.
        </Callout>
      </LessonSection>

      <LessonSection
        id="retraining-without-fooling-yourself"
        title="Retraining without fooling yourself"
      >
        <P>
          The moment drift shows up, the instinct is to retrain immediately and move on. Resist
          it. A retrain decided on a hunch, at the moment someone is anxious, is exactly how a
          model with a real, structural problem gets a fresh coat of paint instead of a fix.
          Retrain on a <Strong>schedule</Strong> — monthly, say, regardless of whether anything
          looks wrong — or on a <Strong>trigger</Strong> defined in advance, such as the input
          drift score crossing its alert line. Either is a decision made in advance, by a
          process, rather than a decision made in a panic by whoever is watching the dashboard
          that day.
        </P>
        <P>
          A retrained model is a candidate, not a replacement. Evaluate it against the model
          currently live, and against the trivial baseline, on the same recent window — the same
          discipline as chapter fourteen, repeated every time, because a candidate that beats last
          quarter&apos;s incumbent by a point may just be fitting a population that shifted in its
          favour. If it cannot also clear the baseline by a comfortable margin, it has not earned
          the extra complexity, no matter how it compares to the model it is replacing.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Trigger the retrain on a schedule or a defined threshold",
              detail: "Never on a feeling, and never mid-incident.",
            },
            {
              label: "Score the candidate against the incumbent and the trivial baseline",
              detail: "Same recent window, all three, so the comparison is fair.",
            },
            {
              label: "Roll out behind a shadow or a canary",
              detail:
                "A shadow scores live traffic without acting on it; a canary acts on a small slice. Neither lets the candidate decide anything on its own yet.",
            },
            {
              label: "Watch it earn the rest of the traffic, and keep the rollback live",
              detail: "The ability to go back to the incumbent in minutes is not optional.",
            },
          ]}
        />
        <P>
          None of this is exotic. It is the same honesty this whole track has been asking for —
          hold data back, compare against something stupid, never grade yourself on your own
          homework — applied to a model that keeps running after the notebook closes. A score
          tells you how the model did on one moment in time. Monitoring tells you whether the
          world it is still answering questions about resembles the one it was trained on.
        </P>

        <ChecklistCard
          title="Before a model is allowed to make a real decision"
          intro="Not a wish list. Every item here is something that has already gone quietly wrong on a real system."
          items={[
            "The feature transform is one piece of code, called from both training and serving — not two implementations that are supposed to agree.",
            "Every column has a documented answer to: would this value exist, computed this same way, at the moment the prediction is needed?",
            "Input distributions, prediction distributions, flag rate, latency and error rate are all monitored, with alert lines set before launch rather than discovered after.",
            "The labelling delay is known in months, written down, and every metric inside that window is treated as provisional.",
            "The trivial baseline from chapter fourteen runs in parallel, permanently, and someone is watching the gap, not just the model's own score.",
            "A retrain trigger is defined in advance — a schedule or a threshold, never a hunch.",
            "A rollback to the previous model has actually been exercised, not just documented as possible.",
          ]}
        />
      </LessonSection>

      <P>
        You can now build a model, split it honestly, measure it without fooling yourself,
        baseline it against something stupid, and watch it for two years after the demo ends. That
        is the complete loop, and most introductions to this subject stop somewhere in the middle
        of it. What you do not yet have is the surrounding engineering — a feature store that
        agrees with itself, an alert that pages a real person, a retraining job that runs without
        someone copying files by hand. Those are real jobs, done by real teams, and no twelve
        minutes were ever going to teach them. What this track has taught you is what to ask for
        when you join one: where a score comes from, what it quietly stops meaning, and how to
        notice before your users do.
      </P>

      <TakeawayCard
        items={[
          "A notebook score is one number from one run on data that was already ageing. A system also has to receive a request, find its features live, answer in time, and know which version of itself replied.",
          "Input drift is the population changing while the relationship holds; concept drift is the relationship itself changing. They break a model differently and need different fixes.",
          "Training/serving skew is the leakage chapter's discipline running forward — the same transform, computed the same way, in both places, or the score you trusted was never describing the system you shipped.",
          "You almost never get accuracy live. Monitor the proxies you do have — input and prediction distributions, flag rate, latency, error rate — and know your labelling delay in months.",
          "Retrain on a schedule or a trigger, evaluate the candidate against the incumbent and the trivial baseline on the same window, ship behind a shadow or a canary, and always keep the rollback live.",
        ]}
      />
    </div>
  );
}
