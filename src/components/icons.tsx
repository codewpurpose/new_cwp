export function CwpLogo({
  height = 28,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 text-[#0a0e19] ${className ?? ""}`}
    >
      <svg
        height={height}
        viewBox="0 0 46 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ height, width: "auto" }}
      >
        <path d="M10 7 2.5 16 10 25" />
        <path d="M36 7l7.5 9L36 25" />
        <path d="M23 24.5s-7-4.3-7-9.3c0-2.7 2-4.4 4.1-4.4 1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6 2.1 0 4.1 1.7 4.1 4.4 0 5-7 9.3-7 9.3Z" strokeWidth="1.8" />
      </svg>
      <span
        className="font-medium leading-none tracking-[-0.02em]"
        style={{ fontSize: height * 0.58 }}
      >
        CodeWithPurpose
      </span>
    </span>
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
