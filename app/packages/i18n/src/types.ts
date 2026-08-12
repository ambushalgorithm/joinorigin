/**
 * Dictionary types for the i18n package.
 *
 * A dictionary is the parsed locale JSON minus the reserved top-level `dir`
 * metadata key (arch-i18n §4.1). Values are always strings; nested objects
 * form namespaces; full key = dotted path.
 */

export type Dictionary = Record<string, unknown>;

export interface FaqEntryShape {
  question: string;
  answer: string;
}

/** A locale FAQ namespace: `{ q1: { question, answer }, q2: … }`. */
export type FaqNamespace = Record<string, FaqEntryShape>;
