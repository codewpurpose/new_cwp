"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DiscordIcon, GitHubIcon, InstagramIcon } from "@/components/icons";
import { DISCORD_HREF, GITHUB_HREF, INSTAGRAM_HREF, JOIN_HREF } from "@/lib/links";

interface ProofPointStripProps {
  /**
   * Published chapters across both tracks, counted from the lesson graph by the
   * page that renders this. Passed in rather than imported so the curriculum
   * data stays out of the client bundle, and so the number cannot drift from
   * what /learn actually shows.
   */
  lessonCount: number;
}

const SOCIALS = [
  { href: DISCORD_HREF, label: "CodeWithPurpose on Discord", Icon: DiscordIcon },
  { href: INSTAGRAM_HREF, label: "CodeWithPurpose on Instagram", Icon: InstagramIcon },
  { href: GITHUB_HREF, label: "CodeWithPurpose on GitHub", Icon: GitHubIcon },
];

/**
 * The strip above the header: who to follow, what we have done, and one way in.
 *
 * aria-live sits on the rotating claim alone, not the whole strip — announcing
 * the social links and the join link every 2.8 seconds would make the page
 * unusable with a screen reader on.
 */
export function ProofPointStrip({ lessonCount }: ProofPointStripProps) {
  const proofPoints = [
    "Free forever",
    "4,000+ students",
    "130+ countries",
    "30+ languages",
    `${lessonCount} free lessons`,
    "15,000 minutes taught",
    "Recognised by the U.S. House",
    "Student-run",
    "Open source",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % proofPoints.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, [proofPoints.length]);

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
              <Icon className="h-full w-full" />
            </a>
          ))}
        </div>

        <p className="proof-point-centre" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">✦</span>
          <span key={proofPoints[index]} className="proof-point-text">
            {proofPoints[index]}
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
