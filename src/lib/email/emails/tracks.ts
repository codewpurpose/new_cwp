import type { EmailLink } from "../layout";
import { SITE_URL } from "@/lib/links";

/**
 * The seven track indexes, as email links.
 *
 * Shared by every email that offers a starting point, so the chapter counts
 * live in one place rather than drifting between messages.
 *
 * Every href is a track *index*, which is open to signed-out visitors.
 * Individual chapters sit behind the sign-in gate in `proxy.ts`, so linking one
 * from an email can drop the reader straight into a login wall.
 */
export const TRACK_LINKS: EmailLink[] = [
  { label: "Python", href: `${SITE_URL}/learn/python/`, note: "31 chapters — start from nothing installed" },
  { label: "Git and GitHub", href: `${SITE_URL}/learn/github/`, note: "21 chapters — commits through open-source pull requests" },
  { label: "Roblox Studio", href: `${SITE_URL}/learn/roblox/`, note: "14 chapters — build and publish a real obby" },
  { label: "Vibe Coding", href: `${SITE_URL}/learn/vibecoding/`, note: "29 chapters — build real things with AI" },
  { label: "Machine Learning", href: `${SITE_URL}/learn/ml/`, note: "22 chapters — interactive, no maths degree needed" },
  { label: "Financial Literacy", href: `${SITE_URL}/learn/financial-literacy/`, note: "24 chapters — the money rules school skips" },
  { label: "Health in Tech", href: `${SITE_URL}/learn/health-in-tech/`, note: "24 chapters — where code meets care" },
];
