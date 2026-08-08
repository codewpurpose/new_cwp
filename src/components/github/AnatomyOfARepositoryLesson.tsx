import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function AnatomyOfARepositoryLesson() {
  return (
    <div>
      <Lead>
        Most of a GitHub repository is not code, and the parts that are not decide whether anybody
        can use the parts that are. Walk the README, the licence, releases, and the settings nobody
        sees until they matter.
      </Lead>

      <LessonSection
        id="the-readme-is-the-front-door-and-it-is-just-a-file"
        title="The README is the front door, and it is just a file"
      >
        <P>
          GitHub renders <Strong>README.md</Strong> underneath the file list on every repository. It
          is not configuration and it is not special storage — it is a Markdown file in your
          repository, committed like any other, and the website happens to display it.
        </P>
        <P>
          It is also the single highest-leverage file you will write. Somebody deciding whether to
          use, contribute to, or hire you off the back of this project reads this and usually nothing
          else.
        </P>
        <ChecklistCard
          title="What a README needs, in the order people need it"
          marker="arrow"
          items={[
            "One sentence saying what this is — not what it does internally, what problem it solves",
            "Why it exists, if there is an obvious alternative somebody already knows",
            "How to run it: the exact commands, copy-pasteable, that take a stranger from clone to working",
            "A screenshot or a short example if it produces anything visible",
            "Where the docs are, if there are more",
            "How to contribute, and the licence",
          ]}
        />
        <CodeBlock
          label="README.md"
          code={`# project-name

One sentence about what this is and who it is for.

## Quick start

\`\`\`bash
git clone https://github.com/you/project.git
cd project
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and pull requests welcome.

## Licence

MIT — see [LICENSE](LICENSE).`}
        />
        <P>
          A handful of other files get special treatment on GitHub, all of them optional and all of
          them ordinary files in the repository — most can live at the root or in a{" "}
          <Strong>.github/</Strong> directory to keep the root tidy.
        </P>
        <LabelRows
          rows={[
            { label: "LICENSE", text: "Detected and displayed in the sidebar. Without it, nobody may legally use your code." },
            { label: "CONTRIBUTING", text: "Linked automatically when somebody opens an issue or a pull request." },
            { label: "CODE_OF_CONDUCT", text: "Shown in the community profile. Expected on any project inviting outside contributors." },
            { label: "SECURITY", text: "Powers the \"Report a vulnerability\" button and tells people where NOT to file a public issue." },
            { label: "CODEOWNERS", text: "Automatically requests review from the right people for the files a pull request touches." },
          ]}
        />
      </LessonSection>

      <LessonSection id="a-licence-is-what-makes-public-code-usable" title="A licence is what makes public code usable">
        <P>
          This surprises people and it is worth being blunt about. Code on GitHub with no licence file
          is <Strong>not open source</Strong>. Copyright applies by default, and the default is that
          nobody may copy, modify, or use it. Making a repository public grants permission to view
          it, and only because you agreed to GitHub&apos;s terms.
        </P>
        <P>
          A licence is how you grant the rest. There is no need to write one — pick a standard one,
          which is also what makes it recognisable to a company&apos;s legal review.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "MIT",
              tone: "positive",
              children: <P>Do anything, keep the copyright notice, no warranty. Short, universally understood, and the default choice for most projects.</P>,
            },
            {
              title: "Apache 2.0",
              tone: "neutral",
              children: <P>Like MIT, plus an explicit patent grant and a requirement to state changes. Preferred by companies for that patent clause.</P>,
            },
            {
              title: "GPL v3",
              tone: "neutral",
              children: <P>Anyone who distributes a modified version must release their source under the GPL too. A deliberate choice, not a stricter MIT.</P>,
            },
          ]}
        />
        <Callout tone="tip" title="Adding one takes thirty seconds">
          On the repository: Add file &rarr; Create new file &rarr; type{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">LICENSE</span>, and a
          &quot;Choose a licence template&quot; button appears with the full text of each, the
          copyright line already filled in. Every day a repository sits public without one is a day
          nobody can legally build on it.
        </Callout>
      </LessonSection>

      <LessonSection id="tags-and-releases-are-two-different-objects" title="Tags and releases are two different objects">
        <P>
          A <Strong>tag</Strong> is pure Git: a permanent name for one commit. Unlike a branch, it
          never moves.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git tag v1.2.0                      # lightweight: just a name
git tag -a v1.2.0 -m "Add CSV export"  # annotated: name, tagger, date, message

git tag                             # list them
git push origin v1.2.0              # tags are NOT pushed by default
git push --tags                     # push all of them
git switch --detach v1.2.0          # look at the code as it was at that release`}
        />
        <P>
          The line that catches everybody: <Strong>git push does not push tags</Strong>. You tag the
          release, you push, and the tag stays on your laptop. Use annotated tags for releases —
          they record who tagged it and when, and some tooling ignores lightweight ones entirely.
        </P>
        <P>
          A <Strong>release</Strong> is a GitHub feature built on top of a tag. It adds release
          notes, downloadable binaries, and a pre-release flag. Every release has a tag; most tags are
          not releases.
        </P>
        <LabelRows
          rows={[
            { label: "Tag", text: "Git. A fixed pointer to a commit. Works offline, exists in every clone, nothing to do with any website." },
            { label: "Release", text: "GitHub. A tag plus notes plus attached files. Lives on the website; not in your clone." },
            { label: "Semver", text: "MAJOR.MINOR.PATCH — breaking change, new feature, bug fix. A convention people rely on to know whether an upgrade is safe." },
          ]}
        />
      </LessonSection>

      <LessonSection id="settings-hold-the-decisions-nobody-sees" title="Settings hold the decisions nobody sees">
        <P>
          The Settings tab is where a repository stops being a folder and becomes a set of rules. A
          few of them matter far more than the rest.
        </P>
        <LabelRows
          rows={[
            {
              label: "Visibility",
              text: "Public or private. Going private later does not un-publish anything — clones, forks, and caches persist. Treat public as permanent.",
            },
            {
              label: "Default branch",
              text: "What a clone checks out and what pull requests target by default. Renaming it is supported and GitHub redirects the old name for a while.",
            },
            {
              label: "Branches",
              text: "Branch protection and rulesets: required reviews, required checks, no force pushes. This is where a review process becomes enforced rather than agreed.",
            },
            {
              label: "Merge button",
              text: "Which of merge, squash, and rebase are allowed, and whether the branch is auto-deleted. Turning off the ones your team does not want removes the daily decision.",
            },
            {
              label: "Secrets and variables",
              text: "Encrypted values available to Actions. The correct home for anything a workflow needs and nobody should read.",
            },
            {
              label: "Collaborators",
              text: "Who can push. Read, Triage, Write, Maintain, Admin — write access is the one that lets somebody push to a branch directly.",
            },
          ]}
        />
        <Callout tone="warning" title="Deleting a repository deletes its issues and pull requests too">
          The code survives in every clone. The discussion does not — issues, pull request comments,
          and review history are only on GitHub, and they are gone. Archiving instead makes it
          read-only and keeps everything, which is almost always what people actually wanted.
        </Callout>
      </LessonSection>

      <LessonSection id="stars-forks-and-watches-count-three-things" title="Stars, forks, and watches count three different things">
        <P>
          The three numbers at the top mean genuinely different things, and only one of them is about
          code.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Star",
              tone: "neutral",
              children: <P>A bookmark and a public thumbs-up. No notifications, no copy, no relationship. The nearest thing to a popularity score.</P>,
            },
            {
              title: "Fork",
              tone: "positive",
              children: <P>A real copy of the repository under your account, linked to the original. This is the one that does something — it is how you contribute without write access.</P>,
            },
            {
              title: "Watch",
              tone: "neutral",
              children: <P>Subscribe to notifications: all activity, or just releases, or just issues. The only one that fills your inbox.</P>,
            },
          ]}
        />
        <P>
          The remaining tabs are worth a tour once each. <Strong>Insights</Strong> holds the
          contributor graph, the commit frequency, the dependency graph, and{" "}
          <Strong>Network</Strong> — a visualisation of every fork and branch that is genuinely the
          fastest way to see whether a fork went somewhere the original did not.{" "}
          <Strong>Security</Strong> holds Dependabot alerts for known-vulnerable dependencies, secret
          scanning, and code scanning. On a public repository most of it is free and off by default.
        </P>
        <ChecklistCard
          title="A repository somebody else can actually use"
          marker="check"
          items={[
            "A README whose first sentence says what this is",
            "A LICENSE file, or nobody may legally use it",
            "A description and a few topics, so it is findable",
            "A .gitignore appropriate to the language",
            "Branch protection on main if more than one person pushes",
            "Dependabot alerts on, so you hear about a vulnerable dependency from GitHub rather than from a stranger",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "README.md is an ordinary Markdown file that GitHub happens to render. It is the highest-leverage file in most repositories.",
          "LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY and CODEOWNERS all get special treatment and can live in .github/.",
          "Public code with no licence is not open source — copyright says nobody may use it.",
          "MIT for permissive and short, Apache 2.0 for the patent grant, GPL to require derivatives stay open.",
          "A tag is a permanent Git name for a commit; a release is a GitHub object built on a tag.",
          "git push does not push tags. Use git push origin <tag>.",
          "Branch protection is where an agreed review process becomes an enforced one.",
          "Going private later un-publishes nothing. Treat anything public as permanent.",
          "Deleting a repository destroys its issues and reviews; archiving keeps everything read-only.",
          "Stars are a bookmark, forks are a real copy you can push to, watching is what sends notifications.",
        ]}
      />
    </div>
  );
}
