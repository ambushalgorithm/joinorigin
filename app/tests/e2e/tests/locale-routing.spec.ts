import { test, expect, type Page } from '@playwright/test';

/**
 * Sprint 19 E2E validation — locale routing correctness + all-routes-prefixed
 * + client locale toggle, NO-COOKIE URL-ONLY contract (TASK-461 + TASK-467 +
 * TASK-470 follow-ups).
 *
 * Covers the Sprint 19 goals end-to-end against the PRODUCTION server
 * (playwright.config.ts builds the app and serves it with `next start`):
 *
 *   1. every public page reachable at `/<locale>/**` for all 21 locales
 *      (zero 500s across the 21-locale route matrix), with EN canonical at
 *      `/en/**` and every unprefixed `/**` 307-redirecting to
 *      `/<resolved-locale>/...` (TASK-464 all-routes-prefixed),
 *   2. the always-prefixed link table — every rendered internal link carries
 *      the `/<locale>` prefix (EN surfaces render `/en/**`, never unprefixed),
 *   3. locale resolution priority: prefix > Accept-Language > en — the
 *      `joinorigin_locale` cookie is FULLY REMOVED (TASK-468): the prefixed
 *      path always wins, unprefixed routes resolve from the Accept-Language
 *      header ONLY (RFC 9110 q-values), a legacy cookie is ignored, and NO
 *      cookie is ever written,
 *   4. first-ever unprefixed visit redirects by Accept-Language — fr/de/vi
 *      headers → `/fr` `/de` `/vi` (asserted on the unprefixed home `/`),
 *      `en` fallback with no header,
 *   5. URL-only locale persistence — `/vi` never flashes to EN (raw served
 *      HTML + post-hydration DOM), and no `joinorigin_locale` cookie is ever
 *      written anywhere,
 *   6. no hardcoded `de` in served pages — per-locale links + the sitemap
 *      covers all 21 locale surfaces (not a de-only block),
 *   7. per-locale metadata with EN fallback — canonical + hreflang stay
 *      per-locale (`x-default` → `/en/**` canonical), copy uses committed
 *      translations where they exist and EN otherwise,
 *   8. (TASK-470) the Join-the-waitlist modal renders in the URL's language —
 *      `/es` shows Spanish modal copy, `/vi` Vietnamese, `/en` English
 *      (URL-only: no cookie, no navigator.language guess),
 *   9. (follow-up A, TASK-465) client-side locale sync on SPA navigation —
 *      navigating to `/<language>/**` toggles the UI language instantly
 *      (switcher label + header chrome + `<html lang>`); no cookie is
 *      written by the toggle,
 *  10. (follow-up B, TASK-464/466) all routes are locale-prefixed — unprefixed
 *      `/**` 307-redirects, `/en/**` is the EN canonical surface, system /
 *      non-HTML routes (sitemap.xml, robots.txt, llms.txt, /api) stay
 *      unprefixed and unredirected.
 *
 * Locale assertions use the RAW served HTML (the HTTP response body), not
 * the post-hydration DOM: the client `I18nProvider` no longer re-resolves
 * `navigator.language` after hydration (TASK-468 removed the override), but
 * raw HTML still proves server-side locale forcing (repo convention —
 * location-pages.spec.ts).
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

/** The `/<locale>` surface path of a public page — ALL locales incl. EN are
 *  prefixed (all-routes-prefixed, TASK-464): home → `/<locale>`, subpages →
 *  `/<locale>/<path>`. */
function surfacePath(locale: string, path: string): string {
  return path === '' ? `/${locale}` : `/${locale}${path}`;
}

/** The unprefixed path of a public page — these 307-redirect at the proxy. */
function unprefixedPath(path: string): string {
  return path === '' ? '/' : path;
}

/** Fetch the raw served HTML for a URL with explicit headers.
 *  Follows redirects (default) — the FINAL response body is what a browser
 *  paints. Retries transient connection resets — the shared prod server can
 *  drop a keep-alive socket while other specs sweep the sitemap (1000+
 *  requests), and a dropped connection is not a locale-routing failure. */
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

/** Fetch the RAW redirect response (no redirect following) for an unprefixed
 *  route — asserts the 307 + `location` target of the all-routes-prefixed
 *  proxy (TASK-464). */
