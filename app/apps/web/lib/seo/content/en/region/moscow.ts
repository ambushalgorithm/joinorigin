import type { RegionContent } from '../../types';

/**
 * Moscow region page content — EN source of truth.
 *
 * Moscow is a federal city at the centre of the Moscow Oblast. This
 * region page covers the federal city and the surrounding oblast
 * landscape; the Moscow city page covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'moscow',
  intro:
    "The Moscow region is the heart of Russia's political, economic, and cultural life — the federal city of Moscow surrounded by the vast Moscow Oblast that stretches into the countryside. The city itself is a capital of scale: grand avenues, monumental parks, a metro that carries millions daily, and communities that range from chess clubs and literary circles to one of Europe's largest IT scenes. Around the city, the oblast's towns — many linked to the capital by rail — host their own university, factory, and countryside communities, and the dacha tradition means thousands of Muscovites retreat to country houses every summer, taking their city networks with them. Gorky Park, Sokolniki, and the VDNKh exhibition grounds give the city free, famous places to gather, while institutions like Moscow State University, HSE, and Bauman feed a constant stream of students. The metro connects everything inside the city, and the rail network connects the region, so a community anchored in the centre can draw members from a wide geography. Moscow culture values depth — chess, literature, theatre — and newcomers who bring genuine curiosity will find the region's doors open.",
  dataPoints: [
    'Moscow is a federal city at the centre of the surrounding Moscow Oblast.',
    'Roughly 10.4 million residents in the city itself — the capital of Russia.',
    'Universities include Moscow State University, HSE, and Bauman.',
    "One of Europe's largest IT sectors, anchored by companies like Yandex.",
    'Public anchors: Gorky Park, Sokolniki, VDNKh, and the Sparrow Hills.',
    'The metro and rail network connect the whole region — cross-city attendance is practical.',
  ],
  faq: [
    {
      question: 'Is the Moscow region different from the Moscow city scene?',
      answer:
        'Moscow is a federal city, and the region page covers both the city and the surrounding Moscow Oblast. This page describes the regional landscape, while the Moscow city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which communities are most active in Moscow?',
      answer:
        'Deep-interest communities are especially strong — chess clubs, literary circles, and theatre groups — alongside large IT and engineering meetups. In the oblast, university towns and dacha settlements host their own active scenes.',
    },
    {
      question: 'Does JoinOrigin have a presence in the Moscow region?',
      answer:
        'Yes. JoinOrigin has no local offices. The Moscow pages are available in Russian, and the product helps people find or start communities anywhere in the region.',
    },
  ],
};

export default content;
