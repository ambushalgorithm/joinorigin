import type { RegionContent } from '../../types';

/**
 * Tamil Nadu region page content (EN source of truth).
 *
 * Tamil Nadu is the state that hosts Chennai, the largest city in the
 * south and a major industrial, technology, and cultural centre. This
 * region page covers the statewide community landscape.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'tamil-nadu',
  intro:
    "Tamil Nadu is the southernmost major state in the current city set and the home of Chennai, its capital and largest city. Chennai anchors a community landscape shaped by the state's long industrial history, its strong educational institutions, and a deep Tamil cultural tradition that keeps language, literature, music, and film at the centre of public life. The city's professional scene spans IT corridors such as OMR and the old industrial belt, with engineering, manufacturing, and a growing startup culture meeting in offices, incubators, and university campuses. Beyond the capital, the state's cultural and civic life is remarkably strong — Tamil is among the world's oldest living languages, and its literary societies, music sabhas, temple festivals, and political organisations have gathered people for centuries. Chennai's neighbourhoods — from the beach-facing Marina and Besant Nagar to the residential south — host morning walking groups, food communities, and volunteer networks that reflect this layered identity. For anyone building a career or a community in southern India, Tamil Nadu offers a professional scene with deep roots and a civic culture that welcomes participation.",
  dataPoints: [
    'Tamil Nadu hosts Chennai, the state capital and largest city.',
    'Chennai is a major industrial, IT, and cultural centre.',
    "Tamil is the state language, among the world's oldest living languages.",
    "The state's music sabhas, literary societies, and temple festivals sustain a deep civic culture.",
  ],
  faq: [
    {
      question: 'How is the Tamil Nadu region different from the Chennai city scene?',
      answer:
        "This page covers the whole state. The Chennai city page covers the capital's specific districts, venues, and group types, including the IT corridor and the cultural neighbourhoods.",
    },
    {
      question: 'What are the most active communities in Tamil Nadu?',
      answer:
        "Chennai hosts strong IT, engineering, and startup communities alongside active music, literary, and volunteer groups. The state's temple towns and cultural centres sustain festivals and sabhas that draw regular participants from across the region.",
    },
    {
      question: 'Does JoinOrigin operate in Tamil Nadu?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in the state, and the Chennai pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
