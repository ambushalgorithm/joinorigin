import type { CountryContent } from '../../types';

/**
 * Indonesia country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Indonesian community scene — the
 * archipelago's diverse cultures, the Jakarta-centred professional
 * economy, and the strong tradition of local gatherings and mutual aid.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'indonesia',
  title: 'Origins in Indonesia | JoinOrigin',
  description:
    'Find or start communities in Indonesia — from the startup ecosystem in Jakarta to creative and small business networks across the archipelago. JoinOrigin helps you get discovered.',
  intro:
    "Indonesia is the world's largest archipelago nation, with hundreds of distinct ethnic groups, languages, and local traditions spread across more than seventeen thousand islands. Its community life is therefore deeply local: neighbourhoods organise their own clean-ups, religious and cultural celebrations, and gotong royong — the shared tradition of mutual cooperation — remains a genuine force in how people help one another. At the same time, the country's economic and professional energy concentrates in Jakarta, the capital region, which hosts the bulk of the startup ecosystem, corporate offices, and professional meetups. The Indonesian language unites the archipelago and is the default for most groups, while Javanese, Sundanese, and hundreds of other regional languages thrive at home and in local events. Digital platforms are widely used for coordination, and cafés, coworking spaces, universities, and mosques all serve as meeting points depending on the group. For newcomers and locals alike, the most reliable way into a community is through a personal introduction or a friendly first message, followed by showing up to a regular gathering.",
  dataPoints: [
    'Population of roughly 267 million across more than 17,000 islands.',
    'Indonesian (Bahasa Indonesia) is the primary language.',
    'National capital is Jakarta.',
    'Community life combines local mutual-aid traditions with a Jakarta-centred professional scene.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Indonesia?',
      answer:
        'Start at the /location hub and choose the Jakarta page, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Many groups also coordinate through messaging apps and social media.',
    },
    {
      question: 'What does gotong royong mean for community life?',
      answer:
        'Gotong royong is the Indonesian tradition of working together for a common good — neighbourhood clean-ups, shared meals, and mutual aid during weddings, funerals, or emergencies. It makes joining local projects a natural and respected way to build community.',
    },
    {
      question: 'Does JoinOrigin operate in Indonesia?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Indonesia, and the Jakarta pages are translated into Indonesian to serve the local audience.',
    },
  ],
};

export default content;
