"use client";

import dynamic from "next/dynamic";

/**
 * The playground starts from a share link or the student's saved code, both
 * of which only exist in the browser. Rendering it client-only avoids a
 * server render of the Hello starter that would then swap to different code
 * on hydration. The skeleton holds the same footprint so nothing jumps.
 *
 * This chunk is the editor UI only. Pyodide itself is not fetched until the
 * first Run.
 */
const Playground = dynamic(() => import("./Playground").then((mod) => mod.Playground), {
  ssr: false,
  loading: () => <PlaygroundSkeleton />,
});

export function PlaygroundIsland() {
  return <Playground />;
}

function PlaygroundSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading the code playground">
      <div className="flex flex-wrap items-end gap-3">
        <div className="h-[3.6rem] w-56 rounded-lg bg-[var(--home-grey-400)]" />
        <div className="h-10 w-28 rounded-lg bg-[var(--home-grey-400)]" />
        <div className="h-10 w-20 rounded-lg bg-[var(--home-grey-400)]" />
      </div>
      <div className="mt-5 h-12 rounded-2xl bg-[var(--home-grey-400)]" />
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="h-[24.75rem] rounded-learn-lg bg-learn-code-bg" />
        <div className="h-[17.5rem] rounded-learn-lg bg-learn-code-bg" />
      </div>
    </div>
  );
}
