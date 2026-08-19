/**
 * Locale resolution — auto-detect + cookie + Accept-Language + fallback
 * (arch-i18n §6).
 *
 * `SUPPORTED_LOCALES` mirrors the arch locale matrix (21 locales: EN base +
 * 20 translations). `resolveLocale` implements the precedence algorithm for a
 * single tag: exact match → region-variant fallback (`pt` → `pt-BR`,
 * `zh` → `zh-CN`) → language-only match (`fr-CA` → `fr`) → `DEFAULT_LOCALE`
 * (`en`).
 *
 * `resolveAcceptLanguage` implements RFC 9110 §12.5.4 for the
 * `Accept-Language` request header: it parses q-values (default `1` when
 * omitted), drops `q=0` exclusions and `*` wildcards, orders remaining ranges
 * by descending quality (stable — ties keep header order), and resolves the
 * first range that matches a supported locale (with the same region-variant /
 * language-only fallback as `resolveLocale`). Unmatchable ranges are skipped
 * so a high-q garbage range never shadows a lower-q supported one; when
 * nothing matches, the header falls back to `DEFAULT_LOCALE` (`en`).
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
 * Match a single BCP-47 tag to a supported locale, or `null` when the tag
 * cannot be mapped to any supported locale. Shared by `resolveLocale`
 * (fallback = `DEFAULT_LOCALE`) and `resolveAcceptLanguage` (skip + continue
 * to the next range), so an explicit `en` range never collapses into
 * "unmatchable" while a garbage tag like `xx-YY` genuinely does.
 */
function matchLocale(input: string): Locale | null {
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
  return null;
}

/**
 * Resolve an arbitrary input to a supported locale (arch-i18n §6.2).
 * Empty/unknown input falls back to `DEFAULT_LOCALE` (`en`).
 */
export function resolveLocale(input: string | undefined | null): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }
  return matchLocale(input) ?? DEFAULT_LOCALE;
}

interface LanguageRange {
  tag: string;
  q: number;
}

/** Extract a parsed language-range list from an `Accept-Language` value. */
function parseAcceptLanguage(input: string): LanguageRange[] {
  const ranges: LanguageRange[] = [];
  for (const part of input.split(',')) {
    const [tagPart, ...params] = part.split(';');
    const tag = (tagPart ?? '').trim();
    // `*` is not a concrete language range — it never matches a supported
    // locale, so it can be skipped without affecting resolution.
    if (!tag || tag === '*') {
      continue;
    }
    let q = 1;
    for (const param of params) {
      const match = /^\s*q\s*=\s*([0-9.]+)\s*$/i.exec(param);
      if (match) {
        q = Math.min(1, Math.max(0, Number(match[1])));
      }
    }
    // q=0 explicitly de-prioritizes the range ("not acceptable").
    if (q > 0) {
      ranges.push({ tag, q });
    }
  }
  // Descending quality; `Array.prototype.sort` is stable, so equal-q ranges
  // keep their header order (higher specificity/earlier position wins).
  ranges.sort((a, b) => b.q - a.q);
  return ranges;
}

/**
 * Resolve an `Accept-Language` header (e.g. `fr-CH, fr;q=0.9, en;q=0.8`) to
 * a supported locale (arch-i18n §6.2, RFC 9110 §12.5.4). q-values are
 * honored, `q=0` exclusions and `*` wildcards are dropped, and region-variant
 * / language-only fallbacks apply per range. Unmatchable ranges are skipped
 * in favor of the next-highest-q range; nothing matching falls back to
 * `DEFAULT_LOCALE` (`en`). Empty/absent headers also fall back to `en`.
 */
export function resolveAcceptLanguage(input: string | undefined | null): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }
  for (const { tag } of parseAcceptLanguage(input)) {
    const resolved = matchLocale(tag);
    if (resolved) {
      return resolved;
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
