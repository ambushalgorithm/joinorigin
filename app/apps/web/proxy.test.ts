/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';

import { SUPPORTED_LOCALES } from '@joinorigin/i18n';

import { proxy, config, localeFromPathname, isSystemRoute, IP_COUNTRY_HEADER } from './proxy';

/**
 * Unit tests for the locale-resolution proxy (`proxy.ts`, Next.js 16
 * convention — migrated from `middleware.ts` via the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Contract (arch-i18n §6.3, updated TASK-464 + TASK-468):
 *  - URL-only locale: the `joinorigin_locale` cookie is FULLY REMOVED —
 *    the language always lives in the URL; no cookie participates in
 *    resolution and none is ever written
 *  - all-routes-prefixed: every unprefixed HTML route 307-redirects to its
 *    `/<locale>/...` surface (`/` → `/<locale>`), where the resolved locale
 *    = Accept-Language header (parsed per RFC 9110 §12.5.4: q-values,
 *    `q=0` exclusions, region-variant fallback) → `DEFAULT_LOCALE` (`en`)
 *  - system / non-HTML routes are EXCLUDED from the redirect (api,
 *    sitemap.xml, robots.txt, llms.txt, _next, assets, fonts, favicon.ico,
 *    icon, apple-icon, file-extension URLs) — they pass through untouched
 *  - locale-prefixed paths (`/<locale>` or `/<locale>/...`) force that
 *    locale regardless of Accept-Language
 *  - the resolved locale is forwarded as `x-joinorigin-locale` on BOTH the
 *    request (via NextResponse.next request headers) and the response
 *  - geo-country (TASK-479): Cloudflare's `CF-IPCountry` header is forwarded
 *    as `x-joinorigin-ip-country` on the request + response when present,
 *    and NOT set when absent (the server helper returns null)
 *  - no URL rewrite — URLs stay clean
 */

function makeRequest(url = 'http://localhost/', headers: Record<string, string> = {}) {
  return new NextRequest(url, { headers });
}

function runProxy(headers: Record<string, string> = {}) {
  return proxy(makeRequest('http://localhost/', headers));
}

/** Run the proxy against an absolute URL (e.g. a /de/... path). */
function runProxyAt(url: string, headers: Record<string, string> = {}) {
  return proxy(makeRequest(url, headers));
}

/** Resolved locale from the response (redirect or pass-through). */
function resolvedLocale(response: Response): string | null {
  return response.headers.get('x-joinorigin-locale');
}

