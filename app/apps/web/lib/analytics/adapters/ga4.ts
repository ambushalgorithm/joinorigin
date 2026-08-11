/**
 * Google Analytics 4 adapter — opt-in tracker.
 *
 * - `init`: injects the gtag loader
 *   `<script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}" />`
 *   then pushes `window.dataLayer = window.dataLayer || []; window.gtag('js', new Date());
 *   window.gtag('config', measurementId, { anonymize_ip: true, send_page_view: false })`.
 *   (`send_page_view: false` — the provider drives page views explicitly so
 *   client-side navigation is reported correctly).
 * - `trackPageView(path)`: `window.gtag?.('event', 'page_view', { page_path: path })`.
 * - `trackEvent({name, props})`: `window.gtag?.('event', name, props ?? {})`.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.6.
 */

import { loadScript } from '../scriptLoader';
import type { AnalyticsTrackerConfig, TrackEvent, TrackerAdapter } from '../types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export class Ga4Adapter implements TrackerAdapter {
  readonly id = 'ga4';
  readonly kind = 'ga4' as const;

  private initialized = false;

  async init(config: AnalyticsTrackerConfig): Promise<void> {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }
    this.initialized = true;

    const measurementId = config.measurementId;
    if (!measurementId) {
      // Defensive: config validation requires measurementId when enabled.
      if (typeof console !== 'undefined') {
        console.debug('[analytics] ga4 enabled without measurementId — skipping script');
      }
      return;
    }

    try {
      await loadScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
        { async: '' },
      );
    } catch {
      if (typeof console !== 'undefined') {
        console.debug('[analytics] ga4 script load failed');
      }
    }

    window.dataLayer = window.dataLayer ?? [];
    if (typeof window.gtag !== 'function') {
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
    }
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }

  trackPageView(path: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.gtag?.('event', 'page_view', { page_path: path });
  }

  trackEvent(event: TrackEvent): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.gtag?.('event', event.name, event.props ?? {});
  }
}
