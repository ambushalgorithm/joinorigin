import { STATIC_DICTIONARIES } from './registry';
import type { Locale } from './resolve';
import type { Dictionary } from './types';

/**
 * Dictionary loading (arch-i18n §3.3).
 *
 * - `getDictionary(locale)` — synchronous static lookup (server RSC +
 *   mobile; Metro bundles all JSON). Strips the reserved top-level `dir`
 *   metadata key so i18next never treats it as a translatable string.
 * - `loadDictionary(locale)` — async dynamic `import()` for the web client
 *   so only the active locale (+ EN) is shipped; falls back to the static
 *   registry when dynamic import is unavailable (e.g. Metro edge cases).
 * - `getT(locale)` — synchronous `t(key, vars)` function bound to the
 *   static dictionary (server-side use, e.g. JSON-LD mirroring).
 */

/** Removes the reserved `dir` metadata key from a raw locale JSON object. */
function stripDir(raw: Record<string, unknown>): Dictionary {
  const { dir: _dir, ...dictionary } = raw;
  return dictionary;
}

export function getDictionary(locale: Locale): Dictionary {
  const raw = STATIC_DICTIONARIES[locale];
  return stripDir(raw as unknown as Record<string, unknown>);
}

const LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  ar: () => import('../locales/ar.json'),
  de: () => import('../locales/de.json'),
  en: () => import('../locales/en.json'),
  es: () => import('../locales/es.json'),
  fa: () => import('../locales/fa.json'),
  fr: () => import('../locales/fr.json'),
  hi: () => import('../locales/hi.json'),
  id: () => import('../locales/id.json'),
  it: () => import('../locales/it.json'),
  ja: () => import('../locales/ja.json'),
  ko: () => import('../locales/ko.json'),
  nl: () => import('../locales/nl.json'),
  pl: () => import('../locales/pl.json'),
  'pt-BR': () => import('../locales/pt-BR.json'),
  ru: () => import('../locales/ru.json'),
  th: () => import('../locales/th.json'),
  tr: () => import('../locales/tr.json'),
  uk: () => import('../locales/uk.json'),
  vi: () => import('../locales/vi.json'),
  'zh-CN': () => import('../locales/zh-CN.json'),
  'zh-TW': () => import('../locales/zh-TW.json'),
};

/** Async dictionary load — web client lazy per-locale loading. */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const loader = LOADERS[locale];
  if (loader) {
    try {
      const mod = await loader();
      return stripDir(mod.default as Record<string, unknown>);
    } catch {
      // Fall through to the static registry (Metro/bundler edge cases).
    }
  }
  return getDictionary(locale);
}

/**
 * Synchronous `t` function bound to a static dictionary. Used server-side
 * (web RSC) where the dictionary is already loaded via `getDictionary`.
 */
export function getT(dictionary: Dictionary) {
  return function t(key: string, vars?: Record<string, string | number>): string {
    const value = lookup(dictionary, key);
    if (typeof value !== 'string') {
      return key;
    }
    if (!vars) {
      return value;
    }
    return value.replace(/\{\{\s*([\w]+)\s*\}\}/g, (match, name: string) => {
      const replacement = vars[name];
      return replacement === undefined ? match : String(replacement);
    });
  };
}

/** Dot-path lookup into a nested dictionary (`home.hero.headline`). */
export function lookup(dictionary: Dictionary, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dictionary);
}

export default loadDictionary;
