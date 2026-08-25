import { expect, test, type Page } from '@playwright/test';

/**
 * Story G e2e — top navigation progress bar (TASK-543, e2e-nav-perf).
 *
 * Contract (`components/NavigationProgress.tsx`, TASK-538):
 * - Thin 3px bar mounted once in the root layout, `position: fixed`,
 *   `pointer-events: none`, `aria-hidden` (zero layout/content semantics).
 * - `data-testid="navigation-progress"`; `data-visible="true"` ONLY while a
 *   route transition exceeds `NAV_PROGRESS_DELAY_MS` (100ms); hides when the
 *   new route's content renders (usePathname commit).
 * - NEVER flashes on fast (<100ms) navigations.
 * - Same-route / hash-only / external / new-tab links are ignored (link
 *   filter) so they cannot leave the bar stuck or cause false positives.
 * - `prefers-reduced-motion: reduce` still reports slow transitions (the bar
 *   appears) but renders instantly with a static fill.
 *
 * The slow-transition tests make the target route's RSC response
 * deterministically slow with a `page.route` delay; the fast-transition test
 * uses the documented-fastest warm transition (/en/location →
 * /en/location/united-states, ~53 ms after TASK-537) after double warmup.
 */
test.describe.configure({ mode: 'serial' });

/** Full-load a page and wait until React has hydrated (client is clickable). */
async function gotoAndSettle(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const el = document.querySelector(
      '[data-testid="menu-page"], [data-testid="home-page"], [data-testid="header"]',
    );
    return !!el && Object.keys(el).some((key) => key.startsWith('__react'));
  });
  await expect(page.locator('main h1, h1').first()).toBeVisible({ timeout: 20_000 });
}

/**
 * Install a MutationObserver on the progress bar that records whether
 * `data-visible` was EVER "true" during the test (including the initial
 * state) — this is how the "never flashes" contract is asserted end-to-end.
 */
async function installBarObserver(page: Page): Promise<void> {
  await page.evaluate(() => {
    const w = window as unknown as Record<string, unknown>;
    w.__progressSawVisible = false;
    const el = document.querySelector('[data-testid="navigation-progress"]');
    if (!el) {
      w.__progressSawVisible = 'missing-element';
      return;
    }
    if (el.getAttribute('data-visible') === 'true') {
      w.__progressSawVisible = true;
    }
    const observer = new MutationObserver(() => {
      if (el.getAttribute('data-visible') === 'true') {
        w.__progressSawVisible = true;
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['data-visible'] });
    w.__progressObserver = observer;
  });
}

async function progressSawVisible(page: Page): Promise<boolean> {
  return page.evaluate(
    () => (window as unknown as Record<string, unknown>).__progressSawVisible === true,
  );
}

/** Delay the target route's requests so a navigation deterministically
 *  exceeds the 100ms show threshold. */
async function delayRoute(page: Page, pattern: string, delayMs: number): Promise<void> {
  await page.route(pattern, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  });
}

test('mounts globally (root layout) and starts hidden', async ({ page }) => {
  for (const path of ['/en', '/en/features', '/en/location']) {
    await page.goto(path);
    const bar = page.getByTestId('navigation-progress');
    await expect(bar).toBeAttached();
    await expect(bar).toHaveAttribute('data-visible', 'false');
    await expect(bar).toHaveAttribute('aria-hidden', 'true');
    await expect(bar).toHaveAttribute('data-reduced-motion', 'false');
  }
});

test('never flashes on fast (<100ms) navigations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // Double-warm the fastest documented transition so the click renders from
  // the router cache (staleTimes.dynamic 60s) + browser cache.
  await gotoAndSettle(page, '/en/location/united-states');
  await gotoAndSettle(page, '/en/location/united-states');
  await gotoAndSettle(page, '/en/location');

  await installBarObserver(page);

  await page.locator('a[href="/en/location/united-states"]').first().click();
  await page.waitForURL('**/location/united-states', { timeout: 20_000 });
  await expect(page.locator('main h1')).toContainText('Communities in the United States', {
    timeout: 20_000,
  });

  // Give any late threshold timer a chance to fire — the bar must never
  // have been revealed for a transition that committed inside the budget.
  await page.waitForTimeout(400);
  expect(await progressSawVisible(page)).toBe(false);
  await expect(page.getByTestId('navigation-progress')).toHaveAttribute('data-visible', 'false');
});

test('appears only when a transition exceeds 100ms, then hides on content render', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoAndSettle(page, '/en/location');

  // Make the target route's RSC round-trip take 800ms — deterministically
  // over the 100ms threshold.
  await delayRoute(page, '**/location/united-states**', 800);
  await installBarObserver(page);

  await page.locator('a[href="/en/location/united-states"]').first().click();
  await page.waitForURL('**/location/united-states', { timeout: 30_000 });
  await expect(page.locator('main h1')).toContainText('Communities in the United States', {
    timeout: 30_000,
  });

  // The bar WAS revealed during the slow transition…
  expect(await progressSawVisible(page)).toBe(true);
  // …and is hidden again once the new route's content rendered.
  await expect(page.getByTestId('navigation-progress')).toHaveAttribute('data-visible', 'false');

  await page.unroute('**/location/united-states**');
});

test('ignores same-route links (no false positives)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoAndSettle(page, '/en/features');

  await installBarObserver(page);

  // Footer "Features" link targets the current route — the link filter must
  // not arm the threshold timer, so the bar never appears.
  await page.locator('[data-testid="footer"] a[href="/en/features"]').first().click();
  await page.waitForTimeout(600);

  expect(await progressSawVisible(page)).toBe(false);
  await expect(page.getByTestId('navigation-progress')).toHaveAttribute('data-visible', 'false');
});

test('reduced-motion still reports slow transitions (bar appears, no animation)', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoAndSettle(page, '/en/location');

  await delayRoute(page, '**/location/united-states**', 600);
  await installBarObserver(page);

  await page.locator('a[href="/en/location/united-states"]').first().click();
  await page.waitForURL('**/location/united-states', { timeout: 30_000 });
  await expect(page.locator('main h1')).toContainText('Communities in the United States', {
    timeout: 30_000,
  });

  expect(await progressSawVisible(page)).toBe(true);
  await expect(page.getByTestId('navigation-progress')).toHaveAttribute(
    'data-reduced-motion',
    'true',
  );
  await expect(page.getByTestId('navigation-progress')).toHaveAttribute('data-visible', 'false');

  await page.unroute('**/location/united-states**');
});
