import { test, expect, type Page } from '@playwright/test';

/**
 * Sprint 19 E2E validation — locale routing correctness (TASK-461).
 *
 * Covers all 7 Sprint 19 goals end-to-end against the PRODUCTION server
 * (playwright.config.ts builds the app and serves it with `next start`):
 *
 *   1. every public page reachable at `/<locale>/**` for all 21 locales,
 *      with EN additionally at unprefixed `/**` and `/en/**` (zero 500s
 *      across the 21-locale route matrix),
 *   2. the link-prefix table (unprefixed EN → unprefixed; `/en/**` →
 *      `/en/**`; `/de/**` → `/de/**`; unprefixed + de cookie → `/de/**`),
 *   3. locale resolution priority: prefix > cookie > Accept-Language > en,
 *   4. first-visit header detection (no cookie → header locale wins),
 *   5. `/vi` route-stick — the prefix locale persists, cookie is set, and
 *      the page never flashes to EN,
 *   6. no hardcoded `de` in served pages — per-locale links + the sitemap
 *      covers all 21 locale surfaces (not a de-only block),
 *   7. per-locale metadata with EN fallback — canonical + hreflang stay
 *      per-locale (`x-default` → EN canonical), copy uses committed
 *      translations where they exist and EN otherwise.
 *
 * Locale assertions use the RAW served HTML (the HTTP response body), not
 * the post-hydration DOM: the client `I18nProvider` re-resolves
 * `navigator.language` after hydration, so the DOM alone would not prove
 * server-side locale forcing (repo convention — location-pages.spec.ts).
 *
 * The suite runs against the built server with workers:2; this file is
 * serial so the heavy route-matrix requests don't starve the other specs
 * (repo convention, TASK-218).
 */
test.describe.configure({ mode: 'serial' });

/** The 21 supported locales — mirrors `SUPPORTED_LOCALES` in @joinorigin/i18n. */
const SUPPORTED_LOCALES = [
  'en',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'hi',
  'id',
  'tr',
  'it',
  'pl',
  'nl',
  'vi',
  'th',
  'uk',
  'fa',
] as const;

/** Public static page paths (home + the 8 menu pages + hubs). */
const STATIC_PATHS = [
  '',
  '/features',
  '/community',
  '/docs',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/guides',
  '/glossary',
] as const;

/** The 12 L1 how-to guides (mirrors `GUIDE_SLUGS` in lib/seo/guides.ts). */
const GUIDE_SLUGS = [
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'find-a-co-founder',
  'start-a-community',
  'first-10-members',
  'keep-a-community-active',
  'hybrid-communities',
  'organize-a-meetup',
  'moderation',
] as const;

/** The path of a public page on a locale surface — EN stays unprefixed. */
function surfacePath(locale: string, path: string): string {
  if (locale === 'en') return path === '' ? '/' : path;
  return path === '' ? `/${locale}` : `/${locale}${path}`;
}

/** The `/en/**` mirror path of a public page. */
function enSurfacePath(path: string): string {
  return path === '' ? '/en' : `/en${path}`;
}

/** Fetch the raw served HTML for a URL with explicit headers.
 *  Retries transient connection resets — the shared prod server can drop a
 *  keep-alive socket while other specs sweep the sitemap (1000+ requests),
 *  and a dropped connection is not a locale-routing failure. */
async function servedHtml(
  page: Page,
  path: string,
  headers?: Record<string, string>,
): Promise<{ status: number; html: string; responseHeaders: Record<string, string> }> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await page.request.get(path, { headers });
      return {
        status: response.status(),
        html: await response.text(),
        responseHeaders: response.headers(),
      };
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(250 * (attempt + 1));
    }
  }
  throw lastError;
}

/** Assert the served HTML opens with `<html lang="<locale>" dir="<dir>">`. */
function expectLang(html: string, locale: string): void {
  const dir = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr';
  expect(html, `served <html lang> should be ${locale}`).toMatch(
    new RegExp(`<html lang="${locale}" dir="${dir}"`),
  );
}

