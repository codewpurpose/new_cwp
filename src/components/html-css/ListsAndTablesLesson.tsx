import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function ListsAndTablesLesson() {
  return (
    <div>
      <Lead>
        Lists are the most-used element on the web and most of them are not visibly lists. Tables are
        the most-abused element in its history. Learn what each is for, and the one rule that decides
        between them.
      </Lead>

      <LessonSection
        id="ordered-and-unordered-differ-in-meaning-not-marker"
        title="Ordered and unordered differ in meaning, not marker"
      >
        <P>
          Two list elements, and the choice is about whether sequence carries information.
        </P>
        <CodeBlock
          label="Two kinds of list"
          code={`<!-- Order does not matter: shuffle it and nothing is lost -->
<ul>
  <li>Flour</li>
  <li>Butter</li>
  <li>Sugar</li>
</ul>

<!-- Order IS the information: step 3 after step 1 is wrong -->
<ol>
  <li>Heat the oven to 180°C.</li>
  <li>Rub the butter into the flour.</li>
  <li>Bake for 25 minutes.</li>
</ol>`}
        />
        <P>
          The visible markers — bullets or numbers — are a default you can change entirely in CSS.
          Choosing <Strong>ul</Strong> because you dislike numbers is answering the wrong question:{" "}
          <Strong>ol {"{ list-style: none; }"}</Strong> removes them while keeping the meaning.
        </P>
        <P>
          A third list type is genuinely useful and almost never used — a{" "}
          <Strong>description list</Strong>, for term-and-definition pairs.
        </P>
        <CodeBlock
          label="Description list"
          code={`<dl>
  <dt>HTML</dt>
  <dd>The structure and meaning of a page.</dd>

  <dt>CSS</dt>
  <dd>How that structure is presented.</dd>
</dl>`}
        />
        <P>
          Right for glossaries, metadata, specification tables, and FAQ pairs. A{" "}
          <Strong>dt</Strong> may have several <Strong>dd</Strong> elements, and vice versa.
        </P>
      </LessonSection>

      <LessonSection
        id="navigation-is-a-list-and-should-be-marked-up-as-one"
        title="Navigation is a list, and should be marked up as one"
      >
        <P>
          Most lists on the web do not look like lists. A navigation bar is an unordered list of
          links, styled into a horizontal row — and marking it up as one is worth doing even though
          the CSS then removes every visible trace.
        </P>
        <CodeBlock
          label="A nav bar, correctly"
          code={`<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/work/">Work</a></li>
    <li><a href="/about/">About</a></li>
  </ul>
</nav>`}
        />
        <CodeBlock
          label="And the CSS that hides that it is a list"
          code={`nav ul {
  list-style: none;   /* no bullets */
  margin: 0;
  padding: 0;
  display: flex;      /* side by side */
  gap: 1.5rem;
}`}
        />
        <Callout tone="note" title="Why bother, if the CSS removes all of it?">
          A screen reader announces &quot;list, three items&quot; before reading them, which tells a
          blind user how much navigation there is before they commit to listening to it. A row of
          bare anchors in a div announces nothing and has no end. The list is doing real work that
          happens to be invisible.
        </Callout>
        <P>
          The same reasoning covers card grids, image galleries, tag rows, comment threads, and
          search results. If it is several of the same kind of thing, it is a list.
        </P>
      </LessonSection>

      <LessonSection id="only-li-may-be-a-child-of-ul" title="Only li may be a child of ul">
        <P>
          One structural rule, broken constantly. The only permitted child of a{" "}
          <Strong>ul</Strong> or <Strong>ol</Strong> is an <Strong>li</Strong>. Anything else goes{" "}
          <em>inside</em> an li.
        </P>
        <CodeBlock
          label="Wrong, and right"
          copyable={false}
          code={`<ul>                          <ul>
  <p>Some text</p>              <li>
  <li>Item</li>                   <p>Some text</p>
</ul>                           </li>
                                <li>Item</li>
                              </ul>`}
          lineTones={{ 1: "err", 2: "err" }}
        />
        <P>
          An <Strong>li</Strong> can hold anything at all — paragraphs, headings, images, forms, and
          other lists. Nesting a list inside an li is how sub-items work, and the nested list goes{" "}
          <em>inside</em> the parent li, not between two of them.
        </P>
        <CodeBlock
          label="Nesting"
          code={`<ul>
  <li>Fruit
    <ul>
      <li>Apples</li>
      <li>Pears</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>`}
        />
      </LessonSection>

      <LessonSection id="tables-are-for-data-with-rows-and-columns" title="Tables are for data with rows and columns">
        <P>
          For most of the 1990s and 2000s, tables were how people laid out pages — there was nothing
          else. That is over, and it left tables with a bad reputation they do not deserve.
        </P>
        <P>
          The test is one question: <Strong>does a cell mean something because of the row and column
          it is in?</Strong> If yes, it is a table. If you are only after a grid of boxes, that is
          CSS grid, and chapter 18.
        </P>
        <CodeBlock
          label="A proper table"
          code={`<table>
  <caption>Course enrolment by year</caption>
  <thead>
    <tr>
      <th scope="col">Year</th>
      <th scope="col">Students</th>
      <th scope="col">Countries</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2024</th>
      <td>240</td>
      <td>18</td>
    </tr>
    <tr>
      <th scope="row">2026</th>
      <td>810</td>
      <td>132</td>
    </tr>
  </tbody>
</table>`}
        />
        <CompareGrid
          items={[
            {
              title: "A table",
              tone: "positive",
              children: (
                <P>
                  A price comparison. Match results. A timetable. Specifications. Anything where
                  &quot;the number in the 2026 row, Countries column&quot; is a meaningful sentence.
                </P>
              ),
            },
            {
              title: "Not a table",
              tone: "caution",
              children: (
                <P>
                  A photo gallery. A row of cards. A two-column page layout. A form. These are grids
                  of boxes, which is a CSS problem with a CSS answer.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="th-and-caption-are-what-make-a-table-readable"
        title="th and caption are what make a table readable"
      >
        <P>
          A table of <Strong>td</Strong> cells with no headers is a grid of numbers. The elements
          that turn it back into data are the ones people skip.
        </P>
        <LabelRows
          rows={[
            { label: "caption", text: "The table's title, and the first thing announced. Put it immediately after <table>. Visible to everyone — do not use a separate heading above the table instead." },
            { label: "th", text: "A header cell rather than a data cell. Bold and centred by default, and far more importantly, announced as the heading for its row or column." },
            { label: "scope", text: 'scope="col" or scope="row". This is the attribute that makes a table navigable: without it, a screen reader cannot reliably say which header belongs to which cell.' },
            { label: "thead / tbody", text: "Group the header rows and the body rows. Lets a long table repeat its headers when printed, and gives you something clean to style." },
          ]}
        />
        <Callout tone="warning" title="Reading a table without headers, one cell at a time">
          A sighted reader glances up a column to see what a number means. A screen reader user hears
          cells in sequence: &quot;240. 18. 2026. 810. 132.&quot; With{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">th</span> and{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">scope</span> in place, the same
          table announces &quot;2026, Students, 810&quot; — the row header and column header with
          each value. That is the entire difference, from two attributes.
        </Callout>
        <P>
          Finally: a wide table on a narrow phone has no good answer, so give it one explicitly.
        </P>
        <CodeBlock
          label="Let a wide table scroll on its own"
          code={`<div class="table-scroll">
  <table> … </table>
</div>

/* CSS */
.table-scroll { overflow-x: auto; }`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "ul when order carries no meaning, ol when it does. The bullets and numbers are a default you can remove in CSS.",
          "dl is for term-and-definition pairs: glossaries, metadata, FAQs.",
          "A nav bar is a list of links. So are card grids, galleries, and tag rows.",
          "Screen readers announce \"list, three items\", which tells a user how much is coming. A row of bare anchors announces nothing.",
          "The only valid child of ul or ol is li. Everything else goes inside one.",
          "A nested list goes inside the parent li, not between two of them.",
          "Use a table when a cell means something because of its row and column. Otherwise it is CSS grid.",
          "caption is the table's title and is announced first.",
          "th with scope=\"col\" or scope=\"row\" is what lets a screen reader say which headers a cell belongs to.",
          "Wrap wide tables in a container with overflow-x: auto so they scroll instead of breaking the page.",
        ]}
      />
    </div>
  );
}
