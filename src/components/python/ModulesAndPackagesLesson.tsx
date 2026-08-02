import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";

export function ModulesAndPackagesLesson() {
  return (
    <div>
      <Lead>
        A single file works exactly until it does not, somewhere around the point it holds
        three unrelated things. Split one program across two files, import one from the
        other, and watch the boundary hold.
      </Lead>

      <LessonSection id="a-module-a-package-and-a-library-are-not-the-same-word" title="A module, a package, and a library are not the same word">
        <P>
          People use these three words as if they mean the same thing, and mixing them up
          makes documentation harder to read than it needs to be. A <Strong>module</Strong> is
          one file — <Strong>shapes.py</Strong> is a module. A <Strong>package</Strong> is a
          folder of modules that Python can import as a single unit, which the next section
          shows. A <Strong>library</Strong> is neither of those specifically — it is the
          general word for a chunk of published, reusable code, and it might be shipped as a
          single module, a package, or several packages together.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Module",
              tone: "neutral",
              children: <>One file. shapes.py is a module.</>,
            },
            {
              title: "Package",
              tone: "neutral",
              children: (
                <>A folder of modules with an __init__.py, importable as one unit.</>
              ),
            },
            {
              title: "Library",
              tone: "neutral",
              children: (
                <>The general word for published, reusable code — shipped as either.</>
              ),
            },
          ]}
        />
        <P>
          <Strong>requests</Strong>, the package almost every Python program that talks to the
          internet ends up importing, is a library. So is the standard library itself — the
          collection of modules that ship with Python before you install anything, like{" "}
          <Strong>json</Strong> or <Strong>pathlib</Strong>. Calling json &ldquo;a library&rdquo;
          and calling it &ldquo;a module&rdquo; are both correct, at different levels of
          description; calling your own single shapes.py file &ldquo;a package&rdquo; is not,
          because nothing about it is a folder.
        </P>
      </LessonSection>

      <LessonSection id="one-file-becomes-two-on-purpose" title="One file becomes two, on purpose">
        <P>
          Any <Strong>.py</Strong> file can be imported by another. Put the shared logic in
          its own file, and every other file that needs it imports it by name — the file name
          becomes the module name, minus the <Strong>.py</Strong>.
        </P>
        <CodeBlock
          label="shapes.py"
          code={`def area_of_circle(radius):
    return 3.14159 * radius * radius`}
        />
        <CodeBlock
          label="main.py"
          code={`import shapes

print(shapes.area_of_circle(4))`}
        />
        <P>
          Nothing about <Strong>shapes.py</Strong> changed to make it importable — every{" "}
          <Strong>.py</Strong> file already is. What changed is that <Strong>main.py</Strong>{" "}
          now reaches into it by name instead of duplicating <Strong>area_of_circle</Strong>{" "}
          inside itself, which is the entire point of splitting a program up in the first
          place.
        </P>
      </LessonSection>

      <LessonSection id="what-import-actually-does-the-first-time" title="What import actually does the first time">
        <P>
          The first time a module is imported anywhere in a running program, Python actually
          runs the entire file top to bottom, once, then keeps the result cached. Every later{" "}
          <Strong>import shapes</Strong>, anywhere else in the program, reuses that same
          cached result rather than running the file again.
        </P>
        <Callout tone="note" title="Why top-level code in a module is worth avoiding">
          If <Strong>shapes.py</Strong> had a <Strong>print(&quot;loaded&quot;)</Strong>{" "}
          line sitting outside any function, it would run once, silently, the first time
          anything imports it — often surprising whoever wrote{" "}
          <Strong>main.py</Strong> and never opened <Strong>shapes.py</Strong> at all. Keep a
          module&apos;s top level to definitions; put anything that should run into a function.
        </Callout>
      </LessonSection>

      <LessonSection id="only-when-the-file-is-run-directly" title="Only when the file is run directly" delay={0.05}>
        <P>
          A module&apos;s top level runs the moment anything imports it — the previous section
          already showed that. That becomes a problem the instant a file is meant to work two
          ways: as a script you run directly, and as a module something else imports. Code
          meant to run only in the first case needs a way to say so.
        </P>
        <CodeBlock
          label="weather.py"
          code={`def fetch_forecast(city):
    return f"Sunny in {city}"

print(fetch_forecast("London"))`}
        />
        <P>
          Import this from anywhere else in the program, and that print runs immediately,
          every time — reporting London&apos;s forecast into output that has nothing to do
          with weather, the moment the import line executes.
        </P>
        <CodeBlock
          label="weather.py"
          code={`def fetch_forecast(city):
    return f"Sunny in {city}"

if __name__ == "__main__":
    print(fetch_forecast("London"))`}
          lineTones={{ 3: "accent" }}
        />
        <P>
          <Strong>__name__</Strong> is a variable Python sets automatically in every module.
          Run the file directly and Python sets it to the string{" "}
          <Strong>&quot;__main__&quot;</Strong>. Import the same file from somewhere else and
          Python sets it to the module&apos;s own name instead — <Strong>&quot;weather&quot;</Strong>,
          not <Strong>&quot;__main__&quot;</Strong> — so the condition is false, and the print
          never runs. Nothing magic is happening here; it is an ordinary if statement checking
          an ordinary variable that happens to be set differently depending on how the file
          started.
        </P>
        <Callout tone="tip" title="What this buys you in practice">
          Any module worth testing benefits from this shape: define the functions, then guard
          the code that actually calls them behind <Strong>{'if __name__ == "__main__":'}</Strong>.
          Another file can then import <Strong>fetch_forecast</Strong> without also triggering
          whatever that guarded block does.
        </Callout>
      </LessonSection>

      <LessonSection id="a-package-is-a-folder-with-one-extra-file-in-it" title="A package is a folder with one extra file in it">
        <P>
          A <Strong>package</Strong> is just a folder of modules, with one marker file,{" "}
          <Strong>__init__.py</Strong>, that tells Python to treat the folder as a single
          importable unit rather than an ordinary directory.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`geometry/
    __init__.py
    shapes.py
    angles.py`}
        />
        <P>
          From outside the folder, <Strong>{"from geometry import shapes"}</Strong> reaches
          into it the same way <Strong>import shapes</Strong> reached into a single file —
          the folder structure is invisible to the code that uses it.
        </P>
      </LessonSection>

      <LessonSection id="how-python-actually-finds-what-you-import" title="How Python actually finds what you import" delay={0.05}>
        <P>
          <Strong>import shapes</Strong> works because Python searches a specific list of
          locations, in order, called <Strong>sys.path</Strong>: the folder the running script
          lives in first, then any installed packages, then the standard library. That is also
          why a typo like <Strong>import shpaes</Strong> fails immediately with{" "}
          <Strong>ModuleNotFoundError</Strong> instead of finding something similar — the
          search is exact, not fuzzy.
        </P>
        <P>
          Inside a package, an import can be written two ways. An{" "}
          <Strong>absolute import</Strong> spells out the full path from the top of the
          package, the same way outside code would; a <Strong>relative import</Strong> uses
          dots to mean &ldquo;from here&rdquo; instead.
        </P>
        <CodeBlock
          label="geometry/angles.py"
          code={`# absolute — same path anyone outside the package would write
from geometry.shapes import area_of_circle

# relative — "from the module next to me in this same package"
from .shapes import area_of_circle`}
        />
        <P>
          Relative imports save typing inside a large package and keep working if the whole
          package is ever renamed or moved, since the dot just means &ldquo;my
          neighbour&rdquo; rather than repeating the package&apos;s name. They only work
          inside a package, though — a plain script run directly cannot use one, because a
          single file run on its own has no package to be relative to.
        </P>
        <Callout tone="warning" title="A relative import outside a package">
          Run a file containing <Strong>{"from .shapes import area_of_circle"}</Strong>{" "}
          directly with <Strong>python angles.py</Strong> and it fails with{" "}
          <Strong>ImportError: attempted relative import with no known parent package</Strong>.
          Relative imports only resolve inside a package that was itself imported, not a file
          executed on its own.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A module is one file; a package is a folder of modules with an __init__.py; a library is the general word for published code that might be shipped as either.",
          "A module's file runs top to bottom exactly once per program, the first time it is imported, then the result is cached.",
          'if __name__ == "__main__": guards code so it only runs when the file is executed directly, not when something else imports it — __name__ is just an ordinary variable Python sets differently depending on how the file started.',
          "Python searches sys.path, in order, to resolve an import — the running script's own folder first, then installed packages, then the standard library.",
          "A relative import (from .shapes import ...) only works inside a package; a plain script run directly needs an absolute one.",
        ]}
      />
    </div>
  );
}
