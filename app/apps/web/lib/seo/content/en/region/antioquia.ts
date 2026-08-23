import type { RegionContent } from '../../types';

/**
 * Antioquia region page content — EN source of truth.
 *
 * Covers the department of Antioquia: Medellín, the coffee and
 * mountain towns, and the regional community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'antioquia',
  title: 'Communities in Antioquia | JoinOrigin',
  description:
    'Find or start communities in Antioquia — startup, creative, political, meetup, and small business groups across the department. Join Origin and get discovered.',
  intro:
    'Antioquia is a department in the Colombian Andes known for its mountain geography, its entrepreneurial culture, and its transformation over the past two decades. Medellín, the capital, sits in a valley surrounded by mountains and has become one of Latin America’s most visible innovation hubs — the city is known for its metro cable cars, its public libraries and parks, its universities, and a startup ecosystem built around technology, education, and urban design. The paisas, as Antioquia’s people are known, have a reputation for hard work, business instinct, and warmth, and that culture shows up in community life: coworking spaces, university incubators, and neighborhood organizations are all active. Beyond Medellín, the department includes mountain towns like Santa Fe de Antioquia, Rionegro, and the coffee-growing areas, where community life is slower and more family-oriented. The department also has deep traditions of solidarity and civic organizing, shaped by a history that includes both great hardship and remarkable renewal. For anyone organizing or joining a community in Antioquia, the reward is a place where innovation and tradition meet — and where genuine relationships open doors.',
  dataPoints: [
    'Departmental capital is Medellín, in a valley of the Colombian Andes.',
    'Known for urban innovation: metro cable cars, public libraries, universities.',
    'Startup ecosystem in technology, education, and urban design.',
    'Mountain towns: Santa Fe de Antioquia, Rionegro, and coffee-growing areas.',
  ],
  faq: [
    {
      question: 'How do communities differ across Antioquia?',
      answer:
        'Medellín is dense, innovative, and professional; the mountain towns and coffee areas are slower, family-oriented, and community-driven. Groups in the capital tend to be organized around industry, while regional groups focus on local life.',
    },
    {
      question: 'What is the best way to start a community in Antioquia?',
      answer:
        'Pick a neighborhood or town, a clear format, and a venue with good transport access — Medellín’s metro and cable cars make cross-city gathering practical. Warmth and genuine relationships are central to paisa culture.',
    },
    {
      question: 'Does JoinOrigin operate in Antioquia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Medellín pages are available in Spanish, and the product helps people find or start communities anywhere in Antioquia.',
    },
  ],
};

export default content;
