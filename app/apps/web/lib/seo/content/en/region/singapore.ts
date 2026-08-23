import type { RegionContent } from '../../types';

/**
 * Singapore region page content (EN source of truth).
 *
 * Singapore is a city-state — the admin-1 region and the city are the
 * same entity. This region page covers the national landscape; the city
 * page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'singapore',
  intro:
    "Singapore is a city-state, which means the region and the country and the city are all the same entity — a single dense urban community landscape of roughly 5.6 million people. That conflation is precisely what makes the island's community life so accessible: there are no long distances, no regional divides, and no reason for a group to fragment across cities. The community scene runs across several overlapping layers. The professional layer — startups, finance, technology, and creative industries — gathers in coworking spaces and event venues around Raffles Place, Tanjong Pagar, and One-North, while the neighbourhood layer operates through Residents' Committees, community clubs, and volunteer networks in the heartland estates. English is the working language, with Mandarin, Malay, and Tamil also official, and the multicultural calendar — Chinese New Year, Hari Raya, Deepavali, Christmas — gives communities a steady rhythm of shared celebration. The MRT, the parks, and the libraries tie it all together. For anyone organising or joining a community, Singapore is arguably the easiest place in Southeast Asia to start: the infrastructure is world-class, the city is safe, and the default language of networking is English.",
  dataPoints: [
    'Singapore is a city-state — region, country, and city are the same entity.',
    'Population of roughly 5.6 million.',
    'English is the working language, with Mandarin, Malay, and Tamil also official.',
    'Professional life clusters around Raffles Place, Tanjong Pagar, and One-North.',
  ],
  faq: [
    {
      question: 'Is the Singapore region different from the Singapore city scene?',
      answer:
        'No. Singapore is a city-state, so the region and city overlap completely. This page covers the national landscape, while the Singapore city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Where do most communities in Singapore meet?',
      answer:
        "Professional communities use coworking spaces and event venues in the central and southern districts. Neighbourhood communities meet at community clubs, residents' committee centres, parks, and libraries across the heartland estates.",
    },
    {
      question: 'Does JoinOrigin operate in Singapore?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Singapore, and the Singapore pages describe the local scene honestly.',
    },
  ],
};

export default content;