describe('proxy locale resolution (redirect target)', () => {
  it('resolves Accept-Language to the redirect target', () => {
    const response = runProxy({ 'accept-language': 'de' });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/de');
    expect(resolvedLocale(response)).toBe('de');
  });

  it('ignores a legacy joinorigin_locale cookie entirely (TASK-468)', () => {
    // A stale cookie from before the removal must NOT influence resolution —
    // the Accept-Language header wins.
    const response = runProxy({
      cookie: 'joinorigin_locale=de',
      'accept-language': 'fr',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/fr');
    expect(resolvedLocale(response)).toBe('fr');
  });

  it('resolves region variants from Accept-Language (pt → pt-BR)', () => {
    const response = runProxy({ 'accept-language': 'pt' });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/pt-BR');
    expect(resolvedLocale(response)).toBe('pt-BR');
  });

  it('falls back to DEFAULT_LOCALE en when no Accept-Language', () => {
    const response = runProxy({});
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/en');
    expect(resolvedLocale(response)).toBe('en');
  });

  it('falls back to DEFAULT_LOCALE en for unknown locales', () => {
    const response = runProxy({ 'accept-language': 'xx-YY' });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/en');
    expect(resolvedLocale(response)).toBe('en');
  });

  it('matches app routes and excludes Next internals + static assets', () => {
    expect(unstable_doesMiddlewareMatch({ config, url: '/' })).toBe(true);
    expect(unstable_doesMiddlewareMatch({ config, url: '/features' })).toBe(true);
    expect(unstable_doesMiddlewareMatch({ config, url: '/_next/static/chunks/x.js' })).toBe(false);
    expect(unstable_doesMiddlewareMatch({ config, url: '/_next/image?url=x' })).toBe(false);
    expect(unstable_doesMiddlewareMatch({ config, url: '/favicon.ico' })).toBe(false);
  });
});

describe('all-routes-prefixed redirect (TASK-464)', () => {
  it('307-redirects the root / to /<locale>/ for every signal', () => {
    expect(runProxy({}).headers.get('location')).toBe('http://localhost/en');
    expect(runProxy({ 'accept-language': 'de' }).headers.get('location')).toBe(
      'http://localhost/de',
    );
    expect(runProxy({ 'accept-language': 'vi' }).headers.get('location')).toBe(
      'http://localhost/vi',
    );
  });

  it('307-redirects an unprefixed path to /<locale>/<path>', () => {
    const response = runProxyAt('http://localhost/features', {
      'accept-language': 'de',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/de/features');
  });

  it('keeps nested paths intact on the redirect target', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin', {
      'accept-language': 'es',
    });
    expect(response.headers.get('location')).toBe(
      'http://localhost/es/location/germany/berlin/berlin',
    );
  });

  it('preserves the query string on the redirect target', () => {
    const response = runProxyAt('http://localhost/features?utm=spring&ref=x', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('location')).toBe('http://localhost/fr/features?utm=spring&ref=x');
  });

  it('does not redirect locale-prefixed paths (they are their own surface)', () => {
    const en = runProxyAt('http://localhost/en/features');
    expect(en.status).toBe(200);
    expect(en.headers.get('x-middleware-next')).toBe('1');
    const de = runProxyAt('http://localhost/de/features', { 'accept-language': 'fr' });
    expect(de.status).toBe(200);
    expect(de.headers.get('x-middleware-next')).toBe('1');
  });

  it('does not redirect the bare locale prefix /en or /de', () => {
    const en = runProxyAt('http://localhost/en');
    expect(en.status).toBe(200);
    expect(en.headers.get('x-middleware-next')).toBe('1');
    const de = runProxyAt('http://localhost/de');
    expect(de.status).toBe(200);
    expect(de.headers.get('x-middleware-next')).toBe('1');
  });

  it('does not redirect the api surface (system route)', () => {
    const response = runProxyAt('http://localhost/api/leads', { 'accept-language': 'de' });
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
    expect(resolvedLocale(response)).toBe('de');
  });

  it('does not redirect metadata files (system routes)', () => {
    for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt']) {
      const response = runProxyAt(`http://localhost${path}`, { 'accept-language': 'de' });
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-next')).toBe('1');
    }
  });

  it('does not redirect icon routes (system routes)', () => {
    for (const path of ['/icon', '/apple-icon', '/favicon.ico']) {
      const response = runProxyAt(`http://localhost${path}`, { 'accept-language': 'de' });
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-next')).toBe('1');
    }
  });

  it('does not redirect file-extension URLs (system routes)', () => {
    for (const path of [
      '/icon-16x16.png',
      '/apple-touch-icon.png',
      '/manifest.webmanifest',
      '/assets/logo.svg',
      '/fonts/Inter.woff2',
    ]) {
      const response = runProxyAt(`http://localhost${path}`, { 'accept-language': 'de' });
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-next')).toBe('1');
    }
  });

  it('isSystemRoute classifies system + file URLs and excludes normal pages', () => {
    expect(isSystemRoute('/api')).toBe(true);
    expect(isSystemRoute('/api/leads')).toBe(true);
    expect(isSystemRoute('/_next/static/chunks/x.js')).toBe(true);
    expect(isSystemRoute('/assets/logo.svg')).toBe(true);
    expect(isSystemRoute('/fonts/Inter.woff2')).toBe(true);
    expect(isSystemRoute('/sitemap.xml')).toBe(true);
    expect(isSystemRoute('/robots.txt')).toBe(true);
    expect(isSystemRoute('/llms.txt')).toBe(true);
    expect(isSystemRoute('/favicon.ico')).toBe(true);
    expect(isSystemRoute('/icon')).toBe(true);
    expect(isSystemRoute('/apple-icon')).toBe(true);
    expect(isSystemRoute('/icon-16x16.png')).toBe(true);
    expect(isSystemRoute('/apple-touch-icon.png')).toBe(true);
    expect(isSystemRoute('/manifest.webmanifest')).toBe(true);
    expect(isSystemRoute('/')).toBe(false);
    expect(isSystemRoute('/features')).toBe(false);
    expect(isSystemRoute('/location/germany/berlin/berlin')).toBe(false);
  });
});

