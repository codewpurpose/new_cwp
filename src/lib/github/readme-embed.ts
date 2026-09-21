interface ContributionDay {
  date: string;
  count: number;
}

const CARD_WIDTH = 480;
const CARD_HEIGHT = 204;
const CELL_SIZE = 14;
const CELL_GAP = 4;
const GRID_X = 28;
const GRID_Y = 54;
const DAY_MS = 24 * 60 * 60 * 1000;
const LEVEL_COLORS = ["#f5ebdb", "#dbefdb", "#6d9b7f", "#3e7f5c", "#1e3c2c"];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function dateValue(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function levelFor(count: number, maximum: number): number {
  if (count === 0 || maximum === 0) return 0;
  return Math.min(4, Math.ceil((count / maximum) * 4));
}

export function renderGithubReadmeEmbed(username: string, days: ContributionDay[]): string {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const total = sortedDays.reduce((sum, day) => sum + day.count, 0);
  const maximum = Math.max(...sortedDays.map((day) => day.count), 0);
  const firstDate = sortedDays.length > 0 ? dateValue(sortedDays[0].date) : null;
  const firstDayOfWeek = firstDate?.getUTCDay() ?? 0;
  const firstTimestamp = firstDate?.getTime() ?? 0;
  const safeUsername = escapeXml(username);
  const displayUsername = username.length > 24 ? `${username.slice(0, 21)}…` : username;
  const safeDisplayUsername = escapeXml(displayUsername);
  const cells = sortedDays
    .map((day) => {
      const offset = Math.round((dateValue(day.date).getTime() - firstTimestamp) / DAY_MS);
      const column = Math.floor((firstDayOfWeek + offset) / 7);
      const row = (firstDayOfWeek + offset) % 7;
      const x = GRID_X + column * (CELL_SIZE + CELL_GAP);
      const y = GRID_Y + row * (CELL_SIZE + CELL_GAP);
      return `<rect x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="3" fill="${LEVEL_COLORS[levelFor(day.count, maximum)]}"/>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">GitHub activity for ${safeUsername}</title>
  <desc id="desc">${total} contributions in the last 30 days, shown as a daily activity grid.</desc>
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="14" fill="#fffbf5" stroke="#e0d4c4"/>
  <text x="${GRID_X}" y="30" fill="#15120c" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">${safeDisplayUsername}</text>
  <text x="${CARD_WIDTH - GRID_X}" y="30" text-anchor="end" fill="#4f483d" font-family="Arial, Helvetica, sans-serif" font-size="13">${total} contributions · 30 days</text>
  <g aria-hidden="true">${cells}</g>
  <text x="${GRID_X}" y="197" fill="#6b6255" font-family="Arial, Helvetica, sans-serif" font-size="11">Less</text>
  ${[0, 1, 2, 3, 4]
    .map((level, index) => `<rect x="${GRID_X + 32 + index * 18}" y="188" width="12" height="12" rx="3" fill="${LEVEL_COLORS[level]}"/>`)
    .join("")}
  <text x="${GRID_X + 32 + 5 * 18}" y="197" fill="#6b6255" font-family="Arial, Helvetica, sans-serif" font-size="11">More</text>
  <text x="${CARD_WIDTH - GRID_X}" y="197" text-anchor="end" fill="#6b6255" font-family="Arial, Helvetica, sans-serif" font-size="11">codewithpurpose.org</text>
</svg>`;
}
