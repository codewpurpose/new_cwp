"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

type SectionId = "medications" | "allergies" | "history" | "labs";

interface Entry {
  primary: string;
  secondary: string;
  flag?: "warning" | "danger";
}

const SECTIONS: readonly { value: SectionId; label: string; entries: Entry[] }[] = [
  {
    value: "medications",
    label: "Medications",
    entries: [
      { primary: "Lisinopril 10mg", secondary: "Once daily, for blood pressure — started 2023" },
      { primary: "Metformin 500mg", secondary: "Twice daily, for type 2 diabetes — started 2021" },
      { primary: "Albuterol inhaler", secondary: "As needed, for asthma flare-ups" },
    ],
  },
  {
    value: "allergies",
    label: "Allergies",
    entries: [
      { primary: "Penicillin", secondary: "Reaction: hives. Severity: moderate.", flag: "danger" },
      { primary: "Shellfish", secondary: "Reaction: swelling. Severity: moderate.", flag: "warning" },
    ],
  },
  {
    value: "history",
    label: "Visit history",
    entries: [
      { primary: "Annual physical — Mar 2026", secondary: "Routine bloodwork ordered, all results normal." },
      { primary: "Urgent care — Nov 2025", secondary: "Treated for a sprained ankle. No follow-up needed." },
      { primary: "Cardiology follow-up — Jun 2025", secondary: "Blood pressure stable on current medication." },
    ],
  },
  {
    value: "labs",
    label: "Lab results",
    entries: [
      { primary: "A1C: 6.8%", secondary: "Mar 2026 — within target range for managed diabetes." },
      { primary: "LDL cholesterol: 118 mg/dL", secondary: "Mar 2026 — slightly above the recommended range." },
    ],
  },
];

export function EhrRecordViewer() {
  const [active, setActive] = useState<SectionId>("medications");
  const section = SECTIONS.find((s) => s.value === active) ?? SECTIONS[0];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Mock chart — Patient: J. Alvarez, DOB 04/12/1988
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          label="Chart section"
          variant="chips"
          value={active}
          onValueChange={setActive}
          options={SECTIONS.map((s) => ({ value: s.value, label: s.label }))}
        />
      </div>

      <div className="mt-5 space-y-2">
        {section.entries.map((entry, i) => (
          <div
            key={i}
            className={`rounded-learn-md border-[0.5px] p-4 ${
              entry.flag === "danger"
                ? "border-learn-danger-line bg-learn-danger-bg"
                : entry.flag === "warning"
                  ? "border-learn-warning-line bg-learn-warning-bg"
                  : "border-learn-line bg-white"
            }`}
          >
            <p
              className={`text-[14px] font-semibold ${
                entry.flag === "danger"
                  ? "text-learn-danger-fg"
                  : entry.flag === "warning"
                    ? "text-learn-warning-fg"
                    : "text-learn-strong"
              }`}
            >
              {entry.primary}
            </p>
            <p className="mt-1 text-[13px] leading-[1.5] text-learn-muted">{entry.secondary}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        Every section lives in the same record, but a front-desk scheduler, a nurse taking
        vitals, and a treating physician are not always shown the same sections — who sees what
        is its own permissions question, not just a display choice.
      </p>
    </figure>
  );
}
