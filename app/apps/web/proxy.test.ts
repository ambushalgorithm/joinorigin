/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';

import { proxy, config, LOCALE_COOKIE } from './proxy';

/**
 * Unit tests for the locale-resolution proxy (`proxy.ts`, Next.js 16
 * convention — migrated from `middleware.ts` via the `middleware-to-proxy`
 * codemod). Proxy defaults to the Node.js runtime.
 *
 * Contract (arch-i18n §6.3, unchanged from the middleware):
 *  - precedence: cookie `joinorigin_locale` wins → Accept-Language →
 *    `DEFAULT_LOCALE` (`en`)
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

describe('/de/* forces German server-side (TASK-315)', () => {
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

  it('does not force de for paths merely starting with /de- (e.g. /deutschland)', () => {
    // Only the exact `/de` or `/de/...` prefix is the German surface; other
    // paths keep the normal precedence.
    const response = runProxyAt('http://localhost/deutschland', {
      'accept-language': 'fr',
    });
    expect(response.headers.get('x-joinorigin-locale')).toBe('fr');
  });
});

describe('non-/de routes keep cookie → Accept-Language precedence (TASK-315)', () => {
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
