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
 * TASK-485 — the `/location` per-section filter matches each entry's
 * `searchText` (active-locale name + EN name + dataset country/region names),
 * so geographic keywords like "Colombia"/"Italy" resolve their country card
 * AND the cities / community types / event ideas scoped to them.
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

    await page.goto('/en/location');
    await expect(page.locator('h1')).toContainText('Communities by City');

    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    // Full directory is rendered initially (registry-driven).
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/germany/berlin/berlin"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="location-hub-directory"] a[href="/en/location/united-states"]'),
    ).toBeVisible();
    // The Sprint 20 mesh cities (Tier-2, indexable) are part of the
    // directory — dubai + buenos-aires (TASK-475).
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/united-arab-emirates/dubai/dubai"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/argentina/buenos-aires-f-d/buenos-aires"]',
      ),
    ).toBeVisible();

    // Type a keyword — the visible set narrows after the debounce.
    await search.fill('berlin');
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/germany/berlin/berlin"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="location-hub-directory"] a[href="/en/location/united-states"]'),
    ).toHaveCount(0);

    // Case-insensitive matching.
    await search.fill('STARTUP');
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/germany/berlin/berlin/startup"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/germany/berlin/berlin"]',
      ),
    ).toHaveCount(0);

    // No match → empty state replaces the directory.
    await search.fill('atlantis');
    await expect(page.getByTestId('location-hub-empty')).toBeVisible();
    await expect(page.getByTestId('location-hub-empty')).toContainText('No locations match');
    await expect(page.getByTestId('location-hub-directory')).toHaveCount(0);
  });

  test('mesh-city search: dubai + buenos-aires narrow the directory (case-insensitive, TASK-475)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    await expect(page.locator('h1')).toContainText('Communities by City');

    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    // Filtering 'dubai' shows the dubai city page + its group-type variant
    // entries, and hides unrelated directory cards.
    await search.fill('dubai');
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/united-arab-emirates/dubai/dubai"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/united-arab-emirates/dubai/dubai/startup"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/argentina/buenos-aires-f-d/buenos-aires"]',
      ),
    ).toHaveCount(0);

    // Case-insensitive: uppercase 'BUENOS' matches the buenos-aires cards
    // and hides the dubai cards.
    await search.fill('BUENOS');
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/argentina/buenos-aires-f-d/buenos-aires"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="location-hub-directory"] a[href="/en/location/united-arab-emirates/dubai/dubai"]',
      ),
    ).toHaveCount(0);
  });
});

test.describe('Browse-locations 5-section search filters WITHIN each section (TASK-480)', () => {
  test('typing "berlin" keeps the matching sections and collapses the unmatched ones', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    await expect(page.locator('h1')).toContainText('Communities by City');

    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('berlin');
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    // Sections with no matches collapse (TASK-480): no country is named
    // "Berlin", so the countries section disappears…
    await expect(page.getByTestId('location-hub-directory-countries')).toHaveCount(0);
    // …while the region/city/community-type/event-idea sections keep ONLY
    // their Berlin matches.
    await expect(page.getByTestId('location-hub-directory-regions')).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory-regions').getByRole('link', {
        name: 'Communities in Berlin, Germany',
      }),
    ).toBeVisible();
    await expect(page.getByTestId('location-hub-directory-cities')).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory-cities').getByRole('link', {
        name: 'Communities in Berlin',
      }),
    ).toBeVisible();
    await expect(page.getByTestId('location-hub-directory-communityTypes')).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory-communityTypes').getByRole('link', {
        name: 'Startup communities in Berlin',
      }),
    ).toBeVisible();
    await expect(page.getByTestId('location-hub-directory-eventIdeas')).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory-eventIdeas').getByRole('link', {
        name: '30 community event ideas in Berlin',
      }),
    ).toBeVisible();
    // Non-Berlin entries in a matching section are filtered out too.
    await expect(
      page.getByTestId('location-hub-directory-cities').getByRole('link', {
        name: 'Communities in Munich, Bavaria',
      }),
    ).toHaveCount(0);
  });

  test('typing a community type narrows to the communityTypes section only', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('startup');
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    // Only the community-types section matches "startup" (no country, region,
    // city, or event-idea entry carries that keyword) — TASK-480 filters stay
    // within each section instead of hiding the whole directory.
    await expect(page.getByTestId('location-hub-directory-countries')).toHaveCount(0);
    await expect(page.getByTestId('location-hub-directory-regions')).toHaveCount(0);
    await expect(page.getByTestId('location-hub-directory-cities')).toHaveCount(0);
    await expect(page.getByTestId('location-hub-directory-eventIdeas')).toHaveCount(0);
    await expect(page.getByTestId('location-hub-directory-communityTypes')).toBeVisible();
    await expect(
      page.getByTestId('location-hub-directory-communityTypes').getByRole('link', {
        name: 'Startup communities in Berlin',
      }),
    ).toBeVisible();
  });

  test('typing "germany" keeps countries + regions + cities + event ideas via searchText', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('germany');
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    await expect(
      page
        .getByTestId('location-hub-directory-countries')
        .getByRole('link', { name: 'Communities in Germany' }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId('location-hub-directory-regions')
        .getByRole('link', { name: 'Communities in Berlin, Germany' }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId('location-hub-directory-cities')
        .getByRole('link', { name: 'Communities in Berlin' }),
    ).toBeVisible();
    // Event ideas match through the dataset country name in searchText
    // (TASK-485) — the Berlin + Munich ideas pages resolve for "germany".
    await expect(page.getByTestId('location-hub-directory-eventIdeas')).toBeVisible();
    await expect(
      page
        .getByTestId('location-hub-directory-eventIdeas')
        .getByRole('link', { name: '30 community event ideas in Berlin' }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId('location-hub-directory-eventIdeas')
        .getByRole('link', { name: '30 community event ideas in Munich' }),
    ).toBeVisible();
  });

  test('unmatched query collapses every section and shows the empty state', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('atlantis-404');
    await expect(page.getByTestId('location-hub-empty')).toBeVisible();
    await expect(page.getByTestId('location-hub-directory')).toHaveCount(0);
  });
});

