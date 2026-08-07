"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The script-placement matrix: class × parent → does it run, and where.
 *
 * Written out as a literal table rather than derived from a rule, because the
 * rule has genuine exceptions (ModuleScript never self-starts anywhere;
 * ReplicatedStorage starts nothing) and a table that lists them is more honest
 * than a formula that pretends they do not exist.
 */

type Klass = "Script" | "LocalScript" | "ModuleScript";
type Parent = "Workspace" | "ServerScriptService" | "StarterPlayerScripts" | "ReplicatedStorage";

const KLASSES: readonly { value: Klass; label: string }[] = [
  { value: "Script", label: "Script" },
  { value: "LocalScript", label: "LocalScript" },
  { value: "ModuleScript", label: "ModuleScript" },
];

const PARENTS: readonly { value: Parent; label: string }[] = [
  { value: "Workspace", label: "Workspace" },
  { value: "ServerScriptService", label: "ServerScriptService" },
  { value: "StarterPlayerScripts", label: "StarterPlayerScripts" },
  { value: "ReplicatedStorage", label: "ReplicatedStorage" },
];

type Verdict = "server" | "client" | "never";

interface Result {
  verdict: Verdict;
  note: string;
}

const TABLE: Record<Klass, Record<Parent, Result>> = {
  Script: {
    Workspace: {
      verdict: "server",
      note: "Runs on the server. This is where a killbrick's script lives — inside the part it belongs to, so the part and its behaviour move together.",
    },
    ServerScriptService: {
      verdict: "server",
      note: "Runs on the server, and players cannot see the source at all. The right home for anything a cheater must not read.",
    },
    StarterPlayerScripts: {
      verdict: "never",
      note: "Nothing starts it. This container is copied to each player's own machine, and a plain Script is a server object — it lands somewhere it will never be run.",
    },
    ReplicatedStorage: {
      verdict: "never",
      note: "ReplicatedStorage is a shelf, not a runner. Objects here are visible to both sides and started by nobody.",
    },
  },
  LocalScript: {
    Workspace: {
      verdict: "never",
      note: "A LocalScript in Workspace does not run. It is the single most common reason a beginner's code appears to do nothing at all.",
    },
    ServerScriptService: {
      verdict: "never",
      note: "Never runs. The server does not execute LocalScripts, and this container is not replicated to any client that could.",
    },
    StarterPlayerScripts: {
      verdict: "client",
      note: "Runs on one player's machine, once, when they join. Camera work, key input, and interface code belong here.",
    },
    ReplicatedStorage: {
      verdict: "never",
      note: "Visible to the client and started by nobody. Fine as a place to keep one you will clone somewhere else.",
    },
  },
  ModuleScript: {
    Workspace: { verdict: "never", note: "A ModuleScript never starts itself, anywhere. It runs the first time something calls require() on it, and returns one value." },
    ServerScriptService: { verdict: "never", note: "Same answer: it waits. This is the usual home for shared server logic that several Scripts require()." },
    StarterPlayerScripts: { verdict: "never", note: "Still waits. It runs when a LocalScript on that player's machine requires it." },
    ReplicatedStorage: { verdict: "never", note: "The classic placement. Both the server and every client can require() it from here, which is exactly what shared code needs." },
  },
};

const VERDICT_LABEL: Record<Verdict, string> = {
  server: "Runs — on the server",
  client: "Runs — on one player's machine",
  never: "Does not run on its own",
};

const VERDICT_CLASS: Record<Verdict, string> = {
  server: "border-learn-success-line bg-learn-success-bg text-learn-success-fg",
  client: "border-learn-info-line bg-learn-info-bg text-learn-info-fg",
  never: "border-learn-danger-line bg-learn-danger-bg text-learn-danger-fg",
};

export function ScriptPlacement() {
  const [klass, setKlass] = useState<Klass>("Script");
  const [parent, setParent] = useState<Parent>("Workspace");
  const result = TABLE[klass][parent];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Same code, twelve homes — which ones start it
      </figcaption>

      <div className="mt-4 space-y-3">
        <SegmentedControl variant="chips" label="Script class" options={KLASSES} value={klass} onValueChange={setKlass} />
        <SegmentedControl variant="chips" label="Parent object" options={PARENTS} value={parent} onValueChange={setParent} />
      </div>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-dim">
          {`game.${parent === "StarterPlayerScripts" ? "StarterPlayer.StarterPlayerScripts" : parent}`}
        </p>
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {`  └─ ${klass}  "Hello.luau"`}
        </p>
      </div>

      <div className={`mt-4 rounded-[6px] border-[0.5px] px-4 py-3 ${VERDICT_CLASS[result.verdict]}`}>
        <p className="text-[14px] font-semibold">{VERDICT_LABEL[result.verdict]}</p>
        <p className="mt-1 text-[13px] leading-[1.6]">{result.note}</p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Seven of these twelve placements do nothing. Nothing in Studio warns you about any of them — the script sits in the Explorer looking exactly like one that works, and the Output window stays empty.
      </p>
    </figure>
  );
}
