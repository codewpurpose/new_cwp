import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { PullRequestTimeline } from "@/components/github/PullRequestTimeline";

export function OpeningAPullRequestLesson() {
  return (
    <div>
      <Lead>
        A pull request is a merge you have not run yet, wrapped in a conversation. Follow one from
        the branch that starts it through the description, the draft state, and the checks that run
        against a commit you never made.
      </Lead>

      <LessonSection
        id="a-pull-request-is-a-merge-you-have-not-run-yet"
        title="A pull request is a merge you have not run yet"
      >
        <P>
          There is no such thing as a pull request in Git. It is entirely a GitHub construct, and
          underneath it is exactly one thing: <em>please merge this branch into that branch</em>.
        </P>
        <P>
          Everything that makes it useful is built around that proposal. Because the merge has not
          happened, there is a window in which the diff can be read, commented on, argued with,
          tested by a robot, and changed — before it becomes part of the history everybody else
          works on.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# The whole prerequisite: a branch, pushed
git switch -c fix/login-redirect
# ... work, commit ...
git push -u origin fix/login-redirect

# Then either open it in a browser, or:
gh pr create --fill        # title and body from your commits
gh pr create --web         # open the form pre-filled in a browser`}
        />
        <P>
          Two branch names define it. The <Strong>base</Strong> is where you want the code to go —
          usually main. The <Strong>head</Strong> or compare branch is where the code is now. GitHub
          shows the three-dot diff between them: what your branch <em>adds</em>, ignoring whatever
          main did while you were working.
        </P>
        <Callout tone="note" title="A pull request tracks a branch, not a set of commits">
          Push another commit to the same branch and the pull request updates itself — new diff, new
          checks, same conversation, same number. There is no &quot;update the pull request&quot;
          button because there is nothing to update. This is why review feedback is answered by
          pushing rather than by opening a second pull request.
        </Callout>
      </LessonSection>

      <LessonSection
        id="fork-and-pull-and-shared-branch-are-two-setups"
        title="Fork-and-pull and shared-branch are two setups"
      >
        <P>
          The mechanics differ depending on whether you can push to the repository, and this is the
          thing that makes open-source contribution look more complicated than it is.
        </P>
        <CompareGrid
          items={[
            {
              title: "Shared branch — you have write access",
              tone: "positive",
              children: (
                <P>
                  Your team&apos;s repository, or your own. Branch inside it, push, open the pull
                  request. Base and head are both in the same repository. This is how almost all
                  company work happens.
                </P>
              ),
            },
            {
              title: "Fork and pull — you do not",
              tone: "neutral",
              children: (
                <P>
                  Somebody else&apos;s project. Fork it to your account, branch in your fork, push
                  there, and open a pull request from your fork into theirs. The base and head are in
                  different repositories. This is how open source works, and it is the next chapter
                  but one.
                </P>
              ),
            },
          ]}
        />
        <P>
          The review experience is identical. The only real differences are that a maintainer may not
          be able to push to your fork&apos;s branch — unless you leave{" "}
          <Strong>&quot;Allow edits by maintainers&quot;</Strong> ticked, which you should — and that
          Actions on a fork&apos;s pull request run with reduced permissions, deliberately, so a
          stranger cannot open a pull request that steals your repository secrets.
        </P>
      </LessonSection>

      <LessonSection
        id="the-description-is-read-more-often-than-the-diff"
        title="The description is read more often than the diff"
      >
        <P>
          The reviewer, the person who finds this in six months looking for why a line exists, and
          the release-notes writer all read the description. Only the reviewer reads the diff.
        </P>
        <CodeBlock
          label="A description worth writing"
          code={`## What

Quotes CSV fields per RFC 4180, so values containing commas,
quotes, or newlines survive a round trip.

## Why

Fixes #482. The writer joined fields with commas and nothing
else, so a company name like "Acme, Inc." produced a row with
one extra column and the parser aborted the whole download.

## How

- Added \`quoteField()\` in src/export.ts
- Applied it to every field, not just strings — numbers are
  safe today but the type is \`unknown\`
- Test covers comma, quote, and newline cases

## Anything to flag

The export is now ~4% slower on a 50k-row file. Measured, and
I think it is worth it; happy to memoise if you disagree.`}
        />
        <P>
          That last section is what separates a good description from a complete one. The reviewer
          cannot see what you considered and rejected, what you were unsure about, or what you know
          is slightly wrong. Say it, and the review becomes a conversation about the real questions
          rather than a hunt for them.
        </P>
        <ChecklistCard
          title="A description that earns a fast review"
          marker="arrow"
          items={[
            "A title in the same imperative mood as a commit subject — it often becomes the squashed commit message",
            "\"Fixes #482\", so the issue closes and the two are linked permanently",
            "Why, not just what. The diff already says what",
            "A screenshot or a short clip for anything visible. This is worth more than three paragraphs",
            "How you tested it, especially if it is hard to test",
            "The thing you are unsure about, stated plainly",
          ]}
        />
        <Callout tone="tip" title="Pull request templates work like issue templates">
          A{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            .github/pull_request_template.md
          </span>{" "}
          pre-fills the body for everybody. Keep it short — a template with fourteen mandatory
          headings gets deleted wholesale, which is worse than not having one.
        </Callout>
      </LessonSection>

      <LessonSection
        id="a-draft-pull-request-says-not-yet-on-purpose"
        title="A draft pull request says not yet, on purpose"
      >
        <P>
          A draft pull request is a real pull request that cannot be merged. Reviewers are not
          requested automatically, GitHub marks it clearly, and the merge button is disabled until
          you press &quot;Ready for review&quot;.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh pr create --draft --fill
gh pr ready              # mark it ready when it is`}
        />
        <P>
          It is more useful than it sounds. Opening a draft on day one of a three-day piece of work
          gives you CI running on every push, a visible place for early questions, and a link to send
          somebody when you want a sanity check on the approach before you build the whole thing.
        </P>
        <PullRequestTimeline />
        <P>
          Step through that and watch the banner at the bottom. The merge button is gated by three
          separate conditions, and they are checked independently: the required checks must pass, no
          reviewer may have outstanding &quot;changes requested&quot;, and the required number of
          approvals must be met. A green tick on two of the three is still a grey button.
        </P>
      </LessonSection>

      <LessonSection
        id="checks-run-against-the-merge-not-your-branch"
        title="Checks run against the merge, not your branch"
      >
        <P>
          This one surprises people badly, usually at the worst moment. When GitHub runs CI on a pull
          request, it does not test your branch. It creates a temporary merge of your branch into the
          base and tests <em>that</em>.
        </P>
        <P>
          Which is correct — what matters is whether the result works, not whether your branch works
          in isolation. It has two consequences worth knowing in advance.
        </P>
        <LabelRows
          rows={[
            {
              label: "Passing locally is not enough",
              text: "Your branch can be perfect and the merge still fail, because somebody changed a function you call. Nothing is wrong with your commits.",
            },
            {
              label: "The commit tested never existed",
              text: "The tested commit is a temporary merge that is not on any branch. This is why a pull request can go red without you pushing anything.",
            },
            {
              label: "Required vs optional",
              text: "A check that is not marked required in branch protection can be red and the merge still allowed. Red is only a gate if somebody made it one.",
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`gh pr checks                # pass/fail for every check, in the terminal
gh pr checks --watch        # wait for them
gh pr view --web            # open the failing run's logs`}
        />
        <Callout tone="warning" title="Rerunning a failed check does not fix a failed check">
          It is worth a single try when a job died on a network timeout. Beyond that, re-running a
          genuinely failing test until it passes is how a flaky test becomes permanent — and a test
          that passes on the third attempt is telling you something real about the code.
        </Callout>
        <ChecklistCard
          title="Before you press “Ready for review”"
          marker="check"
          items={[
            "Read your own diff on the Files changed tab. You will find something",
            "No debug logging, no commented-out code, no TODO you meant to do",
            "The branch is up to date with main, so the reviewer is not reading a stale diff",
            "The checks are green — do not spend somebody else's time on a red pull request",
            "The description says why, and names the thing you are unsure about",
            "It is small. A 2,000-line pull request does not get reviewed; it gets approved",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A pull request is a GitHub construct wrapping one proposal: merge this branch into that one.",
          "It tracks a branch, so pushing another commit updates it in place — same number, same conversation.",
          "GitHub shows the three-dot diff: what your branch adds, ignoring what main did meanwhile.",
          "Shared-branch and fork-and-pull differ only in where the head branch lives; the review is identical.",
          "Leave \"Allow edits by maintainers\" ticked on a fork's pull request.",
          "The description is read by more people than the diff. Say why, and say what you are unsure about.",
          "A draft pull request cannot be merged and does not request reviewers — good from day one of the work.",
          "The merge button is gated by required checks, no outstanding changes requested, and enough approvals.",
          "Checks run against a temporary merge with the base, not your branch, so a pull request can go red with no push.",
          "Small pull requests get reviewed. Large ones get approved.",
        ]}
      />
    </div>
  );
}
