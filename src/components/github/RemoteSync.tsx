"use client";

import { useState } from "react";

/**
 * Local, origin, and the stale third thing in between.
 *
 * The teaching target is `origin/main` — the remote-tracking branch. Almost
 * every beginner believes "2 commits behind" is a live fact about the server.
 * It is not: it is a comparison against a cached copy that only moves when you
 * fetch. This widget makes that visible by letting a teammate push while you
 * watch your own counters refuse to change.
 *
 * Commits are counted, not simulated — the numbers are what the model needs and
 * nothing here depends on their contents.
 */

interface State {
  /** Commits on your local main. */
  local: number;
  /** Commits actually on the server right now. */
  remote: number;
  /** What your machine last saw of the server: origin/main. */
  cached: number;
  /** Commits you have that the server does not. */
  unpushed: number;
}

const START: State = { local: 3, remote: 3, cached: 3, unpushed: 0 };

interface Action {
  id: string;
  label: string;
  hint: string;
  apply: (s: State) => State;
  enabled: (s: State) => boolean;
  tone: "you" | "them" | "sync";
}

const ACTIONS: readonly Action[] = [
  {
    id: "commit",
    label: "git commit",
    hint: "You make a commit. Purely local — the server has not been contacted.",
    tone: "you",
    enabled: () => true,
    apply: (s) => ({ ...s, local: s.local + 1, unpushed: s.unpushed + 1 }),
  },
  {
    id: "teammate",
    label: "a teammate pushes",
    hint: "Somebody else pushes to origin. Your machine is not told, and nothing on your side changes.",
    tone: "them",
    enabled: () => true,
    apply: (s) => ({ ...s, remote: s.remote + 1 }),
  },
  {
    id: "fetch",
    label: "git fetch",
    hint: "Downloads what the server has and updates origin/main. Your own branch is untouched.",
    tone: "sync",
    enabled: (s) => s.cached !== s.remote,
    apply: (s) => ({ ...s, cached: s.remote }),
  },
  {
    id: "pull",
    label: "git pull",
    hint: "A fetch followed by a merge. Now your branch actually moves.",
    tone: "sync",
    enabled: (s) => s.cached !== s.remote || s.remote > s.local - s.unpushed,
    apply: (s) => ({
      ...s,
      cached: s.remote,
      local: s.remote + s.unpushed,
    }),
  },
  {
    id: "push",
    label: "git push",
    hint: "Sends your commits up. Rejected if the server has commits you do not — that is the famous non-fast-forward error.",
    tone: "sync",
    enabled: (s) => s.unpushed > 0,
    apply: (s) =>
      s.remote > s.local - s.unpushed
        ? s
        : { local: s.local, remote: s.local, cached: s.local, unpushed: 0 },
  },
];

const TONE: Record<Action["tone"], string> = {
  you: "border-learn-line bg-learn-inverse text-learn-heading-on-inverse",
  them: "border-learn-info-line bg-learn-info-bg text-learn-info-fg",
  sync: "border-learn-line bg-white text-learn-strong hover:border-learn-line-strong",
};

function Stack({
  title, subtitle, count, highlight,
}: {
  title: string;
  subtitle: string;
  count: number;
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-learn-md border-[0.5px] p-4 ${
        highlight ? "border-learn-accent bg-learn-quiet-wash" : "border-learn-line bg-learn-surface"
      }`}
    >
      <p className="font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-strong">
        {title}
      </p>
      <p className="mt-0.5 text-[11.5px] leading-[1.4] text-learn-muted">{subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-full border-[0.5px] border-learn-ink"
            style={{ background: i < 3 ? "var(--learn-series-1)" : "var(--learn-series-3)" }}
          />
        ))}
      </div>
      <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-subtle">
        {count} commits
      </p>
    </div>
  );
}

export function RemoteSync() {
  const [state, setState] = useState<State>(START);
  const [message, setMessage] = useState<string>(
    "Everything is in sync. Try letting a teammate push, then look at what your counters say.",
  );

  const shared = state.local - state.unpushed;
  const ahead = state.unpushed;
  const behind = Math.max(0, state.cached - shared);
  const reallyBehind = Math.max(0, state.remote - shared);

  /**
   * Computed outside the updater on purpose. `apply` returning the same object
   * is how a rejected push is signalled, and reading that inside a setState
   * callback would fire the message twice under StrictMode's double-invoke.
   */
  const run = (action: Action) => {
    const next = action.apply(state);
    if (next === state) {
      setMessage(
        "Rejected — non-fast-forward. The server has a commit you do not, so pushing would drop it. Fetch and merge (or pull) first, then push. This is the exact error that sends people looking for --force, which throws away your teammate's work.",
      );
      return;
    }
    setState(next);
    setMessage(action.hint);
  };

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Two repositories and one cached opinion about the second
      </figcaption>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Stack
          title="main"
          subtitle="Your branch, on your machine."
          count={state.local}
          highlight={ahead > 0}
        />
        <Stack
          title="origin/main"
          subtitle="Your machine's cached snapshot of the server. Only git fetch moves this."
          count={state.cached}
          highlight={state.cached !== state.remote}
        />
        <Stack
          title="the server"
          subtitle="What is genuinely on GitHub right now. You cannot see this without asking."
          count={state.remote}
          highlight={false}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <p className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-sunken px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
          git status: ahead {ahead}, behind {behind}
        </p>
        <p
          className={`rounded-[6px] border-[0.5px] px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] ${
            reallyBehind === behind
              ? "border-learn-success-line bg-learn-success-bg text-learn-success-fg"
              : "border-learn-warning-line bg-learn-warning-bg text-learn-warning-fg"
          }`}
        >
          actually behind: {reallyBehind}
          {reallyBehind === behind ? "  (matches)" : "  (status is stale)"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={!action.enabled(state)}
            onClick={() => run(action)}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] disabled:cursor-not-allowed disabled:opacity-35 ${TONE[action.tone]}`}
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setState(START);
            setMessage("Reset. Everything is in sync again.");
          }}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[12px] font-medium text-learn-muted hover:text-learn-strong"
        >
          Reset
        </button>
      </div>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {message}
      </p>
    </figure>
  );
}
