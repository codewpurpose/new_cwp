"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { isClerkConfigured } from "@/lib/clerk";
import { avatarSrc, levelInfo } from "@/lib/student";
import { DASHBOARD_HREF, LOGIN_HREF } from "@/lib/links";

interface Row {
  id: string;
  display_name: string;
  avatar: string;
  xp: number;
}

/** Shown until both Clerk and Supabase are configured. */
function ComingSoon() {
  return (
    <div className="home-card mx-auto max-w-xl p-8 text-center">
      <h2 className="font-serif text-2xl">The leaderboard is almost here</h2>
      <p className="mt-3 text-[15px] text-[var(--home-ink-soft)]">
        Ranking students against each other needs accounts switched on. Until then,
        keep stacking XP — it&apos;s all saved on your device and ready to count the
        moment the leaderboard goes live.
      </p>
      <Link href={DASHBOARD_HREF} className="home-btn home-btn-fill mt-6 inline-flex">
        Go to My Progress
      </Link>
    </div>
  );
}

export function Leaderboard() {
  if (!isClerkConfigured || !isSupabaseConfigured) return <ComingSoon />;
  return <LeaderboardLive />;
}

function LeaderboardLive() {
  const { user } = useUser();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let active = true;
    supabase
      .from("profiles")
      .select("id, display_name, avatar, xp")
      .order("xp", { ascending: false })
      .limit(50)
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setRows((data as Row[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <p className="mx-auto max-w-xl text-center text-[14px] text-[var(--home-ink-soft)]">
        Couldn&apos;t load the leaderboard right now. Please try again shortly.
      </p>
    );
  }

  if (rows === null) {
    return (
      <p className="mx-auto max-w-xl text-center text-[14px] text-[var(--home-ink-soft)]">
        Loading the leaderboard…
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {!user && (
        <div className="home-card mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <span className="text-[14px] text-[var(--home-ink-soft)]">
            Log in to claim your spot and appear here.
          </span>
          <Link href={LOGIN_HREF} className="home-btn home-btn-fill">
            Log in
          </Link>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-center text-[14px] text-[var(--home-ink-soft)]">
          No one&apos;s on the board yet — be the first.
        </p>
      ) : (
        <ol className="flex flex-col gap-2">
          {rows.map((row, i) => {
            const me = user?.id === row.id;
            return (
              <li
                key={row.id}
                className={`home-card flex items-center gap-4 p-3 ${
                  me ? "ring-2 ring-[var(--home-moss)]" : ""
                }`}
              >
                <span className="w-8 shrink-0 text-center font-serif text-lg text-[var(--home-ink-soft)]">
                  {i + 1}
                </span>
                <Image
                  src={avatarSrc(row.avatar)}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {row.display_name}
                  {me && <span className="ml-2 text-[13px] text-[var(--home-ink-soft)]">(you)</span>}
                </span>
                <span className="shrink-0 text-right text-[13px] text-[var(--home-ink-soft)]">
                  Lv {levelInfo(row.xp).level}
                </span>
                <span className="w-20 shrink-0 text-right font-medium tabular-nums">
                  {row.xp} XP
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
