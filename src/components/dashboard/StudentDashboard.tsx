"use client";

import { type CSSProperties, useState } from "react";
import Link from "next/link";
import { chapterHref } from "@/lib/learn-nav";
import { ACHIEVEMENTS, avatarSrc, levelInfo, themeById } from "@/lib/student";
import { COURSES, TOTAL_CHAPTERS, courseProgress } from "@/lib/student-courses";
import { TOOLKIT_HREF } from "@/lib/links";
import { useStudent } from "@/components/dashboard/useStudent";
import { Whiteboard } from "@/components/dashboard/Whiteboard";

type Tab = "hub" | "courses" | "rewards" | "badges" | "whiteboard";
const TABS: { id: Tab; label: string }[] = [
  { id: "hub", label: "Overview" },
  { id: "courses", label: "My Courses" },
  { id: "rewards", label: "Rewards" },
  { id: "badges", label: "Badges" },
  { id: "whiteboard", label: "Whiteboard" },
];

function Ring({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--home-hairline)" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="var(--dash-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
      />
    </svg>
  );
}

export function StudentDashboard() {
  const { state, loaded, derived, earned, avatars, themes, actions } = useStudent();
  const [tab, setTab] = useState<Tab>("hub");

  if (!loaded) {
    return <div className="mx-auto mt-20 h-8 w-40 animate-pulse rounded-full bg-[var(--home-grey-450)]" />;
  }

  const theme = themeById(state.theme);
  const lvl = levelInfo(state.xp);
  const style = { "--dash-accent": theme.accent, "--dash-soft": theme.soft } as CSSProperties;

  // Next thing to continue: first unchecked chapter of a started-but-unfinished course.
  let resume: { title: string; href: string } | null = null;
  for (const c of COURSES) {
    const done = state.progress[c.id] || [];
    if (done.length === 0 || done.length >= c.chapters.length) continue;
    const next = c.chapters.find((ch) => !done.includes(ch.slug));
    if (next) {
      resume = { title: `${next.title} · ${c.title}`, href: chapterHref(c.id, next.slug) };
      break;
    }
  }

  return (
    <div style={style}>
      {/* Header */}
      <div className="home-card flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-8">
        <div className="flex items-center gap-4">
          <span
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
            style={{ background: "var(--dash-soft)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc(state.avatar)} alt="Your Koda" className="h-16 w-16 object-contain" />
          </span>
          <div>
            <p className="text-sm text-[var(--home-ink-quiet)]">Welcome back</p>
            <input
              value={state.name}
              onChange={(e) => actions.setName(e.target.value)}
              placeholder="Add your name"
              className="home-serif w-full max-w-[16rem] bg-transparent text-2xl outline-none placeholder:text-[var(--home-ink-quiet)] md:text-[1.75rem]"
            />
            <p className="mt-0.5 text-sm text-[var(--home-ink-soft)]">
              🔥 {state.streakDays}-day streak
            </p>
          </div>
        </div>

        <div className="flex-1 md:px-8">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium" style={{ color: "var(--dash-accent)" }}>
              Level {lvl.level}
            </span>
            <span className="text-[var(--home-ink-quiet)]">
              {lvl.into}/{lvl.span} XP · {state.xp} total
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--home-grey-450)]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${(lvl.into / lvl.span) * 100}%`, background: "var(--dash-accent)" }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "text-white"
                : "home-card text-[var(--home-ink-soft)] hover:text-[var(--home-ink)]"
            }`}
            style={tab === t.id ? { background: "var(--dash-accent)" } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "hub" && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="home-card flex items-center gap-4 rounded-2xl p-6">
              <Ring pct={derived.overallPct} />
              <div>
                <p className="text-2xl font-semibold">{derived.overallPct}%</p>
                <p className="text-sm text-[var(--home-ink-soft)]">
                  {derived.completed} of {TOTAL_CHAPTERS} chapters done
                </p>
              </div>
            </div>
            <div className="home-card grid grid-cols-3 items-center gap-2 rounded-2xl p-6 text-center">
              <div>
                <p className="text-2xl font-semibold">{derived.coursesStarted}</p>
                <p className="text-xs text-[var(--home-ink-quiet)]">started</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{derived.coursesDone}</p>
                <p className="text-xs text-[var(--home-ink-quiet)]">finished</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{earned.length}</p>
                <p className="text-xs text-[var(--home-ink-quiet)]">badges</p>
              </div>
            </div>

            {resume ? (
              <Link href={resume.href} className="home-card home-lift rounded-2xl p-6 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
                  Pick up where you left off
                </p>
                <p className="mt-1 text-lg font-medium">{resume.title} →</p>
              </Link>
            ) : (
              <div className="home-card rounded-2xl p-6 md:col-span-2">
                <p className="text-lg font-medium">Start a course to build your streak 🐨</p>
                <p className="mt-1 text-sm text-[var(--home-ink-soft)]">
                  Head to <span className="font-medium">My Courses</span> and tick off your first chapter.
                </p>
              </div>
            )}

            <Link href={TOOLKIT_HREF} className="home-card home-lift rounded-2xl p-6">
              <p className="text-lg font-medium">📝 Learning Toolkit</p>
              <p className="mt-1 text-sm text-[var(--home-ink-soft)]">Note templates you can fill in and save.</p>
            </Link>
            <button
              type="button"
              onClick={() => setTab("whiteboard")}
              className="home-card home-lift rounded-2xl p-6 text-left"
            >
              <p className="text-lg font-medium">🎨 Whiteboard</p>
              <p className="mt-1 text-sm text-[var(--home-ink-soft)]">Sketch an idea and save it to your device.</p>
            </button>
          </div>
        )}

        {tab === "courses" && (
          <div className="flex flex-col gap-4">
            {COURSES.map((c) => {
              const { done, total, pct } = courseProgress(state, c);
              const doneList = state.progress[c.id] || [];
              return (
                <details key={c.id} className="home-card rounded-2xl p-5">
                  <summary className="flex cursor-pointer items-center gap-4 list-none">
                    <Ring pct={pct} />
                    <span className="flex-1">
                      <span className="block text-lg font-medium">{c.title}</span>
                      <span className="block text-sm text-[var(--home-ink-soft)]">
                        {done}/{total} chapters · {pct}%
                      </span>
                    </span>
                    <Link
                      href={c.href}
                      onClick={(e) => e.stopPropagation()}
                      className="home-btn home-btn-outline !py-1.5 shrink-0"
                    >
                      Open
                    </Link>
                  </summary>
                  <ul className="mt-4 max-h-72 space-y-1 overflow-auto pr-1">
                    {c.chapters.map((ch) => {
                      const checked = doneList.includes(ch.slug);
                      return (
                        <li key={ch.slug}>
                          <Link
                            href={chapterHref(c.id, ch.slug)}
                            className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--home-grey-450)]"
                          >
                            <span
                              aria-hidden="true"
                              className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] text-white"
                              style={
                                checked
                                  ? { background: "var(--dash-accent)", borderColor: "var(--dash-accent)" }
                                  : { borderColor: "var(--home-hairline)" }
                              }
                            >
                              {checked ? "✓" : ""}
                            </span>
                            <span className={`text-sm ${checked ? "text-[var(--home-ink-quiet)] line-through" : ""}`}>
                              {ch.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              );
            })}
            <p className="text-xs text-[var(--home-ink-quiet)]">
              Chapters check off automatically when you pass their quick check at the end of the lesson —
              that&apos;s how progress is verified. Each is worth 20 XP.
            </p>
          </div>
        )}

        {tab === "rewards" && (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-lg font-medium">Koda avatars</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {avatars.map((a) => {
                  const unlocked = state.unlocked.includes(a.id);
                  const equipped = state.avatar === a.id;
                  return (
                    <div key={a.id} className="home-card rounded-xl p-4 text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.src}
                        alt={a.label}
                        className={`mx-auto h-20 w-20 object-contain ${unlocked ? "" : "opacity-30 grayscale"}`}
                      />
                      <p className="mt-2 text-sm font-medium">{a.label}</p>
                      {equipped ? (
                        <p className="mt-2 text-xs font-medium" style={{ color: "var(--dash-accent)" }}>
                          Equipped
                        </p>
                      ) : unlocked ? (
                        <button
                          type="button"
                          onClick={() => actions.equipAvatar(a.id)}
                          className="home-btn home-btn-outline mt-2 !py-1 !text-xs"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={state.xp < a.cost}
                          onClick={() => actions.unlock(a.id, a.cost)}
                          className="home-btn home-btn-fill mt-2 !py-1 !text-xs disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {state.xp >= a.cost ? "Unlock" : `${a.cost} XP`}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Themes</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {themes.map((t) => {
                  const unlocked = state.unlocked.includes(t.id);
                  const equipped = state.theme === t.id;
                  return (
                    <div key={t.id} className="home-card rounded-xl p-4 text-center">
                      <span className="mx-auto block h-10 w-10 rounded-full" style={{ background: t.accent }} />
                      <p className="mt-2 text-sm font-medium">{t.label}</p>
                      {equipped ? (
                        <p className="mt-2 text-xs font-medium" style={{ color: "var(--dash-accent)" }}>
                          Active
                        </p>
                      ) : unlocked ? (
                        <button
                          type="button"
                          onClick={() => actions.equipTheme(t.id)}
                          className="home-btn home-btn-outline mt-2 !py-1 !text-xs"
                        >
                          Use
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={state.xp < t.cost}
                          onClick={() => actions.unlock(t.id, t.cost)}
                          className="home-btn home-btn-fill mt-2 !py-1 !text-xs disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {state.xp >= t.cost ? "Unlock" : `${t.cost} XP`}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === "badges" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {ACHIEVEMENTS.map((a) => {
              const got = earned.some((e) => e.id === a.id);
              return (
                <div
                  key={a.id}
                  className={`home-card rounded-xl p-5 text-center ${got ? "" : "opacity-55"}`}
                >
                  <span className="text-3xl">{got ? a.emoji : "🔒"}</span>
                  <p className="mt-2 text-sm font-medium">{a.name}</p>
                  <p className="mt-1 text-xs text-[var(--home-ink-quiet)]">{a.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {tab === "whiteboard" && (
          <div className="home-card rounded-2xl p-5 md:p-6">
            <Whiteboard />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between text-xs text-[var(--home-ink-quiet)]">
        <span>Everything here is saved on your device — no account needed.</span>
        <button type="button" onClick={actions.reset} className="underline hover:text-[var(--home-ink)]">
          Reset my progress
        </button>
      </div>
    </div>
  );
}
