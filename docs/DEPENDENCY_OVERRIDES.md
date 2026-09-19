# Dependency overrides

`package.json` overrides two transitive dependencies used by the client-only
Excalidraw whiteboard:

- `lodash-es` is pinned to `4.18.1`, the first release outside the vulnerable
  `4.17.x` range reported by `npm audit`.
- Excalidraw's Mermaid adapter declares `nanoid@4.0.2`, but that version has no
  patched release. It is overridden to `nanoid@5.1.16`, which contains the
  security fixes while preserving the adapter's `nanoid` API surface.

JSON cannot carry comments, so this file records why the cross-major override
exists. Do not remove it when upgrading Excalidraw without first checking the
adapter's declared dependency and exercising Mermaid import in the dashboard
whiteboard. The validation path is:

1. Open `/dashboard/` and select **Whiteboard**.
2. Open **More tools → Mermaid to Excalidraw**.
3. Enter a small flowchart and select **Insert**.
4. Confirm the dialog closes, the diagram appears on the canvas, and the
   browser console has no errors.
