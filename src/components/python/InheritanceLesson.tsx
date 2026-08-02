import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function InheritanceLesson() {
  return (
    <div>
      <Lead>
        Two classes that share eighty percent of their behaviour usually end up as two copies
        of that eighty percent. Write the shared part once, inherit it in both, and override
        only what actually differs.
      </Lead>

      <LessonSection id="a-child-class-starts-with-everything-the-parent-has" title="A child class starts with everything the parent has">
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Animal:
...     def __init__(self, name):
...         self.name = name
...     def describe(self):
...         return f"{self.name} is an animal"
...
>>> class Dog(Animal):
...     pass
...
>>> rex = Dog("Rex")
>>> rex.describe()
'Rex is an animal'`}
        />
        <P>
          <Strong>{"class Dog(Animal):"}</Strong> makes <Strong>Dog</Strong> a{" "}
          <Strong>subclass</Strong> of <Strong>Animal</Strong>. Even though{" "}
          <Strong>Dog</Strong> defines nothing of its own yet, it already has{" "}
          <Strong>__init__</Strong> and <Strong>describe</Strong>, inherited in full.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> isinstance(rex, Dog)
True
>>> isinstance(rex, Animal)
True`}
        />
        <P>
          Every Dog is also an Animal, as far as Python is concerned — <Strong>isinstance</Strong>{" "}
          confirms both at once. That single fact is what &ldquo;is a kind of&rdquo; means in
          code, not just in the way you would describe it in English.
        </P>
      </LessonSection>

      <LessonSection id="overriding-a-method-without-touching-the-original" title="Overriding a method without touching the original">
        <P>
          Define a method with the same name in the subclass, and it replaces the parent&apos;s
          version for that subclass only — <Strong>Animal</Strong> itself, and anything else
          that inherits from it, is untouched.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Dog(Animal):
...     def describe(self):
...         return f"{self.name} is a dog"
...
>>> rex = Dog("Rex")
>>> rex.describe()
'Rex is a dog'`}
        />
        <P>
          Sometimes you do not want to replace the parent&apos;s version outright — you want
          the child&apos;s version to do its own thing <em>and</em> still run the parent&apos;s.
          Rewriting describe()&apos;s whole body to include what Animal already did means
          copying that line; there is a way to avoid the copy.
        </P>
      </LessonSection>

      <LessonSection id="calling-the-parents-version-with-super" title="Calling the parent's version with super()" delay={0.05}>
        <P>
          <Strong>super()</Strong> gets you a reference to the parent class&apos;s version of
          a method, callable from inside the child&apos;s own override — without naming{" "}
          Animal directly, which matters more once a program has several levels of
          inheritance.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Dog(Animal):
...     def describe(self):
...         base = super().describe()
...         return f"{base}, specifically a dog"
...
>>> rex = Dog("Rex")
>>> rex.describe()
'Rex is an animal, specifically a dog'`}
          lineTones={{ 2: "accent" }}
        />
        <P>
          <Strong>__init__</Strong> is the most common place to reach for super(): a child
          that adds one new field, like a breed, still wants the parent to set up name the way
          it always has, rather than duplicating that line.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Dog(Animal):
...     def __init__(self, name, breed):
...         super().__init__(name)
...         self.breed = breed
...
>>> rex = Dog("Rex", "Labrador")
>>> rex.name
'Rex'
>>> rex.breed
'Labrador'`}
          lineTones={{ 2: "accent" }}
        />
        <Callout tone="tip" title="The alternative is copying a line">
          Without <Strong>super().__init__(name)</Strong>, Dog&apos;s __init__ would need{" "}
          <Strong>self.name = name</Strong> written out again — working, but now two places
          set name the same way, and a future change to Animal&apos;s setup has to be
          remembered in both.
        </Callout>
      </LessonSection>

      <LessonSection id="when-inheritance-is-the-right-tool" title="When inheritance is the right tool, and when composition is">
        <P>
          Inheritance says <em>this thing is a kind of that thing</em> — a dog is a kind of
          animal. It fits badly the moment the relationship is really{" "}
          <em>this thing has one of those</em> instead — a car is not a kind of engine, it{" "}
          <em>has</em> an engine. Forcing that second shape into inheritance tends to produce
          a class hierarchy that fights the problem rather than describing it.
        </P>
        <CompareGrid
          items={[
            {
              title: "Reach for inheritance",
              tone: "positive",
              children: (
                <>
                  A Dog <Strong>is an</Strong> Animal. A SavingsAccount{" "}
                  <Strong>is an</Strong> Account. The subclass is a more specific version of
                  the same thing.
                </>
              ),
            },
            {
              title: "Reach for composition",
              tone: "caution",
              children: (
                <>
                  A Car <Strong>has an</Strong> Engine. An Order <Strong>has a</Strong>{" "}
                  Customer. Store the other object as an attribute instead of inheriting from
                  it.
                </>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Engine:
...     def start(self):
...         return "vroom"
...
>>> class Car:
...     def __init__(self):
...         self.engine = Engine()
...     def start(self):
...         return self.engine.start()
...
>>> Car().start()
'vroom'`}
        />
        <P>
          <Strong>Car</Strong> does not inherit from Engine — it holds one, stored as an
          ordinary attribute, and <Strong>start()</Strong> delegates to it. Nothing about
          Car&apos;s own methods needs to know how the engine actually works, and swapping in
          an <Strong>ElectricEngine</Strong> later means changing one line, not restructuring
          a class hierarchy.
        </P>
        <Callout tone="tip" title="A test that catches most mistakes">
          Say the relationship out loud as &ldquo;X is a Y&rdquo;. If it sounds wrong, it
          probably is — reach for a plain attribute instead of a parent class.
        </Callout>
        <Callout tone="warning" title="Multiple inheritance exists — be wary of it">
          Python allows <Strong>{"class Cyborg(Human, Robot):"}</Strong>, inheriting from more
          than one parent at once. It works, but the moment both parents define a method with
          the same name, which version wins depends on Python&apos;s method resolution order —
          a rule worth knowing exists rather than one to lean on. Most of what multiple
          inheritance gets used for in practice — pulling in one small piece of shared
          behaviour — is handled more predictably by a single well-placed attribute.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "class Dog(Animal): makes Dog a subclass that inherits everything Animal defines — isinstance(rex, Animal) is true even though rex was built as a Dog.",
          "Defining a method with the same name in the subclass overrides it there only. The parent class, and anything else that inherits from it, is untouched.",
          "super() calls the parent's version of a method from inside a child's override, most often inside __init__, so the child doesn't have to copy a line the parent already wrote.",
          "Use inheritance when the relationship is \"is a kind of\". Use composition — storing another object as a plain attribute — when it's \"has a\" instead.",
          "Python allows inheriting from more than one parent at once. It's legal, but which parent's method wins when both define one is decided by an order worth knowing exists rather than depending on.",
        ]}
      />
    </div>
  );
}
