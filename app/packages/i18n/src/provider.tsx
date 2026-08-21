'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import i18next, { type i18n, type TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { loadDictionary } from './loader';
import { DEFAULT_LOCALE, getDir, resolveLocale, type Direction, type Locale } from './resolve';
import type { Dictionary } from './types';

/**
 * I18n provider + hooks — the single client-side i18n surface consumed by
 * web and mobile (arch-i18n §3.2). Application code never imports i18next
 * directly; it uses `useI18n()` / `useDir()` / `Trans`.
 *
 * - Initial locale + dictionary come from the server (web) or OS resolution
 *   (mobile) as props, so the first paint is already translated (no flash).
 * - The active locale derives from the URL prefix on web: the layout mounts
 *   a thin wrapper (`LocalePathnameSync`) that reads `usePathname()` and
 *   supplies the pathname-derived locale as the `locale` prop — so the
 *   provider follows the URL on every navigation (TASK-488). When a new
 *   URL-derived locale arrives whose dictionary is not registered yet, the
 *   provider loads it lazily (`loadDictionary` dynamic import on web; static
 *   registry on mobile) so the new route renders in the target language on
 *   arrival (no post-flash, no setLocale-then-push).
 * - `setLocale` remains for programmatic switches (mobile / tests).
 * - The provider trusts the server `locale` prop (URL-derived on web) — NO
 *   cookie persistence and NO post-hydration override (TASK-468: the
 *   language always lives in the URL).
 * - The provider keeps `document.documentElement.lang/dir` in sync (web RTL
 *   flip, arch-i18n §8.2).
 */

export interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  /** Raw dictionary (minus `dir`) for structured data reads (e.g. FAQ). */
  dictionary: Dictionary | null;
  t: TFunction;
  setLocale: (locale: Locale) => Promise<void>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

let instance: i18n | null = null;
const registered = new Map<Locale, Dictionary>();

