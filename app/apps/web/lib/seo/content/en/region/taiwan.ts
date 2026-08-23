import type { RegionContent } from '../../types';

/**
 * Taiwan region page content (EN source of truth).
 *
 * The "Taiwan" admin-1 region hosts the Taipei content-rich city page —
 * the capital region of the island. Covers the regional landscape around
 * the capital and its surrounding urban corridor.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'taiwan',
  intro:
    "The Taiwan region — the admin-1 division that hosts Taipei, the island's capital and largest city — is the political, cultural, and economic core of the island. The region is small in area but dense in people and institutions: Taipei City and the surrounding urban corridor of New Taipei City form a continuous metropolitan area of several million residents, anchored by the government quarter, the technology parks, and the major universities that line the Keelung River valley. Community life here has two clear layers. The professional layer runs through the tech campuses and coworking spaces of the inner city, where the startup, design, and maker scenes hold meetups, hackathons, and industry talks on a near-weekly rhythm. The civic and cultural layer runs through the night markets, temples, and neighbourhoods, where food communities, volunteer groups, and heritage initiatives keep the city's daily life connected. Mandarin is the everyday language, with Hokkien and Hakka widely spoken, and the MRT and high-speed rail make the region's parts easy to reach from one another. For anyone organising or joining a community in Taiwan, this region offers the island's densest and most dynamic environment — a small capital with an outsized community scene.",
  dataPoints: [
    "The Taiwan admin-1 region hosts Taipei, the island's capital.",
    'Taipei and New Taipei City form a continuous metropolitan area.',
    "The region anchors the island's tech, startup, and university life.",
    'Mandarin is the everyday language, with Hokkien and Hakka widely spoken.',
  ],
  faq: [
    {
      question: 'Is the Taiwan region different from the Taipei city scene?',
      answer:
        'This page covers the admin-1 region that hosts Taipei. The Taipei city page dives into the specific districts, venues, and group types of the capital city.',
    },
    {
      question: 'Which parts of the Taiwan region have the most active communities?',
      answer:
        'Inner Taipei hosts the densest startup, design, and maker scenes, while the wider New Taipei corridor sustains neighbourhood, food, and civic communities. Night markets and university districts are reliable hubs for social gatherings.',
    },
    {
      question: 'Does JoinOrigin operate in Taiwan?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Taiwan, and the Taipei pages are translated into Traditional Chinese to serve the local audience.',
    },
  ],
};

export default content;
