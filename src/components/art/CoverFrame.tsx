import type { ReactNode } from "react";
import { ArtSvg } from "@/components/art/ArtSvg";

/**
 * The frame every /learn/<track>/ chapter cover draws into (160 × 90).
 *
 * It replaces the identical `Frame` each *LessonCover file used to define, so
 * all of them pick up the same treatment at once: a soft wash behind the
 * scene, the layered-paper offset shadow, a draw-on when the card scrolls into
 * view, and a small lift when the card (a `group` link) is hovered.
 */

const W = 160;
const H = 90;

export function CoverFrame({ children, backdrop }: { children: ReactNode; backdrop?: ReactNode }) {
  return (
    <ArtSvg
      viewBox={`0 0 ${W} ${H}`}
      className="art-lift aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      shadow={{ dx: 1.4, dy: 1.8, opacity: 0.11 }}
      backdrop={
        <>
          <rect width={W} height={H} fill="var(--learn-chart-plot)" />
          {backdrop ?? (
            <ellipse cx={W / 2} cy={H / 2 + 4} rx={58} ry={34} fill="var(--learn-chart-highlight)" opacity={0.28} />
          )}
        </>
      }
    >
      {children}
    </ArtSvg>
  );
}
