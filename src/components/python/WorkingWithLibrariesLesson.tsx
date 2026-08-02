import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

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
          copy, so anything installed afterward stays scoped to this one project.
        </P>
      </LessonSection>

      <LessonSection id="reading-documentation-instead-of-guessing-at-an-api" title="Reading documentation instead of guessing at an API">
        <P>
          <Strong>response.status_code</Strong> works because someone who wrote{" "}
          <Strong>requests</Strong> chose that name and documented it — there is no way to
          discover it by reading Python&apos;s own syntax rules, only by reading what the
          package actually promises.
        </P>
        <Callout tone="tip" title="Where to look, in order">
          <Strong>help(requests.get)</Strong> in a Python shell shows the function&apos;s own
          docstring immediately. For anything past that, the package&apos;s own documentation
          site is written for exactly this question, and is almost always faster than guessing
          from the function name.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "pip install <package> downloads code from the Python Package Index and makes it importable, same as any module you wrote.",
          "A virtual environment gives each project its own isolated set of installed packages, so upgrading one project never breaks another.",
          "python -m venv .venv creates it; source .venv/bin/activate switches the current terminal to use it.",
          "A package's own API — its function and argument names — can only be learned from its documentation or docstrings, not guessed from Python's syntax.",
        ]}
      />
    </div>
  );
}
