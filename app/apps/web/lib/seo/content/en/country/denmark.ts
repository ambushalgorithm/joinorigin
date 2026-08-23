import type { CountryContent } from '../../types';

/**
 * Denmark country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Danish community scene — foreninger,
 * folk high schools, co-housing, and the hygge culture that binds them.
 * Data points mirror the committed snapshot (G1).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'denmark',
  intro:
    'Denmark is a small country with an unusually organized community life, built on the tradition of the forening — a voluntary association with regular meetings, a board, and often a shared purpose. Almost every Dane belongs to at least one, from sports clubs and choir societies to housing cooperatives and hobby groups, and public support for associations is a national institution in its own right. The flat geography and short distances make regional gatherings practical: a club in Aarhus and one in Odense can meet for a weekend without much planning. Cycling is the default transport, which means community life happens close to home — school yards, sports halls, libraries, and community centres host meetings across every municipality. Universities such as the University of Copenhagen, Aarhus University, and DTU feed student communities in the larger cities, while folk high schools (folkehøjskoler) carry a distinctly Danish tradition of learning and living together. Hygge — the art of cozy, meaningful togetherness — is the social glue, and newcomers who join an association or simply show up at a community event will find the Danish path to belonging is well signposted.',
  dataPoints: [
    'Population of roughly 5.8 million; the capital is Copenhagen.',
    'Danish is the primary language, with English widely spoken.',
    'Strong association (forening) culture — voluntary clubs and societies are central to social life.',
    'Cycling and flat geography make local community life practical across every municipality.',
    'Universities include the University of Copenhagen, Aarhus University, and DTU.',
    'Folk high schools (folkehøjskoler) carry a distinctive Danish tradition of communal learning.',
  ],
  faq: [
    {
      question: 'How do I find communities in Denmark?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local associations (foreninger) and community centres are also good starting points for offline groups.',
    },
    {
      question: 'What is a forening and how do I join one?',
      answer:
        'A forening is a voluntary association with regular meetings, a board, and a shared purpose — the basic unit of Danish community life. Many are open to new members; asking at a local community centre or checking association boards at libraries and sports halls is usually enough to join.',
    },
    {
      question: 'Does JoinOrigin operate in Denmark?',
      answer:
        'Yes. JoinOrigin has no local offices. The Copenhagen pages are available in English, and the product helps people find or start communities anywhere in Denmark.',
    },
  ],
};

export default content;
