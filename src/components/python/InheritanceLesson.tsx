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
        <Callout tone="tip" title="A test that catches most mistakes">
          Say the relationship out loud as &ldquo;X is a Y&rdquo;. If it sounds wrong, it
          probably is — reach for a plain attribute instead of a parent class.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "class Dog(Animal): makes Dog a subclass that inherits everything Animal defines.",
          "Defining a method with the same name in the subclass overrides it there only — the parent class is untouched.",
          "Use inheritance when the relationship is \"is a kind of\", not \"has one of\".",
          "When in doubt, say the relationship out loud. \"X is a Y\" earns inheritance; \"X has a Y\" earns a plain attribute.",
        ]}
      />
    </div>
  );
}
