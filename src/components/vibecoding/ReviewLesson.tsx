"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

interface Issue {
  id: string;
  token: string;
  explanation: string;
}

const ISSUES: Record<string, Issue> = {
  secret: {
    id: "secret",
    token: '"sk_live_51Hc8x7KLjq3mZ"',
    explanation:
      "A real API key, hardcoded and committed to the repo. Anyone with read access to the code can now use it. Move it to an environment variable.",
  },
  offByOne: {
    id: "offByOne",
    token: "<=",
    explanation:
      "Should be <. This loop runs one time too many and reads scores[scores.length], which is undefined, turning the total into NaN.",
  },
  divideByZero: {
    id: "divideByZero",
    token: "/ scores.length",
    explanation:
      "If scores is empty, this divides by zero and returns NaN instead of a sensible result or an error.",
  },
};

const CHECKLIST = [
  "Readability: could a teammate understand this without you explaining it?",
  "Edge cases: empty input, huge input, wrong types, network failure?",
  "Security: secrets, unsanitised input, permissions?",
  "New dependencies: is this package actually installed, and does it export what's being called?",
  "Tests: does anything actually verify this still works?",
];

function IssueToken({
  id,
  isFound,
  onReveal,
}: {
  id: string;
  isFound: boolean;
  onReveal: (id: string) => void;
}) {
  const issue = ISSUES[id];
  return (
    <button
      type="button"
      onClick={() => onReveal(id)}
      className={`learn-focusable rounded px-1 font-mono transition-colors ${
        isFound
          ? "bg-learn-code-err text-learn-code-bg"
          : "bg-learn-code-err/25 text-learn-code-err underline decoration-dotted"
      }`}
    >
      {issue.token}
    </button>
  );
}

