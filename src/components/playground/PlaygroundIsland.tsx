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
    <div role="status" aria-busy="true" aria-label="Loading the code playground">
      <div className="h-[3.6rem] w-full rounded-2xl bg-[var(--home-grey-400)] sm:w-[27rem]" />
      <div className="mt-6 h-4 w-44 rounded bg-[var(--home-grey-400)]" />
      <div className="mt-2.5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="h-11 rounded-xl sm:h-[3.75rem] bg-[var(--home-grey-400)]" />
        ))}
      </div>
      <div className="mt-5 h-[3.6rem] rounded-2xl bg-[var(--home-grey-400)]" />
      <div className="mt-4 h-11 rounded-2xl bg-[var(--home-grey-400)]" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="h-[27.25rem] rounded-2xl bg-learn-code-bg" />
        <div className="h-[20.75rem] rounded-2xl bg-learn-code-bg" />
      </div>
    </div>
  );
}
