import type { RegionContent } from '../../types';

/**
 * Atlántico region page content — EN source of truth.
 *
 * Covers the department of Atlántico on Colombia's Caribbean coast:
 * Barranquilla, the port cities, and the regional community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'atlantico',
  title: 'Origins in Atlántico | JoinOrigin',
  description:
    'Find or start communities in Atlántico — startup, creative, political, meetup, and small business groups on Colombia’s Caribbean coast. Join Origin and get discovered.',
  intro:
    'Atlántico is a small but densely populated department on Colombia’s Caribbean coast, home to Barranquilla, the country’s fourth-largest city and the industrial and commercial heart of the coast. Barranquilla is known above all for its Carnival — one of the largest and most colorful carnivals in the world — and for a warm, festive, entrepreneurial culture that spills into everyday life. The city sits on the Magdalena River near the Caribbean Sea, which made it a historic port and a melting pot of European, African, Indigenous, and Middle Eastern influences; that mix shows up in the city’s music, food, and community life. In recent years Barranquilla has invested heavily in public infrastructure — parks, libraries, and the Gran Malecón riverfront — creating new public spaces where communities gather. The department also includes the port city of Puerto Colombia and a string of smaller municipalities, where life is slower and family-oriented. For anyone organizing or joining a community in Atlántico, the reward is a warm, open culture where people show up for each other — and where the Carnival spirit means people know how to celebrate together.',
  dataPoints: [
    'Departmental capital is Barranquilla, on Colombia’s Caribbean coast.',
    'Home of the Barranquilla Carnival, one of the world’s largest.',
    'Port city on the Magdalena River; cultural melting pot.',
    'New public spaces: parks, libraries, and the Gran Malecón riverfront.',
  ],
  faq: [
    {
      question: 'How do communities differ across Atlántico?',
      answer:
        'Barranquilla is the dense, festive, entrepreneurial center; smaller municipalities like Puerto Colombia are slower and more family-oriented. Most professional and cultural communities concentrate in the capital, with regional groups focused on local life.',
    },
    {
      question: 'What is the best way to start a community in Atlántico?',
      answer:
        'Choose a neighborhood or venue with good access, and lean into the city’s warmth — music, food, and celebration are natural ways to bring people together. The city’s new parks and the Malecón are popular public gathering spots.',
    },
    {
      question: 'Does JoinOrigin operate in Atlántico?',
      answer:
        'Yes. JoinOrigin has no local offices. The Barranquilla pages are available in Spanish, and the product helps people find or start communities anywhere in Atlántico.',
    },
  ],
};

export default content;