function getInstance(): i18n {
  if (!instance) {
    instance = i18next.createInstance();
    instance.use(initReactI18next).init({
      lng: DEFAULT_LOCALE,
      fallbackLng: DEFAULT_LOCALE,
      resources: {},
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
  return instance;
}

/** Register a dictionary so it is available to `t`/`getFixedT` immediately. */
export function setDictionary(locale: Locale, dictionary: Dictionary): void {
  registered.set(locale, dictionary);
  getInstance().addResourceBundle(locale, 'translation', dictionary, true, true);
}

/** Read a previously registered dictionary (structured data access). */
export function getRegisteredDictionary(locale: Locale): Dictionary | null {
  return registered.get(locale) ?? null;
}

/** Test-only reset so suites can re-initialize the singleton cleanly. */
export function _resetI18nForTests(): void {
  instance = null;
  registered.clear();
}

export interface I18nProviderProps {
  /**
   * Active locale. On web this is the URL-derived locale supplied by the
   * layout wrapper (`LocalePathnameSync` reads `usePathname()` and falls back
   * to the proxy-forwarded `x-joinorigin-locale` header for unprefixed
   * paths); on mobile it is the OS-resolved locale. The provider follows
   * changes to this prop (loading the dictionary as needed) so navigation to
   * a new `/<locale>/` prefix switches the UI on arrival.
   */
  locale: Locale;
  /** Server-provided dictionary for the initial locale — avoids flash. */
  dictionary?: Dictionary;
  /** Called after the active locale changes (setLocale or a URL-derived prop
   *  change), e.g. to observe switches in tests. */
  onLocaleChange?: (locale: Locale) => void;
  children: ReactNode;
}

function applyDocumentDirection(locale: Locale): void {
  if (typeof globalThis === 'undefined') {
    return;
  }
  const doc = (
    globalThis as {
      document?: {
        documentElement?: { lang: string; dir: string; dataset: Record<string, string> };
      };
    }
  ).document;
  const html = doc?.documentElement;
  if (!html) {
    return;
  }
  html.lang = locale;
  html.dir = getDir(locale);
  html.dataset.dir = getDir(locale);
}

export function I18nProvider({
  locale: initialLocale,
  dictionary: initialDictionary,
  onLocaleChange,
  children,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dir, setDirState] = useState<Direction>(() => getDir(initialLocale));
  const [dictionary, setDictionaryState] = useState<Dictionary | null>(() => {
    if (initialDictionary) {
      setDictionary(initialLocale, initialDictionary);
      return initialDictionary;
    }
    return getRegisteredDictionary(initialLocale);
  });

  const t = useMemo(() => getInstance().getFixedT(locale), [locale]);

  const setLocale = useCallback(
    async (next: Locale) => {
      const resolved = resolveLocale(next);
      if (resolved === locale && registered.has(resolved)) {
        return; // Re-selecting the current locale is a no-op (spec §6.3).
      }
      let nextDictionary = registered.get(resolved);
      if (!nextDictionary) {
        nextDictionary = await loadDictionary(resolved);
        setDictionary(resolved, nextDictionary);
      }
      getInstance().changeLanguage(resolved);
      setLocaleState(resolved);
      setDirState(getDir(resolved));
      setDictionaryState(nextDictionary);
      applyDocumentDirection(resolved);
      onLocaleChange?.(resolved);
    },
    [locale, onLocaleChange],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dir, dictionary, t, setLocale }),
    [locale, dir, dictionary, t, setLocale],
  );

  // Keep the document direction in sync on mount (web RTL flip).
  useEffect(() => {
    applyDocumentDirection(locale);
  }, [locale]);

  // Ensure EN fallback resources are always available on the client.
  useEffect(() => {
    if (registered.has(DEFAULT_LOCALE)) {
      return;
    }
    loadDictionary(DEFAULT_LOCALE)
      .then((enDictionary) => {
        if (!registered.has(DEFAULT_LOCALE)) {
          setDictionary(DEFAULT_LOCALE, enDictionary);
        }
      })
      .catch(() => {
        // EN fallback is best-effort; missing keys fall back to the key path.
      });
  }, []);

  // Follow the `locale` PROP (URL-derived on web, TASK-488): the layout's
  // wrapper reads `usePathname()` and supplies the pathname-derived locale
  // as this prop, so on navigation to a new `/<locale>/` prefix the provider
  // switches to the target language on arrival — no setLocale-then-push, no
  // post-flash. Only reacts when the `locale` PROP actually changes — not
  // when the user switches locale via `setLocale` (the prop stays the same
  // then, so the internal state must NOT be reverted). A first-visited
  // locale whose dictionary is not registered yet is loaded lazily, exactly
  // like `setLocale` does.
  const prevLocalePropRef = useRef<Locale | null>(null);
  useEffect(() => {
    if (prevLocalePropRef.current === initialLocale) {
      return;
    }
    const isFirstApplication = prevLocalePropRef.current === null;
    prevLocalePropRef.current = initialLocale;

    if (initialDictionary && !registered.has(initialLocale)) {
      setDictionary(initialLocale, initialDictionary);
    }

    const apply = (nextDictionary: Dictionary | null) => {
      getInstance().changeLanguage(initialLocale);
      setLocaleState(initialLocale);
      setDirState(getDir(initialLocale));
      setDictionaryState(nextDictionary);
      applyDocumentDirection(initialLocale);
      // The initial mount applies the seeded locale; only actual changes
      // (prop switch or setLocale) are reported through onLocaleChange.
      if (!isFirstApplication) {
        onLocaleChange?.(initialLocale);
      }
    };

    const existing = registered.get(initialLocale) ?? initialDictionary ?? null;
    if (existing) {
      apply(existing);
      return;
    }

    // URL-derived locale whose dictionary was never loaded on this client.
    // Load it asynchronously so the new route renders in the target language
    // on arrival (the provider keeps the previous dictionary meanwhile, so
    // there is no flash of untranslated/EN keys).
    let cancelled = false;
    loadDictionary(initialLocale)
      .then((nextDictionary) => {
        if (cancelled) {
          return;
        }
        setDictionary(initialLocale, nextDictionary);
        apply(nextDictionary);
      })
      .catch(() => {
        // Best-effort; the EN fallback keys render on a load failure.
      });
    return () => {
      cancelled = true;
    };
  }, [initialLocale, initialDictionary, onLocaleChange]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return value;
}

/** Returns the active locale direction (`ltr` | `rtl`). */
export function useDir(): Direction {
  return useI18n().dir;
}

export default I18nProvider;
