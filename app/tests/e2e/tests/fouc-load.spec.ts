import { test, expect, type Page } from '@playwright/test';

/**
 * FOUC elimination + first-load behavior e2e (TASK-404 fe-load-polish).
 *
 * Verifies, across all routes:
 *
 *  1. The SSR HTML carries the critical first-paint inline style (brand
 *     background) BEFORE the styled-components flush — no white flash.
 *  2. The styled-components SSR style flush is present in the initial HTML
 *     (the registry streams styles into `<head>` — no unstyled flash).
 *  3. The latin font subsets are preloaded (`<link rel="preload" as="font">`)
 *     so `font-display: optional` faces are ready at first paint.
 *  4. The page paints with the brand background immediately (computed style
 *     right after `goto`, before waiting for hydration).
 *  5. Both brand font families resolve locally (no external CDN).
 *
 * Together these pin the "no FOUC on first load (all routes)" acceptance
 * criterion for Sprint 17.
 */

// Representative routes covering the home page, a menu page, a dynamic
// location hub, and the styled 404 boundary.
const ROUTES = ['/', '/features', '/location', '/does-not-exist-fouc'] as const;

/** Reads the initial HTML response body for a route (200, or 404 for the
 * styled not-found boundary — still served through the root layout). */
async function htmlFor(page: Page, path: string): Promise<string> {
  const response = await page.goto(path);
  const status = response?.status() ?? 0;
  expect([200, 404]).toContain(status);
  return (await response?.text().catch(() => '')) ?? '';
}

test.describe('FOUC elimination (TASK-404)', () => {
  for (const path of ROUTES) {
    test(`${path}: initial HTML carries critical inline background + SSR style flush`, async ({
      page,
    }) => {
      const html = await htmlFor(page, path);

      // 1. Critical first-paint inline background — applied as attributes on
      //    <html>/<body> in the raw HTML response (before any client JS).
      //    (React serializes the rgb() value in dev; the prod build keeps
      //    the raw hex — both are theme.colors.background.)
      expect(html).toMatch(
        /<html lang="en" dir="ltr" style="background-color:(?:#0A1022|rgb\(10, 16, 34\))"/,
      );
      expect(html).toMatch(/<body style="background-color:(?:#0A1022|rgb\(10, 16, 34\))"/);

      // 2. styled-components SSR flush — the registry injects a data-styled
      //    <style> into the server HTML, so the first paint is fully styled.
      expect(html).toContain('data-styled');

      // 3. Font preloads — latin subsets on the critical path.
      expect(html).toContain('rel="preload"');
      expect(html).toContain('/fonts/inter/inter-latin.woff2');
      expect(html).toContain('/fonts/urbanist/urbanist-latin.woff2');
    });
  }

  for (const path of ROUTES) {
    test(`${path}: paints with the brand background immediately (no white flash)`, async ({
      page,
    }) => {
      await page.goto(path);

      // Do NOT wait for hydration — assert the computed background the
      // moment the page paints. `rgb(10, 16, 34)` is theme.colors.background
      // (#0A1022) applied by the critical inline style + SSR flush.
      const background = await page.evaluate(
        () => getComputedStyle(document.documentElement).backgroundColor,
      );
      expect(background).toBe('rgb(10, 16, 34)');

      const bodyBackground = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      );
      expect(bodyBackground).toBe('rgb(10, 16, 34)');
    });
  }
});

test.describe('first-load font behavior (TASK-404)', () => {
  test('preloads the latin font files as woff2 with crossorigin', async ({ page }) => {
    const html = await htmlFor(page, '/');

    // Parse the preload tags from the raw HTML (DOMParser is unavailable in
    // the Node test context, so extract the link tags with a regex).
    const preloadTags = Array.from(html.matchAll(/<link[^>]*rel="preload"[^>]*>/g)).map(
      (m) => m[0],
    );
    const fontPreloads = preloadTags.filter((tag) => tag.includes('as="font"'));

    const links = fontPreloads.map((tag) => ({
      href: tag.match(/href="([^"]+)"/)?.[1] ?? null,
      type: tag.match(/type="([^"]+)"/)?.[1] ?? null,
      crossorigin: tag.includes('crossorigin'),
    }));

    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: '/fonts/inter/inter-latin.woff2',
          type: 'font/woff2',
          crossorigin: true,
        }),
        expect.objectContaining({
          href: '/fonts/urbanist/urbanist-latin.woff2',
          type: 'font/woff2',
          crossorigin: true,
        }),
      ]),
    );
  });

  test('resolves both brand font families locally (no external CDN)', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (
        /^https?:/.test(url) &&
        !url.startsWith('http://127.0.0.1') &&
        !url.startsWith('http://localhost')
      ) {
        external.push(url);
      }
    });

    await page.goto('/');
    await expect(page.getByTestId('header')).toBeVisible();

    await page.evaluate(() => document.fonts.ready);
    const interLoaded = await page.evaluate(() => document.fonts.check('16px Inter'));
    const urbanistLoaded = await page.evaluate(() => document.fonts.check('24px Urbanist'));
    expect(interLoaded).toBe(true);
    expect(urbanistLoaded).toBe(true);

    expect(external).toEqual([]);
  });
});

