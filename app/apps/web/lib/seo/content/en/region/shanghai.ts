import type { RegionContent } from '../../types';

/**
 * Shanghai region page content (EN source of truth).
 *
 * Shanghai is a municipality — the admin-1 region and the city are the
 * same entity. This region page covers the municipal/district landscape;
 * the city page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'shanghai',
  intro:
    "Shanghai is a municipality, which means the region and the city are the same administrative entity — and the region page is really the story of one enormous, self-contained urban community landscape. More than 24 million people live within the municipal borders, making it one of the largest cities on earth and the commercial capital of China. The districts each carry a distinct identity that shapes the groups meeting there: Pudong's towers anchor finance and technology, the French Concession and Xuhui are the heart of café culture and creative industries, Jing'an draws retail and nightlife communities, and the older riverside neighbourhoods along the Huangpu preserve history and local tradition. Because the whole municipality is served by one of the world's largest metro systems, communities rarely fragment across long distances — a founder meetup in Zhangjiang and a design night in the French Concession are both easily reachable in under an hour. Universities such as Fudan and Shanghai Jiao Tong feed a constant stream of students and researchers into the scene, while the city's position as a global business hub attracts professionals from everywhere. For anyone organising or joining a community in China, Shanghai offers the rare combination of scale, infrastructure, and openness that makes first gatherings genuinely workable.",
  dataPoints: [
    'Shanghai is a municipality with a population of more than 24 million.',
    'A direct-administered city — the region and city are the same entity.',
    "China's commercial capital and a major global finance and tech hub.",
    "One of the world's largest metro systems connects every district.",
  ],
  faq: [
    {
      question: 'Is the Shanghai region different from the Shanghai city scene?',
      answer:
        'No. Shanghai is a municipality, so the region and city overlap completely. This page covers the municipal landscape, while the Shanghai city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Shanghai districts have the most active communities?',
      answer:
        "Pudong and Zhangjiang anchor tech and finance communities; the French Concession and Xuhui host creative and café-based groups; Jing'an draws retail and nightlife scenes; and the riverside old town runs local and heritage-focused initiatives.",
    },
    {
      question: 'Does JoinOrigin operate in Shanghai?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Shanghai, and the Shanghai pages are translated into Simplified Chinese to serve the local audience.',
    },
  ],
};

export default content;
