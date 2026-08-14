import { expect, test } from '@playwright/test';

/**
 * Hub search/filter e2e (TASK-317 fe-search-filter).
 *
 * Covers the client-side filters on the two hub pages:
 *  1. `/location` hub — the "Browse locations" directory filters
 *     country/city/group-type entries by keyword (case-insensitive), and
 *     shows an empty state when nothing matches.
 *  2. `/guides` hub — the guide card grid filters by title/keyword, and
 *     shows an empty state when nothing matches.
 *
 * Both filters are pure client-side (debounced ~180ms) — no new route, no
 * server round-trip, and the registry (`locationPageEntries` /
 * `GuidePageEntry`) is the only data source.
 *
 * These specs navigate several pages; keep them serial to avoid starving the
 * shared dev server (repo convention, TASK-218).
 */
test.describe.configure({ mode: 'serial' });

test.describe('/location hub search/filter (TASK-317)', () => {
  test('typing narrows the directory and an unmatched query shows the empty state', async ({
    page,
  }) => {
    // Reduced motion keeps GSAP Reveal/ScrollTrigger tweens from moving
    // elements mid-interaction (repo convention).
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/location');
    await expect(page.locator('h1')).toContainText('Communities by City');

    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    // Full directory is rendered initially (registry-driven).
    await expect(
      page.locator('[data-testid="location-hub-directory"] a[href="/location/germany/berlin/berlin"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/location/united-states"]',
      ),
    ).toBeVisible();

    // Type a keyword — the visible set narrows after the debounce.
    await search.fill('berlin');
    await expect(
      page.locator('[data-testid="location-hub-directory"] a[href="/location/germany/berlin/berlin"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/location/united-states"]',
      ),
    ).toHaveCount(0);

    // Case-insensitive matching.
    await search.fill('STARTUP');
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/location/germany/berlin/berlin/startup"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="location-hub-directory"] a[href="/location/germany/berlin/berlin"]'),
    ).toHaveCount(0);

    // No match → empty state replaces the directory.
    await search.fill('atlantis');
    await expect(page.getByTestId('location-hub-empty')).toBeVisible();
    await expect(page.getByTestId('location-hub-empty')).toContainText('No locations match');
    await expect(page.getByTestId('location-hub-directory')).toHaveCount(0);
  });
});

test.describe('/guides hub search/filter (TASK-317)', () => {
  test('typing narrows the guide cards and an unmatched query shows the empty state', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/guides');
    await expect(page.locator('h1')).toContainText('Community Building Guides');

    const search = page.getByRole('searchbox', { name: 'Search guides' });
    await expect(search).toBeVisible();

    // All 7 guide cards render initially.
    await expect(page.locator('[data-testid="guides-hub-grid"] a')).toHaveCount(7);

    // Type a keyword — only the matching guide card remains after debounce.
    await search.fill('meetup');
    await expect(page.locator('[data-testid="guides-hub-grid"] a')).toHaveCount(1);
    await expect(
      page.locator('[data-testid="guides-hub-grid"] a[href="/guides/organize-a-meetup"]'),
    ).toBeVisible();

    // No match → empty state replaces the grid.
    await search.fill('quantum-community');
    await expect(page.getByTestId('guides-hub-empty')).toBeVisible();
    await expect(page.getByTestId('guides-hub-empty')).toContainText('No guides match');
    await expect(page.getByTestId('guides-hub-grid')).toHaveCount(0);
  });
});
