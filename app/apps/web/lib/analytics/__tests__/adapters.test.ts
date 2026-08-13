/**
 * Unit tests for adapter selection + script injection contracts.
 *
 * The script loader is stubbed so tests assert the `src`/attrs each adapter
 * requests without touching the real DOM.
 */

import { createAdapters } from '../adapters';
import { PlausibleAdapter } from '../adapters/plausible';
import { UmamiAdapter } from '../adapters/umami';
import { Ga4Adapter } from '../adapters/ga4';
import type { AnalyticsConfig, TrackerAdapter } from '../types';

jest.mock('../scriptLoader', () => ({
  loadScript: jest.fn(() => Promise.resolve()),
}));

import { loadScript } from '../scriptLoader';
const mockedLoadScript = loadScript as jest.MockedFunction<typeof loadScript>;

beforeEach(() => {
  mockedLoadScript.mockClear();
  delete (globalThis as Record<string, unknown>).plausible;
  delete (globalThis as Record<string, unknown>).umami;
  delete (globalThis as Record<string, unknown>).dataLayer;
  delete (globalThis as Record<string, unknown>).gtag;
});

describe('createAdapters', () => {
  it('instantiates exactly the enabled trackers in config order', () => {
    const config: AnalyticsConfig = {
      trackers: [
        { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.com' },
        { id: 'umami', kind: 'umami', enabled: false, websiteId: 'u-1' },
        { id: 'ga4', kind: 'ga4', enabled: true, measurementId: 'G-X' },
      ],
    };

    const adapters = createAdapters(config);

    expect(adapters.map((a) => a.kind)).toEqual(['plausible', 'ga4']);
    expect(adapters[0]).toBeInstanceOf(PlausibleAdapter);
    expect(adapters[1]).toBeInstanceOf(Ga4Adapter);
  });

  it('returns an empty list when no tracker is enabled', () => {
    const config: AnalyticsConfig = {
      trackers: [
        { id: 'plausible', kind: 'plausible', enabled: false },
        { id: 'ga4', kind: 'ga4', enabled: false },
      ],
    };

    expect(createAdapters(config)).toEqual([]);
  });

  it('rejects an unknown kind at selection time', () => {
    const config = {
      trackers: [{ id: 'x', kind: 'hotjar', enabled: true }],
    } as unknown as AnalyticsConfig;

    expect(() => createAdapters(config)).toThrow(/unknown tracker kind "hotjar"/);
  });

  it('ignores an unknown kind when the tracker is disabled', () => {
    const config = {
      trackers: [{ id: 'x', kind: 'hotjar', enabled: false }],
    } as unknown as AnalyticsConfig;

    expect(createAdapters(config)).toEqual([]);
  });
});

describe('script injection contracts', () => {
  it('ACTIVATION: plausible defaults to the local self-hosted endpoint (http://localhost:8000)', async () => {
    const adapter = new PlausibleAdapter();
    await adapter.init({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.com',
    });

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'http://localhost:8000/js/script.js',
      expect.objectContaining({ 'data-domain': 'joinorigin.com', defer: '' }),
    );
  });

  it('plausible injects script.js with data-domain and defer', async () => {
    const adapter = new PlausibleAdapter();
    await adapter.init({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.com',
      apiHost: 'https://analytics.joinorigin.com',
    });

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'https://analytics.joinorigin.com/js/script.js',
      expect.objectContaining({ 'data-domain': 'joinorigin.com', defer: '' }),
    );
  });

  it('plausible honors a custom apiHost (local collector)', async () => {
    const adapter = new PlausibleAdapter();
    await adapter.init({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.com',
      apiHost: 'http://localhost:8000',
    });

    expect(mockedLoadScript).toHaveBeenCalledWith(
      'http://localhost:8000/js/script.js',
      expect.anything(),
    );
  });

  it('umami injects script.js with data-website-id and defer', async () => {
    const adapter = new UmamiAdapter();
    await adapter.init({
      id: 'umami',
      kind: 'umami',
      enabled: true,
      websiteId: 'u-123',
      hostUrl: 'https://analytics.example.com',
    });

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'https://analytics.example.com/script.js',
      expect.objectContaining({ 'data-website-id': 'u-123', defer: '' }),
    );
  });

  it('ga4 injects the gtag loader with async', async () => {
    const adapter = new Ga4Adapter();
    await adapter.init({ id: 'ga4', kind: 'ga4', enabled: true, measurementId: 'G-ABC123' });

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'https://www.googletagmanager.com/gtag/js?id=G-ABC123',
      expect.objectContaining({ async: '' }),
    );
  });

  it('disabled adapters never inject a script', async () => {
    const plausible = new PlausibleAdapter();
    const umami = new UmamiAdapter();
    const ga4 = new Ga4Adapter();

    await Promise.all([
      plausible.init({ id: 'plausible', kind: 'plausible', enabled: false }),
      umami.init({ id: 'umami', kind: 'umami', enabled: false }),
      ga4.init({ id: 'ga4', kind: 'ga4', enabled: false }),
    ]);

    expect(mockedLoadScript).not.toHaveBeenCalled();
  });

  it('init is idempotent — a second init does not re-inject', async () => {
    const adapter = new PlausibleAdapter();
    const config = {
      id: 'plausible',
      kind: 'plausible' as const,
      enabled: true,
      domain: 'joinorigin.com',
    };

    await adapter.init(config);
    await adapter.init(config);

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
  });

  it('does not throw when the vendor script fails to load', async () => {
    mockedLoadScript.mockRejectedValueOnce(new Error('network down'));
    const adapter = new PlausibleAdapter();

    await expect(
      adapter.init({ id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.com' }),
    ).resolves.toBeUndefined();
  });
});