/**
 * Story E fonts (TASK-494/TASK-498) — the intermittent first-visit font load
 * failures are fixed by `font-display: swap` (reverted from `optional`),
 * immutable `/fonts/*` cache headers, and the latin-ext preloads.
 *
 * 1. The served font CSS declares `font-display: swap` on all four @font-face
 *    blocks (inter + urbanist × latin + latin-ext) — swap semantics, never
 *    optional.
 * 2. The `/fonts/*` responses carry `Cache-Control: public, max-age=31536000,
 *    immutable` so repeat visits hit the local cache instead of re-fetching
 *    the woff2 (no lost preload race).
 * 3. The root layout preloads BOTH latin subsets (inter-latin, urbanist-latin)
 *    AND the latin-ext subsets (inter-latin-ext, urbanist-latin-ext).
 * 4. On a fresh first visit — no reload — `document.fonts.check` passes for
 *    Inter/Urbanist right after the first paint, proving the swap faces are
 *    ready without a second navigation.
 */
test.describe('Story E: font-display swap + immutable font cache (TASK-494/498)', () => {
  test('served inter.css + urbanist.css declare font-display: swap on all 4 @font-face blocks', async ({
    page,
  }) => {
    const cssFiles = [
      { path: '/fonts/inter.css', family: 'inter' },
      { path: '/fonts/urbanist.css', family: 'urbanist' },
    ] as const;
    for (const { path, family } of cssFiles) {
      const response = await page.request.get(path);
      expect(response.status(), `${path} must be served`).toBe(200);
      const css = await response.text();
      // Two @font-face blocks per file (latin + latin-ext) and neither is
      // the discarded `optional` strategy that caused first-visit failures.
      const blocks = css.match(/@font-face\s*\{/g) ?? [];
      expect(blocks.length, `${path} declares both @font-face subsets`).toBe(2);
      expect(css).toContain('font-display: swap');
      expect(css).not.toContain('font-display: optional');
      expect(css).toContain(`font-display: swap;\n  src: url(./${family}/${family}-latin.woff2)`);
      expect(css).toContain(
        `font-display: swap;\n  src: url(./${family}/${family}-latin-ext.woff2)`,
      );
    }
  });

  test('urbanist.css swap faces point at the urbanist subset files', async ({ page }) => {
    const response = await page.request.get('/fonts/urbanist.css');
    expect(response.status()).toBe(200);
    const css = await response.text();
    expect(css).toContain('font-display: swap;\n  src: url(./urbanist/urbanist-latin.woff2)');
    expect(css).toContain('font-display: swap;\n  src: url(./urbanist/urbanist-latin-ext.woff2)');
  });

  test('woff2 responses carry immutable long-lived Cache-Control headers', async ({ page }) => {
    for (const fontPath of [
      '/fonts/inter/inter-latin.woff2',
      '/fonts/inter/inter-latin-ext.woff2',
      '/fonts/urbanist/urbanist-latin.woff2',
      '/fonts/urbanist/urbanist-latin-ext.woff2',
    ]) {
      const response = await page.request.get(fontPath);
      expect(response.status(), `${fontPath} must be served`).toBe(200);
      const cacheControl = response.headers()['cache-control'] ?? '';
      expect(
        cacheControl,
        `${fontPath} must be immutable-cacheable (TASK-494): ${cacheControl}`,
      ).toContain('public, max-age=31536000, immutable');
    }
  });

  test('first visit loads both brand fonts without a reload (document.fonts.check passes)', async ({
    page,
  }) => {
    // A single goto on a fresh page context — NO page.reload() anywhere. The
    // swap + preload strategy must make the faces available on the very first
    // paint (TASK-494 fixed the `optional`-discard race).
    await page.goto('/location');
    await expect(page.getByTestId('location-breadcrumbs')).toBeVisible();

    await page.evaluate(() => document.fonts.ready);
    const interLoaded = await page.evaluate(() => document.fonts.check('16px Inter'));
    const urbanistLoaded = await page.evaluate(() => document.fonts.check('24px Urbanist'));
    expect(interLoaded).toBe(true);
    expect(urbanistLoaded).toBe(true);
  });

  test('latin-ext subsets are preloaded alongside the latin subsets', async ({ page }) => {
    const html = await htmlFor(page, '/');
    const preloadTags = Array.from(html.matchAll(/<link[^>]*rel="preload"[^>]*>/g)).map(
      (m) => m[0],
    );
    const fontPreloads = preloadTags.filter((tag) => tag.includes('as="font"'));
    const hrefs = fontPreloads.map((tag) => tag.match(/href="([^"]+)"/)?.[1] ?? '');
    // Both latin AND latin-ext files of both families (TASK-494).
    for (const expected of [
      '/fonts/inter/inter-latin.woff2',
      '/fonts/inter/inter-latin-ext.woff2',
      '/fonts/urbanist/urbanist-latin.woff2',
      '/fonts/urbanist/urbanist-latin-ext.woff2',
    ]) {
      expect(hrefs).toContain(expected);
    }
  });
});
