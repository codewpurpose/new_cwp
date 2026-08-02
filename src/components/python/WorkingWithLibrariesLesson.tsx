import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";

export function WorkingWithLibrariesLesson() {
  return (
    <div>
      <Lead>
        Nobody writes date parsing or HTTP requests from scratch, because somebody has already
        written it better and tested it more. Install a real package, import it, and use in
        three lines what would take an afternoon to build.
      </Lead>

      <LessonSection id="pip-installs-code-not-magic" title="pip installs code, not magic">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`$ pip install requests
Successfully installed requests-2.31.0`}
        />
        <P>
          <Strong>pip</Strong> downloads the <Strong>requests</Strong> package from the Python
          Package Index and copies its files onto your machine — nothing more mysterious than
          that. Once installed, <Strong>import requests</Strong> works exactly like importing
          any module you wrote yourself.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> import requests
>>> response = requests.get("https://api.github.com")
>>> response.status_code
200`}
        />
        <P>
          That single install line usually pulls in more than one package. <Strong>pip
          show requests</Strong> lists <Strong>certifi</Strong>,{" "}
          <Strong>charset-normalizer</Strong>, <Strong>idna</Strong>, and{" "}
          <Strong>urllib3</Strong> as requirements — packages{" "}
          <Strong>requests</Strong> depends on, that it needed you to have without ever asking
          you to install them yourself. Every one of them is now code running inside your
          program, whether you ever call it directly or not.
        </P>
      </LessonSection>

      <LessonSection id="a-virtual-environment-is-a-clean-room-per-project" title="A virtual environment is a clean room per project">
        <P>
          Installing packages globally means every project on the machine shares one set of
          versions — upgrade <Strong>requests</Strong> for one project, and a different project
          that needed the older version breaks without a single line of its own code changing.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`$ python -m venv .venv
$ source .venv/bin/activate
(.venv) $ pip install requests`}
        />
        <P>
          <Strong>python -m venv .venv</Strong> creates an isolated folder with its own copy of
          Python and its own package list.{" "}
          <Strong>source .venv/bin/activate</Strong> switches the current terminal to use that
          copy, so anything installed afterward stays scoped to this one project. The{" "}
          <Strong>(.venv)</Strong> prefix that appears in the prompt is the reminder that it
          worked — every <Strong>pip install</Strong> from here lands inside{" "}
          <Strong>.venv</Strong>, not on the machine at large.
        </P>
        <P>
          <Strong>deactivate</Strong> switches the terminal back to whatever Python and
          packages exist outside the environment, and closing the terminal has the same
          effect. Neither one deletes anything — the folder is still there next time you{" "}
          <Strong>activate</Strong> it, packages and all.
        </P>
        <Callout tone="tip" title="One line worth adding on day one">
          <Strong>.venv</Strong> can be regenerated from nothing at any time, which is exactly
          why it belongs in <Strong>.gitignore</Strong> rather than in the project&apos;s
          history — it can be tens of thousands of files, none of which anyone else needs
          committed alongside your actual code.
        </Callout>
      </LessonSection>

      <LessonSection id="pinning-versions-so-tomorrow-matches-today" title="Pinning versions so tomorrow matches today">
        <P>
          <Strong>pip install requests</Strong> grabs whatever the newest version happens to be
          today. Run that same command again in a year, on a different machine, and it can
          install a different version — one that might behave differently, or not at all the
          way your code expects.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`$ pip freeze > requirements.txt
$ cat requirements.txt
certifi==2024.2.2
charset-normalizer==3.3.2
idna==3.6
requests==2.31.0
urllib3==2.2.1`}
        />
        <P>
          <Strong>pip freeze</Strong> writes down the exact version of every package currently
          installed, not just the one you asked for by name — including the transitive
          dependencies pip pulled in on its own. Anyone who runs{" "}
          <Strong>pip install -r requirements.txt</Strong> against that file gets the identical
          set of versions you tested against, on any machine, at any later date.
        </P>
        <Callout tone="warning" title="A requirements file you hand-wrote is a wish, not a lock">
          Writing <Strong>requests&gt;=2.0</Strong> into{" "}
          <Strong>requirements.txt</Strong> by hand still lets{" "}
          <Strong>pip install</Strong> grab whatever is newest at install time — reproducible
          in name only. A true <Strong>lockfile</Strong>, the kind tools like Poetry or pip-tools
          produce, pins the entire dependency tree with exact versions and content hashes, so
          the install is provably identical to the one that was tested, not merely compatible
          with it.
        </Callout>
      </LessonSection>

      <LessonSection id="reading-documentation-instead-of-guessing-at-an-api" title="Reading documentation instead of guessing at an API">
        <P>
          <Strong>response.status_code</Strong> works because someone who wrote{" "}
          <Strong>requests</Strong> chose that name and documented it — there is no way to
          discover it by reading Python&apos;s own syntax rules, only by reading what the
          package actually promises.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> help(requests.get)
Help on function get in module requests.api:

get(url, params=None, **kwargs)
    Sends a GET request.
    ...`}
        />
        <P>
          <Strong>help(requests.get)</Strong> in a Python shell shows the function&apos;s own
          docstring immediately, without leaving the terminal — the fastest first move for a
          single function whose exact arguments you have forgotten. For anything past that,
          the package&apos;s own documentation site is written for exactly this question, and
          covers the shape of the whole library rather than one function at a time: which
          arguments are required, what a successful call returns, and which exceptions it can
          raise that a docstring alone would not mention.
        </P>
        <P>
          A well-maintained package documents its arguments and return types precisely enough
          that you should never need to read its source code to use it correctly — needing to
          open the library&apos;s own internals just to call it is usually a sign the
          documentation, not your understanding, is the thing that is missing.
        </P>
      </LessonSection>

      <LessonSection id="deciding-whether-a-package-is-worth-depending-on" title="Deciding whether a package is worth depending on">
        <P>
          <Strong>pip install</Strong> works identically whether the package behind it is
          maintained by a large team or was last touched by one person, three years ago, and
          then abandoned. The command gives no warning either way — that judgement is yours to
          make before you run it, not after something breaks.
        </P>
        <ChecklistCard
          title="Before you add a package you'll depend on for years"
          items={[
            "When was the last release? A package untouched for a few years may already be quietly broken against the Python version you're running.",
            "How many other projects depend on it? Download counts on PyPI and stars or open issues on its repository are rough proxies for whether other people would notice, and fix, a serious bug.",
            "What licence is it under? MIT and Apache-2.0 are safe for almost anything you'd build; some licences place real conditions on code that uses them, worth knowing before you build on it rather than after.",
            "How many packages does it pull in underneath it? pip show <package> lists its direct dependencies — each one is someone else's code now running inside yours, whether you call it or not.",
          ]}
        />
        <P>
          None of these rule a package out on their own — a young, actively maintained package
          with two dependencies is often the better bet over an old, unmaintained one with
          twenty, even if the old one has more stars from years ago. The point of the checklist
          is to make the trade-off visible before you commit to it, not to fail every package
          that trips one item.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "pip install <package> downloads code from the Python Package Index and makes it importable, same as any module you wrote — often pulling in several more packages underneath it.",
          "A virtual environment gives each project its own isolated set of installed packages, so upgrading one project never breaks another.",
          "pip freeze > requirements.txt records the exact versions installed; a hand-written requirements.txt with >= is a wish about the future, not a lock on it.",
          "A package's own API — its function and argument names — can only be learned from its documentation or docstrings, not guessed from Python's syntax.",
          "A package worth depending on has recent maintenance, a licence you understand, and a dependency tree you've actually looked at — pip installs anything regardless.",
        ]}
      />
    </div>
  );
}
