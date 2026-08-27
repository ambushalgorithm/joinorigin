import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { SignupView } from '../../signup/signup-view';

/**
 * `/ru/signup` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/signup/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ru/signup' })`, breadcrumb `Home` → `/ru`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ru/signup` and `alternates.languages` `ru` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Sign Up — Create Your Account | JoinOrigin',
  description:
    'Create your account on Origin. Enter your name and email to get discovered — then start an Origin around your idea and find the people and resources to move it forward.',
  path: '/ru/signup',
  locale: 'ru',
  keywords: [
    'sign up',
    'create account',
    'join Origin',
    'social collaboration network',
    'community OS',
    'get discovered',
  ],
});

export default function RuSignupPage() {
  return (
    <>
      <SignupView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ru' },
          { name: 'Signup', path: '/ru/signup' },
        ])}
      />
    </>
  );
}
