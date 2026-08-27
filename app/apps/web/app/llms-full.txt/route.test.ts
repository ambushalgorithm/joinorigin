import { GET } from './route';
import { buildLlmsFullText } from '../../lib/seo/llms';

/**
 * G-16 — `/llms-full.txt` route unit tests: the full-text companion serves
 * `text/plain` with the deterministic `buildLlmsFullText()` body.
 */
describe('app/llms-full.txt route', () => {
  it('returns 200 with text/plain content type', () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
  });

  it('serves the deterministic full-text companion body', async () => {
    const response = GET();
    const body = await response.text();
    expect(body).toBe(buildLlmsFullText());
    expect(body).toContain('# JoinOrigin — llms-full.txt');
    expect(body).toContain('### /en/guides/start-an-origin');
  });
});
