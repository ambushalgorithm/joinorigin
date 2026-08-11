/**
 * Server-safe `<script type="application/ld+json">` renderer (arch §3.6).
 *
 * Renders structured data server-side only so crawlers and LLMs see it in
 * the initial HTML. The input is a typed object produced by the builders in
 * `./jsonLd` — no user input is ever interpolated, so
 * `dangerouslySetInnerHTML` is safe here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
