import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { GitignoreTester } from "@/components/github/GitignoreTester";

export function IgnoringFilesLesson() {
  return (
    <div>
      <Lead>
        A .gitignore is a list of patterns matched against paths, and it has no effect whatsoever on
        a file Git is already tracking — which is the trap that leaks credentials. Toggle patterns
        against a real tree and watch which paths survive.
      </Lead>

      <LessonSection id="gitignore-is-patterns-matched-against-paths" title="gitignore is patterns, matched against paths">
        <P>
          Put a file called <Strong>.gitignore</Strong> in your repository root, list patterns one per
          line, and Git stops offering those files. They vanish from{" "}
          <Strong>git status</Strong>, they are skipped by <Strong>git add .</Strong>, and they can
          no longer be committed by accident.
        </P>
        <CodeBlock
          label=".gitignore"
          code={`# Comments start with a hash
node_modules/          # trailing slash: directories, at any depth
*.log                  # no slash: matches the file name anywhere
.env                   # a plain name, also anywhere
build/                 # catches src/build/ as well as ./build/
docs/*.pdf             # contains a slash, so it is anchored to the root
!docs/manual.pdf       # a negation — re-include one file`}
        />
        <P>
          Three rules do almost all the work, and the third one surprises everybody.
        </P>
        <LabelRows
          rows={[
            {
              label: "No slash",
              text: "The pattern matches the file name at any depth. *.log catches app.log, logs/app.log, and deeply/nested/app.log alike.",
            },
            {
              label: "Has a slash",
              text: "The pattern is anchored to the repository root, and * never crosses a slash. docs/*.pdf catches docs/guide.pdf and NOT docs/api/spec.pdf.",
            },
            {
              label: "Last match wins",
              text: "Patterns are read top to bottom and the last one that matches decides. A negation only works if nothing below it re-excludes the file.",
            },
          ]}
        />
        <GitignoreTester />
      </LessonSection>

      <LessonSection id="dependencies-and-build-output-are-noise" title="Dependencies and build output are noise">
        <P>
          The first category to ignore is everything that can be regenerated. Committing it is not
          dangerous, just wasteful — and the waste is permanent, because history never shrinks.
        </P>
        <CodeBlock
          label="A reasonable starting point"
          code={`# Dependencies — reinstallable from the lockfile
node_modules/
vendor/
.venv/
__pycache__/

# Build output — regenerable from source
dist/
build/
.next/
*.o
*.class

# Editor and operating system litter
.DS_Store
Thumbs.db
.idea/
.vscode/*
!.vscode/extensions.json

# Logs and local databases
*.log
*.sqlite3

# Secrets — see the next section
.env
.env.local
*.pem
credentials.json`}
        />
        <P>
          Note the pairing near the editor section. <Strong>.vscode/*</Strong> ignores the whole
          folder and then <Strong>!.vscode/extensions.json</Strong> brings one file back, because
          recommending extensions to your teammates is useful while sharing your personal window
          layout is not.
        </P>
        <Callout tone="tip" title="Do not write this from scratch">
          GitHub maintains a well-argued .gitignore for essentially every language and framework at
          github.com/github/gitignore, and the &quot;New repository&quot; form offers to add one.
          Starting from theirs and adding your project&apos;s specifics is strictly better than
          remembering that Python makes __pycache__ directories.
        </Callout>
        <P>
          One important exception: <Strong>lockfiles are not build output</Strong>.
          package-lock.json, yarn.lock, poetry.lock and Cargo.lock should absolutely be committed —
          they are what makes an install reproducible. Ignoring them is a common and expensive
          mistake.
        </P>
      </LessonSection>

      <LessonSection id="a-committed-secret-is-a-leaked-secret" title="A committed secret is a leaked secret">
        <P>
          This is the section that matters. If an API key reaches a commit, treat it as compromised
          immediately — not after you decide whether anyone saw it.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Deleting the file does not remove it",
              detail: "Deleting it makes a new commit in which the file is absent. Every earlier commit still contains it, and git show on any of them prints it back.",
            },
            {
              label: "Pushing makes it public and permanent",
              detail: "On a public repository, automated scrapers find committed credentials within minutes. This is a well-documented, industrialised process, not a theoretical risk.",
            },
            {
              label: "Even a private repository is not safe",
              detail: "Every clone has the full history. A contributor who leaves keeps their copy, and repositories get made public later by accident more often than you would think.",
            },
            {
              label: "So the only real fix is to rotate the secret",
              detail: "Revoke the key at the provider and issue a new one. The old value stays in the history somewhere in the world; make it worthless instead of trying to erase it.",
            },
          ]}
        />
        <Callout tone="danger" title="Rotate first, clean up second">
          Cleaning history with{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git filter-repo</span> or BFG
          rewrites every commit, changes every hash after the secret, and forces everyone to re-clone
          — and it still does not reach forks, caches, or anyone&apos;s existing checkout. Do it if
          you must. Do it <em>after</em> revoking the key, because revoking is the step that actually
          works.
        </Callout>
        <P>
          The prevention is boring and effective: commit an{" "}
          <Strong>.env.example</Strong> with the variable names and no values, ignore the real{" "}
          <Strong>.env</Strong>, and let GitHub&apos;s secret scanning watch your back — it is on by
          default for public repositories and will email you and the provider if a recognisable
          token lands.
        </P>
        <CodeBlock
          label=".env.example  (committed)"
          code={`DATABASE_URL=
STRIPE_SECRET_KEY=
RESEND_API_KEY=`}
        />
      </LessonSection>

      <LessonSection
        id="gitignore-does-nothing-to-an-already-tracked-file"
        title="gitignore does nothing to an already tracked file"
      >
        <P>
          This is the rule that catches everyone, once, and it is the reason the section above
          exists.
        </P>
        <P>
          <Strong>.gitignore only applies to untracked files.</Strong> Once Git is tracking a file —
          once you have committed it even a single time — adding it to .gitignore changes nothing at
          all. Git keeps reporting it, keeps staging it, keeps committing your changes to it.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Stop tracking it, but keep it on disk. The --cached is the whole trick.
git rm --cached .env

# For a directory
git rm -r --cached node_modules/

# Now .gitignore takes effect. Commit the removal.
git commit -m "Stop tracking .env; it is in .gitignore"`}
        />
        <Callout tone="warning" title="git rm without --cached deletes the actual file">
          <span className="font-[family-name:var(--learn-font-mono)]">git rm .env</span> removes it
          from tracking <em>and</em> from your disk, which for a file full of local credentials is a
          bad afternoon. The{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">--cached</span> flag means
          &quot;from the index only&quot;.
        </Callout>
        <P>
          And note what that commit does to your teammates: it removes the file from the repository,
          so when they pull, the file disappears from <em>their</em> machines too. For a{" "}
          <Strong>.env</Strong> that is correct and they will each recreate their own. Say so in the
          commit message, or somebody will spend an hour wondering where their config went.
        </P>
        <P>
          When you cannot tell whether a file is ignored and why, ask:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git check-ignore -v config/local.yml
# .gitignore:7:*.yml    config/local.yml
#  ^file      ^line ^the pattern that matched`}
        />
      </LessonSection>

      <LessonSection id="three-places-to-put-an-ignore-rule" title="Three places to put an ignore rule">
        <P>
          There are three ignore files and choosing the right one is a question about who the rule is
          for.
        </P>
        <LabelRows
          rows={[
            {
              label: "Repository",
              text: ".gitignore, committed. For things nobody on the project should ever commit: node_modules, dist, .env. This is the one you will use.",
            },
            {
              label: "Personal",
              text: ".git/info/exclude, not committed. For your own mess in this one project — a scratch file, a local script. Nobody else is affected and nobody else has to agree.",
            },
            {
              label: "Global",
              text: "~/.gitignore_global, set with core.excludesFile. For your editor and operating system, everywhere. .DS_Store belongs here, not in every project's .gitignore.",
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`git config --global core.excludesFile ~/.gitignore_global
printf '.DS_Store\\n.idea/\\n*.swp\\n' >> ~/.gitignore_global`}
        />
        <P>
          The distinction is social, not technical. Putting <Strong>.idea/</Strong> in a shared
          .gitignore asks every contributor to carry a rule about an editor they may not use;
          putting it in your global file solves it for you in every repository you will ever touch.
        </P>
        <ChecklistCard
          title="On day one of a new repository"
          marker="check"
          items={[
            "Add a .gitignore before the first commit — retrofitting one means git rm --cached",
            "Start from GitHub's template for your language rather than from memory",
            "Ignore .env and commit .env.example with the keys and no values",
            "Commit your lockfile; it is not build output",
            "Put editor and OS litter in your global ignore file, not the project's",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A pattern with no slash matches a name at any depth; a pattern with a slash is anchored to the root and * never crosses a slash.",
          "The last matching pattern wins, which is why a negation must come after the rule it undoes.",
          "Ignore anything regenerable — dependencies, build output, editor litter — but commit your lockfile.",
          "Start from github.com/github/gitignore rather than writing one from memory.",
          "A committed secret is compromised. Deleting the file adds a commit and preserves every earlier one.",
          "Rotate the key first. History rewriting is second, optional, and never reaches every copy.",
          "gitignore has no effect on an already-tracked file. git rm --cached stops tracking without deleting.",
          "git rm without --cached deletes the file from your disk too.",
          "git check-ignore -v names the exact file and line of the pattern that matched.",
          "Three ignore files: the project's, your private .git/info/exclude, and your global one for editor and OS noise.",
        ]}
      />
    </div>
  );
}
