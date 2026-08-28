import type { RegionContent } from '../../types';

/**
 * São Paulo region page content — EN source of truth.
 *
 * Covers the state of São Paulo: the megacity, the interior university
 * cities, and the statewide community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'sao-paulo',
  title: 'Origins in São Paulo | JoinOrigin',
  description:
    'Find or start communities in São Paulo — startup, creative, political, meetup, and small business groups across the state. Join Origin and get discovered.',
  intro:
    'São Paulo state is Brazil’s economic engine and one of the most community-dense regions in Latin America. The state capital, São Paulo city, is the largest city in the Americas with roughly 12 million residents, and it anchors the country’s startup ecosystem — fintech, marketplaces, and enterprise tech cluster around Avenida Faria Lima, Pinheiros, and Vila Madalena — alongside one of the world’s great food scenes, a major arts and culture circuit, and universities like USP, Unicamp, and the Getulio Vargas Foundation. Beyond the capital, the state is full of mid-sized communities: Campinas, Sorocaba, Ribeirão Preto, São José dos Campos, and Santos each host their own university, industrial, or port-driven networks. Paulistas are known for working hard and eating well, and the state’s enormous coffee and agricultural heritage runs deep in the interior. Community life in São Paulo rewards organization: venues fill up fast, traffic shapes the calendar, and successful groups tend to be specific about neighborhood, format, and timing. For anyone organizing or joining a community, the state offers the rare combination of scale, density, and professional opportunity.',
  dataPoints: [
    'State capital is the city of São Paulo, the largest in the Americas.',
    'Roughly 12 million residents in the capital; the state is the most populous in Brazil.',
    'Interior hubs: Campinas, Sorocaba, Ribeirão Preto, São José dos Campos, Santos.',
    'Anchors: USP, Unicamp, Faria Lima corridor, and Brazil’s densest startup scene.',
  ],
  faq: [
    {
      question: 'How do communities differ across the state of São Paulo?',
      answer:
        'The capital is dense, fast-paced, and professional; the interior cities are more relaxed and community-oriented around universities and industry; the coast adds beach and port life. Formats should match the local rhythm.',
    },
    {
      question: 'What is the best way to start a community in São Paulo?',
      answer:
        'Pick a neighborhood, a clear language (Portuguese, English, or both), and a venue with good transit access. Consistency matters: a recurring weekly or monthly event at the same place builds loyalty faster than one-off events.',
    },
    {
      question: 'Does JoinOrigin operate in São Paulo?',
      answer:
        'Yes. JoinOrigin has no local offices. The São Paulo pages are available in Portuguese, and the product helps people find or start communities across the state.',
    },
  ],
};

export default content;
