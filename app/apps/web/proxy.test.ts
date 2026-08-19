/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';

import { proxy, config, LOCALE_COOKIE, localeFromPathname } from './proxy';

/**
 * Unit tests for the locale-resolution proxy (`proxy.ts`, Next.js 16
 * convention — migrated from `middleware.ts` via the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Contract (arch-i18n §6.3, updated TASK-444 + TASK-455):
 *  - locale-prefixed paths (`/<locale>` or `/<locale>/...`) force that
 *    locale regardless of cookie / Accept-Language
 *  - otherwise precedence: cookie `joinorigin_locale` wins → Accept-Language
 *    (q-values + region fallback) → `DEFAULT_LOCALE` (`en`)
 *  - a first visit to a `/<locale>/` prefixed path without a cookie SETS the
 *    `joinorigin_locale` cookie to the prefix locale (route-stick, Goal 5 —
 *    fixes `/vi` + all languages flashing to EN)
 *  - the resolved locale is forwarded as `x-joinorigin-locale` on BOTH the
 *    request (via NextResponse.next request headers) and the response
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

describe('Accept-Language header parsing — q-values + region fallback (TASK-455)', () => {
  it('honors q-values: a higher-weighted later language wins over the first', () => {
    const response = runProxy({ 'accept-language': 'fr-CA;q=0.5, en;q=0.9' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
  });

  it('resolves a full multi-tag browser header to the best supported locale', () => {
    const response = runProxy({
      'accept-language': 'vi-VN, vi;q=0.9, en-US, en;q=0.8, de;q=0.5',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
  });

  it('resolves bare region-variant languages (pt → pt-BR, zh → zh-CN)', () => {
    const pt = runProxy({ 'accept-language': 'pt;q=0.9, en;q=0.8' });
    expect(pt.headers.get('x-joinorigin-locale')).toBe('pt-BR');
    const zh = runProxy({ 'accept-language': 'zh;q=0.9, en;q=0.8' });
    expect(zh.headers.get('x-joinorigin-locale')).toBe('zh-CN');
  });

  it('skips unsupported tags and picks the next supported candidate', () => {
    const response = runProxy({ 'accept-language': 'xx;q=0.9, de;q=0.5' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('treats q=0 entries as unacceptable and skips them', () => {
    const response = runProxy({ 'accept-language': 'fr;q=0, de;q=0.5' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('ignores wildcard * entries', () => {
    const onlyWildcard = runProxy({ 'accept-language': '*;q=0.9' });
    expect(onlyWildcard.headers.get('x-joinorigin-locale')).toBe('en');
    const wildcardAndLocale = runProxy({ 'accept-language': '*;q=0.5, ja;q=0.9' });
    expect(wildcardAndLocale.headers.get('x-joinorigin-locale')).toBe('ja');
  });

  it('ignores non-q parameters on the segment', () => {
    const response = runProxy({ 'accept-language': 'de;q=0.9;foo=bar, en;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('keeps header order for equal q-values (stable sort)', () => {
    const response = runProxy({ 'accept-language': 'es, fr' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('es');
  });

  it('falls back to en when every candidate is unsupported or q=0', () => {
    const unsupported = runProxy({ 'accept-language': 'xx;q=0.5, yy;q=0.3' });
    expect(unsupported.headers.get('x-joinorigin-locale')).toBe('en');
    const allZero = runProxy({ 'accept-language': 'fr;q=0, de;q=0' });
    expect(allZero.headers.get('x-joinorigin-locale')).toBe('en');
  });
});

describe('resolved locale priority: prefix > cookie > header > en (TASK-455)', () => {
  it('prefix beats cookie and Accept-Language together', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community', {
      cookie: `${LOCALE_COOKIE}=fr`,
      'accept-language': 'de;q=0.9, en;q=0.8',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
  });

  it('cookie beats Accept-Language on unprefixed routes', () => {
    const response = runProxyAt('http://localhost/features', {
      cookie: `${LOCALE_COOKIE}=de`,
      'accept-language': 'fr;q=0.9, en;q=0.8',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
  });

  it('Accept-Language beats the en default on unprefixed routes', () => {
    const response = runProxyAt('http://localhost/features', {
      'accept-language': 'vi;q=0.9, en;q=0.8',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
  });

  it('resolves en when no prefix, cookie, or usable header is present', () => {
    const response = runProxyAt('http://localhost/features');
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
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

describe('route-stick: first visit to a /<locale>/ prefixed path sets the joinorigin_locale cookie (Goal 5 / TASK-455)', () => {
  it('sets the cookie to vi on a first visit to /vi/... so the prefix sticks', () => {
    const response = runProxyAt('http://localhost/vi/guides/start-a-community', {
      'accept-language': 'en;q=0.9',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('vi');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('vi');
    expect(response.headers.get('set-cookie')).toContain(`${LOCALE_COOKIE}=vi`);
  });

  it.each([
    ['de', '/de/location/germany/berlin/berlin'],
    ['es', '/es'],
    ['ja', '/ja/guides'],
    ['ar', '/ar/guides/organize-a-meetup'],
    ['pt-BR', '/pt-BR/guides/start-a-community'],
    ['zh-CN', '/zh-CN/guides'],
  ])('sets the cookie to %s on a first visit to %s', (locale, path) => {
    const response = runProxyAt(`http://localhost${path}`);
    expect(response.headers.get('x-joinorigin-locale')).toBe(locale);
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe(locale);
  });

  it('sets the cookie to en on a first visit to /en/... (en surface sticks too)', () => {
    const response = runProxyAt('http://localhost/en/features');
    expect(response.headers.get('x-joinorigin-locale')).toBe('en');
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('en');
  });

  it('does NOT overwrite an existing cookie on a prefixed visit', () => {
    const response = runProxyAt('http://localhost/de/guides', {
      cookie: `${LOCALE_COOKIE}=fr`,
      'accept-language': 'en;q=0.9',
    });
    // The prefix still wins for this request...
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
    // ...but the user's explicit fr cookie is left untouched (no Set-Cookie).
    expect(response.cookies.get(LOCALE_COOKIE)).toBeUndefined();
    expect(response.headers.get('set-cookie') ?? '').not.toContain('joinorigin_locale=');
  });

  it('does NOT set a cookie on unprefixed first visits', () => {
    const response = runProxy({ 'accept-language': 'de;q=0.9, en;q=0.8' });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
    expect(response.cookies.get(LOCALE_COOKIE)).toBeUndefined();
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('does NOT set a cookie on unprefixed visits with an existing cookie', () => {
    const response = runProxy({
      cookie: `${LOCALE_COOKIE}=de`,
      'accept-language': 'fr;q=0.9',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('de');
    expect(response.cookies.get(LOCALE_COOKIE)).toBeUndefined();
  });

  it('persists the route-stick cookie with a 1-year max-age, path=/, SameSite=Lax', () => {
    const response = runProxyAt('http://localhost/vi/guides');
    const setCookie = response.headers.get('set-cookie') ?? '';
    expect(setCookie).toContain(`${LOCALE_COOKIE}=vi`);
    expect(setCookie).toContain('Max-Age=31536000');
    expect(setCookie).toContain('Path=/');
    expect(setCookie.toLowerCase()).toContain('samesite=lax');
  });
});