/** The cookie value of `joinorigin_locale` from a browser context, or undefined. */
async function localeCookie(page: Page): Promise<{ value: string; path: string; sameSite: string } | undefined> {
  const cookies = await page.context().cookies();
  const cookie = cookies.find((c) => c.name === 'joinorigin_locale');
  if (!cookie) return undefined;
  return { value: cookie.value, path: cookie.path, sameSite: cookie.sameSite };
}

test.describe('Goal 1 — every public page at /<locale>/** for all 21 locales', () => {
  test('the full 21-locale × static-page route matrix serves 200 (zero 500s)', async ({ request }) => {
    test.setTimeout(300_000);
    for (const locale of SUPPORTED_LOCALES) {
      for (const path of STATIC_PATHS) {
        const url = surfacePath(locale, path);
        const response = await request.get(url);
        expect(response.status(), `${url} should be 200, not 500`).toBe(200);
      }
    }
  });

  test('EN is additionally reachable at unprefixed /** and /en/**', async ({ request }) => {
    for (const path of STATIC_PATHS) {
      for (const url of [surfacePath('en', path), enSurfacePath(path)]) {
        const response = await request.get(url);
        expect(response.status(), `${url} should be 200, not 500`).toBe(200);
      }
    }
  });

  test('every /<locale> home page serves its own locale server-side (no EN flash)', async ({
    page,
  }) => {
    for (const locale of SUPPORTED_LOCALES) {
      const { status, html } = await servedHtml(page, surfacePath(locale, ''));
      expect(status).toBe(200);
      expectLang(html, locale);
    }
  });

  test('every /<locale> guide hub + first guide serves the locale server-side', async ({ page }) => {
    for (const locale of SUPPORTED_LOCALES) {
      const hub = await servedHtml(page, surfacePath(locale, '/guides'));
      expect(hub.status).toBe(200);
      expectLang(hub.html, locale);

      const guide = await servedHtml(page, surfacePath(locale, '/guides/start-a-community'));
      expect(guide.status).toBe(200);
      expectLang(guide.html, locale);
    }
  });
});

test.describe('Goal 2 — link-prefix table', () => {
  test('unprefixed EN load keeps internal links unprefixed', async ({ page }) => {
    await page.goto('/features');
    // Footer grouped links stay unprefixed.
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/en/guides"]')).toHaveCount(0);
    // Header primary nav stays unprefixed.
    await expect(page.locator('[data-testid="header"] a[href="/docs"]').first()).toBeVisible();
  });

  test('/en/** load keeps internal links /en/** (never collapses to unprefixed)', async ({ page }) => {
    await page.goto('/en/features');
    await expect(page.locator('[data-testid="footer"] a[href="/en/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="header"] a[href="/en/docs"]').first()).toBeVisible();
  });

  test('/de/** load renders internal links /de/**', async ({ page }) => {
    await page.goto('/de/features');
    await expect(page.locator('[data-testid="footer"] a[href="/de/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="header"] a[href="/de/docs"]').first()).toBeVisible();
  });

  test('unprefixed load + de cookie renders internal links /de/**', async ({ page }) => {
    await page.context().addCookies([
      { name: 'joinorigin_locale', value: 'de', url: 'http://127.0.0.1:3100' },
    ]);
    await page.goto('/features');
    await expect(page.locator('[data-testid="footer"] a[href="/de/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="header"] a[href="/de/docs"]').first()).toBeVisible();
  });

  test('a non-EN locale surface prefixes its internal links with its own locale', async ({
    page,
  }) => {
    await page.goto('/es/features');
    await expect(page.locator('[data-testid="footer"] a[href="/es/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="header"] a[href="/es/docs"]').first()).toBeVisible();
  });
});

