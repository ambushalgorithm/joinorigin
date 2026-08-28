import type { CountryContent } from '../../types';

/**
 * Australia country page content (EN source of truth).
 *
 * Honest, evergreen prose about the Australian community scene — the
 * outdoor-gathering culture, the concentrated coastal metros, and the
 * local professional networks that form in each capital city.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'australia',
  title: 'Origins in Australia | JoinOrigin',
  description:
    'Find or start communities in Australia — startup scenes, creative collectives, and local meetups from Sydney to the smaller capitals. JoinOrigin helps you get discovered.',
  intro:
    "Australia's community life is shaped by a small number of large coastal cities spread across an enormous continent. Most Australians live in the capital cities — Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra — which means each metro carries a dense and self-contained mix of professional networks, hobby groups, and local initiatives. The outdoor lifestyle is central to how people gather: beach swims, park run clubs, weekend markets, and community sports fill the calendar, and many meetups simply begin as a group of people walking, running, or sharing a table at a café. The startup and creative scenes are strongest in Sydney and Melbourne, while Canberra anchors public-policy and science communities and the smaller capitals host tight-knit business and maker groups. English is the shared language, and the pub or the local café is the default meeting point in almost every suburb. For anyone new to the country — or anyone who has been here for years — finding a group is usually as simple as turning up to something regular and saying hello.",
  dataPoints: [
    'Population of roughly 25 million, concentrated on the east and south-east coasts.',
    'English is the primary language.',
    'Federal capital is Canberra.',
    'Community life centres on the capital cities, with Sydney and Melbourne the largest hubs.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Australia?',
      answer:
        'Start at the /location hub and choose a city such as Sydney, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local event platforms and neighbourhood Facebook groups also list most gatherings.',
    },
    {
      question: 'What are the most common ways Australians gather?',
      answer:
        'Outdoor activities — beach and park runs, weekend markets, community sports, and walking groups — plus the café and pub culture are the most common settings. Professional meetups tend to use coworking spaces, libraries, and university campuses in the capital cities.',
    },
    {
      question: 'Does JoinOrigin operate in Australia?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Australia, and the Sydney pages describe the local scene honestly.',
    },
  ],
};

export default content;
