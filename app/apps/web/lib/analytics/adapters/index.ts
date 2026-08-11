/**
 * Adapter registry/selection.
 *
 * `createAdapters(config)` returns a `TrackerAdapter[]` containing exactly one
 * adapter instance per **enabled** tracker in the config. Disabled trackers
 * never get an instance (no script, no events). Unknown kinds are rejected at
 * selection time so a typo in an operator-supplied JSON config fails fast
 * instead of silently shipping a dead tracker.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.5–§2.6.
 */

import type { AnalyticsConfig, TrackerAdapter, TrackerKind } from '../types';
import { Ga4Adapter } from './ga4';
import { PlausibleAdapter } from './plausible';
import { UmamiAdapter } from './umami';

const ADAPTER_FACTORY: Record<TrackerKind, () => TrackerAdapter> = {
  plausible: () => new PlausibleAdapter(),
  umami: () => new UmamiAdapter(),
  ga4: () => new Ga4Adapter(),
};

export function createAdapters(config: AnalyticsConfig): TrackerAdapter[] {
  const adapters: TrackerAdapter[] = [];

  for (const tracker of config.trackers) {
    if (!tracker.enabled) {
      continue;
    }
    const factory = ADAPTER_FACTORY[tracker.kind];
    if (!factory) {
      throw new Error(`[analytics] unknown tracker kind "${tracker.kind}"`);
    }
    adapters.push(factory());
  }

  return adapters;
}
