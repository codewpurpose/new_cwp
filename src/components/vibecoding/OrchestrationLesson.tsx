import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function OrchestrationLesson() {
  return (
    <div>
      <Lead>
        One agent working sequentially has a ceiling: the context window. Splitting work across
        several agents raises it — and introduces a new class of problem, because now they can
        disagree with each other.
      </Lead>

      <LessonSection id="why-split-at-all" title="Why split at all">
        <P>
          Two reasons, and it is worth being clear which one you have, because they need
          different shapes.
        </P>
        <CompareGrid
          items={[
            {
              title: "Breadth",
              tone: "positive",
              children: (
                <p>
                  The work does not fit in one context. Auditing 200 files, or migrating every
                  call site of an API. Split by <Strong>item</Strong>.
                </p>
              ),
            },
            {
              title: "Confidence",
              tone: "positive",
              children: (
                <p>
                  You want independent opinions rather than more output. Three reviewers who
                  cannot see each other&rsquo;s conclusions. Split by <Strong>perspective</Strong>.
                </p>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-shapes-that-work" title="The shapes that work">
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Fan out, then merge",
              detail:
                "One agent per file or per module, all independent, then you combine the results. Works because the pieces do not interact.",
            },
            {
              label: "Generate then verify",
              detail:
                "One agent proposes, a second one — with no memory of the first — tries to find the flaw. The second agent is the valuable one.",
              note: "Ask the verifier to refute rather than to check. A checker agrees; a refuter looks harder.",
            },
            {
              label: "Panel of perspectives",
              detail:
                "Same code, three agents, three different lenses: correctness, security, performance. Diversity catches what redundancy cannot.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-goes-wrong" title="What goes wrong">
        <P>
          The failure modes are specific to parallelism, and none of them appear when a single
          agent works alone.
        </P>
        <StepList
          steps={[
            {
              label: "Conflicting edits",
              detail:
                "Two agents change the same file and the second overwrites the first. Fix: separate worktrees, or partition so no two agents touch one file.",
            },
            {
              label: "Inconsistent decisions",
              detail:
                "Each agent invents its own naming or error handling because none of them can see the others. Fix: a shared rules file, and one agent that does a consistency pass at the end.",
            },
            {
              label: "Confident agreement on a wrong premise",
              detail:
                "Three agents given the same flawed framing produce three flawed answers that reinforce each other. Fix: vary the framing, not just the count.",
            },
            {
              label: "Cost that scales badly",
              detail:
                "Five agents is five times the tokens, and they are not five times more likely to be right.",
            },
          ]}
        />
        <Callout tone="warning" title="The one to actually worry about">
          Independent agents agreeing feels like strong evidence and often is not — they share
          training data and, usually, your framing. Agreement between three agents you prompted
          identically is close to one agent answering three times.
        </Callout>
      </LessonSection>

      <LessonSection id="doing-it-by-hand" title="Doing it by hand first">
        <P>
          You do not need special tooling to try this. Two terminals and two worktrees is real
          orchestration, and it teaches you where the friction actually is.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git worktree add ../app-auth -b agent/auth
git worktree add ../app-billing -b agent/billing

# one agent in each folder, on unrelated modules
# then merge both branches and resolve anything that overlaps`}
        />
        <P>
          Partition by module, so the agents cannot collide. If you find yourself splitting work
          that shares files, that is a signal the task wanted one agent, not two.
        </P>
      </LessonSection>

      <LessonSection id="when-not-to" title="When not to bother">
        <P>
          Orchestration adds coordination overhead — partitioning, merging, reconciling. For
          most tasks a single agent with a good prompt beats three with mediocre ones. Reach for
          it when the work genuinely exceeds one context, or when you want an adversarial second
          opinion.
        </P>
        <P>
          Doing it because it sounds sophisticated is how you end up spending an hour merging
          three inconsistent implementations of something one agent would have finished.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Split for breadth (by item) or for confidence (by perspective). Know which you are doing.",
          "Generate-then-refute is the highest-value shape. Ask the second agent to break it, not to check it.",
          "Partition so no two agents touch the same file, or use separate worktrees.",
          "A shared rules file is what keeps parallel agents from inventing four conventions.",
          "Agreement between identically prompted agents is weak evidence — vary the framing.",
          "One agent with a good prompt usually beats three with mediocre ones.",
        ]}
      />
    </div>
  );
}
