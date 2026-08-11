import type { FaqEntry } from '../lib/seo/jsonLd';

/**
 * Home page FAQ (discovery §5.1, §8.3) — shared by the visible FAQ block
 * (client view) and the server-rendered FAQPage JSON-LD (server wrapper), so
 * the Q&A are mirrored 1:1 (discovery §8.3). Plain data module: safe to
 * import from both server and client bundles.
 *
 * Answer style (discovery §8.3): first sentence is a direct answer; total
 * ≤ 60 words each.
 */
export const HOME_FAQ: FaqEntry[] = [
  {
    question: 'What is JoinOrigin?',
    answer:
      'JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.',
  },
  {
    question: 'How is JoinOrigin different from Discord/LinkedIn/Reddit?',
    answer:
      'Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. JoinOrigin combines them around the social graph — profiles, communities, chat, feed, projects, and opportunities all live together, so relationships turn into real collaboration.',
  },
  {
    question: 'Is JoinOrigin free?',
    answer:
      'Yes, JoinOrigin is free during early access. Joining the waitlist costs nothing, and early members keep free access when the community OS launches. Future plan details are announced with the beta.',
  },
  {
    question: 'When does early access start?',
    answer:
      'Early access opens in waves as the platform builds toward launch. Joining the waitlist now reserves your spot, and you will be invited as soon as your community is ready.',
  },
  {
    question: 'How do I join?',
    answer:
      'Click Get Started anywhere on this page, enter your name and email, and you are on the waitlist. You will receive an invite when early access reaches your spot.',
  },
];
