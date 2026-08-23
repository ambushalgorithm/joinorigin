import type { CountryContent } from '../../types';

/**
 * Colombia country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Colombian community scene — the
 * country's regional diversity, coffee culture, the startup renaissance
 * in Bogotá and Medellín, and the strong neighborhood and family fabric.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'colombia',
  title: 'Communities in Colombia | JoinOrigin',
  description:
    'Find or start communities in Colombia — from Bogotá startup groups to Medellín innovation scenes and small business networks nationwide. Join Origin and get discovered.',
  intro:
    "Colombia is a country of strong regional identities, and community life reflects that diversity. From the Andean capitals of Bogotá and Medellín to the Caribbean warmth of Barranquilla and Cartagena, the coffee region, and the Pacific and Amazonian territories, each region carries its own music, food, and way of gathering. Family and neighborhood (barrio) bonds are the backbone of Colombian social life, and religious communities, football clubs, and cultural festivals — from the Barranquilla Carnival to the Feria de las Flores — bring people together at scale throughout the year. In the past two decades, Colombia has become one of Latin America's most visible innovation hubs: Medellín reinvented itself around technology, education, and urban design, while Bogotá grew a dense startup ecosystem with accelerators, coworking spaces, and university programs. Community responses to the country's long history of conflict also produced a deep culture of solidarity and peacebuilding, with many civil-society and reconciliation groups still active today. Spanish is the primary language across all 32 departments plus the capital district. For anyone organizing or joining a community, Colombia rewards warmth, persistence, and a genuine connection to place.",
  dataPoints: [
    'Population of roughly 49.6 million across 32 departments plus the capital district.',
    'Spanish is the primary language.',
    'Capital is Bogotá.',
    'Strong family, neighborhood, festival, and solidarity-community culture.',
  ],
  faq: [
    {
      question: 'How do I find communities in Colombia?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business communities. Local universities, cultural centers, and neighborhood associations are also good starting points for offline groups.',
    },
    {
      question: 'What makes Colombian community culture distinctive?',
      answer:
        'Regional identity, family and neighborhood ties, and a strong festival calendar shape how groups gather. The country also has a deep culture of solidarity and peacebuilding, so civic and mutual-aid groups are common and respected.',
    },
    {
      question: 'Does JoinOrigin operate in Colombia?',
      answer:
        'Yes. JoinOrigin has no local offices. The Bogotá, Medellín, and Barranquilla pages are available in Spanish, and the product helps people find or start communities anywhere in Colombia.',
    },
  ],
};

export default content;
