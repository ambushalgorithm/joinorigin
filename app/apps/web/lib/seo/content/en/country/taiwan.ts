import type { CountryContent } from '../../types';

/**
 * Taiwan country page content (EN source of truth).
 *
 * Honest, evergreen prose about Taiwan's community scene — the dense
 * west-coast corridor, the semiconductor and startup economy, and the
 * vibrant civic, creative, and neighbourhood cultures.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'taiwan',
  title: 'Origins in Taiwan | JoinOrigin',
  description:
    'Find or start communities in Taiwan — from the startup and creative scenes in Taipei to maker, civic, and small business networks across the island. JoinOrigin helps you get discovered.',
  intro:
    "Taiwan's community life is concentrated on the island's west coast, where Taipei, Taichung, and Kaohsiung form a dense corridor of about 23 million people. Taipei, the capital, carries the largest share of professional and creative energy: the startup ecosystem around the technology parks and universities, the design and maker scenes in Datong and the creative quarters, and a lively calendar of meetups, hackathons, and industry talks. Mandarin Chinese is the everyday language, with Hokkien and Hakka widely spoken, and English is common in the international tech and academic communities. Taiwan also has a distinctive civic culture — volunteer networks, environmental groups, and neighbourhood associations are active and respected, and the island's night markets, temples, and festivals keep community life close to daily routines. High-speed rail makes cross-city attendance practical, so groups based in Taipei can draw members from across the corridor. For newcomers and locals alike, Taiwan offers a friendly, well-organised environment where joining a community is often as simple as attending a public event and introducing yourself.",
  dataPoints: [
    'Population of roughly 23.5 million.',
    'Mandarin Chinese is the primary language, with Hokkien and Hakka widely spoken.',
    'National capital is Taipei.',
    'High-speed rail connects Taipei, Taichung, and Kaohsiung along the west coast.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Taiwan?',
      answer:
        'Start at the /location hub and choose the Taipei page, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local event platforms and university networks also list gatherings.',
    },
    {
      question: 'What is the night-market culture and how does it relate to community?',
      answer:
        'Night markets are neighbourhood institutions where vendors, regulars, and visitors gather nightly for food and social life. Many community groups use night-market outings as low-pressure social events, and the markets themselves anchor local identity.',
    },
    {
      question: 'Does JoinOrigin operate in Taiwan?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Taiwan, and the Taipei pages are translated into Traditional Chinese to serve the local audience.',
    },
  ],
};

export default content;
