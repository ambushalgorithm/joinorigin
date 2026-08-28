import type { CountryContent } from '../../types';

/**
 * Singapore country page content (EN source of truth).
 *
 * Honest, evergreen prose about Singapore's community scene — the
 * city-state's density, its multilingual professional networks, and the
 * strong culture of organised meetups and community programmes.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'singapore',
  title: 'Origins in Singapore | JoinOrigin',
  description:
    'Find or start communities in Singapore — startup meetups, creative collectives, and neighbourhood groups in a compact city-state. JoinOrigin helps you get discovered.',
  intro:
    "Singapore is a city-state of roughly 5.6 million people, which makes its community scene unusually compact and well connected. The entire country is one dense urban region, so a professional meetup in the central business district and a neighbourhood gathering in a heartland estate are both a short MRT ride away — distance rarely stops anyone from attending. English is the working language, with Mandarin, Malay, and Tamil also spoken, and the multicultural mix shows up directly in community life: hawker centres and community clubs host food festivals, cultural celebrations, and hobby groups throughout the year. The startup and technology scene is among the most active in Southeast Asia, with founders, engineers, and investors meeting in coworking spaces across Raffles Place, Tanjong Pagar, and One-North. Grassroots organisations, Residents' Committees, and volunteer networks keep neighbourhood life strong, and the city's parks, libraries, and community centres provide abundant free space for gatherings. For newcomers, Singapore is one of the easiest cities in the world to plug into — most groups are openly listed, events run on a predictable schedule, and the default language of networking is English.",
  dataPoints: [
    'Population of roughly 5.6 million in a single city-state.',
    'English is the working language, with Mandarin, Malay, and Tamil also official.',
    'National capital is Singapore.',
    'A compact MRT network connects every district, making attendance practical.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Singapore?',
      answer:
        'Start at the /location hub and choose the Singapore page, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Event platforms and community club listings also cover most gatherings.',
    },
    {
      question: "What are Residents' Committees and can I join one?",
      answer:
        "Residents' Committees are grassroots bodies that organise activities and programmes within public-housing estates. Residents can join by contacting their local community club or attending an event in their neighbourhood.",
    },
    {
      question: 'Does JoinOrigin operate in Singapore?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Singapore, and the Singapore pages describe the local scene honestly.',
    },
  ],
};

export default content;
