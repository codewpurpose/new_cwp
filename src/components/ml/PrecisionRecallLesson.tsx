import { Reveal } from "@/components/Reveal";
import { ThresholdExplorer } from "@/components/ml/ThresholdExplorer";

const SCENARIOS = [
  {
    title: "Screening for cancer",
    optimise: "Recall",
    reasoning:
      "A false alarm costs one more test and a frightening afternoon. A miss costs a life. You accept a pile of false positives to make sure almost nothing real slips through.",
  },
  {
    title: "Filtering spam",
    optimise: "Precision",
    reasoning:
      "A spam email that reaches the inbox is a mild annoyance. A job offer routed to the spam folder is a disaster the user may never discover. Only flag what you are sure about.",
  },
  {
    title: "Ranking search results",
    optimise: "Precision, but only at the top",
    reasoning:
      "Nobody reads result 400, so recall over the whole index is close to meaningless. What matters is whether the first handful are right — measured as precision@k.",
  },
] as const;

export function PrecisionRecallLesson() {
  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <p className="text-[15px] leading-[1.6] text-learn-muted">
          Accuracy is the first number everyone reaches for, and it is the first number that
          will mislead you. This lesson is about the two measurements that replace it, why
          they pull against each other, and how to decide which one your problem actually
          cares about.
        </p>
      </Reveal>

      {/* 1 — the accuracy trap */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="a-model-that-does-nothing" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            A model that does nothing, and scores 99.7%
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Suppose you are building a fraud detector. In your data, 3 transactions in every
            1,000 are fraudulent. You train a model, and it comes back with 99.7% accuracy.
            That sounds like a finished project.
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Now here is a model that also scores 99.7%, which you can write in one line:
          </p>

          <div className="mt-4 rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.6] text-learn-code-fg">
            <p>def predict(transaction):</p>
            <p>{"    "}return &quot;not fraud&quot;</p>
          </div>

          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            It is right 997 times out of 1,000, because it never has to do anything. It also
            catches exactly zero fraud, which was the entire point of building it.
          </p>

          <div className="mt-6 rounded-learn-lg bg-learn-quiet p-5 text-[14px] leading-[1.6] text-learn-strong">
            <strong className="font-semibold">The trap:</strong> accuracy counts every
            prediction equally. When one class is rare, the model can score brilliantly on the
            common case and be useless on the case you care about. You need numbers that look
            only at the rare thing.
          </div>
        </section>
      </Reveal>

      {/* 2 — the four boxes */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="four-ways-a-prediction-lands" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            Four ways a yes-or-no prediction can land
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Before any formula, get the outcomes straight. Your model says yes or no. Reality
            is yes or no. That is four combinations, and each one costs something different.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                short: "TP",
                name: "True positive",
                colour: "var(--learn-outcome-tp)",
                body: "Flagged it, and it was really fraud. The transaction gets stopped.",
              },
              {
                short: "FN",
                name: "False negative",
                colour: "var(--learn-outcome-fn)",
                body: "Said it was fine, and it was fraud. The money is gone and nobody knows yet.",
              },
              {
                short: "FP",
                name: "False positive",
                colour: "var(--learn-outcome-fp)",
                body: "Flagged it, and it was legitimate. A real customer gets their card declined.",
              },
              {
                short: "TN",
                name: "True negative",
                colour: "var(--learn-outcome-tn)",
                body: "Said it was fine, and it was. This is almost everything, and it is why accuracy lies.",
              },
            ].map((cell) => (
              <div
                key={cell.short}
                className="rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: cell.colour }}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] font-semibold text-learn-strong">{cell.name}</span>
                </div>
                <p className="mt-2 text-[14px] leading-[1.5] text-learn-muted">{cell.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[15px] leading-[1.6] text-learn-muted">
            Arranged in a grid, these four counts are called a{" "}
            <strong className="text-learn-strong">confusion matrix</strong>. It is not a thing to
            memorise — it is just these four numbers in a box. Precision and recall are each
            built from three of them.
          </p>
        </section>
      </Reveal>

      {/* 3 — precision */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="precision" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            Precision: of everything I flagged, how much was real?
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Precision looks only at the cases your model raised its hand for, and asks what
            fraction of them deserved it.
          </p>
          <div className="mt-4 rounded-xl bg-learn-sunken p-4 text-center font-mono text-[14px] text-learn-strong">
            precision = TP / (TP + FP)
          </div>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Its failure mode is <strong className="text-learn-strong">crying wolf</strong>. Low
            precision means most of your alerts are noise, and the humans downstream will start
            ignoring all of them — which quietly destroys the value of the alerts that were
            correct. Precision is owned entirely by false positives.
          </p>
        </section>
      </Reveal>

      {/* 4 — recall */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="recall" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            Recall: of everything real, how much did I catch?
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Recall ignores your alerts and looks at reality instead: of all the fraud that
            actually happened, how much did the model find?
          </p>
          <div className="mt-4 rounded-xl bg-learn-sunken p-4 text-center font-mono text-[14px] text-learn-strong">
            recall = TP / (TP + FN)
          </div>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Its failure mode is <strong className="text-learn-strong">missing the thing</strong>.
            Low recall means the problem is still happening and your dashboard is calm about
            it. Recall is owned entirely by false negatives — and false negatives are invisible
            unless you go looking for them.
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Notice that the one-line fraud model from earlier has a recall of 0. That is the
            number that would have caught the problem immediately.
          </p>
        </section>
      </Reveal>

      {/* 5 — the tension */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="the-dial-between-them" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            The dial between them
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Here is the part that makes this interesting: you can max out either metric on its
            own, trivially, and the result is useless both times. Flag every single case and
            recall is a perfect 1.0. Flag only the one case you are most certain about and
            precision is a perfect 1.0. Neither model is worth shipping.
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            What connects them is the <strong className="text-learn-strong">threshold</strong>.
            A classifier does not really output yes or no — it outputs a confidence score, and
            you choose the cutoff above which that score becomes a yes. Move the cutoff and you
            are trading one metric for the other.
          </p>
        </section>
      </Reveal>

      <ThresholdExplorer />

      <Reveal delay={0.05}>
        <section className="mt-10">
          <h3 className="text-lg text-learn-strong">Two things worth noticing</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-learn-muted">
            Drag the threshold slowly from left to right. Recall falls smoothly and
            predictably — every step right abandons a few more real positives, and they never
            come back.
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            Precision does not behave nearly as politely. It climbs, but it{" "}
            <strong className="text-learn-strong">jumps around as it goes</strong>, especially at
            the high end. That is not a bug in the chart. Once you are flagging only a handful
            of cases, a single mistake swings the ratio hard. It is exactly why{" "}
            &ldquo;just pick a high-precision threshold&rdquo; is bad advice: up there, the
            number is measured on so few cases that it barely means anything.
          </p>

          <h3 className="mt-8 text-lg text-learn-strong">Why F1 is a harmonic mean</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-learn-muted">
            F1 combines the two into one number so you can compare models at a glance. It
            deliberately is not a plain average. Consider the flag-everything model: precision
            0.32, recall 1.0. Averaged normally, that is a respectable-looking 0.66 for a model
            with no judgement at all.
          </p>
          <div className="mt-4 rounded-xl bg-learn-sunken p-4 text-center font-mono text-[14px] text-learn-strong">
            F1 = 2 &middot; (precision &middot; recall) / (precision + recall)
          </div>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            The harmonic mean is dragged toward the smaller of the two numbers, so it punishes
            lopsidedness. Take the extreme case — precision 1.0, recall 0.0. A normal average
            reports 0.5. F1 reports 0.
          </p>
        </section>
      </Reveal>

      {/* 6 — which do you optimise */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h2 id="which-one-do-you-optimise" className="home-serif text-[1.5rem] text-learn-strong md:text-[1.9rem]">
            So which one do you optimise?
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            There is no general answer, and anyone who gives you one is skipping the actual
            question: which mistake is more expensive for the people using this?
          </p>

          <div className="mt-6 space-y-3">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.title}
                className="rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-learn-strong">
                    {scenario.title}
                  </h3>
                  <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
                    Optimise {scenario.optimise}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-learn-muted">
                  {scenario.reasoning}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[15px] leading-[1.6] text-learn-muted">
            Same maths, three different answers. Choosing a metric is a product decision that
            happens to be expressed in numbers — it is not something the maths can decide for
            you.
          </p>
        </section>
      </Reveal>

      {/* Taking it with you */}
      <Reveal delay={0.05}>
        <section className="mt-12">
          <h3 className="text-lg text-learn-strong">Computing these yourself</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-learn-muted">
            You will rarely write these by hand. In Python:
          </p>
          <div className="mt-4 rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.7] text-learn-code-fg">
            <p>
              <span className="text-learn-code-dim">from</span> sklearn.metrics{" "}
              <span className="text-learn-code-dim">import</span> precision_score, recall_score
            </p>
            <p>
              <span className="text-learn-code-dim">from</span> sklearn.metrics{" "}
              <span className="text-learn-code-dim">import</span> f1_score, confusion_matrix
            </p>
            <p>&nbsp;</p>
            <p>precision = precision_score(y_true, y_pred)</p>
            <p>recall{"    "}= recall_score(y_true, y_pred)</p>
            <p>f1{"        "}= f1_score(y_true, y_pred)</p>
            <p>tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()</p>
          </div>
          <p className="mt-4 text-[15px] leading-[1.6] text-learn-muted">
            The thing worth building a habit around is not the function call. It is printing
            the confusion matrix before you trust any single score.
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-12 rounded-learn-lg bg-learn-inverse p-6 text-learn-on-inverse md:p-8">
          <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em]">
            Key takeaways
          </h3>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] opacity-90">
            <li>
              Accuracy hides failure whenever one class is rare. Check recall before you
              celebrate.
            </li>
            <li>Precision is about your alerts. Recall is about reality.</li>
            <li>
              The threshold is the dial between them, and moving it always costs one to buy the
              other.
            </li>
            <li>F1 is harmonic so that being terrible at one metric cannot be averaged away.</li>
            <li>
              Which metric matters is decided by which mistake is more expensive — not by the
              maths.
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
