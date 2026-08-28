import { expect, test } from '@playwright/test';

/**
 * Sprint 24 Wave-4 — /community → /network route rename + /location Origin
 * residual validation gate (TASK-578).
 *
 * Runs against the production build (`next start`, playwright webServer) and
 * verifies the PM-approved Wave-4 contracts:
 *
 *  1. /network route — /en/network + /de/network + at least 2 more locales
 *     (es, fr) resolve 200 with the new metadata title
 *     ("Network — Find Your People & Build Together | JoinOrigin"), the nav
 *     label (localized "Network" — header + footer), the
 *     "Where people find each other" hero, the Origin examples section, and
 *     the join-the-network stat (2,400+);
 *  2. Redirects — /en/community + /de/community permanently redirect
 *     (301/308) → /en/network + /de/network (next.config redirects,
 *     TASK-576); the unprefixed /community permanently redirects to
 *     /network, whose proxy 307 then lands a browser on /en/network;
 *  3. No "Community" nav label or "/community" links remain in the
 *     header/footer/explore rows/not-found;
 *  4. /location residual — hub "Origins by City" + "Find or start an Origin
 *     in your city" + "Places and Origins" banner + group types
 *     ("Startup Origins" …), country page "Origins in Germany", city page
 *     "Origins in Berlin", de city Origin phrasing, the "30 Origin event
 *     ideas" label, and zero "Communities by City" / "Find or start a
 *     community" / "How do I find communities in X?" leftovers.
 *
 * Serial mode keeps the shared prod server stable (repo convention for
 * multi-page specs); metadata/hreflang detail lives in seo.spec.ts.
 */
test.describe.configure({ mode: 'serial' });

const NETWORK_TITLE = 'Network — Find Your People & Build Together | JoinOrigin';

/** The 4 locale surfaces under test (EN + de + 2 more per TASK-578). */
const NETWORK_LOCALES = ['en', 'de', 'es', 'fr'] as const;

/** Per-locale visible chrome — t('common.nav.network'), t('network.hero.title'),
 *  t('network.sectionExamples'), t('network.joinStatValue'). */
const LOCALE_EXPECTATIONS: Record<
  (typeof NETWORK_LOCALES)[number],
  { nav: string; hero: string; examples: string; joinStat: string }
> = {
  en: {
    nav: 'Network',
    hero: 'Where people find each other',
    examples: 'Example Origins',
    joinStat: '2,400+',
  },
  de: {
    nav: 'Netzwerk',
    hero: 'Wo Menschen sich gegenseitig finden',
    examples: 'Beispiel-Origins',
    joinStat: '2.400+',
  },
  es: {
    nav: 'Red',
    hero: 'Donde las personas se encuentran',
    examples: 'Ejemplos de Origins',
    joinStat: '2.400+',
  },
  fr: {
    nav: 'Réseau',
    hero: 'Là où les personnes se retrouvent',
    examples: "Exemples d'Origins",
    joinStat: '2 400+',
  },
};

/** Static surfaces scanned for "Community" label / "/community" link
 *  leftovers (header/footer/explore rows/not-found per TASK-578). */
const LEFTOVER_SURFACES = [
  '/en/network',
  '/en/location',
  '/en/features',
  '/en/guides',
  '/en/does-not-exist-404',
] as const;

/** The location surfaces scanned for visible "Communities" leftovers. */
const LOCATION_SURFACES = [
  '/en/location',
  '/en/location/germany',
  '/en/location/germany/berlin/berlin',
  '/de/location/germany/berlin/berlin',
] as const;

