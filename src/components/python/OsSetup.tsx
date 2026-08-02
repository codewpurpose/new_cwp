"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

type Os = "mac" | "windows" | "browser";

const OPTIONS = [
  { value: "mac" as Os, label: "macOS / Linux" },
  { value: "windows" as Os, label: "Windows" },
  { value: "browser" as Os, label: "Just a browser" },
];

const COMMANDS: Record<Os, { label: string; code: string }> = {
  mac: {
    label: "Terminal",
    code: `python3 --version
# Python 3.12.x

python3`,
  },
  windows: {
    label: "PowerShell",
    code: `py --version
# Python 3.12.x

py`,
  },
  browser: {
    label: "No install",
    code: `# Open python.org/shell, or any site offering a Python REPL.
# You get the same interpreter, running on a server instead of your machine.`,
  },
};

export function OsSetup() {
  const [os, setOs] = useState<Os>("mac");
  const command = COMMANDS[os];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Check what you already have
      </figcaption>
      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Most Mac and Linux machines ship with Python already installed. Pick what you are
        sitting at.
      </p>

      <div className="mt-4">
        <SegmentedControl
          options={OPTIONS}
          value={os}
          onValueChange={setOs}
          label="Your operating system"
          variant="chips"
        />
      </div>

      <CodeBlock label={command.label} variant="terminal" code={command.code} />

      <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
        If that version line printed, you are done — skip ahead. If it said &ldquo;command not
        found&rdquo;, install Python 3 from python.org and run it again.
      </p>
    </figure>
  );
}
