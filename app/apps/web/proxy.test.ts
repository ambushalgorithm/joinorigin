/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';

import { SUPPORTED_LOCALES } from '@joinorigin/i18n';

import { proxy, config, LOCALE_COOKIE, localeFromPathname } from './proxy';

/**
 * Unit tests for the locale-resolution proxy (`proxy.ts`, Next.js 16
 * convention — migrated from `middleware.ts` via the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Contract (arch-i18n §6.3, updated TASK-455):
 *  - locale-prefixed paths (`/<locale>` or `/<locale>/...`) force that
 *    locale regardless of cookie / Accept-Language
 *  - otherwise precedence: cookie `joinorigin_locale` wins → Accept-Language
 *    header (parsed per RFC 9110 §12.5.4: q-values, `q=0` exclusions,
 *    region-variant fallback) → `DEFAULT_LOCALE` (`en`)
 *  - the resolved locale is forwarded as `x-joinorigin-locale` on BOTH the
 *    request (via NextResponse.next request headers) and the response
 *  - route-stick: the first visit to a `/<locale>/...` prefixed surface with
 *    no cookie SETS `joinorigin_locale` to the prefix locale (no EN flash);
 *    an existing cookie is never overwritten
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

describe('proxy locale resolution', () => {
  it('cookie joinorigin_locale wins over Accept-Language', () => {
    const response = runProxy({
      cookie: `${LOCALE_COOKIE}=de`,
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('falls back to Accept-Language when no cookie is present', () => {
    const response = runProxy({ 'accept-language': 'es' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('es');
  });

  it('resolves region variants from Accept-Language (pt → pt-BR)', () => {
    const response = runProxy({ 'accept-language': 'pt' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('pt-BR');
  });

  it('falls back to DEFAULT_LOCALE en when no cookie and no Accept-Language', () => {
    const response = runProxy({});
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('falls back to DEFAULT_LOCALE en for unknown locales', () => {
    const response = runProxy({ 'accept-language': 'xx-YY' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('forwards x-joinorigin-locale on the request headers too', () => {
    const response = runProxy({ 'accept-language': 'fr' });
    // NextResponse.next({ request: { headers } }) materializes forwarded
    // request headers as x-middleware-request-* + x-middleware-override-headers.
    expect(response.headers.get('x-middleware-request-x-joinorigin-locale')).toBe('fr');
    expect(response.headers.get('x-middleware-override-headers')).toContain('x-joinorigin-locale');
  });

  it('returns a pass-through NextResponse (no rewrite/redirect)', () => {
    const response = runProxy({ 'accept-language': 'ja' });
    expect(response.headers.get('x-middleware-next')).toBe('1');
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
    expect(response.status).toBe(200);
  });

  it('matches app routes and excludes Next internals + static assets', () => {
    expect(unstable_doesMiddlewareMatch({ config, url: '/' })).toBe(true);
    expect(unstable_doesMiddlewareMatch({ config, url: '/features' })).toBe(true);
    expect(unstable_doesMiddlewareMatch({ config, url: '/_next/static/chunks/x.js' })).toBe(false);
    expect(unstable_doesMiddlewareMatch({ config, url: '/_next/image?url=x' })).toBe(false);
    expect(unstable_doesMiddlewareMatch({ config, url: '/favicon.ico' })).toBe(false);
  });
});

describe('Accept-Language header parsing (TASK-455, RFC 9110 §12.5.4)', () => {
  it('honors q-values — higher q wins regardless of position', () => {
    const response = runProxy({ 'accept-language': 'fr;q=0.9, en;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });

  it('drops q=0 exclusions (en explicitly not acceptable)', () => {
    const response = runProxy({ 'accept-language': 'en;q=0, fr;q=0.9' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });

  it('orders by quality and applies region-variant fallback (pt → pt-BR)', () => {
    const response = runProxy({ 'accept-language': 'en-US;q=0.5, pt;q=0.9' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('pt-BR');
  });

  it('skips unmatchable ranges instead of shadowing lower-q supported ones', () => {
    const response = runProxy({ 'accept-language': 'xx-YY;q=1, de;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('ignores * wildcard entries', () => {
    const response = runProxy({ 'accept-language': '*, en;q=0.5' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('resolves a real-world browser header', () => {
    const response = runProxy({
      'accept-language': 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });

  it('preserves header order for equal q-values', () => {
    const response = runProxy({ 'accept-language': 'de, en;q=1' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('picks a supported lower-q language over a higher-q unsupported one', () => {
    const response = runProxy({ 'accept-language': 'klingon;q=1, vi;q=0.5' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
  });

  it('accepts an explicit en range', () => {
    const response = runProxy({ 'accept-language': 'en;q=0.9, de;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('applies language-only fallback to a region range (fr-CA → fr)', () => {
    const response = runProxy({ 'accept-language': 'fr-CA;q=0.9, es;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });
});

describe('/de/* forces German server-side (TASK-315 → generalized TASK-444)', () => {
  it('forces de for /de/location/... with no cookie and no Accept-Language', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin');
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('forces de for /de/* despite a non-de cookie', () => {
    const response = runProxyAt('http://localhost/de/location/germany/berlin/berlin', {
      cookie: `${LOCALE_COOKIE}=fr`,
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
  it('forces en for /en/features despite a conflicting cookie and Accept-Language', () => {
    const response = runProxyAt('http://localhost/en/features', {
      cookie: `${LOCALE_COOKIE}=de`,
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
      cookie: `${LOCALE_COOKIE}=ja`,
      'accept-language': 'es',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
    expect(response.headers.get('x-middleware-request-x-joinorigin-locale')).toBe('en');
  });

  it('does not treat /events or /engineering as en prefixes', () => {
    const response = runProxyAt('http://localhost/events', { 'accept-language': 'de' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
    const engineering = runProxyAt('http://localhost/engineering', { 'accept-language': 'fr' });
    expect(engineering.headers.get('x-joinorigin-locale')).toBe('fr');
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
  ])('forces %s for %s despite a conflicting cookie and Accept-Language', (locale, path) => {
    const response = runProxyAt(`http://localhost${path}`, {
      cookie: `${LOCALE_COOKIE}=fr`,
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe(locale);
  });

  it('forces es for /es despite an English Accept-Language and no cookie', () => {
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
      cookie: `${LOCALE_COOKIE}=de`,
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

  it('does not force a locale for paths merely starting with a locale letter sequence', () => {
    // Only the exact `/<locale>` or `/<locale>/...` prefixes are locale
    // surfaces; `/deutschland`, `/events`, `/japan` keep the normal precedence.
    const deutschland = runProxyAt('http://localhost/deutschland', { 'accept-language': 'fr' });
    expect(deutschland.headers.get('x-joinorigin-locale')).toBe('fr');
    const events = runProxyAt('http://localhost/events', { 'accept-language': 'ja' });
    expect(events.headers.get('x-joinorigin-locale')).toBe('ja');
    const japan = runProxyAt('http://localhost/japan', { 'accept-language': 'es' });
    expect(japan.headers.get('x-joinorigin-locale')).toBe('es');
  });
});

describe('non-locale-prefixed routes keep cookie → Accept-Language precedence (TASK-315)', () => {
  it('cookie wins on EN location pages', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin', {
      cookie: `${LOCALE_COOKIE}=fr`,
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });

  it('Accept-Language wins on EN location pages without a cookie', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin', {
      'accept-language': 'es',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('es');
  });

  it('en fallback on EN location pages with no signals', () => {
    const response = runProxyAt('http://localhost/location/germany/berlin/berlin');
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('cookie still wins on the home page', () => {
    const response = runProxy({ cookie: `${LOCALE_COOKIE}=de`, 'accept-language': 'en' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });
});

describe('route-stick: prefixed first visit sets joinorigin_locale cookie (TASK-455)', () => {
  it('sets the cookie to vi for a first visit to /vi/guides/... — no EN flash', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community', {
      'accept-language': 'en',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('vi');
  });

  it('sets the cookie for the bare /vi path too', () => {
    const response = runProxyAt('http://localhost/vi');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('vi');
  });

  it('sets the cookie for /en/ surfaces (en is a locale prefix)', () => {
    const response = runProxyAt('http://localhost/en/features');
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('en');
  });

  it.each(SUPPORTED_LOCALES)(
    'sets the cookie to %s on a first visit to /%s/guides/...',
    (locale) => {
      const response = runProxyAt(`http://localhost/${locale}/guides/start-a-community`);
      expect(response.headers.get('x-joinorigin-locale')).toBe(locale);
      expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe(locale);
    },
  );

  it('does not overwrite an existing cookie — explicit switcher selection wins', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community', {
      cookie: `${LOCALE_COOKIE}=fr`,
      'accept-language': 'en',
    });
    // The prefix still forces vi for this page...
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
    // ...but the fr cookie is left untouched (no new Set-Cookie for it).
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBeUndefined();
  });

  it('does not set a cookie on unprefixed routes', () => {
    const response = runProxy({ 'accept-language': 'fr' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBeUndefined();
  });

  it('does not set a cookie on paths that merely start with a locale sequence', () => {
    const response = runProxyAt('http://localhost/vietsnam', { 'accept-language': 'fr' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBeUndefined();
  });

  it('sets the cookie with path=/, a 1-year max-age, and SameSite=Lax', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community');
    const cookie = response.cookies.get(LOCALE_COOKIE);
    expect(cookie?.value).toBe('vi');
    expect(cookie?.path).toBe('/');
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 365);
    expect(cookie?.sameSite).toBe('lax');
  });

  it('marks the cookie Secure only on https requests', () => {
    const secure = runProxyAt('https://localhost/vi/guides/start-a-community');
    expect(secure.cookies.get(LOCALE_COOKIE)?.secure).toBe(true);
    const plain = runProxyAt('http://localhost/vi/guides/start-a-community');
    expect(plain.cookies.get(LOCALE_COOKIE)?.secure).toBe(false);
  });
});
