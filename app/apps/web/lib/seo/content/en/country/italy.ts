import type { CountryContent } from '../../types';

/**
 * Italy country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Italian community scene — piazzas,
 * associations, the aperitivo tradition, and the Milan hub.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'italy',
  title: 'Communities in Italy | JoinOrigin',
  description:
    'Find or start communities in Italy — from startup scenes in Milan to local associations, food culture, and small business networks. Join Origin and get discovered.',
  intro:
    'Italy’s community life is built on the piazza, the local association, and a deeply social food culture. In towns and cities across the country, the piazza is the natural meeting point — the place where people gather after work, where festivals unfold, and where neighborhood identity becomes visible. Associations and circoli have long organized everything from sports and music to politics and volunteering, and the country’s cooperative tradition gives many communities a formal home. Milan, the economic capital, hosts the densest professional scenes: design, fashion, finance, and a growing startup community cluster around coworking spaces and universities. Rome, Turin, Bologna, and Naples each sustain vibrant scenes of their own, with strong local identities and university communities. The aperitivo tradition — an early-evening drink with snacks — makes casual gathering a daily ritual, while sagre (food festivals) and neighborhood markets bring people together around shared tables. English is increasingly common in professional and startup circles, especially in Milan. Whether you are looking for a design meetup, a neighborhood committee, a hiking club, or a small business network, Italy offers a rich, welcoming landscape for finding or starting a community.',
  dataPoints: [
    'Population of roughly 60.4 million across 20 regions.',
    'Italian is the primary language, with regional languages and German spoken in parts.',
    'Capital is Rome; Milan is the economic and startup hub.',
    'Piazza culture, associations (circoli), and the aperitivo tradition nationwide.',
  ],
  faq: [
    {
      question: 'How do I find communities in Italy?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local circoli, parish groups, and cultural associations are also strong starting points.',
    },
    {
      question: 'Can I start a community in an Italian city?',
      answer:
        'Yes. Italian cities have piazzas, bars, coworking spaces, and association rooms that host first gatherings, and the aperitivo tradition makes casual meetups easy. The how-to guides cover the practical steps.',
    },
    {
      question: 'Does JoinOrigin operate in Italy?',
      answer:
        'Yes. JoinOrigin has no local offices. The Italy and Milan pages are translated into Italian, and the platform helps people find or start communities anywhere in the country.',
    },
  ],
};

export default content;
