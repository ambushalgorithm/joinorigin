import type { RegionContent } from '../../types';

/**
 * Bogotá D.C. (capital district) region page content — EN source of
 * truth.
 *
 * Bogotá is Colombia's capital district, so this region page covers the
 * citywide landscape; the city page (`/location/colombia/bogota`) covers
 * the same geography with per-group-type depth.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'bogota-d-c',
  title: 'Communities in Bogotá | JoinOrigin',
  description:
    'Find or start communities in Bogotá — startup, creative, political, meetup, and small business groups across the capital district. Join Origin and get discovered.',
  intro:
    'Bogotá is the capital district of Colombia and the country’s largest city, a high-altitude metropolis of more than seven million people sitting on the Sabana plateau at roughly 2,600 meters above sea level. The city is the political, financial, and cultural center of Colombia, and its community life is correspondingly dense: a large and growing startup ecosystem, major universities including Universidad Nacional and Los Andes, a strong arts and design scene in neighborhoods like La Candelaria and Chapinero, and deep traditions of civic organizing across its localities. Bogotá is a city of contrasts — formal and informal, wealthy and working-class, traditional and forward-looking — and its residents, known as rolos and cachacos, are famously resilient and increasingly optimistic. The TransMilenio bus system and the city’s growing cycling network (ciclovía Sundays close major streets to cars) shape how and where people gather, and the city’s many parks and public squares host a constant calendar of community events. For anyone organizing or joining a community in Bogotá, the reward is a city with scale, energy, and opportunity — but also one that rewards patience, clear communication, and a genuine connection to place.',
  dataPoints: [
    'Capital district of Colombia and the country’s largest city.',
    'Roughly 7 million residents at about 2,600 meters altitude.',
    'Anchors: Universidad Nacional, Los Andes, and a growing startup scene.',
    'TransMilenio and the ciclovía cycling network shape how people gather.',
  ],
  faq: [
    {
      question: 'Is the Bogotá D.C. region the same as the Bogotá city scene?',
      answer:
        'Yes. Bogotá is a capital district, so the region and city overlap completely. This region page covers the citywide landscape, while the Bogotá city page adds per-group-type detail for startups, creatives, political groups, meetups, and small businesses.',
    },
    {
      question: 'Which Bogotá neighborhoods have the most active communities?',
      answer:
        'Chapinero and Usaquén anchor the startup and creative scenes, La Candelaria is the historic and cultural center, and the city’s localities each host their own civic and neighborhood organizations.',
    },
    {
      question: 'Does JoinOrigin operate in Bogotá?',
      answer:
        'Yes. JoinOrigin has no local offices. The Bogotá pages are available in Spanish, and the product helps people find or start communities in the capital district and across Colombia.',
    },
  ],
};

export default content;
