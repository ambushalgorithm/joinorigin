import type { RegionContent } from '../../types';

/**
 * Berlin region page content — EN source of truth.
 *
 * Berlin is a city-state: the admin-1 region and the city are the same
 * entity. This region page covers the statewide/district landscape; the
 * city page (`/location/germany/berlin/berlin`) covers the urban scene.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'berlin',
  intro:
    'Berlin is both a city and a state, which makes its community landscape unusually concentrated. Twelve districts — from Kreuzberg and Neukölln in the south to Prenzlauer Berg and Wedding in the north, Mitte at the center, and Charlottenburg in the west — each carry a distinct identity that shapes the groups meeting there. Because the whole state fits inside one city, communities built around a neighborhood, an industry, or a hobby rarely fragment across long distances; a tech meetup in Mitte and a climate initiative in Neukölln are a short U-Bahn ride apart. The state is also a hub for public institutions, universities, and cultural venues that host thousands of gatherings each month. For anyone organizing or joining a community, Berlin offers the rare combination of density, diversity, and affordability compared to other European capitals. The regional identity feeds directly into the city pages: most groups in the state meet within the city itself, and the guides here help you navigate both.',
  dataPoints: [
    'Berlin is a city-state (Land) of roughly 3.4 million residents.',
    'Twelve districts with distinct community identities.',
    'Federal capital of Germany and a major European tech hub.',
    'Dense public transport links every district to the others.',
  ],
  faq: [
    {
      question: 'Is the Berlin region different from the Berlin city scene?',
      answer:
        'Berlin is a city-state, so the region and city overlap completely. This page covers the statewide landscape, while the Berlin city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Berlin districts have the most active communities?',
      answer:
        'Mitte and Kreuzberg are the historic centers for tech and creative groups; Neukölln, Friedrichshain, and Prenzlauer Berg host strong maker, arts, and family scenes; Charlottenburg and Schöneberg anchor professional networks.',
    },
    {
      question: 'Does JoinOrigin operate in Berlin?',
      answer:
        'Yes. JoinOrigin has no local offices. Berlin is one of two flagship cities, and its pages are translated into German to serve the local audience honestly.',
    },
  ],
};

export default content;
