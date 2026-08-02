import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
            { label: "Knowing when not to use it", detail: "Judgement is the part that is yours." },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-shape-of-what-you-built" title="The shape of what you built">
        <P>
          Twenty-nine chapters is a lot to hold at once, so here is the shape of it compressed to
          one line per part — not to re-teach any of it, but so you can see what you actually
          assembled.
        </P>
        <LabelRows
          rows={[
            {
              label: "Setup",
              text: "You went from an empty terminal to a running app you built with a tool, not despite one.",
            },
            {
              label: "Model",
              text: "You learned what the model can actually see, which explains most of what used to look like guessing.",
            },
            {
              label: "Loop",
              text: "Prompt, generate, review, test, commit — the cycle you now do without thinking about the steps.",
            },
            {
              label: "Codebases",
              text: "You learned that the same prompt means something different in someone else's fifty-thousand-line repository.",
            },
            {
              label: "Correctness",
              text: "Debugging, tests, and a security pass — the checks that catch what confidence alone does not.",
            },
            {
              label: "Shipping",
              text: "Getting it in front of people, and the unglamorous work of keeping it alive afterwards.",
            },
            {
              label: "Depth",
              text: "Agents, orchestration, and tools of your own — the parts of the job that scale past one person typing.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-this-could-not-teach-you" title="What this course could not teach you">
        <P>
          None of that is the hard part, and it would be dishonest to end here implying it is.
        </P>
        <P>
          A course example is sized to be solvable in an afternoon. A real codebase carries three
          years of decisions nobody remembers making, a stakeholder whose &ldquo;make it
          faster&rdquo; means five different things depending which week you ask, and an
          incident at eleven at night where the fix has to be right the first time because there
          is no second deploy window before the meeting.
        </P>
        <P>
          None of that is teachable from a chapter, because the skill involved is not a
          technique. It is judgement, built from having been wrong enough times to recognise the
          shape of a mistake early. This course can hand you the loop, the checklists, and the
          vocabulary for the trade-offs. It cannot hand you the accumulated hours of having been
          burned by a plausible-looking answer that was wrong in a way only experience would
          have caught in time.
        </P>
        <Callout tone="note" title="What only repetition builds">
          Every list in this course — the security pass, the review checklist, the questions for
          a bug report — started as a shortcut for something a person had to learn the slow way
          once. Use the lists. But do not mistake having the list for having done the work the
          list was built from. The list is a floor, not a substitute.
        </Callout>
      </LessonSection>

      <LessonSection id="the-end" title="Where this leaves you">
        <P>
          None of that is a reason to stop, and it never has been the point of a first course
          anyway.
        </P>
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
          "A course can give you the loop and the checklists. It cannot give you the thousand hours of judgement only repetition builds.",
        ]}
      />
    </div>
  );
}
