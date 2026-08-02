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
        <Callout tone="warning" title="The other way secrets leak">
          Committing a key is not the only path. Pasting a <InlineCode>.env</InlineCode> file, a
          stack trace with an authorisation header, or a config dump into a chat window hands
          the same secret to a tool whose logging and retention you do not control. Redact
          before you paste, or describe the shape of the problem instead — the model rarely
          needs the live value to help.
        </Callout>
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

      <LessonSection id="instructions-hiding-in-what-it-reads" title="Instructions hiding in what it reads">
        <P>
          A tool-using AI that reads a file, a web page, a support ticket, or a pull request
          cannot reliably tell your instructions apart from text sitting inside that content. A
          sentence written to look like an instruction — buried in a scraped page, an issue
          description, or a comment in a data file — can get followed by a model that is, by
          design, disposed to follow instructions wherever it finds them.
        </P>
        <P>
          This is a different failure from a user typing something malicious. Nobody at the
          keyboard asked for it. An agent summarising a ticket that contains a hidden line
          telling it to paste out environment variables, or a browsing agent that lands on a page
          seeded with text aimed at agents rather than people, can act on it without either of
          you noticing until afterwards.
        </P>
        <Callout tone="danger" title="What to actually do about it">
          Treat anything fetched from outside your own repository — a scraped page, a submitted
          ticket, an attached file — as data, not instruction. Where you can, separate the fetch
          from the act: review what came back before the same session is allowed to send, write,
          or spend anything on the strength of it. Never combine &ldquo;reads untrusted
          content&rdquo; with &ldquo;can take irreversible action&rdquo; in the same run.
        </Callout>
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

      <LessonSection id="dependencies-it-invents" title="Dependencies it invents, and dependencies that impersonate">
        <P>
          Models occasionally suggest importing a package that does not exist — a plausible
          name, a plausible API, invented outright. That is harmless until someone registers
          that exact name and fills it with something malicious, betting that enough developers
          will install a hallucinated suggestion without checking first. It has a name —
          slopsquatting — because it is a documented pattern, not a hypothetical.
        </P>
        <P>
          The more common version is older: a package one character or one hyphen removed from a
          popular real one. Typosquatting works on humans because a tired developer skims a name
          rather than reading it. It works even better on generated code, where you never typed
          the name yourself and have nothing to compare it against.
        </P>
        <StepList
          steps={[
            {
              label: "Check the package exists before installing it",
              detail: "Look it up on the registry — download counts, repository link, a maintainer with history. A successful install proves nothing on its own.",
            },
            {
              label: "Read the name character by character",
              detail: "Typosquats are built to survive a skim, not a careful read.",
            },
            {
              label: "Pin versions and read the diff on updates",
              detail: "A clean initial install does not protect you from a compromised update later.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="how-much-the-agent-can-touch" title="How much the agent can touch">
        <P>
          A tool-using agent is only as safe as the permissions behind it. One that can read
          files is low risk. The same agent given permission to run shell commands, push to a
          remote, or call a paid API is a different proposition — a bad instruction, including an
          injected one, can now act rather than just suggest.
        </P>
        <P>
          Broad grants are convenient precisely because they mean fewer interruptions.
          &ldquo;Always allow&rdquo; is one click, and it is exactly the click that turns any of
          the failure modes above from an annoying suggestion into something that already ran.
        </P>
        <StepList
          steps={[
            {
              label: "Grant the narrowest scope the task needs",
              detail: "Read access for research. Write access scoped to the directory in play. Network access limited to the endpoints the task actually calls.",
            },
            {
              label: "Keep destructive actions behind a confirmation step",
              detail: "Deleting files, force-pushing, sending anything external — these are worth the extra click every time.",
            },
            {
              label: "Review a permission grant like you would review a diff",
              detail: "“Always allow shell commands” carries the same weight as merging a PR without reading it.",
            },
          ]}
        />
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
- dependencies that do not resolve to a real, maintained package
- instructions embedded in fetched content the agent might act on

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
            "Every dependency added this session is a real, correctly-named package",
            "Any agent that reads external content cannot also send data out or spend money in the same run",
          ]}
        />
        <Callout tone="danger" title="Where to stop and get help">
          Do not vibe-code your own authentication, session handling, password storage, or
          payment processing. Use an established provider. These are the areas where a subtle
          mistake is both invisible and severe, and where the well-tested option is free.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "The model writes the version that works. Security is about the versions that do not.",
          "Secrets in source is the failure that actually happens. Gitignore .env before the first commit — and redact before you paste one into a prompt too.",
          "Parameterise queries and validate on the server — client checks are convenience, not control.",
          "Authentication is not authorisation. Checking login without checking ownership is the classic breach.",
          "Content the model reads is not automatically trustworthy. Treat a fetched page, ticket, or file as data, not instruction.",
          "Check that a suggested dependency actually exists before installing it. Hallucinated and typosquatted names are a live attack, not a hypothetical.",
          "Scope agent permissions to the task. “Always allow” on shell or network access turns every other mistake on this list into one that already ran.",
          "Never hand-roll auth, sessions, password storage, or payments.",
        ]}
      />
    </div>
  );
}
