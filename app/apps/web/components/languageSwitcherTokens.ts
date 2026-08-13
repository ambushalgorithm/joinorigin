import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

/**
 * Language switcher static data (design spec sprint-9-i18n-switcher §3).
 *
 * - `LANGUAGE_LABELS`: native autonyms + muted EN hints — DATA, not locale
 *   copy (the switcher chrome is spec-owned, not translated).
 * - `LANGUAGE_ORDER`: fixed dropdown order (spec §3.1) — stable across
 *   locales, not alphabetical per active locale.
 * - `SWITCHER_TITLE` / `SWITCHER_TRIGGER_LABEL`: static chrome strings
 *   defined by the switcher spec (§8.1/§8.4 examples). The arch inventory
 *   carries no `switcher.*` keys, so the switcher chrome uses these static
 *   values and never a locale-specific string except the trigger autonym.
 */

export interface LanguageLabel {
  native: string;
  hint?: string;
}

export const LANGUAGE_LABELS: Record<Locale, LanguageLabel> = {
  en: { native: 'English' },
  es: { native: 'Español', hint: 'Spanish' },
  'pt-BR': { native: 'Português (Brasil)', hint: 'Portuguese (Brazil)' },
  fr: { native: 'Français', hint: 'French' },
  de: { native: 'Deutsch', hint: 'German' },
  ru: { native: 'Русский', hint: 'Russian' },
  ja: { native: '日本語', hint: 'Japanese' },
  ko: { native: '한국어', hint: 'Korean' },
  'zh-CN': { native: '简体中文', hint: 'Simplified Chinese' },
  'zh-TW': { native: '繁體中文', hint: 'Traditional Chinese' },
  ar: { native: 'العربية', hint: 'Arabic' },
  hi: { native: 'हिन्दी', hint: 'Hindi' },
  id: { native: 'Bahasa Indonesia', hint: 'Indonesian' },
  tr: { native: 'Türkçe', hint: 'Turkish' },
  it: { native: 'Italiano', hint: 'Italian' },
  pl: { native: 'Polski', hint: 'Polish' },
  nl: { native: 'Nederlands', hint: 'Dutch' },
  vi: { native: 'Tiếng Việt', hint: 'Vietnamese' },
  th: { native: 'ไทย', hint: 'Thai' },
  uk: { native: 'Українська', hint: 'Ukrainian' },
  fa: { native: 'فارسی', hint: 'Persian' },
};

export const LANGUAGE_ORDER: readonly Locale[] = [...SUPPORTED_LOCALES];

/** Sheet/listbox title (spec §5, §8.2) — static chrome copy. */
export const SWITCHER_TITLE = 'Language';

/** Trigger aria-label (spec §8.1) — static chrome copy. */
export const SWITCHER_TRIGGER_LABEL = 'Change language';

/** Listbox aria-label (spec §8.2) — static chrome copy. */
export const SWITCHER_LIST_LABEL = 'Select language';
