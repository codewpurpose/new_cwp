import Link from "next/link";
import {
  COMMITS_LEADERBOARD_HREF,
  LEADERBOARD_HREF,
} from "@/lib/links";

type LeaderboardKind = "xp" | "commits";

export function LeaderboardExplainer({
  current,
}: {
  current: LeaderboardKind;
}) {
  return (
    <div
      className="home-card rounded-[20px] p-5 md:p-7"
      aria-labelledby="leaderboard-progress-title"
    >
      <div className="max-w-2xl">
        <h2
          id="leaderboard-progress-title"
          className="home-display text-[1.65rem] leading-tight tracking-[-0.015em] md:text-[2rem]"
        >
          Two kinds of progress
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-[var(--home-ink-soft)]">
          Your account can show both, but they measure different things.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 md:p-5 ${
            current === "xp"
              ? "border-[var(--home-fern)] bg-[#f3f8f1]"
              : "border-[var(--home-hairline)] bg-[var(--home-page)]"
          }`}
        >
          <p className="text-sm font-semibold text-[var(--home-ink)]">
            Course XP
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--home-ink-soft)]">
            Pass lesson quick checks to earn XP, level up, and track course
            progress. This is the score used for badges and the XP leaderboard.
          </p>
          {current === "xp" ? (
            <p className="mt-4 text-sm font-medium text-[var(--home-link-green)]">
              You are viewing the XP leaderboard.
            </p>
          ) : (
            <Link
              href={LEADERBOARD_HREF}
              className="home-arrow-link mt-4 inline-flex text-sm font-medium"
            >
              View XP leaderboard
            </Link>
          )}
        </div>

        <div
          className={`rounded-xl border p-4 md:p-5 ${
            current === "commits"
              ? "border-[var(--home-fern)] bg-[#f3f8f1]"
              : "border-[var(--home-hairline)] bg-[var(--home-page)]"
          }`}
        >
          <p className="text-sm font-semibold text-[var(--home-ink)]">
            GitHub commits
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--home-ink-soft)]">
            Look up or link a GitHub account to show commit history. GitHub
            activity does not add XP, change your level, or unlock lessons.
          </p>
          {current === "commits" ? (
            <p className="mt-4 text-sm font-medium text-[var(--home-link-green)]">
              You are viewing the commits leaderboard.
            </p>
          ) : (
            <Link
              href={COMMITS_LEADERBOARD_HREF}
              className="home-arrow-link mt-4 inline-flex text-sm font-medium"
            >
              View commits leaderboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
