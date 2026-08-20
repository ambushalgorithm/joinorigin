import { test, expect, type Page } from '@playwright/test';

/**
 * Analytics dev-guard e2e (Sprint 17, TASK-402).
 *
 * The e2e webServer runs the Next.js DEV server (`pnpm dev`), so
 * `NODE_ENV=development` and the site domain defaults to `localhost` — under
 * the Sprint 17 dev guard the Plausible tracker script must NOT be injected
 * at all. This kills the "Ignoring Event: localhost" collector log by
 * preventing the script from loading in the first place:
 *
 *  1. No `script[data-analytics-injected]` element on initial load.
 *  2. No tracker script after client-side route change either (guard is
 *     environment-level, not one-shot).
 *  3. The browser never contacts the local Plausible collector
 *     (`http://localhost:8000` / `/api/event`) in dev.
 *
 * PRODUCTION PATH (Sprint 17, TASK-402): with `NODE_ENV=production`, domain
 * `joinorigin.co` and apiHost `analytics.qa1.joinorigin.co` the tracker IS
 * injected — asserted by the unit suite (`lib/analytics/__tests__`), which
 * drives the adapter directly with the production env because a browser dev
 * server cannot switch `NODE_ENV` per test.
 */

test.describe.configure({ mode: 'serial' });

/** True when the request targets the local Plausible collector. */
function isPlausibleCollectorRequest(url: string): boolean {
  return url.includes('localhost:8000') || url.includes('/api/event');
}

test.describe('analytics dev guard — no Plausible script in dev/localhost (TASK-402)', () => {
  test('does not inject the tracker script on initial load', async ({ page }) => {
    await page.goto('/');

    const script = page.locator('script[data-analytics-injected]');
    await expect(script).toHaveCount(0);
  });

  test('does not inject the tracker script after client-side route change', async ({ page }) => {
    await page.goto('/');

    // The header nav link targets the /en/** canonical surface (TASK-464).
    const featuresLink = page.locator('a[href="/en/features"]').first();
    await expect(featuresLink).toBeVisible();
    await featuresLink.click();
    await expect(page).toHaveURL(/\/en\/features$/);

    const script = page.locator('script[data-analytics-injected]');
    await expect(script).toHaveCount(0);
  });

  test('never contacts the Plausible collector in dev (kills "Ignoring Event: localhost")', async ({
    page,
  }) => {
    const collectorRequests: string[] = [];
    page.on('request', (request) => {
      if (isPlausibleCollectorRequest(request.url())) {
        collectorRequests.push(request.url());
      }
    });

    await page.goto('/');
    // Give any async init a chance to fire before asserting.
    await page.waitForTimeout(1500);

    expect(collectorRequests).toHaveLength(0);
  });
});
