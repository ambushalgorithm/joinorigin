import type { FaqEntry } from '../../lib/menuPages/jsonLd';

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
      'Discord is a chat app. JoinOrigin is a social collaboration network — profiles, communities, chat, feed, projects, and companies all live on one social graph.',
  },
  {
    question: 'Is JoinOrigin open source?',
    answer:
      'The architecture is open. Communication runs on the open Matrix protocol, and the platform is designed to be self-hostable.',
  },
  {
    question: 'What is the social graph?',
    answer:
      'The social graph is the web of relationships between members. JoinOrigin is organized around it, so every profile, community, and project connects through people.',
  },
  {
    question: 'When will projects and companies launch?',
    answer:
      'Projects arrive in Phase 2 (Collaboration) and companies in Phase 3 (Organization) of the roadmap. Early access members get the full roadmap as it ships.',
  },
];
