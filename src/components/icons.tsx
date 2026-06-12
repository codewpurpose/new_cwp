export function GlenLogo({
  size = 24,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z"
        fill={color}
        opacity="0.9"
      />
      <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill={color} />
    </svg>
  );
}
