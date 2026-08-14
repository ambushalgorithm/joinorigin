'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

/**
 * Secondary "Translate this page" link-out (TASK-318).
 *
 * Renders a small, unobtrusive text link to Google's website translator
 * proxy — `https://translate.google.com/translate?sl=en&tl=<locale>&u=<url>`.
 * It is deliberately NOT a competing control: no widget/script/SDK, just a
 * plain link-out placed secondarily to the language switcher (near the
 * breadcrumbs / hero meta).
 *
 * Rules:
 *  - EN canonical pages only. `/de/*` pages are already translated, so the
 *    link is never rendered there (defense-in-depth gate on the actual
 *    pathname — the location de surface additionally gates on the route
 *    locale in `LocationView`).
 *  - `sl=en` is fixed (the canonical page body is English).
 *  - `tl` is the active client locale from `useI18n()` when it differs from
 *    `en`; otherwise the default `en`.
 *  - `u` is the absolute current URL (`window.location.href`), captured after
 *    mount so server/SSR output never contains it (no hydration mismatch —
 *    the link simply appears after hydration).
 */

const TranslateLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export interface TranslatePageLinkProps {
  /** i18n label key — `seoContent.location.translatePage` / `seoContent.guides.translatePage`. */
  labelKey: string;
  /** Test id for unit + e2e assertions. */
  testID?: string;
}

export function TranslatePageLink({
  labelKey,
  testID = 'translate-page-link',
}: TranslatePageLinkProps) {
  const { t, locale } = useI18n();
  // `ready` guards SSR + the first client render (window unavailable) so the
  // server HTML never contains the environment-specific absolute URL and
  // hydration stays consistent.
  const [ready, setReady] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    // `/de/*` pages are already translated — no Google Translate link-out.
    if (window.location.pathname.startsWith('/de/')) {
      return;
    }
    setPageUrl(window.location.href);
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  const href = `https://translate.google.com/translate?sl=en&tl=${locale}&u=${encodeURIComponent(pageUrl)}`;

  return (
    <TranslateLink href={href} target="_blank" rel="noopener noreferrer" data-testid={testID}>
      {t(labelKey)}
    </TranslateLink>
  );
}

export default TranslatePageLink;
