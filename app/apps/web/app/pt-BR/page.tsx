import type { Metadata } from 'next';

import { createMetadata } from '../../lib/seo/metadata';
import { SITE } from '../../lib/seo/site';
import { HomeView } from '../home-view';

/**
 * `/pt-BR` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/pt-BR' })`, breadcrumb `Home` → `/pt-BR`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * stay on the EN copy (no translated static-page content exists), while
 * canonical + hreflang stay per-locale — canonical
 * `/pt-BR` and `alternates.languages` `pt-BR` +
 * `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'JoinOrigin — Social Collaboration Network & Community OS',
  description: SITE.description,
  path: '/pt-BR',
  locale: 'pt-BR',
  keywords: [
    'social collaboration network',
    'community OS',
    'community operating system',
    'collaboration platform',
    'community collaboration',
  ],
});

export default function PtBRHomePage() {
  return (
    <>
      <HomeView />
    </>
  );
}
