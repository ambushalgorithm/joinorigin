import type { RegionContent } from '../../types';

/**
 * Delhi region page content (EN source of truth).
 *
 * Delhi is a National Capital Territory — the admin-1 region and the
 * city are the same entity. This region page covers the territorial
 * landscape; the city page covers the urban scene in detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'delhi',
  intro:
    "Delhi is a National Capital Territory, which means the region and the city are the same administrative entity — and the page is the story of one enormous urban region at the centre of Indian public life. More than 16 million people live within the territory, and the wider National Capital Region spills into the neighbouring states of Haryana and Uttar Pradesh, taking in Gurugram and Noida, which are themselves major hubs for corporate and startup activity. Delhi's community landscape mirrors its layered identity: Connaught Place and Hauz Khas Village anchor cafés, start-ups, and creative networks; Shahpur Jat and Lado Sarai are home to designers and artisans; the university campuses of North and South Delhi feed a constant stream of students and young organisers; and the city's parks — Lodhi Garden, Nehru Park, the Yamuna floodplains — host morning walk groups, yoga circles, and weekend gatherings. The metro system makes cross-city attendance practical, and the city's media, government, and NGO sectors draw people with strong civic purpose. For anyone organising or joining a community, Delhi offers the density of a national capital with a lively, argumentative, and welcoming public culture.",
  dataPoints: [
    'Delhi is a National Capital Territory and the capital of India.',
    'Population of more than 16 million, with a much larger National Capital Region.',
    'Home to major universities including Delhi University, JNU, and IIT Delhi.',
    'Districts like Connaught Place, Hauz Khas, and Shahpur Jat shape distinct scenes.',
  ],
  faq: [
    {
      question: 'Is the Delhi region different from the Delhi city scene?',
      answer:
        'No. Delhi is a National Capital Territory, so the region and city overlap completely. This page covers the territorial landscape, while the Delhi city page dives into specific districts, venues, and group types.',
    },
    {
      question: 'Which Delhi areas have the most active communities?',
      answer:
        'Connaught Place and Hauz Khas Village anchor startup and café-based scenes; Shahpur Jat and Lado Sarai host design and craft communities; and the university campuses of North and South Delhi sustain student and youth groups.',
    },
    {
      question: 'Does JoinOrigin operate in Delhi?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in Delhi, and the Delhi pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
