export function CwpLogo({
  height = 28,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/codewp-logo.png"
      alt="CodeWithPurpose"
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

/** @deprecated Use CwpLogo */
export function GlenLogo({
  size = 24,
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return <CwpLogo height={size} className={className} />;
}