test.describe('Goal 3 — priority: prefix > cookie > header > en', () => {
  test('explicit /de/** prefix beats cookie and Accept-Language', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/de/features', {
      cookie: 'joinorigin_locale=en',
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('de');
    expectLang(html, 'de');
  });

  test('cookie beats Accept-Language on unprefixed routes', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/features', {
      cookie: 'joinorigin_locale=de',
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('de');
    expectLang(html, 'de');
  });

  test('Accept-Language beats the en default on unprefixed routes', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/features', {
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
    expectLang(html, 'fr');
  });

  test('unprefixed route with no cookie/header falls back to en', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/features');
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('en');
    expectLang(html, 'en');
  });

  test('q=0 exclusion drops a high-order range (RFC 9110)', async ({ page }) => {
    const { responseHeaders } = await servedHtml(page, '/features', {
      'accept-language': 'de-DE;q=0,fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
  });
});

test.describe('Goal 4 — first-visit header detection', () => {
  test('first visit with no cookie resolves the Accept-Language locale (de)', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/features', {
      'accept-language': 'de-DE,de;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('de');
    expectLang(html, 'de');
  });

  test('region-variant fallback: pt-PT resolves to the supported pt-BR surface', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/features', {
      'accept-language': 'pt-PT,pt;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('pt-BR');
    expectLang(html, 'pt-BR');
  });

  test('unmatchable ranges skip to the next supported range', async ({ page }) => {
    const { responseHeaders } = await servedHtml(page, '/features', {
      'accept-language': 'xx-YY;q=1,it-IT,it;q=0.9,en;q=0.8',
    });
    expect(responseHeaders['x-joinorigin-locale']).toBe('it');
  });
});

test.describe('Goal 5 — /vi route-stick (no flash to EN, cookie set)', () => {
  test('first visit to /vi/** sets joinorigin_locale=vi and serves vi', async ({ page }) => {
    await page.context().clearCookies();
    const response = await page.goto('/vi/features');
    expect(response?.status()).toBe(200);
    // Raw served HTML is already vi — the first paint never flashes EN.
    expectLang((await response?.text()) ?? '', 'vi');

    const cookie = await localeCookie(page);
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe('vi');
    expect(cookie?.path).toBe('/');
    expect(cookie?.sameSite).toBe('Lax');

    // Post-hydration DOM stays vi.
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  });

  test('after the first /vi/** visit, the locale sticks on unprefixed routes', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/vi/features');
    expect((await localeCookie(page))?.value).toBe('vi');

    // Navigating to the unprefixed home in the same session keeps vi — no EN flash.
    const homeResponse = await page.goto('/');
    expect(homeResponse?.status()).toBe(200);
    expectLang((await homeResponse?.text()) ?? '', 'vi');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  });

  test('every locale surface route-sticks (de + es + ja + ar spot checks)', async ({ page }) => {
    for (const locale of ['de', 'es', 'ja', 'ar'] as const) {
      await page.context().clearCookies();
      const response = await page.goto(`/${locale}/features`);
      expect(response?.status()).toBe(200);
      expectLang((await response?.text()) ?? '', locale);
      expect((await localeCookie(page))?.value).toBe(locale);
    }
  });

  test('an existing locale cookie is never overwritten by a prefixed visit', async ({ page }) => {
    await page.context().clearCookies();
    await page.context().addCookies([
      { name: 'joinorigin_locale', value: 'vi', url: 'http://127.0.0.1:3100' },
    ]);
    // The prefix forces de for THIS request...
    const response = await page.goto('/de/features');
    expect(response?.status()).toBe(200);
    expectLang((await response?.text()) ?? '', 'de');
    // ...but the user's explicit cookie is preserved.
    expect((await localeCookie(page))?.value).toBe('vi');
  });
});

