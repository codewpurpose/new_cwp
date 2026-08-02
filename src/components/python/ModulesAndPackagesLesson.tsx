import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function ModulesAndPackagesLesson() {
  return (
    <div>
      <Lead>
        A single file works exactly until it does not, somewhere around the point it holds
        three unrelated things. Split one program across two files, import one from the
        other, and watch the boundary hold.
      </Lead>

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

      <TakeawayCard
        items={[
          "Any .py file can be imported by another; the file name becomes the module name.",
          "A module's file runs top to bottom exactly once per program, the first time it is imported, then the result is cached.",
          "Keep a module's top level to definitions — anything meant to run belongs inside a function.",
          "A package is a folder with an __init__.py file, letting a folder of modules be imported as one unit.",
        ]}
      />
    </div>
  );
}
