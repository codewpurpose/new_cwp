"use client";

import { useState } from "react";

interface Field {
  label: string;
  value: string;
  mismatch?: boolean;
}

const RECORD_A: { system: string; fields: Field[] } = {
  system: "General Hospital — MedChart",
  fields: [
    { label: "Problem list entry", value: "Type 2 diabetes mellitus without complications", mismatch: true },
    { label: "Diagnosis code", value: "ICD-10: E11.9", mismatch: true },
    { label: "Recorded", value: "03/14/2026", mismatch: true },
    { label: "Coding system", value: "ICD-10-CM", mismatch: true },
  ],
};

const RECORD_B: { system: string; fields: Field[] } = {
  system: "Riverside Clinic — CarePath",
  fields: [
    { label: "Chronic condition", value: "Diabetes (Type II), uncomplicated", mismatch: true },
    { label: "Internal code", value: "DX-2240", mismatch: true },
    { label: "Recorded", value: "14-03-2026", mismatch: true },
    { label: "Coding system", value: "Proprietary, CarePath v4", mismatch: true },
  ],
};

function RecordCard({
  record,
  highlight,
}: {
  record: typeof RECORD_A;
  highlight: boolean;
}) {
  return (
    <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-learn-subtle">
        {record.system}
      </p>
      <div className="mt-3 space-y-3">
        {record.fields.map((field) => (
          <div
            key={field.label}
            className={`rounded-learn-md p-3 transition-colors motion-reduce:transition-none ${
              highlight && field.mismatch
                ? "border-[0.5px] border-learn-warning-line bg-learn-warning-bg"
                : "border-[0.5px] border-transparent"
            }`}
          >
            <p className="text-[11px] uppercase tracking-[0.06em] text-learn-subtle">
              {field.label}
            </p>
            <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteroperabilityRecords() {
  const [highlight, setHighlight] = useState(false);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The same patient, the same diagnosis, two systems
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Both records below describe one real patient&apos;s one real diagnosis. Nothing about
        the medicine is different — only how each system happened to write it down.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <RecordCard record={RECORD_A} highlight={highlight} />
        <RecordCard record={RECORD_B} highlight={highlight} />
      </div>

      <button
        type="button"
        onClick={() => setHighlight((prev) => !prev)}
        className="learn-focusable mt-5 rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
      >
        {highlight ? "Hide the mismatch" : "Highlight the mismatch"}
      </button>

      {highlight && (
        <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
          Every field is coded differently: a different diagnosis code from a different
          standard, a different date format, and even a different name for the same section of
          the chart. A system built to read one of these records gets nothing useful from the
          other without a translation layer in between.
        </p>
      )}
    </figure>
  );
}
