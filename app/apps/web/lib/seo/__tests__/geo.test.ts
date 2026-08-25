import { IP_COUNTRY_HEADER, getServerCountry } from '../geo';

/**
 * Server-side geo helper unit tests (TASK-479 — fe-ip-country; consumed by
 * Story E TASK-540 for the example-communities closest-country contract).
 *
 * Contract: `getServerCountry()` reads the proxy-forwarded
 * `x-joinorigin-ip-country` header (originating from Cloudflare's
 * `CF-IPCountry`) and returns the ISO-3166-1 alpha-2 country code
 * uppercased, or `null` when the header is absent or not well-formed —
 * callers then fall back to locale-language ordering.
 */

// next/headers is server-only; stub the header store so the test can set
// the proxy-forwarded country header per test via `mockCountryHeader`.
const mockCountryHeader: { value: string | null } = { value: 'DE' };
jest.mock('next/headers', () => ({
  headers: () => ({
    get: (name: string) => (name === 'x-joinorigin-ip-country' ? mockCountryHeader.value : null),
  }),
}));

describe('lib/seo geo — getServerCountry()', () => {
  it('returns the forwarded ISO-3166-1 alpha-2 country code', async () => {
    mockCountryHeader.value = 'US';
    await expect(getServerCountry()).resolves.toBe('US');
  });

  it('returns null when the header is absent', async () => {
    mockCountryHeader.value = null;
    await expect(getServerCountry()).resolves.toBeNull();
  });

  it('returns null when the header is empty/whitespace', async () => {
    mockCountryHeader.value = '   ';
    await expect(getServerCountry()).resolves.toBeNull();
  });

  it('returns null when the header is not a well-formed country code', async () => {
    mockCountryHeader.value = 'USA';
    await expect(getServerCountry()).resolves.toBeNull();
  });

  it('returns null when the header is not uppercase alpha', async () => {
    mockCountryHeader.value = 'D1';
    await expect(getServerCountry()).resolves.toBeNull();
  });

  it('normalizes lowercase country codes to uppercase', async () => {
    mockCountryHeader.value = 'de';
    await expect(getServerCountry()).resolves.toBe('DE');
  });

  it('trims surrounding whitespace before validating', async () => {
    mockCountryHeader.value = '  fr ';
    await expect(getServerCountry()).resolves.toBe('FR');
  });

  it('exposes the header name that proxy.ts must keep in sync', () => {
    // proxy.ts sets `x-joinorigin-ip-country` from Cloudflare's
    // `CF-IPCountry`; geo.ts must read the exact same name or every
    // server-side geo lookup silently returns null (Story E fallback).
    expect(IP_COUNTRY_HEADER).toBe('x-joinorigin-ip-country');
  });
});
