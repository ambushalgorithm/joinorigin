import robots from './robots';
import { absoluteUrl } from '../lib/seo/url';

/**
 * fe-sitemap-llms robots.txt unit tests (TASK-311, design §9.2).
 *
 * Guards the robots contract — unchanged by this task:
 *  - allow ALL user agents (standard + LLM crawlers), never block anyone,
 *  - only the private `/api/` surface is disallowed,
 *  - `Allow: /` so `/location/**` (and every other public page) stays
 *    indexable — never disallow `/location`.
 */
describe('app/robots — unchanged contract', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const rule = rules[0] as { userAgent?: string | string[]; allow?: string[]; disallow?: string[] };

  it('allows all user agents (standard + LLM crawlers)', () => {
    expect(rule.userAgent).toBe('*');
    expect(rule.allow).toContain('/');
  });

  it('disallows only /api/', () => {
    expect(rule.disallow).toContain('/api/');
    expect(rule.disallow).not.toContain('/location');
  });

  it('references the absolute sitemap URL', () => {
    expect(config.sitemap).toBe(absoluteUrl('/sitemap.xml'));
  });

  it('is deterministic (no new Date / Math.random)', () => {
    expect(robots()).toEqual(robots());
  });
});