test.describe('/network route — Wave-4 gate (TASK-578)', () => {
  for (const locale of NETWORK_LOCALES) {
    test(`/${locale}/network resolves 200 with title, nav, hero, examples, stat`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const response = await page.goto(`/${locale}/network`);
      expect(response?.status()).toBe(200);

      // SEO metadata: title is the hardcoded EN copy on every locale surface
      // (arch-i18n §1.2 — static-page metadata has no translations).
      await expect(page).toHaveTitle(NETWORK_TITLE);

      const { nav, hero, examples, joinStat } = LOCALE_EXPECTATIONS[locale];

      // Nav label "Network" (localized) — the header carries it inside the
      // Explore submenu (desktop hover dropdown) + mobile panel; the footer
      // carries it directly in the Product group.
      const header = page.getByTestId('header');
      await expect(header.getByTestId('explore-menu-toggle')).toBeVisible();
      await page.mouse.move(2, 2);
      await header.getByTestId('explore-dropdown').hover();
      await expect(header.getByTestId('explore-menu')).toBeVisible();
      await expect(
        header.getByTestId('explore-menu').getByRole('link', { name: nav, exact: true }),
      ).toBeVisible();
      const footer = page.getByTestId('footer');
      await expect(footer.getByRole('link', { name: nav, exact: true }).first()).toBeVisible();

      // Hero — "Where people find each other" (localized hero title).
      await expect(page.locator('h1')).toContainText(hero);

      // Origin examples section renders (localized section title).
      await expect(page.getByText(examples, { exact: true }).first()).toBeVisible();

      // Join-the-network stat (2,400+) — localized value in the count-up stat.
      const stat = page.getByTestId('community-members-stat');
      await expect(stat).toBeVisible();
      await expect(stat).toContainText(joinStat);
    });
  }

  test('the nav link points at the locale-prefixed /network surface (no /community)', async ({
    page,
  }) => {
    await page.goto('/en/network');
    const header = page.getByTestId('header');
    await page.mouse.move(2, 2);
    await header.getByTestId('explore-dropdown').hover();
    await expect(header.getByTestId('explore-menu')).toBeVisible();
    await expect(
      header.getByTestId('explore-menu').getByRole('link', { name: 'Network', exact: true }),
    ).toHaveAttribute('href', '/en/network');
    const footer = page.getByTestId('footer');
    await expect(
      footer.getByRole('link', { name: 'Network', exact: true }).first(),
    ).toHaveAttribute('href', '/en/network');
    // Explore rows (network view + features view + location inventory) never
    // link back to /community.
    await expect(page.locator('a[href*="/community"]')).toHaveCount(0);
  });
});

test.describe('/community redirects — permanent 301/308 + unprefixed chain (TASK-576/578)', () => {
  test('/en/community permanently redirects to /en/network', async ({ request }) => {
    const response = await request.get('/en/community', { maxRedirects: 0 });
    // Permanent redirect (Next emits 301/308 for `permanent: true` — the
    // SEO contract is "redirect, never 200"; 301-equivalent for equity
    // transfer, mirroring the Wave-3 guide redirect assertions).
    expect([301, 308], '/en/community must redirect permanently').toContain(response.status());
    expect(response.headers()['location']).toBe('/en/network');
  });

  test('/de/community permanently redirects to /de/network', async ({ request }) => {
    const response = await request.get('/de/community', { maxRedirects: 0 });
    expect([301, 308], '/de/community must redirect permanently').toContain(response.status());
    expect(response.headers()['location']).toBe('/de/network');
  });

  test('unprefixed /community permanently redirects to /network then lands on /en/network', async ({
    request,
    page,
  }) => {
    // First hop: the next.config `/community` → `/network` permanent redirect
    // (TASK-576). The all-routes-prefixed proxy then 307s /network → /en/network
    // (TASK-464), so a browser lands on the EN canonical surface.
    const firstHop = await request.get('/community', { maxRedirects: 0 });
    expect([301, 308], '/community must redirect permanently').toContain(firstHop.status());
    expect(firstHop.headers()['location']).toBe('/network');

    // Browser follow: /community → /network → /en/network (200).
    const response = await page.goto('/community');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/network\/?$/);
    await expect(page.locator('h1')).toContainText('Where people find each other');
  });
});

