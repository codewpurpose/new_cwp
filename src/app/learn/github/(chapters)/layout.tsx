/**
 * Route group so this layout sits ABOVE the [slug] segment.
 *
 * Next keys a router-cache subtree by segment value, so a layout at
 * [slug]/layout.tsx unmounts and remounts on every lesson navigation, resetting
 * the sidebar's scroll position on each click. Hoisting it above the dynamic
 * segment makes it persist. Same reasoning as the ML and Vibe Coding tracks.
 *
 * The track index at /learn/github sits outside the group and keeps its own layout.
 */
export default function GithubChaptersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
