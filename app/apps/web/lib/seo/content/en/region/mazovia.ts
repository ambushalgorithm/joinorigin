import type { RegionContent } from '../../types';

/**
 * Mazovia (Masovian Voivodeship) region page content — EN source of truth.
 *
 * Covers Poland's largest region around Warsaw: the capital's commuter
 * belt, the smaller cities of Radom, Płock, and Siedlce, and the Vistula
 * corridor that ties them together.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'mazovia',
  intro:
    "Mazovia — the Masovian Voivodeship — is Poland's largest and most populous region, and its community life is anchored by Warsaw, the national capital. Around the city, a ring of commuter towns and smaller cities such as Radom, Płock, and Siedlce each carry their own scenes, built around universities, hospitals, factories, and local culture. The Vistula river runs through the heart of the region, giving both Warsaw and the smaller towns a natural meeting place, while the region's forests — including the Kampinos National Park on the capital's doorstep — host outdoor and recreational communities. Warsaw's universities draw students from across the whole region, and its IT and startup scene pulls professionals from the surrounding towns, so a meetup in the capital regularly includes people who commuted in. Regional institutions, municipal cultural centres, and participatory-budget projects keep civic life active in every county. The region rewards the same habit as the capital: show up consistently, and the community fabric of Mazovia will fold you in.",
  dataPoints: [
    "Mazovia is Poland's largest and most populous region, anchored by Warsaw.",
    'The Vistula river and Kampinos National Park give the region natural meeting places.',
    'Smaller cities include Radom, Płock, and Siedlce, each with local community scenes.',
    "Warsaw's universities and IT scene draw members from across the region.",
    'Municipal cultural centres and participatory-budget projects keep civic life active.',
    'Regional institutions tie the counties together — commuting to the capital is routine.',
  ],
  faq: [
    {
      question: 'Is Mazovia the same as Warsaw?',
      answer:
        'Mazovia is the region around Warsaw — the Masovian Voivodeship. This page covers the regional landscape, including the commuter belt and smaller cities, while the Warsaw city page dives into the capital’s districts, venues, and group types.',
    },
    {
      question: 'What kinds of communities thrive outside the capital?',
      answer:
        'Radom, Płock, and Siedlce have active cultural centres, university groups, and civic associations, while the towns around Warsaw host commuter-friendly meetups and outdoor communities in the forests and along the Vistula.',
    },
    {
      question: 'Does JoinOrigin have a presence in Mazovia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Warsaw pages are available in Polish and English, and the product helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
