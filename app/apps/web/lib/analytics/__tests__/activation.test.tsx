/**
 * Activation tests (Sprint 10, TASK-279) — the wired-out-of-the-box config.
 *
 * With NO analytics env vars set, the shipped default must point the app at
 * the LOCAL self-hosted Plausible endpoint provisioned by infra-plausible
 * (TASK-277) and actually dispatch pageviews + custom events to it:
 *
 *  1. Config parsing → `resolveAnalyticsConfig()` resolves a plausible
 *     tracker with apiHost `http://localhost:8000` (matches docker-compose +
 *     .env.example).
 *  2. Plausible adapter URL → `init` injects `${apiHost}/js/script.js` with
 *     `data-domain` + defer.
 *  3. Event dispatch → `trackPageView` / `trackEvent` forward to the vendor
 *     global (`window.plausible`) that the collector script registers.
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

  it('adapter URL: init injects the local collector script.js with data-domain + defer', async () => {
    const adapter = new PlausibleAdapter();
    await adapter.init(resolveAnalyticsConfig().trackers[0]);

    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'http://localhost:8000/js/script.js',
      expect.objectContaining({ 'data-domain': 'localhost', defer: '' }),
    );
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

  it('provider: mounting AnalyticsProvider with the default config injects the local script and fires a pageview', async () => {
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(__getTrackersForTests().map((t) => t.kind)).toEqual(['plausible']);
    expect(mockedLoadScript).toHaveBeenCalledWith(
      'http://localhost:8000/js/script.js',
      expect.anything(),
    );
    expect(mockPlausible).toHaveBeenCalledWith(
      'pageview',
      expect.objectContaining({ u: expect.stringContaining('http://localhost:3100/') }),
    );
  });
});
