import { buildLlmsText } from '../../lib/seo/llms';

/**
 * `/llms.txt` (discovery §8.1, arch §3.9) — plain-text LLM-crawler index.
 *
 * A compact, authoritative summary of the site plus links to every
 * LLM-parseable page, generated from the single `LLMS_ENTRIES` array in
 * `lib/seo/llms.ts` so it stays in sync with `ROUTES`. Served with
 * `Content-Type: text/plain; charset=utf-8` per the llms.txt v2 spec.
 */
export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
