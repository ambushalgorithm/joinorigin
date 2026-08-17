/**
 * Umami adapter — self-hosted, opt-in tracker.
 *
 * - `init`: injects `<script defer src={`${hostUrl}/script.js`} data-website-id={websiteId} />`
 *   via `scriptLoader`. The vendor exposes `window.umami`.
 * - `trackPageView(path)`: `window.umami?.track((location) => ({ ...location, url: path }))`
 *   — an explicit pageview for consistency (Umami auto-tracks when `autoTrack`
 *   is on; the adapter still sends one so the provider drives route changes).
 * - `trackEvent({name, props})`: `window.umami?.track(name, props ?? {})`.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.6.
 */

import { loadScript } from '../scriptLoader';
import type { AnalyticsTrackerConfig, TrackEvent, TrackerAdapter } from '../types';

declare global {
  interface Window {
    umami?: {
      track: (
        payloadOrEvent: string | ((location: Record<string, unknown>) => Record<string, unknown>),
        data?: Record<string, unknown>,
      ) => void;
    };
  }
}

const DEFAULT_HOST_URL = 'https://analytics.joinorigin.co';

export class UmamiAdapter implements TrackerAdapter {
  readonly id = 'umami';
  readonly kind = 'umami' as const;

  private initialized = false;

  async init(config: AnalyticsTrackerConfig): Promise<void> {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }
    this.initialized = true;

    const websiteId = config.websiteId;
    if (!websiteId) {
      // Defensive: config validation requires websiteId when enabled.
      if (typeof console !== 'undefined') {
        console.debug('[analytics] umami enabled without websiteId — skipping script');
      }
      return;
    }

    const hostUrl = config.hostUrl ?? DEFAULT_HOST_URL;
    try {
      await loadScript(`${hostUrl}/script.js`, { defer: '', 'data-website-id': websiteId });
    } catch {
      if (typeof console !== 'undefined') {
        console.debug('[analytics] umami script load failed');
      }
    }
  }

  trackPageView(path: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.umami?.track((location) => ({ ...location, url: path }));
  }

  trackEvent(event: TrackEvent): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.umami?.track(event.name, event.props ?? {});
  }
}
