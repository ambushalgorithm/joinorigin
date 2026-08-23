import type { RegionContent } from '../../types';

/**
 * Karnataka region page content (EN source of truth).
 *
 * Karnataka is the state that hosts Bengaluru, India's technology
 * capital and the anchor of the country's startup ecosystem. This region
 * page covers the statewide landscape around that hub.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'en',
  slug: 'karnataka',
  intro:
    "Karnataka is the state that hosts Bengaluru, India's technology capital and the single most important hub in the country's startup ecosystem. Bengaluru's global reputation rests on its concentration of engineering talent — the city's tech parks, research labs, and universities feed one of the world's largest developer and founder communities, and its coworking spaces, incubators, and conference halls host meetups, hackathons, and demo days every week. Beyond the capital, the state has its own strong regional identity: Kannada is the state language, and the cultural and civic life of cities such as Mysuru, Hubballi, and Mangaluru runs on local traditions, festivals, and neighbourhood networks that predate the tech boom by generations. The state's community landscape therefore has two layers — the fast-moving, English-first professional world of Bengaluru and the deep, Kannada-rooted civic and cultural life of the wider state. For anyone building a career in technology or joining a local community in southern India, Karnataka offers the unusual combination of global-scale opportunity and a strong sense of place.",
  dataPoints: [
    "Karnataka hosts Bengaluru, India's technology capital.",
    "Bengaluru is the anchor of the country's startup and developer ecosystem.",
    'Kannada is the state language.',
    'Regional cities such as Mysuru, Hubballi, and Mangaluru sustain strong civic and cultural scenes.',
  ],
  faq: [
    {
      question: 'How is the Karnataka region different from the Bengaluru city scene?',
      answer:
        "This page covers the whole state. The Bengaluru city page covers the technology capital's specific districts, venues, and group types, including the startup and developer scenes.",
    },
    {
      question: "What makes Bengaluru's community scene unique?",
      answer:
        "Bengaluru combines one of the world's densest developer and founder populations with a strong café culture and a mild climate that suits outdoor and evening gatherings. The tech parks of Whitefield and Electronic City anchor professional life, while central districts host creative and civic communities.",
    },
    {
      question: 'Does JoinOrigin operate in Karnataka?',
      answer:
        'Yes. JoinOrigin has no local offices. The platform helps people find or start communities anywhere in the state, and the Bengaluru pages are translated into Hindi to serve the local audience.',
    },
  ],
};

export default content;
