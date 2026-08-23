import type { RegionContent } from '../../types';

/**
 * Lima Province region page content — EN source of truth.
 *
 * Lima Province is the constitutional province containing the capital
 * city of Lima; this region page covers the provincial landscape, while
 * the city page (`/location/peru/lima`) covers the same geography with
 * per-group-type depth.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'lima-province',
  title: 'Communities in Lima | JoinOrigin',
  description:
    'Find or start communities in Lima — startup, creative, political, meetup, and small business groups across the province. Join Origin and get discovered.',
  intro:
    'Lima Province is the constitutional province of Peru that contains the capital city of Lima, on the country’s Pacific coast. As the seat of national government and the largest urban center in the country — the metro area is home to roughly ten million people — Lima concentrates most of Peru’s professional, cultural, and institutional life. The province is a collection of distinct districts, from the historic center and the bohemian Barranco and Miraflores along the coast, to the northern and southern cones that host the city’s working-class and migrant communities. Lima is a global culinary capital, with cevicherías and fine-dining restaurants that anchor a strong food community, and it has a growing startup scene in fintech, e-commerce, and creative industries, supported by universities like PUCP, UNMSM, and Universidad del Pacífico. The city also carries deep traditions of regional and migrant association, with clubs and organizations that keep highland and jungle cultures alive in the capital. For anyone organizing or joining a community in Lima Province, the reward is a city of scale, warmth, and opportunity — where success depends on choosing a district and a format that match the local rhythm.',
  dataPoints: [
    'Constitutional province containing the capital city of Lima.',
    'Metro area of roughly ten million on Peru’s Pacific coast.',
    'Districts: historic center, Barranco, Miraflores, and the northern and southern cones.',
    'Anchors: PUCP, UNMSM, Universidad del Pacífico, and a growing startup scene.',
  ],
  faq: [
    {
      question: 'Is the Lima Province region the same as the Lima city scene?',
      answer:
        'Lima Province is the constitutional province that contains the city of Lima, so the two largely overlap. This region page covers the provincial landscape, while the Lima city page adds per-group-type detail for startups, creatives, political groups, meetups, and small businesses.',
    },
    {
      question: 'Which Lima districts have the most active communities?',
      answer:
        'Miraflores and Barranco anchor the startup, creative, and food scenes, the historic center hosts civic and cultural institutions, and the northern and southern cones are home to strong neighborhood and migrant-community organizations.',
    },
    {
      question: 'Does JoinOrigin operate in Lima?',
      answer:
        'Yes. JoinOrigin has no local offices. The Lima pages are available in Spanish, and the product helps people find or start communities in the province and across Peru.',
    },
  ],
};

export default content;
