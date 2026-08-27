import { expect, test } from '@playwright/test';

/**
 * Sprint 24 brand addendum — tagline strip e2e coverage (TASK-562).
 *
 * The thin NON-sticky `TaglineStrip` (TASK-561) renders ABOVE the sticky
 * `Header` on every menu page (`MenuPageShell`), carrying the localized
 * `footer.tagline` (TASK-560 — brand word "Origin" capitalized across all
 * 21 locales). The homepage (`home-view.tsx`) never renders the shell, so
 * the strip must be ABSENT there.
 *
 * Covered contracts:
 *  1. visible at the TOP of an inner menu page (`/en/features`) — above the
 *     header, inside the initial viewport, with the EN tagline "Where teams
 *     find their Origin" (capitalized brand word);
 *  2. ABSENT on the homepage (`/en`) — no `tagline-strip` element anywhere;
 *  3. NON-sticky — computed `position` is static and, after scrolling the
 *     page, the strip scrolls AWAY (its viewport top goes negative) instead
 *     of being pinned by sticky/fixed positioning;
 *  4. footer tagline matches the strip — the strip and `footer` render the
 *     same capitalized tagline string (single source of truth);
 *  5. non-English locale — `/de/features` renders the localized tagline with
 *     the brand word "Origin".
 */

const EN_TAGLINE = 'Where teams find their Origin';
const DE_TAGLINE = 'Wo Teams ihren Origin finden';

test.describe('tagline strip — EN menu page (TASK-561/562)', () => {
  test('is visible at the top of /en/features, above the header, with capitalized Origin', async ({
    page,
  }) => {
    await page.goto('/en/features');

    const strip = page.getByTestId('tagline-strip');
    await expect(strip).toBeVisible();

    // The strip carries the EN tagline with the capitalized brand word.
    await expect(strip).toHaveText(EN_TAGLINE);
    expect((await strip.innerText()).includes('Origin')).toBe(true);

    // It sits at the TOP of the page — inside the initial viewport and
    // above the sticky header (which must start below the strip).
    const stripBox = await strip.boundingBox();
    const headerBox = await page.getByTestId('header').boundingBox();
    expect(stripBox).not.toBeNull();
    expect(headerBox).not.toBeNull();
    expect(stripBox!.y).toBeGreaterThanOrEqual(0);
    expect(stripBox!.y).toBeLessThan(headerBox!.y);
  });

  test('footer tagline matches the strip (single source of truth, capitalized Origin)', async ({
    page,
  }) => {
    await page.goto('/en/features');

    const stripText = (await page.getByTestId('tagline-strip').innerText()).trim();
    await expect(page.getByTestId('footer')).toContainText(stripText);
    await expect(page.getByTestId('footer')).toContainText(EN_TAGLINE);
  });

  test('is NON-sticky — static element that scrolls away with the page', async ({ page }) => {
    await page.goto('/en/features');

    const strip = page.getByTestId('tagline-strip');
    await expect(strip).toBeVisible();

    // Computed position must be the default (static) — never sticky/fixed.
    const position = await strip.evaluate((el) => getComputedStyle(el).position);
    expect(['sticky', 'fixed']).not.toContain(position);

    // Behavioral check: scroll to the bottom; the strip must scroll OUT of
    // the viewport (its viewport-relative top goes negative). A sticky or
    // fixed strip would remain pinned with a top >= 0.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(250);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);

    const scrolledBox = await strip.boundingBox();
    expect(scrolledBox).not.toBeNull();
    expect(scrolledBox!.y).toBeLessThan(0);
  });
});

test.describe('tagline strip — homepage exclusion (TASK-561/562)', () => {
  test('is ABSENT on the homepage (home-view never renders MenuPageShell)', async ({ page }) => {
    await page.goto('/en');

    // No strip anywhere on the home page — not even a hidden/stale instance.
    await expect(page.getByTestId('tagline-strip')).toHaveCount(0);
  });
});

test.describe('tagline strip — non-English locale (TASK-562)', () => {
  test('renders the localized tagline with the brand word Origin on /de/features', async ({
    page,
  }) => {
    await page.goto('/de/features');

    const strip = page.getByTestId('tagline-strip');
    await expect(strip).toBeVisible();

    // Localized DE tagline keeps the brand word "Origin" (TASK-560).
    await expect(strip).toHaveText(DE_TAGLINE);
    expect((await strip.innerText()).includes('Origin')).toBe(true);

    // Footer mirrors the same localized string.
    await expect(page.getByTestId('footer')).toContainText(DE_TAGLINE);
  });
});
