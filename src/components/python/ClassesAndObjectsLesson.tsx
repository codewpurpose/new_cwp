import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { ClassStamper } from "@/components/python/ClassStamper";

export function ClassesAndObjectsLesson() {
  return (
    <div>
      <Lead>
        A dictionary can hold a name and a grade, but nothing stops you misspelling the key
        next time you use it. Define a class once, stamp out three objects from it, and give
        each its own values without repeating the shape.
      </Lead>

      <LessonSection id="a-blueprint-and-the-objects-made-from-it" title="A blueprint, and the objects made from it">
        <P>
          <Strong>class Student:</Strong> defines a shape, not a value. Nothing exists yet
          until you call it like a function — <Strong>{'Student("Ada", 92)'}</Strong> — which
          creates one actual object, called an <Strong>instance</Strong>, following that
          shape.
        </P>
      </LessonSection>

      <ClassStamper />

      <LessonSection id="self-is-the-object-talking-about-itself" title="self is the object talking about itself">
        <P>
          Inside the class, <Strong>self</Strong> refers to whichever instance is currently
          being worked on. <Strong>self.name = name</Strong> means &ldquo;store this
          particular call&apos;s name on this particular object&rdquo;, not on the class
          itself.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> ada = Student("Ada", 92)
>>> grace = Student("Grace", 88)
>>> ada.name
'Ada'
>>> grace.name
'Grace'`}
        />
        <P>
          Python passes the object in as <Strong>self</Strong> automatically every time you
          call a method on it — you never pass it yourself. That is the entire reason every
          method you define takes <Strong>self</Strong> as its first parameter.
        </P>
      </LessonSection>

      <LessonSection id="bundling-data-and-the-functions-that-act-on-it" title="Bundling data and the functions that act on it">
        <P>
          A class can hold functions as well as data, and those functions automatically get
          access to that object&apos;s own values through <Strong>self</Strong>.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Student:
...     def __init__(self, name, grade):
...         self.name = name
...         self.grade = grade
...     def passed(self):
...         return self.grade >= 60
...
>>> ada = Student("Ada", 92)
>>> ada.passed()
True`}
        />
        <Callout tone="success" title="Why this beats a dictionary here">
          <Strong>{'{"name": "Ada", "grade": 92}'}</Strong> holds the same data, but a typo
          like <Strong>{'student["gade"]'}</Strong> fails silently at the point of use. A class
          gives every instance the same fixed shape and lets you attach behaviour, like{" "}
          <Strong>passed()</Strong>, directly to the data it acts on.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A class is a blueprint. Calling it like a function creates one instance following that blueprint.",
          "self refers to the specific instance a method is currently running on, and Python passes it in automatically.",
          "self.name = name stores a value on that instance, not on the class — every instance gets its own copy.",
          "A class bundles data with the functions that act on it, which a plain dictionary cannot enforce the shape of.",
        ]}
      />
    </div>
  );
}
