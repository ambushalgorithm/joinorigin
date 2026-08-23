import type { RegionContent } from '../../types';

/**
 * Maharashtra region page content (EN source of truth).
 *
 * Maharashtra is the state that hosts two content-rich cities — Mumbai
 * and Pune. This region page covers the statewide community landscape,
 * from the financial capital to the technology and education hub of
 * Pune.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'maharashtra',
  intro:
    "Maharashtra is India's economic powerhouse and the only state in the current city set that hosts two content-rich cities: Mumbai and Pune. Mumbai, the state capital and India's financial centre, anchors a professional scene of extraordinary density — media, finance, Bollywood, startups, and NGOs all operate within one crowded peninsula, and community life moves through the local trains, the sea-facing promenades, and the neighbourhoods of the western suburbs. Pune, about 150 kilometres inland, runs on a different rhythm: a strong technology and engineering culture built around its universities and IT parks, a lively student population, and a growing startup scene. The state's community landscape is shaped by this two-pole structure — professional networks, creative collectives, and civic groups exist in both cities, and the expressway and rail links keep them connected. Marathi is the regional language, with Hindi and English widely used in the cities. For anyone organising or joining a community in western India, Maharashtra offers both the scale of a megacity and the relative intimacy of a large university town — often within a single day's travel.",
  dataPoints: [
    "Maharashtra is India's economic powerhouse, with Mumbai as its capital.",
    'Hosts two content-rich cities: Mumbai and Pune.',
    "Mumbai is India's financial and media centre; Pune is a major technology and education hub.",
    'Marathi is the regional language, with Hindi and English widely spoken in the cities.',
  ],
  faq: [
    {
      question: 'How is the Maharashtra region different from the Mumbai and Pune city scenes?',
      answer:
        "This page covers the whole state. The Mumbai city page covers the financial capital's districts and industries, while the Pune city page covers the technology and education hub's local scene.",
    },
    {
      question: 'Which parts of Maharashtra have the most active communities?',
      answer:
        "Mumbai's western suburbs and business districts anchor professional and creative scenes, while Pune's university and IT corridors host strong technology and student communities. Both cities have active civic and neighbourhood groups.",
    },
    {
      question: 'Does JoinOrigin operate in Maharashtra?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in the state, and the Mumbai and Pune pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
