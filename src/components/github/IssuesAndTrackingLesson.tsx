import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function IssuesAndTrackingLesson() {
  return (
    <div>
      <Lead>
        &quot;It doesn&apos;t work&quot; is the most common issue on GitHub and the least useful.
        Learn the four things a maintainer needs, the filing system of labels and milestones, and the
        keyword that closes an issue from a commit message.
      </Lead>

      <LessonSection id="an-issue-is-a-conversation-with-a-state" title="An issue is a conversation with a state">
        <P>
          An issue is a numbered thread attached to a repository. It has a title, a body, comments, a
          set of labels, and exactly one bit of state: open or closed.
        </P>
        <P>
          That is deliberately minimal. GitHub Issues is not a project management tool with statuses
          and workflows and estimates; it is a discussion with a checkbox. Everything else — the
          board, the sprint, the priority — is built on top with labels and Projects.
        </P>
        <P>
          Issues are not only bugs. On a healthy repository they are used for at least four things,
          and conflating them is the first thing labels fix.
        </P>
        <LabelRows
          rows={[
            { label: "Bug", text: "Something is broken. Needs a reproduction, and it is the kind that most benefits from being written well." },
            { label: "Feature", text: "Something should exist. Needs the problem, not just the solution you have in mind." },
            { label: "Question", text: "How do I…? Many projects push these to Discussions, which is what that tab is for." },
            { label: "Task", text: "Work the team already agreed to do. Often opened by a maintainer, referenced from a pull request, and closed by it." },
          ]}
        />
        <Callout tone="note" title="Issues and pull requests share a number sequence">
          Issue #482 and pull request #483 are the same counter. This is why{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">#483</span> in a comment always
          links to the right thing without you saying which kind it is. A pull request is, internally,
          an issue that also has a branch.
        </Callout>
      </LessonSection>

      <LessonSection
        id="a-good-issue-has-a-reproduction-and-an-expectation"
        title="A good issue has a reproduction and an expectation"
      >
        <P>
          The maintainer reading this has never seen your screen, does not have your data, and is
          probably doing this on a Sunday. Four things turn an issue from a burden into something
          somebody can pick up.
        </P>
        <ChecklistCard
          title="What every bug report needs"
          marker="check"
          items={[
            "What you did — the exact steps, numbered, starting from a state they can reach",
            "What you expected to happen",
            "What actually happened — the real error message, copied as text, not a photograph of a screen",
            "Your environment — version, operating system, browser, whatever could plausibly matter",
          ]}
        />
        <RevealCard
          summaryTag="An issue that will sit unanswered"
          summary="Title: Broken. Body: the export doesn't work, please fix"
          detailTag="The same report, actionable"
          detail={
            "Title: CSV export produces an empty file when a row contains a comma. " +
            "Steps: 1. Add a contact with the company name “Acme, Inc.” 2. Contacts → Export → CSV. " +
            "Expected: a file with all 40 contacts. Actual: a 0-byte file, and the console shows " +
            "TypeError: Cannot read properties of undefined (reading 'split') at export.ts:88. " +
            "Version 2.4.1, macOS 15.2, Chrome 141. Removing the comma from the company name makes the export work."
          }
          footnote="The second one contains a hypothesis, a reproduction, and a file and line. It can be fixed by somebody who has never met you."
          openLabel="See the version that gets fixed"
          closeLabel="Hide it"
        />
        <P>
          Two habits that cost nothing and help enormously. <Strong>Search before opening</Strong> —
          including closed issues, because the answer is frequently in one that was closed last year.
          And <Strong>one issue per issue</Strong>: a report containing three unrelated bugs cannot be
          closed until all three are fixed, so it stays open for months.
        </P>
        <CodeBlock
          label="Markdown that helps in an issue"
          code={`## Steps to reproduce
1. Add a contact with the company \`Acme, Inc.\`
2. Contacts → Export → CSV

**Expected:** a file with all 40 contacts
**Actual:** a 0-byte file

<details>
<summary>Full stack trace</summary>

\`\`\`
TypeError: Cannot read properties of undefined (reading 'split')
    at formatRow (src/export.ts:88:24)
\`\`\`

</details>

- [ ] Reproduced on 2.4.1
- [ ] Reproduced on main`}
        />
        <P>
          The <Strong>details</Strong> block collapses a long stack trace so the issue stays readable,
          and the square-bracket list renders as real checkboxes anybody with write access can tick.
        </P>
      </LessonSection>

      <LessonSection
        id="labels-milestones-and-assignees-are-the-filing-system"
        title="Labels, milestones, and assignees are the filing system"
      >
        <P>
          Three orthogonal ways to organise, and using them for the wrong axis is the usual mess.
        </P>
        <LabelRows
          rows={[
            { label: "Labels", text: "Categories. Many per issue, no order. Type (bug, feature), area (frontend, api), status (needs-repro, blocked), and difficulty (good first issue)." },
            { label: "Milestone", text: "One per issue. A version or a date, with a progress bar. \"What is left before 2.5?\" is a milestone question." },
            { label: "Assignee", text: "Who is doing it. Not who should decide, and not who reported it — assigning somebody who has not agreed is how issues go stale." },
          ]}
        />
        <P>
          Two labels are worth treating as public API. <Strong>good first issue</Strong> and{" "}
          <Strong>help wanted</Strong> are surfaced by GitHub itself — in the repository&apos;s
          contribute page and in global search — so applying them accurately genuinely brings people
          in.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh issue list --label "good first issue" --state open
gh issue list --assignee @me --state open
gh issue create --title "CSV export drops rows containing commas" --label bug
gh issue view 482 --comments`}
        />
        <P>
          <Strong>Projects</Strong> is the layer above: a board or table view across repositories,
          with your own fields — status, priority, size, iteration — that live on the Project rather
          than the issue. An issue can be in several Projects at once and knows nothing about any of
          them. Worth reaching for when a repository has enough work that the issue list stops being
          readable, and not before.
        </P>
      </LessonSection>

      <LessonSection id="templates-make-good-issues-the-default" title="Templates make good issues the default">
        <P>
          Asking people to write good issues does not work. Giving them a form does. Templates live
          in <Strong>.github/ISSUE_TEMPLATE/</Strong> and are committed like anything else.
        </P>
        <CodeBlock
          label=".github/ISSUE_TEMPLATE/bug_report.yml"
          code={`name: Bug report
description: Something is broken
labels: ["bug", "needs-triage"]
body:
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Include the exact error message if there is one.
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      value: |
        1.
        2.
        3.
    validations:
      required: true

  - type: input
    id: version
    attributes:
      label: Version
      placeholder: 2.4.1
    validations:
      required: true`}
        />
        <P>
          A YAML form gives you real fields with real validation, so an issue physically cannot be
          submitted without a version number. The older Markdown templates still work and are just a
          pre-filled body somebody can delete.
        </P>
        <Callout tone="tip" title="config.yml redirects the questions">
          A{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            .github/ISSUE_TEMPLATE/config.yml
          </span>{" "}
          can set{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">blank_issues_enabled: false</span>{" "}
          and add links to Discussions, the docs, or a chat. Most projects find that half their issue
          volume was questions, and pointing those somewhere better helps both sides.
        </Callout>
      </LessonSection>

      <LessonSection id="closing-keywords-link-the-fix-to-the-report" title="Closing keywords link the fix to the report">
        <P>
          Write one of a specific set of words followed by an issue number in a pull request
          description, and merging that pull request closes the issue automatically — and permanently
          links the two, so anybody landing on the issue in two years can see the commit that fixed
          it.
        </P>
        <CodeBlock
          label="In a pull request description"
          code={`Fixes #482

The CSV writer split on commas without quoting fields, so any
value containing one produced a malformed row and the download
aborted. Quotes fields per RFC 4180 and adds a test.`}
        />
        <LabelRows
          rows={[
            { label: "The words", text: "close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved. All equivalent; pick one and be consistent." },
            { label: "Where", text: "The pull request description, or a commit message. In the description is better — it can be edited after the fact." },
            { label: "Across repositories", text: "owner/repo#482 works, if you have the right permissions on both." },
            { label: "Just referencing", text: "A bare #482 links without closing. Use it for \"related to\" rather than \"fixes\"." },
          ]}
        />
        <Callout tone="warning" title="A comment is not a description">
          The keyword only works in the pull request&apos;s own description or in a commit message.
          Writing &quot;fixes #482&quot; in a comment on the pull request creates a link and closes
          nothing, which is a very easy thing to not notice until the issue is still open a week after
          the fix shipped.
        </Callout>
        <P>
          Closing an issue is not the end of it. A closed issue keeps its whole conversation and is
          fully searchable — which is why searching closed issues before opening a new one so often
          finds the answer. And anyone can reopen one if the bug comes back, which keeps the history
          in one place rather than starting a second thread that has lost all the context.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "An issue is a numbered conversation with one bit of state: open or closed.",
          "Issues and pull requests share one number sequence, which is why #483 always resolves correctly.",
          "A bug report needs steps, expectation, the real error text, and the environment.",
          "Search closed issues before opening a new one; the answer is often already there.",
          "One issue per issue — a report with three bugs cannot be closed until all three are done.",
          "Labels are many-per-issue categories; a milestone is one per issue; an assignee is who is actually doing it.",
          "\"good first issue\" and \"help wanted\" are surfaced by GitHub itself, so they genuinely attract contributors.",
          "YAML issue forms can require fields, so an issue cannot be submitted without a version number.",
          "\"Fixes #482\" in a pull request description closes the issue on merge and links the two permanently.",
          "That keyword does nothing in a comment — it must be in the description or a commit message.",
        ]}
      />
    </div>
  );
}
