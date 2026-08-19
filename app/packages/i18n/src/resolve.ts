/**
 * Locale resolution — auto-detect + cookie + fallback (arch-i18n §6).
 *
 * `SUPPORTED_LOCALES` mirrors the arch locale matrix (21 locales: EN base +
 * 20 translations). `resolveLocale` implements the precedence algorithm:
 * exact match → region-variant fallback (`pt` → `pt-BR`, `zh` → `zh-CN`) →
 * language-only match (`fr-CA` → `fr`) → `DEFAULT_LOCALE` (`en`).
 *
 * `getDir` returns the layout direction for a locale — `rtl` only for
 * `ar`/`fa` (carried in the locale JSON files as top-level `dir` metadata,
 * arch-i18n §8.1), `ltr` everywhere else.
 */

export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'hi',
  'id',
  'tr',
  'it',
  'pl',
  'nl',
  'vi',
  'th',
  'uk',
  'fa',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type Direction = 'ltr' | 'rtl';

/** Canonical casing for region-variant locales (BCP-47 tags from the arch). */
const CANONICAL_CASING: Record<string, Locale> = {
  'pt-br': 'pt-BR',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
};

/**
 * Normalize a raw BCP-47-ish input to the canonical locale tag:
 * lowercase, `_` → `-`, then restore canonical casing from the supported set.
 */
export function normalizeLocale(input: string): string {
  const lowered = input.trim().toLowerCase().replace(/_/g, '-');
  return CANONICAL_CASING[lowered] ?? lowered;
}

/** True when `input` is exactly one of the supported locale tags. */
export function isSupportedLocale(input: string): input is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(input);
}

/**
 * Match a raw BCP-47-ish tag to a supported locale WITHOUT the en fallback:
 * exact match → region-variant fallback (`pt` → `pt-BR`, `zh` → `zh-CN`) →
 * language-only match (`fr-CA` → `fr`). `null` when the tag matches nothing.
 * Used by `resolveLocale` (which adds the `DEFAULT_LOCALE` fallback) and by
 * `resolveAcceptLanguage` (which skips unmatched tags and continues to the
 * next Accept-Language candidate instead of bailing to en).
 */
function matchSupportedLocale(tag: string): Locale | null {
  const normalized = normalizeLocale(tag);
  if (isSupportedLocale(normalized)) {
    return normalized;
  }
  const base = normalized.split('-')[0];
  if (base === 'pt') {
    return 'pt-BR';
  }
  if (base === 'zh') {
    return 'zh-CN';
  }
  if (isSupportedLocale(base)) {
    return base;
  }
  return null;
}

/**
 * Resolve an arbitrary input to a supported locale (arch-i18n §6.2).
 * Empty/unknown input falls back to `DEFAULT_LOCALE` (`en`).
 */
export function resolveLocale(input: string | undefined | null): Locale {
  return matchSupportedLocale(input ?? '') ?? DEFAULT_LOCALE;
}

/** One parsed `Accept-Language` entry: a language tag + its q-value weight. */
export interface AcceptLanguageCandidate {
  tag: string;
  q: number;
}

/**
 * Parse an `Accept-Language` header (RFC 9110 §12.4.3) into weighted
 * candidates in header order. Segments look like `fr`, `de;q=0.9`,
 * `en-US;q=0.8;foo=bar`; missing/malformed q-values default to 1 / 0.
 * Empty segments and wildcard `*` entries are dropped.
 */
export function parseAcceptLanguage(acceptLanguage: string): AcceptLanguageCandidate[] {
  return acceptLanguage
    .split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => {
      const [rawTag, ...params] = segment.split(';');
      const qParam = params
        .map((param) => param.trim())
        .find((param) => param.toLowerCase().startsWith('q='));
      const q = qParam == null ? 1 : Number.parseFloat(qParam.slice(2).trim());
      return { tag: rawTag.trim(), q: Number.isNaN(q) ? 0 : q };
    })
    .filter((candidate) => candidate.tag.length > 0);
}

/**
 * Resolve the best supported locale from an `Accept-Language` header
 * (arch-i18n §6.2, TASK-455). Candidates are weighted by q-value (highest
 * wins; ties keep header order via the stable sort), q=0 entries are
 * unacceptable and skipped, and unmatched tags fall through to the next
 * candidate so `fr;q=0.5, de;q=0.9` picks de. Empty/unusable headers fall
 * back to `DEFAULT_LOCALE` (`en`).
 */
export function resolveAcceptLanguage(acceptLanguage: string | undefined | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }
  const candidates = parseAcceptLanguage(acceptLanguage)
    .filter((candidate) => candidate.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of candidates) {
    const match = matchSupportedLocale(tag);
    if (match) {
      return match;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Direction map — sourced from the locale JSON `dir` metadata (ar/fa are
 * `rtl`). A static map keeps `getDir` dependency-free and cheap; the loader
 * tests assert it stays in sync with the JSON files.
 */
const DIR_MAP: Record<Locale, Direction> = {
  en: 'ltr',
  es: 'ltr',
  'pt-BR': 'ltr',
  fr: 'ltr',
  de: 'ltr',
  ru: 'ltr',
  ja: 'ltr',
  ko: 'ltr',
  'zh-CN': 'ltr',
  'zh-TW': 'ltr',
  ar: 'rtl',
  hi: 'ltr',
  id: 'ltr',
  tr: 'ltr',
  it: 'ltr',
  pl: 'ltr',
  nl: 'ltr',
  vi: 'ltr',
  th: 'ltr',
  uk: 'ltr',
  fa: 'rtl',
};

/** Layout direction for a locale — defaults to `ltr` for robustness. */
export function getDir(locale: Locale | string): Direction {
  return DIR_MAP[locale as Locale] ?? 'ltr';
}
