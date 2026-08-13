import type { Dictionary, FaqNamespace } from '@joinorigin/i18n';

import type { FaqEntry } from './seo/jsonLd';

/**
 * FAQ data contract (arch-i18n §7.4).
 *
 * FAQ content lives in the locale dictionaries as
 * `{surface}.faq.q{N}.{question,answer}` (indexed keys — translators never
 * reorder data). These helpers convert a namespace into the `FaqEntry[]`
 * shape consumed by both the visible FAQ blocks and the FAQPage JSON-LD
 * mirror, preserving the 1:1 visible ↔ structured-data contract.
 */

/** Read a surface's FAQ namespace out of a raw dictionary. */
export function faqNamespace(
  dictionary: Dictionary | null | undefined,
  surface: string,
): FaqNamespace | undefined {
  if (!dictionary) {
    return undefined;
  }
  const surfaceBlock = (dictionary as Record<string, unknown>)[surface];
  return (surfaceBlock as { faq?: FaqNamespace } | undefined)?.faq;
}

export function faqEntries(namespace: FaqNamespace | undefined | null): FaqEntry[] {
  if (!namespace) {
    return [];
  }
  return Object.keys(namespace)
    .map((key) => ({ key, entry: namespace[key] }))
    .sort((a, b) => {
      const aNum = Number(a.key.replace(/\D/g, ''));
      const bNum = Number(b.key.replace(/\D/g, ''));
      return Number.isFinite(aNum) && Number.isFinite(bNum)
        ? aNum - bNum
        : a.key.localeCompare(b.key);
    })
    .map(({ entry }) => ({ question: entry.question, answer: entry.answer }));
}
