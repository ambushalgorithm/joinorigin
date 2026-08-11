/**
 * Client-side analytics runtime.
 *
 * Owns the module-level cached config + adapter instances and forwards calls
 * to every enabled adapter. This is the single place that resolves the config
 * and creates the adapter set, so the provider and `trackEvent` consumers all
 * share one consistent state.
 *
 * SSR-safety: every public function is a no-op when `window` is undefined, so
 * importing this module (or the provider) never touches vendor globals during
 * server rendering.
 *
 * Test hooks: `__resetForTests` + `__getTrackersForTests` are exported so unit
 * tests can inspect adapter selection without touching internals.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.7.
 */

import { createAdapters } from './adapters';
import { resolveAnalyticsConfig } from './config';
import type { AnalyticsConfig, TrackerAdapter, TrackEvent } from './types';

let cachedConfig: AnalyticsConfig | null = null;
let adapters: TrackerAdapter[] | null = null;

function getState(): { config: AnalyticsConfig; adapters: TrackerAdapter[] } {
  if (cachedConfig === null) {
    cachedConfig = resolveAnalyticsConfig();
  }
  if (adapters === null) {
    adapters = createAdapters(cachedConfig);
  }
  return { config: cachedConfig, adapters };
}

/** Initialize every enabled tracker once (idempotent per adapter). */
export async function initTrackers(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }
  const { config, adapters: enabled } = getState();
  // createAdapters returns one adapter per enabled tracker, in config order —
  // zip by index so each adapter receives its own tracker config.
  const enabledTrackers = config.trackers.filter((tracker) => tracker.enabled);
  await Promise.all(enabled.map((adapter, index) => adapter.init(enabledTrackers[index])));
}

/** Report a page view to every enabled adapter. */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  for (const adapter of getState().adapters) {
    adapter.trackPageView(path);
  }
}

/** Report a custom event to every enabled adapter. */
export function trackEvent(event: TrackEvent): void {
  if (typeof window === 'undefined') {
    return;
  }
  for (const adapter of getState().adapters) {
    adapter.trackEvent(event);
  }
}

/** Whether automatic page-view tracking is enabled by the resolved config. */
export function getTrackPageViews(): boolean {
  return getState().config.trackPageViews !== false;
}

/** TEST ONLY — reset cached config + adapter instances between tests. */
export function __resetForTests(): void {
  cachedConfig = null;
  adapters = null;
}

/** TEST ONLY — expose the created tracker adapters. */
export function __getTrackersForTests(): TrackerAdapter[] {
  return getState().adapters;
}
