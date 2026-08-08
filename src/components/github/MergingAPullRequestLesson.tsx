import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { MergeStrategies } from "@/components/github/MergeStrategies";

export function MergingAPullRequestLesson() {
  return (
    <div>
      <Lead>
        The green button hides three different operations that leave three different histories on
        your main branch, and most teams pick by accident. See what each one writes, then meet the
        protection rules that decide who may press it.
      </Lead>

      <LessonSection id="the-green-button-hides-three-operations" title="The green button hides three operations">
        <P>
          The dropdown next to Merge pull request offers <Strong>Create a merge commit</Strong>,{" "}
          <Strong>Squash and merge</Strong>, and <Strong>Rebase and merge</Strong>. They are three
          different Git commands, and the choice is permanent — it is what lands on main.
        </P>
        <MergeStrategies />
        <P>
          Cycle through those three and read the four rows underneath. The differences are not
          aesthetic. They change what <Strong>git bisect</Strong> can find, what a revert costs, and
          whether the commits on main are the same objects that were reviewed and tested.
        </P>
        <Callout tone="tip" title="Turn off the ones you do not want">
          Settings &rarr; General &rarr; Pull Requests lets you disable any of the three. A team that
          has decided on squashing should switch the other two off, so the decision is made once
          rather than by whoever is merging on a Friday afternoon.
        </Callout>
      </LessonSection>

      <LessonSection id="create-a-merge-commit-keeps-everything" title="Create a merge commit keeps everything">
        <P>
          This is <Strong>git merge --no-ff</Strong>. Every commit from the branch arrives with its
          original hash, and a merge commit records the join.
        </P>
        <CodeBlock
          label="main afterwards"
          copyable={false}
          code={`*   9f3c1a2 Merge pull request #483 from you/fix/login
|\\
| * 4b8e0d7 lint
| * 8a2c5f1 actually fix it
| * 2c7a91f fix the thing
| * 7e4d9b3 wip
|/
* 1a5e8c3 Add the settings page`}
          lineTones={{ 0: "accent", 7: "dim" }}
        />
        <LabelRows
          rows={[
            { label: "Good for", text: "Long-lived branches with commits that were each written deliberately. Also for projects where knowing what was developed together matters." },
            { label: "Costs", text: "Every work-in-progress commit is now on main forever. Bisect can land on \"wip\", which does not build." },
            { label: "Reverting", text: "One revert of the merge commit undoes the branch — but needs -m 1, and re-merging that branch later is genuinely awkward." },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="squash-and-merge-turns-a-branch-into-one-commit"
        title="Squash and merge turns a branch into one commit"
      >
        <P>
          Every change on the branch is combined into a single new commit on main. The individual
          commits are not merged; they stay on the branch, which is usually then deleted.
        </P>
        <P>
          This is the most popular option on GitHub by a wide margin, and the reason is worth stating
          plainly: <Strong>every commit on main builds and passes.</Strong> Bisect becomes reliable,
          reverting is one commit with no flags, and the log reads as a list of features rather than a
          list of afternoons.
        </P>
        <Callout tone="warning" title="The squashed message is generated, and it is usually wrong">
          GitHub pre-fills the commit message with the pull request title and a bulleted list of every
          commit subject — including &quot;wip&quot; and &quot;lint&quot;. That text becomes your
          permanent history. Edit the box before confirming: put the pull request number in the
          subject and the actual reasoning in the body.
        </Callout>
        <CodeBlock
          label="What to leave in the box"
          code={`Quote CSV fields per RFC 4180 (#483)

Values containing commas, quotes, or newlines produced malformed
rows and aborted the download. Fixes #482.`}
        />
        <P>
          The cost is real: a carefully staged five-commit story becomes one blob. Which is why
          people who write good commit messages tend to dislike this button, and why the honest answer
          is that it depends on whether your team&apos;s commits are worth keeping.
        </P>
      </LessonSection>

      <LessonSection
        id="rebase-and-merge-replays-with-no-merge-commit"
        title="Rebase and merge replays with no merge commit"
      >
        <P>
          Each commit from the branch is replayed onto main, in order, with no merge commit. The
          history is perfectly linear and every individual commit is preserved.
        </P>
        <P>
          It sounds like the best of both and it has the sharpest edge. Every replayed commit gets a{" "}
          <Strong>new hash</Strong>, so what lands on main is not what was reviewed and not what CI
          tested. It also loses any record that these commits were one unit, which means there is no
          single thing to revert.
        </P>
        <LabelRows
          rows={[
            { label: "Good for", text: "Teams that keep every commit clean and buildable, and genuinely want a linear history with no merge commits." },
            { label: "Costs", text: "New hashes for every commit, and no marker showing where the branch began or ended." },
            { label: "Reverting", text: "There is no one commit to revert. You revert a range, and you work out the range yourself." },
          ]}
        />
        <P>
          A practical rule for choosing, if your team has not: use <Strong>squash</Strong> unless
          somebody can articulate why the individual commits are worth keeping on main. Most branches
          are one logical change made messily, and squash is the honest representation of that.
        </P>
      </LessonSection>

      <LessonSection id="branch-protection-decides-who-may-press-it" title="Branch protection decides who may press it">
        <P>
          By default anyone with write access can push directly to main, and every process described
          in the last three chapters is optional. <Strong>Branch protection rules</Strong> — or
          rulesets, the newer and more flexible form — are what make it real.
        </P>
        <LabelRows
          rows={[
            { label: "Require a pull request", text: "Direct pushes to main are rejected. This is the one that turns \"we review things\" into a fact." },
            { label: "Require approvals", text: "One or two. Two is the standard on anything where a mistake is expensive." },
            { label: "Dismiss stale approvals", text: "A new push clears existing approvals. Without it, somebody can approve a small change and then push a large one." },
            { label: "Require status checks", text: "Name the checks that must be green. A check not named here can be red and the merge is still allowed." },
            { label: "Require up to date", text: "The branch must include the latest main before merging. Prevents two individually-passing pull requests from breaking main together." },
            { label: "Require conversation resolution", text: "Every review thread must be resolved. Stops comments being merged past." },
            { label: "Block force pushes", text: "Nobody can rewrite main's history. On by default with protection, and it should stay on." },
          ]}
        />
        <Callout tone="note" title="Auto-merge is the feature that makes strict rules bearable">
          With strict protection, a pull request often sits waiting for a slow check while its author
          is asleep. &quot;Enable auto-merge&quot; queues it to merge itself the moment every
          condition is met — approvals in, checks green, conversations resolved. It merges nothing
          that would not have been mergeable by hand.
        </Callout>
        <P>
          And afterwards: <Strong>delete the branch</Strong>. GitHub offers a button and a setting to
          do it automatically, and the commits are safely in main either way. If you need it back, the
          Restore branch button on the pull request works for months.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh pr merge 483 --squash --delete-branch
gh pr merge 483 --auto --squash     # merge as soon as everything goes green

# On your own machine afterwards
git switch main
git pull
git fetch --prune                   # drop remote-tracking refs for deleted branches`}
        />
        <ChecklistCard
          title="A repository where the process is real, not aspirational"
          marker="check"
          items={[
            "main protected: no direct pushes, no force pushes",
            "At least one required approval, and stale approvals dismissed on push",
            "The checks that actually matter marked required — a red optional check gates nothing",
            "Conversation resolution required, so comments cannot be merged past",
            "Only the merge strategy you have chosen left enabled",
            "Automatically delete head branches, so the branch list stays readable",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "The green button is three different Git operations and the choice is permanent.",
          "Create a merge commit keeps every commit and its hash, plus a record of the join — and puts \"wip\" on main forever.",
          "Squash and merge makes one commit, so every commit on main builds and bisect is reliable.",
          "The generated squash message contains your \"wip\" and \"lint\" subjects. Edit it before confirming.",
          "Rebase and merge is linear and preserves commits, but gives every one a new hash and leaves nothing single to revert.",
          "Default to squash unless somebody can say why the individual commits are worth keeping.",
          "Disable the strategies you do not use, so the decision is made once.",
          "Branch protection is what turns an agreed process into an enforced one.",
          "A status check that is not marked required can be red and the merge still allowed.",
          "Auto-merge makes strict rules bearable; it merges nothing that was not already mergeable.",
        ]}
      />
    </div>
  );
}
