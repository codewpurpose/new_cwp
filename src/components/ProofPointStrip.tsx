import Link from "next/link";
import { DiscordIcon, GitHubIcon, InstagramIcon, XIcon } from "@/components/icons";
import { DISCORD_HREF, GITHUB_HREF, INSTAGRAM_HREF, JOIN_HREF, X_HREF } from "@/lib/links";

interface ProofPointStripProps {
  /**
   * Published chapters across all tracks, counted from the lesson graph by the
   * page that renders this. Passed in rather than imported so the curriculum
   * data stays out of the client bundle, and so the number cannot drift from
   * what /learn actually shows.
   */
  lessonCount: number;
}

const SOCIALS = [
  { href: DISCORD_HREF, label: "CodeWithPurpose on Discord", Icon: DiscordIcon },
  { href: INSTAGRAM_HREF, label: "CodeWithPurpose on Instagram", Icon: InstagramIcon },
  { href: X_HREF, label: "CodeWithPurpose on X", Icon: XIcon },
  { href: GITHUB_HREF, label: "CodeWithPurpose on GitHub", Icon: GitHubIcon },
];

/**
 * The strip above the header: who to follow, what we have done, and one way in.
 *
 * A stable lesson count avoids distracting rotation and timer-driven renders.
 */
export function ProofPointStrip({ lessonCount }: ProofPointStripProps) {
  return (
    <div className="proof-point-strip">
      <div className="proof-point-inner">
        <div className="proof-point-side">
          <span className="proof-point-label" aria-hidden="true">
            Follow
          </span>
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="proof-point-icon"
            >
              {/* Unsized here on purpose — .proof-point-icon is the tap target
                  and sizes the glyph inside it. */}
              <Icon />
            </a>
          ))}
        </div>

        <p className="proof-point-centre">
          <span aria-hidden="true">✦</span>
          <span className="proof-point-text">
            {`${lessonCount} free lessons`}
          </span>
          <span aria-hidden="true">✦</span>
        </p>

        <div className="proof-point-side proof-point-side-end">
          <Link href={JOIN_HREF} className="proof-point-join">
            Join us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
