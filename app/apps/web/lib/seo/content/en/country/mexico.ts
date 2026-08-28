import type { CountryContent } from '../../types';

/**
 * Mexico country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Mexican community scene — the
 * capital's size and culture, the strong regional identities, family
 * and neighborhood fabric, and the growing startup and creative hubs.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'mexico',
  title: 'Origins in Mexico | JoinOrigin',
  description:
    'Find or start communities in Mexico — from Mexico City startup groups to creative scenes and small business networks nationwide. Join Origin and get discovered.',
  intro:
    'Mexico is one of the most community-oriented countries in the Americas, with a social fabric built on family, neighborhood, and celebration. The plaza, the market, the parish, and the family gathering are the classic anchors of Mexican social life, and the country’s festivals — Día de Muertos, posadas, regional ferias, and patron-saint celebrations — draw people together on a scale few countries can match. Mexico City is the cultural and economic heart: one of the largest cities on earth, with a food scene among the world’s best, more museums than most cities, and a startup ecosystem anchored in fintech and creative industries. But the country is far from a single story: Guadalajara has a strong tech and design identity, Monterrey is a business and industrial powerhouse, and Oaxaca, Puebla, and the Yucatán carry deep Indigenous and colonial traditions that shape their own ways of gathering. Spanish is the primary language, and dozens of Indigenous languages are still spoken across the country. For anyone organizing or joining a community, Mexico rewards choosing a neighborhood and a clear format — Mexicans are warm, family-oriented, and reliably show up for groups that feel genuine and welcoming.',
  dataPoints: [
    'Population of roughly 126 million across 31 states plus the capital district.',
    'Spanish is the primary language, with many Indigenous languages also spoken.',
    'Capital is Mexico City.',
    'Strong family, neighborhood, festival, and market-based gathering culture.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Mexico?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local markets, parishes, cultural centers, and university groups are also good starting points for offline communities.',
    },
    {
      question: 'How does regional identity shape Mexican communities?',
      answer:
        'Mexico City, Guadalajara, and Monterrey each have distinct professional scenes, while states like Oaxaca and Yucatán carry deep Indigenous and colonial traditions. Successful communities match their format and venue to the local culture.',
    },
    {
      question: 'Does JoinOrigin operate in Mexico?',
      answer:
        'Yes. JoinOrigin has no local offices. The Mexico City pages are available in Spanish, and the product helps people find or start communities anywhere in Mexico.',
    },
  ],
};

export default content;
