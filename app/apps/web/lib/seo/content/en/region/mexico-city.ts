import type { RegionContent } from '../../types';

/**
 * Mexico City (capital district) region page content — EN source of
 * truth.
 *
 * Mexico City is the federal capital district, so this region page
 * covers the citywide landscape; the city page
 * (`/location/mexico/mexico-city`) covers the same geography with
 * per-group-type depth.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'mexico-city',
  title: 'Communities in Mexico City | JoinOrigin',
  description:
    'Find or start communities in Mexico City — startup, creative, political, meetup, and small business groups across the capital. Join Origin and get discovered.',
  intro:
    'Mexico City is the federal capital of Mexico and one of the largest cities in the world, with roughly 12 million residents in the city proper and more than twenty million across the metro. It sits at 2,240 meters above sea level in a high valley ringed by volcanoes, and its community life is correspondingly vast and varied. The city is organized into boroughs and neighborhoods with distinct personalities: Roma and Condesa for cafés and creative work, Polanco for business and fine dining, Coyoacán for history and artists, and Centro Histórico for the deep layers of the past. Mexico City is a powerhouse of culture, food, and creativity — more museums than most cities, a street-food scene among the world’s best, and a growing technology and startup ecosystem anchored in fintech and creative industries. UNAM, ITAM, the National Polytechnic, and Tec de Monterrey campuses feed a constant flow of students and researchers into local communities, and public anchors like Chapultepec Park, the Zócalo, and the canals of Xochimilco give groups free, iconic places to meet. For anyone organizing or joining a community here, the reward is a city with enormous energy — and the need to choose a neighborhood, a language, and a venue with good transit access.',
  dataPoints: [
    'Federal capital of Mexico; roughly 12 million residents in the city.',
    'At 2,240 meters altitude in a high valley.',
    'Anchors: UNAM, ITAM, IPN, Tec de Monterrey campuses.',
    'Public anchors: Chapultepec Park, Zócalo, Xochimilco canals.',
  ],
  faq: [
    {
      question: 'Is the Mexico City region the same as the Mexico City city scene?',
      answer:
        'Yes. Mexico City is a federal capital district, so the region and city overlap completely. This region page covers the citywide landscape, while the Mexico City city page adds per-group-type detail for startups, creatives, political groups, meetups, and small businesses.',
    },
    {
      question: 'Which Mexico City neighborhoods have the most active communities?',
      answer:
        'Roma and Condesa anchor the startup and creative scenes, Polanco is the business center, Coyoacán and Centro Histórico carry the cultural and historic layers, and each borough has its own neighborhood organizations.',
    },
    {
      question: 'Does JoinOrigin operate in Mexico City?',
      answer:
        'Yes. JoinOrigin has no local offices. The Mexico City pages are available in Spanish, and the product helps people find or start communities in the capital and across Mexico.',
    },
  ],
};

export default content;
