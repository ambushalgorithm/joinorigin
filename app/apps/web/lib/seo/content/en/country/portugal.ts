import type { CountryContent } from '../../types';

/**
 * Portugal country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Portuguese community scene — saudade
 * meeting places, local associations, and the Lisbon hub.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'portugal',
  title: 'Communities in Portugal | JoinOrigin',
  description:
    'Find or start communities in Portugal — from startup scenes in Lisbon to local associations, food culture, and small business networks. Join Origin and get discovered.',
  intro:
    'Portugal has a warm, close-knit community culture shaped by its size, its coastline, and a strong tradition of local associations. In towns across the country, the café, the mercado, and the local associação are the natural meeting places — where neighbors catch up, clubs form, and festivals take shape. Lisbon, the capital and largest city, hosts the country’s densest professional scenes: a fast-growing startup community, creative industries, and a large international population cluster around coworking spaces, incubators, and the city’s hillside neighborhoods. Porto, the second city, sustains a lively scene of its own, and university cities like Coimbra and Braga carry strong student and academic communities. The country’s food culture — the pastelaria, the tasca, the late dinner — makes casual gathering easy, while fado houses and local festivals keep neighborhood identity alive. English is widely spoken in professional and startup circles, which makes Lisbon especially welcoming to newcomers. Whether you are looking for a tech meetup, a neighborhood committee, a surf club, or a small business network, Portugal offers a genuine, friendly landscape for finding or starting a community.',
  dataPoints: [
    'Population of roughly 10.3 million, including the Azores and Madeira.',
    'Portuguese is the primary language; Mirandese is recognized regionally.',
    'Capital is Lisbon; Porto is the second major hub.',
    'Strong café, mercado, and local association culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find communities in Portugal?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local associações and cafés are also strong starting points.',
    },
    {
      question: 'Can I start a community in a Portuguese city?',
      answer:
        'Yes. Portuguese cities have cafés, community halls, coworking spaces, and parks that host first gatherings, and the friendly social culture makes newcomers welcome. The how-to guides cover the practical steps.',
    },
    {
      question: 'Does JoinOrigin operate in Portugal?',
      answer:
        'Yes. JoinOrigin has no local offices. The Portugal and Lisbon pages are translated into Portuguese, and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
