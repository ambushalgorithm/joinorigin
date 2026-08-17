/**
 * Unit tests for analytics config resolution + validation.
 *
 * Covers: defaults (plausible enabled, umami/ga4 disabled without env); JSON
 * override replaces the tracker list; malformed JSON throws; unknown kind
 * throws; missing required field throws; duplicate id throws; empty list is a
 * valid no-op; trackPageViews override honored.
 *
 * ACTIVATION (Sprint 10, TASK-279): the default Plausible API host must point
 * at the LOCAL self-hosted Plausible endpoint provisioned by infra-plausible
 * (TASK-277) — `http://localhost:8000`, matching `docker-compose.yml` +
 * `apps/web/.env.example`.
 */

import { parseAndValidate, resolveAnalyticsConfig } from '../config';

/** Local self-hosted Plausible endpoint (infra-plausible TASK-277). */
const LOCAL_PLAUSIBLE_API_HOST = 'http://localhost:8000';
/** Umami fallback host when only a website id is set (production analytics host). */
const DEFAULT_UMAMI_HOST_URL = 'https://analytics.joinorigin.co';

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
      apiHost: LOCAL_PLAUSIBLE_API_HOST,
    });
  });

  it('ACTIVATION: defaults plausible apiHost to the local self-hosted Plausible endpoint', () => {
    setEnv({});

    const config = resolveAnalyticsConfig();

    expect(config.trackers[0]).toMatchObject({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      apiHost: 'http://localhost:8000',
    });
  });

  it('uses NEXT_PUBLIC_SITE_DOMAIN and NEXT_PUBLIC_PLAUSIBLE_API_HOST when set', () => {
    setEnv({
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.co',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.example.com',
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers[0]).toMatchObject({
      domain: 'joinorigin.co',
      apiHost: 'https://analytics.example.com',
    });
  });

  it('PRODUCTION PATH (Sprint 17, TASK-402): resolves domain joinorigin.co + apiHost analytics.qa1.joinorigin.co', () => {
    setEnv({
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.co',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.qa1.joinorigin.co',
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers[0]).toMatchObject({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.co',
      apiHost: 'https://analytics.qa1.joinorigin.co',
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
      hostUrl: DEFAULT_UMAMI_HOST_URL,
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
  it('ACTIVATION: NEXT_PUBLIC_ANALYTICS_JSON pointing at the local Plausible resolves', () => {
    setEnv({
      NEXT_PUBLIC_ANALYTICS_JSON: JSON.stringify({
        trackers: [
          {
            id: 'plausible',
            kind: 'plausible',
            domain: 'joinorigin.co',
            apiHost: 'http://localhost:8000',
          },
        ],
        trackPageViews: true,
      }),
    });

    const config = resolveAnalyticsConfig();

    expect(config.trackers).toHaveLength(1);
    expect(config.trackers[0]).toMatchObject({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.co',
      apiHost: 'http://localhost:8000',
    });
    expect(config.trackPageViews).toBe(true);
  });

  it('replaces the tracker list entirely when NEXT_PUBLIC_ANALYTICS_JSON is set', () => {
    setEnv({
      NEXT_PUBLIC_ANALYTICS_JSON: JSON.stringify({
        trackers: [
          { id: 'ga4', kind: 'ga4', enabled: true, measurementId: 'G-ONLY' },
          { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
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
      JSON.stringify({ trackers: [{ id: 'p', kind: 'plausible', domain: 'joinorigin.co' }] }),
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
            { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
            { id: 'plausible', kind: 'umami', enabled: true, websiteId: 'u-1' },
          ],
        }),
      ),
    ).toThrow(/duplicate tracker id "plausible"/);
  });
});
