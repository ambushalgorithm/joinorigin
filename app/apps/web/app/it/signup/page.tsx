import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { SignupView } from '../../signup/signup-view';

/**
 * `/it/signup` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/signup/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/it/signup' })`, breadcrumb `Home` → `/it`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/it/signup` and `alternates.languages` `it` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Sign Up — Create Your Account | JoinOrigin',
  description:
    'Create your account on Origin, the social collaboration network. Enter your name and email to get discovered — then start or join a community today.',
  path: '/it/signup',
  locale: 'it',
  keywords: [
    'sign up',
    'create account',
    'join Origin',
    'social collaboration network',
    'community OS',
    'get discovered',
  ],
});

export default function ItSignupPage() {
  return (
    <>
      <SignupView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/it' },
          { name: 'Signup', path: '/it/signup' },
        ])}
      />
    </>
  );
}
