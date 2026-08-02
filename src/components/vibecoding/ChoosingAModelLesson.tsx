import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function ChoosingAModelLesson() {
  return (
    <div>
      <Lead>
        Every tool now offers a model picker, and the names change every few months. Rather
        than memorising which model is currently best, learn the two axes they vary along —
        that knowledge survives the next release.
      </Lead>

      <LessonSection id="the-two-axes" title="The two axes that matter">
        <P>
          Ignore the branding. In practice you are choosing along two dimensions, and the
          second one is the one people miss.
        </P>
        <CompareGrid
          items={[
            {
              title: "Capability",
              tone: "positive",
              children: (
                <p>
                  How hard a problem it can hold in its head at once. Bigger models handle more
                  interacting constraints before they start dropping some.
                </p>
              ),
            },
            {
              title: "Deliberation",
              tone: "positive",
              children: (
                <p>
                  Whether it thinks before answering. Reasoning modes work through a problem
                  internally first, which costs seconds and money but changes what is solvable.
                </p>
              ),
            },
          ]}
        />
        <P>
          A fast model with no deliberation is excellent at the thing you already know how to
          do. A reasoning model earns its cost on the thing you are stuck on.
        </P>
        <P>
          The two axes are independent, which is the part worth sitting with. A model can be
          highly capable and still answer instantly, if the problem in front of it is one it has
          effectively memorised the shape of. And a model can deliberate for a long time and
          still be wrong, because thinking longer helps with problems that benefit from working
          through steps, not with problems where the model is simply missing information it was
          never given.
        </P>
      </LessonSection>

      <LessonSection id="what-the-picker-is-really-asking" title="What the picker is really asking">
        <P>
          Strip away the branding and every model picker on the market is asking the same
          question in different words: how much of the second axis do you want switched on. The
          exact labels change with every release. The underlying choice does not.
        </P>
        <LabelRows
          rows={[
            {
              label: "Fast / Standard",
              text: "Deliberation off. The reasonable default — use it until it visibly struggles.",
            },
            {
              label: "Think / Extended / Pro",
              text: "Deliberation on. Reach for it after a specific failure, not as a default.",
            },
            {
              label: "An effort or depth slider",
              text: "The same dial, made continuous instead of binary. Higher is not automatically better on an easy task — it is slower and more expensive for no gain.",
            },
          ]}
        />
        <P>
          Read a new picker by mapping its options onto this pair of axes before you touch it.
          You will be right about what each setting does long before you have learned what it is
          currently called.
        </P>
      </LessonSection>

      <LessonSection id="when-fast-is-right" title="When fast is right">
        <P>
          Most of your prompts should use the fast model, and this is not a compromise. For a
          large share of real work the answer is not hard — it is just tedious to type.
        </P>
        <StepList
          steps={[
            { label: "Autocomplete while you type", detail: "Latency matters more than depth; a slow suggestion is a useless suggestion." },
            { label: "Renaming, reformatting, mechanical edits", detail: "There is no reasoning to do." },
            { label: "Writing a component you have described precisely", detail: "You already did the thinking in the prompt." },
            { label: "Explaining what a piece of code does", detail: "Reading is easier than designing." },
          ]}
        />
      </LessonSection>

      <LessonSection id="when-to-escalate" title="When to escalate">
        <P>
          Switch to the slower, more capable model when the difficulty is in the{" "}
          <Strong>thinking</Strong>, not the typing:
        </P>
        <StepList
          steps={[
            { label: "A bug that survived two fix attempts", detail: "Two failures means the obvious answer is wrong, which is exactly where deliberation pays." },
            { label: "Changes that span many files", detail: "More interacting constraints than a fast model reliably holds at once." },
            { label: "Anything with a security or money dimension", detail: "The cost of a subtle mistake is far above the cost of the tokens." },
            { label: "Design decisions you will live with", detail: "Schema shape, API surface, state architecture." },
          ]}
        />
        <Callout tone="tip" title="A rule that works">
          Start fast. Escalate on the second failure, not the first. One failure is usually a
          bad prompt — and escalating a bad prompt just gets you a more expensive wrong answer.
        </Callout>
      </LessonSection>

      <LessonSection id="what-the-cost-actually-is" title="What the cost actually is">
        <P>
          Priced per token, these look almost free — fractions of a cent per request. That
          framing misleads in both directions.
        </P>
        <P>
          Upward: an agent looping over a large codebase can consume millions of tokens in an
          afternoon, and reasoning models charge for the thinking you never see. Downward: if a
          model saves you an hour, almost any per-request price is irrelevant next to an hour
          of your time.
        </P>
        <P>
          The number worth watching is not cost per request. It is{" "}
          <Strong>cost per problem actually solved</Strong> — and by that measure the expensive
          model is frequently the cheap one, because three cycles with a fast model that never
          gets there costs more than one that does.
        </P>
        <P>
          None of this requires knowing an exact price, and it will keep being true after every
          price changes. A wrong answer costs you the time to notice it was wrong, plus the time
          to redo it. A slower, pricier answer only has to beat that combined cost once to be
          worth reaching for — it does not have to be cheap, it has to be cheaper than being
          wrong.
        </P>
      </LessonSection>

      <LessonSection id="finding-out-for-yourself" title="Finding out for yourself">
        <P>
          Benchmarks tell you about benchmarks. What you want to know is how a model does on{" "}
          <Strong>your</Strong> code. Keep two or three problems from your own project that you
          have already solved, and re-run them whenever you are evaluating something new:
        </P>
        <CodeBlock
          variant="prompt"
          label="A reusable evaluation prompt"
          code={`Here is a bug I already fixed, and the code before the fix.
Do not look for my solution — diagnose it yourself, explain
the root cause, and propose a fix.`}
        />
        <P>
          Because you know the real answer, you can judge the reasoning rather than being
          impressed by the confidence. That is worth more than any leaderboard.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Two axes: how much it can hold at once, and whether it thinks before answering.",
          "Most prompts should use the fast model — much of the work is typing, not thinking.",
          "Escalate on the second failure. The first is usually a prompt problem.",
          "Judge cost per problem solved, not cost per request.",
          "Evaluate models on problems from your own codebase where you already know the answer.",
        ]}
      />
    </div>
  );
}
