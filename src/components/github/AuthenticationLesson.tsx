import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function AuthenticationLesson() {
  return (
    <div>
      <Lead>
        GitHub stopped accepting account passwords over Git in 2021, and the error it gives instead
        sends people in the wrong direction. Pick between a token and an SSH key on purpose, and know
        where the machine cached the answer.
      </Lead>

      <LessonSection
        id="github-stopped-taking-your-password-in-2021"
        title="GitHub stopped taking your password in 2021"
      >
        <P>
          For years you could push over HTTPS by typing your GitHub username and password. In August
          2021 that was switched off entirely, and the replacement error is genuinely misleading.
        </P>
        <CodeBlock
          label="What you get if you try"
          copyable={false}
          code={`remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/get-started/getting-started-with-git/
        about-remote-repositories#cloning-with-https-urls for information on
        currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/you/project.git/'`}
          lineTones={{ 0: "err", 4: "err" }}
        />
        <P>
          &quot;Authentication failed&quot; sounds like a wrong password, so people carefully retype
          the correct one and it fails again. It is not wrong; that method no longer exists. You need
          one of two things: a <Strong>personal access token</Strong>, which is used in place of a
          password over HTTPS, or an <Strong>SSH key</Strong>, which changes the protocol entirely.
        </P>
        <CompareGrid
          items={[
            {
              title: "HTTPS with a token",
              tone: "neutral",
              children: (
                <P>
                  Works through corporate firewalls and proxies that block other ports. Setup is one
                  page on a website. The token expires, so you will do this again. Best if you are on
                  a locked-down network or only push occasionally.
                </P>
              ),
            },
            {
              title: "SSH with a key",
              tone: "positive",
              children: (
                <P>
                  Set up once and it never expires. The secret never leaves your machine. Requires
                  port 22 outbound, which some networks block. Best for a machine you use every day.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="a-token-is-a-password-with-a-scope-and-an-expiry"
        title="A token is a password with a scope and an expiry"
      >
        <P>
          A personal access token is a long random string you use where a password used to go. It is
          better than a password in two specific ways: it can be limited to certain permissions, and
          it can be set to die on a date.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Settings → Developer settings → Personal access tokens",
              detail: "It is at the very bottom of the settings sidebar, which is a genuinely hard place to find the first time.",
            },
            {
              label: "Choose fine-grained, not classic",
              detail: "Fine-grained tokens are scoped to specific repositories and specific permissions. A classic token with the repo scope can read and write every repository you have access to, including your employer's.",
            },
            {
              label: "Set an expiry",
              detail: "Ninety days is a reasonable default. \"No expiration\" means a string that grants access to your account forever, sitting in a file on a laptop.",
            },
            {
              label: "Copy it now",
              detail: "GitHub shows the value exactly once. Close the tab and it is unrecoverable — you generate a new one and delete the old.",
            },
            {
              label: "Use it as the password when Git asks",
              detail: "Username is your GitHub username; password is the token. Nothing else changes.",
            },
          ]}
        />
        <Callout tone="warning" title="A token in a URL is a token in your shell history">
          You will see advice to write{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            https://ghp_xxx@github.com/you/project.git
          </span>{" "}
          as your remote. It works, and it writes the secret into{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">.git/config</span> in plain
          text and into your shell history. Use a credential helper instead — the next section.
        </Callout>
      </LessonSection>

      <LessonSection
        id="an-ssh-key-never-travels-over-the-wire"
        title="An SSH key never travels over the wire"
      >
        <P>
          SSH uses a key pair: a <Strong>private key</Strong> that stays on your machine and a{" "}
          <Strong>public key</Strong> you give to GitHub. Authenticating proves you hold the private
          key without ever sending it, so there is no secret in transit for anybody to capture.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# 1. Generate a key pair. Ed25519 is the current recommendation.
ssh-keygen -t ed25519 -C "you@example.com"
# Press Enter for the default path. SET A PASSPHRASE.

# 2. Start the agent and add the key so the passphrase is asked for once
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copy the PUBLIC key — the one ending .pub
cat ~/.ssh/id_ed25519.pub          # macOS/Linux
# Paste it into GitHub: Settings -> SSH and GPG keys -> New SSH key

# 4. Check it worked
ssh -T git@github.com
# Hi you! You've successfully authenticated, but GitHub does not provide shell access.`}
        />
        <Callout tone="danger" title="Never share the file without .pub">
          <span className="font-[family-name:var(--learn-font-mono)]">id_ed25519.pub</span> is public
          and safe to paste anywhere.{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">id_ed25519</span>, with no
          extension, is the private key and is equivalent to your password. If you ever paste one
          into a chat or an issue, delete the key pair and generate a new one.
        </Callout>
        <P>
          If you cloned over HTTPS and want to switch, you do not need to re-clone. Change the URL:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git remote set-url origin git@github.com:you/project.git
git remote -v      # confirm it now starts git@ rather than https://`}
        />
        <P>
          One organisational detail worth knowing early: if your employer uses SAML single sign-on,
          both tokens and SSH keys must be separately <Strong>authorised</Strong> for that
          organisation after being created. A key that works fine for your own repositories will fail
          on the company one until you click that button, and the error does not mention SAML.
        </P>
      </LessonSection>

      <LessonSection
        id="the-gh-cli-sets-all-of-this-up-in-one-command"
        title="The gh CLI sets all of this up in one command"
      >
        <P>
          GitHub&apos;s official command-line tool does the whole setup interactively, including
          generating an SSH key and uploading it for you.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Install
brew install gh              # macOS
winget install --id GitHub.cli   # Windows
sudo apt install gh          # Debian/Ubuntu

# Authenticate — it opens a browser and handles everything
gh auth login

# Check
gh auth status`}
        />
        <P>
          This is the shortest correct path for a new machine, and it is what to recommend to
          somebody who is stuck. It is also useful well beyond authentication:
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh repo clone you/project        # clone with the right protocol already configured
gh repo create my-thing --public --source=. --push
gh pr create --fill              # open a pull request from the current branch
gh pr checks                     # see whether CI passed, without a browser
gh pr view --web                 # open it in a browser when you do want one
gh issue list --assignee @me`}
        />
        <Callout tone="tip" title="gh is not required and is very hard to give up">
          Everything it does can be done on the website or with plain Git. It removes the
          context switch, which is worth more than it sounds when reviewing three pull requests in an
          afternoon.
        </Callout>
      </LessonSection>

      <LessonSection
        id="credentials-get-cached-and-that-is-the-confusion"
        title="Credentials get cached, and that is the confusion"
      >
        <P>
          Git does not ask for a token on every push, because a <Strong>credential helper</Strong>{" "}
          stores it. That is a convenience, and it is also why a rotated token keeps failing with the
          old value long after you replaced it.
        </P>
        <LabelRows
          rows={[
            { label: "macOS", text: "osxkeychain — stored in the system Keychain. Look for github.com under Keychain Access to see or delete it." },
            { label: "Windows", text: "manager — Git Credential Manager, backed by Windows Credential Manager. Same place you would find any saved password." },
            { label: "Linux", text: "Usually libsecret, or cache which keeps it in memory for fifteen minutes. store writes it to a plain text file, which you should avoid." },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# Which helper is in use
git config --get credential.helper

# Forget what is stored for GitHub, so the next push asks again
git credential reject
protocol=https
host=github.com
# (then press Enter on a blank line)

# macOS, the direct route
security delete-internet-password -s github.com`}
        />
        <ChecklistCard
          title="When authentication fails, in order"
          marker="check"
          items={[
            "Read the error properly — \"Authentication failed\" after August 2021 means no password support, not a typo",
            "git remote -v — are you on https:// or git@? The fix is different for each",
            "For SSH: ssh -T git@github.com. It tells you your username if the key works",
            "For HTTPS: has the token expired? Ninety-day tokens expire on day ninety-one, silently",
            "Clear the cached credential, so the next attempt actually asks rather than replaying the old value",
            "On a company repository: is the token or key authorised for the SAML organisation?",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Password authentication over Git was removed in August 2021. \"Authentication failed\" does not mean you typed it wrong.",
          "Two options: a personal access token over HTTPS, or an SSH key.",
          "Fine-grained tokens are scoped to specific repositories; a classic token with repo scope reaches everything you can.",
          "GitHub shows a token once. Set an expiry — \"no expiration\" is a permanent key in a file on a laptop.",
          "SSH proves you hold the private key without sending it. Share only the .pub file, ever.",
          "Set a passphrase on the key and let ssh-agent hold it, so the file alone is not enough.",
          "Switch protocols with git remote set-url; you never need to re-clone.",
          "With SAML single sign-on, tokens and keys need separate authorisation and the error never says so.",
          "gh auth login does the whole setup, including generating and uploading a key.",
          "A credential helper caches your token, which is why a rotated one keeps failing until you clear it.",
        ]}
      />
    </div>
  );
}
