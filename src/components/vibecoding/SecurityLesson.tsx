import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function SecurityLesson() {
  return (
    <div>
      <Lead>
        AI-generated code fails at security in a specific and predictable way: it writes the
        version that works, and security is mostly about the versions that do not. This chapter
        is the pass you run before anything reaches real users.
      </Lead>

      <Callout tone="warning" title="Why this is not paranoia">
        The model was trained on public code, and a great deal of public code is tutorial code —
        written to demonstrate a concept with the security deliberately stripped out for
        clarity. That is a large part of what it learned &ldquo;normal&rdquo; looks like.
      </Callout>

      <LessonSection id="secrets" title="Secrets: the one that actually happens">
        <P>
          More projects are compromised by a committed API key than by anything clever. It
          happens because the fastest working version puts the key in the code.
        </P>
        <CodeBlock
          label="What you will be handed"
          code={`const stripe = new Stripe("sk_live_51H8xK2...");`}
          lineTones={{ 0: "err" }}
        />
        <CodeBlock
          label="What it should be"
          code={`const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);`}
          lineTones={{ 0: "ok" }}
        />
        <StepList
          steps={[
            { label: "Keep .env in .gitignore", detail: "Check this before your first commit, not after." },
            { label: "Commit a .env.example instead", detail: "Variable names with empty values, so collaborators know what is needed." },
            { label: "Remember that git never forgets", detail: "A key committed and then deleted is still in the history. Rotate it — deleting the line is not enough." },
          ]}
        />
      </LessonSection>

      <LessonSection id="input-is-hostile" title="Treat every input as hostile">
        <P>
          Generated code assumes input is well-formed, because in the happy path it is. Two
          consequences dominate.
        </P>
        <P>
          <Strong>Injection.</Strong> Anywhere user text gets concatenated into a query, a
          command, or HTML:
        </P>
        <CodeBlock
          label="Vulnerable"
          code={`db.query("SELECT * FROM users WHERE email = '" + email + "'");`}
          lineTones={{ 0: "err" }}
        />
        <CodeBlock
          label="Parameterised"
          code={`db.query("SELECT * FROM users WHERE email = $1", [email]);`}
          lineTones={{ 0: "ok" }}
        />
        <P>
          <Strong>Validation on the server.</Strong> Client-side checks are a convenience for
          honest users, not a control. Anyone can call your endpoint directly, and the AI will
          rarely add server-side validation unless you ask.
        </P>
      </LessonSection>

      <LessonSection id="authorisation" title="Authentication is not authorisation">
        <P>
          This is the subtle one, and the one that produces real breaches. The model reliably
          checks that someone is <Strong>logged in</Strong>. It frequently forgets to check that
          they are allowed to touch <Strong>this particular record</Strong>.
        </P>
        <CodeBlock
          label="Logged in, but whose order is it?"
          code={`const order = await db.orders.findById(params.id);
return Response.json(order);`}
          lineTones={{ 0: "err" }}
        />
        <CodeBlock
          label="Ownership checked"
          code={`const order = await db.orders.findById(params.id);
if (order.userId !== session.user.id) {
  return new Response("Not found", { status: 404 });
}
return Response.json(order);`}
          lineTones={{ 1: "ok", 2: "ok", 3: "ok" }}
        />
        <P>
          Change the id in the URL and see what happens. That single test finds this class of
          bug faster than reading ever will.
        </P>
      </LessonSection>

      <LessonSection id="the-review-prompt" title="The review prompt">
        <P>
          Ask for a security review as a separate pass, in a fresh conversation. Asking the same
          thread that wrote the code tends to produce agreement with itself.
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Review this code for security problems. Check specifically:

- secrets or credentials in source
- unvalidated user input reaching a query, command, or the DOM
- endpoints that check authentication but not ownership
- errors that leak stack traces or internal details to users
- anything that trusts data from the client

For each issue: what an attacker does, and the fix.
If you find nothing in a category, say so explicitly.`}
        />
      </LessonSection>

      <LessonSection id="before-you-ship" title="Before anything reaches real users">
        <ChecklistCard
          marker="check"
          title="The short list"
          items={[
            <>
              No secrets in the repo, and <InlineCode>.env</InlineCode> is gitignored
            </>,
            "Every database query is parameterised",
            "Every mutating endpoint validates its input on the server",
            "Every endpoint that returns a record checks who owns it",
            "Error responses say “something went wrong”, not a stack trace",
            "Dependencies installed today were checked with npm audit",
          ]}
        />
        <Callout tone="danger" title="Where to stop and get help">
          Do not vibe-code your own authentication, session handling, password storage, or
          payment processing. Use an established provider. These are the areas where a subtle
          mistake is both invisible and severe, and where the well-tested option is genuinely
          free.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "The model writes the version that works. Security is about the versions that do not.",
          "Secrets in source is the failure that actually happens. Gitignore .env before the first commit.",
          "Parameterise queries and validate on the server — client checks are convenience, not control.",
          "Authentication is not authorisation. Checking login without checking ownership is the classic breach.",
          "Run the security review in a fresh conversation, not the one that wrote the code.",
          "Never hand-roll auth, sessions, password storage, or payments.",
        ]}
      />
    </div>
  );
}
