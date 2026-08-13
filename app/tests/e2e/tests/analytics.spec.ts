import { test, expect, type Page } from '@playwright/test';

/**
 * Analytics activation e2e (TASK-279 fe-analytics-activation, Sprint 10
 * Story 2).
 *
 * Asserts the wired-out-of-the-box analytics setup in a real browser:
 *  1. The AnalyticsProvider (mounted in `apps/web/app/layout.tsx` per the
 *     fe-analytics mount contract) injects the self-hosted Plausible tracker
 *     script from the LOCAL collector — `http://localhost:8000/js/script.js`,
 *     the infra-plausible (TASK-277) default baked into `config.ts` (no env
 *     override in the e2e dev server).
 *  2. Pageviews fire into the collector global (`window.plausible`) on
 *     initial load and on client-side route change.
 *
 * The collector endpoint itself is verified server-side (POST `/api/event`
 * returns 202, tracker script GET 200) — this spec asserts the browser side
 * dispatches into the global the collector script registers.
 *
 * NOTE: asserts the ACTIVATED default. Running the suite with a custom
 * `NEXT_PUBLIC_PLAUSIBLE_API_HOST` in the environment (e.g. a live collector
 * on `http://localhost:8001`) changes the injected src — unit tests cover
 * that override path, and it enables a true end-to-end run against a running
 * collector.
 */

test.describe.configure({ mode: 'serial' });

const LOCAL_PLAUSIBLE_HOST =
  process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST ?? 'http://localhost:8000';

/** Capture every call to `window.plausible` (preserving an existing impl). */
async function installPlausibleCapture(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const captured: unknown[][] = [];
    (window as unknown as { __plausibleEvents: unknown[][] }).__plausibleEvents = captured;
    const prev = (window as unknown as { plausible?: (...args: unknown[]) => void }).plausible;
    (window as unknown as { plausible: (...args: unknown[]) => void }).plausible = (
      ...args: unknown[]
    ) => {
      captured.push(args);
      if (typeof prev === 'function') {
        prev(...args);
      }
    };
  });
}

function plausibleEvents(page: Page): Promise<unknown[][]> {
  return page.evaluate(
    () => (window as unknown as { __plausibleEvents: unknown[][] }).__plausibleEvents,
  );
}

function isPageview(args: unknown[]): boolean {
  return args[0] === 'pageview';
}

test.describe('analytics activation — local self-hosted Plausible (TASK-279)', () => {
  test('injects the tracker script from the local Plausible collector', async ({ page }) => {
    await page.goto('/');

    const script = page.locator('script[data-analytics-injected]');
    await expect(script).toHaveCount(1);
    await expect(script).toHaveAttribute('src', `${LOCAL_PLAUSIBLE_HOST}/js/script.js`);
    await expect(script).toHaveAttribute('defer', '');
    // data-domain is required by the collector; value follows
    // NEXT_PUBLIC_SITE_DOMAIN (default 'localhost' in dev per the contract).
    expect(await script.getAttribute('data-domain')).toBeTruthy();
  });

  test('fires a pageview on initial load into the collector global', async ({ page }) => {
    await installPlausibleCapture(page);
    await page.goto('/');

    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __plausibleEvents: unknown[][] }).__plausibleEvents.length))
      .toBeGreaterThan(0);

    const events = await plausibleEvents(page);
    const pageviews = events.filter(isPageview);
    expect(pageviews.length).toBeGreaterThan(0);
    // The dispatched URL is absolute against the local site origin.
    const u = pageviews[pageviews.length - 1][1] as { u?: string };
    expect(u?.u ?? '').toMatch(/^http:\/\/localhost:3100\//);
  });

  test('fires an additional pageview on client-side route change', async ({ page }) => {
    await installPlausibleCapture(page);
    await page.goto('/');

    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __plausibleEvents: unknown[][] }).__plausibleEvents.length))
      .toBeGreaterThan(0);

    // Navigate via the header nav (client-side route change, no full reload).
    const featuresLink = page.locator('a[href="/features"]').first();
    await expect(featuresLink).toBeVisible();
    await featuresLink.click();
    await expect(page).toHaveURL(/\/features$/);

    // The provider dispatches a pageview for the new route. (When the REAL
    // collector script is loaded, it also fires its own pageviews — so assert
    // presence of a /features pageview rather than call ordering.)
    await expect
      .poll(async () => {
        const events = await plausibleEvents(page);
        return events
          .filter(isPageview)
          .some((args) => ((args[1] as { u?: string }).u ?? '').includes('/features'));
      })
      .toBe(true);
  });
});
