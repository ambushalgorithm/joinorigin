import type { FaqEntry } from '../../lib/seo/jsonLd';

/**
 * Features page FAQ (discovery §5.2) — shared by the visible FAQ block and
 * the server-rendered FAQPage JSON-LD (mirrored 1:1, discovery §8.3).
 * Plain data module: safe to import from both server (JSON-LD) and client
 * (visible block).
 */
export const FEATURES_FAQ: FaqEntry[] = [
  {
    question: 'How is JoinOrigin different from Discord?',
    answer:
      'Discord is a chat app. Origin is a social collaboration network — profiles, ideas, communities, chat, feed, projects, and companies all live on one social graph.',
  },
  {
    question: 'Is JoinOrigin open source?',
    answer:
      'The code is open under AGPL-3.0, and communication runs on the open Matrix protocol. Origin itself is a hosted product run by JoinOrigin — there is nothing to self-host — and your data stays portable.',
  },
  {
    question: 'What is the social graph?',
    answer:
      'The social graph is the web of relationships between members. Origin is organized around it, so every profile, community, and project connects through people.',
  },
  {
    question: 'When will projects and companies launch?',
    answer:
      'They develop naturally. As people post ideas, visions, and work, they find the people who want to build with them — and projects and companies grow out of those connections instead of waiting for a launch date.',
  },
];
