/** Quotes stay readable without scroll subscriptions or per-word blur layers. */
export default function ScrollReveal({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{text.split("\n").map((line, index) => (
    <span key={index}>{index > 0 && <>{" "}<br className="hidden sm:block" /></>}{line}</span>
  ))}</span>;
}
