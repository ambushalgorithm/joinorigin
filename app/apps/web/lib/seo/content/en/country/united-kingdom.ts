import type { CountryContent } from '../../types';

/**
 * United Kingdom country page content (EN source of truth).
 *
 * Evergreen, honest prose about the UK community scene — clubs, societies,
 * the pub tradition, and the London hub.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'united-kingdom',
  title: 'Communities in the United Kingdom | JoinOrigin',
  description:
    'Find or start communities in the United Kingdom — from startup scenes in London to clubs, societies, and small business networks nationwide. Join Origin and get discovered.',
  intro:
    'The United Kingdom has a deep tradition of clubs, societies, and voluntary associations that still shapes community life today. From the mechanics’ institutes and working men’s clubs of the industrial era to modern meetups, sports clubs, and alumni networks, Britons have long organized around shared interests and hobbies. The pub remains the classic social anchor — a reliable room where friends, colleagues, and strangers can sit down together — while libraries, community centers, and university campuses provide more formal homes for groups. London is the country’s densest community hub: startup and creative scenes cluster across the city, and international professionals have made English-speaking networks abundant. Beyond the capital, cities like Manchester, Birmingham, and Edinburgh each sustain lively scenes of their own, often tied to strong local identities and university communities. Volunteering is widespread, from food banks to conservation groups, and civic participation runs deep in many towns. The UK’s size and transport links mean that a national community can meet in person regularly, while a local one can thrive in a single neighborhood pub.',
  dataPoints: [
    'Population of roughly 66.5 million across four constituent countries.',
    'English is the primary language, with Welsh and Scottish Gaelic co-official in parts.',
    'Capital is London; Manchester, Birmingham, and Edinburgh are major hubs.',
    'Long tradition of clubs, societies, and voluntary associations.',
  ],
  faq: [
    {
      question: 'How do I find communities in the United Kingdom?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local clubs, libraries, and community centers are also strong starting points.',
    },
    {
      question: 'Can I start a community in a UK city?',
      answer:
        'Yes. UK cities have countless pubs, libraries, coworking spaces, and community venues that host first gatherings, and the club tradition gives new groups a recognized pattern. The how-to guides cover the full path.',
    },
    {
      question: 'Does JoinOrigin operate in the United Kingdom?',
      answer:
        'Yes. JoinOrigin has no local offices. The United Kingdom pages are in English — the source language — and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
