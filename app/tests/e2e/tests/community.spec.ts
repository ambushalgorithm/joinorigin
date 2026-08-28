import { test, expect } from '@playwright/test';

/**
 * JoinOrigin /network e2e coverage (Sprint 23 Stories A–C validation;
 * Sprint 24 Wave-4 TASK-576 renamed /community → /network).
 *
 * Story B (TASK-545/546/547): the "Example Origins" marquee chips on
 * /network (and home) are REAL links — every chip links to its OWN
 * group-type variant page (`/${locale}/location/<country>/<region>/<city>/
 * <variant>`) of the closest-largest content-rich Origin to the visitor,
 * resolved server-side by `ChipMarqueeServer` (geo + active locale) and
 * rendered per-chip by the client `ChipMarquee`.
 *
 * These live-server assertions mirror the unit-tested resolver contract
 * (`ChipMarqueeServer.test.tsx` + `exampleCommunities.test.ts`) and pin the
 * two deterministic behaviours the sprint requires:
 *
 *   1. EN default (no geo) → New York group-type variant pages.
 *   2. de surface + US visitor → deterministic committed-content fallback to
 *      the New York CITY page (`/de/location/united-states/new-york/new-york`)
 *      — never a broken variant URL (no committed German variant content for
 *      New York); de surface without geo → committed Berlin variant pages.
 */

/** Per-chip EN targets for New York (locale-language default / US visitor). */
const NEW_YORK_EN_TARGETS = [
  '/en/location/united-states/new-york/new-york/startup',
  '/en/location/united-states/new-york/new-york/small-business',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/meetup',
  '/en/location/united-states/new-york/new-york/ideas',
];

/** Per-chip DE targets for Berlin (locale-language default on the de surface). */
const BERLIN_DE_TARGETS = [
  '/de/location/germany/berlin/berlin/startup',
  '/de/location/germany/berlin/berlin/small-business',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/meetup',
  '/de/location/germany/berlin/berlin/ideas',
];

test.describe('example-origins marquee (Story B)', () => {
  test('chips on /en/network are links to the mapped group-type variant pages', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/network');

    const marquee = page.getByTestId('chip-marquee');
    await expect(marquee).toBeVisible();

    // The animated track repeats the 7 chips 2×, every one a single wrapping
    // link to its own mapped group-type variant page.
    const trackHrefs = await marquee
      .locator('[aria-hidden="true"] a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(trackHrefs).toEqual([...NEW_YORK_EN_TARGETS, ...NEW_YORK_EN_TARGETS]);

    // The sr-only list reads each Origin once as a link to its own target.
    const srHrefs = await marquee
      .locator('ul a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(srHrefs).toEqual(NEW_YORK_EN_TARGETS);
  });

  test('de surface without geo resolves chips to committed Berlin variant pages', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de');

    const marquee = page.getByTestId('chip-marquee');
    await expect(marquee).toBeVisible();
    // No geo country → no data-ip-country on the observability hook.
    await expect(marquee).not.toHaveAttribute('data-ip-country');

    const trackHrefs = await marquee
      .locator('[aria-hidden="true"] a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(trackHrefs).toEqual([...BERLIN_DE_TARGETS, ...BERLIN_DE_TARGETS]);

    const srHrefs = await marquee
      .locator('ul a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(srHrefs).toEqual(BERLIN_DE_TARGETS);
  });

  test('deterministic committed-content fallback: de surface + US visitor → New York city page', async ({
    browser,
  }) => {
    // A US visitor on the German surface resolves New York, which has NO
    // committed German variant/ideas content → every chip falls back to the
    // New York CITY page (never a broken variant URL).
    const context = await browser.newContext({
      extraHTTPHeaders: { 'x-joinorigin-ip-country': 'US' },
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de');

    const marquee = page.getByTestId('chip-marquee');
    await expect(marquee).toBeVisible();
    await expect(marquee).toHaveAttribute('data-ip-country', 'US');

    const fallback = '/de/location/united-states/new-york/new-york';
    const trackHrefs = await marquee
      .locator('[aria-hidden="true"] a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(trackHrefs).toEqual(Array.from({ length: 14 }, () => fallback));

    // Every chip is a working link to the committed city page.
    await marquee.locator('[aria-hidden="true"] a').first().click();
    await page.waitForURL(`**${fallback}`);
    await expect(page.locator('h1')).toBeVisible();

    await context.close();
  });
});
