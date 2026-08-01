import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function McpAndToolsLesson() {
  return (
    <div>
      <Lead>
        Everything so far has assumed the model can only read your files. Tools change that: they
        let it check reality — query your database, open your page in a browser, read the actual
        issue — instead of reasoning about what is probably there.
      </Lead>

      <LessonSection id="why-this-matters" title="Why this changes the failure mode">
        <P>
          Recall why models invent things: when they cannot see something, they produce the most
          plausible version of it. Tools attack that at the root.
        </P>
        <CompareGrid
          items={[
            {
              title: "Without tools",
              tone: "caution",
              children: (
                <p>
                  &ldquo;Your users table probably has an <InlineCode>email</InlineCode> column,
                  so here is a query.&rdquo; Plausible, confident, and possibly wrong.
                </p>
              ),
            },
            {
              title: "With a database tool",
              tone: "positive",
              children: (
                <p>
                  It runs a schema query, sees the column is actually{" "}
                  <InlineCode>email_address</InlineCode>, and writes a query that works the
                  first time.
                </p>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-mcp-is" title="What MCP actually is">
        <P>
          The Model Context Protocol is a shared standard for connecting an AI tool to an
          external system. Before it, every editor needed a bespoke integration for every
          service. With it, a server written once works with any client that speaks the
          protocol.
        </P>
        <P>
          Practically, you install a small server, tell your AI tool about it, and the model
          gains a set of actions it can call. Nothing about your prompting changes — the model
          simply has more ways to find things out.
        </P>
        <StepList
          steps={[
            { label: "A filesystem server", detail: "Read and write files outside the current project." },
            { label: "A database server", detail: "Inspect schemas and run read-only queries." },
            { label: "A browser server", detail: "Open a page, click things, and read what actually rendered." },
            { label: "An issue-tracker server", detail: "Read the ticket rather than being told a summary of it." },
          ]}
        />
      </LessonSection>

      <LessonSection id="setting-one-up" title="Setting one up">
        <P>
          Configuration is a JSON file naming the servers to launch. The exact path differs per
          tool, but the shape is consistent:
        </P>
        <CodeBlock
          label="mcp.json"
          code={`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "\${DATABASE_URL}" }
    }
  }
}`}
        />
        <P>
          Note the environment variable rather than a literal connection string. This file gets
          committed; your credentials must not be in it.
        </P>
        <Callout tone="warning" title="Least privilege, always">
          Give a database tool a read-only user. The point is to let the model{" "}
          <Strong>check</Strong> reality, not rewrite it — and a confused agent with write
          access to production is a genuinely bad afternoon.
        </Callout>
      </LessonSection>

      <LessonSection id="the-browser-tool" title="The one worth setting up first">
        <P>
          If you only add one, make it a browser tool. It closes the loop that is otherwise
          longest and most tedious: the model changes CSS, cannot see the result, and asks you
          whether it worked.
        </P>
        <CodeBlock
          variant="prompt"
          label="What becomes possible"
          code={`The mobile nav overlaps the header below 400px. Open the page
at 375px wide, look at it, fix the CSS, then check it again
and show me the result.`}
        />
        <P>
          That is a full observe-change-verify cycle with you out of the middle. It is also
          where AI assistance starts feeling qualitatively different rather than just faster.
        </P>
      </LessonSection>

      <LessonSection id="the-risks" title="The risks, stated plainly">
        <P>
          Tools give a model the ability to act on the world, so the honest framing is that you
          are widening what a mistake can reach.
        </P>
        <StepList
          steps={[
            { label: "Scope every credential down", detail: "Read-only where possible; a scratch database rather than production." },
            { label: "Read what it proposes before approving", detail: "Especially anything that deletes, migrates, or installs." },
            { label: "Only install servers you trust", detail: "An MCP server runs code on your machine with your permissions." },
            { label: "Watch for injected instructions", detail: "Content the model fetches — an issue body, a web page — can contain text designed to look like instructions. Treat fetched data as data, never as commands." },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Tools let the model check reality instead of predicting it — that is the whole value.",
          "MCP is a shared protocol, so one server works across tools rather than per-editor integrations.",
          "Reference credentials from the environment. The config file gets committed.",
          "Read-only by default. Widen access only when you have a specific reason.",
          "A browser tool is the highest-value first addition: it closes the observe-change-verify loop.",
          "Content the model fetches is data, not instructions — that distinction is a real attack surface.",
        ]}
      />
    </div>
  );
}
