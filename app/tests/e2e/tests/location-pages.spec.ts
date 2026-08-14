import { test, expect, type Page } from '@playwright/test';

/**
 * Location pages e2e (TASK-308 fe-location-pages).
 *
 * Covers the `/location/**` dynamic surface + the Berlin `de` locale:
 *  1. hub → country → region → city → variant navigation (internal-link mesh),
 *  2. per-page canonical + robots meta (noindex for Tier-3 / failed gates),
 *  3. Berlin `de` pages serve the German body + full hreflang set
 *     (de self + en + x-default → EN) via `alternates.languages`,
 *  4. EN Berlin pages emit the bidirectional hreflang cluster; EN-only pages
 *     (hub/country/region/NYC) emit NO hreflang (phase A),
 *  5. JSON-LD: BreadcrumbList everywhere, FAQPage on content pages, ItemList
 *     (30 ideas) on idea pages.
 *
 * These specs navigate several pages; keep them serial to avoid starving the
 * shared dev server (repo convention, TASK-218).
 */
test.describe.configure({ mode: 'serial' });

/** Every canonical path checked for hub→country→region→city→variant. */
const MESH = [
  '/location',
  '/location/germany',
  '/location/germany/berlin',
  '/location/germany/berlin/berlin',
  '/location/germany/berlin/berlin/startup',
];

const EN_ONLY = [
  '/location',
  '/location/united-states',
  '/location/united-states/new-york',
  '/location/united-states/new-york/new-york',
];

async function ldTypes(page: Page): Promise<string[]> {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((s) => {
      const parsed = JSON.parse(s.textContent ?? '{}') as
        Record<string, unknown> | Record<string, unknown>[];
      if (Array.isArray(parsed)) return parsed.map((n) => n['@type'] as string);
      return [parsed['@type'] as string];
    }),
  );
}

test.describe('location internal-link mesh navigation', () => {
  test('hub → country → region → city → variant navigates through real links', async ({
    page,
  }) => {
    // Reduced motion keeps GSAP Reveal/ScrollTrigger tweens from moving
    // elements mid-click (repo convention — hero/ticker specs do the same),
    // so in-page link navigation is deterministic.
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // The dev server compiles the first dynamic-route request on demand;
    // navigate directly first to warm each route (serial suite), then assert
    // the real in-page link navigation.
    await page.goto('/location/germany/berlin/berlin/startup');
    await expect(page.locator('h1')).toContainText('Startup communities in Berlin');
    await page.goto('/location/germany/berlin/berlin');
    await expect(page.locator('h1')).toContainText('Communities in Berlin');

    await page.goto('/location');
    await expect(page).toHaveTitle(/Communities by City/);
    const berlinLink = page.locator('a[href="/location/germany/berlin/berlin"]').first();
    await expect(berlinLink).toBeVisible();
    await berlinLink.click();
    await page.waitForURL('**/location/germany/berlin/berlin', { timeout: 120_000 });

    // City page breadcrumbs link up to the region/country/hub.
    const regionLink = page.locator('a[href="/location/germany/berlin"]').first();
    await expect(regionLink).toBeVisible();
    await regionLink.click();
    await page.waitForURL('**/location/germany/berlin');

    const countryLink = page.locator('a[href="/location/germany"]').first();
    await expect(countryLink).toBeVisible();
    await countryLink.click();
    await page.waitForURL('**/location/germany');

    const hubLink = page.locator('a[href="/location"]').first();
    await expect(hubLink).toBeVisible();
    await hubLink.click();
    await page.waitForURL('**/location');

    // Group-type links from the city page reach the startup variant. The
    // links sit below the fold inside a GSAP `Reveal` — scroll into view and
    // let the entrance animation settle so the native click isn't dropped.
    await page.goto('/location/germany/berlin/berlin');
    const startupLink = page.locator('a[href="/location/germany/berlin/berlin/startup"]').first();
    await expect(startupLink).toBeVisible();
    await startupLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await startupLink.click();
    await page.waitForURL('**/location/germany/berlin/berlin/startup', { timeout: 120_000 });
    await expect(page).toHaveTitle(/Startup communities in Berlin/);
  });

  test('every mesh level renders a single h1 + breadcrumbs + waitlist CTA', async ({ page }) => {
    for (const path of MESH) {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);
      await expect(page.locator('[data-testid="location-breadcrumbs"]')).toBeVisible();
      await expect(page.locator('[data-testid="location-cta-band"]')).toBeVisible();
    }
  });
});

