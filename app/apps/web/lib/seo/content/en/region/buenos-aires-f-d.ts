import type { RegionContent } from '../../types';

/**
 * Buenos Aires F.D. (federal capital district) region page content —
 * EN source of truth.
 *
 * The autonomous city of Buenos Aires is the federal capital district,
 * so this region page covers the citywide landscape; the city page
 * (`/location/argentina/buenos-aires`) covers the same geography with
 * per-group-type depth.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'buenos-aires-f-d',
  title: 'Communities in Buenos Aires | JoinOrigin',
  description:
    'Find or start communities in Buenos Aires — startup, creative, political, meetup, and small business groups across the federal capital. Join Origin and get discovered.',
  intro:
    'Buenos Aires is the autonomous federal capital district of Argentina and the clear center of the country’s community life. The city is organized into barrios with distinct personalities — Palermo and Villa Crespo for design, startups, and cafés; San Telmo for bohemian tradition and antique markets; La Boca for its colorful working-class art scene; Recoleta for bookstores and cultural institutions; and the Microcentro for business and corporate life. Porteños, as the city’s residents are known, are famously social: mate circles in the Bosques de Palermo, milongas for tango all over the city, Sunday walks through the San Telmo market, and a café culture where writers and founders have gathered for a century. The city hosts the country’s densest professional scene — the startup ecosystem anchored in Palermo and Villa Crespo, world-class independent theater, a storied publishing industry, and universities like UBA and Di Tella that feed talent into every community. The subte and buses make cross-city gathering practical, and the city’s enormous café network means there is always a venue that will host a group. For anyone organizing or joining a community here, Buenos Aires rewards picking a barrio and a format that embraces the city’s late, warm, conversational style.',
  dataPoints: [
    'Buenos Aires is the federal capital district (Ciudad Autónoma de Buenos Aires).',
    'Roughly 3 million residents in the city; the metro area is far larger.',
    'Barrio identities: Palermo, San Telmo, La Boca, Recoleta, Microcentro.',
    'Home to UBA, Di Tella, and Argentina’s densest startup scene.',
  ],
  faq: [
    {
      question: 'Is the Buenos Aires F.D. region the same as the Buenos Aires city scene?',
      answer:
        'Yes. Buenos Aires is a city that also serves as the federal capital district. This region page covers the citywide landscape, while the Buenos Aires city page adds per-group-type detail for startups, creatives, political groups, meetups, and small businesses.',
    },
    {
      question: 'Which Buenos Aires neighborhoods have the most active communities?',
      answer:
        'Palermo and Villa Crespo anchor the startup and design scenes, San Telmo carries the bohemian and cultural tradition, Recoleta is strong for literature and institutions, and the Microcentro hosts the corporate and professional layer.',
    },
    {
      question: 'Does JoinOrigin operate in Buenos Aires?',
      answer:
        'Yes. JoinOrigin has no local offices. The Buenos Aires pages are available in Spanish, and the product helps people find or start communities in the federal capital and across Argentina.',
    },
  ],
};

export default content;
