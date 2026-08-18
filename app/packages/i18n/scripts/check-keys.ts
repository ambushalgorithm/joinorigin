/**
 * Key-parity validator (arch-i18n §5) — the translator CI gate.
 *
 * Every locale JSON must:
 *  1. Parse as valid JSON.
 *  2. Carry the reserved top-level `dir` metadata key ('ltr' | 'rtl').
 *  3. Mirror `en.json`'s flattened key set EXACTLY (missing/extra = failure,
 *     ignoring the `dir` *value* but still asserting the key exists).
 *
 * Sprint 18 (TASK-411) — phased translation baseline. The i18n-en-keys role
 * extends `en.json` (the source of truth) with the comparison/glossary/
 * guides-hub/location/placeholder/reframe keys; the 20 non-EN locales are
 * translated in parallel by the per-locale `i18n-{locale}-s18` roles (Group
 * 3). While those land, a locale MAY be missing exactly the keys in
 * `PENDING_ADDITIONS` and MAY still carry exactly the keys in
 * `PENDING_REMOVALS`. Any other diff is still a parity failure, so the EN
 * baseline can never silently drift. Once every locale is aligned, both
 * pending sets are inert and parity is exact 21/21 again.
 *
 * Usage: pnpm --filter @joinorigin/i18n check-keys
 * Exit code 0 = all locales valid; 1 = violations found.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES_DIR = join(__dirname, '..', 'locales');

/* ------------------------------------------------------------------ *
 * Sprint 18 (TASK-411) — pending-translation baseline.
 *
 * The flattened key sets below are the transition contract between this role
 * (EN source of truth) and the Group 3 translation roles. They are exported
 * so the dictionary-loader unit tests enforce the same expectation.
 * ------------------------------------------------------------------ */

/** The 10-tool comparison set (TASK-412) — the EN baseline carries all 10. */
export const COMPARISON_TOOLS = [
  'slack',
  'discord',
  'whatsapp',
  'linkedin',
  'meetup',
  'eventbrite',
  'notion',
  'asana',
  'patreon',
  'facebook',
] as const;

/** The 9 glossary term slugs (TASK-413) — real definitions, no "coming soon". */
export const GLOSSARY_TERM_SLUGS = [
  'community',
  'community-manager',
  'community-os',
  'moderation',
  'onboarding',
  'activation',
  'engagement-loop',
  'hybrid-events',
  'co-founder',
] as const;

/** Guide-card title slugs rendered on location pages (TASK-416). */
const GUIDE_CARD_SLUGS = [
  'start-a-community',
  'organize-a-meetup',
  'first-10-members',
  'find-a-co-founder',
  'keep-a-community-active',
  'hybrid-communities',
  'moderation',
] as const;

/** Flattened key paths the EN source of truth MUST carry (TASK-411). */
export const EN_EXPECTATIONS: readonly string[] = [
  ...COMPARISON_TOOLS.flatMap((tool) =>
    (['tool', 'strength', 'gap'] as const).map((field) => `features.comparison.${tool}.${field}`),
  ),
  ...GLOSSARY_TERM_SLUGS.flatMap((slug) => [
    `seoContent.glossary.terms.${slug}.name`,
    `seoContent.glossary.terms.${slug}.definition`,
  ]),
  // TASK-444 — glossary hub section bodies (whyBody/termsIntro + the
  // go-deeper bullets with Trans link placeholders).
  'seoContent.glossary.whyBody',
  'seoContent.glossary.termsIntro',
  'seoContent.glossary.goDeeperItem1',
  'seoContent.glossary.goDeeperItem2',
  'seoContent.guides.hubLead',
  'seoContent.guides.searchLabel',
  'seoContent.guides.searchPlaceholder',
  'seoContent.guides.emptyState',
  'seoContent.guides.glossaryBandCopy',
  'seoContent.guides.universalCopy',
  'seoContent.guides.continueBuilding',
  'seoContent.guides.practiceInCity',
  'seoContent.guides.howJoinOriginHelpsBody',
  'seoContent.guides.keepLearningGuides',
  'seoContent.guides.keepLearningGlossary',
  'seoContent.guides.keepLearningLocations',
  'seoContent.location.browseLocations',
  'seoContent.location.searchLocationsLabel',
  'seoContent.location.searchLocationsPlaceholder',
  'seoContent.location.emptyState',
  'seoContent.location.attribution',
  ...(['country', 'region', 'city', 'variant', 'ideas', 'fallback'] as const).map(
    (kind) => `seoContent.location.directoryKinds.${kind}`,
  ),
  ...GUIDE_CARD_SLUGS.map((slug) => `seoContent.location.guideCardTitles.${slug}`),
  'seoContent.metadata.waitlistPhrase',
  'seoContent.metadata.title.communitiesIn',
  'seoContent.metadata.title.communitiesInWithRegion',
  'seoContent.metadata.title.variantIn',
  'seoContent.metadata.title.ideasIn',
  'seoContent.metadata.description.city',
  'seoContent.metadata.description.variant',
  'seoContent.metadata.description.ideas',
  'seoContent.metadata.description.country',
  'seoContent.metadata.description.region',
] as const;

