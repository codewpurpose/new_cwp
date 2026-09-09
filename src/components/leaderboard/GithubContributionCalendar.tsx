interface ContributionDay {
  date: string;
  count: number;
}

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function dateValue(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function calendarWeeks(days: ContributionDay[]): ContributionDay[][] {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length === 0) return [];

  const first = dateValue(sorted[0].date);
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  const last = dateValue(sorted[sorted.length - 1].date);
  const weeks: ContributionDay[][] = [];

  for (let cursor = first; cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
    const week: ContributionDay[] = [];
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(cursor);
      current.setUTCDate(cursor.getUTCDate() + day);
      const date = current.toISOString().slice(0, 10);
      week.push(byDate.get(date) ?? { date, count: 0 });
    }
    weeks.push(week);
  }
  return weeks;
}

function contributionLevel(count: number, maximum: number): number {
  if (count === 0 || maximum === 0) return 0;
  return Math.min(4, Math.ceil((count / maximum) * 4));
}

function contributionMonthLabels(weeks: ContributionDay[][]): (string | null)[] {
  let previousMonth: number | null = null;

  return weeks.map((week, index) => {
    const month = dateValue(week[0].date).getUTCMonth();
    const label = index === 0 || month !== previousMonth ? MONTHS[month] : null;
    previousMonth = month;
    return label;
  });
}

export function GithubContributionCalendar({ days }: { days: ContributionDay[] }) {
  const weeks = calendarWeeks(days);
  if (weeks.length === 0) return null;

  const maximum = Math.max(...days.map((day) => day.count), 0);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const monthLabels = contributionMonthLabels(weeks);

  return (
    <section className="mt-5 border-t border-[var(--home-hairline)] pt-5" aria-labelledby="github-calendar-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 id="github-calendar-heading" className="font-serif text-lg text-[var(--home-ink)]">
            Contributions in the last year
          </h3>
          <p className="mt-1 text-[13px] text-[var(--home-ink-soft)]">
            A daily view of activity on GitHub.
          </p>
        </div>
        <p className="flex items-baseline gap-1.5 text-[13px] text-[var(--home-ink-soft)] sm:text-right">
          <span className="font-serif text-xl leading-none tabular-nums text-[var(--home-ink)]">{total}</span>
          <span>contributions</span>
        </p>
      </div>

      <div
        className="github-contribution-scroll mt-5 overflow-x-auto rounded-lg border border-[var(--home-hairline)] bg-[var(--home-page)] p-3 pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)]"
        tabIndex={0}
        role="region"
        aria-label="GitHub contribution calendar, horizontally scrollable"
      >
        <div className="github-contribution-calendar min-w-max">
          <div className="github-contribution-months pl-8 text-[11px] text-[var(--home-ink-quiet)]" aria-hidden="true">
            {monthLabels.map((month, index) => (
              <span className="github-contribution-month" key={`${month ?? "empty"}-${index}`}>
                {month}
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <div className="github-contribution-weekdays grid w-6 shrink-0 grid-rows-7 text-[10px] leading-3 text-[var(--home-ink-quiet)]">
              {WEEKDAYS.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
            </div>
            <div
              className="github-contribution-weeks"
              role="img"
              aria-label={`${total} contributions in the last year. Darker squares represent more activity.`}
            >
              {weeks.map((week, weekIndex) => (
                <div className="github-contribution-week" key={`week-${weekIndex}`}>
                  {week.map((day) => (
                    <span
                      className="github-contribution-cell"
                      data-level={contributionLevel(day.count, maximum)}
                      aria-hidden="true"
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="github-contribution-legend mt-3 flex items-center justify-end gap-2 text-[11px] text-[var(--home-ink-quiet)]">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span className="github-contribution-cell h-3 w-3" data-level={level} key={level} aria-hidden />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
