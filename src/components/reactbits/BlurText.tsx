/** Render headings at full contrast from the first paint, without word-level animation. */
export default function BlurText({ text, as: Component = "p", className = "" }: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stepDuration?: number;
}) {
  return <Component className={className}>{text.split("\n").map((line, index) => (
    <span key={index}>{index > 0 && <>{" "}<br className="hidden sm:block" /></>}{line}</span>
  ))}</Component>;
}
