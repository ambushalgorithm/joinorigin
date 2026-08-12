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
      'Anyone can start or join a community around any idea — a small business, an AI startup, helping the homeless, a 10k run, a political movement, a pee-wee league. If it matters to you, it has a place on Origin.',
  },
  {
    question: 'Can I start my own community?',
    answer:
      'Yes. Every member can create a community around any idea and invite the people they want to build with — whether it is a business, a book club, or a run club.',
  },
  {
    question: 'Is my data mine?',
    answer:
      'Yes. You own your identity and your data. Origin is a hosted product, so there is nothing to self-host — but your data is portable and your network graph persists on the open Matrix protocol.',
  },
  {
    question: 'How do I find my people?',
    answer:
      'Browse communities by interest, industry, or goal — from small businesses and book clubs to AI startups and run clubs — then join the ones that match what you want to build. Or start your own for any idea.',
  },
  {
    question: 'Can I join anonymously or by name?',
    answer:
      'You choose. You can participate with a named account or stay anonymous, and communities, chats, and idea pages can be open to everyone or gated by organizers. These options roll out over time.',
  },
];
