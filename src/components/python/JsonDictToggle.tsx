"use client";

import { useState } from "react";

export function JsonDictToggle() {
  const [asJson, setAsJson] = useState(true);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The same record, two ways
      </figcaption>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setAsJson(true)}
          className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
            asJson
              ? "border-learn-accent bg-learn-quiet text-learn-strong"
              : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
          }`}
        >
          JSON text
        </button>
        <button
          type="button"
          onClick={() => setAsJson(false)}
          className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
            !asJson
              ? "border-learn-accent bg-learn-quiet text-learn-strong"
              : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
          }`}
        >
          Python dict
        </button>
      </div>

      <div className="mt-4 rounded-learn-md bg-learn-code-bg p-4">
        <pre className="text-[13px] leading-[1.7]">
          <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-fg">
            {asJson
              ? `{
  "name": "Ada",
  "age": 36,
  "active": true,
  "manager": null
}`
              : `{
  "name": "Ada",
  "age": 36,
  "active": True,
  "manager": None
}`}
          </code>
        </pre>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        {asJson
          ? 'json.loads(text) turns this string into a real dict — and along the way, true becomes True, and null becomes None.'
          : 'json.dumps(record) reverses it — True becomes true, None becomes null, and the whole thing becomes plain text again.'}
      </p>
    </figure>
  );
}