test.describe('Browse-locations searchText inventory search (TASK-485/TASK-487)', () => {
  test('searching "colombia" shows the Colombia country card + all 3 Colombian cities', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    await expect(page.locator('h1')).toContainText('Communities by City');

    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('colombia');
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    // The country card matches through the dataset country name in
    // searchText — its card title alone has no "colombia" (TASK-485).
    await expect(
      directory
        .getByTestId('location-hub-directory-countries')
        .getByRole('link', { name: 'Communities in Colombia' }),
    ).toBeVisible();

    // All 3 Colombian content-rich cities resolve (Bogota, Medellin,
    // Barranquilla — the 56-city content-rich set, TASK-484).
    const cities = directory.getByTestId('location-hub-directory-cities');
    for (const city of [
      'Communities in Bogota, Bogota D.C.',
      'Communities in Medellin, Antioquia',
      'Communities in Barranquilla, Atlantico',
    ]) {
      await expect(cities.getByRole('link', { name: city })).toBeVisible();
    }

    // Community types (3 cities × 5) + event ideas (3) are scoped to the
    // country through the same searchText field.
    await expect(
      directory
        .getByTestId('location-hub-directory-communityTypes')
        .getByRole('link', { name: 'Startup communities in Bogota' }),
    ).toBeVisible();
    await expect(
      directory
        .getByTestId('location-hub-directory-communityTypes')
        .getByRole('link', { name: 'Political & civic communities in Medellin' }),
    ).toBeVisible();
    await expect(
      directory
        .getByTestId('location-hub-directory-eventIdeas')
        .getByRole('link', { name: '30 community event ideas in Barranquilla' }),
    ).toBeVisible();

    // Non-Colombian entries are filtered out.
    await expect(cities.getByRole('link', { name: 'Communities in Milan, Lombardy' })).toHaveCount(
      0,
    );
    await expect(
      directory
        .getByTestId('location-hub-directory-countries')
        .getByRole('link', { name: 'Communities in Italy' }),
    ).toHaveCount(0);
  });

  test('searching "italy" shows the Italy country card + Milan + Milan variants (case-insensitive)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/location');
    const search = page.getByRole('searchbox', { name: 'Search locations' });
    await expect(search).toBeVisible();

    await search.fill('ITALY');
    const directory = page.getByTestId('location-hub-directory');
    await expect(directory).toBeVisible();

    await expect(
      directory
        .getByTestId('location-hub-directory-countries')
        .getByRole('link', { name: 'Communities in Italy' }),
    ).toBeVisible();
    const cities = directory.getByTestId('location-hub-directory-cities');
    await expect(
      cities.getByRole('link', { name: 'Communities in Milan, Lombardy' }),
    ).toBeVisible();

    // Exactly 5 community-type variants + the single ideas page for Milan.
    await expect(
      directory.getByTestId('location-hub-directory-communityTypes').locator('a'),
    ).toHaveCount(5);
    await expect(
      directory
        .getByTestId('location-hub-directory-communityTypes')
        .getByRole('link', { name: 'Startup communities in Milan' }),
    ).toBeVisible();
    await expect(
      directory
        .getByTestId('location-hub-directory-eventIdeas')
        .getByRole('link', { name: '30 community event ideas in Milan' }),
    ).toBeVisible();

    // Colombian entries are filtered out of the Italy view.
    await expect(
      cities.getByRole('link', { name: 'Communities in Bogota, Bogota D.C.' }),
    ).toHaveCount(0);
  });
});

test.describe('/guides hub search/filter (TASK-317)', () => {
  test('typing narrows the guide cards and an unmatched query shows the empty state', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en/guides');
    await expect(page.locator('h1')).toContainText('Community Building Guides');

    const search = page.getByRole('searchbox', { name: 'Search guides' });
    await expect(search).toBeVisible();

    // All 12 guide cards render initially (TASK-353 — 7 original + 5 new).
    await expect(page.locator('[data-testid="guides-hub-grid"] a')).toHaveCount(12);

    // Type a keyword — only the matching guide card remains after debounce.
    await search.fill('meetup');
    await expect(page.locator('[data-testid="guides-hub-grid"] a')).toHaveCount(1);
    await expect(
      page.locator('[data-testid="guides-hub-grid"] a[href="/en/guides/organize-a-meetup"]'),
    ).toBeVisible();

    // No match → empty state replaces the grid.
    await search.fill('quantum-community');
    await expect(page.getByTestId('guides-hub-empty')).toBeVisible();
    await expect(page.getByTestId('guides-hub-empty')).toContainText('No guides match');
    await expect(page.getByTestId('guides-hub-grid')).toHaveCount(0);
  });
});
