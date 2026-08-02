import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { PenaltyDial } from "@/components/ml/PenaltyDial";

export function RegularisationLesson() {
  return (
    <div>
      <Lead>
        The usual advice for a model that overfits is to collect more data. It works, and it is
        also frequently not available to you — the fraud cases stay rare, the survey stays
        expensive, last season only happened once. There is a second fix, and it costs nothing to
        try on the data you already have: charge the model rent for every coefficient it grows.
      </Lead>

      <LessonSection id="charging-rent-on-complexity" title="Charging rent on complexity">
        <P>
          <Strong>Overfitting</Strong> showed a model turning its coefficients up until it could
          chase every point in front of it, memorising the noise along with the pattern. This
          lesson is not another way to catch that happening — <Strong>Cross-Validation</Strong>{" "}
          already gave you the instrument for that. This is the fix.
        </P>
        <P>
          Fitting a model, left alone, minimises one thing: error on the training data. Nothing
          in that minimisation cares how large a coefficient gets. If growing one by a hundred
          shaves even a sliver off the error on the noise sitting in front of it, an unpenalised
          fit takes that trade every single time, because nothing is charging it for the size of
          the coefficient itself.
        </P>
        <P>
          Regularisation changes what gets minimised. Not error alone — error plus a penalty on
          the size of the coefficients.
        </P>
        <CodeBlock
          label="The objective"
          code={"minimise:  error(model)  +  λ · penalty(coefficients)"}
        />
        <P>
          A coefficient now has to earn its keep. It is only allowed to grow if the error it
          saves is worth more than the rent it now owes on its own size. A coefficient chasing
          three noisy points rarely clears that bar. A coefficient carrying the real relationship
          almost always does.
        </P>
      </LessonSection>

      <LessonSection id="two-penalties-two-behaviours" title="Two penalties, two different behaviours">
        <P>
          &ldquo;Penalty on the size of the coefficients&rdquo; is doing a lot of work in that
          sentence, because there are two ordinary ways to measure size, and they punish a model
          in noticeably different ways.
        </P>
        <CodeBlock
          label="Two ways to measure size"
          code={"L2 (ridge):  penalty = sum of coefficient²\nL1 (lasso):  penalty = sum of |coefficient|"}
        />
        <P>
          Squaring, in L2, is severe on large coefficients and gentle on small ones — a
          coefficient of 10 costs a hundred times more than a coefficient of 1, so the penalty
          bites hardest exactly where it is biggest and eases off as it shrinks. It keeps easing
          off forever. A coefficient can get arbitrarily close to zero without the penalty ever
          fully letting go, so it shrinks towards zero and stops just short.
        </P>
        <P>
          The absolute value, in L1, charges the same marginal rent no matter how small the
          coefficient already is. Shrinking a coefficient from 0.4 to 0.3 saves exactly as much
          penalty as shrinking it from 10.4 to 10.3. Once a coefficient is doing so little that
          the error it saves can no longer clear that flat, constant rent, the optimiser&apos;s
          best move is to stop paying rent on it at all — set it to exactly zero.
        </P>
        <CompareGrid
          items={[
            {
              title: "L2 — ridge",
              tone: "neutral",
              children: (
                <p>
                  Shrinks every coefficient towards zero, in proportion to how large it already
                  is. None of them reach it. Good when you believe most of your predictors carry
                  a little real signal.
                </p>
              ),
            },
            {
              title: "L1 — lasso",
              tone: "neutral",
              children: (
                <p>
                  Shrinks coefficients too, but is willing to drop the weakest ones to exactly
                  zero — it performs feature selection as a side effect of fitting. Good when you
                  suspect most of your predictors are dead weight.
                </p>
              ),
            },
          ]}
        />
        <P>
          There is a compromise between the two — <Strong>elastic net</Strong>, which penalises
          with a blend of both sums at once — for when you want some sparsity without betting
          everything on it.
        </P>
      </LessonSection>

      <PenaltyDial />

      <LessonSection id="the-strength-is-a-dial" title="The strength is a dial, not a switch" delay={0.05}>
        <P>
          λ in that objective is not a fact about your data. It is a setting you choose,
          and dragging it changes the fit continuously between two named failure modes you have
          already met.
        </P>
        <P>
          At λ near zero, above, nothing is charged for size at all and this is
          overfitting again, wearing a different name — validation error sits at $668 for ridge
          on this rental data, more than four times the $159 the model reports on the rows it
          trained on. Push λ all the way to 100 and every coefficient has been squeezed
          towards nothing; the model predicts close to the same rent for every listing, which is{" "}
          <Strong>underfitting</Strong> by another name. Its validation error, $592, lands almost
          exactly on the $593 you would get by ignoring the predictors entirely and guessing the
          average rent every time.
        </P>
        <P>
          Between those two ends sits a dip. Ridge&apos;s validation error bottoms out at $382, a
          real improvement over doing nothing, at a modest λ of about 0.13. Lasso bottoms
          out at $371 at a much larger λ of roughly 42 — and at that setting, four of the
          nine predictors have been zeroed out entirely, leaving a model that openly admits it
          only trusts five of them. That U shape — high, dipping, climbing again — is the entire
          picture. Somewhere in the middle is better than either edge, and nothing about the
          training curve alone would have told you where.
        </P>
      </LessonSection>

      <LessonSection id="choosing-it-honestly" title="Choosing it without cheating" delay={0.05}>
        <P>
          Here is the part worth being careful about. You do not get to pick λ by trying a
          few values and reading off whichever gives the best score on your test set. The moment
          you choose a hyperparameter by looking at the test score, that score has stopped
          measuring how the model will do on data it has never seen — it is now measuring how
          well you searched. This is exactly the failure <Strong>Data Leakage</Strong> warned you
          about, arriving through a new door.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Hold out a validation set, separate from the test set.",
              detail: "Or use the rotating folds from Cross-Validation instead of a single split.",
            },
            {
              label: "Fit a model at each candidate λ, using only the training rows.",
              detail: "Every value on the dial above is one full fit, not a tweak to one already made.",
            },
            {
              label: "Score every candidate on the validation set, or the average across folds.",
            },
            {
              label: "Pick the λ with the lowest validation error.",
              detail: "That is the marked point on the error chart — a choice, not a discovery.",
            },
            {
              label: "Touch the test set once, at the very end, with λ already fixed.",
              detail: "Its score is now an honest estimate, because nothing about it influenced any choice you made.",
            },
          ]}
        />
        <Callout tone="warning" title="Scale first, or the penalty is not fair">
          A penalty on raw coefficient size only makes sense if the coefficients are comparable
          in the first place. A rent measured in minutes of walk time and a rent measured in
          square metres are not on the same scale, so an unscaled penalty punishes whichever
          column happened to be measured in small units, for no reason connected to how much it
          actually matters. Standardise every predictor before fitting, exactly as the widget
          above does, and fit that standardiser on the training rows only.
        </Callout>
        <Callout tone="note" title="The same idea, in different clothes">
          &ldquo;Regularisation&rdquo; only means &ldquo;penalise the size of a coefficient&rdquo;
          in linear models. In a decision tree it is a depth limit or a pruning rule — punishing
          the tree for growing more branches. In a neural network it is weight decay, dropout, and
          stopping training early. Different mechanism, same argument: complexity is cheap to buy
          on the training set and expensive everywhere else, so make the model pay for it up
          front.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "An unpenalised fit minimises error alone, and nothing in that minimisation cares how large a coefficient gets.",
          "Regularisation adds the size of the coefficients to what gets minimised, so growing one has to earn its keep.",
          "L2 shrinks every coefficient towards zero and never quite gets there. L1 is willing to set the weakest ones to exactly zero.",
          "The penalty strength is a hyperparameter with two failure modes either side of it: no penalty overfits, too much penalty flattens everything to the mean.",
          "Choose the strength on a validation set or by cross-validation, never on the test set — the moment a hyperparameter is picked by the test score, that score stops estimating anything.",
        ]}
      />
    </div>
  );
}
