import type { CountryContent } from '../../types';

/**
 * Poland country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Polish community scene — the
 * third-sector tradition, participatory budgeting, university towns, and
 * the café culture that anchors modern meetups.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'poland',
  intro:
    "Poland's community landscape combines a deep third-sector tradition with a fast-growing modern scene of tech meetups and civic initiatives. The country's history of solidarity — from the trade union movement to the democratic transitions of the 1990s — left behind a strong culture of organizing: foundations, associations (stowarzyszenia), and volunteer groups are woven into everyday life, and participatory budgeting is a real, well-used institution in many cities. University towns such as Warsaw, Kraków, Wrocław, and Gdańsk host dense student communities, while an IT and game-development boom has made Polish tech meetups some of the most active in Central Europe. Café culture, board game cafés, and milk bars — cheap state-era canteens with shared tables — give newcomers natural places to meet. Regional traditions matter too: local festivals, civic groups, and smaller-town associations keep communities connected beyond the big cities. Newcomers who join an existing group or start a simple recurring meetup will find a country that takes community seriously and rewards consistency.",
  dataPoints: [
    'Population of roughly 38 million; the capital is Warsaw.',
    'Polish is the primary language, with English growing in business and tech.',
    'Strong third-sector culture — foundations, associations, and volunteer groups are widespread.',
    "One of Central Europe's leading IT and game-development scenes.",
    'Universities include the University of Warsaw, Jagiellonian University, and the Warsaw University of Technology.',
    'Milk bars and board game cafés anchor a distinctive café culture.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Poland?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Foundations, cultural centres, and local event platforms are also good starting points for offline groups.',
    },
    {
      question: 'What is participatory budgeting in Polish cities?',
      answer:
        'Participatory budgeting (budżet obywatelski) is a real institution in many Polish cities: residents propose and vote on local projects, from playgrounds to park renovations. Attending a district meeting is one of the fastest ways to meet engaged neighbours and start a civic community.',
    },
    {
      question: 'Does JoinOrigin operate in Poland?',
      answer:
        'Yes. JoinOrigin has no local offices. The Warsaw pages are available in Polish and English, and the product helps people find or start communities anywhere in Poland.',
    },
  ],
};

export default content;
