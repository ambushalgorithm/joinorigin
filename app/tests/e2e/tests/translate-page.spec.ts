import { test, expect } from '@playwright/test';

/**
 * Secondary "Translate this page" link-out e2e (TASK-318 fe-google-translate).
 *
 * Covers the acceptance criteria on the live surface:
 *  1. EN location pages (city/variant/ideas) render the link with the
 *     correct Google website-translator proxy href —
 *     `https://translate.google.com/translate?sl=en&tl=<locale>&u=<absolute
 *     current URL>`.
 *  2. EN guide pages render the link with the correct href.
 *  3. `/de/*` location pages (already translated) do NOT render the link.
 *
 * Locale is URL-only (TASK-468): the `/en/**` surface drives the EN
 * dictionary server-side (`<html lang="en">`), so `tl` resolves from the
 * active URL locale — no cookie setup is needed or allowed.
 *
 * The link is a plain link-out only — no Google Translate widget/script/SDK.
 * It renders after React hydration (the absolute URL needs `window.location`),
 * so Playwright auto-waits on visibility before reading the href.
 */
test.describe.configure({ mode: 'serial' });

const EN_LOCATION_PAGES = [
  '/en/location/germany/berlin/berlin',
  '/en/location/germany/berlin/berlin/startup',
  '/en/location/germany/berlin/berlin/ideas',
  '/en/location/united-states/new-york/new-york',
  '/en/location/united-states/new-york/new-york/creative',
];

const DE_LOCATION_PAGES = [
  // The /de/location hub is the language-toggle destination from the EN hub
  // (TASK-477): it is already translated, so it must NOT offer the Google
  // Translate link-out either.
  '/de/location',
  '/de/location/germany/berlin/berlin',
  '/de/location/germany/berlin/berlin/startup',
  '/de/location/germany/berlin/berlin/ideas',
];

async function expectTranslateHref(page: import('@playwright/test').Page): Promise<void> {
  // URL-only locale (TASK-468): the /en/** surface must render EN chrome.
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const link = page.getByTestId('translate-page-link');
  await expect(link).toBeVisible();
  const href = (await link.getAttribute('href')) ?? '';
  const url = new URL(href);
  expect(`${url.origin}${url.pathname}`).toBe('https://translate.google.com/translate');
  expect(url.searchParams.get('sl')).toBe('en');
  // `tl` is a supported locale — resolved from the active URL locale (en).
  expect(url.searchParams.get('tl')).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
  expect(url.searchParams.get('u')).toBe(page.url());
  // Link-out only: plain anchor, no Google Translate widget/SDK payload.
  expect(href).not.toContain('translate.google.com/translate_a');
  expect(await page.locator('script[src*="translate.google.com"]').count()).toBe(0);
}

test.describe('Google Translate link-out (TASK-318)', () => {
  for (const path of EN_LOCATION_PAGES) {
    test(`EN location page ${path} renders the translate link with the correct href`, async ({
      page,
    }) => {
      await page.goto(path);
      await expectTranslateHref(page);
      await expect(page.getByTestId('translate-page-link')).toContainText('Translate this page');
    });
  }

  test('EN guide page renders the translate link with the correct href', async ({ page }) => {
    await page.goto('/en/guides/start-a-community');
    await expectTranslateHref(page);
    await expect(page.getByTestId('translate-page-link')).toContainText('Translate this page');
  });

  for (const path of DE_LOCATION_PAGES) {
    test(`de page ${path} omits the translate link (already translated)`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByTestId('translate-page-link')).toHaveCount(0);
    });
  }
});
