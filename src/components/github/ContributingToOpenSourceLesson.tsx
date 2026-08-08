import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ForkFlow } from "@/components/github/ForkFlow";

export function ContributingToOpenSourceLesson() {
  return (
    <div>
      <Lead>
        The mechanics are a fork, a branch, and a pull request; everything hard about a first
        contribution is the part before that. Read the project&apos;s own rules, pick something small
        and real, and keep your fork from drifting.
      </Lead>

      <LessonSection
        id="read-contributing-md-before-you-write-anything"
        title="Read CONTRIBUTING.md before you write anything"
      >
        <P>
          Every established project has house rules, and a pull request that ignores them is closed
          politely and never merged — not because the code was bad, but because the maintainer has
          had that conversation four hundred times.
        </P>
        <ChecklistCard
          title="What to read first, in order, and it takes ten minutes"
          marker="arrow"
          items={[
            "CONTRIBUTING.md — the branch to target, the commit format, whether tests are required, how to run them",
            "The issue you want to fix — is somebody already on it? Has this been proposed and rejected before?",
            "The last ten merged pull requests — the fastest way to learn what this project actually accepts",
            "CODE_OF_CONDUCT.md — you are agreeing to it by participating",
            "Whether a CLA or a sign-off is required, which the next-but-one section covers",
          ]}
        />
        <P>
          The single biggest mistake is writing code first. Open an issue, or comment on an existing
          one, and say what you intend to do — before you spend a weekend on it.
        </P>
        <CompareGrid
          items={[
            {
              title: "The good version",
              tone: "positive",
              children: (
                <P>
                  &quot;I hit this too. It looks like formatRow does not quote fields. Happy to open a
                  pull request that quotes per RFC 4180 with tests — does that approach sound right,
                  and is anyone already on it?&quot;
                </P>
              ),
            },
            {
              title: "The version that wastes your weekend",
              tone: "caution",
              children: (
                <P>
                  A 900-line pull request rewriting the export module, opened with no prior
                  discussion, against a project that had already decided to replace that module
                  entirely next month.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="note" title="Maintainers are volunteers, usually">
          Most maintainers do this unpaid, in evenings, alongside a job. A slow reply is not rudeness
          and an unmerged pull request is not personal. The corollary is that anything you can do to
          make review cheap — a small diff, a clear description, passing tests, following the
          conventions — genuinely raises your odds.
        </Callout>
      </LessonSection>

      <LessonSection
        id="fork-branch-push-pull-request-is-the-whole-loop"
        title="Fork, branch, push, pull request is the whole loop"
      >
        <P>
          You cannot push to somebody else&apos;s repository, which is the point of a fork: your own
          copy under your own account, which you can push to, and which stays linked to the original.
        </P>
        <ForkFlow />
        <P>
          Step three of that is the one everybody skips. After cloning your fork,{" "}
          <Strong>origin</Strong> is your fork and there is no reference to the real project at all.
          Adding it as a second remote is what lets you keep up with what the project does next.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# The whole thing, once
gh repo fork original/project --clone
cd project
git remote -v
# origin    git@github.com:you/project.git       (your fork)
# upstream  https://github.com/original/project  (the real one — gh adds this for you)

git switch -c fix/csv-quoting
# ... work, commit ...
git push -u origin fix/csv-quoting
gh pr create --repo original/project --fill`}
        />
        <Callout tone="tip" title="Leave “Allow edits by maintainers” ticked">
          It is on by default on the pull request form. It lets a maintainer push a small fix to your
          branch instead of asking you for it and waiting a week. Turning it off is occasionally
          right and usually just adds a round trip.
        </Callout>
      </LessonSection>

      <LessonSection
        id="keeping-a-fork-in-sync-needs-a-second-remote"
        title="Keeping a fork in sync needs a second remote"
      >
        <P>
          A fork is a snapshot. It does not update itself, and a fork left alone for a month is a
          month behind — which is how a small pull request arrives full of conflicts.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# If you did not fork with gh, add the original by hand
git remote add upstream https://github.com/original/project.git

# Bring your main up to date with theirs
git fetch upstream
git switch main
git merge upstream/main      # or: git rebase upstream/main
git push origin main         # update your fork on GitHub too

# Then rebase your feature branch onto the fresh main
git switch fix/csv-quoting
git rebase main`}
        />
        <P>
          Two shortcuts. GitHub&apos;s web interface has a <Strong>Sync fork</Strong> button on your
          fork&apos;s main page, and <Strong>gh repo sync</Strong> does the same from a terminal.
        </P>
        <CodeBlock variant="terminal" code={`gh repo sync you/project --source original/project`} />
        <P>
          Rebasing your feature branch is safe here for the reason from the rebase chapter: those
          commits are yours, on your fork, and nobody builds on them. A force-with-lease push to your
          own branch updates the pull request cleanly.
        </P>
        <Callout tone="warning" title="Never work on main, even in your own fork">
          Keep your fork&apos;s main a pristine mirror of upstream so it can always fast-forward.
          Committing to it means every future sync is a merge, and opening a pull request from main
          makes it impossible for you to start a second contribution without disturbing the first.
        </Callout>
      </LessonSection>

      <LessonSection
        id="a-sign-off-or-a-cla-is-sometimes-required"
        title="A sign-off or a CLA is sometimes required"
      >
        <P>
          Larger projects, especially company-backed ones, need a legal record that you had the right
          to contribute the code and are granting them a licence to it. There are two mechanisms and
          they are not the same thing.
        </P>
        <LabelRows
          rows={[
            {
              label: "DCO",
              text: "The Developer Certificate of Origin. You add a Signed-off-by line to each commit, certifying you wrote it or may submit it. Lightweight, and used by the Linux kernel among many others.",
            },
            {
              label: "CLA",
              text: "A Contributor Licence Agreement. A real legal document you sign once, usually via a bot commenting on your first pull request. Often assigns broader rights, which is why some people decline to sign them.",
            },
            {
              label: "Neither",
              text: "Most projects. Opening a pull request against a repository with a licence is generally taken as contributing under that licence.",
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# Sign off a commit
git commit -s -m "Quote CSV fields per RFC 4180"

# Adds this line to the message:
# Signed-off-by: Your Name <you@example.com>

# Retroactively, for the last three commits
git rebase --signoff HEAD~3`}
        />
        <P>
          A bot will tell you if either is required, usually within a minute of opening the pull
          request, with a link. It is a formality — but it is a blocking formality, and pull requests
          do sit unmerged for weeks because nobody read the bot&apos;s comment.
        </P>
      </LessonSection>

      <LessonSection
        id="the-smallest-useful-contribution-is-not-code"
        title="The smallest useful contribution is not code"
      >
        <P>
          If the goal is a first contribution, code is the hardest possible starting point and not the
          most valuable one.
        </P>
        <ChecklistCard
          title="Things maintainers genuinely want and rarely get"
          marker="arrow"
          items={[
            "A reproduction on an issue that says \"cannot reproduce\" — you have just unblocked a bug nobody could fix",
            "Documentation that matches reality. Every project has a README with a command that stopped working two versions ago",
            "Confirming a bug on a platform the maintainer does not have. A Windows report from a Linux maintainer's project is a gift",
            "Answering a question in an issue or a discussion, if you happen to know",
            "Reviewing somebody else's open pull request. Anyone may review; you do not need permissions",
            "A failing test that demonstrates a bug, even with no fix attached",
          ]}
        />
        <P>
          When you do want code, the <Strong>good first issue</Strong> label exists precisely for
          this and GitHub surfaces it globally. Filter for a project you actually use — familiarity
          with the thing is worth more than familiarity with the language.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh issue list --repo original/project --label "good first issue" --state open
gh issue list --repo original/project --label "help wanted" --state open

# Say you are taking it, so two people do not do the same work
gh issue comment 482 --body "I would like to take this if it is still open."`}
        />
        <Callout tone="success" title="Expect the first one to take longer than it should">
          Your first contribution to any project involves the fork dance, the local setup, a linter
          you have never configured, a test suite with an unfamiliar runner, and probably a CLA bot.
          That is normal and it is nearly all one-off. The second one to the same project takes twenty
          minutes.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Read CONTRIBUTING.md, the issue, and the last ten merged pull requests before writing anything.",
          "Say what you intend to do on the issue first. Unsolicited large pull requests are the classic wasted weekend.",
          "You cannot push to somebody else's repository; a fork is your own pushable copy, linked to the original.",
          "After cloning your fork, origin is yours and there is no reference to the project — add upstream as a second remote.",
          "A fork does not update itself. Sync it before starting, or a small change arrives full of conflicts.",
          "Never commit to your fork's main; keep it a clean mirror so it can always fast-forward.",
          "Rebasing your own fork's branch is safe, and force-with-lease updates the pull request cleanly.",
          "Some projects need a DCO sign-off (git commit -s) or a CLA. A bot will say so, and it blocks the merge.",
          "Leave \"Allow edits by maintainers\" on so a maintainer can push a small fix rather than waiting for you.",
          "Reproductions, documentation fixes, platform confirmations, and reviews are contributions, and maintainers want them more than they get them.",
        ]}
      />
    </div>
  );
}