describe('Accept-Language header parsing (TASK-455, RFC 9110 §12.5.4)', () => {
  it('honors q-values — higher q wins regardless of position', () => {
    const response = runProxy({ 'accept-language': 'fr;q=0.9, en;q=0.8' });
    expect(response.headers.get('location')).toBe('http://localhost/fr');
  });

  it('drops q=0 exclusions (en explicitly not acceptable)', () => {
    const response = runProxy({ 'accept-language': 'en;q=0, fr;q=0.9' });
    expect(response.headers.get('location')).toBe('http://localhost/fr');
  });

  it('orders by quality and applies region-variant fallback (pt → pt-BR)', () => {
    const response = runProxy({ 'accept-language': 'en-US;q=0.5, pt;q=0.9' });
    expect(response.headers.get('location')).toBe('http://localhost/pt-BR');
  });

  it('skips unmatchable ranges instead of shadowing lower-q supported ones', () => {
    const response = runProxy({ 'accept-language': 'xx-YY;q=1, de;q=0.8' });
    expect(response.headers.get('location')).toBe('http://localhost/de');
  });

  it('ignores * wildcard entries', () => {
    const response = runProxy({ 'accept-language': '*, en;q=0.5' });
    expect(response.headers.get('location')).toBe('http://localhost/en');
  });

  it('resolves a real-world browser header', () => {
    const response = runProxy({
      'accept-language': 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    });
    expect(response.headers.get('location')).toBe('http://localhost/fr');
  });

  it('preserves header order for equal q-values', () => {
    const response = runProxy({ 'accept-language': 'de, en;q=1' });
    expect(response.headers.get('location')).toBe('http://localhost/de');
  });

  it('picks a supported lower-q language over a higher-q unsupported one', () => {
    const response = runProxy({ 'accept-language': 'klingon;q=1, vi;q=0.5' });
    expect(response.headers.get('location')).toBe('http://localhost/vi');
  });

  it('accepts an explicit en range', () => {
    const response = runProxy({ 'accept-language': 'en;q=0.9, de;q=0.8' });
    expect(response.headers.get('location')).toBe('http://localhost/en');
  });

  it('applies language-only fallback to a region range (fr-CA → fr)', () => {
    const response = runProxy({ 'accept-language': 'fr-CA;q=0.9, es;q=0.8' });
    expect(response.headers.get('location')).toBe('http://localhost/fr');
  });
});

