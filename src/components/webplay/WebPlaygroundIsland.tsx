"use client";

import dynamic from "next/dynamic";

/**
 * The full editor starts from a share link or this browser's saved code, both
 * of which only exist on the client, so it renders client-only. The skeleton
 * holds the same footprint so nothing jumps when it arrives.
 */
const WebPlaygroundFull = dynamic(() => import("./WebPlaygroundFull").then((mod) => mod.WebPlaygroundFull), {
  ssr: false,
  loading: () => <WebPlaygroundSkeleton />,
});

export function WebPlaygroundIsland() {
  return <WebPlaygroundFull />;
}

function WebPlaygroundSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading the web editor">
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="h-10 w-32 rounded-full bg-[var(--home-grey-400)]" />
        ))}
      </div>
      <div className="mt-3 h-6" />
      <div className="mt-5 h-[calc(min(30rem,60vh)+3.25rem)] rounded-2xl bg-[var(--home-grey-400)]" />
    </div>
  );
}
