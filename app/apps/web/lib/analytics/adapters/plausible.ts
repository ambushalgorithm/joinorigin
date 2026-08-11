/**
 * Plausible adapter — self-hosted, the recommended default tracker.
 *
 * - `init`: injects `<script defer data-domain={domain} src={`${apiHost}/js/script.js`} />`
 *   via `scriptLoader`. The vendor exposes `window.plausible`.
 * - `trackPageView(path)`: `window.plausible?.('pageview', { u: absoluteUrl(path) })`.
 * - `trackEvent({name, props})`: `window.plausible?.(name, { props })`.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.6.
 */

import { loadScript } from '../scriptLoader';
import type { AnalyticsTrackerConfig, TrackEvent, TrackerAdapter } from '../types';
import { absoluteUrl } from '../url';

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean | undefined>; u?: string },
    ) => void;
  }
}

const DEFAULT_API_HOST = 'https://analytics.joinorigin.com';

export class PlausibleAdapter implements TrackerAdapter {
  readonly id = 'plausible';
  readonly kind = 'plausible' as const;

  private initialized = false;

  async init(config: AnalyticsTrackerConfig): Promise<void> {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }
    this.initialized = true;

    const domain = config.domain;
    if (!domain) {
      // Defensive: config validation requires domain when enabled, but a
      // hand-rolled config must never crash the page.
      if (typeof console !== 'undefined') {
        console.debug('[analytics] plausible enabled without domain — skipping script');
      }
      return;
    }

    const apiHost = config.apiHost ?? DEFAULT_API_HOST;
    try {
      await loadScript(`${apiHost}/js/script.js`, { defer: '', 'data-domain': domain });
    } catch {
      // Analytics must never break the page; degrade silently.
      if (typeof console !== 'undefined') {
        console.debug('[analytics] plausible script load failed');
      }
    }
  }

  trackPageView(path: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.plausible?.('pageview', { u: absoluteUrl(path) });
  }

  trackEvent(event: TrackEvent): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.plausible?.(event.name, { props: event.props ?? {} });
  }
}
