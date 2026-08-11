/**
 * Unit tests for analytics config resolution + validation.
 *
 * Covers: defaults (plausible enabled, umami/ga4 disabled without env); JSON
 * override replaces the tracker list; malformed JSON throws; unknown kind
 * throws; missing required field throws; duplicate id throws; empty list is a
 * valid no-op; trackPageViews override honored.
 */

import { parseAndValidate, resolveAnalyticsConfig } from '../config';

const DEFAULT_API_HOST = 'https://analytics.joinorigin.com';

const originalEnv = process.env;

function setEnv(patch: Record<string, string | undefined>) {
  process.env = { ...originalEnv, ...patch };
}

afterEach(() => {
  process.env = originalEnv;
});

describe('resolveAnalyticsConfig defaults', () => {
  it('enables plausible by default (self-hosted), umami/ga4 absent without env', () => {
    setEnv({});

    const config = resolveAnalyticsConfig();

    expect(config.trackPageViews).toBe(true);
    expect(config.trackers).toHaveLength(1);
    expect(config.trackers[0]).toEqual({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'localhost',
      apiHost: DEFAULT_API_HOST,
    });
  });

  it('uses NEXT_PUBLIC_SITE_DOMAIN and NEXT_PUBLIC_PLAUSIBLE_API_HOST when set', () => {
    setEnv({
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.com',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.example.com',
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers[0]).toMatchObject({
      domain: 'joinorigin.com',
      apiHost: 'https://analytics.example.com',
    });
  });

  it('adds umami when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set', () => {
    setEnv({
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'u-123',
      NEXT_PUBLIC_UMAMI_HOST_URL: 'https://analytics.example.com',
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers.map((t) => t.kind)).toEqual(['plausible', 'umami']);
    expect(config.trackers[1]).toMatchObject({
      id: 'umami',
      enabled: true,
      websiteId: 'u-123',
      hostUrl: 'https://analytics.example.com',
    });
  });

  it('defaults umami hostUrl when only website id is set', () => {
    setEnv({ NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'u-456' });

    const config = resolveAnalyticsConfig();

    expect(config.trackers[1]).toMatchObject({
      hostUrl: DEFAULT_API_HOST,
    });
  });

  it('adds ga4 when NEXT_PUBLIC_GA4_MEASUREMENT_ID is set', () => {
    setEnv({ NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'G-ABC123' });

    const config = resolveAnalyticsConfig();

    expect(config.trackers.map((t) => t.kind)).toEqual(['plausible', 'ga4']);
    expect(config.trackers[1]).toMatchObject({
      id: 'ga4',
      enabled: true,
      measurementId: 'G-ABC123',
    });
  });

  it('can run all three trackers at once from env alone', () => {
    setEnv({
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'u-789',
      NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'G-XYZ',
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers.map((t) => t.kind)).toEqual(['plausible', 'umami', 'ga4']);
  });
});

describe('resolveAnalyticsConfig JSON override', () => {
  it('replaces the tracker list entirely when NEXT_PUBLIC_ANALYTICS_JSON is set', () => {
    setEnv({
      NEXT_PUBLIC_ANALYTICS_JSON: JSON.stringify({
        trackers: [
          { id: 'ga4', kind: 'ga4', enabled: true, measurementId: 'G-ONLY' },
          { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.com' },
        ],
        trackPageViews: false,
      }),
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers.map((t) => t.kind)).toEqual(['ga4', 'plausible']);
    expect(config.trackPageViews).toBe(false);
  });

  it('honors the JSON override even when env trackers are set', () => {
    setEnv({
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'u-999',
      NEXT_PUBLIC_ANALYTICS_JSON: JSON.stringify({ trackers: [] }),
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers).toEqual([]);
  });

  it('accepts an empty tracker list as a valid no-op config', () => {
    const config = parseAndValidate(JSON.stringify({ trackers: [] }));

    expect(config.trackers).toEqual([]);
    expect(config.trackPageViews).toBe(true);
  });

  it('defaults enabled to true and trackPageViews to true', () => {
    const config = parseAndValidate(
      JSON.stringify({ trackers: [{ id: 'p', kind: 'plausible', domain: 'joinorigin.com' }] }),
    );

    expect(config.trackers[0].enabled).toBe(true);
    expect(config.trackPageViews).toBe(true);
  });

  it('preserves disabled trackers as declared', () => {
    const config = parseAndValidate(
      JSON.stringify({
        trackers: [{ id: 'umami', kind: 'umami', enabled: false }],
      }),
    );

    expect(config.trackers[0]).toMatchObject({ id: 'umami', enabled: false });
  });
});

describe('parseAndValidate validation', () => {
  it('throws on malformed JSON', () => {
    expect(() => parseAndValidate('{not json')).toThrow(/not valid JSON/);
  });

  it('throws when the root is not an object', () => {
    expect(() => parseAndValidate('[1, 2]')).toThrow(/must be a JSON object/);
  });

  it('throws when trackers is not an array', () => {
    expect(() => parseAndValidate(JSON.stringify({ trackers: 'nope' }))).toThrow(
      /must include a "trackers" array/,
    );
  });

  it('throws on an unknown kind', () => {
    expect(() =>
      parseAndValidate(JSON.stringify({ trackers: [{ id: 'x', kind: 'hotjar', enabled: true }] })),
    ).toThrow(/unknown tracker kind "hotjar"/);
  });

  it('throws when an enabled plausible tracker has no domain', () => {
    expect(() =>
      parseAndValidate(
        JSON.stringify({ trackers: [{ id: 'plausible', kind: 'plausible', enabled: true }] }),
      ),
    ).toThrow(/enabled but missing "domain"/);
  });

  it('throws when an enabled umami tracker has no websiteId', () => {
    expect(() =>
      parseAndValidate(
        JSON.stringify({ trackers: [{ id: 'umami', kind: 'umami', enabled: true }] }),
      ),
    ).toThrow(/enabled but missing "websiteId"/);
  });

  it('throws when an enabled ga4 tracker has no measurementId', () => {
    expect(() =>
      parseAndValidate(JSON.stringify({ trackers: [{ id: 'ga4', kind: 'ga4', enabled: true }] })),
    ).toThrow(/enabled but missing "measurementId"/);
  });

  it('allows a disabled tracker to omit required fields', () => {
    const config = parseAndValidate(
      JSON.stringify({ trackers: [{ id: 'ga4', kind: 'ga4', enabled: false }] }),
    );

    expect(config.trackers[0].enabled).toBe(false);
  });

  it('throws on duplicate tracker ids', () => {
    expect(() =>
      parseAndValidate(
        JSON.stringify({
          trackers: [
            { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.com' },
            { id: 'plausible', kind: 'umami', enabled: true, websiteId: 'u-1' },
          ],
        }),
      ),
    ).toThrow(/duplicate tracker id "plausible"/);
  });
});
