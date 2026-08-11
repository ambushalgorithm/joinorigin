/**
 * Analytics config resolution.
 *
 * Reads a single optional JSON override from the environment
 * (`NEXT_PUBLIC_ANALYTICS_JSON`) and merges it over built-in defaults — the
 * "config-driven" property: changing the tracker mix never requires code
 * edits. A site operator flips a flag / sets an env var and the provider
 * instantiates the enabled adapters.
 *
 * Resolution order (lowest → highest precedence):
 *  1. Built-in defaults (Plausible enabled, self-hosted; Umami/GA4 opt-in via
 *     env vars).
 *  2. `NEXT_PUBLIC_ANALYTICS_JSON` — when present it replaces the tracker
 *     list entirely (explicit operator override).
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.4.
 */

import type { AnalyticsConfig, AnalyticsTrackerConfig, TrackerKind } from './types';

const VALID_KINDS: ReadonlySet<TrackerKind> = new Set<TrackerKind>(['plausible', 'umami', 'ga4']);

/** Required field per kind when the tracker is enabled. */
const REQUIRED_FIELDS: Record<TrackerKind, ReadonlyArray<keyof AnalyticsTrackerConfig>> = {
  plausible: ['domain'],
  umami: ['websiteId'],
  ga4: ['measurementId'],
};

const DEFAULT_API_HOST = 'https://analytics.joinorigin.com';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Parse + validate an explicit JSON config. Throws on malformed JSON,
 * unknown kind, missing required fields, or duplicate ids (fails fast —
 * never silently disables analytics).
 */
export function parseAndValidate(raw: string): AnalyticsConfig {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('[analytics] NEXT_PUBLIC_ANALYTICS_JSON is not valid JSON');
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('[analytics] NEXT_PUBLIC_ANALYTICS_JSON must be a JSON object');
  }

  const candidate = parsed as Record<string, unknown>;
  if (!Array.isArray(candidate.trackers)) {
    throw new Error('[analytics] NEXT_PUBLIC_ANALYTICS_JSON must include a "trackers" array');
  }

  const trackers = candidate.trackers.map((entry, index) => validateTracker(entry, index));

  const seenIds = new Set<string>();
  for (const tracker of trackers) {
    if (seenIds.has(tracker.id)) {
      throw new Error(`[analytics] duplicate tracker id "${tracker.id}"`);
    }
    seenIds.add(tracker.id);
  }

  return {
    trackers,
    trackPageViews: candidate.trackPageViews !== false,
  };
}

function validateTracker(entry: unknown, index: number): AnalyticsTrackerConfig {
  if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
    throw new Error(`[analytics] tracker at index ${index} must be an object`);
  }

  const candidate = entry as Record<string, unknown>;

  if (!isNonEmptyString(candidate.id)) {
    throw new Error(`[analytics] tracker at index ${index} requires a non-empty "id"`);
  }
  const { id } = candidate;

  if (typeof candidate.kind !== 'string' || !VALID_KINDS.has(candidate.kind as TrackerKind)) {
    throw new Error(`[analytics] unknown tracker kind "${String(candidate.kind)}" for id "${id}"`);
  }
  const kind = candidate.kind as TrackerKind;

  const enabled = candidate.enabled === undefined ? true : candidate.enabled;
  if (typeof enabled !== 'boolean') {
    throw new Error(`[analytics] tracker "${id}" enabled must be a boolean`);
  }

  const tracker: AnalyticsTrackerConfig = {
    id,
    kind,
    enabled,
  };
  if (isNonEmptyString(candidate.domain)) tracker.domain = candidate.domain;
  if (isNonEmptyString(candidate.apiHost)) tracker.apiHost = candidate.apiHost;
  if (isNonEmptyString(candidate.websiteId)) tracker.websiteId = candidate.websiteId;
  if (isNonEmptyString(candidate.hostUrl)) tracker.hostUrl = candidate.hostUrl;
  if (isNonEmptyString(candidate.measurementId)) tracker.measurementId = candidate.measurementId;

  if (enabled) {
    for (const field of REQUIRED_FIELDS[kind]) {
      if (!isNonEmptyString(tracker[field])) {
        throw new Error(
          `[analytics] tracker "${id}" (kind "${kind}") is enabled but missing "${field}"`,
        );
      }
    }
  }

  return tracker;
}

/** Build the analytics config from env vars + defaults (see header comment). */
export function resolveAnalyticsConfig(): AnalyticsConfig {
  const explicit = process.env.NEXT_PUBLIC_ANALYTICS_JSON;
  if (explicit) {
    return parseAndValidate(explicit);
  }

  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'localhost';
  const trackers: AnalyticsTrackerConfig[] = [
    {
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain,
      apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST ?? DEFAULT_API_HOST,
    },
  ];

  if (process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
    trackers.push({
      id: 'umami',
      kind: 'umami',
      enabled: true,
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      hostUrl: process.env.NEXT_PUBLIC_UMAMI_HOST_URL ?? DEFAULT_API_HOST,
    });
  }

  if (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    trackers.push({
      id: 'ga4',
      kind: 'ga4',
      enabled: true,
      measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    });
  }

  return { trackers, trackPageViews: true };
}
