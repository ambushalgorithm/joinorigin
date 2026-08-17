/**
 * Analytics types — the shared, vendor-agnostic contracts used by every
 * tracker adapter, the config resolver, and the client-side provider.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.3–§2.5.
 */

/** Adapter kinds supported by the analytics subsystem. */
export type TrackerKind = 'plausible' | 'umami' | 'ga4';

/** Per-tracker declaration in the analytics config. */
export interface AnalyticsTrackerConfig {
  /** Stable id used in logs and tests, e.g. 'plausible'. */
  id: string;
  /** Adapter kind. */
  kind: TrackerKind;
  /** Master switch. Disabled trackers are ignored (no script, no events). */
  enabled: boolean;
  /** Plausible: site domain reported with events (e.g. 'joinorigin.co'). */
  domain?: string;
  /** Plausible (self-hosted): API origin, e.g. 'https://analytics.joinorigin.co'. */
  apiHost?: string;
  /** Umami: website id from the Umami dashboard. */
  websiteId?: string;
  /** Umami (self-hosted): script origin, e.g. 'https://analytics.joinorigin.co'. */
  hostUrl?: string;
  /** GA4: measurement id, e.g. 'G-XXXXXXX'. */
  measurementId?: string;
}

export interface AnalyticsConfig {
  trackers: AnalyticsTrackerConfig[];
  /** Track page views automatically on route change (default true). */
  trackPageViews?: boolean;
}

export interface TrackEvent {
  name: string;
  props?: Record<string, string | number | boolean | undefined>;
}

/**
 * Every tracker implements this single shared interface. No analytics code
 * outside the adapters may touch `window`, `document`, or vendor globals.
 */
export interface TrackerAdapter {
  readonly id: string;
  readonly kind: TrackerKind;

  /** Load vendor script + set up globals. Called once on client mount. */
  init(config: AnalyticsTrackerConfig): void | Promise<void>;

  /** Report a page view for the given path. */
  trackPageView(path: string): void;

  /** Report a custom event with optional props. */
  trackEvent(event: TrackEvent): void;
}
