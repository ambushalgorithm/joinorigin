import type { CountryContent } from '../../types';

/**
 * Germany country page content (EN source of truth).
 *
 * Evergreen, honest prose about the German community scene — Vereine,
 * Stammtische, university cities, and the startup/metro hubs.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'germany',
  intro:
    'Germany combines a deep tradition of organized community life with a fast-growing modern scene of meetups and startup communities. The Verein — a registered club with regular meetings, membership, and often a shared hobby or civic purpose — remains central to German social life, from sports clubs and music associations to volunteer fire brigades. In parallel, cities like Berlin, Munich, Hamburg, and Cologne host vibrant professional communities: tech meetups, design collectives, climate initiatives, and co-founder matching events fill coworking spaces and university auditoriums every week. The Stammtisch, a regular informal table at a local bar or café, is a social technology Germans have practiced for centuries and now powers networking groups across industries. German universities are free and numerous, which means student communities, research groups, and alumni networks are dense in most mid-sized cities too. Whether you are new to the country or a lifelong resident, finding a group — or starting your own with a simple first meetup — is a well-worn path.',
  dataPoints: [
    'Population of roughly 83 million across 16 states.',
    'German is the primary language.',
    'Federal capital is Berlin.',
    'Strong club (Verein) and volunteer (Ehrenamt) culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Germany?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local Vereine and event platforms are also good starting points for offline groups.',
    },
    {
      question: 'What is a Stammtisch and how do I join one?',
      answer:
        'A Stammtisch is a regular informal gathering at a fixed table in a bar or café. Many professional and hobby communities run one; asking at the venue or checking community pages for the city is usually enough to join.',
    },
    {
      question: 'Does JoinOrigin operate in Germany?',
      answer:
        'Yes. JoinOrigin has no local offices. The Berlin pages are translated into German, and the product helps people find or start communities anywhere in Germany.',
    },
  ],
};

export default content;
