import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { WorkflowRun } from "@/components/github/WorkflowRun";

export function AutomatingWithActionsLesson() {
  return (
    <div>
      <Lead>
        A workflow is a YAML file in one exact directory, and once it exists your tests run on
        somebody else&apos;s computer every time anyone pushes. Watch a run break into jobs and steps,
        and see where its verdict shows up on a pull request.
      </Lead>

      <LessonSection
        id="a-workflow-is-a-yaml-file-in-one-exact-directory"
        title="A workflow is a YAML file in one exact directory"
      >
        <P>
          There is no configuration screen. GitHub Actions reads{" "}
          <Strong>.github/workflows/*.yml</Strong> from your repository — that path, exactly — and
          any file it finds there is a workflow. Commit one and it is live.
        </P>
        <CodeBlock
          label=".github/workflows/ci.yml"
          code={`name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test`}
        />
        <P>
          That file is a complete, working continuous integration setup. Every push to main and every
          pull request now gets a fresh Ubuntu machine that checks out your code, installs Node,
          installs dependencies, and runs four commands. If any of them exits non-zero, the run fails.
        </P>
        <LabelRows
          rows={[
            { label: "on", text: "Which events trigger this workflow. push, pull_request, schedule, release, workflow_dispatch, and about thirty more." },
            { label: "jobs", text: "Named units of work. They run in parallel by default, each on its own machine." },
            { label: "runs-on", text: "The machine. ubuntu-latest is free for public repositories and much cheaper than Windows or macOS for private ones." },
            { label: "steps", text: "Run in order, on one machine, sharing a filesystem. Either uses (a prebuilt action) or run (a shell command)." },
          ]}
        />
        <Callout tone="warning" title="YAML is whitespace-significant and unforgiving">
          A misplaced indent produces a workflow that does not run, and often no error anywhere
          obvious — the Actions tab simply stays empty. VS Code&apos;s GitHub Actions extension
          validates the schema as you type, and it will save you an afternoon at some point.
        </Callout>
      </LessonSection>

      <LessonSection id="events-decide-when-a-workflow-runs" title="Events decide when a workflow runs">
        <P>
          The <Strong>on</Strong> block is where most of the design happens, because running the wrong
          workflow at the wrong time is how teams end up waiting eleven minutes for a documentation
          typo.
        </P>
        <CodeBlock
          label="Common triggers"
          code={`on:
  # Only pull requests targeting main, and only when code changes
  pull_request:
    branches: [main]
    paths-ignore: ["docs/**", "**.md"]

  # Every night at 03:00 UTC — cron, in UTC, always
  schedule:
    - cron: "0 3 * * *"

  # A button in the Actions tab, with an input
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [staging, production]

  # When a release is published
  release:
    types: [published]`}
        />
        <P>
          Two settings are worth adding to almost every workflow. Concurrency cancels the previous run
          when you push again — otherwise pushing three times in five minutes means three full runs,
          two of which are already irrelevant. And permissions narrows what the automatic token can
          do.
        </P>
        <CodeBlock
          label="Two lines that pay for themselves"
          code={`concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read`}
        />
        <Callout tone="note" title="Actions is free on public repositories, and metered on private ones">
          Public repositories get unlimited minutes on GitHub-hosted runners. Private ones get a
          monthly allowance and are billed beyond it, with Windows charged at twice Linux and macOS at
          ten times. A workflow that runs on every push to every branch on macOS is a real bill.
        </Callout>
      </LessonSection>

      <LessonSection id="jobs-run-in-parallel-on-fresh-machines" title="Jobs run in parallel, on fresh machines">
        <P>
          Each job gets its own clean virtual machine. Nothing is shared between jobs — not the
          checkout, not the installed dependencies, not the files one of them wrote. Steps within a
          job share everything, because they are on the same machine.
        </P>
        <WorkflowRun />
        <P>
          That is why <Strong>actions/checkout</Strong> is the first step of nearly every job. The
          machine starts empty; without it there is no code to run anything against.
        </P>
        <P>
          Two mechanisms shape how jobs relate to each other:
        </P>
        <CodeBlock
          label="needs and matrix"
          code={`jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]

  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [20, 22]
    steps: [...]
    # This one job definition produces FOUR parallel runs

  deploy:
    needs: [lint, test]        # waits for both, and is skipped if either fails
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps: [...]`}
        />
        <P>
          <Strong>fail-fast: false</Strong> is worth setting on a matrix. The default cancels every
          other combination the moment one fails, so you learn that Node 20 broke and not whether
          Windows also did — which is usually the thing you needed to know.
        </P>
      </LessonSection>

      <LessonSection
        id="a-failing-check-blocks-the-merge-which-is-the-point"
        title="A failing check blocks the merge, which is the point"
      >
        <P>
          Every job appears on the pull request as a <Strong>check</Strong>, with a tick or a cross
          and a link to its logs. That is the visible half of Actions and the reason most teams adopt
          it.
        </P>
        <P>
          But a red cross on its own blocks nothing. Anyone can merge straight past it. The check only
          becomes a gate when it is named as <Strong>required</Strong> in the branch protection rules
          — which is the connection between this chapter and the last one.
        </P>
        <ChecklistCard
          title="Making CI mean something"
          marker="check"
          items={[
            "Name the jobs that must pass as required checks in branch protection",
            "A required check that is flaky is worse than none — people learn to re-run rather than read",
            "Keep it fast. Under five minutes gets read; twenty minutes gets ignored and worked around",
            "Cache dependencies (setup-node's cache: npm, or actions/cache) — it is usually most of the runtime",
            "Fail loudly and specifically. \"Exit code 1\" with 4,000 lines of log above it is not a message",
            "Run the same commands CI runs, locally, before pushing. CI should confirm, not discover",
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`gh run list --limit 5              # recent runs
gh run watch                       # follow the current one
gh run view --log-failed           # just the failing step's output
gh workflow run deploy.yml -f environment=staging   # trigger a workflow_dispatch`}
        />
        <Callout tone="tip" title="Actions is not only for tests">
          The same machinery labels stale issues, publishes packages on release, deploys a site to
          GitHub Pages, generates a changelog, and comments on pull requests. The Marketplace has a
          prebuilt action for most of it. Anything you would otherwise do by hand after every merge is
          a candidate.
        </Callout>
      </LessonSection>

      <LessonSection
        id="secrets-are-how-a-workflow-gets-a-password-safely"
        title="Secrets are how a workflow gets a password safely"
      >
        <P>
          A deploy workflow needs credentials, and the workflow file is committed to the repository.
          Secrets are the way out: encrypted values stored in the repository&apos;s settings,
          injected at run time, and never shown again after you save them.
        </P>
        <CodeBlock
          label="Using a secret"
          code={`      - name: Deploy
        env:
          API_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
        run: ./scripts/deploy.sh`}
        />
        <CodeBlock
          variant="terminal"
          code={`gh secret set DEPLOY_TOKEN          # prompts, and never echoes
gh secret list`}
        />
        <P>
          GitHub masks secret values in logs, so a token that gets printed appears as{" "}
          <Strong>***</Strong>. Treat that as a safety net rather than a guarantee: a value that is
          transformed before printing — base64-encoded, split, interpolated into a URL — is not
          recognised and not masked.
        </P>
        <LabelRows
          rows={[
            { label: "GITHUB_TOKEN", text: "Created automatically for every run. Enough for most tasks, expires when the run ends, and its scope is set by the permissions block." },
            { label: "Repository secrets", text: "For that one repository. Where a deploy key or an API token belongs." },
            { label: "Environment secrets", text: "Scoped to a named environment like production, and can require a human to approve the deployment before the job proceeds." },
            { label: "Organisation secrets", text: "Shared across repositories, with a list of which ones may use them." },
          ]}
        />
        <Callout tone="danger" title="pull_request_target is the dangerous one">
          Workflows triggered by <span className="font-[family-name:var(--learn-font-mono)]">pull_request</span>{" "}
          from a fork run <em>without</em> secrets, deliberately — otherwise anyone could open a pull
          request whose workflow prints your tokens.{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">pull_request_target</span> runs
          with full secrets against the base repository, and combining it with a checkout of the
          fork&apos;s code hands a stranger your credentials. If you do not know exactly why you need
          it, you do not need it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A workflow is a YAML file in .github/workflows. Commit it and it is live; there is no configuration screen.",
          "on decides when it runs — push, pull_request, schedule, workflow_dispatch, release.",
          "Jobs run in parallel on separate fresh machines; steps run in order on one machine and share a filesystem.",
          "Every job starts empty, which is why actions/checkout is almost always the first step.",
          "needs makes one job wait for another; matrix turns one job definition into several parallel runs.",
          "Set fail-fast: false on a matrix, or one failure hides every other result.",
          "concurrency with cancel-in-progress stops three pushes from paying for three full runs.",
          "A red check blocks nothing until it is marked required in branch protection.",
          "Slow or flaky CI gets worked around. Under five minutes and deterministic is the target.",
          "Secrets are encrypted repository settings injected at run time and masked in logs — but only when printed verbatim.",
          "Fork pull requests run without secrets on purpose. pull_request_target removes that protection.",
        ]}
      />
    </div>
  );
}