async function redirectTarget(
  page: Page,
  path: string,
  headers?: Record<string, string>,
): Promise<{ status: number; location: string | null; responseHeaders: Record<string, string> }> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await page.request.get(path, { headers, maxRedirects: 0 });
      return {
        status: response.status(),
        location: response.headers()['location'] ?? null,
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

/** URL-only contract (TASK-468): the `joinorigin_locale` cookie must NEVER be
 *  written — by a prefixed visit, an unprefixed redirect chain, a SPA toggle,
 *  or the waitlist modal. Assert the browser context has no such cookie. */
async function expectNoLocaleCookie(page: Page): Promise<void> {
  const cookies = await page.context().cookies();
  const localeCookie = cookies.find((c) => c.name === 'joinorigin_locale');
  expect(
    localeCookie,
    'joinorigin_locale cookie must never be written (URL-only locale, TASK-468)',
  ).toBeUndefined();
}

test.describe('Goal 1 — every public page at /<locale>/** for all 21 locales (zero 500s)', () => {
  test('the full 21-locale × static-page route matrix serves 200 (zero 500s)', async ({
    request,
  }) => {
    test.setTimeout(300_000);
    for (const locale of SUPPORTED_LOCALES) {
      for (const path of STATIC_PATHS) {
        const url = surfacePath(locale, path);
        const response = await request.get(url);
        expect(response.status(), `${url} should be 200, not 500`).toBe(200);
      }
    }
  });

  test('the EN canonical /en/** surface serves every public page', async ({ request }) => {
    for (const path of STATIC_PATHS) {
      const url = surfacePath('en', path);
      const response = await request.get(url);
      expect(response.status(), `${url} should be 200, not 500`).toBe(200);
    }
  });

  test('every unprefixed /** page 307-redirects to its resolved-locale surface (TASK-464)', async ({
    page,
  }) => {
    for (const path of STATIC_PATHS) {
      const url = unprefixedPath(path);
      const { status, location } = await redirectTarget(page, url);
      expect(status, `${url} should 307-redirect`).toBe(307);
      // No header → resolves to the en default → /en/**.
      expect(location, `${url} should redirect to the en surface`).toBe(surfacePath('en', path));
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

  test('every /<locale> guide hub + first guide serves the locale server-side', async ({
    page,
  }) => {
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

test.describe('Goal 2 — always-prefixed link table (TASK-464)', () => {
  test('unprefixed EN load (307 → /en/**) renders internal links /en/**', async ({ page }) => {
    // The unprefixed route 307-redirects to /en/features; the browser lands
    // on the EN canonical surface and every internal link is /en/**.
    await page.goto('/features');
    await expect(page).toHaveURL(/\/en\/features$/);
    // Footer grouped links carry the en prefix — never unprefixed.
    await expect(page.locator('[data-testid="footer"] a[href="/en/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    // Header primary nav carries the en prefix.
    await expect(page.locator('[data-testid="header"] a[href="/en/docs"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="header"] a[href="/docs"]')).toHaveCount(0);
  });

  test('/en/** load keeps internal links /en/** (never collapses to unprefixed)', async ({
    page,
  }) => {
    await page.goto('/en/features');
    await expect(page.locator('[data-testid="footer"] a[href="/en/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="header"] a[href="/en/docs"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="header"] a[href="/docs"]')).toHaveCount(0);
  });

  test('/de/** load renders internal links /de/**', async ({ page }) => {
    await page.goto('/de/features');
    await expect(page.locator('[data-testid="footer"] a[href="/de/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="header"] a[href="/de/docs"]').first()).toBeVisible();
  });

  test('unprefixed load + de Accept-Language (307 → /de/**) renders internal links /de/**', async ({
    browser,
  }) => {
    // A German-locale browser context sends `Accept-Language: de-DE,de;q=0.9`
    // (real first-visit behavior); no cookie participates (TASK-468). The
    // unprefixed route 307-redirects to /de/features and the landed surface
    // prefixes its internal links /de/**.
    const context = await browser.newContext({
      locale: 'de-DE',
      baseURL: 'http://127.0.0.1:3100',
    });
    const page = await context.newPage();
    try {
      await page.goto('/features');
      await expect(page).toHaveURL(/\/de\/features$/);
      await expect(
        page.locator('[data-testid="footer"] a[href="/de/guides"]').first(),
      ).toBeVisible();
      await expect(page.locator('[data-testid="footer"] a[href="/guides"]')).toHaveCount(0);
      await expect(page.locator('[data-testid="header"] a[href="/de/docs"]').first()).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test('a non-EN locale surface prefixes its internal links with its own locale', async ({
    page,
  }) => {
    await page.goto('/es/features');
    await expect(page.locator('[data-testid="footer"] a[href="/es/guides"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="header"] a[href="/es/docs"]').first()).toBeVisible();
  });

  test('every header/footer internal anchor carries the locale prefix (zero unprefixed)', async ({
    page,
  }) => {
    // The EN canonical surface must contain NO unprefixed internal links:
    // every header/footer href that starts with `/` carries `/en/...` (the
    // all-routes-prefixed contract — unprefixed URLs 307-redirect).
    await page.goto('/en/features');
    const internalHrefs = await page
      .locator('[data-testid="header"] a, [data-testid="footer"] a')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => (a as HTMLAnchorElement).getAttribute('href'))
          .filter(
            (href): href is string => !!href && href.startsWith('/') && !href.startsWith('#'),
          ),
      );
    expect(internalHrefs.length).toBeGreaterThan(0);
    for (const href of internalHrefs) {
      // The home logo/brand link localizes to `/en` — allow the prefix root.
      expect(href, `unprefixed internal link on /en/features: ${href}`).toMatch(/^\/en(\/|$)/);
    }

    // Same contract on a non-EN surface: all /de/... links.
    await page.goto('/de/features');
    const deHrefs = await page
      .locator('[data-testid="header"] a, [data-testid="footer"] a')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => (a as HTMLAnchorElement).getAttribute('href'))
          .filter(
            (href): href is string => !!href && href.startsWith('/') && !href.startsWith('#'),
          ),
      );
    expect(deHrefs.length).toBeGreaterThan(0);
    for (const href of deHrefs) {
      expect(href, `unprefixed internal link on /de/features: ${href}`).toMatch(/^\/de(\/|$)/);
    }
  });
});

test.describe('Goal 3 — priority: prefix > Accept-Language > en (redirect target, URL-only)', () => {
  test('explicit /de/** prefix beats Accept-Language (200 + lang de)', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/de/features', {
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('de');
    expectLang(html, 'de');
  });

  test('Accept-Language beats the en default on unprefixed routes (307 target)', async ({
    page,
  }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/features', {
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/fr/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
  });

  test('unprefixed route with no cookie/header falls back to en (307 target)', async ({ page }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/features');
    expect(status).toBe(307);
    expect(location).toBe('/en/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('en');
  });

  test('a legacy joinorigin_locale cookie is ignored — Accept-Language still wins (TASK-468)', async ({
    page,
  }) => {
    // The cookie is fully removed from resolution: even if a stale
    // joinorigin_locale cookie exists in the browser, the unprefixed 307
    // target comes from Accept-Language ONLY.
    const { status, location, responseHeaders } = await redirectTarget(page, '/features', {
      cookie: 'joinorigin_locale=de',
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/fr/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
  });

  test('q=0 exclusion drops a high-order range (RFC 9110)', async ({ page }) => {
    const { location, responseHeaders } = await redirectTarget(page, '/features', {
      'accept-language': 'de-DE;q=0,fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(location).toBe('/fr/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
  });
});

test.describe('Goal 4 — first-ever unprefixed visit redirects by Accept-Language (URL-only)', () => {
  test('fr header → /fr surface on the unprefixed home', async ({ page }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/', {
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/fr');
    expect(responseHeaders['x-joinorigin-locale']).toBe('fr');
  });

  test('de header → /de surface on the unprefixed home', async ({ page }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/', {
      'accept-language': 'de-DE,de;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/de');
    expect(responseHeaders['x-joinorigin-locale']).toBe('de');
  });

  test('vi header → /vi surface on the unprefixed home', async ({ page }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/', {
      'accept-language': 'vi-VN,vi;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/vi');
    expect(responseHeaders['x-joinorigin-locale']).toBe('vi');
  });

  test('no header at all → en fallback on the unprefixed home (307 target)', async ({ page }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/');
    expect(status).toBe(307);
    expect(location).toBe('/en');
    expect(responseHeaders['x-joinorigin-locale']).toBe('en');
  });

  test('region-variant fallback: pt-PT resolves to the supported pt-BR surface', async ({
    page,
  }) => {
    const { status, location, responseHeaders } = await redirectTarget(page, '/features', {
      'accept-language': 'pt-PT,pt;q=0.9,en;q=0.8',
    });
    expect(status).toBe(307);
    expect(location).toBe('/pt-BR/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('pt-BR');
  });

  test('unmatchable ranges skip to the next supported range', async ({ page }) => {
    const { location, responseHeaders } = await redirectTarget(page, '/features', {
      'accept-language': 'xx-YY;q=1,it-IT,it;q=0.9,en;q=0.8',
    });
    expect(location).toBe('/it/features');
    expect(responseHeaders['x-joinorigin-locale']).toBe('it');
  });
});

test.describe('Goal 5 — URL-only locale: no EN flash, no cookie ever written (TASK-468)', () => {
  test('first visit to /vi/** serves vi and writes NO locale cookie', async ({ page }) => {
    const response = await page.goto('/vi/features');
    expect(response?.status()).toBe(200);
    // Raw served HTML is already vi — the first paint never flashes EN.
    expectLang((await response?.text()) ?? '', 'vi');

    // Post-hydration DOM stays vi.
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');

    // URL-only contract: the prefixed visit must NOT write joinorigin_locale.
    await expectNoLocaleCookie(page);
  });

  test('a prefixed visit cannot stick the locale — unprefixed home falls back to en (no cookie)', async ({
    page,
  }) => {
    await page.goto('/vi/features');
    await expectNoLocaleCookie(page);

    // Nothing persists across requests (no cookie): the unprefixed home
    // resolves from Accept-Language → en fallback in this browser context.
    const homeResponse = await page.goto('/');
    expect(homeResponse?.status()).toBe(200);
    expect(homeResponse?.url()).toMatch(/\/en$/);
    expectLang((await homeResponse?.text()) ?? '', 'en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expectNoLocaleCookie(page);
  });

  test('every locale surface serves its own locale server-side (de + es + ja + ar spot checks)', async ({
    page,
  }) => {
    for (const locale of ['de', 'es', 'ja', 'ar'] as const) {
      const response = await page.goto(`/${locale}/features`);
      expect(response?.status()).toBe(200);
      expectLang((await response?.text()) ?? '', locale);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expectNoLocaleCookie(page);
    }
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
    expect(paths).not.toContain('/en/location/united-states/texas/dallas');
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
    for (const locale of ['es', 'de', 'vi', 'ja', 'zh-CN', 'ar', 'en'] as const) {
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
    await page.goto('/en/guides/start-a-community');
    // All 20 non-EN locales have committed guide content → full cluster.
    for (const locale of SUPPORTED_LOCALES) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
});

test.describe('Goal 8 — waitlist modal renders in the URL language (URL-only, no cookie)', () => {
  /** Open the waitlist modal from the hero CTA on the current page. */
  async function openModal(page: Page): Promise<void> {
    // Wait for hydration so React's event delegation is attached (repo
    // convention — waitlist.spec.ts). The `[data-hero="actions"]` marker
    // receives its inline GSAP opacity only when the entrance tween runs, so
    // do NOT emulate reducedMotion here (that would skip the tween and the
    // marker would never appear). Playwright's click auto-waits for the
    // button to become visible once the 0.6s entrance settles.
    await page.waitForFunction(() => {
      const marker = document.querySelector('[data-hero="actions"]');
      return marker instanceof HTMLElement && marker.style.opacity !== '';
    });
    await page.getByTestId('start-project-button').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  }

  test('/es renders the modal in Spanish (heading + submit)', async ({ page }) => {
    await page.goto('/es');
    await openModal(page);
    await expect(page.getByRole('dialog')).toContainText('Únete a la lista de espera');
    await expect(page.getByTestId('waitlist-submit')).toContainText('Solicitar acceso');
    await expect(page.getByRole('dialog')).toContainText('Date a conocer en el sistema operativo');
    // The URL-only contract holds: opening the modal on /es writes no cookie.
    await expectNoLocaleCookie(page);
  });

  test('/vi renders the modal in Vietnamese', async ({ page }) => {
    await page.goto('/vi');
    await openModal(page);
    await expect(page.getByRole('dialog')).toContainText('Tham gia danh sách chờ');
    await expect(page.getByTestId('waitlist-submit')).toContainText('Yêu cầu truy cập');
    await expectNoLocaleCookie(page);
  });

  test('/en renders the modal in English (control)', async ({ page }) => {
    await page.goto('/en');
    await openModal(page);
    await expect(page.getByRole('dialog')).toContainText('Join the waitlist');
    await expect(page.getByTestId('waitlist-submit')).toContainText('Request access');
    await expectNoLocaleCookie(page);
  });
});

test.describe('Follow-up A — client locale toggle on SPA navigation (TASK-465)', () => {
  /** Select a locale in the header language switcher (desktop viewport). */
  async function switchTo(page: Page, nativeName: string): Promise<void> {
    const headerSwitcher = page.getByTestId('language-switcher-header');
    await headerSwitcher.getByTestId('language-switcher-trigger').click();
    const listbox = headerSwitcher.getByTestId('language-switcher-listbox');
    await expect(listbox).toBeVisible();
    await listbox.getByRole('option', { name: new RegExp(nativeName) }).click();
  }

  test('SPA navigation /en/features → /vi/features toggles html lang, switcher label + chrome', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/features');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByTestId('language-switcher-header')).toContainText('English');

    // Select Vietnamese — the switcher router.push SPA-navigates to
    // /vi/features (TASK-450/465). No reload, no cookie (TASK-468).
    await switchTo(page, 'Tiếng Việt');

    await expect(page).toHaveURL(/\/vi\/features$/, { timeout: 15_000 });
    // The UI toggled instantly — html lang, switcher trigger label, and
    // header chrome (vi nav labels) all reflect vi without a full load.
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi', { timeout: 15_000 });
    await expect(page.getByTestId('language-switcher-header')).toContainText('Tiếng Việt');
    await expect(page.getByTestId('header')).toContainText('Tính năng');
    // The toggle persists the language in the URL only — no cookie is written.
    await expectNoLocaleCookie(page);
  });

  test('SPA navigation back to EN reverts the UI (vi → en) without a reload', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/vi/features');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');

    await switchTo(page, 'English');

    await expect(page).toHaveURL(/\/en\/features$/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 15_000 });
    await expect(page.getByTestId('language-switcher-header')).toContainText('English');
    await expect(page.getByTestId('header')).toContainText('Features');
    await expectNoLocaleCookie(page);
  });

  test('switching through multiple locales on SPA navigation toggles each (vi → de → es)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/features');

    await switchTo(page, 'Tiếng Việt');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi', { timeout: 15_000 });
    await expect(page).toHaveURL(/\/vi\/features$/);

    await switchTo(page, 'Deutsch');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de', { timeout: 15_000 });
    await expect(page).toHaveURL(/\/de\/features$/);
    await expect(page.getByTestId('header')).toContainText('Funktionen');

    await switchTo(page, 'Español');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es', { timeout: 15_000 });
    await expect(page).toHaveURL(/\/es\/features$/);
    await expect(page.getByTestId('header')).toContainText('Funciones');
    await expectNoLocaleCookie(page);
  });

  test('SPA toggle from the EN home surface: /en → /vi toggles the root path', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await switchTo(page, 'Tiếng Việt');

    await expect(page).toHaveURL(/\/vi(?:\/|$)/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi', { timeout: 15_000 });
    await expect(page.getByTestId('language-switcher-header')).toContainText('Tiếng Việt');
    await expectNoLocaleCookie(page);
  });

  test('browser back/forward history keeps the locale synced to the URL prefix', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/features');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // SPA-navigate to the vi surface (client-side), then back to /en/features.
    await switchTo(page, 'Tiếng Việt');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi', { timeout: 15_000 });
    await expect(page).toHaveURL(/\/vi\/features$/);

    // history.back() is a client-side popstate navigation — no reload, no
    // LanguageSwitcher.setLocale call. The LocalePathnameSync watcher must
    // re-sync the UI locale to the restored /en/** prefix.
    await page.evaluate(() => history.back());
    await expect(page).toHaveURL(/\/en\/features$/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 15_000 });
    await expect(page.getByTestId('language-switcher-header')).toContainText('English');

    // And forward again — the watcher re-applies vi.
    await page.evaluate(() => history.forward());
    await expect(page).toHaveURL(/\/vi\/features$/, { timeout: 15_000 });
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi', { timeout: 15_000 });
    await expectNoLocaleCookie(page);
  });
});

test.describe('Follow-up B — all routes are locale-prefixed (TASK-464/466)', () => {
  test('unprefixed /** 307-redirects to /<resolved-locale>/... (Accept-Language wins)', async ({
    page,
  }) => {
    // With a vi Accept-Language preference every unprefixed route resolves to
    // the vi surface — no cookie participates (TASK-468).
    for (const path of STATIC_PATHS) {
      const url = unprefixedPath(path);
      const { status, location } = await redirectTarget(page, url, {
        'accept-language': 'vi-VN,vi;q=0.9,en;q=0.8',
      });
      expect(status, `${url} should 307-redirect`).toBe(307);
      expect(location, `${url} should redirect to the vi surface`).toBe(surfacePath('vi', path));
    }
  });

  test('/en/** is the EN canonical surface (lang, canonical, header)', async ({ page }) => {
    const { status, html, responseHeaders } = await servedHtml(page, '/en/features');
    expect(status).toBe(200);
    expect(responseHeaders['x-joinorigin-locale']).toBe('en');
    expectLang(html, 'en');

    await page.goto('/en/features');
    const canonical = page.locator('link[rel="canonical"]');
    expect(new URL((await canonical.getAttribute('href')) ?? '').pathname).toBe('/en/features');
    const ogUrl = page.locator('meta[property="og:url"]');
    expect(new URL((await ogUrl.getAttribute('content')) ?? '').pathname).toBe('/en/features');
  });

  test('x-default hreflang targets the /en/** surface on EN and non-EN pages', async ({ page }) => {
    // EN page: x-default → the /en/** surface itself.
    await page.goto('/en/guides/start-a-community');
    const enXDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(enXDefault).toHaveCount(1);
    expect(new URL((await enXDefault.getAttribute('href')) ?? '').pathname).toBe(
      '/en/guides/start-a-community',
    );

    // Non-EN page: x-default → the /en/** canonical counterpart.
    await page.goto('/de/guides/start-a-community');
    const deXDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(deXDefault).toHaveCount(1);
    expect(new URL((await deXDefault.getAttribute('href')) ?? '').pathname).toBe(
      '/en/guides/start-a-community',
    );
  });

  test('system / non-HTML routes stay unprefixed and unredirected (TASK-464)', async ({
    request,
  }) => {
    // The metadata files, API surface, and static trees must NEVER gain a
    // locale prefix or 307-redirect — fetch WITHOUT following redirects.
    for (const url of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/api/leads', '/favicon.ico']) {
      const response = await request.get(url, { maxRedirects: 0 });
      expect(response.status(), `${url} must not 307-redirect`).not.toBe(307);
      expect(response.headers()['location'], `${url} must stay unprefixed`).toBeUndefined();
    }
    // And they serve their real content (not a redirect body).
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('<loc>');
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('User-Agent:');
    const llms = await request.get('/llms.txt');
    expect(llms.status()).toBe(200);
    expect(await llms.text()).toContain('# JoinOrigin');
  });

  test('the sitemap emits zero unprefixed HTML URLs (EN canonical only at /en/**)', async ({
    request,
  }) => {
    const response = await request.get('/sitemap.xml');
    const xml = await response.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(path, `sitemap contains unprefixed URL ${path}`).toMatch(
        /^\/[a-z]{2}(-[A-Z]{2})?(\/|$)/,
      );
    }
    // EN is present only on its /en/** canonical surface.
    expect(paths).toContain('/en/features');
    expect(paths).not.toContain('/features');
  });
});
