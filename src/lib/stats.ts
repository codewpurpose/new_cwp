/**
 * The impact figures, in one place. The homepage roadmap, the Impact page
 * grid, the quote-section cards and the proof-point strip all read from here,
 * so a figure updated once is updated everywhere. (Prose and page metadata
 * still quote some of these in sentences; search for the old value when one
 * changes.)
 *
 * `to` is what CountUp animates to; `suffix` is printed after it unanimated.
 */
export interface ImpactStat {
  to: number;
  suffix: string;
  label: string;
}

export const STATS = {
  students: { to: 5000, suffix: "+", label: "Students Reached" },
  countries: { to: 150, suffix: "+", label: "Countries" },
  languages: { to: 30, suffix: "+", label: "Languages Taught" },
  minutes: { to: 20, suffix: "k", label: "Minutes of Teaching" },
  totalReached: { to: 150, suffix: "k+", label: "Total Students Reached" },
} satisfies Record<string, ImpactStat>;

/** Display order for the five-up stat rows. */
export const IMPACT_STATS: ImpactStat[] = [
  STATS.students,
  STATS.countries,
  STATS.languages,
  STATS.minutes,
  STATS.totalReached,
];

/** "5,000+" — the figure as plain text, for strips and sentences. */
export function formatStat(stat: ImpactStat): string {
  return `${stat.to.toLocaleString("en-US")}${stat.suffix}`;
}
