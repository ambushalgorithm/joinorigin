import type { CountryContent } from '../../types';

/**
 * Canada country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Canadian community scene — the
 * country's bilingual and multicultural fabric, winter sociality,
 * strong civic and volunteer culture, and the startup hubs in
 * Toronto, Vancouver, and Montreal.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'canada',
  title: 'Origins in Canada | JoinOrigin',
  description:
    'Find or start communities in Canada — from Toronto startup groups to Vancouver creative scenes and small business networks nationwide. Join Origin and get discovered.',
  intro:
    'Canada is a vast, bilingual, and deeply multicultural country where community life is shaped by immigration, winter, and a strong civic tradition. More than a fifth of the population was born abroad, which means cities like Toronto, Vancouver, and Montreal host dense networks of diaspora, newcomer, and cultural communities alongside long-established local ones. The climate also shapes gathering: winter pushes groups indoors to community centres, libraries, cafés, and sports facilities, while summer unlocks patios, festivals, and parks across the country. Canada has a notably strong volunteer and civic culture — community associations, neighbourhood groups, religious congregations, and non-profits are woven into daily life, and public institutions like libraries and recreation centres actively host community programs. English and French are both official languages, with French dominant in Quebec and bilingualism common elsewhere, and Indigenous communities maintain their own distinct traditions of gathering and governance. The startup ecosystem has grown quickly, with Toronto anchoring fintech and enterprise tech, Vancouver known for climate tech and gaming, and Montreal strong in AI and creative industries. For anyone organizing or joining a community, Canada rewards clear communication, inclusive formats, and venues that work across seasons.',
  dataPoints: [
    'Population of roughly 37 million across 10 provinces and 3 territories.',
    'English and French are both official languages.',
    'Federal capital is Ottawa.',
    'Strong civic, volunteer, and immigrant-community culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Canada?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local community centres, libraries, and immigrant-serving organizations are also good starting points for offline groups.',
    },
    {
      question: 'How does the Canadian climate affect community gatherings?',
      answer:
        'Winter pushes gatherings indoors to community centres, libraries, and cafés, while summer opens patios, parks, and festival spaces. Successful groups plan for both seasons and choose venues that stay comfortable year-round.',
    },
    {
      question: 'Does JoinOrigin operate in Canada?',
      answer:
        'Yes. JoinOrigin has no local offices. The Toronto, Vancouver, and Montreal pages describe the real community landscape honestly, and the product helps Canadians find or start communities across the country.',
    },
  ],
};

export default content;
