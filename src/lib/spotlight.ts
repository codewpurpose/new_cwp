import type { CSSProperties } from "react";

/** Shared settings so every React Bits SpotlightCard glows the same leaf
 *  green as the stat figures (#3e7f5c) and leaves the border to `home-card`.
 *  The light theme scales the fill down hard, so intensity sits above the
 *  component's 0.15 default to stay visible on the sand background. */
export const SPOTLIGHT_PROPS = {
  theme: "light",
  spotlightColor: "#3e7f5c",
  intensity: 0.3,
  style: { "--spotlight-card-border": "transparent" } as CSSProperties,
} as const;