export function ReviewLesson() {
  const [found, setFound] = useState<Set<string>>(new Set());

  const reveal = (id: string) => {
    setFound((prev) => new Set(prev).add(id));
  };

  return (
    <div>
      <Lead>
        You judge code by whether it runs. That instinct served you fine when you wrote every
        line yourself and a typo meant an immediate crash. It fails you here: the code in front
        of you was written by something that produces working syntax by default, and working
        syntax says nothing about whether the logic underneath it is right.
      </Lead>

      <LessonSection id="the-mistakes-cluster-into-four-shapes" title="The mistakes cluster into four shapes">
        <P>
          Review enough AI-generated code and the failures stop looking random. The same four
          shapes come back on a loop, and once you know them you stop reading line by line and
          start pattern-matching.
        </P>
        <LabelRows
          rows={[
            {
              label: "Wrong import",
              text: (
                <>
                  It reaches for a package that solves this exact problem elsewhere, and gets
                  the path, the export name, or whether it is even installed wrong —{" "}
                  <InlineCode>{'import { debounce } from "lodash-es"'}</InlineCode> when your{" "}
                  <InlineCode>package.json</InlineCode> only has <InlineCode>lodash</InlineCode>.
                </>
              ),
            },
            {
              label: "Swallowed error",
              text: (
                <>
                  A <InlineCode>catch</InlineCode> block that does nothing, or does something
                  that looks like handling but is not — logs to a console nobody reads, then
                  carries on as though the operation succeeded.
                </>
              ),
            },
            {
              label: "Empty test",
              text: "A test that runs the code and checks that it did not throw, not that it produced the right answer. It goes green forever, including the day you break it.",
            },
            {
              label: "Invented API",
              text: (
                <>
                  A method that would be reasonable for a language or library to have, and does
                  not, called with total confidence: an array method that does not exist on that
                  type, a config flag from a different major version, a query parameter no
                  endpoint accepts.
                </>
              ),
            },
          ]}
        />
        <CodeBlock
          label="draftStore.ts"
          code={`async function saveDraft(note) {
  try {
    await api.post("/drafts", note);
  } catch (err) {
    console.log("save failed");
  }
  return true;
}`}
          lineTones={{ 4: "err", 6: "warn" }}
        />
        <P>
          The function returns <InlineCode>true</InlineCode> whether or not the request
          succeeded. Nothing downstream can tell a saved draft from a lost one, and the only
          trace is a console line nobody is watching in production.
        </P>
        <Callout tone="danger" title="The hallucinated API is the one that gets through">
          A wrong import fails at build time, loudly. An invented method usually fails
          immediately too — but not always. Called on the wrong type, wrapped in an optional
          chain, or behind a feature flag, it can sit there passing every test you have and fail
          the first time a real user reaches the path that calls it. Check anything unfamiliar
          in a diff against the actual documentation, never against how plausible it sounds.
        </Callout>
      </LessonSection>

      <LessonSection id="some-lines-matter-more-than-others" title="Some lines matter more than others">
        <P>
          You do not have time to review every line with equal care, and you should not try to.
          Triage first, in this order.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Anything touching money, auth, or secrets",
              detail:
                "A pricing calculation, a permission check, an API key. These are the lines where a subtle mistake costs the most and shows up last.",
            },
            {
              label: "The edges",
              detail:
                "Empty array, zero, null, a network call that fails, an input three orders of magnitude bigger than the example. This is where the off-by-one and the swallowed error live.",
            },
            {
              label: "Every new import",
              detail:
                "Confirm the package is actually a dependency, and that the function it is calling actually exists on it. Ten seconds, and it catches the wrong-import defect outright.",
            },
            {
              label: "The tests, last",
              detail:
                "Read what they assert, not just whether they pass. A test that runs the code and checks nothing is worse than no test — it looks like coverage.",
            },
          ]}
        />
        <P>
          Below is a real snippet with three planted issues, sized to those categories. Find them
          before you read the explanations.
        </P>
      </LessonSection>

      <div className="learn-card mt-6 overflow-hidden rounded-learn-xl p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.08em] text-learn-muted">
            average.js
          </span>
          <span className="text-xs text-learn-accent-text">
            {found.size} of {Object.keys(ISSUES).length} issues found
          </span>
        </div>

        <div className="mt-4 space-y-1 rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.7] text-learn-code-fg">
          <p>function calculateAverage(scores) {"{"}</p>
          <p>
            {"  "}const apiKey ={" "}
            <IssueToken id="secret" isFound={found.has("secret")} onReveal={reveal} />;
          </p>
          <p>{"  "}let total = 0;</p>
          <p>
            {"  "}for (let i = 0; i{" "}
            <IssueToken id="offByOne" isFound={found.has("offByOne")} onReveal={reveal} />{" "}
            scores.length; i++) {"{"}
          </p>
          <p>{"    "}total += scores[i];</p>
          <p>{"  "}{"}"}</p>
          <p>
            {"  "}return total{" "}
            <IssueToken id="divideByZero" isFound={found.has("divideByZero")} onReveal={reveal} />;
          </p>
          <p>{"}"}</p>
        </div>

        <div className="mt-5 space-y-3">
          <AnimatePresence>
            {Array.from(found).map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="rounded-learn-md bg-learn-quiet p-4 text-[14px] leading-[1.5] text-learn-strong">
                  {ISSUES[id].explanation}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <LessonSection id="before-you-merge-check" title="Before you merge, check" delay={0.05}>
        <ChecklistCard items={CHECKLIST} />
        <Callout tone="tip" title="What review buys you">
          None of this is about the model doing a bad job. It is about the review being the
          step that was always the human&rsquo;s job, mechanised writing or not. The five
          minutes here are what make the speed upstream of it safe to use.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "AI-generated code is a draft from a confident stranger. Review it exactly that way, not as a colleague's pull request.",
          "The mistakes cluster into four repeatable shapes: the wrong import, the swallowed error, the test that asserts nothing, and the invented API.",
          "Spend your attention on money, auth, secrets, and edges first — that is where a mistake costs the most and hides the longest.",
          "A new import is worth ten seconds of checking: is the package installed, and does it actually export what is being called?",
          "Anything you cannot explain line by line is not ready to ship, no matter how confidently it was written.",
        ]}
      />
    </div>
  );
}
