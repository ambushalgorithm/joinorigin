/**
 * Lightweight guide/glossary path constants + builders — Story F shared
 * mechanism (TASK-537 / fe-nav-perf-fix, F1).
 *
 * Root cause (docs/design/sprint-22-nav-perf-baseline.md RC1): client views
 * (`app/guides/guides-hub-view.tsx`, `app/glossary/glossary-hub-view.tsx`,
 * `app/guides/[slug]/guide-view.tsx`) import `GUIDES_HUB_PATH` /
 * `GLOSSARY_HUB_PATH` from `lib/seo/guides.ts`, which imports 8 helpers from
 * `lib/seo/locationData.ts`, which imports `./data/locations.json` — an
 * 11.9 MB world geo snapshot. The whole graph lands in the client bundle as a
 * 14.7 MB chunk referenced by every guides/glossary route manifest.
 *
 * This module is the CLIENT-SAFE boundary: it exports ONLY path constants and
 * pure path builders — zero `locationData` imports, so it can never drag
 * `locations.json` into a client bundle. Adopt it from client views instead
 * of `lib/seo/guides.ts` (server consumers keep using `guides.ts`, which
 * re-exports the same constants). Ownership/coordination: fe-guides-legal
 * owns the guide views; the PM coordination note tracks the switch.
 */

/** Guide hub path (L2a — design §4.1). Identical value to
 *  `lib/seo/guides.ts`'s `GUIDES_HUB_PATH`. */
export const GUIDES_HUB_PATH = '/guides';

/** Glossary hub path (L2b — design §4.1; term pages deferred in Sprint 12).
 *  Identical value to `lib/seo/guides.ts`'s `GLOSSARY_HUB_PATH`. */
export const GLOSSARY_HUB_PATH = '/glossary';

/** Hub path for a locale surface — '/en/guides' (EN canonical, TASK-466)
 *  or '/<locale>/guides'. The unprefixed '/guides' tree 307-redirects. */
export function guideHubPath(locale: string = 'en'): string {
  return locale === 'en' ? '/en/guides' : `/${locale}${GUIDES_HUB_PATH}`;
}

/** Guide detail path for a locale surface — '/guides/<slug>' or
 *  '/<locale>/guides/<slug>'. */
export function guidePath(slug: string, locale: string = 'en'): string {
  return `${guideHubPath(locale)}/${slug}`;
}

/** Glossary hub path for a locale surface — '/en/glossary' (EN canonical)
 *  or '/<locale>/glossary'. */
export function glossaryHubPath(locale: string = 'en'): string {
  return locale === 'en' ? '/en/glossary' : `/${locale}${GLOSSARY_HUB_PATH}`;
}
