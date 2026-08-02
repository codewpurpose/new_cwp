import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          The class itself is not a student — it is the plan for one. Stamp out three
          instances from it and you get three separate objects in memory, each following the
          same plan, and changing one of them never touches the other two, or the class they
          both came from.
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
        <P>
          <Strong>__init__</Strong> is often called &ldquo;the constructor&rdquo;, which is
          close enough to be useful and wrong enough to trip you up later. By the time{" "}
          <Strong>__init__</Strong> runs, the object already exists — Python has already
          allocated it. __init__&apos;s job is narrower: it <em>initialises</em> that
          already-existing object with starting values. The distinction rarely matters until
          you meet <Strong>__new__</Strong>, the method that actually constructs the object,
          which almost no everyday Python code ever needs to touch.
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
        <P>
          Add a second method and it works the same way — each one takes{" "}
          <Strong>self</Strong> first, and each one can read or change anything already
          stored on that instance. A class with two fields and three methods is not three
          separate pieces of code that happen to share some data; it is one unit, and that is
          the entire design goal.
        </P>
      </LessonSection>

      <LessonSection id="instance-attributes-belong-to-the-object-class-attributes-are-shared" title="Instance attributes belong to the object; class attributes are shared" delay={0.05}>
        <P>
          Everything so far — <Strong>self.name</Strong>, <Strong>self.grade</Strong> — is an{" "}
          <Strong>instance attribute</Strong>: set inside <Strong>__init__</Strong> through{" "}
          self, and every object gets its own separate copy. A{" "}
          <Strong>class attribute</Strong>, written directly inside the class body with no
          self, works differently — there is exactly one copy, shared by every instance of
          that class.
        </P>
        <CompareGrid
          items={[
            {
              title: "Instance attribute",
              tone: "positive",
              children: (
                <>
                  Set inside __init__ through self. Every object gets its own separate
                  copy.
                </>
              ),
            },
            {
              title: "Class attribute",
              tone: "caution",
              children: (
                <>
                  Set directly in the class body, no self. One copy, shared by every instance —
                  dangerous the moment it is mutable.
                </>
              ),
            },
          ]}
        />
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Student:
...     school = "Lincoln High"
...     def __init__(self, name):
...         self.name = name
...
>>> ada = Student("Ada")
>>> grace = Student("Grace")
>>> ada.school
'Lincoln High'
>>> grace.school
'Lincoln High'`}
        />
        <P>
          That is fine for a value that genuinely is the same for everyone. It becomes a real
          bug the moment the shared value is mutable — a list or a dictionary — because
          changing it through one instance changes it for every instance at once, since there
          was only ever one list to begin with.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Student:
...     clubs = []
...     def __init__(self, name):
...         self.name = name
...
>>> ada = Student("Ada")
>>> grace = Student("Grace")
>>> ada.clubs.append("Chess")
>>> grace.clubs
['Chess']`}
          lineTones={{ 9: "err" }}
        />
        <P>
          <Strong>grace.clubs</Strong> shows a club she never joined, because{" "}
          <Strong>ada.clubs</Strong> and <Strong>grace.clubs</Strong> were never two lists —{" "}
          clubs lives on the class, not on either instance, so both names point at the same
          one. The fix is to create the mutable value inside <Strong>__init__</Strong> instead,
          where each call genuinely does make a new one.
        </P>
        <Callout tone="danger" title="Never default a mutable value at class level">
          <Strong>self.clubs = []</Strong> inside __init__ gives every instance its own list.{" "}
          <Strong>clubs = []</Strong> directly in the class body gives every instance the same
          list. The two lines look almost identical and behave nothing alike.
        </Callout>
      </LessonSection>

      <LessonSection id="a-repr-worth-reading" title="A repr worth reading" delay={0.05}>
        <P>
          Print a plain object and Python shows you something like{" "}
          <Strong>{"<__main__.Student object at 0x104a3f550>"}</Strong> — technically correct,
          and useless for debugging, because it tells you nothing about which student it
          actually is.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> ada = Student("Ada", 92)
>>> print(ada)
<__main__.Student object at 0x104a3f550>`}
        />
        <P>
          Define <Strong>__repr__</Strong> and that changes: whatever string it returns is
          what print, and the console, show instead.
        </P>
        <CodeBlock
          label="Terminal"
          variant="terminal"
          code={`>>> class Student:
...     def __init__(self, name, grade):
...         self.name = name
...         self.grade = grade
...     def __repr__(self):
...         return f"Student({self.name!r}, {self.grade})"
...
>>> ada = Student("Ada", 92)
>>> print(ada)
Student('Ada', 92)
>>> ada
Student('Ada', 92)`}
          lineTones={{ 9: "ok", 11: "ok" }}
        />
        <P>
          Worth doing on almost every class you write, not just the ones you plan to print on
          purpose: the moment something goes wrong three functions away and you inspect a
          variable in a debugger or an error message, <Strong>__repr__</Strong> is what you
          actually read.
        </P>
      </LessonSection>

      <LessonSection id="not-everything-needs-to-be-a-class" title="Not everything needs to be a class">
        <P>
          A class earns its place when a group of values travel together and share behaviour
          that acts on them — a student&apos;s name, grade, and the <Strong>passed()</Strong>{" "}
          method that reads both. A single function that takes an argument and returns a value
          does not need a class wrapped around it just because the rest of the file has some.
        </P>
        <CodeBlock
          label="Terminal"
          code={`# no class needed — one input, one output, no state to bundle
def average(grades):
    return sum(grades) / len(grades)`}
        />
        <ChecklistCard
          title="Signs a class is not pulling its weight"
          items={[
            "Exactly one method besides __init__, and it barely touches self.",
            "Every instance is created, used once, and thrown away immediately.",
            "You keep writing Thing(x).run() where run(x) would do the same job in one line.",
          ]}
        />
        <P>
          Writing the plain function instead is not a shortcut taken to skip &ldquo;proper&rdquo;
          object-oriented code — for that shape of problem, it is already the more direct
          solution.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          'class Student: is a blueprint. Calling it like a function — Student("Ada", 92) — creates one instance following that blueprint.',
          "__init__ initialises an object that already exists; it does not construct it. self is that specific object, passed in automatically on every method call.",
          "self.x = x inside __init__ gives every instance its own copy. x = ... written directly in the class body creates one value shared by every instance — a bug waiting to happen the moment that value is mutable.",
          "Define __repr__ so printing an object shows something useful instead of a memory address, especially once you are debugging three functions away from where the object was created.",
          "A class earns its place when data and the behaviour that acts on it travel together. A single function that takes an input and returns an output rarely needs one.",
        ]}
      />
    </div>
  );
}
