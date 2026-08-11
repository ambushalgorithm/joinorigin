import type { FaqEntry } from '../../lib/seo/jsonLd';

/**
 * Community page FAQ (discovery §5.3) — shared by the visible FAQ block and
 * the server-rendered FAQPage JSON-LD (mirrored 1:1, discovery §8.3).
 * Plain data module: safe to import from both server (JSON-LD) and client
 * (visible block).
 */
export const COMMUNITY_FAQ: FaqEntry[] = [
  {
    question: 'What communities can I join?',
    answer:
      'JoinOrigin has communities around AI, startups, trading, real estate, and local interests — and you can start your own for any shared goal.',
  },
  {
    question: 'Can I start my own community?',
    answer:
      'Yes. Every member can create a community around an interest, industry, or goal and invite the people they want to build with.',
  },
  {
    question: 'Is my data mine?',
    answer:
      'Yes. Ownership and sovereignty are core principles: your identity and data are portable, and the architecture is open and self-hostable.',
  },
  {
    question: 'Are communities free?',
    answer:
      'Joining communities is free during early access. Future community and organization plans are announced with the beta — no lock-in.',
  },
];
