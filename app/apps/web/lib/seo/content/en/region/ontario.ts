import type { RegionContent } from '../../types';

/**
 * Ontario region page content — EN source of truth.
 *
 * Covers Canada's most populous province: the Toronto megacity, the
 * national capital Ottawa, university cities, and the broader Ontario
 * community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'ontario',
  title: 'Communities in Ontario | JoinOrigin',
  description:
    'Find or start communities in Ontario — startup, creative, political, meetup, and small business groups across the province. Join Origin and get discovered.',
  intro:
    'Ontario is Canada’s most populous province and the heart of the country’s English-speaking professional scene. Toronto, the provincial capital, is one of the most multicultural cities in the world — more than half of its residents were born outside Canada — and its startup ecosystem is the largest in the country, anchored in fintech, enterprise software, and a deep pool of engineering talent. Just a few hours away, Ottawa hosts the federal government and a growing tech community around Kanata, while university cities like Waterloo, London, and Hamilton contribute research-driven communities and a steady flow of students and founders. The province is also home to a strong civic and volunteer culture: community centres, libraries, and neighbourhood associations are woven into daily life, and winter shapes the calendar by pushing gatherings indoors from late autumn to early spring. Ontario’s geography is large — communities in the north and southwest are separated by hours of driving — which means successful groups often organize regionally rather than provincially. For anyone organizing or joining a community, Ontario rewards clear communication, inclusive formats, and venues that work across seasons.',
  dataPoints: [
    'Provincial capital is Toronto; federal capital Ottawa is also in Ontario.',
    'Most populous province in Canada.',
    'Startup and tech hubs: Toronto, Waterloo, Ottawa (Kanata), Hamilton.',
    'Strong civic, volunteer, and immigrant-community culture; cold winters shape gatherings.',
  ],
  faq: [
    {
      question: 'How do communities differ across Ontario?',
      answer:
        'Toronto is dense, multicultural, and professional; Ottawa is government and tech; Waterloo and Hamilton are university and research-driven; the north and southwest are more rural and community-oriented. Groups often organize regionally.',
    },
    {
      question: 'What is the best way to start a community in Ontario?',
      answer:
        'Pick a city or region, a clear format, and an indoor venue that works year-round. Many successful groups use libraries, community centres, and coworking spaces, and they communicate consistently online between in-person events.',
    },
    {
      question: 'Does JoinOrigin operate in Ontario?',
      answer:
        'Yes. JoinOrigin has no local offices. The Toronto pages describe the real community landscape honestly, and the product helps people find or start communities anywhere in Ontario.',
    },
  ],
};

export default content;