describe('tracking forwards to vendor globals', () => {
  it('plausible sends pageview with absolute URL', () => {
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;
    const adapter = new PlausibleAdapter();

    adapter.trackPageView('/about');

    expect(mockPlausible).toHaveBeenCalledWith(
      'pageview',
      expect.objectContaining({ u: expect.stringContaining('/about') }),
    );
  });

  it('plausible sends custom events with props', () => {
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;
    const adapter = new PlausibleAdapter();

    adapter.trackEvent({ name: 'signup_click', props: { source: 'hero' } });

    expect(mockPlausible).toHaveBeenCalledWith('signup_click', { props: { source: 'hero' } });
  });

  it('umami sends an explicit pageview with url override', () => {
    const mockTrack = jest.fn();
    (globalThis as Record<string, unknown>).umami = { track: mockTrack };
    const adapter = new UmamiAdapter();

    adapter.trackPageView('/features');

    const payload = mockTrack.mock.calls[0][0] as (
      loc: Record<string, unknown>,
    ) => Record<string, unknown>;
    expect(payload({ url: '/old', title: 'x' })).toMatchObject({ url: '/features', title: 'x' });
  });

  it('umami sends custom events by name', () => {
    const mockTrack = jest.fn();
    (globalThis as Record<string, unknown>).umami = { track: mockTrack };
    const adapter = new UmamiAdapter();

    adapter.trackEvent({ name: 'cta_click', props: { id: 'hero' } });

    expect(mockTrack).toHaveBeenCalledWith('cta_click', { id: 'hero' });
  });

  it('ga4 sends page_view with page_path', () => {
    const mockGtag = jest.fn();
    (globalThis as Record<string, unknown>).gtag = mockGtag;
    const adapter = new Ga4Adapter();

    adapter.trackPageView('/community');

    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', { page_path: '/community' });
  });

  it('ga4 sends custom events by name', () => {
    const mockGtag = jest.fn();
    (globalThis as Record<string, unknown>).gtag = mockGtag;
    const adapter = new Ga4Adapter();

    adapter.trackEvent({ name: 'click', props: { label: 'join' } });

    expect(mockGtag).toHaveBeenCalledWith('event', 'click', { label: 'join' });
  });

  it('no-ops silently when vendor globals are missing', () => {
    const adapter = new PlausibleAdapter();
    expect(() => {
      adapter.trackPageView('/');
      adapter.trackEvent({ name: 'x' });
    }).not.toThrow();
  });
});

describe('TrackerAdapter interface conformance', () => {
  it('every adapter exposes a stable id and kind', () => {
    const adapters: TrackerAdapter[] = [
      new PlausibleAdapter(),
      new UmamiAdapter(),
      new Ga4Adapter(),
    ];
    expect(adapters.map((a) => a.id)).toEqual(['plausible', 'umami', 'ga4']);
    expect(adapters.map((a) => a.kind)).toEqual(['plausible', 'umami', 'ga4']);
  });

  it('ga4 init configures dataLayer with send_page_view: false', async () => {
    const mockGtag = jest.fn();
    (globalThis as Record<string, unknown>).gtag = mockGtag;
    const adapter = new Ga4Adapter();
    await adapter.init({ id: 'ga4', kind: 'ga4', enabled: true, measurementId: 'G-ABC123' });

    expect(Array.isArray((globalThis as Record<string, unknown>).dataLayer)).toBe(true);
    expect(mockGtag).toHaveBeenCalledWith('config', 'G-ABC123', {
      anonymize_ip: true,
      send_page_view: false,
    });
  });
});
