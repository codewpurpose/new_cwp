import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function InstallingGitLesson() {
  return (
    <div>
      <Lead>
        Installing Git takes one command; configuring it takes four, and skipping them is why
        somebody&apos;s first hundred commits are authored by unknown@localhost. Set identity,
        default branch, editor, and line endings before the first commit rather than after.
      </Lead>

      <LessonSection
        id="installing-git-is-one-command-on-every-system"
        title="Installing Git is one command on every system"
      >
        <P>
          Check first — you may already have it. macOS ships a Git, and most Linux distributions
          install one by default.
        </P>
        <CodeBlock variant="terminal" code={`git --version`} />
        <P>
          Anything from 2.30 onwards is fine for everything in this track. If the command is not
          found, pick your system:
        </P>
        <CodeBlock
          variant="terminal"
          code={`# macOS — Homebrew, and the version is newer than Apple's
brew install git

# Windows — the installer also gives you Git Bash, which you want
winget install --id Git.Git -e

# Debian or Ubuntu
sudo apt update && sudo apt install git

# Fedora
sudo dnf install git`}
        />
        <Callout tone="tip" title="On Windows, use Git Bash">
          The Git for Windows installer includes Git Bash, a terminal that understands the same
          commands as macOS and Linux. Every tutorial you will ever read assumes those commands.
          Using PowerShell instead means quietly translating half of them, forever.
        </Callout>
      </LessonSection>

      <LessonSection
        id="your-name-and-email-are-stamped-into-every-commit"
        title="Your name and email are stamped into every commit"
      >
        <P>
          Git records an author on every commit, and it takes that from your config. Set it once, per
          machine, before you do anything else.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`}
        />
        <P>
          The name is what appears in <Strong>git log</Strong> and on every GitHub commit page. Use
          the name you would want a stranger reading your code to see.
        </P>
        <P>
          The email is more consequential than it looks: GitHub matches commits to accounts by email
          address. Commit with an address GitHub does not know about and your commits appear on the
          site with a grey silhouette instead of your avatar, and they do not count towards your
          contribution graph. Nothing warns you.
        </P>
        <Callout tone="warning" title="You do not have to publish your real address">
          GitHub gives every account a no-reply address of the form{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            12345678+username@users.noreply.github.com
          </span>
          , listed under Settings &rarr; Emails. Use that as your{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">user.email</span> and commits
          still link to your account while your real address stays out of a permanent public record
          that anyone can clone.
        </Callout>
      </LessonSection>

      <LessonSection
        id="set-the-default-branch-to-main-once"
        title="Set the default branch to main, once"
      >
        <P>
          Git&apos;s historical default branch name was <Strong>master</Strong>. Since 2020 the
          industry standard — and GitHub&apos;s default for new repositories — is{" "}
          <Strong>main</Strong>. Git itself still defaults to the old name unless you tell it
          otherwise, which produces a genuinely annoying mismatch on your very first push.
        </P>
        <CodeBlock variant="terminal" code={`git config --global init.defaultBranch main`} />
        <P>
          Two more settings that are worth the thirty seconds. Git opens an editor when a commit
          message needs more than one line, and its default on many systems is{" "}
          <Strong>vim</Strong> — which is a fine editor and a confusing surprise if you have never
          met it and cannot work out how to quit.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Use VS Code, and wait for the window to close
git config --global core.editor "code --wait"

# Or nano, which tells you its own keys at the bottom of the screen
git config --global core.editor nano`}
        />
        <Callout tone="tip" title="If you are already stuck in vim">
          Press <span className="font-[family-name:var(--learn-font-mono)]">Esc</span>, then type{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">:wq</span> and press Enter to
          save and quit, or <span className="font-[family-name:var(--learn-font-mono)]">:q!</span> to
          quit without saving. This is genuinely one of the most-searched programming questions of
          all time.
        </Callout>
      </LessonSection>

      <LessonSection
        id="line-endings-are-the-classic-cross-platform-trap"
        title="Line endings are the classic cross-platform trap"
      >
        <P>
          Windows ends a line of text with two invisible characters, carriage return and line feed.
          macOS and Linux use one, line feed. Git compares files line by line and treats those
          invisible characters as part of the line.
        </P>
        <P>
          So on a mixed team, somebody opens a file, saves it without typing anything, and Git
          reports every single line as changed. The diff is unreadable and the pull request is
          useless.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# On Windows
git config --global core.autocrlf true

# On macOS or Linux
git config --global core.autocrlf input`}
        />
        <LabelRows
          rows={[
            {
              label: "true",
              text: "Convert to line feed when committing, convert back to Windows endings when checking out. The repository stays clean and your editor stays happy.",
            },
            {
              label: "input",
              text: "Convert to line feed when committing, and change nothing on checkout. Correct on systems that already use line feed.",
            },
            {
              label: "false",
              text: "Store whatever is in the file. Fine on a solo project, and the source of the every-line-changed diff on a mixed team.",
            },
          ]}
        />
        <P>
          On a shared project the better answer is a{" "}
          <Strong>.gitattributes</Strong> file committed to the repository, which sets this for
          everybody regardless of what each person configured. One line covers the common case:
        </P>
        <CodeBlock label=".gitattributes" code={`* text=auto`} />
      </LessonSection>

      <LessonSection
        id="config-lives-at-three-levels-and-the-closest-wins"
        title="Config lives at three levels, and the closest one wins"
      >
        <P>
          Every setting can be written in three places, and Git reads them in order with the most
          specific winning.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "System — /etc/gitconfig",
              detail: "Every user on the machine. Set with --system, usually by whoever installed Git. You will rarely touch it.",
            },
            {
              label: "Global — ~/.gitconfig",
              detail: "Your user account, across every repository. Set with --global. This is where the four settings above belong.",
            },
            {
              label: "Local — .git/config in the repository",
              detail: "This project only. No flag needed. This is how you commit to a work project with a work email and a personal one with a personal email.",
            },
          ]}
        />
        <P>
          When something behaves oddly and you cannot see why, ask Git where a setting came from. The
          answer includes the file, which is usually the whole explanation.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Everything, with the file each value came from
git config --list --show-origin

# One setting, and where it was defined
git config --show-origin user.email

# Override it for this repository only
git config user.email "work@company.com"`}
        />
        <ChecklistCard
          title="Before your first commit"
          marker="check"
          items={[
            "git config --global user.name — the name that goes on every commit forever",
            "git config --global user.email — matching a verified address on your GitHub account, or its no-reply form",
            "git config --global init.defaultBranch main — so your local branch name matches GitHub's",
            "git config --global core.editor — anything you know how to quit",
            "git config --global core.autocrlf — true on Windows, input everywhere else",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Check for git --version first; macOS and most Linux systems already have one.",
          "On Windows, install Git for Windows and use Git Bash, so the commands in every tutorial work verbatim.",
          "user.name and user.email are stamped into every commit and cannot be changed later without rewriting history.",
          "GitHub links commits to accounts by email address. A mismatch means grey avatars and no contribution graph, with no warning.",
          "GitHub's no-reply address keeps your real one out of a permanent public record while still linking commits to you.",
          "init.defaultBranch main aligns your local default with GitHub's, avoiding a first-push mismatch.",
          "Set core.editor to something you can exit. The vim default has trapped a generation.",
          "core.autocrlf stops the every-line-changed diff on mixed-platform teams; .gitattributes fixes it for the whole team at once.",
          "Config reads system, then global, then local, and the closest one wins. --show-origin tells you which file to blame.",
        ]}
      />
    </div>
  );
}
