import type { CountryContent } from '../../types';

/**
 * Argentina country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Argentine community scene — the
 * capital's startup and cultural density, asado and mate sociality,
 * provincial networks, and the country's cooperative traditions.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'argentina',
  title: 'Origins in Argentina | JoinOrigin',
  description:
    'Find or start communities in Argentina — from Buenos Aires startup groups to provincial maker, cultural, and small business networks. Join Origin and get discovered.',
  intro:
    'Argentina has one of the strongest community traditions in Latin America, shaped by a culture that treats gathering as a daily habit. The asado, mate, and the neighborhood barrio are social anchors: sharing grilled meat on a Sunday, passing a thermos of mate around a circle, and stopping by the local plaza or club are ordinary parts of life. Buenos Aires concentrates the country’s densest professional scene — startups, creative studios, universities like UBA and Di Tella, and a storied publishing and theater culture — while provincial capitals such as Córdoba, Rosario, Mendoza, and Salta run their own lively networks around universities, wineries, and regional industry. The country also has a deep cooperative and mutual-aid tradition, from worker-run enterprises to neighborhood assemblies, which makes civic and solidarity groups common and respected. Because the economy has moved in hard cycles, communities here tend to be practical and resilient, organized around concrete support as much as shared hobbies. Whether you are new to the country or a lifelong resident, finding a group — or starting one with a simple first asado or meetup — is a well-trodden path.',
  dataPoints: [
    'Population of roughly 44.5 million across 23 provinces plus the federal capital.',
    'Spanish is the primary language, with Italian and German heritage communities.',
    'Federal capital is Buenos Aires.',
    'Strong asado, mate, and neighborhood (barrio) gathering culture nationwide.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Argentina?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local clubs, university event boards, and neighborhood associations are also good starting points for offline groups.',
    },
    {
      question: 'What role do asado and mate play in Argentine communities?',
      answer:
        'Both are social technologies: an asado is a shared meal that brings people together for hours, and mate is a drink passed around a circle as a sign of welcome. Many groups use them as the natural opening or closing of a meeting.',
    },
    {
      question: 'Does JoinOrigin operate in Argentina?',
      answer:
        'Yes. JoinOrigin has no local offices. The Buenos Aires pages are available in Spanish, and the product helps people find or start communities anywhere in Argentina.',
    },
  ],
};

export default content;
