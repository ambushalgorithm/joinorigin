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
 * Resolve an arbitrary input to a supported locale (arch-i18n §6.2).
 * Empty/unknown input falls back to `DEFAULT_LOCALE` (`en`).
 */
export function resolveLocale(input: string | undefined | null): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }
  const normalized = normalizeLocale(input);
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
