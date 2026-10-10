"use client";

import { useId, useRef, type ReactNode, type SVGProps } from "react";
import { useArtMotion } from "@/components/art/useArtMotion";

/**
 * The shared shell for the site's drawn illustrations.
 *
 * - `backdrop` paints first and is never animated or shadowed (paper colour,
 *   dot grids, washes).
 * - `children` go into `.art-scene`, which useArtMotion draws on when it
 *   scrolls into view and the hover rules in globals.css can lift.
 * - The scene sits on a flat offset shadow, an SVG filter rather than a CSS
 *   one so Safari renders it, which gives every drawing the same layered-paper
 *   depth without redrawing each shape twice.
 *
 * It renders identical markup on the server and the client, and the finished
 * drawing is what the server sends, so nothing depends on JavaScript.
 */

export type ArtShadow = false | { dx?: number; dy?: number; color?: string; opacity?: number };

export function ArtSvg({
  children,
  backdrop,
  shadow = {},
  draw = true,
  className = "",
  sceneClassName = "",
  ...rest
}: Omit<SVGProps<SVGSVGElement>, "ref" | "children"> & {
  children: ReactNode;
  backdrop?: ReactNode;
  shadow?: ArtShadow;
  /** Set false for drawings that should only get the loops and the pause. */
  draw?: boolean;
  sceneClassName?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const filterId = `art-shadow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  useArtMotion(ref, { draw });

  const s = shadow ? { dx: 3, dy: 3.5, color: "#15120c", opacity: 0.1, ...shadow } : null;

  return (
    <svg ref={ref} className={`art-svg ${className}`} {...rest}>
      {s && (
        <defs>
          <filter
            id={filterId}
            x="-15%"
            y="-15%"
            width="135%"
            height="135%"
            colorInterpolationFilters="sRGB"
          >
            <feOffset in="SourceAlpha" dx={s.dx} dy={s.dy} result="offset" />
            <feFlood floodColor={s.color} floodOpacity={s.opacity} />
            <feComposite in2="offset" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      {backdrop}
      <g className={`art-scene ${sceneClassName}`} filter={s ? `url(#${filterId})` : undefined}>
        {children}
      </g>
    </svg>
  );
}