/**
 * New flattened keys authored in `en.json` by TASK-411 that the non-EN
 * locales are still translating (Group 3 i18n-{locale}-s18 roles).
 * A locale may be missing ONLY these keys during the transition window.
 */
export const PENDING_ADDITIONS: ReadonlySet<string> = new Set([
  // features.comparison.* — 8 new tools (the 10-tool set; linkedin/discord
  // already existed and only change value, not key parity).
  ...(
    ['slack', 'whatsapp', 'meetup', 'eventbrite', 'notion', 'asana', 'patreon', 'facebook'] as const
  ).flatMap((tool) =>
    (['tool', 'strength', 'gap'] as const).map((field) => `features.comparison.${tool}.${field}`),
  ),
  // seoContent.glossary.terms.* — 9 real definitions.
  ...GLOSSARY_TERM_SLUGS.flatMap((slug) => [
    `seoContent.glossary.terms.${slug}.name`,
    `seoContent.glossary.terms.${slug}.definition`,
  ]),
  // seoContent.glossary.* — 4 section-body keys (TASK-444; TASK-445
  // translates them into the 20 non-EN locales after this role merges).
  'seoContent.glossary.whyBody',
  'seoContent.glossary.termsIntro',
  'seoContent.glossary.goDeeperItem1',
  'seoContent.glossary.goDeeperItem2',
  // seoContent.guides.* — guides-hub + guide-view chrome (TASK-414).
  'seoContent.guides.hubLead',
  'seoContent.guides.searchLabel',
  'seoContent.guides.searchPlaceholder',
  'seoContent.guides.emptyState',
  'seoContent.guides.glossaryBandCopy',
  'seoContent.guides.universalCopy',
  'seoContent.guides.continueBuilding',
  'seoContent.guides.practiceInCity',
  'seoContent.guides.howJoinOriginHelpsBody',
  'seoContent.guides.keepLearningGuides',
  'seoContent.guides.keepLearningGlossary',
  'seoContent.guides.keepLearningLocations',
  // seoContent.location.* — location-screen chrome (TASK-416).
  'seoContent.location.browseLocations',
  'seoContent.location.searchLocationsLabel',
  'seoContent.location.searchLocationsPlaceholder',
  'seoContent.location.emptyState',
  'seoContent.location.attribution',
  ...(['country', 'region', 'city', 'variant', 'ideas', 'fallback'] as const).map(
    (kind) => `seoContent.location.directoryKinds.${kind}`,
  ),
  ...GUIDE_CARD_SLUGS.map((slug) => `seoContent.location.guideCardTitles.${slug}`),
  // seoContent.metadata.* — location metadata templates (TASK-416).
  'seoContent.metadata.waitlistPhrase',
  'seoContent.metadata.title.communitiesIn',
  'seoContent.metadata.title.communitiesInWithRegion',
  'seoContent.metadata.title.variantIn',
  'seoContent.metadata.title.ideasIn',
  'seoContent.metadata.description.city',
  'seoContent.metadata.description.variant',
  'seoContent.metadata.description.ideas',
  'seoContent.metadata.description.country',
  'seoContent.metadata.description.region',
]);

/**
 * Flattened keys removed from `en.json` by TASK-411 (replaced/dropped copy)
 * that the non-EN locales are still cleaning up. A locale may carry ONLY
 * these extra keys during the transition window.
 */
export const PENDING_REMOVALS: ReadonlySet<string> = new Set([
  // features.comparison — reddit/github replaced by the 10-tool set.
  ...(['reddit', 'github'] as const).flatMap((tool) =>
    (['tool', 'strength', 'gap'] as const).map((field) => `features.comparison.${tool}.${field}`),
  ),
  // seoContent.glossary — comingSoon replaced by real term definitions.
  'seoContent.glossary.comingSoon',
]);

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

