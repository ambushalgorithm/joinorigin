/**
 * Activation tests (Sprint 10, TASK-279 + Sprint 17, TASK-402).
 *
 * With NO analytics env vars set, the shipped default resolves a plausible
 * tracker pointed at the LOCAL self-hosted Plausible endpoint provisioned by
 * infra-plausible (TASK-277).
 *
 * DEV GUARD (Sprint 17, TASK-402): because the no-env default domain is
 * `localhost` (a local dev domain), the tracker script must NOT be injected —
 * this kills the collector's "Ignoring Event: localhost" server log by
 * preventing the script from loading in the first place. Event dispatch to
 * the vendor global still works (no-op when the script never registered the
 * global).
 *
 * PRODUCTION PATH (Sprint 17, TASK-402): with `NEXT_PUBLIC_SITE_DOMAIN=
 * joinorigin.co` + `NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://analytics.qa1
 * .joinorigin.co`, the adapter injects the production tracker script and
 * pageviews flow — production analytics stays intact.
 */

import { act, render } from '@testing-library/react';
import React from 'react';

import { AnalyticsProvider } from '../AnalyticsProvider';
import { createAdapters } from '../adapters';
import { PlausibleAdapter } from '../adapters/plausible';
import { resolveAnalyticsConfig } from '../config';
import { __getTrackersForTests, __resetForTests } from '../tracker-runtime';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

jest.mock('../scriptLoader', () => ({
  loadScript: jest.fn(() => Promise.resolve()),
}));

import { loadScript } from '../scriptLoader';
const mockedLoadScript = loadScript as jest.MockedFunction<typeof loadScript>;

let mockPathname = '/';

const originalEnv = process.env;

/** Remove every analytics-relevant var so the shipped defaults apply. */
function clearAnalyticsEnv() {
  const cleaned: NodeJS.ProcessEnv = { ...originalEnv };
  for (const key of [
    'NEXT_PUBLIC_ANALYTICS_JSON',
    'NEXT_PUBLIC_SITE_DOMAIN',
    'NEXT_PUBLIC_PLAUSIBLE_API_HOST',
    'NEXT_PUBLIC_UMAMI_WEBSITE_ID',
    'NEXT_PUBLIC_UMAMI_HOST_URL',
    'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
    'NEXT_PUBLIC_SITE_URL',
  ]) {
    delete cleaned[key];
  }
  process.env = cleaned;
}

beforeEach(() => {
  mockPathname = '/';
  clearAnalyticsEnv();
  __resetForTests();
  mockedLoadScript.mockClear();
  delete (globalThis as Record<string, unknown>).plausible;
});

afterEach(() => {
  process.env = originalEnv;
});

describe('activation — wired local Plausible config (no env overrides)', () => {
  it('config parsing: defaults to a plausible tracker at the local endpoint', () => {
    const config = resolveAnalyticsConfig();

    expect(config.trackPageViews).toBe(true);
    expect(config.trackers).toEqual([
      {
        id: 'plausible',
        kind: 'plausible',
        enabled: true,
        domain: 'localhost',
        apiHost: 'http://localhost:8000',
      },
    ]);
  });

  it('adapter selection: the activated config instantiates exactly one PlausibleAdapter', () => {
    const adapters = createAdapters(resolveAnalyticsConfig());

    expect(adapters).toHaveLength(1);
    expect(adapters[0]).toBeInstanceOf(PlausibleAdapter);
    expect(adapters[0].id).toBe('plausible');
  });

  it('DEV GUARD: init with the default (localhost-domain) config does NOT inject a script', async () => {
    const adapter = new PlausibleAdapter();
    await adapter.init(resolveAnalyticsConfig().trackers[0]);

    expect(mockedLoadScript).not.toHaveBeenCalled();
  });

  it('event dispatch: pageview reaches the collector global with an absolute URL', () => {
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;
    const adapter = new PlausibleAdapter();

    adapter.trackPageView('/about');

    expect(mockPlausible).toHaveBeenCalledWith(
      'pageview',
      expect.objectContaining({
        u: expect.stringMatching(/^http:\/\/localhost:3100\/about$/),
      }),
    );
  });

  it('event dispatch: custom events reach the collector global with props', () => {
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;
    const adapter = new PlausibleAdapter();

    adapter.trackEvent({ name: 'join_click', props: { source: 'hero' } });

    expect(mockPlausible).toHaveBeenCalledWith('join_click', { props: { source: 'hero' } });
  });

  it('DEV GUARD: mounting AnalyticsProvider with the default config injects no script', async () => {
    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    // The adapter is still selected, but the dev guard stops script
    // injection. Without the collector script no vendor global is ever
    // registered, so no event can reach the collector (kills the
    // "Ignoring Event: localhost" log).
    expect(__getTrackersForTests().map((t) => t.kind)).toEqual(['plausible']);
    expect(mockedLoadScript).not.toHaveBeenCalled();
  });
});

describe('production path (Sprint 17, TASK-402)', () => {
  it('config parsing: resolves domain joinorigin.co + apiHost analytics.qa1.joinorigin.co', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.co',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.qa1.joinorigin.co',
    };

    const config = resolveAnalyticsConfig();

    expect(config.trackers[0]).toMatchObject({
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain: 'joinorigin.co',
      apiHost: 'https://analytics.qa1.joinorigin.co',
    });
  });

  it('adapter URL: init injects the production tracker script with data-domain joinorigin.co', async () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.co',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.qa1.joinorigin.co',
    };
    const adapter = new PlausibleAdapter();
    await adapter.init(resolveAnalyticsConfig().trackers[0]);

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'https://analytics.qa1.joinorigin.co/js/script.js',
      expect.objectContaining({ 'data-domain': 'joinorigin.co', defer: '' }),
    );
  });

  it('provider: mounting AnalyticsProvider with the production env injects the script and fires a pageview', async () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SITE_DOMAIN: 'joinorigin.co',
      NEXT_PUBLIC_PLAUSIBLE_API_HOST: 'https://analytics.qa1.joinorigin.co',
    };
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(mockedLoadScript).toHaveBeenCalledWith(
      'https://analytics.qa1.joinorigin.co/js/script.js',
      expect.anything(),
    );
    expect(mockPlausible).toHaveBeenCalledWith(
      'pageview',
      expect.objectContaining({ u: expect.stringContaining('http://localhost:3100/') }),
    );
  });
});
