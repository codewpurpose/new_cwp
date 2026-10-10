export function LeaderboardExplainer() {
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
          Learn, practise, level up
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-[var(--home-ink-soft)]">
          Pass lesson quick checks to earn XP, unlock badges, and climb the
          leaderboard. Your score reflects your course progress.
        </p>
      </div>
    </div>
  );
}
