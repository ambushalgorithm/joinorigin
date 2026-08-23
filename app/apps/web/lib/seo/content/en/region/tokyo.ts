import type { RegionContent } from '../../types';

/**
 * Tokyo region page content (EN source of truth).
 *
 * Tokyo is a metropolis — the admin-1 region and the city are the same
 * entity. This region page covers the metropolitan landscape; the city
 * page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'tokyo',
  intro:
    "Tokyo is a metropolis, which means the region and the city are the same administrative entity — and the page is the story of the world's largest urban community landscape. More than 13 million people live within the metropolitan borders, and the greater capital area extends into the surrounding prefectures, making Tokyo the political, economic, and cultural centre of Japan. The city's wards each carry a distinct community identity: Shibuya and Shinjuku anchor tech, media, and nightlife; Ginza and Marunouchi host finance and corporate life; Kichijoji, Shimokitazawa, and Koenji sustain indie culture, music, and creative communities; Akihabara draws makers and hobbyists; and the quieter residential wards run neighbourhood associations and family-oriented groups. The railway network is the city's social glue — nearly everyone meets at a station, and izakaya, cafés, and event spaces cluster within minutes of the ticket gates. Universities such as the University of Tokyo, Waseda, and Keio feed a constant stream of students and researchers into the scene. For anyone organising or joining a community in Japan, Tokyo offers unmatched density, variety, and infrastructure — a place where any interest can find its group.",
  dataPoints: [
    'Tokyo is a metropolis with a population of more than 13 million.',
    'A direct-administered region — the region and city are the same entity.',
    "Japan's political, economic, and cultural capital.",
    'The railway network makes station-centred gatherings practical across all wards.',
  ],
  faq: [
    {
      question: 'Is the Tokyo region different from the Tokyo city scene?',
      answer:
        'No. Tokyo is a metropolis, so the region and city overlap completely. This page covers the metropolitan landscape, while the Tokyo city page dives into specific wards, venues, and group types.',
    },
    {
      question: 'Which Tokyo wards have the most active communities?',
      answer:
        'Shibuya and Shinjuku anchor tech, media, and nightlife; Ginza and Marunouchi host corporate life; Kichijoji, Shimokitazawa, and Koenji sustain creative and indie scenes; Akihabara draws makers and hobbyists.',
    },
    {
      question: 'Does JoinOrigin operate in Tokyo?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Tokyo, and the Tokyo pages are translated into Japanese to serve the local audience.',
    },
  ],
};

export default content;
