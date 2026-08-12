import { headers } from 'next/headers';

import { getDictionary, resolveLocale, type Locale } from '@joinorigin/i18n';

/**
 * Server-side i18n helpers (arch-i18n §6.3, §7.4).
 *
 * The root layout and page wrappers read the locale forwarded by the
 * middleware (`x-joinorigin-locale`) so server-rendered HTML — `<html
 * lang dir>` and the FAQPage JSON-LD mirror — uses the same resolved locale
 * as the client provider. SEO metadata internals stay hardcoded English per
 * the arch scope boundary (§1.2).
 */

/** Resolve the active locale for the current request (server). */
export async function getServerLocale(): Promise<Locale> {
  const headerStore = await headers();
  return resolveLocale(headerStore.get('x-joinorigin-locale') ?? undefined);
}

/** Fetch the active dictionary for the current request (server). */
export async function getServerDictionary() {
  const locale = await getServerLocale();
  return { locale, dictionary: getDictionary(locale) };
}
