import type { CountryContent } from '../../types';

/**
 * Peru country page content (EN source of truth).
 *
 * Evergreen, honest prose about the Peruvian community scene — the
 * coastal capital, Andean traditions, the country's food culture, and
 * the mix of Indigenous, migrant, and urban communities.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'en',
  slug: 'peru',
  title: 'Origins in Peru | JoinOrigin',
  description:
    'Find or start communities in Peru — from Lima startup groups to creative and small business networks across the coast, highlands, and jungle. Join Origin and get discovered.',
  intro:
    "Peru is a country of dramatic geography — a long Pacific coast, the Andean highlands, and the Amazon basin — and community life follows those regions. Lima, the capital on the coast, concentrates the largest share of the population and the most visible professional scene: startups, universities, creative studios, and a food culture that has made the city a global culinary destination. In the highlands, cities like Cusco, Arequipa, and Huancayo carry deep Indigenous and Andean traditions — communal work parties (minka and ayni), festival cycles, and strong ties to the land — while the Amazon region has its own river-based communities. Peru is also a country of internal migration, and Lima's districts are full of regional associations that keep highland and jungle traditions alive in the capital. Spanish is the primary language, with Quechua and Aymara widely spoken. The startup scene is young but growing, anchored in Lima's fintech, e-commerce, and creative sectors. For anyone organizing or joining a community, Peru rewards patience, respect for tradition, and a willingness to bridge the country's regional diversity.",
  dataPoints: [
    'Population of roughly 32 million across 24 departments plus the constitutional province of Lima.',
    'Spanish is the primary language, with Quechua and Aymara widely spoken.',
    'Capital is Lima.',
    'Strong coastal, Andean, and Amazonian regional identities.',
  ],
  faq: [
    {
      question: 'How do I find Origins in Peru?',
      answer:
        'Use the /location hub to pick a city, then explore the group-type pages for startup, creative, political, meetup, and small business Origins. Local universities, regional associations, markets, and cultural centers are also good starting points for offline groups.',
    },
    {
      question: "How do Peru's regions shape community life?",
      answer:
        'The coast, highlands, and jungle each have distinct traditions of gathering. Andean communities are known for communal work and festival cycles, while Lima blends many regional and migrant cultures into a dense urban scene.',
    },
    {
      question: 'Does JoinOrigin operate in Peru?',
      answer:
        'Yes. JoinOrigin has no local offices. The Lima pages are available in Spanish, and the product helps people find or start communities anywhere in Peru.',
    },
  ],
};

export default content;
