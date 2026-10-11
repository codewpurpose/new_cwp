/** Stable figures avoid a correct server-rendered value jumping back to zero on hydration. */
export default function CountUp({ to, separator = ",", prefix = "", suffix = "", className = "" }: {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const figure = String(Math.round(to)).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return <span className={`tabular-nums ${className}`}>{prefix}{figure}{suffix}</span>;
}
