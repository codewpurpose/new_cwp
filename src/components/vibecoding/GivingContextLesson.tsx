import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function GivingContextLesson() {
  return (
    <div>
      <Lead>
        You already know the model answers using only what it can see. This chapter is the
        practical follow-up: how to decide what to show it, and — just as important — what to
        leave out.
      </Lead>

      <LessonSection id="reference-dont-describe" title="Reference, don't describe">
        <P>
          The instinct is to explain your code in prose. Do not. Point at it. A file reference
          costs you five characters and gives the model the actual truth instead of your
          summary of it.
        </P>
        <CompareGrid
          items={[
            {
              title: "Describing",
              tone: "caution",
              children: (
                <p>
                  &ldquo;We have a user type with an email and some profile fields, I think
                  there&rsquo;s a role on there too.&rdquo;
                </p>
              ),
            },
            {
              title: "Referencing",
              tone: "positive",
              children: (
                <p>
                  &ldquo;See <InlineCode>@src/types/user.ts</InlineCode>.&rdquo;
                </p>
              ),
            },
          ]}
        />
        <P>
          Every tool has a syntax for this — <InlineCode>@filename</InlineCode> in Cursor,
          referencing paths directly in Claude Code, the attachment picker in Copilot Chat.
          Learn the one your tool uses on day one.
        </P>
      </LessonSection>

      <LessonSection id="what-to-attach" title="What to attach">
        <P>
          For most tasks, three things are enough, and they map onto three different questions
          the model has to answer:
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "The file you want changed",
              detail: "Answers “where does this go?”",
            },
            {
              label: "A similar file that already does it right",
              detail:
                "Answers “what should it look like?” This is the one people skip, and it is the highest-value attachment you can make.",
              note: "One good example teaches conventions better than a paragraph describing them.",
            },
            {
              label: "The type or schema it must conform to",
              detail: "Answers “what shape is the data?” — and stops invented field names dead.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-not-to-attach" title="What not to attach">
        <P>
          More context is not better. The window is a budget, and filling it with noise pushes
          out the parts that mattered.
        </P>
        <ChecklistNegative />
        <Callout tone="warning" title="Never attach">
          <InlineCode>.env</InlineCode> files, private keys, customer data, or anything under a
          confidentiality obligation. Treat anything you send as having left your machine
          permanently, because in practice it has.
        </Callout>
      </LessonSection>

      <LessonSection id="screenshots-and-errors" title="Screenshots and errors">
        <P>
          Most tools now accept images, and for UI work a screenshot outperforms any
          description you could write. &ldquo;The spacing under the header is too tight on
          mobile&rdquo; plus a screenshot is a complete brief.
        </P>
        <P>
          For errors, paste the whole thing. The instinct to tidy it up is the exact wrong
          move: the stack frames you trimmed are the part that named the file.
        </P>
        <CodeBlock
          variant="prompt"
          label="A well-formed request"
          code={`The checkout total is wrong when a coupon is applied.

Relevant files:
- src/lib/pricing.ts        (where the total is computed)
- src/lib/pricing.test.ts   (existing tests, all passing)
- src/types/cart.ts         (the shapes involved)

Steps to reproduce: add two items, apply SAVE10, total shows
the discount twice.

Full error from the console:
[paste it all, unedited]`}
        />
      </LessonSection>

      <LessonSection id="the-cheapest-check" title="The cheapest check there is">
        <P>
          Before any substantial request, one line of prompt saves entire rounds of confusion:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Do you have everything you need to do this? If anything is
missing or ambiguous, ask before starting.`}
        />
        <P>
          Models are surprisingly willing to say what they are missing when you invite it. They
          just never volunteer it, because the default behaviour is to answer.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Point at files instead of describing them. Your summary is lossy; the file is not.",
          "Attach three things: the target, a good example to imitate, and the relevant types.",
          "The similar-file example is the highest-value attachment and the one most people skip.",
          "Do not attach everything — noise pushes the useful parts out of the budget.",
          "Never attach secrets or customer data. It leaves your machine and does not come back.",
          "Ask “do you have what you need?” before big requests.",
        ]}
      />
    </div>
  );
}

function ChecklistNegative() {
  return (
    <div className="mt-4 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-6">
      <ul className="space-y-2">
        {[
          "Your whole repo, when the change touches one module",
          "Generated files, lockfiles, and build output",
          "Long files where only one function is relevant — quote the function",
          "Documentation the model already knows (it does not need React's docs pasted in)",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[14px] leading-[1.5] text-learn-strong"
          >
            <span aria-hidden="true" className="mt-0.5 text-learn-outcome-fn">
              ×
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
