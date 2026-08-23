import type { RegionContent } from '../../types';

/**
 * England region page content — EN source of truth.
 *
 * England is the largest and most populous constituent country of the
 * United Kingdom. This page covers the national landscape; the London
 * city page covers the capital's urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'england',
  title: 'Communities in England | JoinOrigin',
  description:
    'Find or start communities in England — from London’s startup scenes to clubs, societies, and small business networks across the country. Join Origin and get discovered.',
  intro:
    'England is the largest constituent country of the United Kingdom, home to the capital and the majority of the UK’s population. Its community landscape ranges from the dense, hyper-connected scenes of London to the proud local identities of cities like Manchester, Birmingham, Leeds, and Bristol, each with its own universities, industries, and club culture. The pub remains the classic English gathering place, joined today by coworking spaces, libraries, community centers, and the many clubs and societies that have shaped English social life for centuries. London concentrates the country’s most visible professional communities — startups, finance, creative industries, and an exceptionally international meetup scene — while the regions run deep networks around manufacturing heritage, universities, and civic life. Volunteering is widespread, from food banks to conservation groups, and many towns have a strong tradition of local societies, from history groups to sports clubs. England’s transport links make it possible to build a community that meets across a city or even across the country, while neighborhood groups thrive in a single pub or community hall. Whether you are looking for a tech meetup, a local history society, or a small business network, England offers a dense, varied landscape.',
  dataPoints: [
    'England is home to roughly 56.5 million residents.',
    'English is the primary language.',
    'Capital is London; Manchester, Birmingham, and Bristol are major hubs.',
    'Long tradition of clubs, societies, and voluntary associations.',
  ],
  faq: [
    {
      question: 'Is England different from the United Kingdom?',
      answer:
        'Yes. The United Kingdom comprises England, Scotland, Wales, and Northern Ireland. This page covers England specifically, while the United Kingdom country page covers the whole union.',
    },
    {
      question: 'Which parts of England have active communities?',
      answer:
        'London is the densest hub for professional and creative groups; Manchester, Birmingham, Leeds, and Bristol host strong local scenes, and towns across the country are organized around clubs, societies, and community centers.',
    },
    {
      question: 'Does JoinOrigin operate in England?',
      answer:
        'Yes. JoinOrigin has no local offices. The England region page is in English — the source language — and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
