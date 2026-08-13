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
import { getStoredLocale, storeLocale } from './storage';
import type { Dictionary } from './types';

/**
 * I18n provider + hooks — the single client-side i18n surface consumed by
 * web and mobile (arch-i18n §3.2). Application code never imports i18next
 * directly; it uses `useI18n()` / `useDir()` / `Trans`.
 *
 * - Initial locale + dictionary come from the server (web) or OS resolution
 *   (mobile) as props, so the first paint is already translated (no flash).
 * - Locale switches load the new dictionary lazily (`loadDictionary` dynamic
 *   import on web; static registry on mobile) and persist the choice via the
 *   cookie adapter (web only; mobile has no switcher in Sprint 9).
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
  /** Active locale (server-resolved on web, OS-resolved on mobile). */
  locale: Locale;
  /** Server-provided dictionary for the initial locale — avoids flash. */
  dictionary?: Dictionary;
  /** Called after a manual locale change (e.g. document dir sync). */
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

function getNavigatorLanguage(): string | undefined {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }
  return (globalThis as { navigator?: { language?: string } }).navigator?.language;
}

/** True in a web DOM environment (document exists). */
function hasDocument(): boolean {
  return typeof globalThis !== 'undefined' && 'document' in globalThis;
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
      storeLocale(resolved);
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

  // Post-hydration client check (web only — mobile resolves the OS locale at
  // startup and passes it as the initial prop): cookie wins; else
  // navigator.language may differ from the server's Accept-Language
  // resolution (arch-i18n §6.3). Run once on mount; `locale` here is the
  // initial server-resolved value.
  useEffect(() => {
    if (!hasDocument()) {
      return; // React Native / server — the locale comes from props.
    }
    const stored = getStoredLocale();
    const candidate = stored ? resolveLocale(stored) : resolveLocale(getNavigatorLanguage());
    if (candidate !== locale) {
      void setLocale(candidate).catch(() => {
        // Best-effort client correction; EN fallback still applies.
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Follow server-driven locale changes on client navigation (new cookie →
  // new layout prop). Only reacts when the `locale` PROP actually changes —
  // not when the user switches locale via `setLocale` (the prop stays the
  // same then, so the internal state must NOT be reverted).
  const prevLocalePropRef = useRef(initialLocale);
  useEffect(() => {
    if (prevLocalePropRef.current === initialLocale) {
      return;
    }
    prevLocalePropRef.current = initialLocale;
    if (initialDictionary && !registered.has(initialLocale)) {
      setDictionary(initialLocale, initialDictionary);
    }
    getInstance().changeLanguage(initialLocale);
    setLocaleState(initialLocale);
    setDirState(getDir(initialLocale));
    setDictionaryState(registered.get(initialLocale) ?? initialDictionary ?? null);
    applyDocumentDirection(initialLocale);
  }, [initialLocale, initialDictionary]);

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
