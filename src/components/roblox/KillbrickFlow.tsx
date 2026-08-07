"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The climb from a touched part to the player it belonged to, for three things
 * that can plausibly touch a killbrick.
 *
 * The accessory case is the reason this widget exists. A hat's Handle sits
 * inside an Accessory, whose parent is the character — so the usual
 * `hit.Parent:FindFirstChildWhichIsA("Humanoid")` finds nothing, and a laser
 * that looks correct fails silently for exactly the players wearing hats.
 */

type Scenario = "leg" | "brick" | "hat";

const SCENARIOS: readonly { value: Scenario; label: string }[] = [
  { value: "leg", label: "a player's leg" },
  { value: "brick", label: "a falling brick" },
  { value: "hat", label: "a player's hat" },
];

interface Step {
  code: string;
  result: string;
  ok: boolean;
}

const FLOWS: Record<Scenario, { steps: Step[]; verdict: string; fatal: boolean; note: string }> = {
  leg: {
    steps: [
      { code: "otherPart", result: 'Part "LeftLowerLeg"', ok: true },
      { code: "otherPart.Parent", result: 'Model "Amara"', ok: true },
      { code: ':FindFirstChildWhichIsA("Humanoid")', result: "Humanoid", ok: true },
      { code: "humanoid:TakeDamage(100)", result: "Health 100 → 0", ok: true },
    ],
    verdict: "The player dies. This is the case the killbrick was written for.",
    fatal: true,
    note: "Every limb of a character is a direct child of the character model, and the Humanoid is a sibling of those limbs. One step up is exactly the right distance.",
  },
  brick: {
    steps: [
      { code: "otherPart", result: 'Part "Debris"', ok: true },
      { code: "otherPart.Parent", result: "Workspace", ok: true },
      { code: ':FindFirstChildWhichIsA("Humanoid")', result: "nil", ok: false },
      { code: "if humanoid then", result: "skipped", ok: false },
    ],
    verdict: "Nothing happens, correctly. A brick has no Humanoid to damage.",
    fatal: false,
    note: "This is why the `if humanoid then` guard is not optional. Without it the next line calls a method on nil, the script throws, and the connection stops firing for everybody.",
  },
  hat: {
    steps: [
      { code: "otherPart", result: 'Part "Handle"', ok: true },
      { code: "otherPart.Parent", result: 'Accessory "TopHat"', ok: true },
      { code: ':FindFirstChildWhichIsA("Humanoid")', result: "nil", ok: false },
      { code: "if humanoid then", result: "skipped", ok: false },
    ],
    verdict: "The player survives, and nobody can tell you why.",
    fatal: false,
    note: "A hat's Handle is one level deeper than a limb: its parent is the Accessory, and the Humanoid is the Accessory's sibling, not its child. The fix is Players:GetPlayerFromCharacter walking up, or FindFirstAncestorOfClass(\"Model\") — never a second .Parent, which breaks the leg case.",
  },
};

export function KillbrickFlow() {
  const [scenario, setScenario] = useState<Scenario>("leg");
  const flow = FLOWS[scenario];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        From the part that touched to the player who owns it
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="What touched the laser"
        options={SCENARIOS}
        value={scenario}
        onValueChange={setScenario}
      />

      <ol className="mt-5 space-y-2">
        {flow.steps.map((step, i) => (
          <li
            key={step.code}
            className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[6px] border-[0.5px] px-4 py-2.5 ${
              step.ok
                ? "border-learn-line bg-white"
                : "border-learn-danger-line bg-learn-danger-bg"
            }`}
          >
            <span className="text-[12px] tabular-nums text-learn-subtle">{i + 1}</span>
            <span className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
              {step.code}
            </span>
            <span className="text-learn-subtle">→</span>
            <span
              className={`font-[family-name:var(--learn-font-mono)] text-[13px] ${
                step.ok ? "text-learn-accent-text" : "text-learn-outcome-fn"
              }`}
            >
              {step.result}
            </span>
          </li>
        ))}
      </ol>

      <p
        className={`mt-4 text-[14px] font-semibold ${
          flow.fatal ? "text-learn-accent-text" : "text-learn-outcome-fn"
        }`}
      >
        {flow.verdict}
      </p>
      <p className="mt-2 text-[13px] leading-[1.6] text-learn-muted">{flow.note}</p>
    </figure>
  );
}
