/**
 * Route group so this layout sits ABOVE the [slug] segment.
 *
 * Next keys a router-cache subtree by segment value, so a layout placed at
 * [slug]/layout.tsx unmounts and remounts on every chapter navigation — which
 * resets the sidebar's scroll position on every single click. Hoisting it above
 * the dynamic segment makes it persist across all chapters. That is the entire
 * reason this group exists.
 *
 * The track index at /learn/vibecoding sits outside the group, so it keeps its
 * normal marketing layout.
 */
export default function VibecodingChaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
