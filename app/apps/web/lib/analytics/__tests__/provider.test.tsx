/**
 * Unit tests for the AnalyticsProvider mount behavior.
 *
 * - Renders children unchanged.
 * - Inits enabled trackers on mount (script injection stubbed).
 * - Dispatches pageview on pathname change.
 * - No-op when no trackers are enabled.
 * - SSR-safe: no window access during render (useEffect only).
 */

import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { AnalyticsProvider } from '../AnalyticsProvider';
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

function setAnalyticsJson(trackers: unknown[], trackPageViews = true) {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_ANALYTICS_JSON: JSON.stringify({ trackers, trackPageViews }),
  };
}

beforeEach(() => {
  mockPathname = '/';
  __resetForTests();
  mockedLoadScript.mockClear();
  delete (globalThis as Record<string, unknown>).plausible;
});

afterEach(() => {
  process.env = originalEnv;
});

describe('AnalyticsProvider', () => {
  it('renders children unchanged', () => {
    setAnalyticsJson([
      { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
    ]);

    render(
      <AnalyticsProvider>
        <div>page content</div>
      </AnalyticsProvider>,
    );

    expect(screen.getByText('page content')).toBeInTheDocument();
    expect(document.querySelector('div')).toHaveTextContent('page content');
  });

  it('inits enabled trackers on mount (script injection stubbed)', async () => {
    setAnalyticsJson([
      { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
    ]);

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(__getTrackersForTests().map((t) => t.kind)).toEqual(['plausible']);
    expect(mockedLoadScript).toHaveBeenCalledTimes(1);
  });

  it('dispatches a pageview on route change', async () => {
    setAnalyticsJson([
      { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
    ]);
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(mockPlausible).toHaveBeenCalledTimes(1);

    mockPathname = '/about';
    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(mockPlausible).toHaveBeenCalledTimes(2);
    expect(mockPlausible).toHaveBeenLastCalledWith(
      'pageview',
      expect.objectContaining({ u: expect.stringContaining('/about') }),
    );
  });

  it('does not dispatch pageviews when trackPageViews is false', async () => {
    setAnalyticsJson(
      [{ id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' }],
      false,
    );
    const mockPlausible = jest.fn();
    (globalThis as Record<string, unknown>).plausible = mockPlausible;

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(mockPlausible).not.toHaveBeenCalled();
  });

  it('is a no-op when no trackers are enabled (still renders children, injects nothing)', async () => {
    setAnalyticsJson([]);

    await act(async () => {
      render(
        <AnalyticsProvider>
          <div>child</div>
        </AnalyticsProvider>,
      );
    });

    expect(__getTrackersForTests()).toEqual([]);
    expect(mockedLoadScript).not.toHaveBeenCalled();
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('is SSR-safe — renderToString does not access vendor globals or inject scripts', () => {
    setAnalyticsJson([
      { id: 'plausible', kind: 'plausible', enabled: true, domain: 'joinorigin.co' },
    ]);

    const html = renderToString(
      <AnalyticsProvider>
        <div>child</div>
      </AnalyticsProvider>,
    );

    expect(html).toContain('child');
    expect(mockedLoadScript).not.toHaveBeenCalled();
  });
});