test.describe('no "Community" label or "/community" links remain (TASK-578)', () => {
  for (const surface of LEFTOVER_SURFACES) {
    test(`${surface} — header/footer/explore rows carry no "Community" label or /community link`, async ({
      page,
    }) => {
      await page.goto(surface);

      // Zero "/community" internal links anywhere in the chrome.
      const header = page.getByTestId('header');
      const footer = page.getByTestId('footer');
      await expect(header.locator('a[href*="/community"]')).toHaveCount(0);
      await expect(footer.locator('a[href*="/community"]')).toHaveCount(0);

      // The 404 boundary is self-contained (no header/footer): its Explore
      // link must point at /network (not /community) and carry the Origin
      // phrasing — never a "Community" label.
      if (surface === '/en/does-not-exist-404') {
        const notFound = page.getByTestId('not-found-page');
        await expect(notFound).toBeVisible();
        await expect(notFound.locator('a[href*="/community"]')).toHaveCount(0);
        await expect(notFound.getByRole('link', { name: 'Explore Origins →' })).toHaveAttribute(
          'href',
          '/network',
        );
        await expect(notFound.getByRole('link', { name: 'Community', exact: true })).toHaveCount(0);
        return;
      }

      // Open the header Explore submenu (desktop hover dropdown) so the
      // nav-label scan is meaningful — "Network" is present, "Community"
      // must be gone. Exact match + role-based matching excludes the
      // "Network" label and any hidden mobile-panel duplicates.
      await page.mouse.move(2, 2);
      await header.getByTestId('explore-dropdown').hover();
      await expect(header.getByTestId('explore-menu')).toBeVisible();
      await expect(
        header.getByTestId('explore-menu').getByRole('link', { name: 'Community', exact: true }),
      ).toHaveCount(0);
      await expect(footer.getByRole('link', { name: 'Community', exact: true })).toHaveCount(0);
    });
  }
});

test.describe('/location residual — Origins chrome (TASK-577/578)', () => {
  test('hub renders Origins by City + presence claim + Places and Origins banner + group types', async ({
    page,
  }) => {
    await page.goto('/en/location');

    await expect(page.locator('h1')).toContainText('Origins by City');
    await expect(page.getByText('Find or start an Origin in your city')).toBeVisible();

    const banner = page.getByTestId('location-inventory-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Places and Origins');

    const communityTypes = page.getByTestId('location-hub-directory-communityTypes');
    await expect(communityTypes).toBeVisible();
    for (const label of [
      'Startup Origins in Berlin',
      'Creative & design Origins in Berlin',
      'Political & civic Origins in Berlin',
      'Origin meetups & events in Berlin',
      'Small business Origins in Berlin',
    ]) {
      await expect(communityTypes.getByRole('link', { name: label })).toBeVisible();
    }

    // "30 Origin event ideas" label (seoContent.location.ideasLink) — the
    // hub directory ideas cards carry it with the city suffix ("30 Origin
    // event ideas in Austin"); the Berlin city page renders the exact label
    // as its ideas group-type link.
    await expect(
      page.getByText('30 Origin event ideas in', { exact: false }).first(),
    ).toBeVisible();
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(
      page
        .getByTestId('location-group-type-links')
        .getByRole('link', { name: '30 Origin event ideas' }),
    ).toHaveAttribute('href', '/en/location/germany/berlin/berlin/ideas');
  });

  test('country page /en/location/germany renders "Origins in Germany"', async ({ page }) => {
    await page.goto('/en/location/germany');
    await expect(page).toHaveTitle(/Origins in Germany \| JoinOrigin/);
    await expect(page.locator('h1')).toContainText('Origins in Germany');
  });

  test('city page /en/location/germany/berlin/berlin renders "Origins in Berlin"', async ({
    page,
  }) => {
    await page.goto('/en/location/germany/berlin/berlin');
    await expect(page).toHaveTitle(/Origins in Berlin \| JoinOrigin/);
    await expect(page.locator('h1')).toContainText('Origins in Berlin');
  });

  test('de city page uses Origin phrasing', async ({ page }) => {
    await page.goto('/de/location/germany/berlin/berlin');
    // Wave-4 (TASK-577) fixed the non-EN TITLE/H1 (pageTitles.city) to the
    // Origin model — the de city renders "Origins in Berlin" as its H1 and
    // metadata title. The de description/lead prose keeps the Wave-3
    // documented deferral (non-EN content descriptions retain "Community",
    // sprint-24-origin-location-validation.md).
    await expect(page).toHaveTitle(/Origins in Berlin \| JoinOrigin/);
    await expect(page.locator('h1')).toContainText('Origins in Berlin');
  });

  test('no visible "Communities by City" / "Find or start a community" / "How do I find communities in" leftovers', async ({
    page,
  }) => {
    for (const path of LOCATION_SURFACES) {
      await page.goto(path);
      const body = page.locator('body');
      await expect(body.getByText('Communities by City', { exact: false })).toHaveCount(0);
      await expect(body.getByText('Find or start a community', { exact: false })).toHaveCount(0);
      await expect(body.getByText('How do I find communities in', { exact: false })).toHaveCount(0);
    }
  });
});
