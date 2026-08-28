import type { CountryContent } from '../../types';

/**
 * Russia country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Russian community scene — deep
 * cultural traditions, the scale of the country, and the density of its
 * big-city communities.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'russia',
  intro:
    "Russia is a country of enormous scale, and its community life reflects the geography: dense urban scenes in Moscow and St Petersburg, university towns across the Urals and Siberia, and smaller settlements where local clubs, libraries, and volunteer groups hold communities together. The country's cultural depth — chess, literature, theatre, and classical music are taken seriously — means many communities form around shared obsessions rather than casual interests, from chess clubs and literary circles to hiking groups that travel to the mountains and lakes. The metro systems of the big cities connect districts quickly, so a meetup can draw people from across town, while the dacha tradition brings families and friends together at country houses in the summer. Volunteer and charity networks are active in the larger cities, and the IT sector — anchored by companies such as Yandex — sustains one of Europe's largest engineering communities. Newcomers who bring genuine curiosity and patience will find that Russian community culture rewards depth and consistency.",
  dataPoints: [
    'Population of roughly 144 million across 11 time zones; the capital is Moscow.',
    'Russian is the primary language, with many regional languages across the federation.',
    'Deep cultural traditions — chess, literature, theatre, and music anchor strong communities.',
    "One of Europe's largest IT sectors, anchored by companies like Yandex.",
    'Universities include Moscow State University, HSE, and St Petersburg State University.',
    'The metro connects big-city districts — cross-city attendance is practical.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Russia?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Libraries, clubs, and university boards are also good starting points for offline groups.',
    },
    {
      question: 'What kinds of communities are most active?',
      answer:
        'Deep-interest communities are especially strong — chess clubs, literary circles, theatre groups, and hiking clubs — alongside large IT and engineering meetups in the major cities. Volunteer and charity networks are also active in Moscow and St Petersburg.',
    },
    {
      question: 'Does JoinOrigin operate in Russia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Moscow pages are available in Russian, and the product helps people find or start communities anywhere in Russia.',
    },
  ],
};

export default content;
