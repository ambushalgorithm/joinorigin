import type { CountryContent } from '../../types';

/**
 * Ukraine country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Ukrainian community scene — the
 * volunteer and civil-society culture, the IT sector, and the café life
 * that keeps communities connected.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'ukraine',
  intro:
    "Ukraine's community landscape is defined by an extraordinary capacity for organizing. The volunteer movements that grew during the Maidan protests and expanded after 2022 have produced a civil society that mobilizes fast, helps neighbours first, and keeps coordination networks running even under difficult conditions. Volunteer hubs, community kitchens, and support groups are woven into everyday life in every major city, and the country's IT sector — one of Europe's largest talent pools — sustains active tech communities in Kyiv, Lviv, and Dnipro. Café culture is the social backbone: coffee shops and specialty bars fill with people discussing projects, politics, and plans, and a meeting over coffee is the standard way to start something. University cities such as Kyiv, Lviv, Kharkiv, and Odesa host dense student and alumni networks, while local markets and farmers' markets keep small-business communities connected. Community life today balances warmth with caution: gatherings follow official safety guidance, and the habit of checking on neighbours is second nature. Newcomers who are patient and respectful of safety advice will find genuine, deep communities.",
  dataPoints: [
    'Population of roughly 40 million; the capital is Kyiv.',
    'Ukrainian is the primary language, with Russian and other regional languages spoken.',
    "One of Europe's largest IT talent pools, anchored by Kyiv, Lviv, and Dnipro.",
    'A strong volunteer and civil-society culture built over the last decade.',
    'Universities include Taras Shevchenko University, KPI, and the Kyiv-Mohyla Academy.',
    'Café and specialty-coffee culture is a natural base for meetups and communities.',
  ],
  faq: [
    {
      question: 'How do I find communities in Ukraine?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Volunteer hubs and local cafés are also good starting points for offline groups.',
    },
    {
      question: 'Is it realistic to start a community in Ukraine right now?',
      answer:
        'Yes. Communities across Ukraine continue to organize around support, work, and shared interests, always following official safety guidance. The how-to guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Does JoinOrigin operate in Ukraine?',
      answer:
        'Yes. JoinOrigin has no local offices. The Kyiv pages are available in Ukrainian and English, and the product helps people find or start communities anywhere in Ukraine.',
    },
  ],
};

export default content;