test.describe('Goal 6 — no hardcoded de in served pages', () => {
  test('sitemap covers all 21 locale surfaces (de is not special-cased)', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    for (const locale of SUPPORTED_LOCALES) {
      expect(paths, `sitemap should contain the ${locale} surface home`).toContain(
        surfacePath(locale, ''),
      );
    }
    // Every locale's static pages are individually indexable URLs.
    for (const locale of ['es', 'fr', 'ja', 'vi', 'zh-CN'] as const) {
      for (const path of ['/features', '/docs', '/glossary', '/guides']) {
        expect(paths, `sitemap should contain ${surfacePath(locale, path)}`).toContain(
          surfacePath(locale, path),
        );
      }
    }
    // The full hreflang cluster is present (x-default + every locale).
    expect(xml).toContain('hreflang="x-default"');
    for (const locale of SUPPORTED_LOCALES) {
      expect(xml, `sitemap hreflang cluster should contain ${locale}`).toContain(
        `hreflang="${locale}"`,
      );
    }
  });

  test('non-de locale surfaces render their own prefix links, never hardcoded /de/', async ({
    page,
  }) => {
    for (const locale of ['es', 'vi', 'ja'] as const) {
      await page.goto(surfacePath(locale, '/features'));
      await expect(
        page.locator(`[data-testid="footer"] a[href="${surfacePath(locale, '/guides')}"]`).first(),
      ).toBeVisible();
      // No hardcoded German internal link outside the language switcher
      // (language options are role=option rows, not anchors).
      await expect(
        page.locator('a[href^="/de/"]'),
        `no hardcoded /de/ links on ${surfacePath(locale, '/features')}`,
      ).toHaveCount(0);
    }
  });

  test('de surface links stay on the de tree (never leak EN canonical)', async ({ page }) => {
    await page.goto('/de/features');
    await expect(page.locator('[data-testid="footer"] a[href="/de/guides"]').first()).toBeVisible();
    // The Berlin de location cluster links are /de/-prefixed.
    await page.goto('/de/location/germany/berlin/berlin');
    await expect(
      page.locator('a[href="/de/location/germany/berlin/berlin/startup"]').first(),
    ).toBeVisible();
  });

  test('sitemap excludes Tier-3 / failed-gate pages (noindex, follow)', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const xml = await response.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(paths).not.toContain('/location/united-states/texas/dallas');
  });
});

test.describe('Goal 7 — per-locale metadata with EN fallback', () => {
  test('de Berlin location page uses committed German metadata + per-locale hreflang', async ({
    page,
  }) => {
    await page.goto('/de/location/germany/berlin/berlin');
    // German description from the committed de content file.
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Finde oder gründe Communities in Berlin/,
    );
    // Canonical + hreflang point at the /de/ surface.
    const canonical = page.locator('link[rel="canonical"]');
    expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(
      '/de/location/germany/berlin/berlin',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });

  test('de guide page uses committed German metadata + per-locale hreflang', async ({ page }) => {
    await page.goto('/de/guides/start-a-community');
    await expect(page).toHaveTitle(/^So startest du eine Community/);
    const canonical = page.locator('link[rel="canonical"]');
    expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(
      '/de/guides/start-a-community',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });

  test('static page EN fallback: /es/features keeps EN copy with /es canonical + hreflang', async ({
    page,
  }) => {
    await page.goto('/es/features');
    // No translated static copy — title stays EN.
    await expect(page).toHaveTitle(
      'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
    );
    const canonical = page.locator('link[rel="canonical"]');
    expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe('/es/features');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });

  test('location page EN fallback: /es/location/... keeps EN copy with /es canonical', async ({
    page,
  }) => {
    await page.goto('/es/location/germany/berlin/berlin');
    // es has no committed Berlin content — EN copy serves, canonical stays /es.
    await expect(page.locator('h1')).toContainText('Communities in Berlin');
    const canonical = page.locator('link[rel="canonical"]');
    expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(
      '/es/location/germany/berlin/berlin',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });

  test('every /<locale> static wrapper carries self + en + x-default hreflang', async ({
    page,
  }) => {
    for (const locale of ['es', 'de', 'vi', 'ja', 'zh-CN', 'ar'] as const) {
      await page.goto(surfacePath(locale, '/docs'));
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      const canonical = page.locator('link[rel="canonical"]');
      expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe(
        surfacePath(locale, '/docs'),
      );
    }
  });

  test('EN guide pages carry the full translated-locale hreflang cluster', async ({ page }) => {
    await page.goto('/guides/start-a-community');
    // All 20 non-EN locales have committed guide content → full cluster.
    for (const locale of SUPPORTED_LOCALES) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
});
