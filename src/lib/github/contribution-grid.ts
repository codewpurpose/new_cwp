export interface ContributionDay {
  date: string;
  count: number;
}

export const CONTRIBUTION_LEVEL_COLORS = [
  "#f5ebdb",
  "#dbefdb",
  "#6d9b7f",
  "#3e7f5c",
  "#1e3c2c",
] as const;

export function contributionDateValue(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

export function contributionLevel(count: number, maximum: number): number {
  if (count === 0 || maximum === 0) return 0;
  return Math.min(4, Math.ceil((count / maximum) * 4));
}
