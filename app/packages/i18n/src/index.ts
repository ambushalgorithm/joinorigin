/**
 * @joinorigin/i18n — shared i18n engine for web + mobile (arch-i18n §3.2).
 *
 * Application code imports ONLY from this public surface — never i18next or
 * react-i18next directly.
 */

export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  normalizeLocale,
  resolveLocale,
  resolveAcceptLanguage,
  getDir,
  type Locale,
  type Direction,
} from './resolve';

export { loadDictionary, getDictionary, getT, lookup } from './loader';
export type { Dictionary, FaqEntryShape, FaqNamespace } from './types';

export {
  I18nProvider,
  useI18n,
  useDir,
  setDictionary,
  getRegisteredDictionary,
  _resetI18nForTests,
  type I18nProviderProps,
  type I18nContextValue,
} from './provider';

export { Trans, type TransProps } from './trans';