test.describe('location canonical + robots', () => {
  for (const path of MESH) {
    test(`${path} emits canonical + index,follow`, async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = (await canonical.getAttribute('href')) ?? '';
      expect(new URL(canonicalHref).pathname).toBe(path);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    });
  }

  test('Tier-3 city (no content) is served noindex, follow', async ({ page }) => {
    await page.goto('/location/united-states/texas/austin');
    expect(await page.locator('h1').count()).toBe(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  });

  test('unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/location/atlantis');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Berlin de pages + hreflang', () => {
  const DE_PAGES = [
    '/de/location/germany/berlin/berlin',
    '/de/location/germany/berlin/berlin/startup',
    '/de/location/germany/berlin/berlin/ideas',
  ];

  for (const path of DE_PAGES) {
    test(`${path} serves German body + full hreflang (de self + en + x-default→EN)`, async ({
      page,
    }) => {
      await page.goto(path);
      expect(await page.locator('h1').count()).toBe(1);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(path);

      const de = page.locator('link[rel="alternate"][hreflang="de"]');
      await expect(de).toHaveCount(1);
      expect(new URL((await de.getAttribute('href')) ?? '').pathname).toBe(path);

      const en = page.locator('link[rel="alternate"][hreflang="en"]');
      await expect(en).toHaveCount(1);
      expect(new URL((await en.getAttribute('href')) ?? '').pathname).toBe(
        path.replace(/^\/de/, ''),
      );

      const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
      await expect(xDefault).toHaveCount(1);
      expect(new URL((await xDefault.getAttribute('href')) ?? '').pathname).toBe(
        path.replace(/^\/de/, ''),
      );

      // German body copy from the per-locale content file.
      if (path.endsWith('/berlin/berlin')) {
        await expect(
          page.getByText(/Berlin ist eine Stadt, die von Communities lebt/),
        ).toBeVisible();
      }
      if (path.endsWith('/ideas')) {
        await expect(page.locator('[data-testid="location-idea-grid"]').first()).toBeVisible();
        expect(await page.locator('[data-testid="location-idea-grid"]').count()).toBe(6);
      }
    });
  }

  test('EN Berlin pages emit bidirectional hreflang (en + de + x-default)', async ({ page }) => {
    await page.goto('/location/germany/berlin/berlin');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

    const de = page.locator('link[rel="alternate"][hreflang="de"]');
    expect(new URL((await de.getAttribute('href')) ?? '').pathname).toBe(
      '/de/location/germany/berlin/berlin',
    );
  });

  test('/de/location/germany/berlin/berlin serves <html lang="de"> without a de cookie or header (TASK-315)', async ({
    page,
  }) => {
    // No German cookie or Accept-Language header: the /de/* prefix alone must
    // force the server-side locale so crawlers see `<html lang="de">`. Assert
    // the RAW served HTML (the HTTP response body) — the client
    // I18nProvider re-resolves navigator.language after hydration, so the
    // DOM alone would not prove server-side forcing.
    await page.context().clearCookies();
    const response = await page.goto('/de/location/germany/berlin/berlin');
    expect(response?.status()).toBe(200);
    const servedHtml = (await response?.text()) ?? '';
    expect(servedHtml).toContain('<html lang="de" dir="ltr">');
  });

  for (const path of EN_ONLY) {
    test(`${path} (EN-only) emits NO hreflang alternates`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    });
  }
});

test.describe('location JSON-LD', () => {
  test('city page emits BreadcrumbList + FAQPage', async ({ page }) => {
    await page.goto('/location/germany/berlin/berlin');
    const types = await ldTypes(page);
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
  });

  test('idea page emits BreadcrumbList + FAQPage + ItemList (30 items)', async ({ page }) => {
    await page.goto('/location/germany/berlin/berlin/ideas');
    const types = await ldTypes(page);
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(types).toContain('ItemList');

    const itemList = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => {
        for (const s of scripts) {
          const parsed = JSON.parse(s.textContent ?? '{}') as Record<string, unknown>;
          if (parsed['@type'] === 'ItemList') return parsed;
        }
        return null;
      });
    expect((itemList?.itemListElement as unknown[]).length).toBe(30);
  });
});
