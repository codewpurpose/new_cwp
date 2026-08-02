"use client";

import { useState } from "react";

interface Student {
  name: string;
  grade: number;
}

const PRESETS: Student[] = [
  { name: "Ada", grade: 92 },
  { name: "Grace", grade: 88 },
  { name: "Alan", grade: 95 },
];

export function ClassStamper() {
  const [students, setStudents] = useState<Student[]>([]);

  const stamp = () => {
    const next = PRESETS[students.length % PRESETS.length];
    setStudents((prev) => [...prev, next]);
  };

  const reset = () => setStudents([]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        class Student:
      </figcaption>

      <div className="mt-3 rounded-learn-md bg-learn-code-bg p-4">
        <pre className="text-[13px] leading-[1.7]">
          <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-fg">
{`class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade`}
          </code>
        </pre>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={stamp}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Student(&hellip;) — create an instance
        </button>
        {students.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {students.length === 0 && (
          <p className="text-[13px] text-learn-muted">
            No objects yet — the class itself is just a blueprint. Click the button to stamp
            one out.
          </p>
        )}
        {students.map((s, i) => (
          <div
            key={i}
            className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-quiet px-4 py-3"
          >
            <p className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
              student_{i + 1}
            </p>
            <p className="mt-1 text-[13px] text-learn-strong">
              self.name = &apos;{s.name}&apos;
            </p>
            <p className="text-[13px] text-learn-strong">self.grade = {s.grade}</p>
          </div>
        ))}
      </div>

      {students.length > 1 && (
        <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
          One class, {students.length} independent objects — each with its own{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">name</span> and{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">grade</span>. Changing
          one object&apos;s grade would never touch another&apos;s.
        </p>
      )}
    </figure>
  );
}
