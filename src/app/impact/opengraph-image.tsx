import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";
import { STATS, formatStat } from "@/lib/stats";

export const alt = `CodeWithPurpose impact: students in ${formatStat(STATS.countries)} countries`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ eyebrow: "Our impact", title: `Students in ${formatStat(STATS.countries)} countries` });
}
