'use client';

import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { useI18n } from './provider';

/**
 * Rich-text translation helper (arch-i18n §4.1).
 *
 * Locale values may contain numbered tags (`<1>docs</1>`, `<2>contact
 * page</2>`) for inline markup, and `{{var}}` interpolation. `Trans` resolves
 * the key through the active locale, interpolates variables, then maps each
 * `<N>` tag positionally to the matching element in `components`.
 *
 * Example:
 *   key: "Read the <1>docs</1> for the core objects."
 *   <Trans i18nKey="about.readingDocs" components={[<AccentLink key="l" href="/docs" />]} />
 */

export interface TransProps {
  i18nKey: string;
  /** Interpolation variables (`{{name}}`, `{{email}}`, …). */
  values?: Record<string, string | number>;
  /** Elements rendered in place of `<1>…</1>`, `<2>…</2>` tags. */
  components?: ReactElement[];
}

const TAG_REGEX = /<(\d+)>([\s\S]*?)<\/\1>/g;

function renderRichText(text: string, components?: ReactElement[]): ReactNode[] {
  if (!components || components.length === 0) {
    return [text];
  }
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TAG_REGEX.lastIndex = 0;
  while ((match = TAG_REGEX.exec(text)) !== null) {
    const tagIndex = Number(match[1]);
    const inner = match[2];
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const component = components[tagIndex - 1];
    if (component && isValidElement(component)) {
      nodes.push(cloneElement(component, { key: key }, inner));
    } else {
      nodes.push(<Fragment key={key}>{inner}</Fragment>);
    }
    key += 1;
    lastIndex = TAG_REGEX.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function Trans({ i18nKey, values, components }: TransProps) {
  const { t } = useI18n();
  const raw = t(i18nKey, values ?? {}) as string;
  return <>{renderRichText(raw, components)}</>;
}

export default Trans;
