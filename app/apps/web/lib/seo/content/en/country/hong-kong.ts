import type { CountryContent } from '../../types';

/**
 * Hong Kong country page content (EN source of truth).
 *
 * Honest, evergreen prose about Hong Kong's community scene — the dense
 * urban geography, the bilingual professional networks, and the mix of
 * grassroots, creative, and business communities on the island and in
 * the New Territories.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'hong-kong',
  title: 'Communities in Hong Kong | JoinOrigin',
  description:
    'Find or start communities in Hong Kong — startup meetups, creative collectives, and neighbourhood groups across the island, Kowloon, and the New Territories. JoinOrigin helps you get discovered.',
  intro:
    'Hong Kong is one of the most compact and intensely urban places on earth, and its community scene reflects that density. The territory packs more than seven million people into a small area made up of Hong Kong Island, Kowloon, and the New Territories, connected by an efficient mass-transit system that makes cross-district gatherings practical and routine. The financial and legal industries anchor a professional culture where networking, alumni associations, and industry bodies meet regularly in Central and Wan Chai, while the creative and startup scenes thrive in coworking spaces across Sheung Wan, Wong Chuk Hang, and Kwun Tong. Cantonese is the everyday language and English is widely used in business, which makes Hong Kong unusually accessible for international newcomers. Grassroots community life is just as strong: temple festivals, neighbourhood associations, hiking groups that head to the trails on weekends, and volunteer networks all run continuously. For anyone looking to build a career or a community, Hong Kong rewards directness — most groups welcome a polite introduction and a first appearance at a regular event.',
  dataPoints: [
    'Population of roughly 7.4 million.',
    'Cantonese is the primary language, with English widely spoken in business.',
    'A Special Administrative Region of China with its own legal system.',
    'Community life spans Hong Kong Island, Kowloon, and the New Territories.',
  ],
  faq: [
    {
      question: 'How do I find communities in Hong Kong?',
      answer:
        'Start at the /location hub and choose the city page, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Professional networks also run regular events on the island and in Kowloon.',
    },
    {
      question: 'Do I need to speak Cantonese to join a community?',
      answer:
        'No. Many professional, startup, and international groups run in English, and even Cantonese-led groups usually welcome non-speakers at social events. Introducing yourself in person and showing up regularly goes a long way.',
    },
    {
      question: 'Does JoinOrigin operate in Hong Kong?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Hong Kong, and the Hong Kong pages are translated into Traditional Chinese to serve the local audience.',
    },
  ],
};

export default content;
