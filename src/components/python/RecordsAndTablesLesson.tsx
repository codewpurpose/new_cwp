import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RecordTable } from "@/components/python/RecordTable";

export function RecordsAndTablesLesson() {
  return (
    <div>
      <Lead>
        A spreadsheet has rows and columns; Python has neither, and still holds the same data
        more honestly. Build a table out of nothing but a list and some dictionaries, then
        filter it down to three rows without ever writing a counter.
      </Lead>

      <LessonSection id="one-record-is-a-dictionary-with-agreed-keys" title="One record is a dictionary with agreed keys">
        <P>
          A <Strong>record</Strong> is one thing you know several facts about: a student, an
          order, a sensor reading. In Python it is almost always a dictionary, because a
          dictionary lets you name the facts instead of remembering their positions.
        </P>
        <CodeBlock
          label="Python"
          code={`student = {"name": "Amara", "track": "python", "chapters": 18}

# The same thing as a tuple. Technically fine, practically hostile:
student = ("Amara", "python", 18)`}
        />
        <P>
          Both hold three values. Only one of them still makes sense in six months, when{" "}
          <Strong>student[2]</Strong> could plausibly be chapters, minutes, or the year they
          joined. The dictionary version costs a few more characters and buys you the ability
          to read your own code.
        </P>
        <Callout tone="note" title="Nothing enforces the agreement">
          Python does not require every record to carry the same keys — that is a promise you
          make to yourself, and a missing key on row forty is one of the most common ways a
          data script fails. The chapter on the errors your data throws is about exactly this.
        </Callout>
      </LessonSection>

      <LessonSection id="a-list-of-those-records-is-a-table" title="A list of those records is a table">
        <P>
          Put those records in a list and you have a table: the list gives you rows in order,
          each dictionary gives you named columns. There is no table type involved, and none
          is needed.
        </P>
        <CodeBlock
          label="Python"
          code={`students = [
    {"name": "Amara", "track": "python", "chapters": 18, "minutes": 164},
    {"name": "Ben", "track": "ml", "chapters": 6, "minutes": 71},
    {"name": "Chidi", "track": "python", "chapters": 24, "minutes": 231},
]`}
        />
        <P>
          This shape is worth recognising on sight, because it is what almost every API hands
          back and what almost every CSV reader produces. Learn to work with it directly and a
          large amount of real data work stops needing a library at all.
        </P>
      </LessonSection>

      <RecordTable />

      <LessonSection id="filtering-rows-without-counting-them" title="Filtering rows without counting them">
        <P>
          The instinct from other languages is to walk the list by index and collect what
          matches. Python asks the question of each row instead, and the comprehension you
          already know is the whole mechanism.
        </P>
        <CodeBlock
          label="Python"
          code={`finished = [s for s in students if s["chapters"] >= 18]

# Two conditions read exactly as they sound:
python_finishers = [
    s for s in students
    if s["track"] == "python" and s["chapters"] >= 18
]`}
        />
        <P>
          No index, no counter, and no chance of stopping one row early. What comes back is a
          new list holding <em>the same dictionaries</em> — not copies of them. Change a field
          on a filtered row and the original table sees it, which is usually what you want and
          occasionally a surprise.
        </P>
      </LessonSection>

      <LessonSection id="sorting-a-table-by-any-column-you-like" title="Sorting a table by any column you like">
        <P>
          A key function receives one whole row and returns the single value to order by. The
          rows are never taken apart, which is why the same one-liner works no matter how many
          columns a record has.
        </P>
        <CodeBlock
          label="Python"
          code={`by_minutes = sorted(students, key=lambda s: s["minutes"], reverse=True)

# Two columns at once: track first, then most chapters within each track.
ranked = sorted(students, key=lambda s: (s["track"], -s["chapters"]))`}
        />
        <P>
          Returning a tuple from the key sorts by the first element, then breaks ties with the
          second. The minus sign flips just that one field, which is the trick that lets you
          sort one column ascending and another descending in a single pass.
        </P>
      </LessonSection>

      <LessonSection id="summarising-a-column-down-to-one-number" title="Summarising a column down to one number">
        <P>
          Pulling one column out and reducing it is two steps written as one line, and the
          generator expression means the intermediate list is never built.
        </P>
        <CodeBlock
          label="Python"
          code={`total = sum(s["minutes"] for s in students)
average = total / len(students)
longest = max(students, key=lambda s: s["minutes"])

print(longest["name"])
# Chidi`}
        />
        <Callout tone="warning" title="max on an empty table raises">
          <Strong>max()</Strong> and <Strong>min()</Strong> have nothing to return when the
          list is empty, so they raise <Strong>ValueError</Strong> rather than guess. Pass{" "}
          <Strong>default=None</Strong> when an empty table is a normal thing to encounter —
          and dividing by <Strong>len(students)</Strong> has the same problem one line earlier.
        </Callout>
      </LessonSection>

      <LessonSection id="where-a-list-of-dicts-stops-being-enough" title="Where a list of dicts stops being enough">
        <P>
          This shape is excellent until one of three things becomes true, and it is worth
          knowing the boundary before you hit it at speed.
        </P>
        <CompareGrid
          items={[
            {
              title: "Still the right tool",
              tone: "positive",
              children: (
                <P>
                  Thousands of rows, read once or twice, filtered and summarised. Plain Python
                  handles this comfortably and adds no dependency to your project.
                </P>
              ),
            },
            {
              title: "Time to reach further",
              tone: "caution",
              children: (
                <P>
                  Millions of rows, repeated lookups by the same field, or genuine
                  column-at-a-time maths. That is what a dictionary keyed by id, or a real
                  dataframe library, exists for.
                </P>
              ),
            },
          ]}
        />
        <P>
          The middle case is the interesting one: if you keep scanning the whole list to find
          one student by name, you do not need a bigger library — you need a dictionary keyed
          by name instead, which the last chapter of this part is about.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A record is a dictionary with named fields. A list of records is a table, and no table type is required to make one.",
          "This list-of-dicts shape is what most APIs and CSV readers hand back, so recognising it saves reaching for a library.",
          "Filtering is a comprehension asking a question of each row — no index and no counter to get wrong.",
          "A sort key receives the whole row and returns one value. Return a tuple to sort by several columns, and negate a number to flip just that one.",
          "Nothing makes every record carry the same keys. That agreement is yours to keep, and breaking it is a common source of KeyError.",
          "A filtered list holds the same dictionaries, not copies — editing a row after filtering edits the original table.",
          "max() and min() raise on an empty list rather than guess. Pass a default when empty is a normal case.",
        ]}
      />
    </div>
  );
}
