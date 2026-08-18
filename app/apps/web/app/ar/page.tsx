import type { Metadata } from 'next';

import { createMetadata } from '../../lib/seo/metadata';
import { SITE } from '../../lib/seo/site';
import { HomeView } from '../home-view';

/**
 * `/ar` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ar' })`, breadcrumb `Home` → `/ar`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'JoinOrigin — Social Collaboration Network & Community OS',
  description: SITE.description,
  path: '/ar',
  keywords: [
    'social collaboration network',
    'community OS',
    'community operating system',
    'collaboration platform',
    'community collaboration',
  ],
});

export default function ArHomePage() {
  return (
    <>
      <HomeView />
    </>
  );
}
