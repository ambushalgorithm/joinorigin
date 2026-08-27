import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { SignupView } from './signup-view';

/**
 * Signup page (Sprint 24 Story C) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD.
 *
 * SSR contract (TASK-555): the initial HTML renders the clean, indexable
 * signup/login screen — heading from `signup.heading` ("Create your
 * account"), the semantic name + email form posting to `POST /api/leads`
 * (submit "Get Started") — and contains NO waitlist or in-development
 * language. After hydration `SignupView` swaps the heading/subcopy to the
 * `signup.waitlist.*` variants and reveals the in-development disclosure
 * (the only development-status surface on the site).
 */
export const metadata: Metadata = createMetadata({
  title: 'Sign Up — Create Your Account | JoinOrigin',
  description:
    'Create your account on Origin. Enter your name and email to get discovered — then start an Origin around your idea and find the people and resources to move it forward.',
  path: '/signup',
  keywords: [
    'sign up',
    'create account',
    'join Origin',
    'social collaboration network',
    'community OS',
    'get discovered',
  ],
});

export default function SignupPage() {
  return (
    <>
      <SignupView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Signup', path: '/signup' },
        ])}
      />
    </>
  );
}
