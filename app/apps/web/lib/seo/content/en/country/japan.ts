import type { CountryContent } from '../../types';

/**
 * Japan country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Japanese community scene — the
 * dense rail-connected metros, the culture of regular small gatherings,
 * and the mix of corporate, neighbourhood, and hobby communities.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'japan',
  title: 'Origins in Japan | JoinOrigin',
  description:
    'Find or start communities in Japan — startup and creative scenes in Tokyo and Osaka, plus neighbourhood associations and hobby circles. JoinOrigin helps you get discovered.',
  intro:
    "Japan's community life runs on two strengths: density and ritual. The country's population of roughly 126 million is heavily concentrated in a handful of metropolitan regions, and the rail network — the shinkansen, commuter lines, and subways — makes it practical to gather across entire prefectures. Tokyo and Osaka, the two largest content-rich hubs, each host deep professional scenes: technology, design, finance, and manufacturing communities meet in coworking spaces, event halls, and university campuses, while the after-work culture of izakaya and standing bars turns regular meetups into friendly rituals. Neighbourhood life is organised too: chōnaikai (neighbourhood associations) coordinate festivals, disaster-preparedness drills, and street cleaning, and countless hobby circles — from photography to traditional crafts — run on a fixed schedule with quiet reliability. Japanese is the primary language, and most groups follow clear etiquette around punctuality and introductions, which makes joining easier once you know the pattern. For newcomers, the fastest way in is usually a first event with an existing group, followed by the simple habit of returning.",
  dataPoints: [
    'Population of roughly 126.5 million.',
    'Japanese is the primary language.',
    'National capital is Tokyo.',
    'Rail-based urban structure makes cross-city gatherings practical in Tokyo and Osaka.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Japan?',
      answer:
        'Start at the /location hub and choose a city such as Tokyo or Osaka, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local event platforms and university bulletin boards also list gatherings.',
    },
    {
      question: 'What are chōnaikai and how do I get involved?',
      answer:
        'Chōnaikai are neighbourhood associations found across Japan that organise festivals, safety patrols, cleaning days, and disaster preparedness. Residents can typically join through their local ward office or by asking a current member at a community event.',
    },
    {
      question: 'Does JoinOrigin operate in Japan?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Japan, and the Tokyo and Osaka pages are translated into Japanese to serve the local audience.',
    },
  ],
};

export default content;
