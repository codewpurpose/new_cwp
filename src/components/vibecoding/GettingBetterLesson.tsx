import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function GettingBetterLesson() {
  return (
    <div>
      <Lead>
        The last chapter, and the one that determines whether the other twenty-eight compound.
        Vibe coding has a specific trap: it feels like improvement long before it is
        improvement, because output volume goes up immediately and skill does not.
      </Lead>

      <LessonSection id="the-illusion" title="Speed is not the same as skill">
        <P>
          In week one you will produce more code than you ever have. That is real, and it is not
          evidence that you got better at software — it is evidence that typing was never the
          bottleneck.
        </P>
        <P>
          The honest question is not &ldquo;how much did I ship?&rdquo; It is:{" "}
          <Strong>could I maintain what I shipped?</Strong> A project you cannot debug is not an
          achievement that has been delivered early; it is a debt that has been taken out.
        </P>
        <Callout tone="warning" title="The signal to watch for">
          When something breaks and your first instinct is to ask the AI rather than to read the
          code — and you could not have found it yourself — that is the gap widening. It is
          fixable, but only if you notice it.
        </Callout>
      </LessonSection>

      <LessonSection id="measure-something-real" title="Measure something real">
        <P>
          Four questions, asked honestly, tell you more than any amount of feeling productive:
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Can you explain your own project?",
              detail:
                "Pick a file you accepted last week. Without looking at it, describe what it does. Then check.",
            },
            {
              label: "How often do you accept without reading?",
              detail:
                "Count it for one day. The number is usually higher than people expect, and it is the single best predictor of a codebase you cannot maintain.",
            },
            {
              label: "How many prompts to a working result?",
              detail:
                "Going from five to two on the same kind of task is real, measurable prompting skill.",
            },
            {
              label: "Do you catch bugs before shipping?",
              detail:
                "If users find them and your review does not, the review is decorative.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="deliberate-practice" title="Practice that actually builds skill">
        <P>
          Volume alone does not build skill — the same shallow loop repeated stays shallow. Three
          exercises worth doing on purpose:
        </P>
        <ChecklistCard
          title="Try each of these"
          items={[
            <>
              <Strong>Predict before you read.</Strong> Before opening a generated diff, say
              what you expect it to contain. Then check. Your prediction accuracy is a direct
              measure of how well you understand your own project.
            </>,
            <>
              <Strong>Write it yourself first, sometimes.</Strong> Attempt it by hand, then ask
              for a critique. You get the struggle that builds skill and the feedback that
              corrects it.
            </>,
            <>
              <Strong>Explain the code to someone.</Strong> Or to a text file. You will discover
              the parts you only think you understood within about two minutes.
            </>,
          ]}
        />
      </LessonSection>

      <LessonSection id="use-it-on-yourself" title="Turn the tool on your own work">
        <P>
          The AI is a reasonable reviewer of your process, not just your code — provided you ask
          it to be critical rather than encouraging:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Here are five prompts I wrote this week and the results
I got. Do not be encouraging — tell me what is weak about
how I am asking, what context I keep failing to provide,
and what I should do differently.`}
        />
        <P>
          Models default to being agreeable. You have to explicitly ask for the other thing, and
          when you do, the feedback is usually specific and usable.
        </P>
      </LessonSection>

      <LessonSection id="what-to-keep" title="What to keep as the tools change">
        <P>
          Most specifics in this course have a shelf life. Model names will change; the tool you
          set up in Chapter 4 may not exist in three years. What survives is smaller and more
          durable:
        </P>
        <StepList
          steps={[
            { label: "Knowing what the model can and cannot see", detail: "Explains most of its behaviour, and no version bump changes that." },
            { label: "Working in small, verifiable steps", detail: "Predates AI by decades and will outlast it." },
            { label: "Reading a diff properly", detail: "The skill that makes speed safe." },
            { label: "Knowing when not to use it", detail: "Judgement is the part that is genuinely yours." },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-end" title="Where this leaves you">
        <P>
          You started this course being told what vibe coding is. You now have a project you
          built, a workflow you can repeat, and — more useful than either — a sense of when the
          tool is helping and when it is quietly making things worse.
        </P>
        <P>
          The people who get the most out of this are not the ones who prompt the most. They are
          the ones who stayed curious about the code that came back. Keep reading what it
          writes, keep asking why, and the tools will keep getting better underneath you.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Output volume rises immediately; skill does not. Do not mistake the first for the second.",
          "The real question is whether you could maintain what you shipped.",
          "Count how often you accept without reading. It predicts everything else.",
          "Predict what a diff will contain before opening it — that measures real understanding.",
          "Ask the AI to critique your prompting, and explicitly tell it not to be encouraging.",
          "What survives the tools changing: knowing what it can see, small steps, reading diffs, and judgement.",
        ]}
      />
    </div>
  );
}
