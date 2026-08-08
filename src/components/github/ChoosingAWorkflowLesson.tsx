import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function ChoosingAWorkflowLesson() {
  return (
    <div>
      <Lead>
        Every Git argument a team has is really an argument about branch lifetime. Compare the three
        common answers, see which problem each was invented for, and decide what your repository
        should agree on.
      </Lead>

      <LessonSection
        id="every-workflow-argument-is-about-branch-lifetime"
        title="Every workflow argument is about branch lifetime"
      >
        <P>
          Squash or merge. Rebase or not. One long-lived branch or several. Feature flags or feature
          branches. These look like separate arguments and they are one argument, asked in different
          words: <Strong>how long should work live away from main?</Strong>
        </P>
        <P>
          The trade-off is genuine and it does not have a universal answer.
        </P>
        <CompareGrid
          items={[
            {
              title: "Longer branches",
              tone: "neutral",
              children: (
                <P>
                  Work is isolated until it is finished, so main never contains a half-built feature.
                  The cost is that the branch diverges: conflicts grow, the review gets larger, and
                  &quot;it worked on my branch&quot; becomes a real category of bug.
                </P>
              ),
            },
            {
              title: "Shorter branches",
              tone: "positive",
              children: (
                <P>
                  Small changes merge constantly, so conflicts stay tiny and reviews stay readable.
                  The cost is that unfinished work is on main, which needs discipline — and usually
                  feature flags — to keep from shipping.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="note" title="Branch lifetime is a proxy for how you release">
          A team that deploys ten times a day cannot afford three-week branches. A team shipping
          firmware twice a year cannot integrate continuously into a branch that must stay
          release-ready. The right workflow follows from how often you ship, not from taste.
        </Callout>
      </LessonSection>

      <LessonSection id="github-flow-is-one-long-lived-branch" title="GitHub Flow is one long-lived branch">
        <P>
          The simplest model that supports review, and by a wide margin the most common on GitHub. One
          permanent branch — main, always deployable — and short-lived branches off it.
        </P>
        <StepList
          variant="timeline"
          steps={[
            { label: "Branch from main", detail: "Named for what it does. fix/login-redirect, feat/csv-export." },
            { label: "Commit and push", detail: "Push early. The branch is backed up and visible, and CI starts running." },
            { label: "Open a pull request", detail: "Draft while it is in progress. Discussion happens here, not in chat." },
            { label: "Review and iterate", detail: "Checks run on every push. Comments are addressed by pushing more commits." },
            { label: "Merge and delete", detail: "Squash into main, delete the branch. main is deployable again immediately." },
          ]}
        />
        <LabelRows
          rows={[
            { label: "Suits", text: "Web applications, services, and anything with one production version — which is most software written today." },
            { label: "Requires", text: "Branch protection, CI that is trustworthy, and small branches. Without those it is just \"push to main\" with extra steps." },
            { label: "Breaks when", text: "You must support several released versions at once, or a change is too large to merge in a week." },
          ]}
        />
        <P>
          If your team has not chosen deliberately, this is the one to start with. It is what GitHub
          itself is designed around, which is why every default — the pull request form, the merge
          button, auto-delete branches — fits it without configuration.
        </P>
      </LessonSection>

      <LessonSection
        id="trunk-based-development-shortens-the-branch"
        title="Trunk-based development shortens the branch"
      >
        <P>
          The same shape, pushed to its logical end: branches live hours rather than days, and
          anything that cannot be finished in a day is merged incomplete but switched off.
        </P>
        <CodeBlock
          label="The mechanism that makes it possible"
          code={`// The new checkout is on main, merged, tested — and dark.
if (flags.newCheckout) {
  return <NewCheckout />;
}
return <LegacyCheckout />;`}
        />
        <P>
          A <Strong>feature flag</Strong> separates deploying from releasing. The code ships to
          production continuously and stays invisible until a runtime switch enables it — for the
          team, then for one per cent of users, then for everybody. Turning something off becomes a
          setting change rather than a revert and a deploy.
        </P>
        <LabelRows
          rows={[
            { label: "Buys", text: "Almost no merge conflicts, continuous integration in the literal sense, and instant rollback of a feature without a code change." },
            { label: "Costs", text: "Flags are code, and every one is a branch in the logic. Unremoved flags accumulate until nobody knows which paths are live." },
            { label: "Needs", text: "A strong test suite and fast CI. Merging to main several times a day only works if you find out within minutes when it breaks." },
          ]}
        />
        <Callout tone="warning" title="Flags need an expiry date">
          The failure mode is not adding flags, it is never deleting them. A codebase with two hundred
          live flags has 2^200 possible configurations and nobody can reason about any of them. Make
          removing the flag part of the work, tracked as its own issue, not something to get to later.
        </Callout>
      </LessonSection>

      <LessonSection
        id="git-flow-solves-a-release-problem-you-may-not-have"
        title="Git Flow solves a release problem you may not have"
      >
        <P>
          Git Flow, described by Vincent Driessen in 2010, is the elaborate one: two permanent
          branches and three kinds of temporary branch.
        </P>
        <LabelRows
          rows={[
            { label: "main", text: "Only ever released code. Every commit on it is tagged with a version." },
            { label: "develop", text: "The integration branch. Features merge here and wait for a release." },
            { label: "feature/*", text: "Branch from develop, merge back to develop." },
            { label: "release/*", text: "Branch from develop when a version is ready. Only bug fixes; merges to both main and develop." },
            { label: "hotfix/*", text: "Branch from main for an urgent production fix; merges to both main and develop." },
          ]}
        />
        <P>
          It is a genuinely good design for the problem it was built for: versioned software that
          ships on a schedule, where several released versions are supported at once, and where a
          release is a thing that gets prepared. Desktop applications, libraries, firmware, anything
          with a version number a customer says out loud.
        </P>
        <P>
          It is a poor fit for a website deployed continuously — which is most of what people build
          now, and which is why the author added a note to his own post saying so. The{" "}
          <Strong>develop</Strong> branch, in particular, is pure overhead when main is deployed the
          moment something merges.
        </P>
        <Callout tone="warning" title="Git Flow is the most cargo-culted diagram in software">
          It was adopted almost universally on the strength of one very clear illustration, by an
          enormous number of teams who ship continuously and have no supported old versions. If you
          are using it, be able to say which of its branches solves a problem you actually have. If
          the answer is none, you are paying for machinery in exchange for nothing.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-workflow-is-an-agreement-not-a-setting"
        title="The workflow is an agreement, not a setting"
      >
        <P>
          Git enforces none of this. Every one of these models is the same commands in a different
          order, and the tool will let you do any of them, or none, or a different one each week.
        </P>
        <P>
          What makes a workflow real is the part written down and the part configured. Both, and the
          same one.
        </P>
        <ChecklistCard
          title="Write it down, then configure it to match"
          marker="check"
          items={[
            "Which branch is deployable, and what may be pushed to it directly (ideally nothing)",
            "Branch naming, so a branch list is readable at a glance",
            "Which merge strategy — and disable the others in settings, so the choice is not made per merge",
            "How many approvals, and whether CODEOWNERS decides who",
            "Which checks are required, as opposed to informational",
            "How a release is cut and tagged, and who may cut one",
            "How an urgent production fix bypasses the normal path, because at some point one will need to",
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# Tag and release, whichever workflow you chose
git tag -a v1.4.0 -m "CSV quoting, faster export"
git push origin v1.4.0
gh release create v1.4.0 --generate-notes`}
        />
        <P>
          <Strong>--generate-notes</Strong> writes the release notes from the pull requests merged
          since the last tag, which is the strongest practical argument for the habits in this whole
          track: good pull request titles, linked issues, and one logical change per merge turn into
          a changelog you did not have to write.
        </P>
        <P>
          Start with GitHub Flow. Add branch protection. Keep branches small. Change something only
          when you can name the problem it fixes — that rule alone puts you ahead of most teams, and
          it is the same rule as every other chapter here: know what the tool is doing, and choose on
          purpose.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Every workflow argument reduces to one question: how long should work live away from main?",
          "Long branches isolate risk and accumulate conflicts. Short branches invert both.",
          "The right answer follows from how often you ship, not from taste.",
          "GitHub Flow — one deployable main plus short-lived branches — fits most software and every GitHub default.",
          "Trunk-based development shortens branches to hours and uses feature flags to separate deploying from releasing.",
          "Feature flags need a removal plan; unremoved flags make a codebase nobody can reason about.",
          "Git Flow suits versioned, scheduled releases with several supported versions at once.",
          "Git Flow is widely used by teams who ship continuously and have no supported old versions — be able to name the problem each branch solves.",
          "Git enforces none of it. A workflow is real when it is written down AND configured in branch protection.",
          "gh release create --generate-notes turns good pull request titles into a changelog for free.",
        ]}
      />
    </div>
  );
}
