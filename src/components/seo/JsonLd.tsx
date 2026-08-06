/**
 * Renders a JSON-LD structured-data block. Server-safe; Google reads it from the
 * rendered HTML. Keep the data plain and serialisable.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
