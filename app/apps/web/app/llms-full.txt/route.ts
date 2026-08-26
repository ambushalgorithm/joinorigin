import { buildLlmsFullText } from '../../lib/seo/llms';

/**
 * `/llms-full.txt` (G-16, sprint-24 gap-analysis §6) — the full-text
 * companion to `/llms.txt`: the same curated sections, each link expanded
 * with the parseable full text of its page (guide intro/steps/FAQ,
 * flagship-city intro, static-page copy) so LLM crawlers can fetch the
 * whole corpus in one request. Generated deterministically from the single
 * `LLMS_ENTRIES` source + committed content files. Served with
 * `Content-Type: text/plain; charset=utf-8` per the llms.txt v2 spec.
 */
export function GET() {
  return new Response(buildLlmsFullText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
