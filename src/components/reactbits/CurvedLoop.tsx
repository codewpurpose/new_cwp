import { useId } from "react";

/** A static decorative curve preserves the layout without a perpetual SVG frame loop. */
export default function CurvedLoop({ text, curveAmount = 140, className = "" }: {
  text: string; speed?: number; curveAmount?: number; className?: string;
}) {
  const id = `curve-${useId().replace(/:/g, "")}`;
  return <div aria-hidden="true" className="w-full select-none">
    <svg viewBox="0 0 1440 200" className="block w-full overflow-visible">
      <defs><path id={id} d={`M-100,40 Q720,${40 + curveAmount} 1540,40`} fill="none" /></defs>
      <text className={className} xmlSpace="preserve"><textPath href={`#${id}`} startOffset="0px">{`${text.trim()} `.repeat(4)}</textPath></text>
    </svg>
  </div>;
}