describe('/de/* forces German server-side (TASK-315 → generalized TASK-444)', () => {
  it('forces de for /de/location/... with no Accept-Language', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin');
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forces de for /de/* despite a conflicting Accept-Language', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin', {
      'accept-language': 'es',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forces de for /de/* despite an English Accept-Language', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin', {
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forces de for the bare /de path', () => {
    const response = runProxyAt('http://localhost/de');
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forces de for /de/ nested variants', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin/startup', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forwards the forced de on the request headers too', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-middleware-request-x-joinorigin-locale')).toBe('de');
    expect(response.headers.get('x-middleware-override-headers')).toContain('x-joinorigin-locale');
  });
});

describe('/en/* forces English (TASK-448)', () => {
  it('forces en for /en/features despite a conflicting Accept-Language', () => {
    const response = runProxyAt('http://localhost/en/features', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('forces en for the bare /en path', () => {
    const response = runProxyAt('http://localhost/en', { 'accept-language': 'de' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('forces en for /en/ nested location variants and forwards it on request headers', () => {
    const response = runProxyAt('http://localhost/en/location/germany/berlin/berlin/startup', {
      'accept-language': 'es',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
    expect(response.headers.get('x-middleware-request-x-joinorigin-locale')).toBe('en');
  });

  it('redirects unprefixed /events to its resolved locale (not an en prefix)', () => {
    const events = runProxyAt('http://localhost/events', { 'accept-language': 'de' });
    expect(events.status).toBe(307);
    expect(events.headers.get('location')).toBe('http://localhost/de/events');
    const engineering = runProxyAt('http://localhost/engineering', { 'accept-language': 'fr' });
    expect(engineering.headers.get('location')).toBe('http://localhost/fr/engineering');
  });
});

describe('non-EN locale-prefixed paths force their locale (TASK-444)', () => {
  it.each([
    ['es', '/es/guides/start-a-community'],
    ['ja', '/ja/guides/start-a-community'],
    ['ar', '/ar/guides/start-a-community'],
    ['fr', '/fr/guides/start-a-community'],
    ['hi', '/hi/guides/start-a-community'],
    ['id', '/id/guides/start-a-community'],
    ['it', '/it/guides/start-a-community'],
    ['ko', '/ko/guides/start-a-community'],
    ['nl', '/nl/guides/start-a-community'],
    ['pl', '/pl/guides/start-a-community'],
    ['ru', '/ru/guides/start-a-community'],
    ['th', '/th/guides/start-a-community'],
    ['tr', '/tr/guides/start-a-community'],
    ['uk', '/uk/guides/start-a-community'],
    ['vi', '/vi/guides/start-a-community'],
    ['fa', '/fa/guides/start-a-community'],
    ['pt-BR', '/pt-BR/guides/start-a-community'],
    ['zh-CN', '/zh-CN/guides/start-a-community'],
    ['zh-TW', '/zh-TW/guides/start-a-community'],
  ])('forces %s for %s despite a conflicting Accept-Language', (locale, path) => {
    const response = runProxyAt(`http://localhost${path}`, {
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe(locale);
  });

  it('forces es for /es despite an English Accept-Language', () => {
    const response = runProxyAt('http://localhost/es/guides', {
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('es');
  });

  it('forces ja for the bare /ja path', () => {
    const response = runProxyAt('http://localhost/ja', {
      'accept-language': 'de',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('ja');
  });

  it('forces ar for /ar/ nested variants and forwards it on the request headers', () => {
    const response = runProxyAt('http://localhost/ar/guides/organize-a-meetup', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('ar');
    expect(response.headers.get('x-middleware-request-x-joinorigin-locale')).toBe('ar');
  });

  it('localeFromPathname resolves every locale prefix incl. en and ignores non-locale paths', () => {
    expect(localeFromPathname('/es')).toBe('es');
    expect(localeFromPathname('/es/guides')).toBe('es');
    expect(localeFromPathname('/pt-BR/guides/start-a-community')).toBe('pt-BR');
    expect(localeFromPathname('/zh-CN/guides')).toBe('zh-CN');
    expect(localeFromPathname('/zh-TW/guides')).toBe('zh-TW');
    expect(localeFromPathname('/en')).toBe('en');
    expect(localeFromPathname('/en/guides')).toBe('en');
    expect(localeFromPathname('/en/location/germany/berlin/berlin')).toBe('en');
    expect(localeFromPathname('/location/germany/berlin/berlin')).toBeUndefined();
    expect(localeFromPathname('/')).toBeUndefined();
  });

  it('does not treat paths merely starting with a locale letter sequence as prefixed', () => {
    // `/deutschland`, `/events`, `/japan` are NOT locale surfaces — they are
    // unprefixed HTML routes, so they 307-redirect to their resolved locale.
    const deutschland = runProxyAt('http://localhost/deutschland', { 'accept-language': 'fr' });
    expect(deutschland.status).toBe(307);
    expect(deutschland.headers.get('location')).toBe('http://localhost/fr/deutschland');
    const events = runProxyAt('http://localhost/events', { 'accept-language': 'ja' });
    expect(events.headers.get('location')).toBe('http://localhost/ja/events');
    const japan = runProxyAt('http://localhost/japan', { 'accept-language': 'es' });
    expect(japan.headers.get('location')).toBe('http://localhost/es/japan');
  });
});

describe('unprefixed routes redirect per Accept-Language only (TASK-464 + TASK-468)', () => {
  it('Accept-Language wins on unprefixed location pages', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin', {
      'accept-language': 'es',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost/es/location/germany/berlin/berlin',
    );
  });

  it('a legacy joinorigin_locale cookie does NOT override Accept-Language', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin', {
      cookie: 'joinorigin_locale=de',
      'accept-language': 'fr',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost/fr/location/germany/berlin/berlin',
    );
  });

  it('en fallback on unprefixed location pages with no signals', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin');
    expect(response.headers.get('location')).toBe(
      'http://localhost/en/location/germany/berlin/berlin',
    );
  });

  it('Accept-Language still wins on the home page', () => {
    const response = runProxy({ 'accept-language': 'de' });
    expect(response.headers.get('location')).toBe('http://localhost/de');
  });
});

describe('no cookie is ever written (TASK-468)', () => {
  it('never sets a cookie on prefixed surfaces', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community', {
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
    expect(response.cookies.getAll()).toHaveLength(0);
  });

  it.each(SUPPORTED_LOCALES)('never sets a cookie on /%s/guides/... first visit', (locale) => {
    const response = runProxyAt(`http://localhost/${locale}/guides/start-a-community`);
    expect(response.headers.get('x-joinorigin-locale')).toBe(locale);
    expect(response.cookies.getAll()).toHaveLength(0);
  });

  it('never sets a cookie on unprefixed redirects', () => {
    const response = runProxy({ 'accept-language': 'fr' });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/fr');
    expect(response.cookies.getAll()).toHaveLength(0);
  });

  it('never sets a cookie on system routes', () => {
    const response = runProxyAt('http://localhost/icon-16x16.png', { 'accept-language': 'fr' });
    expect(response.status).toBe(200);
    expect(response.cookies.getAll()).toHaveLength(0);
  });
});

describe('CF-IPCountry geo forwarding (TASK-479)', () => {
  it('forwards CF-IPCountry as x-joinorigin-ip-country on pass-through request headers', () => {
    const response = runProxyAt('http://localhost/en/guides/start-a-community', {
      'cf-ipcountry': 'DE',
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-request-x-joinorigin-ip-country')).toBe('DE');
    expect(response.headers.get('x-middleware-override-headers')).toContain(
      'x-joinorigin-ip-country',
    );
  });

  it('forwards CF-IPCountry as x-joinorigin-ip-country on pass-through response headers', () => {
    const response = runProxyAt('http://localhost/de/features', { 'cf-ipcountry': 'FR' });
    expect(response.status).toBe(200);
    expect(response.headers.get(IP_COUNTRY_HEADER)).toBe('FR');
  });

  it('forwards CF-IPCountry on unprefixed redirect responses too', () => {
    const response = runProxyAt('http://localhost/features', {
      'cf-ipcountry': 'US',
      'accept-language': 'en',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/en/features');
    expect(response.headers.get(IP_COUNTRY_HEADER)).toBe('US');
  });

  it('does not set x-joinorigin-ip-country when CF-IPCountry is absent', () => {
    const passThrough = runProxyAt('http://localhost/en/guides/start-a-community');
    expect(passThrough.headers.get(IP_COUNTRY_HEADER)).toBeNull();
    expect(passThrough.headers.get('x-middleware-request-x-joinorigin-ip-country')).toBeNull();

    const redirect = runProxy({ 'accept-language': 'fr' });
    expect(redirect.headers.get(IP_COUNTRY_HEADER)).toBeNull();
  });

  it('trims whitespace around the CF-IPCountry value', () => {
    const response = runProxyAt('http://localhost/en/features', { 'cf-ipcountry': '  JP  ' });
    expect(response.headers.get(IP_COUNTRY_HEADER)).toBe('JP');
  });

  it('forwards CF-IPCountry on system routes (api pass-through)', () => {
    const response = runProxyAt('http://localhost/api/leads', { 'cf-ipcountry': 'BR' });
    expect(response.status).toBe(200);
    expect(response.headers.get(IP_COUNTRY_HEADER)).toBe('BR');
  });
});