interface FlattenResult {
  keys: Set<string>;
  dir?: string;
}

function flatten(
  obj: Record<string, unknown>,
  prefix = '',
  keys: Set<string> = new Set(),
): Set<string> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value as Record<string, unknown>, full, keys);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

function loadFlattened(file: string): FlattenResult {
  const raw = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
  const keys = flatten(raw);
  const dir = typeof raw.dir === 'string' ? (raw.dir as string) : undefined;
  return { keys, dir };
}

/** Dot-path lookup into a nested JSON object (undefined when absent). */
export function lookupPath(obj: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = obj;
  for (const segment of path.split('.')) {
    if (cursor && typeof cursor === 'object' && segment in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return cursor;
}

/**
 * EN source-of-truth expectations (TASK-411). Beyond key parity, `en.json`
 * itself must carry the Sprint 18 namespaces/leaf keys so an accidental
 * wholesale removal of the baseline is impossible.
 */
function checkEnExpectations(enRaw: Record<string, unknown>): number {
  let failures = 0;

  // TASK-310: the SEO chrome namespace must exist in the EN source of truth.
  // The exact-parity loop below propagates it to every locale automatically,
  // but this guard makes an accidental wholesale removal impossible.
  if (!enRaw.seoContent || typeof enRaw.seoContent !== 'object') {
    console.error('✗ en.json: missing "seoContent" namespace (SEO chrome — TASK-310)');
    failures += 1;
  }

  // TASK-411: the Sprint 18 baseline must be present in the EN source of truth.
  for (const key of EN_EXPECTATIONS) {
    const value = lookupPath(enRaw, key);
    if (typeof value !== 'string') {
      console.error(`✗ en.json: missing expected baseline key "${key}" (TASK-411)`);
      failures += 1;
    }
  }

  return failures;
}

function main(): void {
  const files = readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort();

  const enFile = join(LOCALES_DIR, 'en.json');
  const enRaw = JSON.parse(readFileSync(enFile, 'utf8')) as Record<string, unknown>;
  const enKeys = flatten(enRaw);
  let failures = checkEnExpectations(enRaw);

  for (const file of files) {
    const localeName = file.replace(/\.json$/, '');
    let result: FlattenResult;
    try {
      result = loadFlattened(join(LOCALES_DIR, file));
    } catch (error) {
      console.error(`✗ ${localeName}: invalid JSON (${(error as Error).message})`);
      failures += 1;
      continue;
    }

    if (result.dir !== 'ltr' && result.dir !== 'rtl') {
      console.error(`✗ ${localeName}: missing/invalid top-level "dir" (got ${String(result.dir)})`);
      failures += 1;
    }
    if (localeName === 'ar' || localeName === 'fa') {
      if (result.dir !== 'rtl') {
        console.error(`✗ ${localeName}: dir must be "rtl"`);
        failures += 1;
      }
    }

    const missing = [...enKeys].filter((key) => !result.keys.has(key));
    const extra = [...result.keys].filter((key) => !enKeys.has(key));
    const realMissing = missing.filter((key) => !PENDING_ADDITIONS.has(key));
    const realExtra = extra.filter((key) => !PENDING_REMOVALS.has(key));
    const pendingMissing = missing.length - realMissing.length;
    const pendingExtra = extra.length - realExtra.length;

    if (realMissing.length > 0 || realExtra.length > 0) {
      console.error(`✗ ${localeName}: key parity broken`);
      if (realMissing.length > 0) {
        console.error(`    missing: ${realMissing.slice(0, 10).join(', ')}`);
      }
      if (realExtra.length > 0) {
        console.error(`    extra: ${realExtra.slice(0, 10).join(', ')}`);
      }
      failures += 1;
    } else if (pendingMissing > 0 || pendingExtra > 0) {
      console.log(
        `◌ ${localeName}: ${result.keys.size} keys, dir=${result.dir} — parity pending ` +
          `(Sprint 18: ${pendingMissing} awaiting translation, ${pendingExtra} removed pending cleanup)`,
      );
    } else {
      console.log(`✓ ${localeName}: ${result.keys.size} keys, dir=${result.dir} (parity OK)`);
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} locale(s) failed key parity.`);
    process.exit(1);
  }
  console.log(`\nAll ${files.length} locales pass key parity against en.json.`);
}

// Keep main() side-effect free on import (the dictionary-loader unit tests
// import the baseline constants from this module).
if (require.main === module) {
  main();
}
